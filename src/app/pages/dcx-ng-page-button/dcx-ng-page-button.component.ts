// ...existing code...
import { Component, OnInit } from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-button',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-button.component.html',
  styleUrls: ['./dcx-ng-page-button.component.scss'],
})
export class DcxNgPageButtonComponent {}
