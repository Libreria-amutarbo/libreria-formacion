import {
  DcxCalendarEvent,
  DcxCalendarEventType,
  DcxCalendarRecurrence,
} from '../interfaces';

const createEvent = (
  id: string,
  title: string,
  start: Date,
  end: Date | null,
  allDay: boolean,
  type: DcxCalendarEventType,
  description: string,
  recurrence: DcxCalendarRecurrence,
  seriesId?: string,
): DcxCalendarEvent => ({
  id,
  title,
  start,
  end,
  allDay,
  type,
  description,
  recurrence,
  seriesId,
});

export const makeCalendarEvent = (
  overrides: Partial<DcxCalendarEvent> = {},
): DcxCalendarEvent => ({
  id: 'event-1',
  title: 'Standup diario',
  start: new Date(2026, 5, 18, 9, 0),
  end: new Date(2026, 5, 18, 9, 30),
  allDay: false,
  type: 'meeting',
  description: 'Revisión rápida del estado del equipo.',
  recurrence: 'daily',
  ...overrides,
});

export const cloneCalendarEvents = (
  events: DcxCalendarEvent[],
): DcxCalendarEvent[] =>
  events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: event.end ? new Date(event.end) : null,
  }));

export const buildCalendarDemoEvents = (): DcxCalendarEvent[] => {
  const standups: DcxCalendarEvent[] = [];

  for (let day = 3; day <= 30; day += 1) {
    const date = new Date(2026, 5, day, 9, 0);
    const weekDay = date.getDay();

    if (weekDay === 0 || weekDay === 6) {
      continue;
    }

    standups.push(
      createEvent(
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

  return [
    ...standups,
    createEvent(
      'planning-2026-06-02',
      'Planificación',
      new Date(2026, 5, 2, 11, 0),
      new Date(2026, 5, 2, 12, 0),
      false,
      'reminder',
      'Preparación de entregables de la semana.',
      'none',
    ),
    createEvent(
      'onboarding-2026-06-08',
      'Onboarding nuevo',
      new Date(2026, 5, 8, 12, 0),
      new Date(2026, 5, 8, 13, 0),
      false,
      'personal',
      'Sesión de incorporación para nueva persona del equipo.',
      'none',
    ),
    createEvent(
      'pr-2026-06-09',
      'Revisión PR #42',
      new Date(2026, 5, 9, 10, 0),
      new Date(2026, 5, 9, 10, 30),
      false,
      'delivery',
      'Revisión funcional y de cobertura del pull request.',
      'none',
    ),
    createEvent(
      'planning-s24-2026-06-10',
      'Planning sprint 24',
      new Date(2026, 5, 10, 11, 0),
      new Date(2026, 5, 10, 12, 0),
      false,
      'reminder',
      'Planificación del siguiente sprint con el equipo.',
      'none',
    ),
    createEvent(
      'retro-2026-06-18',
      'Retrospectiva',
      new Date(2026, 5, 18, 11, 0),
      new Date(2026, 5, 18, 12, 0),
      false,
      'reminder',
      'Retro de sprint con acuerdos de mejora.',
      'none',
    ),
    createEvent(
      'demo-2026-06-17',
      'Demo release 2.4',
      new Date(2026, 5, 17, 16, 0),
      new Date(2026, 5, 17, 17, 0),
      false,
      'delivery',
      'Demo interna de la release 2.4.',
      'none',
    ),
    createEvent(
      'client-2026-06-23',
      'Reunión cliente',
      new Date(2026, 5, 23, 11, 0),
      new Date(2026, 5, 23, 12, 0),
      false,
      'meeting',
      'Seguimiento con cliente y revisión de hitos.',
      'none',
    ),
    createEvent(
      'q2-review-2026-06-25',
      'Revisión Q2',
      new Date(2026, 5, 25, 11, 0),
      new Date(2026, 5, 25, 12, 30),
      false,
      'reminder',
      'Revisión de métricas y entregables de Q2.',
      'none',
    ),
    createEvent(
      'sprint-delivery-2026-06-12',
      'Entrega sprint 23',
      new Date(2026, 5, 12),
      null,
      true,
      'urgent',
      'Entrega principal del sprint 23.',
      'none',
    ),
    createEvent(
      'q2-close-2026-06-29',
      'Cierre Q2',
      new Date(2026, 5, 29),
      null,
      true,
      'urgent',
      'Cierre de trimestre con revisión de resultados.',
      'none',
    ),
    createEvent(
      'q3-planning-2026-07-01',
      'Planning Q3',
      new Date(2026, 6, 1, 11, 0),
      new Date(2026, 6, 1, 12, 0),
      false,
      'reminder',
      'Planificación inicial de Q3.',
      'none',
    ),
  ];
};

export const DCX_CALENDAR_DEMO_EVENTS = buildCalendarDemoEvents();