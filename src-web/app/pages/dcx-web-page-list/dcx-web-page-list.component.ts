import { LitElement, html, css, nothing } from 'lit';
import {
  customElement,
  state,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-list/dcx-web-list.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-chip/dcx-web-chip.component';

import type {
  DcxListItem,
} from '../../../../libs/dcx-web-lib/src/lib/core/interfaces';

import {
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
  LIST_ITEMS_WITH_SUBLISTS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  MULTI_SELECT_LIST_ITEMS,
} from '../../../../libs/dcx-web-lib/src/lib/core/defaults/list.ts';

type ListSelectionEvent = {
  item: DcxListItem;
  index: number;
};

@customElement('dcx-web-page-list')
export class DcxWebPageList extends LitElement {
  readonly elementosConIcono =
    LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION;

  readonly simpleItems =
    SIMPLE_LIST_ITEMS;

  readonly itemsWithIcons =
    LIST_ITEMS_WITH_ICONS;

  readonly itemsWithSublists =
    LIST_ITEMS_WITH_SUBLISTS;

  readonly selectableItems =
    SELECTABLE_LIST_ITEMS;

  readonly multiSelectItems =
    MULTI_SELECT_LIST_ITEMS;

  readonly itemsWithDivider =
    LIST_ITEMS_WITH_DIVIDER;

  readonly enabledDisabledItems =
    LIST_ENABLED_DISABLED_ITEMS;

  readonly dangerItems: DcxListItem[] = [
    {
      id: 'edit',
      text: 'Editar',
      icon: 'pencil',
    },
    {
      id: 'duplicate',
      text: 'Duplicar',
      icon: 'files',
    },
    {
      id: 'delete',
      text: 'Eliminar',
      icon: 'trash',
      variant: 'danger',
    },
  ];

  @state()
  accessor selectedItem: DcxListItem | null =
    null;

  @state()
  accessor selectedMultiItems:
    ListSelectionEvent[] = [];

  @state()
  accessor externalSelectedIndex:
    number | null = null;

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 860px;
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
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      color: var(--text-muted, #696e75);
      line-height: 1.65;
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
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
      font-size: 10px;
      font-weight: var(--fw-bold, 700);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      color: var(--text-muted, #696e75);
      font-size: var(--fs-sm, 12px);
    }

    .value-preview {
      margin-top: var(--sp-3, 12px);
      display: flex;
      gap: var(--sp-2, 8px);
      flex-wrap: wrap;
      align-items: center;
      color: var(--text-muted, #696e75);
      font-size: var(--fs-sm, 12px);
    }

    .custom-item {
      display: flex;
      align-items: center;
      gap: var(--sp-3, 12px);
      padding: var(--sp-3, 12px);
    }

    .custom-item__title {
      font-weight: var(--fw-semibold, 600);
    }

    .custom-item__desc {
      font-size: var(--fs-xs, 11px);
      color: var(--text-muted, #696e75);
    }

    .custom-item__check {
      margin-left: auto;
      color: var(--bg-primary, #0058ab);
      font-weight: var(--fw-bold, 700);
    }
  `;

  private onItemSelected(
    event: CustomEvent<ListSelectionEvent>,
  ) {
    this.selectedItem = event.detail.item;
  }

  private onItemDeselected() {
    this.selectedItem = null;
  }

  private onMultiSelected(
    event: CustomEvent<ListSelectionEvent>,
  ) {
    this.selectedMultiItems = [
      ...this.selectedMultiItems,
      event.detail,
    ];
  }

  private onMultiDeselected(
    event: CustomEvent<ListSelectionEvent>,
  ) {
    this.selectedMultiItems =
      this.selectedMultiItems.filter(
        item =>
          item.index !==
          event.detail.index,
      );
  }

  private onExternalSelected(
    event: CustomEvent<ListSelectionEvent>,
  ) {
    this.externalSelectedIndex =
      event.detail.index;
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            List
          </h1>

          <p class="demo-page-header__desc">
            Lista genérica y recursiva con soporte para iconos,
            descripción, sublistas anidadas, selección (simple y múltiple),
            variante de peligro y roles ARIA configurables.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        ${this.renderSection(
          '01',
          'Default',
          html`
            <dcx-web-list
              .items=${this.simpleItems}
            ></dcx-web-list>
          `,
        )}

        ${this.renderSection(
          '02',
          'With Icons',
          html`
            <dcx-web-list
              .items=${this.itemsWithIcons}
            ></dcx-web-list>
          `,
        )}

        ${this.renderSection(
          '03',
          'With Description',
          html`
            <dcx-web-list
              .items=${this.elementosConIcono}
            ></dcx-web-list>
          `,
        )}

        ${this.renderSection(
          '04',
          'With Sub Lists',
          html`
            <dcx-web-list
              .items=${this.itemsWithSublists}
              .showChildrenIndicator=${true}
            ></dcx-web-list>
          `,
        )}

        ${this.renderSection(
          '05',
          'Selectable',
          html`
            <dcx-web-list
              .items=${this.selectableItems}
              .selectable=${true}
              listRole="listbox"
              itemRole="option"
              @itemSelected=${this.onItemSelected}
              @itemDeselected=${this.onItemDeselected}
            ></dcx-web-list>

            ${this.selectedItem
              ? html`
                  <p class="value-preview">
                    <strong>Seleccionado:</strong>
                    ${this.selectedItem.text}
                  </p>
                `
              : ''}
          `,
        )}

        ${this.renderSection(
          '06',
          'Multi Select',
          html`
            <dcx-web-list
              .items=${this.multiSelectItems}
              .selectable=${true}
              .multiSelect=${true}
              listRole="listbox"
              itemRole="option"
              @itemSelected=${this.onMultiSelected}
              @itemDeselected=${this.onMultiDeselected}
            ></dcx-web-list>

            ${this.selectedMultiItems.length
              ? html`
                  <div class="value-preview">
                    <strong>
                      Seleccionados (${this.selectedMultiItems.length}):
                    </strong>

                    ${this.selectedMultiItems.map(
                      item => html`
                        <dcx-web-chip
                          label="${item.item.text ?? ''}"
                        ></dcx-web-chip>
                      `,
                    )}
                  </div>
                `
              : ''}
          `,
        )}

        ${this.renderSection(
          '07',
          'Dividers',
          html`
            <dcx-web-list
              .items=${this.itemsWithDivider}
            ></dcx-web-list>
          `,
        )}

        ${this.renderSection(
          '08',
          'Disabled Items',
          html`
            <dcx-web-list
              .items=${this.enabledDisabledItems}
              .selectable=${true}
              listRole="listbox"
              itemRole="option"
            ></dcx-web-list>
          `,
        )}

        ${this.renderSection(
          '09',
          'Danger',
          html`
            <dcx-web-list
              .items=${this.dangerItems}
              .selectable=${true}
              listRole="listbox"
              itemRole="option"
            ></dcx-web-list>
          `,
          `Variante de peligro para acciones destructivas (variant: 'danger').`,
        )}

        ${this.renderSection(
          '10',
          'External Control',
          html`
            <dcx-web-list
              .items=${this.selectableItems}
              .selectable=${true}
              .externalSelection=${true}
              listRole="listbox"
              itemRole="option"
              @itemSelected=${this.onExternalSelected}
            ></dcx-web-list>

            ${this.externalSelectedIndex !== null
              ? html`
                  <p class="value-preview">
                    <strong>Índice emitido:</strong>
                    ${this.externalSelectedIndex}
                  </p>
                `
              : ''}
          `,
          `Con externalSelection, la lista solo emite el evento; el estado lo gestiona el consumidor.`,
        )}

        ${this.renderSection(
          '11',
          'Custom Template',
          html`
            <dcx-web-list
              .items=${this.elementosConIcono}
              .selectable=${true}
              .itemTemplate=${({ item, index, selected }: { item: DcxListItem; index: number; selected: boolean }) => html`
                <div
                  class="dcx-list-item-content"
                  style="display:flex;align-items:center;gap:16px;padding:12px;"
                >
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
                    <span class="dcx-list-text">
                      ${item.label || item.text}
                    </span>
                    ${item.description
                      ? html`
                          <span class="dcx-list-description">
                            ${item.description}
                          </span>
                        `
                      : nothing}
                  </div>

                  ${selected
                    ? html`
                        <span class="custom-item__check">
                          ✓
                        </span>
                      `
                    : nothing}
                </div>
              `}
              listRole="listbox"
              itemRole="option"
            ></dcx-web-list>
          `,
          'Renderizado a medida de cada item mediante itemTemplate.',
        )}
      </div>
    `;
  }

  private renderSection(
    num: string,
    title: string,
    body: unknown,
    description?: string,
  ) {
    return html`
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">${num}</span>
          <span class="demo-section__title">${title}</span>
        </div>

        ${description
          ? html`
              <p class="demo-section__desc">
                ${description}
              </p>
            `
          : ''}

        <div class="demo-section__body">
          ${body}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-list': DcxWebPageList;
  }
}