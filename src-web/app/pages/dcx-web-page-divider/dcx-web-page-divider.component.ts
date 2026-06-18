import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-divider/dcx-web-divider.component';

@customElement('dcx-web-page-divider')
export class DcxWebPageDivider extends LitElement {

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
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
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
      color: #696e75;
      margin: 0;
    }

    .demo-section__body {
      padding: 20px 16px;
    }

    .demo-label {
      font-size: 12px;
      color: #696e75;
      margin: 0;
    }

    .vertical-container {
      display: flex;
      gap: 16px;
      height: 120px;
      align-items: stretch;
    }

    .vertical-container p {
      margin: 0;
      align-self: center;
      font-size: 14px;
    }

    .vertical-size-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      height: 100%;
    }

    .vertical-thickness-grid {
      display: grid;
      grid-template-columns: repeat(4, auto);
      gap: 32px;
      height: 200px;
      align-items: flex-end;
    }

    .vertical-sizes-grid {
      display: flex;
      flex-direction: row;
      gap: 48px;
      height: 300px;
      align-items: flex-end;
    }

    .vertical-grid {
      display: flex;
      gap: 48px;
      height: 220px;
      align-items: flex-end;
    }

    .vertical-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      height: 100%;
    }

    .color-vertical-grid {
      display: flex;
      flex-direction: row;
      gap: 12px;
      height: 180px;
      align-items: stretch;
    }
  `;

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Divider (Web Component)</h1>
          <p class="demo-page-header__desc">
            Separador visual flexible para estructurar contenido.
            Soporta orientación horizontal y vertical, tamaños, estilos y etiqueta.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <!-- 01 DEFAULT -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <div class="demo-section__body">
            <p>Horizontal</p>
            <dcx-web-divider aria-label="Divisor horizontal"></dcx-web-divider>

            <p style="margin-top:16px;">Vertical</p>
            <div class="vertical-container">
              <p>Izquierda</p>
              <dcx-web-divider orientation="vertical" aria-label="Divisor vertical"></dcx-web-divider>
              <p>Derecha</p>
            </div>
          </div>
        </div>

        <!-- 02 — Horizontal — Todos los tamaños -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Horizontal — Todos los tamaños</span>
          </div>

          <div class="demo-section__body" style="display:flex; flex-direction:column; gap:16px;">
            
            <p class="demo-label">size="s"</p>
            <dcx-web-divider size="s" aria-label="Pequeño"></dcx-web-divider>
            
            <p class="demo-label">size="m"</p>
            <dcx-web-divider size="m" aria-label="Mediano"></dcx-web-divider>
            
            <p class="demo-label">size="l"</p>
            <dcx-web-divider size="l" aria-label="Grande"></dcx-web-divider>
            
            <p class="demo-label">size="xl"</p>
            <dcx-web-divider size="xl" aria-label="Extra grande"></dcx-web-divider>
            
            <p class="demo-label">size="auto"</p>
            <dcx-web-divider size="auto" aria-label="Auto"></dcx-web-divider>
          </div>
        </div>
        
        <!-- 03 — Vertical — Todos los tamaños -->

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Vertical — Todos los tamaños</span>
          </div>
          <p class="demo-section__desc">El contenedor padre necesita altura definida para que el divisor vertical sea visible.</p>

          <div class="demo-section__body">
            <div class="vertical-sizes-grid">
              <div class="vertical-size-col">
                <p class="demo-label">s</p>
                <dcx-web-divider size="s" orientation="vertical" aria-label="Pequeño"></dcx-web-divider>
              </div>

              <div class="vertical-size-col">
                <p class="demo-label">m</p>
                <dcx-web-divider size="m" orientation="vertical" aria-label="Mediano"></dcx-web-divider>
              </div>

              <div class="vertical-size-col">
                <p class="demo-label">l</p>
                <dcx-web-divider size="l" orientation="vertical" aria-label="Grande"></dcx-web-divider>
              </div>

              <div class="vertical-size-col">
                <p class="demo-label">xl</p>
                <dcx-web-divider size="xl" orientation="vertical" aria-label="Extra grande"></dcx-web-divider>
              </div>
              <div class="vertical-size-col">
                <p class="demo-label">auto</p>
                <dcx-web-divider size="auto" orientation="vertical" aria-label="Auto"></dcx-web-divider>
              </div>
            </div>
          </div>
        </div>

        <!-- 04 — Todos los tipos -->

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Todos los tipos</span>
          </div>

          <div class="demo-section__body" style="display:flex; flex-direction:column; gap:16px;">
            
            <p class="demo-label">type="default" — sólida</p>
            <dcx-web-divider type="default" aria-label="Sólida"></dcx-web-divider>
            
            <p class="demo-label">type="dot" — punteada</p>
            <dcx-web-divider type="dot" aria-label="Punteada"></dcx-web-divider>
            
            <p class="demo-label">type="dash" — discontinua</p>
            <dcx-web-divider type="dash" aria-label="Discontinua"></dcx-web-divider>
          </div>
        </div>

        <!-- 05 — Variantes de grosor -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Variantes de grosor</span>
          </div>

          <div class="demo-section__body">
            <div style="display:flex;gap:48px;">

              <div style="display:flex; flex-direction:column; gap:16px;flex:1;">
                <p class="demo-label">Horizontal</p>
                <p class="demo-label">0.1 rem</p>
                <dcx-web-divider thickness="0.1"></dcx-web-divider>
                <p class="demo-label">0.2 rem</p>
                <dcx-web-divider thickness="0.2"></dcx-web-divider>
                <p class="demo-label">0.4 rem</p>
                <dcx-web-divider thickness="0.4"></dcx-web-divider>
                <p class="demo-label">0.8 rem</p>
                <dcx-web-divider thickness="0.8"></dcx-web-divider>
              </div>

              <div class="vertical-thickness-grid">
                <p class="demo-label" style="grid-column:1/-1">Vertical</p>
                <div class="vertical-size-col">
                  <p class="demo-label">0.1 rem</p>
                  <dcx-web-divider thickness="0.1" orientation="vertical" aria-label="Grosor 0.1"></dcx-web-divider>
                </div>
                <div class="vertical-size-col">
                  <p class="demo-label">0.2 rem</p>
                  <dcx-web-divider thickness="0.2" orientation="vertical" aria-label="Grosor 0.2"></dcx-web-divider>
                </div>
                <div class="vertical-size-col">
                  <p class="demo-label">0.4 rem</p>
                  <dcx-web-divider thickness="0.4" orientation="vertical" aria-label="Grosor 0.4"></dcx-web-divider>
                </div>
                <div class="vertical-size-col">
                  <p class="demo-label">0.8 rem</p>
                  <dcx-web-divider thickness="0.8" orientation="vertical" aria-label="Grosor 0.8"></dcx-web-divider>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 06 — Variantes de color -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Variantes de color</span>
          </div>
          <p class="demo-section__desc">Sin <code>aria-label</code> ni <code>label</code>, los divisores son decorativos y tienen <code>aria-hidden="true"</code> automáticamente.</p>
          
          <div class="demo-section__body">
            <div style="display:flex; gap:32px;">
              <div style="display:flex; flex-direction:column; gap:12px; flex:1;">
                <p class="demo-label">Horizontal</p>
                <dcx-web-divider color="#e6f0ff"></dcx-web-divider>
                <dcx-web-divider color="#cfe0ff"></dcx-web-divider>
                <dcx-web-divider color="#b8d1ff"></dcx-web-divider>
                <dcx-web-divider color="#8ab1ff"></dcx-web-divider>
                <dcx-web-divider color="#5c8fff"></dcx-web-divider>
                <dcx-web-divider color="#2e6fff"></dcx-web-divider>
                <dcx-web-divider color="#155fff"></dcx-web-divider>
              </div>
              
              <div class="color-vertical-grid">
                <p class="demo-label" style="grid-column:1/-1">Vertical</p>
                <dcx-web-divider orientation="vertical" color="#e6f0ff"></dcx-web-divider>
                <dcx-web-divider orientation="vertical" color="#cfe0ff"></dcx-web-divider>
                <dcx-web-divider orientation="vertical" color="#b8d1ff"></dcx-web-divider>
                <dcx-web-divider orientation="vertical" color="#8ab1ff"></dcx-web-divider>
                <dcx-web-divider orientation="vertical" color="#5c8fff"></dcx-web-divider>
                <dcx-web-divider orientation="vertical" color="#2e6fff"></dcx-web-divider>
                <dcx-web-divider orientation="vertical" color="#155fff"></dcx-web-divider>
              </div>
            </div>
          </div>
        </div>

        <!-- 07 — Con etiqueta -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">With label</span>
          </div>

          <div class="demo-section__body" style="display:flex; flex-direction:column; gap:24px;">
            
            <div>
              <p class="demo-label">Horizontal</p>
              <dcx-web-divider label="Título sección"></dcx-web-divider>
            </div>

            <div>
              <p class="demo-label">Vertical</p>
              <div class="vertical-container">
                <p>Left</p>
                <dcx-web-divider orientation="vertical" label="OR"></dcx-web-divider>
                <p>Right</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-divider': DcxWebPageDivider;
  }
}