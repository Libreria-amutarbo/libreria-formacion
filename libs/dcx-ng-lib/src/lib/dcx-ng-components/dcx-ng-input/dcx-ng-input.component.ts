import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostBinding,
  input,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DcxInputType, DcxSpacing, DcxSize } from '../../core/interfaces';
import {
  INPUT_DEFAULT_VALUE,
  INPUT_DEFAULT_DISABLED,
  INPUT_DEFAULT_READONLY,
  INPUT_DEFAULT_PLACEHOLDER,
  INPUT_DEFAULT_TYPE,
  INPUT_DEFAULT_NAME,
  INPUT_DEFAULT_REQUIRED,
  INPUT_DEFAULT_AUTOCOMPLETE,
  INPUT_DEFAULT_INPUTMODE,
  INPUT_DEFAULT_INVALID,
  INPUT_DEFAULT_LABEL,
  INPUT_DEFAULT_ARIA_LABEL,
  INPUT_DEFAULT_ARIA_DESCRIBEDBY,
  INPUT_DEFAULT_ERROR_MESSAGE,
  ERRORICON,
  SPACING_DEFAULT,
  INPUT_DEFAULT_SIZE,
  SLIDER_DEFAULT_VALUES,
} from '../../core/defaults';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

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
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  public resetNativeInput() {
    if (this.inputRef?.nativeElement) {
      this.inputRef.nativeElement.value = '';
    }
  }
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
  checked = input(false, {
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
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  multiple = input<boolean>(false);

  size = input<DcxSize>(INPUT_DEFAULT_SIZE);

  valueChange = output<string | number | null>();

  blurEvent = output<void>();
  focusEvent = output<void>();
  enterPressed = output<void>();

  showPassword = signal(false);

  //Input for slider
  min = input(SLIDER_DEFAULT_VALUES.min);
  max = input(SLIDER_DEFAULT_VALUES.max);
  step = input(SLIDER_DEFAULT_VALUES.step);
  stepInput = computed<number>(() => this.step());

  private onChange: (val: any) => void = () => null;
  private onTouched: () => void = () => null;
  errorId = computed(() => `${this.id()}-error`);

  displayType = computed<string>(() => {
    const inputType = this.type();
    if (inputType === DcxInputType.PASSWORD) {
      return this.showPassword() ? 'text' : 'password';
    }
    if (inputType === DcxInputType.RANGE) return 'range';
    return inputType;
  });

  isFileType = computed<boolean>(() => this.type() === DcxInputType.FILE);

  isRadioType = computed<boolean>(() => this.type() === DcxInputType.RADIO);

  isRangeType = computed<boolean>(() => this.type() === DcxInputType.RANGE);

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
      [DcxInputType.FILE]: null,
      [DcxInputType.RADIO]: null,
      [DcxInputType.RANGE]: null,
    };
    return iconMap[inputType] || null;
  });

  @HostBinding('class.vertical') get verticalClass() {
    return this.orientation() === 'vertical';
  }

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

  inputClasses = computed<string>(() => {
    const base = 'dcx-ng-input__control';
    const sizeValue = this.spacing();
    const classes = [base, `${base}--${sizeValue}`];
    if (this.disabled()) classes.push('is-disabled');
    if (this.isInvalid()) classes.push('is-invalid');
    if (this.getInputIcon() !== null) classes.push('has-icon');
    if (this.showActionIcon()) classes.push('has-action');
    return classes.filter(Boolean).join(' ');
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
    if (this.isRadioType() || this.isFileType()) return;
    const formattedValue = this.formatValueByType(newValue);
    this.value.set(formattedValue);
    this.valueChange.emit(formattedValue);
  }

  onChangeEvent(event: Event) {
    if (this.isFileType()) return;
    if (!this.isRadioType()) return;
    const target = event.target as HTMLInputElement | null;
    if (target?.checked) {
      const currentValue = this.value();
      this.onChange(currentValue);
      this.valueChange.emit(currentValue);
    }
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
      case DcxInputType.FILE:
      case DcxInputType.RADIO:
      case DcxInputType.RANGE:
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
    }
    if (this.isSearchType()) {
      return 'Buscar';
    }
    return '';
  });

  getActionButtonIcon = computed<string>(() => {
    if (this.isPasswordType()) {
      return this.showPassword() ? 'eye-slash-fill' : 'eye-fill';
    }
    if (this.isSearchType()) {
      return 'search';
    }
    return '';
  });
}
