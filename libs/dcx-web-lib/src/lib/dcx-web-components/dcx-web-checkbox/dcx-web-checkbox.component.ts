import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './dcx-web-checkbox.component.styles';
import { template } from './dcx-web-checkbox.component.html';

import type {
  DcxCheckbox,
  DcxCheckboxAriaChecked,
  DcxCheckBoxVariant,
  DcxCheckboxValue,
} from '../../core/interfaces/checkbox';

@customElement('dcx-web-checkbox')
export class DcxWebCheckbox extends LitElement {
  static override styles = styles;

  @property({ attribute: false })
  accessor options: DcxCheckbox[] = [];

  readonly errorIcon = 'exclamation-circle-fill';

  private _getValue(value: DcxCheckboxValue): DcxCheckboxValue {
    if (value === true) return false;
    if (value === false) return null;
    return true;
  }

  
  private _normalizeValue(value: unknown): DcxCheckboxValue {
    if (value === true) return true;
    if (value === false) return false;
    return null;
  }


  getVariant(
    option: DcxCheckbox,
  ): DcxCheckBoxVariant {
    const value = this._normalizeValue(option.value);

    return value === null ? 'secondary' : 'primary';
  }

  getIconName(option: DcxCheckbox): string {
    const value = this._normalizeValue(option.value);

    if (value === true) return 'check';
    if (value === false) return 'dash';

    return '';
  }

  getAriaChecked(
    option: DcxCheckbox,
  ): DcxCheckboxAriaChecked {
    const value = this._normalizeValue(option.value);

    if (value === true) return 'true';
    if (value === false) return 'mixed';

    return 'false';
  }

  changeValue(id: string) {
    const updated = this.options.map(option =>
      option.id === id
        ? {
            ...option,
            value: this._getValue(option.value),
          }
        : option,
    );

    this.dispatchEvent(
      new CustomEvent('changeOptions', {
        detail: updated,
        bubbles: true,
        composed: true,
      }),
    );
  }

  renderLabel(option: DcxCheckbox) {
    return html`
      <span
        class="dcx-checkbox-text ${option.error ? 'error' : ''}"
      >
        ${option.label}
      </span>

      ${option.required
        ? html`
            <span
              class="dcx-checkbox__required"
              aria-hidden="true"
            >
              *
            </span>
          `
        : ''}
    `;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-checkbox': DcxWebCheckbox;
  }
}