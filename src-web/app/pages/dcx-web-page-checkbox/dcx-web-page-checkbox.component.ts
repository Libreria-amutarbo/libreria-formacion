import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-checkbox/dcx-web-checkbox.component';
import type { DcxCheckbox } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/checkbox';

type CheckboxStateKeys =
  | 'singleCheck'
  | 'errorCheck'
  | 'disabledCheck'
  | 'labelPositionsCheck'
  | 'requiredCheck'
  | 'groupCheck'
  | 'groupCheckDynamic';

@customElement('dcx-web-page-checkbox')
export class DcxWebPageCheckbox extends LitElement {

  @state() private accessor singleCheck: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Checkbox único' }
  ];

  @state() private accessor errorCheck: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Checkbox erróneo', error: true, errorMessage: 'Checkbox con error' }
  ];

  @state() private accessor disabledCheck: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Checkbox deshabilitado', disabled: true }
  ];

  @state() private accessor labelPositionsCheck: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Izquierda', labelPosition: 'left' },
    { id: '2', value: true, label: 'Derecha', labelPosition: 'right' }
  ];

  @state() private accessor requiredCheck: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Requerido', labelPosition: 'right', required: true }
  ];

  @state() private accessor groupCheck: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Válido', labelPosition: 'right' },
    { id: '2', value: false, label: 'Indeterminado', labelPosition: 'right' },
    { id: '3', value: null, label: 'Sin valor', labelPosition: 'right' }
  ];

  @state() private accessor groupCheckDynamic: DcxCheckbox[] = [
    { id: '1', value: true, label: 'Válido', labelPosition: 'right' },
    { id: '2', value: false, label: 'Indeterminado', labelPosition: 'right' },
    { id: '3', value: null, label: 'Sin valor', labelPosition: 'right' }
  ];

  private _updateState<K extends CheckboxStateKeys>(
    key: K,
    e: CustomEvent<DcxCheckbox[]>
  ) {
    this[key] = e.detail;
  }

  private _changeLabel(e: CustomEvent<DcxCheckbox[]>) {
    this.groupCheckDynamic = e.detail.map(cb => ({
      ...cb,
      label:
        cb.value === true
          ? 'Válido'
          : cb.value === false
            ? 'Indeterminado'
            : 'Sin valor',
    }));
  }

  static override styles = css`
    :host {
      display: block;
      padding: 32px;
      font-family: Inter, sans-serif;
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
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Checkbox</h1>
          <p class="demo-page-header__desc">
            Control de selección con tres estados (marcado, indeterminado, vacío), soporte de grupos, posición de label, estado de error y requerido.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.singleCheck}
              @changeOptions=${(e: any) => this._updateState('singleCheck', e)}
            ></dcx-web-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Error</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.errorCheck}
              @changeOptions=${(e: any) => this._updateState('errorCheck', e)}
            ></dcx-web-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Deshabilitado</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.disabledCheck}
              @changeOptions=${(e: any) => this._updateState('disabledCheck', e)}
            ></dcx-web-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Posición del label</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.labelPositionsCheck}
              @changeOptions=${(e: any) => this._updateState('labelPositionsCheck', e)}
            ></dcx-web-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Requerido</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.requiredCheck}
              @changeOptions=${(e: any) => this._updateState('requiredCheck', e)}
            ></dcx-web-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Grupo (tres estados)</span>
          </div>
          <p class="demo-section__desc">Ciclo de estados: vacío → marcado → indeterminado → vacío.</p>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.groupCheck}
              @changeOptions=${(e: any) => this._updateState('groupCheck', e)}
            ></dcx-web-checkbox>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Grupo con cambio de label dinámico</span>
          </div>
          <p class="demo-section__desc">El label se actualiza al cambiar el estado via <code>(changeOptions)</code>.</p>
          <div class="demo-section__body">
            <dcx-web-checkbox
              .options=${this.groupCheckDynamic}
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


