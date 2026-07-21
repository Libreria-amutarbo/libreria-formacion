import { LitElement, TemplateResult } from 'lit';
import { DcxInputOtpSize, DcxInputOtpType, DcxInputOtpInputMode, DcxInputOtpTemplateContext } from '../../core/interfaces/inputOtp';
export declare class DcxWebInputOtp extends LitElement {
    accessor length: number;
    accessor size: DcxInputOtpSize;
    accessor integerOnly: boolean;
    accessor mask: boolean;
    accessor invalid: boolean;
    accessor disabled: boolean;
    accessor placeholder: string;
    accessor ariaLabel: string;
    accessor errorMessage: string;
    accessor formDisabled: boolean;
    accessor tokens: string[];
    accessor inputTemplateRenderer: ((context: DcxInputOtpTemplateContext) => TemplateResult) | null;
    static styles: import('lit').CSSResult;
    private readonly uid;
    readonly errorId: string;
    getTemplateContext(token: string, index: number): DcxInputOtpTemplateContext;
    get normalizedLength(): number;
    willUpdate(): void;
    get inputType(): DcxInputOtpType;
    get inputMode(): DcxInputOtpInputMode;
    get isDisabled(): boolean;
    get showError(): boolean;
    get describedBy(): string | null;
    get displayTokens(): string[];
    get inputBaseClass(): string;
    emit(name: string, detail?: unknown): void;
    writeValue(value: string | null): void;
    setDisabledState(isDisabled: boolean): void;
    focus(): void;
    clear(): void;
    getAriaLabel(index: number): string;
    getInputClass(token: string): string;
    onInput(event: Event, index: number): void;
    onPaste(event: ClipboardEvent, index: number): void;
    onKeydown(event: KeyboardEvent, index: number): void;
    onFocus(index: number): void;
    onBlur(index: number): void;
    private applyCharacters;
    private updateToken;
    private propagateValue;
    private focusInput;
    private sanitizeValue;
    private sanitizeCharacters;
    private valueToTokens;
    private createEmptyTokens;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-input-otp': DcxWebInputOtp;
    }
}
