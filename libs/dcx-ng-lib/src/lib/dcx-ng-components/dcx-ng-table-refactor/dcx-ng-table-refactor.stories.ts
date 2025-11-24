import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

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

/* ============================
 * CABECERAS – usando TODO
 * ============================ */
const HEADERS: HeaderData[] = [
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    type: 'string',
    defaultSort: 'asc',
    filterable: true,
    // sin editable (tiene renderFn en otra columna)
  },
  {
    name: 'Edad',
    key: 'age',
    sortable: true,
    type: 'number',
    filterable: true,
    // se renderiza con un template externo
    template: 'age',
  },
  {
    name: 'País',
    key: 'country',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true, // <-- columna editable
    headerTemplate: 'countryHeader', // <-- header con template externo
  },
  {
    name: 'Creado el',
    key: 'createdAt',
    sortable: true,
    builtInTemplate: 'date', // <-- built-in date template
    dateConfig: {
      dateFormat: 'dd/MM/yyyy HH:mm',
    },
  },
];

/* ============================
 * FILAS – muchas para paginar
 * ============================ */
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

/* ============================
 * META
 * (sin args para evitar el error
 *  con los input() signals)
 * ============================ */
const meta: Meta<typeof DcxNgTableRefactorComponent> = {
  title: 'DcxNgTableFullComponent',
  component: DcxNgTableRefactorComponent,
  decorators: [
    moduleMetadata({
      // El componente es standalone; aquí añadimos lo que
      // necesita el *template* del story (ngStyle, etc.)
      imports: [CommonModule, DcxNgTableTemplateRefactorDirective],
    }),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/* ==================================
 * STORY PRINCIPAL – FullDemo
 * Muestra casi todas las features
 * ================================== */
export const FullDemo: Story = {
  render: () => ({
    props: {
      // Inputs
      headers: HEADERS,
      rows: ROWS,
      showGrid: true,
      showStripped: true,
      scroll: true,
      scrollHeight: '220px',
      paginator: true,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],

      // Outputs -> acciones de Storybook
      onSortChange: action('sortChange'),
      onRowsPerPageChange: action('rowsPerPageChange'),
      onPageChange: action('pageChange'),
      onCellEdit: action('cellEdit'),
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
        (sortChange)="onSortChange($event)"
        (rowsPerPageChange)="onRowsPerPageChange($event)"
        (pageChange)="onPageChange($event)"
        (cellEdit)="onCellEdit($event)"
      >
        <!-- =========================
             CELDA EDAD (template externo)
             ========================= -->
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

        <!-- =========================
             CABECERA PAÍS (headerTemplate)
             ========================= -->
        <ng-template dcxNgTableTemplateRefactor="countryHeader" let-header>
          🌍 <span>{{ header.name }}</span>
        </ng-template>

        <!-- =========================
             MENÚ (columna de acciones)
             ========================= -->
        <ng-template dcxNgTableTemplateRefactor="menu" let-row="row" let-index="index">
          <button type="button">
            Menú (fila {{ index + 1 }} - {{ row.name }})
          </button>
        </ng-template>

        <!-- =========================
             ESTADO VACÍO
             ========================= -->
        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <em>No hay registros ({{ headers.length }} columnas definidas)</em>
        </ng-template>
      </dcx-ng-table-refactor>
    `,
  }),
};

/* ==================================
 * STORY EXTRA – EmptyState
 * Para ver el template "empty"
 * ================================== */
export const EmptyState: Story = {
  render: () => ({
    props: {
      headers: HEADERS,
      rows: [],
    },
    template: `
      <dcx-ng-table-refactor
        [headers]="headers"
        [rows]="rows"
        [paginator]="true"
      >
        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <strong>Tabla vacía</strong> ({{ headers.length }} columnas)
        </ng-template>
      </dcx-ng-table-refactor>
    `,
  }),
};
