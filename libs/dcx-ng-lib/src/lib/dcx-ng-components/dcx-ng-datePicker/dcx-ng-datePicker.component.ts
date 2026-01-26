import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DcxInputType, DcxNgButtonComponent, DcxNgInputComponent, CalendarDay, DateFormat } from '@dcx-ng-components/dcx-ng-lib';
import { CommonModule, } from '@angular/common';

type DateFormatPattern = {
  [K in DateFormat]: (day: string, month: string, year: string) => string;
};

@Component({
  selector: 'dcx-ng-date-picker',
  standalone: true,
  imports: [DcxNgButtonComponent, CommonModule, DcxNgInputComponent],
  templateUrl: './dcx-ng-datePicker.component.html',
  styleUrl: './dcx-ng-datePicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDatePickerComponent {
  public DcxInputType = DcxInputType;

  private readonly dateFormatPatterns: DateFormatPattern = {
    'dd/MM/yyyy': (day, month, year) => `${day}/${month}/${year}`,
    'MM/dd/yyyy': (day, month, year) => `${month}/${day}/${year}`,
  };

  constructor() {
    document.addEventListener('mousedown', this._onDocumentClick.bind(this));
  }

  readonly selectedDate = input<Date | null>(null);
  readonly selectedDates = input<Date[]>([]);
  readonly multiSelect = input(false);
  readonly rangeSelect = input(false);
  readonly startDate = input<Date | null>(null);
  readonly endDate = input<Date | null>(null);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input(false);
  readonly placeholder = input('Select date');
  readonly dateFormat = input<DateFormat>('dd/MM/yyyy');

  readonly selectedDateChange = output<Date | null>();
  readonly selectedDatesChange = output<Date[]>();
  readonly startDateChange = output<Date | null>();
  readonly endDateChange = output<Date | null>();

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

  private formatDate(date: Date): string {
    const format = this.dateFormat();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const formatter = this.dateFormatPatterns[format];
    return formatter(day, month, year);
  }

  readonly showClearButton = computed(() => {
    if (this.disabled()) return false;

    if (this.rangeSelect()) {
      return !!(this.startDate() || this.endDate());
    }

    if (this.multiSelect()) {
      return this.selectedDates().length > 0;
    }

    return !!this.selectedDate();
  });

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
    if (this.rangeSelect()) {
      return this.formatRangeDate();
    }

    if (this.multiSelect()) {
      return this.formatMultipleDate();
    }

    return this.formatSingleDate();
  });

  private formatRangeDate(): string {
    const start = this.startDate();
    const end = this.endDate();

    if (!start && !end) return this.placeholder();

    if (start && end) {
      return `${this.formatDate(start)} - ${this.formatDate(end)}`;
    }

    if (start) {
      return this.formatDate(start);
    }

    return this.placeholder();
  }

  private formatMultipleDate(): string {
    const dates = this.selectedDates();
    if (!dates || dates.length === 0) return this.placeholder();

    return dates.map(date => this.formatDate(date)).join(' - ');
  }

  private formatSingleDate(): string {
    const date = this.selectedDate();
    return date ? this.formatDate(date) : this.placeholder();
  }

  readonly calendarDays = computed(() => {
    const currentMonth = this.currentMonth();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateTime = date.getTime();

      const { isSelected, isInRange } = this.calculateDateSelectionState(dateTime);

      return {
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: dateTime === today.getTime(),
        isSelected,
        isInRange,
        isDisabled: this.isDateDisabled(date)
      };
    });
  });

  private calculateDateSelectionState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    if (this.rangeSelect()) {
      return this.calculateRangeSelectionState(dateTime);
    }

    if (this.multiSelect()) {
      return this.calculateMultiSelectionState(dateTime);
    }

    return this.calculateSingleSelectionState(dateTime);
  }

  private calculateRangeSelectionState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const rangeStart = this.startDate();
    const rangeEnd = this.endDate();
    const rangeStartTime = rangeStart ? new Date(rangeStart).setHours(0, 0, 0, 0) : null;
    const rangeEndTime = rangeEnd ? new Date(rangeEnd).setHours(0, 0, 0, 0) : null;

    const isSelected = (rangeStartTime !== null && dateTime === rangeStartTime) ||
      (rangeEndTime !== null && dateTime === rangeEndTime);

    const isInRange = (rangeStartTime && rangeEndTime)
      ? dateTime > rangeStartTime && dateTime < rangeEndTime
      : false;

    return { isSelected, isInRange };
  }

  private calculateMultiSelectionState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const selectedDates = this.selectedDates();
    const selectedTimes = selectedDates.map(d => new Date(d).setHours(0, 0, 0, 0));

    return {
      isSelected: selectedTimes.includes(dateTime),
      isInRange: false
    };
  }

  private calculateSingleSelectionState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const selected = this.selectedDate();
    const selectedTime = selected ? new Date(selected).setHours(0, 0, 0, 0) : null;

    return {
      isSelected: selectedTime !== null && dateTime === selectedTime,
      isInRange: false
    };
  }

  getDayClasses(day: CalendarDay): Record<string, boolean> {
    return {
      'dcx-datepicker__day--other-month': !day.isCurrentMonth,
      'dcx-datepicker__day--today': day.isToday,
      'dcx-datepicker__day--selected': day.isSelected,
      'dcx-datepicker__day--in-range': day.isInRange || false,
      'dcx-datepicker__day--disabled': day.isDisabled
    };
  }

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

    if (this.rangeSelect()) {
      this.handleRangeSelection(day.date);
    } else if (this.multiSelect()) {
      this.handleMultiSelection(day.date);
    } else {
      this.handleSingleSelection(day.date);
    }
  }

  private handleRangeSelection(selectedDate: Date): void {
    const start = this.startDate();
    const end = this.endDate();

    if (!start || (start && end)) {
      this.startDateChange.emit(selectedDate);
      this.endDateChange.emit(null);
      return;
    }

    if (selectedDate < start) {
      this.startDateChange.emit(selectedDate);
      this.endDateChange.emit(start);
    } else {
      this.endDateChange.emit(selectedDate);
    }
  }

  private handleMultiSelection(selectedDate: Date): void {
    const currentDates = [...this.selectedDates()];
    const dateTime = selectedDate.getTime();
    const existingIndex = currentDates.findIndex(d => new Date(d).setHours(0, 0, 0, 0) === dateTime);

    if (existingIndex > -1) {
      currentDates.splice(existingIndex, 1);
    } else {
      currentDates.push(selectedDate);
    }

    currentDates.sort((a, b) => a.getTime() - b.getTime());
    this.selectedDatesChange.emit(currentDates);
  }

  private handleSingleSelection(selectedDate: Date): void {
    this.selectedDateChange.emit(selectedDate);
    this.closeCalendar();
  }

  clearDate(event: { clicked: boolean }): void {
    if (this.disabled()) return;

    if (this.rangeSelect()) {
      this.clearRangeSelection();
    } else if (this.multiSelect()) {
      this.clearMultiSelection();
    } else {
      this.clearSingleSelection();
    }
  }

  private clearRangeSelection(): void {
    this.startDateChange.emit(null);
    this.endDateChange.emit(null);
  }

  private clearMultiSelection(): void {
    this.selectedDatesChange.emit([]);
  }

  private clearSingleSelection(): void {
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
      if (this.rangeSelect()) {
        this.startDateChange.emit(today);
        this.endDateChange.emit(null);
      } else if (this.multiSelect()) {
        const currentDates = [...this.selectedDates()];
        const todayTime = today.getTime();
        const existingIndex = currentDates.findIndex(d => new Date(d).setHours(0, 0, 0, 0) === todayTime);

        if (existingIndex === -1) {
          currentDates.push(today);
          currentDates.sort((a, b) => a.getTime() - b.getTime());
          this.selectedDatesChange.emit(currentDates);
        }
      } else {
        this.selectedDateChange.emit(today);
        this.closeCalendar();
      }
    }
  }
}