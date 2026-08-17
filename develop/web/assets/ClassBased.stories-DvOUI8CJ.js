import{a as e}from"./lit-C11zoK0j.js";import"./defaults-DEzK3jDE.js";import{v as t,y as n}from"./src-BgnKDLYK.js";var r={title:`DCXLibrary/WebComponents/Toggle`,component:`dcx-web-toggle`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{checked:{control:`boolean`,description:`Estado actual del toggle (encendido/apagado).`,table:{category:`Atributos`}},disabled:{control:`boolean`,description:`Deshabilita el toggle utilizando el atributo nativo disabled.`,table:{category:`Atributos`}},label:{control:`text`,description:`Texto visible asociado al toggle.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible explícito. Si no existe, se usa label y posteriormente Toggle.`,table:{category:`Atributos`}},size:{control:`select`,options:n,description:`Tamaño visual del toggle.`,table:{category:`Atributos`}},textPosition:{control:`select`,options:t,description:`Posición del texto respecto al control.`,table:{category:`Atributos`}},toggled:{action:`toggled`,description:`Emitido cuando cambia el estado del toggle.`,table:{category:`Eventos`}}},args:{checked:!1,disabled:!1,label:`Activar función`,ariaLabel:`Activar función`,size:`m`,textPosition:`right`},render:t=>e`
    <dcx-web-toggle
      .checked=${t.checked}
      .disabled=${t.disabled}
      .label=${t.label}
      .ariaLabel=${t.ariaLabel}
      size=${t.size}
      textPosition=${t.textPosition}
    >
    </dcx-web-toggle>
  `},i={},a={args:{checked:!0,label:`Activo por defecto`,ariaLabel:`Toggle activo`}},o={args:{checked:!0,disabled:!0,label:`No se puede interactuar`,ariaLabel:`Toggle deshabilitado`}},s={args:{checked:!1,label:null,ariaLabel:`Toggle sin label visible`}},c={args:{size:`s`,label:`Toggle pequeño`,ariaLabel:`Toggle pequeño`}},l={args:{size:`m`,checked:!0,label:`Toggle mediano`,ariaLabel:`Toggle mediano`}},u={args:{size:`l`,checked:!0,label:`Toggle grande`,ariaLabel:`Toggle grande`}},d={args:{size:`xl`,checked:!0,label:`Toggle extra grande`,ariaLabel:`Toggle extra grande`}},f={args:{checked:!0,label:`Label a la derecha`,textPosition:`right`}},p={args:{checked:!0,label:`Label a la izquierda`,textPosition:`left`}},m={args:{checked:!0,label:`Label arriba`,textPosition:`top`}},h={args:{checked:!0,label:`Label abajo`,textPosition:`bottom`}},g={render:()=>e`
    <div
      style="
        display:flex;
        gap: var(--sp-6, 24px);
        flex-wrap:wrap;
        align-items:center;
      "
    >
      <dcx-web-toggle
        .checked=${!0}
        label="Top"
        textPosition="top"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${!0}
        label="Bottom"
        textPosition="bottom"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${!0}
        label="Left"
        textPosition="left"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${!0}
        label="Right"
        textPosition="right"
      >
      </dcx-web-toggle>
    </div>
  `},_={render:()=>e`
    <div
      style="
        display:flex;
        gap: var(--sp-6, 24px);
        flex-wrap:wrap;
        align-items:center;
      "
    >
      <dcx-web-toggle
        .checked=${!0}
        size="s"
        label="S"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${!0}
        size="m"
        label="M"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${!0}
        size="l"
        label="L"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${!0}
        size="xl"
        label="XL"
      >
      </dcx-web-toggle>
    </div>
  `},v={render:()=>{let t=document.createElement(`div`);t.innerHTML=`
      <p>Estado actual: OFF</p>
    `;let n=t.querySelector(`p`);return e`
      <div
        style="
          display:flex;
          flex-direction:column;
          gap: var(--sp-3, 12px);
          align-items:flex-start;
        "
      >
        <dcx-web-toggle
          label="Click para cambiar"
          @toggled=${e=>{n&&(n.textContent=`Estado actual: ${e.detail?`ON`:`OFF`}`)}}
        >
        </dcx-web-toggle>

        ${t}
      </div>
    `}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    label: 'Activo por defecto',
    ariaLabel: 'Toggle activo'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    disabled: true,
    label: 'No se puede interactuar',
    ariaLabel: 'Toggle deshabilitado'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    label: null,
    ariaLabel: 'Toggle sin label visible'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: 's',
    label: 'Toggle pequeño',
    ariaLabel: 'Toggle pequeño'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'm',
    checked: true,
    label: 'Toggle mediano',
    ariaLabel: 'Toggle mediano'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'l',
    checked: true,
    label: 'Toggle grande',
    ariaLabel: 'Toggle grande'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'xl',
    checked: true,
    label: 'Toggle extra grande',
    ariaLabel: 'Toggle extra grande'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    label: 'Label a la derecha',
    textPosition: 'right'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    label: 'Label a la izquierda',
    textPosition: 'left'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    label: 'Label arriba',
    textPosition: 'top'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    label: 'Label abajo',
    textPosition: 'bottom'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        gap: var(--sp-6, 24px);
        flex-wrap:wrap;
        align-items:center;
      "
    >
      <dcx-web-toggle
        .checked=\${true}
        label="Top"
        textPosition="top"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=\${true}
        label="Bottom"
        textPosition="bottom"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=\${true}
        label="Left"
        textPosition="left"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=\${true}
        label="Right"
        textPosition="right"
      >
      </dcx-web-toggle>
    </div>
  \`
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div
      style="
        display:flex;
        gap: var(--sp-6, 24px);
        flex-wrap:wrap;
        align-items:center;
      "
    >
      <dcx-web-toggle
        .checked=\${true}
        size="s"
        label="S"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=\${true}
        size="m"
        label="M"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=\${true}
        size="l"
        label="L"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=\${true}
        size="xl"
        label="XL"
      >
      </dcx-web-toggle>
    </div>
  \`
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = \`
      <p>Estado actual: OFF</p>
    \`;
    const stateText = container.querySelector('p');
    return html\`
      <div
        style="
          display:flex;
          flex-direction:column;
          gap: var(--sp-3, 12px);
          align-items:flex-start;
        "
      >
        <dcx-web-toggle
          label="Click para cambiar"
          @toggled=\${(e: CustomEvent<boolean>) => {
      if (stateText) {
        stateText.textContent = \`Estado actual: \${e.detail ? 'ON' : 'OFF'}\`;
      }
    }}
        >
        </dcx-web-toggle>

        \${container}
      </div>
    \`;
  }
}`,...v.parameters?.docs?.source}}};var y=[`Default`,`CheckedByDefault`,`DisabledToggle`,`AriaOnlyToggle`,`SmallToggle`,`MediumToggle`,`LargeToggle`,`ExtraLargeToggle`,`RightLabelToggle`,`LeftLabelToggle`,`TopLabelToggle`,`BottomLabelToggle`,`Positions`,`Sizes`,`Interactive`];export{s as AriaOnlyToggle,h as BottomLabelToggle,a as CheckedByDefault,i as Default,o as DisabledToggle,d as ExtraLargeToggle,v as Interactive,u as LargeToggle,p as LeftLabelToggle,l as MediumToggle,g as Positions,f as RightLabelToggle,_ as Sizes,c as SmallToggle,m as TopLabelToggle,y as __namedExportsOrder,r as default};