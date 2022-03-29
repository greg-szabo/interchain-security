package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"

	clienttypes "github.com/cosmos/ibc-go/v3/modules/core/02-client/types"
	channeltypes "github.com/cosmos/ibc-go/v3/modules/core/04-channel/types"
	commitmenttypes "github.com/cosmos/ibc-go/v3/modules/core/23-commitment/types"
	ibctmtypes "github.com/cosmos/ibc-go/v3/modules/light-clients/07-tendermint/types"
	ibctesting "github.com/cosmos/ibc-go/v3/testing"

	"github.com/cosmos/interchain-security/app"
	"github.com/cosmos/interchain-security/testutil/simapp"
	childtypes "github.com/cosmos/interchain-security/x/ccv/child/types"
	parenttypes "github.com/cosmos/interchain-security/x/ccv/parent/types"
	"github.com/cosmos/interchain-security/x/ccv/types"

	tmtypes "github.com/tendermint/tendermint/types"

	"github.com/stretchr/testify/suite"
)

func init() {
	ibctesting.DefaultTestingAppInit = simapp.SetupTestingApp
}

type KeeperTestSuite struct {
	suite.Suite

	coordinator *ibctesting.Coordinator

	// testing chains
	parentChain *ibctesting.TestChain
	childChain  *ibctesting.TestChain

	parentClient    *ibctmtypes.ClientState
	parentConsState *ibctmtypes.ConsensusState

	path *ibctesting.Path

	ctx sdk.Context
}

func (suite *KeeperTestSuite) SetupTest() {
	suite.coordinator = ibctesting.NewCoordinator(suite.T(), 2)
	suite.parentChain = suite.coordinator.GetChain(ibctesting.GetChainID(1))
	suite.childChain = suite.coordinator.GetChain(ibctesting.GetChainID(2))

	tmConfig := ibctesting.NewTendermintConfig()

	// commit a block on parent chain before creating client
	suite.coordinator.CommitBlock(suite.parentChain)

	// create client and consensus state of parent chain to initialize child chain genesis.
	height := suite.parentChain.LastHeader.GetHeight().(clienttypes.Height)
	UpgradePath := []string{"upgrade", "upgradedIBCState"}

	suite.parentClient = ibctmtypes.NewClientState(
		suite.parentChain.ChainID, tmConfig.TrustLevel, tmConfig.TrustingPeriod, tmConfig.UnbondingPeriod, tmConfig.MaxClockDrift,
		height, commitmenttypes.GetSDKSpecs(), UpgradePath, tmConfig.AllowUpdateAfterExpiry, tmConfig.AllowUpdateAfterMisbehaviour,
	)
	suite.parentConsState = suite.parentChain.LastHeader.ConsensusState()

	valUpdates := tmtypes.TM2PB.ValidatorUpdates(suite.parentChain.Vals)

	childGenesis := childtypes.NewInitialGenesisState(suite.parentClient, suite.parentConsState, valUpdates)
	suite.childChain.App.(*app.App).ChildKeeper.InitGenesis(suite.childChain.GetContext(), childGenesis)

	suite.ctx = suite.parentChain.GetContext()

	suite.path = ibctesting.NewPath(suite.childChain, suite.parentChain)
	suite.path.EndpointA.ChannelConfig.PortID = childtypes.PortID
	suite.path.EndpointB.ChannelConfig.PortID = parenttypes.PortID
	suite.path.EndpointA.ChannelConfig.Version = types.Version
	suite.path.EndpointB.ChannelConfig.Version = types.Version
	suite.path.EndpointA.ChannelConfig.Order = channeltypes.ORDERED
	suite.path.EndpointB.ChannelConfig.Order = channeltypes.ORDERED
	parentClient, ok := suite.childChain.App.(*app.App).ChildKeeper.GetParentClient(suite.childChain.GetContext())
	if !ok {
		panic("must already have parent client on child chain")
	}
	// set child endpoint's clientID
	suite.path.EndpointA.ClientID = parentClient

	// TODO: No idea why or how this works, but it seems that it needs to be done.
	suite.path.EndpointB.Chain.SenderAccount.SetAccountNumber(6)
	suite.path.EndpointA.Chain.SenderAccount.SetAccountNumber(6)

	// create child client on parent chain and set as child client for child chainID in parent keeper.
	suite.path.EndpointB.CreateClient()
	suite.parentChain.App.(*app.App).ParentKeeper.SetChildClient(suite.parentChain.GetContext(), suite.childChain.ChainID, suite.path.EndpointB.ClientID)
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

func (suite *KeeperTestSuite) TestValsetUpdateBlockHeight() {
	app := suite.parentChain.App.(*app.App)
	ctx := suite.ctx

	blockHeight := app.ParentKeeper.GetValsetUpdateBlockHeight(ctx, uint64(0))
	suite.Require().Zero(blockHeight)

	app.ParentKeeper.SetValsetUpdateBlockHeight(ctx, uint64(1), uint64(2))
	blockHeight = app.ParentKeeper.GetValsetUpdateBlockHeight(ctx, uint64(1))
	suite.Require().Equal(blockHeight, uint64(2))

	app.ParentKeeper.DeleteValsetUpdateBlockHeight(ctx, uint64(1))
	blockHeight = app.ParentKeeper.GetValsetUpdateBlockHeight(ctx, uint64(1))
	suite.Require().Zero(blockHeight)

	app.ParentKeeper.SetValsetUpdateBlockHeight(ctx, uint64(1), uint64(2))
	app.ParentKeeper.SetValsetUpdateBlockHeight(ctx, uint64(3), uint64(4))
	blockHeight = app.ParentKeeper.GetValsetUpdateBlockHeight(ctx, uint64(3))
	suite.Require().Equal(blockHeight, uint64(4))
}

func (suite *KeeperTestSuite) TestSlashAcks() {
	app := suite.parentChain.App.(*app.App)
	ctx := suite.ctx

	var chainsAcks [][]string

	penaltiesfN := func() (penalties []string) {
		app.ParentKeeper.IterateSlashAcks(ctx, func(id string, acks []string) bool {
			chainsAcks = append(chainsAcks, acks)
			return true
		})
		return
	}

	chainID := "consumer"

	acks := app.ParentKeeper.GetSlashAcks(ctx, chainID)
	suite.Require().Nil(acks)

	p := []string{"alice", "bob", "charlie"}
	app.ParentKeeper.SetSlashAcks(ctx, chainID, p)

	acks = app.ParentKeeper.GetSlashAcks(ctx, chainID)
	suite.Require().NotNil(acks)

	suite.Require().Len(acks, 3)
	emptied := app.ParentKeeper.EmptySlashAcks(ctx, chainID)
	suite.Require().Len(emptied, 3)

	acks = app.ParentKeeper.GetSlashAcks(ctx, chainID)
	suite.Require().Nil(acks)

	chains := []string{"c1", "c2", "c3"}

	for _, c := range chains {
		app.ParentKeeper.SetSlashAcks(ctx, c, p)
	}

	penaltiesfN()
	suite.Require().Len(chainsAcks, len(chains))
}

func (suite *KeeperTestSuite) TestAppendslashingAck() {
	app := suite.parentChain.App.(*app.App)
	ctx := suite.ctx

	p := []string{"alice", "bob", "charlie"}
	chains := []string{"c1", "c2"}
	app.ParentKeeper.SetSlashAcks(ctx, chains[0], p)

	app.ParentKeeper.AppendslashingAck(ctx, chains[0], p[0])
	acks := app.ParentKeeper.GetSlashAcks(ctx, chains[0])
	suite.Require().NotNil(acks)
	suite.Require().Len(acks, len(p)+1)

	app.ParentKeeper.AppendslashingAck(ctx, chains[1], p[0])
	acks = app.ParentKeeper.GetSlashAcks(ctx, chains[1])
	suite.Require().NotNil(acks)
	suite.Require().Len(acks, 1)
}
