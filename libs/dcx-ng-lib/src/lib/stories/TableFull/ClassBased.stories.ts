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
};

// ======================
// CABECERAS + FILAS DEMO
// ======================
const HEADERS: HeaderData[] = [
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
    sortable: false,
    type: 'string',
    filterable: true,
    editable: true,
    headerTemplate: 'countryHeader',
  },
  {
    name: 'Creado el',
    key: 'createdAt',
    sortable: true,
    builtInTemplate: 'date',
    dateConfig: { dateFormat: 'dd/MM/yyyy HH:mm' },
  },
];

const ROWS = Array.from({ length: 20 }, (_, i) => {
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
  title: 'DCXLIBRARY/TableFull/Class based',
  component: DcxNgTableRefactorComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgTableTemplateRefactorDirective],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    showGrid: { control: 'boolean' },
    showStripped: { control: 'boolean' },
    scroll: { control: 'boolean' },
    scrollHeight: { control: 'text' },
    paginator: { control: 'boolean' },
    rowsPerPage: { control: 'number' },
    rowsPerPageOptions: { control: { type: 'object' } },

    headers: { control: false },
    rows: { control: false },

    sortChange: { action: 'sortChange' },
    rowsPerPageChange: { action: 'rowsPerPageChange' },
    pageChange: { action: 'pageChange' },
    cellEdit: { action: 'cellEdit' },
  },
  args: {
    showGrid: true,
    showStripped: false,
    scroll: true,
    scrollHeight: '240px',
    paginator: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  },
};

export default meta;

type Story = StoryObj<DcxNgTableRefactorComponent>;

// ======================
// STORY COMPLETO
// ======================
export const GridScroll: Story = {
  render: (args, { updateArgs }) => ({
    props: {
      ...args,
      headers: HEADERS,
      rows: ROWS,

      // OJO: métodos normales, para poder usar `this`
      sortChange(e: unknown) {
        ActionsData.sortChange(e);
      },
      rowsPerPageChange(this: any, size: number) {
        ActionsData.rowsPerPageChange(size);
        // Actualizamos el input en el host del story
        this.rowsPerPage = size;
        // Y sincronizamos Controls de Storybook
        updateArgs({ rowsPerPage: size });
      },
      pageChange(page: number) {
        ActionsData.pageChange(page);
      },
      cellEdit(e: unknown) {
        ActionsData.cellEdit(e);
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
        (sortChange)="sortChange($event)"
        (rowsPerPageChange)="rowsPerPageChange($event)"
        (pageChange)="pageChange($event)"
        (cellEdit)="cellEdit($event)"
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
// TEST DE ORDENACIÓN
// ======================
GridScroll.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const ageHeader = await canvas.findByRole('columnheader', { name: /Edad/i });

  await userEvent.click(ageHeader);
  await expect(ageHeader).toHaveAttribute('aria-sort', 'ascending');

  await userEvent.click(ageHeader);
  await expect(ageHeader).toHaveAttribute('aria-sort', 'descending');
};
