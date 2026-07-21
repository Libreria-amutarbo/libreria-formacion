import { LitElement, nothing, PropertyValues } from 'lit';
import { DcxPosition } from '../../core/interfaces/generic';
export declare class DcxWebDrawer extends LitElement {
    accessor open: boolean;
    accessor position: DcxPosition;
    accessor modal: boolean;
    accessor dismissible: boolean;
    accessor showCloseIcon: boolean;
    accessor closeOnEscape: boolean;
    accessor blockScroll: boolean;
    accessor fullScreen: boolean;
    accessor size: string;
    accessor baseZIndex: number;
    accessor autoZIndex: boolean;
    accessor header: string;
    accessor footer: string;
    static styles: import('lit').CSSResult;
    private static _instanceCount;
    private static _globalZIndex;
    private accessor _currentZIndex;
    private accessor _rendered;
    private accessor _closing;
    private _closeTimer?;
    private _scrollBlocked;
    private _previousOverflow;
    private _hideAlreadyEmitted;
    private readonly _drawerId;
    private readonly _keydownHandler;
    private get _drawerTitleId();
    private get _hasHeader();
    private get _hasFooter();
    private get _resolvedZIndex();
    private get _panelWidth();
    private get _panelHeight();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected updated(changedProperties: PropertyValues<this>): void;
    render(): import('lit-html').TemplateResult<1> | typeof nothing;
    close(): void;
    private readonly _handleMaskPointerDown;
    private readonly _closeDrawer;
    private _syncBodyScroll;
    private _syncKeydownListener;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-drawer': DcxWebDrawer;
    }
}
