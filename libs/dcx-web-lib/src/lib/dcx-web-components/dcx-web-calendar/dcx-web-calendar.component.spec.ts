import './dcx-web-calendar.component';
import { DcxWebCalendar } from './dcx-web-calendar.component';
import {
  buildCalendarDemoEvents,
  makeCalendarEvent,
} from '../../core/fixtures';

describe('DcxWebCalendar', () => {
  let element: DcxWebCalendar;

  beforeEach(async () => {
    element = document.createElement('dcx-web-calendar') as DcxWebCalendar;
    element.activeDate = new Date(2026, 5, 18);
    element.selectedDate = new Date(2026, 5, 18);
    element.selectionMode = 'single';
    element.events = buildCalendarDemoEvents();

    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render month view by default', () => {
    expect(
      element.shadowRoot?.querySelector('.dcx-calendar__grid'),
    ).toBeTruthy();
  });

  it('should emit activeDateChange when navigating month view', () => {
    const spy = jest.fn();
    element.addEventListener('activeDateChange', spy);

    element.next();

    expect(element.localActiveDate.getMonth()).toBe(6);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: new Date(2026, 6, 1),
      }),
    );
  });

  it('should navigate previous and next week from week view', async () => {
    element.view = 'week';
    await element.updateComplete;
    const spy = jest.fn();
    element.addEventListener('activeDateChange', spy);

    element.previous();
    expect(spy).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: new Date(2026, 5, 11) }),
    );

    element.next();
    expect(spy).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: new Date(2026, 5, 18) }),
    );
  });

  it('should navigate previous and next year from year view', async () => {
    element.view = 'year';
    await element.updateComplete;
    const spy = jest.fn();
    element.addEventListener('activeDateChange', spy);

    element.previous();
    expect(spy).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: new Date(2025, 0, 1) }),
    );

    element.next();
    expect(spy).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: new Date(2026, 0, 1) }),
    );
  });

  it('should render weekly events in week view', async () => {
    element.view = 'week';
    await element.updateComplete;

    const events = element.shadowRoot?.querySelectorAll('.dcx-calendar__event');
    expect(events?.length).toBeGreaterThan(0);
  });

  it('should mark the weekend columns in week view header', async () => {
    element.view = 'week';
    await element.updateComplete;

    const weekendHeaders = element.shadowRoot?.querySelectorAll(
      '.dcx-calendar__week-header--weekend',
    );
    expect(weekendHeaders?.length).toBe(2);
  });

  it('should mark the today column in week view header when visible', async () => {
    element.view = 'week';
    element.activeDate = new Date();
    await element.updateComplete;

    const todayHeader = element.shadowRoot?.querySelector(
      '.dcx-calendar__week-header--today',
    );
    expect(todayHeader).toBeTruthy();
  });

  it('should render twelve months in year view', async () => {
    element.view = 'year';
    await element.updateComplete;

    const months = element.shadowRoot?.querySelectorAll(
      '.dcx-calendar__mini-month',
    );
    expect(months?.length).toBe(12);
  });

  it('should emit dateSelect when a day is selected in single mode', () => {
    const spy = jest.fn();
    element.addEventListener('dateSelect', spy);

    const day = element.monthWeeks
      .flat()
      .find(item => item.date.getDate() === 19 && item.isCurrentMonth);

    element.selectDay(day!);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ detail: day!.date }),
    );
    expect(element.localSelectedDate).toEqual(day!.date);
  });

  it('should emit rangeChange when range selection is updated', async () => {
    element.selectionMode = 'range';
    await element.updateComplete;
    const spy = jest.fn();
    element.addEventListener('rangeChange', spy);

    const days = element.monthWeeks
      .flat()
      .filter(
        item => item.isCurrentMonth && [19, 20].includes(item.date.getDate()),
      );

    element.selectDay(days[0]);
    element.selectDay(days[1]);

    expect(spy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: {
          start: days[0].date,
          end: days[1].date,
        },
      }),
    );
  });

  it('should not render event pills in range mode, even if events are passed', async () => {
    element.selectionMode = 'range';
    await element.updateComplete;

    expect(element.showMonthEvents).toBe(false);
    expect(
      element.shadowRoot?.querySelectorAll('.dcx-calendar__month-pill').length,
    ).toBe(0);
  });

  it('should emit eventSelect when opening an event', () => {
    const spy = jest.fn();
    element.addEventListener('eventSelect', spy);
    const event = element.localEvents[0];

    element.openEvent(event);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ detail: event }),
    );
    expect(element.selectedEvent?.id).toBe(event.id);
  });

  it('should emit eventCreate when saving a new event', () => {
    const spy = jest.fn();
    element.addEventListener('eventCreate', spy);

    element.openCreateModal(new Date(2026, 5, 21));
    element.eventForm.title = 'Nueva review';
    element.eventForm.description = 'Review funcional';
    element.saveEvent();

    expect(spy).toHaveBeenCalled();
    expect(
      element.localEvents.some(event => event.title === 'Nueva review'),
    ).toBe(true);
  });

  it('should emit eventUpdate when editing an event', () => {
    const spy = jest.fn();
    element.addEventListener('eventUpdate', spy);
    const event = element.localEvents[0];

    element.openEditModal(event);
    element.eventForm.title = 'Standup equipo actualizado';
    element.saveEvent();

    expect(spy).toHaveBeenCalled();
    expect(
      element.localEvents.some(
        item => item.title === 'Standup equipo actualizado',
      ),
    ).toBe(true);
  });

  it('should emit eventDelete with the selected scope', () => {
    const spy = jest.fn();
    element.addEventListener('eventDelete', spy);
    const recurringEvent = element.localEvents.find(
      event => event.seriesId === 'standup-daily-june-2026',
    );

    element.openEvent(recurringEvent!);
    element.openDeleteModal();
    element.setDeleteScope('following');
    element.confirmDelete();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          eventId: recurringEvent!.id,
          scope: 'following',
        },
      }),
    );
  });

  it('should close overlays on escape', () => {
    const event = element.localEvents[0];
    element.openEvent(event);
    expect(element.selectedEvent).toBeTruthy();

    element.handleEscape();

    expect(element.selectedEvent).toBeNull();
  });

  it('should collapse overflowing day events into a more indicator', async () => {
    element.events = [
      makeCalendarEvent({
        id: '1',
        title: 'Uno',
        start: new Date(2026, 5, 18, 9, 0),
      }),
      makeCalendarEvent({
        id: '2',
        title: 'Dos',
        start: new Date(2026, 5, 18, 10, 0),
      }),
      makeCalendarEvent({
        id: '3',
        title: 'Tres',
        start: new Date(2026, 5, 18, 11, 0),
      }),
      makeCalendarEvent({
        id: '4',
        title: 'Cuatro',
        start: new Date(2026, 5, 18, 12, 0),
      }),
    ];
    element.dayMaxVisibleEvents = 2;
    await element.updateComplete;

    const moreButton = Array.from(
      element.shadowRoot?.querySelectorAll('.dcx-calendar__month-more') ?? [],
    ).find(el => el.textContent?.includes('+2 más'));

    expect(moreButton).toBeTruthy();
  });

  it('should render a single grouped dcx-web-radio in the delete modal', async () => {
    const recurringEvent = element.localEvents.find(
      event => event.seriesId === 'standup-daily-june-2026',
    );

    element.openEvent(recurringEvent!);
    element.openDeleteModal();
    await element.updateComplete;

    const radios = element.shadowRoot?.querySelectorAll('dcx-web-radio');
    expect(radios?.length).toBe(1);
    expect(element.deleteScopeOptions.map(option => option.value)).toEqual([
      'single',
      'following',
      'all',
    ]);
  });

  it('should mark today with a distinctive cell class in month view', async () => {
    element.activeDate = new Date();
    await element.updateComplete;

    const todayCell = element.shadowRoot?.querySelector(
      '.dcx-calendar__month-cell--today',
    );
    expect(todayCell).toBeTruthy();
  });

  it('should mark weekend columns with a distinctive cell class in month view', () => {
    const weekendCells = element.shadowRoot?.querySelectorAll(
      '.dcx-calendar__month-cell--weekend',
    );
    expect(weekendCells?.length).toBeGreaterThan(0);
  });

  it('should disable interaction when disabled is true', async () => {
    element.disabled = true;
    await element.updateComplete;

    const activeDateSpy = jest.fn();
    const dateSelectSpy = jest.fn();
    element.addEventListener('activeDateChange', activeDateSpy);
    element.addEventListener('dateSelect', dateSelectSpy);

    const day = element.monthWeeks
      .flat()
      .find(item => item.date.getDate() === 19 && item.isCurrentMonth);

    element.next();
    element.selectDay(day!);

    expect(activeDateSpy).not.toHaveBeenCalled();
    expect(dateSelectSpy).not.toHaveBeenCalled();
    expect(element.localActiveDate).toEqual(new Date(2026, 5, 18));
    expect(element.localSelectedDate).toEqual(new Date(2026, 5, 18));
  });
});
