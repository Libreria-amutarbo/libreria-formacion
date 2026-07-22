import { html, nothing } from 'lit';
import type { DcxWebStepper } from './dcx-web-stepper.component';

export const template = (host: DcxWebStepper) => {
  return html`
    <nav
      class="${host.stepperClasses}"
      aria-label="${host.ariaLabel ?? ''}"
    >
      <ol
        class="${host.headerClasses}"
        role="list"
      >
        ${host.steps.map(
          (step, idx) => html`
            <li class="dcx-stepper__item">
              <button
                type="button"
                class="${host.getStepClasses(step)}"
                ?disabled="${step.disabled}"
                aria-current="${host.isActive(step.id) ? 'step' : nothing}"
                tabindex="${host.isActive(step.id) ? 0 : -1}"
                @click="${() => host.onStepClick(step, idx)}"
                @keydown="${(event: KeyboardEvent) =>
                  host.onStepKeydown(event, step, idx)}"
              >
                <div
                  class="dcx-stepper__step-indicator"
                >
                  ${
                    step.completed && !step.error
                      ? html`
                        <dcx-web-icon
                          name="check"
                          class="dcx-stepper__check-icon"
                          aria-hidden="true"
                        ></dcx-web-icon>

                        <span
                          class="visually-hidden"
                        >
                          Completado
                        </span>
                      `
                      : step.error
                        ? html`
                          <dcx-web-icon
                            name="exclamation-circle"
                            class="dcx-stepper__error-icon"
                            aria-hidden="true"
                          ></dcx-web-icon>

                          <span
                            class="visually-hidden"
                          >
                            Error
                          </span>
                        `
                        : host.showStepNumbers
                          ? html`
                            <span
                              class="dcx-stepper__number"
                            >
                              ${idx + 1}
                            </span>
                          `
                          : step.icon
                            ? html`
                              <dcx-web-icon
                                name="${step.icon}"
                                class="dcx-stepper__custom-icon"
                                aria-hidden="true"
                              ></dcx-web-icon>
                            `
                            : nothing
                  }
                </div>

                <div
                  class="dcx-stepper__step-label"
                >
                  <div
                    class="dcx-stepper__label-text"
                  >
                    ${step.label}
                  </div>

                  ${
                    step.description
                      ? html`
                        <div
                          class="dcx-stepper__label-description"
                        >
                          ${step.description}
                        </div>
                      `
                      : nothing
                  }

                  ${
                    step.optional
                      ? html`
                        <div
                          class="dcx-stepper__label-optional"
                        >
                          (opcional)
                        </div>
                      `
                      : nothing
                  }
                </div>
              </button>
            </li>

            ${
              idx < host.steps.length - 1
                ? html`
                  <div
                    class="dcx-stepper__divider ${
                      step.completed ? 'dcx-stepper__divider--completed' : ''
                    }"
                    aria-hidden="true"
                  ></div>
                `
                : nothing
            }
          `,
        )}
      </ol>

      ${
        host.activeStepContent
          ? html`
            <div
              class="${host.contentClasses}"
            >
              <slot
                name="step-content"
              ></slot>
            </div>
          `
          : nothing
      }
    </nav>
  `;
}
