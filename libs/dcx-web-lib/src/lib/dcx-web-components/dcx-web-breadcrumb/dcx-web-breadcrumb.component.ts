import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
} from '../../core/interfaces/breadcrumb';
import { styles } from './dcx-web-breadcrumb.component.styles';
import { template } from './dcx-web-breadcrumb.component.html';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

@customElement('dcx-web-breadcrumb')
export class DcxWebBreadcrumb extends LitElement {
  readonly maxVisibleItems = 3;

  @property({ type: Array }) accessor items: DcxBreadcrumbItem[] = [];
  @property({ type: String, attribute: 'icon-separator' })
  accessor iconSeparator: DcxBreadCrumbSeparatorIcons = 'chevron-right';

  @state() accessor isEllipsisMenuOpen = false;

  static override styles = styles;

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
    if (this.isEllipsisMenuOpen && !path.includes(this)) {
      this.isEllipsisMenuOpen = false;
    }
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isEllipsisMenuOpen) {
      this.isEllipsisMenuOpen = false;
      this.shadowRoot
        ?.querySelector<HTMLElement>('.dcx-bc__ellipsis-btn')
        ?.focus();
    }
  };

  toggleEllipsisMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isEllipsisMenuOpen = !this.isEllipsisMenuOpen;
  }

  onItemClick(item: DcxBreadcrumbItem, event: Event) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent<DcxBreadcrumbItem>('itemSelected', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
  }

  onHiddenItemClick(item: DcxBreadcrumbItem, event: Event) {
    event.stopPropagation();
    if (item.disabled) {
      return;
    }

    this.isEllipsisMenuOpen = false;

    this.dispatchEvent(
      new CustomEvent<DcxBreadcrumbItem>('itemSelected', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );

    if (item.href) {
      window.location.assign(item.href);
    }
  }

  renderSeparatorIcon() {
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

  renderItemIcon(iconName: string) {
    return html`<dcx-web-icon name="${iconName}"></dcx-web-icon>`;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-breadcrumb': DcxWebBreadcrumb;
  }
}
