import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-textarea/dcx-web-textarea.component';

@customElement('dcx-web-page-textarea')
export class DcxWebPageTextarea extends LitElement {
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

    .demo-section__body--row {
      display: flex;
      gap: var(--sp-4, 16px);
      align-items: flex-start;
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
            Textarea
          </h1>

          <p class="demo-page-header__desc">
            Entrada de texto multilínea con soporte para
            etiquetas flotantes, redimensionamiento
            automático o manual, validación y hint de ayuda.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Por defecto</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              label="Comentarios"
              placeholder="Escribe aquí..."
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">AutoResize</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              label="Notas"
              .autoResize=${true}
              placeholder="Escribe para ver cómo crece automáticamente..."
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Variantes de label flotante
            </span>
          </div>

          <div class="demo-section__body demo-section__body--row">
            <dcx-web-textarea
              floatLabel="over"
              label="Over Label"
            >
            </dcx-web-textarea>

            <dcx-web-textarea
              floatLabel="in"
              label="In Label"
            >
            </dcx-web-textarea>

            <dcx-web-textarea
              floatLabel="on"
              label="On Label"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              IFTA Label
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              floatLabel="ifta"
              label="Descripción"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Tamaños
            </span>
          </div>

          <div class="demo-section__body demo-section__body--row">
            <dcx-web-textarea
              label="Small"
              size="small"
              placeholder="Small"
            >
            </dcx-web-textarea>

            <dcx-web-textarea
              label="Normal"
              placeholder="Normal"
            >
            </dcx-web-textarea>

            <dcx-web-textarea
              label="Large"
              size="large"
              placeholder="Large"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Fluid
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              .fluid=${true}
              label="Descripción"
              placeholder="Textarea que ocupa el 100% del ancho"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Filled
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              .filled=${true}
              label="Notas"
              placeholder="Filled textarea"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">
              Disabled
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              .disabled=${true}
              label="Observaciones"
              placeholder="No disponible"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">
              Obligatorio con error
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              .required=${true}
              .invalid=${true}
              label="Descripción"
              placeholder="Escribe aquí..."
              errorMessage="Este campo es obligatorio"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">
              Con hint y límite de caracteres
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-textarea
              label="Notas"
              .filled=${true}
              .maxLength=${500}
              hint="Max. 500 caracteres"
            >
            </dcx-web-textarea>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">
              Resize manual desactivado
            </span>
          </div>

          <p class="demo-section__desc">
            Por defecto el textarea es redimensionable
            verticalmente por el usuario
            (<code>resizable</code>). Aquí se desactiva
            explícitamente.
          </p>

          <div class="demo-section__body">
            <dcx-web-textarea
              label="Comentarios"
              .resizable=${false}
              placeholder="No se puede redimensionar manualmente"
            >
            </dcx-web-textarea>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-textarea': DcxWebPageTextarea;
  }
}