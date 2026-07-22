import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DcxChipColorType, DcxChipVariantType, DcxChipType } from '../../core/interfaces/chip';
import { styles } from './dcx-web-chip.component.styles';
import { template } from './dcx-web-chip.component.html';
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

  static override styles = styles;

  get chipType(): DcxChipType {
    if (this.image.trim()) return 'with-image';
    if (this.icon.trim()) return 'with-icon';
    return 'label-only';
  }

  get showRemove(): boolean {
    return this.variant === 'filter' || this.removable;
  }

  renderIcon() {
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

  handleRemove(event: Event): void {
    event.stopPropagation();

    if (!this.showRemove) {
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
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-chip': DcxWebChip;
  }
}