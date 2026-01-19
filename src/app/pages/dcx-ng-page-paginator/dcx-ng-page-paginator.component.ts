import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DcxNgPaginatorComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import { DcxNgSelectComponent } from '@dcx-ng-components/dcx-ng-lib';

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

  onPageChange(page: number) {
    this.currentPage = page;
  }

  togglePrevDisabled() {
    this.prevButtonDisabled = !this.prevButtonDisabled;
  }

  toggleNextDisabled() {
    this.nextButtonDisabled = this.nextButtonDisabled ? '' : 'disabled';
  }

  setTotalPages(pages: number) {
    this.totalPages = pages;
    this.currentPage = 1;
  }
  getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  itemsPerPageChange(event: string | number | null) {
    this.itemsPerPage = Number(event);
  }
}
