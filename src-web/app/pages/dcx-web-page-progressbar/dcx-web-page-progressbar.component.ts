import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-progressbar/dcx-web-progressbar.component';

import type {
  DcxProgressStep,
} from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/progressbar';

@customElement('dcx-web-page-progressbar')
export class DcxWebPageProgressbar extends LitElement {
  private readonly numberedSteps: DcxProgressStep[] = [
    { label: 'Datos' },
    { label: 'Verificación' },
    { label: 'Pago' },
    { label: 'Confirmación' },
  ];

  private readonly checkmarkSteps: DcxProgressStep[] = [
    { label: 'Completado' },
    { label: 'Completado' },
    { label: 'En proceso' },
    { label: 'Pendiente' },
  ];

  private readonly processSteps: DcxProgressStep[] = [
    { label: 'Carrito' },
    { label: 'Envío' },
    { label: 'Revisión' },
    { label: 'Pago' },
  ];

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

    .demo-section__body--column {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sp-6, 24px);
    }

    .progress-demo {
      width: 100%;
      max-width: 480px;
    }

    .progress-demo--wide {
      max-width: 640px;
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
            Progressbar
          </h1>

          <p class="demo-page-header__desc">
            Indicador de progreso de una tarea o proceso.
            Variante simple (barra fina con cabecera opcional),
            segmentada (con animación de carga) y stepper
            (pasos numerados o con checks). Expone semántica
            <code>progressbar</code> accesible.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo">
              <dcx-web-progressbar
                .value=${60}
                aria-label="Progreso de la tarea"
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Segmented</span>
          </div>

          <p class="demo-section__desc">
            Barra con segmentos y animación de carga
            (3, 5 o 10 segmentos).
          </p>

          <div class="demo-section__body demo-section__body--column">
            <div class="progress-demo">
              <dcx-web-progressbar
                variant="segmented"
                .segments=${3}
                aria-label="Cargando"
              ></dcx-web-progressbar>
            </div>

            <div class="progress-demo">
              <dcx-web-progressbar
                variant="segmented"
                aria-label="Cargando"
              ></dcx-web-progressbar>
            </div>

            <div class="progress-demo">
              <dcx-web-progressbar
                variant="segmented"
                .segments=${10}
                aria-label="Cargando"
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">With Tooltip</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo">
              <dcx-web-progressbar
                .value=${70}
                .showTooltip=${true}
                aria-label="Progreso"
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">With Header Label</span>
          </div>

          <p class="demo-section__desc">
            Cabecera del diseño: etiqueta a la izquierda
            y porcentaje a la derecha.
          </p>

          <div class="demo-section__body">
            <div class="progress-demo">
              <dcx-web-progressbar
                .value=${82}
                label="Progreso"
                .showLabel=${true}
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Zero</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo">
              <dcx-web-progressbar
                .value=${0}
                label="Progreso"
                .showLabel=${true}
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Complete</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo">
              <dcx-web-progressbar
                .value=${100}
                label="Progreso"
                .showLabel=${true}
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Numbered Stepper</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo progress-demo--wide">
              <dcx-web-progressbar
                variant="stepper"
                .steps=${this.numberedSteps}
                .currentStep=${3}
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Checkmark Stepper</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo progress-demo--wide">
              <dcx-web-progressbar
                variant="stepper"
                .steps=${this.checkmarkSteps}
                .currentStep=${3}
                .showCheckmarks=${true}
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">Process Stepper</span>
          </div>

          <div class="demo-section__body">
            <div class="progress-demo progress-demo--wide">
              <dcx-web-progressbar
                variant="stepper"
                .steps=${this.processSteps}
                .currentStep=${3}
              ></dcx-web-progressbar>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-progressbar': DcxWebPageProgressbar;
  }
}