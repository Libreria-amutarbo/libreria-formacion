import { html } from 'lit';
import type {
  Meta,
  StoryObj,
} from '@storybook/web-components';

import '../../../index';
import {
  DCXINPUT_OTP_SIZES,
} from '../../core/interfaces/inputOtp';

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
        DCXINPUT_OTP_SIZES,
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

export const Default: Story = {
  render: () => {
    const wrapper =
      document.createElement('div');

    wrapper.style.display = 'flex';
    wrapper.style.flexDirection =
      'column';
    wrapper.style.gap = 'var(--sp-3, 12px)';

    const otp =
      document.createElement(
        'dcx-web-input-otp',
      );

    const preview =
      document.createElement('p');

    preview.style.margin = '0';
    preview.style.color = 'var(--text-muted, #696e75)';
    preview.style.fontSize = 'var(--fs-sm, 12px)';

    preview.textContent =
      'Valor actual: Sin completar';

    otp.addEventListener(
      'valueChange',
      (event: Event) => {
        const customEvent =
          event as CustomEvent<string>;

        preview.textContent =
          `Valor actual: ${
            customEvent.detail ||
            'Sin completar'
          }`;
      },
    );

    wrapper.append(
      otp,
      preview,
    );

    return wrapper;
  },
};

export const IntegerOnly: Story = {
  render: () => {
    const wrapper =
      document.createElement('div');

    wrapper.style.display = 'flex';

    wrapper.style.flexDirection =
      'column';

    wrapper.style.gap = 'var(--sp-3, 12px)';

    const otp =
      document.createElement(
        'dcx-web-input-otp',
      ) as any;

    otp.length = 6;
    otp.integerOnly = true;
    otp.ariaLabel =
      'Código numérico de verificación';

    otp.writeValue('123456');

    const preview =
      document.createElement('p');

    preview.style.margin = '0';

    preview.style.color = 'var(--text-muted, #696e75)';

    preview.style.fontSize = 'var(--fs-sm, 12px)';

    preview.textContent =
      'Código precargado: 123456';

    otp.addEventListener(
      'valueChange',
      (event: Event) => {
        const customEvent =
          event as CustomEvent<string>;

        preview.textContent =
          `Código precargado: ${
            customEvent.detail
          }`;
      },
    );

    wrapper.append(
      otp,
      preview,
    );

    return wrapper;
  },
};

export const Masked: Story = {
  render: () => {
    const wrapper =
      document.createElement('div');

    wrapper.style.display = 'flex';

    wrapper.style.flexDirection =
      'column';

    wrapper.style.gap = 'var(--sp-3, 12px)';

    const otp =
      document.createElement(
        'dcx-web-input-otp',
      ) as any;

    otp.mask = true;

    otp.placeholder = '•';

    otp.ariaLabel =
      'Código OTP enmascarado';

    const preview =
      document.createElement('p');

    preview.style.margin = '0';

    preview.style.color = 'var(--text-muted, #696e75)';

    preview.style.fontSize = 'var(--fs-sm, 12px)';

    preview.textContent =
      'Valor real: Sin completar';

    otp.addEventListener(
      'valueChange',
      (event: Event) => {
        const customEvent =
          event as CustomEvent<string>;

        preview.textContent =
          `Valor real: ${
            customEvent.detail ||
            'Sin completar'
          }`;
      },
    );

    wrapper.append(
      otp,
      preview,
    );

    return wrapper;
  },
};

export const Interactive: Story = {
  render: () => {
    const wrapper =
      document.createElement('div');

    wrapper.style.display = 'flex';

    wrapper.style.flexDirection =
      'column';

    wrapper.style.gap = 'var(--sp-4, 16px)';

    const otp =
      document.createElement(
        'dcx-web-input-otp',
      ) as any;

    otp.integerOnly = true;

    const values =
      document.createElement('div');

    values.style.display = 'flex';

    values.style.flexDirection =
      'column';

    values.style.gap = '6px';

    values.style.color =
      'var(--text-muted, #696e75)';

    values.style.fontSize =
      'var(--fs-sm,12px)';

    const currentValue =
      document.createElement('span');

    const completedValue =
      document.createElement('span');

    currentValue.textContent =
      'Valor actual: Sin completar';

    completedValue.textContent =
      'Último código completo: Pendiente';

    values.append(
      currentValue,
      completedValue,
    );

    otp.addEventListener(
      'valueChange',
      (event: Event) => {
        const customEvent =
          event as CustomEvent<string>;

        currentValue.textContent =
          `Valor actual: ${
            customEvent.detail ||
            'Sin completar'
          }`;
      },
    );

    otp.addEventListener(
      'completed',
      (event: Event) => {
        const customEvent =
          event as CustomEvent<string>;

        completedValue.textContent =
          `Último código completo: ${customEvent.detail}`;
      },
    );

    const button =
      document.createElement(
        'dcx-web-button',
      ) as any;

    button.label =
      'Limpiar código';

    button.variant =
      'secondary';

    button.size = 's';

    button.addEventListener(
      'buttonClick',
      () => {
        otp.clear();

        currentValue.textContent =
          'Valor actual: Sin completar';

        completedValue.textContent =
          'Último código completo: Pendiente';
      },
    );

    wrapper.append(
      otp,
      values,
      button,
    );

    return wrapper;
  },
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        flex-direction:column;
        gap:var(--sp-4, 16px);
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
  render: () => {
    const wrapper =
      document.createElement('div');

    wrapper.style.display = 'flex';

    wrapper.style.flexDirection =
      'column';

    wrapper.style.gap = 'var(--sp-3, 12px)';

    const otp =
      document.createElement(
        'dcx-web-input-otp',
      ) as any;

    otp.integerOnly = true;

    const error =
      document.createElement('p');

    error.style.margin = '0';
    error.style.minHeight = '18px';
    error.style.color = 'var(--text-error, #c81e1e)';
    error.style.fontSize = 'var(--fs-sm,12px)';

    const button =
      document.createElement(
        'dcx-web-button',
      ) as any;

    button.label = 'Submit';
    button.variant = 'primary';
    button.size = 's';

    button.addEventListener(
      'buttonClick',
      () => {
        const value =
          otp.tokens.join('');

        if (!value) {
          otp.invalid = true;

          error.textContent =
            'Passcode is required.';

          return;
        }

        otp.invalid = false;

        error.textContent = '';

        otp.clear();
      },
    );

    wrapper.append(
      otp,
      error,
      button,
    );

    return wrapper;
  },
};

export const ReactiveForm: Story = {
  render: () => {
    const wrapper =
      document.createElement('div');

    wrapper.style.display = 'flex';

    wrapper.style.flexDirection =
      'column';

    wrapper.style.gap = 'var(--sp-3, 12px)';

    const otp =
      document.createElement(
        'dcx-web-input-otp',
      ) as any;

    otp.integerOnly = true;

    const error =
      document.createElement('p');

    error.style.margin = '0';
    error.style.minHeight = '18px';
    error.style.color = '#c81e1e';
    error.style.fontSize = 'var(--fs-sm, 12px)';

    const button =
      document.createElement(
        'dcx-web-button',
      ) as any;

    button.label = 'Submit';
    button.variant = 'primary';
    button.size = 's';

    button.addEventListener(
      'buttonClick',
      () => {
        const value =
          otp.tokens.join('');

        if (
          value.length < 4
        ) {
          otp.invalid = true;

          error.textContent =
            'Passcode is required.';

          return;
        }

        otp.invalid = false;

        error.textContent = '';

        otp.clear();
      },
    );

    wrapper.append(
      otp,
      error,
      button,
    );

    return wrapper;
  },
};

export const SampleLayout: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        justify-content:center;
        padding: var(--sp-4, 16px);
      "
    >
      <div
        style="
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:var(--sp-3, 12px);
          width:100%;
          max-width:420px;
        "
      >
        <div
          style="
            font-size:var(--fs-2xl, 24px);
            font-weight:var(--fw-bold, 700px);
            text-align:center;
          "
        >
          Authenticate Your Account
        </div>

        <p
          style="
            margin:0;
            color:var(--text-muted, #696e75);
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
            gap:var(--sp-3, 12px);
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