import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxVariant } from '../../core/interfaces';

@Component({
  selector: 'app-dcx-ng-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckboxComponent {
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() color: CheckBoxVariant = 'primary';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorMessage: string = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
