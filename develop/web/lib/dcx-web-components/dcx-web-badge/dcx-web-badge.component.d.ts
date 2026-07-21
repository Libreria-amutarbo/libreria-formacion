import { LitElement } from 'lit';
import { BadgeSeverityType, BadgeSizeType } from '../../core/interfaces/badge';
export declare class DcxWebBadge extends LitElement {
    accessor value: string;
    accessor severity: BadgeSeverityType;
    accessor size: BadgeSizeType;
    accessor ariaLabel: string | null;
    accessor ariaHiddenAttr: boolean;
    accessor roleAttr: 'status' | 'alert' | null;
    static styles: import('lit').CSSResult;
    private _getComputedAriaLabel;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-badge': DcxWebBadge;
    }
}
