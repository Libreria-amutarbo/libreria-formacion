import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { DcxIconFieldPosition, DcxSize } from '../../core/interfaces';
import {
  ICON_FIELD_ICON_NAME,
  ICON_FIELD_ICON_POSITION,
  ICON_FIELD_ICON_SIZE,
} from '../../core/defaults';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-icon-field',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-iconField.component.html',
  styleUrls: ['./dcx-ng-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgIconFieldComponent {
  iconName = input(ICON_FIELD_ICON_NAME);
  iconPosition = input<DcxIconFieldPosition>(ICON_FIELD_ICON_POSITION);
  iconSize = input<DcxSize>(ICON_FIELD_ICON_SIZE);
  iconClickable = input(false);
  iconAriaLabel = input<string | null>(null);
  disabled = input(false);

  iconClick = output();

  onIconClick(): void {
    if (this.disabled()) return;
    this.iconClick.emit();
  }
}
