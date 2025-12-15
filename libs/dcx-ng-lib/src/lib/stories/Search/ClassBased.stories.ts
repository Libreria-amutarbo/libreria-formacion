import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DcxNgSearchComponent, SearchItem } from '../../dcx-ng-components/dcx-ng-search/dcx-ng-search.component';
import { DcxSize } from '../../core/interfaces';
import { generatePersonRows, PersonRow } from '../../core/mock/table';

type DcxSearchStoryArgs = {
  placeholder?: string;
  disabled?: boolean;
  size?: DcxSize;
  dropdown?: boolean;
  showClear?: boolean;
  items?: SearchItem[];
};

const personItems: SearchItem[] = generatePersonRows(20).map((person: PersonRow) => ({
  id: person.id ?? 0,
  label: `${person.name} (${person.country})`,
  data: person
}));

const meta: Meta<DcxNgSearchComponent> = {
  title: 'DCXLibrary/Search/Class based',
  component: DcxNgSearchComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true }
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto del placeholder del campo de búsqueda',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el campo de búsqueda',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Tamaño del campo de búsqueda',
    },
    dropdown: {
      control: 'boolean',
      description: 'Habilita el dropdown con filtrado',
    },
    showClear: {
      control: 'boolean',
      description: 'Muestra el botón de limpiar cuando hay texto',
    },
  },
  args: {
    placeholder: 'Buscar...',
    disabled: false,
    size: 'm',
    dropdown: false,
    showClear: true,
    items: personItems,
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgSearchComponent],
    }),
  ],
};

export default meta;

type Story = StoryObj<DcxSearchStoryArgs>;

export const Default: Story = {
  args: {},
  render: args => ({
    props: {
      ...args,
      onSearchChange: (value: string) => {
      },
      onSearch: (value: string) => {
      },
      onItemSelected: (item: SearchItem) => {
      },
    },
    template: `
      <div style="width:360px;">
        <dcx-ng-search
          [placeholder]="placeholder"
          [disabled]="disabled"
          [size]="size"
          [dropdown]="dropdown"
          [items]="items"
          [showClear]="showClear"
          (searchChange)="onSearchChange($event)"
          (searchOutput)="onSearch($event)"
          (itemSelected)="onItemSelected($event)">
        </dcx-ng-search>
      </div>
    `,
  }),
};

export const SearchShowcase: Story = {
  render: () => ({
    props: {
      personItems,
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

export const WithClearIcon: Story = {
  args: {
    showClear: true,
    placeholder: 'Buscar...',
  },
  render: (args) => ({
    props: {
      ...args,
      onSearchChange: (value: string) => {
      },
      searchOutput: (value: string) => {
      },
    },
    template: `
      <div style="width:360px;">
        <dcx-ng-search
          [placeholder]="placeholder"
          [showClear]="showClear"
          (searchChange)="onSearchChange($event)"
          (searchOutput)="searchOutput($event)">
        </dcx-ng-search>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    props: {
      onSearchChange: (value: string) => {
      },
    },
    template: `
      <div style="width:360px;">
        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Small Size</h4>
          <dcx-ng-search
            size="s"
            [showClear]="true"
            placeholder="Búsqueda pequeña..."
            (searchChange)="onSearchChange($event)">
          </dcx-ng-search>
        </section>

        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Medium Size (Default)</h4>
          <dcx-ng-search
            size="m"
            [showClear]="true"
            placeholder="Búsqueda mediana..."
            (searchChange)="onSearchChange($event)">
          </dcx-ng-search>
        </section>

        <section style="margin-bottom:24px;">
          <h4 style="margin-bottom:5px;">Large Size</h4>
          <dcx-ng-search
            size="l"
            [showClear]="true"
            placeholder="Búsqueda grande..."
            (searchChange)="onSearchChange($event)">
          </dcx-ng-search>
        </section>
      </div>
    `,
  }),
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    placeholder: 'Campo deshabilitado...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:360px;">
        <dcx-ng-search
          [placeholder]="placeholder"
          [disabled]="disabled">
        </dcx-ng-search>
      </div>
    `,
  }),
};


