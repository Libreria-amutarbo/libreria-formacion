import { html, nothing } from 'lit';
import type { DcxWebPopover } from './dcx-web-popover.component';

export const template = (host: DcxWebPopover) => {
  if (!host.isOpen) {
    return nothing;
  }

  return html`
    <div
      id="${host.panelId}"
      class="dcx-popover ${
        host.placement === 'top' ? 'dcx-popover--flipped' : ''
      }"
      role="${host.role}"
      aria-label="${host.ariaLabelledby ? nothing : host.ariaLabel || nothing}"
      aria-labelledby="${host.ariaLabelledby ?? nothing}"
      tabindex="-1"
      style="
        top:${host.top};
        left:${host.left};
        opacity:${host.isPositioned ? '1' : '0'};
      "
    >
      <span
        class="dcx-popover__arrow"
        aria-hidden="true"
        style="left:${host.arrowLeft}px"
      ></span>

      <div class="dcx-popover__content">
        <slot></slot>
      </div>
    </div>
  `;
};
