import{a as e}from"./lit-LoFRC6vp.js";import"./defaults-CXgNBldx.js";import"./src-W4DUSJtk.js";var t=[`s`,`m`,`l`],n=[{value:`opcion1`,label:`Opción 1`},{value:`opcion2`,label:`Opción 2`},{value:`opcion3`,label:`Opción 3`}],r={title:`DCXLibrary/WebComponents/Radio`,component:`dcx-web-radio`,tags:[`autodocs`],argTypes:{options:{control:`object`,description:`Array de opciones del grupo: { value, label, disabled? }.`,table:{category:`Atributos`,type:{summary:`DcxRadioOption[]`}}},label:{control:`text`,description:`Texto del legend del grupo — nombre accesible del conjunto de radios.`,table:{category:`Atributos`,type:{summary:`string`}}},name:{control:`text`,description:`Nombre nativo del grupo. Se genera automáticamente si no se indica.`,table:{category:`Atributos`,type:{summary:`string`}}},size:{control:{type:`radio`},options:t,description:`Tamaño de los radio buttons del grupo.`,table:{category:`Atributos`,type:{summary:`DcxRadioSize`},defaultValue:{summary:`l`}}},disabled:{control:`boolean`,description:`Deshabilita todas las opciones del grupo.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},error:{control:`boolean`,description:`Estado de error del grupo.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},errorMessage:{control:`text`,description:`Mensaje de error, anunciado con role="alert".`,table:{category:`Atributos`,type:{summary:`string`}}},hint:{control:`text`,description:`Texto de ayuda bajo el grupo. Se oculta si hay error visible.`,table:{category:`Atributos`,type:{summary:`string`}}},ariaLabel:{control:`text`,description:`Nombre accesible cuando no hay label visible.`,table:{category:`Atributos`,type:{summary:`string`}}},value:{control:`text`,description:`Valor seleccionado actualmente.`,table:{category:`Atributos`,type:{summary:`string`}}}},args:{options:n,label:`Elige tu opción favorita`,size:`m`,disabled:!1,error:!1,errorMessage:``,hint:``,ariaLabel:``,value:``},render:t=>e`
      <dcx-web-radio
        .options="${t.options}"
        .label="${t.label}"
        .name="${t.name||``}"
        .size="${t.size}"
        ?disabled="${t.disabled}"
        ?error="${t.error}"
        .errorMessage="${t.errorMessage||``}"
        .hint="${t.hint||``}"
        .ariaLabel="${t.ariaLabel||``}"
        .value="${t.value||``}"
        @valueChange="${e=>t.value=e.detail}"
      ></dcx-web-radio>
    `},i={args:{options:n,label:`Elige tu opción favorita`,size:`m`,disabled:!1}},a={render:()=>e`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <dcx-web-radio .options="${[{value:`s`,label:`Small (S)`}]}" size="s"></dcx-web-radio>
      <dcx-web-radio .options="${[{value:`m`,label:`Medium (M)`}]}" size="m"></dcx-web-radio>
      <dcx-web-radio .options="${[{value:`l`,label:`Large (L)`}]}" size="l"></dcx-web-radio>
    </div>
  `},o={args:{label:`Elige un plan`,size:`m`,options:[{value:`basico`,label:`Básico`},{value:`pro`,label:`Pro`},{value:`enterprise`,label:`Enterprise (no disponible)`,disabled:!0}]}},s={args:{label:`Grupo deshabilitado`,size:`m`,disabled:!0,options:n}},c={args:{label:`Tipo de suscripción`,size:`m`,hint:`Puedes cambiar de plan en cualquier momento`,options:[{value:`mensual`,label:`Plan mensual`},{value:`anual`,label:`Plan anual`}]}},l={args:{label:`¿Aceptas los términos?`,size:`m`,error:!0,errorMessage:`Debes seleccionar una opción`,options:[{value:`si`,label:`Sí`},{value:`no`,label:`No`}]}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    options: RADIO_DEFAULT_OPTIONS,
    label: 'Elige tu opción favorita',
    size: 'm',
    disabled: false
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <dcx-web-radio .options="\${[{
    value: 's',
    label: 'Small (S)'
  }]}" size="s"></dcx-web-radio>
      <dcx-web-radio .options="\${[{
    value: 'm',
    label: 'Medium (M)'
  }]}" size="m"></dcx-web-radio>
      <dcx-web-radio .options="\${[{
    value: 'l',
    label: 'Large (L)'
  }]}" size="l"></dcx-web-radio>
    </div>
  \`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Elige un plan',
    size: 'm',
    options: [{
      value: 'basico',
      label: 'Básico'
    }, {
      value: 'pro',
      label: 'Pro'
    }, {
      value: 'enterprise',
      label: 'Enterprise (no disponible)',
      disabled: true
    }]
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Grupo deshabilitado',
    size: 'm',
    disabled: true,
    options: RADIO_DEFAULT_OPTIONS
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Tipo de suscripción',
    size: 'm',
    hint: 'Puedes cambiar de plan en cualquier momento',
    options: [{
      value: 'mensual',
      label: 'Plan mensual'
    }, {
      value: 'anual',
      label: 'Plan anual'
    }]
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: '¿Aceptas los términos?',
    size: 'm',
    error: true,
    errorMessage: 'Debes seleccionar una opción',
    options: [{
      value: 'si',
      label: 'Sí'
    }, {
      value: 'no',
      label: 'No'
    }]
  }
}`,...l.parameters?.docs?.source}}};var u=[`Basic`,`Sizes`,`WithDisabledOption`,`Disabled`,`WithHint`,`Error`];export{i as Basic,s as Disabled,l as Error,a as Sizes,o as WithDisabledOption,c as WithHint,u as __namedExportsOrder,r as default};