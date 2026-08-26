import { LitElement } from 'lit';
import { FloatLabelVariant, TextareaSize } from '../../core/interfaces/textarea';
export declare class DcxWebTextarea extends LitElement {
    textareaElement: HTMLTextAreaElement;
    accessor value: string;
    accessor rows: number;
    accessor cols: number;
    accessor placeholder: string;
    accessor disabled: boolean;
    accessor readonly: boolean;
    accessor autoResize: boolean;
    accessor floatLabel: FloatLabelVariant | undefined;
    accessor label: string;
    accessor size: TextareaSize;
    accessor fluid: boolean;
    accessor filled: boolean;
    accessor invalid: boolean;
    accessor errorMessage: string;
    accessor id: string;
    accessor ariaLabel: string | null;
    accessor ariaDescribedBy: string | null;
    accessor required: boolean;
    accessor hint: string;
    accessor maxLength: number | null;
    accessor resizable: boolean;
    accessor focused: boolean;
    accessor _autoHeight: string;
    static styles: import('lit').CSSResult;
    get errorId(): string;
    get hintId(): string;
    get showError(): boolean;
    get showHint(): boolean;
    get describedBy(): string | null;
    get computedResize(): 'vertical' | 'none';
    emit(name: string, detail?: unknown): void;
    getTextareaClasses(): string;
    getWrapperClasses(): string;
    onInput: (event: Event) => void;
    onFocus: () => void;
    onBlur: () => void;
    protected firstUpdated(): void;
    protected updated(changedProperties: Map<PropertyKey, unknown>): void;
    private syncTextareaSize;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-textarea': DcxWebTextarea;
    }
}
