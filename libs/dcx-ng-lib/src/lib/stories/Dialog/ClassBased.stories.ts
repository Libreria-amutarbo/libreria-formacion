import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Component, inject, OnInit, input, output } from '@angular/core';
import {
  DcxNgDialogComponent,
  DcxNgButtonComponent,
  DcxDialogPosition,
  DialogService,
  DIALOG_POSITION_LIST,
  DIALOG_DEFAULT_ARGS,
} from '@dcx-ng-components/dcx-ng-lib';

import { fn } from '@storybook/test';

const ActionsData = { closeDialog: fn() };

@Component({
  selector: 'dcx-ng-dialog-story',
  standalone: true,
  imports: [DcxNgDialogComponent, DcxNgButtonComponent],
  template: `
    <dcx-ng-button label="Abrir dialog" variant="primary" (buttonClick)="open()" />

    <div style="min-height:50vh; display:grid; place-items:center;">
      <dcx-ng-dialog
        [dialogId]="dialogId()"
        [title]="title()"
        [showClose]="showClose()"
        [position]="position()"
        [closeOnBackdrop]="closeOnBackdrop()"
        (closeDialog)="onClose()"
      >
        <ng-template #dialogBody>
          <div [innerHTML]="bodyHtml()"></div>
        </ng-template>

        <ng-template #dialogFooter>
          @if (showConfirmationFooter()) {
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <dcx-ng-button
                label="Cancelar"
                variant="secondary"
                (buttonClick)="cancelDialogFromFooter()"
              />
              <dcx-ng-button
                label="Aceptar"
                variant="primary"
                (buttonClick)="closeDialogFromFooter()"
              />
            </div>
          } @else {
            <dcx-ng-button
              label="Aceptar"
              variant="primary"
              (buttonClick)="closeDialogFromFooter()"
            />
          }
        </ng-template>
      </dcx-ng-dialog>
    </div>

  `,
})
class StoryHostDcxDialogComponent implements OnInit {
  dialogId = input<string | undefined>(undefined);
  title = input<string>('');
  visible = input<boolean>(false);
  showClose = input<boolean>(true);
  showConfirmationFooter = input<boolean>(false);
  position = input<DcxDialogPosition>('center');
  closeOnBackdrop = input<boolean>(true);
  bodyHtml = input<string>('');
  footerHtml = input<string>('');

  closeDialog = output<void>();

  private readonly dialog = inject(DialogService);

  ngOnInit() {
    if (this.visible() && this.dialogId()) {
      this.dialog.open(this.dialogId()!);
    }
  }

  open(data?: unknown) {
    const id = this.dialogId();
    if (id) this.dialog.open(id, data);
  }

  closeDialogFromFooter() {
    const id = this.dialogId();
    if (id) this.dialog.close(id);
  }

  cancelDialogFromFooter() {
    const id = this.dialogId();
    if (id) this.dialog.close(id);
  }

  onClose() {
    ActionsData.closeDialog();
    this.closeDialog.emit();
  }
}

@Component({
  selector: 'dcx-ng-dialog-positions-story',
  standalone: true,
  imports: [DcxNgDialogComponent, DcxNgButtonComponent],
  template: `
    <dcx-ng-button [label]="position()" variant="secondary" (buttonClick)="open()" />
    <dcx-ng-dialog
      [dialogId]="dialogId()"
      [title]="'Posici\u00f3n: ' + position()"
      [showClose]="true"
      [position]="position()"
      [closeOnBackdrop]="true"
    >
      <ng-template #dialogBody>
        <p>Este di\u00e1logo est\u00e1 posicionado en <strong>{{ position() }}</strong>.</p>
      </ng-template>
      <ng-template #dialogFooter>
        <dcx-ng-button label="Cerrar" variant="primary" (buttonClick)="close()" />
      </ng-template>
    </dcx-ng-dialog>
  `,
})
class PositionsStoryHostComponent {
  dialogId = input<string>('');
  position = input<DcxDialogPosition>('center');

  private readonly dialog = inject(DialogService);

  open() {
    this.dialog.open(this.dialogId());
  }

  close() {
    this.dialog.close(this.dialogId());
  }
}

const meta: Meta<StoryHostDcxDialogComponent> = {
  title: 'DCXLibrary/Components/Dialog',
  component: StoryHostDcxDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryHostDcxDialogComponent],
      providers: [DialogService],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '`dcx-ng-dialog` es un componente modal accesible gestionado mediante `DialogService`. ' +
          'Soporta posicionamiento configurable, backdrop opcional, header con título y botón de cierre, ' +
          'y proyección de contenido personalizado vía `ng-template` (`#dialogBody`, `#dialogFooter`).\n\n' +
          '**Integración con DialogService:**\n' +
          '- Abre con `DialogService.open(dialogId)`\n' +
          '- Cierra con `DialogService.close(dialogId)`\n\n' +
          '⚠️ El HTML inyectado con `[innerHTML]` no compila directivas ni eventos Angular. ' +
          'Para interacciones reales dentro del cuerpo, usa componentes Angular en el `ng-template`.',
      },
    },
  },
  argTypes: {
    dialogId: {
      control: 'text',
      description:
        'Identificador único del diálogo. Se usa para abrirlo y cerrarlo desde `DialogService.open(id)` / `DialogService.close(id)`. ' +
        'Si no se proporciona, la visibilidad se controla directamente con el input `visible`.',
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
        'Abre el diálogo directamente en la inicialización de la story (sin pasar por `DialogService`). ' +
        'En producción, usa siempre `DialogService` para controlar la visibilidad.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClose: {
      control: 'boolean',
      description:
        'Muestra u oculta el botón de cierre (✕) en el header. ' +
        'Cuando es `false`, el usuario solo puede cerrar el diálogo a través del backdrop o acciones del footer.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showConfirmationFooter: {
      control: 'boolean',
      description:
        'Parámetro de la story que alterna entre un footer con un solo botón "Aceptar" y un footer de confirmación con "Cancelar" + "Aceptar".',
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
        'Posición del diálogo en pantalla. Aplica la clase CSS `dialog--pos-{value}`. ' +
        'Valores disponibles: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxDialogPosition' },
        defaultValue: { summary: 'center' },
      },
    },
    bodyHtml: {
      control: 'text',
      description:
        'HTML estático inyectado en el cuerpo del diálogo mediante `[innerHTML]`. ' +
        '⚠️ No soporta directivas ni eventos Angular. Para contenido interactivo, usa el `ng-template #dialogBody` directamente.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    footerHtml: {
      control: 'text',
      description:
        'Campo de referencia visual del footer (no funcional con `[innerHTML]`). ' +
        'El footer real de la demo está implementado con botones Angular funcionales en el `ng-template #dialogFooter`.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    closeOnBackdrop: {
      control: 'boolean',
      description:
        'Si es `true`, hacer clic en el backdrop semitransparente cierra el diálogo. ' +
        'Recomendado `false` en diálogos de confirmación para forzar una acción explícita del usuario.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeDialog: {
      action: 'closeDialog',
      description:
        'Output emitido cuando el diálogo se cierra. Se dispara al pulsar el botón ✕, el backdrop, o los botones del footer.',
      table: { category: 'Eventos' },
    },
  },
  args: DIALOG_DEFAULT_ARGS,
};

export default meta;
type Story = StoryObj<StoryHostDcxDialogComponent>;

const renderDialogStory = (args: Story['args']) => ({
  moduleMetadata: {
    imports: [StoryHostDcxDialogComponent],
    providers: [DialogService],
  },
  props: {
    dialogId: args?.dialogId,
    title: args?.title,
    showClose: args?.showClose,
    showConfirmationFooter: args?.showConfirmationFooter,
    position: args?.position,
    bodyHtml: args?.bodyHtml,
    footerHtml: args?.footerHtml,
    closeOnBackdrop: args?.closeOnBackdrop,
    visible: args?.visible,
  },
  template: `
    <dcx-ng-dialog-story
      [dialogId]="dialogId"
      [title]="title"
      [showClose]="showClose"
      [showConfirmationFooter]="showConfirmationFooter"
      [position]="position"
      [bodyHtml]="bodyHtml"
      [footerHtml]="footerHtml"
      [closeOnBackdrop]="closeOnBackdrop"
      [visible]="visible"
    />
  `,
});

export const BasicDialog: Story = {
  name: 'Básico — Informativo',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo básico de información. Tiene título, botón de cierre y un único botón "Aceptar" en el footer. ' +
          'El backdrop cierra el diálogo al hacer clic.',
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
  },
  render: args => renderDialogStory(args),
};

export const ConfirmationDialog: Story = {
  name: 'Confirmación — Con footer de acción',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo de confirmación con footer de dos acciones: "Cancelar" (variante secundaria) y "Aceptar" (variante primaria). ' +
          '`closeOnBackdrop` está desactivado para forzar una decisión explícita del usuario.',
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
  },
  render: args => renderDialogStory(args),
};

export const NoCloseButton: Story = {
  name: 'Sin botón de cierre',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo sin el botón ✕ en el header (`showClose: false`). ' +
          'El único modo de cerrarlo es mediante los botones del footer o el backdrop. ' +
          'Útil para flujos donde se requiere que el usuario tome una decisión explícita.',
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
  },
  render: args => renderDialogStory(args),
};

export const NoTitle: Story = {
  name: 'Sin título',
  parameters: {
    docs: {
      description: {
        story:
          'Cuando `title` está vacío, el header no renderiza el elemento de título, ' +
          'dejando solo el botón de cierre. Útil para diálogos con contenido visual como imágenes o formularios.',
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
  },
  render: args => renderDialogStory(args),
};

export const Destructive: Story = {
  name: 'Confirmación destructiva',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo de confirmación para acciones irreversibles. ' +
          'Incluye un icono de aviso con fondo rojo y un botón "Eliminar" con variante `danger`. ' +
          '`closeOnBackdrop` está desactivado para forzar una decisión explícita.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [DcxNgDialogComponent, DcxNgButtonComponent],
      providers: [DialogService],
    },
    props: (() => {
      const dialog = new DialogService();
      return {
        dialog,
        open: () => dialog.open('destructive-story'),
        close: () => dialog.close('destructive-story'),
      };
    })(),
    template: `
      <dcx-ng-button label="Eliminar proyecto" variant="primary" (buttonClick)="open()"></dcx-ng-button>
      <dcx-ng-dialog
        dialogId="destructive-story"
        title="Eliminar proyecto"
        [showClose]="true"
        position="center"
        [closeOnBackdrop]="false"
      >
        <ng-template #dialogBody>
          <div style="width:44px;height:44px;border-radius:50%;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4h4M3 6h14M5 6l1 10h8l1-10" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p style="font-size:14px;color:#696e75;line-height:1.6">
            ¿Estás seguro de que deseas eliminar el proyecto <strong style="color:#2a2e33">Cloud Migration</strong>?
            Esta acción es irreversible y no se puede deshacer.
          </p>
        </ng-template>
        <ng-template #dialogFooter>
          <dcx-ng-button label="Cancelar" variant="secondary" (buttonClick)="close()"></dcx-ng-button>
          <dcx-ng-button label="Eliminar" variant="danger" (buttonClick)="close()"></dcx-ng-button>
        </ng-template>
      </dcx-ng-dialog>
    `,
  }),
};

export const WithForm: Story = {
  name: 'Con formulario',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo que contiene un formulario con campos de texto y un select. ' +
          'Útil para crear o editar entidades sin navegar a una página nueva.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [DcxNgDialogComponent, DcxNgButtonComponent],
      providers: [DialogService],
    },
    props: (() => {
      const dialog = new DialogService();
      return {
        dialog,
        open: () => dialog.open('form-story'),
        close: () => dialog.close('form-story'),
      };
    })(),
    template: `
      <dcx-ng-button label="Nuevo proyecto" variant="primary" (buttonClick)="open()"></dcx-ng-button>
      <dcx-ng-dialog
        dialogId="form-story"
        title="Nuevo proyecto"
        [showClose]="true"
        position="center"
        [closeOnBackdrop]="true"
      >
        <ng-template #dialogBody>
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
              <option>Data &amp; AI</option>
            </select>
          </div>
        </ng-template>
        <ng-template #dialogFooter>
          <dcx-ng-button label="Cancelar" variant="secondary" (buttonClick)="close()"></dcx-ng-button>
          <dcx-ng-button label="Crear proyecto" variant="primary" (buttonClick)="close()"></dcx-ng-button>
        </ng-template>
      </dcx-ng-dialog>
    `,
  }),
};

export const Informative: Story = {
  name: 'Informativo',
  parameters: {
    docs: {
      description: {
        story:
          'Diálogo informativo con icono circular azul en el cuerpo y un único botón "Entendido" en el footer. ' +
          'Ideal para comunicar avisos o novedades al usuario.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [DcxNgDialogComponent, DcxNgButtonComponent],
      providers: [DialogService],
    },
    props: (() => {
      const dialog = new DialogService();
      return {
        dialog,
        open: () => dialog.open('informative-story'),
        close: () => dialog.close('informative-story'),
      };
    })(),
    template: `
      <dcx-ng-button label="Ver información" variant="primary" (buttonClick)="open()"></dcx-ng-button>
      <dcx-ng-dialog
        dialogId="informative-story"
        title="Información importante"
        [showClose]="true"
        position="center"
        [closeOnBackdrop]="true"
      >
        <ng-template #dialogBody>
          <div style="width:44px;height:44px;border-radius:50%;background:#dbeafe;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#1d4ed8" stroke-width="1.5"/>
              <path d="M10 9v5M10 7v.5" stroke="#1d4ed8" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <p style="font-size:14px;color:#696e75;line-height:1.6">
            El proceso de migración comenzará el <strong style="color:#2a2e33">lunes 22 de abril</strong>.
            Durante este periodo algunos servicios podrían no estar disponibles temporalmente.
          </p>
        </ng-template>
        <ng-template #dialogFooter>
          <dcx-ng-button label="Entendido" variant="primary" (buttonClick)="close()"></dcx-ng-button>
        </ng-template>
      </dcx-ng-dialog>
    `,
  }),
};

export const Positions: Story = {
  name: 'Posiciones — Todas las variantes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Los 9 valores posibles de `position` mostrados simultáneamente en el mismo canvas. ' +
          'Los botones están dispuestos en una cuadrícula 3×3 que refleja la posición de cada diálogo en pantalla. ' +
          'Haz clic en cualquier botón para ver el diálogo aparecer en la esquina o borde correspondiente.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [PositionsStoryHostComponent],
      providers: [DialogService],
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:48px;min-height:100vh;box-sizing:border-box;">
        <dcx-ng-dialog-positions-story dialogId="pos-top-left" position="top-left"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-top" position="top"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-top-right" position="top-right"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-left" position="left"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-center" position="center"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-right" position="right"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-bottom-left" position="bottom-left"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-bottom" position="bottom"></dcx-ng-dialog-positions-story>
        <dcx-ng-dialog-positions-story dialogId="pos-bottom-right" position="bottom-right"></dcx-ng-dialog-positions-story>
      </div>
    `,
  }),
};
