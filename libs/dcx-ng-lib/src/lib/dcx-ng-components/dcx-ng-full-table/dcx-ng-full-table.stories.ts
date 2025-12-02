import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { DcxHeaderData } from '../../core/interfaces';

import {
  PERSON_HEADERS_BASE,
  PERSON_HEADERS_WITH_INLINE_ACTIONS,
  PersonRow,
  generatePersonRows,
} from '../../core/mock';
import { DcxNgFullTableComponent } from './dcx-ng-full-table.component';
import { DcxNgFullTableTemplateDirective } from './dcx-ng-full-table-template.directive';

// ===========================
// DATOS DE DEMO (desde mock centralizado)
// ===========================
const ROWS: PersonRow[] = generatePersonRows(25);

// ===========================
// ARGS EXPLÍCITOS PARA STORY
// ===========================
type TableStoryArgs = {
  headers: DcxHeaderData[];
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
  title: 'DCX/TableFull',
  component: DcxNgFullTableComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgFullTableTemplateDirective],
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
    </dcx-ng-full-table>
  `;
}

// ===========================
// STORY 1: FULL DEMO (sin acciones)
// ===========================
export const FullDemo: Story = {
  args: {
    headers: PERSON_HEADERS_BASE,
    rows: ROWS,
  },
  render: args => ({
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
    headers: PERSON_HEADERS_WITH_INLINE_ACTIONS,
    rows: ROWS,
  },
  render: args => ({
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
    headers: PERSON_HEADERS_BASE,
    rows: [],
    showGrid: true,
    showStripped: false,
    scroll: false,
    scrollHeight: '220px',
    paginator: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
  },
  render: args => ({
    props: {
      ...args,
      sortChange: args.sortChange ?? (() => {}),
      rowsPerPageChange: args.rowsPerPageChange ?? (() => {}),
      pageChange: args.pageChange ?? (() => {}),
      cellEdit: args.cellEdit ?? (() => {}),
      rowAction: args.rowAction ?? (() => {}),
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
        (sortChange)="sortChange($event)"
      >
        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <strong>Tabla vacía</strong> ({{ headers.length }} columnas)
        </ng-template>
      </dcx-ng-full-table>
    `,
  }),
};
