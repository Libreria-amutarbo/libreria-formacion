import{a as e}from"./lit-C11zoK0j.js";import"./dcx-web-picklist.component-B2R037-M.js";var t=[{id:`angular-foundations`,label:`Angular Foundations`,description:`Componentes, signals y routing`,icon:`braces`,category:`Frontend`},{id:`design-system`,label:`Design System`,description:`Tokens, accesibilidad y patrones UI`,icon:`palette`,category:`UX`},{id:`testing-library`,label:`Testing Library`,description:`Pruebas unitarias y de integracion`,icon:`check2-square`,category:`Quality`},{id:`rxjs-practical`,label:`RxJS Practico`,description:`Streams, operadores y estado reactivo`,icon:`diagram-3`,category:`Frontend`},{id:`node-api`,label:`Node API`,description:`Servicios REST, validacion y seguridad`,icon:`server`,category:`Backend`},{id:`cloud-basics`,label:`Cloud Basics`,description:`Despliegue, observabilidad y costes`,icon:`cloud`,category:`Platform`}],n=[{id:`git-workflow`,label:`Git Workflow`,description:`Ramas, PRs y revision de codigo`,icon:`git`,category:`Engineering`},{id:`agile-delivery`,label:`Agile Delivery`,description:`Planificacion, refinamiento y retrospectivas`,icon:`kanban`,category:`Delivery`}],r=(e,t)=>{let n=e.currentTarget,r=e.detail??[];if(t===`source`){n.source=[...r];return}n.target=[...r]},i={title:`DCXLibrary/WebComponents/PickList`,component:`dcx-web-picklist`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{source:{control:`object`,description:`Elementos disponibles del panel origen.`,table:{category:`Atributos`,type:{summary:`DcxPickListItem[]`}}},target:{control:`object`,description:`Elementos del panel destino.`,table:{category:`Atributos`,type:{summary:`DcxPickListItem[]`}}},sourceHeader:{control:`text`,description:`Título del panel origen.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Disponibles`}}},targetHeader:{control:`text`,description:`Título del panel destino.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Seleccionados`}}},filterBy:{control:`text`,description:`Campo o campos separados por coma para filtrar.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},showSourceFilter:{control:`boolean`,description:`Muestra el buscador del panel origen.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},showTargetFilter:{control:`boolean`,description:`Muestra el buscador del panel destino.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},sourceFilterPlaceholder:{control:`text`,description:`Placeholder del buscador origen.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Filtrar disponibles`}}},targetFilterPlaceholder:{control:`text`,description:`Placeholder del buscador destino.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Filtrar seleccionados`}}},scrollHeight:{control:`text`,description:`Altura máxima de cada lista antes de hacer scroll.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`14rem`}}},dragdrop:{control:`boolean`,description:`Activa reordenación y transferencia por arrastrar y soltar.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},responsive:{control:`boolean`,description:`Apila los paneles en pantallas estrechas.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},disabled:{control:`boolean`,description:`Desactiva toda la interacción.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},showSourceControls:{control:`boolean`,description:`Muestra los controles de reordenar del panel origen.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},showTargetControls:{control:`boolean`,description:`Muestra los controles de reordenar del panel destino.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},keepSelection:{control:`boolean`,description:`Mantiene la selección tras transferir elementos.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},itemTemplate:{control:!1,description:`Plantilla personalizada para renderizar cada ítem.`,table:{category:`Atributos`,type:{summary:`(context) => TemplateResult`}}},sourceChange:{action:`sourceChange`,description:`Se emite cuando cambia el panel origen.`,table:{category:`Eventos`,type:{summary:`(items: DcxPickListItem[]) => void`}}},targetChange:{action:`targetChange`,description:`Se emite cuando cambia el panel destino.`,table:{category:`Eventos`,type:{summary:`(items: DcxPickListItem[]) => void`}}},sourceSelect:{action:`sourceSelect`,description:`Se emite al cambiar la selección del panel origen.`,table:{category:`Eventos`,type:{summary:`(event: DcxPickListSelectionEvent) => void`}}},targetSelect:{action:`targetSelect`,description:`Se emite al cambiar la selección del panel destino.`,table:{category:`Eventos`,type:{summary:`(event: DcxPickListSelectionEvent) => void`}}},sourceFilter:{action:`sourceFilter`,description:`Se emite al filtrar el panel origen.`,table:{category:`Eventos`,type:{summary:`(event: DcxPickListFilterEvent) => void`}}},targetFilter:{action:`targetFilter`,description:`Se emite al filtrar el panel destino.`,table:{category:`Eventos`,type:{summary:`(event: DcxPickListFilterEvent) => void`}}}},args:{source:t.slice(0,4),target:n.slice(0,1),sourceHeader:`Disponibles`,targetHeader:`Seleccionados`,filterBy:``,showSourceFilter:!1,showTargetFilter:!1,sourceFilterPlaceholder:`Filtrar disponibles`,targetFilterPlaceholder:`Filtrar seleccionados`,scrollHeight:`14rem`,dragdrop:!1,responsive:!0,disabled:!1,showSourceControls:!0,showTargetControls:!0,keepSelection:!1}},a={render:t=>e`
    <dcx-web-picklist
      sourceHeader=${t.sourceHeader}
      targetHeader=${t.targetHeader}
      .source=${t.source}
      .target=${t.target}
      .filterBy=${t.filterBy}
      .showSourceFilter=${t.showSourceFilter}
      .showTargetFilter=${t.showTargetFilter}
      .sourceFilterPlaceholder=${t.sourceFilterPlaceholder}
      .targetFilterPlaceholder=${t.targetFilterPlaceholder}
      scrollHeight=${t.scrollHeight}
      .dragdrop=${t.dragdrop}
      .responsive=${t.responsive}
      .disabled=${t.disabled}
      .showSourceControls=${t.showSourceControls}
      .showTargetControls=${t.showTargetControls}
      .keepSelection=${t.keepSelection}
      @sourceChange=${e=>r(e,`source`)}
      @targetChange=${e=>r(e,`target`)}
    ></dcx-web-picklist>
  `},o={args:{source:t,target:n,sourceHeader:`Cursos disponibles`,targetHeader:`Plan formativo`,filterBy:`label,description,category`,showSourceFilter:!0,showTargetFilter:!0,sourceFilterPlaceholder:`Buscar cursos`,targetFilterPlaceholder:`Buscar seleccionados`,dragdrop:!0,scrollHeight:`20rem`},render:t=>e`
    <dcx-web-picklist
      sourceHeader=${t.sourceHeader}
      targetHeader=${t.targetHeader}
      .source=${t.source}
      .target=${t.target}
      .filterBy=${t.filterBy}
      .showSourceFilter=${t.showSourceFilter}
      .showTargetFilter=${t.showTargetFilter}
      .sourceFilterPlaceholder=${t.sourceFilterPlaceholder}
      .targetFilterPlaceholder=${t.targetFilterPlaceholder}
      scrollHeight=${t.scrollHeight}
      .dragdrop=${t.dragdrop}
      .responsive=${t.responsive}
      .disabled=${t.disabled}
      .showSourceControls=${t.showSourceControls}
      .showTargetControls=${t.showTargetControls}
      @sourceChange=${e=>r(e,`source`)}
      @targetChange=${e=>r(e,`target`)}
    ></dcx-web-picklist>
  `},s={args:{source:t,target:n,sourceHeader:`Cursos disponibles`,targetHeader:`Plan formativo`,filterBy:`label,description,category`,dragdrop:!0,scrollHeight:`20rem`},render:t=>e`
    <dcx-web-picklist
      sourceHeader=${t.sourceHeader}
      targetHeader=${t.targetHeader}
      .source=${t.source}
      .target=${t.target}
      .filterBy=${t.filterBy}
      scrollHeight=${t.scrollHeight}
      .dragdrop=${t.dragdrop}
      .itemTemplate=${({item:t,selected:n})=>e`
        <div
          style="display:grid; grid-template-columns: 2.5rem minmax(0, 1fr) auto; align-items:center; gap:0.75rem; width:100%; min-width:0; box-sizing:border-box; padding:0.5rem 0.75rem; border-radius:var(--r-md,6px); ${n?`background: rgba(0, 88, 171, 0.04);`:`background: transparent;`}"
        >
          <span
            style="display:inline-flex; align-items:center; justify-content:center; width:2.25rem; height:2.25rem; border-radius:var(--r-md,6px); background: var(--color-info-bg, #eff6ff); color: var(--bg-primary, #0058ab); font-weight:var(--fw-bold, 700); flex-shrink:0;"
          >
            ${String(t.label??``).charAt(0).toUpperCase()}
          </span>
          <span style="display:flex; min-width:0; flex-direction:column; overflow:hidden;">
            <strong style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-dark, #2a2e33);">${t.label}</strong>
            <small style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-muted, #696e75);">${t.description??``}</small>
          </span>
          ${n?e`<span style="display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; white-space:nowrap; padding:0.125rem 0.5rem; border-radius:999px; background:rgba(34, 197, 94, 0.12); color:var(--color-success, #16a34a); font-size: var(--fs-xs, 11px); font-weight: var(--fw-bold, 700); line-height:1.2;">Incluido</span>`:null}
        </div>
      `}
      @sourceChange=${e=>r(e,`source`)}
      @targetChange=${e=>r(e,`target`)}
    ></dcx-web-picklist>
  `},c={args:{source:t.slice(0,4),target:n.slice(0,1),disabled:!0},render:t=>e`
    <dcx-web-picklist
      sourceHeader=${t.sourceHeader}
      targetHeader=${t.targetHeader}
      .source=${t.source}
      .target=${t.target}
      .disabled=${t.disabled}
      @sourceChange=${e=>r(e,`source`)}
      @targetChange=${e=>r(e,`target`)}
    ></dcx-web-picklist>
  `},l={args:{source:t.map((e,t)=>({...e,disabled:t===1})),target:n},render:t=>e`
    <dcx-web-picklist
      sourceHeader=${t.sourceHeader}
      targetHeader=${t.targetHeader}
      .source=${t.source}
      .target=${t.target}
      .showControls=${t.showSourceControls}
      @sourceChange=${e=>r(e,`source`)}
      @targetChange=${e=>r(e,`target`)}
    ></dcx-web-picklist>
  `},u={args:{source:t,target:n,showSourceControls:!1,showTargetControls:!1,dragdrop:!0},render:t=>e`
    <dcx-web-picklist
      sourceHeader=${t.sourceHeader}
      targetHeader=${t.targetHeader}
      .source=${t.source}
      .target=${t.target}
      .showSourceControls=${t.showSourceControls}
      .showTargetControls=${t.showTargetControls}
      .dragdrop=${t.dragdrop}
      @sourceChange=${e=>r(e,`source`)}
      @targetChange=${e=>r(e,`target`)}
    ></dcx-web-picklist>
  `};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <dcx-web-picklist
      sourceHeader=\${args.sourceHeader}
      targetHeader=\${args.targetHeader}
      .source=\${args.source}
      .target=\${args.target}
      .filterBy=\${args.filterBy}
      .showSourceFilter=\${args.showSourceFilter}
      .showTargetFilter=\${args.showTargetFilter}
      .sourceFilterPlaceholder=\${args.sourceFilterPlaceholder}
      .targetFilterPlaceholder=\${args.targetFilterPlaceholder}
      scrollHeight=\${args.scrollHeight}
      .dragdrop=\${args.dragdrop}
      .responsive=\${args.responsive}
      .disabled=\${args.disabled}
      .showSourceControls=\${args.showSourceControls}
      .showTargetControls=\${args.showTargetControls}
      .keepSelection=\${args.keepSelection}
      @sourceChange=\${(event: Event) => setListState(event, 'source')}
      @targetChange=\${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  \`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    sourceHeader: 'Cursos disponibles',
    targetHeader: 'Plan formativo',
    filterBy: 'label,description,category',
    showSourceFilter: true,
    showTargetFilter: true,
    sourceFilterPlaceholder: 'Buscar cursos',
    targetFilterPlaceholder: 'Buscar seleccionados',
    dragdrop: true,
    scrollHeight: '20rem'
  },
  render: args => html\`
    <dcx-web-picklist
      sourceHeader=\${args.sourceHeader}
      targetHeader=\${args.targetHeader}
      .source=\${args.source}
      .target=\${args.target}
      .filterBy=\${args.filterBy}
      .showSourceFilter=\${args.showSourceFilter}
      .showTargetFilter=\${args.showTargetFilter}
      .sourceFilterPlaceholder=\${args.sourceFilterPlaceholder}
      .targetFilterPlaceholder=\${args.targetFilterPlaceholder}
      scrollHeight=\${args.scrollHeight}
      .dragdrop=\${args.dragdrop}
      .responsive=\${args.responsive}
      .disabled=\${args.disabled}
      .showSourceControls=\${args.showSourceControls}
      .showTargetControls=\${args.showTargetControls}
      @sourceChange=\${(event: Event) => setListState(event, 'source')}
      @targetChange=\${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  \`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    sourceHeader: 'Cursos disponibles',
    targetHeader: 'Plan formativo',
    filterBy: 'label,description,category',
    dragdrop: true,
    scrollHeight: '20rem'
  },
  render: args => html\`
    <dcx-web-picklist
      sourceHeader=\${args.sourceHeader}
      targetHeader=\${args.targetHeader}
      .source=\${args.source}
      .target=\${args.target}
      .filterBy=\${args.filterBy}
      scrollHeight=\${args.scrollHeight}
      .dragdrop=\${args.dragdrop}
      .itemTemplate=\${({
    item,
    selected
  }: {
    item: DcxPickListItem;
    selected: boolean;
  }) => html\`
        <div
          style="display:grid; grid-template-columns: 2.5rem minmax(0, 1fr) auto; align-items:center; gap:0.75rem; width:100%; min-width:0; box-sizing:border-box; padding:0.5rem 0.75rem; border-radius:var(--r-md,6px); \${selected ? 'background: rgba(0, 88, 171, 0.04);' : 'background: transparent;'}"
        >
          <span
            style="display:inline-flex; align-items:center; justify-content:center; width:2.25rem; height:2.25rem; border-radius:var(--r-md,6px); background: var(--color-info-bg, #eff6ff); color: var(--bg-primary, #0058ab); font-weight:var(--fw-bold, 700); flex-shrink:0;"
          >
            \${String(item.label ?? '').charAt(0).toUpperCase()}
          </span>
          <span style="display:flex; min-width:0; flex-direction:column; overflow:hidden;">
            <strong style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-dark, #2a2e33);">\${item.label}</strong>
            <small style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-muted, #696e75);">\${item.description ?? ''}</small>
          </span>
          \${selected ? html\`<span style="display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; white-space:nowrap; padding:0.125rem 0.5rem; border-radius:999px; background:rgba(34, 197, 94, 0.12); color:var(--color-success, #16a34a); font-size: var(--fs-xs, 11px); font-weight: var(--fw-bold, 700); line-height:1.2;">Incluido</span>\` : null}
        </div>
      \`}
      @sourceChange=\${(event: Event) => setListState(event, 'source')}
      @targetChange=\${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  \`
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    source: PICKLIST_AVAILABLE_COURSES.slice(0, 4),
    target: PICKLIST_SELECTED_COURSES.slice(0, 1),
    disabled: true
  },
  render: args => html\`
    <dcx-web-picklist
      sourceHeader=\${args.sourceHeader}
      targetHeader=\${args.targetHeader}
      .source=\${args.source}
      .target=\${args.target}
      .disabled=\${args.disabled}
      @sourceChange=\${(event: Event) => setListState(event, 'source')}
      @targetChange=\${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  \`
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    source: PICKLIST_AVAILABLE_COURSES.map((item, index) => ({
      ...item,
      disabled: index === 1
    })),
    target: PICKLIST_SELECTED_COURSES
  },
  render: args => html\`
    <dcx-web-picklist
      sourceHeader=\${args.sourceHeader}
      targetHeader=\${args.targetHeader}
      .source=\${args.source}
      .target=\${args.target}
      .showControls=\${args.showSourceControls}
      @sourceChange=\${(event: Event) => setListState(event, 'source')}
      @targetChange=\${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  \`
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    source: PICKLIST_AVAILABLE_COURSES,
    target: PICKLIST_SELECTED_COURSES,
    showSourceControls: false,
    showTargetControls: false,
    dragdrop: true
  },
  render: args => html\`
    <dcx-web-picklist
      sourceHeader=\${args.sourceHeader}
      targetHeader=\${args.targetHeader}
      .source=\${args.source}
      .target=\${args.target}
      .showSourceControls=\${args.showSourceControls}
      .showTargetControls=\${args.showTargetControls}
      .dragdrop=\${args.dragdrop}
      @sourceChange=\${(event: Event) => setListState(event, 'source')}
      @targetChange=\${(event: Event) => setListState(event, 'target')}
    ></dcx-web-picklist>
  \`
}`,...u.parameters?.docs?.source}}};var d=[`Default`,`Filter`,`CustomTemplate`,`Disabled`,`ItemDisabled`,`WithoutControls`];export{s as CustomTemplate,a as Default,c as Disabled,o as Filter,l as ItemDisabled,u as WithoutControls,d as __namedExportsOrder,i as default};