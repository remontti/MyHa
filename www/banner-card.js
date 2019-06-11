!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).BannerCard=e()}(this,function(){"use strict";const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.removeChild(i),i=e}},n={},r={},o=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${o}--\x3e`,l=new RegExp(`${o}|${a}`),c="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;let s=-1,i=0;const n=[],r=e=>{const a=e.content,h=document.createTreeWalker(a,133,null,!1);let d=0;for(;h.nextNode();){s++;const e=h.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(o)>=0&&r++;for(;r-- >0;){const n=t.strings[i],r=u.exec(n)[2],o=r.toLowerCase()+c,a=e.getAttribute(o).split(l);this.parts.push({type:"attribute",index:s,name:r,strings:a}),e.removeAttribute(o),i+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(o)>=0){const r=e.parentNode,o=t.split(l),a=o.length-1;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?p():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++s});""===o[a]?(r.insertBefore(p(),e),n.push(e)):e.data=o[a],i+=a}}else if(8===e.nodeType)if(e.data===o){const t=e.parentNode;null!==e.previousSibling&&s!==d||(s++,t.insertBefore(p(),e)),d=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(n.push(e),s--),i++}else{let t=-1;for(;-1!==(t=e.data.indexOf(o,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const d=t=>-1!==t.index,p=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const r=t=>{const s=document.createTreeWalker(t,133,null,!1);let o=s.nextNode();for(;i<e.length&&null!==o;){const t=e[i];if(d(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===o.nodeName&&r(o.content),o=s.nextNode();else this._parts.push(void 0),i++}};return r(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class f{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],i=u.exec(t);e+=i?t.substr(0,i.index)+i[1]+i[2]+c+i[3]+o:t+a}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const g=t=>null===t||!("object"==typeof t||"function"==typeof t);class y{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new v(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class v{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||g(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class _{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=p()),t._insert(this.endNode=p())}insertAfterPart(t){t._insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}const t=this._pendingValue;t!==n&&(g(t)?t!==this.value&&this._commitText(t):t instanceof f?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===r?(this.value=r,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options),i=s._clone();s.update(t.values),this._commitNode(i),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)void 0===(s=e[i])&&(s=new _(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class b{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=n}}class w extends y{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends v{}let x=!1;try{const t={get capture(){return x=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class P{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=this._pendingValue,s=this.value,i=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),r=null!=t&&(null==s||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),r&&(this._options=C(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const C=t=>t&&(x?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const N=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];return"."===n?new w(t,e.slice(1),s).parts:"@"===n?[new P(t,e.slice(1),i.eventContext)]:"?"===n?[new b(t,e.slice(1),s)]:new y(t,e,s).parts}handleTextExpression(t){return new _(t)}};function k(t){let e=A.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},A.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(o);return void 0===(s=e.keyString.get(i))&&(s=new h(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const A=new Map,E=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const z=(t,...e)=>new f(t,e,"html",N),$=133;function T(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,$,null,!1);let r=O(i),o=i[r],a=-1,l=0;const c=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,o=i[r=O(i,r)]}c.forEach(t=>t.parentNode.removeChild(t))}const V=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,$,null,!1);for(;s.nextNode();)e++;return e},O=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(d(e))return s}return-1};const M=(t,e)=>`${t}--${e}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),R=!1);const U=t=>e=>{const s=M(e.type,t);let i=A.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},A.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(o);if(void 0===(n=i.keyString.get(r))){const s=e.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(s,t),n=new h(e,s),i.keyString.set(r,n)}return i.stringsArray.set(e.strings,n),n},j=["html","svg"],D=new Set,q=(t,e,s)=>{D.add(s);const i=t.querySelectorAll("style");if(0===i.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,s);const n=document.createElement("style");for(let t=0;t<i.length;t++){const e=i[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{j.forEach(e=>{const s=A.get(M(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),T(t,s)})})})(s),function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,$,null,!1);let o=O(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=V(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=O(n,o);return}o=O(n,o)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,s),window.ShadyCSS.nativeShadow){const s=e.element.content.querySelector("style");t.insertBefore(s.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),T(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const L={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},F=(t,e)=>e!==t&&(e==e||t==t),B={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:F},I=Promise.resolve(!0),H=1,W=4,J=8,Y=16,G=32;class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=I,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=B){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=F){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||L,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||L.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|G,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=B){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|J,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~J}}_attributeToProperty(t,e){if(this._updateState&J)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||B;this._updateState=this._updateState|Y,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Y}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,n=i._classProperties.get(t)||B;i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|W;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&G}get _hasRequestedUpdate(){return this._updateState&W}get hasUpdated(){return this._updateState&H}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&H||(this._updateState=this._updateState|H,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~W}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}K.finalized=!0;const Q="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class Z{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const tt=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let i=0,n=e.length;i<n;i++){const n=e[i];Array.isArray(n)?t(n,s):s.push(n)}return s}(t);class et extends K{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){tt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}et.finalized=!0,et.render=((t,e,s)=>{const n=s.scopeName,r=E.has(e),o=e instanceof ShadowRoot&&R&&t instanceof f,a=o&&!D.has(n),l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=E.get(e);void 0===n&&(i(e,e.firstChild),E.set(e,n=new _(Object.assign({templateFactory:k},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:U(n)},s)),a){const t=E.get(l);E.delete(l),t.value instanceof m&&q(l,t.value.template,n),i(e,e.firstChild),e.appendChild(l),E.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});var st=((t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof Z)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new Z(s,X)})`
  :host {
    --bc-error-color: var(--lumo-error-color);
    --bc-font-size-heading: 3em;
    --bc-font-size-entity-value: 1.5em;
    --bc-font-size-media-title: 0.9em;
    --bc-spacing: 4px;
    --bc-button-size: 32px;
  }
  ha-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  paper-icon-button {
    width: var(--bc-button-size);
    height: var(--bc-button-size);
    padding: var(--bc-spacing);
  }

  ha-card.not-found {
    background-color: var(--lumo-error-color);
  }

  .heading {
    display: block;
    font-size: var(--bc-font-size-heading);
    font-weight: 300;
    cursor: pointer;
    align-self: stretch;
    text-align: center;
    color: var(--primary-text-color);
  }

  .overlay-strip {
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 100%;
  }

  .error {
    display: flex;
    padding: calc(var(--bc-spacing) * 4)
    color: white;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.4rem;
  }
  .entities {
    padding: calc(var(--bc-spacing) * 2) 0px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: -1px;
  }

  .entity-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: calc(var(--bc-spacing) * 2) 0;
    box-shadow: -1px 0px 0 0 white;
  }

  .media-title {
    flex: 1 0 ;
    overflow: hidden;
    font-weight: 300;
    font-size: var(--bc-font-size-media-title);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .media-controls {
    display: flex;
    flex: 0 0 calc(var(--bc-button-size) * 3);
  }

  .entity-state.expand .entity-value {
    width: 100%;
  }

  .entity-state-left {
    margin-right: auto;
    margin-left: 16px;
  }

  .entity-state-right {
    margin-left: auto;
    margin-right: 16px;
  }

  .entity-name {
    font-weight: 700;
    white-space: nowrap;
  }

  .entity-value {
    padding-top: var(--bc-spacing);
    font-size: var(--bc-font-size-entity-value);
    align-items: center;
  }

  .entity-value.interactive {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .entity-value.interactive ha-icon {
    color: white;
  }

  .toggle {
    cursor: pointer;
    --paper-toggle-button-unchecked-bar-color: rgba(255, 255, 255, 0.4);
    --paper-toggle-button-unchecked-button-color: rgba(255, 255, 255, 0.4);
    --paper-toggle-button-unchecked-ink-color: rgba(1, 1, 1, 0.6);

    --paper-toggle-button-checked-bar-color: white;
    --paper-toggle-button-checked-button-color: white;
    --paper-toggle-button-checked-ink-color: white;
  }
`;function it({state:t,attributes:e},s=!1){return"string"==typeof s&&e.hasOwnProperty(s)?e[s]:t}function nt(t){return"object"==typeof t?(e=t,s=(t=>!1===t?null:t),Object.entries(e).reduce((t,[e,i])=>({...t,[e]:s(i,e)}),{})):{entity:t};var e,s}const rt=/^(mdi|hass):/;class ot extends et{static get properties(){return{config:Object,gridSizes:Array,entities:Array,error:String,rowSize:Number,_hass:Object}}static get styles(){return[st]}constructor(){super(),this.config={},this.entities=[],this.error=null,this._hass={}}setConfig(t){if(!t.heading)throw new Error("You need to define a heading");if(this.entities=t.entities.map(nt),this.config=t,void 0!==t.row_size){if(t.row_size<1)throw new Error("row_size must be at least 1");this.rowSize=t.row_size}this.rowSize=this.rowSize||3,this.gridSizes=Array(this.rowSize).fill(this.rowSize).map((t,e)=>Math.round((e+1)/t*100))}set hass(t){this._hass=t,this.error=null,this.entityValues=this.entities.map(e=>{if(!t.states.hasOwnProperty(e.entity))return this.error=`Can't find entity ${e.entity}`,e;const s=t.states[e.entity],i=s.attributes,n={name:i.friendly_name,state:s.state,value:it(s,e.attribute),unit:i.unit_of_measurement,attributes:i,domain:e.entity.split(".")[0]},r={};return e.map_state&&s.state in e.map_state&&(r.value=e.map_state[s.state]),{...n,...e,...r}})}grid(t=1){("full"===t||t>this.rowSize)&&(t=this.rowSize);const e=this.gridSizes[t-1];return`flex: 0 0 ${e}%; width: ${e}%;`}_service(t,e,s){return()=>this._hass.callService(t,e,{entity_id:s})}render(){if(this.error)return t=this.config.heading,e=this.error,z`
    <ha-card class="not-found">
      <h2 class="heading">
        ${t}
      </h2>
      <div class="overlay-strip">
        <div class="error">${e}</div>
      </div>
    </ha-card>
  `;var t,e;return z`
      <ha-card style="background: ${this.config.background};">
        <h2 class="heading" @click=${()=>this.config.link&&this.navigate(this.config.link)}>
          ${this.config.heading}
        </h2>
        <div class="overlay-strip">
          <div class="entities">
            ${this.entityValues.map(t=>{const e={...t,onClick:()=>this.openEntityPopover(t.entity)};if(!t.attribute)switch(t.domain){case"light":return this.renderDomainLight(e);case"switch":return this.renderDomainSwitch(e);case"cover":return this.renderDomainCover(e);case"media_player":return this.renderDomainMediaPlayer(e)}return this.renderDomainDefault(e)})}
          </div>
        </div>
      </ha-card>
    `}renderDomainDefault({value:t,unit:e,name:s,size:i,onClick:n}){let r;return r=function(t){return"string"==typeof t&&t.match(rt)}(t)?z`
        <ha-icon icon="${t}"></ha-icon>
      `:z`
        ${t} ${e}
      `,z`
      <div class="entity-state" style="${this.grid(i)}" @click=${n}>
        <span class="entity-name">${s}</span>
        <span class="entity-value">${r}</span>
      </div>
    `}renderDomainMediaPlayer({onClick:t,attributes:e,size:s,name:i,state:n,entity:r,domain:o}){const a="playing"===n,l=a?"media_pause":"media_play",c=[e.media_artist,e.media_title].join(" – ");return z`
      <div class="entity-state" style="${this.grid(s||"full")}">
        <span class="entity-name" @click=${t}>${i}</span>
        <div class="entity-value interactive">
          <div class="entity-state-left media-title">
            ${c}
          </div>
          <div class="entity-state-right media-controls">
            <paper-icon-button
              icon="mdi:skip-previous"
              role="button"
              @click=${this._service(o,"media_previous_track",r)}
            ></paper-icon-button>
            <paper-icon-button
              icon="${a?"mdi:stop":"mdi:play"}"
              role="button"
              @click=${this._service(o,l,r)}
            ></paper-icon-button>
            <paper-icon-button
              icon="mdi:skip-next"
              role="button"
              @click=${this._service(o,"media_next_track",r)}
            ></paper-icon-button>
          </div>
        </div>
      </div>
    `}renderDomainLight({onClick:t,size:e,name:s,state:i,entity:n}){return z`
      <div class="entity-state" style="${this.grid(e)}">
        <span class="entity-name" @click=${t}>${s}</span>
        <span class="entity-value">
          <paper-toggle-button
            class="toggle"
            ?checked=${"on"===i}
            @click=${this._service("light","toggle",n)}
          />
        </span>
      </div>
    `}renderDomainSwitch({onClick:t,size:e,name:s,state:i,entity:n}){return z`
      <div class="entity-state" style="${this.grid(e)}">
        <span class="entity-name" @click=${t}>${s}</span>
        <span class="entity-value">
          <paper-toggle-button
            class="toggle"
            ?checked=${"on"===i}
            @click=${this._service("switch","toggle",n)}
          >
          </paper-toggle-button>
        </span>
      </div>
    `}renderDomainCover({onClick:t,size:e,name:s,state:i,entity:n}){return z`
      <div class="entity-state" style="${this.grid(e)}">
        <span class="entity-name" @click=${t}>${s}</span>
        <span class="entity-value">
          <paper-icon-button
            icon="hass:arrow-up"
            role="button"
            @click=${this._service("cover","open_cover",n)}
          ></paper-icon-button>
          <paper-icon-button
            icon="hass:stop"
            role="button"
            @click=${this._service("cover","stop_cover",n)}
          ></paper-icon-button>
          <paper-icon-button
            icon="hass:arrow-down"
            role="button"
            @click=${this._service("cover","close_cover",n)}
          ></paper-icon-button>
        </span>
      </div>
    `}getCardSize(){return 3}navigate(t){history.pushState(null,"",t),this.fire("location-changed",{replace:!0})}openEntityPopover(t){this.fire("hass-more-info",{entityId:t})}fire(t,e,s){s=s||{},e=null==e?{}:e;const i=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return i.detail=e,this.dispatchEvent(i),i}}return window.customElements.define("banner-card",ot),ot});
