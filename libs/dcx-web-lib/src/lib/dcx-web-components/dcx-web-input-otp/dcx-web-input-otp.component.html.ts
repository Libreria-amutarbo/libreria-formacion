import { html, nothing } from 'lit';
import type { DcxWebInputOtp } from './dcx-web-input-otp.component';

export const template = (host: DcxWebInputOtp) => {
  return html`
    <div
      class="dcx-input-otp__group"
      role="group"
      aria-label="${host.ariaLabel}"
      aria-invalid="${String(host.invalid)}"
      aria-describedby="${host.describedBy ?? nothing}"
    >
      ${host.displayTokens.map(
        (token, index) => {

          const context =
            host.getTemplateContext(
              token,
              index,
            );

          if (
            host.inputTemplateRenderer
          ) {
            return host
              .inputTemplateRenderer(
                context,
              );
          }

          return html`
            <input
              class="${host.getInputClass(
                token,
              )}"
              type="${host.inputType}"
              inputmode="${host.inputMode}"
              autocomplete="one-time-code"
              maxlength="1"
              placeholder="${host.placeholder}"
              aria-label="${host.getAriaLabel(
                index,
              )}"
              ?disabled="${host.isDisabled}"
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

    ${host.showError
      ? html`
          <div
            class="dcx-input-otp__error"
            role="alert"
            id="${host.errorId}"
          >
            ${host.errorMessage}
          </div>
        `
      : nothing}
  `;
}