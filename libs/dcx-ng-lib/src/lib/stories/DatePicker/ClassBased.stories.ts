import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { DateFormat, FirstDayOfWeek, DcxNgDatePickerComponent } from '@dcx-ng-components/dcx-ng-lib';

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseDateInput(value: string | Date | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const ddmmyyyy = value.match(/^\s*(\d{1,2})[/-](\d{1,2})[/-](\d{4})\s*$/);
  if (ddmmyyyy) {
    const date = new Date(
      parseInt(ddmmyyyy[3], 10),
      parseInt(ddmmyyyy[2], 10) - 1,
      parseInt(ddmmyyyy[1], 10),
    );
    date.setHours(0, 0, 0, 0);
    return isNaN(date.getTime()) ? null : date;
  }

  const yyyymmdd = value.match(/^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/);
  if (yyyymmdd) {
    const date = new Date(
      parseInt(yyyymmdd[1], 10),
      parseInt(yyyymmdd[2], 10) - 1,
      parseInt(yyyymmdd[3], 10),
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

/** Returns { min, max } as 'dd/MM/yyyy' strings for the current month. */
function currentMonthBounds(): { min: string; max: string } {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { min: fmtDDMMYYYY(first), max: fmtDDMMYYYY(last) };
}

// ── Wrapper component ─────────────────────────────────────────────────────────

@Component({
  selector: 'dcx-ng-storybook-datepicker-wrapper',
  standalone: true,
  imports: [DcxNgDatePickerComponent],
  template: `
    <dcx-ng-date-picker
      [selectedDate]="_selectedDate()"
      [selectedDates]="_selectedDates()"
      [multiSelect]="multiSelect()"
      [rangeSelect]="rangeSelect()"
      [startDate]="_startDate()"
      [endDate]="_endDate()"
      [dateFormat]="dateFormat()"
      (selectedDateChange)="handleSelectedDateChange($event)"
      (selectedDatesChange)="handleSelectedDatesChange($event)"
      (startDateChange)="handleStartDateChange($event)"
      (endDateChange)="handleEndDateChange($event)"
      [minDate]="_minDate()"
      [maxDate]="_maxDate()"
      [disabled]="disabled()"
      [placeholder]="placeholder()"
      [firstDayOfWeek]="firstDayOfWeek()"
    ></dcx-ng-date-picker>
    <div style="margin-top:1rem;font-size:13px;">
      <strong>{{ displayLabel() }}</strong>
      @if (multiSelect()) {
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;min-height:28px;max-height:96px;overflow-y:auto;overflow-x:hidden;">
          @for (chip of _chipDates(); track $index) {
            <span style="background:#eff6ff;color:#0058ab;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:600;white-space:nowrap;border:1px solid #bfdbfe;">
              {{ chip }}
            </span>
          }
          @if (_chipDates().length === 0) {
            <span style="color:#9ca3af;font-size:13px;">ninguna</span>
          }
        </div>
      } @else {
        <span>&nbsp;{{ displayValue() }}</span>
      }
    </div>
  `,
})
class StorybookDatePickerWrapperComponent {

  // ── Signal inputs — Storybook inyecta los args a través de estos signals ───

  readonly selectedDate  = input<string | Date | null>(null);
  readonly selectedDates = input<Date[]>([]);
  readonly startDate     = input<string | Date | null>(null);
  readonly endDate       = input<string | Date | null>(null);
  readonly minDate       = input<string | Date | null>(null);
  readonly maxDate       = input<string | Date | null>(null);
  readonly disabled      = input(false);
  readonly multiSelect   = input(false);
  readonly rangeSelect   = input(false);
  readonly dateFormat      = input<DateFormat>('dd/MM/yyyy');
  readonly placeholder     = input('Selecciona una fecha');
  readonly firstDayOfWeek  = input<FirstDayOfWeek>('monday');

  // ── Linked signals — mutables; se reinician al cambiar el input de Storybook

  readonly _selectedDate  = linkedSignal(() => parseDateInput(this.selectedDate()));
  readonly _selectedDates = linkedSignal<Date[]>(() => this.selectedDates());
  readonly _startDate     = linkedSignal(() => parseDateInput(this.startDate()));
  readonly _endDate       = linkedSignal(() => parseDateInput(this.endDate()));

  // Min/max solo se leen, sin override interno
  readonly _minDate = computed(() => parseDateInput(this.minDate()));
  readonly _maxDate = computed(() => parseDateInput(this.maxDate()));

  // Fechas formateadas para los chips del multiselect
  readonly _chipDates = computed(() => this._selectedDates().map(d => this._fmt(d)));

  // ── Display ───────────────────────────────────────────────────────────────

  readonly displayLabel = computed(() => {
    if (this.rangeSelect()) return 'Rango seleccionado:';
    if (this.multiSelect()) return 'Fechas seleccionadas:';
    return 'Fecha seleccionada:';
  });

  readonly displayValue = computed(() => {
    if (this.rangeSelect()) return this._fmtRange();
    if (this.multiSelect()) return this._fmtMulti();
    return this._fmtSingle();
  });

  private readonly _fmtSingle = computed(() => {
    const d = this._selectedDate();
    return d ? this._fmt(d) : 'ninguna';
  });

  private readonly _fmtMulti = computed(() => {
    const dates = this._selectedDates();
    if (!dates.length) return 'ninguna';
    return dates.map(d => this._fmt(d)).join(' · ');
  });

  private readonly _fmtRange = computed(() => {
    const start = this._startDate();
    const end   = this._endDate();
    if (!start && !end) return 'ninguna';
    if (start && end) return `${this._fmt(start)} – ${this._fmt(end)}`;
    if (start) return `${this._fmt(start)} (selecciona fecha final)`;
    return 'ninguna';
  });

  // ── Handlers de outputs ───────────────────────────────────────────────────

  handleSelectedDateChange(date: Date | null): void {
    this._selectedDate.set(date);
  }

  handleSelectedDatesChange(dates: Date[]): void {
    this._selectedDates.set(dates);
  }

  handleStartDateChange(date: Date | null): void {
    this._startDate.set(date);
  }

  handleEndDateChange(date: Date | null): void {
    this._endDate.set(date);
  }

  // ── Helpers privados ──────────────────────────────────────────────────────

  private _fmt(date: Date): string {
    const dd   = String(date.getDate()).padStart(2, '0');
    const mm   = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return this.dateFormat() === 'MM/dd/yyyy'
      ? `${mm}/${dd}/${yyyy}`
      : `${dd}/${mm}/${yyyy}`;
  }
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<StorybookDatePickerWrapperComponent> = {
  title: 'DCXLibrary/Components/DatePicker',
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
type Story = StoryObj<StorybookDatePickerWrapperComponent>;

// ── Valores por defecto dinámicos ─────────────────────────────────────────────

const { min: DEFAULT_MIN, max: DEFAULT_MAX } = currentMonthBounds();

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'dd/mm/yyyy',
    disabled:       false,
    minDate:        null,
    maxDate:        null,
    firstDayOfWeek: 'monday',
  },
};

export const Disabled: Story = {
  args: {
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'Selecciona una fecha',
    disabled:       true,
    minDate:        null,
    maxDate:        null,
    firstDayOfWeek: 'monday',
  },
};

export const WithMinAndMaxDate: Story = {
  args: {
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'Selecciona una fecha',
    disabled:       false,
    minDate:        DEFAULT_MIN,
    maxDate:        DEFAULT_MAX,
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
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    true,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'Selecciona varias fechas',
    disabled:       false,
    minDate:        null,
    maxDate:        null,
    firstDayOfWeek: 'monday',
  },
};

export const RangeSelect: Story = {
  args: {
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    true,
    startDate:      null,
    endDate:        null,
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'Selecciona un rango de fechas',
    disabled:       false,
    minDate:        null,
    maxDate:        null,
    firstDayOfWeek: 'monday',
  },
};

export const FormatMMDDYYYY: Story = {
  args: {
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'MM/dd/yyyy',
    placeholder:    'MM/dd/yyyy',
    disabled:       false,
    minDate:        null,
    maxDate:        null,
    firstDayOfWeek: 'monday',
  },
};

export const RangeWithBothDatesSelected: Story = {
  args: {
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    true,
    startDate:      '01/06/2026',
    endDate:        '15/06/2026',
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'Selecciona un rango',
    disabled:       false,
    minDate:        null,
    maxDate:        null,
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
    selectedDate:   '15/06/2026',
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'dd/MM/yyyy',
    placeholder:    'dd/mm/yyyy',
    disabled:       true,
    minDate:        null,
    maxDate:        null,
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
    selectedDate:   null,
    selectedDates:  [],
    multiSelect:    false,
    rangeSelect:    false,
    startDate:      null,
    endDate:        null,
    dateFormat:     'MM/dd/yyyy',
    placeholder:    'MM/dd/yyyy',
    disabled:       false,
    minDate:        null,
    maxDate:        null,
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
