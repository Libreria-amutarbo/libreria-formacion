import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-toast/dcx-web-toast.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';

import { DcxWebToastService } from '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-toast/dcx-web-toast.service';

import {
  DCX_TOAST_ERROR_DEMO,
  DCX_TOAST_ICON_ONLY_ACTION,
  DCX_TOAST_INFO_DEMO,
  DCX_TOAST_SUCCESS_WITH_ACTION,
  DCX_TOAST_WARNING_DEMO,
  DCX_TOAST_WITH_ICON_ACTION,
} from '../../../../libs/dcx-web-lib/src/lib/core/defaults/toast';

@customElement('dcx-web-page-toast')
export class DcxWebPageToast extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 860px;
      padding-bottom: var(--sp-12, 48px);
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-dark, #2a2e33);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      line-height: 1.65;
      color: var(--text-muted, #696e75);
      margin: 0 0 var(--sp-5, 20px);
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      margin-bottom: var(--sp-5, 20px);
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      font-size: var(--fs-sm, 12px);
      line-height: 1.55;
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }
  `;

  showInfoToast(): void {
    DcxWebToastService.show(DCX_TOAST_INFO_DEMO);
  }

  showSuccessToast(): void {
    DcxWebToastService.show({
      ...DCX_TOAST_SUCCESS_WITH_ACTION,
      message: 'Archivo exportado con exito',
    });
  }

  showWarningToast(): void {
    DcxWebToastService.show(
      DCX_TOAST_WARNING_DEMO,
    );
  }

  showErrorToast(): void {
    DcxWebToastService.show(
      DCX_TOAST_ERROR_DEMO,
    );
  }

  showIconActionToast(): void {
    DcxWebToastService.show(
      DCX_TOAST_WITH_ICON_ACTION,
    );
  }

  showIconOnlyActionToast(): void {
    DcxWebToastService.show(
      DCX_TOAST_ICON_ONLY_ACTION,
    );
  }

  showNotDismissibleToast(): void {
    DcxWebToastService.show({
      message:
        'Este toast no se puede cerrar manualmente',
      type: 'info',
      dismissible: false,
    });
  }

  clearToasts(): void {
    DcxWebToastService.clear();
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Toast
          </h1>

          <p class="demo-page-header__desc">
            Avisos breves para confirmar acciones,
            advertir o informar errores sin bloquear
            al usuario. Usa
            <code>DcxWebToastService</code> +
            <code>dcx-web-toast</code>
            (montado una sola vez abajo) para
            lanzarlos de forma imperativa desde
            cualquier parte de la app.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">
              Básico (info)
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar info"
              variant="secondary"
              @buttonClick=${this.showInfoToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Éxito con acción personalizada
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar éxito"
              variant="secondary"
              @buttonClick=${this.showSuccessToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Warning con auto-cierre
            </span>
          </div>

          <p class="demo-section__desc">
            El temporizador se pausa si pasas el
            ratón o el foco por encima del toast.
          </p>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar warning"
              variant="secondary"
              @buttonClick=${this.showWarningToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Error con auto-cierre
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar error"
              variant="danger"
              @buttonClick=${this.showErrorToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Acción con icono + texto
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar con icono"
              variant="secondary"
              @buttonClick=${this.showIconActionToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Acción solo icono
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar acción icono"
              variant="secondary"
              @buttonClick=${this.showIconOnlyActionToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Sin botón de cierre
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Mostrar sin cierre"
              variant="secondary"
              @buttonClick=${this.showNotDismissibleToast}
            >
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">
              Limpiar todos los toasts activos
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-button
              label="Limpiar"
              variant="secondary"
              @buttonClick=${this.clearToasts}
            >
            </dcx-web-button>
          </div>
        </div>
      </div>

      <dcx-web-toast position="top-right">
      </dcx-web-toast>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-toast': DcxWebPageToast;
  }
}