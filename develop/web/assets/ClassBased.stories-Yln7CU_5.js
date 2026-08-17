import{a as e}from"./lit-C11zoK0j.js";import{a as t,i as n}from"./defaults-DEzK3jDE.js";import{a as r,s as i}from"./src-BgnKDLYK.js";var a={title:`DCXLibrary/WebComponents/Input`,component:`dcx-web-input`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{id:{control:`text`,description:`Id único del input. Label, hint y error derivan de este identificador.`,table:{category:`Atributos`}},value:{control:`text`,description:`Valor del input.`,table:{category:`Atributos`}},label:{control:`text`,description:`Texto visible asociado al input.`,table:{category:`Atributos`}},hint:{control:`text`,description:`Texto de ayuda asociado mediante aria-describedby.`,table:{category:`Atributos`}},placeholder:{control:`text`,description:`Placeholder del input.`,table:{category:`Atributos`}},type:{control:`select`,options:n,description:`Tipo de input.`,table:{category:`Atributos`}},spacing:{control:`select`,options:i,description:`Padding interno.`,table:{category:`Atributos`}},disabled:{control:`boolean`,table:{category:`Atributos`}},readonly:{control:`boolean`,table:{category:`Atributos`}},required:{control:`boolean`,table:{category:`Atributos`}},isInvalid:{control:`boolean`,table:{category:`Atributos`}},errorMessage:{control:`text`,table:{category:`Atributos`}},requiredMessage:{control:`text`,table:{category:`Atributos`}},orientation:{control:`select`,options:[r[0],r[1]],table:{category:`Atributos`}},valueChange:{action:`valueChange`,description:`Emitido cuando cambia el valor del input.`,table:{category:`Eventos`}},focusEvent:{action:`focusEvent`,description:`Emitido cuando el input recibe foco.`,table:{category:`Eventos`}},blurEvent:{action:`blurEvent`,description:`Emitido cuando el input pierde foco.`,table:{category:`Eventos`}},enterPressed:{action:`enterPressed`,description:`Emitido al pulsar Enter.`,table:{category:`Eventos`}}},args:{value:``,label:`Nombre completo`,hint:``,placeholder:`Ej: Jean Dupont`,type:t.TEXT,spacing:`m`,disabled:!1,readonly:!1,required:!1,isInvalid:!1,errorMessage:``,requiredMessage:`Este campo es requerido`,orientation:`horizontal`},render:t=>e`
    <dcx-web-input
      .value=${t.value}
      label=${t.label}
      hint=${t.hint}
      placeholder=${t.placeholder}
      type=${t.type}
      spacing=${t.spacing}
      ?disabled=${t.disabled}
      ?readonly=${t.readonly}
      ?required=${t.required}
      ?isInvalid=${t.isInvalid}
      errorMessage=${t.errorMessage}
      requiredMessage=${t.requiredMessage}
      orientation=${t.orientation}
    >
    </dcx-web-input>
  `},o={},s={args:{hint:`Tal como aparece en el documento oficial.`}},c={args:{label:`Email corporativo`,placeholder:`nombre@empresa.com`,required:!0}},l={args:{label:`Email corporativo`,placeholder:`nombre@empresa.com`,isInvalid:!0,errorMessage:`Introduce un email válido.`}},u={render:()=>e`
    <dcx-web-input
      label="Contraseña"
      type="password"
      .isInvalid=${!0}
      .errorMessages=${[{type:`minLength`,message:`Mínimo 8 caracteres.`},{type:`uppercase`,message:`Debe contener una mayúscula.`}]}
    >
    </dcx-web-input>
  `},d={args:{label:`Campo deshabilitado`,placeholder:`No editable`,disabled:!0}},f={args:{label:`Solo lectura`,value:`Generado automáticamente`,readonly:!0}},p={args:{label:`Contraseña`,placeholder:`••••••••`,type:`password`}},m={args:{label:`Búsqueda`,placeholder:`Buscar...`,type:`search`}},h={render:()=>e`
    <div
      style="
        display:flex;
        gap:16px;
        flex-wrap:wrap;
        align-items:flex-start;
      "
    >
      <dcx-web-input label="Texto" type="text"></dcx-web-input>
      <dcx-web-input label="Número" type="number"></dcx-web-input>
      <dcx-web-input label="Email" type="email"></dcx-web-input>
      <dcx-web-input label="Teléfono" type="tel"></dcx-web-input>
      <dcx-web-input label="URL" type="url"></dcx-web-input>
    </div>
  `},g={render:()=>e`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:16px;
      "
    >
      <dcx-web-input label="xs" spacing="xs"></dcx-web-input>
      <dcx-web-input label="s" spacing="s"></dcx-web-input>
      <dcx-web-input label="m" spacing="m"></dcx-web-input>
      <dcx-web-input label="l" spacing="l"></dcx-web-input>
      <dcx-web-input label="xl" spacing="xl"></dcx-web-input>
    </div>
  `},_={args:{label:`Adjuntar archivo`,type:`file`}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    hint: 'Tal como aparece en el documento oficial.'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email corporativo',
    placeholder: 'nombre@empresa.com',
    required: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email corporativo',
    placeholder: 'nombre@empresa.com',
    isInvalid: true,
    errorMessage: 'Introduce un email válido.'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <dcx-web-input
      label="Contraseña"
      type="password"
      .isInvalid=\${true}
      .errorMessages=\${[{
    type: 'minLength',
    message: 'Mínimo 8 caracteres.'
  }, {
    type: 'uppercase',
    message: 'Debe contener una mayúscula.'
  }]}
    >
    </dcx-web-input>
  \`
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Campo deshabilitado',
    placeholder: 'No editable',
    disabled: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Solo lectura',
    value: 'Generado automáticamente',
    readonly: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Contraseña',
    placeholder: '••••••••',
    type: 'password'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Búsqueda',
    placeholder: 'Buscar...',
    type: 'search'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        gap:16px;
        flex-wrap:wrap;
        align-items:flex-start;
      "
    >
      <dcx-web-input label="Texto" type="text"></dcx-web-input>
      <dcx-web-input label="Número" type="number"></dcx-web-input>
      <dcx-web-input label="Email" type="email"></dcx-web-input>
      <dcx-web-input label="Teléfono" type="tel"></dcx-web-input>
      <dcx-web-input label="URL" type="url"></dcx-web-input>
    </div>
  \`
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:16px;
      "
    >
      <dcx-web-input label="xs" spacing="xs"></dcx-web-input>
      <dcx-web-input label="s" spacing="s"></dcx-web-input>
      <dcx-web-input label="m" spacing="m"></dcx-web-input>
      <dcx-web-input label="l" spacing="l"></dcx-web-input>
      <dcx-web-input label="xl" spacing="xl"></dcx-web-input>
    </div>
  \`
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Adjuntar archivo',
    type: 'file'
  }
}`,..._.parameters?.docs?.source}}};var v=[`Default`,`WithHint`,`Required`,`Invalid`,`InvalidList`,`Disabled`,`ReadOnly`,`Password`,`Search`,`Types`,`Sizes`,`Files`];export{o as Default,d as Disabled,_ as Files,l as Invalid,u as InvalidList,p as Password,f as ReadOnly,c as Required,m as Search,g as Sizes,h as Types,s as WithHint,v as __namedExportsOrder,a as default};