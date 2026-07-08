
import type { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgPaginatorComponent,
  defaultPaginator,
  knowPageSelected,
  limitedPaginator,
  selectPerPage,
} from '@dcx-ng-components/dcx-ng-lib';


const meta: Meta<DcxNgPaginatorComponent> = {
  title: 'DCXLibrary/Components/Paginator',
  component: DcxNgPaginatorComponent,
  tags: ['autodocs'],
  args: {
    paginator: defaultPaginator,
    limitedButtons: false,
    showItemsPerPageInfo: false,
    showPageInfo: false,
  },
  argTypes: {
    paginator: {
      name: 'paginator',
      control: { type: 'object' },
      description: 'Configuración del paginador (totalItems, itemsPerPage, currentPage).',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxPaginator' },
        defaultValue: { summary: '{ totalItems: 100, itemsPerPage: 10, currentPage: 1 }' },
      },
    },
    limitedButtons: {
      name: 'limitedButtons',
      control: { type: 'boolean' },
      description: 'Muestra los botones para ir a la primera y última página.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showItemsPerPageInfo: {
      name: 'showItemsPerPageInfo',
      control: { type: 'boolean' },
      description: 'Muestra el selector de items por página y el rango visible.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showPageInfo: {
      name: 'showPageInfo',
      control: { type: 'boolean' },
      description: 'Muestra la información de la página actual ("Página X de Y").',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pageChange: {
      name: 'pageChange',
      action: 'pageChange',
      description: 'Se emite cuando el usuario selecciona una página.',
      table: {
        category: 'Eventos',
        type: { summary: '(page: number) => void' },
      },
    },
    totalPagesChange: {
      name: 'totalPagesChange',
      action: 'totalPagesChange',
      description: 'Se emite cuando cambia el total de páginas calculado.',
      table: {
        category: 'Eventos',
        type: { summary: '(totalPages: number) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgPaginatorComponent>;

export const Default: Story = {
  args: {
    paginator: defaultPaginator,
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 1 - Paginator por defecto.'
      }
    }
  }
};

export const WithSelector: Story = {
  args: {
    paginator: selectPerPage,
    showItemsPerPageInfo: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 2 - Paginator con selector de elementos por página.'
      }
    }
  }
};

export const LimitedButtons: Story = {
  args: {
    paginator: limitedPaginator,
    limitedButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 3 - Paginator con navegación a la primera y última posición.'
      }
    }
  }
};

export const WithPageInfo: Story = {
  args: {
    paginator: knowPageSelected,
    showPageInfo: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo 4 - Conociendo la página del total seleccionada.'
      }
    }
  }
};

export const FirstPageState: Story = {
  args: {
    paginator: {
      totalItems: 120,
      itemsPerPage: 10,
      currentPage: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial: primera página activa y flecha izquierda deshabilitada.',
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
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado final: última página activa y flecha derecha deshabilitada.',
      },
    },
  },
};

