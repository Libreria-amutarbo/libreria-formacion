import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type {
  DcxCalendarDayCell,
  DcxCalendarDeleteRequest,
  DcxCalendarDeleteScope,
  DcxCalendarEvent,
  DcxCalendarEventDraft,
  DcxCalendarEventType,
  DcxCalendarMonthSummary,
  DcxCalendarRecurrence,
  DcxCalendarSelectionMode,
  DcxCalendarView,
  DcxCalendarWeekDay,
} from '../../core/interfaces/calendar';

import type { DcxRadioOption } from '../../core/interfaces/radio';

import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';
import '../dcx-web-radio/dcx-web-radio.component';

import { styles } from './dcx-web-calendar.component.styles';
import { template } from './dcx-web-calendar.component.html';

export type CalendarModalMode = 'create' | 'edit' | 'delete' | null;

export interface CalendarFormModel {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  type: DcxCalendarEventType;
  description: string;
  recurrence: DcxCalendarRecurrence;
}

@customElement('dcx-web-calendar')
export class DcxWebCalendar extends LitElement {
  static override styles = styles;

  @property({ type: String })
  accessor view: DcxCalendarView = 'month';

  @property({ attribute: false })
  accessor activeDate: Date = new Date();

  @property({ attribute: false })
  accessor events: DcxCalendarEvent[] = [];

  @property({ type: String })
  accessor selectionMode: DcxCalendarSelectionMode = 'none';

  @property({ attribute: false })
  accessor selectedDate: Date | null = null;

  @property({ attribute: false })
  accessor rangeStart: Date | null = null;

  @property({ attribute: false })
  accessor rangeEnd: Date | null = null;

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor allowCreate = true;

  @property({ type: Boolean })
  accessor allowEdit = true;

  @property({ type: Boolean })
  accessor allowDelete = true;

  @property({ type: Number })
  accessor dayMaxVisibleEvents = 3;

  @property({ type: Number })
  accessor weekStartHour = 8;

  @property({ type: Number })
  accessor weekEndHour = 18;

  @property({ type: Boolean })
  accessor showFooter = true;

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = 'Calendar';

  readonly today = this.startOfDay(new Date());

  @state()
  accessor localActiveDate: Date = this.startOfDay(new Date());

  @state()
  accessor localEvents: DcxCalendarEvent[] = [];

  @state()
  accessor localSelectedDate: Date | null = null;

  @state()
  accessor localRangeStart: Date | null = null;

  @state()
  accessor localRangeEnd: Date | null = null;

  @state()
  accessor selectedEventId: string | null = null;

  @state()
  accessor modalMode: CalendarModalMode = null;

  @state()
  accessor deleteScope: DcxCalendarDeleteScope = 'single';

  @state()
  accessor formError = '';

  accessor eventForm: CalendarFormModel = this.createEmptyForm(this.today);

  private lastFocusedBeforeModal: HTMLElement | null = null;

  readonly weekLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  readonly eventTypeOptions: { value: DcxCalendarEventType; label: string }[] =
    [
      { value: 'meeting', label: 'Reunión' },
      { value: 'delivery', label: 'Entrega' },
      { value: 'reminder', label: 'Recordatorio' },
      { value: 'urgent', label: 'Urgente' },
      { value: 'personal', label: 'Personal' },
    ];

  readonly recurrenceOptions: {
    value: DcxCalendarRecurrence;
    label: string;
  }[] = [
    { value: 'none', label: 'No repetir' },
    { value: 'daily', label: 'Cada día' },
    { value: 'weekly', label: 'Cada semana' },
    { value: 'monthly', label: 'Cada mes' },
  ];

  readonly deleteScopeOptions: DcxRadioOption[] = [
    { value: 'single', label: 'Solo este evento' },
    { value: 'following', label: 'Este y los siguientes' },
    { value: 'all', label: 'Todos los eventos' },
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.localActiveDate = this.startOfDay(this.activeDate);
    this.localEvents = this.cloneEvents(this.events);
    this.localSelectedDate = this.normalizeDate(this.selectedDate);
    this.localRangeStart = this.normalizeDate(this.rangeStart);
    this.localRangeEnd = this.normalizeDate(this.rangeEnd);
    document.addEventListener('keydown', this.handleDocumentKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleDocumentKeydown);
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('activeDate')) {
      this.localActiveDate = this.startOfDay(this.activeDate);
    }

    if (changedProperties.has('events')) {
      this.localEvents = this.cloneEvents(this.events);
    }

    if (changedProperties.has('selectedDate')) {
      this.localSelectedDate = this.normalizeDate(this.selectedDate);
    }

    if (changedProperties.has('rangeStart')) {
      this.localRangeStart = this.normalizeDate(this.rangeStart);
    }

    if (changedProperties.has('rangeEnd')) {
      this.localRangeEnd = this.normalizeDate(this.rangeEnd);
    }
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('modalMode')) {
      if (this.modalMode !== null) {
        this.lastFocusedBeforeModal =
          document.activeElement as HTMLElement | null;
        const dialog = this.shadowRoot?.querySelector<HTMLElement>(
          '.dcx-calendar-dialog',
        );
        dialog?.focus();
      } else if (this.lastFocusedBeforeModal) {
        this.lastFocusedBeforeModal.focus();
        this.lastFocusedBeforeModal = null;
      }
    }
  }

  get isMonthView(): boolean {
    return this.view === 'month';
  }

  get isWeekView(): boolean {
    return this.view === 'week';
  }

  get isYearView(): boolean {
    return this.view === 'year';
  }

  get isMiniView(): boolean {
    return this.view === 'mini';
  }

  get isRangeMode(): boolean {
    return this.selectionMode === 'range';
  }

  get showMonthEvents(): boolean {
    return this.isMonthView && !this.isRangeMode;
  }

  get footerMode(): 'range' | 'default' {
    return this.isRangeMode ? 'range' : 'default';
  }

  get monthLabel(): string {
    return this.capitalize(
      this.localActiveDate.toLocaleDateString('es-ES', {
        month: this.isMiniView ? 'short' : 'long',
        year: 'numeric',
      }),
    );
  }

  get weekLabel(): string {
    const start = this.startOfWeek(this.localActiveDate);
    const end = this.addDays(start, 6);
    return `${start.getDate()} – ${end.getDate()} ${this.capitalize(
      end.toLocaleDateString('es-ES', { month: 'short' }),
    )} ${end.getFullYear()}`;
  }

  get yearLabel(): string {
    return String(this.localActiveDate.getFullYear());
  }

  get weekHours(): number[] {
    const start = Math.min(this.weekStartHour, this.weekEndHour);
    const end = Math.max(this.weekStartHour, this.weekEndHour);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  get monthWeeks(): DcxCalendarDayCell[][] {
    return this.buildMonthGrid(
      this.localActiveDate,
      this.isRangeMode ? this.localRangeStart : null,
      this.isRangeMode ? this.localRangeEnd : null,
      this.isRangeMode
        ? (this.localRangeEnd ?? this.localRangeStart)
        : this.localSelectedDate,
      true,
    );
  }

  get weekDays(): DcxCalendarWeekDay[] {
    const start = this.startOfWeek(this.localActiveDate);
    return Array.from({ length: 7 }, (_, index) => {
      const date = this.addDays(start, index);
      return {
        date,
        label: this.weekLabels[index],
        isToday: this.isSameDate(date, this.today),
        isWeekend: index >= 5,
      };
    });
  }

  get yearMonths(): DcxCalendarMonthSummary[] {
    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(this.localActiveDate.getFullYear(), index, 1);
      return {
        index,
        label: this.capitalize(
          date.toLocaleDateString('es-ES', { month: 'long' }),
        ),
        weeks: this.buildMonthGrid(
          date,
          null,
          null,
          this.localSelectedDate,
          false,
        ),
        isActive: index === this.localActiveDate.getMonth(),
      };
    });
  }

  get selectedEvent(): DcxCalendarEvent | null {
    if (!this.selectedEventId) {
      return null;
    }
    return (
      this.localEvents.find(event => event.id === this.selectedEventId) ?? null
    );
  }

  setDeleteScope(value: string | null): void {
    if (value === 'single' || value === 'following' || value === 'all') {
      this.deleteScope = value;
      this.requestUpdate();
    }
  }

  previous(): void {
    if (this.disabled) {
      return;
    }

    const current = this.localActiveDate;
    let nextDate = current;

    switch (this.view) {
      case 'week':
        nextDate = this.addDays(current, -7);
        break;
      case 'year':
        nextDate = new Date(current.getFullYear() - 1, 0, 1);
        break;
      default:
        nextDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    }

    this.setActiveDate(nextDate);
  }

  next(): void {
    if (this.disabled) {
      return;
    }

    const current = this.localActiveDate;
    let nextDate = current;

    switch (this.view) {
      case 'week':
        nextDate = this.addDays(current, 7);
        break;
      case 'year':
        nextDate = new Date(current.getFullYear() + 1, 0, 1);
        break;
      default:
        nextDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    this.setActiveDate(nextDate);
  }

  goToToday(): void {
    if (this.disabled) {
      return;
    }

    this.setActiveDate(this.today);

    if (!this.isRangeMode) {
      this.localSelectedDate = this.today;
      if (this.selectionMode !== 'none') {
        this.dispatchEvent(
          new CustomEvent('dateSelect', {
            detail: this.today,
            bubbles: true,
            composed: true,
          }),
        );
      }
    }
  }

  selectYearMonth(monthIndex: number): void {
    const nextDate = new Date(
      this.localActiveDate.getFullYear(),
      monthIndex,
      1,
    );
    this.setActiveDate(nextDate);
    this.dispatchEvent(
      new CustomEvent('viewChange', {
        detail: 'month',
        bubbles: true,
        composed: true,
      }),
    );
  }

  selectDay(day: DcxCalendarDayCell): void {
    if (this.disabled) {
      return;
    }

    this.setActiveDate(day.date);

    if (this.isRangeMode) {
      const start = this.localRangeStart;
      const end = this.localRangeEnd;

      if (!start || end) {
        this.localRangeStart = day.date;
        this.localRangeEnd = null;
        this.emitRangeChange(day.date, null);
        return;
      }

      if (day.date.getTime() < start.getTime()) {
        this.localRangeStart = day.date;
        this.emitRangeChange(day.date, null);
        return;
      }

      this.localRangeEnd = day.date;
      this.emitRangeChange(start, day.date);
      return;
    }

    if (this.selectionMode !== 'none') {
      this.localSelectedDate = day.date;
      this.dispatchEvent(
        new CustomEvent('dateSelect', {
          detail: day.date,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  applyRange(): void {
    this.emitRangeChange(this.localRangeStart, this.localRangeEnd);
  }

  clearRange(): void {
    this.localRangeStart = null;
    this.localRangeEnd = null;
    this.emitRangeChange(null, null);
  }

  private emitRangeChange(start: Date | null, end: Date | null) {
    this.dispatchEvent(
      new CustomEvent('rangeChange', {
        detail: { start, end },
        bubbles: true,
        composed: true,
      }),
    );
  }

  openEvent(event: DcxCalendarEvent): void {
    this.selectedEventId = event.id;
    this.dispatchEvent(
      new CustomEvent('eventSelect', {
        detail: event,
        bubbles: true,
        composed: true,
      }),
    );
  }

  openDayOverflow(day: DcxCalendarDayCell): void {
    const hidden = day.events[this.dayMaxVisibleEvents];
    if (hidden) {
      this.openEvent(hidden);
    }
  }

  openCreateModal(date?: Date): void {
    if (this.disabled || !this.allowCreate) {
      return;
    }

    this.formError = '';
    this.eventForm = this.createEmptyForm(
      date ?? this.localSelectedDate ?? this.localActiveDate,
    );
    this.modalMode = 'create';
  }

  openEditModal(event: DcxCalendarEvent): void {
    if (this.disabled || !this.allowEdit) {
      return;
    }

    this.formError = '';
    this.selectedEventId = event.id;
    this.eventForm = this.createFormFromEvent(event);
    this.modalMode = 'edit';
  }

  openDeleteModal(): void {
    if (this.disabled || !this.allowDelete || !this.selectedEvent) {
      return;
    }

    this.deleteScope = 'single';
    this.modalMode = 'delete';
  }

  closeOverlay(): void {
    this.modalMode = null;
    this.formError = '';
  }

  closeSelectedEvent(): void {
    this.selectedEventId = null;
  }

  saveEvent(): void {
    if (!this.eventForm.title.trim()) {
      this.formError = 'El título es obligatorio.';
      return;
    }

    const currentId = this.selectedEventId ?? undefined;
    const nextEvent = this.formToEvent(this.eventForm, currentId);

    if (this.modalMode === 'edit' && currentId) {
      this.localEvents = this.localEvents.map(item =>
        item.id === currentId ? nextEvent : item,
      );
      this.emitEventUpdate(nextEvent);
    } else {
      this.localEvents = [...this.localEvents, nextEvent];
      this.emitEventCreate(this.toEventDraft(nextEvent));
    }

    this.selectedEventId = nextEvent.id;
    this.localSelectedDate = this.startOfDay(nextEvent.start);
    this.setActiveDate(nextEvent.start);
    this.closeOverlay();
  }

  confirmDelete(): void {
    const activeEvent = this.selectedEvent;
    if (!activeEvent) {
      this.closeOverlay();
      return;
    }

    const scope = this.deleteScope;

    this.emitEventDelete({
      eventId: activeEvent.id,
      scope,
    });

    this.localEvents = this.localEvents.filter(item => {
      if (!activeEvent.seriesId || scope === 'single') {
        return item.id !== activeEvent.id;
      }

      if (scope === 'all') {
        return item.seriesId !== activeEvent.seriesId;
      }

      if (item.seriesId !== activeEvent.seriesId) {
        return true;
      }

      return item.start.getTime() < activeEvent.start.getTime();
    });

    this.selectedEventId = null;
    this.closeOverlay();
  }

  handleEscape(): void {
    if (this.modalMode) {
      this.closeOverlay();
      return;
    }

    if (this.selectedEvent) {
      this.closeSelectedEvent();
    }
  }

  private handleDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.handleEscape();
    }
  };

  private emitEventCreate(draft: DcxCalendarEventDraft) {
    this.dispatchEvent(
      new CustomEvent('eventCreate', {
        detail: draft,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private emitEventUpdate(event: DcxCalendarEvent) {
    this.dispatchEvent(
      new CustomEvent('eventUpdate', {
        detail: event,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private emitEventDelete(request: DcxCalendarDeleteRequest) {
    this.dispatchEvent(
      new CustomEvent('eventDelete', {
        detail: request,
        bubbles: true,
        composed: true,
      }),
    );
  }

  getVisibleEvents(day: DcxCalendarDayCell): DcxCalendarEvent[] {
    return day.events.slice(0, this.dayMaxVisibleEvents);
  }

  getOverflowCount(day: DcxCalendarDayCell): number {
    return Math.max(day.events.length - this.dayMaxVisibleEvents, 0);
  }

  getWeekSlotEvents(date: Date, hour: number): DcxCalendarEvent[] {
    return this.localEvents.filter(event => {
      const sameDay = this.isSameDate(event.start, date);
      return sameDay && !event.allDay && event.start.getHours() === hour;
    });
  }

  getEventClass(type: DcxCalendarEventType): string {
    switch (type) {
      case 'delivery':
        return 'green';
      case 'reminder':
        return 'orange';
      case 'urgent':
        return 'red';
      case 'personal':
        return 'purple';
      default:
        return 'blue';
    }
  }

  formatDayLabel(value: Date): string {
    return value.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }

  formatTimeRange(event: DcxCalendarEvent): string {
    if (event.allDay || !event.end) {
      return 'Todo el día';
    }

    return `${this.formatTime(event.start)} – ${this.formatTime(event.end)}`;
  }

  formatRecurrenceLabel(value: DcxCalendarRecurrence | undefined): string {
    switch (value) {
      case 'daily':
        return 'Repite cada día';
      case 'weekly':
        return 'Repite cada semana';
      case 'monthly':
        return 'Repite cada mes';
      default:
        return 'Sin recurrencia';
    }
  }

  private setActiveDate(value: Date): void {
    const nextDate = this.startOfDay(value);
    this.localActiveDate = nextDate;
    this.dispatchEvent(
      new CustomEvent('activeDateChange', {
        detail: nextDate,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private buildMonthGrid(
    baseDate: Date,
    rangeStart: Date | null,
    rangeEnd: Date | null,
    selectedDate: Date | null,
    includeEvents = true,
  ): DcxCalendarDayCell[][] {
    const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const start = this.startOfWeek(firstDay);

    const days = Array.from({ length: 42 }, (_, index) => {
      const current = this.addDays(start, index);
      const normalizedCurrent = this.startOfDay(current);
      const normalizedStart = rangeStart ? this.startOfDay(rangeStart) : null;
      const normalizedEnd = rangeEnd ? this.startOfDay(rangeEnd) : null;

      const isRangeStart =
        !!normalizedStart &&
        this.isSameDate(normalizedCurrent, normalizedStart);
      const isRangeEnd =
        !!normalizedEnd && this.isSameDate(normalizedCurrent, normalizedEnd);
      const isInRange =
        !!normalizedStart &&
        !!normalizedEnd &&
        normalizedCurrent.getTime() > normalizedStart.getTime() &&
        normalizedCurrent.getTime() < normalizedEnd.getTime();

      return {
        date: normalizedCurrent,
        isCurrentMonth: normalizedCurrent.getMonth() === baseDate.getMonth(),
        isToday: this.isSameDate(normalizedCurrent, this.today),
        isWeekend: [0, 6].includes(normalizedCurrent.getDay()),
        isSelected:
          !!selectedDate && this.isSameDate(normalizedCurrent, selectedDate),
        isRangeStart,
        isRangeEnd,
        isInRange,
        events: includeEvents ? this.getEventsForDate(normalizedCurrent) : [],
      };
    });

    return Array.from({ length: 6 }, (_, index) =>
      days.slice(index * 7, index * 7 + 7),
    );
  }

  private getEventsForDate(date: Date): DcxCalendarEvent[] {
    return this.localEvents
      .filter(event => this.isSameDate(event.start, date))
      .sort((left, right) => left.start.getTime() - right.start.getTime());
  }

  private createEmptyForm(date: Date): CalendarFormModel {
    return {
      title: '',
      date: this.toDateInputValue(date),
      startTime: '10:00',
      endTime: '11:00',
      allDay: false,
      type: 'meeting',
      description: '',
      recurrence: 'none',
    };
  }

  private createFormFromEvent(event: DcxCalendarEvent): CalendarFormModel {
    return {
      title: event.title,
      date: this.toDateInputValue(event.start),
      startTime: event.allDay ? '09:00' : this.toTimeInputValue(event.start),
      endTime: event.end ? this.toTimeInputValue(event.end) : '10:00',
      allDay: event.allDay,
      type: event.type,
      description: event.description ?? '',
      recurrence: event.recurrence ?? 'none',
    };
  }

  private formToEvent(
    form: CalendarFormModel,
    eventId?: string,
  ): DcxCalendarEvent {
    const [year, month, day] = form.date.split('-').map(Number);
    const start = new Date(year, month - 1, day);

    if (!form.allDay) {
      const [startHour, startMinute] = form.startTime.split(':').map(Number);
      start.setHours(startHour, startMinute, 0, 0);
    }

    let end: Date | null = null;

    if (!form.allDay) {
      const [endHour, endMinute] = form.endTime.split(':').map(Number);
      end = new Date(year, month - 1, day, endHour, endMinute, 0, 0);
    }

    const existing = eventId
      ? this.localEvents.find(item => item.id === eventId)
      : undefined;

    return {
      id: eventId ?? `event-${Date.now()}`,
      title: form.title.trim(),
      start,
      end,
      allDay: form.allDay,
      type: form.type,
      description: form.description.trim(),
      recurrence: form.recurrence,
      seriesId: existing?.seriesId,
    };
  }

  private toEventDraft(event: DcxCalendarEvent): DcxCalendarEventDraft {
    return {
      title: event.title,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : null,
      allDay: event.allDay,
      type: event.type,
      description: event.description,
      recurrence: event.recurrence ?? 'none',
    };
  }

  private cloneEvents(events: DcxCalendarEvent[]): DcxCalendarEvent[] {
    return events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : null,
    }));
  }

  private normalizeDate(value: Date | null): Date | null {
    return value ? this.startOfDay(value) : null;
  }

  private startOfWeek(value: Date): Date {
    const date = this.startOfDay(value);
    const offset = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return this.addDays(date, -offset);
  }

  private addDays(value: Date, amount: number): Date {
    const next = new Date(value);
    next.setDate(next.getDate() + amount);
    return this.startOfDay(next);
  }

  private startOfDay(value: Date): Date {
    const next = new Date(value);
    next.setHours(0, 0, 0, 0);
    return next;
  }

  private isSameDate(left: Date, right: Date): boolean {
    return (
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate()
    );
  }

  private toDateInputValue(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toTimeInputValue(value: Date): string {
    const hours = String(value.getHours()).padStart(2, '0');
    const minutes = String(value.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private formatTime(value: Date): string {
    return value.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-calendar': DcxWebCalendar;
  }
}
