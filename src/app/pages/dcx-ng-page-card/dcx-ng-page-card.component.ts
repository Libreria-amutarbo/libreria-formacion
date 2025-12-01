import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgCardComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-card/dcx-ng-card.component';

@Component({
  selector: 'app-dcx-ng-page-card',
  standalone: true,
  imports: [DcxNgCardComponent],
  templateUrl: './dcx-ng-page-card.component.html',
  styleUrl: './dcx-ng-page-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCardComponent { }
