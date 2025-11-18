import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgListComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-list',
  standalone: true,
  imports: [CommonModule, DcxNgListComponent],
  templateUrl: './dcx-ng-page-list.component.html',
  styleUrl: './dcx-ng-page-list.component.scss',
})
export class DcxNgPageListComponent {
  elementos: Array<string | number> = ['Angular', 'React', 'Vue', 2025];
}
