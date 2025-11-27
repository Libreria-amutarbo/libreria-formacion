import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckboxComponent {
  @Input() label = '';
  @Input() formControlName = '';
  @Input() color: 'primary' | 'accent' | 'error' = 'primary';
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
