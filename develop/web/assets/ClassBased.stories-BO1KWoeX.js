import{a as e}from"./lit-C11zoK0j.js";import"./src-hmMJswT-.js";var t=[{text:`Item 1`},{divider:!0},{text:`Item 2`}],n=[{text:`Enabled`},{text:`Disabled`,disabled:!0}],r=[{text:`Perfil`},{text:`Notificaciones`},{text:`Privacidad y seguridad`},{text:`Facturación`}],i=[{text:`Home`,icon:`house-door`},{text:`Settings`,icon:`gear`},{text:`Profile`,icon:`person`},{text:`Messages`,icon:`envelope`}],a=[{text:`Frutas`,icon:`basket`,children:[{text:`Manzana`},{text:`Naranja`},{text:`Plátano`}]},{text:`Verduras`,icon:`basket2`,children:[{text:`Zanahoria`},{text:`Lechuga`}]},{text:`Lácteos`,icon:`cup`}],o=[{text:`Option 1`,icon:`check-circle`},{text:`Option 2`,icon:`check-circle`},{text:`Option 3`,icon:`check-circle`},{text:`Option 4`,icon:`check-circle`}],s=[{text:`Dashboard`,icon:`speedometer`,description:`Overview of metrics`},{text:`Usuarios`,icon:`people`,description:`Manage users`},{text:`Ajustes`,icon:`gear-fill`,description:`System settings`},{text:`Notificaciones`,icon:`bell-fill`,description:`View notifications`}],c=[{text:`JavaScript`,icon:`code-slash`},{text:`TypeScript`,icon:`file-code`},{text:`Python`,icon:`braces`},{text:`Java`,icon:`cup-hot`},{text:`C++`,icon:`cpu`}],l=[{id:`edit`,text:`Editar`,icon:`pencil`},{id:`duplicate`,text:`Duplicar`,icon:`files`},{id:`delete`,text:`Eliminar`,icon:`trash`,variant:`danger`}],u={title:`DCXLibrary/WebComponents/List`,component:`dcx-web-list`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{items:{control:`object`,description:`Array de elementos renderizados por la lista.`,table:{category:`Atributos`}},selectable:{control:`boolean`,description:`Permite seleccionar elementos.`,table:{category:`Atributos`}},multiSelect:{control:`boolean`,description:`Permite selección múltiple.`,table:{category:`Atributos`}},showChildrenIndicator:{control:`boolean`,description:`Muestra indicador visual para elementos hijos.`,table:{category:`Atributos`}},renderChildren:{control:`boolean`,description:`Renderiza listas anidadas.`,table:{category:`Atributos`}},externalSelection:{control:`boolean`,description:`La selección es gestionada externamente.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible del contenedor.`,table:{category:`Atributos`}},itemSelected:{action:`itemSelected`,description:`Emitido al seleccionar un elemento.`,table:{category:`Eventos`}},itemDeselected:{action:`itemDeselected`,description:`Emitido al deseleccionar un elemento.`,table:{category:`Eventos`}}},args:{items:r,selectable:!1,multiSelect:!1,showChildrenIndicator:!1,renderChildren:!0,externalSelection:!1,ariaLabel:`Lista de elementos`},render:t=>e`
    <dcx-web-list
      .items=${t.items}
      .selectable=${t.selectable}
      .multiSelect=${t.multiSelect}
      .showChildrenIndicator=${t.showChildrenIndicator}
      .renderChildren=${t.renderChildren}
      .externalSelection=${t.externalSelection}
      aria-label=${t.ariaLabel}
    >
    </dcx-web-list>
  `},d={},f={args:{items:i,selectable:!0}},p={args:{items:s,selectable:!0}},m={args:{items:a,selectable:!0,showChildrenIndicator:!0}},h={render:()=>e`
      <div>
        <dcx-web-list
          .items=${o}
          .selectable=${!0}
          @itemSelected=${e=>{let{item:t,index:n}=e.detail,r=document.getElementById(`selectable-status`);r&&(r.textContent=`Seleccionado: ${t.text??t.label} (index: ${n})`)}}
        ></dcx-web-list>
        <p
          id="selectable-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--background-color, #f3f4f6);
            border-radius: var(--r-md, 6px);
            border-left: 3px solid #0058ab;
          "
        >
          Seleccionado: —
        </p>
      </div>
    `},g={render:()=>{let t=new Map,n=e=>{let{item:n,index:r}=e.detail;t.set(r,n.text??n.label??``),i()},r=e=>{let{index:n}=e.detail;t.delete(n),i()},i=()=>{let e=document.getElementById(`multi-status`);if(e){if(t.size===0)e.textContent=`Elementos seleccionados: —`;else{let n=[...t.values()].join(`, `);e.textContent=`Elementos seleccionados (${t.size}): ${n}`}}};return e`
      <div>
        <dcx-web-list
          .items=${c}
          .selectable=${!0}
          .multiSelect=${!0}
          @itemSelected=${n}
          @itemDeselected=${r}
        ></dcx-web-list>
        <p
          id="multi-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--bg-disabled, #f3f4f6);
            border-radius: 6px;
            border-left: 3px solid #0058ab;
          "
        >
          Elementos seleccionados: —
        </p>
      </div>
    `}},_={args:{items:t}},v={args:{items:n,selectable:!0}},y={args:{items:l,selectable:!0}},b={render:()=>e`
      <div>
        <dcx-web-list
          .items=${o}
          .selectable=${!0}
          .externalSelection=${!0}
          @itemSelected=${e=>{let{index:t}=e.detail,n=document.getElementById(`external-status`);n&&(n.textContent=`Índice emitido: ${t}`)}}
        ></dcx-web-list>
        <p
          id="external-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--bg-disabled, #f3f4f6);
            border-radius: var(--r-mdm, 6px);
            border-left: 3px solid #0058ab;
          "
        >
          Índice emitido: —
        </p>
      </div>
    `},x={render:()=>e`
    <dcx-web-list
      .items=${s}
      .selectable=${!0}
      .itemTemplate=${({item:t,selected:n})=>e`
        <div
          style="
            display:flex;
            align-items:center;
            gap: var(--sp-3, 12px);
            padding:12px 16px;
          "
        >
          <span
            style="font-weight: var(--fw-semibold, 600);"
          >
            ${t.text}
          </span>

          <span
            style="
              font-size: var(--fs-xs, 11px);
              color:#64748b;
            "
          >
            ${t.description}
          </span>

          ${n?e`
                <span
                  style="
                    margin-left:auto;
                    color:#0369a1;
                    font-weight: var(--fw-bold, 700);
                  "
                >
                  ✓
                </span>
              `:``}
        </div>
      `}
    >
    </dcx-web-list>
  `};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    items: LIST_ITEMS_WITH_ICONS,
    selectable: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
    selectable: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: LIST_ITEMS_WITH_SUBLISTS,
    selectable: true,
    showChildrenIndicator: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const updateStatus = (e: Event) => {
      const {
        item,
        index
      } = (e as CustomEvent<{
        item: DcxListItem;
        index: number;
      }>).detail;
      const el = document.getElementById('selectable-status');
      if (el) el.textContent = \`Seleccionado: \${item.text ?? item.label} (index: \${index})\`;
    };
    return html\`
      <div>
        <dcx-web-list
          .items=\${SELECTABLE_LIST_ITEMS}
          .selectable=\${true}
          @itemSelected=\${updateStatus}
        ></dcx-web-list>
        <p
          id="selectable-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--background-color, #f3f4f6);
            border-radius: var(--r-md, 6px);
            border-left: 3px solid #0058ab;
          "
        >
          Seleccionado: —
        </p>
      </div>
    \`;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const selected = new Map<number, string>();
    const onSelected = (e: Event) => {
      const {
        item,
        index
      } = (e as CustomEvent<{
        item: DcxListItem;
        index: number;
      }>).detail;
      selected.set(index, item.text ?? item.label ?? '');
      updateStatus();
    };
    const onDeselected = (e: Event) => {
      const {
        index
      } = (e as CustomEvent<{
        index: number;
      }>).detail;
      selected.delete(index);
      updateStatus();
    };
    const updateStatus = () => {
      const el = document.getElementById('multi-status');
      if (!el) return;
      if (selected.size === 0) {
        el.textContent = 'Elementos seleccionados: —';
      } else {
        const names = [...selected.values()].join(', ');
        el.textContent = \`Elementos seleccionados (\${selected.size}): \${names}\`;
      }
    };
    return html\`
      <div>
        <dcx-web-list
          .items=\${MULTI_SELECT_LIST_ITEMS}
          .selectable=\${true}
          .multiSelect=\${true}
          @itemSelected=\${onSelected}
          @itemDeselected=\${onDeselected}
        ></dcx-web-list>
        <p
          id="multi-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--bg-disabled, #f3f4f6);
            border-radius: 6px;
            border-left: 3px solid #0058ab;
          "
        >
          Elementos seleccionados: —
        </p>
      </div>
    \`;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    items: LIST_ITEMS_WITH_DIVIDER
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    items: LIST_ENABLED_DISABLED_ITEMS,
    selectable: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: DANGER_LIST_ITEMS,
    selectable: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const updateStatus = (e: Event) => {
      const {
        index
      } = (e as CustomEvent<{
        item: DcxListItem;
        index: number;
      }>).detail;
      const el = document.getElementById('external-status');
      if (el) el.textContent = \`Índice emitido: \${index}\`;
    };
    return html\`
      <div>
        <dcx-web-list
          .items=\${SELECTABLE_LIST_ITEMS}
          .selectable=\${true}
          .externalSelection=\${true}
          @itemSelected=\${updateStatus}
        ></dcx-web-list>
        <p
          id="external-status"
          style="
            margin-top: 14px;
            font-size: 13px;
            color: #374151;
            font-family: 'Inter', sans-serif;
            padding: 8px 12px;
            background: var(--bg-disabled, #f3f4f6);
            border-radius: var(--r-mdm, 6px);
            border-left: 3px solid #0058ab;
          "
        >
          Índice emitido: —
        </p>
      </div>
    \`;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <dcx-web-list
      .items=\${LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION}
      .selectable=\${true}
      .itemTemplate=\${({
    item,
    selected
  }: {
    item: DcxListItem;
    selected: boolean;
  }) => html\`
        <div
          style="
            display:flex;
            align-items:center;
            gap: var(--sp-3, 12px);
            padding:12px 16px;
          "
        >
          <span
            style="font-weight: var(--fw-semibold, 600);"
          >
            \${item.text}
          </span>

          <span
            style="
              font-size: var(--fs-xs, 11px);
              color:#64748b;
            "
          >
            \${item.description}
          </span>

          \${selected ? html\`
                <span
                  style="
                    margin-left:auto;
                    color:#0369a1;
                    font-weight: var(--fw-bold, 700);
                  "
                >
                  ✓
                </span>
              \` : ''}
        </div>
      \`}
    >
    </dcx-web-list>
  \`
}`,...x.parameters?.docs?.source}}};var S=[`Default`,`WithIcons`,`WithDescription`,`WithSubLists`,`Selectable`,`MultiSelectable`,`Dividers`,`DisabledItems`,`Danger`,`ExternalControl`,`CustomTemplate`];export{x as CustomTemplate,y as Danger,d as Default,v as DisabledItems,_ as Dividers,b as ExternalControl,g as MultiSelectable,h as Selectable,p as WithDescription,f as WithIcons,m as WithSubLists,S as __namedExportsOrder,u as default};