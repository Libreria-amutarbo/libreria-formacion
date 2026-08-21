import{a as e}from"./lit-C11zoK0j.js";import"./dcx-web-button.component-D3Abov5f.js";import"./defaults-BS9BWamO.js";import{c as t,n,t as r}from"./src-1f6IlAfP.js";var i={title:`DCXLibrary/WebComponents/Tooltip`,component:`dcx-web-tooltip`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{position:{control:`select`,options:t,description:`Posición preferida del tooltip respecto al elemento disparador.`,table:{category:`Atributos`}},arrowAlignment:{control:`select`,options:r,description:`Alineación visual de la flecha dentro del tooltip.`,table:{category:`Atributos`}},variant:{control:`select`,options:n,description:`Variante visual del tooltip.`,table:{category:`Atributos`}},content:{control:`text`,description:`Contenido de texto plano mostrado dentro del tooltip.`,table:{category:`Atributos`}},contentHtml:{control:`text`,description:`Contenido HTML sanitizado. Los elementos interactivos se eliminan automáticamente.`,table:{category:`Atributos`}},hideTooltipOnClick:{control:`boolean`,description:`Oculta el tooltip al hacer clic sobre el elemento disparador.`,table:{category:`Atributos`}},visible:{control:!1,table:{category:`Estado interno`}},actualPosition:{control:!1,table:{category:`Estado interno`}}},args:{position:`top`,arrowAlignment:`center`,variant:`default`,hideTooltipOnClick:!1,content:`Tooltip por defecto`,contentHtml:``},render:t=>e`
    <div
        style="
        width: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
        "
    >
        <dcx-web-tooltip
        .position=${t.position}
        .arrowAlignment=${t.arrowAlignment}
        .variant=${t.variant}
        .content=${t.content}
        .contentHtml=${t.contentHtml}
        .hideTooltipOnClick=${t.hideTooltipOnClick}
        >
        <dcx-web-button
            label="Pasa el ratón o enfoca"
        >
        </dcx-web-button>
        </dcx-web-tooltip>
    </div>

  `},a={},o={args:{position:`top`,content:`Tooltip arriba`}},s={args:{position:`bottom`,content:`Tooltip abajo`}},c={args:{position:`left`,content:`Tooltip a la izquierda`}},l={args:{position:`right`,content:`Tooltip a la derecha`}},u={args:{content:`Tooltip centro`,position:`top`,arrowAlignment:`center`}},d={args:{content:`Tooltip izquierda`,position:`top`,arrowAlignment:`left`}},f={args:{content:`Tooltip derecha`,position:`top`,arrowAlignment:`right`}},p={args:{content:`Tooltip con variante primary`,position:`top`,variant:`primary`}},m={args:{content:`Tooltip ocultable`,hideTooltipOnClick:!0}},h={args:{content:`Este es un contenido de tooltip muy largo que debería ajustarse correctamente y probar el sistema de posicionamiento inteligente con un texto más extenso que podría causar problemas cerca de los bordes del viewport.`,position:`right`},render:t=>e`
    <div
      style="
        height:200px;
        position:relative;
        padding:20px;
      "
    >
      <div
        style="
          position:absolute;
          top:40px;
          left:20px;
        "
      >
        <dcx-web-tooltip
          .position=${t.position}
          .arrowAlignment=${t.arrowAlignment}
          .variant=${t.variant}
          .content=${t.content}
          .contentHtml=${t.contentHtml}
          .hideTooltipOnClick=${t.hideTooltipOnClick}
        >
          <dcx-web-button
            label="Contenido largo"
          >
          </dcx-web-button>
        </dcx-web-tooltip>
      </div>
    </div>
  `},g={args:{content:`Este es un icono con tooltip`,position:`right`},render:t=>e`
    <div
      style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
      "
    >
      <dcx-web-tooltip
        .position=${t.position}
        .arrowAlignment=${t.arrowAlignment}
        .variant=${t.variant}
        .content=${t.content}
        .contentHtml=${t.contentHtml}
        .hideTooltipOnClick=${t.hideTooltipOnClick}
      >
        <dcx-web-icon
          name="info-circle"
          size="l"
        >
        </dcx-web-icon>
      </dcx-web-tooltip>
    </div>
  `},_={args:{contentHtml:`<p><strong>Importante:</strong> revisa <em>todos</em> los campos</p>`,position:`top`},render:t=>e`
    <div
      style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
      "
    >
      <dcx-web-tooltip
        .position=${t.position}
        .arrowAlignment=${t.arrowAlignment}
        .variant=${t.variant}
        .content=${t.content}
        .contentHtml=${t.contentHtml}
        .hideTooltipOnClick=${t.hideTooltipOnClick}
      >
        <dcx-web-button
          label="Pasa el ratón o enfoca"
        >
        </dcx-web-button>
      </dcx-web-tooltip>
    </div>
  `};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'top',
    content: 'Tooltip arriba'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'bottom',
    content: 'Tooltip abajo'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left',
    content: 'Tooltip a la izquierda'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right',
    content: 'Tooltip a la derecha'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip centro',
    position: 'top',
    arrowAlignment: 'center'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip izquierda',
    position: 'top',
    arrowAlignment: 'left'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip derecha',
    position: 'top',
    arrowAlignment: 'right'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip con variante primary',
    position: 'top',
    variant: 'primary'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip ocultable',
    hideTooltipOnClick: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Este es un contenido de tooltip muy largo que debería ajustarse correctamente y probar el sistema de posicionamiento inteligente con un texto más extenso que podría causar problemas cerca de los bordes del viewport.',
    position: 'right'
  },
  render: args => html\`
    <div
      style="
        height:200px;
        position:relative;
        padding:20px;
      "
    >
      <div
        style="
          position:absolute;
          top:40px;
          left:20px;
        "
      >
        <dcx-web-tooltip
          .position=\${args.position}
          .arrowAlignment=\${args.arrowAlignment}
          .variant=\${args.variant}
          .content=\${args.content}
          .contentHtml=\${args.contentHtml}
          .hideTooltipOnClick=\${args.hideTooltipOnClick}
        >
          <dcx-web-button
            label="Contenido largo"
          >
          </dcx-web-button>
        </dcx-web-tooltip>
      </div>
    </div>
  \`
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'Este es un icono con tooltip',
    position: 'right'
  },
  render: args => html\`
    <div
      style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
      "
    >
      <dcx-web-tooltip
        .position=\${args.position}
        .arrowAlignment=\${args.arrowAlignment}
        .variant=\${args.variant}
        .content=\${args.content}
        .contentHtml=\${args.contentHtml}
        .hideTooltipOnClick=\${args.hideTooltipOnClick}
      >
        <dcx-web-icon
          name="info-circle"
          size="l"
        >
        </dcx-web-icon>
      </dcx-web-tooltip>
    </div>
  \`
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    contentHtml: '<p><strong>Importante:</strong> revisa <em>todos</em> los campos</p>',
    position: 'top'
  },
  render: args => html\`
    <div
      style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
      "
    >
      <dcx-web-tooltip
        .position=\${args.position}
        .arrowAlignment=\${args.arrowAlignment}
        .variant=\${args.variant}
        .content=\${args.content}
        .contentHtml=\${args.contentHtml}
        .hideTooltipOnClick=\${args.hideTooltipOnClick}
      >
        <dcx-web-button
          label="Pasa el ratón o enfoca"
        >
        </dcx-web-button>
      </dcx-web-tooltip>
    </div>
  \`
}`,..._.parameters?.docs?.source}}};var v=[`DefaultTooltip`,`TopTooltip`,`BottomTooltip`,`LeftTooltip`,`RightTooltip`,`ArrowCenter`,`ArrowLeft`,`ArrowRight`,`PrimaryTooltip`,`HideOnClickTooltip`,`LongContentTooltip`,`WithIcon`,`WithFormattedContent`];export{u as ArrowCenter,d as ArrowLeft,f as ArrowRight,s as BottomTooltip,a as DefaultTooltip,m as HideOnClickTooltip,c as LeftTooltip,h as LongContentTooltip,p as PrimaryTooltip,l as RightTooltip,o as TopTooltip,_ as WithFormattedContent,g as WithIcon,v as __namedExportsOrder,i as default};