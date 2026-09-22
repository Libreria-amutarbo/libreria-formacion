import { html, nothing } from 'lit';
import type { DcxWebTabs } from './dcx-web-tabs.component';

export const template = (host: DcxWebTabs) => html`
  <div class="dcx-tabs">
    ${
      host.hasControls
        ? html`
          <div class="dcx-tabs__controls">
            ${host.tabs.map(
              (tab, index) => html`
                <dcx-web-button
                  label="${index + 1}"
                  ?pressed="${host.isButtonPressed(tab.id)}"
                  @buttonClick="${() => host.selectTab(tab.id)}"
                >
                </dcx-web-button>
              `,
            )}
          </div>
        `
        : nothing
    }

    <div class="dcx-tabs__header-container">
      ${
        host.hasOverflow && host.canScrollLeft
          ? html`
            <dcx-web-button
              class="dcx-tabs__scroll-button dcx-tabs__scroll-button--left"
              variant="icon-only"
              size="m"
              .icon="${true}"
              icon-name="chevron-left"
              icon-size="l"
              ariaLabel="Desplazar a la izquierda"
              @buttonClick="${host.scrollTabsLeft}"
            >
            </dcx-web-button>
          `
          : nothing
      }

      <div
        class="${host.tabHeaderClasses}"
        role="tablist"
        aria-label="${host.ariaLabel ?? ''}"
        @scroll="${host.updateScrollButtons}"
        @keydown="${host.onKeydown}"
      >
        ${host.tabs.map(
          tab => html`
            <button
              type="button"
              class="${host.tabButtonClasses(tab.id)}"
              id="${tab.id}"
              role="tab"
              aria-selected="${host.isActive(tab.id)}"
              aria-controls="panel-${tab.id}"
              data-tab="${tab.id}"
              aria-disabled="${String(!!tab.disabled)}"
              ?disabled="${!!tab.disabled}"
              tabindex="${host.isActive(tab.id) && !tab.disabled ? 0 : -1}"
              @click="${() => host.selectTab(tab.id)}"
            >
              ${
                tab.icon
                  ? html`
                    <dcx-web-icon
                      name="${tab.icon}"
                      size="l"
                      aria-hidden="true"
                    ></dcx-web-icon>
                  `
                  : nothing
              }

              ${tab.label}

              ${
                tab.badge !== undefined && tab.badge !== null
                  ? html`
                    <span
                      class="dcx-tab__badge ${
                        host.isActive(tab.id) ? 'active' : ''
                      }"
                    >
                      ${tab.badge}
                    </span>
                  `
                  : nothing
              }
            </button>
          `,
        )}
      </div>

      ${
        host.hasOverflow && host.canScrollRight
          ? html`
            <dcx-web-button
              class="dcx-tabs__scroll-button dcx-tabs__scroll-button--right"
              variant="icon-only"
              size="m"
              .icon="${true}"
              icon-name="chevron-right"
              icon-size="l"
              ariaLabel="Desplazar a la derecha"
              @buttonClick="${host.scrollTabsRight}"
            >
            </dcx-web-button>
          `
          : nothing
      }
    </div>

    ${
      host.activeTab
        ? html`
          <div class="dcx-tabs__content">
            <div
              class="dcx-tab__panel"
              role="tabpanel"
              id="panel-${host.activeTab.id}"
              aria-labelledby="${host.activeTab.id}"
            >
              <slot></slot>
            </div>
          </div>
        `
        : nothing
    }
  </div>
`;
