import { html, nothing } from 'lit';

import type { DcxWebToast } from './dcx-web-toast.component';

export const template = (host: DcxWebToast) => html`
  <div
    class="dcx-toast-outlet dcx-toast-outlet--${host.position}"
    aria-live="polite"
  >
    ${host.toasts.map(
      toast => html`
        <div
          class="${host.getToastClasses(toast)}"
          role="${host.getRole(toast)}"
          @mouseenter="${() => host.pause(toast.id)}"
          @mouseleave="${() => host.resume(toast.id)}"
          @focusin="${() => host.pause(toast.id)}"
          @focusout="${() => host.resume(toast.id)}"
        >
          <dcx-web-message
            class="dcx-toast__message-content"
            .body="${toast.message}"
            .type="${host.getResolvedMessageType(toast)}"
            .icon="${true}"
            .iconName="${host.getResolvedIconName(toast)}"
            .announce="${false}"
          >
          </dcx-web-message>

          ${
            host.hasAction(toast)
              ? html`
                <dcx-web-button
                  class="dcx-toast__action"
                  .label="${toast.actionLabel || ''}"
                  .icon="${!!toast.actionIconName?.trim()}"
                  .iconName="${toast.actionIconName || ''}"
                  .ariaLabel="${host.getResolvedActionAriaLabel(toast)}"
                  variant="text"
                  size="m"
                  @buttonClick="${() => host.onAction(toast)}"
                >
                </dcx-web-button>
              `
              : nothing
          }

          ${
            host.isDismissible(toast)
              ? html`
                <dcx-web-button
                  class="dcx-toast__close"
                  .icon="${true}"
                  icon-name="x-lg"
                  icon-size="m"
                  aria-label="Cerrar"
                  variant="icon-only"
                  size="s"
                  @buttonClick="${() => host.dismiss(toast.id)}"
                >
                </dcx-web-button>
              `
              : nothing
          }
        </div>
      `,
    )}
  </div>
`;
