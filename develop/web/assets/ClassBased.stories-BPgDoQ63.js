import{a as e}from"./lit-LoFRC6vp.js";import{i as t,r as n}from"./src-C-ciJ0Zm.js";var r={title:`DCXLibrary/WebComponents/Drawer`,component:`dcx-web-drawer`,tags:[`autodocs`],args:{...n},parameters:{controls:{expanded:!0},docs:{description:{component:"`dcx-web-drawer` muestra un panel lateral/superior/inferior con comportamiento modal opcional. Soporta cierre por máscara, tecla ESC, botón de cierre y control externo de visibilidad con `open` + `dcx-drawer-visible-change`."}}},argTypes:{open:{control:`boolean`,description:"Controla si el drawer está abierto (`true`) o cerrado (`false`).",table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},position:{control:`select`,options:t,description:"Define desde qué lado aparece el drawer: `left`, `right`, `top` o `bottom`.",table:{category:`Atributos`,type:{summary:`'left' | 'right' | 'top' | 'bottom'`},defaultValue:{summary:`right`}}},modal:{control:`boolean`,description:`Cuando está activo, muestra máscara de fondo y comporta el drawer como modal.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},dismissible:{control:`boolean`,description:`Permite cerrar el drawer al hacer click en la máscara (solo aplica en modo modal).`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},showCloseIcon:{control:`boolean`,description:`Muestra u oculta el botón de cierre en el header del drawer.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},closeOnEscape:{control:`boolean`,description:"Permite cerrar el drawer al pulsar la tecla `Escape`.",table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},blockScroll:{control:`boolean`,description:"Bloquea el scroll del `body` mientras el drawer modal está abierto.",table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},fullScreen:{control:`boolean`,description:`Hace que el drawer ocupe toda la pantalla.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},header:{control:`text`,description:'Texto del título en el header. Si se proyecta `slot="drawerHeader"`, este valor se reemplaza.',table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Drawer`}}},footer:{control:`text`,description:'Texto del footer. Si se proyecta `slot="drawerFooter"`, este valor se reemplaza.',table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`''`}}},size:{control:`text`,description:"Tamaño del drawer (`width` en `left/right` y `height` en `top/bottom`). Ejemplo: `22rem`, `320px`, `40%`.",table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`22rem`}}},baseZIndex:{control:`number`,description:"Z-index base para máscara y panel. Si `autoZIndex=false`, se usa exactamente este valor.",table:{category:`Atributos`,type:{summary:`number`},defaultValue:{summary:`1000`}}},autoZIndex:{control:`boolean`,description:`Si está activo, el componente incrementa el z-index al abrir para quedar sobre overlays previos.`,table:{category:`Atributos`,type:{summary:`boolean`},defaultValue:{summary:`true`}}},"dcx-drawer-visible-change":{action:`dcx-drawer-visible-change`,description:`Evento emitido cuando el drawer solicita cambio de visibilidad (ideal para bindings).`,table:{category:`Eventos`,type:{summary:`(visible: boolean) => void`}}},"dcx-drawer-show":{action:`dcx-drawer-show`,description:`Evento emitido cuando el drawer termina de abrirse.`,table:{category:`Eventos`,type:{summary:`() => void`}}},"dcx-drawer-hide":{action:`dcx-drawer-hide`,description:`Evento emitido cuando el drawer se cierra.`,table:{category:`Eventos`,type:{summary:`() => void`}}}}},i={args:{open:!1},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir drawer" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${t.position}
          .modal=${t.modal}
          .dismissible=${t.dismissible}
          .showCloseIcon=${t.showCloseIcon}
          .closeOnEscape=${t.closeOnEscape}
          .blockScroll=${t.blockScroll}
          .fullScreen=${t.fullScreen}
          .size=${t.size}
          .baseZIndex=${t.baseZIndex}
          .autoZIndex=${t.autoZIndex}
          .header=${t.header}
          .footer=${t.footer}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Contenido del drawer con componentes de la librería.</p>
          <div style="display:flex; gap: 8px; margin-top: 12px;">
            <dcx-web-button label="Aplicar" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`dcx-web-drawer`);t&&(t.open=!1)}}></dcx-web-button>
            <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`dcx-web-drawer`);t&&(t.open=!1)}}></dcx-web-button>
          </div>
        </dcx-web-drawer>
      </div>
    `},a={parameters:{docs:{story:{height:`520px`}}},args:{...n},render:t=>{let n=(e,t)=>{let n=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);n&&(n.position=t,n.size=t===`top`||t===`bottom`?`14rem`:`22rem`,n.open=!0)};return e`
      <div class="drawer-container" style="padding: 1rem; min-height: 420px; background: var(--bg-surface, #f4f5f7);">
        <p style="margin: 0 0 10px 0;">Selecciona una posición para abrir el drawer:</p>
        <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
          <dcx-web-button label="Left" variant="secondary" @buttonClick=${e=>n(e,`left`)}></dcx-web-button>
          <dcx-web-button label="Right" variant="secondary" @buttonClick=${e=>n(e,`right`)}></dcx-web-button>
          <dcx-web-button label="Top" variant="secondary" @buttonClick=${e=>n(e,`top`)}></dcx-web-button>
          <dcx-web-button label="Bottom" variant="secondary" @buttonClick=${e=>n(e,`bottom`)}></dcx-web-button>
        </div>
        <p style="margin: 0; color: var(--text-muted, #6c757d);">Posición actual: <strong>left</strong> · Size: <strong>22rem</strong></p>
        <dcx-web-drawer
          .open=${t.open}
          .position=${t.position}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          header="Drawer por posición"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Drawer abierto en una posición dinámica.</p>
          <dcx-web-button
            slot="drawerFooter"
            label="Cerrar sesión"
            variant="secondary"
            icon="true"
            icon-name="box-arrow-right"
            icon-position="left"
            @buttonClick=${e=>{let t=e.currentTarget.closest(`dcx-web-drawer`);t&&(t.open=!1)}}
          ></dcx-web-button>
        </dcx-web-drawer>
      </div>
    `}},o={args:{...n,closeOnEscape:!1,header:`CloseOnEscape deshabilitado`},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir (ESC deshabilitado)" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!1}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="22rem"
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Con <strong>closeOnEscape=false</strong>, la tecla Escape no cierra el drawer.</p>
          <p>Puedes cerrarlo con máscara o con el ícono de cierre.</p>
        </dcx-web-drawer>
      </div>
    `},s={args:{...n,modal:!1,header:`Drawer no modal`},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir no modal" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`left`}
          .modal=${!1}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="22rem"
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>No se renderiza máscara porque <strong>modal=false</strong>.</p>
        </dcx-web-drawer>
      </div>
    `},c={args:{...n,dismissible:!1,header:`No dismissible`},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir drawer" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!1}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="22rem"
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>El click en la máscara no cierra el drawer porque <strong>dismissible=false</strong>.</p>
        </dcx-web-drawer>
      </div>
    `},l={args:{...n,closeOnEscape:!0,showCloseIcon:!1,dismissible:!1,header:`CloseOnEscape activo`},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir (ESC habilitado)" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!1}
          .showCloseIcon=${!1}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="22rem"
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Pulsa <strong>Escape</strong> para cerrarlo.</p>
        </dcx-web-drawer>
      </div>
    `},u={args:{...n,showCloseIcon:!0,closeOnEscape:!1,dismissible:!1,header:`Solo cierre por ícono`},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir (solo ícono)" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!1}
          .showCloseIcon=${!0}
          .closeOnEscape=${!1}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="22rem"
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>En este caso no cierra con máscara ni con Escape; solo con el ícono de cerrar.</p>
        </dcx-web-drawer>
      </div>
    `},d={args:{...n},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; display:flex; gap: 8px; flex-wrap: wrap; min-height: 280px;">
        <dcx-web-button label="Top 12rem" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.position=`top`,t.size=`12rem`,t.header=`Drawer top`,t.open=!0)}}></dcx-web-button>
        <dcx-web-button label="Bottom 30vh" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.position=`bottom`,t.size=`30vh`,t.header=`Drawer bottom`,t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`top`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="12rem"
          header="Drawer top"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Se está aplicando una altura configurable.</p>
        </dcx-web-drawer>
      </div>
    `},f={args:{...n,fullScreen:!0,header:`Drawer fullscreen`},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 500px; overflow: hidden;">
        <dcx-web-button label="Abrir fullscreen" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>
        <p>El drawer fullscreen se abre por botón y mantiene scroll de página porque <strong>blockScroll=false</strong> y se cierra mediante el botón 'Esc'.</p>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!0}
          size="22rem"
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Contenido fullscreen.</p>
        </dcx-web-drawer>
      </div>
    `},p={args:{...n,blockScroll:!0,modal:!0,dismissible:!0,closeOnEscape:!0,showCloseIcon:!0,header:`Block scroll activo`,open:!1,position:`right`,size:`24rem`},render:t=>e`
      <div class="drawer-container" style="min-height: 500px; padding: 1rem; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir con blockScroll=true" variant="danger" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>
        <p style="margin-top: 10px;">
          Cuando se abre este drawer, no podrás hacer scroll en la página.
          <strong>Hasta que no lo cierres, el scroll seguirá bloqueado.</strong>
        </p>

        <dcx-web-drawer
          .open=${t.open}
          .position=${t.position}
          .modal=${t.modal}
          .dismissible=${t.dismissible}
          .showCloseIcon=${t.showCloseIcon}
          .closeOnEscape=${t.closeOnEscape}
          .blockScroll=${t.blockScroll}
          .fullScreen=${t.fullScreen}
          .size=${t.size}
          .header=${t.header}
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <dcx-web-button
            slot="drawerFooter"
            label="Cerrar sesión"
            variant="secondary"
            icon="true"
            icon-name="box-arrow-right"
            icon-position="left"
            @buttonClick=${e=>{let t=e.currentTarget.closest(`dcx-web-drawer`);t&&(t.open=!1)}}
          ></dcx-web-button>

          <p>Ejemplo para validar bloqueo de scroll del body, si se quiere hacer scroll cerrar el drawer.</p>
        </dcx-web-drawer>
      </div>
    `},m={args:{...n,open:!1},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 340px; background: var(--bg-surface, #f4f5f7);">
        <p style="margin-top: 0; color: var(--text-muted, #696e75);">
          Orden esperado: Manual 2000 < Auto (base 2000 + incremento) < Manual 2600.
        </p>

        <div style="display:flex; gap: 8px; flex-wrap: wrap;">
          <dcx-web-button label="Manual 2000" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`#drawer-manual-2000`);t&&(t.open=!0)}}></dcx-web-button>
          <dcx-web-button label="Auto 2000" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`#drawer-auto-2000`);t&&(t.open=!0)}}></dcx-web-button>
          <dcx-web-button label="Manual 2600" variant="secondary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`#drawer-manual-2600`);t&&(t.open=!0)}}></dcx-web-button>
          <dcx-web-button label="Abrir los 3" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`),n=t?.querySelector(`#drawer-manual-2000`),r=t?.querySelector(`#drawer-auto-2000`),i=t?.querySelector(`#drawer-manual-2600`);n&&(n.open=!0),setTimeout(()=>{r&&(r.open=!0)},60),setTimeout(()=>{i&&(i.open=!0)},120)}}></dcx-web-button>
        </div>

        <dcx-web-drawer
          id="drawer-manual-2000"
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          .size=${`24rem`}
          .baseZIndex=${2e3}
          .autoZIndex=${!1}
          header="Manual 2000"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p><strong>autoZIndex=false</strong>: usa exactamente <strong>baseZIndex=2000</strong>.</p>
        </dcx-web-drawer>

        <dcx-web-drawer
          id="drawer-auto-2000"
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          .size=${`22rem`}
          .baseZIndex=${2e3}
          .autoZIndex=${!0}
          header="Auto 2000"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p><strong>autoZIndex=true</strong>: incrementa al abrir y queda por encima del manual de 2000.</p>
        </dcx-web-drawer>

        <dcx-web-drawer
          id="drawer-manual-2600"
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          .size=${`20rem`}
          .baseZIndex=${2600}
          .autoZIndex=${!1}
          header="Manual 2600"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <p>Con <strong>baseZIndex=2600</strong> y <strong>autoZIndex=false</strong>, este siempre debe quedar arriba.</p>
        </dcx-web-drawer>
      </div>
    `},h={parameters:{docs:{description:{story:"Proyecta el slot `drawerHeader` para reemplazar el `header` de texto plano por un contenido personalizado con HTML arbitrario."}}},args:{...n,open:!1},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir (header custom)" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="24rem"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <div slot="drawerHeader" style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">🗂️</span>
            <div>
              <p style="margin:0;font-weight:600;font-size:14px;">Header personalizado</p>
              <p style="margin:0;font-size:12px;color:var(--text-muted,#696e75)">Subtítulo opcional</p>
            </div>
          </div>

          <p>El header fue reemplazado por un template con icono y subtítulo.</p>
        </dcx-web-drawer>
      </div>
    `},g={parameters:{docs:{description:{story:"Proyecta el slot `drawerFooter` para reemplazar el `footer` de texto plano por un contenido personalizado con acciones."}}},args:{...n,open:!1},render:t=>e`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir (footer custom)" variant="primary" @buttonClick=${e=>{let t=e.currentTarget.closest(`.drawer-container`)?.querySelector(`dcx-web-drawer`);t&&(t.open=!0)}}></dcx-web-button>

        <dcx-web-drawer
          .open=${t.open}
          .position=${`right`}
          .modal=${!0}
          .dismissible=${!0}
          .showCloseIcon=${!0}
          .closeOnEscape=${!0}
          .blockScroll=${!1}
          .fullScreen=${!1}
          size="24rem"
          header="Footer personalizado"
          @dcx-drawer-show=${e=>t[`dcx-drawer-show`]?.(e)}
          @dcx-drawer-hide=${e=>t[`dcx-drawer-hide`]?.(e)}
          @dcx-drawer-visible-change=${e=>t[`dcx-drawer-visible-change`]?.(e.detail)}
        >
          <div slot="drawerFooter" style="display:flex;gap:8px;width:100%;">
            <dcx-web-button
              label="Guardar"
              variant="primary"
              style="flex:1"
              @buttonClick=${e=>{let t=e.currentTarget.closest(`dcx-web-drawer`);t&&(t.open=!1)}}
            ></dcx-web-button>
            <dcx-web-button
              label="Cancelar"
              variant="secondary"
              style="flex:1"
              @buttonClick=${e=>{let t=e.currentTarget.closest(`dcx-web-drawer`);t&&(t.open=!1)}}
            ></dcx-web-button>
          </div>

          <p>El footer fue reemplazado por un template con botones de acción.</p>
        </dcx-web-drawer>
      </div>
    `};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    open: false
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir drawer" variant="primary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${args.position}
          .modal=\${args.modal}
          .dismissible=\${args.dismissible}
          .showCloseIcon=\${args.showCloseIcon}
          .closeOnEscape=\${args.closeOnEscape}
          .blockScroll=\${args.blockScroll}
          .fullScreen=\${args.fullScreen}
          .size=\${args.size}
          .baseZIndex=\${args.baseZIndex}
          .autoZIndex=\${args.autoZIndex}
          .header=\${args.header}
          .footer=\${args.footer}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Contenido del drawer con componentes de la librería.</p>
          <div style="display:flex; gap: 8px; margin-top: 12px;">
            <dcx-web-button label="Aplicar" variant="primary" @buttonClick=\${(e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const drawer = btn.closest('dcx-web-drawer');
      if (drawer) drawer.open = false;
    }}></dcx-web-button>
            <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=\${(e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const drawer = btn.closest('dcx-web-drawer');
      if (drawer) drawer.open = false;
    }}></dcx-web-button>
          </div>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      story: {
        height: '520px'
      }
    }
  },
  args: {
    ...DRAWER_DEFAULT_ARGS
  },
  render: args => {
    const openAt = (e: Event, position: 'left' | 'right' | 'top' | 'bottom') => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) {
        drawer.position = position;
        drawer.size = position === 'top' || position === 'bottom' ? '14rem' : '22rem';
        drawer.open = true;
      }
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 420px; background: var(--bg-surface, #f4f5f7);">
        <p style="margin: 0 0 10px 0;">Selecciona una posición para abrir el drawer:</p>
        <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
          <dcx-web-button label="Left" variant="secondary" @buttonClick=\${(e: Event) => openAt(e, 'left')}></dcx-web-button>
          <dcx-web-button label="Right" variant="secondary" @buttonClick=\${(e: Event) => openAt(e, 'right')}></dcx-web-button>
          <dcx-web-button label="Top" variant="secondary" @buttonClick=\${(e: Event) => openAt(e, 'top')}></dcx-web-button>
          <dcx-web-button label="Bottom" variant="secondary" @buttonClick=\${(e: Event) => openAt(e, 'bottom')}></dcx-web-button>
        </div>
        <p style="margin: 0; color: var(--text-muted, #6c757d);">Posición actual: <strong>left</strong> · Size: <strong>22rem</strong></p>
        <dcx-web-drawer
          .open=\${args.open}
          .position=\${args.position}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          header="Drawer por posición"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Drawer abierto en una posición dinámica.</p>
          <dcx-web-button
            slot="drawerFooter"
            label="Cerrar sesión"
            variant="secondary"
            icon="true"
            icon-name="box-arrow-right"
            icon-position="left"
            @buttonClick=\${(e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const drawer = btn.closest('dcx-web-drawer');
      if (drawer) drawer.open = false;
    }}
          ></dcx-web-button>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    closeOnEscape: false,
    header: 'CloseOnEscape deshabilitado'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir (ESC deshabilitado)" variant="secondary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${false}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="22rem"
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Con <strong>closeOnEscape=false</strong>, la tecla Escape no cierra el drawer.</p>
          <p>Puedes cerrarlo con máscara o con el ícono de cierre.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    modal: false,
    header: 'Drawer no modal'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir no modal" variant="secondary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'left'}
          .modal=\${false}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="22rem"
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>No se renderiza máscara porque <strong>modal=false</strong>.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    dismissible: false,
    header: 'No dismissible'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir drawer" variant="primary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${false}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="22rem"
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>El click en la máscara no cierra el drawer porque <strong>dismissible=false</strong>.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    closeOnEscape: true,
    showCloseIcon: false,
    dismissible: false,
    header: 'CloseOnEscape activo'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir (ESC habilitado)" variant="primary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${false}
          .showCloseIcon=\${false}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="22rem"
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Pulsa <strong>Escape</strong> para cerrarlo.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    showCloseIcon: true,
    closeOnEscape: false,
    dismissible: false,
    header: 'Solo cierre por ícono'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px;">
        <dcx-web-button label="Abrir (solo ícono)" variant="secondary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${false}
          .showCloseIcon=\${true}
          .closeOnEscape=\${false}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="22rem"
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>En este caso no cierra con máscara ni con Escape; solo con el ícono de cerrar.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS
  },
  render: args => {
    const openTop = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) {
        drawer.position = 'top';
        drawer.size = '12rem';
        drawer.header = 'Drawer top';
        drawer.open = true;
      }
    };
    const openBottom = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) {
        drawer.position = 'bottom';
        drawer.size = '30vh';
        drawer.header = 'Drawer bottom';
        drawer.open = true;
      }
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; display:flex; gap: 8px; flex-wrap: wrap; min-height: 280px;">
        <dcx-web-button label="Top 12rem" variant="secondary" @buttonClick=\${openTop}></dcx-web-button>
        <dcx-web-button label="Bottom 30vh" variant="secondary" @buttonClick=\${openBottom}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'top'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="12rem"
          header="Drawer top"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Se está aplicando una altura configurable.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    fullScreen: true,
    header: 'Drawer fullscreen'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 500px; overflow: hidden;">
        <dcx-web-button label="Abrir fullscreen" variant="primary" @buttonClick=\${handleOpen}></dcx-web-button>
        <p>El drawer fullscreen se abre por botón y mantiene scroll de página porque <strong>blockScroll=false</strong> y se cierra mediante el botón 'Esc'.</p>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${true}
          size="22rem"
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Contenido fullscreen.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    blockScroll: true,
    modal: true,
    dismissible: true,
    closeOnEscape: true,
    showCloseIcon: true,
    header: 'Block scroll activo',
    open: false,
    position: 'right',
    size: '24rem'
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="min-height: 500px; padding: 1rem; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir con blockScroll=true" variant="danger" @buttonClick=\${handleOpen}></dcx-web-button>
        <p style="margin-top: 10px;">
          Cuando se abre este drawer, no podrás hacer scroll en la página.
          <strong>Hasta que no lo cierres, el scroll seguirá bloqueado.</strong>
        </p>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${args.position}
          .modal=\${args.modal}
          .dismissible=\${args.dismissible}
          .showCloseIcon=\${args.showCloseIcon}
          .closeOnEscape=\${args.closeOnEscape}
          .blockScroll=\${args.blockScroll}
          .fullScreen=\${args.fullScreen}
          .size=\${args.size}
          .header=\${args.header}
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <dcx-web-button
            slot="drawerFooter"
            label="Cerrar sesión"
            variant="secondary"
            icon="true"
            icon-name="box-arrow-right"
            icon-position="left"
            @buttonClick=\${(e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const drawer = btn.closest('dcx-web-drawer');
      if (drawer) drawer.open = false;
    }}
          ></dcx-web-button>

          <p>Ejemplo para validar bloqueo de scroll del body, si se quiere hacer scroll cerrar el drawer.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...DRAWER_DEFAULT_ARGS,
    open: false
  },
  render: args => {
    const openManual = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('#drawer-manual-2000') as any;
      if (drawer) drawer.open = true;
    };
    const openAuto = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('#drawer-auto-2000') as any;
      if (drawer) drawer.open = true;
    };
    const openTop = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('#drawer-manual-2600') as any;
      if (drawer) drawer.open = true;
    };
    const openAll = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const d1 = container?.querySelector('#drawer-manual-2000') as any;
      const d2 = container?.querySelector('#drawer-auto-2000') as any;
      const d3 = container?.querySelector('#drawer-manual-2600') as any;
      if (d1) d1.open = true;
      setTimeout(() => {
        if (d2) d2.open = true;
      }, 60);
      setTimeout(() => {
        if (d3) d3.open = true;
      }, 120);
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 340px; background: var(--bg-surface, #f4f5f7);">
        <p style="margin-top: 0; color: var(--text-muted, #696e75);">
          Orden esperado: Manual 2000 < Auto (base 2000 + incremento) < Manual 2600.
        </p>

        <div style="display:flex; gap: 8px; flex-wrap: wrap;">
          <dcx-web-button label="Manual 2000" variant="secondary" @buttonClick=\${openManual}></dcx-web-button>
          <dcx-web-button label="Auto 2000" variant="primary" @buttonClick=\${openAuto}></dcx-web-button>
          <dcx-web-button label="Manual 2600" variant="secondary" @buttonClick=\${openTop}></dcx-web-button>
          <dcx-web-button label="Abrir los 3" variant="primary" @buttonClick=\${openAll}></dcx-web-button>
        </div>

        <dcx-web-drawer
          id="drawer-manual-2000"
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          .size=\${'24rem'}
          .baseZIndex=\${2000}
          .autoZIndex=\${false}
          header="Manual 2000"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p><strong>autoZIndex=false</strong>: usa exactamente <strong>baseZIndex=2000</strong>.</p>
        </dcx-web-drawer>

        <dcx-web-drawer
          id="drawer-auto-2000"
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          .size=\${'22rem'}
          .baseZIndex=\${2000}
          .autoZIndex=\${true}
          header="Auto 2000"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p><strong>autoZIndex=true</strong>: incrementa al abrir y queda por encima del manual de 2000.</p>
        </dcx-web-drawer>

        <dcx-web-drawer
          id="drawer-manual-2600"
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          .size=\${'20rem'}
          .baseZIndex=\${2600}
          .autoZIndex=\${false}
          header="Manual 2600"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <p>Con <strong>baseZIndex=2600</strong> y <strong>autoZIndex=false</strong>, este siempre debe quedar arriba.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Proyecta el slot \`drawerHeader\` para reemplazar el \`header\` de texto plano por un contenido personalizado con HTML arbitrario.'
      }
    }
  },
  args: {
    ...DRAWER_DEFAULT_ARGS,
    open: false
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir (header custom)" variant="primary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="24rem"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <div slot="drawerHeader" style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">🗂️</span>
            <div>
              <p style="margin:0;font-weight:600;font-size:14px;">Header personalizado</p>
              <p style="margin:0;font-size:12px;color:var(--text-muted,#696e75)">Subtítulo opcional</p>
            </div>
          </div>

          <p>El header fue reemplazado por un template con icono y subtítulo.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Proyecta el slot \`drawerFooter\` para reemplazar el \`footer\` de texto plano por un contenido personalizado con acciones.'
      }
    }
  },
  args: {
    ...DRAWER_DEFAULT_ARGS,
    open: false
  },
  render: args => {
    const handleOpen = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const container = btn.closest('.drawer-container');
      const drawer = container?.querySelector('dcx-web-drawer') as any;
      if (drawer) drawer.open = true;
    };
    return html\`
      <div class="drawer-container" style="padding: 1rem; min-height: 280px; background: var(--bg-surface, #f4f5f7);">
        <dcx-web-button label="Abrir (footer custom)" variant="primary" @buttonClick=\${handleOpen}></dcx-web-button>

        <dcx-web-drawer
          .open=\${args.open}
          .position=\${'right'}
          .modal=\${true}
          .dismissible=\${true}
          .showCloseIcon=\${true}
          .closeOnEscape=\${true}
          .blockScroll=\${false}
          .fullScreen=\${false}
          size="24rem"
          header="Footer personalizado"
          @dcx-drawer-show=\${(e: Event) => args['dcx-drawer-show']?.(e)}
          @dcx-drawer-hide=\${(e: Event) => args['dcx-drawer-hide']?.(e)}
          @dcx-drawer-visible-change=\${(e: CustomEvent) => args['dcx-drawer-visible-change']?.(e.detail)}
        >
          <div slot="drawerFooter" style="display:flex;gap:8px;width:100%;">
            <dcx-web-button
              label="Guardar"
              variant="primary"
              style="flex:1"
              @buttonClick=\${(e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const drawer = btn.closest('dcx-web-drawer');
      if (drawer) drawer.open = false;
    }}
            ></dcx-web-button>
            <dcx-web-button
              label="Cancelar"
              variant="secondary"
              style="flex:1"
              @buttonClick=\${(e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const drawer = btn.closest('dcx-web-drawer');
      if (drawer) drawer.open = false;
    }}
            ></dcx-web-button>
          </div>

          <p>El footer fue reemplazado por un template con botones de acción.</p>
        </dcx-web-drawer>
      </div>
    \`;
  }
}`,...g.parameters?.docs?.source}}};var _=[`Default`,`Positions`,`CloseOnEscapeDisabled`,`NonModal`,`NonDismissible`,`CloseOnEscapeEnabled`,`CloseOnlyWithIcon`,`TopAndBottomSizes`,`FullScreenOpen`,`BlockScrollTrue`,`ZIndexExample`,`WithCustomHeader`,`WithCustomFooter`];export{p as BlockScrollTrue,o as CloseOnEscapeDisabled,l as CloseOnEscapeEnabled,u as CloseOnlyWithIcon,i as Default,f as FullScreenOpen,c as NonDismissible,s as NonModal,a as Positions,d as TopAndBottomSizes,g as WithCustomFooter,h as WithCustomHeader,m as ZIndexExample,_ as __namedExportsOrder,r as default};