import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-card/dcx-web-card.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-slider/dcx-web-slider.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-chip/dcx-web-chip.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-divider/dcx-web-divider.component';
import { pageCardStyles } from './dcx-web-page-card.component.styles';

const DEFAULT_ARGS = {
  align: 'center',
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
  size: 's',
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

  static override styles = pageCardStyles;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Card (Web Component)</h1>
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
                .interactive=${DEFAULT_ARGS.interactive}
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
                  <dcx-web-divider class="card-demo__hr" thickness="0.0625" color="var(--border-light, #d1d5db)"></dcx-web-divider>
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
                .interactive=${true}
              >
                <div slot="header" class="card-demo__header card-demo__header--space-between">
                  <div class="card-demo__title">Cloud Migration</div>
                  <dcx-web-chip label="Activo" color="success"></dcx-web-chip>
                </div>
                <div slot="content">
                  <p style="margin-top:var(--sp-2, 8px);color: var(--text-muted, #696e75);">Migración de infraestructura on-premise a Azure para BNP Paribas.</p>
                  <dcx-web-slider
                    textLabel="Progreso"
                    min="0"
                    max="100"
                    .value=${this._sliderVal}
                    valueSuffix="%"
                    step="1"
                    @valueChange=${(e: CustomEvent<number>) => this._sliderVal = e.detail}
                  ></dcx-web-slider>
                </div>
                <div slot="footer">
                  <div class="card-demo__actions" style="margin-top: var(--sp-4, 16px);">
                    <dcx-web-button label="Ver detalle" variant="primary"></dcx-web-button>
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
                  <div class="card-demo__kpi-value">98%</div>
                  <div class="card-demo__kpi-trend">↑ +1.2% este mes</div>
                  <div class="card-demo__kpi-label">Media de 24 proyectos activos</div>
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
                .interactive=${true}
              >
                <div slot="header">
                  <div class="card-demo__title">SAP S/4HANA · Airbus</div>
                  <div class="card-demo__subtitle">Implementación de módulos FI/CO y MM en Airbus, incluyendo migración de datos históricos.</div>
                </div>
                <div slot="content">
                  <div class="card-demo__tags">
                    <dcx-web-chip label="SAP" color="primary"></dcx-web-chip>
                    <dcx-web-chip label="Finanzas" color="secondary"></dcx-web-chip>
                    <dcx-web-chip label="En revisión" color="warning"></dcx-web-chip>
                  </div>
                </div>
                <div slot="footer">
                  <div class="card-demo__actions">
                    <dcx-web-button label="Abrir" variant="primary"></dcx-web-button>
                    <dcx-web-button label="Archivar" variant="secondary"></dcx-web-button>
                  </div>
                </div>
              </dcx-web-card>

              <dcx-web-card
                .size=${DEFAULT_ARGS.size} .shadow=${DEFAULT_ARGS.shadow}
                layout="vertical" align="start" maxContentWidth="100%"
                .interactive=${true}
              >
                <div slot="header">
                  <div class="card-demo__title">Data Platform · Renault</div>
                  <div class="card-demo__subtitle">Construcción de una plataforma centralizada de datos en Azure Synapse para operaciones.</div>
                </div>
                <div slot="content">
                  <div class="card-demo__tags">
                    <dcx-web-chip label="Data & AI" color="primary"></dcx-web-chip>
                    <dcx-web-chip label="Azure" color="secondary"></dcx-web-chip>
                    <dcx-web-chip label="Planificado" color="success"></dcx-web-chip>
                  </div>
                </div>
                <div slot="footer">
                  <div class="card-demo__actions">
                    <dcx-web-button label="Abrir" variant="primary"></dcx-web-button>
                    <dcx-web-button label="Archivar" variant="secondary"></dcx-web-button>
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
              <dcx-web-card title="Small (s)"       subtitle="size = 's'" .image=${null} size="s"  layout="vertical" align="start" maxContentWidth="100%" .shadow=${1} .interactive=${false}></dcx-web-card>
              <dcx-web-card title="Medium (m)"      subtitle="size = 'm'" .image=${null} size="m"  layout="vertical" align="start" maxContentWidth="100%" .shadow=${1} .interactive=${false}></dcx-web-card>
              <dcx-web-card title="Large (l)"       subtitle="size = 'l'" .image=${null} size="l"  layout="vertical" align="start" maxContentWidth="100%" .shadow=${1} .interactive=${false}></dcx-web-card>
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
              <dcx-web-card title="Sin acento"  subtitle="accent = false" .image=${null} size="m" maxContentWidth="100%" .shadow=${1} ?accent=${false} .interactive=${false}></dcx-web-card>
              <dcx-web-card title="Con acento"  subtitle="accent = true"  .image=${null} size="m" maxContentWidth="100%" .shadow=${1} ?accent=${true}  .interactive=${false}></dcx-web-card>
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
              <dcx-web-card title="shadow 0" subtitle="Sin sombra"    .image=${null} size="s" maxContentWidth="100%" .shadow=${0} .interactive=${false}></dcx-web-card>
              <dcx-web-card title="shadow 1" subtitle="Sombra suave"  .image=${null} size="s" maxContentWidth="100%" .shadow=${1} .interactive=${false}></dcx-web-card>
              <dcx-web-card title="shadow 2" subtitle="Sombra media"  .image=${null} size="s" maxContentWidth="100%" .shadow=${2} .interactive=${false}></dcx-web-card>
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
