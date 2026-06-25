import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-checkbox/dcx-web-checkbox.component';
import type { CheckboxOption } from '../../../../libs/dcx-web-lib/src';

@customElement('dcx-web-page-checkbox')
export class DcxWebPageCheckbox extends LitElement {

  // =========================
  // STATE (equivalente a signals)
  // =========================

  @state() private singleCheck: CheckboxOption[] = [
    { id: 'cb1', label: 'Checkbox', value: null }
  ];

  @state() private errorCheck: CheckboxOption[] = [
    {
      id: 'cb1',
      label: 'Checkbox con error',
      value: true,
      error: true,
      errorMessage: 'Error message'
    }
  ];

  @state() private disabledCheck: CheckboxOption[] = [
    {
      id: 'cb1',
      label: 'Checkbox deshabilitado',
      value: null,
      disabled: true
    }
  ];

  @state() private diferentsLabelPositionsCheck: CheckboxOption[] = [
    { id: 'cb1', label: 'Left label', value: null, labelPosition: 'left' },
    { id: 'cb2', label: 'Right label', value: null, labelPosition: 'right' },
  ];

  @state() private requiredCheck: CheckboxOption[] = [
    { id: 'cb1', label: 'Required checkbox', value: null, required: true }
  ];

  @state() private checkboxGroup: CheckboxOption[] = [
    { id: 'cb1', label: 'Option 1', value: null },
    { id: 'cb2', label: 'Option 2', value: true },
    { id: 'cb3', label: 'Option 3', value: false },
  ];

  // =========================
  // EVENTS
  // =========================

  private changeLabel(e: CustomEvent<CheckboxOption[]>) {
    const updated = e.detail.map(cb => ({
      ...cb,
      label:
        cb.value === true
          ? 'Válido'
          : cb.value === false
            ? 'Indeterminado'
            : 'Sin valor'
    }));

    this.checkboxGroup = updated;
  }

  // =========================
  // STYLES (simple demo page)
  // =========================

  static override styles = css`
    .demo-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .demo-page-header__title {
      font-size: 24px;
      font-weight: 700;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .demo-section__header {
      display: flex;
      gap: 8px;
      font-weight: 600;
    }

    .demo-section__body {
      padding: 8px 0;
    }
  `;

  // =========================
  // RENDER
  // =========================

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Checkbox</h1>
          <p class="demo-page-header__desc">
            Control de selección con tres estados, soporte de grupos, error y requerido.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        ${this._renderSection('01', 'Default',
      html`<dcx-web-checkbox .options=${this.singleCheck}></dcx-web-checkbox>`
    )}

        ${this._renderSection('02', 'Error',
      html`<dcx-web-checkbox .options=${this.errorCheck}></dcx-web-checkbox>`
    )}

        ${this._renderSection('03', 'Deshabilitado',
      html`<dcx-web-checkbox .options=${this.disabledCheck}></dcx-web-checkbox>`
    )}

        ${this._renderSection('04', 'Posición del label',
      html`<dcx-web-checkbox .options=${this.diferentsLabelPositionsCheck}></dcx-web-checkbox>`
    )}

        ${this._renderSection('05', 'Requerido',
      html`<dcx-web-checkbox .options=${this.requiredCheck}></dcx-web-checkbox>`
    )}

        ${this._renderSection('06', 'Grupo (tres estados)',
      html`<dcx-web-checkbox .options=${this.checkboxGroup}></dcx-web-checkbox>`,
      html`<p>Ciclo: vacío → marcado → indeterminado → vacío</p>`
    )}

        ${this._renderSection('07', 'Grupo con label dinámico',
      html`
            <dcx-web-checkbox
              .options=${this.checkboxGroup}
              @changeOptions=${this.changeLabel}
            ></dcx-web-checkbox>
          `,
      html`<p>El label cambia en función del estado</p>`
    )}

      </div>
    `;
  }

  private _renderSection(
    num: string,
    title: string,
    body: unknown,
    desc?: unknown
  ) {
    return html`
      <div class="demo-section">
        <div class="demo-section__header">
          <span>${num}</span>
          <span>${title}</span>
        </div>
        ${desc ? html`<div>${desc}</div>` : ''}
        <div class="demo-section__body">${body}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-checkbox': DcxWebPageCheckbox;
  }
}