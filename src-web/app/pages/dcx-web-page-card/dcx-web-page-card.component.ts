import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-card/dcx-web-card.component';

const DEFAULT_ARGS = {
  align: 'start',
  bordered: false,
  borderStyle: 'solid',
  borderWidth: 1,
  disabled: false,
  image: 'https://picsum.photos/360/240',
  imageAlt: '',
  interactive: true,
  layout: 'vertical',
  maxContentWidth: '560px',
  maxImageWidth: '100%',
  shadow: 1,
  size: 'm',
  subtitle: 'Subtítulo de la carta',
  title: 'Título de la carta',
  accent: false,
};

@customElement('dcx-web-page-card')
export class DcxWebPageCard extends LitElement {
  @state() accessor _sliderVal = 82;

  private _handleSliderInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._sliderVal = Number(target.value);
  }

  static override styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
      --color-info: #12abdb;
    }

    .demo-page {
      width: 100%;
      max-width: 860px;
      margin: 0;
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

    .demo-section__body {
      padding: 20px 16px;
      width: 100%;
      box-sizing: border-box;
    }

    .card-demo-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
      align-items: stretch;
    }

    .card-demo-grid--2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    dcx-web-card {
      display: block;
      width: 100%;
    }

    .card-demo__header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .card-demo__header--space-between {
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    .card-demo__avatar {
      width: 40px;
      height: 40px;
      border-radius: 999px;
      background: #dbeafe;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--color-info, #12abdb);
      flex-shrink: 0;
    }

    .card-demo__name {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-dark, #2a2e33);
    }

    .card-demo__role {
      margin-top: 1px;
      font-size: 12px;
      color: var(--text-muted, #696e75);
    }

    .card-demo__title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-dark, #2a2e33);
    }

    .card-demo__subtitle {
      font-size: 13px;
      color: var(--text-muted, #696e75);
      margin-top: 0.25rem;
    }

    .card-demo__hr {
      border: 0;
      border-top: 1px solid var(--border-light, #e5e7eb);
      margin: 0.75rem 0;
    }

    .card-demo__stats {
      display: flex;
      gap: 1rem;
    }

    .card-demo__stat {
      flex: 1;
      background: var(--bg-surface, #f4f5f7);
      border-radius: 6px;
      padding: 0.5rem;
      text-align: center;
    }

    .card-demo__stat-val {
      font-size: 18px;
      font-weight: 700;
      color: var(--bg-primary, #0058ab);
    }

    .card-demo__stat-lbl {
      margin-top: 1px;
      font-size: 10px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
    }

    .card-demo__progress {
      margin: 0.75rem 0 0.25rem;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted, #696e75);
      width: 100%;
    }

    .card-demo__progress-val {
      color: var(--bg-primary, #0058ab);
      font-weight: 600;
    }

    .card-demo__slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      background: linear-gradient(
        to right,
        var(--bg-primary, #0058ab) 0%,
        var(--bg-primary, #0058ab) var(--slider-fill, 0%),
        #e5e7eb var(--slider-fill, 0%),
        #e5e7eb 100%
      );
      border-radius: 3px;
      outline: none;
      margin: 8px 0;
      cursor: pointer;
    }

    .card-demo__slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      background: var(--bg-primary, #0058ab);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .card-demo__slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      background: var(--bg-primary, #0058ab);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .card-demo__chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 999px;
      line-height: 1.2;
      white-space: nowrap;
    }

    .card-demo__chip--primary {
      background-color: var(--bg-primary, #0058ab);
      color: #ffffff;
    }

    .card-demo__chip--secondary {
      background-color: var(--text-muted, #696e75);
      color: #ffffff;
    }

    .card-demo__chip--success {
      background-color: var(--color-success, #16a34a);
      color: #ffffff;
    }

    .card-demo__chip--warning {
      background-color: var(--color-warn, #b45309);
      color: #ffffff;
    }

    .card-demo__kpi-val {
      margin: 0.5rem 0 0.25rem;
      font-size: 36px;
      line-height: 1;
      font-weight: 700;
      color: var(--text-dark, #2a2e33);
    }

    .card-demo__kpi-trend {
      margin: 0 0 0.25rem;
      font-size: 12px;
      font-weight: 600;
      color: var(--color-success, #16a34a);
    }

    .card-demo__kpi-lbl {
      margin: 0;
      font-size: 12px;
      color: var(--text-muted, #696e75);
    }

    .card-demo__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }

    .card-demo__actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .card-demo__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      height: 32px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
      font-family: inherit;
    }

    .card-demo__btn--primary {
      background: var(--bg-primary, #0058ab);
      color: white;
    }

    .card-demo__btn--primary:hover {
      background: #004482;
    }

    .card-demo__btn--secondary {
      background: white;
      border-color: #e5e7eb;
      color: #2a2e33;
    }

    .card-demo__btn--secondary:hover {
      background: #f9fafb;
      border-color: #d1d5db;
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
          <h1 class="demo-page-header__title">Card</h1>
          <p class="demo-page-header__desc">
            Tarjeta flexible con soporte de layouts, tamaños, bordes, sombras, acento y proyección de contenido mediante slots para header, content y footer.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Variantes de uso</span>
          </div>
          <div class="demo-section__body">
            <div class="card-demo-grid">

              <dcx-web-card
                .size=${DEFAULT_ARGS.size}
                .image=${DEFAULT_ARGS.image}
                .imageAlt=${DEFAULT_ARGS.imageAlt}
                .shadow=${DEFAULT_ARGS.shadow}
                ?interactive=${DEFAULT_ARGS.interactive}
                layout="vertical" align="start" maxContentWidth="100%"
                ?accent=${true}
              >
                <div slot="header" class="card-demo__header">
                  <div class="card-demo__avatar">MG</div>
                  <div>
                    <div class="card-demo__name">María García</div>
                    <div class="card-demo__role">Cloud Architect · Madrid</div>
                  </div>
                </div>
                <div slot="content">
                  <hr class="card-demo__hr" />
                  <div class="card-demo__stats">
                    <div class="card-demo__stat"><div class="card-demo__stat-val">12</div><div class="card-demo__stat-lbl">Proyectos</div></div>
                    <div class="card-demo__stat"><div class="card-demo__stat-val">98%</div><div class="card-demo__stat-lbl">Satisf.</div></div>
                    <div class="card-demo__stat"><div class="card-demo__stat-val">7</div><div class="card-demo__stat-lbl">Certif.</div></div>
                  </div>
                </div>
              </dcx-web-card>

              <dcx-web-card
                .size=${DEFAULT_ARGS.size}
                .image=${DEFAULT_ARGS.image}
                .imageAlt=${DEFAULT_ARGS.imageAlt}
                .shadow=${DEFAULT_ARGS.shadow}
                layout="vertical" align="start" maxContentWidth="100%"
                ?interactive=${true}
              >
                <div slot="header" class="card-demo__header card-demo__header--space-between">
                  <div class="card-demo__title">Cloud Migration</div>
                  <span class="card-demo__chip card-demo__chip--success">Activo</span>
                </div>
                <div slot="content">
                  <p style="margin-top:0.5rem;color:#696e75;">Migración de infraestructura on-premise a Azure para BNP Paribas.</p>
                  <div class="card-demo__progress"><span>Progreso</span><span class="card-demo__progress-val">${this._sliderVal}%</span></div>
                  <input 
                    type="range" 
                    class="card-demo__slider" 
                    min="0" max="100" 
                    .value=${String(this._sliderVal)}
                    style="--slider-fill: ${this._sliderVal}%"
                    @input=${this._handleSliderInput}
                  >
                </div>
                <div slot="footer">
                  <div class="card-demo__actions">
                    <button class="card-demo__btn card-demo__btn--primary">Ver detalle</button>
                  </div>
                </div>
              </dcx-web-card>

              <dcx-web-card
                .size=${DEFAULT_ARGS.size}
                .image=${DEFAULT_ARGS.image}
                .imageAlt=${DEFAULT_ARGS.imageAlt}
                .shadow=${DEFAULT_ARGS.shadow}
                layout="vertical" align="start" maxContentWidth="100%"
              >
                <div slot="header" class="card-demo__title">Satisfacción cliente</div>
                <div slot="content">
                  <div class="card-demo__kpi-val">98%</div>
                  <div class="card-demo__kpi-trend">↑ +1.2% este mes</div>
                  <div class="card-demo__kpi-lbl">Media de 24 proyectos activos</div>
                </div>
              </dcx-web-card>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Con etiquetas y acciones</span>
          </div>
          <div class="demo-section__body">
            <div class="card-demo-grid card-demo-grid--2">

              <dcx-web-card
                .size=${DEFAULT_ARGS.size} .shadow=${DEFAULT_ARGS.shadow}
                layout="vertical" align="start" maxContentWidth="100%"
                ?interactive=${true}
              >
                <div slot="header">
                  <div class="card-demo__title">SAP S/4HANA · Airbus</div>
                  <div class="card-demo__subtitle">Implementación de módulos FI/CO y MM en Airbus, incluyendo migración de datos históricos.</div>
                </div>
                <div slot="content">
                  <div class="card-demo__tags">
                    <span class="card-demo__chip card-demo__chip--primary">SAP</span>
                    <span class="card-demo__chip card-demo__chip--secondary">Finanzas</span>
                    <span class="card-demo__chip card-demo__chip--warning">En revisión</span>
                  </div>
                </div>
                <div slot="footer">
                  <div class="card-demo__actions">
                    <button class="card-demo__btn card-demo__btn--primary">Abrir</button>
                    <button class="card-demo__btn card-demo__btn--secondary">Archivar</button>
                  </div>
                </div>
              </dcx-web-card>

              <dcx-web-card
                .size=${DEFAULT_ARGS.size} .shadow=${DEFAULT_ARGS.shadow}
                layout="vertical" align="start" maxContentWidth="100%"
                ?interactive=${true}
              >
                <div slot="header">
                  <div class="card-demo__title">Data Platform · Renault</div>
                  <div class="card-demo__subtitle">Construcción de una plataforma centralizada de datos en Azure Synapse para operaciones.</div>
                </div>
                <div slot="content">
                  <div class="card-demo__tags">
                    <span class="card-demo__chip card-demo__chip--primary">Data & AI</span>
                    <span class="card-demo__chip card-demo__chip--secondary">Azure</span>
                    <span class="card-demo__chip card-demo__chip--success">Planificado</span>
                  </div>
                </div>
                <div slot="footer">
                  <div class="card-demo__actions">
                    <button class="card-demo__btn card-demo__btn--primary">Abrir</button>
                    <button class="card-demo__btn card-demo__btn--secondary">Archivar</button>
                  </div>
                </div>
              </dcx-web-card>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Tamaños</span>
          </div>
          <div class="demo-section__body">
            <div class="card-demo-grid">
              <dcx-web-card title="Small (s)"       subtitle="size = 's'" .image=${null} size="s"  layout="vertical" align="start" maxContentWidth="100%" .shadow=${1} ?interactive=${false}></dcx-web-card>
              <dcx-web-card title="Medium (m)"      subtitle="size = 'm'" .image=${null} size="m"  layout="vertical" align="start" maxContentWidth="100%" .shadow=${1} ?interactive=${false}></dcx-web-card>
              <dcx-web-card title="Large (l)"       subtitle="size = 'l'" .image=${null} size="l"  layout="vertical" align="start" maxContentWidth="100%" .shadow=${1} ?interactive=${false}></dcx-web-card>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Acento</span>
          </div>
          <div class="demo-section__body">
            <div class="card-demo-grid card-demo-grid--2">
              <dcx-web-card title="Sin acento"  subtitle="accent = false" .image=${null} size="m" maxContentWidth="100%" .shadow=${1} ?accent=${false} ?interactive=${false}></dcx-web-card>
              <dcx-web-card title="Con acento"  subtitle="accent = true"  .image=${null} size="m" maxContentWidth="100%" .shadow=${1} ?accent=${true}  ?interactive=${false}></dcx-web-card>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Sombras (shadow 0–3)</span>
          </div>
          <div class="demo-section__body">
            <div class="card-demo-grid">
              <dcx-web-card title="shadow 0" subtitle="Sin sombra"    .image=${null} size="s" maxContentWidth="100%" .shadow=${0} ?interactive=${false}></dcx-web-card>
              <dcx-web-card title="shadow 1" subtitle="Sombra suave"  .image=${null} size="s" maxContentWidth="100%" .shadow=${1} ?interactive=${false}></dcx-web-card>
              <dcx-web-card title="shadow 2" subtitle="Sombra media"  .image=${null} size="s" maxContentWidth="100%" .shadow=${2} ?interactive=${false}></dcx-web-card>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Deshabilitada</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-card
              title="Tarjeta deshabilitada"
              subtitle="disabled = true — sin interacción ni foco"
              .image=${DEFAULT_ARGS.image}
              .imageAlt=${DEFAULT_ARGS.imageAlt}
              size="m" layout="vertical" align="start" maxContentWidth="480px"
              .shadow=${1} ?disabled=${true}
            ></dcx-web-card>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-card': DcxWebPageCard;
  }
}
