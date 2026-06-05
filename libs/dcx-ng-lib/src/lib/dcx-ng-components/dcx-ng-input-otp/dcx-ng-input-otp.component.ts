import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type DcxInputOtpSize = 'small' | 'medium' | 'large';

type DcxInputOtpTemplateContext = {
  $implicit: string;
  token: string;
  index: number;
  events: {
    input: (event: Event) => void;
    keydown: (event: KeyboardEvent) => void;
    paste: (event: ClipboardEvent) => void;
    focus: () => void;
    blur: () => void;
  };
  attrs: {
    type: 'text' | 'password' | 'tel';
    inputmode: 'text' | 'numeric';
    autocomplete: string;
    maxlength: number;
    placeholder: string;
    ariaLabel: string;
    disabled: boolean;
    value: string;
  };
};

@Component({
  selector: 'dcx-ng-input-otp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-input-otp.component.html',
  styleUrls: ['./dcx-ng-input-otp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgInputOtpComponent),
      multi: true,
    },
  ],
  host: {
    class: 'dcx-input-otp',
    '[class.dcx-input-otp--invalid]': 'invalid()',
    '[class.dcx-input-otp--disabled]': 'isDisabled()',
  },
})
export class DcxNgInputOtpComponent implements ControlValueAccessor {
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  @ContentChild('input')
  readonly inputTemplate?: TemplateRef<DcxInputOtpTemplateContext>;

  readonly length = input<number>(4);
  readonly size = input<DcxInputOtpSize>('medium');
  readonly integerOnly = input(false, {
    transform: booleanAttribute,
  });
  readonly mask = input(false, {
    transform: booleanAttribute,
  });
  readonly invalid = input(false, {
    transform: booleanAttribute,
  });
  readonly disabled = input(false, {
    transform: booleanAttribute,
  });
  readonly placeholder = input('');
  readonly ariaLabel = input('One-time password input');

  readonly valueChange = output<string>();
  readonly completed = output<string>();
  readonly focusEvent = output<number>();
  readonly blurEvent = output<number>();

  private readonly formDisabled = signal(false);
  private readonly tokens = signal<string[]>(this.createEmptyTokens(4));

  readonly normalizedLength = computed<number>(() => {
    const nextLength = Number(this.length());

    if (!Number.isFinite(nextLength) || nextLength < 1) {
      return 4;
    }

    return Math.floor(nextLength);
  });

  readonly inputType = computed<'text' | 'password' | 'tel'>(() => {
    if (this.mask()) return 'password';
    if (this.integerOnly()) return 'tel';

    return 'text';
  });

  readonly inputMode = computed<'text' | 'numeric'>(() =>
    this.integerOnly() ? 'numeric' : 'text',
  );

  readonly isDisabled = computed<boolean>(
    () => this.disabled() || this.formDisabled(),
  );

  readonly displayTokens = computed<string[]>(() => this.tokens());

  private readonly syncLengthEffect = effect(() => {
    const nextLength = this.normalizedLength();
    const currentTokens = this.tokens();

    if (currentTokens.length === nextLength) {
      return;
    }

    const nextTokens = currentTokens.slice(0, nextLength);
    while (nextTokens.length < nextLength) {
      nextTokens.push('');
    }

    untracked(() => {
      this.tokens.set(nextTokens);
      this.onChange(nextTokens.join(''));
    });
  });

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    const sanitizedValue = this.sanitizeValue(String(value ?? ''));
    this.tokens.set(this.valueToTokens(sanitizedValue));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  focus(): void {
    const firstAvailableIndex = this.tokens().findIndex((token) => !token);
    const targetIndex = firstAvailableIndex >= 0 ? firstAvailableIndex : 0;

    this.focusInput(targetIndex);
  }

  clear(): void {
    this.tokens.set(this.createEmptyTokens(this.normalizedLength()));
    this.propagateValue(true);
    this.focus();
  }

  onInput(event: Event, index: number): void {
    if (this.isDisabled()) {
      return;
    }

    const inputElement = event.target as HTMLInputElement | null;
    const nextValue = this.sanitizeCharacters(inputElement?.value ?? '');

    if (!nextValue) {
      this.updateToken(index, '');
      return;
    }

    this.applyCharacters(index, nextValue);
  }

  onPaste(event: ClipboardEvent, index: number): void {
    if (this.isDisabled()) {
      return;
    }

    event.preventDefault();
    const pastedValue = event.clipboardData?.getData('text') ?? '';
    const nextValue = this.sanitizeCharacters(pastedValue);

    if (!nextValue) {
      return;
    }

    this.applyCharacters(index, nextValue);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.focusInput(Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.focusInput(Math.min(index + 1, this.normalizedLength() - 1));
      return;
    }

    if (event.key !== 'Backspace') {
      return;
    }

    event.preventDefault();

    const currentTokens = [...this.tokens()];
    if (currentTokens[index]) {
      currentTokens[index] = '';
      this.tokens.set(currentTokens);
      this.propagateValue(true);
      return;
    }

    if (index === 0) {
      return;
    }

    currentTokens[index - 1] = '';
    this.tokens.set(currentTokens);
    this.propagateValue(true);
    this.focusInput(index - 1);
  }

  onFocus(index: number): void {
    this.focusEvent.emit(index);
  }

  onBlur(index: number): void {
    this.onTouched();
    this.blurEvent.emit(index);
  }

  getTemplateContext(
    token: string,
    index: number,
  ): DcxInputOtpTemplateContext {
    return {
      $implicit: token,
      token,
      index,
      events: {
        input: (event: Event) => this.onInput(event, index),
        keydown: (event: KeyboardEvent) => this.onKeydown(event, index),
        paste: (event: ClipboardEvent) => this.onPaste(event, index),
        focus: () => this.onFocus(index),
        blur: () => this.onBlur(index),
      },
      attrs: {
        type: this.inputType(),
        inputmode: this.inputMode(),
        autocomplete: 'one-time-code',
        maxlength: 1,
        placeholder: this.placeholder(),
        ariaLabel: this.getAriaLabel(index),
        disabled: this.isDisabled(),
        value: token,
      },
    };
  }

  getAriaLabel(index: number): string {
    return `${this.ariaLabel()} ${index + 1} of ${this.normalizedLength()}`;
  }

  private applyCharacters(index: number, characters: string): void {
    const nextTokens = [...this.tokens()];
    const sanitizedCharacters = this.sanitizeCharacters(characters)
      .slice(0, this.normalizedLength() - index)
      .split('');

    sanitizedCharacters.forEach((character, offset) => {
      nextTokens[index + offset] = character;
    });

    this.tokens.set(nextTokens);
    this.propagateValue(true);

    const nextIndex = Math.min(
      index + sanitizedCharacters.length,
      this.normalizedLength() - 1,
    );
    this.focusInput(nextIndex);
  }

  private updateToken(index: number, token: string): void {
    const nextTokens = [...this.tokens()];
    nextTokens[index] = token;
    this.tokens.set(nextTokens);
    this.propagateValue(true);
  }

  private propagateValue(emitOutputs: boolean): void {
    const nextValue = this.tokens().join('');
    this.onChange(nextValue);

    if (!emitOutputs) {
      return;
    }

    this.valueChange.emit(nextValue);

    if (nextValue.length === this.normalizedLength()) {
      this.completed.emit(nextValue);
    }
  }

  private focusInput(index: number): void {
    queueMicrotask(() => {
      const inputs = Array.from(
        this.hostRef.nativeElement.querySelectorAll('input'),
      ) as HTMLInputElement[];
      const target = inputs[index];

      target?.focus();
      target?.select();
    });
  }

  private sanitizeValue(value: string): string {
    return this.sanitizeCharacters(value).slice(0, this.normalizedLength());
  }

  private sanitizeCharacters(value: string): string {
    if (!this.integerOnly()) {
      return value;
    }

    return value.replace(/\D+/g, '');
  }

  private valueToTokens(value: string): string[] {
    const nextTokens = this.createEmptyTokens(this.normalizedLength());

    value.split('').forEach((character, index) => {
      if (index < nextTokens.length) {
        nextTokens[index] = character;
      }
    });

    return nextTokens;
  }

  private createEmptyTokens(length: number): string[] {
    return Array.from({ length }, () => '');
  }
}
