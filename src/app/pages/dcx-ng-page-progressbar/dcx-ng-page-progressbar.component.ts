import { Component } from '@angular/core';
import { DcxNgProgressbarComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-progressbar',
  standalone: true,
  imports: [DcxNgProgressbarComponent],
  templateUrl: './dcx-ng-page-progressbar.component.html',
  styleUrl: './dcx-ng-page-progressbar.component.scss',
})
export class DcxNgPageProgressbarComponent {
  numberedSteps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
    { label: 'Step 4' },
  ];

  checkmarkSteps = [
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },
  ];

  processSteps = [
    { label: 'Cart' },
    { label: 'Shipping' },
    { label: 'Review' },
    { label: 'Payment' },
  ];
}
