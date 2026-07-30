import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-toggle/dcx-web-toggle.component';

import {
  POSITION_LIST,
  SIZE_LIST,
} from '../../core/defaults';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Toggle',
  component: 'dcx-web-toggle',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    checked: {
      control: 'boolean',
      description:
        'Estado actual del toggle (encendido/apagado).',
      table: {
        category: 'Atributos',
      },
    },

    disabled: {
      control: 'boolean',
      description:
        'Deshabilita el toggle utilizando el atributo nativo disabled.',
      table: {
        category: 'Atributos',
      },
    },

    label: {
      control: 'text',
      description:
        'Texto visible asociado al toggle.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description:
        'Nombre accesible explícito. Si no existe, se usa label y posteriormente Toggle.',
      table: {
        category: 'Atributos',
      },
    },

    size: {
      control: 'select',
      options: SIZE_LIST,
      description:
        'Tamaño visual del toggle.',
      table: {
        category: 'Atributos',
      },
    },

    textPosition: {
      control: 'select',
      options: POSITION_LIST,
      description:
        'Posición del texto respecto al control.',
      table: {
        category: 'Atributos',
      },
    },

    toggled: {
      action: 'toggled',
      description:
        'Emitido cuando cambia el estado del toggle.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    checked: false,
    disabled: false,
    label: 'Activar función',
    ariaLabel: 'Activar función',
    size: 'm',
    textPosition: 'right',
  },

  render: (args) => html`
    <dcx-web-toggle
      .checked=${args.checked}
      .disabled=${args.disabled}
      .label=${args.label}
      .ariaLabel=${args.ariaLabel}
      size=${args.size}
      textPosition=${args.textPosition}
    >
    </dcx-web-toggle>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const CheckedByDefault: Story = {
  args: {
    checked: true,
    label: 'Activo por defecto',
    ariaLabel: 'Toggle activo',
  },
};

export const DisabledToggle: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'No se puede interactuar',
    ariaLabel: 'Toggle deshabilitado',
  },
};

export const AriaOnlyToggle: Story = {
  args: {
    checked: false,
    label: null,
    ariaLabel:
      'Toggle sin label visible',
  },
};

export const SmallToggle: Story = {
  args: {
    size: 's',
    label: 'Toggle pequeño',
    ariaLabel: 'Toggle pequeño',
  },
};

export const MediumToggle: Story = {
  args: {
    size: 'm',
    checked: true,
    label: 'Toggle mediano',
    ariaLabel: 'Toggle mediano',
  },
};

export const LargeToggle: Story = {
  args: {
    size: 'l',
    checked: true,
    label: 'Toggle grande',
    ariaLabel: 'Toggle grande',
  },
};

export const ExtraLargeToggle: Story = {
  args: {
    size: 'xl',
    checked: true,
    label: 'Toggle extra grande',
    ariaLabel: 'Toggle extra grande',
  },
};

export const RightLabelToggle: Story = {
  args: {
    checked: true,
    label: 'Label a la derecha',
    textPosition: 'right',
  },
};

export const LeftLabelToggle: Story = {
  args: {
    checked: true,
    label: 'Label a la izquierda',
    textPosition: 'left',
  },
};

export const TopLabelToggle: Story = {
  args: {
    checked: true,
    label: 'Label arriba',
    textPosition: 'top',
  },
};

export const BottomLabelToggle: Story = {
  args: {
    checked: true,
    label: 'Label abajo',
    textPosition: 'bottom',
  },
};

export const Positions: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        gap: var(--sp-6, 24px);
        flex-wrap:wrap;
        align-items:center;
      "
    >
      <dcx-web-toggle
        .checked=${true}
        label="Top"
        textPosition="top"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${true}
        label="Bottom"
        textPosition="bottom"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${true}
        label="Left"
        textPosition="left"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${true}
        label="Right"
        textPosition="right"
      >
      </dcx-web-toggle>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        gap: var(--sp-6, 24px);
        flex-wrap:wrap;
        align-items:center;
      "
    >
      <dcx-web-toggle
        .checked=${true}
        size="s"
        label="S"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${true}
        size="m"
        label="M"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${true}
        size="l"
        label="L"
      >
      </dcx-web-toggle>

      <dcx-web-toggle
        .checked=${true}
        size="xl"
        label="XL"
      >
      </dcx-web-toggle>
    </div>
  `,
};

export const Interactive: Story = {
  render: () => {
    const container = document.createElement(
      'div',
    );

    container.innerHTML = `
      <p>Estado actual: OFF</p>
    `;

    const stateText =
      container.querySelector('p');

    return html`
      <div
        style="
          display:flex;
          flex-direction:column;
          gap: var(--sp-3, 12px);
          align-items:flex-start;
        "
      >
        <dcx-web-toggle
          label="Click para cambiar"
          @toggled=${(
            e: CustomEvent<boolean>,
          ) => {
            if (stateText) {
              stateText.textContent =
                `Estado actual: ${
                  e.detail
                    ? 'ON'
                    : 'OFF'
                }`;
            }
          }}
        >
        </dcx-web-toggle>

        ${container}
      </div>
    `;
  },
};