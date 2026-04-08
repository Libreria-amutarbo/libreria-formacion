import { Component } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgDividerComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-grid',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgDividerComponent],
  templateUrl: './dcx-ng-page-grid.component.html',
  styleUrl: './dcx-ng-page-grid.component.scss',
})
export class DcxNgPageGridComponent {
  readonly basicItems = Array.from({ length: 9 }, (_, index) => index + 1);

  readonly designRowA = Array.from({ length: 12 }, (_, index) => ({
    label: 'col-1',
    tone: index % 2 === 0 ? 'tone-90' : 'tone-85',
  }));

  readonly gapExamples = [
    { key: 'none', label: 'No Gap' },
    { key: 's', label: 'Small Gap' },
    { key: 'm', label: 'Medium Gap (default)' },
    { key: 'l', label: 'Large Gap' },
    { key: 'xl', label: 'Extra Large Gap' },
  ];

  readonly alignmentExamples = [
    { label: 'Align Start', className: 'dcx-grid--align-start' },
    { label: 'Align Center', className: 'dcx-grid--align-center' },
    { label: 'Align End', className: 'dcx-grid--align-end' },
    { label: 'Justify Center', className: 'dcx-grid--justify-center' },
  ];

  readonly complexItems = Array.from({ length: 6 }, (_, index) => index + 1);
}
