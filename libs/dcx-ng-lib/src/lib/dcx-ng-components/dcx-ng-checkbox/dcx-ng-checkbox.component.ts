import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  signal,
  effect,
  output,
} from '@angular/core';

import {
  DcxCheckbox,
  DcxNgButtonComponent,
  DcxButtonVariant,
  DcxCheckboxValue,
  DcxNgIconComponent,
  ERRORICON,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent, NgTemplateOutlet],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckboxComponent {
  options = input<DcxCheckbox[]>([]);
  private _options = signal<DcxCheckbox[]>([]);
  optionsList = computed(() => {
    this._options();
  });

  iconName = signal('check');
  buttonVariant = signal<DcxButtonVariant>('primary');

  errorIcon = input<string>(ERRORICON);

  changeOptions = output<DcxCheckbox[]>();

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
    this.changeOptions.emit(this._options());
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
