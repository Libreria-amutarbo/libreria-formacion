import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-spinner/dcx-web-spinner.component';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Spinner',
  component: 'dcx-web-spinner',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
      description: 'Tamaño del spinner',
      table: {
        category: 'Atributos',
      },
    },

    wrapper: {
      control: 'boolean',
      description: 'Activa el modo overlay sobre contenido proyectado.',
      table: {
        category: 'Atributos',
      },
    },

    delay: {
      control: 'number',
      description: 'Milisegundos de espera antes de mostrar el spinner.',
      table: {
        category: 'Atributos',
      },
    },

    title: {
      control: 'text',
      description: 'Texto principal mostrado por el spinner.',
      table: {
        category: 'Atributos',
      },
    },

    description: {
      control: 'text',
      description: 'Texto secundario mostrado bajo el título.',
      table: {
        category: 'Atributos',
      },
    },

    color: {
      control: 'color',
      description: 'Color personalizado para el arco activo.',
      table: {
        category: 'Atributos',
      },
    },

    ariaLabel: {
      control: 'text',
      description: 'Texto anunciado por lectores de pantalla.',
      table: {
        category: 'Atributos',
      },
    },
  },

  args: {
    size: 'm',
    title: 'Cargando…',
    description: 'Esto puede tardar unos segundos',
    wrapper: false,
    delay: 0,
    color: null,
    ariaLabel: null,
  },

  render: args => html`
    <div
      style="
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:180px;
      "
    >
      <dcx-web-spinner
        size=${args.size}
        .wrapper=${args.wrapper}
        .delay=${args.delay}
        title=${args.title}
        description=${args.description}
        .color=${args.color}
        .ariaLabel=${args.ariaLabel}
      >
      </dcx-web-spinner>
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div
      style="
        display:flex;
        align-items:center;
        gap:32px;
        flex-wrap:wrap;
      "
    >
      <dcx-web-spinner
        size="s"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="m"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="xl"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>
    </div>
  `,
};

export const CustomColor: Story = {
  name: 'Color personalizado',

  render: () => html`
    <div
      style="
        display:flex;
        align-items:center;
        gap:32px;
      "
    >
      <dcx-web-spinner
        size="l"
        .delay=${0}
        aria-label="Cargando"
      ></dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=${0}
        color="#7c3aed"
        aria-label="Cargando"
      ></dcx-web-spinner>
    </div>
  `,
};

export const WithText: Story = {
  name: 'Con título y descripción',

  render: () => html`
    <div
      style="
        display:flex;
        gap:64px;
        flex-wrap:wrap;
        padding:24px;
      "
    >
      <dcx-web-spinner
        size="l"
        .delay=${0}
        title="Cargando…"
      >
      </dcx-web-spinner>

      <dcx-web-spinner
        size="l"
        .delay=${0}
        title="Procesando"
        description="Por favor, espera"
      >
      </dcx-web-spinner>
    </div>
  `,
};

export const SpinnerDelayShowcase: Story = {
  name: 'Con delay',

  args: {
    title: 'Cargando con retraso…',
    description: 'Este spinner solo aparece pasado 1 segundo',
    delay: 1000,
  },

  render: args => html`
    <div
      style="
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:220px;
      "
    >
      <dcx-web-spinner
        size=${args.size}
        .delay=${args.delay}
        title=${args.title}
        description=${args.description}
        .color=${args.color}
      >
      </dcx-web-spinner>
    </div>
  `,
};

export const SpinnerWrapperShowcase: Story = {
  name: 'Modo wrapper (overlay)',

  args: {
    title: 'Cargando contenido…',
    wrapper: true,
    delay: 0,
  },

  render: args => html`
    <div
      style="
        display:flex;
        justify-content:center;
        padding:24px;
      "
    >
      <div
        style="
          max-width:384px;
          width:100%;
          border:1px dashed var(--border-light, #d1d5db);
          border-radius:var(--r-md, 6px);
          overflow:hidden;
        "
      >
        <dcx-web-spinner
          size=${args.size}
          .wrapper=${args.wrapper}
          .delay=${args.delay}
          title=${args.title}
        >
          <div
            style="
              padding:16px;
            "
          >
            <h4>Contenido</h4>

            <p>
              Este es un ejemplo del contenido
              que se muestra bajo el spinner
              en modo wrapper.
            </p>

            <p>
              El spinner se superpone a este
              contenido como un overlay.
            </p>
          </div>
        </dcx-web-spinner>
      </div>
    </div>
  `,
};
