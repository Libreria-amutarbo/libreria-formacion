import { html, nothing } from 'lit';
import type { DcxWebMessage } from './dcx-web-message.component';

export const template = (host: DcxWebMessage) => {
    if (host.dismissed) {
        return nothing;
    }

    return html`
    <div
      class="dcx-message ${host.type}"
      role="${host.announce ? host.messageData.role : nothing}"
      aria-live="${host.announce
            ? host.messageData.ariaLive
            : nothing}"
    >
      ${host.icon
            ? html`
            <dcx-web-icon
              class="dcx-message__icon"
              name="${host.iconName ||
                host.messageData.icon}"
            >
            </dcx-web-icon>
          `
            : nothing}

      <div class="dcx-message__body">
        ${host.title
            ? html`
              <p class="dcx-message__title">
                ${host.title}
              </p>
            `
            : nothing}

        <p class="dcx-message__paragraph">
          ${host.body}
        </p>

        ${host.link
            ? html`
              <a
                href="${host.link}"
                class="           `
            : nothing}
      </div>

      ${host.showClose
            ? html`
            <dcx-web-button
              class="dcx-message__close"
              type="button"
              variant="icon-only"
              size="m"
              .icon="${true}"
              iconName="x"
              iconSize="m"
              ariaLabel="Cerrar"
              @buttonClick="${host.onClose}"
            >
            </dcx-web-button>
          `
            : nothing}
    </div>
  `;
};