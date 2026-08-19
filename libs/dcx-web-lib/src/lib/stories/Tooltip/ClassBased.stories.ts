import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-tooltip/dcx-web-tooltip.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../dcx-web-components/dcx-web-icon/dcx-web-icon.component';

import {
  DCX_TOOLTIP_ARROW_ALIGNMENTS,
  DCX_TOOLTIP_VARIANTS,
} from '../../core/defaults/tooltip';

import { DCX_POSITIONS } from '../../core/interfaces';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Tooltip',
  component: 'dcx-web-tooltip',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    position: {
      control: 'select',
      options: DCX_POSITIONS,
      description:
        'Posición preferida del tooltip respecto al elemento disparador.',
      table: {
        category: 'Atributos',
      },
    },

    arrowAlignment: {
      control: 'select',
      options: DCX_TOOLTIP_ARROW_ALIGNMENTS,
      description: 'Alineación visual de la flecha dentro del tooltip.',
      table: {
        category: 'Atributos',
      },
    },

    variant: {
      control: 'select',
      options: DCX_TOOLTIP_VARIANTS,
      description: 'Variante visual del tooltip.',
      table: {
        category: 'Atributos',
      },
    },

    content: {
      control: 'text',
      description: 'Contenido de texto plano mostrado dentro del tooltip.',
      table: {
        category: 'Atributos',
      },
    },

    contentHtml: {
      control: 'text',
      description:
        'Contenido HTML sanitizado. Los elementos interactivos se eliminan automáticamente.',
      table: {
        category: 'Atributos',
      },
    },

    hideTooltipOnClick: {
      control: 'boolean',
      description:
        'Oculta el tooltip al hacer clic sobre el elemento disparador.',
      table: {
        category: 'Atributos',
      },
    },

    visible: {
      control: false,
      table: {
        category: 'Estado interno',
      },
    },

    actualPosition: {
      control: false,
      table: {
        category: 'Estado interno',
      },
    },
  },

  args: {
    position: 'top',
    arrowAlignment: 'center',
    variant: 'default',
    hideTooltipOnClick: false,
    content: 'Tooltip por defecto',
    contentHtml: '',
  },

  render: args => html`
    <div
        style="
        width: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
        "
    >
        <dcx-web-tooltip
        .position=${args.position}
        .arrowAlignment=${args.arrowAlignment}
        .variant=${args.variant}
        .content=${args.content}
        .contentHtml=${args.contentHtml}
        .hideTooltipOnClick=${args.hideTooltipOnClick}
        >
        <dcx-web-button
            label="Pasa el ratón o enfoca"
        >
        </dcx-web-button>
        </dcx-web-tooltip>
    </div>

  `,
};

export default meta;

type Story = StoryObj;

export const DefaultTooltip: Story = {};

export const TopTooltip: Story = {
  args: {
    position: 'top',
    content: 'Tooltip arriba',
  },
};

export const BottomTooltip: Story = {
  args: {
    position: 'bottom',
    content: 'Tooltip abajo',
  },
};

export const LeftTooltip: Story = {
  args: {
    position: 'left',
    content: 'Tooltip a la izquierda',
  },
};

export const RightTooltip: Story = {
  args: {
    position: 'right',
    content: 'Tooltip a la derecha',
  },
};

export const ArrowCenter: Story = {
  args: {
    content: 'Tooltip centro',
    position: 'top',
    arrowAlignment: 'center',
  },
};

export const ArrowLeft: Story = {
  args: {
    content: 'Tooltip izquierda',
    position: 'top',
    arrowAlignment: 'left',
  },
};

export const ArrowRight: Story = {
  args: {
    content: 'Tooltip derecha',
    position: 'top',
    arrowAlignment: 'right',
  },
};

export const PrimaryTooltip: Story = {
  args: {
    content: 'Tooltip con variante primary',
    position: 'top',
    variant: 'primary',
  },
};

export const HideOnClickTooltip: Story = {
  args: {
    content: 'Tooltip ocultable',
    hideTooltipOnClick: true,
  },
};

export const LongContentTooltip: Story = {
  args: {
    content:
      'Este es un contenido de tooltip muy largo que debería ajustarse correctamente y probar el sistema de posicionamiento inteligente con un texto más extenso que podría causar problemas cerca de los bordes del viewport.',
    position: 'right',
  },

  render: args => html`
    <div
      style="
        height:200px;
        position:relative;
        padding:20px;
      "
    >
      <div
        style="
          position:absolute;
          top:40px;
          left:20px;
        "
      >
        <dcx-web-tooltip
          .position=${args.position}
          .arrowAlignment=${args.arrowAlignment}
          .variant=${args.variant}
          .content=${args.content}
          .contentHtml=${args.contentHtml}
          .hideTooltipOnClick=${args.hideTooltipOnClick}
        >
          <dcx-web-button
            label="Contenido largo"
          >
          </dcx-web-button>
        </dcx-web-tooltip>
      </div>
    </div>
  `,
};

export const WithIcon: Story = {
  args: {
    content: 'Este es un icono con tooltip',
    position: 'right',
  },

  render: args => html`
    <div
      style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
      "
    >
      <dcx-web-tooltip
        .position=${args.position}
        .arrowAlignment=${args.arrowAlignment}
        .variant=${args.variant}
        .content=${args.content}
        .contentHtml=${args.contentHtml}
        .hideTooltipOnClick=${args.hideTooltipOnClick}
      >
        <dcx-web-icon
          name="info-circle"
          size="l"
        >
        </dcx-web-icon>
      </dcx-web-tooltip>
    </div>
  `,
};

export const WithFormattedContent: Story = {
  args: {
    contentHtml:
      '<p><strong>Importante:</strong> revisa <em>todos</em> los campos</p>',
    position: 'top',
  },

  render: args => html`
    <div
      style="
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:80px 0;
      "
    >
      <dcx-web-tooltip
        .position=${args.position}
        .arrowAlignment=${args.arrowAlignment}
        .variant=${args.variant}
        .content=${args.content}
        .contentHtml=${args.contentHtml}
        .hideTooltipOnClick=${args.hideTooltipOnClick}
      >
        <dcx-web-button
          label="Pasa el ratón o enfoca"
        >
        </dcx-web-button>
      </dcx-web-tooltip>
    </div>
  `,
};
