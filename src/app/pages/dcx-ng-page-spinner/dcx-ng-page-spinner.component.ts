import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgSpinnerComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-spinner/dcx-ng-spinner.component';


@Component({
  selector: 'dcx-ng-dcx-ng-page-spinner',
  standalone: true,
  imports: [CommonModule, DcxNgSpinnerComponent],
  templateUrl: './dcx-ng-page-spinner.component.html',
  styleUrl: './dcx-ng-page-spinner.component.scss',
})
export class DcxNgPageSpinnerComponent {}
