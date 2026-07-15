import { html } from 'lit';
import type {
  Meta,
  StoryObj,
} from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-input-otp/dcx-web-input-otp.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/InputOtp',
  component: 'dcx-web-input-otp',
  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    length: {
      control: { type: 'number' },
      description:
        'Número de casillas OTP a renderizar.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '4',
        },
      },
    },

    size: {
      control: { type: 'select' },
      options: [
        'small',
        'medium',
        'large',
      ],
      description:
        'Tamaño visual de las casillas OTP.',
      table: {
        category: 'Atributos',
        type: {
          summary:
            "'small' | 'medium' | 'large'",
        },
        defaultValue: {
          summary: 'medium',
        },
      },
    },

    integerOnly: {
      control: { type: 'boolean' },
      description:
        'Restringe la entrada a dígitos.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },

    mask: {
      control: { type: 'boolean' },
      description:
        'Oculta visualmente el valor introducido en cada casilla.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },

    invalid: {
      control: { type: 'boolean' },
      description:
        'Aplica el estado visual de error al componente.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },

    disabled: {
      control: { type: 'boolean' },
      description:
        'Deshabilita la interacción con todas las casillas.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },

    placeholder: {
      control: { type: 'text' },
      description:
        'Placeholder que se replica en cada casilla.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "''",
        },
      },
    },

    ariaLabel: {
      control: { type: 'text' },
      description:
        'Etiqueta accesible del grupo OTP.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary:
            'Código de un solo uso',
        },
      },
    },

    errorMessage: {
      control: { type: 'text' },
      description:
        'Mensaje de error. Si invalid es true y existe texto, se muestra bajo el OTP.',
      table: {
        category: 'Atributos',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: "''",
        },
      },
    },

    valueChange: {
      action: 'valueChange',
      description:
        'Se emite cuando cambia el valor agregado del OTP.',
      table: {
        category: 'Eventos',
        type: {
          summary: 'string',
        },
      },
    },

    completed: {
      action: 'completed',
      description:
        'Se emite cuando todas las posiciones quedan completas.',
      table: {
        category: 'Eventos',
        type: {
          summary: 'string',
        },
      },
    },

    focusEvent: {
      action: 'focusEvent',
      description:
        'Se emite con el índice de la casilla enfocada.',
      table: {
        category: 'Eventos',
        type: {
          summary: 'number',
        },
      },
    },

    blurEvent: {
      action: 'blurEvent',
      description:
        'Se emite con el índice de la casilla que pierde el foco.',
      table: {
        category: 'Eventos',
        type: {
          summary: 'number',
        },
      },
    },
  },

  args: {
    length: 4,
    size: 'medium',
    integerOnly: false,
    mask: false,
    invalid: false,
    disabled: false,
    placeholder: '',
    ariaLabel: 'Código de un solo uso',
    errorMessage: '',
  },

  render: args => html`
    <dcx-web-input-otp
      .length=${args.length}
      size=${args.size}
      ?integerOnly=${args.integerOnly}
      ?mask=${args.mask}
      ?invalid=${args.invalid}
      ?disabled=${args.disabled}
      placeholder=${args.placeholder}
      aria-label=${args.ariaLabel}
      errorMessage=${args.errorMessage}
    >
    </dcx-web-input-otp>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const IntegerOnly: Story = {
  args: {
    length: 6,
    integerOnly: true,
    ariaLabel:
      'Código numérico de verificación',
  },

  render: args => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:12px;
        max-width:360px;
      "
    >
      <dcx-web-input-otp
        .length=${args.length}
        .integerOnly=${args.integerOnly}
        aria-label=${args.ariaLabel}
      >
      </dcx-web-input-otp>

      <p
        style="
          margin:0;
          color:#696e75;
          font-size:12px;
        "
      >
        Código numérico de 6 posiciones.
      </p>
    </div>
  `,
};

export const Masked: Story = {
  args: {
    mask: true,
    placeholder: '•',
    ariaLabel:
      'Código OTP enmascarado',
  },

  render: args => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:12px;
        max-width:320px;
      "
    >
      <dcx-web-input-otp
        .mask=${args.mask}
        placeholder=${args.placeholder}
        aria-label=${args.ariaLabel}
      >
      </dcx-web-input-otp>

      <p
        style="
          margin:0;
          color:#696e75;
          font-size:12px;
        "
      >
        Valor real oculto mediante máscara.
      </p>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:16px;
        max-width:360px;
      "
    >
      <dcx-web-input-otp
        id="interactiveOtp"
        .integerOnly=${true}
        aria-label="Código interactivo de verificación"
      >
      </dcx-web-input-otp>

      <dcx-web-button
        label="Limpiar código"
        variant="secondary"
        size="s"
        @buttonClick=${() => {
          const otp =
            document.querySelector(
              '#interactiveOtp',
            ) as any;

          otp?.clear();
        }}
      >
      </dcx-web-button>
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
        align-items:flex-start;
      "
    >
      <dcx-web-input-otp
        size="small"
        aria-label="OTP small"
      >
      </dcx-web-input-otp>

      <dcx-web-input-otp
        size="medium"
        aria-label="OTP medium"
      >
      </dcx-web-input-otp>

      <dcx-web-input-otp
        size="large"
        aria-label="OTP large"
      >
      </dcx-web-input-otp>
    </div>
  `,
};

export const TemplateDrivenForm: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:12px;
        max-width:360px;
      "
    >
      <dcx-web-input-otp
        .integerOnly=${true}
        aria-label="OTP con formulario template-driven"
      >
      </dcx-web-input-otp>

      <p
        style="
          margin:0;
          min-height:18px;
          color:#c81e1e;
          font-size:12px;
        "
      >
        Passcode is required.
      </p>

      <dcx-web-button
        label="Submit"
        variant="primary"
        size="s"
      >
      </dcx-web-button>
    </div>
  `,
};

export const ReactiveForm: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:12px;
        max-width:360px;
      "
    >
      <dcx-web-input-otp
        .integerOnly=${true}
        aria-label="OTP con reactive forms"
      >
      </dcx-web-input-otp>

      <p
        style="
          margin:0;
          min-height:18px;
          color:#c81e1e;
          font-size:12px;
        "
      >
        Passcode is required.
      </p>

      <dcx-web-button
        label="Submit"
        variant="primary"
        size="s"
      >
      </dcx-web-button>
    </div>
  `,
};

export const SampleLayout: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        justify-content:center;
        padding:16px;
      "
    >
      <div
        style="
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:12px;
          width:100%;
          max-width:420px;
        "
      >
        <div
          style="
            font-size:24px;
            font-weight:700;
            text-align:center;
          "
        >
          Authenticate Your Account
        </div>

        <p
          style="
            margin:0;
            color:#696e75;
            text-align:center;
          "
        >
          Please enter the code sent to your phone.
        </p>

        <dcx-web-input-otp
          .length=${6}
          .integerOnly=${true}
          aria-label="Código de autenticación de 6 dígitos"
        >
        </dcx-web-input-otp>

        <div
          style="
            display:flex;
            justify-content:space-between;
            gap:12px;
            width:100%;
          "
        >
          <dcx-web-button
            label="Resend Code"
            variant="text"
            size="s"
          >
          </dcx-web-button>

          <dcx-web-button
            label="Submit Code"
            variant="primary"
            size="s"
          >
          </dcx-web-button>
        </div>
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    length: 4,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    length: 4,
    errorMessage:
      'El código introducido no es correcto.',
  },
};