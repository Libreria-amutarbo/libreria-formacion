import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { DcxPaginator, DcxButtonVariant } from '../../core/interfaces';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

@Component({
  selector: 'dcx-ng-paginator',
  standalone: true,
  imports: [CommonModule, DcxNgButtonComponent],
  templateUrl: './dcx-ng-paginator.component.html',
  styleUrl: './dcx-ng-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPaginatorComponent {
  readonly selectedItemsPerPage = signal(10);

  // Inputs
  paginator = input<DcxPaginator>({
    itemsPerPage: 10,
    totalItems: 100,
    currentPage: 1,
  });
  showPageInfo = input<boolean>(false);
  showItemsPerPageInfo = input<boolean>(false);
  limitedButtons = input<boolean>(false);

  // Signals
  currentPage = signal(0);

  // Outputs
  pageChange = output<number>();
  totalPagesChange = output<number>();

  // Configuración
  private readonly pagesAroundCurrent = 2;

  // Computeds
  totalPages = computed<number>(() => {
    return Math.ceil(this.paginator().totalItems / this.selectedItemsPerPage());
  });

  hasPrevious = computed<boolean>(() => {
    return this.currentPage() > 1;
  });

  hasNext = computed<boolean>(() => {
    return this.currentPage() < this.totalPages();
  });

  prevNavClasses = computed<string>(() =>
    this.hasPrevious()
      ? 'dcx-paginator__button'
      : 'dcx-paginator__button dcx-paginator__button--disabled',
  );

  nextNavClasses = computed<string>(() =>
    this.hasNext()
      ? 'dcx-paginator__button'
      : 'dcx-paginator__button dcx-paginator__button--disabled',
  );

  firstItem = computed<number>(() => {
    return (this.currentPage() - 1) * this.selectedItemsPerPage() + 1;
  });

  lastItem = computed<number>(() => {
    return Math.min(
      this.currentPage() * this.selectedItemsPerPage(),
      this.paginator().totalItems,
    );
  });

  visiblePages = computed<(number | string)[]>(() => {
    return this.calculateVisiblePages();
  });

  visiblePagesForView = computed<(number | string)[]>(() => this.visiblePages());

  constructor() {
    effect(() => {
      this.totalPagesChange.emit(this.totalPages());
    });

    effect(() => {
      this.selectedItemsPerPage.set(this.paginator().itemsPerPage);
    });

    effect(() => {
      const page = this.paginator().currentPage;
      const validPage = Math.max(1, Math.min(page, this.totalPages()));
      this.currentPage.set(validPage);
    });
  }

  goToPrevious(): void {
    if (this.hasPrevious()) {
      this.currentPage.update(value => value - 1);
      this.pageChange.emit(this.currentPage());
    }
  }

  goToNext(): void {
    if (this.hasNext()) {
      this.currentPage.update(value => value + 1);
      this.pageChange.emit(this.currentPage());
    }
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.pageChange.emit(this.currentPage());
  }

  goToStart(): void {
    this.goToPage(1);
  }

  goToEnd(): void {
    this.goToPage(this.totalPages());
  }

  goToPageRelative(direction: number): void {
    const range = this.pagesAroundCurrent;
    const newPage = this.currentPage() + (range + 1) * direction;
    const clampedPage = Math.max(1, Math.min(newPage, this.totalPages()));
    this.goToPage(clampedPage);
  }

  getCurrentPage(pageNum: number): boolean {
    return this.currentPage() === pageNum;
  }

  getNavigationButtonClasses(disabled: boolean): string {
    return disabled ? 'dcx-paginator__button dcx-paginator__button--disabled' : 'dcx-paginator__button';
  }

  getPageButtonClasses(page: number | string): string {
    const pageNumber = this.getPageNumber(page);
    return this.getCurrentPage(pageNumber) ? 'dcx-paginator__page dcx-paginator__page--current' : 'dcx-paginator__page';
  }

  getButtonVariant(pageNum: number): DcxButtonVariant {
    return this.currentPage() === pageNum ? 'primary' : 'text';
  }

  getButtonLabel(page: number): string {
    return page.toString();
  }

  getPageNumber(page: number | string): number {
    return typeof page === 'number' ? page : 0;
  }

  isEllipsis(page: number | string): boolean {
    return page === '...';
  }

  getEllipsisDirection(index: number, pages: (number | string)[]): number {
    const currentPageIndex = pages.findIndex(page => page === this.currentPage());

    if (currentPageIndex === -1) {
      return 1;
    }

    return index < currentPageIndex ? -1 : 1;
  }

  onItemsPerPageChange(value: string): void {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return;
    }

    this.selectedItemsPerPage.set(parsed);

    const validPage = Math.max(
      1,
      Math.min(this.currentPage(), this.totalPages()),
    );
    if (validPage !== this.currentPage()) {
      this.currentPage.set(validPage);
      this.pageChange.emit(validPage);
    }
  }

  // Métodos privados
  private calculateVisiblePages(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 1) {
      return [1];
    }

    const maxVisibleNumbers = this.pagesAroundCurrent * 2 + 3;

    if (total <= maxVisibleNumbers) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    const middleNumbers = maxVisibleNumbers - 2;
    const middleHalf = Math.floor(middleNumbers / 2);

    const maxStart = total - middleNumbers;
    const start = Math.max(2, Math.min(current - middleHalf, maxStart));
    const end = start + middleNumbers - 1;

    const pages: (number | string)[] = [];

    // Primera página
    pages.push(1);

    // Elipsis después de primera
    if (start > 2) {
      pages.push('...');
    }

    // Páginas del rango
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Elipsis antes de última
    if (end < total - 1) {
      pages.push('...');
    }

    // Última página
    pages.push(total);

    return pages;
  }
}
