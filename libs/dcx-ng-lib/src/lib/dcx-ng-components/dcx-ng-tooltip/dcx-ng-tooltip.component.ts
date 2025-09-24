import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipStrategy = 'absolute' | 'fixed';
@Component({
  selector: 'dcx-ng-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-tooltip.component.html',
  styleUrls: ['./dcx-ng-tooltip.component.scss'],
})
export class DcxNgTooltipComponent {
  @Input() position: TooltipPosition = 'top';
  @Input() hideTooltipOnClick: boolean = false;
  @Input() strategy: TooltipStrategy = 'fixed';
  @Input() content: string = '';
}
