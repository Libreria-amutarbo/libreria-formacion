import type { Meta, StoryObj } from '@storybook/angular';
import {
  DcxNgSearchComponent,
  SearchItem,
  SIZE_DEFAULT,
  SIZE_LIST,
} from '@dcx-ng-components/dcx-ng-lib';
import {
  DEFAULTARGS,
  SEARCH_ITEMS,
} from '../../core/mock/search';

const meta: Meta<DcxNgSearchComponent> = {
  title: 'DCXLibrary/Search/Class based',
  component: DcxNgSearchComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: {
      description: 'Texto del placeholder del campo de búsqueda',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    disabled: {
      description: 'Deshabilita el campo de búsqueda',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      description: 'Tamaño del campo de búsqueda',
      options: SIZE_LIST,
      control: { type: 'select' },
      table: {
        category: 'Attributes',
        defaultValue: { summary: SIZE_DEFAULT },
      },
    },
    dropdown: {
      description: 'Habilita el dropdown con filtrado',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    showClear: {
      description: 'Muestra el botón de limpiar cuando hay texto',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    items: {
      description: 'Items para el dropdown de búsqueda',
      control: { type: 'object' },
      table: {
        category: 'Attributes',
      },
    },
  },
  args: DEFAULTARGS,
};

export default meta;

type Story = StoryObj<DcxNgSearchComponent>;

export const Default: Story = {};

export const SearchShowcase: Story = {
  render: () => ({
    props: {
      personItems: SEARCH_ITEMS,
      onSearchChange: (value: string) => {
      },
      onSearch: (value: string) => {
      },
      onItemSelected: (item: SearchItem) => {
      },
    },
    template: `
      <div style="width:360px;">
        <!-- Basic Search -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Basic Search</h4>
          <dcx-ng-search
            placeholder="Buscar productos...">
          </dcx-ng-search>
        </section>

        <!-- With Clear Button -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">With Clear Button</h4>
          <dcx-ng-search
            [showClear]="true"
            placeholder="Con botón limpiar...">
          </dcx-ng-search>
        </section>

        <!-- With Dropdown -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">With Dropdown</h4>
          <dcx-ng-search
            [dropdown]="true"
            [showClear]="true"
            [items]="personItems"
            placeholder="Buscar personas..."
            (itemSelected)="onItemSelected($event)">
          </dcx-ng-search>
        </section>

        <!-- Small Size -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Small Size</h4>
          <dcx-ng-search
            size="s"
            [showClear]="true"
            placeholder="Búsqueda pequeña...">
          </dcx-ng-search>
        </section>

        <!-- Medium Size (default) -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Medium Size</h4>
          <dcx-ng-search
            size="m"
            [showClear]="true"
            placeholder="Búsqueda mediana...">
          </dcx-ng-search>
        </section>

        <!-- Large Size -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Large Size</h4>
          <dcx-ng-search
            size="l"
            [showClear]="true"
            placeholder="Búsqueda grande...">
          </dcx-ng-search>
        </section>

        <!-- Disabled -->
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Disabled State</h4>
          <dcx-ng-search
            [disabled]="true"
            placeholder="Campo deshabilitado...">
          </dcx-ng-search>
        </section>
      </div>
    `,
  }),
};


