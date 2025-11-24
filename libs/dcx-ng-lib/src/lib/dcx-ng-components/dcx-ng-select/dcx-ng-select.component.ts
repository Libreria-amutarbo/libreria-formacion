import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

interface SelectOptions {
  value: string | number;
  label: string;
}

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
  host: {
    '[attr.disabled]': 'disabled ? "" : null',
  },
})
export class DcxNgSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOptions[] = [];
  @Input() placeholder = '';

  /** Texto visible encima del select */
  @Input() label = '';

  /** Nombre accesible (solo si NO hay label visible) */
  @Input() ariaLabel = '';

  /** Emite el valor cuando cambia */
  @Output() valueChange = new EventEmitter<string | number | null>();

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

  trackByValue(_index: number, option: SelectOptions) {
    return option.value;
  }
}
