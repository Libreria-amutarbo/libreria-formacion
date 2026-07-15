import { html, nothing } from 'lit';
import type { DcxWebInputOtp } from './dcx-web-input-otp.component';

export function renderDcxWebInputOtpTemplate(
  component: DcxWebInputOtp,
) {
  return html`
    <div
      class="dcx-input-otp__group"
      role="group"
      aria-label="${component.ariaLabel}"
      aria-invalid="${String(component.invalid)}"
      aria-describedby="${component.describedBy ?? nothing}"
    >
      ${component.displayTokens.map(
        (token, index) => {

          const context =
            component.getTemplateContext(
              token,
              index,
            );

          if (
            component.inputTemplateRenderer
          ) {
            return component
              .inputTemplateRenderer(
                context,
              );
          }

          return html`
            <input
              class="${component.getInputClass(
                token,
              )}"
              type="${component.inputType}"
              inputmode="${component.inputMode}"
              autocomplete="one-time-code"
              maxlength="1"
              placeholder="${component.placeholder}"
              aria-label="${component.getAriaLabel(
                index,
              )}"
              ?disabled="${component.isDisabled}"
              .value="${token}"
              @focus="${(
                event: FocusEvent,
              ) =>
                context.events.focus(
                  event,
                )}"
              @blur="${(
                event: FocusEvent,
              ) =>
                context.events.blur(
                  event,
                )}"
              @input="${(
                event: Event,
              ) =>
                context.events.input(
                  event,
                )}"
              @keydown="${(
                event: KeyboardEvent,
              ) =>
                context.events.keydown(
                  event,
                )}"
              @paste="${(
                event: ClipboardEvent,
              ) =>
                context.events.paste(
                  event,
                )}"
            />
          `;
        },
      )}
    </div>

    ${component.showError
      ? html`
          <div
            class="dcx-input-otp__error"
            role="alert"
            id="${component.errorId}"
          >
            ${component.errorMessage}
          </div>
        `
      : nothing}
  `;
}