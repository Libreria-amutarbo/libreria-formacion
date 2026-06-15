import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-badge/dcx-web-badge.component';
// Mock icon for the overlay demo since dcx-web-icon is not available yet
const IconSvg = (name: string) => {
  if (name === 'bell') return html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;
  if (name === 'envelope') return html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
  if (name === 'calendar') return html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
  return html``;
};

@customElement('dcx-web-page-badge')
export class DcxWebPageBadge extends LitElement {

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
      padding: 20px 16px;
    }

    /* Mock button styles for the demo since dcx-ng-button is not in web yet */
    .mock-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }
    .mock-btn-primary { background: #0058ab; color: #fff; }
    .mock-btn-secondary { background: #696e75; color: #fff; }
  `;

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Badge (Web Component)</h1>
          <p class="demo-page-header__desc">
            Etiqueta visual que muestra un valor numérico o texto breve con un color semántico.
            Se usa principalmente como contador de notificaciones superpuesto sobre iconos o botones,
            y como indicador de estado en tablas o listados.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-badge value="2"></dcx-web-badge>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Dot</span>
          </div>
          <p class="demo-section__desc">
            Sin <code>value</code>, el badge aparece como un punto indicador de estado.
          </p>
          <div class="demo-section__body" style="display:flex; gap:12px; align-items:center;">
            <dcx-web-badge severity="primary"></dcx-web-badge>
            <dcx-web-badge severity="danger"></dcx-web-badge>
            <dcx-web-badge severity="success"></dcx-web-badge>
            <dcx-web-badge severity="warn"></dcx-web-badge>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Severidades</span>
          </div>
          <div class="demo-section__body" style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <dcx-web-badge value="2" severity="primary"></dcx-web-badge>
            <dcx-web-badge value="6" severity="secondary"></dcx-web-badge>
            <dcx-web-badge value="8" severity="success"></dcx-web-badge>
            <dcx-web-badge value="4" severity="info"></dcx-web-badge>
            <dcx-web-badge value="9" severity="warn"></dcx-web-badge>
            <dcx-web-badge value="3" severity="danger"></dcx-web-badge>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Tamaños</span>
          </div>
          <div class="demo-section__body" style="display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap;">
            <dcx-web-badge value="8" size="xl" severity="success"></dcx-web-badge>
            <dcx-web-badge value="6" size="lg" severity="warn"></dcx-web-badge>
            <dcx-web-badge value="4" size="md" severity="info"></dcx-web-badge>
            <dcx-web-badge value="2" size="sm" severity="primary"></dcx-web-badge>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Overlay sobre icono</span>
          </div>
          <p class="demo-section__desc">
            Posicionar el badge en la esquina del icono usando <code>position: absolute</code>.
          </p>
          <div class="demo-section__body" style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
            <div style="position:relative; display:inline-flex;">
              <dcx-web-badge value="2" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;"></dcx-web-badge>
              ${IconSvg('bell')}
            </div>
            <div style="position:relative; display:inline-flex;">
              <dcx-web-badge value="5" severity="danger" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;"></dcx-web-badge>
              ${IconSvg('envelope')}
            </div>
            <div style="position:relative; display:inline-flex;">
              <dcx-web-badge severity="danger" style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;"></dcx-web-badge>
              ${IconSvg('calendar')}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Overlay sobre botón</span>
          </div>
          <p class="demo-section__desc">
            Cuando el badge decora un botón que ya describe su contenido, usa
            <code>aria-hidden="true"</code> para evitar la doble lectura por parte del lector
            de pantalla.
          </p>
          <div class="demo-section__body" style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
            <div style="position:relative; display:inline-flex;">
              <dcx-web-badge
                value="2"
                aria-hidden="true"
                style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;"
              ></dcx-web-badge>
              <button class="mock-btn mock-btn-primary" aria-label="Notificaciones, 2 sin leer">
                ${IconSvg('bell')} Notificaciones
              </button>
            </div>
            <div style="position:relative; display:inline-flex;">
              <dcx-web-badge
                value="4"
                severity="danger"
                aria-hidden="true"
                style="position:absolute; top:0; right:0; transform:translate(50%,-50%); z-index:1;"
              ></dcx-web-badge>
              <button class="mock-btn mock-btn-secondary" aria-label="Bandeja, 4 mensajes sin leer">
                ${IconSvg('envelope')} Bandeja
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
