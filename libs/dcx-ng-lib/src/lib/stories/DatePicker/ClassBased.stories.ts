import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, Input, signal, computed } from '@angular/core';
import { DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { CommonModule } from '@angular/common';
import { DateFormat } from '../../core/interfaces/datePicker';

@Component({
  selector: 'dcx-ng-storybook-datepicker-wrapper',
  standalone: true,
  imports: [DcxNgDatePickerComponent, CommonModule],
  template: `
    <dcx-ng-date-picker
      [selectedDate]="_selectedDate()"
      [selectedDates]="_selectedDates()"
      [multiSelect]="_multiSelect()"
      [rangeSelect]="_rangeSelect()"
      [startDate]="_startDate()"
      [endDate]="_endDate()"
      [dateFormat]="_dateFormat()"
      (selectedDateChange)="onSelectedDateChange($event)"
      (selectedDatesChange)="onSelectedDatesChange($event)"
      (startDateChange)="onStartDateChange($event)"
      (endDateChange)="onEndDateChange($event)"
      [minDate]="_minDate()"
      [maxDate]="_maxDate()"
      [disabled]="_disabled()"
      [placeholder]="_placeholder()">
    </dcx-ng-date-picker>
    <div style="margin-top: 1rem;">
      <strong>{{ displayLabel() }}</strong>
      <span>{{ displayValue() }}</span>
    </div>
  `,
})
class StorybookDatePickerWrapperComponent {

  private _selectedDate = signal<Date | null>(null);
  private _selectedDates = signal<Date[]>([]);
  private _startDate = signal<Date | null>(null);
  private _endDate = signal<Date | null>(null);
  private _minDate = signal<Date | null>(null);
  private _maxDate = signal<Date | null>(null);
  private _disabled = signal(false);
  private _multiSelect = signal(false);
  private _rangeSelect = signal(false);
  private _dateFormat = signal<DateFormat>('dd/MM/yyyy');
  private _placeholder = signal('Selecciona una fecha');


  @Input()
  set selectedDate(value: string | Date | null) {
    this._selectedDate.set(parseDateInput(value));
  }
  get selectedDate() {
    return this._selectedDate();
  }

  @Input()
  set selectedDates(value: Date[]) {
    this._selectedDates.set(value || []);
  }
  get selectedDates() {
    return this._selectedDates();
  }

  @Input()
  set startDate(value: string | Date | null) {
    this._startDate.set(parseDateInput(value));
  }
  get startDate() {
    return this._startDate();
  }

  @Input()
  set endDate(value: string | Date | null) {
    this._endDate.set(parseDateInput(value));
  }
  get endDate() {
    return this._endDate();
  }

  @Input()
  set minDate(value: string | Date | null) {
    this._minDate.set(parseDateInput(value));
  }
  get minDate() {
    return this._minDate();
  }

  @Input()
  set maxDate(value: string | Date | null) {
    this._maxDate.set(parseDateInput(value));
  }
  get maxDate() {
    return this._maxDate();
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  get disabled() {
    return this._disabled();
  }

  @Input()
  set multiSelect(value: boolean) {
    this._multiSelect.set(value);
  }
  get multiSelect() {
    return this._multiSelect();
  }

  @Input()
  set rangeSelect(value: boolean) {
    this._rangeSelect.set(value);
  }
  get rangeSelect() {
    return this._rangeSelect();
  }

  @Input()
  set dateFormat(value: DateFormat) {
    this._dateFormat.set(value);
  }
  get dateFormat() {
    return this._dateFormat();
  }

  @Input()
  set placeholder(value: string) {
    this._placeholder.set(value);
  }
  get placeholder() {
    return this._placeholder();
  }


  readonly displayLabel = computed(() => {
    if (this._rangeSelect()) {
      return 'Rango seleccionado:';
    }

    if (this._multiSelect()) {
      return 'Fechas seleccionadas:';
    }

    return 'Fecha seleccionada:';
  });

  readonly displayValue = computed(() => {
    if (this._rangeSelect()) {
      return this.formattedRangeDates();
    }

    if (this._multiSelect()) {
      return this.formattedSelectedDates();
    }

    return this.formattedSelectedDate();
  });

  readonly formattedSelectedDate = computed(() => {
    const date = this._selectedDate();
    if (!date) return 'ninguna';
    return this.formatDateByFormat(date);
  });

  readonly formattedSelectedDates = computed(() => {
    const dates = this._selectedDates();
    if (!dates || dates.length === 0) return 'ninguna';
    return dates.map(date => this.formatDateByFormat(date)).join(' - ');
  });

  readonly formattedRangeDates = computed(() => {
    const start = this._startDate();
    const end = this._endDate();

    if (!start && !end) return 'ninguna';

    if (start && end) {
      return `${this.formatDateByFormat(start)} - ${this.formatDateByFormat(end)}`;
    }

    if (start) {
      return `${this.formatDateByFormat(start)} (selecciona fecha final)`;
    }

    return 'ninguna';
  });



  onSelectedDateChange(date: Date | null) {
    this._selectedDate.set(date);
  }

  onSelectedDatesChange(dates: Date[]) {
    this._selectedDates.set(dates);
  }

  onStartDateChange(date: Date | null) {
    this._startDate.set(date);
  }

  onEndDateChange(date: Date | null) {
    this._endDate.set(date);
  }



  private formatDateByFormat(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const format = this._dateFormat();

    switch (format) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'MM/dd/yyyy':
        return `${month}/${day}/${year}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }
}

function parseDateInput(value: string | Date | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  if (typeof value === 'string') {
    // Formato dd/mm/yyyy o dd-mm-yyyy
    const ddmmyyyy = value.match(/^\s*(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s*$/);
    if (ddmmyyyy) {
      const day = parseInt(ddmmyyyy[1], 10);
      const month = parseInt(ddmmyyyy[2], 10) - 1;
      const year = parseInt(ddmmyyyy[3], 10);
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      return isNaN(date.getTime()) ? null : date;
    }

    // Formato yyyy-mm-dd
    const yyyymmdd = value.match(/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/);
    if (yyyymmdd) {
      const year = parseInt(yyyymmdd[1], 10);
      const month = parseInt(yyyymmdd[2], 10) - 1;
      const day = parseInt(yyyymmdd[3], 10);
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      return isNaN(date.getTime()) ? null : date;
    }

    // Intento general
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
      control: { type: 'text' },
      description: 'Fecha seleccionada (modo simple - dd/mm/yyyy o yyyy-mm-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
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
      control: { type: 'text' },
      description: 'Fecha de inicio del rango (modo rango - dd/mm/yyyy o yyyy-mm-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
        defaultValue: { summary: 'null' },
      },
    },
    endDate: {
      name: 'endDate',
      control: { type: 'text' },
      description: 'Fecha de fin del rango (modo rango - dd/mm/yyyy o yyyy-mm-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
        defaultValue: { summary: 'null' },
      },
    },
    minDate: {
      name: 'minDate',
      control: { type: 'text' },
      description: 'Fecha mínima seleccionable (dd/mm/yyyy o yyyy-mm-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
        defaultValue: { summary: 'null' },
      },
    },
    maxDate: {
      name: 'maxDate',
      control: { type: 'text' },
      description: 'Fecha máxima seleccionable (dd/mm/yyyy o yyyy-mm-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
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
    minDate: '01/10/2025',
    maxDate: '31/10/2025',
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
    selectedDate: null,
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