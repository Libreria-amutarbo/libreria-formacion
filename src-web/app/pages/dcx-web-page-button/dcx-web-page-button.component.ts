import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';

@customElement('dcx-web-page-button')
export class DcxWebPageButton extends LitElement {

  static override styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 860px;
      padding-bottom: 3rem;
    }

    .demo-page-header {
      margin-bottom: 2rem;
    }

    .demo-page-header__kicker {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #696e75;
      margin-bottom: .3rem;
    }

    .demo-page-header__title {
      font-size: 28px;
      font-weight: 700;
      color: #2a2e33;
      margin: 0 0 .6rem 0;
    }

    .demo-page-header__desc {
      font-size: 14px;
      line-height: 1.65;
      color: #696e75;
      max-width: 560px;
      margin: 0 0 1.25rem;
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 0;
    }

    .demo-section {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      background: #f4f5f7;
      border-bottom: 1px solid #e5e7eb;
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: 700;
      color: #696e75;
      background: #edf0f3;
      border-radius: 4px;
      padding: 2px 8px;
    }

    .demo-section__title {
      font-size: 13px;
      font-weight: 600;
      color: #2a2e33;
    }

    .demo-section__desc {
      padding: 10px 16px 0;
      font-size: 12px;
      line-height: 1.55;
      color: #696e75;
      margin: 0;
    }

    .demo-section__body {
      padding: 16px;
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    form {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    code {
      background: #f1f3f5;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
      color: #d63384;
    }

    a {
      text-decoration: none;
    }
  `;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Button</h1>
          <p class="demo-page-header__desc">
            Componente de botón base. Soporta múltiples variantes, tamaños, estados estáticos, iconos y tipos de formulario HTML nativos.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Tipos de botón</span>
          </div>
          <div class="demo-section__body">
            <form>
              <dcx-web-button label="Submit" type="submit" variant="primary"></dcx-web-button>
              <dcx-web-button label="Reset"  type="reset"  variant="primary"></dcx-web-button>
              <dcx-web-button label="Button" type="button" variant="primary"></dcx-web-button>
            </form>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Deshabilitado</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Disabled" variant="primary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Variantes</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Primary"   size="m" variant="primary"></dcx-web-button>
            <dcx-web-button label="Secondary" size="m" variant="secondary"></dcx-web-button>
            <dcx-web-button label="Terciary"  size="m" variant="terciary"></dcx-web-button>
            <dcx-web-button label="Danger"    size="m" variant="danger"></dcx-web-button>
            <dcx-web-button label="Text"      size="m" variant="text"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Con icono</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Guardar"   size="m" variant="primary"   ?icon=${true} icon-name="save"        icon-position="left" icon-size="m"></dcx-web-button>
            <dcx-web-button label="Siguiente" size="m" variant="secondary" ?icon=${true} icon-name="arrow-right" icon-position="left" icon-size="m"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Estados — Primary</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="primary"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="primary" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="primary" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="primary" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="primary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Estados — Secondary</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="secondary"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="secondary" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="secondary" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="secondary" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="secondary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Estados — Terciary</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="terciary"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="terciary" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="terciary" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="terciary" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="terciary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">Estados — Danger</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="danger"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="danger" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="danger" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="danger" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="danger" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">Estados — Text</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="text"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="text" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="text" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="text" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="text" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">Variantes por tamaño — Large</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Button" size="l" variant="primary"   ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="l" variant="secondary" ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="l" variant="terciary"  ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="l" variant="danger"    ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">12</span>
            <span class="demo-section__title">Variantes por tamaño — Medium</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Button" size="m" variant="primary"   ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="m" variant="secondary" ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="m" variant="terciary"  ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="m" variant="danger"    ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">13</span>
            <span class="demo-section__title">Variantes por tamaño — Small</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Button" size="s" variant="primary"   ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="s" variant="secondary" ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="s" variant="terciary"  ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
            <dcx-web-button label="Button" size="s" variant="danger"    ?icon=${true} icon-name="chevron-left" icon-position="left" icon-size="s" icon-right-name="chevron-right"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">14</span>
            <span class="demo-section__title">Botón como enlace</span>
          </div>
          <p class="demo-section__desc">Envuelve el componente en un <code>&lt;a&gt;</code> para navegación. El botón mantiene su apariencia visual.</p>
          <div class="demo-section__body">
            <a href="#" target="_blank">
              <dcx-web-button label="Enlace Primary"   variant="primary"></dcx-web-button>
            </a>
            <a href="#" target="_blank">
              <dcx-web-button label="Enlace Secondary" variant="secondary"></dcx-web-button>
            </a>
            <a href="#" target="_blank">
              <dcx-web-button label="Enlace Terciary"  variant="terciary"></dcx-web-button>
            </a>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">15</span>
            <span class="demo-section__title">Solo icono (accesible)</span>
          </div>
          <p class="demo-section__desc">Usa <code>ariaLabel</code> (input del componente) para proporcionar el nombre accesible al botón interno.</p>
          <div class="demo-section__body">
            <dcx-web-button size="s" variant="primary" ?icon=${true} icon-name="save" aria-label="Guardar"></dcx-web-button>
            <dcx-web-button size="m" variant="primary" ?icon=${true} icon-name="save" aria-label="Guardar"></dcx-web-button>
            <dcx-web-button size="l" variant="primary" ?icon=${true} icon-name="save" aria-label="Guardar"></dcx-web-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-button': DcxWebPageButton;
  }
}
