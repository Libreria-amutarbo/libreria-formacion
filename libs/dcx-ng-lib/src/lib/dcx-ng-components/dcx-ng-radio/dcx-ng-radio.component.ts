import { Component, input, computed, effect } from '@angular/core';
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

  name = input<string>('');
  value = input<string | null>(null);
  label = input<string | null>(null);
  size = input<DcxSize>('l');
  ariaLabel = input<string>('');
  unstyled = input<boolean>(false);
  error = input<boolean>(false);
  hover = input<boolean>(false);
  focus = input<boolean>(false);
  disabled = input<boolean>(false);

  readonly formControl = new FormControl<string | null>(null);

  private onChange: (value: string | null) => void = () => { };
  private onTouched: () => void = () => { };

  isChecked = computed(() => this.formControl.value === this.value());

  sizeClass = computed(() => `dcx-ng-radio--${this.size()}`);

  ariaLabelBinding = computed(() => this.ariaLabel() || 'Radio button');

  constructor() {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.onChange(value));

    effect(() => this.updateFormControlState(this.disabled()));
  }

  onInputChange(value: string | null): void {
    if (!this.disabled()) {
      this.formControl.setValue(value);
    }
  }

  writeValue(value: string | null): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.updateFormControlState(isDisabled);
  }

  private updateFormControlState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }
}