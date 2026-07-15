import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import {
  buildCalendarDemoEvents,
  DcxNgCalendarComponent,
} from '@dcx-ng-components/dcx-ng-lib';

const meta = {
  title: 'DCXLibrary/Components/Calendar',
  component: DcxNgCalendarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    view: {
      control: 'select',
      options: ['month', 'week', 'year', 'mini'],
      description: 'Vista activa del calendario.',
      table: {
        category: 'Atributos',
        type: { summary: `'month' | 'week' | 'year' | 'mini'` },
        defaultValue: { summary: 'month' },
      },
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'range'],
      description: 'Modo de selección.',
      table: {
        category: 'Atributos',
        type: { summary: `'none' | 'single' | 'range'` },
        defaultValue: { summary: 'none' },
      },
    },
    activeDate: {
      control: 'date',
      description: 'Fecha base visible del calendario.',
      table: {
        category: 'Atributos',
        type: { summary: 'Date' },
      },
    },
    events: {
      control: false,
      description: 'Listado de eventos a renderizar.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxCalendarEvent[]' },
      },
    },
    allowCreate: {
      control: 'boolean',
      description: 'Permite crear eventos desde la UI.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    allowEdit: {
      control: 'boolean',
      description: 'Permite editar eventos.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    allowDelete: {
      control: 'boolean',
      description: 'Permite eliminar eventos.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    activeDateChange: {
      action: 'activeDateChange',
      table: { category: 'Eventos', type: { summary: 'Date' } },
    },
    dateSelect: {
      action: 'dateSelect',
      table: { category: 'Eventos', type: { summary: 'Date' } },
    },
    rangeChange: {
      action: 'rangeChange',
      table: {
        category: 'Eventos',
        type: { summary: '{ start: Date | null; end: Date | null }' },
      },
    },
    eventSelect: {
      action: 'eventSelect',
      table: { category: 'Eventos', type: { summary: 'DcxCalendarEvent' } },
    },
    eventCreate: {
      action: 'eventCreate',
      table: { category: 'Eventos', type: { summary: 'DcxCalendarEventDraft' } },
    },
    eventUpdate: {
      action: 'eventUpdate',
      table: { category: 'Eventos', type: { summary: 'DcxCalendarEvent' } },
    },
    eventDelete: {
      action: 'eventDelete',
      table: { category: 'Eventos', type: { summary: 'DcxCalendarDeleteRequest' } },
    },
  },
  args: {
    view: 'month',
    activeDate: new Date(2026, 5, 18),
    events: buildCalendarDemoEvents(),
    selectionMode: 'single',
    selectedDate: new Date(2026, 5, 18),
    rangeStart: null,
    rangeEnd: null,
    allowCreate: true,
    allowEdit: true,
    allowDelete: true,
    dayMaxVisibleEvents: 2,
    weekStartHour: 9,
    weekEndHour: 16,
    showFooter: true,
    activeDateChange: fn(),
    dateSelect: fn(),
    rangeChange: fn(),
    eventSelect: fn(),
    eventCreate: fn(),
    eventUpdate: fn(),
    eventDelete: fn(),
  },
} satisfies Meta<DcxNgCalendarComponent>;

export default meta;
type Story = StoryObj<DcxNgCalendarComponent>;

export const Month: Story = {};

export const Range: Story = {
  args: {
    // El modo rango usa la rejilla compacta tipo date-picker del mock — sin
    // eventos, igual que la página demo real.
    events: [],
    selectionMode: 'range',
    selectedDate: null,
    rangeStart: new Date(2026, 5, 19),
    rangeEnd: new Date(2026, 5, 20),
    allowCreate: false,
  },
};

export const Week: Story = {
  args: {
    view: 'week',
    selectionMode: 'none',
    showFooter: false,
  },
};

export const Year: Story = {
  args: {
    view: 'year',
    activeDate: new Date(2026, 0, 1),
    showFooter: false,
  },
};

export const Mini: Story = {
  args: {
    view: 'mini',
    activeDate: new Date(2026, 5, 17),
    selectedDate: new Date(2026, 5, 17),
    allowCreate: false,
    allowEdit: false,
    allowDelete: false,
  },
};