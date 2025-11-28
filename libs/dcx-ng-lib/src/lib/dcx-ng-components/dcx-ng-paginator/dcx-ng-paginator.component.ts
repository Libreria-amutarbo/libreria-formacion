import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-paginator.component.html',
  styleUrl: './dcx-ng-paginator.component.scss',
})
export class DcxNgPaginatorComponent {

  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Input() pageSelected = 1;
  @Input() nextButton = 'Siguiente';
  @Input() nextButtonDisabled = '';
  @Input() prevButton = 'Anterior';
  @Input() prevButtonDisabled = false;
  @Input() totalPages = 1;
  @Input() disabled = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();

  get hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  get isPrevDisabled(): boolean {
    return !this.hasPrevious || this.disabled || this.prevButtonDisabled;
  }

  get isNextDisabled(): boolean {
    return !this.hasNext || this.disabled || !!this.nextButtonDisabled;
  }

  goToPrevious() {
    if (!this.isPrevDisabled) {
      this.pageChange.emit(this.currentPage - 1);
      this.prevPage.emit();
    }
  }

  goToNext() {
    if (!this.isNextDisabled) {
      this.pageChange.emit(this.currentPage + 1);
      this.nextPage.emit();
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages && !this.disabled) {
      this.pageChange.emit(page);
    }
  }
}







