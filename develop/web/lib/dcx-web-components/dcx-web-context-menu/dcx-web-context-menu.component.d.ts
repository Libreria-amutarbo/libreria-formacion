import { LitElement, TemplateResult } from 'lit';
import { DcxContextMenuItem } from '../../core/interfaces';
export declare class DcxWebContextMenu extends LitElement {
    accessor items: DcxContextMenuItem[];
    accessor position: {
        x: number;
        y: number;
    };
    accessor positionMode: 'fixed' | 'absolute';
    accessor isOpen: boolean;
    accessor isPositioned: boolean;
    accessor top: string;
    accessor left: string;
    private _openPosition;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleDocumentKeyDown;
    private _handleDocumentClick;
    private _handleWindowResize;
    open(position?: {
        x: number;
        y: number;
    }): Promise<void>;
    close(): void;
    private calculatePosition;
    onItemClick(item: DcxContextMenuItem, event?: Event): void;
    onItemKeydown(item: DcxContextMenuItem, index: number, event: KeyboardEvent): void;
    renderItem(item: DcxContextMenuItem, index: number): TemplateResult;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-context-menu': DcxWebContextMenu;
    }
}
