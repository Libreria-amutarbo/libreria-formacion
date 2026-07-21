import { LitElement } from 'lit';
import { DcxCheckbox } from '../../core/interfaces/checkbox';
export declare class DcxWebCheckbox extends LitElement {
    static styles: import('lit').CSSResult;
    accessor options: DcxCheckbox[];
    private readonly _errorIcon;
    private _getValue;
    private _normalizeValue;
    private _getVariant;
    private _getIconName;
    private _getAriaChecked;
    private _changeValue;
    private _renderLabel;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-checkbox': DcxWebCheckbox;
    }
}
