import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostBinding,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'dcx-ng-select',
  templateUrl: './dcx-ng-select.component.html',
  styleUrls: ['./dcx-ng-select.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgSelectComponent),
      multi: true,
    },
  ],
})
export class DcxNgSelectComponent implements ControlValueAccessor {
  @Input() options: { value: string; label: string }[] = [];
  @Input() disabled = false;
  @Input() placeholder: string | null = null;
  @Input() ariaLabel = '';

  @Output() selectionChange = new EventEmitter<string>();

  selected: string | null = null;

  @HostBinding('attr.aria-label') get ariaLabelBinding() {
    return this.ariaLabel || 'Select field';
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(value: string) {
    this.selected = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }
}
