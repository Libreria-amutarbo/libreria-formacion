// ClassBased.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { fn, userEvent, within, expect } from '@storybook/test';
import { DcxNgTableComponent } from '../../dcx-ng-components/dcx-ng-table/dcx-ng-table.component';

const ActionsData = {
  sortChange: fn(),
  menuClick: fn(),
};

const meta: Meta<DcxNgTableComponent> = {
  title: 'DCXLibrary/Table/Class based',
  component: DcxNgTableComponent,
  tags: ['autodocs'],
  argTypes: {
    showGrid: { control: 'boolean' },
    showStripped: { control: 'boolean' },
    scroll: { control: 'boolean' },
    scrollHeight: { control: 'text' },

    headers: { control: false },
    rows: { control: false },
    headerTemplate: { control: false },
    cellTemplate: { control: false },
    menuCellTemplate: { control: false },

    sortChange: { action: 'sortChange' },
  },
  args: {
    showGrid: true,
    showStripped: false,
    scroll: true,
    scrollHeight: '240px',
  },
};

export default meta;
type Story = StoryObj<DcxNgTableComponent>;

export const GridScroll: Story = {
  render: args => ({
    props: {
      ...args,
      onSort: ActionsData.sortChange,
      onMenu: ActionsData.menuClick,
    },
    template: `
      <!-- Plantilla de celda: muestra '—' si no hay valor -->
      <ng-template #cellTpl let-row let-key="key">
        <span [style.color]="row?.[key] == null ? '#999' : 'inherit'">
          {{ row?.[key] ?? '—' }}
        </span>
      </ng-template>

      <!-- Plantilla de menú contextual (demo) -->
      <ng-template #menuTpl let-row let-index="index">
        <button type="button" (click)="onMenu({ row, index })" title="Context menu (demo)">
          ⋮
        </button>
      </ng-template>

      <dcx-ng-table
        [headers]="headers"
        [rows]="rows"
        [showGrid]="showGrid"
        [showStripped]="showStripped"
        [scroll]="scroll"
        [scrollHeight]="scrollHeight"
        [cellTemplate]="cellTpl"
        [menuCellTemplate]="menuTpl"
        (sortChange)="onSort($event)"
      ></dcx-ng-table>
    `,
  }),
  args: {
    headers: [
      { name: 'Producto', key: 'product', type: 'string', sortable: true },
      { name: 'Categoría', key: 'category', type: 'string', sortable: true },
      {
        name: 'Precio',
        key: 'price',
        type: 'number',
        sortable: true,
        defaultSort: 'asc',
      },
      { name: 'Stock', key: 'stock', type: 'number', sortable: true },
    ],
    rows: [
      { product: 'Teclado', category: 'Periféricos', price: 29.99, stock: 120 },
      { product: 'Ratón', category: 'Periféricos', price: 14.5, stock: 340 },
      {
        product: 'Monitor 24"',
        category: 'Pantallas',
        price: 139.0,
        stock: 45,
      },
      {
        product: 'Monitor 27"',
        category: 'Pantallas',
        price: 219.0,
        stock: 18,
      },
      { product: 'Portátil 14"', category: 'Equipos', price: 799.0, stock: 12 },
      { product: 'Portátil 16"', category: 'Equipos', price: 1199.0, stock: 5 },
      { product: 'Dock USB-C', category: 'Accesorios', price: 69.9, stock: 64 },
      { product: 'Hub USB', category: 'Accesorios', price: 19.9, stock: 0 },
    ],
  },
  // Test opcional: ordenación por "Precio" con clics (requiere @storybook/test)
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const priceHeader = await canvas.findByRole('columnheader', {
      name: /Precio/i,
    });

    // Primer click -> ascending
    await userEvent.click(priceHeader);
    await expect(priceHeader).toHaveAttribute('aria-sort', 'ascending');

    // Segundo click -> descending
    await userEvent.click(priceHeader);
    await expect(priceHeader).toHaveAttribute('aria-sort', 'descending');
  },
};
