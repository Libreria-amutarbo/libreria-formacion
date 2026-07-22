import { LitElement } from 'lit';
import { DcxChipColorType, DcxChipVariantType, DcxChipType } from '../../core/interfaces/chip';
export declare class DcxWebChip extends LitElement {
    accessor label: string;
    accessor color: DcxChipColorType;
    accessor removable: boolean;
    accessor icon: string;
    accessor image: string;
    accessor variant: DcxChipVariantType;
    static styles: import('lit').CSSResult;
    get chipType(): DcxChipType;
    get showRemove(): boolean;
    renderIcon(): import('lit-html').TemplateResult<1>;
    handleRemove(event: Event): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-chip': DcxWebChip;
    }
}
