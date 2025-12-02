import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DcxSelectOptions } from '../../core/interfaces/select';

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
  host: { '[attr.disabled]': 'disabled ? "" : null', },
})
export class DcxNgSelectComponent implements ControlValueAccessor {
  @Input() options: DcxSelectOptions[] = [];
  @Input() placeholder = '';
  @Input() label = '';
  @Input() ariaLabel = '';

  selectId = `dcx-select-${Math.random().toString(36).slice(2)}`;

  disabled = false;
  value: any = null;

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
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
  }

  handleBlur() {
    this.onTouched();
  }

  trackByValue(_index: number, option: DcxSelectOptions) {
    return option.value;
  }
}