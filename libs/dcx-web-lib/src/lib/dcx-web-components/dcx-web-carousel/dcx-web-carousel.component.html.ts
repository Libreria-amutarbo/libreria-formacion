import { html, nothing } from 'lit';
import type { DcxWebCarousel } from './dcx-web-carousel.component';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

export const template = (context: DcxWebCarousel) => {
  return html`
    <div
      class="${context.carouselClass}"
      role="region"
      aria-roledescription="carousel"
      aria-label="${context.ariaLabel}"
      @keydown="${context.onKeydown}"
      @mouseenter="${context.pauseAutoplay}"
      @mouseleave="${context.resumeAutoplay}"
      @focusin="${context.pauseAutoplay}"
      @focusout="${context.resumeAutoplay}"
    >
      <div class="dcx-carousel__sr-only" aria-live="polite" aria-atomic="true">
        ${context.liveAnnouncement}
      </div>

      <div class="dcx-carousel__content">
        ${context.showNavigatorButtons && !context.isPrevDisabled
          ? html`
              <dcx-web-button
                variant="secondary"
                size="s"
                class="dcx-carousel__prev"
                @buttonClick="${context.prev}"
                aria-label="Diapositiva anterior"
              >
                <dcx-web-icon slot="dcx-icon" name="${context.currentIcon}"></dcx-web-icon>
              </dcx-web-button>
            `
          : nothing}

        <div class="dcx-carousel__container">
          <div
            class="dcx-carousel__items-wrapper"
            style="transform: ${context.wrapperTransform}; flex-direction: ${context.slideDirection};"
          >
            ${context.value.map(
              (item, index) => html`
                <div
                  class="dcx-carousel__item"
                  aria-hidden="${index !== context.currentPage ? 'true' : 'false'}"
                  aria-label="Diapositiva ${index + 1} de ${context.totalItems}"
                >
                  ${context.itemTemplate
                    ? context.itemTemplate(item, index)
                    : typeof item === 'object'
                    ? html`<pre>${JSON.stringify(item, null, 2)}</pre>`
                    : item}
                </div>
              `
            )}
          </div>
        </div>

        ${context.showNavigatorButtons && !context.isNextDisabled
          ? html`
              <dcx-web-button
                variant="secondary"
                size="s"
                class="dcx-carousel__next"
                @buttonClick="${context.next}"
                aria-label="Diapositiva siguiente"
              >
                <dcx-web-icon slot="dcx-icon" name="${context.nextIcon}"></dcx-web-icon>
              </dcx-web-button>
            `
          : nothing}
      </div>

      ${context.showIndicatorDots
        ? html`
            <div class="dcx-carousel__indicators" role="group" aria-label="Indicadores de diapositiva">
              ${context.value.map(
                (_, index) => html`
                  <dcx-web-button
                    type="button"
                    variant="terciary"
                    size="s"
                    class="${context.indicatorClass(index)}"
                    aria-label="Ir a la diapositiva ${index + 1}"
                    aria-pressed="${index === context.currentPage ? 'true' : 'false'}"
                    @buttonClick="${() => context.setPage(index)}"
                  ></dcx-web-button>
                `
              )}
            </div>
          `
        : nothing}
    </div>
  `;
};
