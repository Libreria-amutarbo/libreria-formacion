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
  CheckboxOption,
  DcxPosition,
  DcxSize,
} from '../../core/interfaces';
import { DcxIconPositionList } from '../../core/mock';

@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [],
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
  readonly label = input<string>('');
  readonly labelPosition = input<DcxPosition>('right');
  readonly color = input<string>('#1976d2');
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly errorMessage = input<string>('');
  readonly size = input<DcxSize>('m');

  readonly options = input<CheckboxOption[]>([]);
  readonly selectedValues = input<string[]>([]);
  readonly multiple = input<boolean>(true);
  readonly groupLabel = input<string>('');

  readonly checkedChange = output<boolean>();
  readonly selectionChange = output<string[]>();

  private readonly _internalChecked = signal<boolean>(false);
  private readonly _internalSelectedValues = signal<string[]>([]);
  private readonly _isDisabledByForm = signal<boolean>(false);

  private onChange: (value: boolean | string[]) => void = () => { };
  private onTouched: () => void = () => { };

  readonly isGroup = computed(() => this.options().length > 0);

  readonly isCheckedComputed = computed(() =>
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
      this._internalChecked.set(this.checked());
    });

    effect(() => {
      this._internalSelectedValues.set(this.selectedValues());
    });
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

  isOptionDisabled(option: CheckboxOption): boolean {
    return this.disabled() || this._isDisabledByForm() || !!option.disabled;
  }

  onGroupCheckboxChange(value: string, shouldCheck: boolean): void {
    const option = this.options().find(opt => opt.value === value);
    if (option && this.isOptionDisabled(option)) return;

    const newSelection = this.multiple()
      ? shouldCheck
        ? [...this._internalSelectedValues(), value]
        : this._internalSelectedValues().filter(
          selectedValue => selectedValue !== value,
        )
      : shouldCheck
        ? [value]
        : [];

    this._internalSelectedValues.set(newSelection);
    this.selectionChange.emit(newSelection);
    this.onChange(newSelection);
    this.onTouched();
  }

  writeValue(value: boolean | string[]): void {
    if (this.isGroup()) {
      this._internalSelectedValues.set(Array.isArray(value) ? value : []);
      return
    }

    this._internalChecked.set(!!value);
  }

  registerOnChange(onChangeCallback: (value: boolean | string[]) => void): void {
    this.onChange = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: () => void): void {
    this.onTouched = onTouchedCallback;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabledByForm.set(isDisabled);
  }
}
