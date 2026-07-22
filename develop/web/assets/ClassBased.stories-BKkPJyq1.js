import{a as e}from"./lit-LoFRC6vp.js";import"./src-jWapzufL.js";var t=[{text:`Nuevo archivo`,icon:`file-earmark-plus`},{text:`Abrir`,icon:`folder2-open`},{divider:!0},{text:`Guardar`,icon:`save`},{text:`Guardar como...`,icon:`save-fill`},{divider:!0},{text:`Eliminar`,icon:`trash`,variant:`danger`},{text:`Cerrar`,icon:`x-lg`}],n=[{text:`Nuevo`,icon:`file-earmark-plus`},{text:`Abrir`,icon:`folder2-open`},{divider:!0},{text:`Editar`,icon:`pencil`,children:[{text:`Deshacer`,icon:`arrow-counterclockwise`},{text:`Rehacer`,icon:`arrow-clockwise`},{divider:!0},{text:`Transformar`,icon:`magic`,children:[{text:`Mayúsculas`,icon:`type`},{text:`Minúsculas`,icon:`type`}]}]},{divider:!0},{text:`Eliminar`,icon:`trash`,variant:`danger`}],r=[{text:`Ver perfil`,icon:`person`},{text:`Configuración`,icon:`gear`},{divider:!0},{text:`Más opciones`,icon:`three-dots`,children:[{text:`Opción 1`,icon:`check`},{text:`Opción 2`,icon:`check`}]},{divider:!0},{text:`Cerrar sesión`,icon:`box-arrow-right`,variant:`danger`}],i=[{text:`Nuevo archivo`,icon:`file-earmark-plus`},{text:`Abrir`,icon:`folder2-open`},{divider:!0},{text:`Guardar`,icon:`save`,disabled:!0},{text:`Guardar como...`,icon:`save-fill`,disabled:!0},{divider:!0},{text:`Cerrar`,icon:`x-lg`,disabled:!0}],a=[{text:`Editar`,icon:`pencil`},{text:`Duplicar`,icon:`copy`},{divider:!0},{text:`Archivar`,icon:`archive`,variant:`danger`},{text:`Eliminar permanentemente`,icon:`trash`,variant:`danger`}],o={title:`DCXLibrary/WebComponents/ContextMenu`,component:`dcx-web-context-menu`,tags:[`autodocs`],argTypes:{items:{name:`items`,control:{type:`object`},description:`Array de elementos del menú contextual`,table:{category:`Atributos`}},position:{name:`position`,control:{type:`object`},description:`Posición del menú (x, y) en píxeles`,table:{category:`Atributos`}},positionMode:{name:`positionMode`,control:{type:`select`},options:[`fixed`,`absolute`],description:`Estrategia de posicionamiento`,table:{category:`Atributos`}}},args:{items:t,position:{x:315,y:70},positionMode:`fixed`}},s=(t,n,r,i)=>e`
    <div style="padding: 2rem; position: relative;">
      <div
        @contextmenu="${e=>{e.preventDefault();let t=e.currentTarget.parentElement?.querySelector(`dcx-web-context-menu`);if(t){let n=e.currentTarget.getBoundingClientRect(),i=r===`absolute`?{x:e.clientX-n.left,y:e.clientY-n.top}:{x:e.clientX,y:e.clientY};t.position=i,setTimeout(()=>{t.open(i)},0)}}}"
        style="
          border: 2px dashed #ccc;
          padding: 3rem;
          text-align: center;
          cursor: context-menu;
          background: #f9f9f9;
          border-radius: 6px;
          min-height: 200px;
        "
      >
        <p style="margin: 0;">${t}</p>
      </div>
      <dcx-web-context-menu
        .items="${n}"
        .position="${i||{x:0,y:0}}"
        .positionMode="${r}"
        @item-selected="${e=>{}}"
      ></dcx-web-context-menu>
    </div>
  `,c={render:e=>s(`Haz clic derecho aquí para abrir el menú contextual`,e.items,e.positionMode,e.position)},l={render:e=>s(`Haz clic derecho aquí para abrir el menú con sublistas`,e.items,e.positionMode,e.position),args:{items:n}},u={render:e=>s(`Haz clic derecho para ver items desactivados`,e.items,e.positionMode,e.position),args:{items:i}},d={render:e=>s(`Haz clic derecho para ver la variante danger`,e.items,e.positionMode,e.position),args:{items:a}},f={render:t=>e`
      <div style="padding: 2rem;">
        <div style="display: inline-block;">
          <dcx-web-button
            label="Abrir menú"
            variant="primary"
            @click="${e=>{let t=e.currentTarget,n=t.closest(`div`)?.parentElement?.querySelector(`dcx-web-context-menu`);if(n){let e=t.getBoundingClientRect(),r={x:e.left,y:e.bottom+4};n.position=r,setTimeout(()=>{n.open(r)},0)}}}"
          ></dcx-web-button>
        </div>
        <dcx-web-context-menu
          .items="${t.items}"
          .position="${t.position||{x:0,y:0}}"
          .positionMode="${t.positionMode}"
          @item-selected="${e=>{}}"
        ></dcx-web-context-menu>
      </div>
    `,args:{items:r}},p={render:e=>s(`Clic derecho — menú con positionMode="absolute" (relativo al contenedor)`,e.items,`absolute`,e.position),args:{items:t}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => rightClickTemplate('Haz clic derecho aquí para abrir el menú contextual', args.items, args.positionMode, args.position)
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => rightClickTemplate('Haz clic derecho aquí para abrir el menú con sublistas', args.items, args.positionMode, args.position),
  args: {
    items: SUBLIST_CONTEXT_MENU_ITEMS
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => rightClickTemplate('Haz clic derecho para ver items desactivados', args.items, args.positionMode, args.position),
  args: {
    items: DEMO_DISABLED_MENU_ITEMS
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => rightClickTemplate('Haz clic derecho para ver la variante danger', args.items, args.positionMode, args.position),
  args: {
    items: DEMO_DANGER_MENU_ITEMS
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => {
    const handleButtonClick = (event: Event) => {
      const button = event.currentTarget as HTMLElement;
      const menu = button.closest('div')?.parentElement?.querySelector('dcx-web-context-menu') as any;
      if (menu) {
        const rect = button.getBoundingClientRect();
        const pos = {
          x: rect.left,
          y: rect.bottom + 4
        };
        menu.position = pos;
        setTimeout(() => {
          menu.open(pos);
        }, 0);
      }
    };
    const handleItemSelected = (event: CustomEvent) => {
      void event;
    };
    return html\`
      <div style="padding: 2rem;">
        <div style="display: inline-block;">
          <dcx-web-button
            label="Abrir menú"
            variant="primary"
            @click="\${handleButtonClick}"
          ></dcx-web-button>
        </div>
        <dcx-web-context-menu
          .items="\${args.items}"
          .position="\${args.position || {
      x: 0,
      y: 0
    }}"
          .positionMode="\${args.positionMode}"
          @item-selected="\${handleItemSelected}"
        ></dcx-web-context-menu>
      </div>
    \`;
  },
  args: {
    items: DEMO_ADVANCED_MENU_ITEMS
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => rightClickTemplate('Clic derecho — menú con positionMode="absolute" (relativo al contenedor)', args.items, 'absolute', args.position),
  args: {
    items: SIMPLE_CONTEXT_MENU_ITEMS
  }
}`,...p.parameters?.docs?.source}}};var m=[`ContextMenuOnRightClick`,`ContextMenuWithSublists`,`WithDisabledItems`,`WithDangerItems`,`ButtonTrigger`,`AbsolutePositioning`];export{p as AbsolutePositioning,f as ButtonTrigger,c as ContextMenuOnRightClick,l as ContextMenuWithSublists,d as WithDangerItems,u as WithDisabledItems,m as __namedExportsOrder,o as default};