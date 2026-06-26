import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { DcxContextMenuItem } from '../../core/interfaces';

@customElement('dcx-web-context-menu')
export class DcxWebContextMenu extends LitElement {
  @property({ type: Array }) accessor items: DcxContextMenuItem[] = [];
  @property({ type: Object }) accessor position: { x: number; y: number } = { x: 0, y: 0 };
  @property({ type: String }) accessor positionMode: 'fixed' | 'absolute' = 'fixed';

  @state() accessor isOpen = false;
  @state() accessor isPositioned = false;
  @state() accessor top = '-9999px';
  @state() accessor left = '-9999px';

  private _openPosition: { x: number; y: number } | null = null;

  static override styles = css`
    :host {
      display: contents;
    }

    .dcx-context-menu {
      position: fixed;
      z-index: 9999;
      width: 240px;
      overflow: visible;
      background: var(--bg-default, #ffffff);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      box-shadow:
        var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06)),
        var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08)),
        var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
      color: var(--text-dark, #2a2e33);
      padding: var(--sp-1, 4px);
      animation: dcxContextMenuEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      outline: none;
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    .dcx-context-menu:focus-visible {
      outline: 2px solid var(--border-focus, #1db8f2);
      outline-offset: 2px;
    }

    .dcx-context-menu--absolute {
      position: absolute;
    }

    .dcx-context-menu__list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .dcx-context-menu__list ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .dcx-context-menu__list .dcx-context-menu__divider {
      margin: 6px var(--sp-2, 8px);
      background-color: var(--bg-pressed, #e1e3e6);
      height: 1px;
      border: none;
    }

    .dcx-context-menu__list .dcx-context-menu__item {
      margin: 2px 0;
      border-radius: var(--r-md, 6px);
      transition:
        background-color 0.15s ease-out,
        transform 0.15s ease-out,
        color 0.15s ease-out;
      position: relative;
      outline: none;
    }

    .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__item-content {
      padding: var(--sp-2, 8px) var(--sp-3, 12px);
      border-radius: var(--r-md, 6px);
      font-size: var(--fs-base, 14px);
      font-weight: var(--fw-medium, 500);
      gap: var(--sp-3, 12px);
      display: flex;
      align-items: center;
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:hover {
      background-color: var(--bg-hover, #f7f8fa);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:hover .dcx-context-menu__icon {
      color: var(--bg-primary, #0058ab);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:focus-visible {
      outline: 2px solid var(--border-focus, #1db8f2);
      outline-offset: -2px;
      border-radius: var(--r-md, 6px);
      background-color: var(--bg-hover, #f7f8fa);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger {
      color: var(--color-error, #dc2626);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger .dcx-context-menu__icon {
      color: var(--color-error, #dc2626);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger.dcx-context-menu__item--selectable:hover {
      background-color: var(--color-error-bg, #fef2f2);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--danger.dcx-context-menu__item--selectable:hover .dcx-context-menu__icon {
      color: var(--color-error, #dc2626);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--selectable:active {
      transform: scale(0.98);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      filter: grayscale(1);
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--disabled:hover {
      transform: none;
      background-color: transparent;
    }

    .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__icon {
      font-size: 1.1rem;
      color: var(--text-muted, #696e75);
      transition:
        color 0.2s ease,
        transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--sp-5, 20px);
    }

    .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__text {
      flex: 1;
    }

    .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__description {
      font-size: 0.9em;
      color: var(--text-muted, #696e75);
      font-weight: var(--fw-regular, 400);
      margin-top: 2px;
    }

    .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__children-indicator {
      color: var(--text-muted, #696e75);
      font-size: 0.8rem;
      margin-left: auto;
    }

    .dcx-context-menu__list .dcx-context-menu__item .dcx-context-menu__nested {
      padding: var(--sp-1, 4px);
      background: var(--bg-default, #ffffff);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12));
      animation: dcxSubmenuEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      min-width: 200px;
      left: calc(100% + var(--sp-1, 4px));
      top: -6px;
      position: absolute;
      z-index: 10000;
      display: none;
    }

    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--has-children:hover > .dcx-context-menu__nested,
    .dcx-context-menu__list .dcx-context-menu__item.dcx-context-menu__item--has-children:focus-within > .dcx-context-menu__nested {
      display: block;
    }

    @keyframes dcxContextMenuEnter {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes dcxSubmenuEnter {
      from {
        opacity: 0;
        transform: translateX(-10px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleDocumentKeyDown);
    document.addEventListener('click', this._handleDocumentClick);
    window.addEventListener('resize', this._handleWindowResize);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleDocumentKeyDown);
    document.removeEventListener('click', this._handleDocumentClick);
    window.removeEventListener('resize', this._handleWindowResize);
  }

  private _handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  private _handleDocumentClick = (event: MouseEvent) => {
    if (!this.isOpen) return;
    const path = event.composedPath();
    const container = this.shadowRoot?.querySelector('.dcx-context-menu');
    if (container && path.includes(container)) {
      return;
    }
    this.close();
  };

  private _handleWindowResize = () => {
    if (this.isOpen) {
      this.calculatePosition();
    }
  };

  async open(position?: { x: number; y: number }): Promise<void> {
    if (position) {
      this._openPosition = position;
    }
    this.isOpen = true;
    await this.updateComplete;
    this.calculatePosition();
  }

  close(): void {
    this._openPosition = null;
    this.isOpen = false;
    this.isPositioned = false;
    this.dispatchEvent(new CustomEvent('menu-closed'));
  }

  private calculatePosition(): void {
    const pos = this._openPosition ?? this.position;

    if (this.positionMode === 'absolute') {
      this.left = `${pos.x}px`;
      this.top = `${pos.y}px`;
      this.isPositioned = true;
      return;
    }

    let leftPosition = pos.x;
    let topPosition = pos.y;
    const padding = 10;

    const container = this.shadowRoot?.querySelector('.dcx-context-menu') as HTMLElement;
    if (container) {
      const menuRect = container.getBoundingClientRect();

      if (leftPosition + menuRect.width > window.innerWidth - padding) {
        leftPosition = window.innerWidth - padding - menuRect.width;
        if (leftPosition < 0) leftPosition = 0;
      }

      if (topPosition + menuRect.height > window.innerHeight - padding) {
        const flipped = topPosition - menuRect.height;
        topPosition = flipped >= 0 ? flipped : padding;
      }
    }

    let offsetLeft = 0;
    let offsetTop = 0;

    if (this.shadowRoot) {
      const temp = document.createElement('div');
      temp.style.position = 'fixed';
      temp.style.left = '0px';
      temp.style.top = '0px';
      temp.style.width = '0px';
      temp.style.height = '0px';
      temp.style.visibility = 'hidden';
      this.shadowRoot.appendChild(temp);
      const rect = temp.getBoundingClientRect();
      offsetLeft = rect.left;
      offsetTop = rect.top;
      this.shadowRoot.removeChild(temp);
    }

    this.left = `${leftPosition - offsetLeft}px`;
    this.top = `${topPosition - offsetTop}px`;
    this.isPositioned = true;
  }

  onItemClick(item: DcxContextMenuItem, event?: Event): void {
    event?.stopPropagation();

    if (item.disabled || item.divider) {
      return;
    }

    if (item.action) {
      item.action();
    }

    this.dispatchEvent(
      new CustomEvent('item-selected', {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );

    if (!item.children || item.children.length === 0) {
      this.close();
    }
  }

  onItemKeydown(item: DcxContextMenuItem, index: number, event: KeyboardEvent): void {
    const children = item.children || [];

    if (event.key === 'ArrowRight' && children.length > 0) {
      event.preventDefault();
      const li = event.currentTarget as HTMLElement;
      const firstChild = li.querySelector<HTMLElement>('.dcx-context-menu__nested [tabindex="0"]');
      firstChild?.focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const li = event.currentTarget as HTMLElement;
      const parentLi = li.closest('.dcx-context-menu__nested')?.closest('li');
      parentLi?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onItemClick(item, event);
    }
  }

  private renderItem(item: DcxContextMenuItem, index: number): TemplateResult {
    if (item.divider) {
      return html`<li class="dcx-context-menu__divider" role="separator"></li>`;
    }

    const hasChildren = item.children && item.children.length > 0;
    const itemClasses = [
      'dcx-context-menu__item',
      'dcx-context-menu__item--selectable',
      item.disabled ? 'dcx-context-menu__item--disabled' : '',
      hasChildren ? 'dcx-context-menu__item--has-children' : '',
      item.variant === 'danger' ? 'dcx-context-menu__item--danger' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <li
        class="${itemClasses}"
        tabindex="${!item.disabled ? 0 : -1}"
        role="menuitem"
        aria-disabled="${item.disabled ? 'true' : 'false'}"
        aria-haspopup="${hasChildren ? 'menu' : 'false'}"
        @click="${(e: Event) => this.onItemClick(item, e)}"
        @keydown="${(e: KeyboardEvent) => this.onItemKeydown(item, index, e)}"
      >
        <div class="dcx-context-menu__item-content">
          ${item.icon
            ? html`
                <div class="dcx-context-menu__icon-container">
                  <i class="bi bi-${item.icon} dcx-icon dcx-icon--size-m dcx-context-menu__icon" aria-hidden="true"></i>
                </div>
              `
            : ''}
          <div class="dcx-context-menu__text-container">
            ${item.label || item.text
              ? html`<span class="dcx-context-menu__text">${item.label || item.text}</span>`
              : ''}
            ${item.description
              ? html`<span class="dcx-context-menu__description">${item.description}</span>`
              : ''}
          </div>
          ${hasChildren
            ? html`<i class="bi bi-chevron-right dcx-icon dcx-icon--size-m dcx-context-menu__children-indicator" aria-hidden="true"></i>`
            : ''}
        </div>
        ${hasChildren
          ? html`
              <ul class="dcx-context-menu__nested" @click="${(e: Event) => e.stopPropagation()}">
                ${item.children!.map((child, childIndex) => this.renderItem(child, childIndex))}
              </ul>
            `
          : ''}
      </li>
    `;
  }

  override render() {
    if (!this.isOpen) return html``;

    const classes = `dcx-context-menu ${
      this.positionMode === 'absolute' ? 'dcx-context-menu--absolute' : ''
    }`;
    const style = `top: ${this.top}; left: ${this.left}; opacity: ${
      this.isPositioned ? '1' : '0'
    };`;

    return html`
      <div
        class="${classes}"
        style="${style}"
        @click="${(e: Event) => e.stopPropagation()}"
        tabindex="-1"
        role="menu"
        aria-label="Menú contextual"
      >
        <ul class="dcx-context-menu__list" role="presentation">
          ${this.items.map((item, index) => this.renderItem(item, index))}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-context-menu': DcxWebContextMenu;
  }
}
