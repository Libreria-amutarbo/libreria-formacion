import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dcx-ng-list',
  standalone: true,
  templateUrl: './dcx-ng-list.component.html',
  styleUrls: ['./dcx-ng-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgListComponent {
  @Input({ required: true }) items: Array<string | number> = [];
}
