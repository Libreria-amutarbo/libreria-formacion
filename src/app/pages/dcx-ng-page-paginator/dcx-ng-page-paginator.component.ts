import { Component } from '@angular/core';
import {
  DcxPaginator,
  DcxNgPaginatorComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-paginator',
  standalone: true,
  imports: [DcxNgPaginatorComponent],
  templateUrl: './dcx-ng-page-paginator.component.html',
  styleUrl: './dcx-ng-page-paginator.component.scss',
})
export class DcxNgPagePaginatorComponent {
  totalPagesKnown = 0;

  defaultPaginator: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

  selectPerPage: DcxPaginator = {
    totalItems: 21,
    itemsPerPage: 5,
    currentPage: 1,
  };

  limitedPaginator: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

  knowPageSelected: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

  firstPageState: DcxPaginator = {
    totalItems: 120,
    itemsPerPage: 10,
    currentPage: 1,
  };

  middleWithEllipsis: DcxPaginator = {
    totalItems: 300,
    itemsPerPage: 10,
    currentPage: 12,
  };

  lastPageState: DcxPaginator = {
    totalItems: 120,
    itemsPerPage: 10,
    currentPage: 12,
  };

  onPageChange(page: number): void {
    this.knowPageSelected = {
      ...this.knowPageSelected,
      currentPage: page,
    };
  }

  onTotalPagesChange(totalPages: number): void {
    this.totalPagesKnown = totalPages;
  }
}
