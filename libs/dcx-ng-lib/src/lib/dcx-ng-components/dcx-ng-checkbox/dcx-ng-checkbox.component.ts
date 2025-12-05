import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  computed,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxVariant, CheckboxOption, DcxSize } from '../../core/interfaces';


@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckboxComponent {
  readonly label = input<string>('');
  readonly formControlName = input<string>('');
  readonly color = input<CheckBoxVariant | string>('primary');
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

  readonly isGroup = computed(() => this.options().length > 0);

  readonly isCheckedComputed = computed(() =>
    this.isGroup() ? false : this._internalChecked()
  );

  readonly containerClasses = computed(() => {
    const classes = ['dcx-checkbox-container'];
    if (this.isPresetColor()) {
      classes.push(`color-${this.color()}`);
    }
    if (this.isGroup()) {
    } else if (this._internalChecked()) {
      classes.push('checked');
    }
    if (this.disabled()) classes.push('disabled');
    classes.push(`size-${this.size()}`);
    return classes.join(' ');
  });

  readonly isPresetColor = computed(() =>
    ['primary', 'accent', 'error'].includes(this.color() as string),
  );

  readonly customColorStyle = computed(() =>
    this.isPresetColor() ? null : (this.color() as string),
  );

  readonly currentSelectedValues = computed(() =>
    this.isGroup() ? this._internalSelectedValues() : [],
  );

  constructor() {
    effect(() => {
      this._internalChecked.set(this.checked());
    });

    effect(() => {
      this._internalSelectedValues.set(this.selectedValues());
    });
  }

  onToggle(): void {
    if (this.disabled()) return;
    const newValue = !this._internalChecked();
    this._internalChecked.set(newValue);
    this.checkedChange.emit(newValue);
  }

  isChecked(value: string): boolean {
    return this._internalSelectedValues().includes(value);
  }

  onGroupCheckboxChange(value: string, shouldCheck: boolean): void {
    if (this.disabled()) return;

    let newSelection: string[];

    if (this.multiple()) {
      if (shouldCheck) {
        newSelection = [...this._internalSelectedValues(), value];
      } else {
        newSelection = this._internalSelectedValues().filter(
          selectedValue => selectedValue !== value,
        );
      }
    } else {
      newSelection = shouldCheck ? [value] : [];
    }

    this._internalSelectedValues.set(newSelection);
    this.selectionChange.emit(newSelection);
  }
}
