import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  computed,
  signal,
  effect,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  DcxCheckbox,
  DcxPosition,
  DcxSize,
  DcxIconPositionList,
  DcxNgButtonComponent,
  DcxButtonVariant,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgCheckboxComponent),
      multi: true,
    },
  ],
})
export class DcxNgCheckboxComponent implements ControlValueAccessor {
  label = input<string>('');
  labelPosition = input<DcxPosition>('right');
  color = input<string>('#1976d2');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  errorMessage = input<string>('');
  size = input<DcxSize>('m');

  options = input<DcxCheckbox[]>([]);
  private _options = signal<DcxCheckbox[]>([]);
  optionsInputs = computed(() => {
    console.log('cambio');
    return this._options();
  });
  selectedValues = input<string[]>([]);
  multiple = input<boolean>(true);
  groupLabel = input<string>('');

  checkedChange = output<boolean>();
  selectionChange = output<string[]>();

  iconName = signal('check');
  buttonVariant = signal<DcxButtonVariant>('primary');

  private readonly _internalChecked = signal<boolean>(false);
  private readonly _internalSelectedValues = signal<string[]>([]);
  private readonly _isDisabledByForm = signal<boolean>(false);

  private onChange: (value: boolean | string[]) => void = () => {};
  private onTouched: () => void = () => {};

  isGroup = computed(() => this.options().length > 0);

  isCheckedComputed = computed(() =>
    this.isGroup() ? false : this._internalChecked(),
  );

  readonly containerClasses = computed(() => {
    const classes = ['dcx-checkbox-container'];

    if (!this.isGroup() && this._internalChecked()) classes.push('checked');
    if (this.disabled() || this._isDisabledByForm()) classes.push('disabled');

    classes.push(`size-${this.size()}`);
    return classes.join(' ');
  });

  readonly customColorStyle = computed(() => this.color());
  readonly DcxPosition = DcxIconPositionList;

  constructor() {
    effect(() => {
      this._options.set(this.options()); // sincroniza input → signal editable
    });

    effect(() => {
      this._internalChecked.set(this.checked());
    });

    effect(() => {
      this._internalSelectedValues.set(this.selectedValues());
    });
  }

  getIconName() {}

  prueba(id: string) {
    console.log(id);
    this._options.update(opts =>
      opts.map(f => ({
        ...f,
        value: f.id === id ? false : f.value,
      })),
    );

    console.log(this._options());

    switch (this.iconName()) {
      case 'check':
        this.iconName.set('dash');
        this.buttonVariant.set('primary');
        break;
      case 'dash':
        this.iconName.set('');
        this.buttonVariant.set('secondary');
        break;
      case '':
      default:
        this.iconName.set('check');
        this.buttonVariant.set('primary');
        break;
    }
  }

  onToggle(): void {
    if (this.disabled() || this._isDisabledByForm()) return;
    const newValue = !this._internalChecked();
    this._internalChecked.set(newValue);
    this.checkedChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  isChecked(value: string): boolean {
    return this._internalSelectedValues().includes(value);
  }

  isOptionDisabled(option: DcxCheckbox): boolean {
    return this.disabled() || this._isDisabledByForm() || !!option.disabled;
  }

  // onGroupCheckboxChange(value: string, shouldCheck: boolean): void {
  //   const option = this.options().find(opt => opt.value === value);
  //   if (option && this.isOptionDisabled(option)) return;

  //   const newSelection = this.multiple()
  //     ? shouldCheck
  //       ? [...this._internalSelectedValues(), value]
  //       : this._internalSelectedValues().filter(
  //           selectedValue => selectedValue !== value,
  //         )
  //     : shouldCheck
  //       ? [value]
  //       : [];

  //   this._internalSelectedValues.set(newSelection);
  //   this.selectionChange.emit(newSelection);
  //   this.onChange(newSelection);
  //   this.onTouched();
  // }

  writeValue(value: boolean | string[]): void {
    if (this.isGroup()) {
      this._internalSelectedValues.set(Array.isArray(value) ? value : []);
      return;
    }

    this._internalChecked.set(!!value);
  }

  registerOnChange(
    onChangeCallback: (value: boolean | string[]) => void,
  ): void {
    this.onChange = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: () => void): void {
    this.onTouched = onTouchedCallback;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabledByForm.set(isDisabled);
  }
}
