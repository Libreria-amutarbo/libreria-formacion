import { LitElement } from 'lit';
import { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from '../../core/interfaces/breadcrumb';
export declare class DcxWebBreadcrumb extends LitElement {
    readonly maxVisibleItems = 3;
    accessor items: DcxBreadcrumbItem[];
    accessor iconSeparator: DcxBreadCrumbSeparatorIcons;
    accessor isEllipsisMenuOpen: boolean;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleDocumentClick;
    private _handleKeyDown;
    toggleEllipsisMenu(event: Event): void;
    onItemClick(item: DcxBreadcrumbItem, event: Event): void;
    onHiddenItemClick(item: DcxBreadcrumbItem, event: Event): void;
    renderSeparatorIcon(): import('lit-html').TemplateResult<1>;
    renderItemIcon(iconName: string): import('lit-html').TemplateResult<1>;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-breadcrumb': DcxWebBreadcrumb;
    }
}
