import { LitElement } from 'lit';
import { DcxSize, DcxPosition } from '../../core/interfaces';
export declare class DcxWebToggle extends LitElement {
    accessor checked: boolean;
    accessor disabled: boolean;
    accessor label: string | null;
    accessor size: DcxSize;
    accessor ariaLabel: string | null;
    accessor textPosition: DcxPosition;
    static styles: import('lit').CSSResult;
    get effectiveAriaLabel(): string;
    emit(name: string, detail?: unknown): void;
    toggle(): void;
    getToggleClasses(): string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-toggle': DcxWebToggle;
    }
}
