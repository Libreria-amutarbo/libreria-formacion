import {
  LitElement,
  html,
  css,
} from 'lit';

import {
  customElement,
  state,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-tabs/dcx-web-tabs.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-select/dcx-web-select.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-card/dcx-web-card.component';

import {
  DcxTabItemDefault,
  DcxTabItemScroll,
  DcxTabItemWithBadges,
  DcxTabItemWithComponents,
  DcxTabItemWithDisabled,
  DcxTabItemWithIcons,
} from '../../../../libs/dcx-web-lib/src/lib/core/defaults/tabs';

@customElement('dcx-web-page-tabs')
export class DcxWebPageTabs extends LitElement {
  @state()
  accessor selectedTabId = 'tab1';

  @state()
  accessor selectedTabIdContent = 'button';

  @state()
  accessor lineTabId = 'tab1';

  @state()
  accessor disabledTabId = 'tab1';    

  @state()
  accessor iconTabId = 'tab1';   

  @state()
  accessor badgeTabId = 'tab1'; 

  @state()
  accessor scrollTabId = 'tab1';    

  @state()
  accessor controlsTabId = 'tab1';  

  @state()
  accessor brandTabId = 'tab1';    

  @state()
  accessor pillTabId = 'tab1';    
  
  @state()
  accessor subtleTabId = 'tab1';

  tabsDefault = DcxTabItemDefault;

  tabsWithDisabled =
    DcxTabItemWithDisabled;

  tabsWithIcons =
    DcxTabItemWithIcons;

  tabsWithBadges =
    DcxTabItemWithBadges;

  tabItemWithScroll =
    DcxTabItemScroll;

  tabItemWithComponents =
    DcxTabItemWithComponents;

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(
        --ff-base,
        'Inter',
        sans-serif
      );
    }

    .demo-page {
      width: 100%;
      max-width: 900px;
      padding-bottom: var(--sp-12, 48px);
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-dark, #2a2e33);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      line-height: 1.65;
      color: var(--text-muted, #696e75);
      margin: 0 0 var(--sp-5, 20px);
      max-width: 720px;
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      margin-bottom: var(--sp-5, 20px);
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      color: var(--text-muted, #696e75);
      margin: 0;
      font-size: var(--fs-sm, 12px);
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }
  `;

  private onTabChange(
    tabId: string,
  ): void {
    this.selectedTabIdContent =
      tabId;
  }

  private renderTabContent() {
    switch (
      this.selectedTabIdContent
    ) {
      case 'button':
        return html`
          <dcx-web-button
            label="Button"
          >
          </dcx-web-button>
        `;

      case 'select':
        return html`
          <dcx-web-select>
          </dcx-web-select>
        `;

      case 'card':
        return html`
          <dcx-web-card>
          </dcx-web-card>
        `;

      default:
        return null;
    }
  }

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Tabs
          </h1>

          <p class="demo-page-header__desc">
            Navegación entre distintas áreas
            de contenido siguiendo el patrón
            ARIA de pestañas, con navegación
            por teclado completa, scroll
            horizontal y cuatro variantes
            visuales.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">
              Line (por defecto)
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .tabs=${this.tabsDefault}
                .activeTabId=${this.lineTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.lineTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Con pestañas deshabilitadas
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .tabs=${this.tabsWithDisabled}
                .activeTabId=${this.disabledTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.disabledTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Con iconos
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .tabs=${this.tabsWithIcons}
                .activeTabId=${this.iconTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.iconTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Con badges de recuento
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .tabs=${this.tabsWithBadges}
                .activeTabId=${this.badgeTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.badgeTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Con scroll horizontal
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .tabs=${this.tabItemWithScroll}
                .activeTabId=${this.scrollTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.scrollTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Con controles numerados
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .tabs=${this.tabsDefault}
                .activeTabId=${this.controlsTabId}
                .hasControls=${true}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.controlsTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">

          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Con contenido de componentes
            </span>
          </div>

          <p class="demo-section__desc">
            El contenido de cada pestaña no vive
            en DcxTabItem: el consumidor proyecta
            lo que corresponde según activeTabId.
          </p>

          <div class="demo-section__body">

            <dcx-web-tabs
              .tabs=${this.tabItemWithComponents}
              .activeTabId=${this.selectedTabIdContent}
              aria-label="Ejemplo de pestañas con contenido de componentes"
              @tabChange=${(
                e: CustomEvent<string>,
              ) =>
                this.onTabChange(
                  e.detail,
                )}
            >
              ${this.renderTabContent()}
            </dcx-web-tabs>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">
              Brand (fondo primario)
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .variant=${'brand'}
                .tabs=${this.tabsDefault}
                .activeTabId=${this.brandTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.brandTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">
              Pill
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .variant=${'pill'}
                .tabs=${this.tabsDefault}
                .activeTabId=${this.pillTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.pillTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">
              Subtle
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tabs
                .variant=${'subtle'}
                .tabs=${this.tabsDefault}
                .activeTabId=${this.subtleTabId}
                @tabChange=${(e: CustomEvent<string>) =>
                    (this.subtleTabId = e.detail)}
                >
            </dcx-web-tabs>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-tabs': DcxWebPageTabs;
  }
}