import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
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
} from '../../core/interfaces';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgRadioComponent } from '../dcx-ng-radio/dcx-ng-radio.component';

type CalendarModalMode = 'create' | 'edit' | 'delete' | null;

interface CalendarFormModel {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  type: DcxCalendarEventType;
  description: string;
  recurrence: DcxCalendarRecurrence;
}

@Component({
  selector: 'dcx-ng-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DcxNgButtonComponent,
    DcxNgIconComponent,
    DcxNgRadioComponent,
  ],
  templateUrl: './dcx-ng-calendar.component.html',
  styleUrl: './dcx-ng-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dcx-calendar-host',
    '(document:keydown.escape)': 'handleEscape()',
  },
})
export class DcxNgCalendarComponent {
  readonly view = input<DcxCalendarView>('month');
  readonly activeDate = input<Date>(new Date());
  readonly events = input<DcxCalendarEvent[]>([]);
  readonly selectionMode = input<DcxCalendarSelectionMode>('none');
  readonly selectedDate = input<Date | null>(null);
  readonly rangeStart = input<Date | null>(null);
  readonly rangeEnd = input<Date | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly allowCreate = input(true, { transform: booleanAttribute });
  readonly allowEdit = input(true, { transform: booleanAttribute });
  readonly allowDelete = input(true, { transform: booleanAttribute });
  readonly dayMaxVisibleEvents = input(3);
  readonly weekStartHour = input(8);
  readonly weekEndHour = input(18);
  readonly showFooter = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input('Calendar');

  readonly viewChange = output<DcxCalendarView>();
  readonly activeDateChange = output<Date>();
  readonly dateSelect = output<Date>();
  readonly rangeChange = output<{ start: Date | null; end: Date | null }>();
  readonly eventSelect = output<DcxCalendarEvent>();
  readonly eventCreate = output<DcxCalendarEventDraft>();
  readonly eventUpdate = output<DcxCalendarEvent>();
  readonly eventDelete = output<DcxCalendarDeleteRequest>();

  private readonly today = this.startOfDay(new Date());

  readonly localActiveDate = signal(this.startOfDay(this.activeDate()));
  readonly localEvents = signal<DcxCalendarEvent[]>(this.cloneEvents(this.events()));
  readonly localSelectedDate = signal<Date | null>(this.normalizeDate(this.selectedDate()));
  readonly localRangeStart = signal<Date | null>(this.normalizeDate(this.rangeStart()));
  readonly localRangeEnd = signal<Date | null>(this.normalizeDate(this.rangeEnd()));
  private readonly selectedEventId = signal<string | null>(null);
  readonly modalMode = signal<CalendarModalMode>(null);
  readonly deleteScope = signal<DcxCalendarDeleteScope>('single');
  readonly formError = signal('');

  eventForm: CalendarFormModel = this.createEmptyForm(this.today);

  readonly weekLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
  readonly eventTypeOptions: { value: DcxCalendarEventType; label: string }[] = [
    { value: 'meeting', label: 'Reunión' },
    { value: 'delivery', label: 'Entrega' },
    { value: 'reminder', label: 'Recordatorio' },
    { value: 'urgent', label: 'Urgente' },
    { value: 'personal', label: 'Personal' },
  ];
  readonly recurrenceOptions: { value: DcxCalendarRecurrence; label: string }[] = [
    { value: 'none', label: 'No repetir' },
    { value: 'daily', label: 'Cada día' },
    { value: 'weekly', label: 'Cada semana' },
    { value: 'monthly', label: 'Cada mes' },
  ];

  readonly isMonthView = computed(() => this.view() === 'month');
  readonly isWeekView = computed(() => this.view() === 'week');
  readonly isYearView = computed(() => this.view() === 'year');
  readonly isMiniView = computed(() => this.view() === 'mini');
  readonly isRangeMode = computed(() => this.selectionMode() === 'range');

  readonly monthLabel = computed(() =>
    this.capitalize(
      this.localActiveDate().toLocaleDateString('es-ES', {
        month: this.isMiniView() ? 'short' : 'long',
        year: 'numeric',
      }),
    ),
  );

  readonly weekLabel = computed(() => {
    const start = this.startOfWeek(this.localActiveDate());
    const end = this.addDays(start, 6);
    return `${start.getDate()} – ${end.getDate()} ${this.capitalize(
      end.toLocaleDateString('es-ES', { month: 'short' }),
    )} ${end.getFullYear()}`;
  });

  readonly yearLabel = computed(() => String(this.localActiveDate().getFullYear()));

  readonly weekHours = computed(() => {
    const start = Math.min(this.weekStartHour(), this.weekEndHour());
    const end = Math.max(this.weekStartHour(), this.weekEndHour());
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  });

  readonly monthWeeks = computed(() =>
    this.buildMonthGrid(
      this.localActiveDate(),
      this.isRangeMode() ? this.localRangeStart() : null,
      this.isRangeMode() ? this.localRangeEnd() : null,
      this.isRangeMode() ? this.localRangeEnd() ?? this.localRangeStart() : this.localSelectedDate(),
      true,
    ),
  );

  readonly weekDays = computed<DcxCalendarWeekDay[]>(() => {
    const start = this.startOfWeek(this.localActiveDate());
    return Array.from({ length: 7 }, (_, index) => {
      const date = this.addDays(start, index);
      return {
        date,
        label: this.weekLabels[index],
        isToday: this.isSameDate(date, this.today),
        isWeekend: index >= 5,
      };
    });
  });

  readonly yearMonths = computed<DcxCalendarMonthSummary[]>(() =>
    Array.from({ length: 12 }, (_, index) => {
      const date = new Date(this.localActiveDate().getFullYear(), index, 1);
      return {
        index,
        label: this.capitalize(date.toLocaleDateString('es-ES', { month: 'long' })),
        weeks: this.buildMonthGrid(date, null, null, this.localSelectedDate(), false),
        isActive: index === this.localActiveDate().getMonth(),
      };
    }),
  );

  readonly selectedEvent = computed(() => {
    const eventId = this.selectedEventId();
    if (!eventId) {
      return null;
    }

    return this.localEvents().find(event => event.id === eventId) ?? null;
  });

  readonly footerMode = computed<'range' | 'default'>(() =>
    this.isRangeMode() ? 'range' : 'default',
  );

  setDeleteScope(value: string | null): void {
    if (value === 'single' || value === 'following' || value === 'all') {
      this.deleteScope.set(value);
    }
  }

  constructor() {
    effect(() => {
      this.localActiveDate.set(this.startOfDay(this.activeDate()));
    });

    effect(() => {
      this.localEvents.set(this.cloneEvents(this.events()));
    });

    effect(() => {
      this.localSelectedDate.set(this.normalizeDate(this.selectedDate()));
    });

    effect(() => {
      this.localRangeStart.set(this.normalizeDate(this.rangeStart()));
      this.localRangeEnd.set(this.normalizeDate(this.rangeEnd()));
    });
  }

  previous(): void {
    if (this.disabled()) {
      return;
    }

    const current = this.localActiveDate();
    let nextDate = current;

    switch (this.view()) {
      case 'week':
        nextDate = this.addDays(current, -7);
        break;
      case 'year':
        nextDate = new Date(current.getFullYear() - 1, 0, 1);
        break;
      default:
        nextDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
        break;
    }

    this.setActiveDate(nextDate);
  }

  next(): void {
    if (this.disabled()) {
      return;
    }

    const current = this.localActiveDate();
    let nextDate = current;

    switch (this.view()) {
      case 'week':
        nextDate = this.addDays(current, 7);
        break;
      case 'year':
        nextDate = new Date(current.getFullYear() + 1, 0, 1);
        break;
      default:
        nextDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
        break;
    }

    this.setActiveDate(nextDate);
  }

  goToToday(): void {
    if (this.disabled()) {
      return;
    }

    this.setActiveDate(this.today);

    if (!this.isRangeMode()) {
      this.localSelectedDate.set(this.today);
    }
  }

  selectDay(day: DcxCalendarDayCell): void {
    if (this.disabled()) {
      return;
    }

    this.setActiveDate(day.date);

    if (this.isRangeMode()) {
      const start = this.localRangeStart();
      const end = this.localRangeEnd();

      if (!start || end) {
        this.localRangeStart.set(day.date);
        this.localRangeEnd.set(null);
        this.rangeChange.emit({ start: day.date, end: null });
        return;
      }

      if (day.date.getTime() < start.getTime()) {
        this.localRangeStart.set(day.date);
        this.rangeChange.emit({ start: day.date, end: null });
        return;
      }

      this.localRangeEnd.set(day.date);
      this.rangeChange.emit({ start, end: day.date });
      return;
    }

    if (this.selectionMode() !== 'none') {
      this.localSelectedDate.set(day.date);
      this.dateSelect.emit(day.date);
    }
  }

  applyRange(): void {
    this.rangeChange.emit({
      start: this.localRangeStart(),
      end: this.localRangeEnd(),
    });
  }

  clearRange(): void {
    this.localRangeStart.set(null);
    this.localRangeEnd.set(null);
    this.rangeChange.emit({ start: null, end: null });
  }

  selectYearMonth(monthIndex: number): void {
    const nextDate = new Date(this.localActiveDate().getFullYear(), monthIndex, 1);
    this.setActiveDate(nextDate);
    this.viewChange.emit('month');
  }

  openEvent(event: DcxCalendarEvent): void {
    this.selectedEventId.set(event.id);
    this.eventSelect.emit(event);
  }

  openDayOverflow(day: DcxCalendarDayCell): void {
    const firstHidden = day.events[this.dayMaxVisibleEvents()];
    if (firstHidden) {
      this.openEvent(firstHidden);
    }
  }

  openCreateModal(date?: Date): void {
    if (this.disabled() || !this.allowCreate()) {
      return;
    }

    this.formError.set('');
    this.eventForm = this.createEmptyForm(date ?? this.localSelectedDate() ?? this.localActiveDate());
    this.modalMode.set('create');
  }

  openEditModal(event: DcxCalendarEvent): void {
    if (this.disabled() || !this.allowEdit()) {
      return;
    }

    this.formError.set('');
    this.selectedEventId.set(event.id);
    this.eventForm = this.createFormFromEvent(event);
    this.modalMode.set('edit');
  }

  openDeleteModal(): void {
    if (this.disabled() || !this.allowDelete() || !this.selectedEvent()) {
      return;
    }

    this.deleteScope.set('single');
    this.modalMode.set('delete');
  }

  closeOverlay(): void {
    this.modalMode.set(null);
    this.formError.set('');
  }

  closeSelectedEvent(): void {
    this.selectedEventId.set(null);
  }

  saveEvent(): void {
    if (!this.eventForm.title.trim()) {
      this.formError.set('El título es obligatorio.');
      return;
    }

    const currentId = this.selectedEventId() ?? undefined;
    const nextEvent = this.formToEvent(this.eventForm, currentId);

    if (this.modalMode() === 'edit' && currentId) {
      this.localEvents.update(items => items.map(item => (item.id === currentId ? nextEvent : item)));
      this.eventUpdate.emit(nextEvent);
    } else {
      this.localEvents.update(items => [...items, nextEvent]);
      this.eventCreate.emit(this.toEventDraft(nextEvent));
    }

    this.selectedEventId.set(nextEvent.id);
    this.localSelectedDate.set(this.startOfDay(nextEvent.start));
    this.setActiveDate(nextEvent.start);
    this.closeOverlay();
  }

  confirmDelete(): void {
    const activeEvent = this.selectedEvent();
    if (!activeEvent) {
      this.closeOverlay();
      return;
    }

    const scope = this.deleteScope();

    this.eventDelete.emit({
      eventId: activeEvent.id,
      scope,
    });

    this.localEvents.update(items => {
      if (!activeEvent.seriesId || scope === 'single') {
        return items.filter(item => item.id !== activeEvent.id);
      }

      if (scope === 'all') {
        return items.filter(item => item.seriesId !== activeEvent.seriesId);
      }

      return items.filter(item => {
        if (item.seriesId !== activeEvent.seriesId) {
          return true;
        }

        return item.start.getTime() < activeEvent.start.getTime();
      });
    });

    this.selectedEventId.set(null);
    this.closeOverlay();
  }

  handleEscape(): void {
    if (this.modalMode()) {
      this.closeOverlay();
      return;
    }

    if (this.selectedEvent()) {
      this.closeSelectedEvent();
    }
  }

  getVisibleEvents(day: DcxCalendarDayCell): DcxCalendarEvent[] {
    return day.events.slice(0, this.dayMaxVisibleEvents());
  }

  getOverflowCount(day: DcxCalendarDayCell): number {
    return Math.max(day.events.length - this.dayMaxVisibleEvents(), 0);
  }

  getWeekSlotEvents(date: Date, hour: number): DcxCalendarEvent[] {
    return this.localEvents().filter(event => {
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
    this.localActiveDate.set(nextDate);
    this.activeDateChange.emit(nextDate);
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

      const isRangeStart = !!normalizedStart && this.isSameDate(normalizedCurrent, normalizedStart);
      const isRangeEnd = !!normalizedEnd && this.isSameDate(normalizedCurrent, normalizedEnd);
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
        isSelected: !!selectedDate && this.isSameDate(normalizedCurrent, selectedDate),
        isRangeStart,
        isRangeEnd,
        isInRange,
        events: includeEvents ? this.getEventsForDate(normalizedCurrent) : [],
      };
    });

    return Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7));
  }

  private getEventsForDate(date: Date): DcxCalendarEvent[] {
    return this.localEvents()
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

  private formToEvent(form: CalendarFormModel, eventId?: string): DcxCalendarEvent {
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

    const existing = eventId ? this.localEvents().find(item => item.id === eventId) : undefined;

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
}