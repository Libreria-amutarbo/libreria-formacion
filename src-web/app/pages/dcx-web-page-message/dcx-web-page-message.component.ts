import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-message/dcx-web-message.component';

@customElement('dcx-web-page-message')
export class DcxWebPageMessage extends LitElement {
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
      max-width: 560px;
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

    override render() {
        return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Message
          </h1>

          <p class="demo-page-header__desc">
            Mensaje en línea con cuatro severidades
            (notification, success, warning, error),
            icono por severidad, título, enlace y
            botón de cierre. Anuncia su contenido a
            lectores de pantalla mediante role y
            aria-live.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">
              Default
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-message
              body="Tu sesión se cerrará automáticamente en 5 minutos por inactividad."
            >
            </dcx-web-message>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Notification
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-message
              type="notification"
              title="Información"
              body="La sincronización con el servidor se realiza cada 15 minutos."
              .icon=${true}
            >
            </dcx-web-message>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Success
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-message
              type="success"
              title="Cambios guardados"
              body="Tu perfil se ha actualizado correctamente."
              .icon=${true}
            >
            </dcx-web-message>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Warning
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-message
              type="warning"
              title="Advertencia"
              body="Esta acción no se puede deshacer una vez confirmada."
              .icon=${true}
            >
            </dcx-web-message>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Error
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-message
              type="error"
              title="Error"
              body="No se pudo procesar tu solicitud. Inténtalo de nuevo más tarde."
              .icon=${true}
              .showClose=${true}
            >
            </dcx-web-message>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              With Link
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-message
              type="notification"
              title="Información adicional"
              body="Consulta la documentación para conocer todos los detalles."
              link="https://ejemplo.com/docs"
              .icon=${true}
            >
            </dcx-web-message>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Closable
            </span>
          </div>

          <p class="demo-section__desc">
            El botón de cerrar oculta el mensaje y
            emite el evento closed.
          </p>

          <div class="demo-section__body">
            <dcx-web-message
              type="success"
              title="Guardado"
              body="Pulsa la X para cerrar este mensaje."
              .icon=${true}
              .showClose=${true}
            >
            </dcx-web-message>
          </div>
        </div>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-page-message': DcxWebPageMessage;
    }
}