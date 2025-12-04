import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dcx-ng-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-checkbox.component.html',
  styleUrls: ['./dcx-ng-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCheckbox {
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() color: 'primary' | 'accent' | 'error' = 'primary';
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
