import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgTooltipComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-tooltip/dcx-ng-tooltip.component';

@Component({
  selector: 'dcx-ng-dcx-ng-page-tooltip',
  standalone: true,
  imports: [CommonModule, DcxNgTooltipComponent],
  templateUrl: './dcx-ng-page-tooltip.component.html',
  styleUrls: ['./dcx-ng-page-tooltip.component.scss'],
})
export class DcxNgPageTooltipComponent {}
