import"./src-DLX29kS0.js";var e=[{id:`1`,value:!0,label:`Checkbox único`}],t=[{id:`1`,value:!0,label:`Checkbox erróneo`,error:!0,errorMessage:`Checkbox con error`}],n=[{id:`1`,value:!0,label:`Checkbox deshabilitado`,disabled:!0}],r=[{id:`1`,value:!0,label:`Izquierda`,labelPosition:`left`},{id:`2`,value:!0,label:`Derecha`,labelPosition:`right`}],i=[{id:`1`,value:!0,label:`Requerido`,required:!0}],a=[{id:`1`,value:!0,label:`Válido`},{id:`2`,value:!1,label:`Indeterminado`},{id:`3`,value:null,label:`Sin valor`}],o=e=>({parameters:{docs:{source:{code:`<dcx-web-checkbox
  .options=${JSON.stringify(e,null,2)}
></dcx-web-checkbox>`}}}}),s=e=>{let t=document.createElement(`dcx-web-checkbox`),n=e.options.map(e=>({...e}));return t.options=n,t.addEventListener(`changeOptions`,e=>{n=e.detail.map(e=>({...e})),t.options=n}),t},c={title:`DCXLibrary/WebComponents/Checkbox`,component:`dcx-web-checkbox`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{options:{name:`options`,control:{type:`object`},description:`Array de opciones del checkbox. Cada opción admite id, value, label, labelPosition, disabled, required, error y errorMessage.`,table:{category:`Atributos`,type:{summary:`DcxCheckbox[]`},defaultValue:{summary:`[]`}}},changeOptions:{name:`changeOptions`,description:`Evento emitido cuando cambia el estado de uno o varios checkboxes.`,table:{category:`Eventos`,type:{summary:`(options: DcxCheckbox[]) => void`}}}},args:{options:e}},l={args:{options:e},render:s,...o(e)},u={args:{options:t},render:s,...o(t)},d={args:{options:n},render:s,...o(n)},f={args:{options:r},render:s,...o(r)},p={args:{options:i},render:s,...o(i)},m={args:{options:a},render:s,...o(a)},h={args:{options:a.map(e=>({...e,labelPosition:`right`}))},render:()=>{let e=document.createElement(`dcx-web-checkbox`),t=a.map(e=>({...e,labelPosition:`right`}));return e.options=t,e.addEventListener(`changeOptions`,n=>{t=n.detail.map(e=>({...e,label:e.value===!0?`Válido`:e.value===!1?`Indeterminado`:`Sin valor`,labelPosition:`right`})),e.options=t}),e},...o(a)};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxSingleCheck
  },
  render: renderCheckbox,
  ...withCode(DcxSingleCheck)
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxErrorCheck
  },
  render: renderCheckbox,
  ...withCode(DcxErrorCheck)
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxDisabledCheck
  },
  render: renderCheckbox,
  ...withCode(DcxDisabledCheck)
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxDiferentsLabelPositionsCheck
  },
  render: renderCheckbox,
  ...withCode(DcxDiferentsLabelPositionsCheck)
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxRequiredCheck
  },
  render: renderCheckbox,
  ...withCode(DcxRequiredCheck)
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxCheckboxGroup
  },
  render: renderCheckbox,
  ...withCode(DcxCheckboxGroup)
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    options: DcxCheckboxGroup.map(option => ({
      ...option,
      labelPosition: 'right' as const
    }))
  },
  render: () => {
    const el = document.createElement('dcx-web-checkbox');
    let options = DcxCheckboxGroup.map(option => ({
      ...option,
      labelPosition: 'right' as const
    }));
    el.options = options;
    el.addEventListener('changeOptions', (event: Event) => {
      const customEvent = event as CustomEvent<DcxCheckbox[]>;
      options = customEvent.detail.map(option => ({
        ...option,
        label: option.value === true ? 'Válido' : option.value === false ? 'Indeterminado' : 'Sin valor',
        labelPosition: 'right' as const
      }));
      el.options = options;
    });
    return el;
  },
  ...withCode(DcxCheckboxGroup)
}`,...h.parameters?.docs?.source}}};var g=[`Default`,`ErrorCheckBox`,`DisabledCheckBox`,`DiferentsLabelPositions`,`RequiredCheckbox`,`CheckboxGroup`,`CheckboxGroupWithChangeLabel`];export{m as CheckboxGroup,h as CheckboxGroupWithChangeLabel,l as Default,f as DiferentsLabelPositions,d as DisabledCheckBox,u as ErrorCheckBox,p as RequiredCheckbox,g as __namedExportsOrder,c as default};