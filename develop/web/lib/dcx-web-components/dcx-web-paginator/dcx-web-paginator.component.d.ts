import { LitElement, PropertyValues } from 'lit';
import { DcxPaginator } from '../../core/interfaces/paginator';
export declare class DcxWebPaginator extends LitElement {
    accessor paginator: DcxPaginator;
    accessor showPageInfo: boolean;
    accessor showItemsPerPageInfo: boolean;
    accessor limitedButtons: boolean;
    accessor pageSizeOptions: readonly number[];
    accessor selectedItemsPerPage: number;
    accessor currentPage: number;
    static styles: import('lit').CSSResult;
    protected willUpdate(changedProperties: PropertyValues): void;
    emit(name: string, detail?: unknown): void;
    get totalPages(): number;
    get hasPrevious(): boolean;
    get hasNext(): boolean;
    get prevNavClasses(): string;
    get nextNavClasses(): string;
    get firstItem(): number;
    get lastItem(): number;
    get visiblePages(): (number | string)[];
    goToPrevious: () => void;
    goToNext: () => void;
    goToPage(page: number): void;
    goToStart: () => void;
    goToEnd: () => void;
    goToPageRelative(direction: number): void;
    getCurrentPage(pageNum: number): boolean;
    getPageButtonClasses(page: number | string): string;
    getButtonVariant(pageNum: number): "primary" | "text";
    getPageAriaCurrent(pageNum: number): 'page' | null;
    getPageAriaLabel(pageNum: number): string;
    getButtonLabel(page: number): string;
    getPageNumber(page: number | string): number;
    isEllipsis(page: number | string): page is "...";
    getEllipsisDirection(index: number, pages: (number | string)[]): 1 | -1;
    onItemsPerPageSelect(event: Event): void;
    onItemsPerPageChange(value: string): void;
    private calculateVisiblePages;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-paginator': DcxWebPaginator;
    }
}
