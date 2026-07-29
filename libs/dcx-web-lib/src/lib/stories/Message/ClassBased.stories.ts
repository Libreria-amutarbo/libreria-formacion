import { html } from 'lit';
import type {
  Meta,
  StoryObj,
} from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-message/dcx-web-message.component';

import { DCX_MESSAGE_TYPES } from '../../core/defaults/message'

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Message',
  component: 'dcx-web-message',
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    body: {
      control: 'text',
      description:
        'Texto principal del mensaje.',
      table: {
        category: 'Atributos',
      },
    },

    type: {
      control: 'select',
      options: DCX_MESSAGE_TYPES,
      description:
        'Severidad del mensaje.',
      table: {
        category: 'Atributos',
      },
    },

    title: {
      control: 'text',
      description:
        'Título opcional del mensaje.',
      table: {
        category: 'Atributos',
      },
    },

    link: {
      control: 'text',
      description:
        'URL opcional mostrada como enlace.',
      table: {
        category: 'Atributos',
      },
    },

    icon: {
      control: 'boolean',
      description:
        'Muestra icono asociado a la severidad.',
      table: {
        category: 'Atributos',
      },
    },

    iconName: {
      control: 'text',
      description:
        'Sobrescribe el icono por defecto.',
      table: {
        category: 'Atributos',
      },
    },

    showClose: {
      control: 'boolean',
      description:
        'Muestra botón de cierre.',
      table: {
        category: 'Atributos',
      },
    },

    announce: {
      control: 'boolean',
      description:
        'Activa role y aria-live para lectores de pantalla.',
      table: {
        category: 'Atributos',
      },
    },

    closed: {
      action: 'closed',
      description:
        'Emitido al cerrar el mensaje.',
      table: {
        category: 'Eventos',
      },
    },
  },

  args: {
    body: 'Este es un mensaje de ejemplo',
    type: 'notification',
    title: '',
    link: '',
    icon: false,
    iconName: '',
    showClose: false,
    announce: true,
  },

  render: (args) => html`
    <dcx-web-message
      body=${args.body}
      type=${args.type}
      title=${args.title}
      link=${args.link}
      iconName=${args.iconName}
      ?icon=${args.icon}
      ?showClose=${args.showClose}
      ?announce=${args.announce}
    >
    </dcx-web-message>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    body:
      'Este es un mensaje de notificación por defecto.',
  },
};

export const Notification: Story = {
  args: {
    type: 'notification',
    title: 'Información',
    body:
      'Esta es una notificación informativa para el usuario.',
    icon: true,
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    title: '¡Éxito!',
    body:
      'La operación se ha completado exitosamente.',
    icon: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Advertencia',
    body:
      'Esta acción no se puede deshacer.',
    icon: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    body:
      'Ha ocurrido un error al procesar tu solicitud.',
    icon: true,
    showClose: true,
  },
};

export const WithLink: Story = {
  args: {
    type: 'notification',
    title: 'Información adicional',
    body:
      'Consulta la documentación para conocer todos los detalles.',
    link: 'https://ejemplo.com/docs',
    icon: true,
  },
};

export const Closable: Story = {
  args: {
    type: 'success',
    title: 'Guardado',
    body:
      'Pulsa la X para cerrar este mensaje.',
    icon: true,
    showClose: true,
  },
};

export const Playground: Story = {
  args: {
    body:
      'Experimenta con todas las propiedades del componente.',
    type: 'notification',
    title: 'Playground',
    link: 'https://ejemplo.com',
    icon: true,
    showClose: true,
  },
};