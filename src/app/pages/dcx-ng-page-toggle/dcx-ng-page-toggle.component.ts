import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgToggleComponent } from '@dcx-ng-components/dcx-ng-lib';
import { TogglePosition } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-toggle/dcx-ng-toggle.component';

@Component({
  selector: 'dcx-ng-dcx-ng-page-toggle',
  standalone: true,
  imports: [CommonModule, DcxNgToggleComponent],
  templateUrl: './dcx-ng-page-toggle.component.html',
  styleUrl: './dcx-ng-page-toggle.component.scss',
})
export class DcxNgPageToggleComponent {
  isDarkMode = false;
  readonly TogglePosition = TogglePosition; 

  handleToggle(value: boolean) {
    this.isDarkMode = value;
  }
}
