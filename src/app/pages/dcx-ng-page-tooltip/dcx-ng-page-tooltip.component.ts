import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgIconComponent,
  DcxNgTooltipComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-tooltip',
  standalone: true,
  imports: [DcxNgTooltipComponent, DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-page-tooltip.component.html',
  styleUrls: ['./dcx-ng-page-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageTooltipComponent {}
