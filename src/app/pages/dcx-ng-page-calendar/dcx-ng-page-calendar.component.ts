import { Component, signal } from '@angular/core';
import {
  DcxCalendarDeleteRequest,
  DcxCalendarEvent,
  DcxCalendarEventDraft,
  DcxNgCalendarComponent,
  buildCalendarDemoEvents,
  cloneCalendarEvents,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-calendar',
  standalone: true,
  imports: [DcxNgCalendarComponent],
  templateUrl: './dcx-ng-page-calendar.component.html',
  styleUrl: './dcx-ng-page-calendar.component.scss',
})
export class DcxNgPageCalendarComponent {
  readonly monthDate = signal(new Date(2026, 5, 1));
  readonly rangeDate = signal(new Date(2026, 5, 1));
  readonly weekDate = signal(new Date(2026, 5, 8));
  readonly yearDate = signal(new Date(2026, 0, 1));
  readonly miniDate = signal(new Date(2026, 5, 17));

  readonly rangeStart = signal<Date | null>(new Date(2026, 5, 10));
  readonly rangeEnd = signal<Date | null>(new Date(2026, 5, 18));
  readonly appliedRangeLabel = signal('10/06/2026 - 18/06/2026');
  readonly selectedDay = signal<Date | null>(new Date(2026, 5, 18));

  readonly events = signal<DcxCalendarEvent[]>(
    cloneCalendarEvents(buildCalendarDemoEvents()),
  );

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
    this.events.update(items => [
      ...items,
      {
        id: `event-${Date.now()}`,
        title: draft.title,
        start: new Date(draft.start),
        end: draft.end ? new Date(draft.end) : null,
        allDay: draft.allDay,
        type: draft.type,
        description: draft.description ?? '',
        recurrence: draft.recurrence,
      },
    ]);
  };

  handleCalendarEventUpdate = (event: DcxCalendarEvent): void => {
    this.events.update(items =>
      items.map(item => (item.id === event.id ? event : item)),
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

  private formatDate(value: Date): string {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
