import { LitElement } from 'lit';
import { DcxBreadcrumbItem, DcxBreadCrumbSeparatorIcons } from '../../core/interfaces/breadcrumb';
export declare class DcxWebBreadcrumb extends LitElement {
    private readonly _maxVisibleItems;
    accessor items: DcxBreadcrumbItem[];
    accessor iconSeparator: DcxBreadCrumbSeparatorIcons;
    private accessor _isEllipsisMenuOpen;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleDocumentClick;
    private _handleKeyDown;
    private _toggleEllipsisMenu;
    private _onItemClick;
    private _onHiddenItemClick;
    private _renderSeparatorIcon;
    private _renderItemIcon;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-breadcrumb': DcxWebBreadcrumb;
    }
}
