import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dcxWebCheckboxStyles } from './dcx-web-checkbox.component.styles';

import type {
  DcxCheckbox,
  DcxCheckboxAriaChecked,
  DcxCheckBoxVariant,
  DcxCheckboxValue,
} from '../../core/interfaces/checkbox';

@customElement('dcx-web-checkbox')
export class DcxWebCheckbox extends LitElement {
  static override styles = dcxWebCheckboxStyles;

  @property({ attribute: false })
  accessor options: DcxCheckbox[] = [];

  private readonly _errorIcon = 'exclamation-circle-fill';

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


  private _getVariant(
    option: DcxCheckbox,
  ): DcxCheckBoxVariant {
    const value = this._normalizeValue(option.value);

    return value === null ? 'secondary' : 'primary';
  }

  private _getIconName(option: DcxCheckbox): string {
    const value = this._normalizeValue(option.value);

    if (value === true) return 'check';
    if (value === false) return 'dash';

    return '';
  }

  private _getAriaChecked(
    option: DcxCheckbox,
  ): DcxCheckboxAriaChecked {
    const value = this._normalizeValue(option.value);

    if (value === true) return 'true';
    if (value === false) return 'mixed';

    return 'false';
  }

  private _changeValue(id: string) {
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

  private _renderLabel(option: DcxCheckbox) {
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
    return html`
      <div class="dcx-checkbox-group">
        <div class="dcx-checkbox-group__options">
          ${this.options.map(option => {
            const iconName = this._getIconName(option);

            return html`
              <label
                class="dcx-checkbox-label
                  ${option.disabled ? 'disabled' : ''}
                  ${option.labelPosition === 'left'
                    ? 'label-left'
                    : ''}"
              >
                ${(option.labelPosition === 'left' ||
                  option.labelPosition === undefined)
                  ? this._renderLabel(option)
                  : ''}

                <dcx-web-button
                  variant="${this._getVariant(option)}"
                  ?icon=${iconName !== ''}
                  is-checkbox
                  ?disabled=${option.disabled ?? false}
                  ?checkbox-error=${option.error ?? false}
                  icon-name="${iconName}"
                  icon-size="xl"
                  aria-label="${option.label ?? 'Checkbox'}"
                  aria-checked="${this._getAriaChecked(option)}"
                  aria-disabled="${option.disabled || null}"
                  aria-describedby="${option.error &&
                  option.errorMessage
                    ? `checkbox-error-${option.id}`
                    : ''}"
                  @buttonClick=${() =>
                    this._changeValue(option.id)}
                >
                </dcx-web-button>

                ${option.labelPosition === 'right'
                  ? this._renderLabel(option)
                  : ''}
              </label>

              ${option.error &&
              option.errorMessage !== ''
                ? html`
                    <div
                      class="dcx-checkbox__error"
                      id="checkbox-error-${option.id}"
                      role="alert"
                    >
                      <dcx-web-icon
                        name="${this._errorIcon}"
                        aria-label="Error"
                        color="var(--color-error, #dc2626)";

                      >
                      </dcx-web-icon>

                      <span>${option.errorMessage}</span>
                    </div>
                  `
                : ''}
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-checkbox': DcxWebCheckbox;
  }
}