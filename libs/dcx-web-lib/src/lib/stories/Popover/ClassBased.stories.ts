import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../../index';

import '../../dcx-web-components/dcx-web-popover/dcx-web-popover.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../dcx-web-components/dcx-web-list/dcx-web-list.component';
import '../../dcx-web-components/dcx-web-chip/dcx-web-chip.component';
import '../../dcx-web-components/dcx-web-divider/dcx-web-divider.component';

import { BUTTON_VARIANT_LIST } from '../../core/defaults';

const renderPopoverStory = (args: any, customContent?: any) => {
  const popoverId = `storybook-popover-${Math.random().toString(36).substring(2, 9)}`;
  const containerId = `container-${popoverId}`;
  const isIconOnly = args.buttonVariant === 'icon-only';

  return html`
    <div
      style="padding: 100px; display: flex; justify-content: center; position: relative;"
    >
      <div id="${containerId}" style="display: inline-block;">
        <dcx-web-button
          .label="${isIconOnly ? '' : args.buttonLabel}"
          .ariaLabel="${isIconOnly ? args.buttonLabel : ''}"
          .variant="${args.buttonVariant}"
          .iconName="${isIconOnly ? 'house-fill' : ''}"
          aria-haspopup="dialog"
          @buttonClick="${(event: Event) => {
            if (event && typeof (event as any).stopPropagation === 'function') {
              (event as any).stopPropagation();
            }
            const root = (event.currentTarget as HTMLElement)?.getRootNode() as
              | ShadowRoot
              | Document;
            const popover = root?.querySelector(`#${popoverId}`) as any;
            const container = root?.querySelector(
              `#${containerId}`,
            ) as HTMLElement;
            popover?.toggle(event, container);
          }}"
        >
        </dcx-web-button>
      </div>

      <dcx-web-popover
        id="${popoverId}"
        aria-label="${args.popoverTitle || 'Contenido contextual'}"
        @opened="${args.opened}"
        @closed="${args.closed}"
      >
        ${
          args.popoverTitle && !customContent
            ? html`<h3>${args.popoverTitle}</h3>`
            : ''
        }
        ${
          args.popoverContent && !customContent
            ? html`<p>${args.popoverContent}</p>`
            : ''
        }
        ${customContent || ''}
      </dcx-web-popover>
    </div>
  `;
};

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Popover',
  component: 'dcx-web-popover',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-web-popover` es un componente overlay que muestra contenido contextual al hacer clic en un elemento trigger. ' +
          'Soporta posicionamiento automático, cierre al hacer clic fuera o pulsar Escape, y proyección de contenido mediante slots.',
      },
    },
  },
  argTypes: {
    buttonLabel: {
      name: 'buttonLabel',
      control: 'text',
      description: 'Texto del botón que abre el popover',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Open Popover' },
      },
    },
    buttonVariant: {
      name: 'buttonVariant',
      control: 'select',
      options: BUTTON_VARIANT_LIST,
      description: 'Variante visual del botón trigger',
      table: {
        category: 'Atributos',
        type: {
          summary:
            "'primary' | 'secondary' | 'terciary' | 'danger' | 'icon-only' | 'text'",
        },
        defaultValue: { summary: 'primary' },
      },
    },
    popoverTitle: {
      name: 'popoverTitle',
      control: 'text',
      description: 'Título que se muestra en la cabecera del popover',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    popoverContent: {
      name: 'popoverContent',
      control: 'text',
      description:
        'Texto de contenido del popover. Se puede sustituir por contenido enriquecido via slot',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    opened: {
      name: 'opened',
      action: 'opened',
      description: 'Se emite cuando el popover se abre',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
        defaultValue: { summary: '-' },
      },
    },
    closed: {
      name: 'closed',
      action: 'closed',
      description: 'Se emite cuando el popover se cierra',
      table: {
        category: 'Eventos',
        type: { summary: '() => void' },
        defaultValue: { summary: '-' },
      },
    },
    toggle: {
      name: 'toggle()',
      control: false,
      description:
        'Alterna la apertura del popover para el elemento disparador.',
      table: {
        category: 'Métodos',
        type: { summary: '(event: Event, target?: HTMLElement) => void' },
      },
    },
    show: {
      name: 'show()',
      control: false,
      description: 'Abre el popover y lo posiciona respecto al disparador.',
      table: {
        category: 'Métodos',
        type: { summary: '(event?: Event, target?: HTMLElement) => void' },
      },
    },
    hide: {
      name: 'hide()',
      control: false,
      description:
        'Cierra el popover (devuelve el foco al disparador por defecto).',
      table: {
        category: 'Métodos',
        type: { summary: '(options?: { returnFocus?: boolean }) => void' },
      },
    },
  },
  args: {
    buttonLabel: 'Open Popover',
    buttonVariant: 'primary',
    popoverTitle: 'Popover Title',
    popoverContent:
      'This is the content inside the popover. It can be any HTML or Angular component.',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  render: args => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story:
          'Popover básico con título y contenido de texto. Haz clic en el botón para abrirlo.',
      },
    },
  },
};

export const WithRichContent: Story = {
  name: 'Rich Content',
  args: {
    buttonLabel: 'User Info',
    buttonVariant: 'secondary',
  },
  render: args =>
    renderPopoverStory(
      args,
      html`
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 var(--sp-2, 8px) 0;">John Doe</h4>
          <p style="margin: 0 0 var(--sp-1, 4px) 0; font-size: var(--fs-base, 14px); color: #666;">
            Software Engineer
          </p>
          <p style="margin: 0; font-size: var(--fs-sm, 12px); color: #999;">
            john.doe@example.com
          </p>
        </div>
      `,
    ),
  parameters: {
    docs: {
      description: {
        story:
          'Popover con contenido enriquecido: nombre, cargo y email. Ideal para mostrar información de usuario.',
      },
    },
  },
};

const actionItems = [
  { text: 'Edit', icon: 'pencil' },
  { text: 'Duplicate', icon: 'copy' },
  { divider: true },
  { text: 'Delete', icon: 'trash', variant: 'danger' },
];

export const WithActions: Story = {
  name: 'With Actions',
  args: {
    buttonLabel: 'Options',
    buttonVariant: 'terciary',
  },
  render: args =>
    renderPopoverStory(
      args,
      html`
        <dcx-web-list
          .items="${actionItems}"
          .selectable="${true}"
        ></dcx-web-list>
      `,
    ),
  parameters: {
    docs: {
      description: {
        story:
          'Popover con lista de acciones. Puede usarse como menú contextual ligero.',
      },
    },
  },
};

export const WithComponents: Story = {
  name: 'With Components',
  args: {
    buttonLabel: 'Filtrar',
    buttonVariant: 'secondary',
  },
  render: args =>
    renderPopoverStory(
      args,
      html`
        <div style="min-width: 260px;">
          <p style="margin: 0 0 var(--sp-2, 8px) 0; font-weight: var(--fw-semibold, 600);">
            Filtrar por etiqueta
          </p>
          <div
            style="display: flex; flex-wrap: wrap; gap: var(--sp-2, 8px); margin-bottom: var(--sp-3, 12px);"
          >
            <dcx-web-chip
              label="Angular"
              color="primary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="TypeScript"
              color="secondary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Design System"
              color="primary"
              variant="filter"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Storybook"
              color="secondary"
              variant="filter"
            ></dcx-web-chip>
          </div>
          <dcx-web-divider></dcx-web-divider>
          <div
            style="display: flex; justify-content: flex-end; gap: var(--sp-2, 8px); margin-top: var(--sp-3, 12px);"
          >
            <dcx-web-button
              label="Limpiar"
              variant="terciary"
              size="s"
            ></dcx-web-button>
            <dcx-web-button
              label="Aplicar"
              variant="primary"
              size="s"
            ></dcx-web-button>
          </div>
        </div>
      `,
    ),
  parameters: {
    docs: {
      description: {
        story:
          'Popover con componentes de la librería: chips de filtro, divider y botones de acción.',
      },
    },
  },
};

export const LongContent: Story = {
  name: 'Long Content',
  args: {
    buttonLabel: 'Ver detalles',
    buttonVariant: 'secondary',
  },
  render: args =>
    renderPopoverStory(
      args,
      html`
        <div style="max-height: 200px; overflow-y: auto;">
          <h3>Descripción completa</h3>
          <p>
            Este componente permite mostrar información contextual de forma no
            intrusiva. Es ideal para tooltips enriquecidos, menús de acciones,
            detalles de usuario o cualquier contenido que deba aparecer al
            interactuar con un elemento de la interfaz.
          </p>
          <p>
            El popover se posiciona automáticamente respecto al elemento trigger
            y se cierra al hacer clic fuera o pulsando la tecla Escape. El ancho
            máximo está limitado para garantizar la legibilidad del contenido.
          </p>
          <p>
            Contenido adicional para forzar el scroll: Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris.
          </p>
          <p>
            Más contenido para demostrar el scroll vertical: Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident.
          </p>
        </div>
      `,
    ),
  parameters: {
    docs: {
      description: {
        story:
          'Popover con texto largo para verificar que el contenido no desborda el contenedor y se adapta correctamente al ancho máximo definido.',
      },
    },
  },
};

export const WithImage: Story = {
  name: 'With Image',
  args: {
    buttonLabel: 'Ver preview',
    buttonVariant: 'secondary',
  },
  render: args =>
    renderPopoverStory(
      args,
      html`
        <div style="min-width: 280px;">
          <img
            src="https://picsum.photos/280/180"
            alt="Preview"
            style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 12px;"
          />
          <h4 style="margin: 0 0 var(--sp-2, 8px) 0;">Imagen de ejemplo</h4>
          <p style="margin: 0; font-size: var(--fs-base, 14px); color: #666;">
            Este popover muestra cómo integrar imágenes junto con texto
            descriptivo.
          </p>
        </div>
      `,
    ),
  parameters: {
    docs: {
      description: {
        story:
          'Popover con imagen y descripción. Ideal para vistas previas de contenido visual.',
      },
    },
  },
};

export const Interactive: Story = {
  name: 'Interactive',
  args: {
    buttonLabel: 'Click me',
    buttonVariant: 'primary',
  },
  render: args =>
    renderPopoverStory(
      args,
      html`
        <h3>Interactive Demo</h3>
        <p>Interacciones disponibles:</p>
        <ul style="margin: var(--sp-2, 8px) 0; padding-left: var(--sp-5, 20px);">
          <li>Clic fuera para cerrar</li>
          <li>Tecla Escape para cerrar</li>
        </ul>
      `,
    ),
  parameters: {
    docs: {
      description: {
        story:
          'Demo interactiva para probar las dos formas de cerrar el popover: ' +
          'clic fuera y tecla Escape.',
      },
    },
  },
};
