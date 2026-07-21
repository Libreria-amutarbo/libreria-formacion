import { html, nothing } from 'lit';
import type { DcxWebStepper } from './dcx-web-stepper.component';

export function renderDcxWebStepperTemplate(stepper: DcxWebStepper) {
  return html`
    <nav
      class="${stepper.stepperClasses}"
      aria-label="${stepper.ariaLabel ?? ''}"
    >
      <ol
        class="${stepper.headerClasses}"
        role="list"
      >
        ${stepper.steps.map(
          (step, idx) => html`
            <li class="dcx-stepper__item">
              <button
                type="button"
                class="${stepper.getStepClasses(step)}"
                ?disabled="${step.disabled}"
                aria-current="${stepper.isActive(step.id) ? 'step' : nothing}"
                tabindex="${stepper.isActive(step.id) ? 0 : -1}"
                @click="${() => stepper.onStepClick(step, idx)}"
                @keydown="${(event: KeyboardEvent) =>
                  stepper.onStepKeydown(event, step, idx)}"
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
                        : stepper.showStepNumbers
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
              idx < stepper.steps.length - 1
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
        stepper.activeStepContent
          ? html`
            <div
              class="${stepper.contentClasses}"
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
