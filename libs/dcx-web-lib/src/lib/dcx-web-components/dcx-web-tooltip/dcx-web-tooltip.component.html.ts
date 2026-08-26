import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { DcxWebTooltip } from './dcx-web-tooltip.component';

export const template = (host: DcxWebTooltip) => {
  return html`
    <div class="tooltip-container">
      <slot></slot>
    </div>

    ${
      host.visible && (host.content || host.contentHtml)
        ? html`
          <div
            id="${host.tooltipId}"
            role="tooltip"
            class="${host.tooltipClasses}"
          >
            ${
              host.contentHtml
                ? html`
                  <div>
                    ${unsafeHTML(host.sanitizedHtml)}
                  </div>
                `
                : html`
                  ${host.content}
                `
            }

            <div class="tooltip-arrow"></div>
          </div>
        `
        : nothing
    }
  `;
};
