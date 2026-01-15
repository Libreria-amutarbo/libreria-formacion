import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
} from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-paginator',
  standalone: true,
  imports: [CommonModule, DcxNgButtonComponent],
  templateUrl: './dcx-ng-paginator.component.html',
  styleUrl: './dcx-ng-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPaginatorComponent {
  itemsPerPage = input<number>(10);
  currentPage = input<number>(1);
  pageSelected = input<number>(1);
  nextButtonDisabled = input<boolean>(false);
  prevButtonDisabled = input<boolean>(false);

  totalPages = input<number>(4);
  disabled = input<boolean>(false);

  hasPrevious = computed<boolean>(() => {
    return this.currentPage() > 1;
  });
  hasNext = computed<boolean>(() => {
    return this.currentPage() < this.totalPages();
  });

  @Output() pageChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();

  // get isPrevDisabled(): boolean {
  //   return !this.hasPrevious || this.disabled || this.prevButtonDisabled;
  // }

  // get isNextDisabled(): boolean {
  //   return !this.hasNext || this.disabled || !!this.nextButtonDisabled;
  // }

  goToPrevious() {
    if (!this.prevButtonDisabled()) {
      this.pageChange.emit(this.currentPage() - 1);
      this.prevPage.emit();
    }
  }

  goToNext() {
    if (!this.nextButtonDisabled()) {
      this.pageChange.emit(this.currentPage() + 1);
      this.nextPage.emit();
    }
  }

  goToPage(page: number) {
    if (
      page !== this.currentPage() &&
      page >= 1 &&
      page <= this.totalPages() &&
      !this.disabled
    ) {
      this.pageChange.emit(page);
    }
  }

  getCurrentPage(): boolean {
    return false;
  }
  getButtonLabel(index: number): string {
    return (this.currentPage() + index).toString();
  }
}
