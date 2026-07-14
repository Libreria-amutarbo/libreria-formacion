import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dcxWebInputStyles } from './dcx-web-input.component.styles';
import { renderDcxWebInputTemplate } from './dcx-web-input.component.html';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

import {
  DcxInputErrorMessage,
  DcxInputType,
} from '../../core/interfaces/input';
import type { DcxSpacing } from '../../core/interfaces';

import {
  INPUT_DEFAULT_VALUE,
  INPUT_DEFAULT_DISABLED,
  INPUT_DEFAULT_READONLY,
  INPUT_DEFAULT_PLACEHOLDER,
  INPUT_DEFAULT_TYPE,
  INPUT_DEFAULT_NAME,
  INPUT_DEFAULT_REQUIRED,
  INPUT_DEFAULT_AUTOCOMPLETE,
  INPUT_DEFAULT_INPUTMODE,
  INPUT_DEFAULT_INVALID,
  INPUT_DEFAULT_LABEL,
  INPUT_DEFAULT_ARIA_LABEL,
  INPUT_DEFAULT_ARIA_DESCRIBEDBY,
  INPUT_DEFAULT_ERROR_MESSAGE,
  INPUT_DEFAULT_REQUIRED_MESSAGE,
  ERRORICON,
  SPACING_DEFAULT,
  INPUT_DEFAULT_VALUES,
} from '../../core/defaults';


@customElement('dcx-web-input')
export class DcxWebInput extends LitElement {
  
  @property({ type: String })
  override accessor id = `dcx-input-${Math.random().toString(36).substring(2, 9)}`;

  @property({ attribute: false })
  accessor value: string | number = INPUT_DEFAULT_VALUE;

  @property({ type: Boolean })
  accessor disabled = INPUT_DEFAULT_DISABLED;

  @property({ type: Boolean })
  accessor readonly = INPUT_DEFAULT_READONLY;

  @property({ type: String })
  accessor placeholder = INPUT_DEFAULT_PLACEHOLDER;

  @property({ type: String })
  accessor type: DcxInputType = INPUT_DEFAULT_TYPE;
  @property({ type: String })
  accessor name = INPUT_DEFAULT_NAME;

  @property({ type: Boolean })
  accessor required = INPUT_DEFAULT_REQUIRED;

  @property({ type: Boolean })
  accessor checked = false;

  @property({ type: String })
  accessor autocomplete = INPUT_DEFAULT_AUTOCOMPLETE;

  @property({ type: String })
  override accessor inputMode = INPUT_DEFAULT_INPUTMODE;

  @property({ type: Boolean })
  accessor isInvalid = INPUT_DEFAULT_INVALID;

  @property({ type: String })
  accessor label = INPUT_DEFAULT_LABEL;

  @property({ type: String })
  accessor hint = '';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = INPUT_DEFAULT_ARIA_LABEL;

  @property({ type: String, attribute: 'aria-describedby' })
  accessor ariaDescribedBy: string | null = INPUT_DEFAULT_ARIA_DESCRIBEDBY;

  @property({ type: String })
  accessor errorMessage = INPUT_DEFAULT_ERROR_MESSAGE;

  @property({ type: String })
  accessor requiredMessage: string | null = INPUT_DEFAULT_REQUIRED_MESSAGE;

  @property({ attribute: false })
  accessor errorMessages: DcxInputErrorMessage[] = [];

  @property({ type: String })
  accessor errorIcon = ERRORICON;

  @property({ type: String })
  accessor spacing: DcxSpacing = SPACING_DEFAULT;

  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean })
  accessor multiple = false;

  @property({ type: Number })
  accessor min = INPUT_DEFAULT_VALUES.min;

  @property({ type: Number })
  accessor max = INPUT_DEFAULT_VALUES.max;

  @property({ type: Number })
  accessor step = INPUT_DEFAULT_VALUES.step;

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
    return this.type === DcxInputType.PASSWORD;
  }

  get isSearchType() {
    return this.type === DcxInputType.SEARCH;
  }

  get isFileType() {
    return this.type === DcxInputType.FILE;
  }

  get isRadioType() {
    return this.type === DcxInputType.RADIO;
  }

  get isRangeType() {
    return this.type === DcxInputType.RANGE;
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
      [DcxInputType.TEXT]: null,
      [DcxInputType.NUMBER]: 'pin',
      [DcxInputType.EMAIL]: 'mail',
      [DcxInputType.PASSWORD]: null,
      [DcxInputType.SEARCH]: 'search',
      [DcxInputType.TEL]: 'phone',
      [DcxInputType.URL]: 'link',
      [DcxInputType.FILE]: null,
      [DcxInputType.RADIO]: null,
      [DcxInputType.RANGE]: null,
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

  public emit(name: string, detail?: unknown) {
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

  public onInputChange(event: Event) {
    if (this.isRadioType || this.isFileType) {
      return;
    }

    const target = event.target as HTMLInputElement;

    const formattedValue = this.formatValueByType(target.value);

    this.value = formattedValue;

    this.emit('valueChange', formattedValue);
  }

  public onChangeEvent(event: Event) {
    if (this.isFileType) return;

    if (!this.isRadioType) return;

    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.emit('valueChange', this.value);
    }
  }

  public onFocusEvent() {
    this.touched = false;
    this.emit('focusEvent');
  }

  public onBlurEvent() {
    this.touched = true;
    this.emit('blurEvent');
  }

  private togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  public onActionButtonClick() {
    if (this.isPasswordType) {
      this.togglePasswordVisibility();
      return;
    }

    if (this.isSearchType) {
      this.emit('valueChange', this.value);
    }
  }

  public getInputClasses() {
    const classes = [
      'dcx-input__control',
      `dcx-input__control--${this.spacing}`,
    ];

    if (this.disabled) {
      classes.push('is-disabled', 'dcx-input__control--disabled');
    }

    if (this.isInvalid) {
      classes.push('is-invalid', 'dcx-input__control--invalid');
    }

    if (this.getInputIcon) {
      classes.push('has-icon', 'dcx-input__control--has-icon');
    }

    if (this.showActionIcon) {
      classes.push('has-action', 'dcx-input__control--has-action');
    }

    return classes.join(' ');
  }

  override render() {
    return renderDcxWebInputTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-input': DcxWebInput;
  }
}