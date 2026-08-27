import{a as e,l as t,n,t as r}from"./lit-C11zoK0j.js";import{c as i,l as a,n as o,r as s,u as c}from"./dcx-web-button.component-D3Abov5f.js";import{w as l}from"./src-hmMJswT-.js";import"./defaults-BS9BWamO.js";var u=[`primary`,`secondary`,`terciary`,`danger`,`icon-only`,`text`],d=t=>t.isOpen?e`
    <div
      id="${t.panelId}"
      class="dcx-popover ${t.placement===`top`?`dcx-popover--flipped`:``}"
      role="${t.role}"
      aria-label="${t.ariaLabelledby?n:t.ariaLabel||n}"
      aria-labelledby="${t.ariaLabelledby??n}"
      tabindex="-1"
      style="
        top:${t.top};
        left:${t.left};
        opacity:${t.isPositioned?`1`:`0`};
      "
    >
      <span
        class="dcx-popover__arrow"
        aria-hidden="true"
        style="left:${t.arrowLeft}px"
      ></span>

      <div class="dcx-popover__content">
        <slot></slot>
      </div>
    </div>
  `:n,f=t`
  :host {
    display: contents;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .dcx-popover {
    position: absolute;
    z-index: 1000;
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #e5e7eb);
    border-radius: var(--r-lg, 8px);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
    min-width: 160px;
    max-width: 350px;
    box-sizing: border-box;
  }

  .dcx-popover:focus {
    outline: none;
  }

  .dcx-popover__arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--bg-default, #ffffff);
    border: 1px solid var(--border-light, #e5e7eb);
    border-right-color: transparent;
    border-bottom-color: transparent;
    transform: translateX(-50%) rotate(45deg);
    pointer-events: none;
  }

  .dcx-popover:not(.dcx-popover--flipped) .dcx-popover__arrow {
    top: -6px;
  }

  .dcx-popover--flipped .dcx-popover__arrow {
    bottom: -6px;
    border-color: var(--border-light, #e5e7eb);
    border-top-color: transparent;
    border-left-color: transparent;
  }

  .dcx-popover__content {
    display: block;
    width: 100%;
    padding: var(--sp-3, 12px) 14px;
    color: var(--text-dark, #2a2e33);
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
    box-sizing: border-box;
  }

  .dcx-popover__content h3,
  ::slotted(h3) {
    margin: 0 0 var(--sp-2, 8px) 0;
    color: var(--bg-primary, #0058ab);
    font-size: var(--fs-md, 16px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.3;
  }

  .dcx-popover__content h4,
  ::slotted(h4) {
    margin: 0 0 var(--sp-2, 8px) 0;
    color: var(--bg-primary, #0058ab);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-semibold, 600);
    line-height: 1.3;
  }

  .dcx-popover__content p,
  ::slotted(p) {
    margin: 0;
    color: var(--text-muted, #696e75);
    font-size: var(--fs-base, 14px);
    line-height: 1.5;
  }
`,p,m=`a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])`,h=class extends r{static{p=this}static nextId=0;#e;get container(){return this.#e}set container(e){this.#e=e}#t=`dialog`;get role(){return this.#t}set role(e){this.#t=e}#n=``;get ariaLabel(){return this.#n}set ariaLabel(e){this.#n=e}#r=null;get ariaLabelledby(){return this.#r}set ariaLabelledby(e){this.#r=e}#i=!0;get autoFocus(){return this.#i}set autoFocus(e){this.#i=e}#a=!0;get returnFocus(){return this.#a}set returnFocus(e){this.#a=e}#o=`dcx-popover-${p.nextId++}`;get panelId(){return this.#o}set panelId(e){this.#o=e}#s=!1;get isOpen(){return this.#s}set isOpen(e){this.#s=e}#c=!1;get isPositioned(){return this.#c}set isPositioned(e){this.#c=e}#l=`-9999px`;get top(){return this.#l}set top(e){this.#l=e}#u=`-9999px`;get left(){return this.#u}set left(e){this.#u=e}#d=`bottom`;get placement(){return this.#d}set placement(e){this.#d=e}#f=24;get arrowLeft(){return this.#f}set arrowLeft(e){this.#f=e}target=null;ignoreNextClick=!1;positionTimeout=null;static styles=f;connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this.onDocumentClick),window.addEventListener(`resize`,this.onWindowResize),document.addEventListener(`keydown`,this.onDocumentKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`click`,this.onDocumentClick),window.removeEventListener(`resize`,this.onWindowResize),document.removeEventListener(`keydown`,this.onDocumentKeydown),this.clearPositionTimeout()}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}toggle(e,t){if(this.isOpen){this.hide();return}this.show(e,t)}show(e,t){let n=e&&`currentTarget`in e?e.currentTarget:null,r=t||n;!r||!(r instanceof HTMLElement)||(this.target=r,this.ignoreNextClick=!0,this.isOpen=!0,this.emit(`opened`),this.clearPositionTimeout(),this.positionTimeout=setTimeout(async()=>{await this.updateComplete,!(!this.isOpen||!this.target||!this.target.isConnected)&&(this.calculatePosition(),this.autoFocus&&this.focusPanel())}))}hide(e={}){if(!this.isOpen)return;let t=(e.returnFocus??!0)&&this.returnFocus,n=this.target;this.isOpen=!1,this.isPositioned=!1,this.ignoreNextClick=!1,this.clearPositionTimeout(),this.target=null,this.emit(`closed`),t&&n&&n.isConnected&&n.focus({preventScroll:!0})}focusPanel(){this.container&&(this.querySelector(m)??this.container.querySelector(m)??this.container).focus({preventScroll:!0})}clearPositionTimeout(){this.positionTimeout!==null&&(clearTimeout(this.positionTimeout),this.positionTimeout=null)}calculatePosition(){if(!this.target||!this.target.isConnected||!this.container)return;let e=this.target.getBoundingClientRect(),t=this.container.getBoundingClientRect(),n=(this.container.offsetParent||document.documentElement).getBoundingClientRect(),r=e.bottom-n.top+8,i=e.left-n.left;e.left+t.width>window.innerWidth-10&&(i=window.innerWidth-10-t.width-n.left,i<0&&(i=0));let a=e.bottom+8+t.height>window.innerHeight,o=e.top-n.top-t.height-8,s=a&&o>=0;s&&(r=o);let c=i+n.left,l=e.left+e.width/2-c,u=Math.max(16,Math.min(l,t.width-16));this.left=`${i}px`,this.top=`${r}px`,this.arrowLeft=u,this.placement=s?`top`:`bottom`,this.isPositioned=!0}onDocumentKeydown=e=>{e.key===`Escape`&&this.isOpen&&this.hide()};onDocumentClick=e=>{if(this.ignoreNextClick){this.ignoreNextClick=!1;return}if(!this.isOpen||!this.target||!this.container)return;let t=e.composedPath?e.composedPath():[],n=e.target;if(n&&!document.contains(n)&&!t.includes(document))return;let r=!!(this.target&&t.includes(this.target)||this.target&&n&&this.target.contains(n)),i=!!(this.container&&t.includes(this.container)||this.container&&n&&this.container.contains(n)||t.includes(this));!r&&!i&&this.hide({returnFocus:!1})};onWindowResize=()=>{this.isOpen&&this.target&&this.target.isConnected&&this.calculatePosition()};render(){return d(this)}};o([l(`.dcx-popover`),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`container`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`role`,null),o([a({type:String,attribute:`aria-label`}),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`ariaLabel`,null),o([a({type:String,attribute:`aria-labelledby`}),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`ariaLabelledby`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`autoFocus`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`returnFocus`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`panelId`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`isOpen`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`isPositioned`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`top`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`left`,null),o([i(),s(`design:type`,String),s(`design:paramtypes`,[])],h.prototype,`placement`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],h.prototype,`arrowLeft`,null),h=p=o([c(`dcx-web-popover`)],h);var g=(t,n)=>{let r=`storybook-popover-${Math.random().toString(36).substring(2,9)}`,i=`container-${r}`,a=t.buttonVariant===`icon-only`;return e`
    <div
      style="padding: 100px; display: flex; justify-content: center; position: relative;"
    >
      <div id="${i}" style="display: inline-block;">
        <dcx-web-button
          .label="${a?``:t.buttonLabel}"
          .ariaLabel="${a?t.buttonLabel:``}"
          .variant="${t.buttonVariant}"
          .iconName="${a?`house-fill`:``}"
          aria-haspopup="dialog"
          @buttonClick="${e=>{e&&typeof e.stopPropagation==`function`&&e.stopPropagation();let t=e.currentTarget?.getRootNode(),n=t?.querySelector(`#${r}`),a=t?.querySelector(`#${i}`);n?.toggle(e,a)}}"
        >
        </dcx-web-button>
      </div>

      <dcx-web-popover
        id="${r}"
        aria-label="${t.popoverTitle||`Contenido contextual`}"
        @opened="${t.opened}"
        @closed="${t.closed}"
      >
        ${t.popoverTitle&&!n?e`<h3>${t.popoverTitle}</h3>`:``}
        ${t.popoverContent&&!n?e`<p>${t.popoverContent}</p>`:``}
        ${n||``}
      </dcx-web-popover>
    </div>
  `},_={title:`DCXLibrary/WebComponents/Popover`,component:`dcx-web-popover`,tags:[`autodocs`],parameters:{controls:{expanded:!0},docs:{description:{component:"`dcx-web-popover` es un componente overlay que muestra contenido contextual al hacer clic en un elemento trigger. Soporta posicionamiento automático, cierre al hacer clic fuera o pulsar Escape, y proyección de contenido mediante slots."}}},argTypes:{buttonLabel:{name:`buttonLabel`,control:`text`,description:`Texto del botón que abre el popover`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:`Open Popover`}}},buttonVariant:{name:`buttonVariant`,control:`select`,options:u,description:`Variante visual del botón trigger`,table:{category:`Atributos`,type:{summary:`'primary' | 'secondary' | 'terciary' | 'danger' | 'icon-only' | 'text'`},defaultValue:{summary:`primary`}}},popoverTitle:{name:`popoverTitle`,control:`text`,description:`Título que se muestra en la cabecera del popover`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:``}}},popoverContent:{name:`popoverContent`,control:`text`,description:`Texto de contenido del popover. Se puede sustituir por contenido enriquecido via slot`,table:{category:`Atributos`,type:{summary:`string`},defaultValue:{summary:``}}},opened:{name:`opened`,action:`opened`,description:`Se emite cuando el popover se abre`,table:{category:`Eventos`,type:{summary:`() => void`},defaultValue:{summary:`-`}}},closed:{name:`closed`,action:`closed`,description:`Se emite cuando el popover se cierra`,table:{category:`Eventos`,type:{summary:`() => void`},defaultValue:{summary:`-`}}},toggle:{name:`toggle()`,control:!1,description:`Alterna la apertura del popover para el elemento disparador.`,table:{category:`Métodos`,type:{summary:`(event: Event, target?: HTMLElement) => void`}}},show:{name:`show()`,control:!1,description:`Abre el popover y lo posiciona respecto al disparador.`,table:{category:`Métodos`,type:{summary:`(event?: Event, target?: HTMLElement) => void`}}},hide:{name:`hide()`,control:!1,description:`Cierra el popover (devuelve el foco al disparador por defecto).`,table:{category:`Métodos`,type:{summary:`(options?: { returnFocus?: boolean }) => void`}}}},args:{buttonLabel:`Open Popover`,buttonVariant:`primary`,popoverTitle:`Popover Title`,popoverContent:`This is the content inside the popover. It can be any HTML or Angular component.`}},v={name:`Default`,render:e=>g(e),parameters:{docs:{description:{story:`Popover básico con título y contenido de texto. Haz clic en el botón para abrirlo.`}}}},y={name:`Rich Content`,args:{buttonLabel:`User Info`,buttonVariant:`secondary`},render:t=>g(t,e`
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 var(--sp-2, 8px) 0;">John Doe</h4>
          <p style="margin: 0 0 var(--sp-1, 4px) 0; font-size: var(--fs-base, 14px); color: #666;">
            Software Engineer
          </p>
          <p style="margin: 0; font-size: var(--fs-sm, 12px); color: #999;">
            john.doe@example.com
          </p>
        </div>
      `),parameters:{docs:{description:{story:`Popover con contenido enriquecido: nombre, cargo y email. Ideal para mostrar información de usuario.`}}}},b=[{text:`Edit`,icon:`pencil`},{text:`Duplicate`,icon:`copy`},{divider:!0},{text:`Delete`,icon:`trash`,variant:`danger`}],x={name:`With Actions`,args:{buttonLabel:`Options`,buttonVariant:`terciary`},render:t=>g(t,e`
        <dcx-web-list
          .items="${b}"
          .selectable="${!0}"
        ></dcx-web-list>
      `),parameters:{docs:{description:{story:`Popover con lista de acciones. Puede usarse como menú contextual ligero.`}}}},S={name:`With Components`,args:{buttonLabel:`Filtrar`,buttonVariant:`secondary`},render:t=>g(t,e`
        <div style="min-width: 260px;">
          <p style="margin: 0 0 var(--sp-2, 8px) 0; font-weight: var(--fw-semibold, 600);">
            Filtrar por etiqueta
          </p>
          <div
            style="display: flex; flex-wrap: wrap; gap: var(--sp-2, 8px); margin-bottom: var(--sp-3, 12px);"
          >
            <dcx-web-chip
              label="Angular"
              color="primary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="TypeScript"
              color="secondary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Design System"
              color="primary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Storybook"
              color="secondary"
              variant="filter"
            ></dcx-web-chip>
          </div>
          <dcx-web-divider></dcx-web-divider>
          <div
            style="display: flex; justify-content: flex-end; gap: var(--sp-2, 8px); margin-top: var(--sp-3, 12px);"
          >
            <dcx-web-button
              label="Limpiar"
              variant="terciary"
              size="s"
            ></dcx-web-button>
            <dcx-web-button
              label="Aplicar"
              variant="primary"
              size="s"
            ></dcx-web-button>
          </div>
        </div>
      `),parameters:{docs:{description:{story:`Popover con componentes de la librería: chips de filtro, divider y botones de acción.`}}}},C={name:`Long Content`,args:{buttonLabel:`Ver detalles`,buttonVariant:`secondary`},render:t=>g(t,e`
        <div style="max-height: 200px; overflow-y: auto;">
          <h3>Descripción completa</h3>
          <p>
            Este componente permite mostrar información contextual de forma no
            intrusiva. Es ideal para tooltips enriquecidos, menús de acciones,
            detalles de usuario o cualquier contenido que deba aparecer al
            interactuar con un elemento de la interfaz.
          </p>
          <p>
            El popover se posiciona automáticamente respecto al elemento trigger
            y se cierra al hacer clic fuera o pulsando la tecla Escape. El ancho
            máximo está limitado para garantizar la legibilidad del contenido.
          </p>
          <p>
            Contenido adicional para forzar el scroll: Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris.
          </p>
          <p>
            Más contenido para demostrar el scroll vertical: Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident.
          </p>
        </div>
      `),parameters:{docs:{description:{story:`Popover con texto largo para verificar que el contenido no desborda el contenedor y se adapta correctamente al ancho máximo definido.`}}}},w={name:`With Image`,args:{buttonLabel:`Ver preview`,buttonVariant:`secondary`},render:t=>g(t,e`
        <div style="min-width: 280px;">
          <img
            src="https://picsum.photos/280/180"
            alt="Preview"
            style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 12px;"
          />
          <h4 style="margin: 0 0 var(--sp-2, 8px) 0;">Imagen de ejemplo</h4>
          <p style="margin: 0; font-size: var(--fs-base, 14px); color: #666;">
            Este popover muestra cómo integrar imágenes junto con texto
            descriptivo.
          </p>
        </div>
      `),parameters:{docs:{description:{story:`Popover con imagen y descripción. Ideal para vistas previas de contenido visual.`}}}},T={name:`Interactive`,args:{buttonLabel:`Click me`,buttonVariant:`primary`},render:t=>g(t,e`
        <h3>Interactive Demo</h3>
        <p>Interacciones disponibles:</p>
        <ul style="margin: var(--sp-2, 8px) 0; padding-left: var(--sp-5, 20px);">
          <li>Clic fuera para cerrar</li>
          <li>Tecla Escape para cerrar</li>
        </ul>
      `),parameters:{docs:{description:{story:`Demo interactiva para probar las dos formas de cerrar el popover: clic fuera y tecla Escape.`}}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  render: args => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover básico con título y contenido de texto. Haz clic en el botón para abrirlo.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Rich Content',
  args: {
    buttonLabel: 'User Info',
    buttonVariant: 'secondary'
  },
  render: args => renderPopoverStory(args, html\`
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 var(--sp-2, 8px) 0;">John Doe</h4>
          <p style="margin: 0 0 var(--sp-1, 4px) 0; font-size: var(--fs-base, 14px); color: #666;">
            Software Engineer
          </p>
          <p style="margin: 0; font-size: var(--fs-sm, 12px); color: #999;">
            john.doe@example.com
          </p>
        </div>
      \`),
  parameters: {
    docs: {
      description: {
        story: 'Popover con contenido enriquecido: nombre, cargo y email. Ideal para mostrar información de usuario.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'With Actions',
  args: {
    buttonLabel: 'Options',
    buttonVariant: 'terciary'
  },
  render: args => renderPopoverStory(args, html\`
        <dcx-web-list
          .items="\${actionItems}"
          .selectable="\${true}"
        ></dcx-web-list>
      \`),
  parameters: {
    docs: {
      description: {
        story: 'Popover con lista de acciones. Puede usarse como menú contextual ligero.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'With Components',
  args: {
    buttonLabel: 'Filtrar',
    buttonVariant: 'secondary'
  },
  render: args => renderPopoverStory(args, html\`
        <div style="min-width: 260px;">
          <p style="margin: 0 0 var(--sp-2, 8px) 0; font-weight: var(--fw-semibold, 600);">
            Filtrar por etiqueta
          </p>
          <div
            style="display: flex; flex-wrap: wrap; gap: var(--sp-2, 8px); margin-bottom: var(--sp-3, 12px);"
          >
            <dcx-web-chip
              label="Angular"
              color="primary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="TypeScript"
              color="secondary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Design System"
              color="primary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Storybook"
              color="secondary"
              variant="filter"
            ></dcx-web-chip>
          </div>
          <dcx-web-divider></dcx-web-divider>
          <div
            style="display: flex; justify-content: flex-end; gap: var(--sp-2, 8px); margin-top: var(--sp-3, 12px);"
          >
            <dcx-web-button
              label="Limpiar"
              variant="terciary"
              size="s"
            ></dcx-web-button>
            <dcx-web-button
              label="Aplicar"
              variant="primary"
              size="s"
            ></dcx-web-button>
          </div>
        </div>
      \`),
  parameters: {
    docs: {
      description: {
        story: 'Popover con componentes de la librería: chips de filtro, divider y botones de acción.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Long Content',
  args: {
    buttonLabel: 'Ver detalles',
    buttonVariant: 'secondary'
  },
  render: args => renderPopoverStory(args, html\`
        <div style="max-height: 200px; overflow-y: auto;">
          <h3>Descripción completa</h3>
          <p>
            Este componente permite mostrar información contextual de forma no
            intrusiva. Es ideal para tooltips enriquecidos, menús de acciones,
            detalles de usuario o cualquier contenido que deba aparecer al
            interactuar con un elemento de la interfaz.
          </p>
          <p>
            El popover se posiciona automáticamente respecto al elemento trigger
            y se cierra al hacer clic fuera o pulsando la tecla Escape. El ancho
            máximo está limitado para garantizar la legibilidad del contenido.
          </p>
          <p>
            Contenido adicional para forzar el scroll: Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris.
          </p>
          <p>
            Más contenido para demostrar el scroll vertical: Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident.
          </p>
        </div>
      \`),
  parameters: {
    docs: {
      description: {
        story: 'Popover con texto largo para verificar que el contenido no desborda el contenedor y se adapta correctamente al ancho máximo definido.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'With Image',
  args: {
    buttonLabel: 'Ver preview',
    buttonVariant: 'secondary'
  },
  render: args => renderPopoverStory(args, html\`
        <div style="min-width: 280px;">
          <img
            src="https://picsum.photos/280/180"
            alt="Preview"
            style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 12px;"
          />
          <h4 style="margin: 0 0 var(--sp-2, 8px) 0;">Imagen de ejemplo</h4>
          <p style="margin: 0; font-size: var(--fs-base, 14px); color: #666;">
            Este popover muestra cómo integrar imágenes junto con texto
            descriptivo.
          </p>
        </div>
      \`),
  parameters: {
    docs: {
      description: {
        story: 'Popover con imagen y descripción. Ideal para vistas previas de contenido visual.'
      }
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Interactive',
  args: {
    buttonLabel: 'Click me',
    buttonVariant: 'primary'
  },
  render: args => renderPopoverStory(args, html\`
        <h3>Interactive Demo</h3>
        <p>Interacciones disponibles:</p>
        <ul style="margin: var(--sp-2, 8px) 0; padding-left: var(--sp-5, 20px);">
          <li>Clic fuera para cerrar</li>
          <li>Tecla Escape para cerrar</li>
        </ul>
      \`),
  parameters: {
    docs: {
      description: {
        story: 'Demo interactiva para probar las dos formas de cerrar el popover: ' + 'clic fuera y tecla Escape.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}};var E=[`Default`,`WithRichContent`,`WithActions`,`WithComponents`,`LongContent`,`WithImage`,`Interactive`];export{v as Default,T as Interactive,C as LongContent,x as WithActions,S as WithComponents,w as WithImage,y as WithRichContent,E as __namedExportsOrder,_ as default};