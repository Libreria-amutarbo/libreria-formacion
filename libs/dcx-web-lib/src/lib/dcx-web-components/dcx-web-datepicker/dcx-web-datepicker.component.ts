import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-datepicker.component.styles';
import { template } from './dcx-web-datepicker.component.html';
import {
  DCX_DATEPICKER_LABELS,
  DCX_DATEPICKER_MONTHS,
  DCX_DATEPICKER_WEEKDAYS_MONDAY,
  DCX_DATEPICKER_WEEKDAYS_SUNDAY,
} from '../../core/interfaces';
import type {
  CalendarDay,
  DateFormat,
  DateFormatPattern,
  DatePickerMode,
  FirstDayOfWeek,
} from '../../core/interfaces';


@customElement('dcx-web-datepicker')
export class DcxWebDatePicker extends LitElement {
  static override styles = styles;

  @property({ type: Object }) accessor selectedDate: Date | null = null;
  @property({ type: Array }) accessor selectedDates: Date[] = [];
  @property({ type: Boolean }) accessor multiSelect = false;
  @property({ type: Boolean }) accessor rangeSelect = false;
  @property({ type: Object }) accessor startDate: Date | null = null;
  @property({ type: Object }) accessor endDate: Date | null = null;
  @property({ type: Object }) accessor minDate: Date | null = null;
  @property({ type: Object }) accessor maxDate: Date | null = null;
  @property({ type: Boolean }) accessor disabled = false;
  @property({ type: String }) accessor placeholder = 'Select date';
  @property({ type: String }) accessor dateFormat: DateFormat = 'dd/MM/yyyy';
  @property({ type: String }) accessor firstDayOfWeek: FirstDayOfWeek = 'monday';

  @state() private accessor _currentMonth: Date | null = null;
  @state() private accessor _isOpen = false;
  @state() private accessor _mode: DatePickerMode = 'calendar';
  @state() private accessor _yearPageStart: number | null = null;
  @state() private accessor _focusedDate: Date | null = null;

  get isOpen(): boolean {
    return this._isOpen;
  }

  get isMonthMode(): boolean {
    return this._mode === 'month';
  }

  get isYearMode(): boolean {
    return this._mode === 'year';
  }

  get isCalendarMode(): boolean {
    return this._mode === 'calendar';
  }

  get currentMonth(): Date {
    const manualMonth = this._currentMonth;
    if (manualMonth) return manualMonth;
    const selected = this.selectedDate;
    return selected ? new Date(selected) : new Date();
  }

  get monthName(): string {
    return this.currentMonth.toLocaleDateString('es-ES', { month: 'long' });
  }

  get yearNumber(): number {
    return this.currentMonth.getFullYear();
  }

  get yearsList(): number[] {
    const currentYear = this.currentMonth.getFullYear();
    const start = this._yearPageStart ?? currentYear - (currentYear % 12);
    return Array.from({ length: 12 }, (_, i) => start + i);
  }

  get formattedSelectedDate(): string {
    if (this.rangeSelect) return this._formatRangeDate();
    if (this.multiSelect) return this._formatMultipleDate();
    return this._formatSingleDate();
  }

  get showClearButton(): boolean {
    if (this.disabled) return false;
    if (this.rangeSelect) return !!(this.startDate || this.endDate);
    if (this.multiSelect) return this.selectedDates.length > 0;
    return !!this.selectedDate;
  }

  get weekDays(): string[] {
    return this.firstDayOfWeek === 'sunday'
      ? DCX_DATEPICKER_WEEKDAYS_SUNDAY
      : DCX_DATEPICKER_WEEKDAYS_MONDAY;
  }

  get calendarDays(): CalendarDay[] {
    const currentMonth = this.currentMonth;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    const isSunday = this.firstDayOfWeek === 'sunday';
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
  }

  get calendarWeeks(): CalendarDay[][] {
    const days = this.calendarDays;
    return Array.from({ length: 6 }, (_, i) => days.slice(i * 7, i * 7 + 7));
  }

  get gridAriaLabel(): string {
    return `${this.monthName} ${this.yearNumber}`;
  }

  readonly labels = DCX_DATEPICKER_LABELS;
  readonly monthsList = DCX_DATEPICKER_MONTHS;

  get monthsIndexes(): number[] {
    return Array.from({ length: this.monthsList.length }, (_, i) => i);
  }

  private readonly dateFormatPatterns: DateFormatPattern = {
    'dd/MM/yyyy': (day, month, year) => `${day}/${month}/${year}`,
    'MM/dd/yyyy': (day, month, year) => `${month}/${day}/${year}`,
  };

  private readonly _docClickHandler = (event: MouseEvent) => this._onDocumentClick(event);

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousedown', this._docClickHandler);
  }

  override disconnectedCallback() {
    document.removeEventListener('mousedown', this._docClickHandler);
    super.disconnectedCallback();
  }

  protected override updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('_focusedDate') || changedProperties.has('_isOpen')) {
      if (this._focusedDate && this._isOpen) {
        requestAnimationFrame(() => this._focusDayCell());
      }
    }
  }

  private _onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.closeCalendar();
    }
  }

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

  isFocusedDay(day: CalendarDay): boolean {
    const focused = this._focusedDate;
    if (!focused) {
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

  toggleCalendar(): void {
    if (this.disabled) return;
    this._isOpen = !this._isOpen;
    if (!this._isOpen) {
      this._currentMonth = null;
      this._mode = 'calendar';
      this._focusedDate = null;
    }
  }

  closeCalendar(): void {
    this._isOpen = false;
    this._currentMonth = null;
    this._mode = 'calendar';
    this._focusedDate = null;
    const trigger = this.renderRoot.querySelector(
      '.dcx-datepicker__input-wrapper'
    ) as HTMLElement | null;
    trigger?.focus();
  }

  previousYear(): void {
    const current = this.currentMonth;
    const newDate = new Date(current);
    newDate.setFullYear(newDate.getFullYear() - 1);
    this._currentMonth = newDate;
  }

  nextYear(): void {
    const current = this.currentMonth;
    const newDate = new Date(current);
    newDate.setFullYear(newDate.getFullYear() + 1);
    this._currentMonth = newDate;
  }

  previousMonth(): void {
    if (this.isMonthMode) return;
    if (this.isYearMode) {
      this._yearPageStart = (this._yearPageStart ?? this.currentMonth.getFullYear()) - 12;
      return;
    }
    const current = this.currentMonth;
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() - 1);
    this._currentMonth = newDate;
  }

  nextMonth(): void {
    if (this.isMonthMode) return;
    if (this.isYearMode) {
      this._yearPageStart = (this._yearPageStart ?? this.currentMonth.getFullYear()) + 12;
      return;
    }
    const current = this.currentMonth;
    const newDate = new Date(current);
    newDate.setMonth(newDate.getMonth() + 1);
    this._currentMonth = newDate;
  }

  openMonthSelector(): void {
    this._mode = 'month';
  }

  openYearSelector(): void {
    this._mode = 'year';
    const year = this.currentMonth.getFullYear();
    this._yearPageStart = year - (year % 12);
  }

  selectMonth(index: number): void {
    const current = this.currentMonth;
    const newDate = new Date(current);
    newDate.setMonth(index);
    this._currentMonth = newDate;
    this._mode = 'calendar';
  }

  selectYear(year: number): void {
    const current = this.currentMonth;
    const newDate = new Date(current);
    newDate.setFullYear(year);
    this._currentMonth = newDate;
    this._mode = 'calendar';
  }

  applyDate(): void {
    if (this.rangeSelect) {
      this._emitEvent('startDateChange', this.startDate);
      this._emitEvent('endDateChange', this.endDate);
    } else if (this.multiSelect) {
      this._emitEvent('selectedDatesChange', this.selectedDates);
    } else {
      this._emitEvent('selectedDateChange', this.selectedDate);
    }
    this.closeCalendar();
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled || this.disabled) return;
    this._focusedDate = day.date;

    if (this.rangeSelect) {
      this._handleRangeSelection(day.date);
    } else if (this.multiSelect) {
      this._handleMultiSelection(day.date);
    } else {
      this._handleSingleSelection(day.date);
    }
  }

  clearDate(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.disabled) return;
    if (this.rangeSelect) {
      this.startDate = null;
      this.endDate = null;
      this._emitEvent('startDateChange', null);
      this._emitEvent('endDateChange', null);
    } else if (this.multiSelect) {
      this.selectedDates = [];
      this._emitEvent('selectedDatesChange', []);
    } else {
      this.selectedDate = null;
      this._emitEvent('selectedDateChange', null);
    }
  }

  goToToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this._currentMonth = new Date(today);

    if (this._isDateDisabled(today)) return;

    if (this.rangeSelect) {
      this.startDate = today;
      this.endDate = null;
      this._emitEvent('startDateChange', today);
      this._emitEvent('endDateChange', null);
    } else if (this.multiSelect) {
      const currentDates = [...this.selectedDates];
      const todayTime = today.getTime();
      const existingIndex = currentDates.findIndex(
        (d) => new Date(d).setHours(0, 0, 0, 0) === todayTime
      );
      if (existingIndex === -1) {
        currentDates.push(today);
        currentDates.sort((a, b) => a.getTime() - b.getTime());
        this.selectedDates = currentDates;
        this._emitEvent('selectedDatesChange', currentDates);
      }
    } else {
      this.selectedDate = today;
      this._emitEvent('selectedDateChange', today);
    }
  }
  private _moveFocus(dayDelta: number): void {
    const current = this._focusedDate ?? this._defaultFocusDate();
    const newDate = new Date(current);
    newDate.setDate(newDate.getDate() + dayDelta);

    if (
      newDate.getMonth() !== this.currentMonth.getMonth() ||
      newDate.getFullYear() !== this.currentMonth.getFullYear()
    ) {
      const nav = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      this._currentMonth = nav;
    }

    this._focusedDate = newDate;
  }

  private _moveFocusToStartOfWeek(day: CalendarDay): void {
    const days = this.calendarDays;
    const idx = days.findIndex((d) => d.date.getTime() === day.date.getTime());
    const startOfWeek = days[idx - (idx % 7)];
    if (startOfWeek) this._focusedDate = startOfWeek.date;
  }

  private _moveFocusToEndOfWeek(day: CalendarDay): void {
    const days = this.calendarDays;
    const idx = days.findIndex((d) => d.date.getTime() === day.date.getTime());
    const endOfWeek = days[idx + (6 - (idx % 7))];
    if (endOfWeek) this._focusedDate = endOfWeek.date;
  }

  private _defaultFocusDate(): Date {
    const days = this.calendarDays;
    const selected = days.find((d) => d.isSelected);
    if (selected) return selected.date;
    const today = days.find((d) => d.isToday);
    if (today) return today.date;
    const firstOfMonth = days.find((d) => d.isCurrentMonth);
    return firstOfMonth?.date ?? new Date();
  }

  private _focusDayCell(): void {
    const focused = this._focusedDate;
    if (!focused || !this.isOpen) return;
    const days = this.calendarDays;
    const idx = days.findIndex(
      (d) =>
        d.date.getDate() === focused.getDate() &&
        d.date.getMonth() === focused.getMonth() &&
        d.date.getFullYear() === focused.getFullYear()
    );
    if (idx === -1) return;
    const buttons = Array.from(
      this.renderRoot.querySelectorAll('.dcx-datepicker__day')
    ) as HTMLButtonElement[];
    buttons[idx]?.focus();
  }

  private _formatDate(date: Date): string {
    const format = this.dateFormat;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return this.dateFormatPatterns[format](day, month, year);
  }

  private _formatRangeDate(): string {
    const start = this.startDate;
    const end = this.endDate;
    if (!start && !end) return this.placeholder;
    if (start && end) return `${this._formatDate(start)} - ${this._formatDate(end)}`;
    if (start) return this._formatDate(start);
    return this.placeholder;
  }

  private _formatMultipleDate(): string {
    const dates = this.selectedDates;
    if (!dates || dates.length === 0) return this.placeholder;
    if (dates.length > 2) return `${dates.length} fechas seleccionadas`;
    return dates.map((d) => this._formatDate(d)).join(' - ');
  }

  private _formatSingleDate(): string {
    const date = this.selectedDate;
    return date ? this._formatDate(date) : this.placeholder;
  }

  private _calculateDateSelectionState(dateTime: number): {
    isSelected: boolean;
    isInRange: boolean;
  } {
    if (this.rangeSelect) return this._calculateRangeState(dateTime);
    if (this.multiSelect) return this._calculateMultiState(dateTime);
    return this._calculateSingleState(dateTime);
  }

  private _calculateRangeState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const rangeStart = this.startDate;
    const rangeEnd = this.endDate;
    const startTime = rangeStart ? new Date(rangeStart).setHours(0, 0, 0, 0) : null;
    const endTime = rangeEnd ? new Date(rangeEnd).setHours(0, 0, 0, 0) : null;

    return {
      isSelected:
        (startTime !== null && dateTime === startTime) ||
        (endTime !== null && dateTime === endTime),
      isInRange: startTime && endTime ? dateTime > startTime && dateTime < endTime : false,
    };
  }

  private _calculateMultiState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const times = this.selectedDates.map((d) => new Date(d).setHours(0, 0, 0, 0));
    return { isSelected: times.includes(dateTime), isInRange: false };
  }

  private _calculateSingleState(dateTime: number): { isSelected: boolean; isInRange: boolean } {
    const selected = this.selectedDate;
    const selectedTime = selected ? new Date(selected).setHours(0, 0, 0, 0) : null;
    return { isSelected: selectedTime !== null && dateTime === selectedTime, isInRange: false };
  }

  private _handleRangeSelection(selectedDate: Date): void {
    const start = this.startDate;
    const end = this.endDate;
    if (!start || (start && end)) {
      this.startDate = selectedDate;
      this.endDate = null;
      this._emitEvent('startDateChange', selectedDate);
      this._emitEvent('endDateChange', null);
      return;
    }
    if (selectedDate < start) {
      this.startDate = selectedDate;
      this.endDate = start;
      this._emitEvent('startDateChange', selectedDate);
      this._emitEvent('endDateChange', start);
    } else {
      this.endDate = selectedDate;
      this._emitEvent('endDateChange', selectedDate);
    }
  }

  private _handleMultiSelection(selectedDate: Date): void {
    const currentDates = [...this.selectedDates];
    const dateTime = selectedDate.getTime();
    const existingIndex = currentDates.findIndex(
      (d) => new Date(d).setHours(0, 0, 0, 0) === dateTime
    );
    if (existingIndex > -1) {
      currentDates.splice(existingIndex, 1);
    } else {
      currentDates.push(selectedDate);
    }
    currentDates.sort((a, b) => a.getTime() - b.getTime());
    this.selectedDates = currentDates;
    this._emitEvent('selectedDatesChange', currentDates);
  }

  private _handleSingleSelection(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this._emitEvent('selectedDateChange', selectedDate);
  }

  private _isDateDisabled(date: Date): boolean {
    const min = this.minDate;
    const max = this.maxDate;
    return !!(min && date < min) || !!(max && date > max);
  }

  private _emitEvent(name: string, detail: unknown): void {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-datepicker': DcxWebDatePicker;
  }
}
