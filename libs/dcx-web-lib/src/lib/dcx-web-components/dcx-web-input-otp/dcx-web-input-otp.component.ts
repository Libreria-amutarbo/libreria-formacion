import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TemplateResult } from 'lit';


import { renderDcxWebInputOtpTemplate } from './dcx-web-input-otp.component.html';
import { dcxWebInputOtpStyles } from './dcx-web-input-otp.component.styles';

// Ajustar ruta según estructura real del proyecto
import type {
  DcxInputOtpSize,
  DcxInputOtpType,
  DcxInputOtpInputMode,
  DcxInputOtpTemplateContext,
} from '../../core/interfaces/inputOtp';

@customElement('dcx-web-input-otp')
export class DcxWebInputOtp extends LitElement {
  @property({ type: Number })
  accessor length = 4;

  @property({ type: String })
  accessor size: DcxInputOtpSize = 'medium';

  @property({ type: Boolean })
  accessor integerOnly = false;

  @property({ type: Boolean })
  accessor mask = false;

  @property({ type: Boolean })
  accessor invalid = false;

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = 'Código de un solo uso';

  @property({ type: String })
  accessor errorMessage = '';

  @state()
  accessor formDisabled = false;

  @state()
  accessor tokens: string[] = this.createEmptyTokens(4);

  @property({ attribute: false })
  accessor inputTemplateRenderer:
    ((
      context: DcxInputOtpTemplateContext,
    ) => TemplateResult)
    | null = null;

  static override styles = dcxWebInputOtpStyles;

  private readonly uid =
    `dcx-otp-${Math.random().toString(36).slice(2, 9)}`;

  public readonly errorId =
    `${this.uid}-error`;


  public getTemplateContext(
    token: string,
    index: number,
  ): DcxInputOtpTemplateContext {
    return {
      $implicit: token,
      token,
      index,

      events: {
        input: (event: Event) =>
          this.onInput(event, index),

        keydown: (
          event: KeyboardEvent,
        ) =>
          this.onKeydown(event, index),

        paste: (
          event: ClipboardEvent,
        ) =>
          this.onPaste(event, index),

        focus: (
          _event: FocusEvent,
        ) =>
          this.onFocus(index),

        blur: (
          _event: FocusEvent,
        ) =>
          this.onBlur(index),
      },

      attrs: {
        type: this.inputType,
        inputmode: this.inputMode,
        autocomplete: 'one-time-code',
        maxlength: 1,
        placeholder: this.placeholder,
        ariaLabel:
          this.getAriaLabel(index),
        disabled: this.isDisabled,
        value: token,
      },
    };
  }

  get normalizedLength(): number {
    const nextLength = Number(this.length);

    if (!Number.isFinite(nextLength) || nextLength < 1) {
      return 4;
    }

    return Math.floor(nextLength);
  }

  override willUpdate(): void {
    if (this.tokens.length === this.normalizedLength) {
      return;
    }

    const nextTokens =
      this.tokens.slice(0, this.normalizedLength);

    while (nextTokens.length < this.normalizedLength) {
      nextTokens.push('');
    }

    this.tokens = nextTokens;
  }

  get inputType(): DcxInputOtpType {
    if (this.mask) return 'password';
    if (this.integerOnly) return 'tel';

    return 'text';
  }

  override get inputMode(): DcxInputOtpInputMode {
    return this.integerOnly ? 'numeric' : 'text';
  }

  get isDisabled(): boolean {
    return this.disabled || this.formDisabled;
  }

  get showError(): boolean {
    return (
      this.invalid &&
      this.errorMessage.trim().length > 0
    );
  }

  get describedBy(): string | null {
    return this.showError
      ? this.errorId
      : null;
  }

  get displayTokens(): string[] {
    return this.tokens;
  }

  get inputBaseClass(): string {
    const classes = ['dcx-input-otp__input'];

    if (this.size === 'small') {
      classes.push('dcx-input-otp__input--small');
    }

    if (this.size === 'large') {
      classes.push('dcx-input-otp__input--large');
    }

    return classes.join(' ');
  }

  emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  writeValue(value: string | null): void {
    const sanitized = this.sanitizeValue(
      String(value ?? ''),
    );

    this.tokens =
      this.valueToTokens(sanitized);
  }

  setDisabledState(
    isDisabled: boolean,
  ): void {
    this.formDisabled = isDisabled;
  }

  override focus(): void {
    const firstEmpty =
      this.tokens.findIndex(
        token => !token,
      );

    const target =
      firstEmpty >= 0
        ? firstEmpty
        : 0;

    this.focusInput(target);
  }

  clear(): void {
    this.tokens =
      this.createEmptyTokens(
        this.normalizedLength,
      );

    this.propagateValue(true);

    this.focus();
  }

  getAriaLabel(index: number): string {
    return `Dígito ${index + 1} de ${this.normalizedLength}`;
  }

  getInputClass(token: string): string {
    const classes = [this.inputBaseClass];

    if (token) {
      classes.push(
        'dcx-input-otp__input--filled',
      );
    }

    if (this.invalid) {
      classes.push(
        'dcx-input-otp__input--invalid',
      );
    }

    return classes.join(' ');
  }

  onInput(
    event: Event,
    index: number,
  ): void {
    if (this.isDisabled) {
      return;
    }

    const target =
      event.target as HTMLInputElement;

    const value =
      this.sanitizeCharacters(
        target.value,
      );

    target.value = value;

    if (!value) {
      this.updateToken(index, '');
      return;
    }

    this.applyCharacters(index, value);
  }

  onPaste(
    event: ClipboardEvent,
    index: number,
  ): void {
    if (this.isDisabled) {
      return;
    }

    event.preventDefault();

    const pasted =
      event.clipboardData?.getData(
        'text',
      ) ?? '';

    const sanitized =
      this.sanitizeCharacters(
        pasted,
      );

    if (!sanitized) {
      return;
    }

    this.applyCharacters(
      index,
      sanitized,
    );
  }

  onKeydown(
    event: KeyboardEvent,
    index: number,
  ): void {
    if (this.isDisabled) {
      return;
    }

    if (
      this.integerOnly &&
      event.key.length === 1 &&
      !/^\d$/.test(event.key)
    ) {
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.focusInput(
        Math.max(index - 1, 0),
      );
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.focusInput(
        Math.min(
          index + 1,
          this.normalizedLength - 1,
        ),
      );
      return;
    }

    if (event.key !== 'Backspace') {
      return;
    }

    event.preventDefault();

    const current = [...this.tokens];

    if (current[index]) {
      current[index] = '';
      this.tokens = current;
      this.propagateValue(true);
      return;
    }

    if (index === 0) {
      return;
    }

    current[index - 1] = '';

    this.tokens = current;

    this.propagateValue(true);

    this.focusInput(index - 1);
  }

  onFocus(index: number): void {
    this.emit('focusEvent', index);
  }

  onBlur(index: number): void {
    this.emit('blurEvent', index);
  }

  private applyCharacters(
    index: number,
    characters: string,
  ) {
    const nextTokens = [...this.tokens];

    const values =
      this.sanitizeCharacters(
        characters,
      )
        .slice(
          0,
          this.normalizedLength - index,
        )
        .split('');

    values.forEach(
      (character, offset) => {
        nextTokens[
          index + offset
        ] = character;
      },
    );

    this.tokens = nextTokens;

    this.propagateValue(true);

    const nextIndex = Math.min(
      index + values.length,
      this.normalizedLength - 1,
    );

    this.focusInput(nextIndex);
  }

  private updateToken(
    index: number,
    token: string,
  ) {
    const nextTokens = [...this.tokens];

    nextTokens[index] = token;

    this.tokens = nextTokens;

    this.propagateValue(true);
  }

  private propagateValue(
    emitOutputs: boolean,
  ) {
    const value =
      this.tokens.join('');

    if (!emitOutputs) {
      return;
    }

    this.emit(
      'valueChange',
      value,
    );

    if (
      value.length ===
      this.normalizedLength
    ) {
      this.emit(
        'completed',
        value,
      );
    }
  }

  private focusInput(
    index: number,
  ): void {
    queueMicrotask(() => {
      const inputs =
        this.renderRoot.querySelectorAll(
          'input',
        );

      const target =
        inputs[index] as HTMLInputElement;

      target?.focus();
      target?.select();
    });
  }

  private sanitizeValue(
    value: string,
  ): string {
    return this.sanitizeCharacters(
      value,
    ).slice(
      0,
      this.normalizedLength,
    );
  }

  private sanitizeCharacters(
    value: string,
  ): string {
    if (!this.integerOnly) {
      return value;
    }

    return value.replace(/\D+/g, '');
  }

  private valueToTokens(
    value: string,
  ): string[] {
    const tokens =
      this.createEmptyTokens(
        this.normalizedLength,
      );

    value.split('').forEach(
      (char, index) => {
        if (index < tokens.length) {
          tokens[index] = char;
        }
      },
    );

    return tokens;
  }

  private createEmptyTokens(
    length: number,
  ): string[] {
    return Array.from(
      { length },
      () => '',
    );
  }

  override render() {
    return renderDcxWebInputOtpTemplate(
      this,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-input-otp': DcxWebInputOtp;
  }
}