import { html, nothing } from 'lit';
import type { DcxWebChip } from './dcx-web-chip.component';

export const template = (host: DcxWebChip) => {
  const chipClasses = `dcx-chip dcx-chip--${host.color}`;
  const removeAriaLabel = host.label ? `Remover ${host.label}` : 'Remover chip';

  return html`
    <span
      class=${chipClasses}
      data-chip-type=${host.chipType}
      data-variant=${host.variant}
    >
      ${host.chipType === 'with-image'
        ? html`<img
            class="dcx-chip__image"
            src=${host.image}
            alt=${host.label || 'Chip image'}
            loading="lazy"
          />`
        : nothing}

      ${host.chipType === 'with-icon'
        ? html`<span class="dcx-chip__icon" aria-hidden="true">${host.renderIcon()}</span>`
        : nothing}

      ${host.label ? html`<span class="dcx-chip__label">${host.label}</span>` : nothing}

      ${host.showRemove
        ? html`<dcx-web-button
            class="dcx-chip__remove-button"
            variant="icon-only"
            size="s"
            icon-name="x"
            icon-size="l"
            aria-label=${removeAriaLabel}
            @click=${(e: Event) => host.handleRemove(e)}
          ></dcx-web-button>`
        : nothing}
    </span>
  `;
};
