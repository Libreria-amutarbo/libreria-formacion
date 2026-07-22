import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-context-menu.component.styles';
import { template } from './dcx-web-context-menu.component.html';
import type { DcxContextMenuItem } from '../../core/interfaces';
import '../dcx-web-icon/dcx-web-icon.component';

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

  static override styles = styles;

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

  renderItem(item: DcxContextMenuItem, index: number): TemplateResult {
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
                  <dcx-web-icon
                    name="${item.icon}"
                    size="auto"
                    class="dcx-context-menu__icon"
                    aria-hidden="true"
                  ></dcx-web-icon>
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
            ? html`
                <dcx-web-icon
                  name="chevron-right"
                  size="auto"
                  class="dcx-context-menu__children-indicator"
                  aria-hidden="true"
                ></dcx-web-icon>
              `
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
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-context-menu': DcxWebContextMenu;
  }
}
