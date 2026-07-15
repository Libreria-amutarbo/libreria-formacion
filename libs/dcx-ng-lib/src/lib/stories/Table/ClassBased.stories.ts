import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import {
  PROJECT_ROWS,
  PROJECT_HEADERS,
  PROJECT_HEADERS_FILTERABLE_EDITABLE,
  PROJECT_HEADERS_FROZEN,
  PROJECT_HEADERS_MENU_ACTIONS,
  generateProjectRows,
} from '../../core/fixtures';
import {
  DcxNgTableComponent,
  DcxNgTableTemplateDirective,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = {
  sortChange: fn(),
  searchChange: fn(),
  selectionChange: fn(),
  pageChange: fn(),
  rowsPerPageChange: fn(),
  cellEdit: fn(),
  rowAction: fn(),
};

const meta: Meta<DcxNgTableComponent> = {
  title: 'DCXLibrary/Components/Table',
  component: DcxNgTableComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgTableTemplateDirective],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Tabla de datos con ordenación, búsqueda, selección, filtro por columna, edición inline, columnas fijadas (frozen) y paginación (delegada en `dcx-ng-paginator`). Reconstruida desde cero con arquitectura plana — todo el estado vive como signals en el propio componente, sin servicios ni clases externas — para que sea fácil de leer y mantener.',
      },
    },
  },
  argTypes: {
    headers: {
      control: false,
      description: 'Definición de las columnas de la tabla.',
      table: {
        category: 'Atributos',
        type: { summary: 'readonly DcxHeaderData[]' },
      },
    },
    rows: {
      control: false,
      description: 'Filas a mostrar.',
      table: {
        category: 'Atributos',
        type: { summary: 'readonly DcxTableRow[]' },
      },
    },
    tableTitle: {
      name: 'tableTitle',
      control: { type: 'text' },
      description:
        'Título mostrado en la toolbar. Si está vacío y `searchable` es `false`, la toolbar no se muestra.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    searchable: {
      name: 'searchable',
      control: { type: 'boolean' },
      description: 'Muestra el buscador global en la toolbar.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectable: {
      name: 'selectable',
      control: { type: 'boolean' },
      description: 'Activa la columna de selección (checkbox por fila + "seleccionar todo").',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selectedIds: {
      control: false,
      description: 'Filas seleccionadas (controlado desde fuera del componente).',
      table: {
        category: 'Atributos',
        type: { summary: 'readonly (string | number)[]' },
        defaultValue: { summary: '[]' },
      },
    },
    showGrid: {
      name: 'showGrid',
      control: { type: 'boolean' },
      description: 'Muestra bordes en todas las celdas.',
      table: { category: 'Atributos', type: { summary: 'boolean' } },
    },
    showStripped: {
      name: 'showStripped',
      control: { type: 'boolean' },
      description: 'Alterna el fondo de las filas pares/impares.',
      table: { category: 'Atributos', type: { summary: 'boolean' } },
    },
    showRowIndex: {
      name: 'showRowIndex',
      control: { type: 'boolean' },
      description: 'Añade una columna con el número de fila.',
      table: { category: 'Atributos', type: { summary: 'boolean' } },
    },
    paginator: {
      name: 'paginator',
      control: { type: 'boolean' },
      description: 'Activa la paginación (delegada en dcx-ng-paginator).',
      table: { category: 'Atributos', type: { summary: 'boolean' } },
    },
    rowsPerPage: {
      name: 'rowsPerPage',
      control: { type: 'number' },
      description: 'Filas por página.',
      table: { category: 'Atributos', type: { summary: 'number' } },
    },
    sortChange: {
      name: 'sortChange',
      action: 'sortChange',
      description: 'Se emite al cambiar la ordenación de una columna.',
      table: { category: 'Eventos', type: { summary: 'DcxSort' } },
    },
    searchChange: {
      name: 'searchChange',
      action: 'searchChange',
      description: 'Se emite al escribir en el buscador de la toolbar.',
      table: { category: 'Eventos', type: { summary: 'string' } },
    },
    selectionChange: {
      name: 'selectionChange',
      action: 'selectionChange',
      description: 'Se emite con la lista de ids seleccionados al marcar/desmarcar filas.',
      table: { category: 'Eventos', type: { summary: '(string | number)[]' } },
    },
    rowAction: {
      name: 'rowAction',
      action: 'rowAction',
      description: 'Se emite al pulsar una acción de fila (inline o del menú).',
      table: { category: 'Eventos', type: { summary: 'DcxActionEvent' } },
    },
    cellEdit: {
      name: 'cellEdit',
      action: 'cellEdit',
      description: 'Se emite al confirmar la edición inline de una celda.',
      table: { category: 'Eventos', type: { summary: 'DcxCellEditEvent' } },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgTableComponent>;

// ======================
// 01 · Igual que el mock: toolbar + búsqueda + selección + badges + usuario
// ======================
// `selectedIds` es un input controlado — sin esto, marcar un checkbox en
// el canvas de Storybook no se vería reflejado (el evento se emite, pero
// nadie lo vuelve a inyectar como input). Se conecta con `updateArgs` para
// que el checkbox funcione de verdad al probarlo aquí.
export const Default: Story = {
  args: {
    headers: PROJECT_HEADERS,
    rows: PROJECT_ROWS,
    tableTitle: 'Proyectos activos',
    searchable: true,
    selectable: true,
    selectedIds: [1],
    ...ActionsData,
  },
  render: (args, { updateArgs }) => ({
    props: {
      ...args,
      selectionChange(ids: unknown) {
        ActionsData.selectionChange(ids);
        updateArgs({ selectedIds: ids });
      },
    },
    template: `
      <dcx-ng-table
        [headers]="headers"
        [rows]="rows"
        [tableTitle]="tableTitle"
        [searchable]="searchable"
        [selectable]="selectable"
        [selectedIds]="selectedIds"
        (sortChange)="sortChange($event)"
        (searchChange)="searchChange($event)"
        (selectionChange)="selectionChange($event)"
        (rowAction)="rowAction($event)"
      ></dcx-ng-table>
    `,
  }),
};

// ======================
// 02 · Filtro por columna + edición inline
// ======================
export const FiltroYEdicionInline: Story = {
  args: {
    headers: PROJECT_HEADERS_FILTERABLE_EDITABLE,
    rows: PROJECT_ROWS,
    ...ActionsData,
  },
};

// ======================
// 03 · Columnas fijadas (frozen)
// ======================
export const ColumnasFrozen: Story = {
  args: {
    headers: PROJECT_HEADERS_FROZEN,
    rows: generateProjectRows(20),
    scroll: true,
    scrollHeight: '360px',
    frozenLeftSeparator: true,
    frozenRightSeparator: true,
    ...ActionsData,
  },
};

// ======================
// 04 · Acciones en modo menú (dropdown)
// ======================
export const AccionesMenu: Story = {
  args: {
    headers: PROJECT_HEADERS_MENU_ACTIONS,
    rows: PROJECT_ROWS,
    ...ActionsData,
  },
};

// ======================
// 05 · Con índice de fila + grid + rayado
// ======================
export const IndiceYGrid: Story = {
  args: {
    headers: PROJECT_HEADERS,
    rows: PROJECT_ROWS,
    showRowIndex: true,
    showGrid: true,
    showStripped: true,
    ...ActionsData,
  },
};

// ======================
// 06 · Paginada (dataset grande)
// ======================
export const Paginada: Story = {
  args: {
    headers: PROJECT_HEADERS,
    rows: generateProjectRows(117),
    paginator: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    ...ActionsData,
  },
};

// ======================
// 07 · Sin datos
// ======================
export const SinDatos: Story = {
  args: {
    headers: PROJECT_HEADERS,
    rows: [],
    tableTitle: 'Proyectos activos',
    searchable: true,
    ...ActionsData,
  },
};
