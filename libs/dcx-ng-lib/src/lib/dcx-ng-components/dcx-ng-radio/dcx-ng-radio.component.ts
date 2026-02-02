import { Component, Input, ChangeDetectorRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { DcxSize } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  @Input() name = '';
  @Input() value: string | null = null;
  @Input() label: string | null = null;
  @Input() size: DcxSize = 'l';
  @Input() ariaLabel = '';
  @Input() unstyled = false;
  @Input() error = false;
  @Input() hover = false;
  @Input() focus = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
    this.cdr.markForCheck();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  readonly formControl = new FormControl<string | null>(null);

  private onChange: (value: string | null) => void = () => { };
  private onTouched: () => void = () => { };
  private readonly cdr = inject(ChangeDetectorRef);

  get isChecked(): boolean {
    return this.formControl.value === this.value;
  }

  get sizeClass(): string {
    return `dcx-ng-radio--${this.size}`;
  }

  get ariaLabelBinding(): string {
    return this.ariaLabel || 'Radio button';
  }

  constructor() {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.onChange(value));
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
  }
}