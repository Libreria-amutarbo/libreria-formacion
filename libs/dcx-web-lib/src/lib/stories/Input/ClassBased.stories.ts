import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import '../../core/interfaces/generic';


import '../../../index';
import '../../dcx-web-components/dcx-web-input/dcx-web-input.component';
import { DCX_LAYOUTS, DCX_SPACINGS } from '../../core/interfaces/generic';
import { DcxInputType } from '../../core/interfaces/input';


const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Input',
  component: 'dcx-web-input',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    id: {
      control: 'text',
      description:
        'Id único del input. Label, hint y error derivan de este identificador.',
      table: {
        category: 'Atributos',
      },
    },

    value: {
      control: 'text',
      description: 'Valor del input.',
      table: {
        category: 'Atributos',
      },
    },

    label: {
      control: 'text',
      description: 'Texto visible asociado al input.',
      table: {
        category: 'Atributos',
      },
    },

    hint: {
      control: 'text',
      description:
        'Texto de ayuda asociado mediante aria-describedby.',
      table: {
        category: 'Atributos',
      },
    },

    placeholder: {
      control: 'text',
      description: 'Placeholder del input.',
      table: {
        category: 'Atributos',
      },
    },

    type: {
      control: 'select',
      options: [
        DcxInputType.TEXT,
        DcxInputType.NUMBER,
        DcxInputType.EMAIL,
        DcxInputType.PASSWORD,
        DcxInputType.SEARCH,
        DcxInputType.TEL,
        DcxInputType.URL,
        DcxInputType.FILE,
        DcxInputType.RADIO,
        DcxInputType.RANGE,
      ],
      description: 'Tipo de input.',
      table: {
        category: 'Atributos',
      },
    },

    spacing: {
      control: 'select',
      options: DCX_SPACINGS,
      description: 'Padding interno.',
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

    readonly: {
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

    requiredMessage: {
      control: 'text',
      table: {
        category: 'Atributos',
      },
    },

    orientation: {
      control: 'select',
      options: [
        DCX_LAYOUTS,
      ],
      table: {
        category: 'Atributos',
      },
    },

    valueChange: {
      action: 'valueChange',
      description:
        'Emitido cuando cambia el valor del input.',
      table: {
        category: 'Eventos',
      },
    },

    focusEvent: {
      action: 'focusEvent',
      description:
        'Emitido cuando el input recibe foco.',
      table: {
        category: 'Eventos',
      },
    },

    blurEvent: {
      action: 'blurEvent',
      description:
        'Emitido cuando el input pierde foco.',
      table: {
        category: 'Eventos',
      },
    },

    enterPressed: {
      action: 'enterPressed',
      description:
        'Emitido al pulsar Enter.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    value: '',
    label: 'Nombre completo',
    hint: '',
    placeholder: 'Ej: Jean Dupont',
    type: 'text',
    spacing: 'm',
    disabled: false,
    readonly: false,
    required: false,
    isInvalid: false,
    errorMessage: '',
    requiredMessage: 'Este campo es requerido',
    orientation: 'horizontal',
  },

  render: (args) => html`
    <dcx-web-input
      .value=${args.value}
      label=${args.label}
      hint=${args.hint}
      placeholder=${args.placeholder}
      type=${args.type}
      spacing=${args.spacing}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?isInvalid=${args.isInvalid}
      errorMessage=${args.errorMessage}
      requiredMessage=${args.requiredMessage}
      orientation=${args.orientation}
    >
    </dcx-web-input>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint:
      'Tal como aparece en el documento oficial.',
  },
};

export const Required: Story = {
  args: {
    label: 'Email corporativo',
    placeholder: 'nombre@empresa.com',
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email corporativo',
    placeholder: 'nombre@empresa.com',
    isInvalid: true,
    errorMessage:
      'Introduce un email válido.',
  },
};

export const InvalidList: Story = {
  render: () => html`
    <dcx-web-input
      label="Contraseña"
      type="password"
      .isInvalid=${true}
      .errorMessages=${[
        {
          type: 'minLength',
          message: 'Mínimo 8 caracteres.',
        },
        {
          type: 'uppercase',
          message:
            'Debe contener una mayúscula.',
        },
      ]}
    >
    </dcx-web-input>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    placeholder: 'No editable',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Solo lectura',
    value: 'Generado automáticamente',
    readonly: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Contraseña',
    placeholder: '••••••••',
    type: 'password',
  },
};

export const Search: Story = {
  args: {
    label: 'Búsqueda',
    placeholder: 'Buscar...',
    type: 'search',
  },
};

export const Types: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        gap:16px;
        flex-wrap:wrap;
        align-items:flex-start;
      "
    >
      <dcx-web-input label="Texto" type="text"></dcx-web-input>
      <dcx-web-input label="Número" type="number"></dcx-web-input>
      <dcx-web-input label="Email" type="email"></dcx-web-input>
      <dcx-web-input label="Teléfono" type="tel"></dcx-web-input>
      <dcx-web-input label="URL" type="url"></dcx-web-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:16px;
      "
    >
      <dcx-web-input label="xs" spacing="xs"></dcx-web-input>
      <dcx-web-input label="s" spacing="s"></dcx-web-input>
      <dcx-web-input label="m" spacing="m"></dcx-web-input>
      <dcx-web-input label="l" spacing="l"></dcx-web-input>
      <dcx-web-input label="xl" spacing="xl"></dcx-web-input>
    </div>
  `,
};

export const Files: Story = {
  args: {
    label: 'Adjuntar archivo',
    type: 'file',
  },
};