import { html } from 'lit';
import type { DcxWebPaginator } from './dcx-web-paginator.component';

export const template = (host: DcxWebPaginator) => {
  const pages = host.visiblePages;

  return html`
    <div class="dcx-paginator">
      <div class="dcx-paginator__row-meta">
        <div class="dcx-paginator__size">
          ${
            host.showItemsPerPageInfo
              ? html`
                <label
                  class="items-per-page-label"
                  for="dcx-paginator-size-select"
                >
                  Items por página:
                </label>

                <select
                  id="dcx-paginator-size-select"
                  class="dcx-paginator__size-select"
                  aria-label="Items por página"
                  .value="${String(host.selectedItemsPerPage)}"
                  @change="${host.onItemsPerPageSelect}"
                >
                  ${host.pageSizeOptions.map(
                    size => html`
                      <option value="${size}">
                        ${size}
                      </option>
                    `,
                  )}
                </select>
              `
              : null
          }
        </div>

        <nav
          class="dcx-paginator__pages"
          aria-label="Paginación de resultados"
        >
          ${
            host.limitedButtons
              ? html`
                <dcx-web-button
                  class="${host.prevNavClasses}"
                  variant="text"
                  .icon="${true}"
                  icon-name="chevron-double-left"
                  icon-size="m"
                  ariaLabel="Primera página"
                  ?disabled="${!host.hasPrevious}"
                  @buttonClick="${host.goToStart}"
                >
                </dcx-web-button>
              `
              : null
          }

          <dcx-web-button
            class="${host.prevNavClasses}"
            variant="text"
            .icon="${true}"
            icon-name="arrow-left"
            icon-size="m"
            ariaLabel="Página anterior"
            ?disabled="${!host.hasPrevious}"
            @buttonClick="${host.goToPrevious}"
          >
          </dcx-web-button>

          ${pages.map((page, index) =>
            host.isEllipsis(page)
              ? html`
                    <dcx-web-button
                      class="dcx-paginator__ellipsis"
                      label="..."
                      size="m"
                      variant="text"
                      ariaLabel="${
                        host.getEllipsisDirection(index, pages) < 0
                          ? 'Saltar páginas hacia atrás'
                          : 'Saltar páginas hacia adelante'
                      }"
                      @buttonClick="${() =>
                        host.goToPageRelative(
                          host.getEllipsisDirection(index, pages),
                        )}"
                    >
                    </dcx-web-button>
                  `
              : html`
                    <dcx-web-button
                      class="${host.getPageButtonClasses(page)}"
                      size="m"
                      variant="${host.getButtonVariant(
                        host.getPageNumber(page),
                      )}"
                      ariaLabel="${host.getPageAriaLabel(
                        host.getPageNumber(page),
                      )}"
                      ariaCurrent="${
                        host.getPageAriaCurrent(host.getPageNumber(page)) ?? ''
                      }"
                      label="${host.getButtonLabel(host.getPageNumber(page))}"
                      @buttonClick="${() =>
                        host.goToPage(host.getPageNumber(page))}"
                    >
                    </dcx-web-button>
                  `,
          )}

          <dcx-web-button
            class="${host.nextNavClasses}"
            variant="text"
            .icon="${true}"
            icon-name="arrow-right"
            icon-size="m"
            ariaLabel="Página siguiente"
            ?disabled="${!host.hasNext}"
            @buttonClick="${host.goToNext}"
          >
          </dcx-web-button>

          ${
            host.limitedButtons
              ? html`
                <dcx-web-button
                  class="${host.nextNavClasses}"
                  variant="text"
                  .icon="${true}"
                  icon-name="chevron-double-right"
                  icon-size="m"
                  ariaLabel="Última página"
                  ?disabled="${!host.hasNext}"
                  @buttonClick="${host.goToEnd}"
                >
                </dcx-web-button>
              `
              : null
          }
        </nav>

        <div
          class="items-per-page-info"
          aria-live="polite"
        >
          ${
            host.showItemsPerPageInfo
              ? html`
                ${host.firstItem}
                -
                ${host.lastItem}
                de
                ${host.paginator.totalItems}
              `
              : null
          }
        </div>
      </div>

      ${
        host.showPageInfo
          ? html`
            <div
              class="page-info"
              aria-live="polite"
            >
              Página ${host.currentPage} de ${host.totalPages}
            </div>
          `
          : null
      }
    </div>
  `;
};
