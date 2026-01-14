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
  set selectedDate(value: string | null) {
    if (!value) {
      this._selectedDate = null;
    } else {
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      this._selectedDate = isNaN(date.getTime()) ? null : date;
    }
  }

  private _minDate: Date | null = null;
  @Input()
  get minDate(): Date | null {
    return this._minDate;
  }
  set minDate(value: string | null) {
    if (!value) {
      this._minDate = null;
    } else {
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      this._minDate = isNaN(date.getTime()) ? null : date;
    }
  }

  private _maxDate: Date | null = null;
  @Input()
  get maxDate(): Date | null {
    return this._maxDate;
  }
  set maxDate(value: string | null) {
    if (!value) {
      this._maxDate = null;
    } else {
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      this._maxDate = isNaN(date.getTime()) ? null : date;
    }
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
      control: 'text',
      description: 'Fecha seleccionada (YYYY-MM-DD)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    minDate: {
      name: 'minDate',
      control: 'text',
      description: 'Fecha mínima seleccionable (YYYY-MM-DD)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    maxDate: {
      name: 'maxDate',
      control: 'text',
      description: 'Fecha máxima seleccionable (YYYY-MM-DD)',
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
    placeholder: 'Selecciona una fecha',
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
