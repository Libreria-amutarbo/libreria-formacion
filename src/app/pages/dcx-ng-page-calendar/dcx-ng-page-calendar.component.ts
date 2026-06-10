import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DcxNgCalendarComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-calendar/dcx-ng-calendar.component';
import {
  DcxCalendarDeleteRequest,
  DcxCalendarEvent,
  DcxCalendarEventDraft,
} from '@dcx-ng-components/dcx-ng-lib';

type CalendarEventType =
  | 'meeting'
  | 'delivery'
  | 'reminder'
  | 'urgent'
  | 'personal';

type CalendarRecurrence = 'none' | 'daily' | 'weekly' | 'monthly';

type DeleteScope = 'single' | 'following' | 'all';

interface CalendarEventItem {
  id: string;
  seriesId?: string;
  title: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  type: CalendarEventType;
  description: string;
  recurrence: CalendarRecurrence;
}

interface CalendarDayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  events: CalendarEventItem[];
}

interface CalendarMonthSummary {
  index: number;
  label: string;
  weeks: CalendarDayCell[][];
  isActive: boolean;
}

interface EventFormModel {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  type: CalendarEventType;
  description: string;
  recurrence: CalendarRecurrence;
}

@Component({
  selector: 'dcx-ng-page-calendar',
  standalone: true,
  imports: [CommonModule, DcxNgCalendarComponent],
  templateUrl: './dcx-ng-page-calendar.component.html',
  styleUrl: './dcx-ng-page-calendar.component.scss',
})
export class DcxNgPageCalendarComponent {
  private readonly demoToday = this.startOfDay(new Date(2026, 5, 8));
  private readonly visibleMonthEvents = 2;

  readonly monthDate = signal(new Date(2026, 5, 1));
  readonly rangeDate = signal(new Date(2026, 5, 1));
  readonly weekDate = signal(new Date(2026, 5, 8));
  readonly yearDate = signal(new Date(2026, 0, 1));
  readonly miniDate = signal(new Date(2026, 5, 17));

  readonly rangeStart = signal<Date | null>(new Date(2026, 5, 10));
  readonly rangeEnd = signal<Date | null>(new Date(2026, 5, 18));
  readonly appliedRangeLabel = signal('10/06/2026 - 18/06/2026');
  readonly selectedDay = signal<Date | null>(new Date(2026, 5, 18));
  readonly selectedEventId = signal<string | null>('retro-2026-06-18');
  readonly modalMode = signal<'create' | 'edit' | 'delete' | null>(null);
  readonly deleteScope = signal<DeleteScope>('single');
  readonly formError = signal('');

  readonly events = signal<CalendarEventItem[]>(this.createSeedEvents());

  eventForm: EventFormModel = this.createEmptyForm(this.demoToday);

  readonly weekLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
  readonly weekHours = [9, 10, 11, 16];
  readonly eventTypeOptions: { value: CalendarEventType; label: string }[] = [
    { value: 'meeting', label: 'Reunión' },
    { value: 'delivery', label: 'Entrega' },
    { value: 'reminder', label: 'Recordatorio' },
    { value: 'urgent', label: 'Urgente' },
    { value: 'personal', label: 'Personal' },
  ];
  readonly recurrenceOptions: { value: CalendarRecurrence; label: string }[] = [
    { value: 'none', label: 'No repetir' },
    { value: 'daily', label: 'Cada día' },
    { value: 'weekly', label: 'Cada semana' },
    { value: 'monthly', label: 'Cada mes' },
  ];

  readonly monthLabel = computed(() =>
    this.monthDate().toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
    }),
  );

  readonly rangeLabel = computed(() =>
    this.rangeDate().toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
    }),
  );

  readonly miniLabel = computed(() =>
    this.miniDate().toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric',
    }),
  );

  readonly weekLabel = computed(() => {
    const start = this.startOfWeek(this.weekDate());
    const end = this.addDays(start, 6);
    return `${start.getDate()} – ${end.getDate()} ${this.capitalize(
      end.toLocaleDateString('es-ES', { month: 'short' }),
    )} ${end.getFullYear()}`;
  });

  readonly yearLabel = computed(() => String(this.yearDate().getFullYear()));

  readonly monthWeeks = computed(() =>
    this.buildMonthGrid(this.monthDate(), null, null, this.selectedDay()),
  );

  readonly rangeWeeks = computed(() =>
    this.buildMonthGrid(
      this.rangeDate(),
      this.rangeStart(),
      this.rangeEnd(),
      this.rangeEnd() ?? this.rangeStart(),
      false,
    ),
  );

  readonly miniWeeks = computed(() =>
    this.buildMonthGrid(this.miniDate(), null, null, this.miniDate(), false),
  );

  readonly weekDays = computed(() => {
    const start = this.startOfWeek(this.weekDate());
    return Array.from({ length: 7 }, (_, index) => {
      const date = this.addDays(start, index);
      return {
        date,
        label: this.weekLabels[index],
        isToday: this.isSameDate(date, this.demoToday),
        isWeekend: index >= 5,
      };
    });
  });

  readonly yearMonths = computed<CalendarMonthSummary[]>(() =>
    Array.from({ length: 12 }, (_, index) => {
      const date = new Date(this.yearDate().getFullYear(), index, 1);
      return {
        index,
        label: this.capitalize(
          date.toLocaleDateString('es-ES', { month: 'long' }),
        ),
        weeks: this.buildMiniMonthGrid(date),
        isActive: index === this.monthDate().getMonth(),
      };
    }),
  );

  readonly selectedEvent = computed(() => {
    const eventId = this.selectedEventId();
    if (!eventId) {
      return null;
    }

    return this.events().find(event => event.id === eventId) ?? null;
  });

  previousMonth = (): void => {
    this.monthDate.update(value => new Date(value.getFullYear(), value.getMonth() - 1, 1));
  };

  nextMonth = (): void => {
    this.monthDate.update(value => new Date(value.getFullYear(), value.getMonth() + 1, 1));
  };

  previousRangeMonth = (): void => {
    this.rangeDate.update(value => new Date(value.getFullYear(), value.getMonth() - 1, 1));
  };

  nextRangeMonth = (): void => {
    this.rangeDate.update(value => new Date(value.getFullYear(), value.getMonth() + 1, 1));
  };

  previousMiniMonth = (): void => {
    this.miniDate.update(value => new Date(value.getFullYear(), value.getMonth() - 1, 1));
  };

  nextMiniMonth = (): void => {
    this.miniDate.update(value => new Date(value.getFullYear(), value.getMonth() + 1, 1));
  };

  previousWeek = (): void => {
    this.weekDate.update(value => this.addDays(value, -7));
  };

  nextWeek = (): void => {
    this.weekDate.update(value => this.addDays(value, 7));
  };

  previousYear = (): void => {
    this.yearDate.update(value => new Date(value.getFullYear() - 1, 0, 1));
  };

  nextYear = (): void => {
    this.yearDate.update(value => new Date(value.getFullYear() + 1, 0, 1));
  };

  goToToday = (): void => {
    this.monthDate.set(new Date(this.demoToday.getFullYear(), this.demoToday.getMonth(), 1));
    this.selectedDay.set(this.demoToday);
  };

  selectMonthDay = (day: CalendarDayCell): void => {
    this.selectedDay.set(day.date);
  };

  selectMiniDay = (day: CalendarDayCell): void => {
    this.miniDate.set(day.date);
  };

  selectRangeDay = (day: CalendarDayCell): void => {
    const start = this.rangeStart();
    const end = this.rangeEnd();

    if (!start || (start && end)) {
      this.rangeStart.set(day.date);
      this.rangeEnd.set(null);
      return;
    }

    if (day.date.getTime() < start.getTime()) {
      this.rangeStart.set(day.date);
      return;
    }

    this.rangeEnd.set(day.date);
  };

  clearRange = (): void => {
    this.rangeStart.set(null);
    this.rangeEnd.set(null);
    this.appliedRangeLabel.set('Sin aplicar');
  };

  applyRange = (): void => {
    const start = this.rangeStart();
    const end = this.rangeEnd();

    if (!start || !end) {
      this.appliedRangeLabel.set('Selecciona un rango completo');
      return;
    }

    this.appliedRangeLabel.set(`${this.formatDate(start)} - ${this.formatDate(end)}`);
  };

  selectYearMonth = (monthIndex: number): void => {
    this.monthDate.set(new Date(this.yearDate().getFullYear(), monthIndex, 1));
    this.miniDate.set(new Date(this.yearDate().getFullYear(), monthIndex, 1));
  };

  handleMonthDateChange = (date: Date): void => {
    this.monthDate.set(date);
  };

  handleRangeDateChange = (date: Date): void => {
    this.rangeDate.set(date);
  };

  handleWeekDateChange = (date: Date): void => {
    this.weekDate.set(date);
  };

  handleYearDateChange = (date: Date): void => {
    this.yearDate.set(date);
  };

  handleMiniDateChange = (date: Date): void => {
    this.miniDate.set(date);
  };

  handleMonthDateSelect = (date: Date): void => {
    this.selectedDay.set(date);
  };

  handleMiniDateSelect = (date: Date): void => {
    this.miniDate.set(date);
  };

  handleRangeChange = ({ start, end }: { start: Date | null; end: Date | null }): void => {
    this.rangeStart.set(start);
    this.rangeEnd.set(end);

    if (!start && !end) {
      this.appliedRangeLabel.set('Sin aplicar');
      return;
    }

    if (!start || !end) {
      this.appliedRangeLabel.set('Selecciona un rango completo');
      return;
    }

    this.appliedRangeLabel.set(`${this.formatDate(start)} - ${this.formatDate(end)}`);
  };

  handleCalendarEventCreate = (draft: DcxCalendarEventDraft): void => {
    this.events.update(items => [...items, this.mapDraftToEvent(draft)]);
  };

  handleCalendarEventUpdate = (event: DcxCalendarEvent): void => {
    this.events.update(items =>
      items.map(item => (item.id === event.id ? this.mapCalendarEvent(event) : item)),
    );
  };

  handleCalendarEventDelete = (request: DcxCalendarDeleteRequest): void => {
    this.events.update(items => {
      const activeEvent = items.find(item => item.id === request.eventId);

      if (!activeEvent) {
        return items;
      }

      if (!activeEvent.seriesId || request.scope === 'single') {
        return items.filter(item => item.id !== activeEvent.id);
      }

      if (request.scope === 'all') {
        return items.filter(item => item.seriesId !== activeEvent.seriesId);
      }

      return items.filter(item => {
        if (item.seriesId !== activeEvent.seriesId) {
          return true;
        }

        return item.start.getTime() < activeEvent.start.getTime();
      });
    });
  };

  openEvent = (event: CalendarEventItem): void => {
    this.selectedEventId.set(event.id);
    this.selectedDay.set(this.startOfDay(event.start));
  };

  openDayOverflow = (day: CalendarDayCell): void => {
    this.selectedDay.set(day.date);
    const firstEvent = day.events[this.visibleMonthEvents];
    if (firstEvent) {
      this.selectedEventId.set(firstEvent.id);
    }
  };

  openCreateModal = (date?: Date): void => {
    this.formError.set('');
    this.eventForm = this.createEmptyForm(date ?? this.selectedDay() ?? this.demoToday);
    this.modalMode.set('create');
  };

  openEditModal = (event: CalendarEventItem): void => {
    this.formError.set('');
    this.eventForm = this.createFormFromEvent(event);
    this.selectedEventId.set(event.id);
    this.modalMode.set('edit');
  };

  openDeleteModal = (): void => {
    this.deleteScope.set('single');
    this.modalMode.set('delete');
  };

  closeSelectedEvent = (): void => {
    this.selectedEventId.set(null);
  };

  closeOverlay = (): void => {
    this.modalMode.set(null);
    this.formError.set('');
  };

  saveEvent = (): void => {
    if (!this.eventForm.title.trim()) {
      this.formError.set('El título es obligatorio.');
      return;
    }

    const nextEvent = this.formToEvent(this.eventForm, this.selectedEventId() ?? undefined);

    if (this.modalMode() === 'edit' && this.selectedEventId()) {
      this.events.update(items =>
        items.map(item => (item.id === this.selectedEventId() ? nextEvent : item)),
      );
    } else {
      this.events.update(items => [...items, nextEvent]);
      this.selectedEventId.set(nextEvent.id);
    }

    this.selectedDay.set(this.startOfDay(nextEvent.start));
    this.closeOverlay();
  };

  confirmDelete = (): void => {
    const activeEvent = this.selectedEvent();
    if (!activeEvent) {
      this.closeOverlay();
      return;
    }

    const scope = this.deleteScope();

    this.events.update(items => {
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
  };

  getVisibleEvents = (day: CalendarDayCell): CalendarEventItem[] =>
    day.events.slice(0, this.visibleMonthEvents);

  getOverflowCount = (day: CalendarDayCell): number =>
    Math.max(day.events.length - this.visibleMonthEvents, 0);

  getWeekSlotEvents = (date: Date, hour: number): CalendarEventItem[] =>
    this.events().filter(event => {
      const sameDay = this.isSameDate(event.start, date);
      return sameDay && !event.allDay && event.start.getHours() === hour;
    });

  getEventClass = (type: CalendarEventType): string => {
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
  };

  formatDate = (value: Date): string => {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();
    return `${day}/${month}/${year}`;
  };

  formatDayLabel = (value: Date): string =>
    value.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

  formatTimeRange = (event: CalendarEventItem): string => {
    if (event.allDay || !event.end) {
      return 'Todo el día';
    }

    return `${this.formatTime(event.start)} – ${this.formatTime(event.end)}`;
  };

  formatRecurrenceLabel = (value: CalendarRecurrence): string => {
    switch (value) {
      case 'daily':
        return 'Repite cada dia';
      case 'weekly':
        return 'Repite cada semana';
      case 'monthly':
        return 'Repite cada mes';
      default:
        return 'Sin recurrencia';
    }
  };

  private buildMonthGrid(
    baseDate: Date,
    rangeStart: Date | null,
    rangeEnd: Date | null,
    selectedDate: Date | null,
    includeEvents = true,
  ): CalendarDayCell[][] {
    const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const start = this.startOfWeek(firstDay);

    const days = Array.from({ length: 35 }, (_, index) => {
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
        isToday: this.isSameDate(normalizedCurrent, this.demoToday),
        isWeekend: [0, 6].includes(normalizedCurrent.getDay()),
        isSelected: !!selectedDate && this.isSameDate(normalizedCurrent, selectedDate),
        isRangeStart,
        isRangeEnd,
        isInRange,
        events: includeEvents ? this.getEventsForDate(normalizedCurrent) : [],
      };
    });

    return Array.from({ length: 5 }, (_, index) =>
      days.slice(index * 7, index * 7 + 7),
    );
  }

  private buildMiniMonthGrid(baseDate: Date): CalendarDayCell[][] {
    return this.buildMonthGrid(baseDate, null, null, this.demoToday, false);
  }

  private getEventsForDate(date: Date): CalendarEventItem[] {
    return this.events()
      .filter(event => this.isSameDate(event.start, date))
      .sort((left, right) => left.start.getTime() - right.start.getTime());
  }

  private createSeedEvents(): CalendarEventItem[] {
    const standups = this.createRecurringStandups();

    return [
      ...standups,
      this.createEvent('planning-2026-06-02', 'Planificación', new Date(2026, 5, 2, 11, 0), new Date(2026, 5, 2, 12, 0), false, 'reminder', 'Preparación de entregables de la semana.', 'none'),
      this.createEvent('onboarding-2026-06-08', 'Onboarding nuevo', new Date(2026, 5, 8, 12, 0), new Date(2026, 5, 8, 13, 0), false, 'personal', 'Sesión de incorporación para nueva persona del equipo.', 'none'),
      this.createEvent('pr-2026-06-09', 'Revisión PR #42', new Date(2026, 5, 9, 10, 0), new Date(2026, 5, 9, 10, 30), false, 'delivery', 'Revisión funcional y de cobertura del pull request.', 'none'),
      this.createEvent('planning-s24-2026-06-10', 'Planning sprint 24', new Date(2026, 5, 10, 11, 0), new Date(2026, 5, 10, 12, 0), false, 'reminder', 'Planificación del siguiente sprint con el equipo.', 'none'),
      this.createEvent('retro-2026-06-18', 'Retrospectiva', new Date(2026, 5, 18, 11, 0), new Date(2026, 5, 18, 12, 0), false, 'reminder', 'Retro de sprint con acuerdos de mejora.', 'none'),
      this.createEvent('demo-2026-06-17', 'Demo release 2.4', new Date(2026, 5, 17, 16, 0), new Date(2026, 5, 17, 17, 0), false, 'delivery', 'Demo interna de la release 2.4.', 'none'),
      this.createEvent('client-2026-06-23', 'Reunión cliente', new Date(2026, 5, 23, 11, 0), new Date(2026, 5, 23, 12, 0), false, 'meeting', 'Seguimiento con cliente y revisión de hitos.', 'none'),
      this.createEvent('q2-review-2026-06-25', 'Revisión Q2', new Date(2026, 5, 25, 11, 0), new Date(2026, 5, 25, 12, 30), false, 'reminder', 'Revisión de métricas y entregables de Q2.', 'none'),
      this.createEvent('sprint-delivery-2026-06-12', 'Entrega sprint 23', new Date(2026, 5, 12), null, true, 'urgent', 'Entrega principal del sprint 23.', 'none'),
      this.createEvent('q2-close-2026-06-29', 'Cierre Q2', new Date(2026, 5, 29), null, true, 'urgent', 'Cierre de trimestre con revisión de resultados.', 'none'),
      this.createEvent('q3-planning-2026-07-01', 'Planning Q3', new Date(2026, 6, 1, 11, 0), new Date(2026, 6, 1, 12, 0), false, 'reminder', 'Planificación inicial de Q3.', 'none'),
    ];
  }

  private createRecurringStandups(): CalendarEventItem[] {
    const events: CalendarEventItem[] = [];

    for (let day = 3; day <= 30; day += 1) {
      const date = new Date(2026, 5, day, 9, 0);
      const weekDay = date.getDay();

      if (weekDay === 0 || weekDay === 6) {
        continue;
      }

      events.push(
        this.createEvent(
          `standup-2026-06-${String(day).padStart(2, '0')}`,
          'Standup diario',
          date,
          new Date(2026, 5, day, 9, 30),
          false,
          'meeting',
          'Revisión rápida del estado del equipo.',
          'daily',
          'standup-daily-june-2026',
        ),
      );
    }

    return events;
  }

  private createEvent(
    id: string,
    title: string,
    start: Date,
    end: Date | null,
    allDay: boolean,
    type: CalendarEventType,
    description: string,
    recurrence: CalendarRecurrence,
    seriesId?: string,
  ): CalendarEventItem {
    return {
      id,
      seriesId,
      title,
      start,
      end,
      allDay,
      type,
      description,
      recurrence,
    };
  }

  private createEmptyForm(date: Date): EventFormModel {
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

  private createFormFromEvent(event: CalendarEventItem): EventFormModel {
    return {
      title: event.title,
      date: this.toDateInputValue(event.start),
      startTime: event.allDay ? '09:00' : this.toTimeInputValue(event.start),
      endTime: event.end ? this.toTimeInputValue(event.end) : '10:00',
      allDay: event.allDay,
      type: event.type,
      description: event.description,
      recurrence: event.recurrence,
    };
  }

  private formToEvent(form: EventFormModel, eventId?: string): CalendarEventItem {
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
      ? this.events().find(item => item.id === eventId)
      : undefined;

    return {
      id: eventId ?? `event-${Date.now()}`,
      seriesId: existing?.seriesId,
      title: form.title.trim(),
      start,
      end,
      allDay: form.allDay,
      type: form.type,
      description: form.description.trim(),
      recurrence: form.recurrence,
    };
  }

  private mapDraftToEvent(draft: DcxCalendarEventDraft): CalendarEventItem {
    return {
      id: `event-${Date.now()}`,
      title: draft.title,
      start: new Date(draft.start),
      end: draft.end ? new Date(draft.end) : null,
      allDay: draft.allDay,
      type: draft.type,
      description: draft.description ?? '',
      recurrence: draft.recurrence,
    };
  }

  private mapCalendarEvent(event: DcxCalendarEvent): CalendarEventItem {
    return {
      id: event.id,
      seriesId: event.seriesId,
      title: event.title,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : null,
      allDay: event.allDay,
      type: event.type,
      description: event.description ?? '',
      recurrence: event.recurrence ?? 'none',
    };
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