import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgCardComponent,
} from '@dcx-ng-components/dcx-ng-lib';
import { DEFAULTARGS } from 'src/app/core/mocks/card';

@Component({
  selector: 'app-dcx-ng-page-card',
  standalone: true,
  imports: [DcxNgCardComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-card.component.html',
  styleUrl: './dcx-ng-page-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCardComponent {
  DEFAULT_ARGS = DEFAULTARGS;
}
