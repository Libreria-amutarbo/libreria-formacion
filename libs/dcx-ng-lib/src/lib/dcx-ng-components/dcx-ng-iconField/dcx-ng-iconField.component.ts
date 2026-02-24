import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  DcxSize,
  DcxNgButtonComponent,
  DcxIconFieldPosition,
  ICON_FIELD_ICON_NAME,
  ICON_FIELD_ICON_POSITION,
  ICON_FIELD_ICON_SIZE,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-icon-field',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-iconField.component.html',
  styleUrls: ['./dcx-ng-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DcxNgIconFieldComponent {
  iconName = input(ICON_FIELD_ICON_NAME);
  iconPosition = input<DcxIconFieldPosition>(ICON_FIELD_ICON_POSITION);

  iconSize = input<DcxSize>(ICON_FIELD_ICON_SIZE);

  iconClick = output();

  iconPositionChange = computed<string>(() => {
    const mapped =
      this.iconPosition() === 'left'
        ? 'has-left'
        : this.iconPosition() === 'right'
          ? 'has-right'
          : '';
    return [mapped].filter(Boolean).join(' ');
  });

  constructor() {}

  onIconClick() {
    this.iconClick.emit();
  }
}
