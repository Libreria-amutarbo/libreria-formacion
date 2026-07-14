import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { DcxSize } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/generic';
import type { DcxIconSpacing } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/icon';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-icon/dcx-web-icon.component';

@customElement('dcx-web-page-icon')
export class DcxWebPageIcon extends LitElement {
  override createRenderRoot() {
    return this;
  }

  readonly sizes: DcxSize[] = ['s', 'm', 'l', 'xl'];
  readonly spacings: DcxIconSpacing[] = ['none', 'compact', 'spacious'];
  readonly colors = ['#0058ab', '#16a34a', '#dc2626', '#d97706'];

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
  `;

  override render() {
    return html`
      <style>
        ${DcxWebPageIcon.styles}
      </style>
      <div class="demo-page">

        <!-- ── Page header ──────────────────────────────────────────────── -->
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Icon (Web Component)</h1>
          <p class="demo-page-header__desc">
            Wrapper sobre Bootstrap Icons. Renderiza un glifo con clases utilitarias
            para tamaño, espaciado y color, y gestiona la accesibilidad: decorativo
            por defecto, o significativo cuando se le asigna un nombre accesible.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <!-- ── 01 Default ───────────────────────────────────────────────── -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <p class="demo-section__desc">
            Icono decorativo (sin <code>aria-label</code>): se oculta a los lectores de
            pantalla con <code>aria-hidden="true"</code>.
          </p>
          <div class="demo-section__body">
            <dcx-web-icon name="gear"></dcx-web-icon>
          </div>
        </div>

        <!-- ── 02 Sizes ─────────────────────────────────────────────────── -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Sizes</span>
          </div>
          <div class="demo-section__body" style="display:flex;align-items:flex-end;gap:1.5rem;">
            ${this.sizes.map(
              (s) => html`
                <div style="display:flex;flex-direction:column;align-items:center;gap:.5rem;">
                  <dcx-web-icon name="heart" size=${s}></dcx-web-icon>
                  <small>${s}</small>
                </div>
              `
            )}
          </div>
        </div>

        <!-- ── 03 Spacing ───────────────────────────────────────────────── -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Spacing</span>
          </div>
          <div class="demo-section__body" style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start;">
            ${this.spacings.map(
              (sp) => html`
                <div style="background:#f4f5f7;border-radius:6px;padding:4px;">
                  <span style="background:#fff;">texto</span><dcx-web-icon name="star" spacing=${sp}></dcx-web-icon><span style="background:#fff;">${sp}</span>
                </div>
              `
            )}
          </div>
        </div>

        <!-- ── 04 Color ─────────────────────────────────────────────────── -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Color</span>
          </div>
          <p class="demo-section__desc">
            El color lo aporta el consumidor y debe cumplir un contraste ≥ 3:1 frente al fondo.
          </p>
          <div class="demo-section__body" style="display:flex;gap:1.5rem;">
            ${this.colors.map(
              (c) => html`
                <dcx-web-icon name="circle-fill" size="l" color=${c}></dcx-web-icon>
              `
            )}
          </div>
        </div>

        <!-- ── 05 Accessible ────────────────────────────────────────────── -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Accessible</span>
          </div>
          <p class="demo-section__desc">
            Con <code>aria-label</code>, el icono pasa a ser significativo (<code>role="img"</code> + <code>aria-label</code>).
          </p>
          <div class="demo-section__body">
            <dcx-web-icon name="gear" size="l" aria-label="Configuración"></dcx-web-icon>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-icon': DcxWebPageIcon;
  }
}
