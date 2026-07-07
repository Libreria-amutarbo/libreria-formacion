import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from '../../core/interfaces/breadcrumb';
import { breadcrumbStyles } from './dcx-web-breadcrumb.component.styles';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

@customElement('dcx-web-breadcrumb')
export class DcxWebBreadcrumb extends LitElement {
  private readonly _maxVisibleItems = 3;

  @property({ type: Array }) accessor items: DcxBreadcrumbItem[] = [];
  @property({ type: String, attribute: 'icon-separator' }) accessor iconSeparator: DcxBreadCrumbSeparatorIcons = 'chevron-right';

  @state() private accessor _isEllipsisMenuOpen = false;

  static override styles = breadcrumbStyles;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleKeyDown);
    super.disconnectedCallback();
  }

  private _handleDocumentClick = (event: Event) => {
    const path = event.composedPath();
    if (this._isEllipsisMenuOpen && !path.includes(this)) {
      this._isEllipsisMenuOpen = false;
    }
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this._isEllipsisMenuOpen) {
      this._isEllipsisMenuOpen = false;
      this.shadowRoot?.querySelector<HTMLElement>('.dcx-bc__ellipsis-btn')?.focus();
    }
  };

  private _toggleEllipsisMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this._isEllipsisMenuOpen = !this._isEllipsisMenuOpen;
  }

  private _onItemClick(item: DcxBreadcrumbItem, event: Event) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent<DcxBreadcrumbItem>('itemSelected', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onHiddenItemClick(item: DcxBreadcrumbItem, event: Event) {
    event.stopPropagation();
    if (item.disabled) {
      return;
    }

    this._isEllipsisMenuOpen = false;

    this.dispatchEvent(
      new CustomEvent<DcxBreadcrumbItem>('itemSelected', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );

    if (item.href) {
      window.location.assign(item.href);
    }
  }

  private _renderSeparatorIcon() {
    switch (this.iconSeparator) {
      case 'slash-lg':
        return html`<dcx-web-icon name="slash-lg"></dcx-web-icon>`;
      case 'arrow-right-short':
        return html`<dcx-web-icon name="arrow-right-short"></dcx-web-icon>`;
      case 'chevron-right':
      default:
        return html`<dcx-web-icon name="chevron-right"></dcx-web-icon>`;
    }
  }

  private _renderItemIcon(iconName: string) {
    return html`<dcx-web-icon name="${iconName}"></dcx-web-icon>`;
  }

  override render() {
    const totalItems = this.items.length;
    const showEllipsis = totalItems > this._maxVisibleItems;

    let hiddenItems: DcxBreadcrumbItem[] = [];
    let visibleItems: DcxBreadcrumbItem[] = [];

    if (!showEllipsis) {
      visibleItems = this.items;
    } else {
      hiddenItems = this.items.slice(0, totalItems - this._maxVisibleItems);
      visibleItems = this.items.slice(-this._maxVisibleItems);
    }

    const currentItem = visibleItems[visibleItems.length - 1] || null;

    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <nav aria-label="Breadcrumb">
        <ol class="dcx-bc" role="list">
          ${showEllipsis
            ? html`
                <li class="dcx-bc__item dcx-bc__item--ellipsis">
                  <dcx-web-button
                    class="dcx-bc__ellipsis-btn"
                    variant="terciary"
                    size="s"
                    label="..."
                    aria-label="Mostrar rutas anteriores"
                    aria-expanded="${this._isEllipsisMenuOpen ? 'true' : 'false'}"
                    aria-haspopup="true"
                    @click="${this._toggleEllipsisMenu}"
                  ></dcx-web-button>

                  <div class="dcx-context-menu dcx-context-menu--absolute ${this._isEllipsisMenuOpen ? 'open' : ''}" role="menu" aria-label="Menú contextual">
                    <ul class="dcx-context-menu__list">
                      ${hiddenItems.map(
                        (item) => html`
                          <li
                            class="dcx-context-menu__item selectable ${item.disabled ? 'disabled' : ''}"
                            role="menuitem"
                            @click="${(e: Event) => this._onHiddenItemClick(item, e)}"
                          >
                            <span class="dcx-context-menu__item-content">
                              ${item.icon ? html`<span class="dcx-context-menu__icon">${this._renderItemIcon(item.icon)}</span>` : ''}
                              <span class="dcx-context-menu__text">${item.label}</span>
                            </span>
                          </li>
                        `
                      )}
                    </ul>
                  </div>

                  <span class="dcx-bc__sep" aria-hidden="true">
                    ${this._renderSeparatorIcon()}
                  </span>
                </li>
              `
            : ''}
          ${visibleItems.map((item) => {
            const isCurrent = item === currentItem;
            return html`
              <li class="dcx-bc__item">
                ${!isCurrent
                  ? item.href
                    ? html`
                        <a
                          class="dcx-bc__link ${item.icon ? 'dcx-bc__link--icon' : ''}"
                          href="${item.href}"
                          aria-disabled="${item.disabled ? 'true' : 'false'}"
                          aria-label="${item.icon ? item.label : undefined}"
                          @click="${(e: Event) => this._onItemClick(item, e)}"
                        >
                          ${item.icon ? this._renderItemIcon(item.icon) : item.label}
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
                          @click="${(e: Event) => this._onItemClick(item, e)}"
                        >
                          ${item.icon ? html`<span slot="dcx-icon">${this._renderItemIcon(item.icon)}</span>` : ''}
                        </dcx-web-button>
                      `
                  : html`
                      <span
                        class="dcx-bc__current ${item.disabled ? 'disabled' : ''}"
                        aria-current="page"
                        aria-label="${item.icon ? item.label : undefined}"
                      >
                        ${item.icon ? this._renderItemIcon(item.icon) : item.label}
                      </span>
                    `}
                ${!isCurrent
                  ? html`
                      <span class="dcx-bc__sep" aria-hidden="true">
                        ${this._renderSeparatorIcon()}
                      </span>
                    `
                  : ''}
              </li>
            `;
          })}
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-breadcrumb': DcxWebBreadcrumb;
  }
}
