import { html, nothing } from 'lit';
import type { DcxWebProgressbar } from './dcx-web-progressbar.component';

export const template = (
  host: DcxWebProgressbar,
) => html`
  <div
    class="dcx-progressbar
      ${host.isSegmentedVariant
        ? 'dcx-progressbar--segmented'
        : ''}
      ${host.isStepperVariant
        ? 'dcx-progressbar--stepper'
        : ''}"
  >
    ${host.isDefaultVariant || host.isSegmentedVariant
      ? html`
          ${host.showLabel
            ? html`
                <div
                  class="dcx-progressbar__header"
                  id="${host.labelId}"
                >
                  <span>${host.label}</span>
                  <span>
                    ${host.progressPercentage}%
                  </span>
                </div>
              `
            : nothing}

          <div
            class="dcx-progressbar__container"
          >
            <div
              class="dcx-progressbar__track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="${host.progressPercentage}"
              aria-valuetext="${host.progressPercentage}%"
              aria-labelledby="${host.showLabel
                ? host.labelId
                : nothing}"
              aria-label="${!host.showLabel
                ? host.ariaLabel || 'Progreso'
                : nothing}"
            >
              <div
                class="dcx-progressbar__fill"
                style="--progress-width:${host.progressPercentage}%"
                data-value="${host.progressPercentage}"
              ></div>

              ${host.isSegmentedVariant
                ? html`
                    <div
                      class="dcx-progressbar__segments"
                      aria-hidden="true"
                    >
                      ${host.segmentArray.map(
                        () => html`
                          <div
                            class="dcx-progressbar__segment"
                          ></div>
                        `,
                      )}
                    </div>
                  `
                : nothing}
            </div>

            ${host.showTooltip
              ? html`
                  <div
                    class="dcx-progressbar__tooltip"
                    aria-hidden="true"
                    style="--tooltip-position:${host.progressPercentage}%"
                  >
                    ${host.progressPercentage}%
                  </div>
                `
              : nothing}
          </div>
        `
      : nothing}

    ${host.isStepperVariant
      ? html`
          <div
            class="dcx-progressbar__stepper"
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax="${host.steps.length}"
            aria-valuenow="${host.currentStep}"
            aria-valuetext="${host.stepValueText}"
            aria-label="${host.ariaLabel ||
            'Progreso'}"
          >
            <div
              class="dcx-progressbar__stepper-track"
              aria-hidden="true"
            >
              <div
                class="dcx-progressbar__stepper-progress"
                style="--stepper-progress:${host.stepProgress}%"
              ></div>
            </div>

            <div class="dcx-progressbar__steps">
              ${host.steps.map(
                (step, index) => html`
                  <div
                    class="dcx-progressbar__step
                      ${host.isStepCompleted(index)
                        ? 'dcx-progressbar__step--completed'
                        : ''}
                      ${host.isStepActive(index)
                        ? 'dcx-progressbar__step--active'
                        : ''}"
                    aria-current="${host.isStepActive(
                      index,
                    )
                      ? 'step'
                      : nothing}"
                  >
                    <div
                      class="dcx-progressbar__step-circle"
                      aria-hidden="true"
                    >
                      ${host.showCheckmarks &&
                      host.isStepCompleted(index)
                        ? html`
                            <dcx-web-icon
                              class="dcx-progressbar__checkmark"
                              name="check"
                              size="m"
                              spacing="none"
                            ></dcx-web-icon>
                          `
                        : html`
                            <span
                              class="dcx-progressbar__step-number"
                            >
                              ${index + 1}
                            </span>
                          `}
                    </div>

                    ${step.label
                      ? html`
                          <span
                            class="dcx-progressbar__step-label"
                          >
                            ${step.label}
                          </span>
                        `
                      : nothing}
                  </div>
                `,
              )}
            </div>
          </div>
        `
      : nothing}
  </div>
`;