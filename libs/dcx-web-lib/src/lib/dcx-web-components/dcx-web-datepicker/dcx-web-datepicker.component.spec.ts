import './dcx-web-datepicker.component';
import { DcxWebDatePicker } from './dcx-web-datepicker.component';
import { makeDay } from '../../core/fixtures';

describe('DcxWebDatePicker', () => {
  let element: DcxWebDatePicker;

  beforeEach(async () => {
    element = document.createElement('dcx-web-datepicker') as DcxWebDatePicker;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebDatePicker);
  });

  describe('placeholder and formatting', () => {
    it('should display default placeholder when no date is selected', () => {
      expect(element.formattedSelectedDate).toBe('Select date');
    });

    it('should display custom placeholder when set', async () => {
      element.placeholder = 'Selecciona fecha';
      await element.updateComplete;
      expect(element.formattedSelectedDate).toBe('Selecciona fecha');
    });

    it('should format selected date as dd/MM/yyyy by default', async () => {
      element.selectedDate = new Date(2025, 0, 15);
      await element.updateComplete;
      expect(element.formattedSelectedDate).toBe('15/01/2025');
    });

    it('should format selected date as MM/dd/yyyy when dateFormat is set', async () => {
      element.selectedDate = new Date(2025, 0, 15);
      element.dateFormat = 'MM/dd/yyyy';
      await element.updateComplete;
      expect(element.formattedSelectedDate).toBe('01/15/2025');
    });
  });

  describe('toggle calendar', () => {
    it('should toggle calendar via toggleCalendar method', async () => {
      expect(element.isOpen).toBe(false);
      element.toggleCalendar();
      await element.updateComplete;
      expect(element.isOpen).toBe(true);
      element.toggleCalendar();
      await element.updateComplete;
      expect(element.isOpen).toBe(false);
    });

    it('should not toggle calendar when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      element.toggleCalendar();
      await element.updateComplete;
      expect(element.isOpen).toBe(false);
    });

    it('should toggle calendar on click of input wrapper', async () => {
      expect(element.isOpen).toBe(false);
      const wrapper = element.shadowRoot?.querySelector('.dcx-datepicker__input-wrapper') as HTMLElement;
      wrapper?.click();
      await element.updateComplete;
      expect(element.isOpen).toBe(true);
      wrapper?.click();
      await element.updateComplete;
      expect(element.isOpen).toBe(false);
    });

    it('should close calendar via closeCalendar method', async () => {
      element.toggleCalendar();
      await element.updateComplete;
      expect(element.isOpen).toBe(true);
      element.closeCalendar();
      await element.updateComplete;
      expect(element.isOpen).toBe(false);
    });

    it('should reset mode to calendar on close', async () => {
      element.toggleCalendar();
      await element.updateComplete;
      element.openMonthSelector();
      await element.updateComplete;
      expect(element.isMonthMode).toBe(true);
      element.closeCalendar();
      await element.updateComplete;
      expect(element.isCalendarMode).toBe(true);
    });
  });

  describe('clear button', () => {
    it('should show clear button when date is selected and not disabled', async () => {
      element.selectedDate = new Date(2025, 0, 15);
      await element.updateComplete;
      expect(element.showClearButton).toBe(true);
    });

    it('should not show clear button when disabled', async () => {
      element.selectedDate = new Date(2025, 0, 15);
      element.disabled = true;
      await element.updateComplete;
      expect(element.showClearButton).toBe(false);
    });

    it('should not show clear button when no date selected', () => {
      expect(element.showClearButton).toBe(false);
    });

    it('should emit null when clearDate is called (single)', async () => {
      const spy = jest.fn();
      element.addEventListener('selectedDateChange', spy);
      element.clearDate(new Event('click'));
      expect(spy).toHaveBeenCalled();
      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toBeNull();
    });

    it('should not clear when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      const spy = jest.fn();
      element.addEventListener('selectedDateChange', spy);
      element.clearDate(new Event('click'));
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('calendar days', () => {
    it('should generate 42 calendar days (6 weeks)', () => {
      expect(element.calendarDays.length).toBe(42);
    });

    it('should mark today correctly', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayDay = element.calendarDays.find(d => d.date.getTime() === today.getTime());
      expect(todayDay?.isToday).toBe(true);
    });

    it('should mark selected date correctly', async () => {
      const sel = new Date(2025, 0, 15);
      sel.setHours(0, 0, 0, 0);
      element.selectedDate = sel;
      await element.updateComplete;
      const day = element.calendarDays.find(d => d.date.getTime() === sel.getTime());
      expect(day?.isSelected).toBe(true);
    });

    it('should disable dates before minDate', async () => {
      element.selectedDate = new Date(2025, 0, 15);
      const min = new Date(2025, 0, 10);
      min.setHours(0, 0, 0, 0);
      const test = new Date(2025, 0, 5);
      test.setHours(0, 0, 0, 0);
      element.minDate = min;
      await element.updateComplete;
      const day = element.calendarDays.find(d => d.date.getTime() === test.getTime());
      expect(day?.isDisabled).toBe(true);
    });

    it('should disable dates after maxDate', async () => {
      element.selectedDate = new Date(2025, 0, 8);
      const max = new Date(2025, 0, 10);
      max.setHours(0, 0, 0, 0);
      const test = new Date(2025, 0, 15);
      test.setHours(0, 0, 0, 0);
      element.maxDate = max;
      await element.updateComplete;
      const day = element.calendarDays.find(d => d.date.getTime() === test.getTime());
      expect(day?.isDisabled).toBe(true);
    });
  });

  describe('navigation', () => {
    it('should navigate to previous month', async () => {
      element.selectedDate = new Date(2025, 2, 15); // March
      await element.updateComplete;
      const initial = element.currentMonth.getMonth();
      element.previousMonth();
      await element.updateComplete;
      expect(element.currentMonth.getMonth()).toBe(initial === 0 ? 11 : initial - 1);
    });

    it('should navigate to next month', async () => {
      element.selectedDate = new Date(2025, 2, 15); // March
      await element.updateComplete;
      const initial = element.currentMonth.getMonth();
      element.nextMonth();
      await element.updateComplete;
      expect(element.currentMonth.getMonth()).toBe(initial === 11 ? 0 : initial + 1);
    });
  });

  describe('month and year selectors', () => {
    it('should open month selector', async () => {
      element.openMonthSelector();
      await element.updateComplete;
      expect(element.isMonthMode).toBe(true);
      expect(element.isCalendarMode).toBe(false);
      expect(element.isYearMode).toBe(false);
    });

    it('should open year selector', async () => {
      element.openYearSelector();
      await element.updateComplete;
      expect(element.isYearMode).toBe(true);
      expect(element.isCalendarMode).toBe(false);
      expect(element.isMonthMode).toBe(false);
    });
  });

  describe('select date - single mode', () => {
    it('should emit date when selecting a non-disabled day', async () => {
      const spy = jest.fn();
      element.addEventListener('selectedDateChange', spy);
      const day = makeDay({ date: new Date(2025, 0, 15) });
      element.selectDate(day);
      expect(spy).toHaveBeenCalled();
      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.getTime()).toBe(day.date.getTime());
    });

    it('should not select disabled date', async () => {
      const spy = jest.fn();
      element.addEventListener('selectedDateChange', spy);
      element.selectDate(makeDay({ isDisabled: true }));
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('range selection', () => {
    beforeEach(async () => {
      element.rangeSelect = true;
      await element.updateComplete;
    });

    it('should set start date on first click', async () => {
      const spy = jest.fn();
      element.addEventListener('startDateChange', spy);
      const d = new Date(2025, 0, 10);
      element.selectDate(makeDay({ date: d }));
      expect(spy).toHaveBeenCalled();
      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.getTime()).toBe(d.getTime());
    });

    it('should set end date when start already exists and click is after start', async () => {
      element.startDate = new Date(2025, 0, 10);
      await element.updateComplete;
      const endSpy = jest.fn();
      element.addEventListener('endDateChange', endSpy);
      const d = new Date(2025, 0, 20);
      element.selectDate(makeDay({ date: d }));
      expect(endSpy).toHaveBeenCalled();
      const event = endSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.getTime()).toBe(d.getTime());
    });
  });

  describe('multi selection', () => {
    beforeEach(async () => {
      element.multiSelect = true;
      await element.updateComplete;
    });

    it('should add date to selectedDates', async () => {
      const spy = jest.fn();
      element.addEventListener('selectedDatesChange', spy);
      element.selectDate(makeDay({ date: new Date(2025, 0, 10) }));
      expect(spy).toHaveBeenCalled();
      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.detail.length).toBe(1);
    });
  });
});
