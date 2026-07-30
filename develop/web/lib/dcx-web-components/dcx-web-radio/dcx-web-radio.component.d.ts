import { LitElement } from 'lit';
import { DcxRadioOption, DcxRadioSize, DcxRadioValue } from '../../core/interfaces/radio';
export declare class DcxWebRadio extends LitElement {
    static styles: import('lit').CSSResult;
    accessor options: DcxRadioOption[];
    accessor name: string;
    accessor label: string;
    accessor ariaLabel: string;
    accessor size: DcxRadioSize;
    accessor disabled: boolean;
    accessor error: boolean;
    accessor hint: string;
    accessor errorMessage: string;
    accessor value: DcxRadioValue;
    readonly groupId: string;
    get hintId(): string;
    get errorId(): string;
    get isGroupDisabled(): boolean;
    get showError(): boolean;
    get showHint(): boolean;
    get describedBy(): string | null;
    isChecked(value: string): boolean;
    isOptionDisabled(option: DcxRadioOption): boolean;
    radioClasses(option: DcxRadioOption): string;
    onOptionChange(option: DcxRadioOption): void;
    onBlur(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-radio': DcxWebRadio;
    }
}
