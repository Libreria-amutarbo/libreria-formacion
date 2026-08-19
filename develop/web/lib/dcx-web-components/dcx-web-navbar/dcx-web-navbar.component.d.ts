import { LitElement } from 'lit';
import { DcxNavbarBrand, DcxNavItem } from '../../core/interfaces/navbar';
export declare class DcxWebNavbar extends LitElement {
    accessor brand: DcxNavbarBrand;
    accessor items: DcxNavItem[];
    accessor activeValue: string | null;
    accessor ariaLabel: string | null;
    accessor vertical: boolean;
    accessor isMenuOpen: boolean;
    static styles: import('lit').CSSResult;
    private _onDocKeydown;
    private _toggleInnerEl;
    private _onInnerToggleKeydown;
    emit(name: string, detail?: unknown): void;
    toggleMenu: () => void;
    closeMenu(): void;
    onToggleEscape(): void;
    onToggleKeydown(event: KeyboardEvent): void;
    onItemClick(value: string): void;
    disconnectedCallback(): void;
    onBrandClick(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-navbar': DcxWebNavbar;
    }
}
