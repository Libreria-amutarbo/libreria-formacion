import{a as e,l as t,n,t as r}from"./lit-C11zoK0j.js";import{c as i,l as a,n as o,r as s,t as c,u as l}from"./dcx-web-button.component-D3Abov5f.js";var u={title:`DCX Library`},d={title:`DCX Library`,logo:`/cap-logo.svg`},f=[{label:`Inicio`,value:`home`,icon:`house`},{label:`Componentes`,value:`components`,icon:`grid`},{label:`Guías`,value:`guides`,icon:`book`},{label:`Recursos`,value:`resources`,icon:`box`}],p=[{label:`Inicio`,value:`home`,icon:`house`},{label:`Componentes`,value:`components`,icon:`grid`},{label:`Deshabilitado`,value:`disabled`,disabled:!0},{label:`Recursos`,value:`resources`,icon:`box`}],m=t=>e`
  <nav
    class="
      dcx-navbar
      ${t.isMenuOpen?`is-menu-open`:``}
      ${t.vertical?`dcx-navbar--vertical`:``}
    "
    aria-label="${t.ariaLabel??n}"
  >
    <button
      type="button"
      class="dcx-navbar__brand"
      @click="${t.onBrandClick}"
    >
      ${t.brand.logo?e`
            <img
              class="dcx-navbar__brand-logo"
              src="${t.brand.logo}"
              alt="${t.brand.title}"
            />
          `:n}

      <span class="dcx-navbar__brand-title">
        ${t.brand.title}
      </span>
    </button>

    <ul
      class="dcx-navbar__items"
      id="dcx-navbar-items"
      role="list"
    >
      ${t.items.map(r=>e`
          <li class="dcx-navbar__item">
            <dcx-web-button
              class="dcx-navbar__item-btn ${t.activeValue===r.value?`is-active`:``} ${t.vertical?`dcx-navbar__item-btn--vertical`:``}"
              label="${r.label}"
              .icon="${!!r.icon}"
              icon-name="${r.icon??``}"
              icon-position="left"
              icon-size="s"
              variant="text"
              size="s"
              ?disabled="${r.disabled??!1}"
              aria-current="${t.activeValue===r.value?`page`:n}"
              @click="${()=>t.onItemClick(r.value)}"
            >
            </dcx-web-button>
          </li>
        `)}
    </ul>

    <div class="dcx-navbar__actions">
      <slot></slot>
    </div>

    <dcx-web-button
      class="dcx-navbar__toggle"
      variant="text"
      .icon="${!0}"
      icon-name="${t.isMenuOpen?`x`:`list`}"
      icon-size="m"
      aria-label="${t.isMenuOpen?`Cerrar menú de navegación`:`Abrir menú de navegación`}"
      aria-expanded="${String(t.isMenuOpen)}"
      aria-controls="dcx-navbar-items"
      @buttonClick="${t.toggleMenu}"
      @keydown="${t.onToggleKeydown}"
    >
    </dcx-web-button>
  </nav>
`,h=t`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 3.5rem;

    padding: 0 var(--sp-4, 16px);

    background-color: var(
      --bg-default,
      #ffffff
    );

    border-bottom: 1px solid
      var(--border-light, #d1d5db);
  }

  .dcx-navbar__brand {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);

    background: none;
    border: none;

    padding: 0;

    cursor: pointer;

    border-radius: var(--r-sm, 4px);

    flex-shrink: 0;
  }

  .dcx-navbar__brand:focus-visible {
    outline: 2px solid
      var(--border-focus, #1db8f2);

    outline-offset: 2px;
  }

  .dcx-navbar__brand-logo {
    width: auto;
    height: 2rem;
    object-fit: contain;
  }

  .dcx-navbar__brand-title {
    color: var(--text-dark, #2a2e33);

    font-size: var(--fs-base, 14px);

    font-weight: var(--fw-bold, 700);

    white-space: nowrap;
  }

  .dcx-navbar__items {
    display: flex;

    align-items: center;

    justify-content: center;

    flex: 1;

    gap: var(--sp-2, 8px);

    margin: 0;
    padding: 0;

    list-style: none;
  }

  .dcx-navbar__item {
    display: flex;
  }

  .dcx-navbar__item-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: 5px 10px;
    background: transparent;
    border: none;
    border-radius: var(--r-sm, 4px);
    color: var(--text-body, #2a2e33);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }

  .dcx-navbar__item-btn:hover {
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-navbar__item-btn:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-navbar__item-btn--vertical {
    display: block;
    width: 100%;
  }

  @media (max-width: 767px) {
    .dcx-navbar__item-btn {
      display: block;
      width: 100%;
    }
  }

  .dcx-navbar__item-icon {
    width: 14px;
    height: 14px;
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    flex-shrink: 0;
  }

  .dcx-navbar__item-label {
    display: inline-flex;
    align-items: center;
  }

  .dcx-navbar__item-btn.is-active {
    --text-dark: var(--background-primary, #0058ab);
    --fw-medium: var(--fw-semibold, 600);
    border-bottom: 2px solid var(--background-primary, #0058ab);
  }

  .dcx-navbar__actions {
    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);

    flex-shrink: 0;
  }

  .dcx-navbar__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--r-sm, 4px);
    cursor: pointer;
    color: var(--text-body, #2a2e33);
  }

  .dcx-navbar__toggle:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-navbar__toggle-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
  }

  @media (min-width: 768px) {
    .dcx-navbar__toggle {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .dcx-navbar {
      height: 3rem;
      flex-wrap: wrap;
    }

    .dcx-navbar__items {
      display: none;

      width: 100%;

      flex-direction: column;

      align-items: stretch;

      padding: var(--sp-3, 12px) 0;

      background: var(
        --bg-default,
        #ffffff
      );

      box-shadow: var(
        --shadow-md,
        0 4px 6px rgba(0, 0, 0, 0.1)
      );
    }

    .dcx-navbar__item {
      width: 100%;
    }

    .dcx-navbar__actions {
      margin-left: auto;
      margin-right: var(--sp-3, 12px);
    }

    .is-menu-open .dcx-navbar__items {
      display: flex;
    }
  }

  .dcx-navbar--vertical {
    flex-direction: column;

    align-items: stretch;

    justify-content: flex-start;

    width: 15rem;

    height: 100%;

    padding: var(--sp-4, 16px)
      var(--sp-3, 12px);

    border-bottom: none;

    box-shadow: var(
      --shadow-md,
      0 4px 6px rgba(0, 0, 0, 0.1)
    );
  }

  .dcx-navbar--vertical
    .dcx-navbar__brand {
    flex-direction: column;

    padding-bottom: var(--sp-4, 16px);

    margin-bottom: var(--sp-3, 12px);

    border-bottom: 1px solid
      var(--border-light, #d1d5db);
  }

  .dcx-navbar--vertical
    .dcx-navbar__items {
    flex-direction: column;

    align-items: stretch;

    justify-content: flex-start;

    gap: var(--sp-2, 8px);
  }

  .dcx-navbar--vertical
    .dcx-navbar__actions {
    flex-direction: column;

    align-items: stretch;

    padding-top: var(--sp-4, 16px);

    margin-top: var(--sp-3, 12px);

    border-top: 1px solid
      var(--border-light, #d1d5db);
  }

  .dcx-navbar--vertical
    .dcx-navbar__toggle {
    display: none;
  }
`,g=class extends r{#e={title:`App`,logo:`/cap-logo.svg`};get brand(){return this.#e}set brand(e){this.#e=e}#t=[];get items(){return this.#t}set items(e){this.#t=e}#n=null;get activeValue(){return this.#n}set activeValue(e){this.#n=e}#r=null;get ariaLabel(){return this.#r}set ariaLabel(e){this.#r=e}#i=!1;get vertical(){return this.#i}set vertical(e){this.#i=e}#a=!1;get isMenuOpen(){return this.#a}set isMenuOpen(e){this.#a=e}static styles=h;_onDocKeydown=e=>{e.key===`Escape`&&this.isMenuOpen&&this.onToggleEscape()};_toggleInnerEl=null;_onInnerToggleKeydown=e=>{e.key===`Escape`&&this.onToggleEscape()};emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}toggleMenu=()=>{if(this.isMenuOpen=!this.isMenuOpen,this.isMenuOpen){document.addEventListener(`keydown`,this._onDocKeydown);let e=(this.shadowRoot?.querySelector(`.dcx-navbar__toggle`))?.shadowRoot?.querySelector(`button`);e&&(this._toggleInnerEl=e,e.addEventListener(`keydown`,this._onInnerToggleKeydown))}else document.removeEventListener(`keydown`,this._onDocKeydown),this._toggleInnerEl&&=(this._toggleInnerEl.removeEventListener(`keydown`,this._onInnerToggleKeydown),null)};closeMenu(){this.isMenuOpen=!1,document.removeEventListener(`keydown`,this._onDocKeydown),this._toggleInnerEl&&=(this._toggleInnerEl.removeEventListener(`keydown`,this._onInnerToggleKeydown),null)}onToggleEscape(){this.isMenuOpen&&(this.closeMenu(),(this.shadowRoot?.querySelector(`.dcx-navbar__toggle`))?.focus())}onToggleKeydown(e){e.key===`Escape`&&this.onToggleEscape()}onItemClick(e){this.closeMenu(),this.emit(`itemClick`,e)}disconnectedCallback(){this.closeMenu(),super.disconnectedCallback()}onBrandClick(){this.emit(`brandClick`)}render(){return m(this)}};o([a({attribute:!1}),s(`design:type`,Object),s(`design:paramtypes`,[])],g.prototype,`brand`,null),o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],g.prototype,`items`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],g.prototype,`activeValue`,null),o([a({type:String,attribute:`aria-label`}),s(`design:type`,Object),s(`design:paramtypes`,[])],g.prototype,`ariaLabel`,null),o([a({type:Boolean,reflect:!0}),s(`design:type`,Object),s(`design:paramtypes`,[])],g.prototype,`vertical`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],g.prototype,`isMenuOpen`,null),g=o([l(`dcx-web-navbar`)],g);var _={title:`DCXLibrary/WebComponents/Navbar`,component:`dcx-web-navbar`,tags:[`autodocs`],parameters:{layout:`fullscreen`,controls:{expanded:!0}},argTypes:{brand:{control:`object`,description:`Título y logo opcional del brand.`,table:{category:`Atributos`}},items:{control:`object`,description:`Lista de items de navegación.`,table:{category:`Atributos`}},activeValue:{control:`text`,description:`Value del item activo (controlado desde fuera).`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Etiqueta accesible para el landmark <nav>.`,table:{category:`Atributos`}},vertical:{control:`boolean`,description:`Activa el modo sidebar vertical.`,table:{category:`Atributos`}},onItemClick:{action:`itemClick`,table:{category:`Eventos`}},onBrandClick:{action:`brandClick`,table:{category:`Eventos`}}},args:{brand:u,items:f,activeValue:null,vertical:!1,ariaLabel:`Navegación principal`},render:t=>e`
    <dcx-web-navbar
      .brand=${t.brand}
      .items=${t.items}
      .activeValue=${t.activeValue}
      .vertical=${t.vertical}
      aria-label=${c(t.ariaLabel)}
      @itemClick=${t.onItemClick}
      @brandClick=${t.onBrandClick}
    ></dcx-web-navbar>
  `},v={args:{brand:u,items:f,activeValue:null}},y={name:`Con logo`,args:{brand:d,items:f,activeValue:`components`}},b={name:`Con item activo`,args:{brand:d,items:f,activeValue:`guides`}},x={name:`Con item deshabilitado`,args:{brand:u,items:p,activeValue:`home`}},S={name:`Con acciones (slot)`,render:t=>e`
    <dcx-web-navbar
      .brand=${t.brand}
      .items=${t.items}
      .activeValue=${t.activeValue}
      .vertical=${t.vertical}
      aria-label=${c(t.ariaLabel)}
      @itemClick=${t.onItemClick}
      @brandClick=${t.onBrandClick}
    >
      <dcx-web-button label="Login" size="s" variant="secondary"></dcx-web-button>
      <dcx-web-button label="Registrarse" size="s" variant="primary"></dcx-web-button>
    </dcx-web-navbar>
  `,args:{brand:d,items:f,activeValue:`home`}},C={name:`Vertical (sidebar)`,render:()=>{let t=`vertical-sidebar-navbar`,n=`vertical-sidebar-active-text`;return e`
      <div style="display: flex; height: 480px;">
        <dcx-web-navbar
          id="${t}"
          .brand=${d}
          .items=${f}
          .activeValue=${`home`}
          .vertical=${!0}
          aria-label="Navegación principal"
          @itemClick=${e=>{let r=document.getElementById(t),i=document.getElementById(n);r&&(r.activeValue=e.detail),i&&(i.textContent=e.detail)}}
        >
          <dcx-web-button label="Login" size="s" variant="secondary"></dcx-web-button>
        </dcx-web-navbar>

        <div style="padding: 1.5rem; flex: 1; font-family: var(--ff-base, 'Inter', sans-serif); color: var(--text-dark, #1e2226);">
          <p style="font-size: var(--fs-base, 14px); font-weight: 600; margin: 0;">Contenido principal</p>
          <p style="margin: 0.75rem 0 0 0;">Item activo: <strong id="${n}">home</strong></p>
        </div>
      </div>
    `},parameters:{controls:{disable:!0}}},w={name:`Menú móvil abierto`,render:()=>e`
    <div style="max-width: 360px; border: 1px solid var(--border-light, #d1d5db); border-radius: 8px; overflow: hidden;">
      <dcx-web-navbar
        .brand=${u}
        .items=${f}
        activeValue="home"
        aria-label="Navegación móvil de ejemplo"
      ></dcx-web-navbar>
    </div>
  `,parameters:{controls:{disable:!0}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    brand: navbarDefaultBrand,
    items: navbarItems,
    activeValue: null
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Con logo',
  args: {
    brand: navbarBrandWithLogo,
    items: navbarItems,
    activeValue: 'components'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Con item activo',
  args: {
    brand: navbarBrandWithLogo,
    items: navbarItems,
    activeValue: 'guides'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Con item deshabilitado',
  args: {
    brand: navbarDefaultBrand,
    items: navbarItemsWithDisabled,
    activeValue: 'home'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Con acciones (slot)',
  render: args => html\`
    <dcx-web-navbar
      .brand=\${args.brand}
      .items=\${args.items}
      .activeValue=\${args.activeValue}
      .vertical=\${args.vertical}
      aria-label=\${ifDefined(args.ariaLabel)}
      @itemClick=\${args.onItemClick}
      @brandClick=\${args.onBrandClick}
    >
      <dcx-web-button label="Login" size="s" variant="secondary"></dcx-web-button>
      <dcx-web-button label="Registrarse" size="s" variant="primary"></dcx-web-button>
    </dcx-web-navbar>
  \`,
  args: {
    brand: navbarBrandWithLogo,
    items: navbarItems,
    activeValue: 'home'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Vertical (sidebar)',
  render: () => {
    const navbarId = 'vertical-sidebar-navbar';
    const activeTextId = 'vertical-sidebar-active-text';
    return html\`
      <div style="display: flex; height: 480px;">
        <dcx-web-navbar
          id="\${navbarId}"
          .brand=\${navbarBrandWithLogo}
          .items=\${navbarItems}
          .activeValue=\${'home'}
          .vertical=\${true}
          aria-label="Navegación principal"
          @itemClick=\${(event: CustomEvent<string>) => {
      const navbar = document.getElementById(navbarId) as any | null;
      const activeText = document.getElementById(activeTextId);
      if (navbar) {
        navbar.activeValue = event.detail;
      }
      if (activeText) {
        activeText.textContent = event.detail;
      }
    }}
        >
          <dcx-web-button label="Login" size="s" variant="secondary"></dcx-web-button>
        </dcx-web-navbar>

        <div style="padding: 1.5rem; flex: 1; font-family: var(--ff-base, 'Inter', sans-serif); color: var(--text-dark, #1e2226);">
          <p style="font-size: var(--fs-base, 14px); font-weight: 600; margin: 0;">Contenido principal</p>
          <p style="margin: 0.75rem 0 0 0;">Item activo: <strong id="\${activeTextId}">home</strong></p>
        </div>
      </div>
    \`;
  },
  parameters: {
    controls: {
      disable: true
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Menú móvil abierto',
  render: () => html\`
    <div style="max-width: 360px; border: 1px solid var(--border-light, #d1d5db); border-radius: 8px; overflow: hidden;">
      <dcx-web-navbar
        .brand=\${navbarDefaultBrand}
        .items=\${navbarItems}
        activeValue="home"
        aria-label="Navegación móvil de ejemplo"
      ></dcx-web-navbar>
    </div>
  \`,
  parameters: {
    controls: {
      disable: true
    }
  }
}`,...w.parameters?.docs?.source}}};var T=[`Default`,`ConLogo`,`ConItemActivo`,`ConItemDeshabilitado`,`ConAcciones`,`Vertical`,`MenuMovilAbierto`];export{S as ConAcciones,b as ConItemActivo,x as ConItemDeshabilitado,y as ConLogo,v as Default,w as MenuMovilAbierto,C as Vertical,T as __namedExportsOrder,_ as default};