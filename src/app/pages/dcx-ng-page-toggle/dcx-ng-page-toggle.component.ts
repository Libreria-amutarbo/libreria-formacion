import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DcxNgToggleComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-toggle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DcxNgToggleComponent],
  templateUrl: './dcx-ng-page-toggle.component.html',
  styleUrl: './dcx-ng-page-toggle.component.scss',
})
export class DcxNgPageToggleComponent {
  isDarkMode = false;
  eventState = signal<boolean>(false);

  handleToggle(value: boolean) {
    this.isDarkMode = value;
  }
}
