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
import {
  DcxButtonVariant,
  DcxNgButtonComponent,
  DcxPaginator,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-paginator',
  standalone: true,
  imports: [CommonModule, DcxNgButtonComponent],
  templateUrl: './dcx-ng-paginator.component.html',
  styleUrl: './dcx-ng-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPaginatorComponent {
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
    return Math.ceil(
      this.paginator().totalItems / this.paginator().itemsPerPage,
    );
  });

  hasPrevious = computed<boolean>(() => {
    return this.currentPage() > 1;
  });

  hasNext = computed<boolean>(() => {
    return this.currentPage() < this.totalPages();
  });

  firstItem = computed<number>(() => {
    return (this.currentPage() - 1) * this.paginator().itemsPerPage + 1;
  });

  lastItem = computed<number>(() => {
    return Math.min(
      this.currentPage() * this.paginator().itemsPerPage,
      this.paginator().totalItems,
    );
  });

  visiblePages = computed<(number | string)[]>(() => {
    return this.calculateVisiblePages();
  });

  constructor() {
    effect(() => {
      this.totalPagesChange.emit(this.totalPages());
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

  getButtonVariant(pageNum: number): DcxButtonVariant {
    return this.currentPage() === pageNum ? 'primary' : 'secondary';
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

  // Métodos privados
  private calculateVisiblePages(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const range = this.pagesAroundCurrent;
    const pages: (number | string)[] = [];

    const start = Math.max(1, current - range);
    const end = Math.min(total, current + range);

    // Primera página
    if (start > 1) {
      pages.push(1);
    }

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
    if (end < total) {
      pages.push(total);
    }

    return pages;
  }
}
