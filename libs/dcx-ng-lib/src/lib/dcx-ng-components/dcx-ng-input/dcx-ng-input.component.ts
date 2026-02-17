import {
  booleanAttribute,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  output,
  Signal,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  DcxSize,
  DcxSpacing,
  DcxInputType,
  ERRORICON,
  SPACING_DEFAULT,
  DcxNgIconComponent,
  DcxNgButtonComponent,
  INPUT_DEFAULT_ARIA_DESCRIBEDBY,
  INPUT_DEFAULT_ARIA_LABEL,
  INPUT_DEFAULT_AUTOCOMPLETE,
  INPUT_DEFAULT_DISABLED,
  INPUT_DEFAULT_ERROR_MESSAGE,
  INPUT_DEFAULT_INPUTMODE,
  INPUT_DEFAULT_INVALID,
  INPUT_DEFAULT_LABEL,
  INPUT_DEFAULT_NAME,
  INPUT_DEFAULT_PLACEHOLDER,
  INPUT_DEFAULT_READONLY,
  INPUT_DEFAULT_REQUIRED,
  INPUT_DEFAULT_SIZE,
  INPUT_DEFAULT_TYPE,
  INPUT_DEFAULT_VALUE,
} from '@dcx-ng-components/dcx-ng-lib';

let uuid = 0;
@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DcxNgIconComponent,
    DcxNgButtonComponent,
  ],
  templateUrl: './dcx-ng-input.component.html',
  styleUrls: ['./dcx-ng-input.component.scss'],
  providers: [
    {
      /**Con ControlValueAccessor podemos usar input en:
        
* - Reactive Forms
   * - Template-driven forms
   * - formControlName
   * - ngModel

        */
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgInputComponent),
      multi: true,
    },
  ],
})
export class DcxNgInputComponent {
  id = input<string>(`my-input-${++uuid}`);
  value = model<string | number>(INPUT_DEFAULT_VALUE);
  disabled = input(INPUT_DEFAULT_DISABLED, {
    transform: booleanAttribute,
  });
  readonly = input(INPUT_DEFAULT_READONLY, {
    transform: booleanAttribute,
  });
  placeholder = input<string>(INPUT_DEFAULT_PLACEHOLDER);
  type = input<DcxInputType>(INPUT_DEFAULT_TYPE);
  name = input<string>(INPUT_DEFAULT_NAME);
  inputId = `dcx-input-${Math.random().toString(36).substring(2, 9)}`;
  required = input(INPUT_DEFAULT_REQUIRED, {
    transform: booleanAttribute,
  });
  autocomplete = input<string>(INPUT_DEFAULT_AUTOCOMPLETE);
  inputMode = input<string>(INPUT_DEFAULT_INPUTMODE);

  isInvalid = input(INPUT_DEFAULT_INVALID, {
    transform: booleanAttribute,
  });

  label = input(INPUT_DEFAULT_LABEL);
  labelId = `${this.inputId}-label`;
  ariaLabel = input<string | null>(INPUT_DEFAULT_ARIA_LABEL);
  ariaDescribedBy = input<string | null>(INPUT_DEFAULT_ARIA_DESCRIBEDBY);
  errorMessage = input<string>(INPUT_DEFAULT_ERROR_MESSAGE);
  errorIcon = input<string>(ERRORICON);
  spacing = input<DcxSpacing>(SPACING_DEFAULT);

  size = input<DcxSize>(INPUT_DEFAULT_SIZE);

  valueChange = output<string | number | null>();

  blurEvent = output<void>();
  focusEvent = output<void>();
  enterPressed = output<void>();

  showPassword = signal(false);

  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};
  errorId = computed(() => `${this.id()}-error`);

  displayType = computed<string>(() => {
    const inputType = this.type();
    if (inputType === DcxInputType.PASSWORD) {
      return this.showPassword() ? 'text' : 'password';
    }
    return inputType;
  });

  getInputIcon = computed<string | null>(() => {
    const inputType = this.type();
    const iconMap: Record<DcxInputType, string | null> = {
      [DcxInputType.TEXT]: null,
      [DcxInputType.NUMBER]: 'pin',
      [DcxInputType.EMAIL]: 'mail',
      [DcxInputType.PASSWORD]: null,
      [DcxInputType.SEARCH]: 'search',
      [DcxInputType.TEL]: 'phone',
      [DcxInputType.URL]: 'link',
    };
    return iconMap[inputType] || null;
  });

  isPasswordType = computed<boolean>(
    () => this.type() === DcxInputType.PASSWORD,
  );

  isSearchType = computed<boolean>(() => this.type() === DcxInputType.SEARCH);

  showActionIcon = computed<boolean>(() => {
    return (this.isPasswordType() || this.isSearchType()) && !this.readonly();
  });

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

  inputContolClasses = computed<string>(() => {
    const base = 'dcx-ng-input__control';
    const sizeValue = this.spacing();
    return [base, `${base}--${sizeValue}`].filter(Boolean).join(' ');
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

  onInput(newValue: string) {
    const formattedValue = this.formatValueByType(newValue);
    this.value.set(formattedValue);
    this.valueChange.emit(formattedValue);
  }

  togglePasswordVisibility() {
    this.showPassword.update(val => !val);
  }

  private formatValueByType(value: string): string | number {
    const inputType = this.type();

    switch (inputType) {
      case DcxInputType.NUMBER: {
        const numericValue = value.replace(/[^0-9.-]/g, '');
        return numericValue === '' ? '' : parseFloat(numericValue);
      }
      case DcxInputType.EMAIL:
        return value.toLowerCase();
      case DcxInputType.TEL:
        return value.replace(/[^0-9\s\-()]/g, '');
      case DcxInputType.SEARCH:
        return value.trim();
      case DcxInputType.URL:
        return value.toLowerCase();
      case DcxInputType.TEXT:
      case DcxInputType.PASSWORD:
      default:
        return value;
    }
  }

  onActionButtonClick() {
    if (this.isPasswordType()) {
      this.togglePasswordVisibility();
    } else if (this.isSearchType()) {
      // Aquí puedes agregar lógica para búsqueda si es necesario
      this.valueChange.emit(this.value());
    }
  }

  getActionButtonAriaLabel = computed<string>(() => {
    if (this.isPasswordType()) {
      return this.showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña';
    } else if (this.isSearchType()) {
      return 'Buscar';
    }
    return '';
  });

  getActionButtonIcon = computed<string>(() => {
    if (this.isPasswordType()) {
      return this.showPassword() ? 'eye-slash-fill' : 'eye-fill';
    } else if (this.isSearchType()) {
      return 'search';
    }
    return '';
  });
}
