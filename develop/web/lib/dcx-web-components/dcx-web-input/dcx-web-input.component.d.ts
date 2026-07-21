import { LitElement } from 'lit';
import { DcxInputErrorMessage, DcxInputType } from '../../core/interfaces/input';
import { DcxSpacing } from '../../core/interfaces';
export declare class DcxWebInput extends LitElement {
    accessor id: string;
    accessor value: string | number;
    accessor disabled: boolean;
    accessor readonly: boolean;
    accessor placeholder: string;
    accessor type: DcxInputType;
    accessor name: string;
    accessor required: boolean;
    accessor checked: boolean;
    accessor autocomplete: string;
    accessor inputMode: string;
    accessor isInvalid: boolean;
    accessor label: string;
    accessor hint: string;
    accessor ariaLabel: string | null;
    accessor ariaDescribedBy: string | null;
    accessor errorMessage: string;
    accessor requiredMessage: string | null;
    accessor errorMessages: DcxInputErrorMessage[];
    accessor errorIcon: string;
    accessor spacing: DcxSpacing;
    accessor orientation: 'horizontal' | 'vertical';
    accessor multiple: boolean;
    accessor min: number;
    accessor max: number;
    accessor step: number;
    accessor showPassword: boolean;
    accessor touched: boolean;
    static styles: import('lit').CSSResult;
    get labelId(): string;
    get errorId(): string;
    get hintId(): string;
    get isPasswordType(): boolean;
    get isSearchType(): boolean;
    get isFileType(): boolean;
    get isRadioType(): boolean;
    get isRangeType(): boolean;
    get displayType(): string;
    get showActionIcon(): boolean;
    get getInputIcon(): string | null;
    get describedBy(): string | null;
    get showRequiredWarning(): boolean;
    get getActionButtonAriaLabel(): "" | "Ocultar contraseña" | "Mostrar contraseña" | "Buscar";
    get getActionButtonIcon(): "" | "search" | "eye-slash-fill" | "eye-fill";
    emit(name: string, detail?: unknown): void;
    private formatValueByType;
    onInputChange(event: Event): void;
    onChangeEvent(event: Event): void;
    onFocusEvent(): void;
    onBlurEvent(): void;
    private togglePasswordVisibility;
    onActionButtonClick(): void;
    getInputClasses(): string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-input': DcxWebInput;
    }
}
