import"./src-CcF-99Vi.js";import{n as e}from"./dist-OgikbosW.js";var t=[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`top-right`,`bottom-left`,`bottom-right`],n={closeDialog:e()},r={title:`DCXLibrary/WebComponents/Dialog`,component:`dcx-web-dialog`,tags:[`autodocs`],parameters:{controls:{expanded:!0},docs:{description:{component:'`dcx-web-dialog` es un componente modal accesible implementado como Web Component. Soporta posicionamiento configurable, backdrop opcional, header con título y botón de cierre, y proyección de contenido personalizado mediante slots (`slot="body"`, `slot="footer"`).\n\n**Integración Web Component:**\n- Abre el diálogo estableciendo `.visible = true`\n- Cierra el diálogo escuchando el evento `closeDialog`\n\n⚠️ El contenido HTML proyectado en las stories con `unsafeHTML` es estático. Para contenido interactivo real, usa nodos HTML o componentes dentro de los slots.'}}},argTypes:{dialogId:{control:`text`,description:`Identificador único del diálogo. Se usa para generar el id accesible del título. En Web Component no se gestiona mediante servicio.`,table:{category:`Atributos`,type:{summary:`string | undefined`},defaultValue:{summary:`undefined`}}},title:{control:`text`,description:`Texto del título mostrado en el header del diálogo. Si está vacío, el elemento de título no se renderiza.`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},visible:{control:`boolean`,description:"Controla la visibilidad del diálogo. Si es `true`, el diálogo se renderiza; si es `false`, no se muestra.",table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},showClose:{control:`boolean`,description:"Muestra u oculta el botón de cierre (✕) en el header. Cuando es `false`, el usuario solo puede cerrar el diálogo mediante acciones externas o footer.",table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},showConfirmationFooter:{control:`boolean`,description:`Parámetro de la story que alterna entre footer simple con "Aceptar" y footer de confirmación con "Cancelar" + "Aceptar".`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},position:{control:`select`,options:t,description:"Posición del diálogo en pantalla. Aplica la clase CSS `dcx-dialog--pos-{value}`.",table:{category:`Atributos`,type:{summary:`DialogPosition`},defaultValue:{summary:`center`}}},bodyHtml:{control:`text`,description:'HTML estático inyectado en el slot `body` para la story. Para uso real, proyecta contenido mediante `<div slot="body">...</div>`.',table:{category:`Slots`,type:{summary:`slot="body"`},defaultValue:{summary:`''`}}},footerHtml:{control:`text`,description:'Campo documental para representar contenido del footer. El footer funcional de las stories usa botones reales dentro de `slot="footer"`.',table:{category:`Slots`,type:{summary:`slot="footer"`},defaultValue:{summary:`''`}}},closeOnBackdrop:{control:`boolean`,description:"Si es `true`, hacer clic en el backdrop semitransparente emite `closeDialog`. Recomendado `false` en confirmaciones.",table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},closeDialog:{action:`closeDialog`,description:"Evento emitido cuando el diálogo solicita cerrarse: botón ✕, tecla Escape o backdrop si `closeOnBackdrop` está activo.",table:{category:`Eventos`,type:{summary:`CustomEvent<void>`}}},openButtonLabel:{control:!1,table:{disable:!0}},primaryLabel:{control:!1,table:{disable:!0}},secondaryLabel:{control:!1,table:{disable:!0}},footerMode:{control:!1,table:{disable:!0}}},args:{dialogId:`basic-dialog`,title:`Información`,visible:!1,showClose:!0,showConfirmationFooter:!1,position:`center`,closeOnBackdrop:!0,bodyHtml:`<p>Este es un mensaje informativo dentro del diálogo.</p>`,footerHtml:``,openButtonLabel:`Abrir dialog`,primaryLabel:`Aceptar`,secondaryLabel:`Cancelar`,footerMode:`simple`},render:(e,{updateArgs:t})=>{let r=document.createElement(`div`);r.style.minHeight=`50vh`,r.style.display=`grid`,r.style.placeItems=`center`,r.style.gap=`24px`;let i=document.createElement(`dcx-web-button`);i.setAttribute(`variant`,`primary`),i.label=e.openButtonLabel??`Abrir dialog`;let a=document.createElement(`dcx-web-dialog`);a.dialogId=e.dialogId??``,a.title=e.title,a.visible=e.visible,a.showClose=e.showClose,a.position=e.position,a.closeOnBackdrop=e.closeOnBackdrop;let o=document.createElement(`div`);o.slot=`body`,o.innerHTML=e.bodyHtml;let s=document.createElement(`div`);s.slot=`footer`;let c=()=>{n.closeDialog(),a.visible=!1,t({visible:!1})};if(i.addEventListener(`click`,()=>{a.visible=!0,t({visible:!0})}),a.addEventListener(`closeDialog`,c),e.footerMode===`danger`){let t=document.createElement(`div`);t.setAttribute(`style`,`display:flex; gap:1rem; justify-content:flex-end;`);let n=document.createElement(`dcx-web-button`);n.label=e.secondaryLabel??`Cancelar`,n.setAttribute(`variant`,`secondary`);let r=document.createElement(`dcx-web-button`);r.label=e.primaryLabel??`Eliminar`,r.setAttribute(`variant`,`danger`),n.addEventListener(`click`,c),r.addEventListener(`click`,c),t.append(n,r),s.appendChild(t)}else if(e.showConfirmationFooter||e.footerMode===`confirmation`){let t=document.createElement(`div`);t.setAttribute(`style`,`display:flex; gap:1rem; justify-content:flex-end;`);let n=document.createElement(`dcx-web-button`);n.label=e.secondaryLabel??`Cancelar`,n.setAttribute(`variant`,`secondary`),n.addEventListener(`click`,c);let r=document.createElement(`dcx-web-button`);r.label=e.primaryLabel??`Aceptar`,r.setAttribute(`variant`,`primary`),r.addEventListener(`click`,c),t.append(n,r),s.appendChild(t)}else{let t=document.createElement(`dcx-web-button`);t.label=e.primaryLabel??`Aceptar`,t.setAttribute(`variant`,`primary`),t.addEventListener(`click`,c),s.appendChild(t)}return a.append(o,s),r.append(i,a),r}},i={name:`Básico — Informativo`,parameters:{docs:{description:{story:`Diálogo básico de información. Tiene título, botón de cierre y un único botón "Aceptar" en el footer. El backdrop cierra el diálogo al hacer clic.`}}},args:{dialogId:`basic-dialog`,title:`Información`,bodyHtml:`<p>Este es un mensaje informativo dentro del diálogo.</p>`,showClose:!0,showConfirmationFooter:!1,position:`center`,closeOnBackdrop:!0,visible:!1,openButtonLabel:`Abrir dialog`,primaryLabel:`Aceptar`,footerMode:`simple`}},a={name:`Confirmación — Con footer de acción`,parameters:{docs:{description:{story:'Diálogo de confirmación con footer de dos acciones: "Cancelar" y "Aceptar". `closeOnBackdrop` está desactivado para forzar una decisión explícita del usuario.'}}},args:{dialogId:`confirmation-dialog`,title:`¿Confirmar acción?`,bodyHtml:`<p>¿Estás seguro de que quieres continuar? Esta acción no se puede deshacer.</p>`,showClose:!0,showConfirmationFooter:!0,position:`center`,closeOnBackdrop:!1,visible:!1,openButtonLabel:`Abrir confirmación`,primaryLabel:`Aceptar`,secondaryLabel:`Cancelar`,footerMode:`confirmation`}},o={name:`Sin botón de cierre`,parameters:{docs:{description:{story:"Diálogo sin el botón ✕ en el header (`showClose: false`). Útil para flujos donde se requiere que el usuario tome una decisión explícita."}}},args:{dialogId:`no-close-dialog`,title:`Acción requerida`,bodyHtml:`<p>Debes aceptar los términos para continuar.</p>`,showClose:!1,showConfirmationFooter:!0,position:`center`,closeOnBackdrop:!1,visible:!1,openButtonLabel:`Abrir diálogo`,primaryLabel:`Aceptar`,secondaryLabel:`Cancelar`,footerMode:`confirmation`}},s={name:`Sin título`,parameters:{docs:{description:{story:"Cuando `title` está vacío, el header no renderiza el elemento de título, dejando solo el botón de cierre."}}},args:{dialogId:`no-title-dialog`,title:``,bodyHtml:`<p>Este diálogo no tiene título en el header.</p>`,showClose:!0,showConfirmationFooter:!1,position:`center`,closeOnBackdrop:!0,visible:!1,openButtonLabel:`Abrir diálogo`,primaryLabel:`Cerrar`,footerMode:`simple`}},c={name:`Confirmación destructiva`,parameters:{docs:{description:{story:`Diálogo de confirmación para acciones irreversibles. Incluye un icono de aviso con fondo rojo y un botón "Eliminar".`}}},args:{dialogId:`destructive-story`,title:`Eliminar proyecto`,showClose:!0,showConfirmationFooter:!1,position:`center`,closeOnBackdrop:!1,visible:!1,openButtonLabel:`Eliminar proyecto`,primaryLabel:`Eliminar`,secondaryLabel:`Cancelar`,footerMode:`danger`,bodyHtml:`
      <div style="width:44px;height:44px;border-radius:50%;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <dcx-web-icon
          name="trash"
          size="m"
          color="#dc2626"
          aria-label="Eliminar"
        ></dcx-web-icon>
      </div>

      <p style="font-size:14px;color:#696e75;line-height:1.6">
        ¿Estás seguro de que deseas eliminar el proyecto
        <strong style="color:#2a2e33">Cloud Migration</strong>?
        Esta acción es irreversible y no se puede deshacer.
      </p>
    `,footerHtml:``}},l={name:`Con formulario`,parameters:{docs:{description:{story:`Diálogo que contiene un formulario con campos de texto y un select. Útil para crear o editar entidades sin navegar a una página nueva.`}}},args:{dialogId:`form-story`,title:`Nuevo proyecto`,showClose:!0,showConfirmationFooter:!1,position:`center`,closeOnBackdrop:!0,visible:!1,openButtonLabel:`Nuevo proyecto`,primaryLabel:`Crear proyecto`,secondaryLabel:`Cancelar`,footerMode:`confirmation`,bodyHtml:`
      <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:16px">
        <label for="sb-project-name" style="font-size:12px;font-weight:500;color:#2a2e33">Nombre del proyecto</label>
        <input id="sb-project-name" type="text" placeholder="Ej: Cloud Migration v2"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
      </div>

      <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:16px">
        <label for="sb-client" style="font-size:12px;font-weight:500;color:#2a2e33">Cliente</label>
        <input id="sb-client" type="text" placeholder="Ej: Airbus"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
      </div>

      <div style="display:flex;flex-direction:column;gap:4px">
        <label for="sb-practice" style="font-size:12px;font-weight:500;color:#2a2e33">Práctica</label>
        <select id="sb-practice"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
          <option value="">Selecciona una práctica</option>
          <option>Cloud Infrastructure</option>
          <option>SAP</option>
          <option>Data & AI</option>
        </select>
      </div>
    `,footerHtml:``}},u={name:`Informativo`,parameters:{docs:{description:{story:`Diálogo informativo con icono circular azul en el cuerpo y un único botón "Entendido" en el footer.`}}},args:{dialogId:`informative-story`,title:`Información importante`,showClose:!0,showConfirmationFooter:!1,position:`center`,closeOnBackdrop:!0,visible:!1,openButtonLabel:`Ver información`,primaryLabel:`Entendido`,footerMode:`simple`,bodyHtml:`
      <div style="width:44px;height:44px;border-radius:50%;background:#dbeafe;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <dcx-web-icon
          name="info-circle"
          size="m"
          color="#1d4ed8"
          aria-label="Información"
        ></dcx-web-icon>
      </div>

      <p style="font-size:14px;color:#696e75;line-height:1.6">
        El proceso de migración comenzará el
        <strong style="color:#2a2e33">lunes 22 de abril</strong>.
        Durante este periodo algunos servicios podrían no estar disponibles temporalmente.
      </p>
    `,footerHtml:``}},d={name:`Posiciones — Todas las variantes`,parameters:{layout:`fullscreen`,docs:{description:{story:"Los 9 valores posibles de `position` mostrados simultáneamente en el mismo canvas. Los botones están dispuestos en una cuadrícula 3×3 que refleja la posición de cada diálogo en pantalla."}}},render:()=>{let e=[`top-left`,`top`,`top-right`,`left`,`center`,`right`,`bottom-left`,`bottom`,`bottom-right`],t=document.createElement(`div`);return t.style.display=`grid`,t.style.gridTemplateColumns=`repeat(3, 1fr)`,t.style.gap=`16px`,t.style.padding=`48px`,t.style.minHeight=`100vh`,t.style.boxSizing=`border-box`,e.forEach(e=>{let n=document.createElement(`div`);n.style.display=`flex`,n.style.justifyContent=`center`,n.style.alignItems=`center`;let r=document.createElement(`dcx-web-button`);r.label=e,r.setAttribute(`variant`,`secondary`);let i=document.createElement(`dcx-web-dialog`);i.dialogId=`pos-${e}`,i.position=e,i.visible=!1,i.title=`Posición: ${e}`,i.closeOnBackdrop=!0;let a=document.createElement(`div`);a.slot=`body`,a.innerHTML=`<p>Este diálogo está posicionado en <strong>${e}</strong>.</p>`;let o=document.createElement(`div`);o.slot=`footer`;let s=document.createElement(`dcx-web-button`);s.label=`Cerrar`,s.setAttribute(`variant`,`primary`);let c=()=>{i.visible=!1};r.addEventListener(`buttonClick`,()=>{i.visible=!0}),s.addEventListener(`buttonClick`,c),i.addEventListener(`closeDialog`,c),o.appendChild(s),i.append(a,o),n.append(r,i),t.appendChild(n)}),t}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Básico — Informativo',
  parameters: {
    docs: {
      description: {
        story: 'Diálogo básico de información. Tiene título, botón de cierre y un único botón "Aceptar" en el footer. El backdrop cierra el diálogo al hacer clic.'
      }
    }
  },
  args: {
    dialogId: 'basic-dialog',
    title: 'Información',
    bodyHtml: '<p>Este es un mensaje informativo dentro del diálogo.</p>',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Abrir dialog',
    primaryLabel: 'Aceptar',
    footerMode: 'simple'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Confirmación — Con footer de acción',
  parameters: {
    docs: {
      description: {
        story: 'Diálogo de confirmación con footer de dos acciones: "Cancelar" y "Aceptar". \`closeOnBackdrop\` está desactivado para forzar una decisión explícita del usuario.'
      }
    }
  },
  args: {
    dialogId: 'confirmation-dialog',
    title: '¿Confirmar acción?',
    bodyHtml: '<p>¿Estás seguro de que quieres continuar? Esta acción no se puede deshacer.</p>',
    showClose: true,
    showConfirmationFooter: true,
    position: 'center',
    closeOnBackdrop: false,
    visible: false,
    openButtonLabel: 'Abrir confirmación',
    primaryLabel: 'Aceptar',
    secondaryLabel: 'Cancelar',
    footerMode: 'confirmation'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Sin botón de cierre',
  parameters: {
    docs: {
      description: {
        story: 'Diálogo sin el botón ✕ en el header (\`showClose: false\`). Útil para flujos donde se requiere que el usuario tome una decisión explícita.'
      }
    }
  },
  args: {
    dialogId: 'no-close-dialog',
    title: 'Acción requerida',
    bodyHtml: '<p>Debes aceptar los términos para continuar.</p>',
    showClose: false,
    showConfirmationFooter: true,
    position: 'center',
    closeOnBackdrop: false,
    visible: false,
    openButtonLabel: 'Abrir diálogo',
    primaryLabel: 'Aceptar',
    secondaryLabel: 'Cancelar',
    footerMode: 'confirmation'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Sin título',
  parameters: {
    docs: {
      description: {
        story: 'Cuando \`title\` está vacío, el header no renderiza el elemento de título, dejando solo el botón de cierre.'
      }
    }
  },
  args: {
    dialogId: 'no-title-dialog',
    title: '',
    bodyHtml: '<p>Este diálogo no tiene título en el header.</p>',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Abrir diálogo',
    primaryLabel: 'Cerrar',
    footerMode: 'simple'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Confirmación destructiva',
  parameters: {
    docs: {
      description: {
        story: 'Diálogo de confirmación para acciones irreversibles. Incluye un icono de aviso con fondo rojo y un botón "Eliminar".'
      }
    }
  },
  args: {
    dialogId: 'destructive-story',
    title: 'Eliminar proyecto',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: false,
    visible: false,
    openButtonLabel: 'Eliminar proyecto',
    primaryLabel: 'Eliminar',
    secondaryLabel: 'Cancelar',
    footerMode: 'danger',
    bodyHtml: \`
      <div style="width:44px;height:44px;border-radius:50%;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <dcx-web-icon
          name="trash"
          size="m"
          color="#dc2626"
          aria-label="Eliminar"
        ></dcx-web-icon>
      </div>

      <p style="font-size:14px;color:#696e75;line-height:1.6">
        ¿Estás seguro de que deseas eliminar el proyecto
        <strong style="color:#2a2e33">Cloud Migration</strong>?
        Esta acción es irreversible y no se puede deshacer.
      </p>
    \`,
    footerHtml: ''
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Con formulario',
  parameters: {
    docs: {
      description: {
        story: 'Diálogo que contiene un formulario con campos de texto y un select. Útil para crear o editar entidades sin navegar a una página nueva.'
      }
    }
  },
  args: {
    dialogId: 'form-story',
    title: 'Nuevo proyecto',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Nuevo proyecto',
    primaryLabel: 'Crear proyecto',
    secondaryLabel: 'Cancelar',
    footerMode: 'confirmation',
    bodyHtml: \`
      <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:16px">
        <label for="sb-project-name" style="font-size:12px;font-weight:500;color:#2a2e33">Nombre del proyecto</label>
        <input id="sb-project-name" type="text" placeholder="Ej: Cloud Migration v2"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
      </div>

      <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:16px">
        <label for="sb-client" style="font-size:12px;font-weight:500;color:#2a2e33">Cliente</label>
        <input id="sb-client" type="text" placeholder="Ej: Airbus"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
      </div>

      <div style="display:flex;flex-direction:column;gap:4px">
        <label for="sb-practice" style="font-size:12px;font-weight:500;color:#2a2e33">Práctica</label>
        <select id="sb-practice"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
          <option value="">Selecciona una práctica</option>
          <option>Cloud Infrastructure</option>
          <option>SAP</option>
          <option>Data & AI</option>
        </select>
      </div>
    \`,
    footerHtml: ''
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Informativo',
  parameters: {
    docs: {
      description: {
        story: 'Diálogo informativo con icono circular azul en el cuerpo y un único botón "Entendido" en el footer.'
      }
    }
  },
  args: {
    dialogId: 'informative-story',
    title: 'Información importante',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Ver información',
    primaryLabel: 'Entendido',
    footerMode: 'simple',
    bodyHtml: \`
      <div style="width:44px;height:44px;border-radius:50%;background:#dbeafe;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <dcx-web-icon
          name="info-circle"
          size="m"
          color="#1d4ed8"
          aria-label="Información"
        ></dcx-web-icon>
      </div>

      <p style="font-size:14px;color:#696e75;line-height:1.6">
        El proceso de migración comenzará el
        <strong style="color:#2a2e33">lunes 22 de abril</strong>.
        Durante este periodo algunos servicios podrían no estar disponibles temporalmente.
      </p>
    \`,
    footerHtml: ''
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Posiciones — Todas las variantes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Los 9 valores posibles de \`position\` mostrados simultáneamente en el mismo canvas. Los botones están dispuestos en una cuadrícula 3×3 que refleja la posición de cada diálogo en pantalla.'
      }
    }
  },
  render: () => {
    const positions: DialogPosition[] = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'];
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gap = '16px';
    grid.style.padding = '48px';
    grid.style.minHeight = '100vh';
    grid.style.boxSizing = 'border-box';
    positions.forEach(position => {
      const cell = document.createElement('div');
      cell.style.display = 'flex';
      cell.style.justifyContent = 'center';
      cell.style.alignItems = 'center';
      const openButton = document.createElement('dcx-web-button') as any;
      openButton.label = position;
      openButton.setAttribute('variant', 'secondary');
      const dialog = document.createElement('dcx-web-dialog') as any;
      dialog.dialogId = \`pos-\${position}\`;
      dialog.position = position;
      dialog.visible = false;
      dialog.title = \`Posición: \${position}\`;
      dialog.closeOnBackdrop = true;
      const body = document.createElement('div');
      body.slot = 'body';
      body.innerHTML = \`<p>Este diálogo está posicionado en <strong>\${position}</strong>.</p>\`;
      const footer = document.createElement('div');
      footer.slot = 'footer';
      const closeButton = document.createElement('dcx-web-button') as any;
      closeButton.label = 'Cerrar';
      closeButton.setAttribute('variant', 'primary');
      const closeDialog = () => {
        dialog.visible = false;
      };
      openButton.addEventListener('buttonClick', () => {
        dialog.visible = true;
      });
      closeButton.addEventListener('buttonClick', closeDialog);
      dialog.addEventListener('closeDialog', closeDialog);
      footer.appendChild(closeButton);
      dialog.append(body, footer);
      cell.append(openButton, dialog);
      grid.appendChild(cell);
    });
    return grid;
  }
}`,...d.parameters?.docs?.source}}};var f=[`BasicDialog`,`ConfirmationDialog`,`NoCloseButton`,`NoTitle`,`Destructive`,`WithForm`,`Informative`,`Positions`];export{i as BasicDialog,a as ConfirmationDialog,c as Destructive,u as Informative,o as NoCloseButton,s as NoTitle,d as Positions,l as WithForm,f as __namedExportsOrder,r as default};