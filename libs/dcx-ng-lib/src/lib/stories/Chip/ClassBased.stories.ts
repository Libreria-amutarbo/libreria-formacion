import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgChipComponent, ThemeColors, ChipVariant } from '@dcx-ng-components/dcx-ng-lib';
import { BOOTSTRAP_ICONS } from 'libs/dcx-ng-lib/.storybook/bootstrap-icons';

const meta: Meta<DcxNgChipComponent> = {
  title: 'DCXLibrary/Chip/Class Based',
  component: DcxNgChipComponent,
  tags: ['autodocs'],
  args: {
    variant: ChipVariant.CHOICE,
    color: ThemeColors.PRIMARY,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del chip (obligatorio)',
      table: {
        type: { summary: 'string' },
        category: 'Attributes',
        defaultValue: { summary: '""' },
      },
    },
    color: {
      control: { type: 'select' },
      options: Object.values(ThemeColors),
      description: 'Color del chip según el sistema de diseño',
      table: {
        type: { summary: 'ThemeColors' },
        category: 'Attributes',
        defaultValue: { summary: ThemeColors.PRIMARY },
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(ChipVariant),
      description:
        'Variante del chip: `choice` (no removible) o `filter` (muestra botón de eliminar)',
      table: {
        type: { summary: '"choice" | "filter"' },
        category: 'Attributes',
        defaultValue: { summary: 'choice' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: BOOTSTRAP_ICONS,
      description: 'Icono de boostrap (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    image: {
      control: { type: 'text' },
      description: 'URL de imagen para mostrar en el chip (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Attributes',
        defaultValue: { summary: '""' },
      },
    },
    removeChip: {
      action: 'onRemove',
      description: 'Evento emitido cuando se hace clic en el botón X',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgChipComponent>;

export const Default: Story = {
  args: {
    label: 'Chip por defecto',
    color: ThemeColors.PRIMARY,
  },
};

export const Primary: Story = {
  args: {
    label: 'Chip primario',
    color: ThemeColors.PRIMARY,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Con icono',
    icon: 'house',
    color: ThemeColors.PRIMARY,
  },
};

export const WithImage: Story = {
  args: {
    label: 'Con imagen',
    image: 'https://picsum.photos/360/240',
    color: ThemeColors.SECONDARY,
  },
};

export const Removable: Story = {
  args: {
    label: 'Removible',
    color: ThemeColors.WARNING,
    variant: ChipVariant.FILTER,
  },
};

export const RemovableWithIcon: Story = {
  args: {
    label: 'Angular',
    icon: 'code-slash',
    color: ThemeColors.ERROR,
    variant: ChipVariant.FILTER,
  },
};

export const RemovableWithImage: Story = {
  args: {
    label: 'Usuario',
    image: 'https://picsum.photos/360/240',
    color: ThemeColors.SUCCESS,
    variant: ChipVariant.FILTER,
  },
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <dcx-ng-chip label="Primary" color="primary"></dcx-ng-chip>
        <dcx-ng-chip label="Secondary" color="secondary"></dcx-ng-chip>
        <dcx-ng-chip label="Success" color="success"></dcx-ng-chip>
        <dcx-ng-chip label="Warning" color="warning"></dcx-ng-chip>
        <dcx-ng-chip label="Error" color="error"></dcx-ng-chip>
        <dcx-ng-chip label="Info" color="info"></dcx-ng-chip>
        <dcx-ng-chip label="Gray" color="gray"></dcx-ng-chip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Muestra todos los colores disponibles del sistema de diseño.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <dcx-ng-chip label="Home" icon="house" color="primary"></dcx-ng-chip>
        <dcx-ng-chip label="Usuario" icon="person" color="secondary"></dcx-ng-chip>
        <dcx-ng-chip label="Configuración" icon="gear" color="success"></dcx-ng-chip>
        <dcx-ng-chip label="Favorito" icon="star" color="warning"></dcx-ng-chip>
        <dcx-ng-chip label="Eliminar" icon="trash" color="error"></dcx-ng-chip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chips con diferentes iconos Bootstrap Icons.',
      },
    },
  },
};

export const WithImages: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <dcx-ng-chip 
          label="Avatar 1" 
          image="https://picsum.photos/seed/a1/360/240" 
          color="primary">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Avatar 2" 
          image="https://picsum.photos/seed/a2/360/240" 
          color="secondary">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Avatar 3" 
          image="https://picsum.photos/seed/a3/360/240" 
          color="success">
        </dcx-ng-chip>
      </div>
    `,
  }),
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
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <dcx-ng-chip 
          label="Removible" 
          color="primary" 
          variant="filter"
          (onRemove)="handleRemove('Removible')">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Con icono" 
          icon="star" 
          color="warning" 
          variant="filter"
          (onRemove)="handleRemove('Con icono')">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Con imagen" 
          image="https://picsum.photos/seed/rm/360/240" 
          color="error" 
          variant="filter"
          (onRemove)="handleRemove('Con imagen')">
        </dcx-ng-chip>
      </div>
    `,
    props: {
      handleRemove: (label: string) => {
        console.log(`Chip removido: ${label}`);
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Chips removibles con diferentes configuraciones. Abre la consola para ver los eventos.',
      },
    },
  },
};

export const TechnologyTags: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <dcx-ng-chip 
          label="Angular" 
          icon="code-slash" 
          color="error" 
          variant="filter">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="TypeScript" 
          icon="terminal" 
          color="primary" 
          variant="filter">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="SCSS" 
          icon="palette" 
          color="secondary" 
          variant="filter">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Storybook" 
          icon="book" 
          color="success" 
          variant="filter">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Jest" 
          icon="bug" 
          color="warning" 
          variant="filter">
        </dcx-ng-chip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo de uso como etiquetas de tecnología con iconos y funcionalidad de eliminación.',
      },
    },
  },
};
