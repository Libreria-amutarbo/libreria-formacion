import { DcxNgDatePickerComponent } from './../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-datePicker/dcx-ng-datePicker.component';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dxc-ng-page-date-picker',
  standalone: true,
  imports: [DcxNgDatePickerComponent],
  templateUrl: './dxc-ng-page-datePicker.component.html',
  styleUrls: ['./dxc-ng-page-datePicker.component.scss'],
})
export class DxcNgPageDatePickerComponent {
  selectedDate = signal<Date | null>(new Date());
  minDate = signal<Date | null>(new Date(2024, 0, 1));
  maxDate = signal<Date | null>(new Date(2025, 11, 31));
  isDisabled = signal(false);

  handleDateChange(date: Date | null): void {
    console.log('Fecha seleccionada:', date);
    this.selectedDate.set(date);
  }

  toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }
}