import {
  Component,
  Input,
  forwardRef,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

type InputType = 'text' | 'password' | 'email' | 'number' | 'date' | 'search' | 'tel' | 'url';
type InputSize = 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-input.component.html',
  styleUrl: './dcx-ng-input.component.scss',
})
export class DcxNgInputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() placeholder: string | null = null;
  @Input() size: InputSize = 'm';
  @Input() ariaLabel = '';
  @Input() label: string | null = null;
  @Input() required = false;
  @Input() disabled = false;

  value: string = '';
  isFocused = false;
  isTouched = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control() {
    return this.ngControl?.control;
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  get sizeClass(): string {
    return `dcx-ng-input--${this.size}`;
  }

  writeValue(value: any): void {
    this.value = value ?? '';
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

  markAsTouched(): void {
    if (!this.isTouched) {
      this.onTouched();
      this.isTouched = true;
    }
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  get errorMessage(): string | null {
    const errors = this.control?.errors;
    if (!errors || !this.control?.touched) return null;

    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Formato de email inválido';
    if (errors['minlength']) return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Debe tener como máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) return 'Formato inválido';

    return 'Campo inválido';
  }
}
