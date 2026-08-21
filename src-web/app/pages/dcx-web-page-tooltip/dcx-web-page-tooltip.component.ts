import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-tooltip/dcx-web-tooltip.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-icon/dcx-web-icon.component';

@customElement('dcx-web-page-tooltip')
export class DcxWebPageTooltip extends LitElement {
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
      overflow: visible;
      
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
      overflow: visible;
    }

    .demo-section__body--row {
      display: flex;
      gap: var(--sp-3, 12px);
      align-items: center;
      flex-wrap: wrap;
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
            Tooltip
          </h1>

          <p class="demo-page-header__desc">
            Información contextual accesible por
            ratón y teclado, con
            reposicionamiento automático vía CDK
            Overlay y contenido no interactivo.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">
              Por defecto
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tooltip
              content="Este es mi tooltip"
            >
              <dcx-web-button
                label="Pasa el ratón o enfoca"
              >
              </dcx-web-button>
            </dcx-web-tooltip>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Posiciones y alineación de flecha
            </span>
          </div>

          <div class="demo-section__body demo-section__body--row">
            <dcx-web-tooltip
              content="Tooltip TOP (flecha centro)"
              position="top"
              arrowAlignment="center"
            >
              <dcx-web-button label="TOP">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Tooltip TOP (flecha izquierda)"
              position="top"
              arrowAlignment="left"
            >
              <dcx-web-button label="TOP LEFT">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Tooltip TOP (flecha derecha)"
              position="top"
              arrowAlignment="right"
            >
              <dcx-web-button label="TOP RIGHT">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Tooltip BOTTOM (flecha centro)"
              position="bottom"
              arrowAlignment="center"
            >
              <dcx-web-button label="BOTTOM">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Tooltip BOTTOM (flecha izquierda)"
              position="bottom"
              arrowAlignment="left"
            >
              <dcx-web-button label="BOTTOM LEFT">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Tooltip BOTTOM (flecha derecha)"
              position="bottom"
              arrowAlignment="right"
            >
              <dcx-web-button label="BOTTOM RIGHT">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Este es mi tooltip"
              position="right"
            >
              <dcx-web-button label="RIGHT">
              </dcx-web-button>
            </dcx-web-tooltip>

            <dcx-web-tooltip
              content="Este es mi tooltip"
              position="left"
            >
              <dcx-web-button label="LEFT">
              </dcx-web-button>
            </dcx-web-tooltip>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Ocultar al hacer clic
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tooltip
              content="Este es mi tooltip"
              .hideTooltipOnClick=${true}
            >
              <dcx-web-button
                label="Hide on click"
              >
              </dcx-web-button>
            </dcx-web-tooltip>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Contenido largo
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tooltip
              content="Este es un contenido de tooltip muy largo que debería ajustarse correctamente y probar el sistema de posicionamiento inteligente con un texto más extenso que podría causar problemas cerca de los bordes del viewport."
              position="right"
            >
              <dcx-web-button
                label="Contenido largo"
              >
              </dcx-web-button>
            </dcx-web-tooltip>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Con icono como disparador
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tooltip
              content="Información adicional"
              position="right"
            >
              <dcx-web-icon
                name="info-circle"
                size="l"
              >
              </dcx-web-icon>
            </dcx-web-tooltip>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Contenido formateado
            </span>
          </div>

          <p class="demo-section__desc">
            <code>contentHtml</code> admite
            formato básico. Los elementos
            interactivos se eliminan
            automáticamente.
          </p>

          <div class="demo-section__body">
            <dcx-web-tooltip
              contentHtml="<p><strong>Importante:</strong> revisa <em>todos</em> los campos</p>"
              position="top"
            >
              <dcx-web-button
                label="Pasa el ratón o enfoca"
              >
              </dcx-web-button>
            </dcx-web-tooltip>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Variante primary
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-tooltip
              content="Tooltip con variante primary"
              variant="primary"
            >
              <dcx-web-button
                label="Pasa el ratón o enfoca"
              >
              </dcx-web-button>
            </dcx-web-tooltip>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-tooltip': DcxWebPageTooltip;
  }
}