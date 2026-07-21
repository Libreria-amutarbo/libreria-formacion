import{a as e,n as t}from"./lit-LoFRC6vp.js";import{c as n,d as r,f as i,h as a,l as o,m as s,o as c,p as l,s as u,u as d}from"./defaults-DUNPOyan.js";var f={title:`DCXLibrary/WebComponents/Accordion`,component:`dcx-web-accordion`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{items:{control:`object`,description:`Lista de items del acordeón.`,table:{category:`Atributos`}},transition:{control:`select`,options:l,description:`Velocidad de la animación al expandir o colapsar.`,table:{category:`Atributos`}},closeOthers:{control:`boolean`,description:`Si es true, abrir un panel cierra el resto.`,table:{category:`Atributos`}},variant:{control:`select`,options:s,description:`Variante visual del acordeón.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Etiqueta accesible para el elemento raíz.`,table:{category:`Atributos`}}},args:{items:c,transition:`smooth`,closeOthers:!0,variant:`default`},render:t=>e`
    <dcx-web-accordion
      .items=${t.items}
      transition=${t.transition}
      .closeOthers=${t.closeOthers}
      variant=${t.variant}
      aria-label=${t.ariaLabel||``}
    ></dcx-web-accordion>
  `},p={args:{items:c}},m={args:{items:r}},h={args:{items:n}},g={args:{items:u}},_={args:{items:d,closeOthers:!1}},v={args:{items:c,transition:`fast`}},y={args:{items:c,transition:`slow`}},b={args:{items:c,transition:`none`}},x={args:{items:i}},S={args:{items:o}},C={render:()=>{let t=[...a];return e`
      <dcx-web-accordion .items=${[{id:`1`,title:`Interactive Buttons`,icon:`hand-pointer`,contentTemplate:()=>e`
      <div style="display: flex; gap: var(--sp-2, 8px); flex-wrap: wrap; padding: var(--sp-2, 8px) 0;">
        <dcx-web-button label="Primary Action" variant="primary"></dcx-web-button>
        <dcx-web-button label="Secondary Action" variant="secondary"></dcx-web-button>
        <dcx-web-button label="Outline Action" variant="terciary"></dcx-web-button>
      </div>
    `},{id:`2`,title:`Form Components`,icon:`file-text`,contentTemplate:()=>e`
      <div style="display: flex; flex-direction: column; gap: var(--sp-3, 12px); padding: var(--sp-2, 8px) 0; max-width: 320px;">
        <div style="display: flex; flex-direction: column; gap: var(--sp-1, 4px);">
          <label style="font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600);">Nombre</label>
          <input type="text" placeholder="Escribe tu nombre..." style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--sp-1, 4px);">
          <label style="font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600);">Email</label>
          <input type="email" placeholder="tu@email.com" style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <dcx-web-button label="Enviar" variant="primary"></dcx-web-button>
      </div>
    `},{id:`3`,title:`Dynamic List`,icon:`list`,contentTemplate:()=>e`
          <div style="padding: var(--sp-2, 8px) 0;">
            <ul id="story-list-container" style="margin: 0 0 var(--sp-3, 12px) 0; padding-left: var(--sp-5, 20px);">
              ${t.map(t=>e`<li>${t}</li>`)}
            </ul>
            <div style="display: flex; gap: var(--sp-2, 8px);">
              <dcx-web-button
                label="Añadir"
                variant="primary"
                @click=${e=>{t.push(`Item ${t.length+1}`);let n=e.target.getRootNode().querySelector(`#story-list-container`);n&&(n.innerHTML=t.map(e=>`<li>${e}</li>`).join(``))}}
              ></dcx-web-button>
              <dcx-web-button
                label="Eliminar último"
                variant="secondary"
                @click=${e=>{if(t.length>0){t.pop();let n=e.target.getRootNode().querySelector(`#story-list-container`);n&&(n.innerHTML=t.map(e=>`<li>${e}</li>`).join(``))}}}
              ></dcx-web-button>
            </div>
          </div>
        `}]}></dcx-web-accordion>
    `}},w={render:n=>{let r={},i=e=>{let t=e.detail,i=document.querySelector(`dcx-web-accordion#external-acc`);if(!i)return;let a={};a[t.id]=i.isExpanded(t.id),r=a,n.items.forEach(e=>{let t=document.querySelector(`#btn-ext-${e.id}`);t&&(t.label=r[e.id]?`Cerrar: ${e.title}`:`Abrir: ${e.title}`,t.variant=r[e.id]?`primary`:`secondary`)})},a=e=>{let t=document.querySelector(`dcx-web-accordion#external-acc`);t&&(t.isExpanded(e)?t.collapseItemById(e):t.expandItemById(e))};return e`
      <p style="font-size:13px;color:var(--text-muted, #696e75);margin-bottom:var(--sp-3, 12px)">
        Los botones controlan el acordeón desde fuera mediante referencias de plantilla.
        Abre un panel haciendo clic en el botón <strong>o</strong> directamente en la cabecera.
      </p>

      <div style="display:flex; gap:var(--sp-2, 8px); margin-bottom:var(--sp-4, 16px); flex-wrap:wrap;">
        ${n.items.map(n=>n.disabled?t:e`
              <dcx-web-button
                id="btn-ext-${n.id}"
                label="Abrir: ${n.title}"
                variant="secondary"
                @click=${()=>a(n.id)}
              ></dcx-web-button>
            `)}
      </div>

      <dcx-web-accordion
        id="external-acc"
        .items=${n.items}
        .transition=${n.transition}
        @itemToggled=${i}
      ></dcx-web-accordion>
    `},args:{items:c}},T={render:t=>e`
    <p style="font-size:13px;color:var(--text-muted, #696e75);margin-bottom:var(--sp-3, 12px)">
      Usa los botones para expandir o colapsar todos los paneles de golpe.
      Funciona independientemente de <code>closeOthers</code>.
    </p>

    <div style="display:flex; gap:var(--sp-2, 8px); margin-bottom:var(--sp-4, 16px);">
      <dcx-web-button
        label="Expandir todo"
        variant="primary"
        @click=${()=>{document.querySelector(`dcx-web-accordion#all-acc`)?.expandAll()}}
      ></dcx-web-button>
      <dcx-web-button
        label="Colapsar todo"
        variant="secondary"
        @click=${()=>{document.querySelector(`dcx-web-accordion#all-acc`)?.collapseAll()}}
      ></dcx-web-button>
    </div>

    <dcx-web-accordion
      id="all-acc"
      .items=${t.items}
      .closeOthers=${!1}
    ></dcx-web-accordion>
  `,args:{items:c}},E={args:{items:r,variant:`flush`}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionDefault
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionItemsWithIcon
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionItemsDisabled
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionItemsContentDisabled
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionItemsWithExpanded,
    closeOthers: false
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionDefault,
    transition: 'fast'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionDefault,
    transition: 'slow'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionDefault,
    transition: 'none'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionLargeContent
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionItemsWithDescription
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const listItems = [...LIST_ITEMS_MOCK];
    const buttonTemplate = () => html\`
      <div style="display: flex; gap: var(--sp-2, 8px); flex-wrap: wrap; padding: var(--sp-2, 8px) 0;">
        <dcx-web-button label="Primary Action" variant="primary"></dcx-web-button>
        <dcx-web-button label="Secondary Action" variant="secondary"></dcx-web-button>
        <dcx-web-button label="Outline Action" variant="terciary"></dcx-web-button>
      </div>
    \`;
    const formTemplate = () => html\`
      <div style="display: flex; flex-direction: column; gap: var(--sp-3, 12px); padding: var(--sp-2, 8px) 0; max-width: 320px;">
        <div style="display: flex; flex-direction: column; gap: var(--sp-1, 4px);">
          <label style="font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600);">Nombre</label>
          <input type="text" placeholder="Escribe tu nombre..." style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--sp-1, 4px);">
          <label style="font-size: var(--fs-sm, 12px); font-weight: var(--fw-semibold, 600);">Email</label>
          <input type="email" placeholder="tu@email.com" style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <dcx-web-button label="Enviar" variant="primary"></dcx-web-button>
      </div>
    \`;
    const items = [{
      id: '1',
      title: 'Interactive Buttons',
      icon: 'hand-pointer',
      contentTemplate: buttonTemplate
    }, {
      id: '2',
      title: 'Form Components',
      icon: 'file-text',
      contentTemplate: formTemplate
    }, {
      id: '3',
      title: 'Dynamic List',
      icon: 'list',
      contentTemplate: () => html\`
          <div style="padding: var(--sp-2, 8px) 0;">
            <ul id="story-list-container" style="margin: 0 0 var(--sp-3, 12px) 0; padding-left: var(--sp-5, 20px);">
              \${listItems.map(item => html\`<li>\${item}</li>\`)}
            </ul>
            <div style="display: flex; gap: var(--sp-2, 8px);">
              <dcx-web-button
                label="Añadir"
                variant="primary"
                @click=\${(evt: Event) => {
        listItems.push(\`Item \${listItems.length + 1}\`);
        const root = (evt.target as HTMLElement).getRootNode() as DocumentFragment;
        const listEl = root.querySelector('#story-list-container');
        if (listEl) {
          listEl.innerHTML = listItems.map(item => \`<li>\${item}</li>\`).join('');
        }
      }}
              ></dcx-web-button>
              <dcx-web-button
                label="Eliminar último"
                variant="secondary"
                @click=\${(evt: Event) => {
        if (listItems.length > 0) {
          listItems.pop();
          const root = (evt.target as HTMLElement).getRootNode() as DocumentFragment;
          const listEl = root.querySelector('#story-list-container');
          if (listEl) {
            listEl.innerHTML = listItems.map(item => \`<li>\${item}</li>\`).join('');
          }
        }
      }}
              ></dcx-web-button>
            </div>
          </div>
        \`
    }];
    return html\`
      <dcx-web-accordion .items=\${items}></dcx-web-accordion>
    \`;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    let expandedMap: Record<string, boolean> = {};
    const onToggled = (e: any) => {
      const item = e.detail;
      const acc = document.querySelector('dcx-web-accordion#external-acc') as any;
      if (!acc) return;
      const next: Record<string, boolean> = {};
      next[item.id] = acc.isExpanded(item.id);
      expandedMap = next;
      args.items.forEach((it: any) => {
        const btn = document.querySelector(\`#btn-ext-\${it.id}\`) as any;
        if (btn) {
          btn.label = expandedMap[it.id] ? \`Cerrar: \${it.title}\` : \`Abrir: \${it.title}\`;
          btn.variant = expandedMap[it.id] ? 'primary' : 'secondary';
        }
      });
    };
    const toggle = (id: string) => {
      const acc = document.querySelector('dcx-web-accordion#external-acc') as any;
      if (!acc) return;
      if (acc.isExpanded(id)) {
        acc.collapseItemById(id);
      } else {
        acc.expandItemById(id);
      }
    };
    return html\`
      <p style="font-size:13px;color:var(--text-muted, #696e75);margin-bottom:var(--sp-3, 12px)">
        Los botones controlan el acordeón desde fuera mediante referencias de plantilla.
        Abre un panel haciendo clic en el botón <strong>o</strong> directamente en la cabecera.
      </p>

      <div style="display:flex; gap:var(--sp-2, 8px); margin-bottom:var(--sp-4, 16px); flex-wrap:wrap;">
        \${args.items.map((item: any) => {
      if (item.disabled) return nothing;
      return html\`
              <dcx-web-button
                id="btn-ext-\${item.id}"
                label="Abrir: \${item.title}"
                variant="secondary"
                @click=\${() => toggle(item.id)}
              ></dcx-web-button>
            \`;
    })}
      </div>

      <dcx-web-accordion
        id="external-acc"
        .items=\${args.items}
        .transition=\${args.transition}
        @itemToggled=\${onToggled}
      ></dcx-web-accordion>
    \`;
  },
  args: {
    items: DcxAccordionDefault
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <p style="font-size:13px;color:var(--text-muted, #696e75);margin-bottom:var(--sp-3, 12px)">
      Usa los botones para expandir o colapsar todos los paneles de golpe.
      Funciona independientemente de <code>closeOthers</code>.
    </p>

    <div style="display:flex; gap:var(--sp-2, 8px); margin-bottom:var(--sp-4, 16px);">
      <dcx-web-button
        label="Expandir todo"
        variant="primary"
        @click=\${() => {
    const acc = document.querySelector('dcx-web-accordion#all-acc') as any;
    acc?.expandAll();
  }}
      ></dcx-web-button>
      <dcx-web-button
        label="Colapsar todo"
        variant="secondary"
        @click=\${() => {
    const acc = document.querySelector('dcx-web-accordion#all-acc') as any;
    acc?.collapseAll();
  }}
      ></dcx-web-button>
    </div>

    <dcx-web-accordion
      id="all-acc"
      .items=\${args.items}
      .closeOthers=\${false}
    ></dcx-web-accordion>
  \`,
  args: {
    items: DcxAccordionDefault
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    items: DcxAccordionItemsWithIcon,
    variant: 'flush'
  }
}`,...E.parameters?.docs?.source}}};var D=[`Default`,`WithIcons`,`WithDisabledItems`,`WithContentDisabledItems`,`MultipleOpen`,`FastTransition`,`SlowTransition`,`NoTransition`,`LargeContent`,`WithDescription`,`WithComponents`,`ExternalControl`,`ExpandCollapseAll`,`Flush`];export{p as Default,T as ExpandCollapseAll,w as ExternalControl,v as FastTransition,E as Flush,x as LargeContent,_ as MultipleOpen,b as NoTransition,y as SlowTransition,C as WithComponents,g as WithContentDisabledItems,S as WithDescription,h as WithDisabledItems,m as WithIcons,D as __namedExportsOrder,f as default};