import { LitElement } from 'lit';
import { DialogPosition } from '../../core/interfaces/dialog';
export declare class DcxWebDialog extends LitElement {
    accessor position: DialogPosition;
    accessor title: string;
    accessor dialogId: string;
    accessor showClose: boolean;
    accessor closeOnBackdrop: boolean;
    accessor visible: boolean;
    static styles: import('lit').CSSResult;
    get dialogTitleId(): string;
    get dialogClasses(): string;
    close(): void;
    onBackdropClick(e: MouseEvent): void;
    protected onKeyDown: (e: KeyboardEvent) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-dialog': DcxWebDialog;
    }
}
