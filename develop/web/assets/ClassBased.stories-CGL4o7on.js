import{a as e}from"./lit-C11zoK0j.js";import{l as t}from"./src-1f6IlAfP.js";function n(e,t){return t||=e.slice(0),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var r,i={title:`DCXLibrary/WebComponents/ScrollTopDown`,component:`dcx-web-scroll-top-down`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{container:{control:!1,description:`Contenedor HTML opcional para aplicar el scroll. Si no se provee, utiliza la ventana.`,table:{category:`Atributos`}},smooth:{control:`boolean`,description:`Activa o desactiva el comportamiento de scroll suave.`,table:{category:`Atributos`}},size:{control:`select`,options:t,description:`Controla el tamaño visual de los botones.`,table:{category:`Atributos`}},iconSize:{control:`select`,options:t,description:`Tamaño visual de los iconos.`,table:{category:`Atributos`}},showTop:{control:`boolean`,description:`Muestra u oculta el botón de desplazamiento superior.`,table:{category:`Atributos`}},showBottom:{control:`boolean`,description:`Muestra u oculta el botón de desplazamiento inferior.`,table:{category:`Atributos`}},topLabel:{control:`text`,description:`Etiqueta accesible del botón para subir.`,table:{category:`Atributos`}},bottomLabel:{control:`text`,description:`Etiqueta accesible del botón para bajar.`,table:{category:`Atributos`}},topIcon:{control:`text`,description:`Nombre del icono utilizado para subir.`,table:{category:`Atributos`}},bottomIcon:{control:`text`,description:`Nombre del icono utilizado para bajar.`,table:{category:`Atributos`}},groupLabel:{control:`text`,description:`Etiqueta accesible aplicada al grupo de controles.`,table:{category:`Atributos`}}},args:{smooth:!0,size:`m`,iconSize:`s`,showTop:!0,showBottom:!0,topLabel:`Ir arriba`,bottomLabel:`Ir abajo`,topIcon:`chevron-up`,bottomIcon:`chevron-down`,groupLabel:`Controles de desplazamiento`}},a=Array.from({length:20},(t,n)=>e`
    <p
      style="
        margin: 0 0 var(--sp-4,16px);
        color: var(--text-muted,#696e75);
      "
    >
      Contenido de ejemplo ${n+1}. Este texto existe
      únicamente para generar scroll.
    </p>
  `),o={render:t=>e`
    <div
      style="
        min-height:1200px;
        padding:var(--sp-8,32px);
        background:var(--bg-default,#ffffff);
      "
    >
      <div
        style="
          max-width:720px;
          margin:0 auto;
          padding-right:96px;
        "
      >
        <h2>Window scroll demo</h2>

        ${a}
        ${a}
      </div>

      <dcx-web-scroll-top-down
        .smooth=${t.smooth}
        size=${t.size}
        iconSize=${t.iconSize}
        .showTop=${t.showTop}
        .showBottom=${t.showBottom}
        topLabel=${t.topLabel}
        bottomLabel=${t.bottomLabel}
        topIcon=${t.topIcon}
        bottomIcon=${t.bottomIcon}
        groupLabel=${t.groupLabel}
      >
      </dcx-web-scroll-top-down>
    </div>
  `},s={name:`Scrollable container`,render:t=>e(r||=n([`
    <div
      style="
        padding:var(--sp-8,32px);
        min-height:520px;
        background:var(--bg-surface,#f4f5f7);
      "
    >
      <div
        style="
          position:relative;
          max-width:820px;
          margin:0 auto;
          height:420px;
          overflow:hidden;
          border:1px solid var(--border-light,#d1d5db);
          border-radius:var(--r-xl,12px);
          background:var(--bg-default,#ffffff);
        "
      >
        <div
          id="storybook-scroll-container"
          style="
            height:100%;
            overflow:auto;
            padding:var(--sp-5,20px);
          "
        >
          <h2>Contenedor con scroll interno</h2>

          `,`
          `,`
        </div>

        <dcx-web-scroll-top-down
          id="storybook-scroll-fab"
          style="
            position:absolute;
            right:16px;
            bottom:16px;
          "
          .smooth=`,`
          size=`,`
          iconSize=`,`
          .showTop=`,`
          .showBottom=`,`
          topLabel=`,`
          bottomLabel=`,`
          topIcon=`,`
          bottomIcon=`,`
          groupLabel=`,`
        >
        </dcx-web-scroll-top-down>
      </div>

      <script>
        requestAnimationFrame(() => {
          const container =
            document.getElementById(
              'storybook-scroll-container',
            );

          const fab =
            document.getElementById(
              'storybook-scroll-fab',
            );

          if (fab && container) {
            fab.container = container;
          }
        });
      <\/script>
    </div>
  `]),a,a,t.smooth,t.size,t.iconSize,t.showTop,t.showBottom,t.topLabel,t.bottomLabel,t.topIcon,t.bottomIcon,t.groupLabel)},c=t=>e`
  <div
    style="
      min-height:1200px;
      padding:var(--sp-8,32px);
      background:var(--bg-default,#ffffff);
    "
  >
    <div
      style="
        max-width:720px;
        margin:0 auto;
        padding-right:96px;
      "
    >
      <h2>Scroll demo</h2>

      ${a}
      ${a}
    </div>

    <dcx-web-scroll-top-down
      .smooth=${t.smooth}
      size=${t.size}
      iconSize=${t.iconSize}
      .showTop=${t.showTop}
      .showBottom=${t.showBottom}
      topLabel=${t.topLabel}
      bottomLabel=${t.bottomLabel}
      topIcon=${t.topIcon}
      bottomIcon=${t.bottomIcon}
      groupLabel=${t.groupLabel}
    >
    </dcx-web-scroll-top-down>
  </div>
`,l={name:`Top only`,args:{showBottom:!1},render:e=>c(e)},u={name:`Bottom only`,args:{showTop:!1},render:e=>c(e)},d={name:`Extra large (XL)`,args:{size:`xl`,iconSize:`m`},render:e=>c(e)},f={name:`Sin scroll suave`,args:{smooth:!1},render:e=>c(e)};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div
      style="
        min-height:1200px;
        padding:var(--sp-8,32px);
        background:var(--bg-default,#ffffff);
      "
    >
      <div
        style="
          max-width:720px;
          margin:0 auto;
          padding-right:96px;
        "
      >
        <h2>Window scroll demo</h2>

        \${longContent}
        \${longContent}
      </div>

      <dcx-web-scroll-top-down
        .smooth=\${args.smooth}
        size=\${args.size}
        iconSize=\${args.iconSize}
        .showTop=\${args.showTop}
        .showBottom=\${args.showBottom}
        topLabel=\${args.topLabel}
        bottomLabel=\${args.bottomLabel}
        topIcon=\${args.topIcon}
        bottomIcon=\${args.bottomIcon}
        groupLabel=\${args.groupLabel}
      >
      </dcx-web-scroll-top-down>
    </div>
  \`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Scrollable container',
  render: args => html\`
    <div
      style="
        padding:var(--sp-8,32px);
        min-height:520px;
        background:var(--bg-surface,#f4f5f7);
      "
    >
      <div
        style="
          position:relative;
          max-width:820px;
          margin:0 auto;
          height:420px;
          overflow:hidden;
          border:1px solid var(--border-light,#d1d5db);
          border-radius:var(--r-xl,12px);
          background:var(--bg-default,#ffffff);
        "
      >
        <div
          id="storybook-scroll-container"
          style="
            height:100%;
            overflow:auto;
            padding:var(--sp-5,20px);
          "
        >
          <h2>Contenedor con scroll interno</h2>

          \${longContent}
          \${longContent}
        </div>

        <dcx-web-scroll-top-down
          id="storybook-scroll-fab"
          style="
            position:absolute;
            right:16px;
            bottom:16px;
          "
          .smooth=\${args.smooth}
          size=\${args.size}
          iconSize=\${args.iconSize}
          .showTop=\${args.showTop}
          .showBottom=\${args.showBottom}
          topLabel=\${args.topLabel}
          bottomLabel=\${args.bottomLabel}
          topIcon=\${args.topIcon}
          bottomIcon=\${args.bottomIcon}
          groupLabel=\${args.groupLabel}
        >
        </dcx-web-scroll-top-down>
      </div>

      <script>
        requestAnimationFrame(() => {
          const container =
            document.getElementById(
              'storybook-scroll-container',
            );

          const fab =
            document.getElementById(
              'storybook-scroll-fab',
            );

          if (fab && container) {
            fab.container = container;
          }
        });
      <\/script>
    </div>
  \`
}`,...s.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Top only',
  args: {
    showBottom: false
  },
  render: args => windowTemplate(args)
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Bottom only',
  args: {
    showTop: false
  },
  render: args => windowTemplate(args)
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Extra large (XL)',
  args: {
    size: 'xl',
    iconSize: 'm'
  },
  render: args => windowTemplate(args)
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Sin scroll suave',
  args: {
    smooth: false
  },
  render: args => windowTemplate(args)
}`,...f.parameters?.docs?.source}}};var p=[`Default`,`ScrollableContainer`,`TopOnly`,`BottomOnly`,`ExtraLarge`,`NoSmooth`];export{u as BottomOnly,o as Default,d as ExtraLarge,f as NoSmooth,s as ScrollableContainer,l as TopOnly,p as __namedExportsOrder,i as default};