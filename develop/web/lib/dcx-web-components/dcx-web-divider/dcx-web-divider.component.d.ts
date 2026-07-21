import { LitElement } from 'lit';
import { DividerOrientation, DividerType, DividerSize } from '../../core/interfaces/divider';
export declare class DcxWebDivider extends LitElement {
    accessor orientation: DividerOrientation;
    accessor type: DividerType;
    accessor size: DividerSize;
    accessor thickness: number;
    accessor color: string;
    accessor label: string;
    accessor ariaLabel: string | null;
    static styles: import('lit').CSSResult;
    private _getDividerStyle;
    private _getDividerSize;
    private _getComputedAriaLabel;
    private _isHidden;
    updated(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-divider': DcxWebDivider;
    }
}
