import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-skeleton/dcx-web-skeleton.component';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-card/dcx-web-card.component';

@customElement('dcx-web-page-skeleton')
export class DcxWebPageSkeleton extends LitElement {
  readonly listItems = [1, 2, 3, 4];

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
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      font-size: var(--fs-sm, 12px);
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .example-stack {
      display: grid;
      gap: var(--sp-3, 12px);
      max-width: 32rem;
    }

    .shape-grid {
      display: grid;
      gap: var(--sp-5, 20px);
    }

    .shape-group {
      display: grid;
      gap: var(--sp-3, 12px);
      max-width: 24rem;
    }

    .inline-shapes {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--sp-3, 12px);
    }

    .text-lines {
      display: grid;
      gap: var(--sp-2, 8px);
      max-width: 28rem;
    }

    .card-header,
    .list-item {
      display: flex;
      align-items: center;
      gap: var(--sp-3, 12px);
    }

    .card-lines,
    .list-lines {
      display: grid;
      flex: 1;
      gap: var(--sp-2, 8px);
    }

    .card-actions {
      display: flex;
      justify-content: space-between;
      gap: var(--sp-3, 12px);
    }

    .list-placeholder {
      display: grid;
      gap: var(--sp-4, 16px);
      max-width: 28rem;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
  `;

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>

          <h1 class="demo-page-header__title">
            Skeleton
          </h1>

          <p class="demo-page-header__desc">
            Placeholder decorativo de carga (rectángulo o círculo,
            con animación de barrido opcional). Es puramente visual
            (<code>aria-hidden="true"</code>); el contenedor que
            compone varios skeletons es responsable de anunciar el
            estado de carga a lectores de pantalla.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Rectángulos</span>
          </div>

          <div class="demo-section__body">
            <div class="example-stack">
              <dcx-web-skeleton></dcx-web-skeleton>
              <dcx-web-skeleton width="18rem"></dcx-web-skeleton>
              <dcx-web-skeleton width="12rem"></dcx-web-skeleton>
              <dcx-web-skeleton height="2rem"></dcx-web-skeleton>
              <dcx-web-skeleton width="18rem" height="5rem"></dcx-web-skeleton>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Redondeados, cuadrados y círculos
            </span>
          </div>

          <div class="demo-section__body">
            <div class="shape-grid">

              <div class="shape-group">
                <dcx-web-skeleton width="18rem" borderRadius="16px"></dcx-web-skeleton>
                <dcx-web-skeleton width="12rem" borderRadius="16px"></dcx-web-skeleton>
                <dcx-web-skeleton width="18rem" height="4rem" borderRadius="16px"></dcx-web-skeleton>
              </div>

              <div class="inline-shapes">
                <dcx-web-skeleton size="2rem"></dcx-web-skeleton>
                <dcx-web-skeleton size="3rem"></dcx-web-skeleton>
                <dcx-web-skeleton size="4rem"></dcx-web-skeleton>

                <dcx-web-skeleton shape="circle" size="2rem"></dcx-web-skeleton>
                <dcx-web-skeleton shape="circle" size="3rem"></dcx-web-skeleton>
                <dcx-web-skeleton shape="circle" size="4rem"></dcx-web-skeleton>
              </div>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Líneas de texto</span>
          </div>

          <div class="demo-section__body">
            <div class="text-lines">
              <dcx-web-skeleton width="100%" height="0.875rem"></dcx-web-skeleton>
              <dcx-web-skeleton width="94%" height="0.875rem"></dcx-web-skeleton>
              <dcx-web-skeleton width="82%" height="0.875rem"></dcx-web-skeleton>
              <dcx-web-skeleton width="64%" height="0.875rem"></dcx-web-skeleton>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Avatar</span>
          </div>

          <div class="demo-section__body">
            <div class="inline-shapes">
              <dcx-web-skeleton shape="circle" size="1.5rem"></dcx-web-skeleton>
              <dcx-web-skeleton shape="circle" size="2.5rem"></dcx-web-skeleton>
              <dcx-web-skeleton shape="circle" size="3.5rem"></dcx-web-skeleton>
              <dcx-web-skeleton shape="circle" size="4.5rem"></dcx-web-skeleton>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Placeholder de tarjeta
            </span>
          </div>

          <p class="demo-section__desc">
            <code>role="status"</code> + texto oculto en el contenedor,
            no en cada skeleton.
          </p>

          <div class="demo-section__body">
            <div role="status" aria-busy="true">
              <span class="visually-hidden">Cargando…</span>

              <dcx-web-card
                .image=${null}
                ?bordered=${true}
                .shadow=${1}
                align="start"
                maxContentWidth="24rem"
                .interactive=${true}
              >
                <div slot="header" class="card-header">
                  <dcx-web-skeleton shape="circle" size="3rem"></dcx-web-skeleton>

                  <div class="card-lines">
                    <dcx-web-skeleton width="70%"></dcx-web-skeleton>
                    <dcx-web-skeleton width="42%" height="0.75rem"></dcx-web-skeleton>
                  </div>
                </div>

                <div slot="content">
                  <dcx-web-skeleton
                    width="100%"
                    height="9rem"
                    borderRadius="8px">
                  </dcx-web-skeleton>
                </div>

                <div slot="footer" class="card-actions">
                  <dcx-web-skeleton width="5rem" height="2rem"></dcx-web-skeleton>
                  <dcx-web-skeleton width="5rem" height="2rem"></dcx-web-skeleton>
                </div>
              </dcx-web-card>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Placeholder de lista
            </span>
          </div>

          <div class="demo-section__body">
            <div
              class="list-placeholder"
              role="status"
              aria-busy="true">

              <span class="visually-hidden">
                Cargando…
              </span>

              ${this.listItems.map(
      item => html`
                  <div class="list-item">
                    <dcx-web-skeleton
                      shape="circle"
                      size="3rem">
                    </dcx-web-skeleton>

                    <div class="list-lines">
                      <dcx-web-skeleton
                        width="100%"
                        height="0.875rem">
                      </dcx-web-skeleton>

                      <dcx-web-skeleton
                        width="72%"
                        height="0.875rem">
                      </dcx-web-skeleton>
                    </div>
                  </div>
                `,
    )}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Sin animación
            </span>
          </div>

          <div class="demo-section__body">
            <div class="example-stack">
              <dcx-web-skeleton animation="none"></dcx-web-skeleton>
              <dcx-web-skeleton width="82%" animation="none"></dcx-web-skeleton>
              <dcx-web-skeleton width="64%" animation="none"></dcx-web-skeleton>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-skeleton': DcxWebPageSkeleton;
  }
}