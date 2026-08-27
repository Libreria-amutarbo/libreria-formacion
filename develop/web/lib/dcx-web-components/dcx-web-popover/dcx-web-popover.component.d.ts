import { LitElement } from 'lit';
export type DcxPopoverToggleEvent = Event | {
    clicked: boolean;
} | null;
export declare class DcxWebPopover extends LitElement {
    private static nextId;
    accessor container: HTMLElement | null;
    accessor role: string;
    accessor ariaLabel: string;
    accessor ariaLabelledby: string | null;
    accessor autoFocus: boolean;
    accessor returnFocus: boolean;
    accessor panelId: string;
    accessor isOpen: boolean;
    accessor isPositioned: boolean;
    accessor top: string;
    accessor left: string;
    accessor placement: 'bottom' | 'top';
    accessor arrowLeft: number;
    private target;
    private ignoreNextClick;
    private positionTimeout;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private emit;
    toggle(event: DcxPopoverToggleEvent, targetElement?: HTMLElement): void;
    show(event?: DcxPopoverToggleEvent, targetElement?: HTMLElement): void;
    hide(options?: {
        returnFocus?: boolean;
    }): void;
    private focusPanel;
    private clearPositionTimeout;
    private calculatePosition;
    private onDocumentKeydown;
    private onDocumentClick;
    private onWindowResize;
    render(): import('lit-html').TemplateResult<1> | typeof import('lit-html').nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-popover': DcxWebPopover;
    }
}
