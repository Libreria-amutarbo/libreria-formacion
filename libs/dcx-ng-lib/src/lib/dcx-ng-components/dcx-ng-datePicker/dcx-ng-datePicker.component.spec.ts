import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgDatePickerComponent } from './dcx-ng-datePicker.component';
import { ComponentRef } from '@angular/core';
import { makeDay } from '../../core/mock';

describe('DcxNgDatePickerComponent', () => {
  let component: DcxNgDatePickerComponent;
  let fixture: ComponentFixture<DcxNgDatePickerComponent>;
  let componentRef: ComponentRef<DcxNgDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDatePickerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('placeholder and formatting', () => {
    it('should display default placeholder when no date is selected', () => {
      expect(component.formattedSelectedDate()).toBe('Select date');
    });

    it('should display custom placeholder when set', () => {
      componentRef.setInput('placeholder', 'Selecciona fecha');
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('Selecciona fecha');
    });

    it('should format selected date as dd/MM/yyyy by default', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('15/01/2025');
    });

    it('should format selected date as MM/dd/yyyy when dateFormat is set', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      componentRef.setInput('dateFormat', 'MM/dd/yyyy');
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('01/15/2025');
    });
  });

  describe('toggle calendar', () => {
    it('should toggle calendar via toggleCalendar method', () => {
      expect(component.isOpen()).toBe(false);
      component.toggleCalendar();
      expect(component.isOpen()).toBe(true);
      component.toggleCalendar();
      expect(component.isOpen()).toBe(false);
    });

    it('should not toggle calendar when disabled', () => {
      componentRef.setInput('disabled', true);
      fixture.detectChanges();
      component.toggleCalendar();
      expect(component.isOpen()).toBe(false);
    });

    it('should toggle calendar on click of input wrapper', () => {
      const wrapper = fixture.nativeElement.querySelector(
        '.dcx-datepicker__input-wrapper',
      );
      expect(component.isOpen()).toBe(false);
      wrapper.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
      wrapper.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(false);
    });

    it('should close calendar via closeCalendar method', () => {
      component.toggleCalendar();
      expect(component.isOpen()).toBe(true);
      component.closeCalendar();
      expect(component.isOpen()).toBe(false);
    });

    it('should reset mode to calendar on close', () => {
      component.toggleCalendar();
      component.openMonthSelector();
      expect(component.isMonthMode()).toBe(true);
      component.closeCalendar();
      expect(component.isCalendarMode()).toBe(true);
    });

    it('should reset mode to calendar when toggling off', () => {
      component.toggleCalendar();
      component.openYearSelector();
      expect(component.isYearMode()).toBe(true);
      component.toggleCalendar();
      expect(component.isCalendarMode()).toBe(true);
    });

    it('should display calendar element when open', () => {
      component.toggleCalendar();
      fixture.detectChanges();
      const calendar = fixture.nativeElement.querySelector(
        '.dcx-datepicker__calendar',
      );
      expect(calendar).toBeTruthy();
    });

    it('should not display calendar element when closed', () => {
      fixture.detectChanges();
      const calendar = fixture.nativeElement.querySelector(
        '.dcx-datepicker__calendar',
      );
      expect(calendar).toBeFalsy();
    });
  });

  describe('clear button', () => {
    it('should show clear button when date is selected and not disabled', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(true);
    });

    it('should not show clear button when disabled', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(false);
    });

    it('should not show clear button when no date selected', () => {
      expect(component.showClearButton()).toBe(false);
    });

    it('should emit null when clearDate is called (single)', () => {
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.clearDate({ clicked: true });
      expect(spy).toHaveBeenCalledWith(null);
    });

    it('should not clear when disabled', () => {
      componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.clearDate({ clicked: true });
      expect(spy).not.toHaveBeenCalled();
    });

    it('should show clear button in range mode when startDate exists', () => {
      componentRef.setInput('rangeSelect', true);
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(true);
    });

    it('should show clear button in range mode when endDate exists', () => {
      componentRef.setInput('rangeSelect', true);
      componentRef.setInput('endDate', new Date(2025, 0, 20));
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(true);
    });

    it('should not show clear button in range mode when no dates', () => {
      componentRef.setInput('rangeSelect', true);
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(false);
    });

    it('should show clear button in multi mode when dates exist', () => {
      componentRef.setInput('multiSelect', true);
      componentRef.setInput('selectedDates', [new Date(2025, 0, 10)]);
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(true);
    });

    it('should not show clear button in multi mode when empty', () => {
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(false);
    });

    it('should render clear button in DOM when visible', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      fixture.detectChanges();
      const clearEl = fixture.nativeElement.querySelector(
        '.dcx-datepicker__clear',
      );
      expect(clearEl).toBeTruthy();
    });

    it('should NOT render clear button in DOM when disabled', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const clearEl = fixture.nativeElement.querySelector(
        '.dcx-datepicker__clear',
      );
      expect(clearEl).toBeFalsy();
    });
  });

  describe('calendar days', () => {
    it('should generate 42 calendar days (6 weeks)', () => {
      expect(component.calendarDays().length).toBe(42);
    });

    it('should mark today correctly', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayDay = component
        .calendarDays()
        .find(d => d.date.getTime() === today.getTime());
      expect(todayDay?.isToday).toBe(true);
    });

    it('should mark selected date correctly', () => {
      const sel = new Date(2025, 0, 15);
      sel.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', sel);
      fixture.detectChanges();
      const day = component
        .calendarDays()
        .find(d => d.date.getTime() === sel.getTime());
      expect(day?.isSelected).toBe(true);
    });

    it('should disable dates before minDate', () => {
      const min = new Date(2025, 0, 10);
      min.setHours(0, 0, 0, 0);
      const test = new Date(2025, 0, 5);
      test.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      componentRef.setInput('minDate', min);
      fixture.detectChanges();
      const day = component
        .calendarDays()
        .find(d => d.date.getTime() === test.getTime());
      expect(day?.isDisabled).toBe(true);
    });

    it('should disable dates after maxDate', () => {
      const max = new Date(2025, 0, 10);
      max.setHours(0, 0, 0, 0);
      const test = new Date(2025, 0, 15);
      test.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 8));
      componentRef.setInput('maxDate', max);
      fixture.detectChanges();
      const day = component
        .calendarDays()
        .find(d => d.date.getTime() === test.getTime());
      expect(day?.isDisabled).toBe(true);
    });

    it('should not disable dates within min/max range', () => {
      const min = new Date(2025, 0, 5);
      min.setHours(0, 0, 0, 0);
      const max = new Date(2025, 0, 20);
      max.setHours(0, 0, 0, 0);
      const test = new Date(2025, 0, 12);
      test.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 10));
      componentRef.setInput('minDate', min);
      componentRef.setInput('maxDate', max);
      fixture.detectChanges();
      const day = component
        .calendarDays()
        .find(d => d.date.getTime() === test.getTime());
      expect(day?.isDisabled).toBe(false);
    });

    it('should flag isCurrentMonth correctly', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      fixture.detectChanges();
      const days = component.calendarDays();
      const jan15 = days.find(
        d => d.date.getDate() === 15 && d.date.getMonth() === 0,
      );
      expect(jan15?.isCurrentMonth).toBe(true);
    });
  });

  describe('navigation', () => {
    it('should navigate to previous month', () => {
      const initial = component.currentMonth().getMonth();
      component.previousMonth();
      fixture.detectChanges();
      expect(component.currentMonth().getMonth()).toBe(
        initial === 0 ? 11 : initial - 1,
      );
    });

    it('should navigate to next month', () => {
      const initial = component.currentMonth().getMonth();
      component.nextMonth();
      fixture.detectChanges();
      expect(component.currentMonth().getMonth()).toBe(
        initial === 11 ? 0 : initial + 1,
      );
    });

    it('previousMonth should do nothing in month mode', () => {
      component.toggleCalendar();
      component.openMonthSelector();
      const m = component.currentMonth().getMonth();
      component.previousMonth();
      expect(component.currentMonth().getMonth()).toBe(m);
    });

    it('nextMonth should do nothing in month mode', () => {
      component.toggleCalendar();
      component.openMonthSelector();
      const m = component.currentMonth().getMonth();
      component.nextMonth();
      expect(component.currentMonth().getMonth()).toBe(m);
    });

    it('previousMonth should page years backward in year mode', () => {
      component.toggleCalendar();
      component.openYearSelector();
      const before = component.yearsList();
      component.previousMonth();
      const after = component.yearsList();
      expect(after[0]).toBeLessThan(before[0]);
      expect(before[0] - after[0]).toBe(12);
    });

    it('nextMonth should page years forward in year mode', () => {
      component.toggleCalendar();
      component.openYearSelector();
      const before = component.yearsList();
      component.nextMonth();
      const after = component.yearsList();
      expect(after[0]).toBeGreaterThan(before[0]);
      expect(after[0] - before[0]).toBe(12);
    });
  });

  describe('month and year selectors', () => {
    it('should open month selector', () => {
      component.openMonthSelector();
      expect(component.isMonthMode()).toBe(true);
      expect(component.isCalendarMode()).toBe(false);
      expect(component.isYearMode()).toBe(false);
    });

    it('should open year selector', () => {
      component.openYearSelector();
      expect(component.isYearMode()).toBe(true);
      expect(component.isCalendarMode()).toBe(false);
      expect(component.isMonthMode()).toBe(false);
    });

    it('should select month and switch to calendar mode', () => {
      component.openMonthSelector();
      component.selectMonth(5);
      expect(component.isCalendarMode()).toBe(true);
      expect(component.currentMonth().getMonth()).toBe(5);
    });

    it('should select year and switch to calendar mode', () => {
      component.openYearSelector();
      component.selectYear(2030);
      expect(component.isCalendarMode()).toBe(true);
      expect(component.yearNumber()).toBe(2030);
    });

    it('monthsList should have 12 entries', () => {
      expect(component.monthsList.length).toBe(12);
      expect(component.monthsList[0]).toBe('Enero');
      expect(component.monthsList[11]).toBe('Diciembre');
    });

    it('yearsList should have 12 years', () => {
      expect(component.yearsList().length).toBe(12);
    });

    it('openYearSelector sets yearPageStart aligned to 12', () => {
      component.openYearSelector();
      const years = component.yearsList();
      expect(years[0] % 12).toBe(0);
    });
  });

  describe('select date - single mode', () => {
    it('should emit date when selecting a non-disabled day', () => {
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      const day = makeDay();
      component.selectDate(day);
      expect(spy).toHaveBeenCalledWith(day.date);
      expect(component.isOpen()).toBe(false);
    });

    it('should not select disabled date', () => {
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.selectDate(makeDay({ isDisabled: true }));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not select when component is disabled', () => {
      componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.selectDate(makeDay());
      expect(spy).not.toHaveBeenCalled();
    });

    it('should close calendar after selecting', () => {
      component.toggleCalendar();
      expect(component.isOpen()).toBe(true);
      component.selectDate(makeDay());
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('range selection', () => {
    beforeEach(() => {
      componentRef.setInput('rangeSelect', true);
      fixture.detectChanges();
    });

    it('should set start date on first click (no previous start)', () => {
      const spy = jest.spyOn(component.startDateChange, 'emit');
      const endSpy = jest.spyOn(component.endDateChange, 'emit');
      const d = new Date(2025, 0, 10);
      component.selectDate(makeDay({ date: d }));
      expect(spy).toHaveBeenCalledWith(d);
      expect(endSpy).toHaveBeenCalledWith(null);
    });

    it('should set end date when start already exists and click is after start', () => {
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      fixture.detectChanges();
      const endSpy = jest.spyOn(component.endDateChange, 'emit');
      const d = new Date(2025, 0, 20);
      component.selectDate(makeDay({ date: d }));
      expect(endSpy).toHaveBeenCalledWith(d);
    });

    it('should swap dates if second click is before start', () => {
      componentRef.setInput('startDate', new Date(2025, 0, 20));
      fixture.detectChanges();
      const startSpy = jest.spyOn(component.startDateChange, 'emit');
      const endSpy = jest.spyOn(component.endDateChange, 'emit');
      const d = new Date(2025, 0, 10);
      component.selectDate(makeDay({ date: d }));
      expect(startSpy).toHaveBeenCalledWith(d);
      expect(endSpy).toHaveBeenCalledWith(new Date(2025, 0, 20));
    });

    it('should restart range when both start and end exist', () => {
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      componentRef.setInput('endDate', new Date(2025, 0, 20));
      fixture.detectChanges();
      const startSpy = jest.spyOn(component.startDateChange, 'emit');
      const endSpy = jest.spyOn(component.endDateChange, 'emit');
      const d = new Date(2025, 0, 15);
      component.selectDate(makeDay({ date: d }));
      expect(startSpy).toHaveBeenCalledWith(d);
      expect(endSpy).toHaveBeenCalledWith(null);
    });

    it('should format range date correctly (start - end)', () => {
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      componentRef.setInput('endDate', new Date(2025, 0, 20));
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('10/01/2025 - 20/01/2025');
    });

    it('should show only start date when end is not set', () => {
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('10/01/2025');
    });

    it('should show placeholder when no range dates', () => {
      expect(component.formattedSelectedDate()).toBe('Select date');
    });

    it('should clear range dates', () => {
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      componentRef.setInput('endDate', new Date(2025, 0, 20));
      fixture.detectChanges();
      const startSpy = jest.spyOn(component.startDateChange, 'emit');
      const endSpy = jest.spyOn(component.endDateChange, 'emit');
      component.clearDate({ clicked: true });
      expect(startSpy).toHaveBeenCalledWith(null);
      expect(endSpy).toHaveBeenCalledWith(null);
    });

    it('should mark range start/end as selected in calendarDays', () => {
      const start = new Date(2025, 0, 10);
      const end = new Date(2025, 0, 15);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 1));
      componentRef.setInput('startDate', start);
      componentRef.setInput('endDate', end);
      fixture.detectChanges();
      const days = component.calendarDays();
      expect(
        days.find(d => d.date.getTime() === start.getTime())?.isSelected,
      ).toBe(true);
      expect(
        days.find(d => d.date.getTime() === end.getTime())?.isSelected,
      ).toBe(true);
    });

    it('should mark in-range dates between start and end', () => {
      const start = new Date(2025, 0, 10);
      const mid = new Date(2025, 0, 12);
      const end = new Date(2025, 0, 15);
      start.setHours(0, 0, 0, 0);
      mid.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 1));
      componentRef.setInput('startDate', start);
      componentRef.setInput('endDate', end);
      fixture.detectChanges();
      const midDay = component
        .calendarDays()
        .find(d => d.date.getTime() === mid.getTime());
      expect(midDay?.isInRange).toBe(true);
    });

    it('should NOT mark dates outside range as isInRange', () => {
      const start = new Date(2025, 0, 10);
      const outside = new Date(2025, 0, 20);
      const end = new Date(2025, 0, 15);
      start.setHours(0, 0, 0, 0);
      outside.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 1));
      componentRef.setInput('startDate', start);
      componentRef.setInput('endDate', end);
      fixture.detectChanges();
      const outsideDay = component
        .calendarDays()
        .find(d => d.date.getTime() === outside.getTime());
      expect(outsideDay?.isInRange).toBe(false);
    });

    it('should format range with MM/dd/yyyy format', () => {
      componentRef.setInput('dateFormat', 'MM/dd/yyyy');
      componentRef.setInput('startDate', new Date(2025, 0, 10));
      componentRef.setInput('endDate', new Date(2025, 0, 20));
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('01/10/2025 - 01/20/2025');
    });
  });

  describe('multi selection', () => {
    beforeEach(() => {
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();
    });

    it('should add date to selectedDates', () => {
      const spy = jest.spyOn(component.selectedDatesChange, 'emit');
      component.selectDate(makeDay({ date: new Date(2025, 0, 10) }));
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].length).toBe(1);
    });

    it('should remove existing date (toggle off)', () => {
      const existing = new Date(2025, 0, 10);
      existing.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDates', [existing]);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDatesChange, 'emit');
      component.selectDate(
        makeDay({ date: new Date(existing), isSelected: true }),
      );
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].length).toBe(0);
    });

    it('should sort dates after adding', () => {
      const d1 = new Date(2025, 0, 20);
      const d2 = new Date(2025, 0, 5);
      componentRef.setInput('selectedDates', [d1]);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDatesChange, 'emit');
      component.selectDate(makeDay({ date: d2 }));
      const result = spy.mock.calls[0][0];
      expect(result[0].getTime()).toBeLessThan(result[1].getTime());
    });

    it('should format multiple dates with dash separator', () => {
      componentRef.setInput('selectedDates', [
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
      ]);
      fixture.detectChanges();
      const formatted = component.formattedSelectedDate();
      expect(formatted).toContain('10/01/2025');
      expect(formatted).toContain('15/01/2025');
      expect(formatted).toContain(' - ');
    });

    it('should show placeholder when no dates selected', () => {
      expect(component.formattedSelectedDate()).toBe('Select date');
    });

    it('should clear multi dates', () => {
      componentRef.setInput('selectedDates', [new Date(2025, 0, 10)]);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDatesChange, 'emit');
      component.clearDate({ clicked: true });
      expect(spy).toHaveBeenCalledWith([]);
    });

    it('should mark multi-selected dates in calendarDays', () => {
      const d = new Date(2025, 0, 10);
      d.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 1));
      componentRef.setInput('selectedDates', [d]);
      fixture.detectChanges();
      const day = component
        .calendarDays()
        .find(dd => dd.date.getTime() === d.getTime());
      expect(day?.isSelected).toBe(true);
    });

    it('should NOT set isInRange for multi-select', () => {
      const d1 = new Date(2025, 0, 10);
      const d2 = new Date(2025, 0, 15);
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDate', new Date(2025, 0, 1));
      componentRef.setInput('selectedDates', [d1, d2]);
      fixture.detectChanges();
      const mid = new Date(2025, 0, 12);
      mid.setHours(0, 0, 0, 0);
      const midDay = component
        .calendarDays()
        .find(dd => dd.date.getTime() === mid.getTime());
      expect(midDay?.isInRange).toBe(false);
    });

    it('should format multi dates with MM/dd/yyyy', () => {
      componentRef.setInput('dateFormat', 'MM/dd/yyyy');
      componentRef.setInput('selectedDates', [new Date(2025, 0, 10)]);
      fixture.detectChanges();
      expect(component.formattedSelectedDate()).toBe('01/10/2025');
    });
  });

  describe('getDayClasses', () => {
    it('should return other-month class', () => {
      const c = component.getDayClasses(makeDay({ isCurrentMonth: false }));
      expect(c['dcx-datepicker__day--other-month']).toBe(true);
    });

    it('should return today class', () => {
      const c = component.getDayClasses(makeDay({ isToday: true }));
      expect(c['dcx-datepicker__day--today']).toBe(true);
    });

    it('should return selected class', () => {
      const c = component.getDayClasses(makeDay({ isSelected: true }));
      expect(c['dcx-datepicker__day--selected']).toBe(true);
    });

    it('should return in-range class', () => {
      const c = component.getDayClasses(makeDay({ isInRange: true }));
      expect(c['dcx-datepicker__day--in-range']).toBe(true);
    });

    it('should return disabled class', () => {
      const c = component.getDayClasses(makeDay({ isDisabled: true }));
      expect(c['dcx-datepicker__day--disabled']).toBe(true);
    });

    it('should return false for all when nothing special', () => {
      const c = component.getDayClasses(makeDay());
      expect(c['dcx-datepicker__day--other-month']).toBe(false);
      expect(c['dcx-datepicker__day--today']).toBe(false);
      expect(c['dcx-datepicker__day--selected']).toBe(false);
      expect(c['dcx-datepicker__day--disabled']).toBe(false);
    });
  });

  describe('goToToday', () => {
    it('should select today in single mode and close calendar', () => {
      component.toggleCalendar();
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.goToToday();
      expect(spy).toHaveBeenCalled();
      const emitted = spy.mock.calls[0][0] as Date;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expect(emitted.getTime()).toBe(today.getTime());
      expect(component.isOpen()).toBe(false);
    });

    it('should set today as range start in range mode', () => {
      componentRef.setInput('rangeSelect', true);
      fixture.detectChanges();
      const startSpy = jest.spyOn(component.startDateChange, 'emit');
      const endSpy = jest.spyOn(component.endDateChange, 'emit');
      component.goToToday();
      expect(startSpy).toHaveBeenCalled();
      expect(endSpy).toHaveBeenCalledWith(null);
    });

    it('should add today in multi mode if not already present', () => {
      componentRef.setInput('multiSelect', true);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDatesChange, 'emit');
      component.goToToday();
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].length).toBe(1);
    });

    it('should NOT add today in multi mode if already present', () => {
      componentRef.setInput('multiSelect', true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      componentRef.setInput('selectedDates', [today]);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDatesChange, 'emit');
      component.goToToday();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not select today if disabled by minDate', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      componentRef.setInput('minDate', tomorrow);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.goToToday();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not select today if disabled by maxDate', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      componentRef.setInput('maxDate', yesterday);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectedDateChange, 'emit');
      component.goToToday();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should navigate currentMonth to today', () => {
      component.nextMonth();
      component.nextMonth();
      const monthBefore = component.currentMonth().getMonth();
      component.goToToday();
      const today = new Date();
      expect(component.currentMonth().getMonth()).toBe(today.getMonth());
    });
  });

  describe('document click', () => {
    it('should not close when calendar is already closed', () => {
      expect(component.isOpen()).toBe(false);
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(component.isOpen()).toBe(false);
    });

    it('should close calendar on mousedown outside when open', () => {
      component.toggleCalendar();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
      const outside = document.createElement('div');
      document.body.appendChild(outside);
      const event = new MouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(event, 'target', { value: outside });
      document.dispatchEvent(event);
      expect(component.isOpen()).toBe(false);
      document.body.removeChild(outside);
    });
  });

  describe('display and labels', () => {
    it('should display Spanish weekdays', () => {
      expect(component.weekDays).toEqual([
        'Dom',
        'Lun',
        'Mar',
        'Mié',
        'Jue',
        'Vie',
        'Sáb',
      ]);
    });

    it('should show month name in Spanish', () => {
      componentRef.setInput('selectedDate', new Date(2025, 0, 15));
      fixture.detectChanges();
      expect(component.monthName()).toContain('enero');
      expect(component.yearNumber()).toBe(2025);
    });

    it('should have correct labels', () => {
      expect(component.labels.clearDate).toBe('Limpiar fecha');
      expect(component.labels.today).toBe('Hoy');
      expect(component.labels.goToToday).toBe('Ir a hoy');
      expect(component.labels.selectMonth).toBe('Selecciona mes');
      expect(component.labels.selectYear).toBe('Selecciona año');
      expect(component.labels.previous).toBe('Anterior');
      expect(component.labels.next).toBe('Siguiente');
    });

    it('currentMonth defaults to today when no selectedDate', () => {
      const now = new Date();
      expect(component.currentMonth().getMonth()).toBe(now.getMonth());
      expect(component.currentMonth().getFullYear()).toBe(now.getFullYear());
    });

    it('currentMonth uses selectedDate when set', () => {
      componentRef.setInput('selectedDate', new Date(2023, 5, 1));
      fixture.detectChanges();
      expect(component.currentMonth().getMonth()).toBe(5);
      expect(component.currentMonth().getFullYear()).toBe(2023);
    });
  });
});
