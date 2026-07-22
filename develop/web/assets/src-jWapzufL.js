import{a as e,l as t,n,t as r}from"./lit-LoFRC6vp.js";import{C as i,S as a,_ as o,a as s,b as c,g as ee,n as te,r as l,t as u,v as d,x as f,y as ne}from"./defaults-DnuI9sVo.js";var re=[`vertical`,`horizontal`],ie=[`start`,`center`,`end`],ae=[`s`,`m`,`l`,`xl`,`auto`],p=`vertical`,m=`center`,h=[`xs`,`s`,`m`,`l`,`xl`],g=`info-circle`,_={showLabel:!0,textLabel:`Value`,value:0,step:1,vertical:!1,min:0,max:50,disabled:!1,valueSuffix:``},oe=`Select`,se=[{value:`one`,label:`Uno`},{value:`two`,label:`Dos`},{value:`three`,label:`Tres`}],v=`Seleccione una opción`,ce=t`
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
`,le=t=>e`
    <span
      class="${`dcx-badge dcx-badge--${t.severity} dcx-badge--${t.size}`}"
      role="${t.roleAttr||``}"
      aria-label="${t.getComputedAriaLabel()||``}"
      aria-hidden="${t.ariaHiddenAttr?`true`:`false`}"
    >${t.value}</span>
  `,y=class extends r{#e=``;get value(){return this.#e}set value(e){this.#e=e}#t=`primary`;get severity(){return this.#t}set severity(e){this.#t=e}#n=`md`;get size(){return this.#n}set size(e){this.#n=e}#r=null;get ariaLabel(){return this.#r}set ariaLabel(e){this.#r=e}#i=!1;get ariaHiddenAttr(){return this.#i}set ariaHiddenAttr(e){this.#i=e}#a=null;get roleAttr(){return this.#a}set roleAttr(e){this.#a=e}static styles=ce;getComputedAriaLabel(){if(this.ariaHiddenAttr)return null;if(this.ariaLabel!==null)return this.ariaLabel;let e=this.value;return e?`${e}, ${this.severity}`:this.severity}render(){return le(this)}};o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],y.prototype,`value`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],y.prototype,`severity`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],y.prototype,`size`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],y.prototype,`ariaLabel`,null),o([a({type:Boolean,attribute:`aria-hidden`}),d(`design:type`,Object),d(`design:paramtypes`,[])],y.prototype,`ariaHiddenAttr`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],y.prototype,`roleAttr`,null),y=o([i(`dcx-web-badge`)],y);var ue=t`
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
`,de=t=>t.visible?e`
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
  `:e``,b=class extends r{#e=`center`;get position(){return this.#e}set position(e){this.#e=e}#t=``;get title(){return this.#t}set title(e){this.#t=e}#n=``;get dialogId(){return this.#n}set dialogId(e){this.#n=e}#r=!0;get showClose(){return this.#r}set showClose(e){this.#r=e}#i=!0;get closeOnBackdrop(){return this.#i}set closeOnBackdrop(e){this.#i=e}#a=!1;get visible(){return this.#a}set visible(e){this.#a=e}static styles=ue;get dialogTitleId(){return`dialog-title-${this.dialogId||`default`}`}get dialogClasses(){return`dcx-dialog dcx-dialog--pos-${this.position}`}close(){this.dispatchEvent(new CustomEvent(`closeDialog`,{bubbles:!0,composed:!0}))}onBackdropClick(e){e.stopPropagation(),this.closeOnBackdrop&&this.close()}onKeyDown=e=>{e.key===`Escape`&&this.visible&&this.close()};connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.onKeyDown)}disconnectedCallback(){document.removeEventListener(`keydown`,this.onKeyDown),super.disconnectedCallback()}render(){return de(this)}};o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],b.prototype,`position`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],b.prototype,`title`,null),o([a({type:String,attribute:`dialog-id`}),d(`design:type`,Object),d(`design:paramtypes`,[])],b.prototype,`dialogId`,null),o([a({type:Boolean,attribute:`show-close`}),d(`design:type`,Object),d(`design:paramtypes`,[])],b.prototype,`showClose`,null),o([a({type:Boolean,attribute:`close-on-backdrop`}),d(`design:type`,Object),d(`design:paramtypes`,[])],b.prototype,`closeOnBackdrop`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],b.prototype,`visible`,null),b=o([i(`dcx-web-dialog`)],b);var fe=t`
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
`,pe=t=>e`
    <div
      class="${t.cardClasses}"
      tabindex="${t.cardTabIndex??n}"
      role="${t.cardRole}"
      aria-disabled="${t.disabled}"
      aria-label="${t.effectiveAriaLabel??n}"
      @click="${t._handleCardClick}"
      @keydown="${t._handleCardClick}"
    >
      <div class="${t.innerClasses}" style="${ne(t.innerStyles)}">
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
  `,x=class extends r{#e=`https://picsum.photos/360/240`;get image(){return this.#e}set image(e){this.#e=e}#t=``;get imageAlt(){return this.#t}set imageAlt(e){this.#t=e}#n=`Título de la carta`;get title(){return this.#n}set title(e){this.#n=e}#r=`Subtítulo de la carta`;get subtitle(){return this.#r}set subtitle(e){this.#r=e}#i=`vertical`;get layout(){return this.#i}set layout(e){this.#i=e}#a=`center`;get align(){return this.#a}set align(e){this.#a=e}#o=`s`;get size(){return this.#o}set size(e){this.#o=e}#s=`560px`;get maxContentWidth(){return this.#s}set maxContentWidth(e){this.#s=e}#c=`100%`;get maxImageWidth(){return this.#c}set maxImageWidth(e){this.#c=e}#l=!1;get accent(){return this.#l}set accent(e){this.#l=e}#u=!1;get bordered(){return this.#u}set bordered(e){this.#u=e}#d=1;get borderWidth(){return this.#d}set borderWidth(e){this.#d=e}#f=`solid`;get borderStyle(){return this.#f}set borderStyle(e){this.#f=e}#p=1;get shadow(){return this.#p}set shadow(e){this.#p=e}#m=!0;get interactive(){return this.#m}set interactive(e){this.#m=e}#h=!1;get disabled(){return this.#h}set disabled(e){this.#h=e}static styles=fe;get cardClasses(){return`dcx-card ${this.interactive?`dcx-card--interactive`:``} ${this.disabled?`dcx-card--disabled`:``}`.trim().replace(/\s+/g,` `)}get innerClasses(){let e=this.accent?`dcx-card__inner--accent-top`:``;return`dcx-card__inner dcx-card__inner--layout-${this.layout} dcx-card__inner--align-${this.align} dcx-card__inner--size-${this.size} ${e}`.trim().replace(/\s+/g,` `)}get innerStyles(){return{"--card-max-content-width":this.maxContentWidth,"--card-max-image-width":this.maxImageWidth,"--card-border-style":this.bordered?this.borderStyle:`solid`,"--card-border-width":this.bordered?`${this.borderWidth}px`:`0`,"--card-shadow":this.shadowCSS}}get cardRole(){return this.disabled?`region`:this.interactive?`button`:`region`}get cardTabIndex(){if(this.disabled)return-1;if(this.cardRole===`button`)return 0}get hasHeader(){return this.querySelector(`[slot="header"]`)!==null}get hasContent(){return this.querySelector(`[slot="content"]`)!==null||Array.from(this.childNodes).some(e=>e.nodeType===Node.ELEMENT_NODE&&!e.hasAttribute(`slot`)||e.nodeType===Node.TEXT_NODE&&(e.textContent??``).trim().length>0)}get hasFooter(){return this.querySelector(`[slot="footer"]`)!==null}get effectiveAriaLabel(){return this.cardRole===`region`&&!this.hasHeader&&this.title?this.title:null}get shadowCSS(){switch(this.shadow){case 1:return`var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06))`;case 2:return`var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))`;case 3:return`var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12))`;default:return`var(--shadow-0, none)`}}_handleCardClick(e){if(!this.disabled)if(e instanceof KeyboardEvent){let t=e.key.toLowerCase();this.interactive&&(t===`enter`||t===` `)&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`dcx-card-click`,{detail:e,bubbles:!0,composed:!0})))}else this.dispatchEvent(new CustomEvent(`dcx-card-click`,{detail:e,bubbles:!0,composed:!0}))}render(){return pe(this)}};o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`image`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`imageAlt`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`title`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`subtitle`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`layout`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`align`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`size`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`maxContentWidth`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`maxImageWidth`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`accent`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`bordered`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`borderWidth`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`borderStyle`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`shadow`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`interactive`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],x.prototype,`disabled`,null),x=o([i(`dcx-web-card`)],x);var me=t`
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
`,he=t=>e`
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
  `,S=class extends r{static styles=me;#e=[];get options(){return this.#e}set options(e){this.#e=e}errorIcon=`exclamation-circle-fill`;_getValue(e){return e===!0?!1:e!==!1||null}_normalizeValue(e){return e===!0||e!==!1&&null}getVariant(e){return this._normalizeValue(e.value)===null?`secondary`:`primary`}getIconName(e){let t=this._normalizeValue(e.value);return t===!0?`check`:t===!1?`dash`:``}getAriaChecked(e){let t=this._normalizeValue(e.value);return t===!0?`true`:t===!1?`mixed`:`false`}changeValue(e){let t=this.options.map(t=>t.id===e?{...t,value:this._getValue(t.value)}:t);this.dispatchEvent(new CustomEvent(`changeOptions`,{detail:t,bubbles:!0,composed:!0}))}renderLabel(t){return e`
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
    `}render(){return he(this)}};o([a({attribute:!1}),d(`design:type`,Array),d(`design:paramtypes`,[])],S.prototype,`options`,null),S=o([i(`dcx-web-checkbox`)],S);var C=t`
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
`,w=t=>{let n=t.getComputedAriaLabel(),r=t.isHidden();return t.label?e`
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
  `},T=class extends r{#e=`horizontal`;get orientation(){return this.#e}set orientation(e){this.#e=e}#t=`default`;get type(){return this.#t}set type(e){this.#t=e}#n=`auto`;get size(){return this.#n}set size(e){this.#n=e}#r=.25;get thickness(){return this.#r}set thickness(e){this.#r=e}#i=`#d1d5db`;get color(){return this.#i}set color(e){this.#i=e}#a=``;get label(){return this.#a}set label(e){this.#a=e}#o=null;get ariaLabel(){return this.#o}set ariaLabel(e){this.#o=e}static styles=C;_getDividerStyle(){switch(this.type){case`dot`:return`dotted`;case`dash`:return`dashed`;default:return`solid`}}_getDividerSize(){switch(this.size){case`s`:return`5rem`;case`m`:return`15rem`;case`l`:return`30rem`;case`xl`:return`35rem`;default:return`100%`}}getComputedAriaLabel(){return this.ariaLabel&&this.ariaLabel.trim().length>0?this.ariaLabel:this.label&&this.label.trim().length>0?this.label:``}isHidden(){return!this.label&&!this.ariaLabel}updated(){this.classList.toggle(`horizontal`,this.orientation===`horizontal`),this.classList.toggle(`vertical`,this.orientation===`vertical`),this.classList.toggle(`has-label`,!!this.label),this.style.setProperty(`--_dcx-divider-size`,this._getDividerSize()),this.style.setProperty(`--_dcx-divider-style`,this._getDividerStyle()),this.style.setProperty(`--_dcx-divider-thickness`,`${this.thickness}rem`),this.style.setProperty(`--_dcx-divider-color`,this.color)}render(){return w(this)}};o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`orientation`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`type`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`size`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`thickness`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`color`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`label`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],T.prototype,`ariaLabel`,null),T=o([i(`dcx-web-divider`)],T);var E=t`
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
`,D=t=>{let n=t.items.length,r=n>t.maxVisibleItems,i=[],a=[];r?(i=t.items.slice(0,n-t.maxVisibleItems),a=t.items.slice(-t.maxVisibleItems)):a=t.items;let o=a[a.length-1]||null;return e`
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
  `},O=class extends r{maxVisibleItems=3;#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=`chevron-right`;get iconSeparator(){return this.#t}set iconSeparator(e){this.#t=e}#n=!1;get isEllipsisMenuOpen(){return this.#n}set isEllipsisMenuOpen(e){this.#n=e}static styles=E;connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this._handleDocumentClick),document.addEventListener(`keydown`,this._handleKeyDown)}disconnectedCallback(){document.removeEventListener(`click`,this._handleDocumentClick),document.removeEventListener(`keydown`,this._handleKeyDown),super.disconnectedCallback()}_handleDocumentClick=e=>{let t=e.composedPath();this.isEllipsisMenuOpen&&!t.includes(this)&&(this.isEllipsisMenuOpen=!1)};_handleKeyDown=e=>{e.key===`Escape`&&this.isEllipsisMenuOpen&&(this.isEllipsisMenuOpen=!1,this.shadowRoot?.querySelector(`.dcx-bc__ellipsis-btn`)?.focus())};toggleEllipsisMenu(e){e.preventDefault(),e.stopPropagation(),this.isEllipsisMenuOpen=!this.isEllipsisMenuOpen}onItemClick(e,t){if(e.disabled){t.preventDefault();return}this.dispatchEvent(new CustomEvent(`itemSelected`,{detail:e,bubbles:!0,composed:!0}))}onHiddenItemClick(e,t){t.stopPropagation(),!e.disabled&&(this.isEllipsisMenuOpen=!1,this.dispatchEvent(new CustomEvent(`itemSelected`,{detail:e,bubbles:!0,composed:!0})),e.href&&window.location.assign(e.href))}renderSeparatorIcon(){switch(this.iconSeparator){case`slash-lg`:return e`<dcx-web-icon name="slash-lg"></dcx-web-icon>`;case`arrow-right-short`:return e`<dcx-web-icon name="arrow-right-short"></dcx-web-icon>`;default:return e`<dcx-web-icon name="chevron-right"></dcx-web-icon>`}}renderItemIcon(t){return e`<dcx-web-icon name="${t}"></dcx-web-icon>`}render(){return D(this)}};o([a({type:Array}),d(`design:type`,Array),d(`design:paramtypes`,[])],O.prototype,`items`,null),o([a({type:String,attribute:`icon-separator`}),d(`design:type`,Object),d(`design:paramtypes`,[])],O.prototype,`iconSeparator`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],O.prototype,`isEllipsisMenuOpen`,null),O=o([i(`dcx-web-breadcrumb`)],O);var k=t`
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
`,A=t=>t.isOpen?e`
    <div
      class="${`dcx-context-menu ${t.positionMode===`absolute`?`dcx-context-menu--absolute`:``}`}"
      style="${`top: ${t.top}; left: ${t.left}; opacity: ${t.isPositioned?`1`:`0`};`}"
      @click="${e=>e.stopPropagation()}"
      tabindex="-1"
      role="menu"
      aria-label="Menú contextual"
    >
      <ul class="dcx-context-menu__list" role="presentation">
        ${t.items.map((e,n)=>t.renderItem(e,n))}
      </ul>
    </div>
  `:e``,j=class extends r{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t={x:0,y:0};get position(){return this.#t}set position(e){this.#t=e}#n=`fixed`;get positionMode(){return this.#n}set positionMode(e){this.#n=e}#r=!1;get isOpen(){return this.#r}set isOpen(e){this.#r=e}#i=!1;get isPositioned(){return this.#i}set isPositioned(e){this.#i=e}#a=`-9999px`;get top(){return this.#a}set top(e){this.#a=e}#o=`-9999px`;get left(){return this.#o}set left(e){this.#o=e}_openPosition=null;static styles=k;connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this._handleDocumentKeyDown),document.addEventListener(`click`,this._handleDocumentClick),window.addEventListener(`resize`,this._handleWindowResize)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this._handleDocumentKeyDown),document.removeEventListener(`click`,this._handleDocumentClick),window.removeEventListener(`resize`,this._handleWindowResize)}_handleDocumentKeyDown=e=>{e.key===`Escape`&&this.isOpen&&this.close()};_handleDocumentClick=e=>{if(!this.isOpen)return;let t=e.composedPath(),n=this.shadowRoot?.querySelector(`.dcx-context-menu`);n&&t.includes(n)||this.close()};_handleWindowResize=()=>{this.isOpen&&this.calculatePosition()};async open(e){e&&(this._openPosition=e),this.isOpen=!0,await this.updateComplete,this.calculatePosition()}close(){this._openPosition=null,this.isOpen=!1,this.isPositioned=!1,this.dispatchEvent(new CustomEvent(`menu-closed`))}calculatePosition(){let e=this._openPosition??this.position;if(this.positionMode===`absolute`){this.left=`${e.x}px`,this.top=`${e.y}px`,this.isPositioned=!0;return}let t=e.x,n=e.y,r=this.shadowRoot?.querySelector(`.dcx-context-menu`);if(r){let e=r.getBoundingClientRect();if(t+e.width>window.innerWidth-10&&(t=window.innerWidth-10-e.width,t<0&&(t=0)),n+e.height>window.innerHeight-10){let t=n-e.height;n=t>=0?t:10}}let i=0,a=0;if(this.shadowRoot){let e=document.createElement(`div`);e.style.position=`fixed`,e.style.left=`0px`,e.style.top=`0px`,e.style.width=`0px`,e.style.height=`0px`,e.style.visibility=`hidden`,this.shadowRoot.appendChild(e);let t=e.getBoundingClientRect();i=t.left,a=t.top,this.shadowRoot.removeChild(e)}this.left=`${t-i}px`,this.top=`${n-a}px`,this.isPositioned=!0}onItemClick(e,t){t?.stopPropagation(),!(e.disabled||e.divider)&&(e.action&&e.action(),this.dispatchEvent(new CustomEvent(`item-selected`,{detail:e,bubbles:!0,composed:!0})),(!e.children||e.children.length===0)&&this.close())}onItemKeydown(e,t,n){let r=e.children||[];n.key===`ArrowRight`&&r.length>0?(n.preventDefault(),n.currentTarget.querySelector(`.dcx-context-menu__nested [tabindex="0"]`)?.focus()):n.key===`ArrowLeft`?(n.preventDefault(),(n.currentTarget.closest(`.dcx-context-menu__nested`)?.closest(`li`))?.focus()):(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this.onItemClick(e,n))}renderItem(t,n){if(t.divider)return e`<li class="dcx-context-menu__divider" role="separator"></li>`;let r=t.children&&t.children.length>0;return e`
      <li
        class="${[`dcx-context-menu__item`,`dcx-context-menu__item--selectable`,t.disabled?`dcx-context-menu__item--disabled`:``,r?`dcx-context-menu__item--has-children`:``,t.variant===`danger`?`dcx-context-menu__item--danger`:``].filter(Boolean).join(` `)}"
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
    `}render(){return A(this)}};o([a({type:Array}),d(`design:type`,Array),d(`design:paramtypes`,[])],j.prototype,`items`,null),o([a({type:Object}),d(`design:type`,Object),d(`design:paramtypes`,[])],j.prototype,`position`,null),o([a({type:String}),d(`design:type`,String),d(`design:paramtypes`,[])],j.prototype,`positionMode`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],j.prototype,`isOpen`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],j.prototype,`isPositioned`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],j.prototype,`top`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],j.prototype,`left`,null),j=o([i(`dcx-web-context-menu`)],j);var M=t`
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
`,N=t=>{if(!t.rendered)return n;let r=[`dcx-drawer`,`dcx-drawer--${t.position}`,t.fullScreen?`dcx-drawer--fullscreen`:``].filter(Boolean),i=[`dcx-drawer-root`,t.closing?`dcx-drawer-root--closing`:``],a=t.modal;return e`
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
  `},P=[`s`,`m`,`l`,`xl`,`auto`],F=[`top`,`bottom`,`left`,`right`],I=[`vertical`,`horizontal`],L=[`xs`,`s`,`m`,`l`,`xl`],R=`right`,ge=F,z=`22rem`,B=1e3,V=`Drawer`,_e={open:!1,position:R,modal:!0,dismissible:!0,showCloseIcon:!0,closeOnEscape:!0,blockScroll:!1,fullScreen:!1,size:z,baseZIndex:B,autoZIndex:!0,header:V,footer:``},H,U=class extends r{static{H=this}#e=!1;get open(){return this.#e}set open(e){this.#e=e}#t=R;get position(){return this.#t}set position(e){this.#t=e}#n=!0;get modal(){return this.#n}set modal(e){this.#n=e}#r=!0;get dismissible(){return this.#r}set dismissible(e){this.#r=e}#i=!0;get showCloseIcon(){return this.#i}set showCloseIcon(e){this.#i=e}#a=!0;get closeOnEscape(){return this.#a}set closeOnEscape(e){this.#a=e}#o=!1;get blockScroll(){return this.#o}set blockScroll(e){this.#o=e}#s=!1;get fullScreen(){return this.#s}set fullScreen(e){this.#s=e}#c=z;get size(){return this.#c}set size(e){this.#c=e}#l=B;get baseZIndex(){return this.#l}set baseZIndex(e){this.#l=e}#u=!0;get autoZIndex(){return this.#u}set autoZIndex(e){this.#u=e}#d=V;get header(){return this.#d}set header(e){this.#d=e}#f=``;get footer(){return this.#f}set footer(e){this.#f=e}static styles=M;static _instanceCount=0;static _globalZIndex=0;#p=B;get _currentZIndex(){return this.#p}set _currentZIndex(e){this.#p=e}#m=!1;get rendered(){return this.#m}set rendered(e){this.#m=e}#h=!1;get closing(){return this.#h}set closing(e){this.#h=e}_closeTimer;_scrollBlocked=!1;_previousOverflow=``;_hideAlreadyEmitted=!1;_drawerId=`dcx-drawer-${++H._instanceCount}`;_keydownHandler=e=>{!this.open||!this.closeOnEscape||e.key!==`Escape`||this.closeDrawer()};get drawerTitleId(){return`${this._drawerId}-title`}get hasHeader(){return!!(this.header||this.showCloseIcon||this.querySelector(`[slot="drawerHeader"]`))}get hasFooter(){return!!(this.footer||this.querySelector(`[slot="drawerFooter"]`))}get resolvedZIndex(){return this._currentZIndex}get panelWidth(){return this.fullScreen?`100%`:this.position===`left`||this.position===`right`?this.size:null}get panelHeight(){return this.fullScreen?`100%`:this.position===`top`||this.position===`bottom`?this.size:null}connectedCallback(){super.connectedCallback(),this._syncKeydownListener(),this._syncBodyScroll()}disconnectedCallback(){document.removeEventListener(`keydown`,this._keydownHandler),this._scrollBlocked&&=(document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=``,!1),window.clearTimeout(this._closeTimer),super.disconnectedCallback()}willUpdate(e){e.has(`open`)&&(this.open?(this.closing=!1,this.rendered=!0):this.closing=!0),(e.has(`open`)||e.has(`baseZIndex`)||e.has(`autoZIndex`))&&(this.open&&this.autoZIndex?(H._globalZIndex=Math.max(H._globalZIndex,this.baseZIndex),H._globalZIndex+=2,this._currentZIndex=H._globalZIndex):this._currentZIndex=this.baseZIndex)}updated(e){e.has(`open`)&&(this.open?this.dispatchEvent(new CustomEvent(`dcx-drawer-show`,{bubbles:!0,composed:!0})):(this._hideAlreadyEmitted?this._hideAlreadyEmitted=!1:this.dispatchEvent(new CustomEvent(`dcx-drawer-hide`,{bubbles:!0,composed:!0})),window.clearTimeout(this._closeTimer),this._closeTimer=window.setTimeout(()=>{this.rendered=!1,this.closing=!1,this.requestUpdate()},220))),(e.has(`open`)||e.has(`blockScroll`)||e.has(`modal`))&&this._syncBodyScroll(),(e.has(`open`)||e.has(`closeOnEscape`))&&this._syncKeydownListener()}render(){return N(this)}close(){this.closeDrawer()}handleMaskPointerDown=e=>{e.stopPropagation(),this.dismissible&&this.closeDrawer()};closeDrawer=()=>{this.open&&(this._hideAlreadyEmitted=!0,this.dispatchEvent(new CustomEvent(`dcx-drawer-hide`,{bubbles:!0,composed:!0})),this.open=!1,this.dispatchEvent(new CustomEvent(`dcx-drawer-visible-change`,{detail:!1,bubbles:!0,composed:!0})))};_syncBodyScroll(){let e=this.open&&this.modal&&this.blockScroll;if(e&&!this._scrollBlocked){let e=window.innerWidth-document.documentElement.clientWidth;this._previousOverflow=document.body.style.overflow,document.body.style.overflow=`hidden`,e>0&&(document.body.style.paddingRight=`${e}px`),this._scrollBlocked=!0}else!e&&this._scrollBlocked&&(document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=``,this._scrollBlocked=!1)}_syncKeydownListener(){this.open&&this.closeOnEscape?document.addEventListener(`keydown`,this._keydownHandler):document.removeEventListener(`keydown`,this._keydownHandler)}};o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`open`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`position`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`modal`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`dismissible`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`showCloseIcon`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`closeOnEscape`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`blockScroll`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`fullScreen`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`size`,null),o([a({type:Number,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`baseZIndex`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`autoZIndex`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`header`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`footer`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`_currentZIndex`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`rendered`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],U.prototype,`closing`,null),U=H=o([i(`dcx-web-drawer`)],U);var ve=t`
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
`,ye=t=>{let r=`dcx-chip dcx-chip--${t.color}`,i=t.label?`Remover ${t.label}`:`Remover chip`;return e`
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
  `},W=class extends r{#e=``;get label(){return this.#e}set label(e){this.#e=e}#t=`primary`;get color(){return this.#t}set color(e){this.#t=e}#n=!1;get removable(){return this.#n}set removable(e){this.#n=e}#r=``;get icon(){return this.#r}set icon(e){this.#r=e}#i=``;get image(){return this.#i}set image(e){this.#i=e}#a=`choice`;get variant(){return this.#a}set variant(e){this.#a=e}static styles=ve;get chipType(){return this.image.trim()?`with-image`:this.icon.trim()?`with-icon`:`label-only`}get showRemove(){return this.variant===`filter`||this.removable}renderIcon(){return e`<dcx-web-icon name=${[`house`,`person`,`gear`,`star`,`code-slash`,`terminal`,`palette`,`book`,`bug`].includes(this.icon)?this.icon:`question-circle`}></dcx-web-icon>`}handleRemove(e){e.stopPropagation(),this.showRemove&&this.dispatchEvent(new CustomEvent(`dcx-chip-remove`,{bubbles:!0,composed:!0}))}render(){return ye(this)}};o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],W.prototype,`label`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],W.prototype,`color`,null),o([a({type:Boolean,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],W.prototype,`removable`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],W.prototype,`icon`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],W.prototype,`image`,null),o([a({type:String,reflect:!0}),d(`design:type`,Object),d(`design:paramtypes`,[])],W.prototype,`variant`,null),W=o([i(`dcx-web-chip`)],W);var be=t`
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
`,xe=t=>e`
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
  `,G=class extends r{#e=[];get value(){return this.#e}set value(e){this.#e=e}#t=!1;get circular(){return this.#t}set circular(e){this.#t=e}#n=`horizontal`;get orientation(){return this.#n}set orientation(e){this.#n=e}#r=!0;get showNavigators(){return this.#r}set showNavigators(e){this.#r=e}#i=!0;get showIndicators(){return this.#i}set showIndicators(e){this.#i=e}#a=0;get autoplayInterval(){return this.#a}set autoplayInterval(e){this.#a=e}#o=`Carousel`;get ariaLabel(){return this.#o}set ariaLabel(e){this.#o=e}#s=void 0;get itemTemplate(){return this.#s}set itemTemplate(e){this.#s=e}#c=0;get currentPage(){return this.#c}set currentPage(e){this.#c=e}get liveAnnouncement(){let e=this.totalItems;return e>0?`Diapositiva ${this.currentPage+1} de ${e}`:``}_timer;_autoplayEnabled=!1;static styles=be;get totalItems(){return this.value?this.value.length:0}get isVertical(){return this.orientation===`vertical`}get carouselClass(){return this.isVertical?`dcx-carousel dcx-carousel--vertical`:`dcx-carousel`}get slideDirection(){return this.isVertical?`column`:`row`}get currentIcon(){return this.isVertical?`chevron-up`:`chevron-left`}get nextIcon(){return this.isVertical?`chevron-down`:`chevron-right`}get canNavigate(){return this.totalItems>1}get showNavigatorButtons(){return this.showNavigators&&this.canNavigate}get showIndicatorDots(){return this.showIndicators&&this.canNavigate}get isPrevDisabled(){return!this.circular&&this.currentPage===0}get isNextDisabled(){return!this.circular&&this.currentPage===this.totalItems-1}get wrapperTransform(){if(this.currentPage===0)return`translate3d(0, 0, 0)`;let e=this.currentPage*100;return this.isVertical?`translate3d(0, -${e}%, 0)`:`translate3d(-${e}%, 0, 0)`}updated(e){if(super.updated(e),e.has(`autoplayInterval`)){this.clearTimer();let e=this.autoplayInterval;this._autoplayEnabled=e>0,this._autoplayEnabled&&this.startAutoplay()}}disconnectedCallback(){this.clearTimer(),super.disconnectedCallback()}next(){let e=this.totalItems,t=this.currentPage;t<e-1?this.currentPage=t+1:this.circular&&(this.currentPage=0),this.dispatchEvent(new CustomEvent(`pageChange`,{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}prev(){let e=this.totalItems,t=this.currentPage;t>0?this.currentPage=t-1:this.circular&&(this.currentPage=e-1),this.dispatchEvent(new CustomEvent(`pageChange`,{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}setPage(e){this.currentPage=e,this.dispatchEvent(new CustomEvent(`pageChange`,{detail:{page:e},bubbles:!0,composed:!0}))}indicatorClass(e){let t=`dcx-carousel__indicator`;return e===this.currentPage?`${t} ${t}--active`:t}onKeydown(e){let t=!this.isVertical,n=t?`ArrowLeft`:`ArrowUp`,r=t?`ArrowRight`:`ArrowDown`;e.key===n?(e.preventDefault(),this.prev()):e.key===r&&(e.preventDefault(),this.next())}pauseAutoplay(){this._autoplayEnabled&&this.clearTimer()}resumeAutoplay(){this._autoplayEnabled&&!this._timer&&this.startAutoplay()}startAutoplay(){let e=this.autoplayInterval;this._timer=setInterval(()=>this.next(),e)}clearTimer(){this._timer&&=(clearInterval(this._timer),void 0)}render(){return xe(this)}};o([a({type:Array}),d(`design:type`,Array),d(`design:paramtypes`,[])],G.prototype,`value`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`circular`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`orientation`,null),o([a({type:Boolean,attribute:`show-navigators`}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`showNavigators`,null),o([a({type:Boolean,attribute:`show-indicators`}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`showIndicators`,null),o([a({type:Number,attribute:`autoplay-interval`}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`autoplayInterval`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`ariaLabel`,null),o([a({attribute:!1}),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`itemTemplate`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],G.prototype,`currentPage`,null),G=o([i(`dcx-web-carousel`)],G);var Se=t`
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
`,Ce=t=>e`
    <div class="dcx-datepicker">
      <div
        class="${c({"dcx-datepicker__input-wrapper":!0,"dcx-datepicker__input-wrapper--disabled":t.disabled,"dcx-datepicker__input-wrapper--open":t.isOpen})}"
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
                                          class="${c(i)}"
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
  `,we=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`],Te=[`Do`,`Lu`,`Ma`,`Mi`,`Ju`,`Vi`,`Sa`],Ee=[`Lu`,`Ma`,`Mi`,`Ju`,`Vi`,`Sa`,`Do`],De={clearDate:`Limpiar`,previous:`Anterior`,next:`Siguiente`,selectMonth:`Selecciona mes`,selectYear:`Selecciona año`,today:`Hoy`,goToToday:`Ir a hoy`},Oe=[`multiSelect`,`rangeSelect`,`disabled`,`placeholder`,`dateFormat`,`firstDayOfWeek`],ke=[`selectedDate`,`startDate`,`endDate`,`minDate`,`maxDate`],K=class extends r{static styles=Se;#e=null;get selectedDate(){return this.#e}set selectedDate(e){this.#e=e}#t=[];get selectedDates(){return this.#t}set selectedDates(e){this.#t=e}#n=!1;get multiSelect(){return this.#n}set multiSelect(e){this.#n=e}#r=!1;get rangeSelect(){return this.#r}set rangeSelect(e){this.#r=e}#i=null;get startDate(){return this.#i}set startDate(e){this.#i=e}#a=null;get endDate(){return this.#a}set endDate(e){this.#a=e}#o=null;get minDate(){return this.#o}set minDate(e){this.#o=e}#s=null;get maxDate(){return this.#s}set maxDate(e){this.#s=e}#c=!1;get disabled(){return this.#c}set disabled(e){this.#c=e}#l=`Select date`;get placeholder(){return this.#l}set placeholder(e){this.#l=e}#u=`dd/MM/yyyy`;get dateFormat(){return this.#u}set dateFormat(e){this.#u=e}#d=`monday`;get firstDayOfWeek(){return this.#d}set firstDayOfWeek(e){this.#d=e}#f=null;get _currentMonth(){return this.#f}set _currentMonth(e){this.#f=e}#p=!1;get _isOpen(){return this.#p}set _isOpen(e){this.#p=e}#m=`calendar`;get _mode(){return this.#m}set _mode(e){this.#m=e}#h=null;get _yearPageStart(){return this.#h}set _yearPageStart(e){this.#h=e}#g=null;get _focusedDate(){return this.#g}set _focusedDate(e){this.#g=e}get isOpen(){return this._isOpen}get isMonthMode(){return this._mode===`month`}get isYearMode(){return this._mode===`year`}get isCalendarMode(){return this._mode===`calendar`}get currentMonth(){let e=this._currentMonth;if(e)return e;let t=this.selectedDate;return t?new Date(t):new Date}get monthName(){return this.currentMonth.toLocaleDateString(`es-ES`,{month:`long`})}get yearNumber(){return this.currentMonth.getFullYear()}get yearsList(){let e=this.currentMonth.getFullYear(),t=this._yearPageStart??e-e%12;return Array.from({length:12},(e,n)=>t+n)}get formattedSelectedDate(){return this.rangeSelect?this._formatRangeDate():this.multiSelect?this._formatMultipleDate():this._formatSingleDate()}get showClearButton(){return this.disabled?!1:this.rangeSelect?!!(this.startDate||this.endDate):this.multiSelect?this.selectedDates.length>0:!!this.selectedDate}get weekDays(){return this.firstDayOfWeek===`sunday`?Te:Ee}get calendarDays(){let e=this.currentMonth,t=e.getFullYear(),n=e.getMonth(),r=new Date(t,n,1),i=new Date(r),a=this.firstDayOfWeek===`sunday`?r.getDay():r.getDay()===0?6:r.getDay()-1;i.setDate(i.getDate()-a);let o=new Date;return o.setHours(0,0,0,0),Array.from({length:42},(e,t)=>{let r=new Date(i);r.setDate(r.getDate()+t);let a=r.getTime(),{isSelected:s,isInRange:c}=this._calculateDateSelectionState(a);return{date:r,isCurrentMonth:r.getMonth()===n,isToday:a===o.getTime(),isSelected:s,isInRange:c,isDisabled:this._isDateDisabled(r)}})}get calendarWeeks(){let e=this.calendarDays;return Array.from({length:6},(t,n)=>e.slice(n*7,n*7+7))}get gridAriaLabel(){return`${this.monthName} ${this.yearNumber}`}labels=De;monthsList=we;get monthsIndexes(){return Array.from({length:this.monthsList.length},(e,t)=>t)}dateFormatPatterns={"dd/MM/yyyy":(e,t,n)=>`${e}/${t}/${n}`,"MM/dd/yyyy":(e,t,n)=>`${t}/${e}/${n}`};_docClickHandler=e=>this._onDocumentClick(e);connectedCallback(){super.connectedCallback(),document.addEventListener(`mousedown`,this._docClickHandler)}disconnectedCallback(){document.removeEventListener(`mousedown`,this._docClickHandler),super.disconnectedCallback()}updated(e){super.updated(e),(e.has(`_focusedDate`)||e.has(`_isOpen`))&&this._focusedDate&&this._isOpen&&requestAnimationFrame(()=>this._focusDayCell())}_onDocumentClick(e){this.isOpen&&(e.composedPath().includes(this)||this.closeCalendar())}onTriggerKeydown(e){e.key===`Enter`||e.key===` `?(e.preventDefault(),this.toggleCalendar()):e.key===`Escape`&&(e.preventDefault(),this.closeCalendar())}onGridKeydown(e,t){switch([`ArrowRight`,`ArrowLeft`,`ArrowDown`,`ArrowUp`,`Enter`,` `,`Escape`,`PageUp`,`PageDown`,`Home`,`End`].includes(e.key)&&e.preventDefault(),e.key){case`ArrowRight`:this._moveFocus(1);break;case`ArrowLeft`:this._moveFocus(-1);break;case`ArrowDown`:this._moveFocus(7);break;case`ArrowUp`:this._moveFocus(-7);break;case`Enter`:case` `:t.isDisabled||this.selectDate(t);break;case`Escape`:this.closeCalendar();break;case`PageUp`:this.previousMonth();break;case`PageDown`:this.nextMonth();break;case`Home`:this._moveFocusToStartOfWeek(t);break;case`End`:this._moveFocusToEndOfWeek(t);break}}isFocusedDay(e){let t=this._focusedDate;return t?e.date.getDate()===t.getDate()&&e.date.getMonth()===t.getMonth()&&e.date.getFullYear()===t.getFullYear():e.isSelected||e.isToday?!0:e.isCurrentMonth&&e.date.getDate()===1}toggleCalendar(){this.disabled||(this._isOpen=!this._isOpen,this._isOpen||(this._currentMonth=null,this._mode=`calendar`,this._focusedDate=null))}closeCalendar(){this._isOpen=!1,this._currentMonth=null,this._mode=`calendar`,this._focusedDate=null,this.renderRoot.querySelector(`.dcx-datepicker__input-wrapper`)?.focus()}previousYear(){let e=this.currentMonth,t=new Date(e);t.setFullYear(t.getFullYear()-1),this._currentMonth=t}nextYear(){let e=this.currentMonth,t=new Date(e);t.setFullYear(t.getFullYear()+1),this._currentMonth=t}previousMonth(){if(this.isMonthMode)return;if(this.isYearMode){this._yearPageStart=(this._yearPageStart??this.currentMonth.getFullYear())-12;return}let e=this.currentMonth,t=new Date(e);t.setMonth(t.getMonth()-1),this._currentMonth=t}nextMonth(){if(this.isMonthMode)return;if(this.isYearMode){this._yearPageStart=(this._yearPageStart??this.currentMonth.getFullYear())+12;return}let e=this.currentMonth,t=new Date(e);t.setMonth(t.getMonth()+1),this._currentMonth=t}openMonthSelector(){this._mode=`month`}openYearSelector(){this._mode=`year`;let e=this.currentMonth.getFullYear();this._yearPageStart=e-e%12}selectMonth(e){let t=this.currentMonth,n=new Date(t);n.setMonth(e),this._currentMonth=n,this._mode=`calendar`}selectYear(e){let t=this.currentMonth,n=new Date(t);n.setFullYear(e),this._currentMonth=n,this._mode=`calendar`}applyDate(){this.rangeSelect?(this._emitEvent(`startDateChange`,this.startDate),this._emitEvent(`endDateChange`,this.endDate)):this.multiSelect?this._emitEvent(`selectedDatesChange`,this.selectedDates):this._emitEvent(`selectedDateChange`,this.selectedDate),this.closeCalendar()}selectDate(e){e.isDisabled||this.disabled||(this._focusedDate=e.date,this.rangeSelect?this._handleRangeSelection(e.date):this.multiSelect?this._handleMultiSelection(e.date):this._handleSingleSelection(e.date))}clearDate(e){e&&e.stopPropagation(),!this.disabled&&(this.rangeSelect?(this.startDate=null,this.endDate=null,this._emitEvent(`startDateChange`,null),this._emitEvent(`endDateChange`,null)):this.multiSelect?(this.selectedDates=[],this._emitEvent(`selectedDatesChange`,[])):(this.selectedDate=null,this._emitEvent(`selectedDateChange`,null)))}goToToday(){let e=new Date;if(e.setHours(0,0,0,0),this._currentMonth=new Date(e),!this._isDateDisabled(e))if(this.rangeSelect)this.startDate=e,this.endDate=null,this._emitEvent(`startDateChange`,e),this._emitEvent(`endDateChange`,null);else if(this.multiSelect){let t=[...this.selectedDates],n=e.getTime();t.findIndex(e=>new Date(e).setHours(0,0,0,0)===n)===-1&&(t.push(e),t.sort((e,t)=>e.getTime()-t.getTime()),this.selectedDates=t,this._emitEvent(`selectedDatesChange`,t))}else this.selectedDate=e,this._emitEvent(`selectedDateChange`,e)}_moveFocus(e){let t=this._focusedDate??this._defaultFocusDate(),n=new Date(t);if(n.setDate(n.getDate()+e),n.getMonth()!==this.currentMonth.getMonth()||n.getFullYear()!==this.currentMonth.getFullYear()){let e=new Date(n.getFullYear(),n.getMonth(),1);this._currentMonth=e}this._focusedDate=n}_moveFocusToStartOfWeek(e){let t=this.calendarDays,n=t.findIndex(t=>t.date.getTime()===e.date.getTime()),r=t[n-n%7];r&&(this._focusedDate=r.date)}_moveFocusToEndOfWeek(e){let t=this.calendarDays,n=t.findIndex(t=>t.date.getTime()===e.date.getTime()),r=t[n+(6-n%7)];r&&(this._focusedDate=r.date)}_defaultFocusDate(){let e=this.calendarDays,t=e.find(e=>e.isSelected);if(t)return t.date;let n=e.find(e=>e.isToday);return n?n.date:e.find(e=>e.isCurrentMonth)?.date??new Date}_focusDayCell(){let e=this._focusedDate;if(!e||!this.isOpen)return;let t=this.calendarDays.findIndex(t=>t.date.getDate()===e.getDate()&&t.date.getMonth()===e.getMonth()&&t.date.getFullYear()===e.getFullYear());t!==-1&&Array.from(this.renderRoot.querySelectorAll(`.dcx-datepicker__day`))[t]?.focus()}_formatDate(e){let t=this.dateFormat,n=e.getDate().toString().padStart(2,`0`),r=(e.getMonth()+1).toString().padStart(2,`0`),i=e.getFullYear().toString();return this.dateFormatPatterns[t](n,r,i)}_formatRangeDate(){let e=this.startDate,t=this.endDate;return!e&&!t?this.placeholder:e&&t?`${this._formatDate(e)} - ${this._formatDate(t)}`:e?this._formatDate(e):this.placeholder}_formatMultipleDate(){let e=this.selectedDates;return!e||e.length===0?this.placeholder:e.length>2?`${e.length} fechas seleccionadas`:e.map(e=>this._formatDate(e)).join(` - `)}_formatSingleDate(){let e=this.selectedDate;return e?this._formatDate(e):this.placeholder}_calculateDateSelectionState(e){return this.rangeSelect?this._calculateRangeState(e):this.multiSelect?this._calculateMultiState(e):this._calculateSingleState(e)}_calculateRangeState(e){let t=this.startDate,n=this.endDate,r=t?new Date(t).setHours(0,0,0,0):null,i=n?new Date(n).setHours(0,0,0,0):null;return{isSelected:r!==null&&e===r||i!==null&&e===i,isInRange:r&&i?e>r&&e<i:!1}}_calculateMultiState(e){return{isSelected:this.selectedDates.map(e=>new Date(e).setHours(0,0,0,0)).includes(e),isInRange:!1}}_calculateSingleState(e){let t=this.selectedDate,n=t?new Date(t).setHours(0,0,0,0):null;return{isSelected:n!==null&&e===n,isInRange:!1}}_handleRangeSelection(e){let t=this.startDate,n=this.endDate;if(!t||t&&n){this.startDate=e,this.endDate=null,this._emitEvent(`startDateChange`,e),this._emitEvent(`endDateChange`,null);return}e<t?(this.startDate=e,this.endDate=t,this._emitEvent(`startDateChange`,e),this._emitEvent(`endDateChange`,t)):(this.endDate=e,this._emitEvent(`endDateChange`,e))}_handleMultiSelection(e){let t=[...this.selectedDates],n=e.getTime(),r=t.findIndex(e=>new Date(e).setHours(0,0,0,0)===n);r>-1?t.splice(r,1):t.push(e),t.sort((e,t)=>e.getTime()-t.getTime()),this.selectedDates=t,this._emitEvent(`selectedDatesChange`,t)}_handleSingleSelection(e){this.selectedDate=e,this._emitEvent(`selectedDateChange`,e)}_isDateDisabled(e){let t=this.minDate,n=this.maxDate;return!!(t&&e<t)||!!(n&&e>n)}_emitEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}render(){return Ce(this)}};o([a({type:Object}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`selectedDate`,null),o([a({type:Array}),d(`design:type`,Array),d(`design:paramtypes`,[])],K.prototype,`selectedDates`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`multiSelect`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`rangeSelect`,null),o([a({type:Object}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`startDate`,null),o([a({type:Object}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`endDate`,null),o([a({type:Object}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`minDate`,null),o([a({type:Object}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`maxDate`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`disabled`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`placeholder`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`dateFormat`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`firstDayOfWeek`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`_currentMonth`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`_isOpen`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`_mode`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`_yearPageStart`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],K.prototype,`_focusedDate`,null),K=o([i(`dcx-web-datepicker`)],K);var Ae=t`
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
`,je=t=>e`
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
  `,q=class extends r{#e=`dcx-input-${Math.random().toString(36).substring(2,9)}`;get id(){return this.#e}set id(e){this.#e=e}#t=``;get value(){return this.#t}set value(e){this.#t=e}#n=!1;get disabled(){return this.#n}set disabled(e){this.#n=e}#r=!1;get readonly(){return this.#r}set readonly(e){this.#r=e}#i=``;get placeholder(){return this.#i}set placeholder(e){this.#i=e}#a=te;get type(){return this.#a}set type(e){this.#a=e}#o=``;get name(){return this.#o}set name(e){this.#o=e}#s=!1;get required(){return this.#s}set required(e){this.#s=e}#c=!1;get checked(){return this.#c}set checked(e){this.#c=e}#l=``;get autocomplete(){return this.#l}set autocomplete(e){this.#l=e}#u=``;get inputMode(){return this.#u}set inputMode(e){this.#u=e}#d=!1;get isInvalid(){return this.#d}set isInvalid(e){this.#d=e}#f=``;get label(){return this.#f}set label(e){this.#f=e}#p=``;get hint(){return this.#p}set hint(e){this.#p=e}#m=null;get ariaLabel(){return this.#m}set ariaLabel(e){this.#m=e}#h=null;get ariaDescribedBy(){return this.#h}set ariaDescribedBy(e){this.#h=e}#g=``;get errorMessage(){return this.#g}set errorMessage(e){this.#g=e}#_=u;get requiredMessage(){return this.#_}set requiredMessage(e){this.#_=e}#v=[];get errorMessages(){return this.#v}set errorMessages(e){this.#v=e}#y=g;get errorIcon(){return this.#y}set errorIcon(e){this.#y=e}#b=`xs`;get spacing(){return this.#b}set spacing(e){this.#b=e}#x=`horizontal`;get orientation(){return this.#x}set orientation(e){this.#x=e}#S=!1;get multiple(){return this.#S}set multiple(e){this.#S=e}#C=l.min;get min(){return this.#C}set min(e){this.#C=e}#w=l.max;get max(){return this.#w}set max(e){this.#w=e}#T=l.step;get step(){return this.#T}set step(e){this.#T=e}#E=!1;get showPassword(){return this.#E}set showPassword(e){this.#E=e}#D=!1;get touched(){return this.#D}set touched(e){this.#D=e}static styles=Ae;get labelId(){return`${this.id}-label`}get errorId(){return`${this.id}-error`}get hintId(){return`${this.id}-hint`}get isPasswordType(){return this.type===s.PASSWORD}get isSearchType(){return this.type===s.SEARCH}get isFileType(){return this.type===s.FILE}get isRadioType(){return this.type===s.RADIO}get isRangeType(){return this.type===s.RANGE}get displayType(){return this.isPasswordType?this.showPassword?`text`:`password`:this.isRangeType?`range`:this.type}get showActionIcon(){return(this.isPasswordType||this.isSearchType)&&!this.readonly}get getInputIcon(){return{[s.TEXT]:null,[s.NUMBER]:`pin`,[s.EMAIL]:`mail`,[s.PASSWORD]:null,[s.SEARCH]:`search`,[s.TEL]:`phone`,[s.URL]:`link`,[s.FILE]:null,[s.RADIO]:null,[s.RANGE]:null}[this.type]??null}get describedBy(){let e=[this.ariaDescribedBy,this.hint&&!this.isInvalid?this.hintId:null,this.isInvalid?this.errorId:null].filter(Boolean).join(` `).trim();return e.length?e:null}get showRequiredWarning(){return this.required&&[``,null,void 0].includes(this.value)&&this.touched}get getActionButtonAriaLabel(){return this.isPasswordType?this.showPassword?`Ocultar contraseña`:`Mostrar contraseña`:this.isSearchType?`Buscar`:``}get getActionButtonIcon(){return this.isPasswordType?this.showPassword?`eye-slash-fill`:`eye-fill`:this.isSearchType?`search`:``}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}formatValueByType(e){switch(this.type){case`number`:return e.replace(/[^0-9.-]/g,``)===``?``:parseFloat(e.replace(/[^0-9.-]/g,``));case`email`:return e.toLowerCase();case`tel`:return e.replace(/[^0-9\s\-()]/g,``);case`search`:return e.trim();case`url`:return e.toLowerCase();default:return e}}onInputChange(e){if(this.isRadioType||this.isFileType)return;let t=e.target,n=this.formatValueByType(t.value);this.value=n,this.emit(`valueChange`,n)}onChangeEvent(e){this.isFileType||this.isRadioType&&e.target.checked&&this.emit(`valueChange`,this.value)}onFocusEvent(){this.touched=!1,this.emit(`focusEvent`)}onBlurEvent(){this.touched=!0,this.emit(`blurEvent`)}togglePasswordVisibility(){this.showPassword=!this.showPassword}onActionButtonClick(){if(this.isPasswordType){this.togglePasswordVisibility();return}this.isSearchType&&this.emit(`valueChange`,this.value)}getInputClasses(){let e=[`dcx-input__control`,`dcx-input__control--${this.spacing}`];return this.disabled&&e.push(`is-disabled`,`dcx-input__control--disabled`),this.isInvalid&&e.push(`is-invalid`,`dcx-input__control--invalid`),this.getInputIcon&&e.push(`has-icon`,`dcx-input__control--has-icon`),this.showActionIcon&&e.push(`has-action`,`dcx-input__control--has-action`),e.join(` `)}render(){return je(this)}};o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`id`,null),o([a({attribute:!1}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`value`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`disabled`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`readonly`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`placeholder`,null),o([a({type:String}),d(`design:type`,s===void 0?Object:s),d(`design:paramtypes`,[])],q.prototype,`type`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`name`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`required`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`checked`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`autocomplete`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`inputMode`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`isInvalid`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`label`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`hint`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`ariaLabel`,null),o([a({type:String,attribute:`aria-describedby`}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`ariaDescribedBy`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`errorMessage`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`requiredMessage`,null),o([a({attribute:!1}),d(`design:type`,Array),d(`design:paramtypes`,[])],q.prototype,`errorMessages`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`errorIcon`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`spacing`,null),o([a({type:String,reflect:!0}),d(`design:type`,String),d(`design:paramtypes`,[])],q.prototype,`orientation`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`multiple`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`min`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`max`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`step`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`showPassword`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],q.prototype,`touched`,null),q=o([i(`dcx-web-input`)],q);var Me=t=>e`
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
  `,J=t`
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
`,Y=class extends r{#e=4;get length(){return this.#e}set length(e){this.#e=e}#t=`medium`;get size(){return this.#t}set size(e){this.#t=e}#n=!1;get integerOnly(){return this.#n}set integerOnly(e){this.#n=e}#r=!1;get mask(){return this.#r}set mask(e){this.#r=e}#i=!1;get invalid(){return this.#i}set invalid(e){this.#i=e}#a=!1;get disabled(){return this.#a}set disabled(e){this.#a=e}#o=``;get placeholder(){return this.#o}set placeholder(e){this.#o=e}#s=`Código de un solo uso`;get ariaLabel(){return this.#s}set ariaLabel(e){this.#s=e}#c=``;get errorMessage(){return this.#c}set errorMessage(e){this.#c=e}#l=!1;get formDisabled(){return this.#l}set formDisabled(e){this.#l=e}#u=this.createEmptyTokens(4);get tokens(){return this.#u}set tokens(e){this.#u=e}#d=null;get inputTemplateRenderer(){return this.#d}set inputTemplateRenderer(e){this.#d=e}static styles=J;uid=`dcx-otp-${Math.random().toString(36).slice(2,9)}`;errorId=`${this.uid}-error`;getTemplateContext(e,t){return{$implicit:e,token:e,index:t,events:{input:e=>this.onInput(e,t),keydown:e=>this.onKeydown(e,t),paste:e=>this.onPaste(e,t),focus:e=>this.onFocus(t),blur:e=>this.onBlur(t)},attrs:{type:this.inputType,inputmode:this.inputMode,autocomplete:`one-time-code`,maxlength:1,placeholder:this.placeholder,ariaLabel:this.getAriaLabel(t),disabled:this.isDisabled,value:e}}}get normalizedLength(){let e=Number(this.length);return!Number.isFinite(e)||e<1?4:Math.floor(e)}willUpdate(){if(this.tokens.length===this.normalizedLength)return;let e=this.tokens.slice(0,this.normalizedLength);for(;e.length<this.normalizedLength;)e.push(``);this.tokens=e}get inputType(){return this.mask?`password`:this.integerOnly?`tel`:`text`}get inputMode(){return this.integerOnly?`numeric`:`text`}get isDisabled(){return this.disabled||this.formDisabled}get showError(){return this.invalid&&this.errorMessage.trim().length>0}get describedBy(){return this.showError?this.errorId:null}get displayTokens(){return this.tokens}get inputBaseClass(){let e=[`dcx-input-otp__input`];return this.size===`small`&&e.push(`dcx-input-otp__input--small`),this.size===`large`&&e.push(`dcx-input-otp__input--large`),e.join(` `)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}writeValue(e){let t=this.sanitizeValue(String(e??``));this.tokens=this.valueToTokens(t)}setDisabledState(e){this.formDisabled=e}focus(){let e=this.tokens.findIndex(e=>!e),t=e>=0?e:0;this.focusInput(t)}clear(){this.tokens=this.createEmptyTokens(this.normalizedLength),this.propagateValue(!0),this.focus()}getAriaLabel(e){return`Dígito ${e+1} de ${this.normalizedLength}`}getInputClass(e){let t=[this.inputBaseClass];return e&&t.push(`dcx-input-otp__input--filled`),this.invalid&&t.push(`dcx-input-otp__input--invalid`),t.join(` `)}onInput(e,t){if(this.isDisabled)return;let n=e.target,r=this.sanitizeCharacters(n.value);if(n.value=r,!r){this.updateToken(t,``);return}this.applyCharacters(t,r)}onPaste(e,t){if(this.isDisabled)return;e.preventDefault();let n=e.clipboardData?.getData(`text`)??``,r=this.sanitizeCharacters(n);r&&this.applyCharacters(t,r)}onKeydown(e,t){if(this.isDisabled)return;if(this.integerOnly&&e.key.length===1&&!/^\d$/.test(e.key)){e.preventDefault();return}if(e.key===`ArrowLeft`){e.preventDefault(),this.focusInput(Math.max(t-1,0));return}if(e.key===`ArrowRight`){e.preventDefault(),this.focusInput(Math.min(t+1,this.normalizedLength-1));return}if(e.key!==`Backspace`)return;e.preventDefault();let n=[...this.tokens];if(n[t]){n[t]=``,this.tokens=n,this.propagateValue(!0);return}t!==0&&(n[t-1]=``,this.tokens=n,this.propagateValue(!0),this.focusInput(t-1))}onFocus(e){this.emit(`focusEvent`,e)}onBlur(e){this.emit(`blurEvent`,e)}applyCharacters(e,t){let n=[...this.tokens],r=this.sanitizeCharacters(t).slice(0,this.normalizedLength-e).split(``);r.forEach((t,r)=>{n[e+r]=t}),this.tokens=n,this.propagateValue(!0);let i=Math.min(e+r.length,this.normalizedLength-1);this.focusInput(i)}updateToken(e,t){let n=[...this.tokens];n[e]=t,this.tokens=n,this.propagateValue(!0)}propagateValue(e){let t=this.tokens.join(``);e&&(this.emit(`valueChange`,t),t.length===this.normalizedLength&&this.emit(`completed`,t))}focusInput(e){queueMicrotask(()=>{let t=this.renderRoot.querySelectorAll(`input`)[e];t?.focus(),t?.select()})}sanitizeValue(e){return this.sanitizeCharacters(e).slice(0,this.normalizedLength)}sanitizeCharacters(e){return this.integerOnly?e.replace(/\D+/g,``):e}valueToTokens(e){let t=this.createEmptyTokens(this.normalizedLength);return e.split(``).forEach((e,n)=>{n<t.length&&(t[n]=e)}),t}createEmptyTokens(e){return Array.from({length:e},()=>``)}render(){return Me(this)}};o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`length`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`size`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`integerOnly`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`mask`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`invalid`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`disabled`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`placeholder`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`ariaLabel`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`errorMessage`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`formDisabled`,null),o([f(),d(`design:type`,Array),d(`design:paramtypes`,[])],Y.prototype,`tokens`,null),o([a({attribute:!1,state:!1}),d(`design:type`,Object),d(`design:paramtypes`,[])],Y.prototype,`inputTemplateRenderer`,null),Y=o([i(`dcx-web-input-otp`)],Y);var X=t`
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
`,Ne=t=>e`
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
`,Z=class extends r{static styles=X;#e=_.showLabel;get showLabel(){return this.#e}set showLabel(e){this.#e=e}#t=_.textLabel;get textLabel(){return this.#t}set textLabel(e){this.#t=e}#n=_.value;get value(){return this.#n}set value(e){this.#n=e}#r=_.min;get min(){return this.#r}set min(e){this.#r=e}#i=_.max;get max(){return this.#i}set max(e){this.#i=e}#a=_.step;get step(){return this.#a}set step(e){this.#a=e}#o=_.vertical;get vertical(){return this.#o}set vertical(e){this.#o=e}#s=_.disabled;get disabled(){return this.#s}set disabled(e){this.#s=e}#c=null;get ariaLabel(){return this.#c}set ariaLabel(e){this.#c=e}#l=_.valueSuffix;get valueSuffix(){return this.#l}set valueSuffix(e){this.#l=e}#u=0;get valueInput(){return this.#u}set valueInput(e){this.#u=e}willUpdate(e){(e.has(`value`)||e.has(`min`)||e.has(`max`))&&(this.valueInput=this.clamp(this.value))}updated(e){e.has(`vertical`)&&(this.vertical?this.classList.add(`dcx-slider--vertical`):this.classList.remove(`dcx-slider--vertical`)),this.style.setProperty(`--slider-progress`,`${this.progressPercent}%`)}async firstUpdated(){let e=this.shadowRoot?.querySelector(`dcx-web-input`);if(e&&(await e.updateComplete,e.shadowRoot)){let t=document.createElement(`style`);t.textContent=X.cssText,e.shadowRoot.appendChild(t)}}clamp(e){return Math.min(Math.max(e,this.min),this.max)}onInput(e){let t=Number(e.detail);this.valueInput=t,this.value=t,this.dispatchEvent(new CustomEvent(`valueChange`,{detail:t,bubbles:!0,composed:!0}))}get displayValue(){return`${this.valueInput}${this.valueSuffix}`}get effectiveAriaLabel(){return this.ariaLabel||(this.showLabel?this.textLabel:null)}get effectiveAriaValueText(){return this.valueSuffix?this.displayValue:null}get progressPercent(){let e=this.min,t=this.max,n=this.valueInput;return t===e?100:(n-e)/(t-e)*100}render(){return Ne(this)}};o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`showLabel`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`textLabel`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`value`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`min`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`max`,null),o([a({type:Number}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`step`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`vertical`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`disabled`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`ariaLabel`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`valueSuffix`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Z.prototype,`valueInput`,null),Z=o([i(`dcx-web-slider`)],Z);var Pe=t=>e`
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
  `,Fe=t`
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
`,Q=class extends r{#e=``;get label(){return this.#e}set label(e){this.#e=e}#t=[];get options(){return this.#t}set options(e){this.#t=e}#n=v;get placeholder(){return this.#n}set placeholder(e){this.#n=e}#r=null;get ariaLabel(){return this.#r}set ariaLabel(e){this.#r=e}#i=!1;get searchable(){return this.#i}set searchable(e){this.#i=e}#a=!1;get clearable(){return this.#a}set clearable(e){this.#a=e}#o=!1;get disabled(){return this.#o}set disabled(e){this.#o=e}#s=!1;get required(){return this.#s}set required(e){this.#s=e}#c=!1;get isInvalid(){return this.#c}set isInvalid(e){this.#c=e}#l=``;get errorMessage(){return this.#l}set errorMessage(e){this.#l=e}#u=g;get errorIcon(){return this.#u}set errorIcon(e){this.#u=e}#d=null;get valueInput(){return this.#d}set valueInput(e){this.#d=e}#f=`m`;get spacing(){return this.#f}set spacing(e){this.#f=e}#p=null;get value(){return this.#p}set value(e){this.#p=e}#m=!1;get isOpen(){return this.#m}set isOpen(e){this.#m=e}#h=``;get search(){return this.#h}set search(e){this.#h=e}#g=-1;get activeIndex(){return this.#g}set activeIndex(e){this.#g=e}#_=!1;get receivedFromExternal(){return this.#_}set receivedFromExternal(e){this.#_=e}static styles=Fe;id=`dcx-select-${Math.random().toString(36).substring(2,9)}`;get selectId(){return this.id}get labelId(){return`${this.id}-label`}controlElement=null;connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this.handleDocumentClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`click`,this.handleDocumentClick,!0)}updated(e){e.has(`valueInput`)&&!this.receivedFromExternal&&(this.value=this.valueInput)}get filtered(){let e=this.search.toLowerCase();return this.options.filter(t=>t.label.toLowerCase().includes(e))}get selectedLabel(){let e=this.value;return e===null?this.placeholder:this.options.find(t=>t.value===e)?.label??this.placeholder}get activeDescendant(){return!this.isOpen||this.activeIndex<0?null:`${this.selectId}-opt-${this.activeIndex}`}getControlClasses(){let e=[`dcx-select__control`];return this.isOpen&&e.push(`is-open`),this.disabled&&e.push(`is-disabled`),this.isInvalid&&e.push(`is-invalid`),this.spacing&&e.push(`dcx-select--spacing-${this.spacing}`),e.join(` `)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}toggle=()=>{this.disabled||(this.isOpen?this.close():this.open())};open(){let e=this.filtered.findIndex(e=>e.value===this.value);this.activeIndex=e>=0?e:0,this.isOpen=!0,queueMicrotask(()=>{this.renderRoot.querySelector(`#${this.selectId}-opt-${this.activeIndex}`)?.scrollIntoView({block:`nearest`})})}close(){this.isOpen=!1,this.activeIndex=-1}selectOption(e){e.disabled||(this.value=e.value,this.emit(`valueChange`,e.value),this.close())}clearValue=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),!this.disabled&&(this.search=``,this.value=null,this.close(),this.emit(`clear`))};onSearchEvent=e=>{this.search=e.detail===null?``:String(e.detail),this.activeIndex=this.filtered.length>0?0:-1};handleDocumentClick=e=>{!e.composedPath().includes(this)&&this.isOpen&&this.close()};moveActive(e){let t=this.filtered.map((e,t)=>e.disabled?-1:t).filter(e=>e>=0);if(!t.length)return;let n=t.indexOf(this.activeIndex),r=0;switch(e){case`next`:r=n<0?0:(n+1)%t.length;break;case`prev`:r=n<0?t.length-1:(n-1+t.length)%t.length;break;case`first`:r=0;break;case`last`:r=t.length-1;break}this.activeIndex=t[r]}confirmActive(){let e=this.filtered[this.activeIndex];e&&!e.disabled&&this.selectOption(e)}onKey=e=>{if(!this.isOpen){(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),this.open());return}switch(e.key){case`ArrowDown`:e.preventDefault(),this.moveActive(`next`);break;case`ArrowUp`:e.preventDefault(),this.moveActive(`prev`);break;case`Home`:e.preventDefault(),this.moveActive(`first`);break;case`End`:e.preventDefault(),this.moveActive(`last`);break;case`Enter`:e.preventDefault(),this.confirmActive();break;case`Escape`:e.preventDefault(),this.close(),this.controlElement?.focus();break}};registerControlElement(e){this.controlElement=e}render(){return Pe(this)}};o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`label`,null),o([a({attribute:!1}),d(`design:type`,Array),d(`design:paramtypes`,[])],Q.prototype,`options`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`placeholder`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`ariaLabel`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`searchable`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`clearable`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`disabled`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`required`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`isInvalid`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`errorMessage`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`errorIcon`,null),o([a({attribute:!1}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`valueInput`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`spacing`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`value`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`isOpen`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`search`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`activeIndex`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],Q.prototype,`receivedFromExternal`,null),Q=o([i(`dcx-web-select`)],Q);var Ie=t`
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
`,Le=t=>e`
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
  `,$=class extends r{#e=[];get steps(){return this.#e}set steps(e){this.#e=e}#t=``;get activeStepId(){return this.#t}set activeStepId(e){this.#t=e}#n=`horizontal`;get orientation(){return this.#n}set orientation(e){this.#n=e}#r=!1;get linear(){return this.#r}set linear(e){this.#r=e}#i=!0;get showStepNumbers(){return this.#i}set showStepNumbers(e){this.#i=e}#a=`m`;get size(){return this.#a}set size(e){this.#a=e}#o=null;get ariaLabel(){return this.#o}set ariaLabel(e){this.#o=e}#s=null;get internalActiveStepId(){return this.#s}set internalActiveStepId(e){this.#s=e}static styles=Ie;connectedCallback(){super.connectedCallback(),this.syncActiveStepId()}updated(e){(e.has(`activeStepId`)||e.has(`steps`))&&this.syncActiveStepId()}get activeStepIndex(){return this.steps.findIndex(e=>e.id===this.internalActiveStepId)}get activeStep(){let e=this.activeStepIndex;return e>=0?this.steps[e]:null}get activeStepContent(){return!!this.activeStep?.contentTpl}get stepperClasses(){return[`dcx-stepper`,`dcx-stepper--${this.orientation}`,`dcx-stepper--${this.size}`].join(` `)}get headerClasses(){return`dcx-stepper__header`}get contentClasses(){return`dcx-stepper__content`}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}syncActiveStepId(){if(this.activeStepId===``||this.activeStepId===null||this.activeStepId===void 0){this.setFirstEnabledStepAsActive();return}this.internalActiveStepId=this.activeStepId}setFirstEnabledStepAsActive(){let e=this.steps.find(e=>!e.disabled);this.internalActiveStepId=e?.id??null}isActive(e){return this.internalActiveStepId===e}getStepClasses(e){return[`dcx-stepper__step`,this.isActive(e.id)?`dcx-stepper__step--active`:``,e.completed?`dcx-stepper__step--completed`:``,e.disabled?`dcx-stepper__step--disabled`:``,e.error?`dcx-stepper__step--error`:``].filter(Boolean).join(` `)}onStepClick(e,t){if(e.disabled||this.linear&&!this.canNavigateToIndex(t))return;let n={previousStepId:this.internalActiveStepId,currentStepId:e.id,previousIndex:this.activeStepIndex,currentIndex:t};this.internalActiveStepId=e.id,this.emit(`stepClick`,e),this.emit(`stepChange`,n)}onStepKeydown(e,t,n){if(e.key===`Enter`||e.key===` `){e.preventDefault(),this.onStepClick(t,n);return}if(e.key===`Home`){e.preventDefault(),this.activateStepAtIndex(this.findFirstEnabledStep());return}if(e.key===`End`){e.preventDefault(),this.activateStepAtIndex(this.findLastEnabledStep());return}this.orientation===`horizontal`?this.navigateByArrowKey(e,n,`ArrowRight`,`ArrowLeft`):this.navigateByArrowKey(e,n,`ArrowDown`,`ArrowUp`)}navigateByArrowKey(e,t,n,r){e.key===n&&(e.preventDefault(),this.activateStepAtIndex(this.findNextEnabledStep(t,1))),e.key===r&&(e.preventDefault(),this.activateStepAtIndex(this.findNextEnabledStep(t,-1)))}activateStepAtIndex(e){e<0||this.onStepClick(this.steps[e],e)}findNextEnabledStep(e,t){let n=e+t;for(;n>=0&&n<this.steps.length;){if(!this.steps[n].disabled)return n;n+=t}return-1}findFirstEnabledStep(){return this.steps.findIndex(e=>!e.disabled)}findLastEnabledStep(){for(let e=this.steps.length-1;e>=0;e--)if(!this.steps[e].disabled)return e;return-1}canNavigateToIndex(e){return e<=this.activeStepIndex||this.steps.slice(0,e).every(e=>e.completed||e.disabled)}render(){return Le(this)}};o([a({attribute:!1}),d(`design:type`,Array),d(`design:paramtypes`,[])],$.prototype,`steps`,null),o([a({attribute:!1}),d(`design:type`,Object),d(`design:paramtypes`,[])],$.prototype,`activeStepId`,null),o([a({type:String}),d(`design:type`,String),d(`design:paramtypes`,[])],$.prototype,`orientation`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],$.prototype,`linear`,null),o([a({type:Boolean}),d(`design:type`,Object),d(`design:paramtypes`,[])],$.prototype,`showStepNumbers`,null),o([a({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],$.prototype,`size`,null),o([a({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],$.prototype,`ariaLabel`,null),o([f(),d(`design:type`,Object),d(`design:paramtypes`,[])],$.prototype,`internalActiveStepId`,null),$=o([i(`dcx-web-stepper`)],$);export{ae as _,I as a,oe as c,_ as d,m as f,re as g,p as h,ge as i,se as l,g as m,Oe as n,P as o,ie as p,_e as r,L as s,ke as t,v as u,h as v};