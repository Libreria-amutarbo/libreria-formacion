import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DcxChipColorType, DcxChipVariantType, DcxChipType } from '../../core/interfaces/chip';
import { chipStyles } from './dcx-web-chip.component.styles';
import '../dcx-web-icon/dcx-web-icon.component';
import '../dcx-web-button/dcx-web-button.component';

@customElement('dcx-web-chip')
export class DcxWebChip extends LitElement {
  @property({ type: String, reflect: true }) accessor label = '';
  @property({ type: String, reflect: true }) accessor color: DcxChipColorType = 'primary';
  @property({ type: Boolean, reflect: true }) accessor removable = false;
  @property({ type: String, reflect: true }) accessor icon = '';
  @property({ type: String, reflect: true }) accessor image = '';
  @property({ type: String, reflect: true }) accessor variant: DcxChipVariantType = 'choice';

  static override styles = chipStyles;

  private get _chipType(): DcxChipType {
    if (this.image.trim()) return 'with-image';
    if (this.icon.trim()) return 'with-icon';
    return 'label-only';
  }

  private get _showRemove(): boolean {
    return this.variant === 'filter' || this.removable;
  }

  private _renderIcon() {
    const validIcons = [
      'house',
      'person',
      'gear',
      'star',
      'code-slash',
      'terminal',
      'palette',
      'book',
      'bug',
    ];
    const iconName = validIcons.includes(this.icon) ? this.icon : 'question-circle';
    return html`<dcx-web-icon name=${iconName}></dcx-web-icon>`;
  }

  private _handleRemove(event: Event): void {
    event.stopPropagation();

    if (!this._showRemove) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('dcx-chip-remove', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const chipClasses = `dcx-chip dcx-chip--${this.color}`;
    const removeAriaLabel = this.label ? `Remover ${this.label}` : 'Remover chip';

    return html`
      <span
        class=${chipClasses}
        data-chip-type=${this._chipType}
        data-variant=${this.variant}
      >
        ${this._chipType === 'with-image'
          ? html`<img
              class="dcx-chip__image"
              src=${this.image}
              alt=${this.label || 'Chip image'}
              loading="lazy"
            />`
          : nothing}

        ${this._chipType === 'with-icon'
          ? html`<span class="dcx-chip__icon" aria-hidden="true">${this._renderIcon()}</span>`
          : nothing}

        ${this.label ? html`<span class="dcx-chip__label">${this.label}</span>` : nothing}

        ${this._showRemove
          ? html`<dcx-web-button
              class="dcx-chip__remove-button"
              variant="icon-only"
              size="s"
              icon-name="x"
              icon-size="l"
              aria-label=${removeAriaLabel}
              @click=${(e: Event) => this._handleRemove(e)}
            ></dcx-web-button>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-chip': DcxWebChip;
  }
}