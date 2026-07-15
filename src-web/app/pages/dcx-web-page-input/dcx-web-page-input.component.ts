import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-input/dcx-web-input.component';

import type { DcxInputErrorMessage } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/input';

@customElement('dcx-web-page-input')
export class DcxWebPageInput extends LitElement {
  private readonly passwordErrors: DcxInputErrorMessage[] = [
    {
      type: 'minLength',
      message: 'Mínimo 8 caracteres.',
    },
    {
      type: 'uppercase',
      message: 'Debe contener una mayúscula.',
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

    .demo-types {
      display: flex;
      gap: var(--sp-4, 16px);
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .demo-sizes {
      display: flex;
      flex-direction: column;
      gap: var(--sp-4, 16px);
    }
  `;

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>

          <h1 class="demo-page-header__title">
            Input (Web Component)
          </h1>

          <p class="demo-page-header__desc">
            Campo de formulario con soporte para múltiples
            tipos (texto, número, email, contraseña, búsqueda,
            teléfono, URL, archivo), texto de ayuda, estados
            de error accesibles y etiqueta asociada.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Nombre completo"
              placeholder="Ej: Jean Dupont">
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">With Hint</span>
          </div>

          <p class="demo-section__desc">
            Texto de ayuda enlazado por
            <code>aria-describedby</code>.
          </p>

          <div class="demo-section__body">
            <dcx-web-input
              label="Nombre completo"
              placeholder="Ej: Jean Dupont"
              hint="Tal como aparece en el documento oficial.">
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Required</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Email corporativo"
              placeholder="nombre@empresa.com"
              required>
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Invalid</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Email corporativo"
              placeholder="nombre@empresa.com"
              .isInvalid=${true}
              errorMessage="Introduce un email válido.">
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Invalid List</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Contraseña"
              type="password"
              .isInvalid=${true}
              .errorMessages=${this.passwordErrors}>
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Disabled</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Campo deshabilitado"
              placeholder="No editable"
              disabled>
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Read Only</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Solo lectura"
              value="Generado automáticamente"
              readonly>
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Password</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Contraseña"
              type="password"
              placeholder="••••••••">
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">Search</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Búsqueda"
              type="search"
              placeholder="Buscar...">
            </dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">Types</span>
          </div>

          <div class="demo-section__body demo-types">
            <dcx-web-input label="Texto" type="text"></dcx-web-input>
            <dcx-web-input label="Número" type="number"></dcx-web-input>
            <dcx-web-input label="Email" type="email"></dcx-web-input>
            <dcx-web-input label="Teléfono" type="tel"></dcx-web-input>
            <dcx-web-input label="URL" type="url"></dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">Sizes</span>
          </div>

          <p class="demo-section__desc">
            Padding controlado por
            <code>spacing</code> (xs…xl).
          </p>

          <div class="demo-section__body demo-sizes">
            <dcx-web-input label="xs" spacing="xs" placeholder="xs"></dcx-web-input>
            <dcx-web-input label="s" spacing="s" placeholder="s"></dcx-web-input>
            <dcx-web-input label="m" spacing="m" placeholder="m"></dcx-web-input>
            <dcx-web-input label="l" spacing="l" placeholder="l"></dcx-web-input>
            <dcx-web-input label="xl" spacing="xl" placeholder="xl"></dcx-web-input>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">12</span>
            <span class="demo-section__title">Files</span>
          </div>

          <div class="demo-section__body">
            <dcx-web-input
              label="Adjuntar archivo"
              type="file">
            </dcx-web-input>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-input': DcxWebPageInput;
  }
}