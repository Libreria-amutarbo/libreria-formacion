import{a as e}from"./lit-C11zoK0j.js";import{h as t}from"./src-hmMJswT-.js";var n={title:`DCXLibrary/WebComponents/Slider`,component:`dcx-web-slider`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{showLabel:{control:`boolean`,description:`Muestra la etiqueta con el texto y el valor actual.`,table:{category:`Atributos`}},textLabel:{control:`text`,description:`Texto de la etiqueta mostrada junto al valor.`,table:{category:`Atributos`}},value:{control:`number`,description:`Valor actual del slider.`,table:{category:`Atributos`}},min:{control:`number`,description:`Valor mínimo del slider.`,table:{category:`Atributos`}},max:{control:`number`,description:`Valor máximo del slider.`,table:{category:`Atributos`}},step:{control:`number`,description:`Incremento entre valores.`,table:{category:`Atributos`}},vertical:{control:`boolean`,description:`Muestra el slider en orientación vertical.`,table:{category:`Atributos`}},disabled:{control:`boolean`,description:`Deshabilita el slider.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible explícito. Si no se indica y showLabel es true, se usa textLabel como alternativa. Obligatorio cuando showLabel es false.`,table:{category:`Atributos`}},valueSuffix:{control:`text`,description:`Sufijo de unidad mostrado junto al valor (p.ej. "k€", " personas") y expuesto vía aria-valuetext.`,table:{category:`Atributos`}},valueChange:{action:`valueChange`,description:`Se emite cuando cambia el valor del slider.`,table:{category:`Eventos`}}},args:{...t},render:t=>e`
    <dcx-web-slider
      .showLabel="${t.showLabel}"
      .textLabel="${t.textLabel}"
      .value="${t.value}"
      .min="${t.min}"
      .max="${t.max}"
      .step="${t.step}"
      .vertical="${t.vertical}"
      .disabled="${t.disabled}"
      .ariaLabel="${t.ariaLabel}"
      .valueSuffix="${t.valueSuffix}"
      @valueChange="${t.valueChange}"
    ></dcx-web-slider>
  `},r={},i={args:{vertical:!0}},a={args:{textLabel:`Presupuesto (k€)`,value:60,max:100,valueSuffix:`k€`}},o={args:{textLabel:`Duración (deshabilitado)`,value:12,min:1,max:24,valueSuffix:` meses`,disabled:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    vertical: true
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    textLabel: 'Presupuesto (k€)',
    value: 60,
    max: 100,
    valueSuffix: 'k€'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    textLabel: 'Duración (deshabilitado)',
    value: 12,
    min: 1,
    max: 24,
    valueSuffix: ' meses',
    disabled: true
  }
}`,...o.parameters?.docs?.source}}};var s=[`Default`,`Vertical`,`ConSufijo`,`Disabled`];export{a as ConSufijo,r as Default,o as Disabled,i as Vertical,s as __namedExportsOrder,n as default};