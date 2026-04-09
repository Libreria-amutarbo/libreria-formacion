import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { fn } from '@storybook/test';
import {
    DCX_TOAST_DEFAULT_ARGS,
    DCX_TOAST_ERROR_DEMO,
    DCX_TOAST_INFO_DEMO,
    DCX_TOAST_SUCCESS_WITH_ACTION,
    DCX_TOAST_WARNING_DEMO,
    DcxNgButtonComponent,
    DcxNgToastComponent,
    DcxToastOptions,
    DcxToastType,
} from '@dcx-ng-components/dcx-ng-lib';

const actionsData = {
    actionClick: fn(),
    dismissed: fn(),
};

const meta: Meta<DcxNgToastComponent> = {
    title: 'DCXLibrary/Components/Toast',
    component: DcxNgToastComponent,
    decorators: [
        moduleMetadata({
            imports: [DcxNgButtonComponent, DcxNgToastComponent],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        message: {
            control: { type: 'text' },
            description: 'Texto principal del toast.',
            table: {
                category: 'Attributes',
                type: { summary: 'string' },
            },
        },
        type: {
            control: { type: 'select' },
            options: ['info', 'success', 'warning', 'error'] as DcxToastType[],
            description: 'Variante visual del toast.',
            table: {
                category: 'Attributes',
                type: { summary: 'DcxToastType' },
                defaultValue: { summary: 'info' },
            },
        },
        autoDismiss: {
            control: { type: 'boolean' },
            description: 'Dispara dismissed automaticamente tras durationMs.',
            table: {
                category: 'Attributes',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        durationMs: {
            control: { type: 'number' },
            description: 'Duracion del auto dismiss en ms.',
            table: {
                category: 'Attributes',
                type: { summary: 'number' },
                defaultValue: { summary: '5000' },
            },
        },
        actionClick: {
            action: 'actionClick',
            table: {
                category: 'Events',
            },
        },
        dismissed: {
            action: 'dismissed',
            table: {
                category: 'Events',
            },
        },
    },
    args: {
        ...DCX_TOAST_DEFAULT_ARGS,
        actionClick: actionsData.actionClick,
        dismissed: actionsData.dismissed,
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<DcxNgToastComponent>;

export const Default: Story = {
    args: {
        ...DCX_TOAST_DEFAULT_ARGS,
    },
};

export const Interactive: Story = {
    render: () => {
        let nextId = 0;
        type DcxToastDemoItem = DcxToastOptions & { id: number };

        const defaultToast: DcxToastOptions = DCX_TOAST_INFO_DEMO;

        const successToast: DcxToastOptions = {
            ...DCX_TOAST_SUCCESS_WITH_ACTION,
            message: 'Archivo exportado con exito',
        };

        const warningToast: DcxToastOptions = DCX_TOAST_WARNING_DEMO;

        const errorToast: DcxToastOptions = DCX_TOAST_ERROR_DEMO;

        const removeToast = (id: number, ctx: any): void => {
            ctx.activeToasts = ctx.activeToasts.filter((toast: DcxToastDemoItem) => toast.id !== id);
        };

        return {
            props: {
                activeToasts: [] as DcxToastDemoItem[],
                lastEvent: 'Sin interacciones todavía.',
                showInfoToast(this: any) {
                    this.activeToasts = [...this.activeToasts, { ...defaultToast, id: nextId++ }];
                },
                showSuccessToast(this: any) {
                    this.activeToasts = [...this.activeToasts, { ...successToast, id: nextId++ }];
                },
                showWarningToast(this: any) {
                    this.activeToasts = [...this.activeToasts, { ...warningToast, id: nextId++ }];
                },
                showErrorToast(this: any) {
                    this.activeToasts = [...this.activeToasts, { ...errorToast, id: nextId++ }];
                },
                clearToasts(this: any) {
                    this.activeToasts = [];
                    this.lastEvent = 'Se limpiaron todos los toasts.';
                },
                handleAction(this: any, id: number, label: string) {
                    this.lastEvent = `Accion ejecutada en ${label}.`;
                    removeToast(id, this);
                    actionsData.actionClick();
                },
                handleDismissed(this: any, id: number, label: string) {
                    this.lastEvent = `Toast cerrado por tiempo: ${label}.`;
                    removeToast(id, this);
                    actionsData.dismissed();
                },
            },
            template: `
        <section class="toast-page" style="padding: 16px; border-radius: 8px; background: var(--bg-primary, #0058ab); min-width: 640px;">
          <h3 style="margin: 0; color: var(--text-white, #ffffff);">Toast</h3>
          <p style="margin: 4px 0 16px; color: var(--text-white, #ffffff); opacity: .92;">Avisos breves para confirmar acciones, advertir o informar errores sin bloquear al usuario.</p>

          <div style="display:flex; flex-wrap:wrap; gap: 8px; margin-bottom: 12px;" aria-label="Controles de demo de toast">
            <dcx-ng-button label="Mostrar info" variant="secondary" (buttonClick)="showInfoToast()"></dcx-ng-button>
            <dcx-ng-button label="Mostrar exito" variant="secondary" (buttonClick)="showSuccessToast()"></dcx-ng-button>
            <dcx-ng-button label="Mostrar warning" variant="secondary" (buttonClick)="showWarningToast()"></dcx-ng-button>
            <dcx-ng-button label="Mostrar error" variant="danger" (buttonClick)="showErrorToast()"></dcx-ng-button>
            <dcx-ng-button label="Limpiar" variant="secondary" (buttonClick)="clearToasts()"></dcx-ng-button>
          </div>

          <p style="margin: 0 0 12px; font-size: 12px; color: var(--text-white, #ffffff); opacity: .95;">Toasts activos: {{ activeToasts.length }}. Ultimo evento: {{ lastEvent }}</p>

          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            @for (toast of activeToasts; track toast.id) {
              <dcx-ng-toast
                [message]="toast.message"
                [type]="toast.type || 'info'"
                [autoDismiss]="toast.autoDismiss || false"
                [durationMs]="toast.durationMs || 5000"
                [iconName]="toast.iconName || ''"
                (actionClick)="handleAction(toast.id, toast.type || 'info')"
                (dismissed)="handleDismissed(toast.id, toast.type || 'info')"
              ></dcx-ng-toast>
            }

            @if (activeToasts.length === 0) {
              <p style="margin:0; padding:8px 12px; border-radius:4px; background: rgba(255, 255, 255, 0.08); color: var(--text-white, #ffffff); font-size: 12px;">No hay toasts activos. Pulsa un boton para lanzar uno.</p>
            }
          </div>
        </section>
      `,
        };
    },
};
