import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-stepper/dcx-web-stepper.component';

import {
  STEPPER_BASIC_STEPS,
  STEPPER_WITH_COMPLETED,
  STEPPER_WITH_DISABLED,
  STEPPER_WITH_ERROR,
  STEPPER_WITH_ICONS,
  STEPPER_WITH_OPTIONAL,
} from '../../../../libs/dcx-web-lib/src/lib/core/defaults/stepper';

import type { DcxStepperItem } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/stepper';

@customElement('dcx-web-page-stepper')
export class DcxWebPageStepper extends LitElement {
  readonly basicSteps = STEPPER_BASIC_STEPS;

  readonly completedSteps =
    STEPPER_WITH_COMPLETED;

  readonly disabledSteps =
    STEPPER_WITH_DISABLED;

  readonly errorSteps =
    STEPPER_WITH_ERROR;

  readonly optionalSteps =
    STEPPER_WITH_OPTIONAL;

  readonly iconSteps =
    STEPPER_WITH_ICONS;

  readonly contentSteps: DcxStepperItem[] = [
    {
      id: '1',
      label: 'Datos personales',
      description: 'Completado',
      completed: true,
    },
    {
      id: '2',
      label: 'Dirección de envío',
      description: 'Introduce tu dirección',
      contentTpl: 'slot' as never,
    },
    {
      id: '3',
      label: 'Método de pago',
      description: 'Pendiente',
    },
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
      max-width: 1100px;
      padding-bottom: var(--sp-12, 48px);
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.12em;
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
      max-width: 760px;
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
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      margin: 0;
      font-size: var(--fs-sm, 12px);
      color: var(--text-muted, #696e75);
      line-height: 1.55;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .demo-content-address-title {
      margin: 0 0 var(--sp-1, 4px);
      font-weight: var(--fw-semibold, 600);
    }

    .demo-content-address-text {
      margin: 0;
      color: var(--text-muted, #696e75);
      font-size: var(--fs-base, 14px);
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
            Stepper
          </h1>

          <p class="demo-page-header__desc">
            Guía al usuario por una secuencia de pasos,
            con navegación lineal o libre,
            orientación horizontal o vertical,
            y estados de progreso
            (activo, completado, error,
            deshabilitado, opcional).
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Horizontal</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.basicSteps}
              activeStepId="1">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Vertical</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.basicSteps}
              activeStepId="1"
              orientation="vertical">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Lineal</span>
          </div>

          <p class="demo-section__desc">
            Solo se puede avanzar al siguiente paso
            cuando el actual está completado.
          </p>

          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.basicSteps}
              activeStepId="1"
              .linear=${true}>
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Con pasos completados
            </span>
          </div>
          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.completedSteps}
              activeStepId="3">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Con pasos deshabilitados
            </span>
          </div>
          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.disabledSteps}
              activeStepId="1">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Con estado de error
            </span>
          </div>
          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.errorSteps}
              activeStepId="2">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Con paso opcional
            </span>
          </div>
          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.optionalSteps}
              activeStepId="1">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">
              Con contenido por paso
            </span>
          </div>

          <p class="demo-section__desc">
            El campo
            <code>contentTpl</code>
            acepta un TemplateRef para renderizar
            contenido propio bajo el paso activo.
          </p>

          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.contentSteps}
              activeStepId="2"
              orientation="vertical"
              aria-label="Proceso de compra"
            >
              <div slot="step-content">
                <p class="demo-content-address-title">
                  Dirección de envío
                </p>

                <p class="demo-content-address-text">
                  Calle Ejemplo, 42 · 28001 Madrid · España
                </p>
              </div>
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">
              Pequeño
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.basicSteps}
              activeStepId="1"
              size="s">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">
              Grande
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.basicSteps}
              activeStepId="1"
              size="l">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">
              Extra grande
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.basicSteps}
              activeStepId="1"
              size="xl">
            </dcx-web-stepper>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">12</span>
            <span class="demo-section__title">
              Sin números (con iconos)
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-stepper
              .steps=${this.iconSteps}
              activeStepId="1"
              .showStepNumbers=${false}>
            </dcx-web-stepper>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-stepper': DcxWebPageStepper;
  }
}