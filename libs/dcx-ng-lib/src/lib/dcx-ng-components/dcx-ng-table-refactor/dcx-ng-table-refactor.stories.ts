import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { DcxNgTableRefactorComponent } from './dcx-ng-table-refactor.component';
import { HeaderData } from './dcx-ng-table-refactor.models';
import { DcxNgTableTemplateRefactorDirective } from './dcx-ng-table-template-refactor.directive';

interface PersonRow {
  id?: number;
  name: string;
  age: number;
  country: string;
  createdAt: Date;
}

// ===========================
// HEADERS + ROWS DE DEMO
// ===========================
const BASE_HEADERS: HeaderData[] = [
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    type: 'string',
    defaultSort: 'asc',
    filterable: true,
  },
  {
    name: 'Edad',
    key: 'age',
    sortable: true,
    type: 'number',
    filterable: true,
    template: 'age',
  },
  {
    name: 'País',
    key: 'country',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true,
    headerTemplate: 'countryHeader',
  },
  {
    name: 'Creado el',
    key: 'createdAt',
    sortable: true,
  },
];

// 👇 HEADERS con columna de acciones inline (iconos)
const HEADERS_WITH_ACTIONS: HeaderData[] = [
  ...BASE_HEADERS,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
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

const BASE_ROWS: Omit<PersonRow, 'id' | 'createdAt'>[] = [
  { name: 'Ana', age: 32, country: 'España' },
  { name: 'Luis', age: 41, country: 'México' },
  { name: 'Marta', age: 27, country: 'Argentina' },
  { name: 'Pedro', age: 50, country: 'Chile' },
  { name: 'Lucía', age: 36, country: 'Perú' },
];

const ROWS: PersonRow[] = Array.from({ length: 25 }, (_, index) => {
  const base = BASE_ROWS[index % BASE_ROWS.length];
  return {
    id: index + 1,
    name: `${base.name} ${index + 1}`,
    age: base.age + (index % 5),
    country: base.country,
    createdAt: new Date(2024, 0, 1 + index),
  };
});

// ===========================
// ARGS EXPLÍCITOS PARA STORY
// ===========================
type TableStoryArgs = {
  headers: HeaderData[];
  rows: PersonRow[];

  showGrid: boolean;
  showStripped: boolean;
  scroll: boolean;
  scrollHeight: string;
  paginator: boolean;
  rowsPerPage: number;
  rowsPerPageOptions: number[];

  // outputs -> para Docs & Actions
  sortChange?: (e: unknown) => void;
  rowsPerPageChange?: (e: number) => void;
  pageChange?: (e: number) => void;
  cellEdit?: (e: unknown) => void;
  rowAction?: (e: unknown) => void;
};

// ===========================
// META (AQUÍ VAN LOS DEFAULTS GLOBALES)
// ===========================
const meta: Meta<TableStoryArgs> = {
  title: 'DCX/TableRefactor',
  component: DcxNgTableRefactorComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgTableTemplateRefactorDirective],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    // datos (no se tocan desde Controls)
    headers: { control: false },
    rows: { control: false },

    // inputs configurables
    showGrid: { control: 'boolean' },
    showStripped: { control: 'boolean' },
    scroll: { control: 'boolean' },
    scrollHeight: { control: 'text' },
    paginator: { control: 'boolean' },
    rowsPerPage: { control: 'number' },
    rowsPerPageOptions: { control: false },

    // outputs -> se verán en Docs (tabla de eventos) y en panel Actions
    sortChange: { action: 'sortChange' },
    rowsPerPageChange: { action: 'rowsPerPageChange' },
    pageChange: { action: 'pageChange' },
    cellEdit: { action: 'cellEdit' },
    rowAction: { action: 'rowAction' },
  },
  // DEFAULT VALUES que verás en Docs/Controls por defecto
  args: {
    showGrid: true,
    showStripped: true,
    scroll: true,
    scrollHeight: '220px',
    paginator: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
  },
};

export default meta;

type Story = StoryObj<TableStoryArgs>;

// helper para evitar repetir siempre el mismo template
function buildBaseTemplate(withActions: boolean) {
  return `
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
      (sortChange)="sortChange($event)"
      (rowsPerPageChange)="rowsPerPageChange($event)"
      (pageChange)="pageChange($event)"
      (cellEdit)="cellEdit($event)"
      ${withActions ? '(rowAction)="rowAction($event)"' : ''}
    >
      <!-- CELDA PERSONALIZADA: EDAD -->
      <ng-template dcxNgTableTemplateRefactor="age" let-row let-key="key">
        <span
          [ngStyle]="{
            'font-weight': row[key] >= 40 ? 'bold' : 'normal',
            'color': row[key] >= 40 ? 'crimson' : 'inherit'
          }"
        >
          {{ row[key] }} años
        </span>
      </ng-template>

      <!-- CABECERA PERSONALIZADA DE PAÍS -->
      <ng-template dcxNgTableTemplateRefactor="countryHeader" let-header>
        🌍 <span>{{ header.name }}</span>
      </ng-template>

      <!-- EMPTY STATE -->
      <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
        <em>No hay registros ({{ headers.length }} columnas definidas)</em>
      </ng-template>
    </dcx-ng-table-refactor>
  `;
}

// ===========================
// STORY 1: FULL DEMO (sin acciones)
// ===========================
export const FullDemo: Story = {
  args: {
    headers: BASE_HEADERS,
    rows: ROWS,
  },
  render: (args) => ({
    props: {
      ...args,
      sortChange: args.sortChange ?? (() => {}),
      rowsPerPageChange: args.rowsPerPageChange ?? (() => {}),
      pageChange: args.pageChange ?? (() => {}),
      cellEdit: args.cellEdit ?? (() => {}),
      rowAction: args.rowAction ?? (() => {}),
    },
    template: buildBaseTemplate(false),
  }),
};

// ===========================
// STORY 2: WithActionsInline (columna de iconos)
// ===========================
export const WithActionsInline: Story = {
  args: {
    headers: HEADERS_WITH_ACTIONS,
    rows: ROWS,
  },
  render: (args) => ({
    props: {
      ...args,
      sortChange: args.sortChange ?? (() => {}),
      rowsPerPageChange: args.rowsPerPageChange ?? (() => {}),
      pageChange: args.pageChange ?? (() => {}),
      cellEdit: args.cellEdit ?? (() => {}),
      rowAction: args.rowAction ?? (() => {}), // aquí SÍ se dispara
    },
    template: buildBaseTemplate(true),
  }),
};

// ===========================
// STORY 3: EmptyState
// ===========================
export const EmptyState: Story = {
  args: {
    headers: BASE_HEADERS,
    rows: [],
    showGrid: true,
    showStripped: false,
    scroll: false,
    scrollHeight: '220px',
    paginator: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
  },
  render: (args) => ({
    props: {
      ...args,
      sortChange: args.sortChange ?? (() => {}),
      rowsPerPageChange: args.rowsPerPageChange ?? (() => {}),
      pageChange: args.pageChange ?? (() => {}),
      cellEdit: args.cellEdit ?? (() => {}),
      rowAction: args.rowAction ?? (() => {}),
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
        (sortChange)="sortChange($event)"
      >
        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <strong>Tabla vacía</strong> ({{ headers.length }} columnas)
        </ng-template>
      </dcx-ng-table-refactor>
    `,
  }),
};
