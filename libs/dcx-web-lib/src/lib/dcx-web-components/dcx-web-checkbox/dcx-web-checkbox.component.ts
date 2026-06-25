import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  DcxCheckbox,
  DcxCheckboxValue
} from '../../core/interfaces/checkbox';

@customElement('dcx-web-checkbox')
export class DcxWebCheckbox extends LitElement {

  @property({ attribute: false }) accessor options: DcxCheckbox[] = [];
  @property({ type: String }) accessor errorIcon = 'error';

  // =========================
  // LOGIC (igual que Angular)
  // =========================

  private _getValue(value: DcxCheckboxValue): DcxCheckboxValue {
    if (value === true) return false;
    if (value === false) return null;
    return true;
  }

  private _getCheckboxError(option: DcxCheckbox): boolean {
    return !!option.error;
  }

  private _getIconName(option: DcxCheckbox): string {
    if (option.value === true) return 'check';
    if (option.value === false) return 'dash';
    return '';
  }

  private _getButtonVariant(option: DcxCheckbox): 'primary' | 'accent' | 'error' {
    if (option.error) return 'error';
    return option.value === null ? 'accent' : 'primary';
  }

  private _getAriaChecked(option: DcxCheckbox): boolean | 'mixed' {
    if (option.value === true) return true;
    if (option.value === false) return 'mixed';
    return false;
  }

  private _changeValue(id: string) {
    const updated = this.options.map(opt =>
      opt.id === id
        ? { ...opt, value: this._getValue(opt.value) }
        : opt
    );

    this.options = updated;

    this.dispatchEvent(
      new CustomEvent('changeOptions', {
        detail: updated,
        bubbles: true,
        composed: true,
      })
    );
  }

  // =========================
  // STYLES (BEM)
  // =========================

  static override styles = css`
    :host {
      display: block;
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    .dcx-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: var(--sp-2, 8px);
    }

    .dcx-checkbox-group__options {
      display: flex;
      flex-direction: column;
      gap: var(--sp-3, 12px);
    }

    .dcx-checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      cursor: pointer;
      user-select: none;
      width: fit-content;
    }

    .dcx-checkbox-label--disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    .dcx-checkbox-label--left {
      flex-direction: row;
    }

    .dcx-checkbox-text {
      font-size: var(--fs-base, 14px);
    }

    .dcx-checkbox-text--error {
      color: var(--color-error, #dc2626);
    }

    .dcx-checkbox__required {
      color: var(--color-error, #dc2626);
    }

    .dcx-checkbox__error {
      display: flex;
      align-items: center;
      gap: var(--sp-1, 4px);
      margin-top: 4px;
      color: var(--color-error, #dc2626);
      font-size: var(--fs-sm, 12px);
    }

    .dcx-checkbox__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: 1px solid #000;
      border-radius: 4px;
      font-size: 12px;
      user-select: none;
    }
  `;

  // =========================
  // RENDER
  // =========================

  override render() {
    return html`
      <div class="dcx-checkbox-group">
        <div class="dcx-checkbox-group__options">
          ${this.options.map(option => html`
            <label
              class="dcx-checkbox-label
                ${option.disabled ? 'dcx-checkbox-label--disabled' : ''}
                ${option.labelPosition === 'left'
                  ? 'dcx-checkbox-label--left'
                  : ''}"
            >

              ${(option.labelPosition === 'left' || option.labelPosition === undefined)
                ? this._renderLabel(option)
                : ''}

              <div
                class="dcx-checkbox__button"
                role="checkbox"
                aria-checked="${this._getAriaChecked(option)}"
                aria-disabled="${option.disabled ? 'true' : 'false'}"
                aria-describedby="${option.error && option.errorMessage
                  ? `checkbox-error-${option.id}`
                  : ''}"
                @click=${() =>
                  !option.disabled && this._changeValue(option.id)}
              >
                ${this._getIconName(option)}
              </div>

              ${option.labelPosition === 'right'
                ? this._renderLabel(option)
                : ''}

            </label>

            ${option.error && option.errorMessage
              ? html`
                <div
                  id="checkbox-error-${option.id}"
                  class="dcx-checkbox__error"
                  role="alert"
                >
                  <span aria-hidden="true">${this.errorIcon}</span>
                  <span>${option.errorMessage}</span>
                </div>
              `
              : ''}
          `)}
        </div>
      </div>
    `;
  }

  private _renderLabel(option: DcxCheckbox) {
    return html`
      <span class="dcx-checkbox-text ${option.error ? 'dcx-checkbox-text--error' : ''}">
        ${option.label}
      </span>
      ${option.required
        ? html`<span class="dcx-checkbox__required">*</span>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-checkbox': DcxWebCheckbox;
  }
}