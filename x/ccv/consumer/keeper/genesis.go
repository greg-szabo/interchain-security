package keeper

import (
	"bytes"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	ibctmtypes "github.com/cosmos/ibc-go/v3/modules/light-clients/07-tendermint/types"
	"github.com/cosmos/interchain-security/x/ccv/consumer/types"
	utils "github.com/cosmos/interchain-security/x/ccv/utils"

	abci "github.com/tendermint/tendermint/abci/types"
	tmtypes "github.com/tendermint/tendermint/types"
)

// InitGenesis initializes the CCV consumer state and binds to PortID.
func (k Keeper) InitGenesis(ctx sdk.Context, state *types.GenesisState) []abci.ValidatorUpdate {
	k.SetParams(ctx, state.Params)
	// TODO: This is the only place Params.Enabled is actually used... Seems odd
	if !state.Params.Enabled {
		return nil
	}

	// TODO: we only set this here, from a hardcoded value. Why is this being set in the store at all? We could just use the hardcoded value in ValidateConsumerChannelParams where we access it.
	k.SetPort(ctx, types.PortID)

	// Only try to bind to port if it is not already bound, since we may already own
	// port capability from capability InitGenesis
	// TODO: I need to understand this better. Why do we not know for sure? What are the scenarios in which it is bound or not already bound?
	if !k.IsBound(ctx, types.PortID) {
		// transfer module binds to the transfer port on InitChain
		// and claims the returned capability
		err := k.BindPort(ctx, types.PortID)
		if err != nil {
			panic(fmt.Sprintf("could not claim port capability: %v", err))
		}
	}

	// initialValSet is checked in NewChain case by ValidateGenesis
	if state.NewChain {
		// Create the provider client in InitGenesis for new consumer chain. CCV Handshake must be established with this client id.
		clientID, err := k.clientKeeper.CreateClient(ctx, state.ProviderClientState, state.ProviderConsensusState)
		if err != nil {
			panic(err)
		}

		// Set the unbonding period: use the unbonding period on the provider to
		// compute the unbonding period on the consumer
		// TODO: do we really want to do this live? I think this should be hardcoded.
		unbondingTime := utils.ComputeConsumerUnbondingPeriod(state.ProviderClientState.UnbondingPeriod)
		k.SetUnbondingTime(ctx, unbondingTime)
		// Set default value for valset update ID
		k.SetHeightValsetUpdateID(ctx, uint64(ctx.BlockHeight()), uint64(0))
		// set provider client id.
		k.SetProviderClient(ctx, clientID)
	} else {
		// verify that latest consensus state on provider client matches the initial validator set of restarted chain
		// thus, IBC genesis MUST run before CCV consumer genesis
		consState, ok := k.clientKeeper.GetLatestClientConsensusState(ctx, state.ProviderClientId)
		if !ok {
			panic("consensus state for provider client not found. MUST run IBC genesis before CCV consumer genesis")
		}
		tmConsState, ok := consState.(*ibctmtypes.ConsensusState)
		if !ok {
			panic(fmt.Sprintf("consensus state has wrong type. expected: %T, got: %T", &ibctmtypes.ConsensusState{}, consState))
		}

		// ensure that initial validator set is same as initial consensus state on provider client.
		// this will be verified by provider module on channel handshake.
		// TODO: If we didn't check for this, what would the harm be? Getting an error further down the initialization path when the provider checks?
		vals, err := tmtypes.PB2TM.ValidatorUpdates(state.InitialValSet)
		if err != nil {
			panic(err)
		}
		valSet := tmtypes.NewValidatorSet(vals)

		if !bytes.Equal(tmConsState.NextValidatorsHash, valSet.Hash()) {
			panic("initial validator set does not match last consensus state of the provider client")
		}

		// Set the unbonding period: use the unbonding period on the provider to
		// compute the unbonding period on the consumer
		clientState, ok := k.clientKeeper.GetClientState(ctx, state.ProviderClientId)
		if !ok {
			panic("client state for provider client not found. MUST run IBC genesis before CCV consumer genesis")
		}
		tmClientState, ok := clientState.(*ibctmtypes.ClientState)
		if !ok {
			panic(fmt.Sprintf("client state has wrong type. expected: %T, got: %T", &ibctmtypes.ClientState{}, clientState))
		}
		// TODO: Let's just hardcode this
		unbondingTime := utils.ComputeConsumerUnbondingPeriod(tmClientState.UnbondingPeriod)
		k.SetUnbondingTime(ctx, unbondingTime)

		// set provider client id
		k.SetProviderClient(ctx, state.ProviderClientId)
		// set provider channel id.
		k.SetProviderChannel(ctx, state.ProviderChannelId)
		// set all unbonding sequences
		for _, mp := range state.MaturingPackets {
			k.SetPacketMaturityTime(ctx, mp.VscId, mp.MaturityTime)
		}
	}

	k.ApplyCCValidatorChanges(ctx, state.InitialValSet)

	return state.InitialValSet
}

// ExportGenesis exports the CCV consumer state. If the channel has already been established, then we export
// provider chain. Otherwise, this is still considered a new chain and we export latest client state.
func (k Keeper) ExportGenesis(ctx sdk.Context) *types.GenesisState {
	params := k.GetParams(ctx)
	if !params.Enabled {
		return types.DefaultGenesisState()
	}

	clientID, ok := k.GetProviderClient(ctx)
	// if provider clientID and channelID don't exist on the consumer chain, then CCV protocol is disabled for this chain
	// return a disabled genesis state
	if !ok {
		return types.DefaultGenesisState()
	}

	if channelID, ok := k.GetProviderChannel(ctx); ok {
		// Get the maturing packets
		maturingPackets := []types.MaturingVSCPacket{}
		k.IteratePacketMaturityTime(ctx, func(vscId, timeNs uint64) bool {
			mat := types.MaturingVSCPacket{
				VscId:        vscId,
				MaturityTime: timeNs,
			}
			maturingPackets = append(maturingPackets, mat)
			return false
		})

		// ValUpdates must be filled in off-line
		// TODO: I need to understand this use case better. Why can't we fill them here?
		return types.NewRestartGenesisState(clientID, channelID, maturingPackets, nil, params)
	}

	cs, ok := k.clientKeeper.GetClientState(ctx, clientID)
	if !ok {
		panic("provider client not set on already running consumer chain")
	}
	tmCs, ok := cs.(*ibctmtypes.ClientState)
	if !ok {
		panic("provider client consensus state is not tendermint client state")
	}
	consState, ok := k.clientKeeper.GetLatestClientConsensusState(ctx, clientID)
	if !ok {
		panic("provider consensus state not set on already running consumer chain")
	}
	tmConsState, ok := consState.(*ibctmtypes.ConsensusState)
	if !ok {
		panic("provider consensus state is not tendermint consensus state")
	}
	// ValUpdates must be filled in off-line
	return types.NewInitialGenesisState(tmCs, tmConsState, nil, params)
}
