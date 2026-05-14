import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DcxNgCardComponent,
  DcxNgDividerComponent,
  DcxNgSkeletonComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-skeleton',
  standalone: true,
  imports: [DcxNgSkeletonComponent, DcxNgDividerComponent, DcxNgCardComponent],
  templateUrl: './dcx-ng-page-skeleton.component.html',
  styleUrl: './dcx-ng-page-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageSkeletonComponent {
  readonly listItems = [1, 2, 3, 4];
}
