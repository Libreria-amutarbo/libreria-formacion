import { Component, signal } from '@angular/core';
import {
  DcxNgTextareaComponent,
  DcxNgDividerComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-textarea',
  standalone: true,
  imports: [DcxNgTextareaComponent, DcxNgDividerComponent],
  templateUrl: './dcx-ng-page-textarea.component.html',
  styleUrl: './dcx-ng-page-textarea.component.scss',
})
export class DcxNgPageTextareaComponent {}
