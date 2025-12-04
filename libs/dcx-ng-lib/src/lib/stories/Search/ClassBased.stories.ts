import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DcxNgSearchComponent } from '../../dcx-ng-components/dcx-ng-search/dcx-ng-search.component';
import { DcxSize } from '../../core/interfaces';

type DcxSearchStoryArgs = {
  placeholder?: string;
  disabled?: boolean;
  size?: DcxSize;
  ariaLabel?: string;
  helperText?: string;
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
    helperText: {
      control: 'text',
      description: 'Texto de ayuda que se muestra debajo del campo de búsqueda',
    },
  },
  args: {
    placeholder: 'Buscar...',
    disabled: false,
    size: 'm',
    helperText: '',
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
          [helperText]="helperText"
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
        <!-- Custom Placeholder -->
        <section>
          <h4>Custom Placeholder</h4>
          <dcx-ng-search
            placeholder="Buscar productos...">
          </dcx-ng-search>
        </section>

        <!-- Small Size -->
        <section style="margin-bottom:24px;">
          <h4>Small Size</h4>
          <dcx-ng-search
            size="s"
            placeholder="Búsqueda pequeña...">
          </dcx-ng-search>
        </section>

        <!-- Medium Size (default) -->
        <section style="margin-bottom:24px;">
          <h4>Medium Size</h4>
          <dcx-ng-search
            size="m"
            placeholder="Búsqueda mediana...">
          </dcx-ng-search>
        </section>

        <!-- Large Size -->
        <section style="margin-bottom:24px;">
          <h4>Large Size</h4>
          <dcx-ng-search
            size="l"
            placeholder="Búsqueda grande...">
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
      </div>
    `,
  }),
};