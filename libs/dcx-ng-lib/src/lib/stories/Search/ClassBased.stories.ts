import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DcxNgSearchComponent } from '../../dcx-ng-components/dcx-ng-search/dcx-ng-search.component';
import { DcxSize } from '../../core/interfaces';

type DcxSearchStoryArgs = {
  placeholder?: string;
  disabled?: boolean;
  size?: DcxSize;
  ariaLabel?: string;
};

const meta: Meta<DcxNgSearchComponent> = {
  title: 'DCXLibrary/Search/Class based',
  component: DcxNgSearchComponent,
  tags: ['autodocs'],
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
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el campo de búsqueda',
    },
  },
  args: {
    placeholder: 'Buscar...',
    disabled: false,
    size: 'm',
    ariaLabel: 'Campo de búsqueda',
  },
  decorators: [
    moduleMetadata({
      imports: [DcxNgSearchComponent],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<DcxSearchStoryArgs>;

export const Default: Story = {
  args: {},
  render: args => ({
    props: {
      ...args,
      onSearchChange: (value: string) => {
        console.log('Search value changed:', value);
      },
      onSearch: (value: string) => {
        console.log('Search triggered:', value);
      },
    },
    template: `
      <div style="width:360px;">
        <dcx-ng-search
          [placeholder]="placeholder"
          [disabled]="disabled"
          [size]="size"
          [ariaLabel]="ariaLabel"
          (searchChange)="onSearchChange($event)"
          (search)="onSearch($event)">
        </dcx-ng-search>
      </div>
    `,
  }),
};

export const SearchShowcase: Story = {
  render: () => ({
    props: {
      onSearchChange: (value: string) => {
        console.log('Search value changed:', value);
      },
      onSearch: (value: string) => {
        console.log('Search triggered:', value);
      },
    },
    template: `
      <div style="width:360px;">
        <!-- Basic Search -->
        <section style="margin-bottom:24px;">
          <h4>Basic Search</h4>
          <dcx-ng-search
            (searchChange)="onSearchChange($event)"
            (search)="onSearch($event)">
          </dcx-ng-search>
        </section>

        <!-- Custom Placeholder -->
        <section style="margin-bottom:24px;">
          <h4>Custom Placeholder</h4>
          <dcx-ng-search
            placeholder="Buscar productos..."
            (search)="onSearch($event)">
          </dcx-ng-search>
        </section>

        <!-- Small Size -->
        <section style="margin-bottom:24px;">
          <h4>Small Size</h4>
          <dcx-ng-search
            size="s"
            placeholder="Búsqueda pequeña..."
            (search)="onSearch($event)">
          </dcx-ng-search>
        </section>

        <!-- Medium Size (default) -->
        <section style="margin-bottom:24px;">
          <h4>Medium Size</h4>
          <dcx-ng-search
            size="m"
            placeholder="Búsqueda mediana..."
            (search)="onSearch($event)">
          </dcx-ng-search>
        </section>

        <!-- Large Size -->
        <section style="margin-bottom:24px;">
          <h4>Large Size</h4>
          <dcx-ng-search
            size="l"
            placeholder="Búsqueda grande..."
            (search)="onSearch($event)">
          </dcx-ng-search>
        </section>

        <!-- Disabled -->
        <section style="margin-bottom:24px;">
          <h4>Disabled State</h4>
          <dcx-ng-search
            [disabled]="true"
            placeholder="Campo deshabilitado...">
          </dcx-ng-search>
        </section>

        <!-- Custom Aria Label -->
        <section style="margin-bottom:24px;">
          <h4>Custom Aria Label</h4>
          <dcx-ng-search
            ariaLabel="Buscar artículos en el catálogo"
            placeholder="Buscar artículos..."
            (search)="onSearch($event)">
          </dcx-ng-search>
          <p style="margin-top:8px; color:#666; font-size:12px;">
            Este campo tiene un aria-label personalizado para accesibilidad
          </p>
        </section>

        <!-- With Events -->
        <section style="margin-bottom:24px;">
          <h4>With Change Events</h4>
          <dcx-ng-search
            placeholder="Escribe algo y presiona Enter..."
            (searchChange)="onSearchChange($event)"
            (search)="onSearch($event)">
          </dcx-ng-search>
          <p style="margin-top:8px; color:#666; font-size:12px;">
            Revisa la consola para ver los eventos
          </p>
        </section>
      </div>
    `,
  }),
};