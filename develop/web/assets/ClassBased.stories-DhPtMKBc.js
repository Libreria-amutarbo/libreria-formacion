import{a as e}from"./lit-LoFRC6vp.js";import"./defaults-DUNPOyan.js";import{c as t,l as n,m as r,u as i,v as a}from"./src-DFT7Sogt.js";var o={title:`DCXLibrary/WebComponents/Select`,component:`dcx-web-select`,tags:[`autodocs`],parameters:{controls:{expanded:!0},docs:{source:{transform:(e,{args:t})=>`
        <dcx-web-select
          label="${t.label??``}"
          placeholder="${t.placeholder??``}"
          spacing="${t.spacing??`m`}"
          ${t.searchable?`searchable`:``}
          ${t.clearable?`clearable`:``}
          ${t.disabled?`disabled`:``}
          ${t.required?`required`:``}
        >
        </dcx-web-select>
      `},story:{inline:!1,height:`320px`}}},argTypes:{label:{control:`text`,description:`Texto visible del label`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible usado cuando no existe label visible.`,table:{category:`Atributos`}},options:{control:`object`,description:`Listado de opciones disponibles.`,table:{category:`Atributos`}},placeholder:{control:`text`,description:`Texto mostrado cuando no existe selección.`,table:{category:`Atributos`}},searchable:{control:`boolean`,table:{category:`Atributos`}},clearable:{control:`boolean`,table:{category:`Atributos`}},disabled:{control:`boolean`,table:{category:`Atributos`}},required:{control:`boolean`,table:{category:`Atributos`}},isInvalid:{control:`boolean`,table:{category:`Atributos`}},errorMessage:{control:`text`,table:{category:`Atributos`}},errorIcon:{control:`text`,table:{category:`Atributos`}},valueInput:{control:`text`,table:{category:`Atributos`}},spacing:{control:`select`,options:a,table:{category:`Atributos`}},valueChange:{action:`valueChange`,table:{category:`Eventos`}},clear:{action:`clear`,table:{category:`Eventos`}}},args:{label:t,options:n,placeholder:i,searchable:!1,clearable:!1,disabled:!1,required:!1,isInvalid:!1,errorMessage:``,errorIcon:r,valueInput:null,spacing:`xs`},render:t=>e`
      <dcx-web-select
        .label=${t.label}
        .ariaLabel=${t.ariaLabel}
        .options=${t.options}
        .placeholder=${t.placeholder}
        .searchable=${t.searchable}
        .clearable=${t.clearable}
        .disabled=${t.disabled}
        .required=${t.required}
        .isInvalid=${t.isInvalid}
        .errorMessage=${t.errorMessage}
        .errorIcon=${t.errorIcon}
        .valueInput=${t.valueInput}
        .spacing="m"
        @valueChange=${t.valueChange}
        @clear=${t.clear}
      >
      </dcx-web-select>
    `},s={},c={args:{searchable:!0}},l={args:{searchable:!0,clearable:!0}},u={args:{placeholder:`Disabled`,disabled:!0}},d={name:`Deshabilitado con búsqueda`,args:{searchable:!0,clearable:!0,disabled:!0,valueInput:n[0].value}},f={args:{searchable:!0,clearable:!0,required:!0}},p={args:{searchable:!0,clearable:!0,required:!0,isInvalid:!0,errorMessage:`Error`}},m={name:`Con valor preseleccionado`,args:{clearable:!0,valueInput:n[1].value}},h={name:`Sin opciones`,args:{options:[],placeholder:`No hay opciones disponibles`,searchable:!0}},g={render:()=>e`
    <div
      style="
        display:flex;
        gap:var(--sp-3, 12px);
        align-items:center;
        flex-wrap:wrap;
      "
    >
      <dcx-web-select
        spacing="xs"
        placeholder="XS">
      </dcx-web-select>

      <dcx-web-select
        spacing="s"
        placeholder="S">
      </dcx-web-select>

      <dcx-web-select
        spacing="m"
        placeholder="M">
      </dcx-web-select>

      <dcx-web-select
        spacing="l"
        placeholder="L">
      </dcx-web-select>

      <dcx-web-select
        spacing="xl"
        placeholder="XL">
      </dcx-web-select>
    </div>
  `};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    searchable: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    searchable: true,
    clearable: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled',
    disabled: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Deshabilitado con búsqueda',
  args: {
    searchable: true,
    clearable: true,
    disabled: true,
    valueInput: OPTIONS[0].value
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    searchable: true,
    clearable: true,
    required: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    searchable: true,
    clearable: true,
    required: true,
    isInvalid: true,
    errorMessage: 'Error'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Con valor preseleccionado',
  args: {
    clearable: true,
    valueInput: OPTIONS[1].value
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Sin opciones',
  args: {
    options: [],
    placeholder: 'No hay opciones disponibles',
    searchable: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        gap:var(--sp-3, 12px);
        align-items:center;
        flex-wrap:wrap;
      "
    >
      <dcx-web-select
        spacing="xs"
        placeholder="XS">
      </dcx-web-select>

      <dcx-web-select
        spacing="s"
        placeholder="S">
      </dcx-web-select>

      <dcx-web-select
        spacing="m"
        placeholder="M">
      </dcx-web-select>

      <dcx-web-select
        spacing="l"
        placeholder="L">
      </dcx-web-select>

      <dcx-web-select
        spacing="xl"
        placeholder="XL">
      </dcx-web-select>
    </div>
  \`
}`,...g.parameters?.docs?.source}}};var _=[`ClassBased`,`Searchable`,`SearchableWithClearable`,`Disabled`,`DisabledWithSearchable`,`Required`,`SelectWithError`,`WithPreselectedValue`,`Empty`,`Spacing`];export{s as ClassBased,u as Disabled,d as DisabledWithSearchable,h as Empty,f as Required,c as Searchable,l as SearchableWithClearable,p as SelectWithError,g as Spacing,m as WithPreselectedValue,_ as __namedExportsOrder,o as default};