import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from '@storybook/test';

import { DcxNgTableRefactorComponent } from '../../dcx-ng-components/dcx-ng-table-refactor/dcx-ng-table-refactor.component';
import { HeaderData } from '../../dcx-ng-components/dcx-ng-table-refactor/dcx-ng-table-refactor.models';
import { DcxNgTableTemplateRefactorDirective } from '../../dcx-ng-components/dcx-ng-table-refactor/dcx-ng-table-template-refactor.directive';

const ActionsData = {
  sortChange: fn(),
  rowsPerPageChange: fn(),
  pageChange: fn(),
  cellEdit: fn(),
  rowAction: fn(),
};

// ======================
// CABECERAS + FILAS DEMO
// ======================
const BASE_HEADERS: HeaderData[] = [
  {
    name: 'ID',
    key: 'id',
    type: 'number',
    cellType: 'number',
    sortable: true,
    defaultSort: 'asc',
    minWidth: '70px',
    frozen: 'left',
  },
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true,
    minWidth: '140px',
  },
  {
    name: 'Edad',
    key: 'age',
    sortable: true,
    type: 'number',
    filterable: true,
    template: 'age',
    minWidth: '110px',
  },
  {
    name: 'País',
    key: 'country',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true,
    headerTemplate: 'countryHeader',
    minWidth: '160px',
  },
  {
    name: 'Creado el',
    key: 'createdAt',
    sortable: true,
    cellType: 'date',
    cellTypeConfig: { dateFormat: 'dd/MM/yyyy HH:mm' },
    minWidth: '190px',
  },
];

// HEADERS con acciones en MENÚ (panel)
const HEADERS_MENU: HeaderData[] = [
  ...BASE_HEADERS,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    frozen: 'right',
    minWidth: '150px',
    cellTypeConfig: {
      mode: 'menu',
      menuIcon: 'more_vert',
      items: [
        { id: 'view', icon: 'visibility', label: 'Ver detalle' },
        { id: 'edit', icon: 'edit', label: 'Editar', variant: 'primary' },
        {
          id: 'delete',
          icon: 'delete',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: Record<string, unknown>) =>
            (row['age'] as number) < 30,
        },
      ],
    },
  },
];

// HEADERS con acciones INLINE (iconos)
const HEADERS_INLINE: HeaderData[] = [
  ...BASE_HEADERS,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    frozen: 'right',
    minWidth: '150px',
    cellTypeConfig: {
      mode: 'inline',
      items: [
        {
          id: 'view',
          icon: 'visibility',
          label: 'Ver detalle',
          variant: 'primary',
        },
        {
          id: 'edit',
          icon: 'edit',
          label: 'Editar',
        },
        {
          id: 'delete',
          icon: 'delete',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: Record<string, unknown>) =>
            (row['age'] as number) < 30,
        },
      ],
    },
  },
];

const ROWS = Array.from({ length: 40 }, (_, i) => {
  const names = [
    'Ana',
    'Luis',
    'Marta',
    'Pedro',
    'Lucía',
    'Javier',
    'Elena',
    'Carlos',
    'María',
    'Diego',
  ];
  const countries = [
    'España',
    'México',
    'Argentina',
    'Chile',
    'Perú',
    'Colombia',
    'Bolivia',
    'Uruguay',
    'Paraguay',
    'Ecuador',
  ];

  return {
    id: i + 1,
    name: names[i % names.length],
    age: 22 + ((i * 7) % 40),
    country: countries[i % countries.length],
    createdAt: new Date(2025, (i * 2) % 12, 10 + (i % 20), 10, 15),
  };
});

// ======================
// META
// ======================
const meta: Meta<DcxNgTableRefactorComponent> = {
  title: 'DCXLIBRARY/Table Refactor/Class based',
  component: DcxNgTableRefactorComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgTableTemplateRefactorDirective],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true, // muestra todos los controles ordenados
    },
    docs: {
      description: {
        component: `
Tabla reutilizable DCX con:

- Ordenación por columnas (incluye orden por defecto).
- Filtros por columna (texto).
- Paginación con tamaño de página configurable.
- Columnas congeladas izquierda/derecha.
- Plantillas proyectadas para celdas y cabeceras.
- Columna de acciones (inline o menú) con soporte para deshabilitar/ocultar.
        `,
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
        type: { summary: 'readonly HeaderData[]' },
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
      description: 'Lista de opciones disponibles en el selector de filas/página.',
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

type Story = StoryObj<DcxNgTableRefactorComponent>;

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
      <dcx-ng-table-refactor
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
      </dcx-ng-table-refactor>
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
      <dcx-ng-table-refactor
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
      </dcx-ng-table-refactor>
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
