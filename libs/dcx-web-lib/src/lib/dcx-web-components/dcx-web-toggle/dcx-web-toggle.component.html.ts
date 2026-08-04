import { html, nothing } from 'lit';
import type { DcxWebToggle } from './dcx-web-toggle.component';

export const template = (host: DcxWebToggle) => {
  return html`
    <button
      type="button"
      class="${host.getToggleClasses()}"
      role="switch"
      aria-checked="${host.checked}"
      aria-label="${host.effectiveAriaLabel}"
      ?disabled="${host.disabled}"
      @click="${host.toggle}"
    >
      <span class="dcx-toggle__track">
        <span
          class="dcx-toggle__thumb
            ${host.checked
              ? 'dcx-toggle__thumb--checked'
              : ''}"
        >
        </span>
      </span>

      ${host.label
        ? html`
            <span class="dcx-toggle__label">
              ${host.label}
            </span>
          `
        : nothing}
    </button>
  `;
};