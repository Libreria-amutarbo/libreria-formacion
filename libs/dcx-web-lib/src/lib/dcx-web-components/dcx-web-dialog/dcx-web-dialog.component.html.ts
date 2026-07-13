import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { DcxWebDialog } from './dcx-web-dialog.component';

export const dcxWebDialogTemplate = (component: DcxWebDialog) => {
  if (!component.visible) {
    return html``;
  }

  return html`
    <div class="dcx-dialog-root">
      <div
        class="dcx-dialog__backdrop"
        @pointerdown=${component.onBackdropClick.bind(component)}
      ></div>

      <div
        class="${component.dialogClasses}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="${ifDefined(
          component.title ? component.dialogTitleId : undefined,
        )}"
      >
        <div class="dcx-dialog__header">
          ${
            component.title
              ? html`
                  <h3
                    id="${component.dialogTitleId}"
                    class="dcx-dialog__title"
                  >
                    ${component.title}
                  </h3>
                `
              : null
          }

          ${
            component.showClose
              ? html`
                  <dcx-web-button
                    variant="icon-only"
                    size="s"
                    icon-name="x-lg"
                    class="dcx-dialog__close"
                    aria-label="Cerrar diálogo"
                    @buttonClick=${() => component.close()}
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