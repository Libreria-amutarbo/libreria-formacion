import {
  LitElement,
  html,
  css,
} from 'lit';

import {
  customElement,
  state,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-paginator/dcx-web-paginator.component';

import type { DcxPaginator }
from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/paginator';
// Ajustar ruta según estructura real del proyecto

@customElement('dcx-web-page-paginator')
export class DcxWebPagePaginator extends LitElement {

  @state()
  accessor totalPagesKnown = 0;

  @state()
  accessor knowPageSelected: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

  @state()
    accessor defaultPaginator: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

    @state()
    accessor selectPerPage: DcxPaginator = {
    totalItems: 21,
    itemsPerPage: 5,
    currentPage: 1,
  };

    @state()
    accessor limitedPaginator: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

    @state()
    accessor firstPageState: DcxPaginator = {
    totalItems: 120,
    itemsPerPage: 10,
    currentPage: 1,
  };

    @state()
    accessor middleWithEllipsis: DcxPaginator = {
    totalItems: 300,
    itemsPerPage: 10,
    currentPage: 12,
  };

    @state()
    accessor lastPageState: DcxPaginator = {
    totalItems: 120,
    itemsPerPage: 10,
    currentPage: 12,
    };

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    .demo-page {
      width: 100%;
      max-width: 1100px;
      padding-bottom: var(--sp-12, 48px);
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--text-muted, #696e75);
      margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-dark, #2a2e33);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      color: var(--text-muted, #696e75);
      line-height: 1.65;
      max-width: 700px;
      margin: 0 0 var(--sp-5, 20px);
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      overflow: hidden;
      margin-bottom: var(--sp-5, 20px);
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      color: var(--text-muted, #696e75);
      font-size: var(--fs-sm, 12px);
      line-height: 1.55;
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .page-info-preview {
      margin-top: var(--sp-3, 12px);
      font-size: var(--fs-sm, 12px);
      color: var(--text-muted, #696e75);
    }
  `;

  private onPageChange(page: number) {
    this.knowPageSelected = {
      ...this.knowPageSelected,
      currentPage: page,
    };
  }

  private onTotalPagesChange(totalPages: number) {
    this.totalPagesKnown = totalPages;
  }

  private updateDefaultPaginator(page: number) {
    this.defaultPaginator = {
        ...this.defaultPaginator,
        currentPage: page,
    };
  }

    private updateSelectPaginator(page: number) {
    this.selectPerPage = {
        ...this.selectPerPage,
        currentPage: page,
    };
  }

    private updateLimitedPaginator(page: number) {
    this.limitedPaginator = {
        ...this.limitedPaginator,
        currentPage: page,
    };
  }

    private updateFirstPageState(page: number) {
    this.firstPageState = {
        ...this.firstPageState,
        currentPage: page,
    };
  }

    private updateMiddleWithEllipsis(page: number) {
    this.middleWithEllipsis = {
        ...this.middleWithEllipsis,
        currentPage: page,
    };
  }

    private updateLastPageState(page: number) {
    this.lastPageState = {
        ...this.lastPageState,
        currentPage: page,
    };
  }

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Paginator
          </h1>

          <p class="demo-page-header__desc">
            Controles de paginación accesibles:
            navegación anterior/siguiente,
            primera/última página opcional,
            números con elipsis, selector de items por
            página e información de rango y página actual.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>

          <dcx-web-paginator
            .paginator=${this.defaultPaginator}
            @pageChange=${(e: CustomEvent<number>) =>
                this.updateDefaultPaginator(e.detail)}
            >
          </dcx-web-paginator>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              With Selector
            </span>
          </div>

          <p class="demo-section__desc">
            Con showItemsPerPageInfo se muestra el
            selector de items por página y el
            rango visible.
          </p>

          <div class="demo-section__body">
            <dcx-web-paginator
                .paginator=${this.selectPerPage}
                .showItemsPerPageInfo=${true}
                @pageChange=${(e: CustomEvent<number>) =>
                    this.updateSelectPaginator(e.detail)}
                >
            </dcx-web-paginator>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Limited Buttons
            </span>
          </div>

          <p class="demo-section__desc">
            Limited buttons añade los controles
            para navegar al inicio y al final.
          </p>

          <div class="demo-section__body">
            <dcx-web-paginator
                .paginator=${this.limitedPaginator}
                .limitedButtons=${true}
                @pageChange=${(e: CustomEvent<number>) =>
                    this.updateLimitedPaginator(e.detail)}
                >
            </dcx-web-paginator>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              With Page Info
            </span>
          </div>

          <p class="demo-section__desc">
            Muestra la página actual y total de páginas.
          </p>

          <div class="demo-section__body">
            <dcx-web-paginator
              .showPageInfo=${true}
              .paginator=${this.knowPageSelected}
              @pageChange=${(e: CustomEvent<number>) =>
                this.onPageChange(e.detail)}
              @totalPagesChange=${(e: CustomEvent<number>) =>
                this.onTotalPagesChange(e.detail)}
            >
            </dcx-web-paginator>

            <div class="page-info-preview">
              Total páginas detectadas:
              ${this.totalPagesKnown}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              First Page State
            </span>
          </div>

          <p class="demo-section__desc">
            Estado inicial con navegación anterior
            deshabilitada.
          </p>

          <div class="demo-section__body">
            <dcx-web-paginator
                .paginator=${this.firstPageState}
                .limitedButtons=${true}
                @pageChange=${(e: CustomEvent<number>) =>
                    this.updateFirstPageState(e.detail)}
                >
            </dcx-web-paginator>

          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Middle With Ellipsis
            </span>
          </div>

          <p class="demo-section__desc">
            Demostración de elipsis navegables.
          </p>

          <div class="demo-section__body">
            <dcx-web-paginator
                .paginator=${this.middleWithEllipsis}
                .limitedButtons=${true}
                @pageChange=${(e: CustomEvent<number>) =>
                    this.updateMiddleWithEllipsis(e.detail)}
                >
            </dcx-web-paginator>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Last Page State
            </span>
          </div>

          <p class="demo-section__desc">
            Estado final con navegación siguiente
            deshabilitada.
          </p>

          <div class="demo-section__body">
            <dcx-web-paginator
                .paginator=${this.lastPageState}
                .limitedButtons=${true}
                @pageChange=${(e: CustomEvent<number>) =>
                    this.updateLastPageState(e.detail)}
                >
            </dcx-web-paginator>

          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-paginator': DcxWebPagePaginator;
  }
}