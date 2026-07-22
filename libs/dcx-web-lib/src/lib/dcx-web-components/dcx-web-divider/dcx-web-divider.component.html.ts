import { html } from 'lit';
import type { DcxWebDivider } from './dcx-web-divider.component';

export const template = (host: DcxWebDivider) => {
  const ariaLabel = host.getComputedAriaLabel();
  const isHidden = host.isHidden();

  if (host.label) {
    return html`
      <div
        class="dcx-divider dcx-divider--labeled"
        role="separator"
        aria-orientation="${host.orientation}"
        aria-label="${ariaLabel}"
        aria-hidden="${isHidden ? 'true' : 'false'}"
      >
        <span class="dcx-divider__line" aria-hidden="true"></span>
        <span class="dcx-divider__label">${host.label}</span>
        <span class="dcx-divider__line" aria-hidden="true"></span>
      </div>
    `;
  }

  return html`
    <span
      class="dcx-divider"
      role="separator"
      aria-orientation="${host.orientation}"
      aria-label="${ariaLabel}"
      aria-hidden="${isHidden ? 'true' : 'false'}"
    ></span>
  `;
};
