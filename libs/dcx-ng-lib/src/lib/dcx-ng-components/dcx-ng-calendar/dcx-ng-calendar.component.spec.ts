import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgCalendarComponent } from './dcx-ng-calendar.component';
import {
  buildCalendarDemoEvents,
  makeCalendarEvent,
} from '../../core/fixtures';

describe('DcxNgCalendarComponent', () => {
  let component: DcxNgCalendarComponent;
  let fixture: ComponentFixture<DcxNgCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgCalendarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeDate', new Date(2026, 5, 18));
    fixture.componentRef.setInput('selectedDate', new Date(2026, 5, 18));
    fixture.componentRef.setInput('selectionMode', 'single');
    fixture.componentRef.setInput('events', buildCalendarDemoEvents());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render month view by default', () => {
    expect(fixture.nativeElement.querySelector('.cal-grid')).toBeTruthy();
  });

  it('should emit activeDateChange when navigating month view', () => {
    const emitSpy = jest.spyOn(component.activeDateChange, 'emit');

    component.next();

    expect(component.localActiveDate().getMonth()).toBe(6);
    expect(emitSpy).toHaveBeenCalledWith(new Date(2026, 6, 1));
  });

  it('should navigate previous and next week from week view', () => {
    fixture.componentRef.setInput('view', 'week');
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.activeDateChange, 'emit');

    component.previous();
    expect(emitSpy).toHaveBeenLastCalledWith(new Date(2026, 5, 11));

    component.next();
    expect(emitSpy).toHaveBeenLastCalledWith(new Date(2026, 5, 18));
  });

  it('should navigate previous and next year from year view', () => {
    fixture.componentRef.setInput('view', 'year');
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.activeDateChange, 'emit');

    component.previous();
    expect(emitSpy).toHaveBeenLastCalledWith(new Date(2025, 0, 1));

    component.next();
    expect(emitSpy).toHaveBeenLastCalledWith(new Date(2026, 0, 1));
  });

  it('should render weekly events in week view', () => {
    fixture.componentRef.setInput('view', 'week');
    fixture.detectChanges();

    const events = fixture.nativeElement.querySelectorAll('.cal-event');
    expect(events.length).toBeGreaterThan(0);
  });

  it('should render twelve months in year view', () => {
    fixture.componentRef.setInput('view', 'year');
    fixture.detectChanges();

    const months = fixture.nativeElement.querySelectorAll('.cal-mini-month');
    expect(months.length).toBe(12);
  });

  it('should emit dateSelect when a day is selected in single mode', () => {
    const emitSpy = jest.spyOn(component.dateSelect, 'emit');
    const day = component
      .monthWeeks()
      .flat()
      .find(item => item.date.getDate() === 19 && item.isCurrentMonth);

    component.selectDay(day!);

    expect(emitSpy).toHaveBeenCalledWith(day!.date);
    expect(component.localSelectedDate()).toEqual(day!.date);
  });

  it('should emit rangeChange when range selection is updated', () => {
    fixture.componentRef.setInput('selectionMode', 'range');
    fixture.detectChanges();
    const emitSpy = jest.spyOn(component.rangeChange, 'emit');
    const days = component
      .monthWeeks()
      .flat()
      .filter(item => item.isCurrentMonth && [19, 20].includes(item.date.getDate()));

    component.selectDay(days[0]);
    component.selectDay(days[1]);

    expect(emitSpy).toHaveBeenLastCalledWith({
      start: days[0].date,
      end: days[1].date,
    });
  });

  it('should emit eventSelect when opening an event', () => {
    const emitSpy = jest.spyOn(component.eventSelect, 'emit');
    const event = component.localEvents()[0];

    component.openEvent(event);

    expect(emitSpy).toHaveBeenCalledWith(event);
    expect(component.selectedEvent()?.id).toBe(event.id);
  });

  it('should emit eventCreate when saving a new event', () => {
    const emitSpy = jest.spyOn(component.eventCreate, 'emit');

    component.openCreateModal(new Date(2026, 5, 21));
    component.eventForm.title = 'Nueva review';
    component.eventForm.description = 'Review funcional';
    component.saveEvent();

    expect(emitSpy).toHaveBeenCalled();
    expect(
      component.localEvents().some(event => event.title === 'Nueva review'),
    ).toBe(true);
  });

  it('should emit eventUpdate when editing an event', () => {
    const emitSpy = jest.spyOn(component.eventUpdate, 'emit');
    const event = component.localEvents()[0];

    component.openEditModal(event);
    component.eventForm.title = 'Standup equipo actualizado';
    component.saveEvent();

    expect(emitSpy).toHaveBeenCalled();
    expect(
      component.localEvents().some(
        item => item.title === 'Standup equipo actualizado',
      ),
    ).toBe(true);
  });

  it('should emit eventDelete with the selected scope', () => {
    const emitSpy = jest.spyOn(component.eventDelete, 'emit');
    const recurringEvent = component.localEvents().find(
      event => event.seriesId === 'standup-daily-june-2026',
    );

    component.openEvent(recurringEvent!);
    component.openDeleteModal();
    component.deleteScope.set('following');
    component.confirmDelete();

    expect(emitSpy).toHaveBeenCalledWith({
      eventId: recurringEvent!.id,
      scope: 'following',
    });
  });

  it('should close overlays on escape', () => {
    const event = component.localEvents()[0];
    component.openEvent(event);
    expect(component.selectedEvent()).toBeTruthy();

    component.handleEscape();

    expect(component.selectedEvent()).toBeNull();
  });

  it('should collapse overflowing day events into a more indicator', () => {
    fixture.componentRef.setInput('events', [
      makeCalendarEvent({ id: '1', title: 'Uno', start: new Date(2026, 5, 18, 9, 0) }),
      makeCalendarEvent({ id: '2', title: 'Dos', start: new Date(2026, 5, 18, 10, 0) }),
      makeCalendarEvent({ id: '3', title: 'Tres', start: new Date(2026, 5, 18, 11, 0) }),
      makeCalendarEvent({ id: '4', title: 'Cuatro', start: new Date(2026, 5, 18, 12, 0) }),
    ]);
    fixture.componentRef.setInput('dayMaxVisibleEvents', 2);
    fixture.detectChanges();

    const moreButton = Array.from<Element>(
      fixture.nativeElement.querySelectorAll('.cal-month-more'),
    ).find(element => element.textContent?.includes('+2 más'));

    expect(moreButton).toBeTruthy();
  });

  it('should disable interaction when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const activeDateSpy = jest.spyOn(component.activeDateChange, 'emit');
    const dateSelectSpy = jest.spyOn(component.dateSelect, 'emit');
    const day = component
      .monthWeeks()
      .flat()
      .find(item => item.date.getDate() === 19 && item.isCurrentMonth);

    component.next();
    component.selectDay(day!);

    expect(activeDateSpy).not.toHaveBeenCalled();
    expect(dateSelectSpy).not.toHaveBeenCalled();
    expect(component.localActiveDate()).toEqual(new Date(2026, 5, 18));
    expect(component.localSelectedDate()).toEqual(new Date(2026, 5, 18));
  });
});