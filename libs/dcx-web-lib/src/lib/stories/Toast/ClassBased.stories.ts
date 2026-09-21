import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  DCX_TOAST_ERROR_DEMO,
  DCX_TOAST_ICON_ONLY_ACTION,
  DCX_TOAST_SUCCESS_WITH_ACTION,
  DCX_TOAST_WITH_ICON_ACTION,
  DCX_TOAST_WARNING_DEMO,
  DCX_TOAST_POSITIONS,
} from '../../core/defaults/toast';
import { DcxWebToastService } from '../../dcx-web-components/dcx-web-toast/dcx-web-toast.service';
import '../../dcx-web-components/dcx-web-toast/dcx-web-toast.component';
import '../../dcx-web-components/dcx-web-button/dcx-web-button.component';

const meta: Meta = {
  title: 'DCXLibrary/WebComponents/Toast',
  component: 'dcx-web-toast',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: DCX_TOAST_POSITIONS,
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
          'Avisos breves y no bloqueantes. Se monta una sola vez en la app (`<dcx-web-toast position="top-right"></dcx-web-toast>`) y se dispara imperativamente desde cualquier sitio con `DcxWebToastService` (`show`, `success`, `error`, `warning`, `info`, `dismiss`, `clear`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const defaultToastService = new DcxWebToastService();

export const Default: Story = {
  args: {
    position: 'top-right',
  },
  render: args => html`
    <section style="padding: var(--sp-4, 16px); border-radius: var(--r-lg, 8px); background: var(--bg-primary, #0058ab); min-width: 640px; position: relative; min-height: 160px;">
      <h3 style="margin: 0; color: var(--text-white, #ffffff);">Toast (con DcxWebToastService)</h3>
      <p style="margin: var(--sp-1, 4px) 0 var(--sp-4, 16px); color: var(--text-white, #ffffff); opacity: .92;">
        Los botones llaman al servicio; dcx-web-toast (montado una sola vez) hace de contenedor y renderiza los toasts activos.
      </p>

      <div style="display:flex; flex-wrap:wrap; gap: var(--sp-2, 8px);" aria-label="Controles de demo de toast">
        <dcx-web-button
          label="Mostrar info"
          variant="secondary"
          @buttonClick=${() => defaultToastService.info('Informacion actualizada correctamente')}
        ></dcx-web-button>
        <dcx-web-button
          label="Mostrar exito"
          variant="secondary"
          @buttonClick=${() => defaultToastService.success('Archivo exportado con exito', { actionLabel: 'Ver detalle' })}
        ></dcx-web-button>
        <dcx-web-button
          label="Mostrar warning"
          variant="secondary"
          @buttonClick=${() => defaultToastService.show(DCX_TOAST_WARNING_DEMO)}
        ></dcx-web-button>
        <dcx-web-button
          label="Mostrar error"
          variant="danger"
          @buttonClick=${() => defaultToastService.show(DCX_TOAST_ERROR_DEMO)}
        ></dcx-web-button>
        <dcx-web-button
          label="Limpiar"
          variant="secondary"
          @buttonClick=${() => defaultToastService.clear()}
        ></dcx-web-button>
      </div>

      <dcx-web-toast .service=${defaultToastService} position=${args['position'] || 'top-right'}></dcx-web-toast>
    </section>
  `,
};

const customActionTextService = new DcxWebToastService();
export const CustomActionText: Story = {
  render: () => html`
    <section style="padding: var(--sp-4, 16px); min-width: 480px; position: relative; min-height: 120px;">
      <dcx-web-button
        label="Mostrar éxito con acción"
        variant="secondary"
        @buttonClick=${() => customActionTextService.show(DCX_TOAST_SUCCESS_WITH_ACTION)}
      ></dcx-web-button>
      <dcx-web-toast .service=${customActionTextService} position="top-right"></dcx-web-toast>
    </section>
  `,
};

const customActionWithIconService = new DcxWebToastService();
export const CustomActionWithIcon: Story = {
  render: () => html`
    <section style="padding: var(--sp-4, 16px); min-width: 480px; position: relative; min-height: 120px;">
      <dcx-web-button
        label="Mostrar con icono + texto"
        variant="secondary"
        @buttonClick=${() => customActionWithIconService.show(DCX_TOAST_WITH_ICON_ACTION)}
      ></dcx-web-button>
      <dcx-web-toast .service=${customActionWithIconService} position="top-right"></dcx-web-toast>
    </section>
  `,
};

const iconOnlyActionService = new DcxWebToastService();
export const IconOnlyAction: Story = {
  render: () => html`
    <section style="padding: var(--sp-4, 16px); min-width: 480px; position: relative; min-height: 120px;">
      <dcx-web-button
        label="Mostrar acción solo icono"
        variant="secondary"
        @buttonClick=${() => iconOnlyActionService.show(DCX_TOAST_ICON_ONLY_ACTION)}
      ></dcx-web-button>
      <dcx-web-toast .service=${iconOnlyActionService} position="top-right"></dcx-web-toast>
    </section>
  `,
};

const notDismissibleService = new DcxWebToastService();
export const NotDismissible: Story = {
  render: () => html`
    <section style="padding: var(--sp-4, 16px); min-width: 480px; position: relative; min-height: 120px;">
      <dcx-web-button
        label="Mostrar sin cierre"
        variant="secondary"
        @buttonClick=${() =>
          notDismissibleService.show({
            message: 'Este toast no se puede cerrar manualmente',
            type: 'info',
            dismissible: false,
          })}
      ></dcx-web-button>
      <dcx-web-toast .service=${notDismissibleService} position="top-right"></dcx-web-toast>
    </section>
  `,
};
