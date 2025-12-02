import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxVariant } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckboxComponent {
  @Input() label = '';
  @Input() formControlName = '';
  @Input() color: CheckBoxVariant = 'primary';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() errorMessage = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
