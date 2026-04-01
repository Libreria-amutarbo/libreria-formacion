
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
      control: { type: 'object' },
      description: 'Configuración del paginador',
      table: { category: 'Attributes', type: { summary: 'DcxPaginator' } },
    },
    limitedButtons: {
      control: { type: 'boolean' },
      description: 'Muestra los botones de ir al principio/fin',
      table: { category: 'Attributes' },
    },
    showItemsPerPageInfo: {
      control: { type: 'boolean' },
      description: 'Muestra el resumen de items por página (derecha)',
      table: { category: 'Attributes' },
    },
    showPageInfo: {
      control: { type: 'boolean' },
      description: 'Muestra la información de página actual (derecha)',
      table: { category: 'Attributes' },
    },
    pageChange: {
      action: 'pageChange',
      description: 'Emite el número de página seleccionada',
      table: { category: 'Events', type: { summary: 'EventEmitter<number>' } },
    },
    totalPagesChange: {
      action: 'totalPagesChange',
      description: 'Emite el total de páginas calculado',
      table: { category: 'Events', type: { summary: 'EventEmitter<number>' } },
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

