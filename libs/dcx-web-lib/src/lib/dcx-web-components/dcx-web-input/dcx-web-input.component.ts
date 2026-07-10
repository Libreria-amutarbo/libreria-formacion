import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dcxWebInputStyles } from './dcx-web-input.component.styles';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

import type {
  DcxInputErrorMessage,
  DcxInputType,
} from '../../core/interfaces/input';

import type { DcxSpacing } from '../../core/interfaces';

@customElement('dcx-web-input')
export class DcxWebInput extends LitElement {
  @property({ type: String })
  accessor id = `dcx-input-${Math.random().toString(36).substring(2, 9)}`;

  @property({ attribute: false })
  accessor value: string | number = '';

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor readonly = false;

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: String })
  accessor type: DcxInputType = 'text' as DcxInputType;

  @property({ type: String })
  accessor name = '';

  @property({ type: Boolean })
  accessor required = false;

  @property({ type: Boolean })
  accessor checked = false;

  @property({ type: String })
  accessor autocomplete = '';

  @property({ type: String })
  accessor inputMode = '';

  @property({ type: Boolean })
  accessor isInvalid = false;

  @property({ type: String })
  accessor label = '';

  @property({ type: String })
  accessor hint = '';

  @property({ type: String, attribute: 'aria-label' })
  accessor ariaLabel: string | null = null;

  @property({ type: String, attribute: 'aria-describedby' })
  accessor ariaDescribedBy: string | null = null;

  @property({ type: String })
  accessor errorMessage = '';

  @property({ type: String })
  accessor requiredMessage: string | null = null;

  @property({ attribute: false })
  accessor errorMessages: DcxInputErrorMessage[] = [];

  @property({ type: String })
  accessor errorIcon = 'info-circle';

  @property({ type: String })
  accessor spacing: DcxSpacing = 'm' as DcxSpacing;

  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean })
  accessor multiple = false;

  @property({ type: Number })
  accessor min = 0;

  @property({ type: Number })
  accessor max = 100;

  @property({ type: Number })
  accessor step = 1;

  @state()
  accessor showPassword = false;

  @state()
  accessor touched = false;

  static override styles = dcxWebInputStyles;

  get labelId() {
    return `${this.id}-label`;
  }

  get errorId() {
    return `${this.id}-error`;
  }

  get hintId() {
    return `${this.id}-hint`;
  }

  get isPasswordType() {
    return this.type === 'password';
  }

  get isSearchType() {
    return this.type === 'search';
  }

  get isFileType() {
    return this.type === 'file';
  }

  get isRadioType() {
    return this.type === 'radio';
  }

  get isRangeType() {
    return this.type === 'range';
  }

  get displayType(): string {
    if (this.isPasswordType) {
      return this.showPassword ? 'text' : 'password';
    }

    if (this.isRangeType) {
      return 'range';
    }

    return this.type;
  }

  get showActionIcon() {
    return (
      (this.isPasswordType || this.isSearchType) &&
      !this.readonly
    );
  }

  get getInputIcon(): string | null {
    const map: Record<string, string | null> = {
      text: null,
      number: 'pin',
      email: 'mail',
      password: null, 
      search: 'search',
      tel: 'phone',
      url: 'link',
      file: null,
      radio: null,
      range: null,
    };

    return map[this.type] ?? null;
  }

  get describedBy() {
    const ids = [
      this.ariaDescribedBy,
      this.hint && !this.isInvalid ? this.hintId : null,
      this.isInvalid ? this.errorId : null,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();

    return ids.length ? ids : null;
  }

  get showRequiredWarning() {
    return (
      this.required &&
      ['', null, undefined].includes(this.value as never) &&
      this.touched
    );
  }

  get getActionButtonAriaLabel() {
    if (this.isPasswordType) {
      return this.showPassword
        ? 'Ocultar contraseña'
        : 'Mostrar contraseña';
    }

    if (this.isSearchType) {
      return 'Buscar';
    }

    return '';
  }

  get getActionButtonIcon() {
    if (this.isPasswordType) {
      return this.showPassword
        ? 'eye-slash-fill'
        : 'eye-fill';
    }

    if (this.isSearchType) {
      return 'search';
    }

    return '';
  }

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private formatValueByType(value: string): string | number {
    switch (this.type) {
      case 'number':
        return value.replace(/[^0-9.-]/g, '') === ''
          ? ''
          : parseFloat(value.replace(/[^0-9.-]/g, ''));

      case 'email':
        return value.toLowerCase();

      case 'tel':
        return value.replace(/[^0-9\s\-()]/g, '');

      case 'search':
        return value.trim();

      case 'url':
        return value.toLowerCase();

      default:
        return value;
    }
  }

  private onInputChange(event: Event) {
    if (this.isRadioType || this.isFileType) {
      return;
    }

    const target = event.target as HTMLInputElement;

    const formattedValue = this.formatValueByType(target.value);

    this.value = formattedValue;

    this.emit('valueChange', formattedValue);
  }

  private onChangeEvent(event: Event) {
    if (this.isFileType) return;

    if (!this.isRadioType) return;

    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.emit('valueChange', this.value);
    }
  }

  private onFocusEvent() {
    this.touched = false;
    this.emit('focusEvent');
  }

  private onBlurEvent() {
    this.touched = true;
    this.emit('blurEvent');
  }

  private togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private onActionButtonClick() {
    if (this.isPasswordType) {
      this.togglePasswordVisibility();
      return;
    }

    if (this.isSearchType) {
      this.emit('valueChange', this.value);
    }
  }

  private getInputClasses() {
    const classes = [
      'dcx-input__control',
      `dcx-input__control--${this.spacing}`,
    ];

    if (this.disabled) {
      classes.push('dcx-input__control--disabled');
    }

    if (this.isInvalid) {
      classes.push('dcx-input__control--invalid');
    }

    if (this.getInputIcon) {
      classes.push('dcx-input__control--has-icon');
    }

    if (this.showActionIcon) {
      classes.push('dcx-input__control--has-action');
    }

    return classes.join(' ');
  }

  override render() {
    return html`
      ${this.label
        ? html`
            <label
              class="dcx-input__label ${this.isInvalid
                ? 'dcx-input__label--invalid'
                : ''}"
              for="${this.id}"
              id="${this.labelId}"
            >
              ${this.label}
              ${this.required
                ? html`<span class="dcx-input__required">*</span>`
                : nothing}
            </label>
          `
        : nothing}

      <div class="dcx-input__wrapper">
        <div class="dcx-input__field">
          ${this.getInputIcon
            ? html`
                <dcx-web-icon
                  class="dcx-input__leading-icon"
                  name="${this.getInputIcon}"
                ></dcx-web-icon>
              `
            : nothing}

          <input
            class="${this.getInputClasses()}"
            id="${this.id}"
            name="${this.name}"
            type="${this.displayType}"
            .value="${String(this.value ?? '')}"
            placeholder="${this.placeholder}"
            inputmode="${this.inputMode}"
            autocomplete="${this.autocomplete}"
            ?readonly="${this.readonly}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?checked="${this.checked}"
            ?multiple="${this.isFileType ? this.multiple : false}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            aria-label="${!this.label ? this.ariaLabel ?? '' : ''}"
            aria-required="${this.required ? 'true' : 'false'}"
            aria-invalid="${String(this.isInvalid)}"
            aria-describedby="${this.describedBy ?? ''}"
            @input="${this.onInputChange}"
            @change="${this.onChangeEvent}"
            @focus="${this.onFocusEvent}"
            @blur="${this.onBlurEvent}"
            @keydown="${(e: KeyboardEvent) =>
              e.key === 'Enter'
                ? this.emit('enterPressed')
                : null}"
          />

          ${this.showActionIcon && !this.isRangeType
            ? html`
                <dcx-web-button
                  class="dcx-input__action-button"
                  variant="icon-only"
                  size="s"
                  .icon="${true}"
                  iconSize="l"
                  .iconName="${this.getActionButtonIcon}"
                  .ariaLabel="${this.getActionButtonAriaLabel}"
                  ?disabled="${this.disabled}"
                  @buttonClick="${this.onActionButtonClick}"
                ></dcx-web-button>
              `
            : nothing}
        </div>

        ${this.hint && !this.isInvalid
          ? html`
              <div
                class="dcx-input__hint"
                id="${this.hintId}"
              >
                ${this.hint}
              </div>
            `
          : nothing}

        ${this.showRequiredWarning
          ? html`
              <div
                class="dcx-input__error"
                role="alert"
                id="${this.errorId}"
              >
                <span>
                  ${this.requiredMessage ??
                  'Este campo es requerido'}
                </span>
              </div>
            `
          : nothing}

        ${this.isInvalid &&
        (this.errorMessage || this.errorMessages.length > 0)
          ? html`
              <div
                class="dcx-input__error"
                role="alert"
                id="${this.errorId}"
              >
                <dcx-web-icon
                  .name="${this.errorIcon}"
                  color="var(--color-error, #dc2626)";
                ></dcx-web-icon>

                <div>
                  ${this.errorMessage
                    ? html`
                        <span>
                          ${this.errorMessage}
                        </span>
                      `
                    : nothing}

                  ${this.errorMessages.length
                    ? html`
                        <ul
                          class="dcx-input__error-list"
                        >
                          ${this.errorMessages.map(
                            error => html`
                              <li>
                                ${error.message}
                              </li>
                            `,
                          )}
                        </ul>
                      `
                    : nothing}
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-input': DcxWebInput;
  }
}