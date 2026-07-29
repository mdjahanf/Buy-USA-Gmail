function xt(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var X={exports:{}},A={exports:{}};A.exports;var Ce;function Ye(){return Ce||(Ce=1,(function(d,o){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){function _(e,t){Object.defineProperty(p.prototype,e,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})}function k(e){return e===null||typeof e!="object"?null:(e=fe&&e[fe]||e["@@iterator"],typeof e=="function"?e:null)}function v(e,t){e=(e=e.constructor)&&(e.displayName||e.name)||"ReactClass";var n=e+"."+t;de[n]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,e),de[n]=!0)}function p(e,t,n){this.props=e,this.context=t,this.refs=K,this.updater=n||he}function N(){}function g(e,t,n){this.props=e,this.context=t,this.refs=K,this.updater=n||he}function C(){}function $(e){return""+e}function w(e){try{$(e);var t=!1}catch{t=!0}if(t){t=console;var n=t.error,r=typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n.call(t,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",r),$(e)}}function j(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Le?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Q:return"Fragment";case se:return"Profiler";case ae:return"StrictMode";case ie:return"Suspense";case xe:return"SuspenseList";case le:return"Activity"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case oe:return"Portal";case ce:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case ue:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case V:return t=e.displayName||null,t!==null?t:j(e.type)||"Memo";case T:t=e._payload,e=e._init;try{return j(e(t))}catch{}}return null}function Z(e){if(e===Q)return"<>";if(typeof e=="object"&&e!==null&&e.$$typeof===T)return"<...>";try{var t=j(e);return t?"<"+t+">":"<...>"}catch{return"<...>"}}function J(){var e=u.A;return e===null?null:e.getOwner()}function ee(){return Error("react-stack-top-frame")}function te(e){if(q.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return e.key!==void 0}function Ae(e,t){function n(){ke||(ke=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",t))}n.isReactWarning=!0,Object.defineProperty(e,"key",{get:n,configurable:!0})}function Se(){var e=j(this.type);return ve[e]||(ve[e]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),e=this.props.ref,e!==void 0?e:null}function Y(e,t,n,r,a,i){var c=n.ref;return e={$$typeof:B,type:e,key:t,props:n,_owner:r},(c!==void 0?c:null)!==null?Object.defineProperty(e,"ref",{enumerable:!1,get:Se}):Object.defineProperty(e,"ref",{enumerable:!1,value:null}),e._store={},Object.defineProperty(e._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(e,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(e,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:a}),Object.defineProperty(e,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:i}),Object.freeze&&(Object.freeze(e.props),Object.freeze(e)),e}function Ne(e,t){return t=Y(e.type,t,e.props,e._owner,e._debugStack,e._debugTask),e._store&&(t._store.validated=e._store.validated),t}function ne(e){E(e)?e._store&&(e._store.validated=1):typeof e=="object"&&e!==null&&e.$$typeof===T&&(e._payload.status==="fulfilled"?E(e._payload.value)&&e._payload.value._store&&(e._payload.value._store.validated=1):e._store&&(e._store.validated=1))}function E(e){return typeof e=="object"&&e!==null&&e.$$typeof===B}function $e(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}function H(e,t){return typeof e=="object"&&e!==null&&e.key!=null?(w(e.key),$e(""+e.key)):t.toString(36)}function je(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(C,C):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function b(e,t,n,r,a){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var c=!1;if(e===null)c=!0;else switch(i){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case B:case oe:c=!0;break;case T:return c=e._init,b(c(e._payload),t,n,r,a)}}if(c){c=e,a=a(c);var f=r===""?"."+H(c,0):r;return ye(a)?(n="",f!=null&&(n=f.replace(we,"$&/")+"/"),b(a,t,n,"",function(m){return m})):a!=null&&(E(a)&&(a.key!=null&&(c&&c.key===a.key||w(a.key)),n=Ne(a,n+(a.key==null||c&&c.key===a.key?"":(""+a.key).replace(we,"$&/")+"/")+f),r!==""&&c!=null&&E(c)&&c.key==null&&c._store&&!c._store.validated&&(n._store.validated=2),a=n),t.push(a)),1}if(c=0,f=r===""?".":r+":",ye(e))for(var l=0;l<e.length;l++)r=e[l],i=f+H(r,l),c+=b(r,t,n,i,a);else if(l=k(e),typeof l=="function")for(l===e.entries&&(ge||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ge=!0),e=l.call(e),l=0;!(r=e.next()).done;)r=r.value,i=f+H(r,l++),c+=b(r,t,n,i,a);else if(i==="object"){if(typeof e.then=="function")return b(je(e),t,n,r,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function P(e,t,n){if(e==null)return e;var r=[],a=0;return b(e,r,"","",function(i){return t.call(n,i,a++)}),r}function Pe(e){if(e._status===-1){var t=e._ioInfo;t!=null&&(t.start=t.end=performance.now()),t=e._result;var n=t();if(n.then(function(a){if(e._status===0||e._status===-1){e._status=1,e._result=a;var i=e._ioInfo;i!=null&&(i.end=performance.now()),n.status===void 0&&(n.status="fulfilled",n.value=a)}},function(a){if(e._status===0||e._status===-1){e._status=2,e._result=a;var i=e._ioInfo;i!=null&&(i.end=performance.now()),n.status===void 0&&(n.status="rejected",n.reason=a)}}),t=e._ioInfo,t!=null){t.value=n;var r=n.displayName;typeof r=="string"&&(t.name=r)}e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return t=e._result,t===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,t),"default"in t||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,t),t.default;throw e._result}function h(){var e=u.H;return e===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),e}function re(){u.asyncTransitions--}function x(e){if(z===null)try{var t=("require"+Math.random()).slice(0,7);z=(d&&d[t]).call(d,"timers").setImmediate}catch{z=function(r){be===!1&&(be=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var a=new MessageChannel;a.port1.onmessage=r,a.port2.postMessage(void 0)}}return z(e)}function R(e){return 1<e.length&&typeof AggregateError=="function"?new AggregateError(e):e[0]}function L(e,t){t!==D-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),D=t}function I(e,t,n){var r=u.actQueue;if(r!==null)if(r.length!==0)try{W(r),x(function(){return I(e,t,n)});return}catch(a){u.thrownErrors.push(a)}else u.actQueue=null;0<u.thrownErrors.length?(r=R(u.thrownErrors),u.thrownErrors.length=0,n(r)):t(e)}function W(e){if(!F){F=!0;var t=0;try{for(;t<e.length;t++){var n=e[t];do{u.didUsePromise=!1;var r=n(!1);if(r!==null){if(u.didUsePromise){e[t]=n,e.splice(0,t);return}n=r}else break}while(!0)}e.length=0}catch(a){e.splice(0,t+1),u.thrownErrors.push(a)}finally{F=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var B=Symbol.for("react.transitional.element"),oe=Symbol.for("react.portal"),Q=Symbol.for("react.fragment"),ae=Symbol.for("react.strict_mode"),se=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),ce=Symbol.for("react.context"),ue=Symbol.for("react.forward_ref"),ie=Symbol.for("react.suspense"),xe=Symbol.for("react.suspense_list"),V=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),le=Symbol.for("react.activity"),fe=Symbol.iterator,de={},he={isMounted:function(){return!1},enqueueForceUpdate:function(e){v(e,"forceUpdate")},enqueueReplaceState:function(e){v(e,"replaceState")},enqueueSetState:function(e){v(e,"setState")}},pe=Object.assign,K={};Object.freeze(K),p.prototype.isReactComponent={},p.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var y={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]};for(O in y)y.hasOwnProperty(O)&&_(O,y[O]);N.prototype=p.prototype,y=g.prototype=new N,y.constructor=g,pe(y,p.prototype),y.isPureReactComponent=!0;var ye=Array.isArray,Le=Symbol.for("react.client.reference"),u={H:null,A:null,T:null,S:null,actQueue:null,asyncTransitions:0,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null,recentlyCreatedOwnerStacks:0},q=Object.prototype.hasOwnProperty,_e=console.createTask?console.createTask:function(){return null};y={react_stack_bottom_frame:function(e){return e()}};var ke,me,ve={},qe=y.react_stack_bottom_frame.bind(y,ee)(),ze=_e(Z(ee)),ge=!1,we=/\/+/g,Ee=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},be=!1,z=null,D=0,U=!1,F=!1,Me=typeof queueMicrotask=="function"?function(e){queueMicrotask(function(){return queueMicrotask(e)})}:x;y=Object.freeze({__proto__:null,c:function(e){return h().useMemoCache(e)}});var O={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(t){return t})||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};o.Activity=le,o.Children=O,o.Component=p,o.Fragment=Q,o.Profiler=se,o.PureComponent=g,o.StrictMode=ae,o.Suspense=ie,o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,o.__COMPILER_RUNTIME=y,o.act=function(e){var t=u.actQueue,n=D;D++;var r=u.actQueue=t!==null?t:[],a=!1;try{var i=e()}catch(l){u.thrownErrors.push(l)}if(0<u.thrownErrors.length)throw L(t,n),e=R(u.thrownErrors),u.thrownErrors.length=0,e;if(i!==null&&typeof i=="object"&&typeof i.then=="function"){var c=i;return Me(function(){a||U||(U=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(l,m){a=!0,c.then(function(M){if(L(t,n),n===0){try{W(r),x(function(){return I(M,l,m)})}catch(Ue){u.thrownErrors.push(Ue)}if(0<u.thrownErrors.length){var De=R(u.thrownErrors);u.thrownErrors.length=0,m(De)}}else l(M)},function(M){L(t,n),0<u.thrownErrors.length&&(M=R(u.thrownErrors),u.thrownErrors.length=0),m(M)})}}}var f=i;if(L(t,n),n===0&&(W(r),r.length!==0&&Me(function(){a||U||(U=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),u.actQueue=null),0<u.thrownErrors.length)throw e=R(u.thrownErrors),u.thrownErrors.length=0,e;return{then:function(l,m){a=!0,n===0?(u.actQueue=r,x(function(){return I(f,l,m)})):l(f)}}},o.cache=function(e){return function(){return e.apply(null,arguments)}},o.cacheSignal=function(){return null},o.captureOwnerStack=function(){var e=u.getCurrentStack;return e===null?null:e()},o.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=pe({},e.props),a=e.key,i=e._owner;if(t!=null){var c;e:{if(q.call(t,"ref")&&(c=Object.getOwnPropertyDescriptor(t,"ref").get)&&c.isReactWarning){c=!1;break e}c=t.ref!==void 0}c&&(i=J()),te(t)&&(w(t.key),a=""+t.key);for(f in t)!q.call(t,f)||f==="key"||f==="__self"||f==="__source"||f==="ref"&&t.ref===void 0||(r[f]=t[f])}var f=arguments.length-2;if(f===1)r.children=n;else if(1<f){c=Array(f);for(var l=0;l<f;l++)c[l]=arguments[l+2];r.children=c}for(r=Y(e.type,a,r,i,e._debugStack,e._debugTask),a=2;a<arguments.length;a++)ne(arguments[a]);return r},o.createContext=function(e){return e={$$typeof:ce,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:G,_context:e},e._currentRenderer=null,e._currentRenderer2=null,e},o.createElement=function(e,t,n){for(var r=2;r<arguments.length;r++)ne(arguments[r]);r={};var a=null;if(t!=null)for(l in me||!("__self"in t)||"key"in t||(me=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),te(t)&&(w(t.key),a=""+t.key),t)q.call(t,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(r[l]=t[l]);var i=arguments.length-2;if(i===1)r.children=n;else if(1<i){for(var c=Array(i),f=0;f<i;f++)c[f]=arguments[f+2];Object.freeze&&Object.freeze(c),r.children=c}if(e&&e.defaultProps)for(l in i=e.defaultProps,i)r[l]===void 0&&(r[l]=i[l]);a&&Ae(r,typeof e=="function"?e.displayName||e.name||"Unknown":e);var l=1e4>u.recentlyCreatedOwnerStacks++;return Y(e,a,r,J(),l?Error("react-stack-top-frame"):qe,l?_e(Z(e)):ze)},o.createRef=function(){var e={current:null};return Object.seal(e),e},o.forwardRef=function(e){e!=null&&e.$$typeof===V?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof e!="function"?console.error("forwardRef requires a render function but was given %s.",e===null?"null":typeof e):e.length!==0&&e.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",e.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),e!=null&&e.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var t={$$typeof:ue,render:e},n;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(r){n=r,e.name||e.displayName||(Object.defineProperty(e,"name",{value:r}),e.displayName=r)}}),t},o.isValidElement=E,o.lazy=function(e){e={_status:-1,_result:e};var t={$$typeof:T,_payload:e,_init:Pe},n={name:"lazy",start:-1,end:-1,value:null,owner:null,debugStack:Error("react-stack-top-frame"),debugTask:console.createTask?console.createTask("lazy()"):null};return e._ioInfo=n,t._debugInfo=[{awaited:n}],t},o.memo=function(e,t){e==null&&console.error("memo: The first argument must be a component. Instead received: %s",e===null?"null":typeof e),t={$$typeof:V,type:e,compare:t===void 0?null:t};var n;return Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(r){n=r,e.name||e.displayName||(Object.defineProperty(e,"name",{value:r}),e.displayName=r)}}),t},o.startTransition=function(e){var t=u.T,n={};n._updatedFibers=new Set,u.T=n;try{var r=e(),a=u.S;a!==null&&a(n,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&(u.asyncTransitions++,r.then(re,re),r.then(C,Ee))}catch(i){Ee(i)}finally{t===null&&n._updatedFibers&&(e=n._updatedFibers.size,n._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),t!==null&&n.types!==null&&(t.types!==null&&t.types!==n.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),t.types=n.types),u.T=t}},o.unstable_useCacheRefresh=function(){return h().useCacheRefresh()},o.use=function(e){return h().use(e)},o.useActionState=function(e,t,n){return h().useActionState(e,t,n)},o.useCallback=function(e,t){return h().useCallback(e,t)},o.useContext=function(e){var t=h();return e.$$typeof===G&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),t.useContext(e)},o.useDebugValue=function(e,t){return h().useDebugValue(e,t)},o.useDeferredValue=function(e,t){return h().useDeferredValue(e,t)},o.useEffect=function(e,t){return e==null&&console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"),h().useEffect(e,t)},o.useEffectEvent=function(e){return h().useEffectEvent(e)},o.useId=function(){return h().useId()},o.useImperativeHandle=function(e,t,n){return h().useImperativeHandle(e,t,n)},o.useInsertionEffect=function(e,t){return e==null&&console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"),h().useInsertionEffect(e,t)},o.useLayoutEffect=function(e,t){return e==null&&console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"),h().useLayoutEffect(e,t)},o.useMemo=function(e,t){return h().useMemo(e,t)},o.useOptimistic=function(e,t){return h().useOptimistic(e,t)},o.useReducer=function(e,t,n){return h().useReducer(e,t,n)},o.useRef=function(e){return h().useRef(e)},o.useState=function(e){return h().useState(e)},o.useSyncExternalStore=function(e,t,n){return h().useSyncExternalStore(e,t,n)},o.useTransition=function(){return h().useTransition()},o.version="19.2.8",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()})(A,A.exports)),A.exports}var Re;function He(){return Re||(Re=1,X.exports=Ye()),X.exports}var S=He();/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=d=>d.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),We=d=>d.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,_,k)=>k?k.toUpperCase():_.toLowerCase()),Te=d=>{const o=We(d);return o.charAt(0).toUpperCase()+o.slice(1)},Oe=(...d)=>d.filter((o,_,k)=>!!o&&o.trim()!==""&&k.indexOf(o)===_).join(" ").trim(),Be=d=>{for(const o in d)if(o.startsWith("aria-")||o==="role"||o==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Qe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=S.forwardRef(({color:d="currentColor",size:o=24,strokeWidth:_=2,absoluteStrokeWidth:k,className:v="",children:p,iconNode:N,...g},C)=>S.createElement("svg",{ref:C,...Qe,width:o,height:o,stroke:d,strokeWidth:k?Number(_)*24/Number(o):_,className:Oe("lucide",v),...!p&&!Be(g)&&{"aria-hidden":"true"},...g},[...N.map(([$,w])=>S.createElement($,w)),...Array.isArray(p)?p:[p]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=(d,o)=>{const _=S.forwardRef(({className:k,...v},p)=>S.createElement(Ge,{ref:p,iconNode:o,className:Oe(`lucide-${Ie(Te(d))}`,`lucide-${d}`,k),...v}));return _.displayName=Te(d),_};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Lt=s("arrow-left",Ve);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],qt=s("arrow-right",Ke);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],zt=s("award",Fe);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Dt=s("book-open",Xe);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],Ut=s("calculator",Ze);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Yt=s("calendar",Je);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ht=s("check",et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],It=s("chevron-down",tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Wt=s("chevron-right",nt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Bt=s("circle-alert",rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Qt=s("circle-check",ot);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Gt=s("circle-question-mark",at);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Vt=s("circle-x",st);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Kt=s("clock",ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],Ft=s("copy",ut);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Xt=s("external-link",it);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Zt=s("globe",lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Jt=s("lock",ft);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],en=s("mail",dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],tn=s("menu",ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],nn=s("message-circle",pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],rn=s("phone",yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],on=s("printer",_t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]],an=s("qr-code",kt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]],sn=s("quote",mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],cn=s("refresh-cw",vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],un=s("search",gt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],ln=s("send",wt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],fn=s("share-2",Et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],dn=s("shield-alert",bt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],hn=s("shield-check",Mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]],pn=s("shopping-bag",Ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],yn=s("smartphone",Rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],_n=s("sparkles",Tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],kn=s("star",Ot);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],mn=s("trending-up",At);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],vn=s("triangle-alert",St);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],gn=s("upload",Nt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],wn=s("user",$t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],En=s("x",jt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],bn=s("zap",Pt);export{qt as A,Dt as B,It as C,dn as D,Xt as E,xt as F,Zt as G,an as H,Jt as L,tn as M,rn as P,sn as Q,cn as R,pn as S,mn as T,gn as U,En as X,bn as Z,S as a,kn as b,yn as c,hn as d,Qt as e,ln as f,nn as g,en as h,Ht as i,Lt as j,Ft as k,vn as l,on as m,Vt as n,Kt as o,Bt as p,Gt as q,He as r,_n as s,Ut as t,zt as u,un as v,wn as w,Wt as x,Yt as y,fn as z};
