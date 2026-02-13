import {
  booleanAttribute,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DcxSize } from '../../core/interfaces';
import {
  DcxInputErrorMessage,
  DcxInputType,
} from '../../core/interfaces/input';

let uuid = 0;
@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dcx-ng-input.component.html',
  styleUrls: ['./dcx-ng-input.component.scss'],
})
export class DcxNgInputComponent {
  id = input<string>(`my-input-${++uuid}`);
  value = model<string | number | null>(null);
  disabled = input(false, {
    transform: booleanAttribute,
  });
  readonly = input(false, {
    transform: booleanAttribute,
  });
  placeholder = input<string>('');
  type = input<DcxInputType>(DcxInputType.TEXT);
  name = input<string>('');
  inputId = `dcx-input-${Math.random().toString(36).substring(2, 9)}`;
  required = input(false, {
    transform: booleanAttribute,
  });
  autocomplete = input<string>('');
  inputMode = input<string>('');

  isInvalid = input(false, {
    transform: booleanAttribute,
  });

  label = input<string | null>(null);
  labelId = `${this.inputId}-label`;
  ariaLabel = input<string | null>(null);
  ariaDescribedBy = input<string | null>(null);
  errorMessage = input<string | null>('');

  size = input<DcxSize>('m');

  valueChange = output<string | null>();

  blurEvent = output<void>();
  focusEvent = output<void>();
  enterPressed = output<void>();

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};
  errorId = computed(() => `${this.id()}-error`);

  describedBy = computed(() => {
    const ids = [
      this.ariaDescribedBy(),
      this.isInvalid() ? this.errorId() : null,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
    return ids.length ? ids : null;
  });

  constructor() {
    effect(() => {
      const v = this.value();
      this.onChange(v);
    });
  }

  writeValue(val: any): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched();
    this.blurEvent.emit();
  }
}
