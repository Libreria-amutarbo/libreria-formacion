import {
  LitElement,
  html,
  css,
} from 'lit';

import {
  customElement,
  state,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-toggle/dcx-web-toggle.component';

@customElement('dcx-web-page-toggle')
export class DcxWebPageToggle extends LitElement {
  @state()
  accessor isDarkMode = false;

  @state()
  accessor eventState = false;

  @state()
  accessor notifications = true;

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(
        --ff-base,
        'Inter',
        sans-serif
      );
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
      border-top: 1px solid
        var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid
        var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      margin-bottom: var(--sp-5, 20px);
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px)
        var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid
        var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(
        --bg-sidebar,
        #f0f2f5
      );
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px)
        var(--sp-4, 16px) 0;
      font-size: var(--fs-sm, 12px);
      line-height: 1.55;
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px)
        var(--sp-4, 16px);
    }

    .demo-section__body--row {
      display: flex;
      gap: var(--sp-4, 16px);
      align-items: center;
      flex-wrap: wrap;
    }
  `;

  private handleToggle(value: boolean) {
    this.isDarkMode = value;
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Toggle
          </h1>

          <p class="demo-page-header__desc">
            Switch on/off accesible, con
            tamaños, posiciones de label e
            integración con formularios
            reactivos.
          </p>

          <hr
            class="demo-page-header__divider"
          />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              01
            </span>
            <span class="demo-section__title">
              Básico
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-toggle
              .checked=${this.isDarkMode}
              label="Dark mode"
              size="m"
              textPosition="right"
              @toggled=${(
                e: CustomEvent<boolean>,
              ) =>
                this.handleToggle(
                  e.detail,
                )}
            >
            </dcx-web-toggle>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              02
            </span>
            <span class="demo-section__title">
              Deshabilitado
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-toggle
              .checked=${true}
              .disabled=${true}
              label="Deshabilitado"
              size="m"
              textPosition="right"
            >
            </dcx-web-toggle>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              03
            </span>
            <span class="demo-section__title">
              Sin label visible
            </span>
          </div>

          <p class="demo-section__desc">
            Este toggle no muestra texto,
            pero sigue siendo accesible con
            <code>ariaLabel</code>.
          </p>

          <div class="demo-section__body">
            <dcx-web-toggle
              .checked=${false}
              aria-label="Toggle sin label visible"
              size="m"
              textPosition="right"
            >
            </dcx-web-toggle>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              04
            </span>
            <span class="demo-section__title">
              Posiciones del texto
            </span>
          </div>

          <div class="demo-section__body demo-section__body--row">
            <dcx-web-toggle
              .checked=${true}
              label="Top"
              textPosition="top"
            ></dcx-web-toggle>

            <dcx-web-toggle
              .checked=${true}
              label="Bottom"
              textPosition="bottom"
            ></dcx-web-toggle>

            <dcx-web-toggle
              .checked=${true}
              label="Left"
              textPosition="left"
            ></dcx-web-toggle>

            <dcx-web-toggle
              .checked=${true}
              label="Right"
              textPosition="right"
            ></dcx-web-toggle>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              05
            </span>
            <span class="demo-section__title">
              Tamaños
            </span>
          </div>

          <div class="demo-section__body demo-section__body--row">
            <dcx-web-toggle
              .checked=${true}
              size="s"
              label="Small"
              textPosition="right"
            ></dcx-web-toggle>

            <dcx-web-toggle
              .checked=${true}
              size="m"
              label="Medium"
              textPosition="right"
            ></dcx-web-toggle>

            <dcx-web-toggle
              .checked=${true}
              size="l"
              label="Large"
              textPosition="right"
            ></dcx-web-toggle>

            <dcx-web-toggle
              .checked=${true}
              size="xl"
              label="XL"
              textPosition="right"
            ></dcx-web-toggle>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              06
            </span>
            <span class="demo-section__title">
              Controlado por evento
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-toggle
              .checked=${this.eventState}
              label="Click para cambiar"
              size="m"
              textPosition="right"
              @toggled=${(
                e: CustomEvent<boolean>,
              ) =>
                (this.eventState =
                  e.detail)}
            >
            </dcx-web-toggle>

            <p class="demo-section__desc">
              Estado actual:
              ${this.eventState
                ? 'ON'
                : 'OFF'}
            </p>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">
              07
            </span>
            <span class="demo-section__title">
              Formulario reactivo
            </span>
          </div>

          <p class="demo-section__desc">
            El componente implementa
            ControlValueAccessor, por lo
            que funciona con
            formControlName.
          </p>

          <div class="demo-section__body">
            <dcx-web-toggle
              .checked=${this.notifications}
              label="Notificaciones"
              @toggled=${(
                e: CustomEvent<boolean>,
              ) =>
                (this.notifications =
                  e.detail)}
            >
            </dcx-web-toggle>

            <p class="demo-section__desc">
              Valor del FormControl:
              ${this.notifications
                ? 'ON'
                : 'OFF'}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-toggle': DcxWebPageToggle;
  }
}