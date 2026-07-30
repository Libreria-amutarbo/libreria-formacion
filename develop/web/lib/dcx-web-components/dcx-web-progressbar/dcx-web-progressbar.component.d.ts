import { LitElement } from 'lit';
import { DcxProgressStep, DcxProgressVariant } from '../../core/interfaces/progressbar';
export declare class DcxWebProgressbar extends LitElement {
    accessor id: string;
    accessor variant: DcxProgressVariant;
    accessor value: number;
    accessor label: string;
    accessor ariaLabel: string;
    accessor showTooltip: boolean;
    accessor showLabel: boolean;
    accessor steps: DcxProgressStep[];
    accessor currentStep: number;
    accessor showCheckmarks: boolean;
    accessor segments: number;
    static styles: import('lit').CSSResult;
    get labelId(): string;
    get progressPercentage(): number;
    get isStepperVariant(): boolean;
    get isSegmentedVariant(): boolean;
    get isDefaultVariant(): boolean;
    get segmentArray(): number[];
    get stepProgress(): number;
    get stepValueText(): string;
    isStepCompleted(index: number): boolean;
    isStepActive(index: number): boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-progressbar': DcxWebProgressbar;
    }
}
