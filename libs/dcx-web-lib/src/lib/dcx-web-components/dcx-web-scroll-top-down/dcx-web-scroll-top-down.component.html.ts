import { html, nothing } from 'lit';
import type { DcxWebScrollTopDown } from './dcx-web-scroll-top-down.component';

export const template = (host: DcxWebScrollTopDown) => html`
  <div
    class="${host.scrollClasses}"
  >
    <div
      class="dcx-scroll-top-down__group"
      role="group"
      aria-label="${host.groupLabel}"
    >
      ${
        host.isTopVisible
          ? html`
            <button
              class="${host.buttonClasses('top')}"
              type="button"
              aria-label="${host.topLabel}"
              @click="${host.scrollToTop}"
            >
              <dcx-web-icon
                name="${host.topIcon}"
                size="${host.iconSize}"
                aria-hidden="true"
              >
              </dcx-web-icon>
            </button>
          `
          : nothing
      }

      ${
        host.isBottomVisible
          ? html`
            <button
              class="${host.buttonClasses('bottom')}"
              type="button"
              aria-label="${host.bottomLabel}"
              @click="${host.scrollToBottom}"
            >
              <dcx-web-icon
                name="${host.bottomIcon}"
                size="${host.iconSize}"
                aria-hidden="true"
              >
              </dcx-web-icon>
            </button>
          `
          : nothing
      }
    </div>
  </div>
`;
