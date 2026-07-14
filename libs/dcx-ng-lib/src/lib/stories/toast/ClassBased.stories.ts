import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { fn } from '@storybook/test';
import {
    DCX_TOAST_DEFAULT_ARGS,
    DCX_TOAST_ERROR_DEMO,
    DCX_TOAST_ICON_ONLY_ACTION,
    DCX_TOAST_SUCCESS_WITH_ACTION,
    DCX_TOAST_WITH_ICON_ACTION,
    DCX_TOAST_WARNING_DEMO,
    DCX_TOAST_TYPE_LIST,
    DcxNgButtonComponent,
    DcxNgToastComponent,
    DcxNgToastOutletComponent,
    DcxNgToastService,
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
                category: 'Atributos',
                type: { summary: 'string' },
            },
        },
        type: {
            control: { type: 'select' },
            options: DCX_TOAST_TYPE_LIST,
            description: 'Variante visual del toast.',
            table: {
                category: 'Atributos',
                type: { summary: 'DcxToastType' },
                defaultValue: { summary: 'info' },
            },
        },
        iconName: {
            control: { type: 'text' },
            description: 'Icono a mostrar. Si se omite, se usa el icono por defecto de type.',
            table: {
                category: 'Atributos',
                type: { summary: 'string' },
                defaultValue: { summary: "''" },
            },
        },
        autoDismiss: {
            control: { type: 'boolean' },
            description: 'Dispara dismissed automaticamente tras durationMs.',
            table: {
                category: 'Atributos',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        durationMs: {
            control: { type: 'number' },
            description: 'Duracion del auto dismiss en ms.',
            table: {
                category: 'Atributos',
                type: { summary: 'number' },
                defaultValue: { summary: '5000' },
            },
        },
        dismissible: {
            control: { type: 'boolean' },
            description: 'Muestra un botón de cierre real.',
            table: {
                category: 'Atributos',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        announce: {
            control: { type: 'boolean' },
            description: 'Si es false, suprime aria-live propio (mantiene role) — usado por dcx-ng-toast-outlet.',
            table: {
                category: 'Atributos',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        actionLabel: {
            control: { type: 'text' },
            description: 'Texto del CTA del toast.',
            table: {
                category: 'Atributos',
                type: { summary: 'string' },
                defaultValue: { summary: 'Deshacer' },
            },
        },
        actionIconName: {
            control: { type: 'text' },
            description: 'Icono opcional del CTA del toast.',
            table: {
                category: 'Atributos',
                type: { summary: 'string' },
                defaultValue: { summary: "''" },
            },
        },
        actionAriaLabel: {
            control: { type: 'text' },
            description: 'Texto accesible para CTA solo icono.',
            table: {
                category: 'Atributos',
                type: { summary: 'string' },
                defaultValue: { summary: "''" },
            },
        },
        actionClick: {
            action: 'actionClick',
            description: 'Se emite al pulsar el botón de acción.',
            table: {
                category: 'Eventos',
            },
        },
        dismissed: {
            action: 'dismissed',
            description: 'Se emite al cerrar el toast (por temporizador o manualmente).',
            table: {
                category: 'Eventos',
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

export const CustomActionText: Story = {
    args: {
        ...DCX_TOAST_SUCCESS_WITH_ACTION,
    },
};

export const CustomActionWithIcon: Story = {
    args: {
        ...DCX_TOAST_WITH_ICON_ACTION,
    },
};

export const IconOnlyAction: Story = {
    args: {
        ...DCX_TOAST_ICON_ONLY_ACTION,
    },
};

export const NotDismissible: Story = {
    args: {
        ...DCX_TOAST_DEFAULT_ARGS,
        dismissible: false,
    },
};

// Componente auxiliar para demostrar DcxNgToastService + dcx-ng-toast-outlet,
// sustituyendo la máquina de estado manual (array + contador de id) que antes
// se reimplementaba aquí y en la página de demo por separado.
@Component({
    selector: 'dcx-ng-toast-story-demo',
    standalone: true,
    imports: [DcxNgButtonComponent, DcxNgToastOutletComponent],
    template: `
    <section style="padding: 16px; border-radius: 8px; background: var(--bg-primary, #0058ab); min-width: 640px; position: relative; min-height: 160px;">
      <h3 style="margin: 0; color: var(--text-white, #ffffff);">Toast (con DcxNgToastService)</h3>
      <p style="margin: 4px 0 16px; color: var(--text-white, #ffffff); opacity: .92;">
        Los botones llaman al servicio; dcx-ng-toast-outlet (montado una sola vez) se encarga de renderizar y apilar los toasts activos.
      </p>

      <div style="display:flex; flex-wrap:wrap; gap: 8px;" aria-label="Controles de demo de toast">
        <dcx-ng-button label="Mostrar info" variant="secondary" (buttonClick)="showInfo()"></dcx-ng-button>
        <dcx-ng-button label="Mostrar exito" variant="secondary" (buttonClick)="showSuccess()"></dcx-ng-button>
        <dcx-ng-button label="Mostrar warning" variant="secondary" (buttonClick)="showWarning()"></dcx-ng-button>
        <dcx-ng-button label="Mostrar error" variant="danger" (buttonClick)="showError()"></dcx-ng-button>
        <dcx-ng-button label="Limpiar" variant="secondary" (buttonClick)="clear()"></dcx-ng-button>
      </div>

      <dcx-ng-toast-outlet position="top-right"></dcx-ng-toast-outlet>
    </section>
  `,
})
class DcxNgToastStoryDemoComponent {
    private readonly toastService = inject(DcxNgToastService);

    showInfo(): void {
        this.toastService.info('Informacion actualizada correctamente');
    }

    showSuccess(): void {
        this.toastService.success('Archivo exportado con exito', {
            actionLabel: 'Ver detalle',
        });
    }

    showWarning(): void {
        this.toastService.show(DCX_TOAST_WARNING_DEMO);
    }

    showError(): void {
        this.toastService.show(DCX_TOAST_ERROR_DEMO);
    }

    clear(): void {
        this.toastService.clear();
    }
}

export const WithService: Story = {
    render: () => ({
        template: `<dcx-ng-toast-story-demo></dcx-ng-toast-story-demo>`,
    }),
    decorators: [
        moduleMetadata({
            imports: [DcxNgToastStoryDemoComponent],
        }),
    ],
};
