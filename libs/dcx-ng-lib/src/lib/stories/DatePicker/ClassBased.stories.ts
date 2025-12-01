import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  selector: 'datepicker-wrapper',
  standalone: true,
  imports: [DcxNgDatePickerComponent, CommonModule],
  template: `
    <div style="min-width: 320px;">
      <dcx-ng-date-picker
        [selectedDate]="selectedDate"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [disabled]="disabled"
        [placeholder]="placeholder"
        (dateChange)="onDateChange($event)">
      </dcx-ng-date-picker>
    </div>
  `,
})
class DatePickerWrapperComponent {
  @Input() selectedDate: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() disabled = false;
  @Input() placeholder = 'Selecciona una fecha';

  onDateChange(date: Date | null) {
    this.selectedDate = date;
  }
}

const meta: Meta<DatePickerWrapperComponent> = {
  title: 'DCXLibrary/DatePicker/ClassBased',
  component: DatePickerWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [DatePickerWrapperComponent],
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
      control: 'date',
      description: 'Fecha seleccionada',
    },
    placeholder: {
      control: 'text',
      description: 'Texto del placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
    minDate: {
      control: 'date',
      description: 'Fecha mínima seleccionable',
    },
    maxDate: {
      control: 'date',
      description: 'Fecha máxima seleccionable',
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerWrapperComponent>;

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