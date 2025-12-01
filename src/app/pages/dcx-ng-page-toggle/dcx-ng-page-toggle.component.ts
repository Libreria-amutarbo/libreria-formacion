import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgToggleComponent } from './dcx-ng-toggle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TogglePosition } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-toggle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DcxNgToggleComponent],
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
