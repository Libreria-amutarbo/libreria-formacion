import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

type UnstyledSearchArgs = {
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  searchValue?: string;
};

const meta: Meta<UnstyledSearchArgs> = {
  title: 'DCXLibrary/Search/Unstyled',
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder del campo de búsqueda' },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta accesible para el campo de búsqueda',
    },
    disabled: { control: 'boolean', description: 'Deshabilita el campo de búsqueda' },
    searchValue: {
      control: 'text',
      description: 'Valor actual del campo (vía ngModel)',
      table: { category: 'Story state' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Versión **sin estilos** del componente de búsqueda. Basado en un `<input type="text">` nativo ' +
          'con un botón de búsqueda. Ideal para aplicar estilos personalizados.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<UnstyledSearchArgs>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    ariaLabel: 'Search field',
    disabled: false,
    searchValue: '',
  },
  render: (args) => {
    return {
      props: {
        ...args,
        onSearch: (value: string) => {
        },
        onInput: (event: Event) => {
          const input = event.target as HTMLInputElement;
          args.searchValue = input.value;
        },
      },
      template: `
        <div style="width:360px;">
          <div style="display:flex; gap:8px; align-items:center;">
            <input
              type="text"
              [placeholder]="placeholder"
              [disabled]="disabled"
              [attr.aria-label]="ariaLabel"
              [(ngModel)]="searchValue"
              (input)="onInput($event)"
              (keydown.enter)="onSearch(searchValue)"
              style="
                flex:1;
                padding:0.5rem 1rem;
                border:1px solid #ccc;
                border-radius:4px;
                font-size:14px;
              "
            />
            <button
              type="button"
              [disabled]="disabled"
              [attr.aria-label]="'Search'"
              (click)="onSearch(searchValue)"
              style="
                padding:0.5rem 1rem;
                border:1px solid #ccc;
                border-radius:4px;
                background:#f5f5f5;
                cursor:pointer;
                font-size:14px;
              "
            >
              🔍
            </button>
          </div>
          <p style="margin-top:8px; color:#666; font-size:12px;">
            Current value: {{ searchValue || '—' }}
          </p>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This search is disabled',
    ariaLabel: 'Disabled search field',
    disabled: true,
    searchValue: '',
  },
  render: Default.render,
};

export const WithInitialValue: Story = {
  args: {
    placeholder: 'Search...',
    ariaLabel: 'Search field with initial value',
    disabled: false,
    searchValue: 'Initial search term',
  },
  render: Default.render,
};