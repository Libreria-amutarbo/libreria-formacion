import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DcxSelectOptions } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-select',
  standalone: true,
  templateUrl: './dcx-ng-select.component.html',
  styleUrls: ['./dcx-ng-select.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgSelectComponent),
      multi: true,
    },
  ],
  host: { '[attr.disabled]': 'disabled ? "" : null' },
})
export class DcxNgSelectComponent implements ControlValueAccessor {
  options = input<DcxSelectOptions[]>();
  placeholder = input<string>('');
  label = input<string>('');
  ariaLabel = input<string>('');

  /** Emite el valor cuando cambia */
  valueChange = output<string | number | null>();

  /** id único para asociar <label for> con <select id> */
  selectId = `dcx-select-${Math.random().toString(36).slice(2)}`;

  disabled = false;
  value: string | number | null = null;

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | number | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const raw = select.value;
    const newValue = raw ?? null;
    this.value = newValue;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  handleBlur() {
    this.onTouched();
  }

  trackByValue(_index: number, option: DcxSelectOptions) {
    return option.value;
  }
}
