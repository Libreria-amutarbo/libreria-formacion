import {
  LitElement,
  html,
  css,
} from 'lit';

import {
  customElement,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-select/dcx-web-select.component';

import type { DcxSelectOptions } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/select';

import { OPTIONS } from '../../../../libs/dcx-web-lib/src/lib/core/defaults/select';

@customElement('dcx-web-page-select')
export class DcxWebPageSelect extends LitElement {
  private readonly options: DcxSelectOptions[] =
    OPTIONS;

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
      max-width: 720px;
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
      border-top-left-radius: var(--r-lg, 8px);
      border-top-right-radius: var(--r-lg, 8px);
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

    .demo-sizes {
      display: flex;
      gap: var(--sp-3, 12px);
      align-items: center;
      flex-wrap: wrap;
    }

    dcx-web-select {
      display: block;
      box-sizing: border-box;
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
            Select
          </h1>

          <p class="demo-page-header__desc">
            Combobox accesible con soporte de búsqueda,
            limpieza de valor, estado de error y
            ControlValueAccessor para formularios reactivos
            y basados en plantilla. Sigue el patrón
            WAI-ARIA combobox (aria-activedescendant):
            el foco nunca sale del control, solo se
            resalta la opción activa.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              label="Select">
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Con búsqueda</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              searchable>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Con búsqueda y clearable
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              searchable
              clearable>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Deshabilitado
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              placeholder="Disabled"
              disabled>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Deshabilitado con búsqueda
            </span>
          </div>

          <p class="demo-section__desc">
            El control queda fuera del orden de tabulación
            (tabindex="-1") y anuncia aria-disabled.
          </p>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              searchable
              clearable
              disabled
              .valueInput=${this.options[0].value}>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Requerido
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              label="Required"
              searchable
              clearable
              required>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Inválido
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              searchable
              clearable
              .isInvalid=${true}
              errorMessage="Error">
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">
              Con valor preseleccionado
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${this.options}
              clearable
              .valueInput=${this.options[1].value}>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">
              Sin opciones
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-select
              .options=${[]}
              placeholder="No hay opciones disponibles"
              searchable>
            </dcx-web-select>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">
              Tamaños
            </span>
          </div>

          <div class="demo-section__body">
            <div class="demo-sizes">
              <dcx-web-select spacing="xs" placeholder="XS"></dcx-web-select>
              <dcx-web-select spacing="s" placeholder="S"></dcx-web-select>
              <dcx-web-select spacing="m" placeholder="M"></dcx-web-select>
              <dcx-web-select spacing="l" placeholder="L"></dcx-web-select>
              <dcx-web-select spacing="xl" placeholder="XL"></dcx-web-select>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-select': DcxWebPageSelect;
  }
}
