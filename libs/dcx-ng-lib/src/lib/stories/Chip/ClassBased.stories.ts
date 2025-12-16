import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeColors } from '../../core/interfaces';
import { DcxNgChipComponent } from '../../dcx-ng-components/dcx-ng-chip/dcx-ng-chip.component';

const meta: Meta<DcxNgChipComponent> = {
  title: 'DCXLibrary/Chip/Class Based',
  component: DcxNgChipComponent,
  tags: ['autodocs'],
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
    removable: {
      control: { type: 'boolean' },
      description: 'Muestra el botón X para eliminar el chip',
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono Material (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Attributes',
        defaultValue: { summary: '""' },
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
    icon: 'home',
    color: ThemeColors.PRIMARY,
  },
};

export const WithImage: Story = {
  args: {
    label: 'Con imagen',
    image: 'https://via.placeholder.com/32x32/0070AD/FFFFFF?text=U',
    color: ThemeColors.SECONDARY,
  },
};

export const Removable: Story = {
  args: {
    label: 'Removible',
    color: ThemeColors.WARNING,
    removable: true,
  },
};

export const RemovableWithIcon: Story = {
  args: {
    label: 'Angular',
    icon: 'code',
    color: ThemeColors.ERROR,
    removable: true,
  },
};

export const RemovableWithImage: Story = {
  args: {
    label: 'Usuario',
    image: 'https://via.placeholder.com/32x32/00A76F/FFFFFF?text=A',
    color: ThemeColors.SUCCESS,
    removable: true,
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
        <dcx-ng-chip label="Gray Light" color="gray-light"></dcx-ng-chip>
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
        <dcx-ng-chip label="Home" icon="home" color="primary"></dcx-ng-chip>
        <dcx-ng-chip label="Usuario" icon="person" color="secondary"></dcx-ng-chip>
        <dcx-ng-chip label="Configuración" icon="settings" color="success"></dcx-ng-chip>
        <dcx-ng-chip label="Favorito" icon="star" color="warning"></dcx-ng-chip>
        <dcx-ng-chip label="Eliminar" icon="delete" color="error"></dcx-ng-chip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chips con diferentes iconos Material Design.',
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
          image="https://via.placeholder.com/32x32/0070AD/FFFFFF?text=A1" 
          color="primary">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Avatar 2" 
          image="https://via.placeholder.com/32x32/2B0A3D/FFFFFF?text=A2" 
          color="secondary">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Avatar 3" 
          image="https://via.placeholder.com/32x32/00A76F/FFFFFF?text=A3" 
          color="success">
        </dcx-ng-chip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chips con imágenes placeholder que simulan avatares de usuario.',
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
          [removable]="true"
          (onRemove)="handleRemove('Removible')">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Con icono" 
          icon="star" 
          color="warning" 
          [removable]="true"
          (onRemove)="handleRemove('Con icono')">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Con imagen" 
          image="https://via.placeholder.com/32x32/EF4444/FFFFFF?text=RM" 
          color="error" 
          [removable]="true"
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
        story: 'Chips removibles con diferentes configuraciones. Abre la consola para ver los eventos.',
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
          icon="code" 
          color="error" 
          [removable]="true">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="TypeScript" 
          icon="terminal" 
          color="primary" 
          [removable]="true">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="SCSS" 
          icon="palette" 
          color="secondary" 
          [removable]="true">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Storybook" 
          icon="book" 
          color="success" 
          [removable]="true">
        </dcx-ng-chip>
        <dcx-ng-chip 
          label="Jest" 
          icon="bug_report" 
          color="warning" 
          [removable]="true">
        </dcx-ng-chip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso como etiquetas de tecnología con iconos y funcionalidad de eliminación.',
      },
    },
  },
};