import { Component, computed, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DcxSize } from '../../core/interfaces';


@Component({
  selector: 'dcx-ng-radio',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-radio.component.html',
  styleUrl: './dcx-ng-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DcxNgRadioComponent,
      multi: true,
    },
  ],
})
export class DcxNgRadioComponent implements ControlValueAccessor {

  name = input<string>('');
  value = input<string | null>(null);
  label = input<string | null>(null);
  size = input<DcxSize>('l');
  ariaLabel = input<string>('');
  checked = input(false);
  error = input(false);
  hover = input(false);
  focus = input(false);
  disabled = input(false);

  private readonly selectedValue = signal<string | null>(null);
  private readonly cvaDisabled = signal(false);

  private onChange: (value: string | null) => void = () => { };
  private onTouched: () => void = () => { };

  isChecked = computed(() => this.checked() || this.selectedValue() === this.value());

  isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  sizeClass = computed(() => `dcx-ng-radio--${this.size()}`);
  radioClasses = computed(() => {
    const base = 'dcx-ng-radio';
    return [
      base,
      this.sizeClass(),
      this.error() ? `${base}--error` : '',
      this.hover() ? `${base}--hover` : '',
      this.focus() ? `${base}--focus` : '',
      this.isDisabled() ? `${base}--disabled` : '',
      this.isChecked() ? `${base}--checked` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });
  ariaLabelBinding = computed(() => this.ariaLabel() || this.label() || 'Radio button');

  onInputChange(value: string | null): void {
    if (this.isDisabled()) return;
    this.selectedValue.set(value);
    this.onChange(value);
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