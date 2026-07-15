import { Component, inject, input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  DCX_TOAST_ERROR_DEMO,
  DCX_TOAST_ICON_ONLY_ACTION,
  DCX_TOAST_SUCCESS_WITH_ACTION,
  DCX_TOAST_WITH_ICON_ACTION,
  DCX_TOAST_WARNING_DEMO,
  DcxNgButtonComponent,
  DcxNgToastComponent,
  DcxNgToastService,
} from '@dcx-ng-components/dcx-ng-lib';

// `dcx-ng-toast` no acepta un mensaje directamente por input — es un único
// componente que hace de contenedor Y de render de cada aviso, disparado
// siempre a través de DcxNgToastService. Por eso cada story se apoya en un
// pequeño componente "demo" que llama al servicio y monta `dcx-ng-toast`
// una sola vez, igual que se usa en una página real.

const meta: Meta<DcxNgToastComponent> = {
  title: 'DCXLibrary/Components/Toast',
  component: DcxNgToastComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Esquina de la pantalla donde se apilan los toasts activos.',
      table: {
        category: 'Atributos',
        type: { summary: 'DcxToastPosition' },
        defaultValue: { summary: 'top-right' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Avisos breves y no bloqueantes. Se monta una sola vez en la app (`<dcx-ng-toast position="top-right" />`) y se dispara imperativamente desde cualquier sitio con `DcxNgToastService` (`show`, `success`, `error`, `warning`, `info`, `dismiss`, `clear`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgToastComponent>;

// ======================
// Demo genérica: cubre info/éxito/warning/error/limpiar, igual que la
// página real (src/app/pages/dcx-ng-page-toast).
// ======================
@Component({
  selector: 'dcx-ng-toast-story-demo',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastComponent],
  template: `
    <section style="padding: 16px; border-radius: 8px; background: var(--bg-primary, #0058ab); min-width: 640px; position: relative; min-height: 160px;">
      <h3 style="margin: 0; color: var(--text-white, #ffffff);">Toast (con DcxNgToastService)</h3>
      <p style="margin: 4px 0 16px; color: var(--text-white, #ffffff); opacity: .92;">
        Los botones llaman al servicio; dcx-ng-toast (montado una sola vez) hace de contenedor y renderiza los toasts activos.
      </p>

      <div style="display:flex; flex-wrap:wrap; gap: 8px;" aria-label="Controles de demo de toast">
        <dcx-ng-button label="Mostrar info" variant="secondary" (buttonClick)="showInfo()"></dcx-ng-button>
        <dcx-ng-button label="Mostrar exito" variant="secondary" (buttonClick)="showSuccess()"></dcx-ng-button>
        <dcx-ng-button label="Mostrar warning" variant="secondary" (buttonClick)="showWarning()"></dcx-ng-button>
        <dcx-ng-button label="Mostrar error" variant="danger" (buttonClick)="showError()"></dcx-ng-button>
        <dcx-ng-button label="Limpiar" variant="secondary" (buttonClick)="clear()"></dcx-ng-button>
      </div>

      <dcx-ng-toast [position]="position()"></dcx-ng-toast>
    </section>
  `,
})
class DcxNgToastStoryDemoComponent {
  private readonly toastService = inject(DcxNgToastService);
  readonly position = input<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>(
    'top-right',
  );

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

export const Default: Story = {
  args: {
    position: 'top-right',
  },
  render: args => ({
    props: args,
    template: `<dcx-ng-toast-story-demo [position]="position"></dcx-ng-toast-story-demo>`,
  }),
  decorators: [
    moduleMetadata({
      imports: [DcxNgToastStoryDemoComponent],
    }),
  ],
};

// ======================
// Variantes puntuales — un botón, un escenario.
// ======================
@Component({
  selector: 'dcx-ng-toast-story-custom-action',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastComponent],
  template: `
    <section style="padding: 16px; min-width: 480px; position: relative; min-height: 120px;">
      <dcx-ng-button label="Mostrar éxito con acción" variant="secondary" (buttonClick)="trigger()"></dcx-ng-button>
      <dcx-ng-toast position="top-right"></dcx-ng-toast>
    </section>
  `,
})
class CustomActionTextDemoComponent {
  private readonly toastService = inject(DcxNgToastService);

  trigger(): void {
    this.toastService.show(DCX_TOAST_SUCCESS_WITH_ACTION);
  }
}

export const CustomActionText: Story = {
  render: () => ({ template: `<dcx-ng-toast-story-custom-action></dcx-ng-toast-story-custom-action>` }),
  decorators: [moduleMetadata({ imports: [CustomActionTextDemoComponent] })],
};

@Component({
  selector: 'dcx-ng-toast-story-action-icon',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastComponent],
  template: `
    <section style="padding: 16px; min-width: 480px; position: relative; min-height: 120px;">
      <dcx-ng-button label="Mostrar con icono + texto" variant="secondary" (buttonClick)="trigger()"></dcx-ng-button>
      <dcx-ng-toast position="top-right"></dcx-ng-toast>
    </section>
  `,
})
class CustomActionWithIconDemoComponent {
  private readonly toastService = inject(DcxNgToastService);

  trigger(): void {
    this.toastService.show(DCX_TOAST_WITH_ICON_ACTION);
  }
}

export const CustomActionWithIcon: Story = {
  render: () => ({ template: `<dcx-ng-toast-story-action-icon></dcx-ng-toast-story-action-icon>` }),
  decorators: [moduleMetadata({ imports: [CustomActionWithIconDemoComponent] })],
};

@Component({
  selector: 'dcx-ng-toast-story-icon-only',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastComponent],
  template: `
    <section style="padding: 16px; min-width: 480px; position: relative; min-height: 120px;">
      <dcx-ng-button label="Mostrar acción solo icono" variant="secondary" (buttonClick)="trigger()"></dcx-ng-button>
      <dcx-ng-toast position="top-right"></dcx-ng-toast>
    </section>
  `,
})
class IconOnlyActionDemoComponent {
  private readonly toastService = inject(DcxNgToastService);

  trigger(): void {
    this.toastService.show(DCX_TOAST_ICON_ONLY_ACTION);
  }
}

export const IconOnlyAction: Story = {
  render: () => ({ template: `<dcx-ng-toast-story-icon-only></dcx-ng-toast-story-icon-only>` }),
  decorators: [moduleMetadata({ imports: [IconOnlyActionDemoComponent] })],
};

@Component({
  selector: 'dcx-ng-toast-story-not-dismissible',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastComponent],
  template: `
    <section style="padding: 16px; min-width: 480px; position: relative; min-height: 120px;">
      <dcx-ng-button label="Mostrar sin cierre" variant="secondary" (buttonClick)="trigger()"></dcx-ng-button>
      <dcx-ng-toast position="top-right"></dcx-ng-toast>
    </section>
  `,
})
class NotDismissibleDemoComponent {
  private readonly toastService = inject(DcxNgToastService);

  trigger(): void {
    this.toastService.show({
      message: 'Este toast no se puede cerrar manualmente',
      type: 'info',
      dismissible: false,
    });
  }
}

export const NotDismissible: Story = {
  render: () => ({ template: `<dcx-ng-toast-story-not-dismissible></dcx-ng-toast-story-not-dismissible>` }),
  decorators: [moduleMetadata({ imports: [NotDismissibleDemoComponent] })],
};
