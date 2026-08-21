import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-scroll-top-down/dcx-web-scroll-top-down.component';

import type { DcxWebScrollTopDown } from '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-scroll-top-down/dcx-web-scroll-top-down.component';

@customElement('dcx-web-page-scroll-top-down')
export class DcxWebPageScrollTopDown extends LitElement {
  private readonly longContent = Array.from(
    { length: 12 },
    (_, index) => index + 1,
  );

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 1180px;
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
      max-width: 720px;
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
      flex-wrap: wrap;
      gap: var(--sp-4, 16px);
      align-items: stretch;
    }

    .scroll-shell {
      position: relative;
      width: 100%;
      max-width: 560px;
      height: 260px;
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-md, 6px);
      background: var(--bg-default, #ffffff);
      overflow: hidden;
    }

    .scroll-shell--sm {
      flex: 1 1 220px;
      max-width: none;
    }

    .scroll-shell__viewport {
      height: 100%;
      overflow: auto;
      padding: var(--sp-4, 16px);
    }

    .scroll-shell__viewport p {
      margin: 0 0 var(--sp-3, 12px);
      color: var(--text-muted, #696e75);
      font-size: var(--fs-sm, 12px);
    }

    .scroll-shell__fab {
      position: absolute;
      right: 12px;
      bottom: 12px;
      z-index: 2;
    }
  `;

  override firstUpdated() {
    const pairs = [
      ['d1', 'fab-d1'],
      ['s1', 'fab-s1'],
      ['s2', 'fab-s2'],
      ['s3', 'fab-s3'],
      ['s4', 'fab-s4'],
      ['d3', 'fab-d3'],
      ['d4', 'fab-d4'],
      ['d5', 'fab-d5'],
    ];

    pairs.forEach(([viewportId, fabId]) => {
      const viewport =
        this.shadowRoot?.getElementById(viewportId);

      const fab =
        this.shadowRoot?.getElementById(fabId) as DcxWebScrollTopDown | null;

      if (viewport && fab) {
        fab.container = viewport;
      }
    });
  }

  private renderContent(prefix = '') {
    return this.longContent.map(
      item => html`
        <p>
          ${prefix}${item}
        </p>
      `,
    );
  }

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Scroll Top Down
          </h1>

          <p class="demo-page-header__desc">
            Control flotante para desplazar la página o un contenedor al inicio y/o al final.
            Botones circulares accesibles que aparecen solo cuando hay scroll disponible
            y respetan <code>prefers-reduced-motion</code>.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <p class="demo-section__desc">
            Desplázate dentro del panel: aparecen los botones de subir y bajar.
          </p>

          <div class="demo-section__body">
            <div class="scroll-shell">
              <div id="d1" class="scroll-shell__viewport">
                ${this.renderContent(
                  'Contenido de ejemplo ',
                )}
              </div>

              <dcx-web-scroll-top-down
                id="fab-d1"
                class="scroll-shell__fab"
              >
              </dcx-web-scroll-top-down>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Sizes</span>
          </div>

          <p class="demo-section__desc">
            Tamaños S, M, L y XL (28 / 36 / 44 / 52 px).
          </p>

          <div class="demo-section__body demo-section__body--row">

            <div class="scroll-shell scroll-shell--sm">
              <div id="s1" class="scroll-shell__viewport">
                ${this.renderContent('S · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-s1"
                class="scroll-shell__fab"
                size="s"
                iconSize="s"
              >
              </dcx-web-scroll-top-down>
            </div>

            <div class="scroll-shell scroll-shell--sm">
              <div id="s2" class="scroll-shell__viewport">
                ${this.renderContent('M · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-s2"
                class="scroll-shell__fab"
                size="m"
                iconSize="s"
              >
              </dcx-web-scroll-top-down>
            </div>

            <div class="scroll-shell scroll-shell--sm">
              <div id="s3" class="scroll-shell__viewport">
                ${this.renderContent('L · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-s3"
                class="scroll-shell__fab"
                size="l"
                iconSize="m"
              >
              </dcx-web-scroll-top-down>
            </div>

            <div class="scroll-shell scroll-shell--sm">
              <div id="s4" class="scroll-shell__viewport">
                ${this.renderContent('XL · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-s4"
                class="scroll-shell__fab"
                size="xl"
                iconSize="m"
              >
              </dcx-web-scroll-top-down>
            </div>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Top only</span>
          </div>

          <div class="demo-section__body">
            <div class="scroll-shell">
              <div id="d3" class="scroll-shell__viewport">
                ${this.renderContent('Solo botón "ir arriba" · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-d3"
                class="scroll-shell__fab"
                .showBottom=${false}
              >
              </dcx-web-scroll-top-down>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Bottom only</span>
          </div>

          <div class="demo-section__body">
            <div class="scroll-shell">
              <div id="d4" class="scroll-shell__viewport">
                ${this.renderContent('Solo botón "ir abajo" · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-d4"
                class="scroll-shell__fab"
                .showTop=${false}
              >
              </dcx-web-scroll-top-down>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Sin scroll suave
            </span>
          </div>

          <p class="demo-section__desc">
            Con <code>smooth=false</code>
            el desplazamiento es instantáneo.
          </p>

          <div class="demo-section__body">
            <div class="scroll-shell">
              <div id="d5" class="scroll-shell__viewport">
                ${this.renderContent('Scroll instantáneo · ')}
              </div>

              <dcx-web-scroll-top-down
                id="fab-d5"
                class="scroll-shell__fab"
                .smooth=${false}
              >
              </dcx-web-scroll-top-down>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-scroll-top-down': DcxWebPageScrollTopDown;
  }
}