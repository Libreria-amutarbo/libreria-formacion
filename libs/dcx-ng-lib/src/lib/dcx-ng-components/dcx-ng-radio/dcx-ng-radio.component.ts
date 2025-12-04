import { Component, Input, forwardRef, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type RadioSize = 's' | 'm' | 'l';

@Component({
  selector: 'dcx-ng-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
  @Input() name: string = '';
  @Input() value: string | null = null;
  @Input() label: string | null = null;
  @Input() disabled = false;
  @Input() size: RadioSize = 'l';
  @Input() ariaLabel = '';
  @Input() unstyled = false;

  formControl = new FormControl<string | null>(null);

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.onChange(value);
      });
  }

  get isChecked(): boolean {
    return this.formControl.value === this.value;
  }

  get sizeClass(): string {
    return `dcx-ng-radio--${this.size}`;
  }

  get ariaLabelBinding(): string {
    return this.ariaLabel || 'Radio button';
  }

  onInputChange(value: string | null): void {
    if (!this.disabled) {
      this.formControl.setValue(value);
    }
  }

  writeValue(value: string | null): void {
    this.formControl.setValue(value, { emitEvent: false });
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.formControl.disable({ emitEvent: false }) :     this.formControl.enable({ emitEvent: false });
    this.cdr.markForCheck();
  }

}
