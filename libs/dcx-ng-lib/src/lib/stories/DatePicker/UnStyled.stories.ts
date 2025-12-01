import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  selector: 'datepicker-unstyled-wrapper',
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
class DatePickerUnstyledWrapperComponent {
  @Input() selectedDate: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() disabled = false;
  @Input() placeholder = 'Select date';

  onDateChange(date: Date | null) {
    this.selectedDate = date;
    console.log('Date changed:', date);
  }
}

const meta: Meta<DatePickerUnstyledWrapperComponent> = {
  title: 'DCXLibrary/DatePicker/UnStyled',
  component: DatePickerUnstyledWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [DatePickerUnstyledWrapperComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePicker sin estilos: aspecto nativo del navegador, sin personalización visual.
        `,
      },
    },
  },
  argTypes: {
    selectedDate: {
      control: { type: 'date' },
      description: 'Fecha seleccionada',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    minDate: {
      control: { type: 'date' },
      description: 'Fecha mínima permitida',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    maxDate: {
      control: { type: 'date' },
      description: 'Fecha máxima permitida',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el componente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select date' },
      },
    },
  },
  args: {
    selectedDate: null,
    minDate: null,
    maxDate: null,
    disabled: false,
    placeholder: 'Select date',
  },
};

export default meta;
type Story = StoryObj<DatePickerUnstyledWrapperComponent>;

export const Default: Story = {
  args: {
    selectedDate: null,
    placeholder: 'Selecciona una fecha',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker básico sin estilos.'
      }
    }
  }
};
