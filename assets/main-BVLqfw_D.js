(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Ve=new WeakMap,U=t=>(...e)=>{const n=t(...e);return Ve.set(n,!0),n},T=t=>typeof t=="function"&&Ve.has(t);/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const le=typeof window<"u"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,Le=(t,e,n=null)=>{for(;e!==n;){const r=e.nextSibling;t.removeChild(e),e=r}};/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const _={},fe={};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const N=`{{lit-${String(Math.random()).slice(2)}}}`,je=`<!--${N}-->`,de=new RegExp(`${N}|${je}`),P="$lit$";class nt{constructor(e,n){this.parts=[],this.element=n;const r=[],i=[],o=document.createTreeWalker(n.content,133,null,!1);let s=0,c=-1,a=0;const{strings:u,values:{length:p}}=e;for(;a<p;){const l=o.nextNode();if(l===null){o.currentNode=i.pop();continue}if(c++,l.nodeType===1){if(l.hasAttributes()){const h=l.attributes,{length:y}=h;let v=0;for(let d=0;d<y;d++)pe(h[d].name,P)&&v++;for(;v-- >0;){const d=u[a],m=Q.exec(d)[2],f=m.toLowerCase()+P,g=l.getAttribute(f);l.removeAttribute(f);const b=g.split(de);this.parts.push({type:"attribute",index:c,name:m,strings:b}),a+=b.length-1}}l.tagName==="TEMPLATE"&&(i.push(l),o.currentNode=l.content)}else if(l.nodeType===3){const h=l.data;if(h.indexOf(N)>=0){const y=l.parentNode,v=h.split(de),d=v.length-1;for(let m=0;m<d;m++){let f,g=v[m];if(g==="")f=E();else{const b=Q.exec(g);b!==null&&pe(b[2],P)&&(g=g.slice(0,b.index)+b[1]+b[2].slice(0,-P.length)+b[3]),f=document.createTextNode(g)}y.insertBefore(f,l),this.parts.push({type:"node",index:++c})}v[d]===""?(y.insertBefore(E(),l),r.push(l)):l.data=v[d],a+=d}}else if(l.nodeType===8)if(l.data===N){const h=l.parentNode;(l.previousSibling===null||c===s)&&(c++,h.insertBefore(E(),l)),s=c,this.parts.push({type:"node",index:c}),l.nextSibling===null?l.data="":(r.push(l),c--),a++}else{let h=-1;for(;(h=l.data.indexOf(N,h+1))!==-1;)this.parts.push({type:"node",index:-1}),a++}}for(const l of r)l.parentNode.removeChild(l)}}const pe=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},rt=t=>t.index!==-1,E=()=>document.createComment(""),Q=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class he{constructor(e,n,r){this.__parts=[],this.template=e,this.processor=n,this.options=r}update(e){let n=0;for(const r of this.__parts)r!==void 0&&r.setValue(e[n]),n++;for(const r of this.__parts)r!==void 0&&r.commit()}_clone(){const e=le?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],r=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let o=0,s=0,c,a=i.nextNode();for(;o<r.length;){if(c=r[o],!rt(c)){this.__parts.push(void 0),o++;continue}for(;s<c.index;)s++,a.nodeName==="TEMPLATE"&&(n.push(a),i.currentNode=a.content),(a=i.nextNode())===null&&(i.currentNode=n.pop(),a=i.nextNode());if(c.type==="node"){const u=this.processor.handleTextExpression(this.options);u.insertAfterNode(a.previousSibling),this.__parts.push(u)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,c.name,c.strings,this.options));o++}return le&&(document.adoptNode(e),customElements.upgrade(e)),e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const me=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),it=` ${N} `;class ke{constructor(e,n,r,i){this.strings=e,this.values=n,this.type=r,this.processor=i}getHTML(){const e=this.strings.length-1;let n="",r=!1;for(let i=0;i<e;i++){const o=this.strings[i],s=o.lastIndexOf("<!--");r=(s>-1||r)&&o.indexOf("-->",s+1)===-1;const c=Q.exec(o);c===null?n+=o+(r?it:je):n+=o.substr(0,c.index)+c[1]+c[2]+P+c[3]+N}return n+=this.strings[e],n}getTemplateElement(){const e=document.createElement("template");let n=this.getHTML();return me!==void 0&&(n=me.createHTML(n)),e.innerHTML=n,e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const ne=t=>t===null||!(typeof t=="object"||typeof t=="function"),Z=t=>Array.isArray(t)||!!(t&&t[Symbol.iterator]);class $e{constructor(e,n,r){this.dirty=!0,this.element=e,this.name=n,this.strings=r,this.parts=[];for(let i=0;i<r.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new re(this)}_getValue(){const e=this.strings,n=e.length-1,r=this.parts;if(n===1&&e[0]===""&&e[1]===""){const o=r[0].value;if(typeof o=="symbol")return String(o);if(typeof o=="string"||!Z(o))return o}let i="";for(let o=0;o<n;o++){i+=e[o];const s=r[o];if(s!==void 0){const c=s.value;if(ne(c)||!Z(c))i+=typeof c=="string"?c:String(c);else for(const a of c)i+=typeof a=="string"?a:String(a)}}return i+=e[n],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class re{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==_&&(!ne(e)||e!==this.value)&&(this.value=e,T(e)||(this.committer.dirty=!0))}commit(){for(;T(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class W{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(E()),this.endNode=e.appendChild(E())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=E()),e.__insert(this.endNode=E())}insertAfterPart(e){e.__insert(this.startNode=E()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;T(this.__pendingValue);){const n=this.__pendingValue;this.__pendingValue=_,n(this)}const e=this.__pendingValue;e!==_&&(ne(e)?e!==this.value&&this.__commitText(e):e instanceof ke?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):Z(e)?this.__commitIterable(e):e===fe?(this.value=fe,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const n=this.startNode.nextSibling;e=e??"";const r=typeof e=="string"?e:String(e);n===this.endNode.previousSibling&&n.nodeType===3?n.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const n=this.options.templateFactory(e);if(this.value instanceof he&&this.value.template===n)this.value.update(e.values);else{const r=new he(n,e.processor,this.options),i=r._clone();r.update(e.values),this.__commitNode(i),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const n=this.value;let r=0,i;for(const o of e)i=n[r],i===void 0&&(i=new W(this.options),n.push(i),r===0?i.appendIntoPart(this):i.insertAfterPart(n[r-1])),i.setValue(o),i.commit(),r++;r<n.length&&(n.length=r,this.clear(i&&i.endNode))}clear(e=this.startNode){Le(this.startNode.parentNode,e.nextSibling,this.endNode)}}class ot{constructor(e,n,r){if(this.value=void 0,this.__pendingValue=void 0,r.length!==2||r[0]!==""||r[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=n,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;T(this.__pendingValue);){const n=this.__pendingValue;this.__pendingValue=_,n(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class st extends $e{constructor(e,n,r){super(e,n,r),this.single=r.length===2&&r[0]===""&&r[1]===""}_createPart(){return new Be(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class Be extends re{}let Fe=!1;(()=>{try{const t={get capture(){return Fe=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{}})();class at{constructor(e,n,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=n,this.eventContext=r,this.__boundHandleEvent=i=>this.handleEvent(i)}setValue(e){this.__pendingValue=e}commit(){for(;T(this.__pendingValue);){const o=this.__pendingValue;this.__pendingValue=_,o(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,n=this.value,r=e==null||n!=null&&(e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive),i=e!=null&&(n==null||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=ct(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const ct=t=>t&&(Fe?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class ut{handleAttributeExpressions(e,n,r,i){const o=n[0];return o==="."?new st(e,n.slice(1),r).parts:o==="@"?[new at(e,n.slice(1),i.eventContext)]:o==="?"?[new ot(e,n.slice(1),r)]:new $e(e,n,r).parts}handleTextExpression(e){return new W(e)}}const lt=new ut;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function ft(t){let e=ve.get(t.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},ve.set(t.type,e));let n=e.stringsArray.get(t.strings);if(n!==void 0)return n;const r=t.strings.join(N);return n=e.keyString.get(r),n===void 0&&(n=new nt(t,t.getTemplateElement()),e.keyString.set(r,n)),e.stringsArray.set(t.strings,n),n}const ve=new Map;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const ge=new WeakMap,dt=(t,e,n)=>{let r=ge.get(e);r===void 0&&(Le(e,e.firstChild),ge.set(e,r=new W(Object.assign({templateFactory:ft},n))),r.appendInto(e)),r.setValue(t),r.commit()};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */typeof window<"u"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const C=(t,...e)=>new ke(t,e,"html",lt);/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const ye=new WeakMap,ee=U(t=>e=>{if(!(e instanceof re)||e instanceof Be||e.committer.name!=="style"||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:n}=e,{style:r}=n.element;let i=ye.get(e);i===void 0&&(r.cssText=n.strings.join(" "),ye.set(e,i=new Set)),i.forEach(o=>{o in t||(i.delete(o),o.indexOf("-")===-1?r[o]=null:r.removeProperty(o))});for(const o in t)i.add(o),o.indexOf("-")===-1?r[o]=t[o]:r.setProperty(o,t[o])}),L=new WeakMap,be=new WeakMap;let we=new WeakMap,xe=new WeakMap;const De=(t,e={})=>U((n,...r)=>i=>{L.has(i)||(L.set(i,e),we.set(i,Math.floor(Math.random()*1e4)),be.set(i,t()));const o=()=>L.get(i),s=a=>{const u={...o(),...a};L.set(i,u),c()},c=()=>{const a=be.get(i)(n,r,o,s);xe.get(i)!==a&&(a&&a.nodeName&&a.nodeName==="CANVAS"&&console.log("Not equal",we.get(i),a),i.setValue(a),i.commit(),xe.set(i,a))};c()}),_e=U(t=>e=>{e.setValue(t),e.commit()}),pt=t=>{if(t.onbeforeinput===void 0){let e=null;Object.defineProperty(t,"onbeforeinput",{get(){return e},set(n){n!==e&&(typeof e=="function"&&t.removeEventListener("beforeinput",e),typeof n=="function"&&t.addEventListener("beforeinput",n),e=n)}})}return t},K=new WeakMap,Ee=U(({value:t,onInput:e=()=>{}})=>n=>{if(!K.has(n)){const u=pt(document.createElement("input"));u.setAttribute("type","text"),K.set(n,{input:u,lastSetValue:void 0}),n.setValue(u)}typeof t!="number"&&(t=NaN);let r={value:null,selectionStart:null,selectionEnd:null};const i=u=>{r.value=u.target.value,r.selectionStart=u.target.selectionStart,r.selectionEnd=u.target.selectionEnd},o=(u,p)=>{u!==t&&e({value:u,event:p})},s=u=>{const{target:p}=u;!u.target.value&&document.activeElement===u.target||(/^(-)?(\d+|\d*\.\d+|\d+\.\d*)$/.test(p.value)?o(parseFloat(p.value),u):(p.value=r.value,p.focus(),p.setSelectionRange(r.selectionStart,r.selectionEnd)))},c=u=>{u.target.value||(u.target.value=0,o(0,u))},a=K.get(n);parseFloat(a.input.value)!==t&&a.lastSetValue!==t&&(a.input.value=t,a.lastSetValue=t),a.input.onbeforeinput=i,a.input.oninput=s,a.input.onblur=c}),ht=({length:t,speed:e,onUpdate:n=()=>{},onRemove:r=()=>{}})=>{const i=o=>s=>n({name:o,value:s.value});return C`
        <div style=${ee({display:"flex",justifyContent:"center"})}>
            <label>Length ${Ee({value:t,onInput:i("length")})}</label>
            <label>Speed ${Ee({value:e,onInput:i("speed")})}</label>
            <button type="button" @click=${r}>X</button>
        </div>
    `},mt=({lineDefinitionConfig:t,onAdd:e,onRemove:n,onUpdate:r})=>C`
        <div>
            <div>
                <button type="button" @click=${e}>Add</button>
            </div>
            <div>
                ${t.map(({length:i,speed:o,id:s})=>ht({length:i,speed:o,onUpdate:({name:c,value:a})=>r({id:s,fieldName:c,value:a}),onRemove:()=>n({id:s})}))}
            </div>
        </div>
    `,vt={position:"absolute",top:0,left:0,zIndex:999,backgroundColor:"white"},gt=De(()=>(t,[],e,n)=>{const{speed:r=1,optionsConfig:i,maxPoints:o=1e3,onUpdateField:s,handleSubmit:c,addOption:a=()=>{},removeOption:u=({id:v})=>{},updateOption:p=({id:v,fieldName:d,value:m})=>{}}=t,{open:l}=e(),h=v=>d=>s(v,d.target.value),y=v=>{v.preventDefault(),c()};return C`
        <div style=${ee(vt)}>
            <div>
                <button @click=${()=>n({open:!l})} type="button">${l?"-":"+"}</button>
            </div>
            <form style=${ee({display:l?"block":"none"})} @submit=${y} novalidate>
                <label>
                    Speed: (${Math.floor(r*100)})<br>
                    <input type="range" min="0" max="1" step=".01" .value=${_e(r)} @input=${h("speed")}>
                </label>
                <br>
                <label>
                    Max Points (${o}) <br>
                    <input type="range" min="1000" max="50000" step="2" .value=${_e(o)} @input=${h("maxPoints")}>
                </label>
                <br />
                Options: <br>
                ${mt({lineDefinitionConfig:i,onAdd:a,onRemove:u,onUpdate:p})}

                <button type="submit">Start</button>
            </form>
        </div>
        `},{open:!0});function R(t){"@babel/helpers - typeof";return R=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(t)}function yt(t,e){if(R(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(R(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function bt(t){var e=yt(t,"string");return R(e)=="symbol"?e:e+""}function wt(t,e,n){return(e=bt(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ne(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,r)}return n}function Oe(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Ne(Object(n),!0).forEach(function(r){wt(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ne(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function w(t){return"Minified Redux error #"+t+"; visit https://redux.js.org/Errors?code="+t+" for the full message or use the non-minified dev environment for full errors. "}var Pe=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}(),z=function(){return Math.random().toString(36).substring(7).split("").join(".")},B={INIT:"@@redux/INIT"+z(),REPLACE:"@@redux/REPLACE"+z(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+z()}};function xt(t){if(typeof t!="object"||t===null)return!1;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function Ue(t,e,n){var r;if(typeof e=="function"&&typeof n=="function"||typeof n=="function"&&typeof arguments[3]=="function")throw new Error(w(0));if(typeof e=="function"&&typeof n>"u"&&(n=e,e=void 0),typeof n<"u"){if(typeof n!="function")throw new Error(w(1));return n(Ue)(t,e)}if(typeof t!="function")throw new Error(w(2));var i=t,o=e,s=[],c=s,a=!1;function u(){c===s&&(c=s.slice())}function p(){if(a)throw new Error(w(3));return o}function l(d){if(typeof d!="function")throw new Error(w(4));if(a)throw new Error(w(5));var m=!0;return u(),c.push(d),function(){if(m){if(a)throw new Error(w(6));m=!1,u();var g=c.indexOf(d);c.splice(g,1),s=null}}}function h(d){if(!xt(d))throw new Error(w(7));if(typeof d.type>"u")throw new Error(w(8));if(a)throw new Error(w(9));try{a=!0,o=i(o,d)}finally{a=!1}for(var m=s=c,f=0;f<m.length;f++){var g=m[f];g()}return d}function y(d){if(typeof d!="function")throw new Error(w(10));i=d,h({type:B.REPLACE})}function v(){var d,m=l;return d={subscribe:function(g){if(typeof g!="object"||g===null)throw new Error(w(11));function b(){g.next&&g.next(p())}b();var x=m(b);return{unsubscribe:x}}},d[Pe]=function(){return this},d}return h({type:B.INIT}),r={dispatch:h,subscribe:l,getState:p,replaceReducer:y},r[Pe]=v,r}function _t(t){Object.keys(t).forEach(function(e){var n=t[e],r=n(void 0,{type:B.INIT});if(typeof r>"u")throw new Error(w(12));if(typeof n(void 0,{type:B.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(w(13))})}function Et(t){for(var e=Object.keys(t),n={},r=0;r<e.length;r++){var i=e[r];typeof t[i]=="function"&&(n[i]=t[i])}var o=Object.keys(n),s;try{_t(n)}catch(c){s=c}return function(a,u){if(a===void 0&&(a={}),s)throw s;for(var p=!1,l={},h=0;h<o.length;h++){var y=o[h],v=n[y],d=a[y],m=v(d,u);if(typeof m>"u")throw u&&u.type,new Error(w(14));l[y]=m,p=p||m!==d}return p=p||o.length!==Object.keys(a).length,p?l:a}}function Nt(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.length===0?function(r){return r}:e.length===1?e[0]:e.reduce(function(r,i){return function(){return r(i.apply(void 0,arguments))}})}function Ot(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return function(){var i=r.apply(void 0,arguments),o=function(){throw new Error(w(15))},s={getState:i.getState,dispatch:function(){return o.apply(void 0,arguments)}},c=e.map(function(a){return a(s)});return o=Nt.apply(void 0,c)(i.dispatch),Oe(Oe({},i),{},{dispatch:o})}}}const Pt="BATCHING_REDUCER.BATCH";function St(t,e=Pt){return{type:e,meta:{batch:!0},payload:t}}function At(t){function e(n,r){r.meta&&r.meta.batch?r.payload.forEach(function(i){e(n,i)}):n.dispatch(r)}return function(n){return function(r){return r&&r.meta&&r.meta.batch&&e(t,r),n(r)}}}function We(t){var e=function(r){var i=r.dispatch,o=r.getState;return function(s){return function(c){return typeof c=="function"?c(i,o,t):s(c)}}};return e}var qe=We();qe.withExtraArgument=We;function He(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var G,Se;function Tt(){if(Se)return G;Se=1;var t=function(e,n,r,i,o,s,c,a){if(!e){var u;if(n===void 0)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[r,i,o,s,c,a],l=0;u=new Error(n.replace(/%s/g,function(){return p[l++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}};return G=t,G}var Rt=Tt();const F=He(Rt),D=function(t){return typeof t=="function"},Ae=function(t){return t.toString()};var Ct="/",$="||";const A=function(t){return t},Te=function(t){return t===null};function O(t,e,n){e===void 0&&(e=A),F(D(e)||Te(e),"Expected payloadCreator to be a function, undefined or null");var r=Te(e)||e===A?A:function(c){for(var a=arguments.length,u=new Array(a>1?a-1:0),p=1;p<a;p++)u[p-1]=arguments[p];return c instanceof Error?c:e.apply(void 0,[c].concat(u))},i=D(n),o=t.toString(),s=function(){var a=r.apply(void 0,arguments),u={type:t};return a instanceof Error&&(u.error=!0),a!==void 0&&(u.payload=a),i&&(u.meta=n.apply(void 0,arguments)),u};return s.toString=function(){return o},s}const ie=function(t){if(typeof t!="object"||t===null)return!1;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e},Mt=function(t){return t==null},q=function(t){return typeof Map<"u"&&t instanceof Map};function oe(t){if(q(t))return Array.from(t.keys());if(typeof Reflect<"u"&&typeof Reflect.ownKeys=="function")return Reflect.ownKeys(t);var e=Object.getOwnPropertyNames(t);return typeof Object.getOwnPropertySymbols=="function"&&(e=e.concat(Object.getOwnPropertySymbols(t))),e}function Ke(t,e){return q(e)?e.get(t):e[t]}const It=function(t){return function e(n,r,i,o){var s=r===void 0?{}:r,c=s.namespace,a=c===void 0?Ct:c,u=s.prefix;i===void 0&&(i={}),o===void 0&&(o="");function p(h){var y;if(!o)return h;var v=h.toString().split($),d=o.split($);return(y=[]).concat.apply(y,d.map(function(m){return v.map(function(f){return""+m+a+f})})).join($)}function l(h){return o||!u||u&&new RegExp("^"+u+a).test(h)?h:""+u+a+h}return oe(n).forEach(function(h){var y=l(p(h)),v=Ke(h,n);t(v)?e(v,{namespace:a,prefix:u},i,y):i[y]=v}),i}},Vt=function(t){return t===void 0};function Lt(t,e,n){e===void 0&&(e=A);var r=Ae(t).split($);F(!Vt(n),"defaultState for reducer handling "+r.join(", ")+" should be defined"),F(D(e)||ie(e),"Expected reducer to be a function or object with next and throw reducers");var i=D(e)?[e,e]:[e.next,e.throw].map(function(c){return Mt(c)?A:c}),o=i[0],s=i[1];return function(c,a){c===void 0&&(c=n);var u=a.type;return!u||r.indexOf(Ae(u))===-1?c:(a.error===!0?s:o)(c,a)}}const jt=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=typeof e[e.length-1]!="function"&&e.pop(),i=e;if(typeof r>"u")throw new TypeError("The initial state may not be undefined. If you do not want to set a value for this reducer, you can use null instead of undefined.");return function(o,s){for(var c=arguments.length,a=Array(c>2?c-2:0),u=2;u<c;u++)a[u-2]=arguments[u];var p=typeof o>"u",l=typeof s>"u";return p&&l&&r?r:i.reduce(function(h,y){return y.apply(void 0,[h,s].concat(a))},p&&!l&&r?r:o)}};function kt(t){var e=oe(t),n=e.every(function(r){return r==="next"||r==="throw"});return e.length&&e.length<=2&&n}const $t=It(function(t){return(ie(t)||q(t))&&!kt(t)});function ze(t,e,n){n===void 0&&(n={}),F(ie(t)||q(t),"Expected handlers to be a plain object.");var r=$t(t,n),i=oe(r).map(function(s){return Lt(s,Ke(s,r),e)}),o=jt.apply(void 0,i.concat([e]));return function(s,c){return s===void 0&&(s=e),o(s,c)}}var j={exports:{}},Re;function Bt(){if(Re)return j.exports;Re=1;var t=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof window.msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto);if(t){var e=new Uint8Array(16);j.exports=function(){return t(e),e}}else{var n=new Array(16);j.exports=function(){for(var i=0,o;i<16;i++)(i&3)===0&&(o=Math.random()*4294967296),n[i]=o>>>((i&3)<<3)&255;return n}}return j.exports}var Y,Ce;function Ft(){if(Ce)return Y;Ce=1;for(var t=[],e=0;e<256;++e)t[e]=(e+256).toString(16).substr(1);function n(r,i){var o=i||0,s=t;return[s[r[o++]],s[r[o++]],s[r[o++]],s[r[o++]],"-",s[r[o++]],s[r[o++]],"-",s[r[o++]],s[r[o++]],"-",s[r[o++]],s[r[o++]],"-",s[r[o++]],s[r[o++]],s[r[o++]],s[r[o++]],s[r[o++]],s[r[o++]]].join("")}return Y=n,Y}var X,Me;function Dt(){if(Me)return X;Me=1;var t=Bt(),e=Ft();function n(r,i,o){var s=i&&o||0;typeof r=="string"&&(i=r==="binary"?new Array(16):null,r=null),r=r||{};var c=r.random||(r.rng||t)();if(c[6]=c[6]&15|64,c[8]=c[8]&63|128,i)for(var a=0;a<16;++a)i[s+a]=c[a];return i||e(c)}return X=n,X}var Ut=Dt();const S=He(Ut);function Ge(t){return t*(Math.PI/180)}const Wt={speed:1,optionsConfig:[{id:S(),length:50,speed:-3.01},{id:S(),length:10,speed:10.01},{id:S(),length:100,speed:1},{id:S(),length:20,speed:0}],maxPoints:2236},H="lineDrawer/optionsForm",Ye=O(`${H}/UPDATE_FIELD`),Xe=O(`${H}/OPTION/ADD`),Je=O(`${H}/OPTION/UPDATE`),Qe=O(`${H}/OPTION/REMOVE`),qt=ze({[Ye]:(t,{payload:e})=>({...t,[e.field]:e.value}),[Xe]:t=>({...t,optionsConfig:[...t.optionsConfig,{uuid:S(),length:1,speed:1}]}),[Je]:(t,{payload:e})=>({...t,optionsConfig:t.optionsConfig.map(n=>n.id===e.id?{...n,[e.fieldName]:e.value}:n)}),[Qe]:(t,{payload:e})=>({...t,optionsConfig:t.optionsConfig.filter(n=>n.id!==e.id)})},Wt);function M(t,e){return{x:t,y:e}}function Ht({x:t,y:e},n){return M(t*Math.cos(n)-e*Math.sin(n),t*Math.sin(n)+e*Math.cos(n))}function Kt(...t){return t.reduce((e,n)=>M(e.x+n.x,e.y+n.y))}function zt({x:t,y:e}){return M(Math.floor(t),Math.floor(e))}const Gt={linkConfig:[],links:[],path:[]},se=O("lineDrawer/Link/APPLY_LINK_CONFIG"),Yt=O("lineDrawer/Link/SET_LINK_ROTATION"),ae=O("lineDrawer/Link/SET_PATHS"),Xt=ze({[se]:(t,{payload:e})=>({...t,linkConfig:[...e],links:e.map(({length:n})=>M(n,0))}),[Yt]:(t,{payload:e})=>({...t,links:[...e]}),[ae]:(t,{payload:e})=>({...t,path:e})},Gt),Jt=Et({linkReducer:Xt,optionFormReducer:qt}),te=Ue(Jt,Ot(qe,At)),Qt=t=>e=>(n,...r)=>{const i=t(te.getState()),o={...n,...i,dispatch:te.dispatch};return e(o,...r)};function Zt(t,e){const n={min:100,max:1e4};return(r,i)=>{const{linkReducer:{path:o,linkConfig:s,links:c},optionFormReducer:{speed:a,maxPoints:u}}=i();let p=[...o];const l=n.min+(n.max-n.min)*a,h=Math.floor(t/1e3*l);let y=s.map(v=>{if(v.modifier){const d={...v,...v.modifier(v,e)};return d.speedRad=Ge(d.speed),d}return v});for(let v=0;v<h;v++){y=y.map(m=>({...m,rotation:m.rotation+m.speedRad}));const d=y.map(m=>Ht(M(m.length,0),m.rotation));p.push(zt(Kt(...d)))}r(St([se(y),ae(p.slice(-u))]))}}const ce=document.createElement("input");document.body.appendChild(ce);Object.assign(ce.style,{position:"absolute",bottom:0,right:0,zIndex:999});let Ie=new Array(15).fill(0),J=0;function en(t){J+=t,Ie.push(t),J-=Ie.shift(t),ce.value=Math.round(J/15)}let k;function tn({speed:t,options:e,optionsConfig:n}){return(r,i)=>{k&&cancelAnimationFrame(k);const o=n.map(a=>({...a,speedRad:Ge(a.speed),rotation:0}));r(se(o)),r(ae([]));let s;k=requestAnimationFrame(c);function c(a){let u=a-s||0;en(1e3/(u||1)),r(Zt(u,a)),s=a,k=requestAnimationFrame(c)}}}function nn(){const t=document.createElement("canvas");return Object.assign(t.style,{}),window.addEventListener("resize",()=>{console.log("resize")}),t}function rn(t,e,n={},r="2d"){const i=new Blob([`
        const FpsTracker = (callback, debounceIterations=15) => {
            let arr = [];
            let lastTime;
            return (time) => {
                if (typeof time !== 'number') return;
                if (!lastTime) lastTime = time;
                let detla = time - lastTime;
                arr.push(time - lastTime);
                if (arr.length === debounceIterations) {
                    const fps = 1000 / (arr.reduce((a, b) => a + b) / debounceIterations);
                    callback(fps);
                    arr = [];
                }
                lastTime = time;
            };
        }
        const method = ${t.toString()};
        let state = {};
        let cvs;
        let ctx;
        let tracker = FpsTracker(console.log, 15);
        const handlers = {
            canvas: ({ canvas }) => {
                cvs = canvas;
                ctx = cvs.getContext('${r}', ${JSON.stringify(n)});
                  canvas.width=500
                  canvas.height=500
                ctx.imageSmoothingEnabled = false;
                console.log(ctx);
                const mname = method(ctx);
                const animate = (time) => {
                    if (state.width && canvas.width !== state.width) {
                        canvas.width = state.width;
                    }
                    if (state.height && canvas.height !== state.height) {
                        canvas.height = state.height;
                    }
                    // tracker(time);
                    mname(ctx, state);
                    requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            },
            setState: (newState) => {
                state = { ...state, ...newState };
            }
        };
        onmessage = event => handlers[event.data.type](event.data.payload);
    `],{type:"application/javascript"}),o=new Worker(URL.createObjectURL(i)),s=(c,a)=>({type:c,payload:a});return o.postMessage(s("canvas",{canvas:e}),[e]),(c,a)=>{o.postMessage(s("setState",{...c}),a)}}function on(t){const e=t.length,n=new Int16Array(t.length*2);for(let r=0;r<e;r++)n[r*2]=t[r].x,n[r*2+1]=t[r].y;return n.buffer}const sn=t=>{const e=nn(),n=s=>{const c=(f,g,b)=>{const x=f.createShader(g);return f.shaderSource(x,b),f.compileShader(x),x},a=(f,g)=>c(f,f.VERTEX_SHADER,g),u=(f,g)=>c(f,f.FRAGMENT_SHADER,g),p=(f,...g)=>{const b=f.createProgram();for(let x of g)f.attachShader(b,x);return f.linkProgram(b),{get program(){return b},activateVariable(x,I){return{vec2:()=>{const V=f.getAttribLocation(b,I);f.vertexAttribPointer(V,2,f.FLOAT,!1,0,0),f.enableVertexAttribArray(V)}}[x]()}}},l=s.createBuffer(),h=(f,g)=>(f.bindBuffer(f.ARRAY_BUFFER,l),f.bufferData(f.ARRAY_BUFFER,new Float32Array(g),f.STATIC_DRAW),{draw(){f.drawArrays(f.LINE_STRIP,0,g.length/2)}}),y=f=>{f.clearColor(1,1,1,1),f.clear(f.COLOR_BUFFER_BIT)},v=a(s,`
            precision mediump float;

            attribute vec2 position;

            void main(void) {
                gl_Position = vec4(position.x, position.y, 0.0, 0.75);
            }
        `),d=u(s,`
            precision highp float;

            void main(void) {
              gl_FragColor = vec4(0.0,0.0,0.0,1.0);
            }
        `),m=p(s,v,d);return(f,{path:g=[]})=>{const b=Array.from(new Int16Array(g));if(b.length>=4){const{width:x,height:I}=f.canvas,V=b.map((ue,tt)=>tt%2===0?ue/x:ue/I),et=h(f,V);f.viewport(0,0,x,I),m.activateVariable("vec2","position"),f.useProgram(m.program),y(f),et.draw({lineWidth:5})}}},r=e.transferControlToOffscreen(),o=rn(n,r,{antialias:!0,transparent:!1},"webgl");return t.appendChild(e),({path:s})=>{const c=on(s),a=s.length?s.reduce((l,h)=>Math.min(l.x||l,h.x||l)):0,u=s.length?s.reduce((l,h)=>Math.max(l.x||l,h.x||l)):0,p=Math.ceil((u-a)/20)*20;o({path:c,width:Math.min(window.innerWidth,p),height:Math.min(window.innerHeight,p)},[c])}},an=({optionFormReducer:t,linkReducer:e})=>({speed:t.speed,options:t.options,maxPoints:t.maxPoints,optionsConfig:t.optionsConfig,linkConfig:e.linkConfig,path:e.path}),cn=t=>{let e=0,n=0,r=0,i=0;for(let o of t)e=Math.min(o.y,e),n=Math.max(o.y,n),r=Math.min(o.x,r),i=Math.max(o.x,i);return{top:e,bottom:n,left:r,right:i,height:n-e,width:i-r}},un=()=>{const t=document.createElement("div");return Object.assign(t.style,{alignItems:"center",justifyContent:"center",height:"100%",width:"100%",position:"absolute",top:0,left:0,display:"flex"}),document.body.appendChild(t),sn(t)},ln=Qt(an)(De((t,e,n,r)=>{const i=un();return({speed:o,options:s,maxPoints:c,linkConfig:a,optionsConfig:u,path:p,dispatch:l},h,y,v)=>{const d=(m,f)=>{l(Ye({field:m,value:f}))};return cn(p),C`
          <div>
            ${i({path:p})}
            ${gt({speed:o,optionsConfig:u,options:s,maxPoints:c,onUpdateField:d,handleSubmit:()=>l(tn({speed:o,options:s,optionsConfig:u})),addOption:()=>l(Xe()),removeOption:({id:m})=>l(Qe({id:m})),updateOption:({id:m,fieldName:f,value:g})=>l(Je({id:m,fieldName:f,value:g}))})}
          </div>
        `}},{useWebGl:!1})),Ze=()=>{dt(C`
      ${ln()}
    `,document.querySelector("#awesome"))};te.subscribe(Ze);Ze();
