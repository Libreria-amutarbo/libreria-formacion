import { html, nothing } from 'lit';
import type { DcxWebList } from './dcx-web-list.component';
import type { DcxListItem } from '../../core/interfaces/list.ts';

export const template = (host: DcxWebList) => html`
  <ul
    id="${host.id || ''}"
    class="dcx-list-container"
    role="${host.listRole}"
    aria-label="${host.ariaLabel}"
    aria-multiselectable="${host.multiselectable ?? nothing}"
  >
    ${host.items.map(
      (item: DcxListItem, index: number) => {
        const selected = host.resolveAriaSelected(item, index) === true;

        return item.divider
          ? html`
              <li
                class="dcx-list-divider"
                role="separator"
              ></li>
            `
          : html`
              <li
                class="${host.getItemClasses(item, index)}"
                @click="${() => host.onItemClick(item, index)}"
                @keydown="${(e: KeyboardEvent) =>
                  host.onKeydown(e, item, index)}"
                tabindex="${host.selectable && !item.disabled ? '0' : '-1'}"
                role="${host.itemRole}"
                aria-selected="${host.resolveAriaSelected(item, index) ?? nothing}"
                aria-disabled="${item.disabled || nothing}"
                aria-haspopup="${host.getChildren(item).length > 0
                  ? 'menu'
                  : nothing}"
              >
                ${host.itemTemplate
                  ? host.itemTemplate({
                      item,
                      index,
                      selected,
                    })
                  : html`
                      <div class="dcx-list-item-content">
                        ${item.icon
                          ? html`
                              <div class="dcx-list-icon-container">
                                <dcx-web-icon
                                  class="dcx-list-icon"
                                  name="${item.icon}"
                                ></dcx-web-icon>
                              </div>
                            `
                          : nothing}

                        <div class="dcx-list-text-container">
                          ${item.label || item.text
                            ? html`
                                <span class="dcx-list-text">
                                  ${item.label || item.text}
                                </span>
                              `
                            : nothing}

                          ${item.description
                            ? html`
                                <span class="dcx-list-description">
                                  ${item.description}
                                </span>
                              `
                            : nothing}
                        </div>

                        ${host.showChildrenIndicator &&
                        host.getChildren(item).length > 0
                          ? html`
                              <dcx-web-icon
                                class="dcx-list-children-indicator"
                                name="chevron-right"
                              ></dcx-web-icon>
                            `
                          : nothing}
                      </div>
                    `}

                ${host.renderChildren &&
                host.getChildren(item).length > 0
                  ? html`
                      <dcx-web-list
                        class="dcx-list-nested"
                        .items="${host.getChildren(item)}"
                        .selectable="${host.selectable}"
                        .multiSelect="${host.multiSelect}"
                        .showChildrenIndicator="${host.showChildrenIndicator}"
                        .renderChildren="${host.renderChildren}"
                        .externalSelection="${host.externalSelection}"
                        .isItemSelected="${host.isItemSelected}"
                        .listRole="${host.listRole}"
                        .itemRole="${host.itemRole}"
                        .multiselectable="${host.multiselectable}"
                        .ariaLabel="${host.ariaLabel}"
                      ></dcx-web-list>
                    `
                  : nothing}
              </li>
            `;
      },
    )}
  </ul>
`;