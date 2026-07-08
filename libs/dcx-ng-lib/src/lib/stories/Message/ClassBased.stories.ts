import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgMessageComponent } from '../../dcx-ng-components/dcx-ng-message/dcx-ng-message.component';
import { moduleMetadata } from '@storybook/angular';
import { DcxNgIconComponent } from '../../dcx-ng-components/dcx-ng-icon/dcx-ng-icon.component';
import { DcxMessageType } from '../../core/interfaces/message';

const meta: Meta<DcxNgMessageComponent> = {
  title: 'DCXLibrary/Components/Message',
  component: DcxNgMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [DcxNgIconComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
El componente Message muestra mensajes al usuario con cuatro severidades
(notification, success, warning, error). Anuncia el contenido a lectores de pantalla
mediante \`role\`/\`aria-live\` (salvo cuando lo envuelve un contenedor que ya anuncia,
como el toast).
        `,
      },
    },
  },
  argTypes: {
    body: {
      name: 'body',
      control: { type: 'text' },
      description: 'El texto principal del mensaje. Es obligatorio.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
        category: 'Atributos',
      },
    },
    type: {
      name: 'type',
      control: { type: 'select' },
      options: ['notification', 'success', 'warning', 'error'] as DcxMessageType[],
      description: 'Severidad del mensaje; determina color, icono por defecto y rol ARIA.',
      table: {
        type: { summary: 'DcxMessageType' },
        defaultValue: { summary: 'notification' },
        category: 'Atributos',
      },
    },
    title: {
      name: 'title',
      control: { type: 'text' },
      description: 'Título opcional que se muestra encima del cuerpo del mensaje.',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
        category: 'Atributos',
      },
    },
    link: {
      name: 'link',
      control: { type: 'text' },
      description: 'URL opcional que se muestra como enlace debajo del mensaje.',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
        category: 'Atributos',
      },
    },
    icon: {
      name: 'icon',
      control: { type: 'boolean' },
      description:
        'Muestra un icono. Sin `iconName`, usa el icono por defecto de la severidad.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Atributos',
      },
    },
    iconName: {
      name: 'iconName',
      control: { type: 'text' },
      description: 'Sobrescribe el icono por defecto de la severidad (Bootstrap Icons).',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
        category: 'Atributos',
      },
    },
    showClose: {
      name: 'showClose',
      control: { type: 'boolean' },
      description: 'Muestra el botón de cerrar.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Atributos',
      },
    },
    announce: {
      name: 'announce',
      control: { type: 'boolean' },
      description:
        'Si es true, aplica `role`/`aria-live` para anunciar a lectores de pantalla. Poner a false cuando un contenedor padre ya anuncia (p.ej. toast).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Atributos',
      },
    },
    closed: {
      name: 'closed',
      action: 'closed',
      description: 'Se emite al pulsar el botón de cerrar.',
      table: {
        type: { summary: '() => void' },
        category: 'Eventos',
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
    announce: true,
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

export const Success: Story = {
  args: {
    body: 'La operación se ha completado exitosamente',
    type: 'success',
    title: '¡Éxito!',
    icon: true,
  },
};

export const Warning: Story = {
  args: {
    body: 'Atención: esta acción no se puede deshacer',
    type: 'warning',
    title: 'Advertencia',
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

export const WithLink: Story = {
  args: {
    body: 'Para más información consulta nuestra documentación',
    type: 'notification',
    title: 'Información adicional',
    link: 'https://ejemplo.com/docs',
    icon: true,
  },
};

export const Closable: Story = {
  args: {
    body: 'Pulsa la X para cerrar este mensaje.',
    type: 'success',
    title: 'Guardado',
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
};
