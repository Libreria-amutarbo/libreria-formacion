import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  DcxPosition,
  DcxSize,
  DcxNgButtonComponent,
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
  iconName = input('');
  iconPosition = input<DcxPosition>('left');

  iconSize: DcxSize = 'm';

  iconClick = output();

  constructor() {}

  onIconClick() {
    this.iconClick.emit();
  }
}
