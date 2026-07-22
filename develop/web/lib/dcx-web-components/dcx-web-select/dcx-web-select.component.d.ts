import { LitElement } from 'lit';
import { DcxSpacing } from '../../core/interfaces';
import { DcxSelectOptions, DcxSelectValue } from '../../core/interfaces/select';
export declare class DcxWebSelect extends LitElement {
    accessor label: string;
    accessor options: DcxSelectOptions[];
    accessor placeholder: string;
    accessor ariaLabel: string | null;
    accessor searchable: boolean;
    accessor clearable: boolean;
    accessor disabled: boolean;
    accessor required: boolean;
    accessor isInvalid: boolean;
    accessor errorMessage: string;
    accessor errorIcon: string;
    accessor valueInput: string | number | null;
    accessor spacing: DcxSpacing;
    accessor value: DcxSelectValue;
    accessor isOpen: boolean;
    accessor search: string;
    accessor activeIndex: number;
    accessor receivedFromExternal: boolean;
    static styles: import('lit').CSSResult;
    id: string;
    get selectId(): string;
    get labelId(): string;
    private controlElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: Map<string, unknown>): void;
    get filtered(): DcxSelectOptions[];
    get selectedLabel(): string;
    get activeDescendant(): string | null;
    getControlClasses(): string;
    emit(name: string, detail?: unknown): void;
    toggle: () => void;
    private open;
    private close;
    selectOption(option: DcxSelectOptions): void;
    clearValue: (event: Event) => void;
    onSearchEvent: (event: CustomEvent) => void;
    private handleDocumentClick;
    private moveActive;
    private confirmActive;
    onKey: (event: KeyboardEvent) => void;
    registerControlElement(element: HTMLElement): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-select': DcxWebSelect;
    }
}
