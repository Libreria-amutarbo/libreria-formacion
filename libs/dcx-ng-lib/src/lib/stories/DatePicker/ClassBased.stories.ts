import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-storybook-datepicker-wrapper',
  standalone: true,
  imports: [DcxNgDatePickerComponent, CommonModule],
  template: `
    <dcx-ng-date-picker
      [selectedDate]="selectedDate"
      (selectedDateChange)="onSelectedDateChange($event)"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled]="disabled"
      [placeholder]="placeholder">
    </dcx-ng-date-picker>
    <div style="margin-top: 1rem;">
      <strong>Fecha seleccionada:</strong>
      <span>{{ formattedSelectedDate }}</span>
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
  @Input() placeholder = 'Selecciona una fecha';
  @Output() selectedDateChange = new EventEmitter<Date | null>();

  onSelectedDateChange(date: Date | null) {
    this.selectedDate = date as any;
    this.selectedDateChange.emit(date);
  }

  get formattedSelectedDate(): string {
    return this.selectedDate
      ? this.selectedDate.toLocaleDateString('es-ES')
      : 'ninguna';
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
- Formato español (dd/mm/yyyy)
- Validación de fechas mínimas y máximas
- Estado disabled
- Botón para limpiar selección
        `,
      },
    },
  },
  argTypes: {
    selectedDate: {
      name: 'selectedDate',
      control: { type: 'text', placeholder: 'dd/mm/yyyy' },
      description: 'Fecha seleccionada (dd/mm/yyyy)',
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
      description: 'Se emite al seleccionar una fecha o limpiar',
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
    placeholder: 'dd/mm/yyyy',
    disabled: false,
    minDate: null,
    maxDate: null,
  },
};

export const Disabled: Story = {
  args: {
    selectedDate: null,
    placeholder: 'Selecciona una fecha',
    disabled: true,
    minDate: null,
    maxDate: null,
  },
};

export const WithMinAndMaxDate: Story = {
  args: {
    selectedDate: null,
    placeholder: 'Selecciona una fecha',
    disabled: false,
    minDate: new Date(2025, 9, 1),
    maxDate: new Date(2025, 10, 31),
  },
};
