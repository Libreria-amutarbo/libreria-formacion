import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  untracked,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  DcxInputType,
  DateFormatPattern,
  DateFormat,
  FirstDayOfWeek,
  DCX_DATEPICKER_WEEKDAYS_MONDAY,
  DCX_DATEPICKER_WEEKDAYS_SUNDAY,
  DCX_DATEPICKER_LABELS,
  DCX_DATEPICKER_MONTHS,
  CalendarDay,
} from '../../core/interfaces';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';

@Component({
  selector: 'dcx-ng-date-picker',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgInputComponent, CommonModule],
  templateUrl: './dcx-ng-datePicker.component.html',
  styleUrl: './dcx-ng-datePicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDatePickerComponent implements OnDestroy {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  public DcxInputType = DcxInputType;

  private readonly dateFormatPatterns: DateFormatPattern = {
    'dd/MM/yyyy': (day, month, year) => `${day}/${month}/${year}`,
    'MM/dd/yyyy': (day, month, year) => `${month}/${day}/${year}`,
  };

  private readonly _docClickHandler = (event: MouseEvent) => this._onDocumentClick(event);

  constructor() {
    document.addEventListener('mousedown', this._docClickHandler);

    // Auto-focus the correct day button when the focused date changes
    effect(() => {
      const focused = this._focusedDate();
      const open = this.isOpen();
      if (!focused || !open) return;
      untracked(() => {
        requestAnimationFrame(() => this._focusDayCell());
      });
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousedown', this._docClickHandler);
  }

  // ── Inputs ──────────────────────────────────────────────────────────────────

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
  readonly firstDayOfWeek = input<FirstDayOfWeek>('monday');

  // ── Outputs ─────────────────────────────────────────────────────────────────

  readonly selectedDateChange = output<Date | null>();
  readonly selectedDatesChange = output<Date[]>();
  readonly startDateChange = output<Date | null>();
  readonly endDateChange = output<Date | null>();

  // ── Static data ─────────────────────────────────────────────────────────────

  readonly weekDays = computed(() =>
    this.firstDayOfWeek() === 'sunday'
      ? DCX_DATEPICKER_WEEKDAYS_SUNDAY
      : DCX_DATEPICKER_WEEKDAYS_MONDAY,
  );
  readonly labels = DCX_DATEPICKER_LABELS;
  readonly monthsList = DCX_DATEPICKER_MONTHS;

  get monthsIndexes(): number[] {
    return Array.from({ length: this.monthsList.length }, (_, i) => i);
  }

  // ── Internal signals ────────────────────────────────────────────────────────

  private readonly _currentMonth = signal<Date | null>(null);
  private readonly _isOpen = signal(false);
  private readonly _mode = signal<'calendar' | 'month' | 'year'>('calendar');
  private readonly _yearPageStart = signal<number | null>(null);
  private readonly _focusedDate = signal<Date | null>(null);

  // ── Computed ─────────────────────────────────────────────────────────────────

  readonly isOpen = computed(() => this._isOpen());
  readonly isMonthMode = computed(() => this._mode() === 'month');
  readonly isYearMode = computed(() => this._mode() === 'year');
  readonly isCalendarMode = computed(() => this._mode() === 'calendar');

  readonly currentMonth = computed(() => {
    const manualMonth = this._currentMonth();
    if (manualMonth) return manualMonth;
    const selected = this.selectedDate();
    return selected ? new Date(selected) : new Date();
  });

  readonly monthName = computed(() =>
    this.currentMonth().toLocaleDateString('es-ES', { month: 'long' }),
  );

  readonly yearNumber = computed(() => this.currentMonth().getFullYear());

  readonly yearsList = computed(() => {
    const currentYear = this.currentMonth().getFullYear();
    const start = this._yearPageStart() ?? currentYear - (currentYear % 12);
    return Array.from({ length: 12 }, (_, i) => start + i);
  });

  readonly formattedSelectedDate = computed(() => {
    if (this.rangeSelect()) return this._formatRangeDate();
    if (this.multiSelect()) return this._formatMultipleDate();
    return this._formatSingleDate();
  });

  readonly showClearButton = computed(() => {
    if (this.disabled()) return false;
    if (this.rangeSelect()) return !!(this.startDate() || this.endDate());
    if (this.multiSelect()) return this.selectedDates().length > 0;
    return !!this.selectedDate();
  });

  readonly calendarDays = computed<CalendarDay[]>(() => {
    const currentMonth = this.currentMonth();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    const isSunday = this.firstDayOfWeek() === 'sunday';
    const dayOfWeek = isSunday
      ? firstDay.getDay()
      : (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1);
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateTime = date.getTime();
      const { isSelected, isInRange } = this._calculateDateSelectionState(dateTime);

      return {
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: dateTime === today.getTime(),
        isSelected,
        isInRange,
        isDisabled: this._isDateDisabled(date),
      };
    });
  });

  readonly calendarWeeks = computed(() => {
    const days = this.calendarDays();
    return Array.from({ length: 6 }, (_, i) => days.slice(i * 7, i * 7 + 7));
  });

  readonly gridAriaLabel = computed(
    () => `${this.monthName()} ${this.yearNumber()}`,
  );

  // ── Keyboard handlers ───────────────────────────────────────────────────────

  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleCalendar();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeCalendar();
    }
  }

  onGridKeydown(event: KeyboardEvent, day: CalendarDay): void {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this._moveFocus(1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this._moveFocus(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._moveFocus(7);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._moveFocus(-7);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!day.isDisabled) this.selectDate(day);
        break;
      case 'Escape':
        event.preventDefault();
        this.closeCalendar();
        break;
      case 'PageUp':
        event.preventDefault();
        this.previousMonth();
        break;
      case 'PageDown':
        event.preventDefault();
        this.nextMonth();
        break;
      case 'Home':
        event.preventDefault();
        this._moveFocusToStartOfWeek(day);
        break;
      case 'End':
        event.preventDefault();
        this._moveFocusToEndOfWeek(day);
        break;
    }
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  onCalendarIconClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleCalendar();
  }

  isFocusedDay(day: CalendarDay): boolean {
    const focused = this._focusedDate();
    if (!focused) {
      // Default focus: selected day → today → first of current month
      if (day.isSelected) return true;
      if (day.isToday) return true;
      return day.isCurrentMonth && day.date.getDate() === 1;
    }
    return (
      day.date.getDate() === focused.getDate() &&
      day.date.getMonth() === focused.getMonth() &&
      day.date.getFullYear() === focused.getFullYear()
    );
  }

  getDayClasses(day: CalendarDay): Record<string, boolean> {
    return {
      'other-month': !day.isCurrentMonth,
      'today': day.isToday,
      'selected': day.isSelected,
      'in-range': day.isInRange || false,
      'disabled': day.isDisabled,
    };
  }

  toggleCalendar(): void {
    if (this.disabled()) return;
    this._isOpen.set(!this._isOpen());
    if (!this._isOpen()) {
      this._currentMonth.set(null);
      this._mode.set('calendar');
      this._focusedDate.set(null);
    }
  }

  closeCalendar(): void {
    this._isOpen.set(false);
    this._currentMonth.set(null);
    this._mode.set('calendar');
    this._focusedDate.set(null);
    // Return focus to trigger
    const trigger = this._elementRef.nativeElement.querySelector(
      '.dcx-datepicker__input-wrapper',
    ) as HTMLElement | null;
    trigger?.focus();
  }

  previousYear(): void {
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setFullYear(newDate.getFullYear() - 1);
    this._currentMonth.set(newDate);
  }

  nextYear(): void {
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setFullYear(newDate.getFullYear() + 1);
    this._currentMonth.set(newDate);
  }

  previousMonth(): void {
    if (this.isMonthMode()) return;
    if (this.isYearMode()) {
      this._yearPageStart.set(
        (this._yearPageStart() ?? this.currentMonth().getFullYear()) - 12,
      );
      return;
    }
    const current = this.currentMonth();
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() - 1);
    this._currentMonth.set(newDate);
  }

  nextMonth(): void {
    if (this.isMonthMode()) return;
    if (this.isYearMode()) {
      this._yearPageStart.set(
        (this._yearPageStart() ?? this.currentMonth().getFullYear()) + 12,
      );
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

  applyDate(): void {
    if (this.rangeSelect()) {
      this.startDateChange.emit(this.startDate());
      this.endDateChange.emit(this.endDate());
    } else if (this.multiSelect()) {
      this.selectedDatesChange.emit(this.selectedDates());
    } else {
      this.selectedDateChange.emit(this.selectedDate());
    }
    this.closeCalendar();
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled || this.disabled()) return;
    this._focusedDate.set(day.date);

    if (this.rangeSelect()) {
      this._handleRangeSelection(day.date);
    } else if (this.multiSelect()) {
      this._handleMultiSelection(day.date);
    } else {
      this._handleSingleSelection(day.date);
    }
  }

  clearDate(_event: { clicked: boolean }): void {
    if (this.disabled()) return;
    if (this.rangeSelect()) {
      this.startDateChange.emit(null);
      this.endDateChange.emit(null);
    } else if (this.multiSelect()) {
      this.selectedDatesChange.emit([]);
    } else {
      this.selectedDateChange.emit(null);
    }
  }

  goToToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._currentMonth.set(new Date(today));

    if (this._isDateDisabled(today)) return;

    if (this.rangeSelect()) {
      this.startDateChange.emit(today);
      this.endDateChange.emit(null);
    } else if (this.multiSelect()) {
      const currentDates = [...this.selectedDates()];
      const todayTime = today.getTime();
      const existingIndex = currentDates.findIndex(
        d => new Date(d).setHours(0, 0, 0, 0) === todayTime,
      );
      if (existingIndex === -1) {
        currentDates.push(today);
        currentDates.sort((a, b) => a.getTime() - b.getTime());
        this.selectedDatesChange.emit(currentDates);
      }
    } else {
      this.selectedDateChange.emit(today);
    }
  }

  // ── Private helpers ──────────────────────────────────────────────────────────

  private _onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const host = this._elementRef.nativeElement as HTMLElement;
    if (!host.contains(event.target as Node)) {
      this.closeCalendar();
    }
  }

  private _moveFocus(dayDelta: number): void {
    const current = this._focusedDate() ?? this._defaultFocusDate();
    const newDate = new Date(current);
    newDate.setDate(newDate.getDate() + dayDelta);

    // Auto-change month if navigating out of bounds
    if (
      newDate.getMonth() !== this.currentMonth().getMonth() ||
      newDate.getFullYear() !== this.currentMonth().getFullYear()
    ) {
      const nav = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      this._currentMonth.set(nav);
    }

    this._focusedDate.set(newDate);
  }

  private _moveFocusToStartOfWeek(day: CalendarDay): void {
    const days = this.calendarDays();
    const idx = days.findIndex(d => d.date.getTime() === day.date.getTime());
    const startOfWeek = days[idx - (idx % 7)];
    if (startOfWeek) this._focusedDate.set(startOfWeek.date);
  }

  private _moveFocusToEndOfWeek(day: CalendarDay): void {
    const days = this.calendarDays();
    const idx = days.findIndex(d => d.date.getTime() === day.date.getTime());
    const endOfWeek = days[idx + (6 - (idx % 7))];
    if (endOfWeek) this._focusedDate.set(endOfWeek.date);
  }

  private _defaultFocusDate(): Date {
    const days = this.calendarDays();
    const selected = days.find(d => d.isSelected);
    if (selected) return selected.date;
    const today = days.find(d => d.isToday);
    if (today) return today.date;
    const firstOfMonth = days.find(d => d.isCurrentMonth);
    return firstOfMonth?.date ?? new Date();
  }

  private _focusDayCell(): void {
    const focused = this._focusedDate();
    if (!focused || !this.isOpen()) return;
    const days = this.calendarDays();
    const idx = days.findIndex(
      d =>
        d.date.getDate() === focused.getDate() &&
        d.date.getMonth() === focused.getMonth() &&
        d.date.getFullYear() === focused.getFullYear(),
    );
    if (idx === -1) return;
    const buttons = Array.from(
      this._elementRef.nativeElement.querySelectorAll('.dp-day'),
    ) as HTMLButtonElement[];
    buttons[idx]?.focus();
  }

  private _formatDate(date: Date): string {
    const format = this.dateFormat();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return this.dateFormatPatterns[format](day, month, year);
  }

  private _formatRangeDate(): string {
    const start = this.startDate();
    const end = this.endDate();
    if (!start && !end) return this.placeholder();
    if (start && end) return `${this._formatDate(start)} - ${this._formatDate(end)}`;
    if (start) return this._formatDate(start);
    return this.placeholder();
  }

  private _formatMultipleDate(): string {
    const dates = this.selectedDates();
    if (!dates || dates.length === 0) return this.placeholder();
    if (dates.length > 2) return `${dates.length} fechas seleccionadas`;
    return dates.map(d => this._formatDate(d)).join(' - ');
  }

  private _formatSingleDate(): string {
    const date = this.selectedDate();
    return date ? this._formatDate(date) : this.placeholder();
  }

  private _calculateDateSelectionState(dateTime: number): {
    isSelected: boolean;
    isInRange: boolean;
  } {
    if (this.rangeSelect()) return this._calculateRangeState(dateTime);
    if (this.multiSelect()) return this._calculateMultiState(dateTime);
    return this._calculateSingleState(dateTime);
  }

  private _calculateRangeState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const rangeStart = this.startDate();
    const rangeEnd = this.endDate();
    const startTime = rangeStart ? new Date(rangeStart).setHours(0, 0, 0, 0) : null;
    const endTime = rangeEnd ? new Date(rangeEnd).setHours(0, 0, 0, 0) : null;

    return {
      isSelected:
        (startTime !== null && dateTime === startTime) ||
        (endTime !== null && dateTime === endTime),
      isInRange:
        startTime && endTime
          ? dateTime > startTime && dateTime < endTime
          : false,
    };
  }

  private _calculateMultiState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const times = this.selectedDates().map(d => new Date(d).setHours(0, 0, 0, 0));
    return { isSelected: times.includes(dateTime), isInRange: false };
  }

  private _calculateSingleState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const selected = this.selectedDate();
    const selectedTime = selected ? new Date(selected).setHours(0, 0, 0, 0) : null;
    return { isSelected: selectedTime !== null && dateTime === selectedTime, isInRange: false };
  }

  private _handleRangeSelection(selectedDate: Date): void {
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

  private _handleMultiSelection(selectedDate: Date): void {
    const currentDates = [...this.selectedDates()];
    const dateTime = selectedDate.getTime();
    const existingIndex = currentDates.findIndex(
      d => new Date(d).setHours(0, 0, 0, 0) === dateTime,
    );
    if (existingIndex > -1) {
      currentDates.splice(existingIndex, 1);
    } else {
      currentDates.push(selectedDate);
    }
    currentDates.sort((a, b) => a.getTime() - b.getTime());
    this.selectedDatesChange.emit(currentDates);
  }

  private _handleSingleSelection(selectedDate: Date): void {
    this.selectedDateChange.emit(selectedDate);
  }

  private _isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    return !!(min && date < min) || !!(max && date > max);
  }
}
