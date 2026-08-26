import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-spinner/dcx-web-spinner.component';

@customElement('dcx-web-page-spinner')
export class DcxWebPageSpinner extends LitElement {
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

    .spinner-row {
      display: flex;
      gap: 2.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .spinner-wrapper-demo {
      position: relative;
      max-width: 24rem;
      border: 1px dashed var(--border-light, #d1d5db);
      border-radius: var(--r-md, 6px);
    }

    .content-box {
      padding: var(--sp-4, 16px);
    }

    .content-box h4 {
      margin: 0 0 var(--sp-2, 8px);
      color: var(--text-dark, #2a2e33);
    }

    .content-box p {
      color: var(--text-muted, #696e75);
      font-size: 0.875rem;
      margin: 0 0 var(--sp-2, 8px);
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
            Spinner
          </h1>

          <p class="demo-page-header__desc">
            Indicador de carga circular,
            accesible (<code>role="status"</code>
            + <code>aria-live="polite"</code>) y
            personalizable. Puede usarse solo o
            como overlay (<code>wrapper</code>)
            sobre contenido proyectado.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">
              Tamaños
            </span>
          </div>

          <div class="demo-section__body">
            <div class="spinner-row">
              <dcx-web-spinner
                size="s"
                .delay=${0}
                aria-label="Cargando"
              ></dcx-web-spinner>

              <dcx-web-spinner
                size="m"
                .delay=${0}
                aria-label="Cargando"
              ></dcx-web-spinner>

              <dcx-web-spinner
                size="l"
                .delay=${0}
                aria-label="Cargando"
              ></dcx-web-spinner>

              <dcx-web-spinner
                size="xl"
                .delay=${0}
                aria-label="Cargando"
              ></dcx-web-spinner>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Color personalizado
            </span>
          </div>

          <div class="demo-section__body">
            <div class="spinner-row">
              <dcx-web-spinner
                size="l"
                .delay=${0}
                aria-label="Cargando"
              ></dcx-web-spinner>

              <dcx-web-spinner
                size="l"
                .delay=${0}
                color="#7c3aed"
                aria-label="Cargando"
              ></dcx-web-spinner>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Con título y descripción
            </span>
          </div>

          <div class="demo-section__body">
            <div class="spinner-row">
              <dcx-web-spinner
                size="l"
                .delay=${0}
                title="Cargando…"
              ></dcx-web-spinner>

              <dcx-web-spinner
                size="l"
                .delay=${0}
                title="Procesando"
                description="Por favor, espera"
              ></dcx-web-spinner>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Con delay
            </span>
          </div>

          <p class="demo-section__desc">
            Este spinner no aparece hasta pasado 1
            segundo — evita el parpadeo en
            operaciones que resuelven casi al
            instante.
          </p>

          <div class="demo-section__body" style="display: flex; justify-content: center;">
            <dcx-web-spinner
              .delay=${1000}
              size="l"
              title="Cargando con retraso…"
              description="Este spinner solo aparece pasado 1 segundo"
            ></dcx-web-spinner>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Modo wrapper (overlay)
            </span>
          </div>

          <div class="demo-section__body">
            <div class="spinner-wrapper-demo">
              <dcx-web-spinner
                size="l"
                .wrapper=${true}
                .delay=${0}
                title="Cargando contenido…"
              >
                <div class="content-box">
                  <h4>Contenido</h4>

                  <p>
                    Este es un ejemplo del
                    contenido que se muestra bajo
                    el spinner en modo wrapper.
                  </p>

                  <p>
                    El spinner se superpone a este
                    contenido como un overlay.
                  </p>
                </div>
              </dcx-web-spinner>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-spinner': DcxWebPageSpinner;
  }
}