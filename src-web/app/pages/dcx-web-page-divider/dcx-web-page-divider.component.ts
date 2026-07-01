import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dcxWebPageDividerStyles } from './dcx-web-page-divider.component.styles';


import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-divider/dcx-web-divider.component';

@customElement('dcx-web-page-divider')
export class DcxWebPageDivider extends LitElement {

  static override styles = dcxWebPageDividerStyles;

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Divider (Web Component)</h1>
          <p class="demo-page-header__desc">
            Separador visual flexible para estructurar contenido. Soporta orientación horizontal y vertical, tamaños predefinidos, estilos de línea y etiqueta de texto.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

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

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Con etiqueta — Horizontal y Vertical</span>
          </div>

          <div class="demo-section__body" style="display:flex; flex-direction:column; gap:24px;">
            <div style="display:flex;flex-direction:column;gap:32px;">
              <div>
                <p class="demo-label">Horizontal</p>
                <dcx-web-divider label="Título de sección"></dcx-web-divider>
              </div>

              <div>
                <p class="demo-label">Vertical</p>
                <div class="vertical-container">
                  <p>Contenido izquierdo</p>
                  <dcx-web-divider label="o" orientation="vertical"></dcx-web-divider>
                  <p>Contenido derecho</p>
                </div>
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