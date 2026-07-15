import {
  LitElement,
  html,
  css,
  nothing,
} from 'lit';

import {
  customElement,
  state,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-input-otp/dcx-web-input-otp.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';
import type {
  DcxWebInputOtp,
} from '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-input-otp/dcx-web-input-otp.component';

@customElement('dcx-web-page-input-otp')
export class DcxWebPageInputOtp extends LitElement {

  @state()
  accessor defaultValue = '';

  @state()
  accessor maskedValue = '';

  @state()
  accessor numericValue = '123456';

  @state()
  accessor smallValue = '';

  @state()
  accessor mediumValue = '';

  @state()
  accessor largeValue = '';

  @state()
  accessor interactiveValue = '';

  @state()
  accessor completedCode = '';

  @state()
  accessor templateFormValue = '';

  @state()
  accessor templateFormSubmitted = false;

  @state()
  accessor sampleValue = '';

  @state()
  accessor reactiveValue = '';

  @state()
  accessor reactiveFormSubmitted = false;

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
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
      color: var(--text-dark, #2a2e33);
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

    .demo-types {
      display: flex;
      gap: var(--sp-4, 16px);
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .demo-sizes {
      display: flex;
      flex-direction: column;
      gap: var(--sp-4, 16px);
    }
  

    .example-stack {
      display: flex;
      flex-direction: column;
      gap: var(--sp-3, 12px);
    }

    .example-stack--aligned {
      align-items: flex-start;
    }

    .value-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      color: var(--text-muted, #696e75);
      font-size: var(--fs-base, 14px);
    }

    .value-preview {
      margin: 0;
      color: var(--text-muted, #696e75);
    }

    .error-preview {
      min-height: 1.125rem;
      margin: 0;
      color: var(--color-error, #dc2626);
      font-size: var(--fs-sm, 12px);
    }

    .demo-button {
      width: max-content;
      padding: var(--sp-2, 8px) 16px;
      border: 1px solid var(--border-input, #d1d5db);
      border-radius: var(--r-lg, 8px);
      background: white;
      cursor: pointer;
    }

    .demo-button--link {
      border: 0;
      padding: 0;
      background: transparent;
      color: var(--bg-primary, #0058ab);
    }

    .sample-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--sp-3, 12px);
      width: 100%;
      max-width: 420px;
      margin: 0 auto;
      text-align: center;
    }

    .sample-layout__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: 700;
    }

    .sample-layout__desc {
      margin: 0;
      color: var(--text-muted, #696e75);
    }

    .sample-layout__actions {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 12px;
    }

    .sample-layout__token-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .sample-layout__token-input {
      width: 52px;
      height: 56px;
      border: 1px solid var(--border-input, #d1d5db);
      border-radius: var(--r-lg, 8px);
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }

    .sample-layout__token-separator {
      color: var(--text-muted, #696e75);
      font-size: 18px;
    }
  `;

  private onCompleted(value: string) {
    this.completedCode = value;
  }

  private clearInteractiveCode() {
    this.interactiveValue = '';
    this.completedCode = '';

    const otp =
      this.renderRoot.querySelector(
        '#interactiveOtp',
      ) as DcxWebInputOtp | null;

    otp?.clear();
  }

  private isReactiveInvalid() {
    return (
      this.reactiveFormSubmitted &&
      this.reactiveValue.length < 4
    );
  }

  override render() {
    return html`

      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>

          <h1 class="demo-page-header__title">
            Input OTP
          </h1>

          <p class="demo-page-header__desc">
            Componente para introducir códigos de
            verificación en varias casillas,
            con soporte para navegación por teclado,
            modo numérico, enmascarado e integración
            con formularios Angular.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <p class="demo-section__desc">
            Caso base de 4 posiciones con actualización
            del valor agregado.
          </p>

          <div class="demo-section__body demo-section__body--narrow">
            <div class="example-stack">

              <dcx-web-input-otp
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.defaultValue = e.detail)}
              >
              </dcx-web-input-otp>

              <p class="value-preview">
                Valor:
                ${this.defaultValue || 'Sin completar'}
              </p>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Integer Only
            </span>
          </div>

          <p class="demo-section__desc">
            Restringe la entrada a dígitos y emite el
            código cuando se completa.
          </p>

          <div class="demo-section__body demo-section__body--narrow">
            <div class="example-stack">

              <dcx-web-input-otp
                .length=${6}
                .integerOnly=${true}
                aria-label="Código numérico de verificación"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.numericValue = e.detail)}
                @completed=${(e: CustomEvent<string>) =>
                  this.onCompleted(e.detail)}
              >
              </dcx-web-input-otp>

              <p class="value-preview">
                Valor: ${this.numericValue}
              </p>

              <p class="value-preview">
                Completado:
                ${this.completedCode || 'Pendiente'}
              </p>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Masked</span>
          </div>

          <p class="demo-section__desc">
            Oculta cada carácter introducido manteniendo
            el valor real disponible.
          </p>

          <div class="demo-section__body demo-section__body--narrow">
            <div class="example-stack">

              <dcx-web-input-otp
                .mask=${true}
                placeholder="•"
                aria-label="Código OTP enmascarado"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.maskedValue = e.detail)}
              >
              </dcx-web-input-otp>

              <p class="value-preview">
                Valor real:
                ${this.maskedValue || 'Sin completar'}
              </p>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Interactive
            </span>
          </div>

          <p class="demo-section__desc">
            Muestra el valor actual, el último código completado y permite limpiar el estado.
          </p>

          <div class="demo-section__body demo-section__body--narrow">
            <div class="example-stack">

              <dcx-web-input-otp
                id="interactiveOtp"
                .integerOnly=${true}
                aria-label="Código interactivo de verificación"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.interactiveValue = e.detail)}
                @completed=${(e: CustomEvent<string>) =>
                  this.onCompleted(e.detail)}
              >
              </dcx-web-input-otp>

              <div class="value-list">
                <span>
                  Valor actual:
                  ${this.interactiveValue ||
                  'Sin completar'}
                </span>

                <span>
                  Último código completo:
                  ${this.completedCode ||
                  'Pendiente'}
                </span>
              </div>

              <dcx-web-button
                label="Limpiar código"
                variant="secondary"
                @buttonClick=${() =>
                    this.clearInteractiveCode()}
                >
                </dcx-web-button>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Sizes
            </span>
          </div>

          <p class="demo-section__desc">
            El componente expone tamaños pequeño, medio y grande.
          </p>

          <div class="demo-section__body demo-section__body--narrow">
            <div class="example-stack example-stack--aligned">

              <dcx-web-input-otp
                size="small"
                aria-label="OTP small"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.smallValue = e.detail)}
              >
              </dcx-web-input-otp>

              <dcx-web-input-otp
                size="medium"
                aria-label="OTP medium"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.mediumValue = e.detail)}
              >
              </dcx-web-input-otp>

              <dcx-web-input-otp
                size="large"
                aria-label="OTP large"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.largeValue = e.detail)}
              >
              </dcx-web-input-otp>

            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Template-driven Form
            </span>
          </div>

          <p class="demo-section__desc">
            Integración con 'ngModel', validación requerida y feedback de error.
          </p>

          <div class="demo-section__body demo-section__body--narrow">

            <form
              class="example-stack"
              @submit=${(event: SubmitEvent) => {
                event.preventDefault();

                this.templateFormSubmitted =
                  true;

                if (
                !this.templateFormValue
                ) {
                return;
                }

                const otp =
                this.renderRoot.querySelector(
                    '#templateOtp',
                ) as DcxWebInputOtp | null;

                otp?.clear();

                this.templateFormValue = '';

                this.templateFormSubmitted =
                false;
              }}
            >

              <dcx-web-input-otp
                id="templateOtp"
                .integerOnly=${true}
                .invalid=${this.templateFormSubmitted &&
                !this.templateFormValue}
                aria-label="OTP con formulario template-driven"
                @valueChange=${(e: CustomEvent<string>) =>
                    (this.templateFormValue =
                    e.detail)}
                >
               </dcx-web-input-otp>

              <p class="error-preview">
                ${this.templateFormSubmitted &&
                !this.templateFormValue
                  ? 'Passcode is required.'
                  : ''}
              </p>

              <dcx-web-button
                label="Submit"
                variant="primary"
                @buttonClick=${() => {

                    this.templateFormSubmitted =
                    true;

                    if (
                    !this.templateFormValue
                    ) {
                    return;
                    }

                    const otp =
                    this.renderRoot.querySelector(
                        '#templateOtp',
                    ) as DcxWebInputOtp | null;

                    otp?.clear();

                    this.templateFormValue =
                    '';

                    this.templateFormSubmitted =
                    false;
                }}
                >
                </dcx-web-button>

            </form>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Reactive Form
            </span>
          </div>

          <p class="demo-section__desc">
            Ejemplo con formControlName, validadores y estado inválido derivado del formulario.
          </p>

          <div class="demo-section__body demo-section__body--narrow">

            <form
              class="example-stack"
              @submit=${(event: SubmitEvent) => {
                event.preventDefault();

                this.reactiveFormSubmitted =
                  true;

                if (
                this.reactiveValue.length < 4
                ) {
                return;
                }

                const otp =
                this.renderRoot.querySelector(
                    '#reactiveOtp',
                ) as DcxWebInputOtp | null;

                otp?.clear();

                this.reactiveValue = '';

                this.reactiveFormSubmitted =
                false;

              }}
            >

              <dcx-web-input-otp
                id="reactiveOtp"
                .integerOnly=${true}
                .invalid=${this.isReactiveInvalid()}
                aria-label="OTP con reactive forms"
                @valueChange=${(e: CustomEvent<string>) =>
                    (this.reactiveValue =
                    e.detail)}
                >
              </dcx-web-input-otp>

              <p class="error-preview">
                ${this.isReactiveInvalid()
                  ? 'Passcode is required.'
                  : ''}
              </p>

              <dcx-web-button
                label="Submit"
                variant="primary"
                @buttonClick=${() => {

                    this.reactiveFormSubmitted =
                    true;

                    if (
                    this.reactiveValue.length < 4
                    ) {
                    return;
                    }

                    const otp =
                    this.renderRoot.querySelector(
                        '#reactiveOtp',
                    ) as DcxWebInputOtp | null;

                    otp?.clear();

                    this.reactiveValue = '';

                    this.reactiveFormSubmitted =
                    false;
                }}
                >
                </dcx-web-button>

            </form>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">
              Sample Layout
            </span>
          </div>

          <p class="demo-section__desc">
            Composición más cercana a un flujo real de autenticación con 6 dígitos y acciones auxiliares.
          </p>

          <div class="demo-section__body">

            <div class="sample-layout">

              <div class="sample-layout__title">
                Authenticate Your Account
              </div>

              <p class="sample-layout__desc">
                Please enter the code sent to your phone.
              </p>

              <dcx-web-input-otp
                .length=${6}
                .integerOnly=${true}
                aria-label="Código de autenticación de 6 dígitos"
                @valueChange=${(e: CustomEvent<string>) =>
                  (this.sampleValue =
                    e.detail)}
              >
              </dcx-web-input-otp>

              <div class="sample-layout__actions">

                <dcx-web-button
                label="Resend Code"
                variant="tertiary"
                >
                </dcx-web-button>

                <button
                type="button"
                class="demo-button"
                >
                Submit Code
                </button>

              </div>

            </div>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">
              Disabled
            </span>
          </div>

          <p class="demo-section__desc">
            Casillas deshabilitadas mediante el atributo nativo disabled.
          </p>

          <div class="demo-section__body demo-section__body--narrow">

            <dcx-web-input-otp
              .disabled=${true}
              aria-label="Código deshabilitado"
            >
            </dcx-web-input-otp>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">
              Invalid
            </span>
          </div>

          <p class="demo-section__desc">
            Estado de error con mensaje anunciado (role="alert") y enlazado por aria-describedby.
          </p>

          <div class="demo-section__body demo-section__body--narrow">

            <dcx-web-input-otp
              .invalid=${true}
              role="alert"
              errorMessage="El código introducido no es correcto."
              aria-label="Código con error"
            >
            </dcx-web-input-otp>

          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-input-otp': DcxWebPageInputOtp;
  }
}