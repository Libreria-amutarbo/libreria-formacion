import { html, nothing } from 'lit';
import type { DcxWebIcon } from './dcx-web-icon.component';
import { styles } from './dcx-web-icon.component.styles';

export const template = (host: DcxWebIcon) => html`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    ${styles}
  </style>
  <i
    class="${host.iconClass}"
    aria-hidden="${host.decorative ? 'true' : nothing}"
    role="${host.decorative ? nothing : 'img'}"
    aria-label="${host.decorative ? nothing : host.ariaLabel}"
  ></i>
`;
