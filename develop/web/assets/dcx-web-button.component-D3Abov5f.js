import{a as e,c as t,i as n,l as r,n as i,s as a,t as o}from"./lit-C11zoK0j.js";var s=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},c={attribute:!0,type:String,converter:t,reflect:!1,hasChanged:a},l=(e=c,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function u(e){return(t,n)=>typeof n==`object`?l(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function d(e){return u({...e,state:!0,attribute:!1})}var f={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},p=e=>(...t)=>({_$litDirective$:e,values:t}),m=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},h=p(class extends m{constructor(e){if(super(e),e.type!==f.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let r=e.element.classList;for(let e of this.st)e in t||(r.remove(e),this.st.delete(e));for(let e in t){let n=!!t[e];n===this.st.has(e)||this.nt?.has(e)||(n?(r.add(e),this.st.add(e)):(r.remove(e),this.st.delete(e)))}return n}});function g(e,t){if(typeof Reflect==`object`&&typeof Reflect.metadata==`function`)return Reflect.metadata(e,t)}function _(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var v=r`
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
`,y=e=>e??i,b=t=>{let n=t.variant===`icon-only`,r=t.iconName||(t.icon?`star-fill`:``),a={"dcx-button":!0,[`dcx-button--${t.variant}`]:!0,[`dcx-button--${t.isCheckbox?`checkbox`:t.size}`]:!0,"dcx-button--icon-only":n,[`dcx-button--icon-${t.iconPosition}`]:!!t.iconPosition,"dcx-button--pressed":t.pressed,"dcx-button--hover":t.hover,"dcx-button--focused":t.focused,"dcx-button--checkbox":t.isCheckbox,[`dcx-button--checkbox-error--${t.variant}`]:t.isCheckbox&&t.checkboxError,[t.extraClass]:!!t.extraClass},o=t.iconSize??t.size,s=t.label&&!n?void 0:t.ariaLabel||t.label||`Button`,c=(n,r)=>{let i=`https://unpkg.com/bootstrap-icons@1.11.3/icons/${n}.svg`;return e`
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
      class="${h(a)}"
      aria-label="${y(s)}"
      aria-pressed="${t.pressed||i}"
      role="${t.isCheckbox?`checkbox`:i}"
      aria-checked="${t.isCheckbox?y(t.ariaChecked??void 0):i}"
      @click="${t.handleClick}"
    >
      ${r&&(t.iconPosition===`left`||t.iconPosition===`top`)?c(r,`dcx-button__icon--${t.iconPosition}`):i}

      ${t.label&&!n?e`<span class="dcx-button__label">${t.label}</span>`:i}

      ${t.iconRightName?c(t.iconRightName,`dcx-button__icon--right`):i}

      ${r&&(t.iconPosition===`right`&&!t.iconRightName||t.iconPosition===`bottom`)?c(r,`dcx-button__icon--${t.iconPosition}`):i}

      <slot name="dcx-icon"></slot>
      <slot name="button-trailing"></slot>
    </button>
  `},x=class extends o{#e=``;get label(){return this.#e}set label(e){this.#e=e}#t=``;get ariaLabel(){return this.#t}set ariaLabel(e){this.#t=e}#n=`button`;get type(){return this.#n}set type(e){this.#n=e}#r=!1;get disabled(){return this.#r}set disabled(e){this.#r=e}#i=!1;get pressed(){return this.#i}set pressed(e){this.#i=e}#a=!1;get hover(){return this.#a}set hover(e){this.#a=e}#o=!1;get focused(){return this.#o}set focused(e){this.#o=e}#s=`primary`;get variant(){return this.#s}set variant(e){this.#s=e}#c=`m`;get size(){return this.#c}set size(e){this.#c=e}#l=``;get extraClass(){return this.#l}set extraClass(e){this.#l=e}#u=!1;get isCheckbox(){return this.#u}set isCheckbox(e){this.#u=e}#d=!1;get checkboxError(){return this.#d}set checkboxError(e){this.#d=e}#f=null;get ariaChecked(){return this.#f}set ariaChecked(e){this.#f=e}#p=!1;get icon(){return this.#p}set icon(e){this.#p=e}#m=``;get iconName(){return this.#m}set iconName(e){this.#m=e}#h=void 0;get iconSize(){return this.#h}set iconSize(e){this.#h=e}#g=`none`;get iconSpacing(){return this.#g}set iconSpacing(e){this.#g=e}#_=``;get iconColor(){return this.#_}set iconColor(e){this.#_=e}#v=`left`;get iconPosition(){return this.#v}set iconPosition(e){this.#v=e}#y=``;get iconRightName(){return this.#y}set iconRightName(e){this.#y=e}static styles=v;handleClick(e){if(this.disabled){e.preventDefault(),e.stopPropagation();return}this.dispatchEvent(new CustomEvent(`buttonClick`,{detail:{clicked:!0},bubbles:!0,composed:!0}))}render(){return b(this)}};_([u({type:String}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`label`,null),_([u({type:String,attribute:`aria-label`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`ariaLabel`,null),_([u({type:String}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`type`,null),_([u({type:Boolean}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`disabled`,null),_([u({type:Boolean}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`pressed`,null),_([u({type:Boolean}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`hover`,null),_([u({type:Boolean}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`focused`,null),_([u({type:String}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`variant`,null),_([u({type:String}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`size`,null),_([u({type:String,attribute:`class`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`extraClass`,null),_([u({type:Boolean,attribute:`is-checkbox`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`isCheckbox`,null),_([u({type:Boolean,attribute:`checkbox-error`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`checkboxError`,null),_([u({type:String,attribute:`aria-checked`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`ariaChecked`,null),_([u({type:Boolean}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`icon`,null),_([u({type:String,attribute:`icon-name`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`iconName`,null),_([u({type:String,attribute:`icon-size`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`iconSize`,null),_([u({type:String,attribute:`icon-spacing`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`iconSpacing`,null),_([u({type:String,attribute:`icon-color`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`iconColor`,null),_([u({type:String,attribute:`icon-position`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`iconPosition`,null),_([u({type:String,attribute:`icon-right-name`}),g(`design:type`,Object),g(`design:paramtypes`,[])],x.prototype,`iconRightName`,null),x=_([s(`dcx-web-button`)],x);export{p as a,d as c,h as i,u as l,_ as n,m as o,g as r,f as s,y as t,s as u};