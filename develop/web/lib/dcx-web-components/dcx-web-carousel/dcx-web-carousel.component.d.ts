import { LitElement, PropertyValues } from 'lit';
import { DcxCarouselOrientation } from '../../core/interfaces/carousel';
export declare class DcxWebCarousel extends LitElement {
    accessor value: any[];
    accessor circular: boolean;
    accessor orientation: DcxCarouselOrientation;
    accessor showNavigators: boolean;
    accessor showIndicators: boolean;
    accessor autoplayInterval: number;
    accessor ariaLabel: string;
    accessor itemTemplate: ((item: any, index: number) => any) | undefined;
    accessor currentPage: number;
    get liveAnnouncement(): string;
    private _timer;
    private _autoplayEnabled;
    static styles: import('lit').CSSResult;
    get totalItems(): number;
    get isVertical(): boolean;
    get carouselClass(): string;
    get slideDirection(): string;
    get currentIcon(): string;
    get nextIcon(): string;
    get canNavigate(): boolean;
    get showNavigatorButtons(): boolean;
    get showIndicatorDots(): boolean;
    get isPrevDisabled(): boolean;
    get isNextDisabled(): boolean;
    get wrapperTransform(): string;
    updated(changedProperties: PropertyValues<this>): void;
    disconnectedCallback(): void;
    next(): void;
    prev(): void;
    setPage(page: number): void;
    indicatorClass(pageIndex: number): string;
    onKeydown(event: KeyboardEvent): void;
    pauseAutoplay(): void;
    resumeAutoplay(): void;
    private startAutoplay;
    private clearTimer;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-carousel': DcxWebCarousel;
    }
}
