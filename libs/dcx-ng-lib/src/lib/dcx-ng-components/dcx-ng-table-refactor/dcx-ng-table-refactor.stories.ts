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
}

const HEADERS: HeaderData[] = [
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    type: 'string',
    defaultSort: 'asc',
  },
  { name: 'Edad', key: 'age', sortable: true, type: 'number', template: 'age' },
  { name: 'Pais', key: 'country', sortable: true, type: 'string' },
];

const ROWS: PersonRow[] = [
  { name: 'Ana', age: 32, country: 'Espana' },
  { name: 'Luis', age: 41, country: 'Mexico' },
  { name: 'Marta', age: 27, country: 'Argentina' },
];

const meta: Meta<DcxNgTableRefactorComponent> = {
  component: DcxNgTableRefactorComponent,
  title: 'Shared/DcxNgTableRefactor',
  decorators: [
    moduleMetadata({
      imports: [
        DcxNgTableRefactorComponent,
        DcxNgTableTemplateRefactorDirective,
      ],
    }),
  ],
  args: {
    headers: HEADERS,
    rows: ROWS,
    showGrid: false,
    showStripped: true,
    scroll: false,
    scrollHeight: '320px',
    paginator: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
  },
};

export default meta;
type Story = StoryObj<DcxNgTableRefactorComponent>;

export const Basic: Story = {
  render: (args: DcxNgTableRefactorComponent) => ({
    props: args,
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
      >
        <!-- Template externo para la celda de edad -->
        <ng-template dcxNgTableTemplateRefactor="age" let-row let-key="key">
          <strong>{{ row[key] }}</strong> anos
        </ng-template>

        <!-- Template externo generico para menu -->
        <ng-template dcxNgTableTemplateRefactor="menu" let-row="row">
          <button type="button">Acciones de {{ row.name }}</button>
        </ng-template>

        <!-- Template de estado vacio personalizado -->
        <ng-template dcxNgTableTemplateRefactor="empty" let-headers="headers">
          <em>No hay registros ({{ headers.length }} columnas)</em>
        </ng-template>
      </dcx-ng-table-refactor>
    `,
  }),
};
