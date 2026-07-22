import { LitElement } from 'lit';
import { DcxCheckbox, DcxCheckboxAriaChecked, DcxCheckBoxVariant } from '../../core/interfaces/checkbox';
export declare class DcxWebCheckbox extends LitElement {
    static styles: import('lit').CSSResult;
    accessor options: DcxCheckbox[];
    readonly errorIcon = "exclamation-circle-fill";
    private _getValue;
    private _normalizeValue;
    getVariant(option: DcxCheckbox): DcxCheckBoxVariant;
    getIconName(option: DcxCheckbox): string;
    getAriaChecked(option: DcxCheckbox): DcxCheckboxAriaChecked;
    changeValue(id: string): void;
    renderLabel(option: DcxCheckbox): import('lit-html').TemplateResult<1>;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-checkbox': DcxWebCheckbox;
    }
}
