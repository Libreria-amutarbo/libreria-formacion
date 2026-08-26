import{a as e}from"./lit-C11zoK0j.js";import"./src-v1nqSgFG.js";var t={title:`DCXLibrary/WebComponents/Badge`,component:`dcx-web-badge`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{value:{control:`text`,description:`Valor del badge (texto o número)`,table:{category:`Atributos`}},severity:{control:`select`,options:[`primary`,`secondary`,`success`,`info`,`warn`,`danger`],description:`Severidad o color semántico del badge`,table:{category:`Atributos`}},size:{control:`select`,options:[`sm`,`md`,`lg`,`xl`],description:`Tamaño del badge`,table:{category:`Atributos`}}},args:{value:`2`,severity:`primary`,size:`md`},render:t=>e`
    <dcx-web-badge
      value=${t.value||``}
      severity=${t.severity}
      size=${t.size}
    ></dcx-web-badge>
  `},n={args:{value:`2`,severity:`primary`,size:`md`}},r={args:{value:``,severity:`primary`,size:`md`}},i={args:{value:`8`,severity:`success`,size:`lg`}},a={args:{value:`99+`,severity:`danger`,size:`sm`}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2',
    severity: 'primary',
    size: 'md'
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    severity: 'primary',
    size: 'md'
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    value: '8',
    severity: 'success',
    size: 'lg'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: '99+',
    severity: 'danger',
    size: 'sm'
  }
}`,...a.parameters?.docs?.source}}};var o=[`Default`,`Dot`,`SuccessLarge`,`DangerSmall`];export{a as DangerSmall,n as Default,r as Dot,i as SuccessLarge,o as __namedExportsOrder,t as default};