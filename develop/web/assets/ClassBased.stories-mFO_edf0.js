import{a as e,l as t,n,t as r}from"./lit-C11zoK0j.js";import{c as i,l as a,n as o,r as s,u as c}from"./dcx-web-button.component-D3Abov5f.js";import{w as l}from"./src-DBHVDizf.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./defaults-D6rRQY-6.js";var _=t=>e`
  <div class="dcx-tabs">
    ${t.hasControls?e`
          <div class="dcx-tabs__controls">
            ${t.tabs.map((n,r)=>e`
                <dcx-web-button
                  label="${r+1}"
                  ?pressed="${t.isButtonPressed(n.id)}"
                  @buttonClick="${()=>t.selectTab(n.id)}"
                >
                </dcx-web-button>
              `)}
          </div>
        `:n}

    <div class="dcx-tabs__header-container">
      ${t.hasOverflow&&t.canScrollLeft?e`
            <dcx-web-button
              class="dcx-tabs__scroll-button dcx-tabs__scroll-button--left"
              variant="icon-only"
              size="m"
              .icon="${!0}"
              icon-name="chevron-left"
              icon-size="l"
              ariaLabel="Desplazar a la izquierda"
              @buttonClick="${t.scrollTabsLeft}"
            >
            </dcx-web-button>
          `:n}

      <div
        class="${t.tabHeaderClasses}"
        role="tablist"
        aria-label="${t.ariaLabel??``}"
        @scroll="${t.updateScrollButtons}"
        @keydown="${t.onKeydown}"
      >
        ${t.tabs.map(r=>e`
            <button
              type="button"
              class="${t.tabButtonClasses(r.id)}"
              id="${r.id}"
              role="tab"
              aria-selected="${t.isActive(r.id)}"
              aria-controls="panel-${r.id}"
              data-tab="${r.id}"
              aria-disabled="${String(!!r.disabled)}"
              ?disabled="${!!r.disabled}"
              tabindex="${t.isActive(r.id)&&!r.disabled?0:-1}"
              @click="${()=>t.selectTab(r.id)}"
            >
              ${r.icon?e`
                    <dcx-web-icon
                      name="${r.icon}"
                      size="l"
                      aria-hidden="true"
                    ></dcx-web-icon>
                  `:n}

              ${r.label}

              ${r.badge!==void 0&&r.badge!==null?e`
                    <span
                      class="dcx-tab__badge ${t.isActive(r.id)?`active`:``}"
                    >
                      ${r.badge}
                    </span>
                  `:n}
            </button>
          `)}
      </div>

      ${t.hasOverflow&&t.canScrollRight?e`
            <dcx-web-button
              class="dcx-tabs__scroll-button dcx-tabs__scroll-button--right"
              variant="icon-only"
              size="m"
              .icon="${!0}"
              icon-name="chevron-right"
              icon-size="l"
              ariaLabel="Desplazar a la derecha"
              @buttonClick="${t.scrollTabsRight}"
            >
            </dcx-web-button>
          `:n}
    </div>

    ${t.activeTab?e`
          <div class="dcx-tabs__content">
            <div
              class="dcx-tab__panel"
              role="tabpanel"
              id="panel-${t.activeTab.id}"
              aria-labelledby="${t.activeTab.id}"
            >
              <slot></slot>
            </div>
          </div>
        `:n}
  </div>
`,v=t`
  :host {
    display: block;
  }

  .dcx-tabs {
    font-family: var(--ff-base, 'Inter', sans-serif);
    font-weight: var(--fw-medium, 500);

    display: flex;
    flex-direction: column;
  }

  .dcx-tabs__controls {
    display: flex;
    justify-content: flex-end;
  }

  .dcx-tabs__controls dcx-web-button {
    margin-left: var(--sp-2, 8px);
  }

  .dcx-tabs__header-container {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .dcx-tabs__header {
    display: flex;
    border-bottom: 1px solid var(--border-light, #d1d5db);
    gap: var(--sp-3, 12px);
    overflow-x: auto;
    overflow-y: hidden;
    flex: 1;
    scroll-behavior: smooth;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .dcx-tabs__header::-webkit-scrollbar {
    display: none;
  }

  .dcx-tabs__header--brand {
    background: var(--bg-primary, #0058ab);
    border-radius: var(--r-xl, 12px) var(--r-xl, 12px) 0 0;
    border-bottom: 2px solid var(--border-focus, #1db8f2);
    min-height: 48px;
  }

  .dcx-tabs__header--pill {
    background: var(--border-light, #d1d5db);
    border-radius: var(--r-pill, 999px);
    padding: 3px;
    gap: 2px;
    border-bottom: none;
    min-height: 40px;
    display: inline-flex;
    width: auto;
  }

  .dcx-tabs__header--subtle {
    border-bottom: 1px solid var(--border-light, #d1d5db);
    gap: var(--sp-2, 8px);
  }

  .dcx-tabs__scroll-button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dcx-tabs__scroll-button--left {
    order: -1;
  }

  .dcx-tabs__scroll-button--right {
    order: 1;
  }

  .dcx-tabs__content {
    padding: var(--sp-4, 16px);
    animation: fadeIn 0.3s ease;
  }

  .dcx-tab__panel {
    width: 100%;
  }

  .dcx-tab__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp-2, 8px);

    background: none;
    border: none;
    border-bottom: 3px solid transparent;

    color: var(--text-disabled, #696e75);

    cursor: pointer;

    transition: all 0.3s ease;

    position: relative;

    flex-shrink: 0;

    white-space: nowrap;

    padding: var(--sp-3, 12px) var(--sp-4, 16px);
    margin-right: var(--sp-3, 12px);

    text-align: center;

    font-family: inherit;
    font-size: var(--fs-base, 14px);
  }

  .dcx-tab__button:hover:not(.disabled) {
    color: var(--bg-primary, #0058ab);
    background-color: var(--bg-hover, #f7f8fa);
  }

  .dcx-tab__button:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: -2px;
    border-radius: var(--r-sm, 4px);
  }

  .dcx-tab__button.active {
    color: var(--bg-primary, #0058ab);
    border-bottom-color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
  }

  .dcx-tab__button.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .dcx-tab__button--pill {
    color: var(--text-muted, #696e75);
    padding: var(--sp-1, 4px) var(--sp-4, 16px);
    border-radius: var(--r-pill, 999px);
    margin-right: 0;
    border-bottom: none;
    box-shadow: none;
  }

  .dcx-tab__button--pill:hover:not(.disabled) {
    color: var(--bg-primary, #0058ab);
    background: var(--bg-default, #ffffff);
    border-radius: var(--r-pill, 999px);
  }

  .dcx-tab__button--pill.active {
    background: var(--bg-default, #ffffff);
    color: var(--bg-primary, #0058ab);
    font-weight: var(--fw-semibold, 600);
    border-radius: var(--r-pill, 999px);
    box-shadow: var(
      --shadow-sm,
      0 1px 2px rgba(0, 0, 0, 0.06)
    );
  }

  .dcx-tab__button--pill.disabled {
    color: var(--text-disabled, #696e75);
    opacity: 0.6;
    cursor: not-allowed;
  }

  .dcx-tab__button--brand {
    color: var(--text-placeholder, #9ca3af);
  }

  .dcx-tab__button--brand:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-white, #ffffff);
  }

  .dcx-tab__button--brand.active {
    color: var(--text-white, #ffffff);
    border-bottom-color: var(--border-focus, #1db8f2);
    background: rgba(255, 255, 255, 0.1);
  }

  .dcx-tab__button--subtle {
    font-size: var(--fs-sm, 12px);
    padding: var(--sp-2, 8px) var(--sp-4, 16px);
    margin-right: 0;
  }

  .dcx-tab__badge {
    font-size: var(--fs-xs, 11px);
    font-weight: var(--fw-semibold, 600);
    padding: 1px 7px;

    border-radius: var(--r-pill, 999px);

    background: #dbeafe;
    color: #1d4ed8;

    margin-left: 6px;
  }

  .dcx-tab__badge.active {
    background: var(--bg-primary, #0058ab);
    color: var(--text-white, #ffffff);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`,y=class extends r{#e=[];get tabs(){return this.#e}set tabs(e){this.#e=e}#t=`line`;get variant(){return this.#t}set variant(e){this.#t=e}#n=!1;get hasControls(){return this.#n}set hasControls(e){this.#n=e}#r=``;get activeTabId(){return this.#r}set activeTabId(e){this.#r=e}#i=null;get ariaLabel(){return this.#i}set ariaLabel(e){this.#i=e}#a=``;get _activeTabId(){return this.#a}set _activeTabId(e){this.#a=e}#o=!1;get hasOverflow(){return this.#o}set hasOverflow(e){this.#o=e}#s=!1;get canScrollLeft(){return this.#s}set canScrollLeft(e){this.#s=e}#c=!1;get canScrollRight(){return this.#c}set canScrollRight(e){this.#c=e}#l;get tabsHeader(){return this.#l}set tabsHeader(e){this.#l=e}static styles=v;get activeTab(){return this.tabs.find(e=>e.id===this._activeTabId)}get tabHeaderClasses(){return[`dcx-tabs__header`,this.getHeaderVariantClass(this.variant)].filter(Boolean).join(` `)}firstUpdated(){this.initializeActiveTab(),requestAnimationFrame(()=>{this.checkOverflow()})}updated(){this.activeTabId&&this.activeTabId!==this._activeTabId&&(this._activeTabId=this.activeTabId),requestAnimationFrame(()=>{this.checkOverflow()})}initializeActiveTab(){if(this.activeTabId){this._activeTabId=this.activeTabId;return}let e=this.tabs.find(e=>!e.disabled);e&&(this._activeTabId=e.id)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}isButtonPressed(e){return this._activeTabId===e}isActive(e){return this._activeTabId===e}selectTab(e){let t=this.tabs.find(t=>t.id===e);!t||t.disabled||(this._activeTabId=e,this.emit(`tabChange`,e),this.scrollTabIntoView(e))}getHeaderVariantClass(e){return e===`brand`?`dcx-tabs__header--brand`:e===`pill`?`dcx-tabs__header--pill`:e===`subtle`?`dcx-tabs__header--subtle`:``}getButtonVariantClass(e){return e===`brand`?`dcx-tab__button--brand`:e===`pill`?`dcx-tab__button--pill`:e===`subtle`?`dcx-tab__button--subtle`:``}tabButtonClasses(e){let t=this.tabs.find(t=>t.id===e);return[`dcx-tab__button`,this.isActive(e)?`active`:``,this.getButtonVariantClass(this.variant),t?.disabled?`disabled`:``].filter(Boolean).join(` `)}checkOverflow(){this.tabsHeader&&(this.hasOverflow=this.tabsHeader.scrollWidth>this.tabsHeader.clientWidth,this.updateScrollButtons())}updateScrollButtons=()=>{this.tabsHeader&&(this.canScrollLeft=this.tabsHeader.scrollLeft>0,this.canScrollRight=this.tabsHeader.scrollLeft<this.tabsHeader.scrollWidth-this.tabsHeader.clientWidth-5)};scrollTabsLeft=()=>{this.tabsHeader?.scrollBy({left:-150,behavior:`smooth`})};scrollTabsRight=()=>{this.tabsHeader?.scrollBy({left:150,behavior:`smooth`})};scrollTabIntoView(e){this.findTabElement(e)?.scrollIntoView({behavior:`smooth`,inline:`center`,block:`nearest`})}findTabElement(e){return this.tabsHeader?.querySelector(`[data-tab="${e}"]`)}onKeydown=e=>{let t=this.tabs.map((e,t)=>e.disabled?-1:t).filter(e=>e!==-1);if(!t.length)return;let n=this.tabs.findIndex(e=>e.id===this._activeTabId),r=t.indexOf(n),i=t.length,a=null;if(e.key===`ArrowRight`)a=t[(r+1+i)%i];else if(e.key===`ArrowLeft`)a=t[(r-1+i)%i];else if(e.key===`Home`)a=t[0];else if(e.key===`End`)a=t[i-1];else return;e.preventDefault();let o=this.tabs[a];this.selectTab(o.id),this.findTabElement(o.id)?.focus()};render(){return _(this)}};o([a({attribute:!1}),s(`design:type`,Array),s(`design:paramtypes`,[])],y.prototype,`tabs`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`variant`,null),o([a({type:Boolean}),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`hasControls`,null),o([a({type:String}),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`activeTabId`,null),o([a({type:String,attribute:`aria-label`}),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`ariaLabel`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`_activeTabId`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`hasOverflow`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`canScrollLeft`,null),o([i(),s(`design:type`,Object),s(`design:paramtypes`,[])],y.prototype,`canScrollRight`,null),o([l(`[role="tablist"]`),s(`design:type`,typeof HTMLDivElement>`u`?Object:HTMLDivElement),s(`design:paramtypes`,[])],y.prototype,`tabsHeader`,null),y=o([c(`dcx-web-tabs`)],y);var b={title:`DCXLibrary/WebComponents/Tabs`,component:`dcx-web-tabs`,tags:[`autodocs`],parameters:{controls:{expanded:!0}},argTypes:{tabs:{control:`object`,description:`Array de tabs (id, label, disabled?, icon?, badge?).`,table:{category:`Atributos`}},activeTabId:{control:`text`,description:`ID del tab actualmente seleccionado.`,table:{category:`Atributos`}},variant:{control:`select`,options:h,description:`Variante visual de los tabs.`,table:{category:`Atributos`}},hasControls:{control:`boolean`,description:`Mostrar controles numerados.`,table:{category:`Atributos`}},ariaLabel:{control:`text`,description:`Nombre accesible del grupo de pestañas.`,table:{category:`Atributos`}},tabChange:{action:`tabChange`,description:`Emitido cuando cambia la pestaña activa.`,table:{category:`Eventos`}}},args:{tabs:g,activeTabId:`tab1`,hasControls:!1,variant:`line`,ariaLabel:`Ejemplo de tabs`},render:t=>e`
      <dcx-web-tabs
        .tabs=${t.tabs}
        .activeTabId=${t.activeTabId}
        .variant=${t.variant}
        .hasControls=${t.hasControls}
        aria-label=${t.ariaLabel??``}
        @tabChange=${e=>{let t=e.currentTarget;t.activeTabId=e.detail}}
      >
      </dcx-web-tabs>
    `},x={},S={name:`Brand (fondo primario)`,args:{tabs:g,variant:`brand`}},C={name:`Pill`,args:{tabs:g,variant:`pill`}},w={name:`Subtle`,args:{tabs:g,variant:`subtle`}},T={args:{tabs:u}},E={args:{tabs:p}},D={args:{tabs:m}},O={args:{tabs:f}},k={args:{tabs:g,hasControls:!0}},A={render:()=>{let e=document.createElement(`div`),t=`button`,n=()=>{e.innerHTML=``;let r=document.createElement(`dcx-web-tabs`);r.tabs=d,r.activeTabId=t,r.setAttribute(`aria-label`,`Tabs con contenido de componentes`),r.addEventListener(`tabChange`,e=>{t=e.detail,n()});let i;switch(t){case`select`:i=document.createElement(`dcx-web-select`);break;case`card`:i=document.createElement(`dcx-web-card`);break;default:i=document.createElement(`dcx-web-button`),i.setAttribute(`label`,`Button`)}r.appendChild(i),e.appendChild(r)};return n(),e}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Brand (fondo primario)',
  args: {
    tabs: DcxTabItemDefault,
    variant: 'brand'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Pill',
  args: {
    tabs: DcxTabItemDefault,
    variant: 'pill'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Subtle',
  args: {
    tabs: DcxTabItemDefault,
    variant: 'subtle'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: DcxTabItemWithDisabled
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: DcxTabItemWithIcons
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: DcxTabItemWithBadges
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: DcxTabItemScroll
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: DcxTabItemDefault,
    hasControls: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const wrapper = document.createElement('div');
    let activeTabId = 'button';
    const renderStory = () => {
      wrapper.innerHTML = '';
      const tabs = document.createElement('dcx-web-tabs') as any;
      tabs.tabs = DcxTabItemWithComponents;
      tabs.activeTabId = activeTabId;
      tabs.setAttribute('aria-label', 'Tabs con contenido de componentes');
      tabs.addEventListener('tabChange', (event: Event) => {
        activeTabId = (event as CustomEvent<string>).detail;
        renderStory();
      });
      let content: HTMLElement;
      switch (activeTabId) {
        case 'select':
          content = document.createElement('dcx-web-select');
          break;
        case 'card':
          content = document.createElement('dcx-web-card');
          break;
        case 'button':
        default:
          content = document.createElement('dcx-web-button');
          content.setAttribute('label', 'Button');
          break;
      }
      tabs.appendChild(content);
      wrapper.appendChild(tabs);
    };
    renderStory();
    return wrapper;
  }
}`,...A.parameters?.docs?.source}}};var j=[`Default`,`BrandTabs`,`PillTabs`,`SubtleTabs`,`DisabledTabs`,`TabsWithIcons`,`TabsWithBadges`,`TabsWithScroll`,`TabsWithControls`,`TabsWithContentComponents`];export{S as BrandTabs,x as Default,T as DisabledTabs,C as PillTabs,w as SubtleTabs,D as TabsWithBadges,A as TabsWithContentComponents,k as TabsWithControls,E as TabsWithIcons,O as TabsWithScroll,j as __namedExportsOrder,b as default};