import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type PaginatorVariant = 'expand' | 'small';

@Component({
  selector: 'dcx-ng-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dcx-ng-paginator.component.html',
  styleUrl: './dcx-ng-paginator.component.scss',
})
export class DcxNgPaginatorComponent {
  
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() variant: PaginatorVariant = 'expand';
  @Input() nextButton: string = 'Next';
  @Input() prevButton: string = 'Previous';
  @Input() nextButtonDisabled: boolean = false;
  @Input() prevButtonDisabled: boolean = false;
  @Input() itemsPerPageOptions: number[] = [5, 10, 25, 50];
  @Input() showItemsPerPage: boolean = true;
  @Input() showTotalItems: boolean = true;
  @Input() ariaLabel: string = 'Pagination navigation';
  @Input() maxVisiblePages: number = 5;

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() onNextPage = new EventEmitter<void>();
  @Output() onPrevPage = new EventEmitter<void>();

  totalPages: number = 0;
  visiblePages: number[] = [];
  startItem: number = 0;
  endItem: number = 0;

  ngOnInit() {
    this.calculatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
    this.startItem = this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    this.calculateVisiblePages();
  }

  calculateVisiblePages() {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = Math.floor(this.maxVisiblePages / 2);

    let start = Math.max(2, current - delta);
    let end = Math.min(total - 1, current + delta);

    if (current - delta <= 1) {
      end = Math.min(total - 1, end + (1 - (current - delta)));
    }
    if (current + delta >= total) {
      start = Math.max(2, start - ((current + delta) - total + 1));
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    this.visiblePages = pages;
  }

  onPageClick(page: number) {
    if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageSelect(value: number) {
    this.itemsPerPage = value;
    this.currentPage = 1;
    this.calculatePagination();
    this.itemsPerPageChange.emit(value);
  }

  onPreviousClick() {
    if (!this.prevButtonDisabled && this.currentPage > 1) {
      this.onPageClick(this.currentPage - 1);
      this.onPrevPage.emit();
    }
  }

  onNextClick() {
    if (!this.nextButtonDisabled && this.currentPage < this.totalPages) {
      this.onPageClick(this.currentPage + 1);
      this.onNextPage.emit();
    }
  }

  isEllipsisNeeded(position: 'start' | 'end'): boolean {
    if (this.totalPages <= this.maxVisiblePages) return false;
    if (position === 'start') {
      return this.visiblePages[0] > 2;
    } else {
      return this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1;
    }
  }

  getPageAriaLabel(page: number): string {
    return `Go to page ${page}`;
  }

  getPrevButtonAriaLabel(): string {
    return `Go to previous page, page ${this.currentPage - 1}`;
  }

  getNextButtonAriaLabel(): string {
    return `Go to next page, page ${this.currentPage + 1}`;
  }
}




  


