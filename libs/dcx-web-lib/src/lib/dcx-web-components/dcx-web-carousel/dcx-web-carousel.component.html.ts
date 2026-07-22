import { html, nothing } from 'lit';
import type { DcxWebCarousel } from './dcx-web-carousel.component';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

export const template = (host: DcxWebCarousel) => {
  return html`
    <div
      class="${host.carouselClass}"
      role="region"
      aria-roledescription="carousel"
      aria-label="${host.ariaLabel}"
      @keydown="${host.onKeydown}"
      @mouseenter="${host.pauseAutoplay}"
      @mouseleave="${host.resumeAutoplay}"
      @focusin="${host.pauseAutoplay}"
      @focusout="${host.resumeAutoplay}"
    >
      <div class="dcx-carousel__sr-only" aria-live="polite" aria-atomic="true">
        ${host.liveAnnouncement}
      </div>

      <div class="dcx-carousel__content">
        ${
          host.showNavigatorButtons && !host.isPrevDisabled
            ? html`
              <dcx-web-button
                variant="secondary"
                size="s"
                class="dcx-carousel__prev"
                @buttonClick="${host.prev}"
                aria-label="Diapositiva anterior"
              >
                <dcx-web-icon slot="dcx-icon" name="${host.currentIcon}"></dcx-web-icon>
              </dcx-web-button>
            `
            : nothing
        }

        <div class="dcx-carousel__container">
          <div
            class="dcx-carousel__items-wrapper"
            style="transform: ${host.wrapperTransform}; flex-direction: ${host.slideDirection};"
          >
            ${host.value.map(
              (item, index) => html`
                <div
                  class="dcx-carousel__item"
                  aria-hidden="${index !== host.currentPage ? 'true' : 'false'}"
                  aria-label="Diapositiva ${index + 1} de ${host.totalItems}"
                >
                  ${
                    host.itemTemplate
                      ? host.itemTemplate(item, index)
                      : typeof item === 'object'
                        ? html`<pre>${JSON.stringify(item, null, 2)}</pre>`
                        : item
                  }
                </div>
              `,
            )}
          </div>
        </div>

        ${
          host.showNavigatorButtons && !host.isNextDisabled
            ? html`
              <dcx-web-button
                variant="secondary"
                size="s"
                class="dcx-carousel__next"
                @buttonClick="${host.next}"
                aria-label="Diapositiva siguiente"
              >
                <dcx-web-icon slot="dcx-icon" name="${host.nextIcon}"></dcx-web-icon>
              </dcx-web-button>
            `
            : nothing
        }
      </div>

      ${
        host.showIndicatorDots
          ? html`
            <div class="dcx-carousel__indicators" role="group" aria-label="Indicadores de diapositiva">
              ${host.value.map(
                (_, index) => html`
                  <dcx-web-button
                    type="button"
                    variant="terciary"
                    size="s"
                    class="${host.indicatorClass(index)}"
                    aria-label="Ir a la diapositiva ${index + 1}"
                    aria-pressed="${index === host.currentPage ? 'true' : 'false'}"
                    @click="${() => host.setPage(index)}"
                  ></dcx-web-button>
                `,
              )}
            </div>
          `
          : nothing
      }
    </div>
  `;
};
