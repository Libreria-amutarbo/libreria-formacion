import{a as e,l as t,n,t as r}from"./lit-C11zoK0j.js";import{c as i,l as a,n as o,r as s,u as c}from"./dcx-web-button.component-DgDUViKA.js";import{c as l,f as u,l as d,u as f}from"./defaults-DBXV-fV-.js";var p=[`vertical`,`horizontal`],m=[`start`,`center`,`end`],h=[`s`,`m`,`l`,`xl`,`auto`],g=[`top`,`bottom`,`left`,`right`],_=`vertical`,v=`center`,y=[`xs`,`s`,`m`,`l`,`xl`],b=`info-circle`,x=t`
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

  .dcx-input__wrapper,
  .dcx-input__field {
    width: 100%;
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
`,S=t=>e`
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
  `,C=class extends r{#e=`dcx-input-${Math.random().toString(36).substring(2,9)}`;get id(){return this.#e}set id(e){this.#e=e}#t=``;get value(){return this.#t}set value(e){this.#t=e}#n=!1;get disabled(){return this.#n}set disabled(e){this.#n=e}#r=!1;get readonly(){return this.#r}set readonly(e){this.#r=e}#i=``;get placeholder(){return this.#i}set placeholder(e){this.#i=e}#a=d;get type(){return this.#a}set type(e){this.#a=e}#o=``;get name(){return this.#o}set name(e){this.#o=e}#s=!1;get required(){return this.#s}set required(e){this.#s=e}#c=!1;get checked(){return this.#c}set checked(e){this.#c=e}#l=``;get autocomplete(){return this.#l}set autocomplete(e){this.#l=e}#u=``;get inputMode(){return this.#u}set inputMode(e){this.#u=e}#d=!1;get isInvalid(){return this.#d}set isInvalid(e){this.#d=e}#f=``;get label(){return this.#f}set label(e){this.#f=e}#p=``;get hint(){return this.#p}set hint(e){this.#p=e}#m=null;get ariaLabel(){return this.#m}set ariaLabel(e){this.#m=e}#h=null;get ariaDescribedBy(){return this.#h}set ariaDescribedBy(e){this.#h=e}#g=``;get errorMessage(){return this.#g}set errorMessage(e){this.#g=e}#_=l;get requiredMessage(){return this.#_}set requiredMessage(e){this.#_=e}#v=[];get errorMessages(){return this.#v}set errorMessages(e){this.#v=e}#y=b;get errorIcon(){return this.#y}set errorIcon(e){this.#y=e}#b=`xs`;get spacing(){return this.#b}set spacing(e){this.#b=e}#x=`horizontal`;get orientation(){return this.#x}set orientation(e){this.#x=e}#S=!1;get multiple(){return this.#S}set multiple(e){this.#S=e}#C=f.min;get min(){return this.#C}set min(e){this.#C=e}#w=f.max;get max(){return this.#w}set max(e){this.#w=e}#T=f.step;get step(){return this.#T}set step(e){this.#T=e}#E=!1;get showPassword(){return this.#E}set showPassword(e){this.#E=e}#D=!1;get touched(){return this.#D}set touched(e){this.#D=e}static styles=x;get labelId(){return`${this.id}-label`}get errorId(){return`${this.id}-error`}get hintId(){return`${this.id}-hint`}get isPasswordType(){return this.type===u.PASSWORD}get isSearchType(){return this.type===u.SEARCH}get isFileType(){return this.type===u.FILE}get isRadioType(){return this.type===u.RADIO}get isRangeType(){return this.type===u.RANGE}get displayType(){return this.isPasswordType?this.showPassword?`text`:`password`:this.isRangeType?`range`:this.type}get showActionIcon(){return(this.isPasswordType||this.isSearchType)&&!this.readonly}get getInputIcon(){return{[u.TEXT]:null,[u.NUMBER]:`pin`,[u.EMAIL]:`mail`,[u.PASSWORD]:null,[u.SEARCH]:`search`,[u.TEL]:`phone`,[u.URL]:`link`,[u.FILE]:null,[u.RADIO]:null,[u.RANGE]:null}[this.type]??null}get describedBy(){let e=[this.ariaDescribedBy,this.hint&&!this.isInvalid?this.hintId:null,this.isInvalid?this.errorId:null].filter(Boolean).join(` `).trim();return e.length?e:null}get showRequiredWarning(){return this.required&&[``,null,void 0].includes(this.value)&&this.touched}get getActionButtonAriaLabel(){return this.isPasswordType?this.showPassword?`Ocultar contraseña`:`Mostrar contraseña`:this.isSearchType?`Buscar`:``}get getActionButtonIcon(){return this.isPasswordType?this.showPassword?`eye-slash-fill`:`eye-fill`:this.isSearchType?`search`:``}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}formatValueByType(e){switch(this.type){case`number`:return e.replace(/[^0-9.-]/g,``)===``?``:parseFloat(e.replace(/[^0-9.-]/g,``));case`email`:return e.toLowerCase();case`tel`:return e.replace(/[^0-9\s\-()]/g,``);case`search`:return e.trim();case`url`:return e.toLowerCase();default:return e}}onInputChange(e){if(this.isRadioType||this.isFileType)return;let t=e.target,n=this.formatValueByType(t.value);this.value=n,this.emit(`valueChange`,n)}onChangeEvent(e){this.isFileType||this.isRadioType&&e.target.checked&&this.emit(`valueChange`,this.value)}onFocusEvent(){this.touched=!1,this.emit(`focusEvent`)}onBlurEvent(){this.touched=!0,this.emit(`blurEvent`)}togglePasswordVisibility(){this.showPassword=!this.showPassword}onActionButtonClick(){if(this.isPasswordType){this.togglePasswordVisibility();return}this.isSearchType&&this.emit(`valueChange`,this.value)}getInputClasses(){let e=[`dcx-input__control`,`dcx-input__control--${this.spacing}`];return this.disabled&&e.push(`is-disabled`,`dcx-input__control--disabled`),this.isInvalid&&e.push(`is-invalid`,`dcx-input__control--invalid`),this.getInputIcon&&e.push(`has-icon`,`dcx-input__control--has-icon`),this.showActionIcon&&e.push(`has-action`,`dcx-input__control--has-action`),e.join(` `)}render(){return S(this)}};o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`id`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`value`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`disabled`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`readonly`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`placeholder`,null),o([a({type:String}),s(`design:type`,u===void 0?Object:u),s(`design:paramtypes`,[])],C.prototype,`type`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`name`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`required`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`checked`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`autocomplete`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`inputMode`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`isInvalid`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`label`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`hint`,null),o([a({type:String,attribute:`aria-label`}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`ariaLabel`,null),o([a({type:String,attribute:`aria-describedby`}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`ariaDescribedBy`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`errorMessage`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`requiredMessage`,null),o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],C.prototype,`errorMessages`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`errorIcon`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`spacing`,null),o([a({type:String,reflect:!0}),s(`design:type`,String),s(`design:paramtypes`,[])],C.prototype,`orientation`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`multiple`,null),o([a({type:Number}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`min`,null),o([a({type:Number}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`max`,null),o([a({type:Number}),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`step`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`showPassword`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],C.prototype,`touched`,null),C=o([c(`dcx-web-input`)],C);var w=t=>e`
  <ul
    id="${t.id||``}"
    class="dcx-list-container"
    role="${t.listRole}"
    aria-label="${t.ariaLabel}"
    aria-multiselectable="${t.multiselectable??n}"
    @dragover="${e=>t._onDragOver(e)}"
    @drop="${e=>t._onDrop(e)}"
  >
    ${t.items.map((r,i)=>{let a=t.resolveAriaSelected(r,i)===!0;return r.divider?e`
              <li
                class="dcx-list-divider"
                role="separator"
              ></li>
            `:e`
              <li
                  class="${t.getItemClasses(r,i)}"
                  data-index="${i}"
                  draggable="${t.dragEnabled&&!t.dragDisabled(r)?`true`:`false`}"
                  @dragstart="${e=>t._onDragStart(e,r,i)}"
                  @dragend="${()=>t._onDragEnd()}"
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

                        ${a?e`<dcx-web-icon class="dcx-list-selected-icon" name="check-lg" aria-label="Seleccionado"></dcx-web-icon>`:n}

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
`,T=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
    --list-bg-hover: var(--bg-hover, #f7f8fa);
    --list-bg-selected: var(--color-info-bg, #eff6ff);
    --list-text-selected: var(--color-info, #0058ab);
    --list-border-selected: rgba(0, 88, 171, 0.2);
    --list-border-radius: var(--r-md, 6px);
    --list-spacing: var(--sp-3, 12px);
    --list-item-gap: var(--sp-4, 16px);
    --list-font-size: var(--fs-sm, 12px);
    --list-icon-size: 1.2rem;
    --list-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --list-divider-color: var(--bg-pressed, #e1e3e6);
    --list-icon-bg: var(--bg-hover, #f3f4f6);
  }

  :host(.dcx-picklist-list) {
    --list-bg-selected: var(--dcx-picklist-selected-bg, #eff6ff);
    --list-text-selected: var(--dcx-picklist-selected-color, #0058ab);
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
    background-color: var(--list-bg-selected, #eff6ff);
    border: 1px solid var(--list-border-selected, rgba(0, 88, 171, 0.2));
    box-shadow: inset 3px 0 0 var(--bg-primary, #0058ab);
  }

  .dcx-list-item.selected .dcx-list-text {
    color: var(--list-text-selected, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-list-item.selected .dcx-list-description {
    color: var(--list-text-selected, #0058ab);
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

  .dcx-list-item.selected .dcx-list-selected-icon {
    color: var(--bg-primary, #0058ab);
    flex-shrink: 0;
    margin-left: auto;
    font-size: 1.1rem;
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
`,E=class extends r{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=!1;get selectable(){return this.#t}set selectable(e){this.#t=e}#n=!1;get multiSelect(){return this.#n}set multiSelect(e){this.#n=e}#r=!1;get showChildrenIndicator(){return this.#r}set showChildrenIndicator(e){this.#r=e}#i=!0;get renderChildren(){return this.#i}set renderChildren(e){this.#i=e}#a=null;get itemTemplate(){return this.#a}set itemTemplate(e){this.#a=e}#o=``;get id(){return this.#o}set id(e){this.#o=e}#s=`Lista de elementos`;get ariaLabel(){return this.#s}set ariaLabel(e){this.#s=e}#c=`list`;get listRole(){return this.#c}set listRole(e){this.#c=e}#l=`listitem`;get itemRole(){return this.#l}set itemRole(e){this.#l=e}#u=null;get multiselectable(){return this.#u}set multiselectable(e){this.#u=e}#d=!1;get externalSelection(){return this.#d}set externalSelection(e){this.#d=e}#f=null;get isItemSelected(){return this.#f}set isItemSelected(e){this.#f=e}#p=!1;get dropList(){return this.#p}set dropList(e){this.#p=e}#m=[];get dropListData(){return this.#m}set dropListData(e){this.#m=e}#h=null;get dropListConnectedTo(){return this.#h}set dropListConnectedTo(e){this.#h=e}#g=!1;get dropListDisabled(){return this.#g}set dropListDisabled(e){this.#g=e}#_=!1;get dragEnabled(){return this.#_}set dragEnabled(e){this.#_=e}#v=e=>!1;get dragDisabled(){return this.#v}set dragDisabled(e){this.#v=e}#y=[];get selectedIndices(){return this.#y}set selectedIndices(e){this.#y=e}static styles=T;_dragPayload=null;_listId=``;emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_ensureListId(){return this._listId||=this.id||`dcx-web-list-${Math.random().toString(36).slice(2,9)}`,this._listId}_onDragStart(e,t,n){if(!e.dataTransfer)return;this._ensureListId();let r={id:t.id??n,index:n,sourceListId:this._listId,sourceData:[...this.items]};this._dragPayload=r;try{e.dataTransfer.setData(`application/dcx-list-item`,JSON.stringify({id:t.id??n})),e.dataTransfer.setData(`application/dcx-list-source`,this._listId),e.dataTransfer.setData(`application/dcx-list-payload`,JSON.stringify(r))}catch{}e.dataTransfer.effectAllowed=`move`,this.emit(`dragStart`,{item:t,index:n,listId:this._listId})}_onDragOver(e){e.dataTransfer&&(e.preventDefault(),e.dataTransfer.dropEffect=`move`)}_onDrop(e){if(!e.dataTransfer)return;e.preventDefault();let t=this._ensureListId(),n=e.composedPath().find(e=>e?.hasAttribute&&e.hasAttribute(`data-index`)),r=n?Number(n.getAttribute(`data-index`)):this.items.length,i=this._dragPayload;if(!i){let t=e.dataTransfer.getData(`application/dcx-list-payload`);if(t)try{i=JSON.parse(t)}catch{i=null}}if(!i)return;let a={previousContainer:{id:i.sourceListId||e.dataTransfer.getData(`application/dcx-list-source`)||this._listId,data:i.sourceData??[...this.items]},container:{id:t,data:[...this.items]},previousIndex:i.index,currentIndex:r};this.emit(`dropListDropped`,a),this._dragPayload=null}_onDragEnd(){this._dragPayload=null,this.emit(`dragEnd`)}getChildren(e){return e.children??[]}isSelected(e){return this.selectable?this.selectedIndices.includes(e):!1}resolveAriaSelected(e,t){return this.isItemSelected?this.isItemSelected(e,t):this.selectable&&!this.externalSelection?this.isSelected(t):null}onItemClick(e,t){if(!(!this.selectable||e.disabled||e.divider)){if(this.externalSelection){this.emit(`itemSelected`,{item:e,index:t});return}if(this.multiSelect){this.isSelected(t)?(this.selectedIndices=this.selectedIndices.filter(e=>e!==t),this.emit(`itemDeselected`,{item:e,index:t})):(this.selectedIndices=[...this.selectedIndices,t],this.emit(`itemSelected`,{item:e,index:t}));return}if(this.isSelected(t)){this.selectedIndices=[],this.emit(`itemDeselected`,{item:e,index:t});return}this.selectedIndices=[t],this.emit(`itemSelected`,{item:e,index:t})}}onKeydown(e,t,n){let r=this.getChildren(t);(e.key===`Enter`||e.key===` `)&&!t.disabled&&(e.preventDefault(),this.onItemClick(t,n)),e.key===`ArrowRight`&&r.length&&(e.preventDefault(),e.currentTarget.querySelector(`.dcx-list-nested [tabindex="0"]`)?.focus()),e.key===`ArrowLeft`&&(e.preventDefault(),(e.currentTarget.closest(`.dcx-list-nested`)?.closest(`li`))?.focus())}getItemClasses(e,t){let n=[`dcx-list-item`],r=this.isItemSelected?this.isItemSelected(e,t):this.isSelected(t);return this.selectable&&n.push(`selectable`),r&&n.push(`selected`),e.disabled&&n.push(`disabled`),e.children&&e.children.length&&n.push(`has-children`),e.variant===`danger`&&n.push(`danger`),n.join(` `)}render(){return w(this)}};o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],E.prototype,`items`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`selectable`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`multiSelect`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`showChildrenIndicator`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`renderChildren`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`itemTemplate`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`id`,null),o([a({type:String,attribute:`aria-label`}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`ariaLabel`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`listRole`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`itemRole`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`multiselectable`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`externalSelection`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`isItemSelected`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`dropList`,null),o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],E.prototype,`dropListData`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`dropListConnectedTo`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`dropListDisabled`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`dragEnabled`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],E.prototype,`dragDisabled`,null),o([i(),s(`design:type`,Array),s(`design:paramtypes`,[])],E.prototype,`selectedIndices`,null),E=o([c(`dcx-web-list`)],E);var D=t=>e`
  <div class="dcx-picklist ${t.responsive?`dcx-picklist--responsive`:``} ${t.disabled?`dcx-picklist--disabled`:``} ${t.dragdrop?`dcx-picklist--dragdrop`:``}">
    ${t.showSourceControls?e`
      <div class="dcx-picklist__reorder-controls dcx-picklist__reorder-controls--source" aria-label="Reordenar disponibles">
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-up" aria-label="Mover arriba los seleccionados del origen" ?disabled="${t.disabled||!t.selectedSourceIds.length}" @click="${()=>t.moveTop(`source`)}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-up" aria-label="Mover uno arriba los seleccionados del origen" ?disabled="${t.disabled||!t.selectedSourceIds.length}" @click="${()=>t.moveUp(`source`)}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-down" aria-label="Mover uno abajo los seleccionados del origen" ?disabled="${t.disabled||!t.selectedSourceIds.length}" @click="${()=>t.moveDown(`source`)}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-down" aria-label="Mover abajo los seleccionados del origen" ?disabled="${t.disabled||!t.selectedSourceIds.length}" @click="${()=>t.moveBottom(`source`)}"></dcx-web-button>
      </div>
    `:n}

    <div class="dcx-picklist__panel dcx-picklist__panel--source">
      <header class="dcx-picklist__header" id="${t.sourceHeadingId}">
        <h3>${t.sourceHeader}</h3>
        <span>${t.sourceItems.length}</span>
      </header>

      ${t.showSourceFilter?e`<div class="dcx-picklist__filter"><dcx-web-input type="search" aria-label="${t.sourceFilterPlaceholder}" placeholder="${t.sourceFilterPlaceholder}" @input="${e=>t.onFilterChange(`source`,e.target?.value)}"></dcx-web-input></div>`:n}

      <div class="dcx-picklist__list-wrap" style="max-height:${t.listScrollHeight}; overflow:auto;">
        <dcx-web-list
          class="dcx-picklist__list dcx-picklist__list--source"
          id="${t.sourceListId}"
          .items="${t.visibleSourceItems}"
          .selectable="${!0}"
          .externalSelection="${!0}"
          .isItemSelected="${e=>t.selectedSourceIds.includes(e.id)}"
          .itemTemplate="${t.itemTemplate?e=>t.itemTemplate?.({item:e.item,index:e.index,selected:e.selected,side:`source`}):null}"
          .dragEnabled="${t.dragdrop}"
          .dropListData="${t.sourceItems}"
          @itemSelected="${e=>t.onWebListSelect(e,`source`)}"
          @itemDeselected="${e=>t.onWebListDeselect(e,`source`)}"
          @dropListDropped="${e=>t.onWebListDrop(e,`source`)}"
        ></dcx-web-list>

        ${t.visibleSourceItems.length===0?e`<p class="dcx-picklist__empty">${t.sourceQuery?`Sin resultados`:`No hay elementos disponibles`}</p>`:n}
      </div>
    </div>

    <div class="dcx-picklist__transfer-controls" aria-label="Transferir elementos">
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-right" aria-label="Mover seleccionados al destino" ?disabled="${t.disabled||!t.selectedSourceIds.length}" @click="${()=>t.moveSelectedToTarget()}"></dcx-web-button>
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-right" aria-label="Mover todos al destino" ?disabled="${t.disabled||!t.sourceItems.length}" @click="${()=>t.moveEveryItemToTarget()}"></dcx-web-button>
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-left" aria-label="Mover seleccionados al origen" ?disabled="${t.disabled||!t.selectedTargetIds.length}" @click="${()=>t.moveSelectedToSource()}"></dcx-web-button>
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-left" aria-label="Mover todos al origen" ?disabled="${t.disabled||!t.targetItems.length}" @click="${()=>t.moveEveryItemToSource()}"></dcx-web-button>
    </div>

    <div class="dcx-picklist__panel dcx-picklist__panel--target">
      <header class="dcx-picklist__header" id="${t.targetHeadingId}">
        <h3>${t.targetHeader}</h3>
        <span>${t.targetItems.length}</span>
      </header>

      ${t.showTargetFilter?e`<div class="dcx-picklist__filter"><dcx-web-input type="search" aria-label="${t.targetFilterPlaceholder}" placeholder="${t.targetFilterPlaceholder}" @input="${e=>t.onFilterChange(`target`,e.target?.value)}"></dcx-web-input></div>`:n}

      <div class="dcx-picklist__list-wrap" style="max-height:${t.listScrollHeight}; overflow:auto;">
        <dcx-web-list
          class="dcx-picklist__list dcx-picklist__list--target"
          id="${t.targetListId}"
          .items="${t.visibleTargetItems}"
          .selectable="${!0}"
          .externalSelection="${!0}"
          .isItemSelected="${e=>t.selectedTargetIds.includes(e.id)}"
          .itemTemplate="${t.itemTemplate?e=>t.itemTemplate?.({item:e.item,index:e.index,selected:e.selected,side:`target`}):null}"
          .dragEnabled="${t.dragdrop}"
          .dropListData="${t.targetItems}"
          @itemSelected="${e=>t.onWebListSelect(e,`target`)}"
          @itemDeselected="${e=>t.onWebListDeselect(e,`target`)}"
          @dropListDropped="${e=>t.onWebListDrop(e,`target`)}"
        ></dcx-web-list>

        ${t.visibleTargetItems.length===0?e`<p class="dcx-picklist__empty">${t.targetQuery?`Sin resultados`:`No hay elementos seleccionados`}</p>`:n}
      </div>
    </div>

    ${t.showTargetControls?e`
      <div class="dcx-picklist__reorder-controls dcx-picklist__reorder-controls--target" aria-label="Reordenar seleccionados">
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-up" aria-label="Mover arriba los seleccionados del destino" ?disabled="${t.disabled||!t.selectedTargetIds.length}" @click="${()=>t.moveTop(`target`)}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-up" aria-label="Mover uno arriba los seleccionados del destino" ?disabled="${t.disabled||!t.selectedTargetIds.length}" @click="${()=>t.moveUp(`target`)}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-down" aria-label="Mover uno abajo los seleccionados del destino" ?disabled="${t.disabled||!t.selectedTargetIds.length}" @click="${()=>t.moveDown(`target`)}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-down" aria-label="Mover abajo los seleccionados del destino" ?disabled="${t.disabled||!t.selectedTargetIds.length}" @click="${()=>t.moveBottom(`target`)}"></dcx-web-button>
      </div>
    `:n}
  </div>
`,O=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
    color: var(--text-dark, #2a2e33);
    --dcx-picklist-gap: var(--sp-4, 16px);
    --dcx-picklist-panel-bg: var(--bg-default, #ffffff);
    --dcx-picklist-panel-border: var(--border-light, #d1d5db);
    --dcx-picklist-muted: var(--text-muted, #696e75);
    --dcx-picklist-radius: var(--r-lg, 8px);
    --dcx-picklist-item-radius: var(--r-md, 6px);
    --dcx-picklist-selected-bg: var(--color-info-bg, #eff6ff);
    --dcx-picklist-selected-color: var(--color-info, #0058ab);
    --dcx-picklist-focus: var(--border-focus, #1db8f2);
  }

  .dcx-picklist {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto minmax(0, 1fr) auto;
    gap: var(--dcx-picklist-gap);
    align-items: center;
  }

  .dcx-picklist--disabled {
    opacity: 0.72;
  }

  .dcx-picklist__panel {
    min-width: 0;
    border: 1px solid var(--dcx-picklist-panel-border);
    border-radius: var(--dcx-picklist-radius);
    background: var(--dcx-picklist-panel-bg);
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06));
    overflow: hidden;
  }

  .dcx-picklist__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3, 12px);
    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    border-bottom: 1px solid var(--dcx-picklist-panel-border);
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-picklist__header h3 {
    margin: 0;
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.3;
  }

  .dcx-picklist__header span {
    min-width: 1.75rem;
    padding: 2px 8px;
    border-radius: var(--r-pill, 999px);
    background: var(--bg-default, #ffffff);
    color: var(--dcx-picklist-muted);
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    text-align: center;
  }

  .dcx-picklist__filter {
    padding: var(--sp-2, 8px) var(--sp-3, 12px);
    border-bottom: 1px solid var(--dcx-picklist-panel-border);
  }

  .dcx-picklist__filter dcx-web-input {
    display: block;
    width: 100%;
  }

  .dcx-picklist__list-wrap {
    position: relative;
    min-height: 3.5rem;
  }

  .dcx-picklist__empty {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: var(--sp-1, 4px);
    color: var(--dcx-picklist-muted);
    font-size: var(--fs-sm, 12px);
    text-align: center;
    pointer-events: none;
  }

  .dcx-picklist__reorder-controls,
  .dcx-picklist__transfer-controls {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 8px);
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
  }

  .dcx-picklist__reorder-controls dcx-web-button,
  .dcx-picklist__transfer-controls dcx-web-button {
    display: inline-flex;
    width: 2.25rem;
    height: 2.25rem;
  }

  .dcx-picklist__panel--source,
  .dcx-picklist__panel--target {
    min-width: 0;
  }

  .dcx-picklist__list {
    --list-bg-selected: var(--dcx-picklist-selected-bg, #eff6ff);
    --list-text-selected: var(--dcx-picklist-selected-color, #0058ab);
  }

  .dcx-picklist__list dcx-web-list {
    --list-bg-selected: var(--dcx-picklist-selected-bg, #eff6ff);
    --list-text-selected: var(--dcx-picklist-selected-color, #0058ab);
  }

  @media (max-width: 900px) {
    .dcx-picklist {
      grid-template-columns: 1fr;
    }

    .dcx-picklist__reorder-controls,
    .dcx-picklist__transfer-controls {
      flex-direction: row;
    }
  }
`,k,A=class extends r{static{k=this}static styles=O;static nextId=0;instanceId=`dcx-picklist-${k.nextId++}`;sourceHeadingId=`${this.instanceId}-source-heading`;targetHeadingId=`${this.instanceId}-target-heading`;sourceListId=`${this.instanceId}-source-list`;targetListId=`${this.instanceId}-target-list`;#e=[];get source(){return this.#e}set source(e){this.#e=e}#t=[];get target(){return this.#t}set target(e){this.#t=e}#n=`Disponibles`;get sourceHeader(){return this.#n}set sourceHeader(e){this.#n=e}#r=`Seleccionados`;get targetHeader(){return this.#r}set targetHeader(e){this.#r=e}#i=``;get filterBy(){return this.#i}set filterBy(e){this.#i=e}#a=!1;get showSourceFilter(){return this.#a}set showSourceFilter(e){this.#a=e}#o=!1;get showTargetFilter(){return this.#o}set showTargetFilter(e){this.#o=e}#s=`Filtrar disponibles`;get sourceFilterPlaceholder(){return this.#s}set sourceFilterPlaceholder(e){this.#s=e}#c=`Filtrar seleccionados`;get targetFilterPlaceholder(){return this.#c}set targetFilterPlaceholder(e){this.#c=e}#l=!1;get dragdrop(){return this.#l}set dragdrop(e){this.#l=e}#u=null;get itemTemplate(){return this.#u}set itemTemplate(e){this.#u=e}#d=`14rem`;get listScrollHeight(){return this.#d}set listScrollHeight(e){this.#d=e}#f=!0;get responsive(){return this.#f}set responsive(e){this.#f=e}#p=!1;get disabled(){return this.#p}set disabled(e){this.#p=e}#m=!0;get showSourceControls(){return this.#m}set showSourceControls(e){this.#m=e}#h=!0;get showTargetControls(){return this.#h}set showTargetControls(e){this.#h=e}#g=!1;get keepSelection(){return this.#g}set keepSelection(e){this.#g=e}#_=[];get sourceItems(){return this.#_}set sourceItems(e){this.#_=e}#v=[];get targetItems(){return this.#v}set targetItems(e){this.#v=e}#y=``;get sourceQuery(){return this.#y}set sourceQuery(e){this.#y=e}#b=``;get targetQuery(){return this.#b}set targetQuery(e){this.#b=e}#x=[];get selectedSourceIds(){return this.#x}set selectedSourceIds(e){this.#x=e}#S=[];get selectedTargetIds(){return this.#S}set selectedTargetIds(e){this.#S=e}#C=0;get focusedSourceIndex(){return this.#C}set focusedSourceIndex(e){this.#C=e}#w=0;get focusedTargetIndex(){return this.#w}set focusedTargetIndex(e){this.#w=e}constructor(){super(),this.sourceItems=[...this.source],this.targetItems=[...this.target]}connectedCallback(){super.connectedCallback(),this.syncListsFromProperties()}willUpdate(e){super.willUpdate(e),e.has(`source`)&&(this.sourceItems=[...this.source]),e.has(`target`)&&(this.targetItems=[...this.target])}syncListsFromProperties(){this.sourceItems=[...this.source],this.targetItems=[...this.target]}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}filterItems(e,t){let n=t.trim().toLocaleLowerCase();if(!n)return e;let r=this.filterBy.split(`,`).map(e=>e.trim()).filter(Boolean),i=r.length?r:[`label`,`description`];return e.filter(e=>i.some(t=>String(e[t]??``).toLocaleLowerCase().includes(n)))}get visibleSourceItems(){return this.filterItems(this.sourceItems,this.sourceQuery)}get visibleTargetItems(){return this.filterItems(this.targetItems,this.targetQuery)}isSelected(e,t){return e.id==null?!1:t===`source`?this.selectedSourceIds.includes(e.id):this.selectedTargetIds.includes(e.id)}isItemDisabled(e){return this.disabled||e.disabled===!0}onWebListSelect(e,t){let{item:n}=e.detail;this.toggleItem(n,t,e)}onWebListDeselect(e,t){let{item:n}=e.detail;this.toggleItem(n,t,e)}onWebListDrop(e,t){let n=e.detail,r=n.previousContainer?.id===this.targetListId?`target`:`source`;if(n.previousContainer?.id===n.container?.id){let e=this.getList(t),r=(n.previousContainer?.data||[])[n.previousIndex];if(!r)return;let i=this.reorderVisibleDrop(e,n.previousContainer?.data||[],r,n.currentIndex);this.setList(t,i),this.emitReorder(t),this.emitChanges();return}let i=(n.previousContainer?.data||[])[n.previousIndex];if(!i||this.isItemDisabled(i))return;let a=r,o=this.getList(a).filter(e=>e.id!==i.id),s=this.insertVisibleDrop(this.getList(t),n.container?.data||[],i,n.currentIndex);this.setList(a,o),this.setList(t,s),this.emitMove(a,[i],!1),this.emitChanges()}toggleItem(e,t,n){if(this.disabled||this.isItemDisabled(e)||e.id==null)return;let r=t===`source`?this.selectedSourceIds:this.selectedTargetIds;if(r.includes(e.id)){let n=r.filter(t=>t!==e.id);t===`source`?this.selectedSourceIds=n:this.selectedTargetIds=n}else{let n=[...r,e.id];t===`source`?this.selectedSourceIds=n:this.selectedTargetIds=n}this.emitSelection(t,n)}reorderVisibleDrop(e,t,n,r){let i=e.filter(e=>e.id!==n.id),a=t.filter(e=>e.id!==n.id),o=this.resolveFullInsertIndex(i,a,r);return i.splice(o,0,n),i}insertVisibleDrop(e,t,n,r){let i=this.resolveFullInsertIndex(e,t,r),a=[...e];return a.splice(i,0,n),a}resolveFullInsertIndex(e,t,n){let r=Math.max(0,Math.min(n,t.length));if(r<t.length){let n=t[r],i=this.findItemIndex(e,n);return i===-1?e.length:i}if(t.length>0){let n=t[t.length-1],r=this.findItemIndex(e,n);return r===-1?e.length:r+1}return e.length}findItemIndex(e,t){return e.findIndex(e=>e.id===t.id)}moveSelectedToTarget(){this.transferSelected(`source`)}moveSelectedToSource(){this.transferSelected(`target`)}moveEveryItemToTarget(){this.transferAll(`source`)}moveEveryItemToSource(){this.transferAll(`target`)}moveUp(e){this.reorderSelected(e,`up`)}moveDown(e){this.reorderSelected(e,`down`)}moveTop(e){this.reorderSelected(e,`top`)}moveBottom(e){this.reorderSelected(e,`bottom`)}transferSelected(e){if(this.disabled)return;let t=e===`source`?this.selectedSourceIds:this.selectedTargetIds,n=this.getList(e).filter(e=>t.includes(e.id)&&!this.isItemDisabled(e));n.length&&(this.applyTransfer(e,n),this.emitMove(e,n,!1))}transferAll(e){if(this.disabled)return;let t=this.getList(e).filter(e=>!this.isItemDisabled(e));t.length&&(this.applyTransfer(e,t),this.emitMove(e,t,!0))}applyTransfer(e,t){let n=t.map(e=>e.id),r=e===`source`?`target`:`source`,i=this.getList(e).filter(e=>!n.includes(e.id)),a=[...this.getList(r),...t];this.setList(e,i),this.setList(r,a),this.keepSelection||(e===`source`?this.selectedSourceIds=[]:this.selectedTargetIds=[]),this.emitChanges()}reorderSelected(e,t){if(this.disabled)return;let n=this.getList(e),r=e===`source`?this.selectedSourceIds:this.selectedTargetIds,i=new Set(r.filter(e=>{let t=n.find(t=>t.id===e);return t?!this.isItemDisabled(t):!1}));if(i.size===0)return;let a=n.filter(e=>i.has(e.id)),o=n.filter(e=>!i.has(e.id)),s=[...n];t===`top`?s=[...a,...o]:t===`bottom`?s=[...o,...a]:t===`up`?s=this.moveSelectionByOne(n,i,-1):t===`down`&&(s=this.moveSelectionByOne(n,i,1)),this.setList(e,s),this.emitReorder(e),this.emitChanges()}moveSelectionByOne(e,t,n){let r=[...e],i=e.map((e,n)=>t.has(e.id)?n:-1).filter(e=>e>=0),a=n===1?[...i].reverse():i;for(let e of a){let i=e+n;if(i<0||i>=r.length||t.has(r[i].id))continue;let a=r[e];r[e]=r[i],r[i]=a}return r}emitSelection(e,t){let n={originalEvent:t,side:e,items:this.getList(e).filter(t=>this.isSelected(t,e))};e===`source`?this.emit(`sourceSelect`,n):this.emit(`targetSelect`,n)}emitMove(e,t,n){let r={items:t,source:this.sourceItems,target:this.targetItems};e===`source`?n?this.emit(`moveAllToTarget`,r):this.emit(`moveToTarget`,r):n?this.emit(`moveAllToSource`,r):this.emit(`moveToSource`,r)}emitReorder(e){let t={side:e,items:this.getList(e)};e===`source`?this.emit(`sourceReorder`,t):this.emit(`targetReorder`,t)}emitChanges(){this.emit(`sourceChange`,this.sourceItems),this.emit(`targetChange`,this.targetItems)}getList(e){return e===`source`?this.sourceItems:this.targetItems}setList(e,t){e===`source`?this.sourceItems=t:this.targetItems=t}onFilterChange(e,t){let n=`${t??``}`;if(e===`source`){this.sourceQuery=n,this.emit(`sourceFilter`,{query:n,value:this.visibleSourceItems,side:e});return}this.targetQuery=n,this.emit(`targetFilter`,{query:n,value:this.visibleTargetItems,side:e})}render(){return D(this)}};o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],A.prototype,`source`,null),o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],A.prototype,`target`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`sourceHeader`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`targetHeader`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`filterBy`,null),o([a({type:Boolean,attribute:`show-source-filter`}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`showSourceFilter`,null),o([a({type:Boolean,attribute:`show-target-filter`}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`showTargetFilter`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`sourceFilterPlaceholder`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`targetFilterPlaceholder`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`dragdrop`,null),o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`itemTemplate`,null),o([a({type:String,attribute:`scroll-height`}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`listScrollHeight`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`responsive`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`disabled`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`showSourceControls`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`showTargetControls`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`keepSelection`,null),o([i(),s(`design:type`,Array),s(`design:paramtypes`,[])],A.prototype,`sourceItems`,null),o([i(),s(`design:type`,Array),s(`design:paramtypes`,[])],A.prototype,`targetItems`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`sourceQuery`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`targetQuery`,null),o([i(),s(`design:type`,typeof Array>`u`?Object:Array),s(`design:paramtypes`,[])],A.prototype,`selectedSourceIds`,null),o([i(),s(`design:type`,typeof Array>`u`?Object:Array),s(`design:paramtypes`,[])],A.prototype,`selectedTargetIds`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`focusedSourceIndex`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],A.prototype,`focusedTargetIndex`,null),A=k=o([c(`dcx-web-picklist`),s(`design:paramtypes`,[])],A);export{p as a,y as c,_ as i,m as n,g as o,b as r,h as s,v as t};