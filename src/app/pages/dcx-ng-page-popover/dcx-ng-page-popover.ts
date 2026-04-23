import { Component } from '@angular/core';
import {
  DcxNgPopoverComponent,
  DcxNgButtonComponent,
  DcxNgListComponent,
  DcxNgChipComponent,
  DcxNgDividerComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-popover',
  standalone: true,
  imports: [
    DcxNgPopoverComponent,
    DcxNgButtonComponent,
    DcxNgListComponent,
    DcxNgChipComponent,
    DcxNgDividerComponent,
  ],
  templateUrl: './dcx-ng-page-popover.html',
  styleUrl: './dcx-ng-page-popover.scss',
})
export class DcxNgPagePopoverComponent {
  actionItems = [
    { text: 'Edit', icon: 'pencil' },
    { text: 'Duplicate', icon: 'copy' },
    { divider: true },
    { text: 'Delete', icon: 'trash' },
  ];
}
