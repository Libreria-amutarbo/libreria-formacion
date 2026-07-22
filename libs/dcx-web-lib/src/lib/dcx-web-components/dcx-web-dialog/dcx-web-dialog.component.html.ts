import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { DcxWebDialog } from './dcx-web-dialog.component';

export const template = (host: DcxWebDialog) => {
  if (!host.visible) {
    return html``;
  }

  return html`
    <div class="dcx-dialog-root">
      <div
        class="dcx-dialog__backdrop"
        @pointerdown=${host.onBackdropClick.bind(host)}
      ></div>

      <div
        class="${host.dialogClasses}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="${ifDefined(
          host.title ? host.dialogTitleId : undefined,
        )}"
      >
        <div class="dcx-dialog__header">
          ${
            host.title
              ? html`
                  <h3
                    id="${host.dialogTitleId}"
                    class="dcx-dialog__title"
                  >
                    ${host.title}
                  </h3>
                `
              : null
          }

          ${
            host.showClose
              ? html`
                  <dcx-web-button
                    variant="icon-only"
                    size="s"
                    icon-name="x-lg"
                    class="dcx-dialog__close"
                    aria-label="Cerrar diálogo"
                    @buttonClick=${() => host.close()}
                  >
                  </dcx-web-button>
                `
              : null
          }
        </div>

        <div class="dcx-dialog__body">
          <slot name="body"></slot>
        </div>

        <div class="dcx-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  `;
};