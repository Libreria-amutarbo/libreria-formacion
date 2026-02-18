import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import {
  CLEARABLE,
  DcxNgSelectComponent,
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
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgSelectComponent> = {
  title: 'DCXLibrary/Select/Class based',
  component: DcxNgSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto visible del label',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: LABEL,
        },
      },
    },
    options: {
      description: 'Listado de opciones { value, label, boolean(opcional) }',
      options: OPTIONS,
      control: { type: 'object' },
      table: { category: 'Attributes' },
    },
    placeholder: {
      description:
        'Placeholder, opcional, para poner texto informativo en el select antes de la selección',
      control: 'text',
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: PLACEHOLDER,
        },
      },
    },
    searchable: {
      description:
        'Editor de texto que nos permite buscar entre las opciones disponibles del select',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    clearable: {
      description: 'Botón que borra la opción seleccionada',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },

    disabled: {
      description: 'Selector deshabilitado',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    required: {
      description: 'Indica si el selector es requerido o no en un formulario',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isInvalid: {
      description: 'Indica si el select, o la opción seleccionada, es inválido',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    errorMessage: {
      description: 'Mensaje de error que aparece cuando el select es inválido',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: ERRORMESSAGE,
        },
      },
    },
    errorIcon: {
      description: 'Icono de error que aparece cuando el select es inválido',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: ERRORICON,
        },
      },
    },
    valueInput: {
      description: 'Opción seleccionada por defecto',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: '',
        },
      },
    },

    valueChange: {
      action: 'valueChange',
      description: 'Evento que se emite cuando se cambia el valor seleccionado',
      table: {
        category: 'Events',
        type: {
          summary: '(item: string | number | null) => void',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    spacing: {
      description: 'Tamaño del select',
      control: { type: 'select' },
      options: SPACING_LIST,
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: SPACING_DEFAULT,
        },
      },
    },
    clear: {
      action: 'clear',
      description: 'Evento que se emite cuando se borra el valor seleccionado',
      table: {
        category: 'Events',
        type: {
          summary: '(item: void) => void',
        },
        defaultValue: {
          summary: '-',
        },
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
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DcxNgSelectComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<DcxNgSelectComponent>;

export const ClassBased: Story = {};

export const Searchable: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
  },
};

export const SearchableWithClearable: Story = {
  args: {
    options: OPTIONS,
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

export const Required: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
    clearable: true,
    required: true,
  },
};

export const SelectWithError: Story = {
  args: {
    options: OPTIONS,
    searchable: true,
    clearable: true,
    required: true,
    isInvalid: true,
    errorMessage: 'Error',
  },
};

export const Spacing: Story = {
  render: args => ({
    props: {
      ...args,
    },
    template: `
      <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <dcx-ng-select spacing="xs" placeholder="XS"></dcx-ng-select>
<dcx-ng-select spacing="s" placeholder="S"></dcx-ng-select>
<dcx-ng-select spacing="m" placeholder="M"></dcx-ng-select>
<dcx-ng-select spacing="l" placeholder="L"></dcx-ng-select>
        <dcx-ng-select spacing="xl" placeholder="XL"></dcx-ng-select>
      </div>
    `,
  }),
};
