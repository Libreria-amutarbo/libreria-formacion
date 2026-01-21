import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DcxNgPaginatorComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import {
  DcxNgSelectComponent,
  DcxPaginator,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-paginator',
  standalone: true,
  imports: [FormsModule, DcxNgPaginatorComponent, DcxNgSelectComponent],
  templateUrl: './dcx-ng-page-paginator.component.html',
  styleUrl: './dcx-ng-page-paginator.component.scss',
})
export class DcxNgPagePaginatorComponent {
  itemsPerPage: number = 10;
  currentPage: number = 1;
  nextButtonDisabled: string = '';
  prevButtonDisabled: boolean = false;
  totalPages: number = 10;
  disabled: boolean = false;
  totalPagesKnown: number = 0;

  defaultPaginator: DcxPaginator = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 2,
  };

  selectPerPage: DcxPaginator = {
    totalItems: 21,
    itemsPerPage: 10,
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

  itemsPerPageChange(event: string | number | null) {
    this.selectPerPage = {
      ...this.selectPerPage,
      itemsPerPage: Number(event),
    };
  }

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
