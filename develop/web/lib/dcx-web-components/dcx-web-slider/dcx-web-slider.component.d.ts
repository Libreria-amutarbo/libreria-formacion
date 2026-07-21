import { LitElement } from 'lit';
export declare class DcxWebSlider extends LitElement {
    static styles: import('lit').CSSResult;
    accessor showLabel: boolean;
    accessor textLabel: string;
    accessor value: number;
    accessor min: number;
    accessor max: number;
    accessor step: number;
    accessor vertical: boolean;
    accessor disabled: boolean;
    accessor ariaLabel: string | null;
    accessor valueSuffix: string;
    accessor valueInput: number;
    willUpdate(changedProperties: Map<PropertyKey, unknown>): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    firstUpdated(): Promise<void>;
    private clamp;
    onInput(e: CustomEvent<number | string>): void;
    get displayValue(): string;
    get effectiveAriaLabel(): string | null;
    get effectiveAriaValueText(): string | null;
    get progressPercent(): number;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-slider': DcxWebSlider;
    }
}
