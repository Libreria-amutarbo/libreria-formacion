import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgMessageComponent, MessageType } from '../../dcx-ng-components/dcx-ng-message/dcx-ng-message.component';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';

const meta: Meta<DcxNgMessageComponent> = {
  title: 'DCXLibrary/Message/Class based',
  component: DcxNgMessageComponent,
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
El componente Message proporciona una manera consistente de mostrar mensajes al usuario.
Soporta diferentes tipos de mensaje con estilos visuales diferenciados y opciones de personalización.

### Uso básico
\`\`\`html
<dcx-ng-message 
  body="Mensaje de ejemplo"
  type="notification">
</dcx-ng-message>
\`\`\`

### Con todas las opciones
\`\`\`html
<dcx-ng-message 
  body="Mensaje con todas las opciones"
  type="success"
  title="Título del mensaje"
  link="https://ejemplo.com"
  [icon]="true"
  [showClose]="true">
</dcx-ng-message>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    body: {
      control: { type: 'text' },
      description: 'El texto principal del mensaje. Es obligatorio.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['notification', 'error', 'warning', 'success'] as MessageType[],
      description: 'Define el tipo de mensaje que determina el estilo visual.',
      table: {
        type: { summary: 'MessageType' },
        defaultValue: { summary: 'notification' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Título opcional que se muestra encima del cuerpo del mensaje.',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    link: {
      control: { type: 'text' },
      description: 'URL opcional que se muestra como enlace debajo del mensaje.',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Controla si se muestra un icono junto al mensaje.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClose: {
      control: { type: 'boolean' },
      description: 'Controla si se muestra el botón de cerrar.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    body: 'Este es un mensaje de ejemplo',
    type: 'notification',
    title: undefined,
    link: undefined,
    icon: false,
    showClose: false,
  },
};

export default meta;
type Story = StoryObj<DcxNgMessageComponent>;

export const Default: Story = {
  args: {
    body: 'Este es un mensaje de notificación por defecto',
    type: 'notification',
  },
};

export const Notification: Story = {
  args: {
    body: 'Esta es una notificación informativa para el usuario',
    type: 'notification',
    title: 'Información',
    icon: true,
  },
};

export const Error: Story = {
  args: {
    body: 'Ha ocurrido un error al procesar tu solicitud',
    type: 'error',
    title: 'Error',
    icon: true,
    showClose: true,
  },
};

export const Warning: Story = {
  args: {
    body: 'Atención: Esta acción no se puede deshacer',
    type: 'warning',
    title: 'Advertencia',
    icon: true,
  },
};

export const Success: Story = {
  args: {
    body: 'La operación se ha completado exitosamente',
    type: 'success',
    title: '¡Éxito!',
    icon: true,
    showClose: true,
  },
};

export const WithLink: Story = {
  args: {
    body: 'Para más información consulta nuestra documentación',
    type: 'notification',
    title: 'Información adicional',
    link: 'https://ejemplo.com/docs',
    icon: true,
  },
};

export const OnlyBody: Story = {
  args: {
    body: 'Mensaje simple sin título, icono ni botón de cerrar',
    type: 'notification',
  },
};

export const Complete: Story = {
  args: {
    body: 'Este es un mensaje completo que muestra todas las características disponibles del componente',
    type: 'warning',
    title: 'Mensaje completo',
    link: 'https://ejemplo.com/help',
    icon: true,
    showClose: true,
  },
};

export const NoTitle: Story = {
  args: {
    body: 'Mensaje sin título pero con icono y botón de cerrar habilitados',
    type: 'error',
    icon: true,
    showClose: true,
  },
};

export const Playground: Story = {
  args: {
    body: 'Experimenta con todas las propiedades del componente',
    type: 'notification',
    title: 'Playground',
    link: 'https://ejemplo.com',
    icon: true,
    showClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Esta historia te permite experimentar con todas las propiedades del componente Message.
Usa los controles del panel inferior para modificar las propiedades y ver cómo cambia
el componente en tiempo real.

**Propiedades disponibles:**
- **body**: El contenido principal del mensaje (obligatorio)
- **type**: Tipo de mensaje (notification, error, warning, success)
- **title**: Título opcional
- **link**: Enlace opcional
- **icon**: Mostrar icono (booleano)
- **showClose**: Mostrar botón de cerrar (booleano)
        `,
      },
    },
  },
};
