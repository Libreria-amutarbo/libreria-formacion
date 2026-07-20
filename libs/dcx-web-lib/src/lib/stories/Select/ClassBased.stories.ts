import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-select/dcx-web-select.component';

import {
    CLEARABLE,
    DISABLED,
    ERRORICON,
    ERRORMESSAGE,
    ISINVALID,
    LABEL,
    OPTIONS,
    PLACEHOLDER,
    REQUIRED,
    SEARCHABLE,
    SPACING_DEFAULT,
    SPACING_LIST,
    VALUEINPUT,
} from '../../core/defaults';

const meta: Meta = {
    title: 'DCXLibrary/WebComponents/Select',
    component: 'dcx-web-select',
    tags: ['autodocs'],

    parameters: {
        controls: {
            expanded: true,
        },

        docs: {
            source: {
                type: 'dynamic',
            },

            story: {
                inline: false,
                height: '320px',
            },
        },
    },

    argTypes: {
        label: {
            control: 'text',
            description: 'Texto visible del label',
            table: {
                category: 'Atributos',
            },
        },

        ariaLabel: {
            control: 'text',
            description:
                'Nombre accesible usado cuando no existe label visible.',
            table: {
                category: 'Atributos',
            },
        },

        options: {
            control: 'object',
            description: 'Listado de opciones disponibles.',
            table: {
                category: 'Atributos',
            },
        },

        placeholder: {
            control: 'text',
            description:
                'Texto mostrado cuando no existe selección.',
            table: {
                category: 'Atributos',
            },
        },

        searchable: {
            control: 'boolean',
            table: {
                category: 'Atributos',
            },
        },

        clearable: {
            control: 'boolean',
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

        required: {
            control: 'boolean',
            table: {
                category: 'Atributos',
            },
        },

        isInvalid: {
            control: 'boolean',
            table: {
                category: 'Atributos',
            },
        },

        errorMessage: {
            control: 'text',
            table: {
                category: 'Atributos',
            },
        },

        errorIcon: {
            control: 'text',
            table: {
                category: 'Atributos',
            },
        },

        valueInput: {
            control: 'text',
            table: {
                category: 'Atributos',
            },
        },

        spacing: {
            control: 'select',
            options: SPACING_LIST,
            table: {
                category: 'Atributos',
            },
        },

        valueChange: {
            action: 'valueChange',
            table: {
                category: 'Eventos',
            },
        },

        clear: {
            action: 'clear',
            table: {
                category: 'Eventos',
            },
        },
    },

    args: {
        label: LABEL,
        options: OPTIONS,
        placeholder: PLACEHOLDER,
        searchable: SEARCHABLE,
        clearable: CLEARABLE,
        disabled: DISABLED,
        required: REQUIRED,
        isInvalid: ISINVALID,
        errorMessage: ERRORMESSAGE,
        errorIcon: ERRORICON,
        valueInput: VALUEINPUT,
        spacing: SPACING_DEFAULT,
    },

    render: args => html`
    <dcx-web-select
      label="${args.label ?? ''}"
      aria-label="${args.ariaLabel ?? ''}"
      placeholder="${args.placeholder ?? ''}"
      errorMessage="${args.errorMessage ?? ''}"
      errorIcon="${args.errorIcon ?? ''}"
      spacing="${args.spacing ?? 'm'}"
      ?searchable=${args.searchable}
      ?clearable=${args.clearable}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?isInvalid=${args.isInvalid}
      .options=${args.options}
      .valueInput=${args.valueInput}
    >
    </dcx-web-select>
  `,
};

export default meta;

type Story = StoryObj;

export const ClassBased: Story = {};

export const Searchable: Story = {
    args: {
        searchable: true,
    },
};

export const SearchableWithClearable: Story = {
    args: {
        searchable: true,
        clearable: true,
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled',
        disabled: true,
    },
};

export const DisabledWithSearchable: Story = {
    name: 'Deshabilitado con búsqueda',
    args: {
        searchable: true,
        clearable: true,
        disabled: true,
        valueInput: OPTIONS[0].value,
    },
};

export const Required: Story = {
    args: {
        searchable: true,
        clearable: true,
        required: true,
    },
};

export const SelectWithError: Story = {
    args: {
        searchable: true,
        clearable: true,
        required: true,
        isInvalid: true,
        errorMessage: 'Error',
    },
};

export const WithPreselectedValue: Story = {
    name: 'Con valor preseleccionado',
    args: {
        clearable: true,
        valueInput: OPTIONS[1].value,
    },
};

export const Empty: Story = {
    name: 'Sin opciones',
    args: {
        options: [],
        placeholder: 'No hay opciones disponibles',
        searchable: true,
    },
};

export const Spacing: Story = {
    render: () => html`
    <div
      style="
        display:flex;
        gap:12px;
        align-items:center;
        flex-wrap:wrap;
      "
    >
      <dcx-web-select
        spacing="xs"
        placeholder="XS">
      </dcx-web-select>

      <dcx-web-select
        spacing="s"
        placeholder="S">
      </dcx-web-select>

      <dcx-web-select
        spacing="m"
        placeholder="M">
      </dcx-web-select>

      <dcx-web-select
        spacing="l"
        placeholder="L">
      </dcx-web-select>

      <dcx-web-select
        spacing="xl"
        placeholder="XL">
      </dcx-web-select>
    </div>
  `,
};