import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dcxWebCheckboxStyles } from './dcx-web-checkbox.component.styles';

import type {
  DcxCheckbox,
  DcxCheckboxValue
} from '../../core/interfaces/checkbox';



const ICON_CHECK = svg`
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
` ;

const ICON_DASH = svg`
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
  </svg>
`;

const ICON_ERROR = svg`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
  </svg>
`;

@customElement('dcx-web-checkbox')
export class DcxWebCheckbox extends LitElement {

  static override styles = dcxWebCheckboxStyles;

  @property({ attribute: false }) accessor options: DcxCheckbox[] = [];


  private _getValue(value: DcxCheckboxValue): DcxCheckboxValue {
    if (value === true) return false;
    if (value === false) return null;
    return true;
  }

  private _getIconName(option: DcxCheckbox): 'check' | 'dash' | '' {
    if (option.value === true) return 'check';
    if (option.value === false) return 'dash';
    return '';
  }

  private _getVariant(option: DcxCheckbox): 'primary' | 'secondary' {
    return option.value === null ? 'secondary' : 'primary';
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

    this.dispatchEvent(
      new CustomEvent('changeOptions', {
        detail: updated,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="dcx-checkbox-group">
        <div class="dcx-checkbox-group__options">
          ${this.options.map(option => html`
            <label
              class="dcx-checkbox-label
                ${option.disabled ? 'dcx-checkbox-label--disabled' : ''}
                ${option.labelPosition === 'left' ? 'dcx-checkbox-label--left' : ''}"
              @click=${(e: Event) => {
        e.preventDefault();
        if (!option.disabled) this._changeValue(option.id);
      }}
            >

              ${(option.labelPosition === 'left' || option.labelPosition === undefined)
        ? this._renderLabel(option)
        : ''}

              <button
                class="${this._buildBtnClass(option)}"
                role="checkbox"
                aria-checked="${this._getAriaChecked(option)}"
                aria-label="${option.label ?? 'Checkbox'}"
                ?disabled="${option.disabled}"
                aria-disabled="${option.disabled ? 'true' : 'false'}"
                aria-describedby="${option.error && option.errorMessage
        ? `checkbox-error-${option.id}`
        : ''}"
                @click=${(e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        if (!option.disabled) this._changeValue(option.id);
      }}
              >
                <span class="dcx-checkbox__icon">
                  ${this._renderIcon(option)}
                </span>
              </button>

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
                  <span class="dcx-checkbox__error-icon">${ICON_ERROR}</span>
                  <span>${option.errorMessage}</span>
                </div>
              `
        : ''}
          `)}
        </div>
      </div>
    `;
  }

  private _buildBtnClass(option: DcxCheckbox): string {
    const base = 'dcx-checkbox__btn';
    const variant = this._getVariant(option);

    const classes: string[] = [base, `${base}--${variant}`];

    if (option.error) {
      classes.push(`${base}--error-${variant}`);
    }

    return classes.join(' ');
  }

  private _renderIcon(option: DcxCheckbox) {
    const name = this._getIconName(option);
    if (name === 'check') return ICON_CHECK;
    if (name === 'dash') return ICON_DASH;
    return '';
  }

  private _renderLabel(option: DcxCheckbox) {
    return html`
      <span class="dcx-checkbox-text ${option.error ? 'dcx-checkbox-text--error' : ''}">
        ${option.label}
      </span>
      ${option.required
        ? html`<span class="dcx-checkbox__required" aria-hidden="true">*</span>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-checkbox': DcxWebCheckbox;
  }
}