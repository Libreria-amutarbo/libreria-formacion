import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';
import { CalendarDay } from '../../core/interfaces/datePicker';
@Component({
  selector: 'dcx-ng-date-picker',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-datePicker.component.html',
  styleUrl: './dcx-ng-datePicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDatePickerComponent {
  constructor() {
    document.addEventListener('mousedown', this._onDocumentClick.bind(this));
  }

  readonly selectedDate = input<Date | null>(null);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input(false);
  readonly placeholder = input('Select date');

  readonly selectedDateChange = output<Date | null>();

  readonly weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  private readonly _currentMonth = signal<Date | null>(null);
  private readonly _isOpen = signal(false);
  private readonly _mode = signal<'calendar' | 'month' | 'year'>('calendar');
  private readonly _yearPageStart = signal<number | null>(null);

  private _onDocumentClick(event: MouseEvent) {
    if (!this.isOpen()) return;
    const calendar = document.querySelector('.dcx-datepicker__calendar');
    const inputWrapper = document.querySelector('.dcx-datepicker__input-wrapper');
    if (!calendar || !inputWrapper) return;
    const target = event.target as HTMLElement;
    if (!calendar.contains(target) && !inputWrapper.contains(target)) {
      this.closeCalendar();
    }
  }

  readonly currentMonth = computed(() => {
    const manualMonth = this._currentMonth();
    if (manualMonth) return manualMonth;

    const selected = this.selectedDate();
    return selected ? new Date(selected) : new Date();
  });

  readonly isOpen = computed(() => this._isOpen());

  readonly monthName = computed(() => {
    const date = this.currentMonth();
    return date.toLocaleDateString('es-ES', { month: 'long' });
  });

  readonly yearNumber = computed(() => {
    return this.currentMonth().getFullYear();
  });

  readonly isMonthMode = computed(() => this._mode() === 'month');
  readonly isYearMode = computed(() => this._mode() === 'year');
  readonly isCalendarMode = computed(() => this._mode() === 'calendar');

  readonly monthsList = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  readonly yearsList = computed(() => {
    const currentYear = this.currentMonth().getFullYear();
    const start = this._yearPageStart() ?? (currentYear - (currentYear % 12));
    return Array.from({ length: 12 }, (_, i) => start + i);
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
      this._mode.set('calendar');
    }
  }

  closeCalendar(): void {
    this._isOpen.set(false);
    this._currentMonth.set(null);
    this._mode.set('calendar');
  }

  previousMonth(): void {
    if (this.isMonthMode()) {
      return;
    }
    if (this.isYearMode()) {
      this._yearPageStart.set((this._yearPageStart() ?? this.currentMonth().getFullYear()) - 12);
      return;
    }
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() - 1);
    this._currentMonth.set(newDate);
  }

  nextMonth(): void {
    if (this.isMonthMode()) {
      return;
    }
    if (this.isYearMode()) {
      this._yearPageStart.set((this._yearPageStart() ?? this.currentMonth().getFullYear()) + 12);
      return;
    }
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() + 1);
    this._currentMonth.set(newDate);
  }

  openMonthSelector(): void {
    this._mode.set('month');
  }

  openYearSelector(): void {
    this._mode.set('year');
    const year = this.currentMonth().getFullYear();
    this._yearPageStart.set(year - (year % 12));
  }

  selectMonth(index: number): void {
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setMonth(index);
    this._currentMonth.set(newDate);
    this._mode.set('calendar');
  }

  selectYear(year: number): void {
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setFullYear(year);
    this._currentMonth.set(newDate);
    this._mode.set('calendar');
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled || this.disabled()) return;
    this.selectedDateChange.emit(day.date);
    this.closeCalendar();
  }

  clearDate(event: { clicked: boolean }): void {
    if (this.disabled()) return;
    this.selectedDateChange.emit(null);
  }

  private isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    return !!(min && date < min) || !!(max && date > max);
  }

  goToToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._currentMonth.set(new Date(today));
    if (!this.isDateDisabled(today)) {
      this.selectedDateChange.emit(today);
      this.closeCalendar();
    }
  }
}

