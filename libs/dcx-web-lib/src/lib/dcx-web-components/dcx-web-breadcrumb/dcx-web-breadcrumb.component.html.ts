import { html } from 'lit';
import type { DcxBreadcrumbItem } from '../../core/interfaces/breadcrumb';
import type { DcxWebBreadcrumb } from './dcx-web-breadcrumb.component';

export const template = (host: DcxWebBreadcrumb) => {
  const totalItems = host.items.length;
  const showEllipsis = totalItems > host.maxVisibleItems;

  let hiddenItems: DcxBreadcrumbItem[] = [];
  let visibleItems: DcxBreadcrumbItem[] = [];

  if (!showEllipsis) {
    visibleItems = host.items;
  } else {
    hiddenItems = host.items.slice(0, totalItems - host.maxVisibleItems);
    visibleItems = host.items.slice(-host.maxVisibleItems);
  }

  const currentItem = visibleItems[visibleItems.length - 1] || null;

  return html`
    <nav aria-label="Breadcrumb">
      <ol class="dcx-bc" role="list">
        ${
          showEllipsis
            ? html`
              <li class="dcx-bc__item dcx-bc__item--ellipsis">
                <dcx-web-button
                  class="dcx-bc__ellipsis-btn"
                  variant="terciary"
                  size="s"
                  label="..."
                  aria-label="Mostrar rutas anteriores"
                  aria-expanded="${host.isEllipsisMenuOpen ? 'true' : 'false'}"
                  aria-haspopup="true"
                  @click="${host.toggleEllipsisMenu}"
                ></dcx-web-button>

                <div class="dcx-context-menu dcx-context-menu--absolute ${host.isEllipsisMenuOpen ? 'open' : ''}" role="menu" aria-label="Menú contextual">
                  <ul class="dcx-context-menu__list">
                    ${hiddenItems.map(
                      item => html`
                        <li
                          class="dcx-context-menu__item selectable ${item.disabled ? 'disabled' : ''}"
                          role="menuitem"
                          @click="${(e: Event) => host.onHiddenItemClick(item, e)}"
                        >
                          <span class="dcx-context-menu__item-content">
                            ${item.icon ? html`<span class="dcx-context-menu__icon">${host.renderItemIcon(item.icon)}</span>` : ''}
                            <span class="dcx-context-menu__text">${item.label}</span>
                          </span>
                        </li>
                      `,
                    )}
                  </ul>
                </div>

                <span class="dcx-bc__sep" aria-hidden="true">
                  ${host.renderSeparatorIcon()}
                </span>
              </li>
            `
            : ''
        }
        ${visibleItems.map(item => {
          const isCurrent = item === currentItem;
          return html`
            <li class="dcx-bc__item">
              ${
                !isCurrent
                  ? item.href
                    ? html`
                      <a
                        class="dcx-bc__link ${item.icon ? 'dcx-bc__link--icon' : ''}"
                        href="${item.href}"
                        aria-disabled="${item.disabled ? 'true' : 'false'}"
                        aria-label="${item.icon ? item.label : undefined}"
                        @click="${(e: Event) => host.onItemClick(item, e)}"
                      >
                        ${item.icon ? host.renderItemIcon(item.icon) : item.label}
                      </a>
                    `
                    : html`
                      <dcx-web-button
                        class="dcx-bc__action-btn ${item.icon ? 'dcx-bc__action-btn--icon' : ''}"
                        variant="terciary"
                        size="s"
                        .label="${item.icon ? '' : item.label}"
                        ?disabled="${item.disabled}"
                        aria-disabled="${item.disabled ? 'true' : 'false'}"
                        aria-label="${item.icon ? item.label : undefined}"
                        @click="${(e: Event) => host.onItemClick(item, e)}"
                      >
                        ${item.icon ? html`<span slot="dcx-icon">${host.renderItemIcon(item.icon)}</span>` : ''}
                      </dcx-web-button>
                    `
                  : html`
                    <span
                      class="dcx-bc__current ${item.disabled ? 'disabled' : ''}"
                      aria-current="page"
                      aria-label="${item.icon ? item.label : undefined}"
                    >
                      ${item.icon ? host.renderItemIcon(item.icon) : item.label}
                    </span>
                  `
              }
              ${
                !isCurrent
                  ? html`
                    <span class="dcx-bc__sep" aria-hidden="true">
                      ${host.renderSeparatorIcon()}
                    </span>
                  `
                  : ''
              }
            </li>
          `;
        })}
      </ol>
    </nav>
  `;
};
