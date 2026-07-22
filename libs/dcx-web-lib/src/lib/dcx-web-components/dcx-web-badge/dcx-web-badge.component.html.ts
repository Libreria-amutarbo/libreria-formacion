import { html } from 'lit';
import type { DcxWebBadge } from './dcx-web-badge.component';

export const template = (host: DcxWebBadge) => {
  const classes = `dcx-badge dcx-badge--${host.severity} dcx-badge--${host.size}`;

  return html`
    <span
      class="${classes}"
      role="${host.roleAttr || ''}"
      aria-label="${host.getComputedAriaLabel() || ''}"
      aria-hidden="${host.ariaHiddenAttr ? 'true' : 'false'}"
    >${host.value}</span>
  `;
};
