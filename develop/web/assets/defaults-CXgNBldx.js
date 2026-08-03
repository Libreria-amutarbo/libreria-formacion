import{a as e,c as t,i as n,l as r,n as i,s as a,t as o}from"./lit-LoFRC6vp.js";var s=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},c={attribute:!0,type:String,converter:t,reflect:!1,hasChanged:a},l=(e=c,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function u(e){return(t,n)=>typeof n==`object`?l(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function d(e){return u({...e,state:!0,attribute:!1})}var f=r`
  :host {
    display: block;
  }

  .dcx-accordion {
    font-family: var(--ff-base, 'Inter', sans-serif);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    overflow: hidden;
    background-color: var(--bg-default, #ffffff);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .dcx-accordion--transition-smooth .dcx-accordion__content-wrapper {
    transition:
      max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .dcx-accordion--transition-smooth .dcx-accordion__chevron {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dcx-accordion--transition-fast .dcx-accordion__content-wrapper {
    transition:
      max-height 0.15s ease-in-out,
      opacity 0.15s ease-in-out,
      padding 0.15s ease-in-out;
  }
  .dcx-accordion--transition-fast .dcx-accordion__chevron {
    transition: transform 0.15s ease-in-out;
  }

  .dcx-accordion--transition-slow .dcx-accordion__content-wrapper {
    transition:
      max-height 0.5s ease-in-out,
      opacity 0.5s ease-in-out,
      padding 0.5s ease-in-out;
  }
  .dcx-accordion--transition-slow .dcx-accordion__chevron {
    transition: transform 0.5s ease-in-out;
  }

  .dcx-accordion--transition-none .dcx-accordion__content-wrapper,
  .dcx-accordion--transition-none .dcx-accordion__chevron {
    transition: none;
  }

  .dcx-accordion__item {
    border-bottom: 1px solid var(--border-light, #d1d5db);
  }

  .dcx-accordion__item:last-child {
    border-bottom: none;
  }

  .dcx-accordion__item--disabled .dcx-accordion__header {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-accordion__item--disabled .dcx-accordion__header:hover {
    background-color: var(--bg-default, #ffffff);
  }

  .dcx-accordion__item--expanded .dcx-accordion__header {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-accordion__item--expanded .dcx-accordion__chevron {
    transform: rotate(180deg);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-accordion--flush {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }

  .dcx-accordion--flush .dcx-accordion__header {
    border-radius: 0;
  }

  .dcx-accordion--flush .dcx-accordion__header:focus-visible {
    outline-offset: 0;
  }

  .dcx-accordion__heading {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  .dcx-accordion__header {
    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    background-color: var(--bg-default, #ffffff);
    width: 100%;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
    border: none;
    border-radius: 0;
    text-align: left;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease-in-out;
  }

  .dcx-accordion__header:hover:not([disabled]) {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-accordion__header:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
  }

  .dcx-accordion__header[disabled] {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-accordion__icon {
    flex-shrink: 0;
    color: var(--bg-primary, #0058ab);
    width: var(--sp-5, 20px);
    height: var(--sp-5, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-accordion__icon dcx-web-icon {
    color: inherit;
  }

  .dcx-accordion__title-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .dcx-accordion__title {
    font-weight: var(--fw-semibold, 600);
    line-height: 1.4;
  }

  .dcx-accordion__description {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-regular, 400);
    color: var(--text-muted, #696e75);
    line-height: 1.4;
  }

  .dcx-accordion__chevron {
    flex-shrink: 0;
    color: var(--text-dark, #2a2e33);
    transform: rotate(0deg);
    width: var(--sp-5, 20px);
    height: var(--sp-5, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition:
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.2s ease;
  }

  .dcx-accordion__chevron dcx-web-icon {
    font-size: 14px;
    color: inherit;
  }

  .dcx-accordion__content-wrapper {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 var(--sp-5, 20px);
  }

  .dcx-accordion__content-wrapper--expanded {
    max-height: 2000px;
    opacity: 1;
    padding: 0 var(--sp-5, 20px) var(--sp-4, 16px);
  }

  .dcx-accordion__content-wrapper--disabled-content .dcx-accordion__content {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  .dcx-accordion__content {
    padding-top: var(--sp-3, 12px);
    background-color: var(--bg-default, #ffffff);
    color: var(--text-muted, #696e75);
    line-height: var(--line-height-normal, 1.6);
    font-size: var(--fs-base, 14px);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .dcx-accordion__content--scrollable {
    overflow-y: auto;
    padding-right: var(--sp-2, 8px);
  }

  .dcx-accordion__content--scrollable::-webkit-scrollbar {
    width: var(--sp-1, 4px);
  }
  .dcx-accordion__content--scrollable::-webkit-scrollbar-track {
    background: transparent;
  }
  .dcx-accordion__content--scrollable::-webkit-scrollbar-thumb {
    background: var(--border-light, #d1d5db);
    border-radius: var(--r-pill, 999px);
  }
`,p={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},m=e=>(...t)=>({_$litDirective$:e,values:t}),h=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},g=m(class extends h{constructor(e){if(super(e),e.type!==p.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let r=e.element.classList;for(let e of this.st)e in t||(r.remove(e),this.st.delete(e));for(let e in t){let n=!!t[e];n===this.st.has(e)||this.nt?.has(e)||(n?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return n}}),_=`important`,v=` !important`,y=m(class extends h{constructor(e){if(super(e),e.type!==p.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?r.removeProperty(e):r[e]=null);for(let e in t){let n=t[e];if(n!=null){this.ft.add(e);let t=typeof n==`string`&&n.endsWith(v);e.includes(`-`)||t?r.setProperty(e,t?n.slice(0,-11):n,t?_:``):r[e]=n}}return n}}),b=class extends h{constructor(e){if(super(e),this.it=i,e.type!==p.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===i||e==null)return this._t=void 0,this.it=e;if(e===n)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};b.directiveName=`unsafeHTML`,b.resultType=1;var x=m(b),S=t=>{let n={"dcx-accordion":!0,[`dcx-accordion--transition-${t.transition}`]:!0,"dcx-accordion--flush":t.variant===`flush`};return e`
    <div
      class="${g(n)}"
      aria-label="${t.ariaLabel||i}"
    >
      ${t.items.map(n=>{let r=t.isExpanded(n.id),a={"dcx-accordion__item":!0,"dcx-accordion__item--disabled":!!n.disabled,"dcx-accordion__item--expanded":r},o={"dcx-accordion__content-wrapper":!0,"dcx-accordion__content-wrapper--expanded":r,"dcx-accordion__content-wrapper--disabled-content":!!n.disabledContent},s={"dcx-accordion__content":!0,"dcx-accordion__content--scrollable":!!n.maxContentHeight},c={maxHeight:n.maxContentHeight||null};return e`
            <div class="${g(a)}">
              <h3 class="dcx-accordion__heading">
                <button
                  class="dcx-accordion__header"
                  id="accordion-header-${n.id}"
                  aria-expanded="${r}"
                  aria-controls="accordion-content-${n.id}"
                  ?disabled="${n.disabled}"
                  @click="${()=>t.toggleItem(n)}"
                  @keydown="${t.onHeaderKeydown}"
                >
                  ${n.icon?e`
                        <span class="dcx-accordion__icon" aria-hidden="true">
                          ${t.renderIcon(n.icon)}
                        </span>
                      `:i}
                  <span class="dcx-accordion__title-group">
                    <span class="dcx-accordion__title">${n.title}</span>
                    ${n.description?e`
                          <span class="dcx-accordion__description"
                            >${n.description}</span
                          >
                        `:i}
                  </span>
                  <span class="dcx-accordion__chevron" aria-hidden="true">
                    ${t.renderIcon(`chevron-down`)}
                  </span>
                </button>
              </h3>

              <div
                class="${g(o)}"
                id="accordion-content-${n.id}"
                aria-labelledby="accordion-header-${n.id}"
                aria-hidden="${!r}"
                role="region"
              >
                <div
                  class="${g(s)}"
                  style="${y(c)}"
                >
                  ${n.contentTemplate?typeof n.contentTemplate==`function`?n.contentTemplate():n.contentTemplate:n.content?x(n.content):``}
                </div>
              </div>
            </div>
          `})}
    </div>
  `},C=r`
  dcx-web-icon {
    display: inline-block;
    color: var(--color-primary, #0058ab);
  }

  .dcx-icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }

  .dcx-icon--size-s {
    font-size: var(--size-s, 0.5rem);
  }

  .dcx-icon--size-m {
    font-size: var(--size-m, 1rem);
  }

  .dcx-icon--size-l {
    font-size: var(--size-l, 1.5rem);
  }

  .dcx-icon--size-xl {
    font-size: var(--size-xl, 2rem);
  }

  .dcx-icon--size-auto {
    font-size: inherit;
  }

  .dcx-icon--spacing-compact {
    margin: 0 0.25rem;
  }

  .dcx-icon--spacing-spacious {
    margin: 0 0.75rem;
  }
`,w=t=>e`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    ${C}
  </style>
  <i
    class="${t.iconClass}"
    aria-hidden="${t.decorative?`true`:i}"
    role="${t.decorative?i:`img`}"
    aria-label="${t.decorative?i:t.ariaLabel}"
  ></i>
`;function T(e,t){if(typeof Reflect==`object`&&typeof Reflect.metadata==`function`)return Reflect.metadata(e,t)}function E(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var D=class extends o{#e=``;get name(){return this.#e}set name(e){this.#e=e}#t=`m`;get size(){return this.#t}set size(e){this.#t=e}#n=`none`;get spacing(){return this.#n}set spacing(e){this.#n=e}#r=``;get color(){return this.#r}set color(e){this.#r=e}#i=``;get extraClass(){return this.#i}set extraClass(e){this.#i=e}#a=``;get ariaLabel(){return this.#a}set ariaLabel(e){this.#a=e}createRenderRoot(){return this}get decorative(){return!this.ariaLabel||this.ariaLabel.trim()===``}get iconClass(){let e=[`bi`,`bi-${this.name}`,`dcx-icon`,`dcx-icon--size-${this.size}`];this.spacing!==`none`&&e.push(`dcx-icon--spacing-${this.spacing}`);let t=this.extraClass.trim();return t&&e.push(...t.split(/\s+/)),e.join(` `)}updated(e){super.updated(e),e.has(`color`)&&(this.color?this.style.color=this.color:this.style.removeProperty(`color`))}render(){return w(this)}};E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],D.prototype,`name`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],D.prototype,`size`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],D.prototype,`spacing`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],D.prototype,`color`,null),E([u({type:String,attribute:`extra-class`}),T(`design:type`,Object),T(`design:paramtypes`,[])],D.prototype,`extraClass`,null),E([u({type:String,attribute:`aria-label`}),T(`design:type`,Object),T(`design:paramtypes`,[])],D.prototype,`ariaLabel`,null),D=E([s(`dcx-web-icon`)],D);var O=class extends o{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=`smooth`;get transition(){return this.#t}set transition(e){this.#t=e}#n=!0;get closeOthers(){return this.#n}set closeOthers(e){this.#n=e}#r=[];get expandedIds(){return this.#r}set expandedIds(e){this.#r=e}#i=`default`;get variant(){return this.#i}set variant(e){this.#i=e}#a=null;get ariaLabel(){return this.#a}set ariaLabel(e){this.#a=e}#o=new Set;get _expandedItems(){return this.#o}set _expandedItems(e){this.#o=e}willUpdate(e){if(e.has(`expandedIds`)||e.has(`items`)){let e=new Set;this.expandedIds&&this.expandedIds.length>0?this.expandedIds.forEach(t=>e.add(t)):this.items&&this.items.forEach(t=>{t.expanded&&e.add(t.id)}),this._expandedItems=e}}toggleItem(e){if(e.disabled)return;let t=this.isExpanded(e.id),n=new Set(this._expandedItems);t?(n.delete(e.id),this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:e,bubbles:!0,composed:!0}))):(this.closeOthers&&n.clear(),n.add(e.id),this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:e,bubbles:!0,composed:!0}))),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}onHeaderKeydown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.navigateFocus(`next`);break;case`ArrowUp`:e.preventDefault(),this.navigateFocus(`prev`);break;case`Home`:e.preventDefault(),this.navigateFocus(`first`);break;case`End`:e.preventDefault(),this.navigateFocus(`last`)}}expandItemById(e){let t=this.items.find(t=>t.id===e);if(!t||t.disabled||this.isExpanded(e))return;let n=new Set(this._expandedItems);this.closeOthers&&n.clear(),n.add(e),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}collapseItemById(e){let t=this.items.find(t=>t.id===e);if(!t||!this.isExpanded(e))return;let n=new Set(this._expandedItems);n.delete(e),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}isExpanded(e){return this._expandedItems.has(e)}expandAll(){let e=this.items.filter(e=>!e.disabled);this._expandedItems=new Set(e.map(e=>e.id)),e.forEach(e=>{this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0}))}),this.requestUpdate()}collapseAll(){let e=this.items.filter(e=>this.isExpanded(e.id));this._expandedItems=new Set,e.forEach(e=>{this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0}))}),this.requestUpdate()}navigateFocus(e){let t=Array.from(this.shadowRoot?.querySelectorAll(`button.dcx-accordion__header:not([disabled])`)||[]);if(!t.length)return;let n=this.shadowRoot?.activeElement||document.activeElement,r=t.indexOf(n),i;switch(e){case`next`:i=(r+1)%t.length;break;case`prev`:i=(r-1+t.length)%t.length;break;case`first`:i=0;break;case`last`:i=t.length-1}t[i]?.focus()}_getIconName(e){let t=e.toLowerCase();return t===`chevron-down`?`chevron-down`:t.includes(`speedometer`)?`speedometer2`:t.includes(`gear`)?`gear-fill`:t===`user`||t===`user-fill`||t.includes(`person`)?`person-fill`:t.includes(`info`)?`info-circle-fill`:t.includes(`star`)?`star-fill`:t===`help`||t===`help-fill`||t.includes(`question`)?`question-circle-fill`:t.includes(`clock`)||t.includes(`history`)?`clock-history`:t===`hand-pointer`||t.includes(`hand`)||t.includes(`pointer`)?`hand-index-thumb-fill`:t===`file-text`||t.includes(`file`)||t.includes(`text`)?`file-earmark-text`:t===`list`?`list`:e}renderIcon(t){let n=this._getIconName(t);return t.toLowerCase()===`chevron-down`?e`<dcx-web-icon name="${n}" size="auto"></dcx-web-icon>`:e`<dcx-web-icon name="${n}"></dcx-web-icon>`}static styles=f;render(){return S(this)}};E([u({type:Array}),T(`design:type`,Array),T(`design:paramtypes`,[])],O.prototype,`items`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],O.prototype,`transition`,null),E([u({type:Boolean,attribute:`close-others`}),T(`design:type`,Object),T(`design:paramtypes`,[])],O.prototype,`closeOthers`,null),E([u({type:Array,attribute:`expanded-ids`}),T(`design:type`,Array),T(`design:paramtypes`,[])],O.prototype,`expandedIds`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],O.prototype,`variant`,null),E([u({type:String,attribute:`aria-label`}),T(`design:type`,Object),T(`design:paramtypes`,[])],O.prototype,`ariaLabel`,null),E([d(),T(`design:type`,Object),T(`design:paramtypes`,[])],O.prototype,`_expandedItems`,null),O=E([s(`dcx-web-accordion`)],O);var k=r`
  :host {
    display: inline-block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-button {
    margin: 0;
    background: none;
    color: inherit;
    font-family: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-2, 8px);
    border: 1px solid transparent;
    border-radius: var(--r-sm, 4px);
    font-weight: var(--fw-medium, 500);
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    transition: background 0.1s, border-color 0.1s, box-shadow 0.1s, color 0.1s;
    box-sizing: border-box;
  }

  .dcx-button--s, .dcx-button--small { font-size: var(--fs-sm, 12px); padding: 5px 10px; }
  .dcx-button--m, .dcx-button--medium { font-size: 13px; padding: 7px 13px; }
  .dcx-button--l, .dcx-button--large { font-size: var(--fs-base, 14px); padding: 9px var(--sp-4, 16px); }
  .dcx-button--xl, .dcx-button--extra-large { font-size: var(--fs-base, 14px); padding: 11px var(--sp-5, 20px); }
  .dcx-button--checkbox { height: 1.25rem; width: 1.25rem; padding: 0.7rem !important; }

  .dcx-button--primary {
    background-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    border-color: var(--bg-primary, #0058ab);
  }
  .dcx-button--primary:hover:not(:disabled),
  .dcx-button--primary.dcx-button--hover:not(:disabled) {
    background-color: var(--bg-primary-hover, #004080);
    border-color: var(--bg-primary-hover, #004080);
  }
  .dcx-button--primary:active:not(:disabled),
  .dcx-button--primary.dcx-button--pressed:not(:disabled) {
    background-color: var(--bg-primary-pressed, #121a38);
    border-color: var(--bg-primary-pressed, #121a38);
  }
  .dcx-button--primary:focus-visible,
  .dcx-button--primary.dcx-button--focused {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
  }

  .dcx-button--secondary {
    background-color: var(--bg-default, #ffffff);
    color: var(--text-dark, #2a2e33);
    border-color: var(--border-light, #d1d5db);
  }
  .dcx-button--secondary:hover:not(:disabled),
  .dcx-button--secondary.dcx-button--hover:not(:disabled) {
    background-color: var(--bg-hover, #f7f8fa);
    border-color: var(--border-hover, #9ca3af);
  }
  .dcx-button--secondary:active:not(:disabled),
  .dcx-button--secondary.dcx-button--pressed:not(:disabled) {
    background-color: var(--bg-pressed, #e1e3e6);
    border-color: var(--border-hover, #9ca3af);
  }
  .dcx-button--secondary:focus-visible,
  .dcx-button--secondary.dcx-button--focused {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
  }

  .dcx-button--terciary {
    background-color: transparent;
    color: var(--text-dark, #2a2e33);
    border-color: transparent;
  }
  .dcx-button--terciary:hover:not(:disabled),
  .dcx-button--terciary.dcx-button--hover:not(:disabled) {
    background-color: var(--bg-hover, #f7f8fa);
  }
  .dcx-button--terciary:active:not(:disabled),
  .dcx-button--terciary.dcx-button--pressed:not(:disabled) {
    background-color: var(--bg-pressed, #e1e3e6);
  }
  .dcx-button--terciary:focus-visible,
  .dcx-button--terciary.dcx-button--focused {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
  }

  .dcx-button--danger {
    background-color: var(--color-danger, #dc2626);
    color: var(--text-white, #ffffff);
    border-color: var(--color-danger, #dc2626);
  }
  .dcx-button--danger:hover:not(:disabled),
  .dcx-button--danger.dcx-button--hover:not(:disabled) {
    background-color: var(--color-danger-hover, #b91c1c);
    border-color: var(--color-danger-hover, #b91c1c);
  }
  .dcx-button--danger:active:not(:disabled),
  .dcx-button--danger.dcx-button--pressed:not(:disabled) {
    background-color: var(--color-danger-pressed, #991b1b);
    border-color: var(--color-danger-pressed, #991b1b);
  }
  .dcx-button--danger:focus-visible,
  .dcx-button--danger.dcx-button--focused {
    border-color: #f87171;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .dcx-button--text {
    background-color: transparent;
    color: var(--text-dark, #2a2e33);
    border-color: transparent;
  }
  .dcx-button--text:hover:not(:disabled),
  .dcx-button--text.dcx-button--hover:not(:disabled) {
    background-color: var(--bg-hover, #f7f8fa);
  }
  .dcx-button--text:active:not(:disabled),
  .dcx-button--text.dcx-button--pressed:not(:disabled) {
    background-color: var(--bg-pressed, #e1e3e6);
  }
  .dcx-button--text:focus-visible,
  .dcx-button--text.dcx-button--focused {
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
  }

  .dcx-button:disabled {
    background-color: var(--bg-disabled, #f3f4f6);
    color: var(--text-disabled, #696e75);
    border-color: #e5e7eb;
    cursor: not-allowed;
  }

  
  .dcx-button--checkbox.dcx-button--checkbox-error--primary {

    background-color: var(--color-error, #dc2626);
    color: var(--text-white, #ffffff);
    border-color: var(--border-error, #dc2626);
  }

  .dcx-button--checkbox.dcx-button--checkbox-error--primary:hover:not(:disabled),
  .dcx-button--checkbox.dcx-button--checkbox-error--primary.dcx-button--hover:not(:disabled) {
    border: 2px solid var(--border-error, #dc2626);

    background-color: var(--bg-default, #ffffff);
    color: var(--color-error, #dc2626);
    border-color: var(--border-error, #dc2626);
  }


  .dcx-button--checkbox.dcx-button--checkbox-error--secondary {
    
    background-color: var(--bg-default, #ffffff);
    color: var(--color-error, #dc2626);
    border-color: var(--border-error, #dc2626);

  }
  
  .dcx-button--checkbox.dcx-button--checkbox-error--secondary:hover:not(:disabled),
  .dcx-button--checkbox.dcx-button--checkbox-error--secondary.dcx-button--hover:not(:disabled) {
    border: 2px solid var(--border-error, #dc2626);
    background-color: var(--bg-default, #ffffff);
    color: var(--color-error, #dc2626);
    border-color: var(--border-error, #dc2626);
  }


  .dcx-button--icon-top, .dcx-button--icon-bottom {
    flex-direction: column;
    gap: 4px;
  }

  .dcx-button__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
  }

  .dcx-button__icon--left, .dcx-button__icon--top, ::slotted([slot="dcx-icon"]) { order: -1; }
  .dcx-button__icon--right, .dcx-button__icon--bottom, ::slotted([slot="button-trailing"]) { order: 1; }
  .dcx-button__icon--right { order: 2; }
  .dcx-button__label { order: 0; }

  ::slotted(svg) {
    display: inline-flex;
    flex-shrink: 0;
    color: currentColor;
  }

  .dcx-button--icon-right ::slotted([slot="dcx-icon"]),
  .dcx-button--icon-bottom ::slotted([slot="dcx-icon"]) {
    order: 1;
  }

  .dcx-icon--size-s, .dcx-button--s ::slotted(svg) { width: 14px; height: 14px; }
  .dcx-icon--size-m, .dcx-button--m ::slotted(svg) { width: 16px; height: 16px; }
  .dcx-icon--size-l, .dcx-button--l ::slotted(svg) { width: 20px; height: 20px; }
  .dcx-icon--size-xl, .dcx-button--xl ::slotted(svg) { width: 24px; height: 24px; }

  .dcx-icon--spacing-compact { margin: 0 4px; }
  .dcx-icon--spacing-spacious { margin: 0 12px; }

  .dcx-button--icon-only {
    padding: 0;
    aspect-ratio: 1 / 1;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
  }
  .dcx-button--icon-only.dcx-button--s { width: 2rem; height: 2rem; }
  .dcx-button--icon-only.dcx-button--m { width: 2.5rem; height: 2.5rem; }
  .dcx-button--icon-only.dcx-button--l { width: 3rem; height: 3rem; }
  .dcx-button--icon-only.dcx-button--xl { width: 3.5rem; height: 3.5rem; }
`,A=e=>e??i,j=t=>{let n=t.variant===`icon-only`,r=t.iconName||(t.icon?`star-fill`:``),a={"dcx-button":!0,[`dcx-button--${t.variant}`]:!0,[`dcx-button--${t.isCheckbox?`checkbox`:t.size}`]:!0,"dcx-button--icon-only":n,[`dcx-button--icon-${t.iconPosition}`]:!!t.iconPosition,"dcx-button--pressed":t.pressed,"dcx-button--hover":t.hover,"dcx-button--focused":t.focused,"dcx-button--checkbox":t.isCheckbox,[`dcx-button--checkbox-error--${t.variant}`]:t.isCheckbox&&t.checkboxError,[t.extraClass]:!!t.extraClass},o=t.iconSize??t.size,s=t.label&&!n?void 0:t.ariaLabel||t.label||`Button`,c=(n,r)=>{let i=`https://unpkg.com/bootstrap-icons@1.11.3/icons/${n}.svg`;return e`
      <span class="dcx-button__icon ${r} dcx-icon dcx-icon--size-${o} dcx-icon--spacing-${t.iconSpacing}"
            style="-webkit-mask-image: url(${i});
                   mask-image: url(${i});
                   ${t.iconColor?`background-color: ${t.iconColor}`:``}"
            aria-hidden="true">
      </span>
    `};return e`
    <button
      type="${t.type}"
      ?disabled="${t.disabled}"
      class="${g(a)}"
      aria-label="${A(s)}"
      aria-pressed="${t.pressed||i}"
      role="${t.isCheckbox?`checkbox`:i}"
      aria-checked="${t.isCheckbox?A(t.ariaChecked??void 0):i}"
      @click="${t.handleClick}"
    >
      ${r&&(t.iconPosition===`left`||t.iconPosition===`top`)?c(r,`dcx-button__icon--${t.iconPosition}`):i}

      ${t.label&&!n?e`<span class="dcx-button__label">${t.label}</span>`:i}

      ${t.iconRightName?c(t.iconRightName,`dcx-button__icon--right`):i}

      ${r&&(t.iconPosition===`right`&&!t.iconRightName||t.iconPosition===`bottom`)?c(r,`dcx-button__icon--${t.iconPosition}`):i}

      <slot name="dcx-icon"></slot>
      <slot name="button-trailing"></slot>
    </button>
  `},M=class extends o{#e=``;get label(){return this.#e}set label(e){this.#e=e}#t=``;get ariaLabel(){return this.#t}set ariaLabel(e){this.#t=e}#n=`button`;get type(){return this.#n}set type(e){this.#n=e}#r=!1;get disabled(){return this.#r}set disabled(e){this.#r=e}#i=!1;get pressed(){return this.#i}set pressed(e){this.#i=e}#a=!1;get hover(){return this.#a}set hover(e){this.#a=e}#o=!1;get focused(){return this.#o}set focused(e){this.#o=e}#s=`primary`;get variant(){return this.#s}set variant(e){this.#s=e}#c=`m`;get size(){return this.#c}set size(e){this.#c=e}#l=``;get extraClass(){return this.#l}set extraClass(e){this.#l=e}#u=!1;get isCheckbox(){return this.#u}set isCheckbox(e){this.#u=e}#d=!1;get checkboxError(){return this.#d}set checkboxError(e){this.#d=e}#f=null;get ariaChecked(){return this.#f}set ariaChecked(e){this.#f=e}#p=!1;get icon(){return this.#p}set icon(e){this.#p=e}#m=``;get iconName(){return this.#m}set iconName(e){this.#m=e}#h=void 0;get iconSize(){return this.#h}set iconSize(e){this.#h=e}#g=`none`;get iconSpacing(){return this.#g}set iconSpacing(e){this.#g=e}#_=``;get iconColor(){return this.#_}set iconColor(e){this.#_=e}#v=`left`;get iconPosition(){return this.#v}set iconPosition(e){this.#v=e}#y=``;get iconRightName(){return this.#y}set iconRightName(e){this.#y=e}static styles=k;handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.dispatchEvent(new CustomEvent(`buttonClick`,{detail:{clicked:!0},bubbles:!0,composed:!0}))}render(){return j(this)}};E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`label`,null),E([u({type:String,attribute:`aria-label`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`ariaLabel`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`type`,null),E([u({type:Boolean}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`disabled`,null),E([u({type:Boolean}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`pressed`,null),E([u({type:Boolean}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`hover`,null),E([u({type:Boolean}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`focused`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`variant`,null),E([u({type:String}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`size`,null),E([u({type:String,attribute:`class`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`extraClass`,null),E([u({type:Boolean,attribute:`is-checkbox`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`isCheckbox`,null),E([u({type:Boolean,attribute:`checkbox-error`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`checkboxError`,null),E([u({type:String,attribute:`aria-checked`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`ariaChecked`,null),E([u({type:Boolean}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`icon`,null),E([u({type:String,attribute:`icon-name`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`iconName`,null),E([u({type:String,attribute:`icon-size`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`iconSize`,null),E([u({type:String,attribute:`icon-spacing`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`iconSpacing`,null),E([u({type:String,attribute:`icon-color`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`iconColor`,null),E([u({type:String,attribute:`icon-position`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`iconPosition`,null),E([u({type:String,attribute:`icon-right-name`}),T(`design:type`,Object),T(`design:paramtypes`,[])],M.prototype,`iconRightName`,null),M=E([s(`dcx-web-button`)],M);var N=[`fast`,`none`,`slow`,`smooth`],P=[`default`,`flush`],F=[{id:`1`,title:`¿Qué es DCX?`,content:`DCX es el centro de excelencia en experiencia digital de Capgemini. Desarrollamos soluciones de interfaz de usuario reutilizables, accesibles y coherentes para los proyectos de nuestros clientes.`},{id:`2`,title:`¿Cómo se instala la librería?`,content:`Instala el paquete con npm install @dcx-ng-components/dcx-ng-lib y añade el módulo en tu AppModule o importa directamente los componentes standalone que necesites.`},{id:`3`,title:`Contenido con interacción deshabilitada`,content:`Este panel es visible pero sus controles internos están deshabilitados mediante disabledContent. Útil para mostrar información de solo lectura.`,disabledContent:!0},{id:`4`,title:`Elemento deshabilitado`,disabled:!0}],I=[{id:`1`,title:`Dashboard`,content:`View your dashboard with analytics and reports.`,icon:`speedometer2`},{id:`2`,title:`Settings`,content:`Configure your application settings.`,icon:`gear-fill`},{id:`3`,title:`Profile`,content:`Manage your profile information.`,icon:`person-fill`}],L=[{id:`1`,title:`Sección de bienvenida`,content:`Esta sección está expandida por defecto gracias a expanded: true.`,expanded:!0},{id:`2`,title:`Características principales`,content:`Esta sección está colapsada por defecto.`},{id:`3`,title:`Configuración avanzada`,content:`Esta sección también está colapsada por defecto.`}],R=[{id:`1`,title:`Introduction`,content:`Welcome to our application! This is the introduction section.`,icon:`info-circle-fill`,disabled:!0},{id:`2`,title:`Features`,content:`Explore the amazing features of our application.`,icon:`star-fill`,disabled:!0},{id:`3`,title:`Settings (Disabled)`,content:`Advanced settings - Coming soon!`,icon:`gear-fill`,disabled:!0},{id:`4`,title:`Help & Support`,content:`Get help and support for any issues.`,icon:`question-circle-fill`,disabled:!0}],z=[{id:`1`,title:`Introduction`,content:`Welcome to our application! This is the introduction section.`,icon:`info-circle-fill`,disabledContent:!0},{id:`2`,title:`Features`,content:`Explore the amazing features of our application.`,icon:`star-fill`,disabledContent:!0},{id:`3`,title:`Settings (Disabled)`,content:`Advanced settings - Coming soon!`,icon:`gear-fill`,disabledContent:!0},{id:`4`,title:`Help & Support`,content:`Get help and support for any issues.`,icon:`question-circle-fill`,disabledContent:!0}],B=[{id:`1`,title:`Contenido extenso con scroll interno`,description:`Desplázate dentro del panel para ver todo el texto`,icon:`info-circle-fill`,maxContentHeight:`280px`,content:[`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,`Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,`Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`,`At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,`Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`,`Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,`Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?`,`Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,`Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`,`Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,`Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,`Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,`At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,`Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,`Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`].join(`

`)}],V=[{id:`1`,title:`Información general`,description:`Datos básicos del servicio`,content:`Aquí encontrarás los datos generales del servicio contratado.`,icon:`info-circle-fill`},{id:`2`,title:`Configuración`,description:`Ajustes y preferences`,content:`Modifica los parámetros del servicio según tus necesidades.`,icon:`gear-fill`},{id:`3`,title:`Historial de cambios`,description:`Registro de actividad reciente`,content:`Consulta todos los cambios realizados durante el último mes.`,icon:`clock-history`}],H=[`Item 1`,`Item 2`,`Item 3`,`Item 4`],U=function(e){return e.TEXT=`text`,e.NUMBER=`number`,e.EMAIL=`email`,e.PASSWORD=`password`,e.SEARCH=`search`,e.TEL=`tel`,e.URL=`url`,e.FILE=`file`,e.RADIO=`radio`,e.RANGE=`range`,e}({}),W=Object.values(U),G=U.TEXT,K=`Este campo es requerido`,q={min:0,max:1e3,step:1};export{s as C,u as S,E as _,U as a,g as b,R as c,I as d,B as f,A as g,H as h,W as i,V as l,P as m,G as n,F as o,N as p,q as r,z as s,K as t,L as u,T as v,d as x,y};