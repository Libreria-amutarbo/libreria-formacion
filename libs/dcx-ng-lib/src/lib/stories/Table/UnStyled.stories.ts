import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
// Ajusta esta ruta si tu estructura difiere
import { DcxNgTableComponent } from '../../dcx-ng-components/dcx-ng-table/dcx-ng-table.component';

const ActionsData = {
  sortChange: fn(),
};

const meta: Meta<DcxNgTableComponent> = {
  title: 'DCXLibrary/Table/Without style',
  component: DcxNgTableComponent,
  tags: ['autodocs'],
  argTypes: {
    showGrid: { control: 'boolean' },
    showStripped: { control: 'boolean' },
    scroll: { control: 'boolean' },
    scrollHeight: { control: 'text' },
    // Los complejos mejor sin control directo
    headers: { control: false },
    value: { control: false },
    sortChange: { action: 'sortChange' },
  },
};

export default meta;
type Story = StoryObj<DcxNgTableComponent>;

/** Striped + Sort (sin defaultSort, el 1er click pone ascendente) */
export const Striped: Story = {
  args: {
    headers: [
      { name: 'ID', key: 'id', type: 'number', sortable: true },
      { name: 'Nombre', key: 'name', type: 'string', sortable: true },
      { name: 'Estado', key: 'status', sortable: true },
    ],
    value: [
      { id: 3, name: 'Litio', status: 'ok' },
      { id: 1, name: 'Hidrógeno', status: 'ok' },
      { id: 2, name: 'Helio', status: 'pendiente' },
      { id: 5, name: 'Boro', status: 'error' },
      { id: 4, name: 'Berilio', status: 'ok' },
      { id: 6, name: 'Carbono', status: 'ok' },
    ],
    showStripped: true,
    scroll: false,
    scrollHeight: '220px',
    sortChange: ActionsData.sortChange,
  },
};

/** Empty State */
export const Empty: Story = {
  args: {
    headers: [
      { name: 'ID', key: 'id', type: 'number' },
      { name: 'Nombre', key: 'name', type: 'string' },
    ],
    value: [],
    showStripped: true,
    scroll: false,
    sortChange: ActionsData.sortChange,
  },
};