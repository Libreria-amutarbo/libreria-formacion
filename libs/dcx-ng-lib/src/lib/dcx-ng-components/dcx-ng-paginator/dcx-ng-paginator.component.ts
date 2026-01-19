import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  output,
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
  totalItems = input<number>(100);
  currentPageInput = input<number>(1);
  currentPage = signal(0);
  pageSelected = input<number>(1);
  isNextButtonDisabled = input<boolean>(true);
  isPrevButtonDisabled = input<boolean>(true);

  disabled = input<boolean>(false);

  pageChange = output<number>();

  limitedButtons = input<boolean>(false);

  hasPrevious = computed<boolean>(() => {
    return this.currentPage() > 1;
  });
  hasNext = computed<boolean>(() => {
    return this.currentPage() < this.totalPages();
  });

  totalPages = computed<number>(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  });

  ngOnInit() {
    this.currentPage.set(this.currentPageInput());
  }

  goToPrevious() {
    if (this.hasPrevious()) {
      this.currentPage.update(value => value - 1);
      this.pageChange.emit(this.currentPage());
    }
  }

  goToNext() {
    if (this.hasNext()) {
      this.currentPage.update(value => value + 1);
      this.pageChange.emit(this.currentPage());
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

  goToStart() {
    this.currentPage.set(1);
  }
  goToEnd() {
    this.currentPage.set(this.totalPages());
  }
}
