import{a as e}from"./lit-C11zoK0j.js";import"./defaults-BS9BWamO.js";import"./src-v1nqSgFG.js";var t={title:`DCXLibrary/WebComponents/Skeleton`,component:`dcx-web-skeleton`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{shape:{control:`select`,options:[`rectangle`,`circle`],description:`Forma visual del placeholder.`,table:{category:`Atributos`}},width:{control:`text`,description:`Ancho CSS. Se ignora cuando size tiene valor.`,table:{category:`Atributos`}},height:{control:`text`,description:`Alto CSS. Se ignora cuando size tiene valor.`,table:{category:`Atributos`}},size:{control:`text`,description:`Tamaño único para ancho y alto.`,table:{category:`Atributos`}},borderRadius:{control:`text`,description:`Radio CSS para rectángulos.`,table:{category:`Atributos`}},animation:{control:`select`,options:[`wave`,`none`],description:`Animación visual del placeholder.`,table:{category:`Atributos`}}},args:{shape:`rectangle`,width:`100%`,height:`1rem`,size:null,borderRadius:null,animation:`wave`},render:t=>e`
    <div style="max-width:32rem;">
      <dcx-web-skeleton
        shape=${t.shape}
        width=${t.width}
        height=${t.height}
        size=${t.size??``}
        borderRadius=${t.borderRadius??``}
        animation=${t.animation}
      >
      </dcx-web-skeleton>
    </div>
  `},n={},r={render:t=>e`
    <div
      style="
        display:grid;
        gap: var(--sp-4, 16px);
        max-width:34rem;
      "
    >
      <dcx-web-skeleton
        width="20rem"
        height="1rem"
        animation=${t.animation}>
      </dcx-web-skeleton>

      <dcx-web-skeleton
        width="14rem"
        height="1rem"
        borderRadius="16px"
        animation=${t.animation}>
      </dcx-web-skeleton>

      <div
        style="
          display:flex;
          gap: var(--sp-3, 12px);
          align-items:center;
        "
      >
        <dcx-web-skeleton size="2rem" animation=${t.animation}></dcx-web-skeleton>
        <dcx-web-skeleton size="3rem" animation=${t.animation}></dcx-web-skeleton>
        <dcx-web-skeleton size="4rem" animation=${t.animation}></dcx-web-skeleton>

        <dcx-web-skeleton shape="circle" size="2rem" animation=${t.animation}></dcx-web-skeleton>
        <dcx-web-skeleton shape="circle" size="3rem" animation=${t.animation}></dcx-web-skeleton>
        <dcx-web-skeleton shape="circle" size="4rem" animation=${t.animation}></dcx-web-skeleton>
      </div>
    </div>
  `},i={name:`Líneas de texto`,render:t=>e`
    <div
      style="
        display:grid;
        gap:var(--sp-2, 8px);
        max-width:28rem;
      "
    >
      <dcx-web-skeleton width="100%" height="0.875rem" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="94%" height="0.875rem" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="82%" height="0.875rem" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="64%" height="0.875rem" animation=${t.animation}></dcx-web-skeleton>
    </div>
  `},a={render:t=>e`
    <div
      style="
        display:flex;
        gap: var(--sp-4, 16px);
        align-items:center;
      "
    >
      <dcx-web-skeleton shape="circle" size="1.5rem" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="2.5rem" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="3.5rem" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="4.5rem" animation=${t.animation}></dcx-web-skeleton>
    </div>
  `},o={render:t=>e`
    <div role="status" aria-busy="true">
      <span
        style="
          position:absolute;
          width:1px;
          height:1px;
          overflow:hidden;
          clip:rect(0 0 0 0);
        "
      >
        Cargando…
      </span>

      <dcx-web-card
        .image=${null}
        ?bordered=${!0}
        .shadow=${1}
        align="start"
        maxContentWidth="24rem"
        interactive=${!0}
      >
        <div slot="header" style="display:flex;gap:12px;align-items:center;">
          <dcx-web-skeleton shape="circle" size="3rem" animation=${t.animation}></dcx-web-skeleton>

          <div style="display:grid;gap:8px;flex:1;">
            <dcx-web-skeleton width="70%" animation=${t.animation}></dcx-web-skeleton>
            <dcx-web-skeleton width="42%" height="0.75rem" animation=${t.animation}></dcx-web-skeleton>
          </div>
        </div>

        <div slot="content">
          <dcx-web-skeleton
            width="100%"
            height="9rem"
            borderRadius="8px"
            animation=${t.animation}>
          </dcx-web-skeleton>
        </div>

        <div
          slot="footer"
          style="
            display:flex;
            justify-content:space-between;
            gap:var(--sp-3, 12px);
          "
        >
          <dcx-web-skeleton width="5rem" height="2rem" animation=${t.animation}></dcx-web-skeleton>
          <dcx-web-skeleton width="5rem" height="2rem" animation=${t.animation}></dcx-web-skeleton>
        </div>
      </dcx-web-card>
    </div>
  `},s={render:t=>e`
    <div
      role="status"
      aria-busy="true"
      style="
        display:grid;
        gap:var(--sp-4,16px);
        max-width:28rem;
      "
    >
      <span
        style="
          position:absolute;
          width:1px;
          height:1px;
          overflow:hidden;
          clip:rect(0 0 0 0);
        "
      >
        Cargando…
      </span>

      ${[1,2,3,4].map(()=>e`
          <div
            style="
              display:flex;
              align-items:center;
              gap: var(--sp-3,12px);
            "
          >
            <dcx-web-skeleton shape="circle" size="3rem" animation=${t.animation}></dcx-web-skeleton>

            <div
              style="
                display:grid;
                gap: var(--sp-2,8px);
                flex:1;
              "
            >
              <dcx-web-skeleton width="100%" height="0.875rem" animation=${t.animation}></dcx-web-skeleton>
              <dcx-web-skeleton width="72%" height="0.875rem" animation=${t.animation}></dcx-web-skeleton>
            </div>
          </div>
        `)}
    </div>
  `},c={args:{animation:`none`},render:t=>e`
    <div
      style="
        display:grid;
        gap:var(--sp-2,8px);
        max-width:28rem;
      "
    >
      <dcx-web-skeleton width="100%" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="82%" animation=${t.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="64%" animation=${t.animation}></dcx-web-skeleton>
    </div>
  `};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div
      style="
        display:grid;
        gap: var(--sp-4, 16px);
        max-width:34rem;
      "
    >
      <dcx-web-skeleton
        width="20rem"
        height="1rem"
        animation=\${args.animation}>
      </dcx-web-skeleton>

      <dcx-web-skeleton
        width="14rem"
        height="1rem"
        borderRadius="16px"
        animation=\${args.animation}>
      </dcx-web-skeleton>

      <div
        style="
          display:flex;
          gap: var(--sp-3, 12px);
          align-items:center;
        "
      >
        <dcx-web-skeleton size="2rem" animation=\${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton size="3rem" animation=\${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton size="4rem" animation=\${args.animation}></dcx-web-skeleton>

        <dcx-web-skeleton shape="circle" size="2rem" animation=\${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton shape="circle" size="3rem" animation=\${args.animation}></dcx-web-skeleton>
        <dcx-web-skeleton shape="circle" size="4rem" animation=\${args.animation}></dcx-web-skeleton>
      </div>
    </div>
  \`
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Líneas de texto',
  render: args => html\`
    <div
      style="
        display:grid;
        gap:var(--sp-2, 8px);
        max-width:28rem;
      "
    >
      <dcx-web-skeleton width="100%" height="0.875rem" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="94%" height="0.875rem" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="82%" height="0.875rem" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="64%" height="0.875rem" animation=\${args.animation}></dcx-web-skeleton>
    </div>
  \`
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div
      style="
        display:flex;
        gap: var(--sp-4, 16px);
        align-items:center;
      "
    >
      <dcx-web-skeleton shape="circle" size="1.5rem" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="2.5rem" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="3.5rem" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton shape="circle" size="4.5rem" animation=\${args.animation}></dcx-web-skeleton>
    </div>
  \`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div role="status" aria-busy="true">
      <span
        style="
          position:absolute;
          width:1px;
          height:1px;
          overflow:hidden;
          clip:rect(0 0 0 0);
        "
      >
        Cargando…
      </span>

      <dcx-web-card
        .image=\${null}
        ?bordered=\${true}
        .shadow=\${1}
        align="start"
        maxContentWidth="24rem"
        interactive=\${true}
      >
        <div slot="header" style="display:flex;gap:12px;align-items:center;">
          <dcx-web-skeleton shape="circle" size="3rem" animation=\${args.animation}></dcx-web-skeleton>

          <div style="display:grid;gap:8px;flex:1;">
            <dcx-web-skeleton width="70%" animation=\${args.animation}></dcx-web-skeleton>
            <dcx-web-skeleton width="42%" height="0.75rem" animation=\${args.animation}></dcx-web-skeleton>
          </div>
        </div>

        <div slot="content">
          <dcx-web-skeleton
            width="100%"
            height="9rem"
            borderRadius="8px"
            animation=\${args.animation}>
          </dcx-web-skeleton>
        </div>

        <div
          slot="footer"
          style="
            display:flex;
            justify-content:space-between;
            gap:var(--sp-3, 12px);
          "
        >
          <dcx-web-skeleton width="5rem" height="2rem" animation=\${args.animation}></dcx-web-skeleton>
          <dcx-web-skeleton width="5rem" height="2rem" animation=\${args.animation}></dcx-web-skeleton>
        </div>
      </dcx-web-card>
    </div>
  \`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div
      role="status"
      aria-busy="true"
      style="
        display:grid;
        gap:var(--sp-4,16px);
        max-width:28rem;
      "
    >
      <span
        style="
          position:absolute;
          width:1px;
          height:1px;
          overflow:hidden;
          clip:rect(0 0 0 0);
        "
      >
        Cargando…
      </span>

      \${[1, 2, 3, 4].map(() => html\`
          <div
            style="
              display:flex;
              align-items:center;
              gap: var(--sp-3,12px);
            "
          >
            <dcx-web-skeleton shape="circle" size="3rem" animation=\${args.animation}></dcx-web-skeleton>

            <div
              style="
                display:grid;
                gap: var(--sp-2,8px);
                flex:1;
              "
            >
              <dcx-web-skeleton width="100%" height="0.875rem" animation=\${args.animation}></dcx-web-skeleton>
              <dcx-web-skeleton width="72%" height="0.875rem" animation=\${args.animation}></dcx-web-skeleton>
            </div>
          </div>
        \`)}
    </div>
  \`
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    animation: 'none'
  },
  render: args => html\`
    <div
      style="
        display:grid;
        gap:var(--sp-2,8px);
        max-width:28rem;
      "
    >
      <dcx-web-skeleton width="100%" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="82%" animation=\${args.animation}></dcx-web-skeleton>
      <dcx-web-skeleton width="64%" animation=\${args.animation}></dcx-web-skeleton>
    </div>
  \`
}`,...c.parameters?.docs?.source}}};var l=[`Default`,`Shapes`,`TextLines`,`Avatar`,`CardPlaceholder`,`ListPlaceholder`,`NoAnimation`];export{a as Avatar,o as CardPlaceholder,n as Default,s as ListPlaceholder,c as NoAnimation,r as Shapes,i as TextLines,l as __namedExportsOrder,t as default};