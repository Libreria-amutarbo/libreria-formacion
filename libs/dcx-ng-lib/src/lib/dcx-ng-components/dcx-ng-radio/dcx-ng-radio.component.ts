import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DcxRadioOption, DcxRadioSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-radio',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-radio.component.html',
  styleUrl: './dcx-ng-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgRadioComponent),
      multi: true,
    },
  ],
})
export class DcxNgRadioComponent implements ControlValueAccessor {
  options = input<DcxRadioOption[]>([]);
  name = input<string>(
    `dcx-radio-${Math.random().toString(36).substring(2, 9)}`,
  );
  label = input<string>('');
  ariaLabel = input<string>('');
  size = input<DcxRadioSize>('l');
  disabled = input(false);
  error = input(false);
  hint = input<string>('');
  errorMessage = input<string>('');

  readonly groupId = `dcx-radio-group-${Math.random().toString(36).substring(2, 9)}`;
  readonly hintId = `${this.groupId}-hint`;
  readonly errorId = `${this.groupId}-error`;

  private readonly selectedValue = signal<string | null>(null);
  private readonly cvaDisabled = signal(false);

  private onChange: (value: string | null) => void = () => null;
  private onTouched: () => void = () => null;

  isGroupDisabled = computed(() => this.disabled() || this.cvaDisabled());

  showError = computed(() => this.error() && !!this.errorMessage());
  showHint = computed(() => !!this.hint() && !this.showError());

  describedBy = computed(() => {
    if (this.showError()) return this.errorId;
    if (this.showHint()) return this.hintId;
    return null;
  });

  isChecked(value: string): boolean {
    return this.selectedValue() === value;
  }

  isOptionDisabled(option: DcxRadioOption): boolean {
    return this.isGroupDisabled() || !!option.disabled;
  }

  radioClasses(option: DcxRadioOption): string {
    const base = 'dcx-ng-radio';
    return [
      base,
      `${base}--${this.size()}`,
      this.error() ? `${base}--error` : '',
      this.isOptionDisabled(option) ? `${base}--disabled` : '',
      this.isChecked(option.value) ? `${base}--checked` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onOptionChange(option: DcxRadioOption): void {
    if (this.isOptionDisabled(option)) return;
    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
