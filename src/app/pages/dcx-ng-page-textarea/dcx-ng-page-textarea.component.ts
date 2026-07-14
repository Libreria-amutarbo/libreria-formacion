import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgTextareaComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-textarea',
  standalone: true,
  imports: [DcxNgTextareaComponent],
  templateUrl: './dcx-ng-page-textarea.component.html',
  styleUrl: './dcx-ng-page-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageTextareaComponent {}
