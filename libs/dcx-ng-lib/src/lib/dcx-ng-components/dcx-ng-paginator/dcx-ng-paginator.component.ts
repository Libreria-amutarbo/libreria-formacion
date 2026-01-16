import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  DcxButtonVariant,
  DcxNgButtonComponent,
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
  itemsPerPage = input<number>(10);
  currentPageInput = input<number>(1);
  currentPage = signal(0);
  pageSelected = input<number>(1);
  isNextButtonDisabled = input<boolean>(true);
  isPrevButtonDisabled = input<boolean>(true);

  totalPages = input<number>(4);
  disabled = input<boolean>(false);

  @Output() pageChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();

  ngOnInit() {
    this.currentPage.set(this.currentPageInput());
  }

  hasPrevious = computed<boolean>(() => {
    return this.currentPage() > 1;
  });
  hasNext = computed<boolean>(() => {
    console.log(this.currentPage());
    return this.currentPage() < this.totalPages();
  });

  goToPrevious() {
    if (!this.isPrevButtonDisabled()) {
      this.currentPage.update(value => value - 1);
      this.pageChange.emit(this.currentPage());
      this.prevPage.emit();
    }
  }

  goToNext() {
    console.log(this.isNextButtonDisabled());
    if (!this.isNextButtonDisabled()) {
      this.currentPage.update(value => value + 1);
      this.pageChange.emit(this.currentPage());
      this.nextPage.emit();
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);

    this.pageChange.emit(this.currentPage());
  }

  getCurrentPage(pageNum: number): boolean {
    return this.currentPage() === pageNum;
  }
  getButtonVariant(pageNumb: number): DcxButtonVariant {
    return this.currentPage() === pageNumb ? 'primary' : 'secondary';
  }
  getButtonLabel(index: number): string {
    return index.toString();
  }
}
