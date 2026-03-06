import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgDatePickerComponent } from './dcx-ng-datePicker.component';
import { ComponentRef } from '@angular/core';

describe('DcxNgDatePickerComponent', () => {
    let component: DcxNgDatePickerComponent;
    let fixture: ComponentFixture<DcxNgDatePickerComponent>;
    let componentRef: ComponentRef<DcxNgDatePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgDatePickerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgDatePickerComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display default placeholder when no date is selected', () => {
        expect(component.formattedSelectedDate()).toBe('Select date');
    });

    it('should display custom placeholder when set', () => {
        componentRef.setInput('placeholder', 'Selecciona fecha');
        fixture.detectChanges();

        expect(component.formattedSelectedDate()).toBe('Selecciona fecha');
    });

    it('should format selected date in Spanish', () => {
        const testDate = new Date(2025, 0, 15); // 15 enero 2025
        componentRef.setInput('selectedDate', testDate);
        fixture.detectChanges();

        expect(component.formattedSelectedDate()).toBe('15/01/2025');
    });

    it('should toggle calendar on click of input wrapper', () => {
        const wrapper = fixture.nativeElement.querySelector('.dcx-datepicker__input-wrapper');

        expect(component.isOpen()).toBe(false);

        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(true);

        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(false);
    });

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

    it('should show clear button when date is selected and not disabled', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        fixture.detectChanges();

        const clearButton = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        expect(clearButton).toBeTruthy();
    });

    it('should not show clear button when disabled', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        componentRef.setInput('disabled', true);
        fixture.detectChanges();

        const clearButton = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        expect(clearButton).toBeFalsy();
    });

    it('should emit null when clearDate is called', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        component.clearDate({ clicked: true });
        expect(emitSpy).toHaveBeenCalledWith(null);
    });

    it('should not emit when clearDate called while disabled', () => {
        componentRef.setInput('disabled', true);
        fixture.detectChanges();
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        component.clearDate({ clicked: true });
        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should generate 42 calendar days (6 weeks)', () => {
        const days = component.calendarDays();
        expect(days.length).toBe(42);
    });

    it('should navigate to previous month', () => {
        const initialMonth = component.currentMonth().getMonth();

        component.previousMonth();
        fixture.detectChanges();

        const newMonth = component.currentMonth().getMonth();
        expect(newMonth).toBe(initialMonth === 0 ? 11 : initialMonth - 1);
    });

    it('should navigate to next month', () => {
        const initialMonth = component.currentMonth().getMonth();

        component.nextMonth();
        fixture.detectChanges();

        const newMonth = component.currentMonth().getMonth();
        expect(newMonth).toBe(initialMonth === 11 ? 0 : initialMonth + 1);
    });

    it('should emit date when selecting a day', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        const testDate = new Date(2025, 0, 15);
        const day = {
            date: testDate,
            isCurrentMonth: true,
            isToday: false,
            isSelected: false,
            isDisabled: false
        };

        component.selectDate(day);

        expect(emitSpy).toHaveBeenCalledWith(testDate);
        expect(component.isOpen()).toBe(false);
    });

    it('should not select disabled date', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        const day = {
            date: new Date(2025, 0, 15),
            isCurrentMonth: true,
            isToday: false,
            isSelected: false,
            isDisabled: true
        };

        component.selectDate(day);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should disable dates before minDate', () => {
        const minDate = new Date(2025, 0, 10);
        minDate.setHours(0, 0, 0, 0);
        const testDate = new Date(2025, 0, 5);
        testDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        componentRef.setInput('minDate', minDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const disabledDay = days.find(d => d.date.getTime() === testDate.getTime());

        expect(disabledDay?.isDisabled).toBe(true);
    });

    it('should disable dates after maxDate', () => {
        const maxDate = new Date(2025, 0, 10);
        maxDate.setHours(0, 0, 0, 0);
        const testDate = new Date(2025, 0, 15);
        testDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', new Date(2025, 0, 8));
        componentRef.setInput('maxDate', maxDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const disabledDay = days.find(d => d.date.getTime() === testDate.getTime());

        expect(disabledDay?.isDisabled).toBe(true);
    });

    it('should mark today correctly', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const days = component.calendarDays();
        const todayDay = days.find(d => d.date.getTime() === today.getTime());

        expect(todayDay?.isToday).toBe(true);
    });

    it('should mark selected date correctly', () => {
        const selectedDate = new Date(2025, 0, 15);
        selectedDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', selectedDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const selectedDay = days.find(d => d.date.getTime() === selectedDate.getTime());

        expect(selectedDay?.isSelected).toBe(true);
    });

    it('should display Spanish weekdays', () => {
        expect(component.weekDays).toEqual(['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']);
    });

    it('should show month name in Spanish', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        fixture.detectChanges();

        const monthName = component.monthName();
        expect(monthName).toContain('enero');
        expect(component.yearNumber()).toBe(2025);
    });

    it('should close calendar via closeCalendar method', () => {
        component.toggleCalendar();
        expect(component.isOpen()).toBe(true);
        component.closeCalendar();
        expect(component.isOpen()).toBe(false);
    });

    it('should display calendar when open', () => {
        component.toggleCalendar();
        fixture.detectChanges();
        const calendar = fixture.nativeElement.querySelector('.dcx-datepicker__calendar');
        expect(calendar).toBeTruthy();
    });

    it('should not display calendar when closed', () => {
        fixture.detectChanges();
        const calendar = fixture.nativeElement.querySelector('.dcx-datepicker__calendar');
        expect(calendar).toBeFalsy();
    });
});

describe('DcxNgDatePickerComponent', () => {
    let component: DcxNgDatePickerComponent;
    let fixture: ComponentFixture<DcxNgDatePickerComponent>;
    let componentRef: ComponentRef<DcxNgDatePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgDatePickerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgDatePickerComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display default placeholder when no date is selected', () => {
        expect(component.formattedSelectedDate()).toBe('Select date');
    });

    it('should display custom placeholder when set', () => {
        componentRef.setInput('placeholder', 'Selecciona fecha');
        fixture.detectChanges();

        expect(component.formattedSelectedDate()).toBe('Selecciona fecha');
    });

    it('should format selected date in Spanish', () => {
        const testDate = new Date(2025, 0, 15); // 15 enero 2025
        componentRef.setInput('selectedDate', testDate);
        fixture.detectChanges();

        expect(component.formattedSelectedDate()).toBe('15/01/2025');
    });

    it('should toggle calendar on click of input wrapper', () => {
        const wrapper = fixture.nativeElement.querySelector('.dcx-datepicker__input-wrapper');

        expect(component.isOpen()).toBe(false);

        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(true);

        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(false);
    });

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

    it('should show clear button when date is selected and not disabled', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        fixture.detectChanges();

        const clearButton = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        expect(clearButton).toBeTruthy();
    });

    it('should not show clear button when disabled', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        componentRef.setInput('disabled', true);
        fixture.detectChanges();

        const clearButton = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        expect(clearButton).toBeFalsy();
    });

    it('should emit null when clear button is clicked', () => {
        const testDate = new Date(2025, 0, 15);
        componentRef.setInput('selectedDate', testDate);
        fixture.detectChanges();

        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        // The clear button is a dcx-ng-button component — click its inner <button>
        const clearButtonHost = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        const innerButton = clearButtonHost.querySelector('button');

        innerButton.click();

        expect(emitSpy).toHaveBeenCalledWith(null);
    });

    it('should not emit when clearDate called while disabled', () => {
        componentRef.setInput('disabled', true);
        fixture.detectChanges();
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        component.clearDate({ clicked: true });
        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should generate 42 calendar days (6 weeks)', () => {
        const days = component.calendarDays();
        expect(days.length).toBe(42);
    });

    it('should navigate to previous month', () => {
        const initialMonth = component.currentMonth().getMonth();

        component.previousMonth();
        fixture.detectChanges();

        const newMonth = component.currentMonth().getMonth();
        expect(newMonth).toBe(initialMonth === 0 ? 11 : initialMonth - 1);
    });

    it('should navigate to next month', () => {
        const initialMonth = component.currentMonth().getMonth();

        component.nextMonth();
        fixture.detectChanges();

        const newMonth = component.currentMonth().getMonth();
        expect(newMonth).toBe(initialMonth === 11 ? 0 : initialMonth + 1);
    });

    it('should emit date when selecting a day', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        const testDate = new Date(2025, 0, 15);
        const day = {
            date: testDate,
            isCurrentMonth: true,
            isToday: false,
            isSelected: false,
            isDisabled: false
        };

        component.selectDate(day);

        expect(emitSpy).toHaveBeenCalledWith(testDate);
        expect(component.isOpen()).toBe(false);
    });

    it('should not select disabled date', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        const day = {
            date: new Date(2025, 0, 15),
            isCurrentMonth: true,
            isToday: false,
            isSelected: false,
            isDisabled: true
        };

        component.selectDate(day);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should disable dates before minDate', () => {
        const minDate = new Date(2025, 0, 10);
        minDate.setHours(0, 0, 0, 0);
        const testDate = new Date(2025, 0, 5);
        testDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        componentRef.setInput('minDate', minDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const disabledDay = days.find(d => d.date.getTime() === testDate.getTime());

        expect(disabledDay?.isDisabled).toBe(true);
    });

    it('should disable dates after maxDate', () => {
        const maxDate = new Date(2025, 0, 10);
        maxDate.setHours(0, 0, 0, 0);
        const testDate = new Date(2025, 0, 15);
        testDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', new Date(2025, 0, 8));
        componentRef.setInput('maxDate', maxDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const disabledDay = days.find(d => d.date.getTime() === testDate.getTime());

        expect(disabledDay?.isDisabled).toBe(true);
    });

    it('should mark today correctly', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const days = component.calendarDays();
        const todayDay = days.find(d => d.date.getTime() === today.getTime());

        expect(todayDay?.isToday).toBe(true);
    });

    it('should mark selected date correctly', () => {
        const selectedDate = new Date(2025, 0, 15);
        selectedDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', selectedDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const selectedDay = days.find(d => d.date.getTime() === selectedDate.getTime());

        expect(selectedDay?.isSelected).toBe(true);
    });

    it('should display Spanish weekdays', () => {
        expect(component.weekDays).toEqual(['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']);
    });

    it('should show month name in Spanish', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        fixture.detectChanges();

        const monthName = component.monthName();
        expect(monthName).toContain('enero');
        expect(component.yearNumber()).toBe(2025);
    });

    it('should close calendar via closeCalendar method', () => {
        component.toggleCalendar();
        expect(component.isOpen()).toBe(true);
        component.closeCalendar();
        expect(component.isOpen()).toBe(false);
    });

    it('should display calendar when open', () => {
        component.toggleCalendar();
        fixture.detectChanges();
        const calendar = fixture.nativeElement.querySelector('.dcx-datepicker__calendar');
        expect(calendar).toBeTruthy();
    });

    it('should not display calendar when closed', () => {
        fixture.detectChanges();
        const calendar = fixture.nativeElement.querySelector('.dcx-datepicker__calendar');
        expect(calendar).toBeFalsy();
    });
});

describe('DcxNgDatePickerComponent', () => {
    let component: DcxNgDatePickerComponent;
    let fixture: ComponentFixture<DcxNgDatePickerComponent>;
    let componentRef: ComponentRef<DcxNgDatePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgDatePickerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgDatePickerComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display placeholder when no date is selected', () => {
        componentRef.setInput('placeholder', 'Selecciona fecha');
        fixture.detectChanges();

        expect(component.formattedSelectedDate()).toBe('Selecciona fecha');
    });

    it('should format selected date in Spanish', () => {
        const testDate = new Date(2025, 0, 15);
        componentRef.setInput('selectedDate', testDate);
        fixture.detectChanges();

        expect(component.formattedSelectedDate()).toBe('15/01/2025');
    });

    it('should toggle calendar on click', () => {
        const wrapper = fixture.nativeElement.querySelector('.dcx-datepicker__input-wrapper');

        expect(component.isOpen()).toBe(false);

        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(true);

        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(false);
    });

    it('should not toggle calendar when disabled', () => {
        componentRef.setInput('disabled', true);
        fixture.detectChanges();

        const wrapper = fixture.nativeElement.querySelector('.dcx-datepicker__input-wrapper');
        wrapper.click();
        fixture.detectChanges();

        expect(component.isOpen()).toBe(false);
    });

    it('should show clear button when date is selected and not disabled', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        fixture.detectChanges();

        let clearButton = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        expect(clearButton).toBeTruthy();

        componentRef.setInput('disabled', true);
        fixture.detectChanges();

        clearButton = fixture.nativeElement.querySelector('.dcx-datepicker__clear');
        expect(clearButton).toBeFalsy();
    });

    it('should emit null when clear button is clicked', () => {
        const testDate = new Date(2025, 0, 15);
        componentRef.setInput('selectedDate', testDate);
        fixture.detectChanges();

        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');

        component.clearDate({ clicked: true });

        expect(emitSpy).toHaveBeenCalledWith(null);
    });

    it('should generate 42 calendar days (6 weeks)', () => {
        const days = component.calendarDays();
        expect(days.length).toBe(42);
    });

    it('should navigate to previous month', () => {
        const initialMonth = component.currentMonth().getMonth();

        component.previousMonth();
        fixture.detectChanges();

        const newMonth = component.currentMonth().getMonth();
        expect(newMonth).toBe(initialMonth === 0 ? 11 : initialMonth - 1);
    });

    it('should navigate to next month', () => {
        const initialMonth = component.currentMonth().getMonth();

        component.nextMonth();
        fixture.detectChanges();

        const newMonth = component.currentMonth().getMonth();
        expect(newMonth).toBe(initialMonth === 11 ? 0 : initialMonth + 1);
    });

    it('should emit date when selecting a day', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        const testDate = new Date(2025, 0, 15);
        const day = {
            date: testDate,
            isCurrentMonth: true,
            isToday: false,
            isSelected: false,
            isDisabled: false
        };

        component.selectDate(day);

        expect(emitSpy).toHaveBeenCalledWith(testDate);
        expect(component.isOpen()).toBe(false);
    });

    it('should not select disabled date', () => {
        const emitSpy = jest.spyOn(component.selectedDateChange, 'emit');
        const day = {
            date: new Date(2025, 0, 15),
            isCurrentMonth: true,
            isToday: false,
            isSelected: false,
            isDisabled: true
        };

        component.selectDate(day);

        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should disable dates before minDate', () => {
        const minDate = new Date(2025, 0, 10);
        minDate.setHours(0, 0, 0, 0);
        const testDate = new Date(2025, 0, 5);
        testDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        componentRef.setInput('minDate', minDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const disabledDay = days.find(d => d.date.getTime() === testDate.getTime());

        expect(disabledDay?.isDisabled).toBe(true);
    });

    it('should disable dates after maxDate', () => {
        const maxDate = new Date(2025, 0, 10);
        maxDate.setHours(0, 0, 0, 0);
        const testDate = new Date(2025, 0, 15);
        testDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', new Date(2025, 0, 8));
        componentRef.setInput('maxDate', maxDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const disabledDay = days.find(d => d.date.getTime() === testDate.getTime());

        expect(disabledDay?.isDisabled).toBe(true);
    });

    it('should mark today correctly', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const days = component.calendarDays();
        const todayDay = days.find(d => d.date.getTime() === today.getTime());

        expect(todayDay?.isToday).toBe(true);
    });

    it('should mark selected date correctly', () => {
        const selectedDate = new Date(2025, 0, 15);
        selectedDate.setHours(0, 0, 0, 0);

        componentRef.setInput('selectedDate', selectedDate);
        fixture.detectChanges();

        const days = component.calendarDays();
        const selectedDay = days.find(d => d.date.getTime() === selectedDate.getTime());

        expect(selectedDay?.isSelected).toBe(true);
    });

    it('should display Spanish weekdays', () => {
        expect(component.weekDays).toEqual(['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']);
    });

    it('should show month name in Spanish', () => {
        componentRef.setInput('selectedDate', new Date(2025, 0, 15));
        fixture.detectChanges();

        const monthName = component.monthName();
        expect(monthName).toContain('enero');
        expect(component.yearNumber()).toBe(2025);
    });
});
