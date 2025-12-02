import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgIconFieldComponent } from '../../dcx-ng-components/dcx-ng-iconField/dcx-ng-iconField.component';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';
import { DcxSize } from '../../core/interfaces';


const meta: Meta<DcxNgIconFieldComponent> = {
  title: 'DCXLibrary/IconField/Class based',
  component: DcxNgIconFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente IconField proporciona un campo de entrada con iconos integrados.
Funciona igual que un input normal pero permite añadir iconos a la izquierda y/o derecha.

### Uso básico
\`\`\`html
<dcx-ng-icon-field 
  placeholder="Buscar..."
  iconLeft="search">
</dcx-ng-icon-field>
\`\`\`

### Con ambos iconos
\`\`\`html
<dcx-ng-icon-field 
  placeholder="Buscar..."
  iconLeft="search"
  iconRight="close"
  [iconSize]="'m'">
</dcx-ng-icon-field>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Texto placeholder del input.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    iconLeft: {
      control: { type: 'text' },
      description: 'Nombre del icono a mostrar a la izquierda.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    iconRight: {
      control: { type: 'text' },
      description: 'Nombre del icono a mostrar a la derecha.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    iconSize: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'] as DcxSize[],
      description: 'Tamaño de los iconos.',
      table: {
        type: { summary: 'DcxSize' },
        defaultValue: { summary: 'm' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado del campo.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor actual del campo.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
  args: {
    placeholder: 'Escribe aquí...',
    iconLeft: '',
    iconRight: '',
    iconSize: 'm',
    disabled: false,
    value: '',
  },
};

export default meta;
type Story = StoryObj<DcxNgIconFieldComponent>;

export const IconLeft: Story = {
  args: {
    placeholder: 'Buscar...',
    iconLeft: 'search',
  },
};

export const IconRight: Story = {
  args: {
    placeholder: 'Campo con icono derecho',
    iconRight: 'close',
  },
};

export const BothIcons: Story = {
  args: {
    placeholder: 'Campo con ambos iconos',
    iconLeft: 'search',
    iconRight: 'close',
  },
};

export const SizeSmall: Story = {
  args: {
    placeholder: 'Tamaño pequeño',
    iconLeft: 'search',
    iconSize: 's',
  },
};

export const SizeMedium: Story = {
  args: {
    placeholder: 'Tamaño medio',
    iconLeft: 'search',
    iconSize: 'm',
  },
};

export const SizeLarge: Story = {
  args: {
    placeholder: 'Tamaño grande',
    iconLeft: 'search',
    iconSize: 'l',
  },
};

