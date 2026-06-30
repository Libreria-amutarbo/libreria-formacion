import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from '../../core/interfaces/breadcrumb';
import { breadcrumbStyles } from './dcx-web-breadcrumb.component.styles';

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

  private _onItemKeydown(item: DcxBreadcrumbItem, event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this._onItemClick(item, event);
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
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0"/>
          </svg>
        `;
      case 'arrow-right-short':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
          </svg>
        `;
      case 'chevron-right':
      default:
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
          </svg>
        `;
    }
  }

  private _renderItemIcon(iconName: string) {
    switch (iconName) {
      case 'house':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5-.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
          </svg>
        `;
      case 'grid':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
          </svg>
        `;
      case 'laptop':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
          </svg>
        `;
      default:
        return html`
          <i class="bi bi-${iconName}" aria-hidden="true"></i>
        `;
    }
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
      <nav aria-label="Breadcrumb">
        <ol class="dcx-bc" role="list">
          ${showEllipsis
            ? html`
                <li class="dcx-bc__item dcx-bc__item--ellipsis">
                  <button
                    class="dcx-bc__ellipsis-btn"
                    type="button"
                    aria-label="Mostrar rutas anteriores"
                    aria-expanded="${this._isEllipsisMenuOpen ? 'true' : 'false'}"
                    aria-haspopup="true"
                    @click="${this._toggleEllipsisMenu}"
                  >
                    ...
                  </button>

                  <div class="dcx-context-menu dcx-context-menu--absolute ${this._isEllipsisMenuOpen ? 'open' : ''}" role="menu" aria-label="Menú contextual">
                    <ul class="dcx-context-menu-list">
                      ${hiddenItems.map(
                        (item) => html`
                          <li
                            class="dcx-list-item selectable ${item.disabled ? 'disabled' : ''}"
                            role="menuitem"
                            @click="${(e: Event) => this._onHiddenItemClick(item, e)}"
                          >
                            <span class="dcx-list-item-content">
                              ${item.icon ? html`<span class="dcx-list-icon">${this._renderItemIcon(item.icon)}</span>` : ''}
                              <span class="dcx-list-text">${item.label}</span>
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
                          @keydown="${(e: KeyboardEvent) => this._onItemKeydown(item, e)}"
                        >
                          ${item.icon ? this._renderItemIcon(item.icon) : item.label}
                        </a>
                      `
                    : html`
                        <button
                          class="dcx-bc__action-btn ${item.icon ? 'dcx-bc__action-btn--icon' : ''}"
                          ?disabled="${item.disabled}"
                          aria-disabled="${item.disabled ? 'true' : 'false'}"
                          aria-label="${item.icon ? item.label : undefined}"
                          @click="${(e: Event) => this._onItemClick(item, e)}"
                        >
                          ${item.icon ? this._renderItemIcon(item.icon) : item.label}
                        </button>
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
