import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-icon',
  standalone: true,
  imports: [DcxNgIconComponent, CommonModule],
  templateUrl: './dcx-ng-page-icon.component.html',
  styleUrl: './dcx-ng-page-icon.component.scss',
})
export class DcxNgPageIconComponent {}
