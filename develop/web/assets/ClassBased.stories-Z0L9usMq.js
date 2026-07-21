import{a as e,l as t,n,t as r}from"./lit-LoFRC6vp.js";import{C as i,S as a,_ as o,v as s,x as c}from"./defaults-DUNPOyan.js";import"./src-DFT7Sogt.js";var l=[`small`,`medium`,`large`];function u(t){return e`
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
  `}var d=t`
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
`,f=class extends r{#e=4;get length(){return this.#e}set length(e){this.#e=e}#t=`medium`;get size(){return this.#t}set size(e){this.#t=e}#n=!1;get integerOnly(){return this.#n}set integerOnly(e){this.#n=e}#r=!1;get mask(){return this.#r}set mask(e){this.#r=e}#i=!1;get invalid(){return this.#i}set invalid(e){this.#i=e}#a=!1;get disabled(){return this.#a}set disabled(e){this.#a=e}#o=``;get placeholder(){return this.#o}set placeholder(e){this.#o=e}#s=`Código de un solo uso`;get ariaLabel(){return this.#s}set ariaLabel(e){this.#s=e}#c=``;get errorMessage(){return this.#c}set errorMessage(e){this.#c=e}#l=!1;get formDisabled(){return this.#l}set formDisabled(e){this.#l=e}#u=this.createEmptyTokens(4);get tokens(){return this.#u}set tokens(e){this.#u=e}#d=null;get inputTemplateRenderer(){return this.#d}set inputTemplateRenderer(e){this.#d=e}static styles=d;uid=`dcx-otp-${Math.random().toString(36).slice(2,9)}`;errorId=`${this.uid}-error`;getTemplateContext(e,t){return{$implicit:e,token:e,index:t,events:{input:e=>this.onInput(e,t),keydown:e=>this.onKeydown(e,t),paste:e=>this.onPaste(e,t),focus:e=>this.onFocus(t),blur:e=>this.onBlur(t)},attrs:{type:this.inputType,inputmode:this.inputMode,autocomplete:`one-time-code`,maxlength:1,placeholder:this.placeholder,ariaLabel:this.getAriaLabel(t),disabled:this.isDisabled,value:e}}}get normalizedLength(){let e=Number(this.length);return!Number.isFinite(e)||e<1?4:Math.floor(e)}willUpdate(){if(this.tokens.length===this.normalizedLength)return;let e=this.tokens.slice(0,this.normalizedLength);for(;e.length<this.normalizedLength;)e.push(``);this.tokens=e}get inputType(){return this.mask?`password`:this.integerOnly?`tel`:`text`}get inputMode(){return this.integerOnly?`numeric`:`text`}get isDisabled(){return this.disabled||this.formDisabled}get showError(){return this.invalid&&this.errorMessage.trim().length>0}get describedBy(){return this.showError?this.errorId:null}get displayTokens(){return this.tokens}get inputBaseClass(){let e=[`dcx-input-otp__input`];return this.size===`small`&&e.push(`dcx-input-otp__input--small`),this.size===`large`&&e.push(`dcx-input-otp__input--large`),e.join(` `)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}writeValue(e){let t=this.sanitizeValue(String(e??``));this.tokens=this.valueToTokens(t)}setDisabledState(e){this.formDisabled=e}focus(){let e=this.tokens.findIndex(e=>!e),t=e>=0?e:0;this.focusInput(t)}clear(){this.tokens=this.createEmptyTokens(this.normalizedLength),this.propagateValue(!0),this.focus()}getAriaLabel(e){return`Dígito ${e+1} de ${this.normalizedLength}`}getInputClass(e){let t=[this.inputBaseClass];return e&&t.push(`dcx-input-otp__input--filled`),this.invalid&&t.push(`dcx-input-otp__input--invalid`),t.join(` `)}onInput(e,t){if(this.isDisabled)return;let n=e.target,r=this.sanitizeCharacters(n.value);if(n.value=r,!r){this.updateToken(t,``);return}this.applyCharacters(t,r)}onPaste(e,t){if(this.isDisabled)return;e.preventDefault();let n=e.clipboardData?.getData(`text`)??``,r=this.sanitizeCharacters(n);r&&this.applyCharacters(t,r)}onKeydown(e,t){if(this.isDisabled)return;if(this.integerOnly&&e.key.length===1&&!/^\d$/.test(e.key)){e.preventDefault();return}if(e.key===`ArrowLeft`){e.preventDefault(),this.focusInput(Math.max(t-1,0));return}if(e.key===`ArrowRight`){e.preventDefault(),this.focusInput(Math.min(t+1,this.normalizedLength-1));return}if(e.key!==`Backspace`)return;e.preventDefault();let n=[...this.tokens];if(n[t]){n[t]=``,this.tokens=n,this.propagateValue(!0);return}t!==0&&(n[t-1]=``,this.tokens=n,this.propagateValue(!0),this.focusInput(t-1))}onFocus(e){this.emit(`focusEvent`,e)}onBlur(e){this.emit(`blurEvent`,e)}applyCharacters(e,t){let n=[...this.tokens],r=this.sanitizeCharacters(t).slice(0,this.normalizedLength-e).split(``);r.forEach((t,r)=>{n[e+r]=t}),this.tokens=n,this.propagateValue(!0);let i=Math.min(e+r.length,this.normalizedLength-1);this.focusInput(i)}updateToken(e,t){let n=[...this.tokens];n[e]=t,this.tokens=n,this.propagateValue(!0)}propagateValue(e){let t=this.tokens.join(``);e&&(this.emit(`valueChange`,t),t.length===this.normalizedLength&&this.emit(`completed`,t))}focusInput(e){queueMicrotask(()=>{let t=this.renderRoot.querySelectorAll(`input`)[e];t?.focus(),t?.select()})}sanitizeValue(e){return this.sanitizeCharacters(e).slice(0,this.normalizedLength)}sanitizeCharacters(e){return this.integerOnly?e.replace(/\D+/g,``):e}valueToTokens(e){let t=this.createEmptyTokens(this.normalizedLength);return e.split(``).forEach((e,n)=>{n<t.length&&(t[n]=e)}),t}createEmptyTokens(e){return Array.from({length:e},()=>``)}render(){return u(this)}};o([a({type:Number}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`length`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`size`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`integerOnly`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`mask`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`invalid`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`disabled`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`placeholder`,null),o([a({type:String,attribute:`aria-label`}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`ariaLabel`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`errorMessage`,null),o([c(),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`formDisabled`,null),o([c(),s(`design:type`,Array),s(`design:paramtypes`,[])],f.prototype,`tokens`,null),o([a({attribute:!1,state:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],f.prototype,`inputTemplateRenderer`,null),f=o([i(`dcx-web-input-otp`)],f);var p={title:`DCXLibrary/WebComponents/InputOtp`,component:`dcx-web-input-otp`,tags:[`autodocs`],parameters:{layout:`padded`,controls:{expanded:!0}},argTypes:{length:{control:{type:`number`},description:`Número de casillas OTP a renderizar.`,table:{category:`Atributos`,type:{summary:`number`},defaultValue:{summary:`4`}}},size:{control:{type:`select`},options:l,description:`Tamaño visual de las casillas OTP.`,table:{category:`Atributos`,type:{summary:`'small' | 'medium' | 'large'`},defaultValue:{summary:`medium`}}},integerOnly:{control:{type:`boolean`},description:`Restringe la entrada a dígitos.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},mask:{control:{type:`boolean`},description:`Oculta visualmente el valor introducido en cada casilla.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},invalid:{control:{type:`boolean`},description:`Aplica el estado visual de error al componente.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},disabled:{control:{type:`boolean`},description:`Deshabilita la interacción con todas las casillas.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},placeholder:{control:{type:`text`},description:`Placeholder que se replica en cada casilla.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},ariaLabel:{control:{type:`text`},description:`Etiqueta accesible del grupo OTP.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Código de un solo uso`}}},errorMessage:{control:{type:`text`},description:`Mensaje de error. Si invalid es true y existe texto, se muestra bajo el OTP.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},valueChange:{action:`valueChange`,description:`Se emite cuando cambia el valor agregado del OTP.`,table:{category:`Eventos`,type:{summary:`string`}}},completed:{action:`completed`,description:`Se emite cuando todas las posiciones quedan completas.`,table:{category:`Eventos`,type:{summary:`string`}}},focusEvent:{action:`focusEvent`,description:`Se emite con el índice de la casilla enfocada.`,table:{category:`Eventos`,type:{summary:`number`}}},blurEvent:{action:`blurEvent`,description:`Se emite con el índice de la casilla que pierde el foco.`,table:{category:`Eventos`,type:{summary:`number`}}}},args:{length:4,size:`medium`,integerOnly:!1,mask:!1,invalid:!1,disabled:!1,placeholder:``,ariaLabel:`Código de un solo uso`,errorMessage:``},render:t=>e`
    <dcx-web-input-otp
      length="${t.length}"
      size="${t.size}"
      ?integerOnly=${t.integerOnly}
      ?mask=${t.mask}
      ?invalid=${t.invalid}
      ?disabled=${t.disabled}
      placeholder="${t.placeholder}"
      aria-label="${t.ariaLabel}"
      errorMessage="${t.errorMessage}"
    >
    </dcx-web-input-otp>
  `},m={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);return r.style.margin=`0`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm, 12px)`,r.textContent=`Valor actual: Sin completar`,n.addEventListener(`valueChange`,e=>{r.textContent=`Valor actual: ${e.detail||`Sin completar`}`}),t.append(n,r),t}},h={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length===void 0?6:e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel===void 0?`Código numérico de verificación`:e.ariaLabel,n.errorMessage=e.errorMessage,n.writeValue(`123456`);let r=document.createElement(`p`);return r.style.margin=`0`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm, 12px)`,r.textContent=`Código precargado: 123456`,n.addEventListener(`valueChange`,e=>{r.textContent=`Código precargado: ${e.detail}`}),t.append(n,r),t}},g={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly,n.mask=e.mask===void 0||e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder||`•`,n.ariaLabel=e.ariaLabel===void 0?`Código OTP enmascarado`:e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);return r.style.margin=`0`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm, 12px)`,r.textContent=`Valor real: Sin completar`,n.addEventListener(`valueChange`,e=>{r.textContent=`Valor real: ${e.detail||`Sin completar`}`}),t.append(n,r),t}},_={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-4, 16px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`div`);r.style.display=`flex`,r.style.flexDirection=`column`,r.style.gap=`6px`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm,12px)`;let i=document.createElement(`span`),a=document.createElement(`span`);i.textContent=`Valor actual: Sin completar`,a.textContent=`Último código completo: Pendiente`,r.append(i,a),n.addEventListener(`valueChange`,e=>{i.textContent=`Valor actual: ${e.detail||`Sin completar`}`}),n.addEventListener(`completed`,e=>{a.textContent=`Último código completo: ${e.detail}`});let o=document.createElement(`dcx-web-button`);return o.label=`Limpiar código`,o.variant=`secondary`,o.size=`s`,o.addEventListener(`buttonClick`,()=>{n.clear(),i.textContent=`Valor actual: Sin completar`,a.textContent=`Último código completo: Pendiente`}),t.append(n,r,o),t}},v={render:()=>e`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:var(--sp-4, 16px);
        align-items:flex-start;
      "
    >
      <dcx-web-input-otp
        size="small"
        aria-label="OTP small"
      >
      </dcx-web-input-otp>

      <dcx-web-input-otp
        size="medium"
        aria-label="OTP medium"
      >
      </dcx-web-input-otp>

      <dcx-web-input-otp
        size="large"
        aria-label="OTP large"
      >
      </dcx-web-input-otp>
    </div>
  `},y={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);r.style.margin=`0`,r.style.minHeight=`18px`,r.style.color=`var(--text-error, #c81e1e)`,r.style.fontSize=`var(--fs-sm,12px)`;let i=document.createElement(`dcx-web-button`);return i.label=`Submit`,i.variant=`primary`,i.size=`s`,i.addEventListener(`buttonClick`,()=>{if(!n.tokens.join(``)){n.invalid=!0,r.textContent=`Passcode is required.`;return}n.invalid=!1,r.textContent=``,n.clear()}),t.append(n,r,i),t}},b={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);r.style.margin=`0`,r.style.minHeight=`18px`,r.style.color=`#c81e1e`,r.style.fontSize=`var(--fs-sm, 12px)`;let i=document.createElement(`dcx-web-button`);return i.label=`Submit`,i.variant=`primary`,i.size=`s`,i.addEventListener(`buttonClick`,()=>{if(n.tokens.join(``).length<4){n.invalid=!0,r.textContent=`Passcode is required.`;return}n.invalid=!1,r.textContent=``,n.clear()}),t.append(n,r,i),t}},x={render:()=>e`
    <div
      style="
        display:flex;
        justify-content:center;
        padding: var(--sp-4, 16px);
      "
    >
      <div
        style="
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:var(--sp-3, 12px);
          width:100%;
          max-width:420px;
        "
      >
        <div
          style="
            font-size:var(--fs-2xl, 24px);
            font-weight:var(--fw-bold, 700px);
            text-align:center;
          "
        >
          Authenticate Your Account
        </div>

        <p
          style="
            margin:0;
            color:var(--text-muted, #696e75);
            text-align:center;
          "
        >
          Please enter the code sent to your phone.
        </p>

        <dcx-web-input-otp
          .length=${6}
          .integerOnly=${!0}
          aria-label="Código de autenticación de 6 dígitos"
        >
        </dcx-web-input-otp>

        <div
          style="
            display:flex;
            justify-content:space-between;
            gap:var(--sp-3, 12px);
            width:100%;
          "
        >
          <dcx-web-button
            label="Resend Code"
            variant="text"
            size="s"
          >
          </dcx-web-button>

          <dcx-web-button
            label="Submit Code"
            variant="primary"
            size="s"
          >
          </dcx-web-button>
        </div>
      </div>
    </div>
  `},S={args:{disabled:!0,length:4}},C={args:{invalid:!0,length:4,errorMessage:`El código introducido no es correcto.`}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--sp-3, 12px)';
    const otp = document.createElement('dcx-web-input-otp') as any;
    otp.length = args.length;
    otp.size = args.size;
    otp.integerOnly = args.integerOnly;
    otp.mask = args.mask;
    otp.invalid = args.invalid;
    otp.disabled = args.disabled;
    otp.placeholder = args.placeholder;
    otp.ariaLabel = args.ariaLabel;
    otp.errorMessage = args.errorMessage;
    const preview = document.createElement('p');
    preview.style.margin = '0';
    preview.style.color = 'var(--text-muted, #696e75)';
    preview.style.fontSize = 'var(--fs-sm, 12px)';
    preview.textContent = 'Valor actual: Sin completar';
    otp.addEventListener('valueChange', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      preview.textContent = \`Valor actual: \${customEvent.detail || 'Sin completar'}\`;
    });
    wrapper.append(otp, preview);
    return wrapper;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--sp-3, 12px)';
    const otp = document.createElement('dcx-web-input-otp') as any;
    otp.length = args.length !== undefined ? args.length : 6;
    otp.size = args.size;
    otp.integerOnly = args.integerOnly !== undefined ? args.integerOnly : true;
    otp.mask = args.mask;
    otp.invalid = args.invalid;
    otp.disabled = args.disabled;
    otp.placeholder = args.placeholder;
    otp.ariaLabel = args.ariaLabel !== undefined ? args.ariaLabel : 'Código numérico de verificación';
    otp.errorMessage = args.errorMessage;
    otp.writeValue('123456');
    const preview = document.createElement('p');
    preview.style.margin = '0';
    preview.style.color = 'var(--text-muted, #696e75)';
    preview.style.fontSize = 'var(--fs-sm, 12px)';
    preview.textContent = 'Código precargado: 123456';
    otp.addEventListener('valueChange', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      preview.textContent = \`Código precargado: \${customEvent.detail}\`;
    });
    wrapper.append(otp, preview);
    return wrapper;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--sp-3, 12px)';
    const otp = document.createElement('dcx-web-input-otp') as any;
    otp.length = args.length;
    otp.size = args.size;
    otp.integerOnly = args.integerOnly;
    otp.mask = args.mask !== undefined ? args.mask : true;
    otp.invalid = args.invalid;
    otp.disabled = args.disabled;
    otp.placeholder = args.placeholder || '•';
    otp.ariaLabel = args.ariaLabel !== undefined ? args.ariaLabel : 'Código OTP enmascarado';
    otp.errorMessage = args.errorMessage;
    const preview = document.createElement('p');
    preview.style.margin = '0';
    preview.style.color = 'var(--text-muted, #696e75)';
    preview.style.fontSize = 'var(--fs-sm, 12px)';
    preview.textContent = 'Valor real: Sin completar';
    otp.addEventListener('valueChange', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      preview.textContent = \`Valor real: \${customEvent.detail || 'Sin completar'}\`;
    });
    wrapper.append(otp, preview);
    return wrapper;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--sp-4, 16px)';
    const otp = document.createElement('dcx-web-input-otp') as any;
    otp.length = args.length;
    otp.size = args.size;
    otp.integerOnly = args.integerOnly !== undefined ? args.integerOnly : true;
    otp.mask = args.mask;
    otp.invalid = args.invalid;
    otp.disabled = args.disabled;
    otp.placeholder = args.placeholder;
    otp.ariaLabel = args.ariaLabel;
    otp.errorMessage = args.errorMessage;
    const values = document.createElement('div');
    values.style.display = 'flex';
    values.style.flexDirection = 'column';
    values.style.gap = '6px';
    values.style.color = 'var(--text-muted, #696e75)';
    values.style.fontSize = 'var(--fs-sm,12px)';
    const currentValue = document.createElement('span');
    const completedValue = document.createElement('span');
    currentValue.textContent = 'Valor actual: Sin completar';
    completedValue.textContent = 'Último código completo: Pendiente';
    values.append(currentValue, completedValue);
    otp.addEventListener('valueChange', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      currentValue.textContent = \`Valor actual: \${customEvent.detail || 'Sin completar'}\`;
    });
    otp.addEventListener('completed', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      completedValue.textContent = \`Último código completo: \${customEvent.detail}\`;
    });
    const button = document.createElement('dcx-web-button') as any;
    button.label = 'Limpiar código';
    button.variant = 'secondary';
    button.size = 's';
    button.addEventListener('buttonClick', () => {
      otp.clear();
      currentValue.textContent = 'Valor actual: Sin completar';
      completedValue.textContent = 'Último código completo: Pendiente';
    });
    wrapper.append(otp, values, button);
    return wrapper;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:var(--sp-4, 16px);
        align-items:flex-start;
      "
    >
      <dcx-web-input-otp
        size="small"
        aria-label="OTP small"
      >
      </dcx-web-input-otp>

      <dcx-web-input-otp
        size="medium"
        aria-label="OTP medium"
      >
      </dcx-web-input-otp>

      <dcx-web-input-otp
        size="large"
        aria-label="OTP large"
      >
      </dcx-web-input-otp>
    </div>
  \`
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--sp-3, 12px)';
    const otp = document.createElement('dcx-web-input-otp') as any;
    otp.length = args.length;
    otp.size = args.size;
    otp.integerOnly = args.integerOnly !== undefined ? args.integerOnly : true;
    otp.mask = args.mask;
    otp.invalid = args.invalid;
    otp.disabled = args.disabled;
    otp.placeholder = args.placeholder;
    otp.ariaLabel = args.ariaLabel;
    otp.errorMessage = args.errorMessage;
    const error = document.createElement('p');
    error.style.margin = '0';
    error.style.minHeight = '18px';
    error.style.color = 'var(--text-error, #c81e1e)';
    error.style.fontSize = 'var(--fs-sm,12px)';
    const button = document.createElement('dcx-web-button') as any;
    button.label = 'Submit';
    button.variant = 'primary';
    button.size = 's';
    button.addEventListener('buttonClick', () => {
      const value = otp.tokens.join('');
      if (!value) {
        otp.invalid = true;
        error.textContent = 'Passcode is required.';
        return;
      }
      otp.invalid = false;
      error.textContent = '';
      otp.clear();
    });
    wrapper.append(otp, error, button);
    return wrapper;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--sp-3, 12px)';
    const otp = document.createElement('dcx-web-input-otp') as any;
    otp.length = args.length;
    otp.size = args.size;
    otp.integerOnly = args.integerOnly !== undefined ? args.integerOnly : true;
    otp.mask = args.mask;
    otp.invalid = args.invalid;
    otp.disabled = args.disabled;
    otp.placeholder = args.placeholder;
    otp.ariaLabel = args.ariaLabel;
    otp.errorMessage = args.errorMessage;
    const error = document.createElement('p');
    error.style.margin = '0';
    error.style.minHeight = '18px';
    error.style.color = '#c81e1e';
    error.style.fontSize = 'var(--fs-sm, 12px)';
    const button = document.createElement('dcx-web-button') as any;
    button.label = 'Submit';
    button.variant = 'primary';
    button.size = 's';
    button.addEventListener('buttonClick', () => {
      const value = otp.tokens.join('');
      if (value.length < 4) {
        otp.invalid = true;
        error.textContent = 'Passcode is required.';
        return;
      }
      otp.invalid = false;
      error.textContent = '';
      otp.clear();
    });
    wrapper.append(otp, error, button);
    return wrapper;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        justify-content:center;
        padding: var(--sp-4, 16px);
      "
    >
      <div
        style="
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:var(--sp-3, 12px);
          width:100%;
          max-width:420px;
        "
      >
        <div
          style="
            font-size:var(--fs-2xl, 24px);
            font-weight:var(--fw-bold, 700px);
            text-align:center;
          "
        >
          Authenticate Your Account
        </div>

        <p
          style="
            margin:0;
            color:var(--text-muted, #696e75);
            text-align:center;
          "
        >
          Please enter the code sent to your phone.
        </p>

        <dcx-web-input-otp
          .length=\${6}
          .integerOnly=\${true}
          aria-label="Código de autenticación de 6 dígitos"
        >
        </dcx-web-input-otp>

        <div
          style="
            display:flex;
            justify-content:space-between;
            gap:var(--sp-3, 12px);
            width:100%;
          "
        >
          <dcx-web-button
            label="Resend Code"
            variant="text"
            size="s"
          >
          </dcx-web-button>

          <dcx-web-button
            label="Submit Code"
            variant="primary"
            size="s"
          >
          </dcx-web-button>
        </div>
      </div>
    </div>
  \`
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    length: 4
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    invalid: true,
    length: 4,
    errorMessage: 'El código introducido no es correcto.'
  }
}`,...C.parameters?.docs?.source}}};var w=[`Default`,`IntegerOnly`,`Masked`,`Interactive`,`Sizes`,`TemplateDrivenForm`,`ReactiveForm`,`SampleLayout`,`Disabled`,`Invalid`];export{m as Default,S as Disabled,h as IntegerOnly,_ as Interactive,C as Invalid,g as Masked,b as ReactiveForm,x as SampleLayout,v as Sizes,y as TemplateDrivenForm,w as __namedExportsOrder,p as default};