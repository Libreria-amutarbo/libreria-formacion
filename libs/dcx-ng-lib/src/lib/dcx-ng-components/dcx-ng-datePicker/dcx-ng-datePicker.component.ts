import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'dcx-ng-date-picker',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-datePicker.component.html',
  styleUrls: ['./dcx-ng-datePicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDatePickerComponent {
  readonly selectedDate = input<Date | null>(null);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input(false);
  readonly placeholder = input('Select date');

  readonly dateChange = output<Date | null>();

  readonly weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  private readonly _currentMonth = signal<Date | null>(null);
  private readonly _isOpen = signal(false);

  readonly currentMonth = computed(() => {
    const manualMonth = this._currentMonth();
    if (manualMonth) return manualMonth;

    const selected = this.selectedDate();
    return selected ? new Date(selected) : new Date();
  });

  readonly isOpen = computed(() => this._isOpen());

  readonly monthName = computed(() => {
    const date = this.currentMonth();
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  });

  readonly formattedSelectedDate = computed(() => {
    const date = this.selectedDate();
    if (!date) return this.placeholder();

    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  });

  readonly calendarDays = computed(() => {
    const currentMonth = this.currentMonth();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = this.selectedDate();
    const selectedTime = selected ? new Date(selected).setHours(0, 0, 0, 0) : null;

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      const dateTime = date.getTime();

      return {
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: dateTime === today.getTime(),
        isSelected: selectedTime !== null && dateTime === selectedTime,
        isDisabled: this.isDateDisabled(date)
      };
    });
  });

  toggleCalendar(): void {
    if (this.disabled()) return;
    this._isOpen.set(!this._isOpen());
    if (!this._isOpen()) {
      this._currentMonth.set(null);
    }
  }

  closeCalendar(): void {
    this._isOpen.set(false);
    this._currentMonth.set(null);
  }

  previousMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() - 1);
    this._currentMonth.set(newDate);
  }

  nextMonth(): void {
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() + 1);
    this._currentMonth.set(newDate);
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled || this.disabled()) return;

    this.dateChange.emit(day.date);
    this.closeCalendar();
  }

  clearDate(event: { clicked: boolean }): void {
    if (this.disabled()) return;
    this.dateChange.emit(null);
  }

  private isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();

    return !!(min && date < min) || !!(max && date > max);
  }
}
