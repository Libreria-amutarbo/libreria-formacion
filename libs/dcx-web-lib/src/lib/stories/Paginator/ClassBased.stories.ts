import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-paginator/dcx-web-paginator.component';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Paginator',
  component: 'dcx-web-paginator',
  tags: ['autodocs'],

  parameters: {
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    paginator: {
      control: 'object',
      description: 'Configuración del paginador.',
      table: {
        category: 'Atributos',
      },
    },

    limitedButtons: {
      control: 'boolean',
      description: 'Muestra botones de primera y última página.',
      table: {
        category: 'Atributos',
      },
    },

    showItemsPerPageInfo: {
      control: 'boolean',
      description: 'Muestra selector de items por página y rango.',
      table: {
        category: 'Atributos',
      },
    },

    showPageInfo: {
      control: 'boolean',
      description: 'Muestra "Página X de Y".',
      table: {
        category: 'Atributos',
      },
    },

    pageSizeOptions: {
      control: 'object',
      description: 'Opciones disponibles para items por página.',
      table: {
        category: 'Atributos',
      },
    },

    pageChange: {
      action: 'pageChange',
      description: 'Se emite al cambiar de página.',
      table: {
        category: 'Eventos',
      },
    },

    totalPagesChange: {
      action: 'totalPagesChange',
      description: 'Se emite cuando cambia el total de páginas.',
      table: {
        category: 'Eventos',
      },
    },

    itemsPerPageChange: {
      action: 'itemsPerPageChange',
      description: 'Se emite al cambiar items por página.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    paginator: {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 1,
    },

    limitedButtons: false,
    showItemsPerPageInfo: false,
    showPageInfo: false,

    pageSizeOptions: [5, 10, 20],
  },

  render: args => html`
    <dcx-web-paginator
      .paginator=${args.paginator}
      .pageSizeOptions=${args.pageSizeOptions}
      ?limitedButtons=${args.limitedButtons}
      ?showItemsPerPageInfo=${args.showItemsPerPageInfo}
      ?showPageInfo=${args.showPageInfo}
    >
    </dcx-web-paginator>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 1 - Paginator por defecto.',
      },
    },
  },
};

export const WithSelector: Story = {
  args: {
    paginator: {
      totalItems: 21,
      itemsPerPage: 5,
      currentPage: 1,
    },

    showItemsPerPageInfo: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 2 - Paginator con selector de elementos por página.',
      },
    },
  },
};

export const LimitedButtons: Story = {
  args: {
    paginator: {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 1,
    },

    limitedButtons: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo 3 - Paginator con navegación a la primera y última posición.',
      },
    },
  },
};

export const WithPageInfo: Story = {
  args: {
    paginator: {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 2,
    },

    showPageInfo: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 4 - Conociendo la página del total seleccionada.',
      },
    },
  },
};

export const FirstPageState: Story = {
  args: {
    paginator: {
      totalItems: 120,
      itemsPerPage: 10,
      currentPage: 1,
    },

    limitedButtons: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Estado inicial: primera página activa y flecha izquierda deshabilitada.',
      },
    },
  },
};

export const MiddleWithEllipsis: Story = {
  args: {
    paginator: {
      totalItems: 300,
      itemsPerPage: 10,
      currentPage: 12,
    },

    limitedButtons: true,
  },

  parameters: {
    docs: {
      description: {
        story: 'Estado intermedio con elipsis y navegación extendida.',
      },
    },
  },
};

export const LastPageState: Story = {
  args: {
    paginator: {
      totalItems: 120,
      itemsPerPage: 10,
      currentPage: 12,
    },

    limitedButtons: false,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Estado final: última página activa y flecha derecha deshabilitada.',
      },
    },
  },
};

export const CustomPageSizes: Story = {
  args: {
    paginator: {
      totalItems: 500,
      itemsPerPage: 25,
      currentPage: 1,
    },

    showItemsPerPageInfo: true,

    pageSizeOptions: [10, 25, 50, 100],
  },

  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo 5 - Paginator con opciones de tamaño de página personalizadas.',
      },
    },
  },
};
