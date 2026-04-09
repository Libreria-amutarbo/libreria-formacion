import { Component } from '@angular/core';
import { DcxNgPopoverComponent, DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-popover',
  standalone: true,
  imports: [DcxNgPopoverComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-popover.html',
  styleUrl: './dcx-ng-page-popover.scss',
})
export class DcxNgPagePopover {}
