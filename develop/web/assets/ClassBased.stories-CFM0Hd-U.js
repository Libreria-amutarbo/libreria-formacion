import{a as e}from"./lit-C11zoK0j.js";import"./defaults-vv0ZT-_6.js";import{d as t}from"./src-DLX29kS0.js";var n={title:`DCXLibrary/WebComponents/Editor`,component:`dcx-web-editor`,tags:[`autodocs`],argTypes:{value:{control:`text`,description:`Contenido HTML del editor (saneado antes de renderizar).`,table:{category:`Atributos`,type:{summary:`string`}}},label:{control:`text`,description:`Etiqueta visible del editor.`,table:{category:`Atributos`,type:{summary:`string`}}},placeholder:{control:`text`,description:`Texto de ayuda que se muestra cuando el editor está vacío.`,table:{category:`Atributos`,type:{summary:`string`}}},ariaLabel:{control:`text`,description:`Nombre accesible cuando no hay label.`,table:{category:`Atributos`,type:{summary:`string | null`}}},minHeight:{control:`text`,description:`Altura mínima del área editable.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`160px`}}},toolbarActions:{control:`check`,options:[`bold`,`italic`,`underline`,`orderedList`,`unorderedList`,`removeFormat`],description:`Acciones visibles en la barra de herramientas.`,table:{category:`Atributos`,type:{summary:`DcxEditorToolbarAction[]`}}},disabled:{control:`boolean`,description:`Deshabilita el editor y su barra de herramientas.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},readonly:{control:`boolean`,description:`Modo solo lectura: se muestra el contenido pero no se edita.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`Marca el editor como obligatorio (muestra el asterisco).`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},isInvalid:{control:`boolean`,description:`Estado de error del editor.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},errorMessage:{control:`text`,description:`Mensaje de error mostrado cuando isInvalid es true.`,table:{category:`Atributos`,type:{summary:`string`}}},onValueChange:{action:`valueChange`,description:`Se emite cuando cambia el contenido del editor.`,table:{category:`Eventos`}},onFocusEvent:{action:`focusEvent`,description:`Se emite cuando el editor recibe el foco.`,table:{category:`Eventos`}},onBlurEvent:{action:`blurEvent`,description:`Se emite cuando el editor pierde el foco.`,table:{category:`Eventos`}}},args:{value:``,label:`Descripción`,placeholder:`Escribe aquí...`,ariaLabel:``,minHeight:`160px`,toolbarActions:t,disabled:!1,readonly:!1,required:!1,isInvalid:!1,errorMessage:``},render:({value:t,label:n,placeholder:r,ariaLabel:i,minHeight:a,toolbarActions:o,disabled:s,readonly:c,required:l,isInvalid:u,errorMessage:d,onValueChange:f,onFocusEvent:p,onBlurEvent:m})=>e`
    <dcx-web-editor
      .value=${t}
      .label=${n}
      .placeholder=${r}
      .ariaLabel=${i}
      .minHeight=${a}
      .toolbarActions=${o}
      .disabled=${s}
      .readonly=${c}
      .required=${l}
      .isInvalid=${u}
      .errorMessage=${d}
      @valueChange=${f}
      @focusEvent=${p}
      @blurEvent=${m}
    ></dcx-web-editor>
  `},r={},i={args:{value:`<strong>Título</strong><br />Texto con <em>énfasis</em> y una lista:<ul><li>Uno</li><li>Dos</li></ul>`}},a={args:{required:!0}},o={args:{isInvalid:!0,errorMessage:`Este campo es obligatorio.`}},s={args:{disabled:!0,value:`<strong>Contenido no editable</strong>`}},c={args:{readonly:!0,value:`<strong>Solo lectura</strong><br />No se puede editar.`}},l={name:`Barra reducida`,args:{toolbarActions:[`bold`,`italic`,`removeFormat`]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    value: '<strong>Título</strong><br />Texto con <em>énfasis</em> y una lista:<ul><li>Uno</li><li>Dos</li></ul>'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isInvalid: true,
    errorMessage: 'Este campo es obligatorio.'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: '<strong>Contenido no editable</strong>'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    readonly: true,
    value: '<strong>Solo lectura</strong><br />No se puede editar.'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Barra reducida',
  args: {
    toolbarActions: ['bold', 'italic', 'removeFormat']
  }
}`,...l.parameters?.docs?.source}}};var u=[`Default`,`WithContent`,`Required`,`Invalid`,`Disabled`,`ReadOnly`,`LimitedToolbar`];export{r as Default,s as Disabled,o as Invalid,l as LimitedToolbar,c as ReadOnly,a as Required,i as WithContent,u as __namedExportsOrder,n as default};