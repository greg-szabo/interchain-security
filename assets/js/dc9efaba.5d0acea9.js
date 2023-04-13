"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[324],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(r),d=o,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||i;return r?n.createElement(f,a(a({ref:t},p),{},{components:r})):n.createElement(f,a({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5224:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(7462),o=(r(7294),r(3905));const i={sidebar_position:5,title:"Offboarding Checklist"},a="Consumer Offboarding",s={unversionedId:"consumer-development/offboarding",id:"consumer-development/offboarding",title:"Offboarding Checklist",description:"To offboard a consumer chain simply submit a ConsumerRemovalProposal governance proposal listing a stop_time. After stop time passes, the provider chain will remove the chain from the ICS protocol (it will stop sending validator set updates).",source:"@site/docs/consumer-development/offboarding.md",sourceDirName:"consumer-development",slug:"/consumer-development/offboarding",permalink:"/interchain-security/consumer-development/offboarding",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Offboarding Checklist"},sidebar:"tutorialSidebar",previous:{title:"Onboarding Checklist",permalink:"/interchain-security/consumer-development/onboarding"},next:{title:"Overview",permalink:"/interchain-security/validators/overview"}},c={},l=[],p={toc:l},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"consumer-offboarding"},"Consumer Offboarding"),(0,o.kt)("p",null,"To offboard a consumer chain simply submit a ",(0,o.kt)("inlineCode",{parentName:"p"},"ConsumerRemovalProposal")," governance proposal listing a ",(0,o.kt)("inlineCode",{parentName:"p"},"stop_time"),". After stop time passes, the provider chain will remove the chain from the ICS protocol (it will stop sending validator set updates)."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// ConsumerRemovalProposal is a governance proposal on the provider chain to remove (and stop) a consumer chain.\n// If it passes, all the consumer chain\'s state is removed from the provider chain. The outstanding unbonding\n// operation funds are released.\n{\n    // the title of the proposal\n    "title": "This was a great chain",\n    "description": "Here is a .md formatted string specifying removal details",\n    // the chain-id of the consumer chain to be stopped\n    "chain_id": "consumerchain-1",\n    // the time on the provider chain at which all validators are responsible to stop their consumer chain validator node\n    "stop_time": "2023-03-07T12:40:00.000000Z",\n}\n')),(0,o.kt)("p",null,"More information will be listed in a future version of this document."))}m.isMDXComponent=!0}}]);