import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgChipComponent, ThemeColors } from '../../dcx-ng-components/dcx-ng-chip/dcx-ng-chip.component';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';

const meta: Meta<DcxNgChipComponent> = {
  title: 'DCXLibrary/Chip/Unstyled',
  component: DcxNgChipComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
    docs: {
      description: {
        component: `
El componente Chip sin estilos muestra la funcionalidad básica sin aplicar el sistema de diseño.
Útil para implementaciones personalizadas o testing de funcionalidad pura.

### Funcionalidad básica
- Mostrar etiqueta de texto
- Soporte para iconos
- Soporte para imágenes
- Funcionalidad de eliminación
- Eventos de interacción

### Nota sobre estilos
Este componente mantiene toda la funcionalidad pero sin los estilos del sistema de diseño,
permitiendo implementaciones completamente personalizadas.

### Uso básico
\`\`\`html
<dcx-ng-chip 
  label="Etiqueta básica">
</dcx-ng-chip>
\`\`\`

### Con funcionalidad completa
\`\`\`html
<dcx-ng-chip 
  label="Chip funcional"
  icon="star"
  [removable]="true"
  (onRemove)="handleRemove()">
</dcx-ng-chip>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del chip (obligatorio)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary', 'secondary', 'success', 'warning', 'error', 
        'info', 'gray', 'gray-light'
      ] as ThemeColors[],
      description: 'Color del chip (sin efecto visual en versión unstyled)',
      table: {
        type: { summary: 'ThemeColors' },
        defaultValue: { summary: 'gray' },
      },
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Muestra el botón X para eliminar el chip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono Material (opcional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    image: {
      control: { type: 'text' },
      description: 'URL de imagen para mostrar en el chip (opcional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    onRemove: {
      action: 'onRemove',
      description: 'Evento emitido cuando se hace clic en el botón X',
      table: {
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
  args: {
    label: 'Chip sin estilos',
    color: 'gray',
    removable: false,
    icon: '',
    image: '',
  },
};

export default meta;
type Story = StoryObj<DcxNgChipComponent>;

export const BasicUnstyled: Story = {
  args: {
    label: 'Chip básico sin estilos',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip básico mostrando solo la funcionalidad sin estilos aplicados.',
      },
    },
  },
};

export const WithIconUnstyled: Story = {
  args: {
    label: 'Con icono',
    icon: 'home',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip con icono Material Design sin estilos de color.',
      },
    },
  },
};

export const WithImageUnstyled: Story = {
  args: {
    label: 'Con imagen',
    image: 'https://via.placeholder.com/32x32/CCCCCC/666666?text=IMG',
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip con imagen sin estilos de color aplicados.',
      },
    },
  },
};

export const RemovableUnstyled: Story = {
  args: {
    label: 'Removible sin estilos',
    removable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip removible mostrando funcionalidad pura sin estilos.',
      },
    },
  },
};

export const CompleteUnstyled: Story = {
  args: {
    label: 'Completo sin estilos',
    icon: 'star',
    removable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip con todas las funcionalidades activas pero sin estilos aplicados.',
      },
    },
  },
};

export const FunctionalityTest: Story = {
  render: () => ({
    template: `
      <div>
        <h3>Testing de funcionalidad sin estilos</h3>
        <div style="margin: 1rem 0; padding: 1rem; border: 1px dashed #ccc;">
          <p><strong>Chip básico:</strong></p>
          <dcx-ng-chip label="Solo texto"></dcx-ng-chip>
        </div>
        
        <div style="margin: 1rem 0; padding: 1rem; border: 1px dashed #ccc;">
          <p><strong>Chip con icono:</strong></p>
          <dcx-ng-chip label="Con icono" icon="person"></dcx-ng-chip>
        </div>
        
        <div style="margin: 1rem 0; padding: 1rem; border: 1px dashed #ccc;">
          <p><strong>Chip con imagen:</strong></p>
          <dcx-ng-chip 
            label="Con imagen" 
            image="https://via.placeholder.com/32x32/DDDDDD/777777?text=U">
          </dcx-ng-chip>
        </div>
        
        <div style="margin: 1rem 0; padding: 1rem; border: 1px dashed #ccc;">
          <p><strong>Chip removible:</strong></p>
          <dcx-ng-chip 
            label="Removible" 
            [removable]="true"
            (onRemove)="logRemove('Removible')">
          </dcx-ng-chip>
        </div>
        
        <div style="margin: 1rem 0; padding: 1rem; border: 1px dashed #ccc;">
          <p><strong>Chip completo:</strong></p>
          <dcx-ng-chip 
            label="Completo" 
            icon="settings"
            [removable]="true"
            (onRemove)="logRemove('Completo')">
          </dcx-ng-chip>
        </div>
      </div>
    `,
    props: {
      logRemove: (label: string) => {
        console.log(`Chip removido: ${label}`);
        alert(`Chip "${label}" removido - Ver consola para detalles`);
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Test completo de funcionalidad mostrando todos los tipos de chip sin estilos. Interactúa con los chips removibles para probar los eventos.',
      },
    },
  },
};

export const ColorPropsTest: Story = {
  render: () => ({
    template: `
      <div>
        <h3>Propiedades de color (sin efecto visual)</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.9rem;">
          Estos chips tienen diferentes valores de color asignados, pero al estar sin estilos no se reflejan visualmente.
          Útil para testing de lógica de componentes.
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <dcx-ng-chip label="Primary (sin estilo)" color="primary"></dcx-ng-chip>
          <dcx-ng-chip label="Secondary (sin estilo)" color="secondary"></dcx-ng-chip>
          <dcx-ng-chip label="Success (sin estilo)" color="success"></dcx-ng-chip>
          <dcx-ng-chip label="Warning (sin estilo)" color="warning"></dcx-ng-chip>
          <dcx-ng-chip label="Error (sin estilo)" color="error"></dcx-ng-chip>
          <dcx-ng-chip label="Info (sin estilo)" color="info"></dcx-ng-chip>
          <dcx-ng-chip label="Gray (sin estilo)" color="gray"></dcx-ng-chip>
          <dcx-ng-chip label="Gray Light (sin estilo)" color="gray-light"></dcx-ng-chip>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demuestra que las propiedades de color se pueden asignar pero no tienen efecto visual sin los estilos CSS correspondientes.',
      },
    },
  },
};

export const AccessibilityTest: Story = {
  args: {
    label: 'Chip accesible',
    icon: 'accessibility',
    removable: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Test de accesibilidad sin estilos:**

El componente mantiene todas sus características de accesibilidad:
- Atributos \`aria-label\` apropiados
- Botón de eliminación con texto descriptivo
- Estructura semántica correcta
- Navegación por teclado funcional

Inspecciona el DOM para verificar los atributos de accesibilidad.
        `,
      },
    },
  },
};

export const PlaygroundUnstyled: Story = {
  args: {
    label: 'Chip personalizable sin estilos',
    color: 'primary',
    icon: '',
    image: '',
    removable: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Playground sin estilos**

Experimenta con todas las propiedades del componente sin la interferencia visual de los estilos.
Perfecto para:
- Testing de funcionalidad
- Desarrollo de estilos personalizados
- Verificación de comportamiento base
- Implementaciones headless

Usa los controles para modificar las propiedades y observar cómo cambia la estructura del DOM.
        `,
      },
    },
  },
};
