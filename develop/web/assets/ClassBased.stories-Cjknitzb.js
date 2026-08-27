import{a as e}from"./lit-C11zoK0j.js";import{l as t}from"./src-hmMJswT-.js";var n=[`none`,`compact`,`spacious`],r=`search.x.check.check2.plus.dash.trash.trash-fill.pencil.pencil-fill.arrow-left.arrow-right.arrow-up.arrow-down.chevron-left.chevron-right.chevron-up.chevron-down.chevron-double-left.chevron-double-right.chevron-double-up.chevron-double-down.house.house-fill.gear.gear-fill.bell.bell-fill.person.person-fill.people.people-fill.check-circle.check-circle-fill.x-circle.x-circle-fill.exclamation-circle.exclamation-circle-fill.info-circle.info-circle-fill.heart.heart-fill.star.star-fill.bookmark.bookmark-fill.file-earmark.file-earmark-fill.folder.folder-fill.download.upload.cloud.cloud-fill.envelope.envelope-fill.chat.chat-fill.telephone.telephone-fill.camera.camera-fill.image.image-fill.play-circle.play-circle-fill.pause-circle.pause-circle-fill.calendar.calendar-fill.clock.clock-fill.eye.eye-fill.eye-slash.eye-slash-fill.lock.lock-fill.cart.cart-fill`.split(`.`),i={title:`DCXLibrary/WebComponents/Icon`,component:`dcx-web-icon`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{name:{control:`text`,description:"Nombre del icono de Bootstrap Icons, sin el prefijo `bi-` (p.ej. `gear`, `search`, `heart`).",table:{category:`Atributos`}},size:{control:`select`,options:t,description:"Tamaño del icono. `auto` hereda el tamaño del contenedor.",table:{category:`Atributos`}},spacing:{control:`select`,options:n,description:`Margen horizontal externo del icono.`,table:{category:`Atributos`}},color:{control:`color`,description:`Color del icono (hexadecimal o nombre CSS). Si se deja vacío, usa el azul corporativo.`,table:{category:`Atributos`}},extraClass:{control:`text`,description:`Clases CSS adicionales.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:'Nombre accesible. Si se indica, el icono es significativo (`role="img"` + `aria-label`). Si se deja vacío, el icono es decorativo.',table:{category:`Atributos`}}},args:{name:`gear`,size:`m`,spacing:`none`,color:``,extraClass:``,ariaLabel:``},render:t=>e`
    <dcx-web-icon
      name=${t.name}
      size=${t.size}
      spacing=${t.spacing}
      color=${t.color||``}
      extra-class=${t.extraClass||``}
      aria-label=${t.ariaLabel||``}
    ></dcx-web-icon>
  `},a={args:{name:`gear`}},o={render:t=>e`
    <div style="display:flex;align-items:flex-end;gap:1.5rem;">
      ${[`s`,`m`,`l`,`xl`].map(n=>e`
          <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem;">
            <dcx-web-icon name=${t.name} size=${n} color=${t.color||``}></dcx-web-icon>
            <small style="color:#666;">${n}</small>
          </div>
        `)}
    </div>
  `},s={render:t=>e`
    <div style="display:flex;flex-direction:column;gap:.75rem;">
      ${[`none`,`compact`,`spacious`].map(n=>e`
          <div style="background:#f4f5f7;border-radius:6px;padding:4px;">
            <span style="background:#fff;">texto</span><dcx-web-icon name=${t.name} size=${t.size} spacing=${n}></dcx-web-icon><span style="background:#fff;">${n}</span>
          </div>
        `)}
    </div>
  `},c={render:t=>e`
    <div style="display:flex;gap:1.5rem;">
      ${[`#0058ab`,`#16a34a`,`#dc2626`,`#d97706`].map(n=>e`
          <dcx-web-icon name=${t.name} size=${t.size} color=${n}></dcx-web-icon>
        `)}
    </div>
  `},l={args:{name:`gear`,ariaLabel:`Configuración`}},u={render:t=>{let n=[...r].sort((e,t)=>e.localeCompare(t)),i=async e=>{try{await navigator.clipboard.writeText(e),alert(`Copiado al portapapeles`)}catch{let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.left=`-9999px`,document.body.appendChild(t),t.select(),document.execCommand(`copy`),document.body.removeChild(t)}};return e`
      <div style="max-width: 1200px; margin: 0 auto; padding: 16px;">
        <div style="
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          justify-content: center;
          justify-items: center;
          align-items: start;
        ">
          ${n.map(n=>e`
              <div
                @click=${()=>i(n)}
                title=${`Click para copiar: ${n}`}
                style="cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px;"
              >
                <dcx-web-icon
                  name=${n}
                  size=${t.size}
                  spacing=${t.spacing}
                  color=${t.color||``}
                ></dcx-web-icon>
                <div style="font-size: 14px; color: #666; text-align: center; word-break: break-word;">
                  ${n}
                </div>
              </div>
            `)}
        </div>
      </div>
    `}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'gear'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div style="display:flex;align-items:flex-end;gap:1.5rem;">
      \${['s', 'm', 'l', 'xl'].map(size => html\`
          <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem;">
            <dcx-web-icon name=\${args.name} size=\${size} color=\${args.color || ''}></dcx-web-icon>
            <small style="color:#666;">\${size}</small>
          </div>
        \`)}
    </div>
  \`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div style="display:flex;flex-direction:column;gap:.75rem;">
      \${['none', 'compact', 'spacious'].map(sp => html\`
          <div style="background:#f4f5f7;border-radius:6px;padding:4px;">
            <span style="background:#fff;">texto</span><dcx-web-icon name=\${args.name} size=\${args.size} spacing=\${sp}></dcx-web-icon><span style="background:#fff;">\${sp}</span>
          </div>
        \`)}
    </div>
  \`
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <div style="display:flex;gap:1.5rem;">
      \${['#0058ab', '#16a34a', '#dc2626', '#d97706'].map(c => html\`
          <dcx-web-icon name=\${args.name} size=\${args.size} color=\${c}></dcx-web-icon>
        \`)}
    </div>
  \`
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'gear',
    ariaLabel: 'Configuración'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const sortedIcons = [...BOOTSTRAP_ICONS].sort((a, b) => a.localeCompare(b));
    const onCopy = async (name: string) => {
      try {
        await navigator.clipboard.writeText(name);
        alert('Copiado al portapapeles');
      } catch {
        const ta = document.createElement('textarea');
        ta.value = name;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    };
    return html\`
      <div style="max-width: 1200px; margin: 0 auto; padding: 16px;">
        <div style="
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          justify-content: center;
          justify-items: center;
          align-items: start;
        ">
          \${sortedIcons.map(icon => html\`
              <div
                @click=\${() => onCopy(icon)}
                title=\${\`Click para copiar: \${icon}\`}
                style="cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px;"
              >
                <dcx-web-icon
                  name=\${icon}
                  size=\${args.size}
                  spacing=\${args.spacing}
                  color=\${args.color || ''}
                ></dcx-web-icon>
                <div style="font-size: 14px; color: #666; text-align: center; word-break: break-word;">
                  \${icon}
                </div>
              </div>
            \`)}
        </div>
      </div>
    \`;
  }
}`,...u.parameters?.docs?.source}}};var d=[`Default`,`Sizes`,`Spacing`,`Color`,`Accessible`,`AllIcons`];export{l as Accessible,u as AllIcons,c as Color,a as Default,o as Sizes,s as Spacing,d as __namedExportsOrder,i as default};