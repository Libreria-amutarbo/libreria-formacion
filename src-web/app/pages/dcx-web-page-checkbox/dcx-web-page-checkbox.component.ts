
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dcxWebPageCheckboxStyles } from './dcx-web-page-checkbox.component.styles';


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

  static override styles = dcxWebPageCheckboxStyles;

  private _updateState<K extends CheckboxStateKeys>(
    key: K,
    e: CustomEvent<DcxCheckbox[]>
  ) {
      (this as any)[key] = e.detail;
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


