import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  effect,
  output,
} from '@angular/core';
import {
  DcxCheckbox,
  DcxButtonVariant,
  DcxCheckboxValue,
} from '../../core/interfaces';
import { ERRORICON } from '../../core/defaults';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

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
  errorIcon = input<string>(ERRORICON);

  _options = signal<DcxCheckbox[]>([]);

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

  getAriaChecked(option: DcxCheckbox): boolean | 'mixed' {
    switch (option.value) {
      case true:
        return true;
      case false:
        return 'mixed';
      case null:
      default:
        return false;
    }
  }

  changeValue(id: string): void {
    this._options.update(opts =>
      opts.map(f => ({
        ...f,
        value: f.id === id ? this.getValue(f.value) : f.value,
      })),
    );
    this.changeOptions.emit(this._options());
  }

  getValue(value: DcxCheckboxValue): DcxCheckboxValue {
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
