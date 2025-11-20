import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgPaginatorComponent } from '../../dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import { fn } from '@storybook/test';

const ActionsData = {
  pageChange: fn(),
  onNextPage: fn(),
  onPrevPage: fn(),
};

const meta: Meta<DcxNgPaginatorComponent> = {
  title: 'DCXLibrary/Paginator/UnStyled',
  component: DcxNgPaginatorComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Paginador sin estilos: aspecto nativo del navegador, sin personalización visual.
        `,
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number' },
      description: 'Página actual',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: { type: 'number' },
      description: 'Total de páginas',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    itemsPerPage: {
      control: { type: 'number' },
      description: 'Elementos por página',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    nextButton: {
      control: { type: 'text' },
      description: 'Texto del botón siguiente',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Siguiente' },
      },
    },
    prevButton: {
      control: { type: 'text' },
      description: 'Texto del botón anterior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Anterior' },
      },
    },
    pageChange: {
      action: 'pageChange',
      description: 'Evento emitido cuando cambia la página',
    },
    onNextPage: {
      action: 'onNextPage',
      description: 'Evento emitido al ir a la siguiente página',
    },
    onPrevPage: {
      action: 'onPrevPage',
      description: 'Evento emitido al ir a la página anterior',
    },
  },
  args: {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10,
    disabled: false,
    nextButton: 'Siguiente',
    prevButton: 'Anterior',
    pageChange: ActionsData.pageChange,
    onNextPage: ActionsData.onNextPage,
    onPrevPage: ActionsData.onPrevPage,
  },
};

export default meta;
type Story = StoryObj<DcxNgPaginatorComponent>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};
