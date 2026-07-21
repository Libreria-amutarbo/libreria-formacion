import{a as e,n as t}from"./lit-LoFRC6vp.js";import"./src-D9Fdpric.js";var n=[{title:`Capgemini Engineering`,description:`Innovación y tecnología para el futuro de la industria.`,tag:`Engineering`},{title:`Digital Transformation`,description:`Acompañamos a las empresas en su viaje hacia lo digital.`,tag:`Digital`},{title:`Cloud Services`,description:`Soluciones escalables y seguras en la nube.`,tag:`Cloud`},{title:`Data & AI`,description:`Inteligencia artificial aplicada al negocio.`,tag:`Data`},{title:`Cybersecurity`,description:`Protección integral para tus activos digitales.`,tag:`Security`}],r=[{id:1,title:`Sección Acordeón`,type:`accordion`},{id:2,title:`Formulario de Opciones`,type:`checkbox`},{id:3,title:`Etiquetas e Indicadores`,type:`chips-badges`}],i=[{id:`1`,value:!0,label:`Opción Básica (Web Component)`},{id:`2`,value:!1,label:`Opción Pro (Web Component)`},{id:`3`,value:null,label:`Opción Premium (Web Component)`}],a=[`horizontal`,`vertical`],o=n=>e`
  <dcx-web-card
    title="${n.title}"
    .interactive=${!0}
    size="m"
    style="width: 100%; box-sizing: border-box;"
  >
    <div slot="content">
      ${n.tag?e`<dcx-web-chip label="${n.tag}" size="s" style="margin-bottom: var(--sp-2, 8px); display: inline-block;"></dcx-web-chip>`:t}
      <p style="margin: 0; font-size: var(--fs-base, 14px); color: var(--text-muted, #696e75);">${n.description}</p>
    </div>
  </dcx-web-card>
`,s=t=>e`
  <dcx-web-card
    title="${t.title}"
    .interactive=${!0}
    size="m"
    style="width: 100%; height: 100%; box-sizing: border-box;"
  >
    <div slot="content">
      <p style="margin: 0; font-size: var(--fs-base, 14px); color: var(--text-muted, #696e75);">${t.description}</p>
    </div>
  </dcx-web-card>
`,c=[...i],l=t=>t.type===`accordion`?e`
      <div style="width: 100%; box-sizing: border-box; text-align: left;">
        <h3 style="margin: 0 0 var(--sp-3, 12px) 0; font-size: var(--fs-md, 16px); font-weight: var(--fw-semibold, 600); color: var(--text-dark, #2a2e33);">${t.title}</h3>
        <dcx-web-accordion .items=${[{id:`1`,title:`Panel 1 (Web Component)`,content:`Contenido del panel 1 hecho con Web Component Accordion.`},{id:`2`,title:`Panel 2 (Web Component)`,content:`Contenido del panel 2 hecho con Web Component Accordion.`}]} closeOthers></dcx-web-accordion>
      </div>
    `:t.type===`checkbox`?e`
      <div style="width: 100%; box-sizing: border-box; text-align: left;">
        <h3 style="margin: 0 0 var(--sp-3, 12px) 0; font-size: var(--fs-md, 16px); font-weight: var(--fw-semibold, 600); color: var(--text-dark, #2a2e33);">${t.title}</h3>
        <dcx-web-checkbox
          .options=${c}
          @changeOptions=${e=>{c=e.detail;let t=e.target.closest(`dcx-web-carousel`);t&&t.requestUpdate()}}
        ></dcx-web-checkbox>
      </div>
    `:t.type===`chips-badges`?e`
      <div style="width: 100%; box-sizing: border-box; text-align: left;">
        <h3 style="margin: 0 0 var(--sp-3, 12px) 0; font-size: var(--fs-md, 16px); font-weight: var(--fw-semibold, 600); color: var(--text-dark, #2a2e33);">${t.title}</h3>
        <div style="display: flex; gap: var(--sp-2, 8px); align-items: center;">
          <dcx-web-chip label="Chip 1" color="primary"></dcx-web-chip>
          <dcx-web-chip label="Chip 2" color="success"></dcx-web-chip>
        </div>
      </div>
    `:e`
    <dcx-web-card
      title="${t.title}"
      .interactive=${!0}
      size="m"
      style="width: 100%; box-sizing: border-box;"
    ></dcx-web-card>
  `,u={title:`DCXLibrary/WebComponents/Carousel`,component:`dcx-web-carousel`,tags:[`autodocs`],argTypes:{value:{control:`object`,description:`Array de elementos a mostrar en el carousel.`,table:{category:`Atributos`}},circular:{control:`boolean`,description:`Indica si el carousel es infinito.`,table:{category:`Atributos`,defaultValue:{summary:`false`}}},orientation:{control:`select`,options:a,description:`Dirección del desplazamiento del carousel.`,table:{category:`Atributos`,defaultValue:{summary:`horizontal`}}},showNavigators:{control:`boolean`,description:`Muestra u oculta los botones de navegación.`,table:{category:`Atributos`,defaultValue:{summary:`true`}}},showIndicators:{control:`boolean`,description:`Muestra u oculta los indicadores de página.`,table:{category:`Atributos`,defaultValue:{summary:`true`}}},autoplayInterval:{control:{type:`number`,min:0,step:500},description:`Tiempo en milisegundos para el cambio automático de slide (0 para desactivar).`,table:{category:`Atributos`,defaultValue:{summary:`0`}}},ariaLabel:{control:`text`,description:`Nombre accesible de la región del carousel (atributo aria-label).`,table:{category:`Atributos`,defaultValue:{summary:`Carousel`}}}},args:{value:n,circular:!1,orientation:`horizontal`,showNavigators:!0,showIndicators:!0,autoplayInterval:0,ariaLabel:`Carousel`},render:t=>{let n=t.orientation===`vertical`,r=`
      max-width: ${n?`400px`:`450px`};
      height: ${n?`600px`:`auto`};
      margin: auto;
      padding: var(--sp-5, 20px);
    `,i=t.itemTemplate||(n?s:o);return e`
      <div style=${r}>
        <dcx-web-carousel
          .value=${t.value}
          ?circular=${t.circular}
          .orientation=${t.orientation}
          ?show-navigators=${t.showNavigators}
          ?show-indicators=${t.showIndicators}
          .autoplayInterval=${t.autoplayInterval}
          .ariaLabel=${t.ariaLabel}
          .itemTemplate=${i}
          style="${n?`height: 100%;`:``}"
        >
        </dcx-web-carousel>
      </div>
    `}},d={},f={args:{circular:!0,autoplayInterval:3e3}},p={args:{orientation:`vertical`}},m={args:{value:r,circular:!0},render:t=>e`
      <div style="max-width: 450px; margin: auto; padding: var(--sp-5, 20px);">
        <dcx-web-carousel
          .value=${t.value}
          ?circular=${t.circular}
          ?show-indicators=${!0}
          .itemTemplate=${l}
        >
        </dcx-web-carousel>
      </div>
    `};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    circular: true,
    autoplayInterval: 3000
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: CAROUSEL_WEB_MIXED_ITEMS,
    circular: true
  },
  render: (args: any) => {
    return html\`
      <div style="max-width: 450px; margin: auto; padding: var(--sp-5, 20px);">
        <dcx-web-carousel
          .value=\${args.value}
          ?circular=\${args.circular}
          ?show-indicators=\${true}
          .itemTemplate=\${mixedItemTemplate}
        >
        </dcx-web-carousel>
      </div>
    \`;
  }
}`,...m.parameters?.docs?.source}}};var h=[`Default`,`AutoplayCircular`,`Vertical`,`MixedContent`];export{f as AutoplayCircular,d as Default,m as MixedContent,p as Vertical,h as __namedExportsOrder,u as default};