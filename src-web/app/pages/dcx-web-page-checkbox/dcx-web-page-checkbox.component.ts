import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-checkbox/dcx-web-checkbox.component';
import type { DcxCheckbox } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/checkbox';

@customElement('dcx-web-page-checkbox')
export class DcxWebPageCheckbox extends LitElement {

  /* ================== DATA ================== */

  @state() private accessor singleCheck: DcxCheckbox[] = [
    { id: '1', label: 'Checkbox único', value: null }
  ];

  @state() private accessor errorCheck: DcxCheckbox[] = [
    { id: '1', label: 'Error', value: null, error: true, errorMessage: 'Error message' }
  ];

  @state() private accessor disabledCheck: DcxCheckbox[] = [
    { id: '1', label: 'Checkbox deshabilitado', value: null, disabled: true }
  ];

  @state() private accessor labelPositionsCheck: DcxCheckbox[] = [
    { id: '1', label: 'Izquierda', value: null, labelPosition: 'left' },
    { id: '2', label: 'Derecha', value: null, labelPosition: 'right' }
  ];

  @state() private accessor requiredCheck: DcxCheckbox[] = [
    { id: '1', label: 'Requerido', value: null, required: true }
  ];

  @state() private accessor groupCheck: DcxCheckbox[] = [
    { id: '1', label: 'Opción 1', value: null },
    { id: '2', label: 'Opción 2', value: null },
    { id: '3', label: 'Opción 3', value: null }
  ];

  /* ================== EVENTS ================== */

  private _changeLabel(e: CustomEvent<DcxCheckbox[]>) {
    this.groupCheck = e.detail.map(cb => ({
      ...cb,
      label:
        cb.value === true
          ? 'Válido'
          : cb.value === false
          ? 'Indeterminado'
          : 'Sin valor',
    }));
  }

  /* ================== STYLES ================== */

  static override styles = css`
    :host {
      display: block;
      padding: 32px;
      font-family: Inter, sans-serif;
    }

    .demo-page {
      max-width: 900px;
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

  /* ================== RENDER ================== */

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Checkbox (Web Component)</h1>
          <p class="demo-page-header__desc">
            Control de selección con tres estados (marcado, indeterminado, vacío),
            soporte de grupos, posición de label, estado de error y requerido.
          </p>
          <hr />
        </header>

        <!-- 01 Default -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox .options=${this.singleCheck ?? []}></dcx-web-checkbox>
          </div>
        </div>

        <!-- 02 Error -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Error</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox .options=${this.errorCheck ?? []}></dcx-web-checkbox>
          </div>
        </div>

        <!-- 03 Disabled -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Deshabilitado</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox .options=${this.disabledCheck ?? []}></dcx-web-checkbox>
          </div>
        </div>

        <!-- 04 Label -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Posición del label</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox .options=${this.labelPositionsCheck ?? []}></dcx-web-checkbox>
          </div>
        </div>

        <!-- 05 Required -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Requerido</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox .options=${this.requiredCheck ?? []}></dcx-web-checkbox>
          </div>
        </div>

        <!-- 06 Group -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Grupo (tres estados)</span>
          </div>
          <p class="demo-section__desc">
            Ciclo de estados: vacío → marcado → indeterminado → vacío.
          </p>
          <div class="demo-section__body">
            <dcx-web-checkbox .options=${this.groupCheck ?? []}></dcx-web-checkbox>
          </div>
        </div>

        <!-- 07 Dynamic -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Grupo con cambio dinámico</span>
          </div>
          <p class="demo-section__desc">
            El label se actualiza al cambiar el estado via (changeOptions).          
          </p>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.groupCheck ?? []}
              @changeOptions=${this._changeLabel}
            ></dcx-web-checkbox>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-checkbox': DcxWebPageCheckbox;
  }
}
