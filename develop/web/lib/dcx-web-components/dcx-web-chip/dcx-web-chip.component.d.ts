import { LitElement } from 'lit';
import { DcxChipColorType, DcxChipVariantType } from '../../core/interfaces/chip';
export declare class DcxWebChip extends LitElement {
    accessor label: string;
    accessor color: DcxChipColorType;
    accessor removable: boolean;
    accessor icon: string;
    accessor image: string;
    accessor variant: DcxChipVariantType;
    static styles: import('lit').CSSResult;
    private get _chipType();
    private get _showRemove();
    private _renderIcon;
    private _handleRemove;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-chip': DcxWebChip;
    }
}
