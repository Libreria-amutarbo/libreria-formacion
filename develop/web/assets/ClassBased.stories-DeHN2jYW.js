import{a as e}from"./lit-LoFRC6vp.js";import"./defaults-CXgNBldx.js";import"./src-sLtf7Brx.js";var t={title:`DCXLibrary/WebComponents/InputOtp`,component:`dcx-web-input-otp`,tags:[`autodocs`],parameters:{layout:`padded`,controls:{expanded:!0}},argTypes:{length:{control:{type:`number`},description:`Número de casillas OTP a renderizar.`,table:{category:`Atributos`,type:{summary:`number`},defaultValue:{summary:`4`}}},size:{control:{type:`select`},options:[`small`,`medium`,`large`],description:`Tamaño visual de las casillas OTP.`,table:{category:`Atributos`,type:{summary:`'small' | 'medium' | 'large'`},defaultValue:{summary:`medium`}}},integerOnly:{control:{type:`boolean`},description:`Restringe la entrada a dígitos.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},mask:{control:{type:`boolean`},description:`Oculta visualmente el valor introducido en cada casilla.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},invalid:{control:{type:`boolean`},description:`Aplica el estado visual de error al componente.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},disabled:{control:{type:`boolean`},description:`Deshabilita la interacción con todas las casillas.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},placeholder:{control:{type:`text`},description:`Placeholder que se replica en cada casilla.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},ariaLabel:{control:{type:`text`},description:`Etiqueta accesible del grupo OTP.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Código de un solo uso`}}},errorMessage:{control:{type:`text`},description:`Mensaje de error. Si invalid es true y existe texto, se muestra bajo el OTP.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},valueChange:{action:`valueChange`,description:`Se emite cuando cambia el valor agregado del OTP.`,table:{category:`Eventos`,type:{summary:`string`}}},completed:{action:`completed`,description:`Se emite cuando todas las posiciones quedan completas.`,table:{category:`Eventos`,type:{summary:`string`}}},focusEvent:{action:`focusEvent`,description:`Se emite con el índice de la casilla enfocada.`,table:{category:`Eventos`,type:{summary:`number`}}},blurEvent:{action:`blurEvent`,description:`Se emite con el índice de la casilla que pierde el foco.`,table:{category:`Eventos`,type:{summary:`number`}}}},args:{length:4,size:`medium`,integerOnly:!1,mask:!1,invalid:!1,disabled:!1,placeholder:``,ariaLabel:`Código de un solo uso`,errorMessage:``},render:t=>e`
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
  `},n={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);return r.style.margin=`0`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm, 12px)`,r.textContent=`Valor actual: Sin completar`,n.addEventListener(`valueChange`,e=>{r.textContent=`Valor actual: ${e.detail||`Sin completar`}`}),t.append(n,r),t}},r={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length===void 0?6:e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel===void 0?`Código numérico de verificación`:e.ariaLabel,n.errorMessage=e.errorMessage,n.writeValue(`123456`);let r=document.createElement(`p`);return r.style.margin=`0`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm, 12px)`,r.textContent=`Código precargado: 123456`,n.addEventListener(`valueChange`,e=>{r.textContent=`Código precargado: ${e.detail}`}),t.append(n,r),t}},i={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly,n.mask=e.mask===void 0||e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder||`•`,n.ariaLabel=e.ariaLabel===void 0?`Código OTP enmascarado`:e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);return r.style.margin=`0`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm, 12px)`,r.textContent=`Valor real: Sin completar`,n.addEventListener(`valueChange`,e=>{r.textContent=`Valor real: ${e.detail||`Sin completar`}`}),t.append(n,r),t}},a={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-4, 16px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`div`);r.style.display=`flex`,r.style.flexDirection=`column`,r.style.gap=`6px`,r.style.color=`var(--text-muted, #696e75)`,r.style.fontSize=`var(--fs-sm,12px)`;let i=document.createElement(`span`),a=document.createElement(`span`);i.textContent=`Valor actual: Sin completar`,a.textContent=`Último código completo: Pendiente`,r.append(i,a),n.addEventListener(`valueChange`,e=>{i.textContent=`Valor actual: ${e.detail||`Sin completar`}`}),n.addEventListener(`completed`,e=>{a.textContent=`Último código completo: ${e.detail}`});let o=document.createElement(`dcx-web-button`);return o.label=`Limpiar código`,o.variant=`secondary`,o.size=`s`,o.addEventListener(`buttonClick`,()=>{n.clear(),i.textContent=`Valor actual: Sin completar`,a.textContent=`Último código completo: Pendiente`}),t.append(n,r,o),t}},o={render:()=>e`
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
  `},s={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);r.style.margin=`0`,r.style.minHeight=`18px`,r.style.color=`var(--text-error, #c81e1e)`,r.style.fontSize=`var(--fs-sm,12px)`;let i=document.createElement(`dcx-web-button`);return i.label=`Submit`,i.variant=`primary`,i.size=`s`,i.addEventListener(`buttonClick`,()=>{if(!n.tokens.join(``)){n.invalid=!0,r.textContent=`Passcode is required.`;return}n.invalid=!1,r.textContent=``,n.clear()}),t.append(n,r,i),t}},c={render:e=>{let t=document.createElement(`div`);t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`var(--sp-3, 12px)`;let n=document.createElement(`dcx-web-input-otp`);n.length=e.length,n.size=e.size,n.integerOnly=e.integerOnly===void 0||e.integerOnly,n.mask=e.mask,n.invalid=e.invalid,n.disabled=e.disabled,n.placeholder=e.placeholder,n.ariaLabel=e.ariaLabel,n.errorMessage=e.errorMessage;let r=document.createElement(`p`);r.style.margin=`0`,r.style.minHeight=`18px`,r.style.color=`#c81e1e`,r.style.fontSize=`var(--fs-sm, 12px)`;let i=document.createElement(`dcx-web-button`);return i.label=`Submit`,i.variant=`primary`,i.size=`s`,i.addEventListener(`buttonClick`,()=>{if(n.tokens.join(``).length<4){n.invalid=!0,r.textContent=`Passcode is required.`;return}n.invalid=!1,r.textContent=``,n.clear()}),t.append(n,r,i),t}},l={render:()=>e`
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
  `},u={args:{disabled:!0,length:4}},d={args:{invalid:!0,length:4,errorMessage:`El código introducido no es correcto.`}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    length: 4
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    invalid: true,
    length: 4,
    errorMessage: 'El código introducido no es correcto.'
  }
}`,...d.parameters?.docs?.source}}};var f=[`Default`,`IntegerOnly`,`Masked`,`Interactive`,`Sizes`,`TemplateDrivenForm`,`ReactiveForm`,`SampleLayout`,`Disabled`,`Invalid`];export{n as Default,u as Disabled,r as IntegerOnly,a as Interactive,d as Invalid,i as Masked,c as ReactiveForm,l as SampleLayout,o as Sizes,s as TemplateDrivenForm,f as __namedExportsOrder,t as default};