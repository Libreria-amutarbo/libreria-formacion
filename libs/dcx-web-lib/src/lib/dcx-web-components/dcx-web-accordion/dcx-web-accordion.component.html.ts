import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { DcxWebAccordion } from './dcx-web-accordion.component';

export const template = (host: DcxWebAccordion) => {
  const accordionClasses = {
    'dcx-accordion': true,
    [`dcx-accordion--transition-${host.transition}`]: true,
    'dcx-accordion--flush': host.variant === 'flush',
  };

  return html`
    <div
      class="${classMap(accordionClasses)}"
      aria-label="${host.ariaLabel || nothing}"
    >
      ${host.items.map(item => {
        const isExpanded = host.isExpanded(item.id);
        const itemClasses = {
          'dcx-accordion__item': true,
          'dcx-accordion__item--disabled': !!item.disabled,
          'dcx-accordion__item--expanded': isExpanded,
        };
        const contentWrapperClasses = {
          'dcx-accordion__content-wrapper': true,
          'dcx-accordion__content-wrapper--expanded': isExpanded,
          'dcx-accordion__content-wrapper--disabled-content':
            !!item.disabledContent,
        };
        const contentClasses = {
          'dcx-accordion__content': true,
          'dcx-accordion__content--scrollable': !!item.maxContentHeight,
        };
        const contentStyles = {
          maxHeight: item.maxContentHeight || null,
        };

        return html`
            <div class="${classMap(itemClasses)}">
              <h3 class="dcx-accordion__heading">
                <button
                  class="dcx-accordion__header"
                  id="accordion-header-${item.id}"
                  aria-expanded="${isExpanded}"
                  aria-controls="accordion-content-${item.id}"
                  ?disabled="${item.disabled}"
                  @click="${() => host.toggleItem(item)}"
                  @keydown="${host.onHeaderKeydown}"
                >
                  ${
                    item.icon
                      ? html`
                        <span class="dcx-accordion__icon" aria-hidden="true">
                          ${host.renderIcon(item.icon)}
                        </span>
                      `
                      : nothing
                  }
                  <span class="dcx-accordion__title-group">
                    <span class="dcx-accordion__title">${item.title}</span>
                    ${
                      item.description
                        ? html`
                          <span class="dcx-accordion__description"
                            >${item.description}</span
                          >
                        `
                        : nothing
                    }
                  </span>
                  <span class="dcx-accordion__chevron" aria-hidden="true">
                    ${host.renderIcon('chevron-down')}
                  </span>
                </button>
              </h3>

              <div
                class="${classMap(contentWrapperClasses)}"
                id="accordion-content-${item.id}"
                aria-labelledby="accordion-header-${item.id}"
                aria-hidden="${!isExpanded}"
                role="region"
              >
                <div
                  class="${classMap(contentClasses)}"
                  style="${styleMap(contentStyles)}"
                >
                  ${
                    item.contentTemplate
                      ? typeof item.contentTemplate === 'function'
                        ? item.contentTemplate()
                        : item.contentTemplate
                      : item.content
                        ? unsafeHTML(item.content)
                        : ''
                  }
                </div>
              </div>
            </div>
          `;
      })}
    </div>
  `;
};
