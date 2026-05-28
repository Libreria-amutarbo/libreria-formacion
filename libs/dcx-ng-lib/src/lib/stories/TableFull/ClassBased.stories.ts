import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from '@storybook/test';

import { DcxHeaderData } from '../../core/interfaces';
import {
  USER_HEADERS_FULL,
  USER_HEADERS_WITH_MENU,
  USER_HEADERS_WITH_INLINE,
  generateUserRows,
} from '../../core/fixtures';
import {
  DcxNgFullTableComponent,
  DcxNgFullTableTemplateDirective,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = {
  sortChange: fn(),
  rowsPerPageChange: fn(),
  pageChange: fn(),
  cellEdit: fn(),
  rowAction: fn(),
};

// ======================
// DATOS DE DEMO (desde mock centralizado)
// ======================
// Se agregan templates personalizados a los headers base
const BASE_HEADERS: DcxHeaderData[] = USER_HEADERS_FULL.map(h => {
  if (h.key === 'age') return { ...h, template: 'age' };
  if (h.key === 'country') return { ...h, headerTemplate: 'countryHeader' };
  return h;
});

const HEADERS_MENU: DcxHeaderData[] = [
  ...BASE_HEADERS,
  ...USER_HEADERS_WITH_MENU.filter(h => h.key === 'actions'),
];

const HEADERS_INLINE: DcxHeaderData[] = [
  ...BASE_HEADERS,
  ...USER_HEADERS_WITH_INLINE.filter(h => h.key === 'actions'),
];

const ROWS = generateUserRows(40);

// ======================
// META
// ======================
const meta: Meta<DcxNgFullTableComponent> = {
  title: 'DCXLibrary/Components/Table Full',
  component: DcxNgFullTableComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgFullTableTemplateDirective],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true, // muestra todos los controles ordenados
    },
    docs: {
      description: {
        component: ``,
      },
    },
  },
  argTypes: {
    // ========== DATOS ==========
    headers: {
      control: false,
      description: 'Definición de las columnas de la tabla.',
      table: {
        category: 'Data',
        type: { summary: 'readonly DcxHeaderData[]' },
        defaultValue: { summary: '[]' },
      },
    },
    rows: {
      control: false,
      description: 'Filas a renderizar en la tabla.',
      table: {
        category: 'Data',
        type: { summary: 'readonly TableRow[]' },
        defaultValue: { summary: '[]' },
      },
    },

    // ========== CONFIGURACIÓN VISUAL ==========
    showGrid: {
      control: 'boolean',
      description: 'Muestra bordes de cuadrícula en celdas y cabeceras.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showStripped: {
      control: 'boolean',
      description: 'Activa las filas zebra (stripeadas).',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    scroll: {
      control: 'boolean',
      description:
        'Si es true, la tabla se hace scrollable dentro de un contenedor con altura fija.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    scrollHeight: {
      control: 'text',
      description: 'Altura máxima del área scrollable cuando scroll = true.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: `'320px'` },
      },
    },

    // ========== PAGINACIÓN ==========
    paginator: {
      control: 'boolean',
      description: 'Habilita el paginador al pie de la tabla.',
      table: {
        category: 'Pagination',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    rowsPerPage: {
      control: 'number',
      description: 'Número de filas por página.',
      table: {
        category: 'Pagination',
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    rowsPerPageOptions: {
      control: { type: 'object' },
      description:
        'Lista de opciones disponibles en el selector de filas/página.',
      table: {
        category: 'Pagination',
        type: { summary: 'readonly number[]' },
        defaultValue: { summary: '[10, 20, 50]' },
      },
    },

    // ========== ÍNDICE DE FILA ==========
    showRowIndex: {
      control: 'boolean',
      description: 'Muestra la columna con el índice de fila (1,2,3...).',
      table: {
        category: 'Row index',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    rowIndexLabel: {
      control: 'text',
      description: 'Texto de la cabecera de la columna de índice.',
      table: {
        category: 'Row index',
        type: { summary: 'string' },
        defaultValue: { summary: `'#'` },
      },
    },

    // ========== COLUMNAS FROZEN ==========
    frozenLeftSeparator: {
      control: 'boolean',
      description:
        'Dibuja un separador visual a la derecha del último grupo de columnas frozen a la izquierda.',
      table: {
        category: 'Frozen columns',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    frozenRightSeparator: {
      control: 'boolean',
      description:
        'Dibuja un separador visual a la izquierda del grupo de columnas frozen a la derecha.',
      table: {
        category: 'Frozen columns',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    // ========== OUTPUTS / EVENTOS ==========
    sortChange: {
      action: 'sortChange',
      description:
        'Se emite cuando cambia el orden de una columna. Valor: { key, dir }.',
      table: {
        category: 'Events',
      },
    },
    rowsPerPageChange: {
      action: 'rowsPerPageChange',
      description:
        'Se emite cuando el usuario cambia el número de filas por página.',
      table: {
        category: 'Events',
      },
    },
    pageChange: {
      action: 'pageChange',
      description: 'Se emite al cambiar de página.',
      table: {
        category: 'Events',
      },
    },
    cellEdit: {
      action: 'cellEdit',
      description:
        'Se emite al confirmar la edición de una celda. Incluye fila, clave, valor antiguo y nuevo.',
      table: {
        category: 'Events',
      },
    },
    rowAction: {
      action: 'rowAction',
      description:
        'Se emite cuando se dispara una acción de la columna de acciones (inline o menú).',
      table: {
        category: 'Events',
      },
    },
  },
  // DEFAULTS globales (lo que aparece ya seteado en Docs/Controls)
  args: {
    showGrid: false,
    showStripped: true,
    scroll: true,
    scrollHeight: '320px',
    paginator: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    showRowIndex: true,
    rowIndexLabel: '#',
    frozenLeftSeparator: true,
    frozenRightSeparator: true,
  },
};

export default meta;

type Story = StoryObj<DcxNgFullTableComponent>;

// ======================
// STORY 1: GridScroll (acciones en MENÚ)
// ======================
export const GridScroll: Story = {
  args: {
    headers: HEADERS_MENU,
    rows: ROWS,
  },
  render: (args, { updateArgs }) => ({
    props: {
      ...args,

      // Handlers conectados con Storybook actions y con la tabla
      sortChange(e: unknown) {
        ActionsData.sortChange(e);
      },
      rowsPerPageChange(this: any, size: number) {
        ActionsData.rowsPerPageChange(size);
        this.rowsPerPage = size;
        updateArgs({ rowsPerPage: size });
      },
      pageChange(page: number) {
        ActionsData.pageChange(page);
      },
      cellEdit(e: unknown) {
        ActionsData.cellEdit(e);
      },
      rowAction(e: unknown) {
        ActionsData.rowAction(e);
        // aquí podrías hacer console.log o lógica adicional
      },
    },

    template: `
      <dcx-ng-full-table
        [headers]="headers"
        [rows]="rows"
        [showGrid]="showGrid"
        [showStripped]="showStripped"
        [scroll]="scroll"
        [scrollHeight]="scrollHeight"
        [paginator]="paginator"
        [rowsPerPage]="rowsPerPage"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [showRowIndex]="showRowIndex"
        [rowIndexLabel]="rowIndexLabel"
        [frozenLeftSeparator]="frozenLeftSeparator"
        [frozenRightSeparator]="frozenRightSeparator"
        (sortChange)="sortChange($event)"
        (rowsPerPageChange)="rowsPerPageChange($event)"
        (pageChange)="pageChange($event)"
        (cellEdit)="cellEdit($event)"
        (rowAction)="rowAction($event)"
      >
        <!-- CELDA PERSONALIZADA: EDAD -->
        <ng-template dcxNgTableTemplateRefactor="age" let-row let-key="key">
          <span
            [style.font-weight]="row[key] >= 40 ? 'bold' : 'normal'"
            [style.color]="row[key] >= 40 ? 'crimson' : 'inherit'"
          >
            {{ row[key] }} años
          </span>
        </ng-template>

        <!-- CABECERA PERSONALIZADA DE PAÍS -->
        <ng-template dcxNgTableTemplateRefactor="countryHeader" let-header>
          🌍 {{ header.name }}
        </ng-template>

        <!-- EMPTY STATE -->
        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <em>No hay registros ({{ headers.length }} columnas)</em>
        </ng-template>
      </dcx-ng-full-table>
    `,
  }),
};

// ======================
// STORY 2: InlineActions (acciones como iconos)
// ======================
export const InlineActions: Story = {
  args: {
    headers: HEADERS_INLINE,
    rows: ROWS,
  },
  render: (args, { updateArgs }) => ({
    props: {
      ...args,

      sortChange(e: unknown) {
        ActionsData.sortChange(e);
      },
      rowsPerPageChange(this: any, size: number) {
        ActionsData.rowsPerPageChange(size);
        this.rowsPerPage = size;
        updateArgs({ rowsPerPage: size });
      },
      pageChange(page: number) {
        ActionsData.pageChange(page);
      },
      cellEdit(e: unknown) {
        ActionsData.cellEdit(e);
      },
      rowAction(e: unknown) {
        ActionsData.rowAction(e);
      },
    },

    template: `
      <dcx-ng-full-table
        [headers]="headers"
        [rows]="rows"
        [showGrid]="showGrid"
        [showStripped]="showStripped"
        [scroll]="scroll"
        [scrollHeight]="scrollHeight"
        [paginator]="paginator"
        [rowsPerPage]="rowsPerPage"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [showRowIndex]="showRowIndex"
        [rowIndexLabel]="rowIndexLabel"
        [frozenLeftSeparator]="frozenLeftSeparator"
        [frozenRightSeparator]="frozenRightSeparator"
        (sortChange)="sortChange($event)"
        (rowsPerPageChange)="rowsPerPageChange($event)"
        (pageChange)="pageChange($event)"
        (cellEdit)="cellEdit($event)"
        (rowAction)="rowAction($event)"
      >
        <!-- Reutilizamos los mismos templates que en GridScroll -->

        <ng-template dcxNgTableTemplateRefactor="age" let-row let-key="key">
          <span
            [style.font-weight]="row[key] >= 40 ? 'bold' : 'normal'"
            [style.color]="row[key] >= 40 ? 'crimson' : 'inherit'"
          >
            {{ row[key] }} años
          </span>
        </ng-template>

        <ng-template dcxNgTableTemplateRefactor="countryHeader" let-header>
          🌍 {{ header.name }}
        </ng-template>

        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <em>No hay registros ({{ headers.length }} columnas)</em>
        </ng-template>
      </dcx-ng-full-table>
    `,
  }),
};

// ======================
// TEST DE ORDENACIÓN + FILTRO (GridScroll)
// ======================
GridScroll.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Ordenación por Edad
  const ageHeader = await canvas.findByRole('columnheader', { name: /Edad/i });

  await userEvent.click(ageHeader);
  await expect(ageHeader).toHaveAttribute('aria-sort', 'ascending');

  await userEvent.click(ageHeader);
  await expect(ageHeader).toHaveAttribute('aria-sort', 'descending');

  // Pequeño smoke test de filtro por nombre
  const nameFilter = await canvas.findByPlaceholderText(/Filtrar Nombre/i);
  await userEvent.type(nameFilter, 'Ana');

  const cell = await canvas.findByText(/Ana/i);
  await expect(cell).toBeDefined();
};
