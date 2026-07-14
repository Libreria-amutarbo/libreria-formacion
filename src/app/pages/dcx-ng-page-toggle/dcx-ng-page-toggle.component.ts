import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DcxNgToggleComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-toggle',
  standalone: true,
  imports: [ReactiveFormsModule, DcxNgToggleComponent],
  templateUrl: './dcx-ng-page-toggle.component.html',
  styleUrl: './dcx-ng-page-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageToggleComponent {
  isDarkMode = signal(false);
  eventState = signal(false);

  form = new FormGroup({
    notifications: new FormControl(true),
  });

  handleToggle(value: boolean): void {
    this.isDarkMode.set(value);
  }
}
