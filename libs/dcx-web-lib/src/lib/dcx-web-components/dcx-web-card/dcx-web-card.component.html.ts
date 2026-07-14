import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { DcxWebCard } from './dcx-web-card.component';

export function renderDcxWebCardTemplate(card: DcxWebCard) {
  return html`
    <div
      class="${card.cardClasses}"
      tabindex="${card.cardTabIndex ?? nothing}"
      role="${card.cardRole}"
      aria-disabled="${card.disabled}"
      aria-label="${card.effectiveAriaLabel ?? nothing}"
      @click="${card._handleCardClick}"
      @keydown="${card._handleCardClick}"
    >
      <div class="${card.innerClasses}" style="${styleMap(card.innerStyles)}">
        ${card.image
          ? html`
              <div class="dcx-card__image-container">
                <img
                  src="${card.image}"
                  alt="${card.imageAlt}"
                  class="dcx-card__image"
                />
              </div>
            `
          : nothing}

        <div class="dcx-card__body">

          ${card.hasHeader
            ? html`
                <div class="dcx-card__header">
                  <slot name="header"></slot>
                </div>
              `
            : (card.title || card.subtitle)
            ? html`
                <div class="dcx-card__header">
                  ${card.title ? html`<h3 class="dcx-card__title">${card.title}</h3>` : nothing}
                  ${card.subtitle ? html`<p class="dcx-card__subtitle">${card.subtitle}</p>` : nothing}
                </div>
              `
            : nothing}

          ${card.hasContent
            ? html`
                <div class="dcx-card__content">
                  <slot name="content"></slot>
                  <slot></slot>
                </div>
              `
            : nothing}

          ${card.hasFooter
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
