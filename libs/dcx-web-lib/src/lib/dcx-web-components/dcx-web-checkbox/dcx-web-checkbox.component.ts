import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  DcxCheckbox,
  DcxCheckboxValue
} from '../../core/interfaces/checkbox';

// ── SVG icons (Bootstrap Icons equivalents) ──────────────────────────────────

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

  @property({ attribute: false }) accessor options: DcxCheckbox[] = [];

  // =========================
  // LOGIC
  // =========================

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

  /** Mirrors Angular's getButtonVariant:
   *  null  → 'secondary' (white bg, grey border)
   *  true/false → 'primary' (blue bg, white icon)
   */
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
  // STYLES — mirrors Angular dcx-ng-button + dcx-ng-checkbox
  // =========================

  static override styles = css`
    :host {
      display: block;
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    /* ── Layout ───────────────────────── */

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
      display: inline-flex;
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

    /* ── BUTTON (CLAVADO ANGULAR) ───────────────────────── */

    .dcx-checkbox__btn {
      margin: 0;
      padding: 0.25rem;               /* ✅ FIX real */
      background: none;
      border: 1px solid transparent;  /* ✅ consistente */
      border-radius: var(--r-sm, 4px);
      font-family: inherit;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: 1.25rem;
      height: 1.25rem;
      box-sizing: border-box;

      cursor: pointer;
      outline: none;

      transition:
        background 0.12s ease,
        border-color 0.12s ease,
        box-shadow 0.12s ease,
        color 0.12s ease;
    }

    /* ── SECONDARY ───────────────────────── */

    .dcx-checkbox__btn--secondary {
      background-color: var(--bg-default, #ffffff);
      color: var(--text-dark, #2a2e33);
      border-color: var(--border-light, #d1d5db);
    }

    .dcx-checkbox__btn--secondary:hover:not(:disabled) {
      background-color: var(--bg-hover, #f7f8fa);
      border-color: var(--border-hover, #9ca3af);
    }

    .dcx-checkbox__btn--secondary:active:not(:disabled) {
      background-color: var(--bg-pressed, #e1e3e6);
    }

    .dcx-checkbox__btn--secondary:focus-visible {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    /* ── PRIMARY ───────────────────────── */

    .dcx-checkbox__btn--primary {
      background-color: var(--bg-primary, #0058ab);
      color: var(--text-white, #ffffff);
      border-color: var(--bg-primary, #0058ab);
    }

    .dcx-checkbox__btn--primary:hover:not(:disabled) {
      background-color: var(--bg-primary-hover, #004080);
      border-color: var(--bg-primary-hover, #004080);
    }

    .dcx-checkbox__btn--primary:active:not(:disabled) {
      background-color: var(--bg-primary-pressed, #121a38);
    }

    .dcx-checkbox__btn--primary:focus-visible {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    /* ── ERROR (FIJO, SIN BORDE DE 2PX) ───────────────────────── */

    .dcx-checkbox__btn--error-primary,
    .dcx-checkbox__btn--error-secondary {
      border-color: var(--border-error, #dc2626);
    }

    .dcx-checkbox__btn--error-primary {
      background-color: var(--background-error, #dc2626);
      color: var(--text-error, #fff);
    }

    .dcx-checkbox__btn--error-primary:hover:not(:disabled) {
      background-color: var(--background-error-hover, #fecaca);
    }

    .dcx-checkbox__btn:disabled {
      background-color: var(--bg-default, #ffffff);
      border-color: var(--border-light, #d1d5db);
      color: var(--text-disabled, #696e75);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── ICON PERFECT ALIGN ───────────────────────── */

    .dcx-checkbox__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 12px;     /* ✅ FIX CLAVE */
      height: 12px;
      line-height: 0;
    }

    /* ── TEXT ───────────────────────── */

    .dcx-checkbox-text {
      font-size: var(--fs-base, 14px);
      font-weight: var(--fw-regular, 400);
    }

    .dcx-checkbox-text--error {
      color: var(--text-error, #dc2626);
    }

    .dcx-checkbox__required {
      color: var(--color-error, #dc2626);
    }

    /* ── ERROR MESSAGE ───────────────────────── */

    .dcx-checkbox__error {
      display: flex;
      align-items: center;
      gap: var(--sp-1, 4px);
      margin-top: var(--sp-1, 4px);
      color: var(--text-error, #dc2626);
      font-size: var(--fs-sm, 12px);
    }

    .dcx-checkbox__error-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
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

  // ── Helpers ──────────────────────────────────────────────────────────────

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