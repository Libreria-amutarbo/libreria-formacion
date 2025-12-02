import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DcxNgPaginatorComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';

@Component({
    selector: 'app-dcx-ng-page-paginator',
    standalone: true,
    imports: [FormsModule, DcxNgPaginatorComponent],
    templateUrl: './dcx-ng-page-paginator.component.html',
    styleUrl: './dcx-ng-page-paginator.component.scss'
})
export class DcxNgPagePaginatorComponent {
    itemsPerPage: number = 10;
    currentPage: number = 1;
    pageSelected: number = 1;
    nextButton: string = 'Siguiente';
    nextButtonDisabled: string = '';
    prevButton: string = 'Anterior';
    prevButtonDisabled: boolean = false;
    totalPages: number = 10;
    disabled: boolean = false;

    onPageChange(page: number) {
        this.currentPage = page;
        this.pageSelected = page;
    }

    onNextPage() { }

    onPrevPage() { }

    togglePrevDisabled() {
        this.prevButtonDisabled = !this.prevButtonDisabled;
    }

    toggleNextDisabled() {
        this.nextButtonDisabled = this.nextButtonDisabled ? '' : 'disabled';
    }

    setTotalPages(pages: number) {
        this.totalPages = pages;
        this.currentPage = 1;
        this.pageSelected = 1;
    }
}