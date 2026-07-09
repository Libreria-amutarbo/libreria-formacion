import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from '@storybook/test';
import '../../../index';

import { DcxWebChip, DCX_CHIP_COLORS, DCX_CHIP_VARIANTS, DCX_CHIP_ICONS } from '../../../index';

type DcxWebChipArgs = {
  variant: string;
  color: string;
  label: string;
  icon: string;
  image: string;
  removable: boolean;
};

const meta: Meta<DcxWebChip> = {
  title: 'DCXLibrary/WebComponents/Chip',
  component: 'dcx-web-chip',

  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    variant: 'choice',
    color: 'primary',
    label: 'Chip por defecto',
    icon: '',
    image: '',
    removable: false,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del chip (obligatorio)',
      table: {
        type: { summary: 'string' },
        category: 'Atributos',
        defaultValue: { summary: '""' },
      },
    },
    color: {
      control: { type: 'select' },
      options: DCX_CHIP_COLORS,
      description: 'Color del chip según el sistema de diseño',
      table: {
        type: { summary: 'string' },
        category: 'Atributos',
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: DCX_CHIP_VARIANTS,
      description:
        'Variante del chip: `choice` (no removible) o `filter` (muestra botón de eliminar)',
      table: {
        type: { summary: '"choice" | "filter"' },
        category: 'Atributos',
        defaultValue: { summary: 'choice' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: ['', ...DCX_CHIP_ICONS],
      description: 'Icono de Bootstrap (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Atributos',
        defaultValue: { summary: '' },
      },
    },
    image: {
      control: 'text',
      type: { name: 'string'},
      description: 'URL de imagen para mostrar en el chip (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Atributos',
        defaultValue: { summary: '""' },
      },
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Muestra el botón de eliminar independientemente de la variante. Alternativa a `variant="filter"`.',
      table: {
        type: { summary: 'boolean' },
        category: 'Atributos',
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => html`
    <dcx-web-chip
      label=${args.label}
      color=${args.color}
      variant=${args.variant}
      ?removable=${args.removable}
      icon=${args.icon}
      image=${args.image}
      @dcx-chip-remove=${fn()}
    ></dcx-web-chip>
  `,
};

export default meta;
type Story = StoryObj<DcxWebChipArgs>;

export const Default: Story = {
  args: {
    label: 'Chip por defecto',
    color: 'primary',
    variant: 'choice',
  },
};

export const Primary: Story = {
  args: {
    label: 'Chip primario',
    color: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Con icono',
    icon: 'house',
    color: 'primary',
  },
};

export const WithImage: Story = {
  args: {
    label: 'Con imagen',
    image: 'https://picsum.photos/360/240',
    color: 'secondary',
  },
};

export const Removable: Story = {
  args: {
    label: 'Removible',
    color: 'warning',
    variant: 'filter',
  },
};

export const RemovableWithIcon: Story = {
  args: {
    label: 'Angular',
    icon: 'code-slash',
    color: 'error',
    variant: 'filter',
  },
};

export const RemovableWithImage: Story = {
  args: {
    label: 'Usuario',
    image: 'https://picsum.photos/360/240',
    color: 'success',
    variant: 'filter',
  },
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip label="Primary" color="primary"></dcx-web-chip>
      <dcx-web-chip label="Secondary" color="secondary"></dcx-web-chip>
      <dcx-web-chip label="Success" color="success"></dcx-web-chip>
      <dcx-web-chip label="Warning" color="warning"></dcx-web-chip>
      <dcx-web-chip label="Error" color="error"></dcx-web-chip>
      <dcx-web-chip label="Info" color="info"></dcx-web-chip>
      <dcx-web-chip label="Gray" color="gray"></dcx-web-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Muestra todos los colores disponibles del sistema de diseño.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip label="Home" icon="house" color="primary"></dcx-web-chip>
      <dcx-web-chip label="Usuario" icon="person" color="secondary"></dcx-web-chip>
      <dcx-web-chip label="Configuración" icon="gear" color="success"></dcx-web-chip>
      <dcx-web-chip label="Favorito" icon="star" color="warning"></dcx-web-chip>
      <dcx-web-chip label="Eliminar" icon="trash" color="error"></dcx-web-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Chips con diferentes iconos Bootstrap Icons.',
      },
    },
  },
};

export const WithImages: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip 
        label="Avatar 1" 
        image="https://picsum.photos/seed/a1/360/240" 
        color="primary">
      </dcx-web-chip>
      <dcx-web-chip 
        label="Avatar 2" 
        image="https://picsum.photos/seed/a2/360/240" 
        color="secondary">
      </dcx-web-chip>
      <dcx-web-chip 
        label="Avatar 3" 
        image="https://picsum.photos/seed/a3/360/240" 
        color="success">
      </dcx-web-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Chips con imágenes placeholder que simulan avatares de usuario.',
      },
    },
  },
};

export const RemovableChips: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip
        label="Removible"
        color="primary"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Con icono"
        icon="star"
        color="warning"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Con imagen"
        image="https://picsum.photos/seed/rm/360/240"
        color="error"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Chips removibles con diferentes configuraciones.',
      },
    },
  },
};

export const TechnologyTags: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
      <dcx-web-chip
        label="Angular"
        icon="code-slash"
        color="error"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="TypeScript"
        icon="terminal"
        color="primary"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="SCSS"
        icon="palette"
        color="secondary"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Storybook"
        icon="book"
        color="success"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
      <dcx-web-chip
        label="Jest"
        icon="bug"
        color="warning"
        variant="filter"
        @dcx-chip-remove=${() => {}}
      ></dcx-web-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo temático con tecnologías. Perfecto para filtros o tags de selección.',
      },
    },
  },
};