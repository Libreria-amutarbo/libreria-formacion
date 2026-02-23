import {
  DcxNgInputComponent,
  DcxInputType,
  INPUT_DEFAULT_ARIA_DESCRIBEDBY,
  INPUT_DEFAULT_ARIA_LABEL,
  INPUT_DEFAULT_AUTOCOMPLETE,
  INPUT_DEFAULT_DISABLED,
  INPUT_DEFAULT_ERROR_MESSAGE,
  INPUT_DEFAULT_INPUTMODE,
  INPUT_DEFAULT_INVALID,
  INPUT_DEFAULT_LABEL,
  INPUT_DEFAULT_NAME,
  INPUT_DEFAULT_PLACEHOLDER,
  INPUT_DEFAULT_READONLY,
  INPUT_DEFAULT_REQUIRED,
  INPUT_DEFAULT_SIZE,
  INPUT_DEFAULT_TYPE,
  INPUT_DEFAULT_VALUE,
} from '@dcx-ng-components/dcx-ng-lib';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta<DcxNgInputComponent> = {
  title: 'DCXLibrary/Input/ClassBased',
  component: DcxNgInputComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Id del input',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
        defaultValue: {
          summary: '-',
        },
      },
    },
    value: {
      description: 'Value del input',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    disabled: {
      description: 'Value del input',
      control: { type: 'boolean' },
      defaultValue: false,
      table: { category: 'Attributes' },
    },
    readonly: {
      description: 'Value del input',
      control: { type: 'boolean' },
      defaultValue: false,
      table: { category: 'Attributes' },
    },
    placeholder: {
      description: 'Value del input',
      control: { type: 'text' },
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    type: {
      description: 'Value del input',
      control: { type: 'select' },
      options: [
        DcxInputType.TEXT,
        DcxInputType.NUMBER,
        DcxInputType.EMAIL,
        DcxInputType.PASSWORD,
        DcxInputType.SEARCH,
        DcxInputType.TEL,
        DcxInputType.URL,
      ],
      defaultValue: DcxInputType.TEXT,
      table: { category: 'Attributes' },
    },

    name: {
      description: 'Value del input',
      control: { type: 'text' },
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    required: {
      description: 'Value del input',
      control: { type: 'boolean' },
      defaultValue: false,
      table: { category: 'Attributes' },
    },

    autocomplete: {
      description: 'Value del input',
      control: { type: 'text' },
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    inputMode: {
      description: 'Value del input',
      control: { type: 'text' },
      defaultValue: null,
      table: { category: 'Attributes' },
    },

    isInvalid: {
      description: 'Value del input',
      control: { type: 'boolean' },
      defaultValue: false,
      table: { category: 'Attributes' },
    },

    label: {
      control: 'text',
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    ariaLabel: {
      control: 'text',
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    ariaDescribedBy: {
      control: 'text',
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    errorMessage: {
      control: 'text',
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    errorIcon: {
      control: 'text',
      defaultValue: null,
      table: { category: 'Attributes' },
    },
    spacing: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      defaultValue: 'm',
      table: { category: 'Attributes' },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      defaultValue: 'm',
      table: { category: 'Attributes' },
    },
    valueChange: {
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
    blurEvent: {
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
    focusEvent: {
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
    enterPressed: {
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
    value: INPUT_DEFAULT_VALUE,
    disabled: INPUT_DEFAULT_DISABLED,
    readonly: INPUT_DEFAULT_READONLY,
    placeholder: INPUT_DEFAULT_PLACEHOLDER,
    type: INPUT_DEFAULT_TYPE,
    name: INPUT_DEFAULT_NAME,
    required: INPUT_DEFAULT_REQUIRED,
    autocomplete: INPUT_DEFAULT_AUTOCOMPLETE,
    inputMode: INPUT_DEFAULT_INPUTMODE,
    isInvalid: INPUT_DEFAULT_INVALID,
    label: INPUT_DEFAULT_LABEL,
    ariaLabel: INPUT_DEFAULT_ARIA_LABEL,
    ariaDescribedBy: INPUT_DEFAULT_ARIA_DESCRIBEDBY,
    errorMessage: INPUT_DEFAULT_ERROR_MESSAGE,
    size: INPUT_DEFAULT_SIZE,
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DcxNgInputComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<DcxNgInputComponent>;

export const ClassBased: Story = {};

export const withPlaceholder: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const withValue: Story = {
  args: {
    value: 'Value',
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
  },
};

export const readOnly: Story = {
  args: {
    placeholder: 'Solo lectura',
    readonly: true,
  },
};

export const diferentsTypes: Story = {
  render: () => ({
    template: `
      <article style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
    <dcx-ng-input label="Texto" [type]="DcxInputType.TEXT"></dcx-ng-input>
    <dcx-ng-input label="Numero" [type]="DcxInputType.NUMBER"></dcx-ng-input>
    <dcx-ng-input
      label="Contraseña"
      [type]="DcxInputType.PASSWORD"
    ></dcx-ng-input>
    <dcx-ng-input label="Búsqueda" [type]="DcxInputType.SEARCH"></dcx-ng-input>
  </article>
    `,
    props: { DcxInputType },
  }),
};

export const required: Story = {
  args: {
    required: true,
  },
};

export const isInvalid: Story = {
  args: {
    label: 'Inválido',
    placeholder: 'Solo lectura',
    isInvalid: true,
    errorMessage: 'Error',
  },
};
