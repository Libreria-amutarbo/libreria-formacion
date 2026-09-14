import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-calendar/dcx-web-calendar.component';

import { buildCalendarDemoEvents } from '../../core/fixtures/calendar';

import {
  DCX_CALENDAR_VIEW_LIST,
  DCX_CALENDAR_SELECTION_MODE_LIST,
} from '../../core/defaults/calendar';

import {
  DcxCalendarView,
  DcxCalendarSelectionMode,
} from '../../core/interfaces/calendar';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Calendar',
  component: 'dcx-web-calendar',
  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    view: {
      control: 'select',
      options: DCX_CALENDAR_VIEW_LIST,
      description: 'Vista activa del calendario.',
      table: {
        category: 'Atributos',
        type: {
          summary: `'month' | 'week' | 'year' | 'mini'`,
        },
        defaultValue: {
          summary: 'month',
        },
      },
    },

    selectionMode: {
      control: 'select',
      options: DCX_CALENDAR_SELECTION_MODE_LIST,
      description: 'Modo de selección.',
      table: {
        category: 'Atributos',
        type: {
          summary: `'none' | 'single' | 'range'`,
        },
        defaultValue: {
          summary: 'none',
        },
      },
    },

    activeDate: {
      control: 'date',
      description: 'Fecha base visible del calendario.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'Date',
        },
      },
    },

    selectedDate: {
      control: 'date',
      description: 'Fecha seleccionada.',
      table: {
        category: 'Atributos',
      },
    },

    rangeStart: {
      control: 'date',
      description: 'Inicio del rango.',
      table: {
        category: 'Atributos',
      },
    },

    rangeEnd: {
      control: 'date',
      description: 'Fin del rango.',
      table: {
        category: 'Atributos',
      },
    },

    dayMaxVisibleEvents: {
      control: 'number',
      description: 'Máximo de eventos visibles por celda.',
      table: {
        category: 'Atributos',
      },
    },

    weekStartHour: {
      control: 'number',
      description: 'Hora inicial semanal.',
      table: {
        category: 'Atributos',
      },
    },

    weekEndHour: {
      control: 'number',
      description: 'Hora final semanal.',
      table: {
        category: 'Atributos',
      },
    },

    disabled: {
      control: 'boolean',
      table: {
        category: 'Atributos',
      },
    },

    allowCreate: {
      control: 'boolean',
      description: 'Permite crear eventos desde la UI.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },

    allowEdit: {
      control: 'boolean',
      description: 'Permite editar eventos.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },

    allowDelete: {
      control: 'boolean',
      description: 'Permite eliminar eventos.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },

    showFooter: {
      control: 'boolean',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      table: {
        category: 'Atributos',
      },
    },

    events: {
      control: false,
      description: 'Listado de eventos renderizados.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'DcxCalendarEvent[]',
        },
      },
    },

    viewChange: {
      action: 'viewChange',
      table: {
        category: 'Eventos',
      },
    },

    activeDateChange: {
      action: 'activeDateChange',
      table: {
        category: 'Eventos',
        type: {
          summary: 'Date',
        },
      },
    },

    dateSelect: {
      action: 'dateSelect',
      table: {
        category: 'Eventos',
        type: {
          summary: 'Date',
        },
      },
    },

    rangeChange: {
      action: 'rangeChange',
      table: {
        category: 'Eventos',
        type: {
          summary: '{ start: Date | null; end: Date | null }',
        },
      },
    },

    eventSelect: {
      action: 'eventSelect',
      table: {
        category: 'Eventos',
        type: {
          summary: 'DcxCalendarEvent',
        },
      },
    },

    eventCreate: {
      action: 'eventCreate',
      table: {
        category: 'Eventos',
        type: {
          summary: 'DcxCalendarEventDraft',
        },
      },
    },

    eventUpdate: {
      action: 'eventUpdate',
      table: {
        category: 'Eventos',
      },
    },

    eventDelete: {
      action: 'eventDelete',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    view: 'month' as DcxCalendarView,
    activeDate: new Date(2026, 5, 18),
    events: buildCalendarDemoEvents(),

    selectionMode: 'single' as DcxCalendarSelectionMode,

    selectedDate: new Date(2026, 5, 18),

    rangeStart: null,
    rangeEnd: null,

    disabled: false,

    allowCreate: true,
    allowEdit: true,
    allowDelete: true,

    dayMaxVisibleEvents: 2,

    weekStartHour: 9,
    weekEndHour: 16,

    showFooter: true,

    ariaLabel: 'Calendar',
  },

  render: args => html`
    <dcx-web-calendar
      .view=${args.view}
      .activeDate=${args.activeDate}
      .events=${args.events}
      .selectionMode=${args.selectionMode}
      .selectedDate=${args.selectedDate}
      .rangeStart=${args.rangeStart}
      .rangeEnd=${args.rangeEnd}
      .dayMaxVisibleEvents=${args.dayMaxVisibleEvents}
      .weekStartHour=${args.weekStartHour}
      .weekEndHour=${args.weekEndHour}
      aria-label=${args.ariaLabel}
      ?disabled=${args.disabled}
      ?allowCreate=${args.allowCreate}
      ?allowEdit=${args.allowEdit}
      ?allowDelete=${args.allowDelete}
      ?showFooter=${args.showFooter}
    >
    </dcx-web-calendar>
  `,
};

export default meta;

type Story = StoryObj;

export const Month: Story = {};

export const Range: Story = {
  args: {
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithoutCrud: Story = {
  args: {
    allowCreate: false,
    allowEdit: false,
    allowDelete: false,
  },
};

export const WeekExtendedHours: Story = {
  args: {
    view: 'week',
    weekStartHour: 6,
    weekEndHour: 22,
  },
};
