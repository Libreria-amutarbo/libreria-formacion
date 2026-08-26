import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { styles } from './dcx-web-paginator.component.styles';
import { template } from './dcx-web-paginator.component.html';

import '../dcx-web-button/dcx-web-button.component';

import type { DcxPaginator } from '../../core/interfaces/paginator';
// Ajustar ruta según estructura real del proyecto

@customElement('dcx-web-paginator')
export class DcxWebPaginator extends LitElement {
  @property({ attribute: false })
  accessor paginator: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
  };

  @property({ type: Boolean })
  accessor showPageInfo = false;

  @property({ type: Boolean })
  accessor showItemsPerPageInfo = false;

  @property({ type: Boolean })
  accessor limitedButtons = false;

  @property({ attribute: false })
  accessor pageSizeOptions: readonly number[] = [5, 10, 20];

  @state()
  accessor selectedItemsPerPage = 10;

  @state()
  accessor currentPage = 1;

  static override styles = styles;

  /**
   * Mirrors Angular's effect() semantics: only sync internal state from
   * the paginator input when it actually changes, not on every render.
   * This prevents willUpdate from overwriting local state (currentPage,
   * selectedItemsPerPage) that was set by user interactions (goToPage,
   * onItemsPerPageChange) before the parent can feed back the new prop.
   */
  protected override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('paginator')) {
      this.selectedItemsPerPage = this.paginator.itemsPerPage;

      const validPage = Math.max(
        1,
        Math.min(this.paginator.currentPage, this.totalPages),
      );

      this.currentPage = validPage;
    }

    this.emit('totalPagesChange', this.totalPages);
  }

  emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  get totalPages(): number {
    return Math.ceil(this.paginator.totalItems / this.selectedItemsPerPage);
  }

  get hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  get prevNavClasses(): string {
    return this.hasPrevious
      ? 'dcx-paginator__button'
      : 'dcx-paginator__button dcx-paginator__button--disabled';
  }

  get nextNavClasses(): string {
    return this.hasNext
      ? 'dcx-paginator__button'
      : 'dcx-paginator__button dcx-paginator__button--disabled';
  }

  get firstItem(): number {
    return (this.currentPage - 1) * this.selectedItemsPerPage + 1;
  }

  get lastItem(): number {
    return Math.min(
      this.currentPage * this.selectedItemsPerPage,
      this.paginator.totalItems,
    );
  }

  get visiblePages(): (number | string)[] {
    return this.calculateVisiblePages();
  }

  goToPrevious = () => {
    if (!this.hasPrevious) return;

    this.currentPage--;

    this.emit('pageChange', this.currentPage);
  };

  goToNext = () => {
    if (!this.hasNext) return;

    this.currentPage++;

    this.emit('pageChange', this.currentPage);
  };

  goToPage(page: number) {
    this.currentPage = page;

    this.emit('pageChange', page);
  }

  goToStart = () => {
    this.goToPage(1);
  };

  goToEnd = () => {
    this.goToPage(this.totalPages);
  };

  goToPageRelative(direction: number) {
    const range = 2;

    const newPage = this.currentPage + (range + 1) * direction;

    const clampedPage = Math.max(1, Math.min(newPage, this.totalPages));

    this.goToPage(clampedPage);
  }

  getCurrentPage(pageNum: number): boolean {
    return this.currentPage === pageNum;
  }

  getPageButtonClasses(page: number | string): string {
    const pageNumber = this.getPageNumber(page);

    return this.getCurrentPage(pageNumber)
      ? 'dcx-paginator__page dcx-paginator__page--current'
      : 'dcx-paginator__page';
  }

  getButtonVariant(pageNum: number) {
    return this.currentPage === pageNum ? 'primary' : 'text';
  }

  getPageAriaCurrent(pageNum: number): 'page' | null {
    return this.currentPage === pageNum ? 'page' : null;
  }

  getPageAriaLabel(pageNum: number) {
    return this.currentPage === pageNum
      ? `Página ${pageNum}, página actual`
      : `Ir a la página ${pageNum}`;
  }

  getButtonLabel(page: number) {
    return page.toString();
  }

  getPageNumber(page: number | string) {
    return typeof page === 'number' ? page : 0;
  }

  isEllipsis(page: number | string) {
    return page === '...';
  }

  getEllipsisDirection(index: number, pages: (number | string)[]) {
    const currentPageIndex = pages.findIndex(page => page === this.currentPage);

    if (currentPageIndex === -1) {
      return 1;
    }

    return index < currentPageIndex ? -1 : 1;
  }

  onItemsPerPageSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.onItemsPerPageChange(value);
  }

  onItemsPerPageChange(value: string) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return;
    }

    this.selectedItemsPerPage = parsed;

    const validPage = Math.max(1, Math.min(this.currentPage, this.totalPages));

    if (validPage !== this.currentPage) {
      this.currentPage = validPage;

      this.emit('pageChange', validPage);
    }

    this.emit('itemsPerPageChange', parsed);
    this.emit('totalPagesChange', this.totalPages);
  }

  private calculateVisiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 1) return [1];

    const pagesAroundCurrent = 2;
    const maxVisibleNumbers = pagesAroundCurrent * 2 + 3;

    if (total <= maxVisibleNumbers) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    const middleNumbers = maxVisibleNumbers - 2;

    const middleHalf = Math.floor(middleNumbers / 2);

    const maxStart = total - middleNumbers;

    const start = Math.max(2, Math.min(current - middleHalf, maxStart));

    const end = start + middleNumbers - 1;

    const pages: (number | string)[] = [];

    pages.push(1);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-paginator': DcxWebPaginator;
  }
}
