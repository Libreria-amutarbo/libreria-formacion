import { DcxNgButtonComponent, DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dxc-ng-page-date-picker',
  standalone: true,
  imports: [DcxNgDatePickerComponent, DcxNgButtonComponent],
  templateUrl: './dxc-ng-page-datePicker.component.html',
  styleUrl: './dxc-ng-page-datePicker.component.scss',
})
export class DxcNgPageDatePickerComponent {
  selectedDate = signal<Date | null>(new Date());
  minDate = signal<Date | null>(new Date(2024, 0, 1));
  maxDate = signal<Date | null>(new Date(2025, 11, 31));
  isDisabled = signal(false);

  handleDateChange(date: Date | null): void {
    this.selectedDate.set(date);
  }

  get toggleButtonLabel(): string {
    return `${this.isDisabled() ? 'Habilitar' : 'Deshabilitar'} el selector de fecha`;
  }

  get formattedSelectedDate(): string {
    return this.selectedDate()
      ? this.selectedDate()!.toLocaleDateString('es-ES')
      : 'ninguna';
  }

  get formattedMinDate(): string {
    return this.minDate()!.toLocaleDateString('es-ES');
  }

  get formattedMaxDate(): string {
    return this.maxDate()!.toLocaleDateString('es-ES');
  }

  get disabledStatus(): string {
    return this.isDisabled() ? 'Sí' : 'No';
  }

  toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }
}