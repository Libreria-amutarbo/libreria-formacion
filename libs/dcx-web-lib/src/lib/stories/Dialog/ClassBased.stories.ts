import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { fn } from '@storybook/test';

import '../../../index';
import '../../../lib/dcx-web-components/dcx-web-icon/dcx-web-icon.component';
import type { DialogPosition } from '../../../lib/core/interfaces/dialog';
import { DIALOG_POSITION_LIST } from '../../../lib/core/interfaces/dialog';

const ActionsData = {
  closeDialog: fn(),
};

type DialogStoryArgs = {
  dialogId?: string;
  title: string;
  visible: boolean;
  showClose: boolean;
  showConfirmationFooter: boolean;
  position: DialogPosition;
  closeOnBackdrop: boolean;
  bodyHtml: string;
  footerHtml: string;

  openButtonLabel?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  footerMode?: 'simple' | 'confirmation' | 'danger';
};

const DIALOG_DEFAULT_ARGS: DialogStoryArgs = {
  dialogId: 'basic-dialog',
  title: 'Información',
  visible: false,
  showClose: true,
  showConfirmationFooter: false,
  position: 'center',
  closeOnBackdrop: true,
  bodyHtml: '<p>Este es un mensaje informativo dentro del diálogo.</p>',
  footerHtml: '',
  openButtonLabel: 'Abrir dialog',
  primaryLabel: 'Aceptar',
  secondaryLabel: 'Cancelar',
  footerMode: 'simple',
};

const icons = [
  'arrow-up-left',
  'arrow-up',
  'arrow-up-right',
  'arrow-left',
  'circle-fill',
  'arrow-right',
  'arrow-down-left',
  'arrow-down',
  'arrow-down-right',
];

const renderDialogStory = (
  args: DialogStoryArgs,
  { updateArgs }: { updateArgs: (args: Partial<DialogStoryArgs>) => void },
) => {
  const wrapper = document.createElement('div');

  wrapper.style.minHeight = '50vh';
  wrapper.style.display = 'grid';
  wrapper.style.placeItems = 'center';
  wrapper.style.gap = '24px';

  const openButton = document.createElement('dcx-web-button');
  openButton.setAttribute('variant', 'primary');
  openButton.label = args.openButtonLabel ?? 'Abrir dialog';

  const dialog = document.createElement('dcx-web-dialog') as any;

  dialog.dialogId = args.dialogId ?? '';
  dialog.title = args.title;
  dialog.visible = args.visible;
  dialog.showClose = args.showClose;
  dialog.position = args.position;
  dialog.closeOnBackdrop = args.closeOnBackdrop;

  const body = document.createElement('div');
  body.slot = 'body';
  body.innerHTML = args.bodyHtml;

  const footer = document.createElement('div');
  footer.slot = 'footer';

  const close = () => {
    ActionsData.closeDialog();
    dialog.visible = false;
    updateArgs({ visible: false });
  };

  const open = () => {
    dialog.visible = true;
    updateArgs({ visible: true });
  };

  openButton.addEventListener('click', open);

  dialog.addEventListener('closeDialog', close);

  if (args.footerMode === 'danger') {
    const footerActions = document.createElement('div');

    footerActions.setAttribute(
      'style',
      'display:flex; gap:1rem; justify-content:flex-end;',
    );

    const cancelButton = document.createElement('dcx-web-button');
    cancelButton.label = args.secondaryLabel ?? 'Cancelar';
    cancelButton.setAttribute('variant', 'secondary');

    const dangerButton = document.createElement('dcx-web-button');
    dangerButton.label = args.primaryLabel ?? 'Eliminar';
    dangerButton.setAttribute('variant', 'danger');

    cancelButton.addEventListener('click', close);
    dangerButton.addEventListener('click', close);

    footerActions.append(cancelButton, dangerButton);
    footer.appendChild(footerActions);
  } else if (args.showConfirmationFooter || args.footerMode === 'confirmation') {
    const footerActions = document.createElement('div');
    footerActions.setAttribute(
      'style',
      'display:flex; gap:1rem; justify-content:flex-end;',
    );

    const cancelButton = document.createElement('dcx-web-button');
    cancelButton.label = args.secondaryLabel ?? 'Cancelar';
    cancelButton.setAttribute('variant', 'secondary');
    cancelButton.addEventListener('click', close);

    const acceptButton = document.createElement('dcx-web-button');
    acceptButton.label = args.primaryLabel ?? 'Aceptar';
    acceptButton.setAttribute('variant', 'primary');
    acceptButton.addEventListener('click', close);

    footerActions.append(cancelButton, acceptButton);
    footer.appendChild(footerActions);
  } else {
    const acceptButton = document.createElement('dcx-web-button');
    acceptButton.label = args.primaryLabel ?? 'Aceptar';
    acceptButton.setAttribute('variant', 'primary');
    acceptButton.addEventListener('click', close);

    footer.appendChild(acceptButton);
  }

  dialog.append(body, footer);

  wrapper.append(openButton, dialog);

  return wrapper;
};

const meta: Meta<DialogStoryArgs> = {
  title: 'DCXLibrary/WebComponents/Dialog',
  component: 'dcx-web-dialog',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-web-dialog` es un componente modal accesible implementado como Web Component. ' +
          'Soporta posicionamiento configurable, backdrop opcional, header con título y botón de cierre, ' +
          'y proyección de contenido personalizado mediante slots (`slot="body"`, `slot="footer"`).\n\n' +
          '**Integración Web Component:**\n' +
          '- Abre el diálogo estableciendo `.visible = true`\n' +
          '- Cierra el diálogo escuchando el evento `closeDialog`\n\n' +
          '⚠️ El contenido HTML proyectado en las stories con `unsafeHTML` es estático. ' +
          'Para contenido interactivo real, usa nodos HTML o componentes dentro de los slots.',
      },
    },
  },
  argTypes: {
    dialogId: {
      control: 'text',
      description:
        'Identificador único del diálogo. Se usa para generar el id accesible del título. En Web Component no se gestiona mediante servicio.',
      table: {
        category: 'Atributos',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    title: {
      control: 'text',
      description:
        'Texto del título mostrado en el header del diálogo. Si está vacío, el elemento de título no se renderiza.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    visible: {
      control: 'boolean',
      description:
        'Controla la visibilidad del diálogo. Si es `true`, el diálogo se renderiza; si es `false`, no se muestra.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClose: {
      control: 'boolean',
      description:
        'Muestra u oculta el botón de cierre (✕) en el header. Cuando es `false`, el usuario solo puede cerrar el diálogo mediante acciones externas o footer.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showConfirmationFooter: {
      control: 'boolean',
      description:
        'Parámetro de la story que alterna entre footer simple con "Aceptar" y footer de confirmación con "Cancelar" + "Aceptar".',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'select',
      options: DIALOG_POSITION_LIST,
      description:
        'Posición del diálogo en pantalla. Aplica la clase CSS `dcx-dialog--pos-{value}`.',
      table: {
        category: 'Atributos',
        type: { summary: 'DialogPosition' },
        defaultValue: { summary: 'center' },
      },
    },
    bodyHtml: {
      control: 'text',
      description:
        'HTML estático inyectado en el slot `body` para la story. Para uso real, proyecta contenido mediante `<div slot="body">...</div>`.',
      table: {
        category: 'Slots',
        type: { summary: 'slot="body"' },
        defaultValue: { summary: "''" },
      },
    },
    footerHtml: {
      control: 'text',
      description:
        'Campo documental para representar contenido del footer. El footer funcional de las stories usa botones reales dentro de `slot="footer"`.',
      table: {
        category: 'Slots',
        type: { summary: 'slot="footer"' },
        defaultValue: { summary: "''" },
      },
    },
    closeOnBackdrop: {
      control: 'boolean',
      description:
        'Si es `true`, hacer clic en el backdrop semitransparente emite `closeDialog`. Recomendado `false` en confirmaciones.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeDialog: {
      action: 'closeDialog',
      description:
        'Evento emitido cuando el diálogo solicita cerrarse: botón ✕, tecla Escape o backdrop si `closeOnBackdrop` está activo.',
      table: {
        category: 'Eventos',
        type: { summary: 'CustomEvent<void>' },
      },
    },

    openButtonLabel: {
      control: false,
      table: { disable: true },
    },
    primaryLabel: {
      control: false,
      table: { disable: true },
    },
    secondaryLabel: {
      control: false,
      table: { disable: true },
    },
    footerMode: {
      control: false,
      table: { disable: true },
    },
  },
  args: DIALOG_DEFAULT_ARGS,
  render: renderDialogStory,
};

export default meta;

type Story = StoryObj<DialogStoryArgs>;

export const BasicDialog: Story = {
  name: 'Básico — Informativo',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo básico de información. Tiene título, botón de cierre y un único botón "Aceptar" en el footer. El backdrop cierra el diálogo al hacer clic.',
      },
    },
  },
  args: {
    dialogId: 'basic-dialog',
    title: 'Información',
    bodyHtml: '<p>Este es un mensaje informativo dentro del diálogo.</p>',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Abrir dialog',
    primaryLabel: 'Aceptar',
    footerMode: 'simple',
  },
};

export const ConfirmationDialog: Story = {
  name: 'Confirmación — Con footer de acción',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo de confirmación con footer de dos acciones: "Cancelar" y "Aceptar". `closeOnBackdrop` está desactivado para forzar una decisión explícita del usuario.',
      },
    },
  },
  args: {
    dialogId: 'confirmation-dialog',
    title: '¿Confirmar acción?',
    bodyHtml:
      '<p>¿Estás seguro de que quieres continuar? Esta acción no se puede deshacer.</p>',
    showClose: true,
    showConfirmationFooter: true,
    position: 'center',
    closeOnBackdrop: false,
    visible: false,
    openButtonLabel: 'Abrir confirmación',
    primaryLabel: 'Aceptar',
    secondaryLabel: 'Cancelar',
    footerMode: 'confirmation',
  },
};

export const NoCloseButton: Story = {
  name: 'Sin botón de cierre',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo sin el botón ✕ en el header (`showClose: false`). Útil para flujos donde se requiere que el usuario tome una decisión explícita.',
      },
    },
  },
  args: {
    dialogId: 'no-close-dialog',
    title: 'Acción requerida',
    bodyHtml: '<p>Debes aceptar los términos para continuar.</p>',
    showClose: false,
    showConfirmationFooter: true,
    position: 'center',
    closeOnBackdrop: false,
    visible: false,
    openButtonLabel: 'Abrir diálogo',
    primaryLabel: 'Aceptar',
    secondaryLabel: 'Cancelar',
    footerMode: 'confirmation',
  },
};

export const NoTitle: Story = {
  name: 'Sin título',
  parameters: {
    docs: {
      description: {
        story:
          'Cuando `title` está vacío, el header no renderiza el elemento de título, dejando solo el botón de cierre.',
      },
    },
  },
  args: {
    dialogId: 'no-title-dialog',
    title: '',
    bodyHtml: '<p>Este diálogo no tiene título en el header.</p>',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Abrir diálogo',
    primaryLabel: 'Cerrar',
    footerMode: 'simple',
  },
};

export const Destructive: Story = {
  name: 'Confirmación destructiva',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo de confirmación para acciones irreversibles. Incluye un icono de aviso con fondo rojo y un botón "Eliminar".',
      },
    },
  },
  args: {
    dialogId: 'destructive-story',
    title: 'Eliminar proyecto',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: false,
    visible: false,
    openButtonLabel: 'Eliminar proyecto',
    primaryLabel: 'Eliminar',
    secondaryLabel: 'Cancelar',
    footerMode: 'danger',
    bodyHtml: `
      <div style="width:44px;height:44px;border-radius:50%;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <dcx-web-icon
          name="trash"
          size="m"
          color="#dc2626"
          aria-label="Eliminar"
        ></dcx-web-icon>
      </div>

      <p style="font-size:14px;color:#696e75;line-height:1.6">
        ¿Estás seguro de que deseas eliminar el proyecto
        <strong style="color:#2a2e33">Cloud Migration</strong>?
        Esta acción es irreversible y no se puede deshacer.
      </p>
    `,
    footerHtml: '',
  },
};

export const WithForm: Story = {
  name: 'Con formulario',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo que contiene un formulario con campos de texto y un select. Útil para crear o editar entidades sin navegar a una página nueva.',
      },
    },
  },
  args: {
    dialogId: 'form-story',
    title: 'Nuevo proyecto',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Nuevo proyecto',
    primaryLabel: 'Crear proyecto',
    secondaryLabel: 'Cancelar',
    footerMode: 'confirmation',
    bodyHtml: `
      <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:16px">
        <label for="sb-project-name" style="font-size:12px;font-weight:500;color:#2a2e33">Nombre del proyecto</label>
        <input id="sb-project-name" type="text" placeholder="Ej: Cloud Migration v2"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
      </div>

      <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:16px">
        <label for="sb-client" style="font-size:12px;font-weight:500;color:#2a2e33">Cliente</label>
        <input id="sb-client" type="text" placeholder="Ej: Airbus"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
      </div>

      <div style="display:flex;flex-direction:column;gap:4px">
        <label for="sb-practice" style="font-size:12px;font-weight:500;color:#2a2e33">Práctica</label>
        <select id="sb-practice"
          style="font-size:14px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:4px;width:100%;outline:none">
          <option value="">Selecciona una práctica</option>
          <option>Cloud Infrastructure</option>
          <option>SAP</option>
          <option>Data & AI</option>
        </select>
      </div>
    `,
    footerHtml: '',
  },
};

export const Informative: Story = {
  name: 'Informativo',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo informativo con icono circular azul en el cuerpo y un único botón "Entendido" en el footer.',
      },
    },
  },
  args: {
    dialogId: 'informative-story',
    title: 'Información importante',
    showClose: true,
    showConfirmationFooter: false,
    position: 'center',
    closeOnBackdrop: true,
    visible: false,
    openButtonLabel: 'Ver información',
    primaryLabel: 'Entendido',
    footerMode: 'simple',
    bodyHtml: `
      <div style="width:44px;height:44px;border-radius:50%;background:#dbeafe;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <dcx-web-icon
          name="info-circle"
          size="m"
          color="#1d4ed8"
          aria-label="Información"
        ></dcx-web-icon>
      </div>

      <p style="font-size:14px;color:#696e75;line-height:1.6">
        El proceso de migración comenzará el
        <strong style="color:#2a2e33">lunes 22 de abril</strong>.
        Durante este periodo algunos servicios podrían no estar disponibles temporalmente.
      </p>
    `,
    footerHtml: '',
  },
};

export const Positions: Story = {
  name: 'Posiciones — Todas las variantes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Los 9 valores posibles de `position` mostrados simultáneamente en el mismo canvas. Los botones están dispuestos en una cuadrícula 3×3 que refleja la posición de cada diálogo en pantalla.',
      },
    },
  },
  render: () => {
    const positions: DialogPosition[] = [
      'top-left',
      'top',
      'top-right',
      'left',
      'center',
      'right',
      'bottom-left',
      'bottom',
      'bottom-right',
    ];

    return html`
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:48px;min-height:100vh;box-sizing:border-box;">
        ${positions.map(
      (position, index) => html`
            
        <dcx-web-dialog-position-story-host
          .dialogId=${`pos-${position}`}
          .position=${position}
          .iconName=${icons[index]}
        >
        </dcx-web-dialog-position-story-host>

          `,
    )}
      </div>
    `;
  },
};

@customElement('dcx-web-dialog-position-story-host')
  export class DcxWebDialogPositionStoryHost extends LitElement {
    @property({ type: String })
  dialogId = '';

  @property({ type: String })
  position: DialogPosition = 'center';

  @property({ type: String })
  iconName = '';

  @state()
  private _visible = false;

  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  override render() {
    return html`
      
      <dcx-web-button
        variant="primary"
        size="l"
        icon-name=${this.iconName}
        label="Abrir diálogo"
        aria-label=${this.position}
        @buttonClick=${() => {
          this._visible = true;
        }}
      >
      </dcx-web-button>


      <dcx-web-dialog
        .dialogId=${this.dialogId}
        .position=${this.position}
        .visible=${this._visible}
        title="Posición: ${this.position}"
        .closeOnBackdrop=${true}
        @closeDialog=${() => {
        this._visible = false;
      }}
      >
        <div slot="body">
          <p>Este diálogo está posicionado en <strong>${this.position}</strong>.</p>
        </div>
        <div slot="footer">
          <dcx-web-button
            label="Cerrar"
            variant="primary"
            @click=${() => {
        this._visible = false;
      }}
          ></dcx-web-button>
        </div>
      </dcx-web-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-dialog-position-story-host': DcxWebDialogPositionStoryHost;
  }
}