import{a as e,l as t,n,t as r}from"./lit-C11zoK0j.js";import{C as i,S as a,_ as o,a as s,b as c,g as ee,n as te,r as l,t as ne,v as u,w as d,x as f,y as re}from"./defaults-BtNg4Tf7.js";var ie=[`vertical`,`horizontal`],ae=[`start`,`center`,`end`],p=[`s`,`m`,`l`,`xl`,`auto`],oe=[`top`,`bottom`,`left`,`right`],se=`vertical`,ce=`center`,le=[`xs`,`s`,`m`,`l`,`xl`],m=`info-circle`,h={showLabel:!0,textLabel:`Value`,value:0,step:1,vertical:!1,min:0,max:50,disabled:!1,valueSuffix:``},ue=`Select`,g=[{value:`one`,label:`Uno`},{value:`two`,label:`Dos`},{value:`three`,label:`Tres`}],_=`Seleccione una opción`,de=`160px`,v=[`bold`,`italic`,`underline`,`orderedList`,`unorderedList`,`removeFormat`],fe=t`
  :host {
    display: inline-flex;
  }

  .dcx-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    min-width: 1.5rem;
    padding: 0 8px;
    height: 1.5rem;
    font-size: 11px;
    box-sizing: border-box;
  }

  .dcx-badge--sm {
    min-width: 1rem;
    height: 1rem;
    padding: 0 4px;
    font-size: 10px;
  }

  .dcx-badge--lg {
    min-width: 2rem;
    height: 2rem;
    padding: 0 8px;
    font-size: 13px;
  }

  .dcx-badge--xl {
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 12px;
    font-size: 15px;
  }

  .dcx-badge--primary {
    background-color: #0058ab;
    color: #ffffff;
  }

  .dcx-badge--secondary {
    background-color: #696e75;
    color: #ffffff;
  }

  .dcx-badge--success {
    background-color: #16a34a;
    color: #ffffff;
  }

  .dcx-badge--info {
    background-color: #0284c7;
    color: #ffffff;
  }

  .dcx-badge--warn {
    background-color: #b45309;
    color: #ffffff;
  }

  .dcx-badge--danger {
    background-color: #dc2626;
    color: #ffffff;
  }
`,pe=t=>{let n=`dcx-badge dcx-badge--${t.severity} dcx-badge--${t.size}`;return e`
    <span
      class="${n}"
      role="${t.roleAttr||``}"
      aria-label="${t.getComputedAriaLabel()||``}"
      aria-hidden="${t.ariaHiddenAttr?`true`:`false`}"
    >${t.value}</span>
  `},y=class extends r{#e=``;get value(){return this.#e}set value(e){this.#e=e}#t=`primary`;get severity(){return this.#t}set severity(e){this.#t=e}#n=`md`;get size(){return this.#n}set size(e){this.#n=e}#r=null;get ariaLabel(){return this.#r}set ariaLabel(e){this.#r=e}#i=!1;get ariaHiddenAttr(){return this.#i}set ariaHiddenAttr(e){this.#i=e}#a=null;get roleAttr(){return this.#a}set roleAttr(e){this.#a=e}static styles=fe;getComputedAriaLabel(){if(this.ariaHiddenAttr)return null;if(this.ariaLabel!==null)return this.ariaLabel;let e=this.value;return e?`${e}, ${this.severity}`:this.severity}render(){return pe(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],y.prototype,`value`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],y.prototype,`severity`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],y.prototype,`size`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],y.prototype,`ariaLabel`,null),o([i({type:Boolean,attribute:`aria-hidden`}),u(`design:type`,Object),u(`design:paramtypes`,[])],y.prototype,`ariaHiddenAttr`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],y.prototype,`roleAttr`,null),y=o([d(`dcx-web-badge`)],y);var me=t`
  :host {
    display: block;
  }

  .dcx-dialog-root {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }

  .dcx-dialog__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    transition: opacity 200ms ease;
    opacity: 1;
  }

  .dcx-dialog {
    font-family: var(--ff-base, 'Inter', sans-serif);
    line-height: 1.5;
    position: absolute;
    background: var(--bg-default, #ffffff);
    border-radius: var(--r-lg, 8px);
    width: 420px;
    max-width: 90%;
    max-height: 70vh;
    opacity: 1;
    transition: opacity 200ms ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 var(--sp-5, 20px) var(--sp-16, 64px) rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .dcx-dialog--pos-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .dcx-dialog--pos-top {
    top: var(--sp-4, 16px);
    left: 50%;
    transform: translate(-50%, 0);
  }

  .dcx-dialog--pos-bottom {
    bottom: var(--sp-4, 16px);
    left: 50%;
    transform: translate(-50%, 0);
  }

  .dcx-dialog--pos-left {
    left: var(--sp-4, 16px);
    top: 50%;
    transform: translate(0, -50%);
  }

  .dcx-dialog--pos-right {
    right: var(--sp-4, 16px);
    top: 50%;
    transform: translate(0, -50%);
  }

  .dcx-dialog--pos-top-left {
    top: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
  }

  .dcx-dialog--pos-top-right {
    top: var(--sp-4, 16px);
    right: var(--sp-4, 16px);
  }

  .dcx-dialog--pos-bottom-left {
    bottom: var(--sp-4, 16px);
    left: var(--sp-4, 16px);
  }

  .dcx-dialog--pos-bottom-right {
    bottom: var(--sp-4, 16px);
    right: var(--sp-4, 16px);
  }

  .dcx-dialog__header {
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    border-bottom: 1px solid var(--border-default, #2a2e33);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .dcx-dialog__title {
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
    margin: 0;
  }

  .dcx-dialog__close {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    background: none;
    border: none;
  }

  .dcx-dialog__body {
    font-size: var(--fs-base, 14px);
    color: var(--text-muted, #696e75);
    padding: var(--sp-5, 20px);
    overflow-y: auto;
    flex: 1 1 auto;
    min-height: 0;
  }

  .dcx-dialog__footer {
    padding: var(--sp-3, 12px) var(--sp-5, 20px);
    border-top: 1px solid var(--border-default, #2a2e33);
    background: var(--bg-surface, #f4f5f7);
    display: flex;
    justify-content: flex-end;
    gap: var(--sp-4, 16px);
    flex-shrink: 0;
  }
`,he=t=>t.visible?e`
    <div class="dcx-dialog-root">
      <div
        class="dcx-dialog__backdrop"
        @pointerdown=${t.onBackdropClick.bind(t)}
      ></div>

      <div
        class="${t.dialogClasses}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="${ee(t.title?t.dialogTitleId:void 0)}"
      >
        <div class="dcx-dialog__header">
          ${t.title?e`
                  <h3
                    id="${t.dialogTitleId}"
                    class="dcx-dialog__title"
                  >
                    ${t.title}
                  </h3>
                `:null}

          ${t.showClose?e`
                  <dcx-web-button
                    variant="icon-only"
                    size="s"
                    icon-name="x-lg"
                    class="dcx-dialog__close"
                    aria-label="Cerrar diálogo"
                    @buttonClick=${()=>t.close()}
                  >
                  </dcx-web-button>
                `:null}
        </div>

        <div class="dcx-dialog__body">
          <slot name="body"></slot>
        </div>

        <div class="dcx-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  `:e``,b=class extends r{#e=`center`;get position(){return this.#e}set position(e){this.#e=e}#t=``;get title(){return this.#t}set title(e){this.#t=e}#n=``;get dialogId(){return this.#n}set dialogId(e){this.#n=e}#r=!0;get showClose(){return this.#r}set showClose(e){this.#r=e}#i=!0;get closeOnBackdrop(){return this.#i}set closeOnBackdrop(e){this.#i=e}#a=!1;get visible(){return this.#a}set visible(e){this.#a=e}static styles=me;get dialogTitleId(){return`dialog-title-${this.dialogId||`default`}`}get dialogClasses(){return`dcx-dialog dcx-dialog--pos-${this.position}`}close(){this.dispatchEvent(new CustomEvent(`closeDialog`,{bubbles:!0,composed:!0}))}onBackdropClick(e){e.stopPropagation(),this.closeOnBackdrop&&this.close()}onKeyDown=e=>{e.key===`Escape`&&this.visible&&this.close()};connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.onKeyDown)}disconnectedCallback(){document.removeEventListener(`keydown`,this.onKeyDown),super.disconnectedCallback()}render(){return he(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],b.prototype,`position`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],b.prototype,`title`,null),o([i({type:String,attribute:`dialog-id`}),u(`design:type`,Object),u(`design:paramtypes`,[])],b.prototype,`dialogId`,null),o([i({type:Boolean,attribute:`show-close`}),u(`design:type`,Object),u(`design:paramtypes`,[])],b.prototype,`showClose`,null),o([i({type:Boolean,attribute:`close-on-backdrop`}),u(`design:type`,Object),u(`design:paramtypes`,[])],b.prototype,`closeOnBackdrop`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],b.prototype,`visible`,null),b=o([d(`dcx-web-dialog`)],b);var ge=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-card {
    display: block;
    background: transparent;
    border: none;
    padding: 0;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    outline: none;
  }

  .dcx-card--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .dcx-card--interactive {
    cursor: pointer;
  }

  .dcx-card--interactive:not(.dcx-card--disabled):hover {
    transform: translateY(-2px);
  }

  .dcx-card--interactive:not(.dcx-card--disabled):hover .dcx-card__inner {
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
  }

  .dcx-card:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: var(--sp-1, 4px);
    border-radius: var(--r-sm, 4px);
  }

  .dcx-card__inner {
    display: flex;
    flex-direction: column;
    background: var(--bg-default, #ffffff);
    border-style: var(--card-border-style);
    border-color: var(--bg-primary, #0058ab);
    border-width: var(--card-border-width);
    position: relative;
    box-shadow: var(--card-shadow, var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08)));
    width: 100%;
    max-width: var(--card-max-content-width, 420px);
    box-sizing: border-box;
  }

  .dcx-card__inner--layout-vertical {
    flex-direction: column;
  }

  .dcx-card__inner--layout-horizontal {
    flex-direction: row;
    align-items: stretch;
    gap: var(--sp-4, 16px);
  }


  .dcx-card__inner--size-s {
    padding: var(--sp-3, 12px);
    gap: var(--sp-2, 8px);
    border-radius: var(--r-xl, 12px);
    --card-max-image-width: 92%;
  }

  .dcx-card__inner--size-m {
    padding: var(--sp-4, 16px);
    gap: var(--sp-3, 12px);
    border-radius: var(--r-lg, 8px);
    --card-max-image-width: 100%;
  }

  .dcx-card__inner--size-l {
    padding: var(--sp-6, 24px);
    gap: var(--sp-4, 16px);
    border-radius: var(--r-xl, 12px);
    --card-max-image-width: 100%;
  }

  .dcx-card__inner--size-xl {
    padding: var(--sp-10, 40px);
    gap: var(--sp-5, 20px);
    border-radius: var(--r-xl, 12px);
    --card-max-image-width: 100%;
  }

  .dcx-card__inner--layout-horizontal.dcx-card__inner--align-start {
    justify-content: flex-start;
  }

  .dcx-card__inner--layout-horizontal.dcx-card__inner--align-center {
    justify-content: center;
  }

  .dcx-card__inner--layout-horizontal.dcx-card__inner--align-end {
    justify-content: flex-end;
  }

  .dcx-card__image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }

  .dcx-card__image {
    display: block;
    width: 100%;
    max-width: var(--card-max-image-width, 180px);
    border-radius: var(--r-md, 6px);
    object-fit: cover;
  }

  .dcx-card__inner--layout-horizontal .dcx-card__image-container {
    flex: 0 0 auto;
    max-width: var(--card-max-image-width, 180px);
    margin-right: var(--sp-4, 16px);
  }

  .dcx-card__inner--layout-horizontal .dcx-card__body {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dcx-card__inner--accent-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--sp-1, 4px);
    background: linear-gradient(
      90deg,
      var(--bg-primary, #0058ab),
      var(--color-success, #16a34a)
    );
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    z-index: 2;
  }

  .dcx-card__body {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    min-width: 0;
  }

  .dcx-card__header {
    margin-bottom: var(--sp-4, 16px);
  }

  .dcx-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    max-width: 100%;
    min-width: 0;
  }

  .dcx-card__footer {
    margin-top: var(--sp-4, 16px);
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--sp-2, 8px);
    justify-content: flex-start;
  }

  .dcx-card__title {
    margin: 0 0 var(--sp-2, 8px) 0;
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-card__subtitle {
    margin: 0;
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-regular, 400);
  }


  .dcx-card__inner--size-s .dcx-card__title,
  .dcx-card__inner--size-s ::slotted(h3),
  .dcx-card__inner--size-s ::slotted(.dcx-card__title) {
    font-size: var(--fs-md, 16px);
  }
  .dcx-card__inner--size-s .dcx-card__subtitle,
  .dcx-card__inner--size-s ::slotted(p),
  .dcx-card__inner--size-s ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-base, 14px);
  }

 
  .dcx-card__inner--size-m .dcx-card__title,
  .dcx-card__inner--size-m ::slotted(h3),
  .dcx-card__inner--size-m ::slotted(.dcx-card__title) {
    font-size: var(--fs-lg, 18px);
  }
  .dcx-card__inner--size-m .dcx-card__subtitle,
  .dcx-card__inner--size-m ::slotted(p),
  .dcx-card__inner--size-m ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-md, 16px);
  }

  .dcx-card__inner--size-l .dcx-card__title,
  .dcx-card__inner--size-l ::slotted(h3),
  .dcx-card__inner--size-l ::slotted(.dcx-card__title) {
    font-size: var(--fs-xl, 20px);
  }
  .dcx-card__inner--size-l .dcx-card__subtitle,
  .dcx-card__inner--size-l ::slotted(p),
  .dcx-card__inner--size-l ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-md, 16px);
  }

  .dcx-card__inner--size-xl .dcx-card__title,
  .dcx-card__inner--size-xl ::slotted(h3),
  .dcx-card__inner--size-xl ::slotted(.dcx-card__title) {
    font-size: var(--fs-2xl, 24px);
  }
  .dcx-card__inner--size-xl .dcx-card__subtitle,
  .dcx-card__inner--size-xl ::slotted(p),
  .dcx-card__inner--size-xl ::slotted(.dcx-card__subtitle) {
    font-size: var(--fs-lg, 18px);
  }


  .dcx-card__inner--align-start .dcx-card__body > * {
    align-self: flex-start;
    text-align: left;
  }

  .dcx-card__inner--align-center .dcx-card__body > * {
    align-self: center;
    text-align: center;
  }

  .dcx-card__inner--align-end .dcx-card__body > * {
    align-self: flex-end;
    text-align: right;
  }

  .dcx-card__inner--align-start .dcx-card__footer {
    justify-content: flex-start;
  }

  .dcx-card__inner--align-center .dcx-card__footer {
    justify-content: center;
  }

  .dcx-card__inner--align-end .dcx-card__footer {
    justify-content: flex-end;
  }

  .dcx-card__inner--align-start .dcx-card__image-container {
    justify-content: flex-start;
  }

  .dcx-card__inner--align-center .dcx-card__image-container {
    justify-content: center;
  }

  .dcx-card__inner--align-end .dcx-card__image-container {
    justify-content: flex-end;
  }
`,_e=t=>e`
    <div
      class="${t.cardClasses}"
      tabindex="${t.cardTabIndex??n}"
      role="${t.cardRole}"
      aria-disabled="${t.disabled}"
      aria-label="${t.effectiveAriaLabel??n}"
      @click="${t._handleCardClick}"
      @keydown="${t._handleCardClick}"
    >
      <div class="${t.innerClasses}" style="${c(t.innerStyles)}">
        ${t.image?e`
              <div class="dcx-card__image-container">
                <img
                  src="${t.image}"
                  alt="${t.imageAlt}"
                  class="dcx-card__image"
                />
              </div>
            `:n}

        <div class="dcx-card__body">

          ${t.hasHeader?e`
                <div class="dcx-card__header">
                  <slot name="header"></slot>
                </div>
              `:t.title||t.subtitle?e`
                <div class="dcx-card__header">
                  ${t.title?e`<h3 class="dcx-card__title">${t.title}</h3>`:n}
                  ${t.subtitle?e`<p class="dcx-card__subtitle">${t.subtitle}</p>`:n}
                </div>
              `:n}

          ${t.hasContent?e`
                <div class="dcx-card__content">
                  <slot name="content"></slot>
                  <slot></slot>
                </div>
              `:n}

          ${t.hasFooter?e`
                <div class="dcx-card__footer">
                  <slot name="footer"></slot>
                </div>
              `:n}

        </div>
      </div>
    </div>
  `,x=class extends r{#e=`https://picsum.photos/360/240`;get image(){return this.#e}set image(e){this.#e=e}#t=``;get imageAlt(){return this.#t}set imageAlt(e){this.#t=e}#n=`Título de la carta`;get title(){return this.#n}set title(e){this.#n=e}#r=`Subtítulo de la carta`;get subtitle(){return this.#r}set subtitle(e){this.#r=e}#i=`vertical`;get layout(){return this.#i}set layout(e){this.#i=e}#a=`center`;get align(){return this.#a}set align(e){this.#a=e}#o=`s`;get size(){return this.#o}set size(e){this.#o=e}#s=`560px`;get maxContentWidth(){return this.#s}set maxContentWidth(e){this.#s=e}#c=`100%`;get maxImageWidth(){return this.#c}set maxImageWidth(e){this.#c=e}#l=!1;get accent(){return this.#l}set accent(e){this.#l=e}#u=!1;get bordered(){return this.#u}set bordered(e){this.#u=e}#d=1;get borderWidth(){return this.#d}set borderWidth(e){this.#d=e}#f=`solid`;get borderStyle(){return this.#f}set borderStyle(e){this.#f=e}#p=1;get shadow(){return this.#p}set shadow(e){this.#p=e}#m=!0;get interactive(){return this.#m}set interactive(e){this.#m=e}#h=!1;get disabled(){return this.#h}set disabled(e){this.#h=e}static styles=ge;get cardClasses(){return`dcx-card ${this.interactive?`dcx-card--interactive`:``} ${this.disabled?`dcx-card--disabled`:``}`.trim().replace(/\s+/g,` `)}get innerClasses(){let e=this.accent?`dcx-card__inner--accent-top`:``;return`dcx-card__inner dcx-card__inner--layout-${this.layout} dcx-card__inner--align-${this.align} dcx-card__inner--size-${this.size} ${e}`.trim().replace(/\s+/g,` `)}get innerStyles(){return{"--card-max-content-width":this.maxContentWidth,"--card-max-image-width":this.maxImageWidth,"--card-border-style":this.bordered?this.borderStyle:`solid`,"--card-border-width":this.bordered?`${this.borderWidth}px`:`0`,"--card-shadow":this.shadowCSS}}get cardRole(){return this.disabled?`region`:this.interactive?`button`:`region`}get cardTabIndex(){if(this.disabled)return-1;if(this.cardRole===`button`)return 0}get hasHeader(){return this.querySelector(`[slot="header"]`)!==null}get hasContent(){return this.querySelector(`[slot="content"]`)!==null||Array.from(this.childNodes).some(e=>e.nodeType===Node.ELEMENT_NODE&&!e.hasAttribute(`slot`)||e.nodeType===Node.TEXT_NODE&&(e.textContent??``).trim().length>0)}get hasFooter(){return this.querySelector(`[slot="footer"]`)!==null}get effectiveAriaLabel(){return this.cardRole===`region`&&!this.hasHeader&&this.title?this.title:null}get shadowCSS(){switch(this.shadow){case 1:return`var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06))`;case 2:return`var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))`;case 3:return`var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12))`;default:return`var(--shadow-0, none)`}}_handleCardClick(e){if(!this.disabled){if(e instanceof KeyboardEvent){let t=e.key.toLowerCase();this.interactive&&(t===`enter`||t===` `)&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dcx-card-click`,{detail:e,bubbles:!0,composed:!0})))}else this.dispatchEvent(new CustomEvent(`dcx-card-click`,{detail:e,bubbles:!0,composed:!0}))}}render(){return _e(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`image`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`imageAlt`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`title`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`subtitle`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`layout`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`align`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`size`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`maxContentWidth`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`maxImageWidth`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`accent`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`bordered`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`borderWidth`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`borderStyle`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`shadow`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`interactive`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],x.prototype,`disabled`,null),x=o([d(`dcx-web-card`)],x);var ve=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
  }

  .dcx-checkbox-group__options {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3, 12px);
  }

  .dcx-checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    cursor: pointer;
    user-select: none;
    width: fit-content;
  }

  .dcx-checkbox-label--disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-checkbox-label--left {
    flex-direction: row;
  }

  .dcx-checkbox-text {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);
  }

  .dcx-checkbox-text--error {
    color: var(--color-error, #dc2626);
  }

  .dcx-checkbox__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-checkbox__error {
    display: flex;
    align-items: center;
    gap: var(--sp-1, 4px);
    margin-top: var(--sp-1, 4px);
    color: var(--text-error, var(--color-error, #dc2626));
    font-size: var(--fs-sm, 12px);
  }

  .dcx-checkbox__error-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }
`,ye=t=>e`
    <div class="dcx-checkbox-group">
      <div class="dcx-checkbox-group__options">
        ${t.options.map(n=>{let r=t.getIconName(n);return e`
            <label
              class="dcx-checkbox-label
                ${n.disabled?`disabled`:``}
                ${n.labelPosition===`left`?`label-left`:``}"
            >
              ${n.labelPosition===`left`||n.labelPosition===void 0?t.renderLabel(n):``}

              <dcx-web-button
                variant="${t.getVariant(n)}"
                ?icon=${r!==``}
                is-checkbox
                ?disabled=${n.disabled??!1}
                ?checkbox-error=${n.error??!1}
                icon-name="${r}"
                icon-size="xl"
                aria-label="${n.label??`Checkbox`}"
                aria-checked="${t.getAriaChecked(n)}"
                aria-disabled="${n.disabled||null}"
                aria-describedby="${n.error&&n.errorMessage?`checkbox-error-${n.id}`:``}"
                @buttonClick=${()=>t.changeValue(n.id)}
              >
              </dcx-web-button>

              ${n.labelPosition===`right`?t.renderLabel(n):``}
            </label>

            ${n.error&&n.errorMessage!==``?e`
                  <div
                    class="dcx-checkbox__error"
                    id="checkbox-error-${n.id}"
                    role="alert"
                  >
                    <dcx-web-icon
                      name="${t.errorIcon}"
                      aria-label="Error"
                      color="var(--color-error, #dc2626)"
                    >
                    </dcx-web-icon>

                    <span>${n.errorMessage}</span>
                  </div>
                `:``}
          `})}
      </div>
    </div>
  `,S=class extends r{static styles=ve;#e=[];get options(){return this.#e}set options(e){this.#e=e}errorIcon=`exclamation-circle-fill`;_getValue(e){return e===!0?!1:e!==!1||null}_normalizeValue(e){return e===!0||e!==!1&&null}getVariant(e){return this._normalizeValue(e.value)===null?`secondary`:`primary`}getIconName(e){let t=this._normalizeValue(e.value);return t===!0?`check`:t===!1?`dash`:``}getAriaChecked(e){let t=this._normalizeValue(e.value);return t===!0?`true`:t===!1?`mixed`:`false`}changeValue(e){let t=this.options.map(t=>t.id===e?{...t,value:this._getValue(t.value)}:t);this.dispatchEvent(new CustomEvent(`changeOptions`,{detail:t,bubbles:!0,composed:!0}))}renderLabel(t){return e`
      <span
        class="dcx-checkbox-text ${t.error?`error`:``}"
      >
        ${t.label}
      </span>

      ${t.required?e`
            <span
              class="dcx-checkbox__required"
              aria-hidden="true"
            >
              *
            </span>
          `:``}
    `}render(){return ye(this)}};o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],S.prototype,`options`,null),S=o([d(`dcx-web-checkbox`)],S);var be=t`
  :host {
    display: block;
  }

  :host(.horizontal) {
    width: var(
      --dcx-divider-size,
      var(--_dcx-divider-size, 100%)
    );
    height: auto;
  }

  :host(.vertical) {
    height: var(
      --dcx-divider-size,
      var(--_dcx-divider-size, 100%)
    );
    width: auto;
  }

  .dcx-divider {
    margin: 0;
    display: block;
  }

  :host(.horizontal) .dcx-divider:not(.dcx-divider--labeled) {
    width: 100%;
    height: 0;
    border-top:
      var(
        --dcx-divider-thickness,
        var(--_dcx-divider-thickness, 1px)
      )
      var(
        --dcx-divider-style,
        var(--_dcx-divider-style, solid)
      )
      var(
        --dcx-divider-color,
        var(--_dcx-divider-color, var(--border-light, #d1d5db))
      );
  }

  :host(.vertical) .dcx-divider:not(.dcx-divider--labeled) {
    height: 100%;
    width: 0;
    border-left:
      var(
        --dcx-divider-thickness,
        var(--_dcx-divider-thickness, 1px)
      )
      var(
        --dcx-divider-style,
        var(--_dcx-divider-style, solid)
      )
      var(
        --dcx-divider-color,
        var(--_dcx-divider-color, var(--border-light, #d1d5db))
      );
  }

  :host(.horizontal) .dcx-divider--labeled {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    border: none;
  }

  :host(.vertical) .dcx-divider--labeled {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 0.5rem;
    border: none;
  }

  :host(.horizontal) .dcx-divider__line {
    flex: 1;
    height: 0;
    border-top:
      var(
        --dcx-divider-thickness,
        var(--_dcx-divider-thickness, 1px)
      )
      var(
        --dcx-divider-style,
        var(--_dcx-divider-style, solid)
      )
      var(
        --dcx-divider-color,
        var(--_dcx-divider-color, var(--border-light, #d1d5db))
      );
  }

  :host(.vertical) .dcx-divider__line {
    flex: 1;
    width: 0;
    border-left:
      var(
        --dcx-divider-thickness,
        var(--_dcx-divider-thickness, 1px)
      )
      var(
        --dcx-divider-style,
        var(--_dcx-divider-style, solid)
      )
      var(
        --dcx-divider-color,
        var(--_dcx-divider-color, var(--border-light, #d1d5db))
      );
  }

  .dcx-divider__label {
    color: var(
      --dcx-divider-color,
      var(--_dcx-divider-color, var(--border-light, #d1d5db))
    );
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  :host(.vertical) .dcx-divider__label {
    writing-mode: vertical-lr;
    text-orientation: mixed;
  }
`,xe=t=>{let n=t.getComputedAriaLabel(),r=t.isHidden();return t.label?e`
      <div
        class="dcx-divider dcx-divider--labeled"
        role="separator"
        aria-orientation="${t.orientation}"
        aria-label="${n}"
        aria-hidden="${r?`true`:`false`}"
      >
        <span class="dcx-divider__line" aria-hidden="true"></span>
        <span class="dcx-divider__label">${t.label}</span>
        <span class="dcx-divider__line" aria-hidden="true"></span>
      </div>
    `:e`
    <span
      class="dcx-divider"
      role="separator"
      aria-orientation="${t.orientation}"
      aria-label="${n}"
      aria-hidden="${r?`true`:`false`}"
    ></span>
  `},C=class extends r{#e=`horizontal`;get orientation(){return this.#e}set orientation(e){this.#e=e}#t=`default`;get type(){return this.#t}set type(e){this.#t=e}#n=`auto`;get size(){return this.#n}set size(e){this.#n=e}#r=.25;get thickness(){return this.#r}set thickness(e){this.#r=e}#i=`#d1d5db`;get color(){return this.#i}set color(e){this.#i=e}#a=``;get label(){return this.#a}set label(e){this.#a=e}#o=null;get ariaLabel(){return this.#o}set ariaLabel(e){this.#o=e}static styles=be;_getDividerStyle(){switch(this.type){case`dot`:return`dotted`;case`dash`:return`dashed`;default:return`solid`}}_getDividerSize(){switch(this.size){case`s`:return`5rem`;case`m`:return`15rem`;case`l`:return`30rem`;case`xl`:return`35rem`;default:return`100%`}}getComputedAriaLabel(){return this.ariaLabel&&this.ariaLabel.trim().length>0?this.ariaLabel:this.label&&this.label.trim().length>0?this.label:``}isHidden(){return!this.label&&!this.ariaLabel}updated(){this.classList.toggle(`horizontal`,this.orientation===`horizontal`),this.classList.toggle(`vertical`,this.orientation===`vertical`),this.classList.toggle(`has-label`,!!this.label),this.style.setProperty(`--_dcx-divider-size`,this._getDividerSize()),this.style.setProperty(`--_dcx-divider-style`,this._getDividerStyle()),this.style.setProperty(`--_dcx-divider-thickness`,`${this.thickness}rem`),this.style.setProperty(`--_dcx-divider-color`,this.color)}render(){return xe(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`orientation`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`type`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`size`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`thickness`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`color`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`label`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],C.prototype,`ariaLabel`,null),C=o([d(`dcx-web-divider`)],C);var Se=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  dcx-web-icon {
    color: inherit;
  }

  .dcx-bc {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--sp-2, 8px);
  }

  .dcx-bc__item {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    color: var(--text-muted, #696e75);
    font-size: var(--fs-base, 14px);
    line-height: 1.2;
  }

  .dcx-bc__link {
    color: var(--bg-primary, #0058ab);
    text-decoration: none;
    font-weight: var(--fw-medium, 500);
    border: 1px solid transparent;
    border-radius: var(--r-sm, 4px);
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
    display: inline-flex;
    align-items: center;
  }

  .dcx-bc__link:hover {
    color: var(--bg-primary-hover, #004080);
    text-decoration: underline;
  }

  .dcx-bc__link:focus-visible {
    border-color: var(--border-focus, #1db8f2);
    outline: none;
  }

  .dcx-bc__link[aria-disabled='true'] {
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
    text-decoration: none;
    pointer-events: none;
  }

  .dcx-bc__action-btn,
  .dcx-bc__ellipsis-btn {
    --text-dark: var(--bg-primary, #0058ab);
  }

  .dcx-bc__action-btn:hover,
  .dcx-bc__ellipsis-btn:hover {
    --text-dark: var(--bg-primary-hover, #004080);
  }

  .dcx-bc__current {
    display: inline-flex;
    align-items: center;
    color: var(--text-dark, #2a2e33);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-bc__current:focus-visible {
    outline: 1px solid var(--border-focus, #1db8f2);
    outline-offset: 1px;
    border-radius: var(--r-sm, 4px);
  }

  .dcx-bc__current.disabled {
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
  }

  .dcx-bc__item--ellipsis {
    position: relative;
  }

  .dcx-bc__sep {
    display: flex;
    align-items: center;
    color: var(--text-muted, #696e75);
    font-size: var(--fs-sm, 12px);
    user-select: none;
  }

  .dcx-context-menu {
    display: none;
    position: absolute;
    z-index: 9999;
    width: 240px;
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
    color: var(--text-dark, #2a2e33);
    padding: var(--sp-1, 4px);
    top: calc(100% + var(--sp-1, 4px));
    left: 0;
    outline: none;
  }

  .dcx-context-menu.open {
    display: block;
    animation: dcxContextMenuEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .dcx-context-menu__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .dcx-context-menu__item {
    margin: 2px 0;
    border-radius: var(--r-md, 6px);
    transition:
      background-color 0.15s ease-out,
      transform 0.15s ease-out,
      color 0.15s ease-out;
    cursor: pointer;
  }

  .dcx-context-menu__item.selectable:hover {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-context-menu__item.selectable:active {
    transform: scale(0.98);
  }

  .dcx-context-menu__item.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .dcx-context-menu__item.disabled:hover {
    background-color: transparent;
    transform: none;
  }

  .dcx-context-menu__item-content {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    gap: var(--sp-3, 12px);
    display: flex;
    align-items: center;
  }

  .dcx-context-menu__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp-5, 20px);
    color: var(--text-muted, #696e75);
  }

  .dcx-context-menu__item.selectable:hover .dcx-context-menu__icon {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-context-menu__text {
    flex: 1;
  }

  @keyframes dcxContextMenuEnter {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`,Ce=t=>{let n=t.items.length,r=n>t.maxVisibleItems,i=[],a=[];r?(i=t.items.slice(0,n-t.maxVisibleItems),a=t.items.slice(-t.maxVisibleItems)):a=t.items;let o=a[a.length-1]||null;return e`
    <nav aria-label="Breadcrumb">
      <ol class="dcx-bc" role="list">
        ${r?e`
              <li class="dcx-bc__item dcx-bc__item--ellipsis">
                <dcx-web-button
                  class="dcx-bc__ellipsis-btn"
                  variant="terciary"
                  size="s"
                  label="..."
                  aria-label="Mostrar rutas anteriores"
                  aria-expanded="${t.isEllipsisMenuOpen?`true`:`false`}"
                  aria-haspopup="true"
                  @click="${t.toggleEllipsisMenu}"
                ></dcx-web-button>

                <div class="dcx-context-menu dcx-context-menu--absolute ${t.isEllipsisMenuOpen?`open`:``}" role="menu" aria-label="Menú contextual">
                  <ul class="dcx-context-menu__list">
                    ${i.map(n=>e`
                        <li
                          class="dcx-context-menu__item selectable ${n.disabled?`disabled`:``}"
                          role="menuitem"
                          @click="${e=>t.onHiddenItemClick(n,e)}"
                        >
                          <span class="dcx-context-menu__item-content">
                            ${n.icon?e`<span class="dcx-context-menu__icon">${t.renderItemIcon(n.icon)}</span>`:``}
                            <span class="dcx-context-menu__text">${n.label}</span>
                          </span>
                        </li>
                      `)}
                  </ul>
                </div>

                <span class="dcx-bc__sep" aria-hidden="true">
                  ${t.renderSeparatorIcon()}
                </span>
              </li>
            `:``}
        ${a.map(n=>{let r=n===o;return e`
            <li class="dcx-bc__item">
              ${r?e`
                    <span
                      class="dcx-bc__current ${n.disabled?`disabled`:``}"
                      aria-current="page"
                      aria-label="${n.icon?n.label:void 0}"
                    >
                      ${n.icon?t.renderItemIcon(n.icon):n.label}
                    </span>
                  `:n.href?e`
                      <a
                        class="dcx-bc__link ${n.icon?`dcx-bc__link--icon`:``}"
                        href="${n.href}"
                        aria-disabled="${n.disabled?`true`:`false`}"
                        aria-label="${n.icon?n.label:void 0}"
                        @click="${e=>t.onItemClick(n,e)}"
                      >
                        ${n.icon?t.renderItemIcon(n.icon):n.label}
                      </a>
                    `:e`
                      <dcx-web-button
                        class="dcx-bc__action-btn ${n.icon?`dcx-bc__action-btn--icon`:``}"
                        variant="terciary"
                        size="s"
                        .label="${n.icon?``:n.label}"
                        ?disabled="${n.disabled}"
                        aria-disabled="${n.disabled?`true`:`false`}"
                        aria-label="${n.icon?n.label:void 0}"
                        @click="${e=>t.onItemClick(n,e)}"
                      >
                        ${n.icon?e`<span slot="dcx-icon">${t.renderItemIcon(n.icon)}</span>`:``}
                      </dcx-web-button>
                    `}
              ${r?``:e`
                    <span class="dcx-bc__sep" aria-hidden="true">
                      ${t.renderSeparatorIcon()}
                    </span>
                  `}
            </li>
          `})}
      </ol>
    </nav>
  `},w=class extends r{maxVisibleItems=3;#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=`chevron-right`;get iconSeparator(){return this.#t}set iconSeparator(e){this.#t=e}#n=!1;get isEllipsisMenuOpen(){return this.#n}set isEllipsisMenuOpen(e){this.#n=e}static styles=Se;connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this._handleDocumentClick),document.addEventListener(`keydown`,this._handleKeyDown)}disconnectedCallback(){document.removeEventListener(`click`,this._handleDocumentClick),document.removeEventListener(`keydown`,this._handleKeyDown),super.disconnectedCallback()}_handleDocumentClick=e=>{let t=e.composedPath();this.isEllipsisMenuOpen&&!t.includes(this)&&(this.isEllipsisMenuOpen=!1)};_handleKeyDown=e=>{e.key===`Escape`&&this.isEllipsisMenuOpen&&(this.isEllipsisMenuOpen=!1,this.shadowRoot?.querySelector(`.dcx-bc__ellipsis-btn`)?.focus())};toggleEllipsisMenu(e){e.preventDefault(),e.stopPropagation(),this.isEllipsisMenuOpen=!this.isEllipsisMenuOpen}onItemClick(e,t){if(e.disabled){t.preventDefault();return}this.dispatchEvent(new CustomEvent(`itemSelected`,{detail:e,bubbles:!0,composed:!0}))}onHiddenItemClick(e,t){t.stopPropagation(),!e.disabled&&(this.isEllipsisMenuOpen=!1,this.dispatchEvent(new CustomEvent(`itemSelected`,{detail:e,bubbles:!0,composed:!0})),e.href&&window.location.assign(e.href))}renderSeparatorIcon(){switch(this.iconSeparator){case`slash-lg`:return e`<dcx-web-icon name="slash-lg"></dcx-web-icon>`;case`arrow-right-short`:return e`<dcx-web-icon name="arrow-right-short"></dcx-web-icon>`;default:return e`<dcx-web-icon name="chevron-right"></dcx-web-icon>`}}renderItemIcon(t){return e`<dcx-web-icon name="${t}"></dcx-web-icon>`}render(){return Ce(this)}};o([i({type:Array}),u(`design:type`,Array),u(`design:paramtypes`,[])],w.prototype,`items`,null),o([i({type:String,attribute:`icon-separator`}),u(`design:type`,Object),u(`design:paramtypes`,[])],w.prototype,`iconSeparator`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],w.prototype,`isEllipsisMenuOpen`,null),w=o([d(`dcx-web-breadcrumb`)],w);var T=t`
  :host {
    display: contents;
  }

  .dcx-context-menu {
    position: fixed;
    z-index: 9999;
    width: 240px;
    overflow: visible;
    background: var(--bg-default, #ffffff);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    box-shadow:
      var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06)),
      var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08)),
      var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    color: var(--text-dark, #2a2e33);
    padding: var(--sp-1, 4px);
    animation: dcxContextMenuEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    outline: none;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-context-menu:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-context-menu--absolute {
    position: absolute;
  }

  .dcx-context-menu__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .dcx-context-menu__list ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .dcx-context-menu__list .dcx-context-menu__divider {
    margin: 6px var(--sp-2, 8px);
    background-color: var(--bg-pressed, #e1e3e6);
    height: 1px;
    border: none;
  }

  .dcx-context-menu__list .dcx-context-menu__item {
    margin: 2px 0;
    border-radius: var(--r-md, 6px);
    transition:
      background-color 0.15s ease-out,
      transform 0.15s ease-out,
      color 0.15s ease-out;
    position: relative;
    outline: none;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__item-content {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border-radius: var(--r-md, 6px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    gap: var(--sp-3, 12px);
    display: flex;
    align-items: center;
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:hover {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:hover .dcx-context-menu__icon {
    color: var(--bg-primary, #0058ab);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
    border-radius: var(--r-md, 6px);
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger {
    color: var(--color-error, #dc2626);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger .dcx-context-menu__icon {
    color: var(--color-error, #dc2626);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger.dcx-context-menu__item--selectable:hover {
    background-color: var(--color-error-bg, #fef2f2);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger.dcx-context-menu__item--selectable:hover .dcx-context-menu__icon {
    color: var(--color-error, #dc2626);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:active {
    transform: scale(0.98);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--disabled:hover {
    transform: none;
    background-color: transparent;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__icon {
    font-size: var(--fs-lg, 18px);
    color: var(--text-muted, #696e75);
    transition:
      color 0.2s ease,
      transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp-5, 20px);
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__text {
    flex: 1;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__description {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-regular, 400);
    margin-top: 2px;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__children-indicator {
    color: var(--text-muted, #696e75);
    font-size: var(--fs-sm, 12px);
    margin-left: auto;
  }

  .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__nested {
    padding: var(--sp-1, 4px);
    background: var(--bg-default, #ffffff);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    animation: dcxSubmenuEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 200px;
    left: calc(100% + var(--sp-1, 4px));
    top: -6px;
    position: absolute;
    z-index: 10000;
    display: none;
  }

  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--has-children:hover > .dcx-context-menu__nested,
  .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--has-children:focus-within > .dcx-context-menu__nested {
    display: block;
  }

  @keyframes dcxContextMenuEnter {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes dcxSubmenuEnter {
    from {
      opacity: 0;
      transform: translateX(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
`,E=t=>{if(!t.isOpen)return e``;let n=`dcx-context-menu ${t.positionMode===`absolute`?`dcx-context-menu--absolute`:``}`,r=`top: ${t.top}; left: ${t.left}; opacity: ${t.isPositioned?`1`:`0`};`;return e`
    <div
      class="${n}"
      style="${r}"
      @click="${e=>e.stopPropagation()}"
      tabindex="-1"
      role="menu"
      aria-label="Menú contextual"
    >
      <ul class="dcx-context-menu__list" role="presentation">
        ${t.items.map((e,n)=>t.renderItem(e,n))}
      </ul>
    </div>
  `},D=class extends r{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t={x:0,y:0};get position(){return this.#t}set position(e){this.#t=e}#n=`fixed`;get positionMode(){return this.#n}set positionMode(e){this.#n=e}#r=!1;get isOpen(){return this.#r}set isOpen(e){this.#r=e}#i=!1;get isPositioned(){return this.#i}set isPositioned(e){this.#i=e}#a=`-9999px`;get top(){return this.#a}set top(e){this.#a=e}#o=`-9999px`;get left(){return this.#o}set left(e){this.#o=e}_openPosition=null;static styles=T;connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this._handleDocumentKeyDown),document.addEventListener(`click`,this._handleDocumentClick),window.addEventListener(`resize`,this._handleWindowResize)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this._handleDocumentKeyDown),document.removeEventListener(`click`,this._handleDocumentClick),window.removeEventListener(`resize`,this._handleWindowResize)}_handleDocumentKeyDown=e=>{e.key===`Escape`&&this.isOpen&&this.close()};_handleDocumentClick=e=>{if(!this.isOpen)return;let t=e.composedPath(),n=this.shadowRoot?.querySelector(`.dcx-context-menu`);n&&t.includes(n)||this.close()};_handleWindowResize=()=>{this.isOpen&&this.calculatePosition()};async open(e){e&&(this._openPosition=e),this.isOpen=!0,await this.updateComplete,this.calculatePosition()}close(){this._openPosition=null,this.isOpen=!1,this.isPositioned=!1,this.dispatchEvent(new CustomEvent(`menu-closed`))}calculatePosition(){let e=this._openPosition??this.position;if(this.positionMode===`absolute`){this.left=`${e.x}px`,this.top=`${e.y}px`,this.isPositioned=!0;return}let t=e.x,n=e.y,r=this.shadowRoot?.querySelector(`.dcx-context-menu`);if(r){let e=r.getBoundingClientRect();if(t+e.width>window.innerWidth-10&&(t=window.innerWidth-10-e.width,t<0&&(t=0)),n+e.height>window.innerHeight-10){let t=n-e.height;n=t>=0?t:10}}let i=0,a=0;if(this.shadowRoot){let e=document.createElement(`div`);e.style.position=`fixed`,e.style.left=`0px`,e.style.top=`0px`,e.style.width=`0px`,e.style.height=`0px`,e.style.visibility=`hidden`,this.shadowRoot.appendChild(e);let t=e.getBoundingClientRect();i=t.left,a=t.top,this.shadowRoot.removeChild(e)}this.left=`${t-i}px`,this.top=`${n-a}px`,this.isPositioned=!0}onItemClick(e,t){t?.stopPropagation(),!(e.disabled||e.divider)&&(e.action&&e.action(),this.dispatchEvent(new CustomEvent(`item-selected`,{detail:e,bubbles:!0,composed:!0})),(!e.children||e.children.length===0)&&this.close())}onItemKeydown(e,t,n){let r=e.children||[];n.key===`ArrowRight`&&r.length>0?(n.preventDefault(),n.currentTarget.querySelector(`.dcx-context-menu__nested [tabindex="0"]`)?.focus()):n.key===`ArrowLeft`?(n.preventDefault(),(n.currentTarget.closest(`.dcx-context-menu__nested`)?.closest(`li`))?.focus()):(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this.onItemClick(e,n))}renderItem(t,n){if(t.divider)return e`<li class="dcx-context-menu__divider" role="separator"></li>`;let r=t.children&&t.children.length>0,i=[`dcx-context-menu__item`,`dcx-context-menu__item--selectable`,t.disabled?`dcx-context-menu__item--disabled`:``,r?`dcx-context-menu__item--has-children`:``,t.variant===`danger`?`dcx-context-menu__item--danger`:``].filter(Boolean).join(` `);return e`
      <li
        class="${i}"
        tabindex="${t.disabled?-1:0}"
        role="menuitem"
        aria-disabled="${t.disabled?`true`:`false`}"
        aria-haspopup="${r?`menu`:`false`}"
        @click="${e=>this.onItemClick(t,e)}"
        @keydown="${e=>this.onItemKeydown(t,n,e)}"
      >
        <div class="dcx-context-menu__item-content">
          ${t.icon?e`
                <div class="dcx-context-menu__icon-container">
                  <dcx-web-icon
                    name="${t.icon}"
                    size="auto"
                    class="dcx-context-menu__icon"
                    aria-hidden="true"
                  ></dcx-web-icon>
                </div>
              `:``}
          <div class="dcx-context-menu__text-container">
            ${t.label||t.text?e`<span class="dcx-context-menu__text">${t.label||t.text}</span>`:``}
            ${t.description?e`<span class="dcx-context-menu__description">${t.description}</span>`:``}
          </div>
          ${r?e`
                <dcx-web-icon
                  name="chevron-right"
                  size="auto"
                  class="dcx-context-menu__children-indicator"
                  aria-hidden="true"
                ></dcx-web-icon>
              `:``}
        </div>
        ${r?e`
              <ul class="dcx-context-menu__nested" @click="${e=>e.stopPropagation()}">
                ${t.children.map((e,t)=>this.renderItem(e,t))}
              </ul>
            `:``}
      </li>
    `}render(){return E(this)}};o([i({type:Array}),u(`design:type`,Array),u(`design:paramtypes`,[])],D.prototype,`items`,null),o([i({type:Object}),u(`design:type`,Object),u(`design:paramtypes`,[])],D.prototype,`position`,null),o([i({type:String}),u(`design:type`,String),u(`design:paramtypes`,[])],D.prototype,`positionMode`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],D.prototype,`isOpen`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],D.prototype,`isPositioned`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],D.prototype,`top`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],D.prototype,`left`,null),D=o([d(`dcx-web-context-menu`)],D);var O=t`
  :host {
    display: contents;
  }

  .dcx-drawer-root {
    position: fixed;
    inset: 0;
  }

  .dcx-drawer__mask {
    position: absolute;
    inset: 0;
    background: var(--dcx-drawer-mask-background, rgba(0, 0, 0, 0.45));
    opacity: 1;
    transition: opacity 220ms ease;
    will-change: opacity;
  }

  @starting-style {
    .dcx-drawer__mask {
      opacity: 0;
    }
  }

  .dcx-drawer-root--closing .dcx-drawer__mask {
    opacity: 0;
  }

  .dcx-drawer {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--bg-default, #ffffff);
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    will-change: transform;
    transition: transform 220ms ease;
  }

  .dcx-drawer--left {
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(0);
  }

  @starting-style {
    .dcx-drawer--left {
      transform: translateX(-100%);
    }
  }

  .dcx-drawer--right {
    right: 0;
    top: 0;
    bottom: 0;
    transform: translateX(0);
  }

  @starting-style {
    .dcx-drawer--right {
      transform: translateX(100%);
    }
  }

  .dcx-drawer--top {
    left: 0;
    right: 0;
    top: 0;
    transform: translateY(0);
  }

  @starting-style {
    .dcx-drawer--top {
      transform: translateY(-100%);
    }
  }

  .dcx-drawer--bottom {
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(0);
  }

  @starting-style {
    .dcx-drawer--bottom {
      transform: translateY(100%);
    }
  }

  .dcx-drawer--fullscreen {
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .dcx-drawer-root--closing .dcx-drawer--left {
    transform: translateX(-100%);
  }

  .dcx-drawer-root--closing .dcx-drawer--right {
    transform: translateX(100%);
  }

  .dcx-drawer-root--closing .dcx-drawer--top {
    transform: translateY(-100%);
  }

  .dcx-drawer-root--closing .dcx-drawer--bottom {
    transform: translateY(100%);
  }

  .dcx-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3, 12px);
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    border-bottom: 1px solid var(--border-light, #d1d5db);
  }

  .dcx-drawer__title {
    margin: 0;
    font-size: var(--fs-lg, 18px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-drawer__content {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: var(--sp-5, 20px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-drawer__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    border-top: 1px solid var(--border-light, #d1d5db);
    background: var(--bg-surface, #f4f5f7);
  }
`,k=t=>{if(!t.rendered)return n;let r=[`dcx-drawer`,`dcx-drawer--${t.position}`,t.fullScreen?`dcx-drawer--fullscreen`:``].filter(Boolean),i=[`dcx-drawer-root`,t.closing?`dcx-drawer-root--closing`:``],a=t.modal;return e`
    <div class=${i.filter(Boolean).join(` `)} style="z-index:${t.resolvedZIndex};">
      ${a?e`<div
            class="dcx-drawer__mask"
            aria-hidden="true"
            @pointerdown=${t.handleMaskPointerDown}
          ></div>`:n}

      <aside
        class=${r.join(` `)}
        role="dialog"
        aria-modal=${t.modal?`true`:n}
        aria-labelledby=${t.header?t.drawerTitleId:n}
        style="z-index:${t.resolvedZIndex+1};${t.panelWidth?` width:${t.panelWidth};`:``}${t.panelHeight?` height:${t.panelHeight};`:``}"
      >
        ${t.hasHeader?e`
              <header class="dcx-drawer__header">
                ${t.querySelector(`[slot="drawerHeader"]`)?e`<slot name="drawerHeader"></slot>`:e`<h3 class="dcx-drawer__title" id=${t.drawerTitleId}>${t.header}</h3>`}

                ${t.showCloseIcon?e`<dcx-web-button
                      variant="icon-only"
                      size="s"
                      aria-label="Cerrar drawer"
                      @buttonClick=${t.closeDrawer}
                    >
                      <dcx-web-icon slot="dcx-icon" name="x"></dcx-web-icon>
                    </dcx-web-button>`:n}
              </header>
            `:n}

        <div class="dcx-drawer__content">
          <slot></slot>
        </div>

        ${t.hasFooter?e`
              <footer class="dcx-drawer__footer">
                ${t.querySelector(`[slot="drawerFooter"]`)?e`<slot name="drawerFooter"></slot>`:e`<span>${t.footer}</span>`}
              </footer>
            `:n}
      </aside>
    </div>
  `},A=[`s`,`m`,`l`,`xl`,`auto`],j=[`top`,`bottom`,`left`,`right`],we=[`vertical`,`horizontal`],Te=[`xs`,`s`,`m`,`l`,`xl`],M=`right`,Ee=j,N=`22rem`,P=1e3,F=`Drawer`,De={open:!1,position:M,modal:!0,dismissible:!0,showCloseIcon:!0,closeOnEscape:!0,blockScroll:!1,fullScreen:!1,size:N,baseZIndex:P,autoZIndex:!0,header:F,footer:``},I,L=class extends r{static{I=this}#e=!1;get open(){return this.#e}set open(e){this.#e=e}#t=M;get position(){return this.#t}set position(e){this.#t=e}#n=!0;get modal(){return this.#n}set modal(e){this.#n=e}#r=!0;get dismissible(){return this.#r}set dismissible(e){this.#r=e}#i=!0;get showCloseIcon(){return this.#i}set showCloseIcon(e){this.#i=e}#a=!0;get closeOnEscape(){return this.#a}set closeOnEscape(e){this.#a=e}#o=!1;get blockScroll(){return this.#o}set blockScroll(e){this.#o=e}#s=!1;get fullScreen(){return this.#s}set fullScreen(e){this.#s=e}#c=N;get size(){return this.#c}set size(e){this.#c=e}#l=P;get baseZIndex(){return this.#l}set baseZIndex(e){this.#l=e}#u=!0;get autoZIndex(){return this.#u}set autoZIndex(e){this.#u=e}#d=F;get header(){return this.#d}set header(e){this.#d=e}#f=``;get footer(){return this.#f}set footer(e){this.#f=e}static styles=O;static _instanceCount=0;static _globalZIndex=0;#p=P;get _currentZIndex(){return this.#p}set _currentZIndex(e){this.#p=e}#m=!1;get rendered(){return this.#m}set rendered(e){this.#m=e}#h=!1;get closing(){return this.#h}set closing(e){this.#h=e}_closeTimer;_scrollBlocked=!1;_previousOverflow=``;_hideAlreadyEmitted=!1;_drawerId=`dcx-drawer-${++I._instanceCount}`;_keydownHandler=e=>{!this.open||!this.closeOnEscape||e.key!==`Escape`||this.closeDrawer()};get drawerTitleId(){return`${this._drawerId}-title`}get hasHeader(){return!!(this.header||this.showCloseIcon||this.querySelector(`[slot="drawerHeader"]`))}get hasFooter(){return!!(this.footer||this.querySelector(`[slot="drawerFooter"]`))}get resolvedZIndex(){return this._currentZIndex}get panelWidth(){return this.fullScreen?`100%`:this.position===`left`||this.position===`right`?this.size:null}get panelHeight(){return this.fullScreen?`100%`:this.position===`top`||this.position===`bottom`?this.size:null}connectedCallback(){super.connectedCallback(),this._syncKeydownListener(),this._syncBodyScroll()}disconnectedCallback(){document.removeEventListener(`keydown`,this._keydownHandler),this._scrollBlocked&&=(document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=``,!1),window.clearTimeout(this._closeTimer),super.disconnectedCallback()}willUpdate(e){e.has(`open`)&&(this.open?(this.closing=!1,this.rendered=!0):this.closing=!0),(e.has(`open`)||e.has(`baseZIndex`)||e.has(`autoZIndex`))&&(this.open&&this.autoZIndex?(I._globalZIndex=Math.max(I._globalZIndex,this.baseZIndex),I._globalZIndex+=2,this._currentZIndex=I._globalZIndex):this._currentZIndex=this.baseZIndex)}updated(e){e.has(`open`)&&(this.open?this.dispatchEvent(new CustomEvent(`dcx-drawer-show`,{bubbles:!0,composed:!0})):(this._hideAlreadyEmitted?this._hideAlreadyEmitted=!1:this.dispatchEvent(new CustomEvent(`dcx-drawer-hide`,{bubbles:!0,composed:!0})),window.clearTimeout(this._closeTimer),this._closeTimer=window.setTimeout(()=>{this.rendered=!1,this.closing=!1,this.requestUpdate()},220))),(e.has(`open`)||e.has(`blockScroll`)||e.has(`modal`))&&this._syncBodyScroll(),(e.has(`open`)||e.has(`closeOnEscape`))&&this._syncKeydownListener()}render(){return k(this)}close(){this.closeDrawer()}handleMaskPointerDown=e=>{e.stopPropagation(),this.dismissible&&this.closeDrawer()};closeDrawer=()=>{this.open&&(this._hideAlreadyEmitted=!0,this.dispatchEvent(new CustomEvent(`dcx-drawer-hide`,{bubbles:!0,composed:!0})),this.open=!1,this.dispatchEvent(new CustomEvent(`dcx-drawer-visible-change`,{detail:!1,bubbles:!0,composed:!0})))};_syncBodyScroll(){let e=this.open&&this.modal&&this.blockScroll;if(e&&!this._scrollBlocked){let e=window.innerWidth-document.documentElement.clientWidth;this._previousOverflow=document.body.style.overflow,document.body.style.overflow=`hidden`,e>0&&(document.body.style.paddingRight=`${e}px`),this._scrollBlocked=!0}else!e&&this._scrollBlocked&&(document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=``,this._scrollBlocked=!1)}_syncKeydownListener(){this.open&&this.closeOnEscape?document.addEventListener(`keydown`,this._keydownHandler):document.removeEventListener(`keydown`,this._keydownHandler)}};o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`open`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`position`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`modal`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`dismissible`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`showCloseIcon`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`closeOnEscape`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`blockScroll`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`fullScreen`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`size`,null),o([i({type:Number,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`baseZIndex`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`autoZIndex`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`header`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`footer`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`_currentZIndex`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`rendered`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],L.prototype,`closing`,null),L=I=o([d(`dcx-web-drawer`)],L);var Oe=t`
    :host {
      display: inline-flex;
    }

    dcx-web-icon {
      color: inherit;
    }

    .dcx-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      height: 2rem;
      padding: var(--sp-2, 8px) var(--sp-3, 12px);
      border-radius: var(--r-pill, 1rem);
      border: 1px solid transparent;
      font-family: var(--ff-base, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
      font-weight: var(--fw-medium, 500);
      font-size: var(--fs-base, 0.875rem);
      line-height: 1.2;
      cursor: default;
      box-sizing: border-box;
      transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    .dcx-chip--primary {
      background-color: var(--bg-primary, #0058ab);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--secondary {
      background-color: var(--bg-default, #ffffff);
      color: var(--text-dark, #212121);
      border-color: var(--border-default, #2a2e33);
    }

    .dcx-chip--success {
      background-color: var(--status-success, #00a76f);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--warning {
      background-color: var(--status-warning, #f59e0b);
      color: var(--text-dark, #212121);
    }

    .dcx-chip--error {
      background-color: var(--status-error, #ef4444);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--info {
      background-color: var(--status-info, #12abdb);
      color: var(--text-white, #ffffff);
    }

    .dcx-chip--gray {
      background-color: var(--bg-secondary, #c8cdcd);
      color: var(--text-dark, #212121);
    }

    .dcx-chip__image {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .dcx-chip__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    .dcx-chip__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dcx-chip__remove-button {
      width: 2rem;
      height: 2rem;
      transform: scale(0.75);
      margin: -0.25rem;
      flex-shrink: 0;
    }

    .dcx-chip__remove-button:hover {
      opacity: 0.85;
    }

    .dcx-chip:hover .dcx-chip__label {
      text-decoration: underline;
    }
`,ke=t=>{let r=`dcx-chip dcx-chip--${t.color}`,i=t.label?`Remover ${t.label}`:`Remover chip`;return e`
    <span
      class=${r}
      data-chip-type=${t.chipType}
      data-variant=${t.variant}
    >
      ${t.chipType===`with-image`?e`<img
            class="dcx-chip__image"
            src=${t.image}
            alt=${t.label||`Chip image`}
            loading="lazy"
          />`:n}

      ${t.chipType===`with-icon`?e`<span class="dcx-chip__icon" aria-hidden="true">${t.renderIcon()}</span>`:n}

      ${t.label?e`<span class="dcx-chip__label">${t.label}</span>`:n}

      ${t.showRemove?e`<dcx-web-button
            class="dcx-chip__remove-button"
            variant="icon-only"
            size="s"
            icon-name="x"
            icon-size="l"
            aria-label=${i}
            @click=${e=>t.handleRemove(e)}
          ></dcx-web-button>`:n}
    </span>
  `},R=class extends r{#e=``;get label(){return this.#e}set label(e){this.#e=e}#t=`primary`;get color(){return this.#t}set color(e){this.#t=e}#n=!1;get removable(){return this.#n}set removable(e){this.#n=e}#r=``;get icon(){return this.#r}set icon(e){this.#r=e}#i=``;get image(){return this.#i}set image(e){this.#i=e}#a=`choice`;get variant(){return this.#a}set variant(e){this.#a=e}static styles=Oe;get chipType(){return this.image.trim()?`with-image`:this.icon.trim()?`with-icon`:`label-only`}get showRemove(){return this.variant===`filter`||this.removable}renderIcon(){let t=[`house`,`person`,`gear`,`star`,`code-slash`,`terminal`,`palette`,`book`,`bug`].includes(this.icon)?this.icon:`question-circle`;return e`<dcx-web-icon name=${t}></dcx-web-icon>`}handleRemove(e){e.stopPropagation(),this.showRemove&&this.dispatchEvent(new CustomEvent(`dcx-chip-remove`,{bubbles:!0,composed:!0}))}render(){return ke(this)}};o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],R.prototype,`label`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],R.prototype,`color`,null),o([i({type:Boolean,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],R.prototype,`removable`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],R.prototype,`icon`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],R.prototype,`image`,null),o([i({type:String,reflect:!0}),u(`design:type`,Object),u(`design:paramtypes`,[])],R.prototype,`variant`,null),R=o([d(`dcx-web-chip`)],R);var Ae=t`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: var(--sp-4, 16px);
    box-sizing: border-box;
  }

  .dcx-carousel__content {
    display: flex;
    align-items: center;
    gap: var(--sp-5, 20px);
    position: relative;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .dcx-carousel__container {
    overflow: hidden;
    flex: 1;
    min-width: 0;
    box-sizing: border-box;
  }

  .dcx-carousel__items-wrapper {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    will-change: transform;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  .dcx-carousel__item {
    flex: 0 0 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--sp-3, 12px);
  }

  .dcx-carousel--vertical {
    flex-direction: row;
    align-items: center;
    height: auto;
  }

  .dcx-carousel--vertical .dcx-carousel__content {
    flex-direction: column;
    flex: 1;
    height: auto;
    gap: var(--sp-2, 8px);
    align-items: stretch;
  }

  .dcx-carousel--vertical .dcx-carousel__container {
    height: 420px;
    flex: none;
    min-height: 0;
  }

  .dcx-carousel--vertical .dcx-carousel__items-wrapper {
    flex-direction: column;
  }

  .dcx-carousel--vertical .dcx-carousel__item {
    flex: 0 0 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  .dcx-carousel--vertical .dcx-carousel__indicators {
    flex-direction: column;
    justify-content: center;
    padding: 0 var(--sp-2, 8px);
  }

  .dcx-carousel--vertical .dcx-carousel__indicator {
    width: var(--sp-2, 8px);
    height: var(--sp-2, 8px);
  }

  .dcx-carousel--vertical .dcx-carousel__indicator--active {
    width: var(--sp-2, 8px);
    height: var(--sp-6, 24px);
  }

  .dcx-carousel__indicators {
    display: flex;
    justify-content: center;
    gap: var(--sp-2, 8px);
    padding: var(--sp-2, 8px) 0;
  }

  .dcx-carousel__indicator {
    display: inline-block;
    width: var(--sp-2, 8px);
    height: var(--sp-2, 8px);
    padding: 0;
    border: 1px solid transparent;
    border-radius: var(--r-pill, 999px);
    background-color: var(--border-light, #d1d5db);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .dcx-carousel__indicator:hover:not([disabled]) {
    background-color: var(--border-hover, #9ca3af);
  }

  .dcx-carousel__indicator--active {
    width: var(--sp-6, 24px);
    background-color: var(--bg-primary, #0058ab);
  }

  .dcx-carousel__indicator--active:hover:not([disabled]) {
    background-color: var(--bg-primary-hover, #004080);
  }

  .dcx-carousel__prev,
  .dcx-carousel__next {
    flex-shrink: 0;
    align-self: center;
    z-index: 10;
  }

  .dcx-carousel__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .dcx-carousel__items-wrapper {
      transition: none;
    }
  }
`,je=t=>e`
    <div
      class="${t.carouselClass}"
      role="region"
      aria-roledescription="carousel"
      aria-label="${t.ariaLabel}"
      @keydown="${t.onKeydown}"
      @mouseenter="${t.pauseAutoplay}"
      @mouseleave="${t.resumeAutoplay}"
      @focusin="${t.pauseAutoplay}"
      @focusout="${t.resumeAutoplay}"
    >
      <div class="dcx-carousel__sr-only" aria-live="polite" aria-atomic="true">
        ${t.liveAnnouncement}
      </div>

      <div class="dcx-carousel__content">
        ${t.showNavigatorButtons&&!t.isPrevDisabled?e`
              <dcx-web-button
                variant="secondary"
                size="s"
                class="dcx-carousel__prev"
                @buttonClick="${t.prev}"
                aria-label="Diapositiva anterior"
              >
                <dcx-web-icon slot="dcx-icon" name="${t.currentIcon}"></dcx-web-icon>
              </dcx-web-button>
            `:n}

        <div class="dcx-carousel__container">
          <div
            class="dcx-carousel__items-wrapper"
            style="transform: ${t.wrapperTransform}; flex-direction: ${t.slideDirection};"
          >
            ${t.value.map((n,r)=>e`
                <div
                  class="dcx-carousel__item"
                  aria-hidden="${r===t.currentPage?`false`:`true`}"
                  aria-label="Diapositiva ${r+1} de ${t.totalItems}"
                >
                  ${t.itemTemplate?t.itemTemplate(n,r):typeof n==`object`?e`<pre>${JSON.stringify(n,null,2)}</pre>`:n}
                </div>
              `)}
          </div>
        </div>

        ${t.showNavigatorButtons&&!t.isNextDisabled?e`
              <dcx-web-button
                variant="secondary"
                size="s"
                class="dcx-carousel__next"
                @buttonClick="${t.next}"
                aria-label="Diapositiva siguiente"
              >
                <dcx-web-icon slot="dcx-icon" name="${t.nextIcon}"></dcx-web-icon>
              </dcx-web-button>
            `:n}
      </div>

      ${t.showIndicatorDots?e`
            <div class="dcx-carousel__indicators" role="group" aria-label="Indicadores de diapositiva">
              ${t.value.map((n,r)=>e`
                  <dcx-web-button
                    type="button"
                    variant="terciary"
                    size="s"
                    class="${t.indicatorClass(r)}"
                    aria-label="Ir a la diapositiva ${r+1}"
                    aria-pressed="${r===t.currentPage?`true`:`false`}"
                    @click="${()=>t.setPage(r)}"
                  ></dcx-web-button>
                `)}
            </div>
          `:n}
    </div>
  `,z=class extends r{#e=[];get value(){return this.#e}set value(e){this.#e=e}#t=!1;get circular(){return this.#t}set circular(e){this.#t=e}#n=`horizontal`;get orientation(){return this.#n}set orientation(e){this.#n=e}#r=!0;get showNavigators(){return this.#r}set showNavigators(e){this.#r=e}#i=!0;get showIndicators(){return this.#i}set showIndicators(e){this.#i=e}#a=0;get autoplayInterval(){return this.#a}set autoplayInterval(e){this.#a=e}#o=`Carousel`;get ariaLabel(){return this.#o}set ariaLabel(e){this.#o=e}#s=void 0;get itemTemplate(){return this.#s}set itemTemplate(e){this.#s=e}#c=0;get currentPage(){return this.#c}set currentPage(e){this.#c=e}get liveAnnouncement(){let e=this.totalItems;return e>0?`Diapositiva ${this.currentPage+1} de ${e}`:``}_timer;_autoplayEnabled=!1;static styles=Ae;get totalItems(){return this.value?this.value.length:0}get isVertical(){return this.orientation===`vertical`}get carouselClass(){return this.isVertical?`dcx-carousel dcx-carousel--vertical`:`dcx-carousel`}get slideDirection(){return this.isVertical?`column`:`row`}get currentIcon(){return this.isVertical?`chevron-up`:`chevron-left`}get nextIcon(){return this.isVertical?`chevron-down`:`chevron-right`}get canNavigate(){return this.totalItems>1}get showNavigatorButtons(){return this.showNavigators&&this.canNavigate}get showIndicatorDots(){return this.showIndicators&&this.canNavigate}get isPrevDisabled(){return!this.circular&&this.currentPage===0}get isNextDisabled(){return!this.circular&&this.currentPage===this.totalItems-1}get wrapperTransform(){if(this.currentPage===0)return`translate3d(0, 0, 0)`;let e=this.currentPage*100;return this.isVertical?`translate3d(0, -${e}%, 0)`:`translate3d(-${e}%, 0, 0)`}updated(e){if(super.updated(e),e.has(`autoplayInterval`)){this.clearTimer();let e=this.autoplayInterval;this._autoplayEnabled=e>0,this._autoplayEnabled&&this.startAutoplay()}}disconnectedCallback(){this.clearTimer(),super.disconnectedCallback()}next(){let e=this.totalItems,t=this.currentPage;t<e-1?this.currentPage=t+1:this.circular&&(this.currentPage=0),this.dispatchEvent(new CustomEvent(`pageChange`,{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}prev(){let e=this.totalItems,t=this.currentPage;t>0?this.currentPage=t-1:this.circular&&(this.currentPage=e-1),this.dispatchEvent(new CustomEvent(`pageChange`,{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}setPage(e){this.currentPage=e,this.dispatchEvent(new CustomEvent(`pageChange`,{detail:{page:e},bubbles:!0,composed:!0}))}indicatorClass(e){let t=`dcx-carousel__indicator`;return e===this.currentPage?`${t} ${t}--active`:t}onKeydown(e){let t=!this.isVertical,n=t?`ArrowLeft`:`ArrowUp`,r=t?`ArrowRight`:`ArrowDown`;e.key===n?(e.preventDefault(),this.prev()):e.key===r&&(e.preventDefault(),this.next())}pauseAutoplay(){this._autoplayEnabled&&this.clearTimer()}resumeAutoplay(){this._autoplayEnabled&&!this._timer&&this.startAutoplay()}startAutoplay(){let e=this.autoplayInterval;this._timer=setInterval(()=>this.next(),e)}clearTimer(){this._timer&&=(clearInterval(this._timer),void 0)}render(){return je(this)}};o([i({type:Array}),u(`design:type`,Array),u(`design:paramtypes`,[])],z.prototype,`value`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`circular`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`orientation`,null),o([i({type:Boolean,attribute:`show-navigators`}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`showNavigators`,null),o([i({type:Boolean,attribute:`show-indicators`}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`showIndicators`,null),o([i({type:Number,attribute:`autoplay-interval`}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`autoplayInterval`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`ariaLabel`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`itemTemplate`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],z.prototype,`currentPage`,null),z=o([d(`dcx-web-carousel`)],z);var Me=t`
  :host {
    display: inline-block;
    width: 100%;
    max-width: 280px;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-datepicker {
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-default, #e5e7eb);
    border-radius: var(--r-xl, 12px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .dcx-datepicker__input-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }

  .dcx-datepicker__input-wrapper:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
    border-radius: var(--r-xl, 12px);
  }

  .dcx-datepicker__input-wrapper--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .dcx-datepicker__input {
    width: 100%;
    pointer-events: none;
    background-color: var(--bg-default, #ffffff);
    border: 1px solid var(--border-input, #d1d5db);
    border-radius: var(--r-sm, 4px);
    font-size: var(--fs-base, 14px);
    color: var(--text-dark, #2a2e33);
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    font-family: inherit;
    box-sizing: border-box;
    cursor: pointer;
  }


  .dcx-datepicker__popover {
    border-top: 1px solid var(--border-default, #e5e7eb);
    width: 100%;
    box-sizing: border-box;
  }

  .dcx-datepicker__calendar {
    width: 100%;
    box-sizing: border-box;
  }

  .dcx-datepicker__header {
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-primary, #0058ab);
    box-sizing: border-box;
  }

  .dcx-datepicker__nav {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-white, #ffffff);
    padding: var(--sp-1, 4px);
    border-radius: var(--r-sm, 4px);
    display: flex;
    align-items: center;
    transition: background 0.15s;
  }

  .dcx-datepicker__nav dcx-web-icon,
  .dcx-datepicker__nav .dcx-icon,
  .dcx-datepicker__nav .dcx-icon i {
    color: var(--text-white, #ffffff);
    fill: var(--text-white, #ffffff);
  }

  .dcx-datepicker__nav:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .dcx-datepicker__nav:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  .dcx-datepicker__month-year {
    display: flex;
    align-items: center;
    gap: var(--sp-1, 4px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-white, #ffffff);
  }

  .dcx-datepicker__month,
  .dcx-datepicker__year {
    --text-dark: var(--text-white, #ffffff);
    --bg-hover: rgba(255, 255, 255, 0.2);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    text-transform: capitalize;
  }


  .dcx-datepicker__select-list {
    display: grid;
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    gap: var(--sp-1, 4px);
    box-sizing: border-box;
  }

  .dcx-datepicker__select-list--months {
    grid-template-columns: repeat(3, 1fr);
  }

  .dcx-datepicker__select-list--years {
    grid-template-columns: repeat(4, 1fr);
  }

  .dcx-datepicker__select-item {
    width: 100%;
  }

  .dcx-datepicker__grid-wrapper {
    padding: var(--sp-2, 8px) var(--sp-2, 8px) var(--sp-3, 12px);
    box-sizing: border-box;
  }

  .dcx-datepicker__grid {
    width: 100%;
    border-collapse: separate;
    border-spacing: 2px 1px;
    table-layout: fixed;
  }

  .dcx-datepicker__weekday {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-muted, #696e75);
    text-align: center;
    padding: 5px 0 6px;
  }

  .dcx-datepicker__day {
    display: grid;
    width: 100%;
    height: 36px;
    box-sizing: border-box;
  }

  .dcx-datepicker__day:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -1px;
    border-radius: var(--r-sm, 4px);
  }

  .dcx-datepicker__day--today {
    --text-dark: var(--bg-primary, #0058ab);
    --fw-medium: var(--fw-bold, 700);
  }

  .dcx-datepicker__day--selected {
    background: var(--bg-primary, #0058ab);
    --text-dark: var(--text-white, #ffffff);
    --bg-hover: var(--bg-primary-hover, #004080);
    border-radius: var(--r-sm, 4px);
  }

  .dcx-datepicker__day--in-range {
    background: var(--color-info-bg, #eff6ff);
    --text-dark: var(--color-info, #0058ab);
    --bg-hover: #dbeafe;
    border-radius: var(--r-md, 6px);
  }

  .dcx-datepicker__day--other-month {
    --text-dark: var(--text-placeholder, #9ca3af);
  }



  .dcx-datepicker__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border-top: 1px solid var(--border-default, #e5e7eb);
    flex-wrap: nowrap;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 20px;

  }

  .dcx-datepicker__footer-btn {
    min-width: 0;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-semibold, 600);
    border-radius: var(--r-sm, 4px);
    border: none;
    cursor: pointer;
    padding: 0 var(--sp-2, 8px);
    box-sizing: border-box;
    transition: background 0.2s, color 0.2s;
    max-width: 100%;
    flex: 0 0 auto;
  }

  .dcx-datepicker__footer-btn--ghost {
    color: var(--text-muted, #696e75);
    box-shadow: none;
  }

  .dcx-datepicker__footer-btn--primary {
    background: transparent;
    color: inherit;
  }

  .dcx-datepicker__footer-btn--secondary {
    background: var(--bg-default, #ffffff);
    color: var(--bg-primary, #0058ab);
    border: none;
    box-shadow: none;
    transition: color 0.2s;
  }

  .dcx-datepicker__footer-btn--secondary:hover {
    color: var(--bg-primary-hover, #004080);
  }

  .dcx-datepicker__footer-btn .dcx-icon {
    margin-right: 0.5em;
  }
`,Ne=t=>{let r={"dcx-datepicker__input-wrapper":!0,"dcx-datepicker__input-wrapper--disabled":t.disabled,"dcx-datepicker__input-wrapper--open":t.isOpen};return e`
    <div class="dcx-datepicker">
      <div
        class="${f(r)}"
        role="button"
        tabindex="0"
        aria-expanded="${t.isOpen}"
        aria-haspopup="dialog"
        aria-label="Seleccionar fecha"
        aria-disabled="${t.disabled?`true`:n}"
        @click="${t.toggleCalendar}"
        @keydown="${t.onTriggerKeydown}"
      >
        <input
          class="dcx-datepicker__input"
          placeholder="${t.placeholder||`dd/mm/yyyy`}"
          ?disabled="${t.disabled}"
          type="text"
          .value="${t.formattedSelectedDate}"
          readonly
        />
      </div>

      ${t.isOpen?e`
            <div
              class="dcx-datepicker__popover"
              role="dialog"
              aria-modal="true"
              aria-label="Calendario"
            >
              <div class="dcx-datepicker__calendar">
                <div class="dcx-datepicker__header" aria-live="polite" aria-atomic="true">
                  <dcx-web-button
                    class="dcx-datepicker__nav"
                    ?icon="${!0}"
                    icon-position="right"
                    icon-name="chevron-left"
                    aria-label="${t.labels.previous}"
                    @buttonClick="${t.previousMonth}"
                  ></dcx-web-button>

                  <span class="dcx-datepicker__month-year">
                    <dcx-web-button
                      class="dcx-datepicker__month"
                      variant="terciary"
                      size="s"
                      aria-label="Seleccionar mes: ${t.monthName}"
                      label="${t.monthName}"
                      ?disabled="${t.isMonthMode}"
                      @buttonClick="${t.openMonthSelector}"
                    ></dcx-web-button>
                    <span aria-hidden="true">&nbsp;</span>
                    <dcx-web-button
                      class="dcx-datepicker__year"
                      variant="terciary"
                      size="s"
                      aria-label="Seleccionar año: ${t.yearNumber}"
                      label="${t.yearNumber}"
                      ?disabled="${t.isYearMode}"
                      @buttonClick="${t.openYearSelector}"
                    ></dcx-web-button>
                  </span>

                  <dcx-web-button
                    class="dcx-datepicker__nav"
                    ?icon="${!0}"
                    icon-position="right"
                    icon-name="chevron-right"
                    aria-label="${t.labels.next}"
                    @buttonClick="${t.nextMonth}"
                  ></dcx-web-button>
                </div>

                ${t.isMonthMode?e`
                      <div
                        class="dcx-datepicker__select-list dcx-datepicker__select-list--months"
                        role="listbox"
                        aria-label="Seleccionar mes"
                      >
                        ${t.monthsIndexes.map(n=>e`
                            <dcx-web-button
                              class="dcx-datepicker__select-item"
                              label="${t.monthsList[n]}"
                              variant="terciary"
                              size="s"
                              aria-label="${t.monthsList[n]}"
                              @buttonClick="${()=>t.selectMonth(n)}"
                            ></dcx-web-button>
                          `)}
                      </div>
                    `:n}

                ${t.isYearMode?e`
                      <div
                        class="dcx-datepicker__select-list dcx-datepicker__select-list--years"
                        role="listbox"
                        aria-label="Seleccionar año"
                      >
                        ${t.yearsList.map(n=>e`
                            <dcx-web-button
                              class="dcx-datepicker__select-item"
                              label="${n.toString()}"
                              variant="terciary"
                              size="s"
                              aria-label="${n.toString()}"
                              @buttonClick="${()=>t.selectYear(n)}"
                            ></dcx-web-button>
                          `)}
                      </div>
                    `:n}

                ${t.isCalendarMode?e`
                      <div class="dcx-datepicker__grid-wrapper">
                        <table
                          class="dcx-datepicker__grid"
                          role="grid"
                          aria-label="${t.gridAriaLabel}"
                        >
                          <thead>
                            <tr role="row">
                              ${t.weekDays.map(t=>e`
                                  <th scope="col" class="dcx-datepicker__weekday" abbr="${t}">
                                    ${t}
                                  </th>
                                `)}
                            </tr>
                          </thead>
                          <tbody>
                            ${t.calendarWeeks.map(r=>e`
                                <tr role="row">
                                  ${r.map(r=>{let i={"dcx-datepicker__day":!0,"dcx-datepicker__day--other-month":!r.isCurrentMonth,"dcx-datepicker__day--today":r.isToday,"dcx-datepicker__day--selected":r.isSelected,"dcx-datepicker__day--in-range":r.isInRange||!1};return e`
                                      <td
                                        role="gridcell"
                                        aria-selected="${r.isSelected?`true`:n}"
                                        aria-disabled="${r.isDisabled?`true`:n}"
                                        aria-current="${r.isToday?`date`:n}"
                                      >
                                        <dcx-web-button
                                          class="${f(i)}"
                                          variant="terciary"
                                          size="s"
                                          .label="${r.date.getDate().toString()}"
                                          ?disabled="${r.isDisabled}"
                                          tabindex="${t.isFocusedDay(r)?0:-1}"
                                          aria-label="${r.date.getDate()} ${t.monthName} ${t.yearNumber}"
                                          @buttonClick="${()=>t.selectDate(r)}"
                                          @keydown="${e=>t.onGridKeydown(e,r)}"
                                        ></dcx-web-button>
                                      </td>
                                    `})}
                                </tr>
                              `)}
                          </tbody>
                        </table>
                      </div>
                    `:n}

                <div class="dcx-datepicker__footer">
                  ${t.showClearButton?e`
                        <dcx-web-button
                          class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--ghost dcx-datepicker__clear"
                          variant="secondary"
                          size="s"
                          aria-label="${t.labels.clearDate}"
                          label="${t.labels.clearDate}"
                          @buttonClick="${t.clearDate}"
                        ></dcx-web-button>
                      `:n}
                  <dcx-web-button
                    class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--secondary"
                    variant="secondary"
                    size="s"
                    ?icon="${!0}"
                    icon-name="calendar-fill"
                    aria-label="${t.labels.goToToday}"
                    label="${t.labels.today}"
                    @buttonClick="${t.goToToday}"
                  ></dcx-web-button>
                  <dcx-web-button
                    class="dcx-datepicker__footer-btn dcx-datepicker__footer-btn--primary"
                    label="Aplicar"
                    variant="primary"
                    size="s"
                    @buttonClick="${t.applyDate}"
                  ></dcx-web-button>
                </div>
              </div>
            </div>
          `:n}
    </div>
  `},Pe=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],Fe=[`Do`,`Lu`,`Ma`,`Mi`,`Ju`,`Vi`,`Sa`],Ie=[`Lu`,`Ma`,`Mi`,`Ju`,`Vi`,`Sa`,`Do`],Le={clearDate:`Limpiar`,previous:`Anterior`,next:`Siguiente`,selectMonth:`Selecciona mes`,selectYear:`Selecciona año`,today:`Hoy`,goToToday:`Ir a hoy`},Re=[`multiSelect`,`rangeSelect`,`disabled`,`placeholder`,`dateFormat`,`firstDayOfWeek`],ze=[`selectedDate`,`startDate`,`endDate`,`minDate`,`maxDate`],B=class extends r{static styles=Me;#e=null;get selectedDate(){return this.#e}set selectedDate(e){this.#e=e}#t=[];get selectedDates(){return this.#t}set selectedDates(e){this.#t=e}#n=!1;get multiSelect(){return this.#n}set multiSelect(e){this.#n=e}#r=!1;get rangeSelect(){return this.#r}set rangeSelect(e){this.#r=e}#i=null;get startDate(){return this.#i}set startDate(e){this.#i=e}#a=null;get endDate(){return this.#a}set endDate(e){this.#a=e}#o=null;get minDate(){return this.#o}set minDate(e){this.#o=e}#s=null;get maxDate(){return this.#s}set maxDate(e){this.#s=e}#c=!1;get disabled(){return this.#c}set disabled(e){this.#c=e}#l=`Select date`;get placeholder(){return this.#l}set placeholder(e){this.#l=e}#u=`dd/MM/yyyy`;get dateFormat(){return this.#u}set dateFormat(e){this.#u=e}#d=`monday`;get firstDayOfWeek(){return this.#d}set firstDayOfWeek(e){this.#d=e}#f=null;get _currentMonth(){return this.#f}set _currentMonth(e){this.#f=e}#p=!1;get _isOpen(){return this.#p}set _isOpen(e){this.#p=e}#m=`calendar`;get _mode(){return this.#m}set _mode(e){this.#m=e}#h=null;get _yearPageStart(){return this.#h}set _yearPageStart(e){this.#h=e}#g=null;get _focusedDate(){return this.#g}set _focusedDate(e){this.#g=e}get isOpen(){return this._isOpen}get isMonthMode(){return this._mode===`month`}get isYearMode(){return this._mode===`year`}get isCalendarMode(){return this._mode===`calendar`}get currentMonth(){let e=this._currentMonth;if(e)return e;let t=this.selectedDate;return t?new Date(t):new Date}get monthName(){return this.currentMonth.toLocaleDateString(`es-ES`,{month:`long`})}get yearNumber(){return this.currentMonth.getFullYear()}get yearsList(){let e=this.currentMonth.getFullYear(),t=this._yearPageStart??e-e%12;return Array.from({length:12},(e,n)=>t+n)}get formattedSelectedDate(){return this.rangeSelect?this._formatRangeDate():this.multiSelect?this._formatMultipleDate():this._formatSingleDate()}get showClearButton(){return this.disabled?!1:this.rangeSelect?!!(this.startDate||this.endDate):this.multiSelect?this.selectedDates.length>0:!!this.selectedDate}get weekDays(){return this.firstDayOfWeek===`sunday`?Fe:Ie}get calendarDays(){let e=this.currentMonth,t=e.getFullYear(),n=e.getMonth(),r=new Date(t,n,1),i=new Date(r),a=this.firstDayOfWeek===`sunday`?r.getDay():r.getDay()===0?6:r.getDay()-1;i.setDate(i.getDate()-a);let o=new Date;return o.setHours(0,0,0,0),Array.from({length:42},(e,t)=>{let r=new Date(i);r.setDate(r.getDate()+t);let a=r.getTime(),{isSelected:s,isInRange:c}=this._calculateDateSelectionState(a);return{date:r,isCurrentMonth:r.getMonth()===n,isToday:a===o.getTime(),isSelected:s,isInRange:c,isDisabled:this._isDateDisabled(r)}})}get calendarWeeks(){let e=this.calendarDays;return Array.from({length:6},(t,n)=>e.slice(n*7,n*7+7))}get gridAriaLabel(){return`${this.monthName} ${this.yearNumber}`}labels=Le;monthsList=Pe;get monthsIndexes(){return Array.from({length:this.monthsList.length},(e,t)=>t)}dateFormatPatterns={"dd/MM/yyyy":(e,t,n)=>`${e}/${t}/${n}`,"MM/dd/yyyy":(e,t,n)=>`${t}/${e}/${n}`};_docClickHandler=e=>this._onDocumentClick(e);connectedCallback(){super.connectedCallback(),document.addEventListener(`mousedown`,this._docClickHandler)}disconnectedCallback(){document.removeEventListener(`mousedown`,this._docClickHandler),super.disconnectedCallback()}updated(e){super.updated(e),(e.has(`_focusedDate`)||e.has(`_isOpen`))&&this._focusedDate&&this._isOpen&&requestAnimationFrame(()=>this._focusDayCell())}_onDocumentClick(e){this.isOpen&&(e.composedPath().includes(this)||this.closeCalendar())}onTriggerKeydown(e){e.key===`Enter`||e.key===` `?(e.preventDefault(),this.toggleCalendar()):e.key===`Escape`&&(e.preventDefault(),this.closeCalendar())}onGridKeydown(e,t){switch([`ArrowRight`,`ArrowLeft`,`ArrowDown`,`ArrowUp`,`Enter`,` `,`Escape`,`PageUp`,`PageDown`,`Home`,`End`].includes(e.key)&&e.preventDefault(),e.key){case`ArrowRight`:this._moveFocus(1);break;case`ArrowLeft`:this._moveFocus(-1);break;case`ArrowDown`:this._moveFocus(7);break;case`ArrowUp`:this._moveFocus(-7);break;case`Enter`:case` `:t.isDisabled||this.selectDate(t);break;case`Escape`:this.closeCalendar();break;case`PageUp`:this.previousMonth();break;case`PageDown`:this.nextMonth();break;case`Home`:this._moveFocusToStartOfWeek(t);break;case`End`:this._moveFocusToEndOfWeek(t)}}isFocusedDay(e){let t=this._focusedDate;return t?e.date.getDate()===t.getDate()&&e.date.getMonth()===t.getMonth()&&e.date.getFullYear()===t.getFullYear():e.isSelected||e.isToday?!0:e.isCurrentMonth&&e.date.getDate()===1}toggleCalendar(){this.disabled||(this._isOpen=!this._isOpen,this._isOpen||(this._currentMonth=null,this._mode=`calendar`,this._focusedDate=null))}closeCalendar(){this._isOpen=!1,this._currentMonth=null,this._mode=`calendar`,this._focusedDate=null,this.renderRoot.querySelector(`.dcx-datepicker__input-wrapper`)?.focus()}previousYear(){let e=this.currentMonth,t=new Date(e);t.setFullYear(t.getFullYear()-1),this._currentMonth=t}nextYear(){let e=this.currentMonth,t=new Date(e);t.setFullYear(t.getFullYear()+1),this._currentMonth=t}previousMonth(){if(this.isMonthMode)return;if(this.isYearMode){this._yearPageStart=(this._yearPageStart??this.currentMonth.getFullYear())-12;return}let e=this.currentMonth,t=new Date(e);t.setMonth(t.getMonth()-1),this._currentMonth=t}nextMonth(){if(this.isMonthMode)return;if(this.isYearMode){this._yearPageStart=(this._yearPageStart??this.currentMonth.getFullYear())+12;return}let e=this.currentMonth,t=new Date(e);t.setMonth(t.getMonth()+1),this._currentMonth=t}openMonthSelector(){this._mode=`month`}openYearSelector(){this._mode=`year`;let e=this.currentMonth.getFullYear();this._yearPageStart=e-e%12}selectMonth(e){let t=this.currentMonth,n=new Date(t);n.setMonth(e),this._currentMonth=n,this._mode=`calendar`}selectYear(e){let t=this.currentMonth,n=new Date(t);n.setFullYear(e),this._currentMonth=n,this._mode=`calendar`}applyDate(){this.rangeSelect?(this._emitEvent(`startDateChange`,this.startDate),this._emitEvent(`endDateChange`,this.endDate)):this.multiSelect?this._emitEvent(`selectedDatesChange`,this.selectedDates):this._emitEvent(`selectedDateChange`,this.selectedDate),this.closeCalendar()}selectDate(e){e.isDisabled||this.disabled||(this._focusedDate=e.date,this.rangeSelect?this._handleRangeSelection(e.date):this.multiSelect?this._handleMultiSelection(e.date):this._handleSingleSelection(e.date))}clearDate(e){e&&e.stopPropagation(),!this.disabled&&(this.rangeSelect?(this.startDate=null,this.endDate=null,this._emitEvent(`startDateChange`,null),this._emitEvent(`endDateChange`,null)):this.multiSelect?(this.selectedDates=[],this._emitEvent(`selectedDatesChange`,[])):(this.selectedDate=null,this._emitEvent(`selectedDateChange`,null)))}goToToday(){let e=new Date;if(e.setHours(0,0,0,0),this._currentMonth=new Date(e),!this._isDateDisabled(e)){if(this.rangeSelect)this.startDate=e,this.endDate=null,this._emitEvent(`startDateChange`,e),this._emitEvent(`endDateChange`,null);else if(this.multiSelect){let t=[...this.selectedDates],n=e.getTime();t.findIndex(e=>new Date(e).setHours(0,0,0,0)===n)===-1&&(t.push(e),t.sort((e,t)=>e.getTime()-t.getTime()),this.selectedDates=t,this._emitEvent(`selectedDatesChange`,t))}else this.selectedDate=e,this._emitEvent(`selectedDateChange`,e)}}_moveFocus(e){let t=this._focusedDate??this._defaultFocusDate(),n=new Date(t);if(n.setDate(n.getDate()+e),n.getMonth()!==this.currentMonth.getMonth()||n.getFullYear()!==this.currentMonth.getFullYear()){let e=new Date(n.getFullYear(),n.getMonth(),1);this._currentMonth=e}this._focusedDate=n}_moveFocusToStartOfWeek(e){let t=this.calendarDays,n=t.findIndex(t=>t.date.getTime()===e.date.getTime()),r=t[n-n%7];r&&(this._focusedDate=r.date)}_moveFocusToEndOfWeek(e){let t=this.calendarDays,n=t.findIndex(t=>t.date.getTime()===e.date.getTime()),r=t[n+(6-n%7)];r&&(this._focusedDate=r.date)}_defaultFocusDate(){let e=this.calendarDays,t=e.find(e=>e.isSelected);if(t)return t.date;let n=e.find(e=>e.isToday);return n?n.date:e.find(e=>e.isCurrentMonth)?.date??new Date}_focusDayCell(){let e=this._focusedDate;if(!e||!this.isOpen)return;let t=this.calendarDays.findIndex(t=>t.date.getDate()===e.getDate()&&t.date.getMonth()===e.getMonth()&&t.date.getFullYear()===e.getFullYear());t!==-1&&Array.from(this.renderRoot.querySelectorAll(`.dcx-datepicker__day`))[t]?.focus()}_formatDate(e){let t=this.dateFormat,n=e.getDate().toString().padStart(2,`0`),r=(e.getMonth()+1).toString().padStart(2,`0`),i=e.getFullYear().toString();return this.dateFormatPatterns[t](n,r,i)}_formatRangeDate(){let e=this.startDate,t=this.endDate;return!e&&!t?this.placeholder:e&&t?`${this._formatDate(e)} - ${this._formatDate(t)}`:e?this._formatDate(e):this.placeholder}_formatMultipleDate(){let e=this.selectedDates;return!e||e.length===0?this.placeholder:e.length>2?`${e.length} fechas seleccionadas`:e.map(e=>this._formatDate(e)).join(` - `)}_formatSingleDate(){let e=this.selectedDate;return e?this._formatDate(e):this.placeholder}_calculateDateSelectionState(e){return this.rangeSelect?this._calculateRangeState(e):this.multiSelect?this._calculateMultiState(e):this._calculateSingleState(e)}_calculateRangeState(e){let t=this.startDate,n=this.endDate,r=t?new Date(t).setHours(0,0,0,0):null,i=n?new Date(n).setHours(0,0,0,0):null;return{isSelected:r!==null&&e===r||i!==null&&e===i,isInRange:r&&i?e>r&&e<i:!1}}_calculateMultiState(e){return{isSelected:this.selectedDates.map(e=>new Date(e).setHours(0,0,0,0)).includes(e),isInRange:!1}}_calculateSingleState(e){let t=this.selectedDate,n=t?new Date(t).setHours(0,0,0,0):null;return{isSelected:n!==null&&e===n,isInRange:!1}}_handleRangeSelection(e){let t=this.startDate,n=this.endDate;if(!t||t&&n){this.startDate=e,this.endDate=null,this._emitEvent(`startDateChange`,e),this._emitEvent(`endDateChange`,null);return}e<t?(this.startDate=e,this.endDate=t,this._emitEvent(`startDateChange`,e),this._emitEvent(`endDateChange`,t)):(this.endDate=e,this._emitEvent(`endDateChange`,e))}_handleMultiSelection(e){let t=[...this.selectedDates],n=e.getTime(),r=t.findIndex(e=>new Date(e).setHours(0,0,0,0)===n);r>-1?t.splice(r,1):t.push(e),t.sort((e,t)=>e.getTime()-t.getTime()),this.selectedDates=t,this._emitEvent(`selectedDatesChange`,t)}_handleSingleSelection(e){this.selectedDate=e,this._emitEvent(`selectedDateChange`,e)}_isDateDisabled(e){let t=this.minDate,n=this.maxDate;return!!(t&&e<t)||!!(n&&e>n)}_emitEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}render(){return Ne(this)}};o([i({type:Object}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`selectedDate`,null),o([i({type:Array}),u(`design:type`,Array),u(`design:paramtypes`,[])],B.prototype,`selectedDates`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`multiSelect`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`rangeSelect`,null),o([i({type:Object}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`startDate`,null),o([i({type:Object}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`endDate`,null),o([i({type:Object}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`minDate`,null),o([i({type:Object}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`maxDate`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`disabled`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`placeholder`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`dateFormat`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`firstDayOfWeek`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`_currentMonth`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`_isOpen`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`_mode`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`_yearPageStart`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],B.prototype,`_focusedDate`,null),B=o([d(`dcx-web-datepicker`)],B);var Be=t`
  :host {
    display: inline-block;
    width: 100%;
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  :host([orientation='vertical']) .dcx-input__control {
    transform: rotate(-90deg);
    transform-origin: center;
  }

  .dcx-input__label {
    display: inline-block;
    margin-bottom: var(--sp-2, 8px);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-input__label--invalid {
    color: var(--color-error, #dc2626);
  }

  .dcx-input__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-input__wrapper {
    position: relative;
    width: 100%;
  }

  .dcx-input__field {
    position: relative;
    width: 100%;
  }

  .dcx-input__leading-icon {
    position: absolute;
    left: var(--sp-3, 12px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .dcx-input__control {
    width: 100%;
    background-color: var(--bg-default, #ffffff);
    border: 1px solid var(--border-input, #d1d5db);
    border-radius: var(--r-sm, 4px);
    font-size: var(--fs-base, 14px);
    color: var(--text-dark, #2a2e33);
    box-sizing: border-box;
  }

  .dcx-input__control:focus-visible {
    outline: none;
    border-color: var(--border-focus, #1db8f2);
    box-shadow: 0 0 0 2px rgba(1, 88, 171, 0.15);
  }

  .dcx-input__control:hover:not(:disabled) {
    box-shadow: 0 0 0 2px var(--border-hover, #9ca3af);
  }

  .dcx-input__control--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--bg-disabled, #f3f4f6);
    color: var(--text-disabled, #696e75);
  }

  .dcx-input__control--invalid {
    border-color: var(--border-error, #dc2626);
    box-shadow: 0 0 0 1px var(--border-error, #dc2626);
    color: var(--color-error, #dc2626);
  }

  .dcx-input__control--xs {
    padding: var(--sp-2, 8px);
  }

  .dcx-input__control--s {
    padding: var(--sp-3, 12px);
  }

  .dcx-input__control--m {
    padding: var(--sp-4, 16px);
  }

  .dcx-input__control--l {
    padding: var(--sp-5, 20px);
  }

  .dcx-input__control--xl {
    padding: var(--sp-6, 24px);
  }

  .dcx-input__control--has-icon {
    padding-left: 40px;
  }

  .dcx-input__control--has-action {
    padding-right: var(--sp-10, 40px);
  }

  .dcx-input__hint {
    margin-top: var(--sp-1, 4px);
    color: var(--text-muted, #696e75);
    font-size: var(--fs-sm, 12px);
  }

  .dcx-input__error {
    margin-top: var(--sp-2, 8px);
    color: var(--color-error, #dc2626);
    font-size: var(--fs-sm, 12px);
    display: flex;
    align-items: flex-start;
    gap: var(--sp-2, 8px);
  }

  .dcx-input__error-list {
    margin: var(--sp-1, 4px) 0 0;
    padding-left: var(--sp-4, 16px);
    list-style: disc;
  }

  .dcx-input__action-button {
    position: absolute;
    right: var(--sp-2, 8px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
`,Ve=t=>e`
    ${t.label?e`
          <label
            class="dcx-input__label ${t.isInvalid?`dcx-input__label--invalid`:``}"
            for="${t.id}"
            id="${t.labelId}"
          >
            ${t.label}
            ${t.required?e`<span class="dcx-input__required">*</span>`:n}
          </label>
        `:n}

    <div class="dcx-input__wrapper">
      <div class="dcx-input__field">
        ${t.getInputIcon?e`
              <dcx-web-icon
                class="dcx-input__leading-icon"
                name="${t.getInputIcon}"
              ></dcx-web-icon>
            `:n}

        <input
          class="${t.getInputClasses()}"
          id="${t.id}"
          name="${t.name}"
          type="${t.displayType}"
          .value="${String(t.value??``)}"
          placeholder="${t.placeholder}"
          inputmode="${t.inputMode}"
          autocomplete="${t.autocomplete}"
          ?readonly="${t.readonly}"
          ?disabled="${t.disabled}"
          ?required="${t.required}"
          ?checked="${t.checked}"
          ?multiple="${t.isFileType?t.multiple:!1}"
          min="${t.min}"
          max="${t.max}"
          step="${t.step}"
          aria-label="${t.label?``:t.ariaLabel??``}"
          aria-required="${t.required?`true`:`false`}"
          aria-invalid="${String(t.isInvalid)}"
          aria-describedby="${t.describedBy??``}"
          @input="${t.onInputChange}"
          @change="${t.onChangeEvent}"
          @focus="${t.onFocusEvent}"
          @blur="${t.onBlurEvent}"
          @keydown="${e=>e.key===`Enter`?t.emit(`enterPressed`):null}"
        />

        ${t.showActionIcon&&!t.isRangeType?e`
              <dcx-web-button
                class="dcx-input__action-button"
                variant="icon-only"
                size="s"
                .icon="${!0}"
                iconSize="l"
                .iconName="${t.getActionButtonIcon}"
                .ariaLabel="${t.getActionButtonAriaLabel}"
                ?disabled="${t.disabled}"
                @buttonClick="${t.onActionButtonClick}"
              ></dcx-web-button>
            `:n}
      </div>

      ${t.hint&&!t.isInvalid?e`
            <div class="dcx-input__hint" id="${t.hintId}">
              ${t.hint}
            </div>
          `:n}

      ${t.showRequiredWarning?e`
            <div class="dcx-input__error" role="alert" id="${t.errorId}">
              <span>
                ${t.requiredMessage??`Este campo es requerido`}
              </span>
            </div>
          `:n}

      ${t.isInvalid&&(t.errorMessage||t.errorMessages.length>0)?e`
            <div class="dcx-input__error" role="alert" id="${t.errorId}">
              <dcx-web-icon
                .name="${t.errorIcon}"
                color="var(--color-error, #dc2626)";
              ></dcx-web-icon>

              <div>
                ${t.errorMessage?e`
                      <span>
                        ${t.errorMessage}
                      </span>
                    `:n}

                ${t.errorMessages.length?e`
                      <ul class="dcx-input__error-list">
                        ${t.errorMessages.map(t=>e`
                            <li>
                              ${t.message}
                            </li>
                          `)}
                      </ul>
                    `:n}
              </div>
            </div>
          `:n}
    </div>
  `,V=class extends r{#e=`dcx-input-${Math.random().toString(36).substring(2,9)}`;get id(){return this.#e}set id(e){this.#e=e}#t=``;get value(){return this.#t}set value(e){this.#t=e}#n=!1;get disabled(){return this.#n}set disabled(e){this.#n=e}#r=!1;get readonly(){return this.#r}set readonly(e){this.#r=e}#i=``;get placeholder(){return this.#i}set placeholder(e){this.#i=e}#a=te;get type(){return this.#a}set type(e){this.#a=e}#o=``;get name(){return this.#o}set name(e){this.#o=e}#s=!1;get required(){return this.#s}set required(e){this.#s=e}#c=!1;get checked(){return this.#c}set checked(e){this.#c=e}#l=``;get autocomplete(){return this.#l}set autocomplete(e){this.#l=e}#u=``;get inputMode(){return this.#u}set inputMode(e){this.#u=e}#d=!1;get isInvalid(){return this.#d}set isInvalid(e){this.#d=e}#f=``;get label(){return this.#f}set label(e){this.#f=e}#p=``;get hint(){return this.#p}set hint(e){this.#p=e}#m=null;get ariaLabel(){return this.#m}set ariaLabel(e){this.#m=e}#h=null;get ariaDescribedBy(){return this.#h}set ariaDescribedBy(e){this.#h=e}#g=``;get errorMessage(){return this.#g}set errorMessage(e){this.#g=e}#_=ne;get requiredMessage(){return this.#_}set requiredMessage(e){this.#_=e}#v=[];get errorMessages(){return this.#v}set errorMessages(e){this.#v=e}#y=m;get errorIcon(){return this.#y}set errorIcon(e){this.#y=e}#b=`xs`;get spacing(){return this.#b}set spacing(e){this.#b=e}#x=`horizontal`;get orientation(){return this.#x}set orientation(e){this.#x=e}#S=!1;get multiple(){return this.#S}set multiple(e){this.#S=e}#C=l.min;get min(){return this.#C}set min(e){this.#C=e}#w=l.max;get max(){return this.#w}set max(e){this.#w=e}#T=l.step;get step(){return this.#T}set step(e){this.#T=e}#E=!1;get showPassword(){return this.#E}set showPassword(e){this.#E=e}#D=!1;get touched(){return this.#D}set touched(e){this.#D=e}static styles=Be;get labelId(){return`${this.id}-label`}get errorId(){return`${this.id}-error`}get hintId(){return`${this.id}-hint`}get isPasswordType(){return this.type===s.PASSWORD}get isSearchType(){return this.type===s.SEARCH}get isFileType(){return this.type===s.FILE}get isRadioType(){return this.type===s.RADIO}get isRangeType(){return this.type===s.RANGE}get displayType(){return this.isPasswordType?this.showPassword?`text`:`password`:this.isRangeType?`range`:this.type}get showActionIcon(){return(this.isPasswordType||this.isSearchType)&&!this.readonly}get getInputIcon(){return{[s.TEXT]:null,[s.NUMBER]:`pin`,[s.EMAIL]:`mail`,[s.PASSWORD]:null,[s.SEARCH]:`search`,[s.TEL]:`phone`,[s.URL]:`link`,[s.FILE]:null,[s.RADIO]:null,[s.RANGE]:null}[this.type]??null}get describedBy(){let e=[this.ariaDescribedBy,this.hint&&!this.isInvalid?this.hintId:null,this.isInvalid?this.errorId:null].filter(Boolean).join(` `).trim();return e.length?e:null}get showRequiredWarning(){return this.required&&[``,null,void 0].includes(this.value)&&this.touched}get getActionButtonAriaLabel(){return this.isPasswordType?this.showPassword?`Ocultar contraseña`:`Mostrar contraseña`:this.isSearchType?`Buscar`:``}get getActionButtonIcon(){return this.isPasswordType?this.showPassword?`eye-slash-fill`:`eye-fill`:this.isSearchType?`search`:``}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}formatValueByType(e){switch(this.type){case`number`:return e.replace(/[^0-9.-]/g,``)===``?``:parseFloat(e.replace(/[^0-9.-]/g,``));case`email`:return e.toLowerCase();case`tel`:return e.replace(/[^0-9\s\-()]/g,``);case`search`:return e.trim();case`url`:return e.toLowerCase();default:return e}}onInputChange(e){if(this.isRadioType||this.isFileType)return;let t=e.target,n=this.formatValueByType(t.value);this.value=n,this.emit(`valueChange`,n)}onChangeEvent(e){this.isFileType||this.isRadioType&&e.target.checked&&this.emit(`valueChange`,this.value)}onFocusEvent(){this.touched=!1,this.emit(`focusEvent`)}onBlurEvent(){this.touched=!0,this.emit(`blurEvent`)}togglePasswordVisibility(){this.showPassword=!this.showPassword}onActionButtonClick(){if(this.isPasswordType){this.togglePasswordVisibility();return}this.isSearchType&&this.emit(`valueChange`,this.value)}getInputClasses(){let e=[`dcx-input__control`,`dcx-input__control--${this.spacing}`];return this.disabled&&e.push(`is-disabled`,`dcx-input__control--disabled`),this.isInvalid&&e.push(`is-invalid`,`dcx-input__control--invalid`),this.getInputIcon&&e.push(`has-icon`,`dcx-input__control--has-icon`),this.showActionIcon&&e.push(`has-action`,`dcx-input__control--has-action`),e.join(` `)}render(){return Ve(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`id`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`value`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`disabled`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`readonly`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`placeholder`,null),o([i({type:String}),u(`design:type`,s===void 0?Object:s),u(`design:paramtypes`,[])],V.prototype,`type`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`name`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`required`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`checked`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`autocomplete`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`inputMode`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`isInvalid`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`label`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`hint`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`ariaLabel`,null),o([i({type:String,attribute:`aria-describedby`}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`ariaDescribedBy`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`errorMessage`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`requiredMessage`,null),o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],V.prototype,`errorMessages`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`errorIcon`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`spacing`,null),o([i({type:String,reflect:!0}),u(`design:type`,String),u(`design:paramtypes`,[])],V.prototype,`orientation`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`multiple`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`min`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`max`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`step`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`showPassword`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],V.prototype,`touched`,null),V=o([d(`dcx-web-input`)],V);var He=t=>e`
    <div
      class="dcx-input-otp__group"
      role="group"
      aria-label="${t.ariaLabel}"
      aria-invalid="${String(t.invalid)}"
      aria-describedby="${t.describedBy??n}"
    >
      ${t.displayTokens.map((n,r)=>{let i=t.getTemplateContext(n,r);return t.inputTemplateRenderer?t.inputTemplateRenderer(i):e`
            <input
              class="${t.getInputClass(n)}"
              type="${t.inputType}"
              inputmode="${t.inputMode}"
              autocomplete="one-time-code"
              maxlength="1"
              placeholder="${t.placeholder}"
              aria-label="${t.getAriaLabel(r)}"
              ?disabled="${t.isDisabled}"
              .value="${n}"
              @focus="${e=>i.events.focus(e)}"
              @blur="${e=>i.events.blur(e)}"
              @input="${e=>i.events.input(e)}"
              @keydown="${e=>i.events.keydown(e)}"
              @paste="${e=>i.events.paste(e)}"
            />
          `})}
    </div>

    ${t.showError?e`
          <div
            class="dcx-input-otp__error"
            role="alert"
            id="${t.errorId}"
          >
            ${t.errorMessage}
          </div>
        `:n}
  `,Ue=t`
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-2, 8px);
  }

  .dcx-input-otp__group {
    display: inline-flex;
    gap: var(--sp-3, 12px);
  }

  .dcx-input-otp__error {
    color: var(--color-error, #dc2626);
    font-size: var(--fs-sm, 12px);
  }

  .dcx-input-otp__input {
    width: 48px;
    height: 48px;
    padding: 0;

    border: 1px solid
      var(--border-input, #d1d5db);

    border-radius: var(--r-lg, 8px);

    background: var(
      --bg-default,
      #ffffff
    );

    color: var(
      --text-dark,
      #2a2e33
    );

    box-shadow: var(
      --shadow-sm,
      0 1px 2px rgba(0, 0, 0, 0.06)
    );

    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );

    font-size: var(
      --fs-lg,
      18px
    );

    font-weight: var(
      --fw-semibold,
      600
    );

    text-align: center;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  .dcx-input-otp__input--small {
    width: 40px;
    height: 40px;
    font-size: var(--fs-md, 16px);
  }

  .dcx-input-otp__input--large {
    width: 56px;
    height: 56px;
    font-size: var(--fs-xl, 20px);
  }

  .dcx-input-otp__input--filled:not(
      .dcx-input-otp__input--invalid
    ) {
    border-color: var(
      --color-primary,
      #0058ab
    );
  }

  .dcx-input-otp__input--invalid {
    border-color: var(
      --border-error,
      #dc2626
    );
  }

  .dcx-input-otp__input--invalid:focus-visible {
    border-color: var(
      --border-error,
      #dc2626
    );

    box-shadow: 0 0 0 3px
      color-mix(
        in srgb,
        var(--border-error, #dc2626) 20%,
        transparent
      );
  }

  .dcx-input-otp__input:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    background: var(
      --bg-disabled,
      #f3f4f6
    );

    color: var(
      --text-disabled,
      #696e75
    );
  }

  .dcx-input-otp__input::placeholder {
    color: var(
      --text-placeholder,
      #9ca3af
    );
  }

  .dcx-input-otp__input:focus-visible {
    outline: none;

    border-color: var(
      --border-focus,
      #1db8f2
    );

    box-shadow: 0 0 0 3px
      color-mix(
        in srgb,
        var(--border-focus, #1db8f2) 18%,
        transparent
      );
  }

  .dcx-input-otp__input--invalid:focus-visible {
    border-color: var(
      --border-error,
      #dc2626
    );

    box-shadow: 0 0 0 3px
      color-mix(
        in srgb,
        var(--border-error, #dc2626) 18%,
        transparent
      );
  }
`,H=class extends r{#e=4;get length(){return this.#e}set length(e){this.#e=e}#t=`medium`;get size(){return this.#t}set size(e){this.#t=e}#n=!1;get integerOnly(){return this.#n}set integerOnly(e){this.#n=e}#r=!1;get mask(){return this.#r}set mask(e){this.#r=e}#i=!1;get invalid(){return this.#i}set invalid(e){this.#i=e}#a=!1;get disabled(){return this.#a}set disabled(e){this.#a=e}#o=``;get placeholder(){return this.#o}set placeholder(e){this.#o=e}#s=`Código de un solo uso`;get ariaLabel(){return this.#s}set ariaLabel(e){this.#s=e}#c=``;get errorMessage(){return this.#c}set errorMessage(e){this.#c=e}#l=!1;get formDisabled(){return this.#l}set formDisabled(e){this.#l=e}#u=this.createEmptyTokens(4);get tokens(){return this.#u}set tokens(e){this.#u=e}#d=null;get inputTemplateRenderer(){return this.#d}set inputTemplateRenderer(e){this.#d=e}static styles=Ue;uid=`dcx-otp-${Math.random().toString(36).slice(2,9)}`;errorId=`${this.uid}-error`;getTemplateContext(e,t){return{$implicit:e,token:e,index:t,events:{input:e=>this.onInput(e,t),keydown:e=>this.onKeydown(e,t),paste:e=>this.onPaste(e,t),focus:e=>this.onFocus(t),blur:e=>this.onBlur(t)},attrs:{type:this.inputType,inputmode:this.inputMode,autocomplete:`one-time-code`,maxlength:1,placeholder:this.placeholder,ariaLabel:this.getAriaLabel(t),disabled:this.isDisabled,value:e}}}get normalizedLength(){let e=Number(this.length);return!Number.isFinite(e)||e<1?4:Math.floor(e)}willUpdate(){if(this.tokens.length===this.normalizedLength)return;let e=this.tokens.slice(0,this.normalizedLength);for(;e.length<this.normalizedLength;)e.push(``);this.tokens=e}get inputType(){return this.mask?`password`:this.integerOnly?`tel`:`text`}get inputMode(){return this.integerOnly?`numeric`:`text`}get isDisabled(){return this.disabled||this.formDisabled}get showError(){return this.invalid&&this.errorMessage.trim().length>0}get describedBy(){return this.showError?this.errorId:null}get displayTokens(){return this.tokens}get inputBaseClass(){let e=[`dcx-input-otp__input`];return this.size===`small`&&e.push(`dcx-input-otp__input--small`),this.size===`large`&&e.push(`dcx-input-otp__input--large`),e.join(` `)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}writeValue(e){let t=this.sanitizeValue(String(e??``));this.tokens=this.valueToTokens(t)}setDisabledState(e){this.formDisabled=e}focus(){let e=this.tokens.findIndex(e=>!e),t=e>=0?e:0;this.focusInput(t)}clear(){this.tokens=this.createEmptyTokens(this.normalizedLength),this.propagateValue(!0),this.focus()}getAriaLabel(e){return`Dígito ${e+1} de ${this.normalizedLength}`}getInputClass(e){let t=[this.inputBaseClass];return e&&t.push(`dcx-input-otp__input--filled`),this.invalid&&t.push(`dcx-input-otp__input--invalid`),t.join(` `)}onInput(e,t){if(this.isDisabled)return;let n=e.target,r=this.sanitizeCharacters(n.value);if(n.value=r,!r){this.updateToken(t,``);return}this.applyCharacters(t,r)}onPaste(e,t){if(this.isDisabled)return;e.preventDefault();let n=e.clipboardData?.getData(`text`)??``,r=this.sanitizeCharacters(n);r&&this.applyCharacters(t,r)}onKeydown(e,t){if(this.isDisabled)return;if(this.integerOnly&&e.key.length===1&&!/^\d$/.test(e.key)){e.preventDefault();return}if(e.key===`ArrowLeft`){e.preventDefault(),this.focusInput(Math.max(t-1,0));return}if(e.key===`ArrowRight`){e.preventDefault(),this.focusInput(Math.min(t+1,this.normalizedLength-1));return}if(e.key!==`Backspace`)return;e.preventDefault();let n=[...this.tokens];if(n[t]){n[t]=``,this.tokens=n,this.propagateValue(!0);return}t!==0&&(n[t-1]=``,this.tokens=n,this.propagateValue(!0),this.focusInput(t-1))}onFocus(e){this.emit(`focusEvent`,e)}onBlur(e){this.emit(`blurEvent`,e)}applyCharacters(e,t){let n=[...this.tokens],r=this.sanitizeCharacters(t).slice(0,this.normalizedLength-e).split(``);r.forEach((t,r)=>{n[e+r]=t}),this.tokens=n,this.propagateValue(!0);let i=Math.min(e+r.length,this.normalizedLength-1);this.focusInput(i)}updateToken(e,t){let n=[...this.tokens];n[e]=t,this.tokens=n,this.propagateValue(!0)}propagateValue(e){let t=this.tokens.join(``);e&&(this.emit(`valueChange`,t),t.length===this.normalizedLength&&this.emit(`completed`,t))}focusInput(e){queueMicrotask(()=>{let t=this.renderRoot.querySelectorAll(`input`)[e];t?.focus(),t?.select()})}sanitizeValue(e){return this.sanitizeCharacters(e).slice(0,this.normalizedLength)}sanitizeCharacters(e){return this.integerOnly?e.replace(/\D+/g,``):e}valueToTokens(e){let t=this.createEmptyTokens(this.normalizedLength);return e.split(``).forEach((e,n)=>{n<t.length&&(t[n]=e)}),t}createEmptyTokens(e){return Array.from({length:e},()=>``)}render(){return He(this)}};o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`length`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`size`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`integerOnly`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`mask`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`invalid`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`disabled`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`placeholder`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`ariaLabel`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`errorMessage`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`formDisabled`,null),o([a(),u(`design:type`,Array),u(`design:paramtypes`,[])],H.prototype,`tokens`,null),o([i({attribute:!1,state:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],H.prototype,`inputTemplateRenderer`,null),H=o([d(`dcx-web-input-otp`)],H);var U=t`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  :host(.dcx-slider--vertical) {
    flex-direction: row;
    gap: var(--sp-1, 4px);
    align-items: center;
    height: 150px;
    width: fit-content;
  }

  :host(.dcx-slider--vertical) .dcx-slider__control {
    width: 40px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(.dcx-slider--vertical) .dcx-slider__value-label {
    margin: 0;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    gap: var(--r-xs, 2px);
    width: 20px;
  }

  .dcx-slider__value-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-dark, #2a2e33);
  }

  .dcx-slider__label {
    font-weight: var(--fw-medium, 500);
  }

  .dcx-slider__value {
    font-weight: var(--fw-bold, 700);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-slider__value-label.is-disabled .dcx-slider__value,
  .dcx-slider__value-label--disabled .dcx-slider__value {
    color: var(--text-disabled, #696e75);
  }


  .dcx-input__control {
    border: none !important;
    padding: 0 !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .dcx-input__control:focus-visible {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .dcx-input__wrapper {
    display: flex;
    align-items: center;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: var(--sp-1, 4px);
    border-radius: var(--r-xs, 2px);
    background: linear-gradient(
      to right,
      var(--bg-primary, #0058ab) var(--slider-progress, 0%),
      var(--border-light, #e5e7eb) var(--slider-progress, 0%)
    );
    outline: none;
    cursor: pointer;
    margin: var(--sp-2, 8px) 0;
    background-color: transparent;
  }

  input[type='range']:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: var(--r-xs, 2px);
    border-radius: var(--r-sm, 4px);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bg-primary, #0058ab);
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bg-primary, #0058ab);
    border: 2px solid #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  input[type='range']:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  input[type='range']:disabled::-webkit-slider-thumb {
    background: var(--text-disabled, #696e75);
  }

  input[type='range']:disabled::-moz-range-thumb {
    background: var(--text-disabled, #696e75);
  }
`,We=t=>e`
  ${t.showLabel?e`
        <div
          class="dcx-slider__value-label ${t.disabled?`is-disabled`:``}"
        >
          <span class="dcx-slider__label">${t.textLabel}</span>
          <span class="dcx-slider__value">${t.displayValue}</span>
        </div>
      `:n}

  <dcx-web-input
    class="dcx-slider__control"
    .type="${`range`}"
    .value="${t.valueInput}"
    .min="${t.min}"
    .max="${t.max}"
    .step="${t.step}"
    ?disabled="${t.disabled}"
    .ariaLabel="${t.effectiveAriaLabel}"
    style="width: ${t.vertical?`100px`:`100%`};"
    .orientation="${t.vertical?`vertical`:`horizontal`}"
    @valueChange="${t.onInput}"
  ></dcx-web-input>
`,W=class extends r{static styles=U;#e=h.showLabel;get showLabel(){return this.#e}set showLabel(e){this.#e=e}#t=h.textLabel;get textLabel(){return this.#t}set textLabel(e){this.#t=e}#n=h.value;get value(){return this.#n}set value(e){this.#n=e}#r=h.min;get min(){return this.#r}set min(e){this.#r=e}#i=h.max;get max(){return this.#i}set max(e){this.#i=e}#a=h.step;get step(){return this.#a}set step(e){this.#a=e}#o=h.vertical;get vertical(){return this.#o}set vertical(e){this.#o=e}#s=h.disabled;get disabled(){return this.#s}set disabled(e){this.#s=e}#c=null;get ariaLabel(){return this.#c}set ariaLabel(e){this.#c=e}#l=h.valueSuffix;get valueSuffix(){return this.#l}set valueSuffix(e){this.#l=e}#u=0;get valueInput(){return this.#u}set valueInput(e){this.#u=e}willUpdate(e){(e.has(`value`)||e.has(`min`)||e.has(`max`))&&(this.valueInput=this.clamp(this.value))}updated(e){e.has(`vertical`)&&(this.vertical?this.classList.add(`dcx-slider--vertical`):this.classList.remove(`dcx-slider--vertical`)),this.style.setProperty(`--slider-progress`,`${this.progressPercent}%`)}async firstUpdated(){let e=this.shadowRoot?.querySelector(`dcx-web-input`);if(e&&(await e.updateComplete,e.shadowRoot)){let t=document.createElement(`style`);t.textContent=U.cssText,e.shadowRoot.appendChild(t)}}clamp(e){return Math.min(Math.max(e,this.min),this.max)}onInput(e){let t=Number(e.detail);this.valueInput=t,this.value=t,this.dispatchEvent(new CustomEvent(`valueChange`,{detail:t,bubbles:!0,composed:!0}))}get displayValue(){return`${this.valueInput}${this.valueSuffix}`}get effectiveAriaLabel(){return this.ariaLabel||(this.showLabel?this.textLabel:null)}get effectiveAriaValueText(){return this.valueSuffix?this.displayValue:null}get progressPercent(){let e=this.min,t=this.max,n=this.valueInput;return t===e?100:(n-e)/(t-e)*100}render(){return We(this)}};o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`showLabel`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`textLabel`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`value`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`min`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`max`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`step`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`vertical`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`disabled`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`ariaLabel`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`valueSuffix`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],W.prototype,`valueInput`,null),W=o([d(`dcx-web-slider`)],W);var Ge=t=>e`
    ${t.label?e`
          <label
            class="dcx-select__label"
            for="${t.selectId}"
            id="${t.labelId}"
          >
            ${t.label}

            ${t.required?e`
                  <span class="dcx-select__required">
                    *
                  </span>
                `:n}
          </label>
        `:n}

    <div class="dcx-select__wrapper">
      <div
        ${e=>{e instanceof HTMLElement&&t.registerControlElement(e)}}
        class="${t.getControlClasses()}"
        role="combobox"
        tabindex="${t.disabled?-1:0}"
        id="${t.selectId}"
        aria-expanded="${String(t.isOpen)}"
        aria-labelledby="${t.label?t.labelId:n}"
        aria-label="${t.label?n:t.ariaLabel??``}"
        aria-haspopup="listbox"
        aria-controls="${t.selectId}-panel"
        aria-activedescendant="${t.activeDescendant??n}"
        aria-disabled="${t.disabled?`true`:`false`}"
        @click="${t.toggle}"
        @keydown="${t.onKey}"
      >
        <span class="dcx-select__selected-value">
          ${t.selectedLabel}
        </span>

        <div class="dcx-select__buttons">
          ${t.clearable&&t.value!==null?e`
                <dcx-web-button
                  class="dcx-select__clear-btn"
                  variant="icon-only"
                  size="s"
                  .icon="${!0}"
                  icon-name="x"
                  icon-size="l"
                  aria-label="Borrar selección"
                  @click="${e=>e.stopPropagation()}"
                  @buttonClick="${t.clearValue}"
                >
                </dcx-web-button>
              `:n}

          <dcx-web-icon
            class="dcx-select__chevron"
            name="chevron-down"
            aria-hidden="true"
          >
          </dcx-web-icon>
        </div>
      </div>

      ${t.isInvalid&&t.errorMessage?e`
            <div
              class="dcx-select__error"
              role="alert"
            >
              <dcx-web-icon
                name="${t.errorIcon}"
                color="var(--color-error, #dc2626)"
                aria-hidden="true"
              >
              </dcx-web-icon>

              <span>
                ${t.errorMessage}
              </span>
            </div>
          `:n}

      ${t.isOpen?e`
            <div
              class="dcx-select__panel"
              role="listbox"
              id="${t.selectId}-panel"
              aria-labelledby="${t.labelId}"
            >
              ${t.searchable?e`
                    <dcx-web-input
                      placeholder="Buscar..."
                      .value="${t.search}"
                      type="text"
                      aria-label="Buscar opciones"
                      @valueChange="${t.onSearchEvent}"
                    >
                    </dcx-web-input>
                  `:n}

              <div class="dcx-select__options">
                ${t.filtered.map((r,i)=>e`
                    <div
                      class="
                        dcx-select__option
                        ${r.disabled?`is-disabled`:``}
                        ${r.value===t.value?`is-selected`:``}
                        ${i===t.activeIndex?`is-active`:``}
                      "
                      role="option"
                      aria-selected="${String(r.value===t.value)}"
                      aria-disabled="${r.disabled?`true`:n}"
                      id="${t.selectId}-opt-${i}"
                      @click="${()=>t.selectOption(r)}"
                    >
                      ${r.label}
                    </div>
                  `)}
              </div>
            </div>
          `:n}
    </div>
  `,Ke=t`
  :host {
    display: inline-block;
    width: 100%;
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
    box-sizing: border-box;
  }

  .dcx-select__label {
    display: inline-block;
    margin-bottom: var(--sp-1, 4px);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-select__required {
    color: var(--color-error, #dc2626);
  }

  .dcx-select__wrapper {
    position: relative;
  }

  .dcx-select__control {
    width: 100%;
    display: flex;
    align-items: center;
    padding: var(--sp-2, 8px)
      var(--sp-3, 12px);

    border: 1px solid
      var(--border-input, #d1d5db);

    border-radius:
      var(--r-sm, 4px);

    background: var(
      --bg-default,
      #ffffff
    );

    box-sizing: border-box;

    cursor: pointer;
  }

  .dcx-select__control.is-open,
  .dcx-select__control:focus-visible {
    border-color: var(
      --border-focus,
      #1db8f2
    );
  }

  .dcx-select__control.is-disabled {
    background-color: var(--bg-disabled, #f3f4f6);
    color: var(--text-disabled, #696e75);
    border-color: var(--border-disabled, #e5e7eb);
    cursor: not-allowed;
  }

  .dcx-select--spacing-xs {
    padding: var(--sp-1, 4px) var(--sp-2, 8px);
  }

  .dcx-select--spacing-s {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
  }

  .dcx-select--spacing-m {
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
  }

  .dcx-select--spacing-l {
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
  }

  .dcx-select--spacing-xl {
    padding: var(--sp-5, 20px) var(--sp-6, 24px);
  }

  .dcx-select__control.is-invalid {
    border-color: var(--border-error, #dc2626);
  }

  .dcx-select__control.is-invalid:focus-visible,
  .dcx-select__control.is-invalid.is-open {
    box-shadow: 0 0 0 2px rgba(220,38,38,.15);
  }

  .dcx-select__buttons {
    display: flex;
    align-items: center;
    gap: var(--sp-1, 4px);
    margin-left: auto;
    flex-shrink: 0;
  }

  .dcx-select__clear-btn {
    flex-shrink: 0;

    width: 16px;
    height: 16px;

    min-width: 16px;
    min-height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-select__panel {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 50;
    margin-top: var(--sp-1, 4px);
    border: 1px solid
      var(--border-input, #d1d5db);

    border-radius:
      var(--r-sm, 4px);

    background: var(
      --bg-default,
      #fff
    );

    box-shadow: var(
      --shadow-md,
      0 4px 12px rgba(0,0,0,.08)
    );
  }

  .dcx-select__options {
    max-height: var(--select-max-height, 250px);
    overflow-y: auto;
  }

  .dcx-select__option {
    padding: var(--sp-2, 8px)
      var(--sp-3, 12px);

    cursor: pointer;
  }

  .dcx-select__option.is-active,
  .dcx-select__option.is-selected {
    background: var(
      --bg-primary,
      #0058ab
    );

    color: var(
      --text-white,
      #ffffff
    );
  }

  .dcx-select__option.is-disabled {
    color: var(--text-disabled, #696e75);
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .dcx-select__option:not(.is-disabled):hover {
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-select__error {
    margin-top: var(--sp-1, 4px);
    color: var(
      --color-error,
      #dc2626
    );

    display: flex;
    gap: var(--sp-1, 4px);
  }
`,G=class extends r{#e=``;get label(){return this.#e}set label(e){this.#e=e}#t=[];get options(){return this.#t}set options(e){this.#t=e}#n=_;get placeholder(){return this.#n}set placeholder(e){this.#n=e}#r=null;get ariaLabel(){return this.#r}set ariaLabel(e){this.#r=e}#i=!1;get searchable(){return this.#i}set searchable(e){this.#i=e}#a=!1;get clearable(){return this.#a}set clearable(e){this.#a=e}#o=!1;get disabled(){return this.#o}set disabled(e){this.#o=e}#s=!1;get required(){return this.#s}set required(e){this.#s=e}#c=!1;get isInvalid(){return this.#c}set isInvalid(e){this.#c=e}#l=``;get errorMessage(){return this.#l}set errorMessage(e){this.#l=e}#u=m;get errorIcon(){return this.#u}set errorIcon(e){this.#u=e}#d=null;get valueInput(){return this.#d}set valueInput(e){this.#d=e}#f=`m`;get spacing(){return this.#f}set spacing(e){this.#f=e}#p=null;get value(){return this.#p}set value(e){this.#p=e}#m=!1;get isOpen(){return this.#m}set isOpen(e){this.#m=e}#h=``;get search(){return this.#h}set search(e){this.#h=e}#g=-1;get activeIndex(){return this.#g}set activeIndex(e){this.#g=e}#_=!1;get receivedFromExternal(){return this.#_}set receivedFromExternal(e){this.#_=e}static styles=Ke;id=`dcx-select-${Math.random().toString(36).substring(2,9)}`;get selectId(){return this.id}get labelId(){return`${this.id}-label`}controlElement=null;connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this.handleDocumentClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`click`,this.handleDocumentClick,!0)}updated(e){e.has(`valueInput`)&&!this.receivedFromExternal&&(this.value=this.valueInput)}get filtered(){let e=this.search.toLowerCase();return this.options.filter(t=>t.label.toLowerCase().includes(e))}get selectedLabel(){let e=this.value;return e===null?this.placeholder:this.options.find(t=>t.value===e)?.label??this.placeholder}get activeDescendant(){return!this.isOpen||this.activeIndex<0?null:`${this.selectId}-opt-${this.activeIndex}`}getControlClasses(){let e=[`dcx-select__control`];return this.isOpen&&e.push(`is-open`),this.disabled&&e.push(`is-disabled`),this.isInvalid&&e.push(`is-invalid`),this.spacing&&e.push(`dcx-select--spacing-${this.spacing}`),e.join(` `)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}toggle=()=>{this.disabled||(this.isOpen?this.close():this.open())};open(){let e=this.filtered.findIndex(e=>e.value===this.value);this.activeIndex=e>=0?e:0,this.isOpen=!0,queueMicrotask(()=>{this.renderRoot.querySelector(`#${this.selectId}-opt-${this.activeIndex}`)?.scrollIntoView({block:`nearest`})})}close(){this.isOpen=!1,this.activeIndex=-1}selectOption(e){e.disabled||(this.value=e.value,this.emit(`valueChange`,e.value),this.close())}clearValue=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),!this.disabled&&(this.search=``,this.value=null,this.close(),this.emit(`clear`))};onSearchEvent=e=>{this.search=e.detail===null?``:String(e.detail),this.activeIndex=this.filtered.length>0?0:-1};handleDocumentClick=e=>{!e.composedPath().includes(this)&&this.isOpen&&this.close()};moveActive(e){let t=this.filtered.map((e,t)=>e.disabled?-1:t).filter(e=>e>=0);if(!t.length)return;let n=t.indexOf(this.activeIndex),r=0;switch(e){case`next`:r=n<0?0:(n+1)%t.length;break;case`prev`:r=n<0?t.length-1:(n-1+t.length)%t.length;break;case`first`:r=0;break;case`last`:r=t.length-1}this.activeIndex=t[r]}confirmActive(){let e=this.filtered[this.activeIndex];e&&!e.disabled&&this.selectOption(e)}onKey=e=>{if(!this.isOpen){(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),this.open());return}switch(e.key){case`ArrowDown`:e.preventDefault(),this.moveActive(`next`);break;case`ArrowUp`:e.preventDefault(),this.moveActive(`prev`);break;case`Home`:e.preventDefault(),this.moveActive(`first`);break;case`End`:e.preventDefault(),this.moveActive(`last`);break;case`Enter`:e.preventDefault(),this.confirmActive();break;case`Escape`:e.preventDefault(),this.close(),this.controlElement?.focus()}};registerControlElement(e){this.controlElement=e}render(){return Ge(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`label`,null),o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],G.prototype,`options`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`placeholder`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`ariaLabel`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`searchable`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`clearable`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`disabled`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`required`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`isInvalid`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`errorMessage`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`errorIcon`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`valueInput`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`spacing`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`value`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`isOpen`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`search`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`activeIndex`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],G.prototype,`receivedFromExternal`,null),G=o([d(`dcx-web-select`)],G);var qe=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .dcx-stepper {
    display: flex;
    flex-direction: column;
    gap: var(--sp-6, 24px);
    width: 100%;
  }

  .dcx-stepper--horizontal .dcx-stepper__header {
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }

  .dcx-stepper--horizontal .dcx-stepper__item {
    flex: 1 1 0;
    min-width: 0;
  }

  .dcx-stepper--horizontal .dcx-stepper__step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .dcx-stepper--horizontal .dcx-stepper__step-label {
    align-items: center;
    text-align: center;
  }

  .dcx-stepper--horizontal .dcx-stepper__divider {
    flex: 1 1 0;
    min-width: var(--sp-4, 16px);
    width: auto;
    margin: calc(var(--sp-8, 32px) / 2 - 1px)
      var(--sp-3, 12px) 0;
  }

  .dcx-stepper--vertical .dcx-stepper__header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-4, 16px);
  }

  .dcx-stepper--vertical .dcx-stepper__divider {
    width: 2px;
    height: var(--sp-8, 32px);
    margin-left: calc(var(--sp-6, 24px) / 2 - 1px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .dcx-stepper--s .dcx-stepper__step-indicator {
    width: var(--sp-6, 24px);
    height: var(--sp-6, 24px);
  }

  .dcx-stepper--s .dcx-stepper__number,
  .dcx-stepper--s .dcx-stepper__label-text {
    font-size: var(--fs-sm, 12px);
  }

  .dcx-stepper--m .dcx-stepper__step-indicator {
    width: var(--sp-8, 32px);
    height: var(--sp-8, 32px);
  }

  .dcx-stepper--m .dcx-stepper__number,
  .dcx-stepper--m .dcx-stepper__label-text {
    font-size: var(--fs-base, 14px);
  }

  .dcx-stepper--l .dcx-stepper__step-indicator {
    width: var(--sp-10, 40px);
    height: var(--sp-10, 40px);
  }

  .dcx-stepper--l .dcx-stepper__number,
  .dcx-stepper--l .dcx-stepper__label-text {
    font-size: var(--fs-lg, 18px);
  }

  .dcx-stepper--xl .dcx-stepper__step-indicator {
    width: var(--sp-12, 48px);
    height: var(--sp-12, 48px);
  }

  .dcx-stepper--xl .dcx-stepper__number,
  .dcx-stepper--xl .dcx-stepper__label-text {
    font-size: var(--fs-xl, 20px);
  }

  .dcx-stepper__header {
    display: flex;
    align-items: center;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dcx-stepper__item {
    display: flex;
    list-style: none;
  }

  .dcx-stepper__step {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: var(--sp-3, 12px);
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease;
  }

  .dcx-stepper__step:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
    border-radius: var(--r-md, 6px);
  }


  .dcx-stepper__step:not(.dcx-stepper__step--disabled):hover
  .dcx-stepper__step-indicator,
  .dcx-stepper__step:not(.dcx-stepper__step--disabled):hover
  .dcx-stepper__step-indicator dcx-web-icon {
  border-color: var(--bg-primary-hover, #004080);
  color: var(--bg-primary-hover, #004080);
  }

  .dcx-stepper__step--active .dcx-stepper__step-indicator {
    border-color: var(--bg-primary, #0058ab);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-stepper__step--active .dcx-stepper__label-text {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-stepper__step--completed .dcx-stepper__step-indicator {
    background: var(--bg-primary, #0058ab);
    border-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-stepper__step--completed .dcx-stepper__label-text {
    color: var(--text-dark, #2a2e33);
  }

  .dcx-stepper__step--error .dcx-stepper__step-indicator {
    border-color: var(--color-error, #dc2626);
    color: var(--color-error, #dc2626);
  }

  .dcx-stepper__step--error .dcx-stepper__label-text {
    color: var(--color-error, #dc2626);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-stepper__step--disabled {
    cursor: not-allowed;
  }

  .dcx-stepper__step--disabled .dcx-stepper__step-indicator {
    background: var(--bg-disabled, #f3f4f6);
    border-color: var(--border-light, #d1d5db);
    color: var(--text-disabled, #696e75);
  }

  .dcx-stepper__step--disabled .dcx-stepper__label-text {
    color: var(--text-disabled, #696e75);
  }

  .dcx-stepper__step--disabled:hover .dcx-stepper__step-indicator {
    border-color: var(--border-light, #d1d5db);
    color: var(--text-disabled, #696e75);
  }

  .dcx-stepper__step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--sp-8, 32px);
    height: var(--sp-8, 32px);
    border-radius: 50%;
    background: var(--bg-default, #ffffff);
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-medium, 500);
    border: 2px solid var(--border-light, #d1d5db);
    transition: all 0.2s ease;
  }

  .dcx-stepper__number {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    line-height: 1;
  }

  .dcx-stepper__custom-icon {
    width: 70%;
    height: 70%;
  }

  .dcx-stepper__check-icon{
    
    display: flex;
    color: var(--text-white, #ffffff);
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 70%;
    margin: 0;
    padding: 0;
  }

  .dcx-stepper__error-icon {
    color: var(--color-error, #dc2626);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 70%;
    margin: 0;
    padding: 0;
  }

  .dcx-stepper__check-icon {
    transform: translateY(1px);
  }

  .dcx-stepper__error-icon {
    transform: translateX(1px) translateY(1px);
  }

  .dcx-stepper__step-label {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1, 4px);
  }

  .dcx-stepper__label-text {
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
    line-height: 1.4;
  }

  .dcx-stepper__label-description {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    line-height: 1.3;
  }

  .dcx-stepper__label-optional {
    font-size: var(--fs-xs, 11px);
    color: var(--text-placeholder, #9ca3af);
    font-style: italic;
  }

  .dcx-stepper__divider {
    flex-shrink: 0;
    width: calc(100% - var(--sp-8, 32px) - var(--sp-3, 12px) * 2);
    height: 2px;
    margin: 0 var(--sp-3, 12px);
    background: var(--border-light, #d1d5db);
    transition: background 0.2s ease;
  }

  .dcx-stepper__divider--completed {
    background: var(--bg-primary, #0058ab);
  }

  .dcx-stepper__content {
    padding: var(--sp-6, 24px);
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-md, 6px);
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`,Je=t=>e`
    <nav
      class="${t.stepperClasses}"
      aria-label="${t.ariaLabel??``}"
    >
      <ol
        class="${t.headerClasses}"
        role="list"
      >
        ${t.steps.map((r,i)=>e`
            <li class="dcx-stepper__item">
              <button
                type="button"
                class="${t.getStepClasses(r)}"
                ?disabled="${r.disabled}"
                aria-current="${t.isActive(r.id)?`step`:n}"
                tabindex="${t.isActive(r.id)?0:-1}"
                @click="${()=>t.onStepClick(r,i)}"
                @keydown="${e=>t.onStepKeydown(e,r,i)}"
              >
                <div
                  class="dcx-stepper__step-indicator"
                >
                  ${r.completed&&!r.error?e`
                        <dcx-web-icon
                          name="check"
                          class="dcx-stepper__check-icon"
                          aria-hidden="true"
                        ></dcx-web-icon>

                        <span
                          class="visually-hidden"
                        >
                          Completado
                        </span>
                      `:r.error?e`
                          <dcx-web-icon
                            name="exclamation-circle"
                            class="dcx-stepper__error-icon"
                            aria-hidden="true"
                          ></dcx-web-icon>

                          <span
                            class="visually-hidden"
                          >
                            Error
                          </span>
                        `:t.showStepNumbers?e`
                            <span
                              class="dcx-stepper__number"
                            >
                              ${i+1}
                            </span>
                          `:r.icon?e`
                              <dcx-web-icon
                                name="${r.icon}"
                                class="dcx-stepper__custom-icon"
                                aria-hidden="true"
                              ></dcx-web-icon>
                            `:n}
                </div>

                <div
                  class="dcx-stepper__step-label"
                >
                  <div
                    class="dcx-stepper__label-text"
                  >
                    ${r.label}
                  </div>

                  ${r.description?e`
                        <div
                          class="dcx-stepper__label-description"
                        >
                          ${r.description}
                        </div>
                      `:n}

                  ${r.optional?e`
                        <div
                          class="dcx-stepper__label-optional"
                        >
                          (opcional)
                        </div>
                      `:n}
                </div>
              </button>
            </li>

            ${i<t.steps.length-1?e`
                  <div
                    class="dcx-stepper__divider ${r.completed?`dcx-stepper__divider--completed`:``}"
                    aria-hidden="true"
                  ></div>
                `:n}
          `)}
      </ol>

      ${t.activeStepContent?e`
            <div
              class="${t.contentClasses}"
            >
              <slot
                name="step-content"
              ></slot>
            </div>
          `:n}
    </nav>
  `,K=class extends r{#e=[];get steps(){return this.#e}set steps(e){this.#e=e}#t=``;get activeStepId(){return this.#t}set activeStepId(e){this.#t=e}#n=`horizontal`;get orientation(){return this.#n}set orientation(e){this.#n=e}#r=!1;get linear(){return this.#r}set linear(e){this.#r=e}#i=!0;get showStepNumbers(){return this.#i}set showStepNumbers(e){this.#i=e}#a=`m`;get size(){return this.#a}set size(e){this.#a=e}#o=null;get ariaLabel(){return this.#o}set ariaLabel(e){this.#o=e}#s=null;get internalActiveStepId(){return this.#s}set internalActiveStepId(e){this.#s=e}static styles=qe;connectedCallback(){super.connectedCallback(),this.syncActiveStepId()}updated(e){(e.has(`activeStepId`)||e.has(`steps`))&&this.syncActiveStepId()}get activeStepIndex(){return this.steps.findIndex(e=>e.id===this.internalActiveStepId)}get activeStep(){let e=this.activeStepIndex;return e>=0?this.steps[e]:null}get activeStepContent(){return!!this.activeStep?.contentTpl}get stepperClasses(){return[`dcx-stepper`,`dcx-stepper--${this.orientation}`,`dcx-stepper--${this.size}`].join(` `)}get headerClasses(){return`dcx-stepper__header`}get contentClasses(){return`dcx-stepper__content`}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}syncActiveStepId(){if(this.activeStepId===``||this.activeStepId===null||this.activeStepId===void 0){this.setFirstEnabledStepAsActive();return}this.internalActiveStepId=this.activeStepId}setFirstEnabledStepAsActive(){let e=this.steps.find(e=>!e.disabled);this.internalActiveStepId=e?.id??null}isActive(e){return this.internalActiveStepId===e}getStepClasses(e){return[`dcx-stepper__step`,this.isActive(e.id)?`dcx-stepper__step--active`:``,e.completed?`dcx-stepper__step--completed`:``,e.disabled?`dcx-stepper__step--disabled`:``,e.error?`dcx-stepper__step--error`:``].filter(Boolean).join(` `)}onStepClick(e,t){if(e.disabled||this.linear&&!this.canNavigateToIndex(t))return;let n={previousStepId:this.internalActiveStepId,currentStepId:e.id,previousIndex:this.activeStepIndex,currentIndex:t};this.internalActiveStepId=e.id,this.emit(`stepClick`,e),this.emit(`stepChange`,n)}onStepKeydown(e,t,n){if(e.key===`Enter`||e.key===` `){e.preventDefault(),this.onStepClick(t,n);return}if(e.key===`Home`){e.preventDefault(),this.activateStepAtIndex(this.findFirstEnabledStep());return}if(e.key===`End`){e.preventDefault(),this.activateStepAtIndex(this.findLastEnabledStep());return}this.orientation===`horizontal`?this.navigateByArrowKey(e,n,`ArrowRight`,`ArrowLeft`):this.navigateByArrowKey(e,n,`ArrowDown`,`ArrowUp`)}navigateByArrowKey(e,t,n,r){e.key===n&&(e.preventDefault(),this.activateStepAtIndex(this.findNextEnabledStep(t,1))),e.key===r&&(e.preventDefault(),this.activateStepAtIndex(this.findNextEnabledStep(t,-1)))}activateStepAtIndex(e){e<0||this.onStepClick(this.steps[e],e)}findNextEnabledStep(e,t){let n=e+t;for(;n>=0&&n<this.steps.length;){if(!this.steps[n].disabled)return n;n+=t}return-1}findFirstEnabledStep(){return this.steps.findIndex(e=>!e.disabled)}findLastEnabledStep(){for(let e=this.steps.length-1;e>=0;e--)if(!this.steps[e].disabled)return e;return-1}canNavigateToIndex(e){return e<=this.activeStepIndex||this.steps.slice(0,e).every(e=>e.completed||e.disabled)}render(){return Je(this)}};o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],K.prototype,`steps`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],K.prototype,`activeStepId`,null),o([i({type:String}),u(`design:type`,String),u(`design:paramtypes`,[])],K.prototype,`orientation`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],K.prototype,`linear`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],K.prototype,`showStepNumbers`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],K.prototype,`size`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],K.prototype,`ariaLabel`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],K.prototype,`internalActiveStepId`,null),K=o([d(`dcx-web-stepper`)],K);var Ye=t=>t.dismissed?n:e`
    <div
      class="dcx-message ${t.type}"
      role="${t.announce?t.messageData.role:n}"
      aria-live="${t.announce?t.messageData.ariaLive:n}"
    >
      ${t.icon?e`
            <dcx-web-icon
              class="dcx-message__icon"
              name="${t.iconName||t.messageData.icon}"
              color="inherit"
            >
            </dcx-web-icon>
          `:n}

      <div class="dcx-message__body">
        ${t.title?e`
              <p class="dcx-message__title">
                ${t.title}
              </p>
            `:n}

        <p class="dcx-message__paragraph">
          ${t.body}
        </p>

        ${t.link?e`
              <a href="${t.link}" class="dcx-message__link">
                ${t.link}
              </a>
            `:n}
      </div>

      ${t.showClose?e`
            <dcx-web-button
              class="dcx-message__close"
              type="button"
              variant="icon-only"
              size="m"
              .icon="${!0}"
              icon-name="x"
              icon-size="xl"
              aria-label="Cerrar"
              @buttonClick="${t.onClose}"
            >
            </dcx-web-button>
          `:n}
    </div>
  `,Xe=t`
  :host {
    display: block;
    width: 100%;
    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );
  }

  .dcx-message {
    display: flex;
    align-items: flex-start;
    gap: var(--sp-3, 12px);
    padding: var(--sp-3, 12px)
      var(--sp-4, 16px);
    border-radius: var(--r-md, 6px);
    border-left: 4px solid transparent;
    margin-bottom: var(--sp-3, 12px);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
  }

  .dcx-message__body {
    flex: 1;
    min-width: 0;
  }

  .dcx-message__title {
    display: block;
    margin: 0 0 2px;
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.4;
  }

  .dcx-message__paragraph {
    margin: 0;
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    opacity: 0.85;
  }

  .dcx-message__link {
    display: inline-block;
    margin-top: var(--sp-1, 4px);
    text-decoration: underline;
    text-underline-offset: 0.12em;
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    color: inherit;
  }

  .dcx-message__icon {
    flex-shrink: 0;
  }

  .dcx-message__close {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    flex-shrink: 0;
    margin-left: auto;
    width: 1.375rem;
    height: 1.375rem;
    padding: 0;
    border-radius: var(--r-sm, 4px);
    opacity: 0.5;
  }

  .dcx-message__close:hover,
  .dcx-message__close:focus-within {
    opacity: 1;
  }

  .notification {
    background: var(
      --color-info-bg,
      #eff6ff
    );
    border-left-color: var(
      --color-info,
      #0058ab
    );
    color: #1e3a5f;
  }

  .warning {
    background: var(
      --color-warning-bg,
      #fffbeb
    );
    border-left-color: var(
      --color-warning,
      #d97706
    );
    color: #78350f;
  }

  .error {
    background: var(
      --color-error-bg,
      #fef2f2
    );
    border-left-color: var(
      --color-error,
      #dc2626
    );
    color: #7f1d1d;
  }

  .success {
    background: var(
      --color-success-bg,
      #f0fdf4
    );
    border-left-color: var(
      --color-success,
      #16a34a
    );
    color: #14532d;
  }
`,q=class extends r{#e=``;get body(){return this.#e}set body(e){this.#e=e}#t=`notification`;get type(){return this.#t}set type(e){this.#t=e}#n=``;get title(){return this.#n}set title(e){this.#n=e}#r=``;get link(){return this.#r}set link(e){this.#r=e}#i=!1;get icon(){return this.#i}set icon(e){this.#i=e}#a=``;get iconName(){return this.#a}set iconName(e){this.#a=e}#o=!1;get showClose(){return this.#o}set showClose(e){this.#o=e}#s=!0;get announce(){return this.#s}set announce(e){this.#s=e}#c=!1;get dismissed(){return this.#c}set dismissed(e){this.#c=e}static styles=Xe;get messageData(){return{notification:{icon:`info-circle`,role:`status`,ariaLive:`polite`},success:{icon:`check-circle`,role:`status`,ariaLive:`polite`},warning:{icon:`exclamation-triangle`,role:`alert`,ariaLive:`assertive`},error:{icon:`x-circle`,role:`alert`,ariaLive:`assertive`}}[this.type]}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}onClose=()=>{this.dismissed=!0,this.emit(`closed`)};render(){return Ye(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`body`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`type`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`title`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`link`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`icon`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`iconName`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`showClose`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`announce`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],q.prototype,`dismissed`,null),q=o([d(`dcx-web-message`)],q);var Ze=t`
  :host {
    display: inline-flex;
  }

  .dcx-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;

    gap: var(--sp-2, 8px);

    cursor: pointer;

    background: none;
    border: none;
    padding: 0;

    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);

    --toggle-width: 2.25rem;
    --toggle-height: 1.25rem;
    --thumb-size: 1rem;

    --toggle-transition-duration: 150ms;
    --toggle-transition-timing: ease;
  }

  .dcx-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-toggle--s {
    --toggle-width: 1.75rem;
    --toggle-height: 1rem;
    --thumb-size: 0.75rem;
  }

  .dcx-toggle--m {
    --toggle-width: 2.25rem;
    --toggle-height: 1.25rem;
    --thumb-size: 1rem;
  }

  .dcx-toggle--l {
    --toggle-width: 2.75rem;
    --toggle-height: 1.5rem;
    --thumb-size: 1.25rem;
  }

  .dcx-toggle--xl {
    --toggle-width: 3.25rem;
    --toggle-height: 1.75rem;
    --thumb-size: 1.5rem;
  }

  .dcx-toggle--top {
    flex-direction: column-reverse;
    align-items: center;
  }

  .dcx-toggle--bottom {
    flex-direction: column;
    align-items: center;
  }

  .dcx-toggle--left {
    flex-direction: row-reverse;
  }

  .dcx-toggle--right {
    flex-direction: row;
  }

  .dcx-toggle__track {
    width: var(--toggle-width);
    height: var(--toggle-height);

    background-color:
      var(--border-default, #2a2e33);

    border-radius: var(--r-pill, 999px);

    position: relative;

    flex-shrink: 0;

    transition:
      background-color
      var(--toggle-transition-duration)
      var(--toggle-transition-timing);
  }

  .dcx-toggle__thumb {
    display: block;

    width: var(--thumb-size);
    height: var(--thumb-size);

    background-color:
      var(--bg-default, #ffffff);

    border-radius: 50%;

    position: absolute;

    top: 50%;
    left: 0.125rem;

    transform: translateY(-50%);

    box-shadow: var(
      --shadow-sm,
      0 1px 2px rgba(0, 0, 0, 0.06)
    );

    transition:
      left
      var(--toggle-transition-duration)
      var(--toggle-transition-timing);
  }

  .dcx-toggle__thumb--checked {
    left: calc(
      var(--toggle-width) -
      var(--thumb-size) -
      0.125rem
    );
  }

  .dcx-toggle__label {
    font-size: var(--fs-base, 14px);
  }

  .dcx-toggle[aria-checked='true']
    .dcx-toggle__track {
    background-color:
      var(--bg-primary, #0058ab);
  }

  .dcx-toggle[aria-checked='true']:not(
      .dcx-toggle--disabled
    ):hover
    .dcx-toggle__track {
    background-color:
      var(--bg-primary-hover, #004080);
  }

  .dcx-toggle:focus-visible {
    outline: 2px solid
      var(--border-focus, #1db8f2);

    outline-offset: 2px;

    border-radius: var(--r-pill, 999px);
  }
`,Qe=t=>e`
    <button
      type="button"
      class="${t.getToggleClasses()}"
      role="switch"
      aria-checked="${t.checked}"
      aria-label="${t.effectiveAriaLabel}"
      ?disabled="${t.disabled}"
      @click="${t.toggle}"
    >
      <span class="dcx-toggle__track">
        <span
          class="dcx-toggle__thumb
            ${t.checked?`dcx-toggle__thumb--checked`:``}"
        >
        </span>
      </span>

      ${t.label?e`
            <span class="dcx-toggle__label">
              ${t.label}
            </span>
          `:n}
    </button>
  `,J=class extends r{#e=!1;get checked(){return this.#e}set checked(e){this.#e=e}#t=!1;get disabled(){return this.#t}set disabled(e){this.#t=e}#n=null;get label(){return this.#n}set label(e){this.#n=e}#r=`m`;get size(){return this.#r}set size(e){this.#r=e}#i=null;get ariaLabel(){return this.#i}set ariaLabel(e){this.#i=e}#a=`right`;get textPosition(){return this.#a}set textPosition(e){this.#a=e}static styles=Ze;get effectiveAriaLabel(){return this.ariaLabel||this.label||`Toggle`}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}toggle(){if(this.disabled)return;let e=!this.checked;this.checked=e,this.emit(`toggled`,e)}getToggleClasses(){let e=[`dcx-toggle`,this.size?`dcx-toggle--${this.size}`:``,`dcx-toggle--${this.textPosition}`];return this.disabled&&e.push(`dcx-toggle--disabled`),e.filter(Boolean).join(` `)}render(){return Qe(this)}};o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],J.prototype,`checked`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],J.prototype,`disabled`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],J.prototype,`label`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],J.prototype,`size`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],J.prototype,`ariaLabel`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],J.prototype,`textPosition`,null),J=o([d(`dcx-web-toggle`)],J);var $e=t`
  :host {
    display: block;
    width: 100%;
  }

  .dcx-progressbar {
    width: 100%;
    position: relative;
  }

  .dcx-progressbar__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--sp-2, 8px);
    margin-bottom: var(--sp-1, 4px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
  }

  .dcx-progressbar__header span:last-child {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-progressbar__container {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    position: relative;
  }

  .dcx-progressbar__track {
    flex: 1;
    height: var(--sp-1, 4px);
    background: var(--border-light, #e5e7eb);
    border-radius: var(--r-xs, 2px);
    position: relative;
    overflow: hidden;
  }

  .dcx-progressbar__fill {
    height: 100%;
    width: var(--progress-width, 0%);
    background: var(--bg-primary, #0058ab);
    border-radius: var(--r-xs, 2px);
    transition: width 0.3s ease;
  }

  .dcx-progressbar--segmented .dcx-progressbar__fill {
    animation: loading-pulse 1.5s ease-in-out infinite;
  }

  .dcx-progressbar__segments {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 2px;
    padding: 0 2px;
  }

  .dcx-progressbar__segment {
    flex: 1;
    border-right: 2px solid
      var(--bg-default, #ffffff);
  }

  .dcx-progressbar__segment:last-child {
    border-right: none;
  }

  .dcx-progressbar__tooltip {
    position: absolute;
    top: -32px;
    left: var(--tooltip-position, 0%);
    transform: translateX(-50%);
    background: var(--text-dark, #2a2e33);
    color: var(--text-white, #ffffff);
    padding: var(--sp-1, 4px) var(--sp-2, 8px);
    border-radius: var(--r-md, 6px);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
    white-space: nowrap;
    pointer-events: none;
    }

    .dcx-progressbar__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);

    border-width: 4px;
    border-style: solid;
    border-color:
        var(--text-dark, #2a2e33)
        transparent
        transparent
        transparent;
    }

  

  .dcx-progressbar__stepper {
    position: relative;
    width: 100%;
  }

  .dcx-progressbar__stepper-track {
    position: absolute;
    top: var(--sp-5, 20px);
    left: var(--sp-6, 24px);
    right: var(--sp-6, 24px);
    height: var(--r-xs, 2px);
    background: var(--border-light, #d1d5db);
    z-index: 0;
  }

  .dcx-progressbar__stepper-progress {
    height: 100%;
    width: var(--stepper-progress, 0%);
    background: var(--bg-primary, #0058ab);
  }

  .dcx-progressbar__steps {
    display: flex;
    justify-content: space-between;
    position: relative; 
    z-index: 1;
  }

  .dcx-progressbar__step:not(:last-child) {
    margin-right: var(--sp-4, 16px);
  }

  .dcx-progressbar__step {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-2, 8px);
  }

  .dcx-progressbar__step-circle {
    width: var(--sp-10, 40px);
    height: var(--sp-10, 40px);
    border-radius: var(--r-pill, 999px);
    border: 2px solid
      var(--border-light, #d1d5db);
    background: var(--bg-default, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-progressbar__step--active
    .dcx-progressbar__step-circle {
    background: var(--bg-primary, #0058ab);
    border-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  .dcx-progressbar__step--completed
    .dcx-progressbar__step-circle {
    background: var(--color-success, #16a34a);
    border-color: var(--color-success, #16a34a);
    color: var(--text-white, #ffffff);
  }

  .dcx-progressbar__checkmark {
      color: var(--text-white, #ffffff);
    }

  .dcx-progressbar__step-label {
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
    text-align: center;
  }

  @keyframes loading-pulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.6;
    }
  }
`,et=t=>e`
  <div
    class="dcx-progressbar
      ${t.isSegmentedVariant?`dcx-progressbar--segmented`:``}
      ${t.isStepperVariant?`dcx-progressbar--stepper`:``}"
  >
    ${t.isDefaultVariant||t.isSegmentedVariant?e`
          ${t.showLabel?e`
                <div
                  class="dcx-progressbar__header"
                  id="${t.labelId}"
                >
                  <span>${t.label}</span>
                  <span>
                    ${t.progressPercentage}%
                  </span>
                </div>
              `:n}

          <div
            class="dcx-progressbar__container"
          >
            <div
              class="dcx-progressbar__track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="${t.progressPercentage}"
              aria-valuetext="${t.progressPercentage}%"
              aria-labelledby="${t.showLabel?t.labelId:n}"
              aria-label="${t.showLabel?n:t.ariaLabel||`Progreso`}"
            >
              <div
                class="dcx-progressbar__fill"
                style="--progress-width:${t.progressPercentage}%"
                data-value="${t.progressPercentage}"
              ></div>

              ${t.isSegmentedVariant?e`
                    <div
                      class="dcx-progressbar__segments"
                      aria-hidden="true"
                    >
                      ${t.segmentArray.map(()=>e`
                          <div
                            class="dcx-progressbar__segment"
                          ></div>
                        `)}
                    </div>
                  `:n}
            </div>

            ${t.showTooltip?e`
                  <div
                    class="dcx-progressbar__tooltip"
                    aria-hidden="true"
                    style="--tooltip-position:${t.progressPercentage}%"
                  >
                    ${t.progressPercentage}%
                  </div>
                `:n}
          </div>
        `:n}

    ${t.isStepperVariant?e`
          <div
            class="dcx-progressbar__stepper"
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax="${t.steps.length}"
            aria-valuenow="${t.currentStep}"
            aria-valuetext="${t.stepValueText}"
            aria-label="${t.ariaLabel||`Progreso`}"
          >
            <div
              class="dcx-progressbar__stepper-track"
              aria-hidden="true"
            >
              <div
                class="dcx-progressbar__stepper-progress"
                style="--stepper-progress:${t.stepProgress}%"
              ></div>
            </div>

            <div class="dcx-progressbar__steps">
              ${t.steps.map((r,i)=>e`
                  <div
                    class="dcx-progressbar__step
                      ${t.isStepCompleted(i)?`dcx-progressbar__step--completed`:``}
                      ${t.isStepActive(i)?`dcx-progressbar__step--active`:``}"
                    aria-current="${t.isStepActive(i)?`step`:n}"
                  >
                    <div
                      class="dcx-progressbar__step-circle"
                      aria-hidden="true"
                    >
                      ${t.showCheckmarks&&t.isStepCompleted(i)?e`
                            <dcx-web-icon
                              class="dcx-progressbar__checkmark"
                              name="check"
                              size="m"
                              spacing="none"
                            ></dcx-web-icon>
                          `:e`
                            <span
                              class="dcx-progressbar__step-number"
                            >
                              ${i+1}
                            </span>
                          `}
                    </div>

                    ${r.label?e`
                          <span
                            class="dcx-progressbar__step-label"
                          >
                            ${r.label}
                          </span>
                        `:n}
                  </div>
                `)}
            </div>
          </div>
        `:n}
  </div>
`,Y=class extends r{#e=`dcx-progressbar-${Math.random().toString(36).substring(2,9)}`;get id(){return this.#e}set id(e){this.#e=e}#t=`default`;get variant(){return this.#t}set variant(e){this.#t=e}#n=0;get value(){return this.#n}set value(e){this.#n=e}#r=``;get label(){return this.#r}set label(e){this.#r=e}#i=``;get ariaLabel(){return this.#i}set ariaLabel(e){this.#i=e}#a=!1;get showTooltip(){return this.#a}set showTooltip(e){this.#a=e}#o=!1;get showLabel(){return this.#o}set showLabel(e){this.#o=e}#s=[];get steps(){return this.#s}set steps(e){this.#s=e}#c=0;get currentStep(){return this.#c}set currentStep(e){this.#c=e}#l=!1;get showCheckmarks(){return this.#l}set showCheckmarks(e){this.#l=e}#u=5;get segments(){return this.#u}set segments(e){this.#u=e}static styles=$e;get labelId(){return`${this.id}-label`}get progressPercentage(){return Math.min(Math.max(this.value,0),100)}get isStepperVariant(){return this.variant===`stepper`}get isSegmentedVariant(){return this.variant===`segmented`}get isDefaultVariant(){return this.variant==="default"}get segmentArray(){return Array(this.segments).fill(0).map((e,t)=>t)}get stepProgress(){let e=this.steps.length;return e===0?0:this.currentStep/e*100}get stepValueText(){return`Paso ${this.currentStep} de ${this.steps.length}`}isStepCompleted(e){return e<this.currentStep-1}isStepActive(e){return e===this.currentStep-1}render(){return et(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`id`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`variant`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`value`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`label`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`ariaLabel`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`showTooltip`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`showLabel`,null),o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],Y.prototype,`steps`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`currentStep`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`showCheckmarks`,null),o([i({type:Number}),u(`design:type`,Object),u(`design:paramtypes`,[])],Y.prototype,`segments`,null),Y=o([d(`dcx-web-progressbar`)],Y);var tt=t`
  :host {
    display: inline-block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-radio-group {
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-md, 6px);
    padding: var(--sp-4, 16px);
    background: var(--bg-default, #ffffff);
    margin: 0;
  }

  .dcx-radio-group__legend {
    font-weight: var(--fw-semibold, 600);
    font-size: var(--fs-base, 14px);
    color: var(--text-label, #4f545a);
    padding: 0;
    margin-bottom: var(--sp-4, 16px);
  }

  .dcx-radio-group__options {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3, 12px);
  }

  .dcx-radio-group__hint {
    margin-top: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--text-muted, #696e75);
  }

  .dcx-radio-group__error {
    margin-top: var(--sp-2, 8px);
    font-size: var(--fs-sm, 12px);
    color: var(--border-error, #dc2626);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-radio {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    cursor: pointer;
    position: relative;
    user-select: none;
    color: var(--text-label, #4f545a);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);

    --dcx-radio-size: 20px;
    --dcx-radio-dot-size: 8px;
    --dcx-radio-border-color: var(--border-default, #2a2e33);
    --dcx-radio-dot-color: var(--bg-primary, #0058ab);
  }

  .dcx-radio__native {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .dcx-radio__control {
    width: var(--dcx-radio-size);
    height: var(--dcx-radio-size);
    border: 1.5px solid var(--dcx-radio-border-color);
    border-radius: var(--r-pill, 999px);
    background: var(--bg-default, #ffffff);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .dcx-radio__control::after {
    content: '';
    width: var(--dcx-radio-dot-size);
    height: var(--dcx-radio-dot-size);
    border-radius: var(--r-pill, 999px);
    background: var(--dcx-radio-dot-color);
    transform: scale(0);
    transition: transform 0.15s ease;
  }

  .dcx-radio__label {
    color: inherit;
  }

  .dcx-radio--checked {
    --dcx-radio-border-color: var(--bg-primary, #0058ab);
  }

  .dcx-radio--checked .dcx-radio__control::after {
    transform: scale(1);
  }

  .dcx-radio:hover:not(.dcx-radio--disabled):not(.dcx-radio--error) {
    --dcx-radio-border-color: var(--bg-primary, #0058ab);
  }

  .dcx-radio--error:hover:not(.dcx-radio--disabled) {
    --dcx-radio-border-color: var(--border-default, #2a2e33);
  }

  .dcx-radio:focus-within:not(.dcx-radio--disabled) .dcx-radio__control {
    box-shadow: 0 0 0 2px var(--bg-default, #ffffff), 0 0 0 4px var(--bg-primary, #0058ab);
  }

  .dcx-radio:focus-within:not(.dcx-radio--disabled).dcx-radio--error .dcx-radio__control {
    box-shadow: 0 0 0 2px var(--bg-default, #ffffff), 0 0 0 4px var(--border-error, #dc2626);
  }

  .dcx-radio--error {
    --dcx-radio-border-color: var(--border-error, #dc2626);
    --dcx-radio-dot-color: var(--border-error, #dc2626);
    color: var(--border-error, #dc2626);
  }

  .dcx-radio--disabled {
    cursor: not-allowed;
    color: var(--text-disabled, #696e75);
    --dcx-radio-border-color: var(--border-light, #d1d5db);
  }

  .dcx-radio--disabled .dcx-radio__control {
    background: var(--bg-disabled, #f3f4f6);
  }

  .dcx-radio--disabled.dcx-radio--checked {
    --dcx-radio-dot-color: var(--text-disabled-dark, #4f545a);
  }

  .dcx-radio--s {
    --dcx-radio-size: var(--fs-base, 14px);
    --dcx-radio-dot-size: var(--r-md, 6px);
  }

  .dcx-radio--m {
    --dcx-radio-size: var(--sp-4, 16px);
    --dcx-radio-dot-size: var(--sp-2, 8px);
  }

  .dcx-radio--l {
    --dcx-radio-size: var(--fs-lg, 18px);
    --dcx-radio-dot-size: var(--sp-2, 8px);
  }
`,nt=t=>e`
    <fieldset
      class="dcx-radio-group"
      aria-label="${!t.label&&t.ariaLabel?t.ariaLabel:n}"
      aria-describedby="${t.describedBy?t.describedBy:n}"
    >
      ${t.label?e`<legend class="dcx-radio-group__legend">${t.label}</legend>`:``}

      <div class="dcx-radio-group__options">
        ${t.options.map(r=>e`
            <label class="${t.radioClasses(r)}">
              <input
                class="dcx-radio__native"
                type="radio"
                name="${t.name}"
                .value="${r.value}"
                .checked="${t.isChecked(r.value)}"
                ?disabled="${t.isOptionDisabled(r)}"
                aria-invalid="${t.error?`true`:n}"
                @change="${()=>t.onOptionChange(r)}"
                @blur="${t.onBlur}"
              />

              <span class="dcx-radio__control" aria-hidden="true"></span>

              <span class="dcx-radio__label">${r.label}</span>
            </label>
          `)}
      </div>

      ${t.showError?e`
            <div class="dcx-radio-group__error" role="alert" id="${t.errorId}">
              ${t.errorMessage}
            </div>
          `:``}

      ${t.showHint?e`
            <div class="dcx-radio-group__hint" id="${t.hintId}">
              ${t.hint}
            </div>
          `:``}
    </fieldset>
  `,X=class extends r{static styles=tt;#e=[];get options(){return this.#e}set options(e){this.#e=e}#t=`dcx-radio-${Math.random().toString(36).substring(2,9)}`;get name(){return this.#t}set name(e){this.#t=e}#n=``;get label(){return this.#n}set label(e){this.#n=e}#r=``;get ariaLabel(){return this.#r}set ariaLabel(e){this.#r=e}#i=`l`;get size(){return this.#i}set size(e){this.#i=e}#a=!1;get disabled(){return this.#a}set disabled(e){this.#a=e}#o=!1;get error(){return this.#o}set error(e){this.#o=e}#s=``;get hint(){return this.#s}set hint(e){this.#s=e}#c=``;get errorMessage(){return this.#c}set errorMessage(e){this.#c=e}#l=null;get value(){return this.#l}set value(e){this.#l=e}groupId=`dcx-radio-group-${Math.random().toString(36).substring(2,9)}`;get hintId(){return`${this.groupId}-hint`}get errorId(){return`${this.groupId}-error`}get isGroupDisabled(){return this.disabled}get showError(){return this.error&&!!this.errorMessage}get showHint(){return!!this.hint&&!this.showError}get describedBy(){return this.showError?this.errorId:this.showHint?this.hintId:null}isChecked(e){return this.value===e}isOptionDisabled(e){return this.isGroupDisabled||!!e.disabled}radioClasses(e){let t=`dcx-radio`;return[t,`${t}--${this.size}`,this.error?`${t}--error`:``,this.isOptionDisabled(e)?`${t}--disabled`:``,this.isChecked(e.value)?`${t}--checked`:``].filter(Boolean).join(` `)}onOptionChange(e){this.isOptionDisabled(e)||(this.value=e.value,this.dispatchEvent(new CustomEvent(`valueChange`,{detail:e.value,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`change`,{bubbles:!0,composed:!0})))}onBlur(){this.dispatchEvent(new CustomEvent(`blurEvent`,{bubbles:!0,composed:!0}))}render(){return nt(this)}};o([i({type:Array}),u(`design:type`,Array),u(`design:paramtypes`,[])],X.prototype,`options`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`name`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`label`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`ariaLabel`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`size`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`disabled`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`error`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`hint`,null),o([i({type:String,attribute:`error-message`}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`errorMessage`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],X.prototype,`value`,null),X=o([d(`dcx-web-radio`)],X);var rt=t`
  :host {
    display: inline-flex;
    position: relative;
  }

  .tooltip-container {
    display: inline-flex;
  }

  .dcx-ng-tooltip {
    --tooltip-arrow-size: 5px;
    --tooltip-arrow-side-offset: 8px;

    position: absolute;
    z-index: 9999;

    background-color: var(
      --background-secondary,
      #1c1f23
    );

    color: var(
      --content-default-white,
      #fff
    );

    border-radius: var(--r-md, 6px);

    padding:
      var(--sp-1, 4px)
      var(--sp-2, 8px);

    font-size: var(--fs-sm, 12px);
    line-height: 1.4;

    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );

    max-width: 250px;
    width: max-content;

    word-wrap: break-word;

    box-shadow: var(
      --shadow-md,
      0 4px 12px rgba(0, 0, 0, 0.15)
    );

    animation: fade-in linear 0.2s;
  }

  .dcx-ng-tooltip--top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  .dcx-ng-tooltip--right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
  }

  .dcx-ng-tooltip--primary {
    background-color: var(
      --bg-primary,
      #0058ab
    );
  }

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
    display: block;
  }

  .dcx-ng-tooltip--top .tooltip-arrow {
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);

    border-width:
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      0
      var(--tooltip-arrow-size);

    border-color:
      var(--background-secondary, #1c1f23)
      transparent
      transparent
      transparent;
  }

  .dcx-ng-tooltip--top.dcx-ng-tooltip--arrow-left
    .tooltip-arrow {
    left: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  .dcx-ng-tooltip--top.dcx-ng-tooltip--arrow-center
    .tooltip-arrow {
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--top.dcx-ng-tooltip--arrow-right
    .tooltip-arrow {
    left: auto;
    right: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  .dcx-ng-tooltip--bottom .tooltip-arrow {
    top: -3px;
    left: 50%;
    transform: translateX(-50%);

    border-width:
      0
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size);

    border-color:
      transparent
      transparent
      var(--background-secondary, #1c1f23)
      transparent;
  }

  .dcx-ng-tooltip--bottom.dcx-ng-tooltip--arrow-left
    .tooltip-arrow {
    left: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  .dcx-ng-tooltip--bottom.dcx-ng-tooltip--arrow-center
    .tooltip-arrow {
    left: 50%;
    transform: translateX(-50%);
  }

  .dcx-ng-tooltip--bottom.dcx-ng-tooltip--arrow-right
    .tooltip-arrow {
    left: auto;
    right: var(--tooltip-arrow-side-offset);
    transform: none;
  }

  .dcx-ng-tooltip--left .tooltip-arrow {
    right: -3px;
    top: 50%;
    transform: translateY(-50%);

    border-width:
      var(--tooltip-arrow-size)
      0
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size);

    border-color:
      transparent
      transparent
      transparent
      var(--background-secondary, #1c1f23);
  }

  .dcx-ng-tooltip--right .tooltip-arrow {
    left: -3px;
    top: 50%;
    transform: translateY(-50%);

    border-width:
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      var(--tooltip-arrow-size)
      0;

    border-color:
      transparent
      var(--background-secondary, #1c1f23)
      transparent
      transparent;
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--top
    .tooltip-arrow {
    border-color:
      var(--bg-primary, #0058ab)
      transparent
      transparent
      transparent;
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--bottom
    .tooltip-arrow {
    border-color:
      transparent
      transparent
      var(--bg-primary, #0058ab)
      transparent;
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--left
    .tooltip-arrow {
    border-color:
      transparent
      transparent
      transparent
      var(--bg-primary, #0058ab);
  }

  .dcx-ng-tooltip--primary.dcx-ng-tooltip--right
    .tooltip-arrow {
    border-color:
      transparent
      var(--bg-primary, #0058ab)
      transparent
      transparent;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`,it=t=>e`
    <div class="tooltip-container">
      <slot></slot>
    </div>

    ${t.visible&&(t.content||t.contentHtml)?e`
          <div
            id="${t.tooltipId}"
            role="tooltip"
            class="${t.tooltipClasses}"
          >
            ${t.contentHtml?e`
                  <div>
                    ${re(t.sanitizedHtml)}
                  </div>
                `:e`
                  ${t.content}
                `}

            <div class="tooltip-arrow"></div>
          </div>
        `:n}
  `,at=[`left`,`center`,`right`],ot=[`default`,`primary`],st=[`a`,`button`,`input`,`select`,`textarea`],Z=class extends r{#e=`top`;get position(){return this.#e}set position(e){this.#e=e}#t=`center`;get arrowAlignment(){return this.#t}set arrowAlignment(e){this.#t=e}#n=!1;get hideTooltipOnClick(){return this.#n}set hideTooltipOnClick(e){this.#n=e}#r=``;get content(){return this.#r}set content(e){this.#r=e}#i=``;get contentHtml(){return this.#i}set contentHtml(e){this.#i=e}#a=`default`;get variant(){return this.#a}set variant(e){this.#a=e}#o=!1;get visible(){return this.#o}set visible(e){this.#o=e}#s=`top`;get actualPosition(){return this.#s}set actualPosition(e){this.#s=e}tooltipId=`dcx-tooltip-${Math.random().toString(36).substring(2,9)}`;static styles=rt;get tooltipClasses(){let e=`dcx-ng-tooltip`;return[e,`${e}--${this.actualPosition}`,`${e}--arrow-${this.arrowAlignment}`,this.variant===`primary`?`${e}--primary`:``].filter(Boolean).join(` `)}get sanitizedHtml(){return this.sanitizeContent(this.contentHtml)}willUpdate(e){super.willUpdate(e),e.has(`position`)&&(this.actualPosition=this.position)}firstUpdated(){this.actualPosition=this.position,this.linkTriggerToTooltip()}linkTriggerToTooltip(){let e=((this.shadowRoot?.querySelector(`slot`))?.assignedElements({flatten:!0})??[])[0];e&&e.setAttribute(`aria-describedby`,this.tooltipId)}sanitizeContent(e){if(!e)return``;let t=new DOMParser().parseFromString(e,`text/html`);return st.forEach(e=>{t.body.querySelectorAll(e).forEach(e=>{e.replaceWith(...Array.from(e.childNodes))})}),t.body.innerHTML}show(){this.visible||!this.content&&!this.contentHtml||(this.visible=!0)}hide(){this.visible&&=!1}onMouseEnter(){this.show()}onMouseLeave(){this.hide()}onFocusIn(){this.show()}onFocusOut(){this.hide()}onEscape(){this.hide()}onClick(){this.hideTooltipOnClick&&this.hide()}connectedCallback(){super.connectedCallback(),this.addEventListener(`mouseenter`,this.onMouseEnter),this.addEventListener(`mouseleave`,this.onMouseLeave),this.addEventListener(`focusin`,this.onFocusIn),this.addEventListener(`focusout`,this.onFocusOut),this.addEventListener(`click`,this.onClick),this.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.onEscape()})}render(){return it(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`position`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`arrowAlignment`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`hideTooltipOnClick`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`content`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`contentHtml`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`variant`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`visible`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],Z.prototype,`actualPosition`,null),Z=o([d(`dcx-web-tooltip`)],Z);var ct=t=>e`
  <ul
    id="${t.id||``}"
    class="dcx-list-container"
    role="${t.listRole}"
    aria-label="${t.ariaLabel}"
    aria-multiselectable="${t.multiselectable??n}"
  >
    ${t.items.map((r,i)=>{let a=t.resolveAriaSelected(r,i)===!0;return r.divider?e`
              <li
                class="dcx-list-divider"
                role="separator"
              ></li>
            `:e`
              <li
                class="${t.getItemClasses(r,i)}"
                @click="${()=>t.onItemClick(r,i)}"
                @keydown="${e=>t.onKeydown(e,r,i)}"
                tabindex="${t.selectable&&!r.disabled?`0`:`-1`}"
                role="${t.itemRole}"
                aria-selected="${t.resolveAriaSelected(r,i)??n}"
                aria-disabled="${r.disabled||n}"
                aria-haspopup="${t.getChildren(r).length>0?`menu`:n}"
              >
                ${t.itemTemplate?t.itemTemplate({item:r,index:i,selected:a}):e`
                      <div class="dcx-list-item-content">
                        ${r.icon?e`
                              <div class="dcx-list-icon-container">
                                <dcx-web-icon
                                  class="dcx-list-icon"
                                  name="${r.icon}"
                                ></dcx-web-icon>
                              </div>
                            `:n}

                        <div class="dcx-list-text-container">
                          ${r.label||r.text?e`
                                <span class="dcx-list-text">
                                  ${r.label||r.text}
                                </span>
                              `:n}

                          ${r.description?e`
                                <span class="dcx-list-description">
                                  ${r.description}
                                </span>
                              `:n}
                        </div>

                        ${t.showChildrenIndicator&&t.getChildren(r).length>0?e`
                              <dcx-web-icon
                                class="dcx-list-children-indicator"
                                name="chevron-right"
                              ></dcx-web-icon>
                            `:n}
                      </div>
                    `}

                ${t.renderChildren&&t.getChildren(r).length>0?e`
                      <dcx-web-list
                        class="dcx-list-nested ${t.isSelected(i)?`parent-selected`:``}"
                        .items="${t.getChildren(r)}"
                        .selectable="${t.selectable}"
                        .multiSelect="${t.multiSelect}"
                        .showChildrenIndicator="${t.showChildrenIndicator}"
                        .renderChildren="${t.renderChildren}"
                        .externalSelection="${t.externalSelection}"
                        .isItemSelected="${t.isItemSelected}"
                        .listRole="${t.listRole}"
                        .itemRole="${t.itemRole}"
                        .multiselectable="${t.multiselectable}"
                        .ariaLabel="${t.ariaLabel}"
                        @click="${e=>e.stopPropagation()}"
                        @itemSelected="${e=>{e.stopPropagation(),t.dispatchEvent(new CustomEvent(`itemSelected`,{detail:e.detail,bubbles:!0,composed:!0}))}}"
                        @itemDeselected="${e=>{e.stopPropagation(),t.dispatchEvent(new CustomEvent(`itemDeselected`,{detail:e.detail,bubbles:!0,composed:!0}))}}"
                      ></dcx-web-list>
                    `:n}
              </li>
            `})}
  </ul>
`,lt=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
    --list-bg-hover: var(--bg-hover, #f7f8fa);
    --list-bg-selected: var(--bg-primary, #0058ab);
    --list-text-selected: var(--text-white, #ffffff);
    --list-border-radius: var(--r-md, 6px);
    --list-spacing: var(--sp-3, 12px);
    --list-item-gap: var(--sp-4, 16px);
    --list-font-size: var(--fs-sm, 12px);
    --list-icon-size: 1.2rem;
    --list-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --list-divider-color: var(--bg-pressed, #e1e3e6);
    --list-icon-bg: var(--bg-hover, #f3f4f6);
  }

  .dcx-list-container {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    overflow: hidden;
    background-color: var(--bg-default, #ffffff);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
  }

  .dcx-list-container .dcx-list-item:not(:last-child) {
    border-bottom: 1px solid var(--list-divider-color);
  }

  .dcx-list-item {
    margin: 0;
    transition: var(--list-transition);
    position: relative;
    outline: none;
  }

  .dcx-list-item-content {
    display: flex;
    align-items: center;
    gap: var(--list-item-gap);
    padding: var(--list-spacing) calc(var(--list-spacing) * 1.5);
    font-size: var(--list-font-size);
    transition: var(--list-transition);
  }

  .dcx-list-item.selectable {
    cursor: pointer;
    user-select: none;
  }

  .dcx-list-item.selectable:hover:not(.disabled) {
    background-color: var(--list-bg-hover);
  }

  .dcx-list-item.selectable:hover:not(.disabled) .dcx-list-icon-container {
    background-color: var(--bg-pressed, #e1e3e6);
    transform: scale(1.05);
  }

  .dcx-list-item.selectable:active:not(.disabled) {
    transform: scale(0.99);
    background-color: var(--bg-pressed, #e1e3e6);
  }

  .dcx-list-item.selectable:focus-visible {
    box-shadow: inset 0 0 0 2px var(--border-focus, #1db8f2);
    z-index: 1;
  }

  .dcx-list-item.selected {
    background-color: var(--color-info-bg, #eff6ff);
    box-shadow: inset 3px 0 0 var(--bg-primary, #0058ab);
  }

  .dcx-list-item.selected .dcx-list-text {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-list-item.selected .dcx-list-description {
    color: var(--bg-primary, #0058ab);
    opacity: 0.75;
  }

  .dcx-list-item.selected:not(.danger) .dcx-list-icon-container,
  .dcx-list-item.selected:not(.danger) .dcx-list-icon {
    background-color: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
    fill: currentColor;
    stroke: currentColor;
    transform: none;
  }

  .dcx-list-item.danger.selected .dcx-list-icon {
    background-color: transparent;
    color: var(--text-white, #ffffff);
  }

  .dcx-list-item.selected .dcx-list-children-indicator {
    color: var(--bg-primary, #0058ab) !important;
  }

  .dcx-list-item.selected.selectable:hover:not(.disabled) {
    background-color: var(--color-info-bg, #eff6ff);
  }

  .dcx-list-item.selected.selectable:hover:not(.disabled) .dcx-list-icon-container {
    background-color: var(--bg-primary, #0058ab);
    color: white;
    transform: none;
  }

  .dcx-list-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dcx-list-item.disabled .dcx-list-item-content {
    pointer-events: none;
  }

  .dcx-list-item.danger {
    color: var(--color-error, #dc2626);
  }

  .dcx-list-item.danger .dcx-list-icon-container {
    color: var(--color-error, #dc2626);
    background-color: var(--color-error-bg, #fef2f2);
  }

  .dcx-list-item.danger.selectable:hover:not(.disabled) {
    background-color: var(--color-error-bg, #fef2f2);
  }

  .dcx-list-item.danger.selected {
    background-color: var(--color-error-bg, #fef2f2);
    box-shadow: inset 3px 0 0 var(--color-error, #dc2626);

  }

  .dcx-list-item.selected .dcx-web-icon,
  .dcx-list-item.danger.selected .dcx-web-icon {
    color: var(--text-white, #ffffff) !important;
    background: transparent !important;
  }

  .dcx-list-item.danger.selected .dcx-list-text,
  .dcx-list-item.danger.selected .dcx-list-description,
  .dcx-list-item.danger.selected .dcx-list-children-indicator {
    color: var(--color-error, #dc2626);
  }

  .dcx-list-item.danger.selected .dcx-list-icon-container {
    background-color: var(--color-error, #dc2626);
    color: white;
  }

  .dcx-list-icon-container {
    flex-shrink: 0;
    width: calc(var(--list-icon-size) * 2);
    height: calc(var(--list-icon-size) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--list-icon-bg);
    border-radius: var(--r-md, 6px);
    color: var(--text-dark, #2a2e33);
    transition: var(--list-transition);
    font-size: var(--list-icon-size);
  }

  .dcx-list-icon {
    flex-shrink: 0;
    font-size: 1.2rem;
    width: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-list-text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .dcx-list-text {
    font-weight: var(--fw-medium, 500);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-dark, #2a2e33);
  }

  .dcx-list-description {
    font-size: 0.9em;
    color: var(--text-muted, #696e75);
    font-weight: var(--fw-regular, 400);
    margin-top: 2px;
  }

  .dcx-list-children-indicator {
    flex-shrink: 0;
    margin-left: auto;
    font-size: 0.9rem;
    color: var(--text-placeholder, #9ca3af);
    transition: transform 0.2s ease;
  }

  .dcx-list-divider {
    height: 1px;
    background-color: var(--list-divider-color);
    margin: 0;
  }

  :host(.dcx-list-nested) {
    display: block;
    padding: var(--sp-2, 8px);
    background-color: var(--bg-hover, #f7f8fa);
  }

  :host(.dcx-list-nested) .dcx-list-container {
    border: 1px solid var(--list-divider-color);
    border-radius: var(--r-md, 6px);
    background-color: var(--bg-default, #ffffff);
    overflow: hidden;
    box-shadow: none;
  }

  :host(.dcx-list-nested) .dcx-list-container .dcx-list-item:not(:last-child) {
    border-bottom: 1px solid var(--list-divider-color);
  }

  :host(.dcx-list-nested) .dcx-list-container .dcx-list-item:last-child {
    border-bottom: none;
  }

  :host(.parent-selected) .dcx-list-text {
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  :host(.parent-selected) .dcx-list-description {
    color: var(--bg-primary, #0058ab);
    opacity: 0.75;
  }

  :host-context(.dcx-context-menu) .dcx-list-container {
    border: none;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
  }

  :host-context(.dcx-context-menu) .dcx-list-item {
    border-bottom: none !important;
    line-height: 1.5;
    position: relative;
  }

  :host-context(.dcx-context-menu) .dcx-list-item .dcx-list-item-content {
    padding: 8px 12px;
    gap: 12px;
    border-radius: 0;
  }

  :host-context(.dcx-context-menu) .dcx-list-item .dcx-list-icon-container {
    width: auto;
    height: auto;
    background: transparent;
    padding: 0;
    font-size: 1.1rem;
    color: var(--text-muted, #696e75);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.selectable:hover .dcx-list-icon-container {
    color: var(--bg-primary, #0058ab);
    background: transparent;
    transform: none;
  }

  :host-context(.dcx-context-menu) .dcx-list-item.selectable .dcx-list-item-content:hover {
    background-color: var(--background-hover);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.danger {
    color: var(--color-danger, #dc2626);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.danger .dcx-list-icon {
    color: var(--color-danger, #dc2626);
  }

  :host-context(.dcx-context-menu) .dcx-list-item.danger.selectable:hover {
    background-color: #fef2f2;
  }

  :host-context(.dcx-context-menu) .dcx-list-nested {
    margin-left: 0;
    margin-top: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    position: absolute;
    top: -6px;
    left: calc(100% + 4px);
    min-width: 200px;
    background: var(--bg-default, rgba(255, 255, 255, 0.95));
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid var(--border-light, rgba(209, 213, 219, 0.4));
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
    padding: var(--sp-1, 6px) 0;
    display: none;
    z-index: 10000;
    animation: dcxListSubmenuEnter 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :host-context(.dcx-context-menu) .dcx-list-nested .dcx-list-divider {
    margin: 6px 8px;
    background-color: var(--bg-pressed, rgba(0, 0, 0, 0.06));
    height: 1px;
    border: none;
  }

  :host-context(.dcx-context-menu) .dcx-list-nested ul {
    border: 1px solid var(--border-light, rgba(209, 213, 219, 0.4));
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    background: var(--bg-default, #ffffff);
    padding: var(--sp-1, 4px);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
  }

  :host-context(.dcx-context-menu) .dcx-list-nested ul .dcx-list-item {
    border-bottom: none;
  }

  :host-context(.dcx-context-menu) .dcx-list-item.has-children:hover > .dcx-list-nested {
    display: block;
  }

  :host-context(.dcx-context-menu) ul {
    padding-left: 0;
  }

  @keyframes dcxListSubmenuEnter {
    from {
      opacity: 0;
      transform: translateX(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
`,Q=class extends r{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=!1;get selectable(){return this.#t}set selectable(e){this.#t=e}#n=!1;get multiSelect(){return this.#n}set multiSelect(e){this.#n=e}#r=!1;get showChildrenIndicator(){return this.#r}set showChildrenIndicator(e){this.#r=e}#i=!0;get renderChildren(){return this.#i}set renderChildren(e){this.#i=e}#a=null;get itemTemplate(){return this.#a}set itemTemplate(e){this.#a=e}#o=``;get id(){return this.#o}set id(e){this.#o=e}#s=`Lista de elementos`;get ariaLabel(){return this.#s}set ariaLabel(e){this.#s=e}#c=`list`;get listRole(){return this.#c}set listRole(e){this.#c=e}#l=`listitem`;get itemRole(){return this.#l}set itemRole(e){this.#l=e}#u=null;get multiselectable(){return this.#u}set multiselectable(e){this.#u=e}#d=!1;get externalSelection(){return this.#d}set externalSelection(e){this.#d=e}#f=null;get isItemSelected(){return this.#f}set isItemSelected(e){this.#f=e}#p=!1;get cdkDropList(){return this.#p}set cdkDropList(e){this.#p=e}#m=[];get cdkDropListData(){return this.#m}set cdkDropListData(e){this.#m=e}#h=null;get cdkDropListConnectedTo(){return this.#h}set cdkDropListConnectedTo(e){this.#h=e}#g=!1;get cdkDropListDisabled(){return this.#g}set cdkDropListDisabled(e){this.#g=e}#_=!1;get dragEnabled(){return this.#_}set dragEnabled(e){this.#_=e}#v=e=>!1;get cdkDragDisabled(){return this.#v}set cdkDragDisabled(e){this.#v=e}#y=[];get selectedIndices(){return this.#y}set selectedIndices(e){this.#y=e}static styles=lt;emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}getChildren(e){return e.children??[]}isSelected(e){return this.selectable?this.selectedIndices.includes(e):!1}resolveAriaSelected(e,t){return this.isItemSelected?this.isItemSelected(e,t):this.selectable&&!this.externalSelection?this.isSelected(t):null}onItemClick(e,t){if(!(!this.selectable||e.disabled||e.divider)){if(this.externalSelection){this.emit(`itemSelected`,{item:e,index:t});return}if(this.multiSelect){this.isSelected(t)?(this.selectedIndices=this.selectedIndices.filter(e=>e!==t),this.emit(`itemDeselected`,{item:e,index:t})):(this.selectedIndices=[...this.selectedIndices,t],this.emit(`itemSelected`,{item:e,index:t}));return}if(this.isSelected(t)){this.selectedIndices=[],this.emit(`itemDeselected`,{item:e,index:t});return}this.selectedIndices=[t],this.emit(`itemSelected`,{item:e,index:t})}}onKeydown(e,t,n){let r=this.getChildren(t);(e.key===`Enter`||e.key===` `)&&!t.disabled&&(e.preventDefault(),this.onItemClick(t,n)),e.key===`ArrowRight`&&r.length&&(e.preventDefault(),e.currentTarget.querySelector(`.dcx-list-nested [tabindex="0"]`)?.focus()),e.key===`ArrowLeft`&&(e.preventDefault(),(e.currentTarget.closest(`.dcx-list-nested`)?.closest(`li`))?.focus())}getItemClasses(e,t){let n=[`dcx-list-item`];return this.selectable&&n.push(`selectable`),this.isSelected(t)&&n.push(`selected`),e.disabled&&n.push(`disabled`),e.children&&e.children.length&&n.push(`has-children`),e.variant===`danger`&&n.push(`danger`),n.join(` `)}render(){return ct(this)}};o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],Q.prototype,`items`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`selectable`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`multiSelect`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`showChildrenIndicator`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`renderChildren`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`itemTemplate`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`id`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`ariaLabel`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`listRole`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`itemRole`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`multiselectable`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`externalSelection`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`isItemSelected`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`cdkDropList`,null),o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],Q.prototype,`cdkDropListData`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`cdkDropListConnectedTo`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`cdkDropListDisabled`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`dragEnabled`,null),o([i({attribute:!1}),u(`design:type`,Object),u(`design:paramtypes`,[])],Q.prototype,`cdkDragDisabled`,null),o([a(),u(`design:type`,Array),u(`design:paramtypes`,[])],Q.prototype,`selectedIndices`,null),Q=o([d(`dcx-web-list`)],Q);var ut=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-editor__label {
    display: inline-block;
    margin-bottom: var(--sp-2, 8px);
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-medium, 500);
  }

  .dcx-editor__required {
    margin-left: var(--sp-1, 4px);
    color: var(--color-danger, #dc2626);
  }

  .dcx-editor {
    width: 100%;
    max-width: 720px;
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-sm, 4px);
    background: var(--bg-default, #ffffff);
    overflow: hidden;
  }

  .dcx-editor.is-disabled {
    background: var(--bg-disabled, #f3f4f6);
  }

  .dcx-editor__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-1, 4px);
    padding: var(--sp-2, 8px);
    border-bottom: 1px solid var(--border-light, #d1d5db);
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-editor__content {
    width: 100%;
    padding: var(--sp-3, 12px);
    color: var(--text-dark, #2a2e33);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    outline: none;
    overflow: auto;
  }

  .dcx-editor__content b,
  .dcx-editor__content strong {
    font-weight: var(--fw-bold, 700);
  }

  .dcx-editor__content i,
  .dcx-editor__content em {
    font-style: italic;
  }

  .dcx-editor__content u {
    text-decoration: underline;
  }

  .dcx-editor__content ol,
  .dcx-editor__content ul {
    margin: var(--sp-2, 8px) 0;
    padding-left: var(--sp-5, 24px);
  }

  .dcx-editor__content ol {
    list-style: decimal;
  }

  .dcx-editor__content ul {
    list-style: disc;
  }

  .dcx-editor__content li {
    margin: var(--sp-1, 4px) 0;
    display: list-item;
  }

  .dcx-editor__content:empty::before {
    content: attr(data-placeholder);
    color: var(--text-disabled, #696e75);
    pointer-events: none;
  }

  .dcx-editor__content.is-focused {
    box-shadow: inset 0 0 0 2px var(--border-focus, #1db8f2);
  }

  .dcx-editor__content.is-invalid {
    box-shadow: inset 0 0 0 2px var(--color-danger, #dc2626);
  }

  .dcx-editor__content.is-disabled,
  .dcx-editor__content.is-readonly {
    color: var(--text-disabled, #696e75);
    cursor: not-allowed;
  }

  .dcx-editor__content.is-readonly {
    cursor: default;
  }

  .dcx-editor__error {
    padding: 0 var(--sp-3, 12px) var(--sp-3, 12px);
    color: var(--color-danger, #dc2626);
    font-size: var(--fs-sm, 12px);
  }
`,dt=t=>e`
    ${t.label?e`
          <label class="dcx-editor__label" id="${t.id}-label">
            ${t.label}
            ${t.required?e`<span class="dcx-editor__required">*</span>`:n}
          </label>
        `:n}

    <div class="dcx-editor ${t.isDisabled?`is-disabled`:``}">
      <div class="dcx-editor__toolbar" role="toolbar" aria-label="Formato">
        ${t.toolbarItems.map(n=>e`
            <dcx-web-button
              variant="icon-only"
              size="s"
              .icon="${!0}"
              icon-name="${n.icon}"
              icon-size="m"
              .ariaLabel="${n.ariaLabel}"
              .disabled="${t.isDisabled||t.readonly}"
              .pressed="${t.isToolbarActionActive(n.action)}"
              @mousedown="${e=>t.onToolbarMouseDown(e)}"
              @buttonClick="${()=>t.onToolbarButtonClick(n)}"
            ></dcx-web-button>
          `)}
      </div>

      <div
        class="${t.editorClasses}"
        id="${t.id}"
        style="min-height: ${t.minHeight}"
        role="textbox"
        aria-multiline="true"
        contenteditable="${!t.isDisabled&&!t.readonly}"
        tabindex="${t.isDisabled||t.readonly?n:`0`}"
        data-placeholder="${t.placeholder}"
        aria-labelledby="${t.label?`${t.id}-label`:n}"
        aria-label="${t.label?n:t.ariaLabel??n}"
        aria-required="${t.required?`true`:n}"
        aria-invalid="${String(t.isInvalid)}"
        aria-describedby="${t.describedBy??n}"
        @beforeinput="${e=>t.onBeforeInput(e)}"
        @input="${()=>t.onInput()}"
        @focus="${()=>t.onFocus()}"
        @blur="${()=>t.onBlur()}"
        @keyup="${()=>t.onEditorSelectionChange()}"
        @mouseup="${()=>t.onEditorSelectionChange()}"
      ></div>

      ${t.isInvalid&&t.errorMessage?e`
            <div class="dcx-editor__error" id="${t.errorId}">
              ${t.errorMessage}
            </div>
          `:n}
    </div>
  `,$=class extends r{static styles=ut;#e=`dcx-editor-${Math.random().toString(36).substring(2,9)}`;get id(){return this.#e}set id(e){this.#e=e}#t=``;get value(){return this.#t}set value(e){this.#t=e}#n=``;get label(){return this.#n}set label(e){this.#n=e}#r=``;get placeholder(){return this.#r}set placeholder(e){this.#r=e}#i=!1;get disabled(){return this.#i}set disabled(e){this.#i=e}#a=!1;get readonly(){return this.#a}set readonly(e){this.#a=e}#o=!1;get required(){return this.#o}set required(e){this.#o=e}#s=!1;get isInvalid(){return this.#s}set isInvalid(e){this.#s=e}#c=``;get errorMessage(){return this.#c}set errorMessage(e){this.#c=e}#l=null;get ariaLabel(){return this.#l}set ariaLabel(e){this.#l=e}#u=null;get ariaDescribedBy(){return this.#u}set ariaDescribedBy(e){this.#u=e}#d=de;get minHeight(){return this.#d}set minHeight(e){this.#d=e}#f=v;get toolbarActions(){return this.#f}set toolbarActions(e){this.#f=e}#p=!1;get focused(){return this.#p}set focused(e){this.#p=e}#m=new Set;get activeToolbarActions(){return this.#m}set activeToolbarActions(e){this.#m=e}#h=new Set;get _pendingToolbarActions(){return this.#h}set _pendingToolbarActions(e){this.#h=e}_viewReady=!1;_savedRange=null;_onDocumentSelectionChange=()=>{this.selectionBelongsToEditor()&&this.onEditorSelectionChange()};connectedCallback(){super.connectedCallback(),document.addEventListener(`selectionchange`,this._onDocumentSelectionChange)}disconnectedCallback(){document.removeEventListener(`selectionchange`,this._onDocumentSelectionChange),super.disconnectedCallback()}firstUpdated(){this._viewReady=!0,this.renderValue(this.value)}updated(e){e.has(`value`)&&!this.isEditorFocused()&&this.renderValue(this.value)}get editorEl(){return this.shadowRoot?.querySelector(`.dcx-editor__content`)??null}get errorId(){return`${this.id}-error`}get describedBy(){let e=[this.ariaDescribedBy,this.isInvalid?this.errorId:null].filter(Boolean).join(` `).trim();return e.length?e:null}get isDisabled(){return this.disabled}get editorClasses(){let e=[`dcx-editor__content`];return this.isDisabled&&e.push(`is-disabled`),this.readonly&&e.push(`is-readonly`),this.isInvalid&&e.push(`is-invalid`),this.focused&&e.push(`is-focused`),e.join(` `)}get toolbarItems(){let e={bold:{action:`bold`,icon:`type-bold`,ariaLabel:`Negrita`},italic:{action:`italic`,icon:`type-italic`,ariaLabel:`Cursiva`},underline:{action:`underline`,icon:`type-underline`,ariaLabel:`Subrayado`},orderedList:{action:`orderedList`,icon:`list-ol`,ariaLabel:`Lista numerada`},unorderedList:{action:`unorderedList`,icon:`list-ul`,ariaLabel:`Lista con viñetas`},removeFormat:{action:`removeFormat`,icon:`eraser`,ariaLabel:`Quitar formato`}};return this.toolbarActions.map(t=>e[t])}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}onInput(){this.isDisabled||this.readonly||(this.saveSelection(),this.updateActiveToolbarActions(),this.updateValueFromEditor())}onFocus(){this.focused=!0,this.saveSelection(),this.updateActiveToolbarActions(),this.emit(`focusEvent`)}onBlur(){this.focused=!1,this.activeToolbarActions=new Set,this.emit(`blurEvent`)}applyCommand(e){this.isDisabled||this.readonly||(this.restoreSelection(),this.applyToolbarAction(e.action),this.saveSelection(),this.updateActiveToolbarActions(),this.updateValueFromEditor())}onToolbarMouseDown(e){e.preventDefault()}onToolbarButtonClick(e){this.applyCommand(e)}onEditorSelectionChange(){this.saveSelection(),this.updateActiveToolbarActions()}onBeforeInput(e){this.isDisabled||this.readonly||e.inputType!==`insertText`||!e.data||e.data!==` `&&(e.preventDefault(),this.restoreSelection(),this.insertTextWithToolbarState(e.data),this.saveSelection(),this.updateActiveToolbarActions(),this.updateValueFromEditor())}isToolbarActionActive(e){return this.activeToolbarActions.has(e)}saveSelection(){let e=this.editorEl,t=this.getActiveSelection();if(!e||!t||t.rangeCount===0)return;let n=t.getRangeAt(0);(e.contains(n.commonAncestorContainer)||e===n.commonAncestorContainer)&&(this._savedRange=n.cloneRange())}getActiveSelection(){let e=this.shadowRoot;return e?.getSelection?e.getSelection():window.getSelection()}restoreSelection(){let e=this.editorEl;if(!e)return;e.focus();let t=this.getActiveSelection();t&&(t.removeAllRanges(),this._savedRange&&t.addRange(this._savedRange))}applyToolbarAction(e){if(this.getEditableRange()?.collapsed){if(e===`removeFormat`){this._pendingToolbarActions=new Set,[`italic`,`underline`,`bold`].forEach(e=>{this.isInlineActionActive(e)&&this.escapeInlineFormat(e)});return}this.togglePendingToolbarAction(e);return}({bold:()=>this.wrapSelection(`strong`),italic:()=>this.wrapSelection(`em`),underline:()=>this.wrapSelection(`u`),orderedList:()=>this.wrapSelectionWithList(`ol`),unorderedList:()=>this.wrapSelectionWithList(`ul`),removeFormat:()=>this.replaceSelectionWithPlainText()})[e](),this._pendingToolbarActions=new Set}wrapSelection(e){let t=this.getEditableRange();if(!t||t.collapsed)return;let n=document.createElement(e);n.append(t.extractContents()),t.insertNode(n),this.moveSelectionAfter(n)}wrapSelectionWithList(e){let t=this.getEditableRange();if(!t||t.collapsed)return;let n=document.createElement(e),r=document.createElement(`li`);r.append(t.extractContents()),n.append(r),t.insertNode(n),this.moveSelectionAfter(n)}replaceSelectionWithPlainText(){let e=this.getEditableRange();if(!e||e.collapsed)return;let t=document.createElement(`div`);t.append(e.cloneContents());let n=this.getPlainText(t).split(/\r?\n/);e.deleteContents(),this.cleanupFormattingAtRange(e);let r=document.createDocumentFragment();n.forEach((e,t)=>{t===n.length-1&&!e&&t>0||(t>0&&r.append(document.createElement(`br`)),r.append(e))});let i=r.lastChild;i&&(e.insertNode(r),this.moveSelectionAfter(i))}cleanupFormattingAtRange(e){let t=this.editorEl,n=[`STRONG`,`B`,`EM`,`I`,`U`,`LI`,`UL`,`OL`,`SPAN`,`P`,`DIV`],r;for(;t&&(r=this.getClosestAncestorTag(e.startContainer,n))&&r!==t;)if(this.isNodeEmpty(r))e.setStartBefore(r),e.collapse(!0),r.remove();else{let t=e.cloneRange();t.setEndAfter(r),r.after(t.extractContents()),e.setStartAfter(r),e.collapse(!0),this.isNodeEmpty(r)&&r.remove()}}getPlainText(e){let t=e.cloneNode(!0);return t.querySelectorAll(`br`).forEach(e=>e.replaceWith(``)),t.querySelectorAll(`div, p, li`).forEach(e=>{e.prepend(`
`),e.append(`
`)}),(t.textContent||``).replace(/\n+/g,`
`).split(``).join(`
`).replace(/^\n|\n$/g,``)}getEditableRange(){let e=this.editorEl,t=this.getActiveSelection();if(!e||!t||t.rangeCount===0)return null;let n=t.getRangeAt(0);return e.contains(n.commonAncestorContainer)||e===n.commonAncestorContainer?n:null}moveSelectionAfter(e){let t=this.getActiveSelection();if(!t)return;let n=document.createRange();n.setStartAfter(e),n.collapse(!0),t.removeAllRanges(),t.addRange(n),this._savedRange=n.cloneRange()}moveSelectionToEnd(e){let t=this.getActiveSelection();if(!t)return;let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.removeAllRanges(),t.addRange(n),this._savedRange=n.cloneRange()}togglePendingToolbarAction(e){let t=new Set(this._pendingToolbarActions);({removeFormat:()=>t.clear(),orderedList:()=>this.togglePendingListAction(t,e),unorderedList:()=>this.togglePendingListAction(t,e)}[e]??(()=>this.togglePendingInlineAction(t,e)))(),this._pendingToolbarActions=t}togglePendingListAction(e,t){let n=t===`orderedList`?`unorderedList`:`orderedList`;e.delete(n),this.toggleSetValue(e,t)}togglePendingInlineAction(e,t){if(!this.isInlineActionActive(t)){this.toggleSetValue(e,t);return}e.delete(t),this.escapeInlineFormat(t)}toggleSetValue(e,t){e[e.has(t)?`delete`:`add`](t)}insertTextWithToolbarState(e){let t=this.getEditableRange();if(!t)return;let n=this._pendingToolbarActions,r=document.createTextNode(e),i=this.wrapTextNodeWithPendingInlineFormats(r),a=this.getPendingListAction(n);if(t.deleteContents(),!a){this.insertNodeAtRange(t,i);return}this.insertNodeInList(t,i,a)}getPendingListAction(e){return[`orderedList`,`unorderedList`].find(t=>e.has(t))??null}insertNodeAtRange(e,t){e.insertNode(t),this.moveSelectionAfter(t)}insertNodeInList(e,t,n){if(this.getCurrentListItem(e)){this.insertNodeAtRange(e,t);return}let r=document.createElement(n===`orderedList`?`ol`:`ul`),i=document.createElement(`li`);i.append(t),r.append(i),e.insertNode(r),this.moveSelectionToEnd(i)}wrapTextNodeWithPendingInlineFormats(e){let t=e,n=this._pendingToolbarActions;return[[`underline`,`u`],[`italic`,`em`],[`bold`,`strong`]].forEach(([e,r])=>{if(!n.has(e))return;let i=document.createElement(r);i.append(t),t=i}),t}getCurrentListItem(e){let t=e.startContainer.nodeType===Node.ELEMENT_NODE?e.startContainer:e.startContainer.parentElement;for(;t&&t!==this.editorEl;){if(t.nodeType===Node.ELEMENT_NODE&&t.tagName===`LI`)return t;t=t.parentElement}return null}escapeInlineFormat(e){let t=this.getEditableRange();if(!t||!t.collapsed)return;let n=this.getClosestInlineFormatWrapper(t.startContainer,e),r=n?.parentNode;if(!n||!r)return;let i=document.createRange();i.setStart(t.startContainer,t.startOffset),i.setEnd(n,n.childNodes.length);let a=i.extractContents(),o=document.createTextNode(``);if(this.isNodeEmpty(n)?(r.insertBefore(o,n),n.remove()):r.insertBefore(o,n.nextSibling),!this.isNodeEmpty(a)){let e=n.cloneNode(!1);e.appendChild(a),r.insertBefore(e,o.nextSibling)}this.moveSelectionToEnd(o)}isInlineActionActive(e){let t=this.getSelectionContextNode();return!!t&&!!this.getClosestInlineFormatWrapper(t,e)}getClosestInlineFormatWrapper(e,t){let n={bold:[`B`,`STRONG`],italic:[`I`,`EM`],underline:[`U`]}[t];return n?this.getClosestAncestorTag(e,n):null}updateActiveToolbarActions(){let e=new Set(this._pendingToolbarActions),t=this.getSelectionContextNode();if(!t){this.activeToolbarActions=e;return}[[`bold`,[`B`,`STRONG`]],[`italic`,[`I`,`EM`]],[`underline`,[`U`]],[`orderedList`,[`OL`]],[`unorderedList`,[`UL`]]].filter(([,e])=>this.hasAncestorTag(t,e)).forEach(([t])=>e.add(t)),this.activeToolbarActions=e}getSelectionContextNode(){let e=this.editorEl,t=this.getActiveSelection();if(!e||!t||t.rangeCount===0)return null;let n=t.getRangeAt(0).startContainer;return e.contains(n)||e===n?n:null}hasAncestorTag(e,t){return!!this.getClosestAncestorTag(e,t)}getClosestAncestorTag(e,t){let n=this.editorEl,r=e.nodeType===Node.ELEMENT_NODE?e:e.parentElement;for(;r&&r!==n;){if(r.nodeType===Node.ELEMENT_NODE&&t.includes(r.tagName))return r;r=r.parentElement}return null}isNodeEmpty(e){if(e.nodeType===Node.TEXT_NODE)return(e.textContent||``).replace(/[\u200B-\u200D\uFEFF\r\n]/g,``).length===0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName===`BR`)return!0;if(t.childNodes.length===0)return(t.textContent||``).replace(/[\u200B-\u200D\uFEFF]/g,``).trim().length===0}return Array.from(e.childNodes).every(e=>this.isNodeEmpty(e))}selectionBelongsToEditor(){return!!this.getSelectionContextNode()}updateValueFromEditor(){let e=this.editorEl;if(!e)return;this.isNodeEmpty(e)&&e.innerHTML!==``&&(e.innerHTML=``);let t=this.sanitizeHtml(e.innerHTML);this.value=t,this.emit(`valueChange`,t)}isEditorFocused(){return this.shadowRoot?.activeElement===this.editorEl}renderValue(e){if(!this._viewReady)return;let t=this.editorEl;if(!t)return;let n=this.sanitizeHtml(e);t.innerHTML!==n&&(t.innerHTML=n)}sanitizeHtml(e){let t=document.createElement(`template`);t.innerHTML=e??``,t.content.querySelectorAll(`script, style, iframe, object, embed, link, meta`).forEach(e=>e.remove()),t.content.querySelectorAll(`*`).forEach(e=>{Array.from(e.attributes).forEach(t=>{let n=t.name.toLowerCase(),r=n===`href`||n===`src`||n===`xlink:href`;(n.startsWith(`on`)||r&&/^\s*javascript:/i.test(t.value))&&e.removeAttribute(t.name)})});let n=document.createElement(`div`);return n.append(t.content.cloneNode(!0)),n.innerHTML}render(){return dt(this)}};o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`id`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`value`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`label`,null),o([i({type:String}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`placeholder`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`disabled`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`readonly`,null),o([i({type:Boolean}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`required`,null),o([i({type:Boolean,attribute:`is-invalid`}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`isInvalid`,null),o([i({type:String,attribute:`error-message`}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`errorMessage`,null),o([i({type:String,attribute:`aria-label`}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`ariaLabel`,null),o([i({type:String,attribute:`aria-describedby`}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`ariaDescribedBy`,null),o([i({type:String,attribute:`min-height`}),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`minHeight`,null),o([i({attribute:!1}),u(`design:type`,Array),u(`design:paramtypes`,[])],$.prototype,`toolbarActions`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`focused`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`activeToolbarActions`,null),o([a(),u(`design:type`,Object),u(`design:paramtypes`,[])],$.prototype,`_pendingToolbarActions`,null),$=o([d(`dcx-web-editor`)],$);export{le as C,p as S,ae as _,De as a,ie as b,j as c,v as d,ue as f,ce as g,h,Re as i,A as l,_ as m,ot as n,Ee as o,g as p,ze as r,we as s,at as t,Te as u,m as v,oe as x,se as y};