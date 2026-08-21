import { LitElement } from 'lit';
import { DcxSize } from '../../core/interfaces';
export declare class DcxWebScrollTopDown extends LitElement {
    accessor container: HTMLElement | null;
    accessor smooth: boolean;
    accessor size: DcxSize;
    accessor iconSize: DcxSize;
    accessor showTop: boolean;
    accessor showBottom: boolean;
    accessor topLabel: string;
    accessor bottomLabel: string;
    accessor topIcon: string;
    accessor bottomIcon: string;
    accessor groupLabel: string;
    accessor isAtTop: boolean;
    accessor isAtBottom: boolean;
    private scrollTargetRef;
    private readonly handleScroll;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<string, unknown>): void;
    get isTopVisible(): boolean;
    get isBottomVisible(): boolean;
    get scrollClasses(): string;
    buttonClasses(position: 'top' | 'bottom'): string;
    scrollBehavior(): ScrollBehavior;
    private prefersReducedMotion;
    scrollToTop: () => void;
    scrollToBottom: () => void;
    private registerListeners;
    private unregisterListeners;
    private updateScrollState;
    private scrollTarget;
    private scrollElement;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-scroll-top-down': DcxWebScrollTopDown;
    }
}
