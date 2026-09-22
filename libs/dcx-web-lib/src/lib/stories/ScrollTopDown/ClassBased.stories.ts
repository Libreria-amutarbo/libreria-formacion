import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-scroll-top-down/dcx-web-scroll-top-down.component';

import { DCX_SIZES } from '../../core/interfaces/generic';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/ScrollTopDown',

  component: 'dcx-web-scroll-top-down',

  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    container: {
      control: false,
      description:
        'Contenedor HTML opcional para aplicar el scroll. Si no se provee, utiliza la ventana.',
      table: {
        category: 'Atributos',
      },
    },

    smooth: {
      control: 'boolean',
      description: 'Activa o desactiva el comportamiento de scroll suave.',
      table: {
        category: 'Atributos',
      },
    },

    size: {
      control: 'select',
      options: DCX_SIZES,
      description: 'Controla el tamaño visual de los botones.',
      table: {
        category: 'Atributos',
      },
    },

    iconSize: {
      control: 'select',
      options: DCX_SIZES,
      description: 'Tamaño visual de los iconos.',
      table: {
        category: 'Atributos',
      },
    },

    showTop: {
      control: 'boolean',
      description: 'Muestra u oculta el botón de desplazamiento superior.',
      table: {
        category: 'Atributos',
      },
    },

    showBottom: {
      control: 'boolean',
      description: 'Muestra u oculta el botón de desplazamiento inferior.',
      table: {
        category: 'Atributos',
      },
    },

    topLabel: {
      control: 'text',
      description: 'Etiqueta accesible del botón para subir.',
      table: {
        category: 'Atributos',
      },
    },

    bottomLabel: {
      control: 'text',
      description: 'Etiqueta accesible del botón para bajar.',
      table: {
        category: 'Atributos',
      },
    },

    topIcon: {
      control: 'text',
      description: 'Nombre del icono utilizado para subir.',
      table: {
        category: 'Atributos',
      },
    },

    bottomIcon: {
      control: 'text',
      description: 'Nombre del icono utilizado para bajar.',
      table: {
        category: 'Atributos',
      },
    },

    groupLabel: {
      control: 'text',
      description: 'Etiqueta accesible aplicada al grupo de controles.',
      table: {
        category: 'Atributos',
      },
    },
  },

  args: {
    smooth: true,
    size: 'm',
    iconSize: 's',
    showTop: true,
    showBottom: true,
    topLabel: 'Ir arriba',
    bottomLabel: 'Ir abajo',
    topIcon: 'chevron-up',
    bottomIcon: 'chevron-down',
    groupLabel: 'Controles de desplazamiento',
  },
};

export default meta;

type Story = StoryObj;

const longContent = Array.from(
  { length: 20 },
  (_, index) => html`
    <p
      style="
        margin: 0 0 var(--sp-4,16px);
        color: var(--text-muted,#696e75);
      "
    >
      Contenido de ejemplo ${index + 1}. Este texto existe
      únicamente para generar scroll.
    </p>
  `,
);

export const Default: Story = {
  render: args => html`
    <div
      style="
        min-height:1200px;
        padding:var(--sp-8,32px);
        background:var(--bg-default,#ffffff);
      "
    >
      <div
        style="
          max-width:720px;
          margin:0 auto;
          padding-right:96px;
        "
      >
        <h2>Window scroll demo</h2>

        ${longContent}
        ${longContent}
      </div>

      <dcx-web-scroll-top-down
        .smooth=${args.smooth}
        size=${args.size}
        iconSize=${args.iconSize}
        .showTop=${args.showTop}
        .showBottom=${args.showBottom}
        topLabel=${args.topLabel}
        bottomLabel=${args.bottomLabel}
        topIcon=${args.topIcon}
        bottomIcon=${args.bottomIcon}
        groupLabel=${args.groupLabel}
      >
      </dcx-web-scroll-top-down>
    </div>
  `,
};

export const ScrollableContainer: Story = {
  name: 'Scrollable container',

  render: args => html`
    <div
      style="
        padding:var(--sp-8,32px);
        min-height:520px;
        background:var(--bg-surface,#f4f5f7);
      "
    >
      <div
        style="
          position:relative;
          max-width:820px;
          margin:0 auto;
          height:420px;
          overflow:hidden;
          border:1px solid var(--border-light,#d1d5db);
          border-radius:var(--r-xl,12px);
          background:var(--bg-default,#ffffff);
        "
      >
        <div
          id="storybook-scroll-container"
          style="
            height:100%;
            overflow:auto;
            padding:var(--sp-5,20px);
          "
        >
          <h2>Contenedor con scroll interno</h2>

          ${longContent}
          ${longContent}
        </div>

        <dcx-web-scroll-top-down
          id="storybook-scroll-fab"
          style="
            position:absolute;
            right:16px;
            bottom:16px;
          "
          .smooth=${args.smooth}
          size=${args.size}
          iconSize=${args.iconSize}
          .showTop=${args.showTop}
          .showBottom=${args.showBottom}
          topLabel=${args.topLabel}
          bottomLabel=${args.bottomLabel}
          topIcon=${args.topIcon}
          bottomIcon=${args.bottomIcon}
          groupLabel=${args.groupLabel}
        >
        </dcx-web-scroll-top-down>
      </div>

      <script>
        requestAnimationFrame(() => {
          const container =
            document.getElementById(
              'storybook-scroll-container',
            );

          const fab =
            document.getElementById(
              'storybook-scroll-fab',
            );

          if (fab && container) {
            fab.container = container;
          }
        });
      </script>
    </div>
  `,
};

const windowTemplate = (args: Record<string, unknown>) => html`
  <div
    style="
      min-height:1200px;
      padding:var(--sp-8,32px);
      background:var(--bg-default,#ffffff);
    "
  >
    <div
      style="
        max-width:720px;
        margin:0 auto;
        padding-right:96px;
      "
    >
      <h2>Scroll demo</h2>

      ${longContent}
      ${longContent}
    </div>

    <dcx-web-scroll-top-down
      .smooth=${args.smooth}
      size=${args.size as string}
      iconSize=${args.iconSize as string}
      .showTop=${args.showTop as boolean}
      .showBottom=${args.showBottom as boolean}
      topLabel=${args.topLabel as string}
      bottomLabel=${args.bottomLabel as string}
      topIcon=${args.topIcon as string}
      bottomIcon=${args.bottomIcon as string}
      groupLabel=${args.groupLabel as string}
    >
    </dcx-web-scroll-top-down>
  </div>
`;

export const TopOnly: Story = {
  name: 'Top only',

  args: {
    showBottom: false,
  },

  render: args => windowTemplate(args),
};

export const BottomOnly: Story = {
  name: 'Bottom only',

  args: {
    showTop: false,
  },

  render: args => windowTemplate(args),
};

export const ExtraLarge: Story = {
  name: 'Extra large (XL)',

  args: {
    size: 'xl',
    iconSize: 'm',
  },

  render: args => windowTemplate(args),
};

export const NoSmooth: Story = {
  name: 'Sin scroll suave',

  args: {
    smooth: false,
  },

  render: args => windowTemplate(args),
};
