import { DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<DcxNgDatePickerComponent> = {
  title: 'DCXLibrary/DatePicker/ClassBased',
  component: DcxNgDatePickerComponent,
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
  tags: ['autodocs'],
  argTypes: {
    selectedDate: {
      control: 'date',
      description: 'Fecha seleccionada',
      table: { category: 'Attributes' }
    },
    placeholder: {
      control: 'text',
      description: 'Texto del placeholder',
      table: { category: 'Attributes' }
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
      table: { category: 'Attributes' }
    },
    minDate: {
      control: 'date',
      description: 'Fecha mínima seleccionable',
      table: { category: 'Attributes' }
    },
    maxDate: {
      control: 'date',
      description: 'Fecha máxima seleccionable',
      table: { category: 'Attributes' }
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgDatePickerComponent>;

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