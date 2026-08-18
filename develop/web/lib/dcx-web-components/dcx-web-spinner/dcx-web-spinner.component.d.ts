import { LitElement } from 'lit';
import { DcxSpinnerSize } from '../../core/interfaces/spinner';
export declare class DcxWebSpinner extends LitElement {
    accessor size: DcxSpinnerSize;
    accessor wrapper: boolean;
    accessor title: string;
    accessor description: string;
    accessor delay: number;
    accessor color: string | null;
    accessor ariaLabel: string | null;
    accessor visible: boolean;
    private timeoutId;
    static styles: import('lit').CSSResult;
    get computedAriaLabel(): string;
    get hasContent(): boolean;
    spinnerClasses(): string;
    private startDelayTimer;
    connectedCallback(): void;
    willUpdate(changedProperties: Map<string, unknown>): void;
    disconnectedCallback(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-spinner': DcxWebSpinner;
    }
}
