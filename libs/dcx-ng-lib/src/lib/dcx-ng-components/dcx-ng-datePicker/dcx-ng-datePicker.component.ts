import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'dcx-ng-date-picker',
  standalone: true,
  templateUrl: './dcx-ng-datePicker.component.html',
  styleUrls: ['./dcx-ng-datePicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDatePickerComponent {
  readonly selectedDate = input<Date | null>(null);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input(false);
  readonly placeholder = input('Select date');

  readonly dateChange = output<Date | null>();

  // Estado interno del calendario
  private readonly _currentMonth = signal(new Date());
  private readonly _isOpen = signal(false);


  readonly currentMonth = computed(() => this._currentMonth());
  readonly isOpen = computed(() => this._isOpen());

  readonly monthName = computed(() => {
    const date = this.currentMonth();
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  });

  readonly formattedSelectedDate = computed(() => {
    const date = this.selectedDate();
    if (!date) return this.placeholder();
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  });

  readonly calendarDays = computed(() => {
    const currentMonth = this.currentMonth();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = this.selectedDate();
    const selectedTime = selected ? new Date(selected).setHours(0, 0, 0, 0) : null;

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      const dateTime = date.getTime();

      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: dateTime === today.getTime(),
        isSelected: selectedTime !== null && dateTime === selectedTime,
        isDisabled: this.isDateDisabled(date)
      });
    }

    return days;
  });

  readonly weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  constructor() {
    // Sincronizar mes actual cuando cambie la fecha seleccionada
    effect(() => {
      const selected = this.selectedDate();
      if (selected) {
        this._currentMonth.set(new Date(selected));
      }
    }, { allowSignalWrites: true });
  }


  toggleCalendar(): void {
    if (this.disabled()) return;
    this._isOpen.update(v => !v);
  }

  closeCalendar(): void {
    this._isOpen.set(false);
  }

  previousMonth(): void {
    this._currentMonth.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }

  nextMonth(): void {
    this._currentMonth.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled || this.disabled()) return;

    this.dateChange.emit(day.date);
    this.closeCalendar();
  }

  clearDate(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;

    this.dateChange.emit(null);
  }

  private isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();

    if (min && date < min) return true;
    if (max && date > max) return true;

    return false;
  }
}
