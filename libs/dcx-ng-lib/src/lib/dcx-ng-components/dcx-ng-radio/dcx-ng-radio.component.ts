import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type RadioSize = 's' | 'm' | 'l';

@Component({
  selector: 'dcx-ng-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dcx-ng-radio.component.html',
  styleUrl: './dcx-ng-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgRadioComponent),
      multi: true,
    },
  ],
})
export class DcxNgRadioComponent implements ControlValueAccessor {
  @Input() name: string | null = null;
  @Input() value: string | null = null;
  @Input() label: string | null = null;
  @Input() disabled = false;
  @Input() size: RadioSize = 'l';
  @Input() ariaLabel = '';
  @Input() unstyled = false;

  private innerValue: string | null = null;
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  get isChecked(): boolean {
    return this.innerValue === this.value;
  }

  get sizeClass(): string {
    return `dcx-ng-radio--${this.size}`;
  }

  get ariaLabelBinding(): string {
    return this.ariaLabel || 'Radio button';
  }

  onInputChange(): void {
    if (!this.disabled) {
      this.innerValue = this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  writeValue(value: string | null): void {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
