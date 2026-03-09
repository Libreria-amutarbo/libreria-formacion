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
  DcxCheckboxValue,
  DcxNgIconComponent,
  ERRORICON,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckboxComponent {
  options = input<DcxCheckbox[]>([]);
  private _options = signal<DcxCheckbox[]>([]);
  optionsInputs = computed(() => {
    return this._options();
  });

  iconName = signal('check');
  buttonVariant = signal<DcxButtonVariant>('primary');

  errorIcon = input<string>(ERRORICON);

  constructor() {
    effect(() => {
      this._options.set(this.options());
    });
  }

  getCheckboxError(option: DcxCheckbox): boolean {
    return !!option.error;
  }

  getIconName(option: DcxCheckbox): string {
    switch (option.value) {
      case true:
        return 'check';
      case false:
        return 'dash';
      case null:
      default:
        return '';
    }
  }

  getButtonVariant(option: DcxCheckbox): DcxButtonVariant {
    switch (option.value) {
      case true:
      case false:
        return 'primary';
      case null:
      default:
        return 'secondary';
    }
  }

  changeValue(id: string) {
    this._options.update(opts =>
      opts.map(f => ({
        ...f,
        value: f.id === id ? this.getValue(f.value!) : f.value,
      })),
    );
  }

  getValue(value: boolean): DcxCheckboxValue {
    switch (value) {
      case true:
        return false;
      case false:
        return null;
      case null:
        return true;
    }
  }
}
