import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';
import '../../dcx-web-components/dcx-web-textarea/dcx-web-textarea.component';

import {
  FLOAT_LABEL_VARIANTS,
  TEXTAREA_SIZES,
} from '../../core/defaults/textarea';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Textarea',
  component: 'dcx-web-textarea',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    value: {
      control: 'text',
      description: 'Valor del textarea.',
      table: {
        category: 'Atributos',
      },
    },

    label: {
      control: 'text',
      description: 'Etiqueta visible asociada al textarea.',
      table: {
        category: 'Atributos',
      },
    },

    rows: {
      control: 'number',
      description: 'Número de filas visibles.',
      table: {
        category: 'Atributos',
      },
    },

    cols: {
      control: 'number',
      description: 'Número de columnas visibles.',
      table: {
        category: 'Atributos',
      },
    },

    placeholder: {
      control: 'text',
      description: 'Placeholder del textarea.',
      table: {
        category: 'Atributos',
      },
    },

    autoResize: {
      control: 'boolean',
      description: 'Ajusta automáticamente la altura según el contenido.',
      table: {
        category: 'Atributos',
      },
    },

    floatLabel: {
      control: 'select',
      options: FLOAT_LABEL_VARIANTS,
      description: 'Variante de etiqueta flotante.',
      table: {
        category: 'Atributos',
      },
    },

    size: {
      control: 'select',
      options: TEXTAREA_SIZES,
      description: 'Tamaño del textarea.',
      table: {
        category: 'Atributos',
      },
    },

    fluid: {
      control: 'boolean',
      table: {
        category: 'Atributos',
      },
    },

    filled: {
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

    readonly: {
      control: 'boolean',
      table: {
        category: 'Atributos',
      },
    },

    invalid: {
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

    required: {
      control: 'boolean',
      table: {
        category: 'Atributos',
      },
    },

    hint: {
      control: 'text',
      table: {
        category: 'Atributos',
      },
    },

    maxLength: {
      control: 'number',
      table: {
        category: 'Atributos',
      },
    },

    resizable: {
      control: 'boolean',
      table: {
        category: 'Atributos',
      },
    },

    valueChange: {
      action: 'valueChange',
      description: 'Emitido cuando cambia el valor.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    value: '',
    label: 'Comentarios',
    rows: 5,
    cols: 30,
    placeholder: 'Escribe aquí...',
    autoResize: false,
    size: 'normal',
    fluid: false,
    filled: false,
    disabled: false,
    readonly: false,
    invalid: false,
    errorMessage: '',
    required: false,
    hint: '',
    resizable: true,
  },

  render: args => html`
    <dcx-web-textarea
      .value=${args.value}
      .rows=${args.rows}
      .cols=${args.cols}
      label=${args.label}
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?autoResize=${args.autoResize}
      floatLabel=${args.floatLabel ?? ''}
      size=${args.size}
      ?fluid=${args.fluid}
      ?filled=${args.filled}
      ?invalid=${args.invalid}
      errorMessage=${args.errorMessage}
      ?required=${args.required}
      hint=${args.hint}
      .maxLength=${args.maxLength}
      ?resizable=${args.resizable}
    >
    </dcx-web-textarea>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    value: 'Añade más líneas para ver cómo crece.',
  },

  parameters: {
    docs: {
      description: {
        story:
          'La propiedad autoResize permite que el textarea ajuste su altura automáticamente según el contenido.',
      },
    },
  },
};

export const FloatLabelVariants: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-textarea
        floatLabel="over"
        label="Over Label"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        floatLabel="in"
        label="In Label"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        floatLabel="on"
        label="On Label"
      >
      </dcx-web-textarea>
    </div>
  `,
};

export const IftaLabel: Story = {
  args: {
    floatLabel: 'ifta',
    label: 'Description',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estilo IFTA (In-Field Text Area) es una variante de etiqueta flotante que se muestra dentro del área de texto cuando el campo está vacío.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        gap: var(--sp-8, 32px);
        flex-wrap:wrap;
      "
    >
      <dcx-web-textarea
        size="small"
        placeholder="Small"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        placeholder="Normal"
      >
      </dcx-web-textarea>

      <dcx-web-textarea
        size="large"
        placeholder="Large"
      >
      </dcx-web-textarea>
    </div>
  `,
};

export const Fluid: Story = {
  args: {
    fluid: true,
    label: 'Descripción',
    placeholder: 'Fluid textarea',
  },
  parameters: {
    docs: {
      description: {
        story:
          'La propiedad fluid hace que el textarea ocupe el 100% del ancho de su contenedor, adaptándose a diferentes tamaños de pantalla y diseños.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    filled: true,
    placeholder: 'Filled textarea',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estilo filled se activa con la propiedad filled, que aplica un fondo relleno al textarea para diferenciarlo visualmente.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estado deshabilitado se aplica usando la propiedad disabled, que bloquea la interacción y aplica estilos visuales para indicar que el textarea no está activo.',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    label: 'Descripción',
    required: true,
    invalid: true,
    errorMessage: 'Este campo es obligatorio',
  },
  parameters: {
    docs: {
      description: {
        story:
          'El estado inválido se activa con la propiedad invalid, que aplica estilos de error al textarea y al label, y muestra el asterisco de campo obligatorio si required es true. El mensaje de error se anuncia con role="alert".',
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    label: 'Notas',
    filled: true,
    hint: 'Max. 500 caracteres',
    maxLength: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'La propiedad hint muestra un texto de ayuda bajo el campo (se oculta automáticamente si hay un error visible). maxLength aplica el atributo maxlength nativo.',
      },
    },
  },
};
