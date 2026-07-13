import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  computed,
  Component,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FloatLabelVariant, TextareaSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-textarea',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-textarea.component.html',
  styleUrls: ['./dcx-ng-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgTextareaComponent),
      multi: true,
    },
  ],
})
export class DcxNgTextareaComponent
  implements AfterViewInit, ControlValueAccessor
{
  @ViewChild('textareaRef', { static: true })
  textareaRef!: ElementRef<HTMLTextAreaElement>;

  value = model<string>('');
  rows = input<number>(5);
  cols = input<number>(30);
  placeholder = input<string>('');
  disabled = input(false, {
    transform: booleanAttribute,
  });
  readonly = input(false, {
    transform: booleanAttribute,
  });
  autoResize = input(false, {
    transform: booleanAttribute,
  });
  floatLabel = input<FloatLabelVariant | undefined>(undefined);
  label = input<string>('');
  size = input<TextareaSize>('normal');
  fluid = input(false, {
    transform: booleanAttribute,
  });
  filled = input(false, {
    transform: booleanAttribute,
  });
  invalid = input(false, {
    transform: booleanAttribute,
  });
  errorMessage = input<string>('');

  id = input<string>(
    `dcx-textarea-${Math.random().toString(36).substring(2, 9)}`,
  );
  ariaLabel = input<string | null>(null);
  ariaDescribedBy = input<string | null>(null);
  required = input(false, {
    transform: booleanAttribute,
  });
  hint = input<string>('');
  maxLength = input<number | null>(null);
  resizable = input(true, {
    transform: booleanAttribute,
  });

  focused = signal(false);

  errorId = computed(() => `${this.id()}-error`);
  hintId = computed(() => `${this.id()}-hint`);

  showError = computed(() => this.invalid() && !!this.errorMessage());
  showHint = computed(() => !!this.hint() && !this.showError());

  describedBy = computed(() => {
    const ids = [
      this.ariaDescribedBy(),
      this.showError() ? this.errorId() : null,
      this.showHint() ? this.hintId() : null,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
    return ids.length ? ids : null;
  });

  computedResize = computed<'vertical' | 'none'>(() =>
    !this.autoResize() && this.resizable() ? 'vertical' : 'none',
  );

  textareaClasses = computed(() => {
    return [
      'dcx-ng-textarea__control',
      this.autoResize() && `dcx-ng-textarea__control--autoresize`,
      this.size() !== 'normal' && `dcx-ng-textarea__control--${this.size()}`,
      this.filled() && `dcx-ng-textarea__control--filled`,
      this.invalid() && `dcx-ng-textarea__control--invalid`,
    ]
      .filter(Boolean)
      .join(' ');
  });

  wrapperClasses = computed(() => {
    return [
      'dcx-ng-textarea__wrapper',
      this.fluid() && 'dcx-ng-textarea__wrapper--fluid',
      this.floatLabel() && 'dcx-ng-textarea__wrapper--float',
      this.floatLabel() && `dcx-ng-textarea__wrapper--${this.floatLabel()}`,
      this.floatLabel() && this.focused() && 'dcx-ng-textarea__wrapper--active',
    ]
      .filter(Boolean)
      .join(' ');
  });

  valueChange = output<string>();

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  ngAfterViewInit(): void {
    this.syncTextareaSize();
  }

  onInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement | null;
    if (!target) return;

    const newValue = target.value;
    this.value.set(newValue);
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.syncTextareaSize();
  };

  onFocus = (): void => {
    this.focused.set(true);
  };

  onBlur = (): void => {
    this.focused.set(false);
    this.onTouched();
  };

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private syncTextareaSize = (): void => {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    if (!this.autoResize()) {
      textarea.style.height = '';
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
}
