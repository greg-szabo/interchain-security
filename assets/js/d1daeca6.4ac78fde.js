"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[845],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>h});var o=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=o.createContext({}),p=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=p(e.components);return o.createElement(l.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(t),m=a,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return t?o.createElement(h,r(r({ref:n},c),{},{components:t})):o.createElement(h,r({ref:n},c))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,r=new Array(i);r[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[d]="string"==typeof e?e:a,r[1]=s;for(var p=2;p<i;p++)r[p]=t[p];return o.createElement.apply(null,r)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9265:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var o=t(7462),a=(t(7294),t(3905));const i={sidebar_position:3},r="ICS Provider Proposals",s={unversionedId:"features/proposals",id:"features/proposals",title:"ICS Provider Proposals",description:"Interchain security module introduces 3 new proposal types to the provider.",source:"@site/docs/features/proposals.md",sourceDirName:"features",slug:"/features/proposals",permalink:"/interchain-security/features/proposals",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Reward distribution",permalink:"/interchain-security/features/reward-distribution"},next:{title:"Consumer Initiated Slashing",permalink:"/interchain-security/features/slashing"}},l={},p=[{value:"<code>ConsumerAdditionProposal</code>",id:"consumeradditionproposal",level:2},{value:"<code>ConsumerRemovalProposal</code>",id:"consumerremovalproposal",level:2},{value:"<code>EquivocationProposal</code>",id:"equivocationproposal",level:2},{value:"Notes",id:"notes",level:3},{value:"Gaia example:",id:"gaia-example",level:3}],c={toc:p},d="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(d,(0,o.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"ics-provider-proposals"},"ICS Provider Proposals"),(0,a.kt)("p",null,"Interchain security module introduces 3 new proposal types to the provider."),(0,a.kt)("p",null,"The proposals are used to propose upcoming interchain security events through governance."),(0,a.kt)("h2",{id:"consumeradditionproposal"},(0,a.kt)("inlineCode",{parentName:"h2"},"ConsumerAdditionProposal")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"If you are preparing a ",(0,a.kt)("inlineCode",{parentName:"p"},"ConsumerAdditionProposal")," you can find more information in the ",(0,a.kt)("a",{parentName:"p",href:"/interchain-security/consumer-development/onboarding"},"consumer onboarding checklist"),".")),(0,a.kt)("p",null,"Proposal type used to suggest adding a new consumer chain."),(0,a.kt)("p",null,"When proposals of this type are passed and the ",(0,a.kt)("inlineCode",{parentName:"p"},"spawn_time")," specified in the proposal is reached, all provider chain validators are expected to run infrastructure (validator nodes) for the proposed consumer chain."),(0,a.kt)("p",null,"Minimal example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'{\n    // Time on the provider chain at which the consumer chain genesis is finalized and all validators\n    // will be responsible for starting their consumer chain validator node.\n    "spawn_time": "2023-02-28T20:40:00.000000Z",\n    "title": "Add consumer chain",\n    "description": ".md description of your chain and all other relevant information",\n    "chain_id": "newchain-1",\n    "initial_height" : {\n        "revision_height": 0,\n        "revision_number": 1,\n    },\n    // Unbonding period for the consumer chain.\n    // It should should be smaller than that of the provider.\n    "unbonding_period": 86400000000000,\n    // Timeout period for CCV related IBC packets.\n    // Packets are considered timed-out after this interval elapses.\n    "ccv_timeout_period": 259200000000000,\n    "transfer_timeout_period": 1800000000000,\n    "consumer_redistribution_fraction": "0.75",\n    "blocks_per_distribution_transmission": 1000,\n    "historical_entries": 10000,\n    "genesis_hash": "d86d756e10118e66e6805e9cc476949da2e750098fcc7634fd0cc77f57a0b2b0",\n    "binary_hash": "376cdbd3a222a3d5c730c9637454cd4dd925e2f9e2e0d0f3702fc922928583f1"\n}\n')),(0,a.kt)("p",null,"More examples can be found in the replicated security testnet repository ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/testnets/blob/master/replicated-security/baryon-1/proposal-baryon-1.json"},"here")," and ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/testnets/blob/master/replicated-security/noble-1/proposal-noble-1.json"},"here"),"."),(0,a.kt)("h2",{id:"consumerremovalproposal"},(0,a.kt)("inlineCode",{parentName:"h2"},"ConsumerRemovalProposal")),(0,a.kt)("p",null,"Proposal type used to suggest removing an existing consumer chain."),(0,a.kt)("p",null,"When proposals of this type are passed, the consumer chain in question will be gracefully removed from interchain security and validators will no longer be required to run infrastructure for the specified chain.\nAfter the consumer chain removal, the chain in question will no longer be secured by the provider's validator set."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The chain in question my continue to produce blocks, but the validator set can no longer be slashed for any infractions committed on that chain.\nAdditional steps are required to completely offboard a consumer chain, such as re-introducing the staking module and removing the provider's validators from the active set.\nMore information will be made available in the ",(0,a.kt)("a",{parentName:"p",href:"/interchain-security/consumer-development/offboarding"},"Consumer Offboarding Checklist"),".")),(0,a.kt)("p",null,"Minimal example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'{\n    // the time on the provider chain at which all validators are responsible to stop their consumer chain validator node\n    "stop_time": "2023-03-07T12:40:00.000000Z",\n    // the chain-id of the consumer chain to be stopped\n    "chain_id": "consumerchain-1",\n    "title": "This was a great chain",\n    "description": "Here is a .md formatted string specifying removal details"\n}\n')),(0,a.kt)("h2",{id:"equivocationproposal"},(0,a.kt)("inlineCode",{parentName:"h2"},"EquivocationProposal")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"EquivocationProposal")," will only be accepted on the provider chain if at least one of the consumer chains submits equivocation evidence to the provider.\nSending equivocation evidence to the provider is handled automatically by the interchain security protocol when an equivocation infraction is detected on the consumer chain.")),(0,a.kt)("p",null,"Proposal type used to suggest slashing a validator for double signing on consumer chain.\nWhen proposals of this type are passed, the validator in question will be slashed for equivocation on the provider chain."),(0,a.kt)("admonition",{type:"warning"},(0,a.kt)("p",{parentName:"admonition"},"Take note that an equivocation slash causes a validator to be tombstoned (can never re-enter the active set).\nTombstoning a validator on the provider chain will remove the validator from the validator set of all consumer chains.")),(0,a.kt)("p",null,"Minimal example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'{\n  "title": "Validator-1 double signed on consumerchain-1",\n  "description": "Here is more information about the infraction so you can verify it yourself",\n    // the list of equivocations that will be processed\n  "equivocations": [\n    {\n        "height": 14444680,\n        "time": "2023-02-28T20:40:00.000000Z",\n        "power": 5500000,\n        "consensus_address": "<consensus address ON THE PROVIDER>"\n    }\n  ]\n}\n')),(0,a.kt)("h3",{id:"notes"},"Notes"),(0,a.kt)("p",null,"When submitting equivocation evidence through an ",(0,a.kt)("inlineCode",{parentName:"p"},"EquivocationProposal")," please take note that you need to use the consensus address (",(0,a.kt)("inlineCode",{parentName:"p"},"valcons"),") of the offending validator on the ",(0,a.kt)("strong",{parentName:"p"},"provider chain"),".\nBesides that, the ",(0,a.kt)("inlineCode",{parentName:"p"},"height")," and the ",(0,a.kt)("inlineCode",{parentName:"p"},"time")," fields should be mapped to the ",(0,a.kt)("strong",{parentName:"p"},"provider chain")," to avoid your evidence being rejected."),(0,a.kt)("p",null,"Before submitting the proposal please check that the evidence is not outdated by comparing the infraction height with the ",(0,a.kt)("inlineCode",{parentName:"p"},"max_age_duration")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"max_age_num_blocks")," consensus parameters of the ",(0,a.kt)("strong",{parentName:"p"},"provider chain"),"."),(0,a.kt)("h3",{id:"gaia-example"},"Gaia example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'\u279c  ~ cat genesis.json | jq ".consensus_params"\n{\n  "block": {\n    ...\n  },\n  "evidence": {\n    "max_age_duration": "172800000000000",\n    "max_age_num_blocks": "1000000",\n    "max_bytes": "50000"\n  },\n  "validator": {\n    ...\n  },\n  "version": {}\n}\n')),(0,a.kt)("p",null,"Any ",(0,a.kt)("inlineCode",{parentName:"p"},"EquivocationProposal")," transactions that submit evidence with ",(0,a.kt)("inlineCode",{parentName:"p"},"height")," older than ",(0,a.kt)("inlineCode",{parentName:"p"},"max_age_num_blocks")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"time")," older than ",(0,a.kt)("inlineCode",{parentName:"p"},"max_age_duration")," will be considered invalid."))}u.isMDXComponent=!0}}]);