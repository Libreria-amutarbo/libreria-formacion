import{a as e,i as t,l as n,n as r,t as i}from"./lit-C11zoK0j.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,u as p}from"./dcx-web-button.component-D3Abov5f.js";var m=n`
  :host {
    display: block;
  }

  .dcx-accordion {
    font-family: var(--ff-base, 'Inter', sans-serif);
    border: 1px solid var(--border-light, #d1d5db);
    border-radius: var(--r-lg, 8px);
    overflow: hidden;
    background-color: var(--bg-default, #ffffff);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .dcx-accordion--transition-smooth .dcx-accordion__content-wrapper {
    transition:
      max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .dcx-accordion--transition-smooth .dcx-accordion__chevron {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dcx-accordion--transition-fast .dcx-accordion__content-wrapper {
    transition:
      max-height 0.15s ease-in-out,
      opacity 0.15s ease-in-out,
      padding 0.15s ease-in-out;
  }
  .dcx-accordion--transition-fast .dcx-accordion__chevron {
    transition: transform 0.15s ease-in-out;
  }

  .dcx-accordion--transition-slow .dcx-accordion__content-wrapper {
    transition:
      max-height 0.5s ease-in-out,
      opacity 0.5s ease-in-out,
      padding 0.5s ease-in-out;
  }
  .dcx-accordion--transition-slow .dcx-accordion__chevron {
    transition: transform 0.5s ease-in-out;
  }

  .dcx-accordion--transition-none .dcx-accordion__content-wrapper,
  .dcx-accordion--transition-none .dcx-accordion__chevron {
    transition: none;
  }

  .dcx-accordion__item {
    border-bottom: 1px solid var(--border-light, #d1d5db);
  }

  .dcx-accordion__item:last-child {
    border-bottom: none;
  }

  .dcx-accordion__item--disabled .dcx-accordion__header {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-accordion__item--disabled .dcx-accordion__header:hover {
    background-color: var(--bg-default, #ffffff);
  }

  .dcx-accordion__item--expanded .dcx-accordion__header {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-accordion__item--expanded .dcx-accordion__chevron {
    transform: rotate(180deg);
    color: var(--bg-primary, #0058ab);
  }

  .dcx-accordion--flush {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
  }

  .dcx-accordion--flush .dcx-accordion__header {
    border-radius: 0;
  }

  .dcx-accordion--flush .dcx-accordion__header:focus-visible {
    outline-offset: 0;
  }

  .dcx-accordion__heading {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  .dcx-accordion__header {
    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);
    padding: var(--sp-4, 16px) var(--sp-5, 20px);
    background-color: var(--bg-default, #ffffff);
    width: 100%;
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-medium, 500);
    color: var(--text-dark, #2a2e33);
    border: none;
    border-radius: 0;
    text-align: left;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease-in-out;
  }

  .dcx-accordion__header:hover:not([disabled]) {
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-accordion__header:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
  }

  .dcx-accordion__header[disabled] {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .dcx-accordion__icon {
    flex-shrink: 0;
    color: var(--bg-primary, #0058ab);
    width: var(--sp-5, 20px);
    height: var(--sp-5, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-accordion__icon dcx-web-icon {
    color: inherit;
  }

  .dcx-accordion__title-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .dcx-accordion__title {
    font-weight: var(--fw-semibold, 600);
    line-height: 1.4;
  }

  .dcx-accordion__description {
    font-size: var(--fs-sm, 12px);
    font-weight: var(--fw-regular, 400);
    color: var(--text-muted, #696e75);
    line-height: 1.4;
  }

  .dcx-accordion__chevron {
    flex-shrink: 0;
    color: var(--text-dark, #2a2e33);
    transform: rotate(0deg);
    width: var(--sp-5, 20px);
    height: var(--sp-5, 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition:
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.2s ease;
  }

  .dcx-accordion__chevron dcx-web-icon {
    font-size: 14px;
    color: inherit;
  }

  .dcx-accordion__content-wrapper {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 var(--sp-5, 20px);
  }

  .dcx-accordion__content-wrapper--expanded {
    max-height: 2000px;
    opacity: 1;
    padding: 0 var(--sp-5, 20px) var(--sp-4, 16px);
  }

  .dcx-accordion__content-wrapper--disabled-content .dcx-accordion__content {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  .dcx-accordion__content {
    padding-top: var(--sp-3, 12px);
    background-color: var(--bg-default, #ffffff);
    color: var(--text-muted, #696e75);
    line-height: var(--line-height-normal, 1.6);
    font-size: var(--fs-base, 14px);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .dcx-accordion__content--scrollable {
    overflow-y: auto;
    padding-right: var(--sp-2, 8px);
  }

  .dcx-accordion__content--scrollable::-webkit-scrollbar {
    width: var(--sp-1, 4px);
  }
  .dcx-accordion__content--scrollable::-webkit-scrollbar-track {
    background: transparent;
  }
  .dcx-accordion__content--scrollable::-webkit-scrollbar-thumb {
    background: var(--border-light, #d1d5db);
    border-radius: var(--r-pill, 999px);
  }
`,h=`important`,g=` !`+h,_=a(class extends u{constructor(e){if(super(e),e.type!==f.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[n]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(n)),this.render(n);for(let e of this.ft)n[e]??(this.ft.delete(e),e.includes(`-`)?r.removeProperty(e):r[e]=null);for(let e in n){let t=n[e];if(t!=null){this.ft.add(e);let n=typeof t==`string`&&t.endsWith(g);e.includes(`-`)||n?r.setProperty(e,n?t.slice(0,-11):t,n?h:``):r[e]=t}}return t}}),v=class extends u{constructor(e){if(super(e),this.it=r,e.type!==f.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===r||e==null)return this._t=void 0,this.it=e;if(e===t)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let n=[e];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};v.directiveName=`unsafeHTML`,v.resultType=1;var y=a(v),b=t=>{let n={"dcx-accordion":!0,[`dcx-accordion--transition-${t.transition}`]:!0,"dcx-accordion--flush":t.variant===`flush`};return e`
    <div
      class="${s(n)}"
      aria-label="${t.ariaLabel||r}"
    >
      ${t.items.map(n=>{let i=t.isExpanded(n.id),a={"dcx-accordion__item":!0,"dcx-accordion__item--disabled":!!n.disabled,"dcx-accordion__item--expanded":i},o={"dcx-accordion__content-wrapper":!0,"dcx-accordion__content-wrapper--expanded":i,"dcx-accordion__content-wrapper--disabled-content":!!n.disabledContent},c={"dcx-accordion__content":!0,"dcx-accordion__content--scrollable":!!n.maxContentHeight},l={maxHeight:n.maxContentHeight||null};return e`
            <div class="${s(a)}">
              <h3 class="dcx-accordion__heading">
                <button
                  class="dcx-accordion__header"
                  id="accordion-header-${n.id}"
                  aria-expanded="${i}"
                  aria-controls="accordion-content-${n.id}"
                  ?disabled="${n.disabled}"
                  @click="${()=>t.toggleItem(n)}"
                  @keydown="${t.onHeaderKeydown}"
                >
                  ${n.icon?e`
                        <span class="dcx-accordion__icon" aria-hidden="true">
                          ${t.renderIcon(n.icon)}
                        </span>
                      `:r}
                  <span class="dcx-accordion__title-group">
                    <span class="dcx-accordion__title">${n.title}</span>
                    ${n.description?e`
                          <span class="dcx-accordion__description"
                            >${n.description}</span
                          >
                        `:r}
                  </span>
                  <span class="dcx-accordion__chevron" aria-hidden="true">
                    ${t.renderIcon(`chevron-down`)}
                  </span>
                </button>
              </h3>

              <div
                class="${s(o)}"
                id="accordion-content-${n.id}"
                aria-labelledby="accordion-header-${n.id}"
                aria-hidden="${!i}"
                role="region"
              >
                <div
                  class="${s(c)}"
                  style="${_(l)}"
                >
                  ${n.contentTemplate?typeof n.contentTemplate==`function`?n.contentTemplate():n.contentTemplate:n.content?y(n.content):``}
                </div>
              </div>
            </div>
          `})}
    </div>
  `},x=n`
  dcx-web-icon {
    display: inline-block;
    color: var(--color-primary, #0058ab);
  }

  .dcx-icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }

  .dcx-icon--size-s {
    font-size: var(--size-s, 0.5rem);
  }

  .dcx-icon--size-m {
    font-size: var(--size-m, 1rem);
  }

  .dcx-icon--size-l {
    font-size: var(--size-l, 1.5rem);
  }

  .dcx-icon--size-xl {
    font-size: var(--size-xl, 2rem);
  }

  .dcx-icon--size-auto {
    font-size: inherit;
  }

  .dcx-icon--spacing-compact {
    margin: 0 0.25rem;
  }

  .dcx-icon--spacing-spacious {
    margin: 0 0.75rem;
  }
`,S=t=>e`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    ${x}
  </style>
  <i
    class="${t.iconClass}"
    aria-hidden="${t.decorative?`true`:r}"
    role="${t.decorative?r:`img`}"
    aria-label="${t.decorative?r:t.ariaLabel}"
  ></i>
`,C=class extends i{#e=``;get name(){return this.#e}set name(e){this.#e=e}#t=`m`;get size(){return this.#t}set size(e){this.#t=e}#n=`none`;get spacing(){return this.#n}set spacing(e){this.#n=e}#r=``;get color(){return this.#r}set color(e){this.#r=e}#i=``;get extraClass(){return this.#i}set extraClass(e){this.#i=e}#a=``;get ariaLabel(){return this.#a}set ariaLabel(e){this.#a=e}createRenderRoot(){return this}get decorative(){return!this.ariaLabel||this.ariaLabel.trim()===``}get iconClass(){let e=[`bi`,`bi-${this.name}`,`dcx-icon`,`dcx-icon--size-${this.size}`];this.spacing!==`none`&&e.push(`dcx-icon--spacing-${this.spacing}`);let t=this.extraClass.trim();return t&&e.push(...t.split(/\s+/)),e.join(` `)}updated(e){super.updated(e),e.has(`color`)&&(this.color?this.style.color=this.color:this.style.removeProperty(`color`))}render(){return S(this)}};l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],C.prototype,`name`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],C.prototype,`size`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],C.prototype,`spacing`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],C.prototype,`color`,null),l([c({type:String,attribute:`extra-class`}),d(`design:type`,Object),d(`design:paramtypes`,[])],C.prototype,`extraClass`,null),l([c({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],C.prototype,`ariaLabel`,null),C=l([p(`dcx-web-icon`)],C);var w=class extends i{#e=[];get items(){return this.#e}set items(e){this.#e=e}#t=`smooth`;get transition(){return this.#t}set transition(e){this.#t=e}#n=!0;get closeOthers(){return this.#n}set closeOthers(e){this.#n=e}#r=[];get expandedIds(){return this.#r}set expandedIds(e){this.#r=e}#i=`default`;get variant(){return this.#i}set variant(e){this.#i=e}#a=null;get ariaLabel(){return this.#a}set ariaLabel(e){this.#a=e}#o=new Set;get _expandedItems(){return this.#o}set _expandedItems(e){this.#o=e}willUpdate(e){if(e.has(`expandedIds`)||e.has(`items`)){let e=new Set;this.expandedIds&&this.expandedIds.length>0?this.expandedIds.forEach(t=>e.add(t)):this.items&&this.items.forEach(t=>{t.expanded&&e.add(t.id)}),this._expandedItems=e}}toggleItem(e){if(e.disabled)return;let t=this.isExpanded(e.id),n=new Set(this._expandedItems);t?(n.delete(e.id),this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:e,bubbles:!0,composed:!0}))):(this.closeOthers&&n.clear(),n.add(e.id),this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:e,bubbles:!0,composed:!0}))),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0})),this.requestUpdate()}onHeaderKeydown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.navigateFocus(`next`);break;case`ArrowUp`:e.preventDefault(),this.navigateFocus(`prev`);break;case`Home`:e.preventDefault(),this.navigateFocus(`first`);break;case`End`:e.preventDefault(),this.navigateFocus(`last`)}}expandItemById(e){let t=this.items.find(t=>t.id===e);if(!t||t.disabled||this.isExpanded(e))return;let n=new Set(this._expandedItems);this.closeOthers&&n.clear(),n.add(e),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}collapseItemById(e){let t=this.items.find(t=>t.id===e);if(!t||!this.isExpanded(e))return;let n=new Set(this._expandedItems);n.delete(e),this._expandedItems=n,this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:t,bubbles:!0,composed:!0})),this.requestUpdate()}isExpanded(e){return this._expandedItems.has(e)}expandAll(){let e=this.items.filter(e=>!e.disabled);this._expandedItems=new Set(e.map(e=>e.id)),e.forEach(e=>{this.dispatchEvent(new CustomEvent(`itemExpanded`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0}))}),this.requestUpdate()}collapseAll(){let e=this.items.filter(e=>this.isExpanded(e.id));this._expandedItems=new Set,e.forEach(e=>{this.dispatchEvent(new CustomEvent(`itemCollapsed`,{detail:e,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent(`itemToggled`,{detail:e,bubbles:!0,composed:!0}))}),this.requestUpdate()}navigateFocus(e){let t=Array.from(this.shadowRoot?.querySelectorAll(`button.dcx-accordion__header:not([disabled])`)||[]);if(!t.length)return;let n=this.shadowRoot?.activeElement||document.activeElement,r=t.indexOf(n),i;switch(e){case`next`:i=(r+1)%t.length;break;case`prev`:i=(r-1+t.length)%t.length;break;case`first`:i=0;break;case`last`:i=t.length-1}t[i]?.focus()}_getIconName(e){let t=e.toLowerCase();return t===`chevron-down`?`chevron-down`:t.includes(`speedometer`)?`speedometer2`:t.includes(`gear`)?`gear-fill`:t===`user`||t===`user-fill`||t.includes(`person`)?`person-fill`:t.includes(`info`)?`info-circle-fill`:t.includes(`star`)?`star-fill`:t===`help`||t===`help-fill`||t.includes(`question`)?`question-circle-fill`:t.includes(`clock`)||t.includes(`history`)?`clock-history`:t===`hand-pointer`||t.includes(`hand`)||t.includes(`pointer`)?`hand-index-thumb-fill`:t===`file-text`||t.includes(`file`)||t.includes(`text`)?`file-earmark-text`:t===`list`?`list`:e}renderIcon(t){let n=this._getIconName(t);return t.toLowerCase()===`chevron-down`?e`<dcx-web-icon name="${n}" size="auto"></dcx-web-icon>`:e`<dcx-web-icon name="${n}"></dcx-web-icon>`}static styles=m;render(){return b(this)}};l([c({type:Array}),d(`design:type`,Array),d(`design:paramtypes`,[])],w.prototype,`items`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],w.prototype,`transition`,null),l([c({type:Boolean,attribute:`close-others`}),d(`design:type`,Object),d(`design:paramtypes`,[])],w.prototype,`closeOthers`,null),l([c({type:Array,attribute:`expanded-ids`}),d(`design:type`,Array),d(`design:paramtypes`,[])],w.prototype,`expandedIds`,null),l([c({type:String}),d(`design:type`,Object),d(`design:paramtypes`,[])],w.prototype,`variant`,null),l([c({type:String,attribute:`aria-label`}),d(`design:type`,Object),d(`design:paramtypes`,[])],w.prototype,`ariaLabel`,null),l([o(),d(`design:type`,Object),d(`design:paramtypes`,[])],w.prototype,`_expandedItems`,null),w=l([p(`dcx-web-accordion`)],w);var T=[`fast`,`none`,`slow`,`smooth`],E=[`default`,`flush`],D=[{id:`1`,title:`¿Qué es DCX?`,content:`DCX es el centro de excelencia en experiencia digital de Capgemini. Desarrollamos soluciones de interfaz de usuario reutilizables, accesibles y coherentes para los proyectos de nuestros clientes.`},{id:`2`,title:`¿Cómo se instala la librería?`,content:`Instala el paquete con npm install @dcx-ng-components/dcx-ng-lib y añade el módulo en tu AppModule o importa directamente los componentes standalone que necesites.`},{id:`3`,title:`Contenido con interacción deshabilitada`,content:`Este panel es visible pero sus controles internos están deshabilitados mediante disabledContent. Útil para mostrar información de solo lectura.`,disabledContent:!0},{id:`4`,title:`Elemento deshabilitado`,disabled:!0}],O=[{id:`1`,title:`Dashboard`,content:`View your dashboard with analytics and reports.`,icon:`speedometer2`},{id:`2`,title:`Settings`,content:`Configure your application settings.`,icon:`gear-fill`},{id:`3`,title:`Profile`,content:`Manage your profile information.`,icon:`person-fill`}],k=[{id:`1`,title:`Sección de bienvenida`,content:`Esta sección está expandida por defecto gracias a expanded: true.`,expanded:!0},{id:`2`,title:`Características principales`,content:`Esta sección está colapsada por defecto.`},{id:`3`,title:`Configuración avanzada`,content:`Esta sección también está colapsada por defecto.`}],A=[{id:`1`,title:`Introduction`,content:`Welcome to our application! This is the introduction section.`,icon:`info-circle-fill`,disabled:!0},{id:`2`,title:`Features`,content:`Explore the amazing features of our application.`,icon:`star-fill`,disabled:!0},{id:`3`,title:`Settings (Disabled)`,content:`Advanced settings - Coming soon!`,icon:`gear-fill`,disabled:!0},{id:`4`,title:`Help & Support`,content:`Get help and support for any issues.`,icon:`question-circle-fill`,disabled:!0}],j=[{id:`1`,title:`Introduction`,content:`Welcome to our application! This is the introduction section.`,icon:`info-circle-fill`,disabledContent:!0},{id:`2`,title:`Features`,content:`Explore the amazing features of our application.`,icon:`star-fill`,disabledContent:!0},{id:`3`,title:`Settings (Disabled)`,content:`Advanced settings - Coming soon!`,icon:`gear-fill`,disabledContent:!0},{id:`4`,title:`Help & Support`,content:`Get help and support for any issues.`,icon:`question-circle-fill`,disabledContent:!0}],M=[{id:`1`,title:`Contenido extenso con scroll interno`,description:`Desplázate dentro del panel para ver todo el texto`,icon:`info-circle-fill`,maxContentHeight:`280px`,content:[`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,`Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,`Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`,`At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,`Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`,`Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,`Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?`,`Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,`Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.`,`Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,`Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,`Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,`Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,`At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,`Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,`Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`].join(`

`)}],N=[{id:`1`,title:`Información general`,description:`Datos básicos del servicio`,content:`Aquí encontrarás los datos generales del servicio contratado.`,icon:`info-circle-fill`},{id:`2`,title:`Configuración`,description:`Ajustes y preferences`,content:`Modifica los parámetros del servicio según tus necesidades.`,icon:`gear-fill`},{id:`3`,title:`Historial de cambios`,description:`Registro de actividad reciente`,content:`Consulta todos los cambios realizados durante el último mes.`,icon:`clock-history`}],P=[`Item 1`,`Item 2`,`Item 3`,`Item 4`],F=function(e){return e.TEXT=`text`,e.NUMBER=`number`,e.EMAIL=`email`,e.PASSWORD=`password`,e.SEARCH=`search`,e.TEL=`tel`,e.URL=`url`,e.FILE=`file`,e.RADIO=`radio`,e.RANGE=`range`,e}({}),I=Object.values(F),L=F.TEXT,R=`Este campo es requerido`,z={min:0,max:1e3,step:1};export{_,F as a,A as c,O as d,M as f,y as g,P as h,I as i,N as l,E as m,L as n,D as o,T as p,z as r,j as s,R as t,k as u};