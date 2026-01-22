import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { CommonModule } from '@angular/common';
import { DateFormat } from '../../core/interfaces/datePicker';


@Component({
  selector: 'dcx-ng-storybook-datepicker-wrapper',
  standalone: true,
  imports: [DcxNgDatePickerComponent, CommonModule],
  template: `
    <dcx-ng-date-picker
      [selectedDate]="selectedDate"
      [selectedDates]="selectedDates"
      [multiSelect]="multiSelect"
      [rangeSelect]="rangeSelect"
      [startDate]="startDate"
      [endDate]="endDate"
      [dateFormat]="dateFormat"
      (selectedDateChange)="onSelectedDateChange($event)"
      (selectedDatesChange)="onSelectedDatesChange($event)"
      (startDateChange)="onStartDateChange($event)"
      (endDateChange)="onEndDateChange($event)"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled]="disabled"
      [placeholder]="placeholder">
    </dcx-ng-date-picker>
    <div style="margin-top: 1rem;">
      <strong>
        {{ rangeSelect ? 'Rango' : (multiSelect ? 'Fechas' : 'Fecha') }} seleccionada{{ (multiSelect || rangeSelect) ? 's' : '' }}:
      </strong>
      <span>{{ rangeSelect ? formattedRangeDates : (multiSelect ? formattedSelectedDates : formattedSelectedDate) }}</span>
    </div>
  `,
})
class StorybookDatePickerWrapperComponent {
  private _selectedDate: Date | null = null;
  @Input()
  get selectedDate(): Date | null {
    return this._selectedDate;
  }
  set selectedDate(value: string | Date | null) {
    this._selectedDate = parseDateInput(value);
  }

  private _selectedDates: Date[] = [];
  @Input()
  get selectedDates(): Date[] {
    return this._selectedDates;
  }
  set selectedDates(value: Date[]) {
    this._selectedDates = value || [];
  }

  private _startDate: Date | null = null;
  @Input()
  get startDate(): Date | null {
    return this._startDate;
  }
  set startDate(value: string | Date | null) {
    this._startDate = parseDateInput(value);
  }

  private _endDate: Date | null = null;
  @Input()
  get endDate(): Date | null {
    return this._endDate;
  }
  set endDate(value: string | Date | null) {
    this._endDate = parseDateInput(value);
  }

  private _minDate: Date | null = null;
  @Input()
  get minDate(): Date | null {
    return this._minDate;
  }
  set minDate(value: string | Date | null) {
    this._minDate = parseDateInput(value);
  }

  private _maxDate: Date | null = null;
  @Input()
  get maxDate(): Date | null {
    return this._maxDate;
  }
  set maxDate(value: string | Date | null) {
    this._maxDate = parseDateInput(value);
  }

  @Input() disabled = false;
  @Input() multiSelect = false;
  @Input() rangeSelect = false;
  @Input() dateFormat: DateFormat = 'dd/MM/yyyy';
  @Input() placeholder = 'Selecciona una fecha';
  @Output() selectedDateChange = new EventEmitter<Date | null>();
  @Output() selectedDatesChange = new EventEmitter<Date[]>();
  @Output() startDateChange = new EventEmitter<Date | null>();
  @Output() endDateChange = new EventEmitter<Date | null>();

  onSelectedDateChange(date: Date | null) {
    this.selectedDate = date as any;
    this.selectedDateChange.emit(date);
  }

  onSelectedDatesChange(dates: Date[]) {
    this.selectedDates = dates;
    this.selectedDatesChange.emit(dates);
  }

  onStartDateChange(date: Date | null) {
    this.startDate = date as any;
    this.startDateChange.emit(date);
  }

  onEndDateChange(date: Date | null) {
    this.endDate = date as any;
    this.endDateChange.emit(date);
  }

  private formatDateByFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const yearShort = year.toString().slice(-2);

    switch (this.dateFormat) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'MM/dd/yyyy':
        return `${month}/${day}/${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }

  get formattedSelectedDate(): string {
    if (!this.selectedDate) return 'ninguna';
    return this.formatDateByFormat(this.selectedDate);
  }

  get formattedSelectedDates(): string {
    if (!this.selectedDates || this.selectedDates.length === 0) return 'ninguna';
    return this.selectedDates
      .map(date => this.formatDateByFormat(date))
      .join(' - ');
  }

  get formattedRangeDates(): string {
    if (!this.startDate && !this.endDate) return 'ninguna';

    if (this.startDate && this.endDate) {
      return `${this.formatDateByFormat(this.startDate)} - ${this.formatDateByFormat(this.endDate)}`;
    } else if (this.startDate) {
      return `${this.formatDateByFormat(this.startDate)} (selecciona fecha final)`;
    }
    return 'ninguna';
  }
}

function parseDateInput(value: string | Date | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string') {
    const ddmmyyyy = value.match(/^\s*(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s*$/);
    if (ddmmyyyy) {
      const day = parseInt(ddmmyyyy[1], 10);
      const month = parseInt(ddmmyyyy[2], 10) - 1;
      const year = parseInt(ddmmyyyy[3], 10);
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      return isNaN(date.getTime()) ? null : date;
    }

    const yyyymmdd = value.match(/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/);
    if (yyyymmdd) {
      const year = parseInt(yyyymmdd[1], 10);
      const month = parseInt(yyyymmdd[2], 10) - 1;
      const day = parseInt(yyyymmdd[3], 10);
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      return isNaN(date.getTime()) ? null : date;
    }

    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

const meta: Meta<StorybookDatePickerWrapperComponent> = {
  title: 'DCXLibrary/DatePicker/ClassBased',
  component: StorybookDatePickerWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StorybookDatePickerWrapperComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePicker con estilos personalizados mediante clases CSS. 
Incluye calendario popup, navegación por meses, validación de fechas min/max.

### Características
- Calendario interactivo con 42 días (6 semanas)
- Múltiples formatos de fecha (dd/MM/yyyy, MM/dd/yyyy)
- Validación de fechas mínimas y máximas
- Estado disabled
- Botón para limpiar selección
- Modo de selección simple, múltiple o por rango
- Visualización de múltiples fechas separadas por guiones
- Selección de rango con visualización de fechas intermedias
        `,
      },
    },
  },
  argTypes: {
    dateFormat: {
      name: 'dateFormat',
      control: 'select',
      options: ['dd/MM/yyyy', 'MM/dd/yyyy'],
      description: 'Formato de visualización de la fecha',
      table: {
        category: 'Atributos',
        type: { summary: 'DateFormat' },
        defaultValue: { summary: 'dd/MM/yyyy' },
      },
    },
    multiSelect: {
      name: 'multiSelect',
      control: 'boolean',
      description: 'Activa el modo de selección múltiple',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rangeSelect: {
      name: 'rangeSelect',
      control: 'boolean',
      description: 'Activa el modo de selección de rango',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectedDate: {
      name: 'selectedDate',
      control: { type: 'text', placeholder: 'dd/mm/yyyy' },
      description: 'Fecha seleccionada (modo simple - dd/mm/yyyy)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    selectedDates: {
      name: 'selectedDates',
      control: 'object',
      description: 'Fechas seleccionadas (modo múltiple)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date[]' },
        defaultValue: { summary: '[]' },
      },
    },
    startDate: {
      name: 'startDate',
      control: { type: 'text', placeholder: 'dd/mm/yyyy' },
      description: 'Fecha de inicio del rango (modo rango)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    endDate: {
      name: 'endDate',
      control: { type: 'text', placeholder: 'dd/mm/yyyy' },
      description: 'Fecha de fin del rango (modo rango)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    minDate: {
      name: 'minDate',
      control: { type: 'text', placeholder: 'dd/mm/yyyy' },
      description: 'Fecha mínima seleccionable (dd/mm/yyyy)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    maxDate: {
      name: 'maxDate',
      control: { type: 'text', placeholder: 'dd/mm/yyyy' },
      description: 'Fecha máxima seleccionable (dd/mm/yyyy)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    placeholder: {
      name: 'placeholder',
      control: 'text',
      description: 'Texto del placeholder',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Selecciona una fecha' },
      },
    },
    disabled: {
      name: 'disabled',
      control: 'boolean',
      description: 'Estado deshabilitado',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectedDateChange: {
      name: 'selectedDateChange',
      action: 'selectedDateChange',
      description: 'Se emite al seleccionar una fecha o limpiar (modo simple)',
      table: {
        category: 'Eventos',
        type: { summary: '(date: Date | null) => void' },
        defaultValue: { summary: '-' },
      },
    },
    selectedDatesChange: {
      name: 'selectedDatesChange',
      action: 'selectedDatesChange',
      description: 'Se emite al seleccionar/deseleccionar fechas (modo múltiple)',
      table: {
        category: 'Eventos',
        type: { summary: '(dates: Date[]) => void' },
        defaultValue: { summary: '-' },
      },
    },
    startDateChange: {
      name: 'startDateChange',
      action: 'startDateChange',
      description: 'Se emite al seleccionar la fecha de inicio (modo rango)',
      table: {
        category: 'Eventos',
        type: { summary: '(date: Date | null) => void' },
        defaultValue: { summary: '-' },
      },
    },
    endDateChange: {
      name: 'endDateChange',
      action: 'endDateChange',
      description: 'Se emite al seleccionar la fecha de fin (modo rango)',
      table: {
        category: 'Eventos',
        type: { summary: '(date: Date | null) => void' },
        defaultValue: { summary: '-' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StorybookDatePickerWrapperComponent>;

export const Default: Story = {
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'dd/mm/yyyy',
    disabled: false,
    minDate: null,
    maxDate: null,
  },
};

export const Disabled: Story = {
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona una fecha',
    disabled: true,
    minDate: null,
    maxDate: null,
  },
};

export const WithMinAndMaxDate: Story = {
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona una fecha',
    disabled: false,
    minDate: new Date(2025, 9, 1),
    maxDate: new Date(2025, 10, 31),
  },
};

export const MultiSelect: Story = {
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: true,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona varias fechas',
    disabled: false,
    minDate: null,
    maxDate: null,
  },
};

export const RangeSelect: Story = {
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: true,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona un rango de fechas',
    disabled: false,
    minDate: null,
    maxDate: null,
  },
};

export const FormatMMDDYYYY: Story = {
  args: {
    selectedDate: new Date(2026, 0, 15),
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'MM/dd/yyyy',
    disabled: false,
    minDate: null,
    maxDate: null,
  },
};