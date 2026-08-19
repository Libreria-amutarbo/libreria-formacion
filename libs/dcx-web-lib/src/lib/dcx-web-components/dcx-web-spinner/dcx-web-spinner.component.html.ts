import { html, nothing } from 'lit';
import type { DcxWebSpinner } from './dcx-web-spinner.component';

export const template = (host: DcxWebSpinner) => {
  return html`
    <div
      class="${host.spinnerClasses()}"
      role="status"
      aria-live="polite"
      aria-label="${host.computedAriaLabel}"
    >
      ${
        !host.wrapper
          ? html`
            ${
              host.visible
                ? html`
                  <div
                    class="dcx-spinner__circle"
                    aria-hidden="true"
                  ></div>

                  ${
                    host.hasContent
                      ? html`
                        <div class="dcx-spinner__text">
                          ${
                            host.title
                              ? html`
                                <div class="dcx-spinner__title">
                                  ${host.title}
                                </div>
                              `
                              : nothing
                          }

                          ${
                            host.description
                              ? html`
                                <div class="dcx-spinner__description">
                                  ${host.description}
                                </div>
                              `
                              : nothing
                          }
                        </div>
                      `
                      : nothing
                  }
                `
                : nothing
            }
          `
          : html`
            <slot></slot>

            ${
              host.visible
                ? html`
                  <div class="dcx-spinner__overlay">
                    <div
                      class="dcx-spinner__circle"
                      aria-hidden="true"
                    ></div>

                    ${
                      host.title
                        ? html`
                          <span class="dcx-spinner__label">
                            ${host.title}
                          </span>
                        `
                        : nothing
                    }
                  </div>
                `
                : nothing
            }
          `
      }
    </div>
  `;
};
