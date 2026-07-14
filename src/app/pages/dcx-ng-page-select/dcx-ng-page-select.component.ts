import { Component } from '@angular/core';
import { DcxNgSelectComponent, OPTIONS } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-select',
  standalone: true,
  imports: [DcxNgSelectComponent],
  templateUrl: './dcx-ng-page-select.component.html',
  styleUrls: ['./dcx-ng-page-select.component.scss'],
})
export class DcxNgPageSelectComponent {
  options = OPTIONS;
}
