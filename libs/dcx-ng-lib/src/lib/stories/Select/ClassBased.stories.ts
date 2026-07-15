import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
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
  title: 'DCXLibrary/Components/Select',
  component: DcxNgSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto visible del label',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        defaultValue: {
          summary: LABEL,
        },
      },
    },
    ariaLabel: {
      description:
        'Nombre accesible del control, usado únicamente cuando no hay `label` visible.',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },
    options: {
      description: 'Listado de opciones { value, label, disabled(opcional) }',
      control: { type: 'object' },
      table: {
        category: 'Atributos',
        type: { summary: 'DcxSelectOptions[]' },
        defaultValue: { summary: '[]' },
      },
    },
    placeholder: {
      description:
        'Placeholder, opcional, para poner texto informativo en el select antes de la selección',
      control: 'text',
      table: {
        category: 'Atributos',
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
        category: 'Atributos',
      },
    },
    clearable: {
      description: 'Botón que borra la opción seleccionada',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },

    disabled: {
      description: 'Selector deshabilitado',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    required: {
      description: 'Indica si el selector es requerido o no en un formulario',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    isInvalid: {
      description: 'Indica si el select, o la opción seleccionada, es inválido',
      control: { type: 'boolean' },
      table: {
        category: 'Atributos',
      },
    },
    errorMessage: {
      description: 'Mensaje de error que aparece cuando el select es inválido',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        defaultValue: {
          summary: ERRORMESSAGE,
        },
      },
    },
    errorIcon: {
      description: 'Icono de error que aparece cuando el select es inválido',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        defaultValue: {
          summary: ERRORICON,
        },
      },
    },
    valueInput: {
      description: 'Opción seleccionada por defecto',
      control: { type: 'text' },
      table: {
        category: 'Atributos',
        defaultValue: {
          summary: '',
        },
      },
    },

    valueChange: {
      action: 'valueChange',
      description: 'Evento que se emite cuando se cambia el valor seleccionado',
      table: {
        category: 'Eventos',
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
        category: 'Atributos',
        defaultValue: {
          summary: SPACING_DEFAULT,
        },
      },
    },
    clear: {
      action: 'clear',
      description: 'Evento que se emite cuando se borra el valor seleccionado',
      table: {
        category: 'Eventos',
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
    // El panel de opciones se posiciona con `position: absolute` y necesita
    // salirse de los límites de la story. Renderizada "inline" (por defecto
    // en la página Docs, para poder hacer zoom), el contenedor recorta ese
    // overflow. Con `inline: false` la story se renderiza en su propio
    // <iframe>, que no sufre ese recorte.
    docs: {
      story: { inline: false, height: '280px' },
    },
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

export const DisabledWithSearchable: Story = {
  name: 'Deshabilitado con búsqueda',
  args: {
    options: OPTIONS,
    searchable: true,
    clearable: true,
    disabled: true,
    valueInput: OPTIONS[0].value,
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

export const WithPreselectedValue: Story = {
  name: 'Con valor preseleccionado',
  args: {
    options: OPTIONS,
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
