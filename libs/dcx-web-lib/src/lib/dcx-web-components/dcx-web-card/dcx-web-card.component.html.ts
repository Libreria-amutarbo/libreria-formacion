import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { DcxWebCard } from './dcx-web-card.component';

export const template = (host: DcxWebCard) => {
  return html`
    <div
      class="${host.cardClasses}"
      tabindex="${host.cardTabIndex ?? nothing}"
      role="${host.cardRole}"
      aria-disabled="${host.disabled}"
      aria-label="${host.effectiveAriaLabel ?? nothing}"
      @click="${host._handleCardClick}"
      @keydown="${host._handleCardClick}"
    >
      <div class="${host.innerClasses}" style="${styleMap(host.innerStyles)}">
        ${host.image
          ? html`
              <div class="dcx-card__image-container">
                <img
                  src="${host.image}"
                  alt="${host.imageAlt}"
                  class="dcx-card__image"
                />
              </div>
            `
          : nothing}

        <div class="dcx-card__body">

          ${host.hasHeader
            ? html`
                <div class="dcx-card__header">
                  <slot name="header"></slot>
                </div>
              `
            : (host.title || host.subtitle)
            ? html`
                <div class="dcx-card__header">
                  ${host.title ? html`<h3 class="dcx-card__title">${host.title}</h3>` : nothing}
                  ${host.subtitle ? html`<p class="dcx-card__subtitle">${host.subtitle}</p>` : nothing}
                </div>
              `
            : nothing}

          ${host.hasContent
            ? html`
                <div class="dcx-card__content">
                  <slot name="content"></slot>
                  <slot></slot>
                </div>
              `
            : nothing}

          ${host.hasFooter
            ? html`
                <div class="dcx-card__footer">
                  <slot name="footer"></slot>
                </div>
              `
            : nothing}

        </div>
      </div>
    </div>
  `;
}
