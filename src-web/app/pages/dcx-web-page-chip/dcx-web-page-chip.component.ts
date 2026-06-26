import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-chip/dcx-web-chip.component';

@customElement('dcx-web-page-chip')
export class DcxWebPageChip extends LitElement {
  @state() private accessor _logs: string[] = [];

  private _handleRemove(label: string) {
    this._logs = [...this._logs, `Chip removido: ${label}`];
  }

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
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      margin-bottom: 0.3rem;
    }

    .demo-page-header__title {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--text-dark, #2a2e33);
      margin-bottom: 0.6rem;
      margin-top: 0;
    }

    .demo-page-header__desc {
      font-size: 14px;
      line-height: 1.65;
      color: var(--text-muted, #696e75);
      max-width: 560px;
      margin: 0 0 1.25rem;
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #e5e7eb);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #e5e7eb);
      border-radius: 8px;
      overflow: visible;
      margin-bottom: 1.25rem;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #e5e7eb);
      border-radius: 8px 8px 0 0;
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      background: #edf0f3;
      border-radius: 4px;
      padding: 2px 8px;
      flex-shrink: 0;
      line-height: 1.6;
    }

    .demo-section__title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: 10px 16px 0;
      font-size: 12px;
      line-height: 1.55;
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: 20px 16px;
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .chip-row > * {
      margin: 0;
    }

    .demo-page__log {
      margin-top: 1.5rem;
      padding: 1rem;
      border-radius: 8px;
      background: var(--bg-surface, #f4f5f7);
      border: 1px solid var(--border-light, #e5e7eb);
      color: var(--text-muted, #696e75);
      font-size: 13px;
      line-height: 1.6;
    }

    .demo-page__log-item {
      margin: 0;
      padding: 0.25rem 0;
    }
  `;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Chip (Web Component)</h1>
          <p class="demo-page-header__desc">
            Etiqueta compacta con soporte de colores, icono, imagen y variante filter con botón de eliminación.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-chip label="Etiqueta simple"></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Colores</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip label="Primary" color="primary"></dcx-web-chip>
            <dcx-web-chip label="Secondary" color="secondary"></dcx-web-chip>
            <dcx-web-chip label="Success" color="success"></dcx-web-chip>
            <dcx-web-chip label="Warning" color="warning"></dcx-web-chip>
            <dcx-web-chip label="Error" color="error"></dcx-web-chip>
            <dcx-web-chip label="Info" color="info"></dcx-web-chip>
            <dcx-web-chip label="Gray" color="grey"></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Con icono</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip label="Home" icon="house" color="primary"></dcx-web-chip>
            <dcx-web-chip label="Usuario" icon="person" color="success"></dcx-web-chip>
            <dcx-web-chip label="Configuración" icon="gear" color="secondary"></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Con imagen</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip
              label="María García"
              image="https://picsum.photos/seed/mg/40/40"
              color="primary"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Carlos López"
              image="https://picsum.photos/seed/cl/40/40"
              color="secondary"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Ana Martínez"
              image="https://picsum.photos/seed/am/40/40"
              color="success"
            ></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Variante filter (removible)</span>
          </div>
          <p class="demo-section__desc">
            Haz clic en la × para eliminar. Se puede activar con <code>variant="filter"</code> o con <code>removable="true"</code>.
          </p>
          <div class="demo-section__body chip-row">
            <dcx-web-chip
              label="via variant"
              color="primary"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('variant')}
            ></dcx-web-chip>
            <dcx-web-chip
              label="via removable"
              color="secondary"
              removable
              @dcx-chip-remove=${() => this._handleRemove('removable')}
            ></dcx-web-chip>
            <dcx-web-chip
              label="Con icono"
              color="warning"
              variant="filter"
              icon="star"
              @dcx-chip-remove=${() => this._handleRemove('icono')}
            ></dcx-web-chip>
            <dcx-web-chip
              label="Con imagen"
              color="success"
              variant="filter"
              image="https://picsum.photos/seed/mg/40/40"
              @dcx-chip-remove=${() => this._handleRemove('imagen')}
            ></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Variantes choice vs filter por color</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip label="Info choice" color="info" variant="choice"></dcx-web-chip>
            <dcx-web-chip
              label="Info filter"
              color="info"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('Info')}
            ></dcx-web-chip>
            <dcx-web-chip label="Gray choice" color="grey" variant="choice"></dcx-web-chip>
            <dcx-web-chip
              label="Gray filter"
              color="grey"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('Gray')}
            ></dcx-web-chip>
            <dcx-web-chip label="Error choice" color="error" variant="choice"></dcx-web-chip>
            <dcx-web-chip
              label="Error filter"
              color="error"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('Error')}
            ></dcx-web-chip>
          </div>
        </section>
    `;
  }
}
