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
  itemsPerPage = 10;
  currentPage = 1;
  nextButtonDisabled = '';
  prevButtonDisabled = false;
  totalPages = 10;
  disabled = false;
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
    totalItems: 10,
    itemsPerPage: 2,
    currentPage: 2,
  };

  onPageChange(page: number) {
    this.knowPageSelected = {
      ...this.knowPageSelected,
      currentPage: page,
    };
  }

  onTotalPagesChange(totalPages: number) {
    this.totalPagesKnown = totalPages;
  }
}
