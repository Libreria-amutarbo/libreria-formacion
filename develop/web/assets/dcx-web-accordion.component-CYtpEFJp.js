import{a as e,i as t,l as n,n as r,t as i}from"./lit-C11zoK0j.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,u as p}from"./dcx-web-button.component-DgDUViKA.js";import"./defaults-DBXV-fV-.js";var m=n`
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
`,h=`important`,g=` !`+h,_=a(class extends u{constructor(e){if(super(e),e.type!==f.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[n]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(n)),this.render(n);for(let e of this.ft)n[e]??(this.ft.delete(e),e.includes(`-`)?r.removeProperty(e):r[e]=null);for(let e in n){let t=n[e];if(t!=null){this.ft.add(e);let n=typeof t==`string`&&t.endsWith(g);e.includes(`-`)||n?r.setProperty(e,n?t.slice(0,-11):t,n?h:``):r[e]=t}}return t}}),v=class extends u{constructor(e){if(super(e),this.it=r,e.type!==f.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===r||e==null)return this._t=void 0,this.it=e;if(e===t)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};v.directiveName=`unsafeHTML`,v.resultType=1;var y=a(v),b=t=>{let n={"dcx-accordion":!0,[`dcx-accordion--transition-${t.transition}`]:!0,"dcx-accordion--flush":t.variant===`flush`};return e`
    <div
      class="${s(n)}"
      aria-label="${t.ariaLabel||r}"
    >
      ${t.items.map(n=>{let i=t.isExpanded(n.id),a={"dcx-accordion__item":!0,"dcx-accordion__item--disabled":!!n.disabled,"dcx-accordion__item--expanded":i},o={"dcx-accordion__content-wrapper":!0,"dcx-accordion__content-wrapper--expanded":i,"dcx-accordion__content-wrapper--disabled-content":!!n.disabledContent},c={"dcx-accordion__content":!0,"dcx-accordion__content--scrollable":!!n.maxContentHeight},l={maxHeight:n.maxContentHeight||null};return e`
            <div class="${s(a)}">
              <h3 class="dcx-accordion__heading">
                <button
                  class="dcx-accordion__header"
                  id="accordion-header-${n.id}"
                  aria-expanded="${i}"
                  aria-controls="accordion-content-${n.id}"
                  ?disabled="${n.disabled}"
                  @click="${()=>t.toggleItem(n)}"
                  @keydown="${t.onHeaderKeydown}"
                >
                  ${n.icon?e`
                        <span class="dcx-accordion__icon" aria-hidden="true">
                          ${t.renderIcon(n.icon)}
                        </span>
                      `:r}
                  <span class="dcx-accordion__title-group">
                    <span class="dcx-accordion__title">${n.title}</span>
                    ${n.description?e`
                          <span class="dcx-accordion__description"
                            >${n.description}</span
                          >
                        `:r}
                  </span>
                  <span class="dcx-accordion__chevron" aria-hidden="true">
                    ${t.renderIcon(`chevron-down`)}
                  </span>
                </button>
              </h3>

              <div
                class="${s(o)}"
                id="accordion-content-${n.id}"
                aria-labelledby="accordion-header-${n.id}"
                aria-hidden="${!i}"
                role="region"
              >
                <div
                  class="${s(c)}"
                  style="${_(l)}"
                >
                  ${n.contentTemplate?typeof n.contentTemplate==`function`?n.contentTemplate():n.contentTemplate:n.content?y(n.content):``}
                </div>
              </div>
            </div>
          `})}
    </div>
  `},x=class extends i{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=`smooth`;get transition(){return this.#t}set transition(e){this.#t=e}#n=!0;get closeOthers(){return this.#n}set closeOthers(e){this.#n=e}#r=[];get expandedIds(){return this.#r}set expandedIds(e){this.#r=e}#i=`default`;get variant(){return this.#i}set variant(e){this.#i=e}#a=null;get ariaLabel(){return this.#a}set ariaLabel(e){this.#a=e}#o=new Set;get _expandedItems(){return this.#o}set _expandedItems(e){this.#o=e}willUpdate(e){if(e.has(`expandedIds`)||e.has(`items`)){let e=new Set;this.expandedIds&&this.expandedIds.length>0?this.expandedIds.forEach(t=>e.add(t)):this.items&&this.items.forEach(t=>{t.expanded&&e.add(t.id)}),this._expandedItems=e}}toggleItem(e){if(e.disabled)return;let t=this.isExpanded(e.id),n=new Set(this._expandedItems);t?(n.delete(e.id),this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:e,bubbles:!0,composed:!0}))):(this.closeOthers&&n.clear(),n.add(e.id),this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:e,bubbles:!0,composed:!0}))),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}onHeaderKeydown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.navigateFocus(`next`);break;case`ArrowUp`:e.preventDefault(),this.navigateFocus(`prev`);break;case`Home`:e.preventDefault(),this.navigateFocus(`first`);break;case`End`:e.preventDefault(),this.navigateFocus(`last`)}}expandItemById(e){let t=this.items.find(t=>t.id===e);if(!t||t.disabled||this.isExpanded(e))return;let n=new Set(this._expandedItems);this.closeOthers&&n.clear(),n.add(e),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}collapseItemById(e){let t=this.items.find(t=>t.id===e);if(!t||!this.isExpanded(e))return;let n=new Set(this._expandedItems);n.delete(e),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}isExpanded(e){return this._expandedItems.has(e)}expandAll(){let e=this.items.filter(e=>!e.disabled);this._expandedItems=new Set(e.map(e=>e.id)),e.forEach(e=>{this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0}))}),this.requestUpdate()}collapseAll(){let e=this.items.filter(e=>this.isExpanded(e.id));this._expandedItems=new Set,e.forEach(e=>{this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0}))}),this.requestUpdate()}navigateFocus(e){let t=Array.from(this.shadowRoot?.querySelectorAll(`button.dcx-accordion__header:not([disabled])`)||[]);if(!t.length)return;let n=this.shadowRoot?.activeElement||document.activeElement,r=t.indexOf(n),i;switch(e){case`next`:i=(r+1)%t.length;break;case`prev`:i=(r-1+t.length)%t.length;break;case`first`:i=0;break;case`last`:i=t.length-1}t[i]?.focus()}_getIconName(e){let t=e.toLowerCase();return t===`chevron-down`?`chevron-down`:t.includes(`speedometer`)?`speedometer2`:t.includes(`gear`)?`gear-fill`:t===`user`||t===`user-fill`||t.includes(`person`)?`person-fill`:t.includes(`info`)?`info-circle-fill`:t.includes(`star`)?`star-fill`:t===`help`||t===`help-fill`||t.includes(`question`)?`question-circle-fill`:t.includes(`clock`)||t.includes(`history`)?`clock-history`:t===`hand-pointer`||t.includes(`hand`)||t.includes(`pointer`)?`hand-index-thumb-fill`:t===`file-text`||t.includes(`file`)||t.includes(`text`)?`file-earmark-text`:t===`list`?`list`:e}renderIcon(t){let n=this._getIconName(t);return t.toLowerCase()===`chevron-down`?e`<dcx-web-icon name="${n}" size="auto"></dcx-web-icon>`:e`<dcx-web-icon name="${n}"></dcx-web-icon>`}static styles=m;render(){return b(this)}};l([c({type:Array}),d(`design:type`,Array),d(`design:paramtypes`,[])],x.prototype,`items`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`transition`,null),l([c({type:Boolean,attribute:`close-others`}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`closeOthers`,null),l([c({type:Array,attribute:`expanded-ids`}),d(`design:type`,Array),d(`design:paramtypes`,[])],x.prototype,`expandedIds`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`variant`,null),l([c({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`ariaLabel`,null),l([o(),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`_expandedItems`,null),x=l([p(`dcx-web-accordion`)],x);export{_ as n,y as t};