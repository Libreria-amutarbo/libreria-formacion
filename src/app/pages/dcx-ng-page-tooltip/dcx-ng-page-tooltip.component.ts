import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgTooltipComponent,
  DcxPosition,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-tooltip',
  standalone: true,
  imports: [CommonModule, DcxNgTooltipComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-tooltip.component.html',
  styleUrls: ['./dcx-ng-page-tooltip.component.scss'],
})
export class DcxNgPageTooltipComponent { }
