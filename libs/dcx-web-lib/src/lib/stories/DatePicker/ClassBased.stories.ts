import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { DateFormat, FirstDayOfWeek, DatePickerProps } from '../../core/interfaces';
import { DATEPICKER_SIMPLE_PROPS, DATEPICKER_DATE_PROPS } from '../../core/interfaces';
import '../../../index';

export type DatePickerStoryArgs = Omit<
  DatePickerProps,
  'selectedDate' | 'selectedDates' | 'startDate' | 'endDate' | 'minDate' | 'maxDate'
> & {
  selectedDate: Date | string | null;
  selectedDates: (Date | string)[];
  startDate: Date | string | null;
  endDate: Date | string | null;
  minDate: Date | string | null;
  maxDate: Date | string | null;
};


function parseDateInput(value: string | Date | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const ddmmyyyy = value.match(/^\s*(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s*$/);
  if (ddmmyyyy) {
    const date = new Date(
      parseInt(ddmmyyyy[3], 10),
      parseInt(ddmmyyyy[2], 10) - 1,
      parseInt(ddmmyyyy[1], 10)
    );
    date.setHours(0, 0, 0, 0);
    return isNaN(date.getTime()) ? null : date;
  }

  const yyyymmdd = value.match(/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/);
  if (yyyymmdd) {
    const date = new Date(
      parseInt(yyyymmdd[1], 10),
      parseInt(yyyymmdd[2], 10) - 1,
      parseInt(yyyymmdd[3], 10)
    );
    date.setHours(0, 0, 0, 0);
    return isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return isNaN(date.getTime()) ? null : date;
}

function fmtDDMMYYYY(date: Date): string {
  return [
    String(date.getDate()).padStart(2, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    date.getFullYear(),
  ].join('/');
}

function currentMonthBounds(): { min: string; max: string } {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { min: fmtDDMMYYYY(first), max: fmtDDMMYYYY(last) };
}


const renderDatePicker = (args: DatePickerStoryArgs) => {
  const container = document.createElement('div');

  const datepicker = document.createElement('dcx-web-datepicker');
  DATEPICKER_SIMPLE_PROPS.forEach((prop) => {
    (datepicker as any)[prop] = args[prop];
  });

  DATEPICKER_DATE_PROPS.forEach((prop) => {
    (datepicker as any)[prop] = parseDateInput(args[prop]);
  });

  datepicker.selectedDates = args.selectedDates ? args.selectedDates.map(parseDateInput).filter(Boolean) as Date[] : [];

  const displayDiv = document.createElement('div');
  displayDiv.style.marginTop = '1rem';
  displayDiv.style.fontSize = '13px';

  const fmt = (date: Date): string => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return datepicker.dateFormat === 'MM/dd/yyyy'
      ? `${mm}/${dd}/${yyyy}`
      : `${dd}/${mm}/${yyyy}`;
  };

  const updateDisplay = () => {
    let displayLabel = '';
    let displayContent = '';

    if (datepicker.rangeSelect) {
      displayLabel = 'Rango seleccionado:';
      if (!datepicker.startDate && !datepicker.endDate) {
        displayContent = ' ninguna';
      } else if (datepicker.startDate && datepicker.endDate) {
        displayContent = ` ${fmt(datepicker.startDate)} – ${fmt(datepicker.endDate)}`;
      } else if (datepicker.startDate) {
        displayContent = ` ${fmt(datepicker.startDate)} (selecciona fecha final)`;
      } else {
        displayContent = ' ninguna';
      }
    } else if (datepicker.multiSelect) {
      displayLabel = 'Fechas seleccionadas:';
      const dates = datepicker.selectedDates || [];
      if (dates.length === 0) {
        displayContent = ` <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;min-height:28px;max-height:96px;overflow-y:auto;overflow-x:hidden;"><span style="color:#9ca3af;font-size:13px;">ninguna</span></div>`;
      } else {
        const chipsHtml = dates.map(d => `<span style="background:#eff6ff;color:#0058ab;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:600;white-space:nowrap;border:1px solid #bfdbfe;">${fmt(d)}</span>`).join('');
        displayContent = ` <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;min-height:28px;max-height:96px;overflow-y:auto;overflow-x:hidden;">${chipsHtml}</div>`;
      }
    } else {
      displayLabel = 'Fecha seleccionada:';
      displayContent = ` ${datepicker.selectedDate ? fmt(datepicker.selectedDate) : 'ninguna'}`;
    }

    displayDiv.innerHTML = `<strong>${displayLabel}</strong>${datepicker.multiSelect ? displayContent : `<span>${displayContent}</span>`}`;
  };

  datepicker.addEventListener('selectedDateChange', (e: Event) => {
    const customEvent = e as CustomEvent<Date | null>;
    datepicker.selectedDate = customEvent.detail;
    updateDisplay();
  });

  datepicker.addEventListener('selectedDatesChange', (e: Event) => {
    const customEvent = e as CustomEvent<Date[]>;
    datepicker.selectedDates = customEvent.detail;
    updateDisplay();
  });

  datepicker.addEventListener('startDateChange', (e: Event) => {
    const customEvent = e as CustomEvent<Date | null>;
    datepicker.startDate = customEvent.detail;
    updateDisplay();
  });

  datepicker.addEventListener('endDateChange', (e: Event) => {
    const customEvent = e as CustomEvent<Date | null>;
    datepicker.endDate = customEvent.detail;
    updateDisplay();
  });

  updateDisplay();
  container.appendChild(datepicker);
  container.appendChild(displayDiv);

  return container;
};


const meta: Meta<DatePickerStoryArgs> = {
  title: 'DCXLibrary/WebComponents/DatePicker',
  component: 'dcx-web-datepicker',
  tags: ['autodocs'],
  render: renderDatePicker,
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePicker con estilos personalizados mediante clases CSS y tokens de diseño.
Incluye calendario popup, navegación por meses, validación de fechas min/max.

### Características
- Calendario interactivo con 42 días (6 semanas)
- Múltiples formatos de fecha (\`dd/MM/yyyy\`, \`MM/dd/yyyy\`)
- Validación de fechas mínimas y máximas
- Estado disabled
- Botón para limpiar selección
- Modo de selección simple, múltiple o por rango
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
      description: 'Fecha seleccionada (modo simple — dd/MM/yyyy o yyyy-MM-dd)',
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
      description: 'Fecha de inicio del rango (modo rango — dd/MM/yyyy o yyyy-MM-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
        defaultValue: { summary: 'null' },
      },
    },
    endDate: {
      name: 'endDate',
      control: { type: 'text' },
      description: 'Fecha de fin del rango (modo rango — dd/MM/yyyy o yyyy-MM-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
        defaultValue: { summary: 'null' },
      },
    },
    minDate: {
      name: 'minDate',
      control: { type: 'text' },
      description: 'Fecha mínima seleccionable (dd/MM/yyyy o yyyy-MM-dd)',
      table: {
        category: 'Atributos',
        type: { summary: 'Date | null | string' },
        defaultValue: { summary: 'null' },
      },
    },
    maxDate: {
      name: 'maxDate',
      control: { type: 'text' },
      description: 'Fecha máxima seleccionable (dd/MM/yyyy o yyyy-MM-dd)',
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
    firstDayOfWeek: {
      name: 'firstDayOfWeek',
      control: 'radio',
      options: ['monday', 'sunday'],
      description: 'Primer día de la semana. `monday` (estándar europeo/ISO) o `sunday` (anglosajón)',
      table: {
        category: 'Atributos',
        type: { summary: "'monday' | 'sunday'" },
        defaultValue: { summary: 'monday' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerStoryArgs>;


const { min: DEFAULT_MIN, max: DEFAULT_MAX } = currentMonthBounds();


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
    firstDayOfWeek: 'monday',
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
    firstDayOfWeek: 'monday',
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
    minDate: DEFAULT_MIN,
    maxDate: DEFAULT_MAX,
    firstDayOfWeek: 'monday',
  },
  parameters: {
    docs: {
      description: {
        story: `
Rango restringido al **mes en curso**.
Por defecto \`minDate\` es el primer día del mes y \`maxDate\` el último.
Puedes editar los controles \`minDate\` y \`maxDate\` para cambiar el rango (formato \`dd/MM/yyyy\`).
        `,
      },
    },
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
    firstDayOfWeek: 'monday',
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
    firstDayOfWeek: 'monday',
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
    firstDayOfWeek: 'monday',
  },
};

export const RangeWithBothDatesSelected: Story = {
  args: {
    selectedDate: null,
    selectedDates: [],
    multiSelect: false,
    rangeSelect: true,
    startDate: '01/06/2026',
    endDate: '15/06/2026',
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'Selecciona un rango',
    disabled: false,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rango de fechas con inicio y fin pre-seleccionados. Los días intermedios se muestran en azul claro (in-range).',
      },
    },
  },
};

export const DisabledWithSelectedDate: Story = {
  args: {
    selectedDate: '15/06/2026',
    selectedDates: [],
    multiSelect: false,
    rangeSelect: false,
    startDate: null,
    endDate: null,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'dd/mm/yyyy',
    disabled: true,
    minDate: null,
    maxDate: null,
    firstDayOfWeek: 'monday',
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado deshabilitado con una fecha ya seleccionada. El campo muestra el valor pero no puede abrirse.',
      },
    },
  },
};

export const AngloSaxon: Story = {
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
    firstDayOfWeek: 'sunday',
  },
  parameters: {
    docs: {
      description: {
        story: `
Calendario **anglosajón**: la semana empieza en **domingo** (Dom → Sáb).
El formato de fecha también es \`MM/dd/yyyy\` para reflejar la convención norteamericana.
Cambia el control \`firstDayOfWeek\` a \`monday\` para volver al estándar europeo/ISO.
        `,
      },
    },
  },
};
