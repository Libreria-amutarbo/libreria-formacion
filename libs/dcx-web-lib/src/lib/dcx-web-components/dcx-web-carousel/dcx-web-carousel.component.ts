import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-carousel.component.styles';
import { template } from './dcx-web-carousel.component.html';
import type { DcxCarouselOrientation } from '../../core/interfaces/carousel';

@customElement('dcx-web-carousel')
export class DcxWebCarousel extends LitElement {
  @property({ type: Array }) accessor value: any[] = [];
  @property({ type: Boolean }) accessor circular = false;
  @property({ type: String }) accessor orientation: DcxCarouselOrientation = 'horizontal';
  @property({ type: Boolean, attribute: 'show-navigators' }) accessor showNavigators = true;
  @property({ type: Boolean, attribute: 'show-indicators' }) accessor showIndicators = true;
  @property({ type: Number, attribute: 'autoplay-interval' }) accessor autoplayInterval = 0;
  @property({ type: String, attribute: 'aria-label' }) override accessor ariaLabel = 'Carousel';

  @property({ attribute: false }) accessor itemTemplate: ((item: any, index: number) => any) | undefined = undefined;

  @state() accessor currentPage = 0;

  get liveAnnouncement(): string {
    const total = this.totalItems;
    return total > 0 ? `Diapositiva ${this.currentPage + 1} de ${total}` : '';
  }

  private _timer: ReturnType<typeof setInterval> | undefined;
  private _autoplayEnabled = false;

  static override styles = styles;

  get totalItems(): number {
    return this.value ? this.value.length : 0;
  }

  get isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  get carouselClass(): string {
    return this.isVertical
      ? 'dcx-carousel dcx-carousel--vertical'
      : 'dcx-carousel';
  }

  get slideDirection(): string {
    return this.isVertical ? 'column' : 'row';
  }

  get currentIcon(): string {
    return this.isVertical ? 'chevron-up' : 'chevron-left';
  }

  get nextIcon(): string {
    return this.isVertical ? 'chevron-down' : 'chevron-right';
  }

  get canNavigate(): boolean {
    return this.totalItems > 1;
  }

  get showNavigatorButtons(): boolean {
    return this.showNavigators && this.canNavigate;
  }

  get showIndicatorDots(): boolean {
    return this.showIndicators && this.canNavigate;
  }

  get isPrevDisabled(): boolean {
    return !this.circular && this.currentPage === 0;
  }

  get isNextDisabled(): boolean {
    return !this.circular && this.currentPage === this.totalItems - 1;
  }

  get wrapperTransform(): string {
    if (this.currentPage === 0) {
      return 'translate3d(0, 0, 0)';
    }
    const shift = this.currentPage * 100;
    return this.isVertical
      ? `translate3d(0, -${shift}%, 0)`
      : `translate3d(-${shift}%, 0, 0)`;
  }

  override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (changedProperties.has('autoplayInterval')) {
      this.clearTimer();
      const interval = this.autoplayInterval;
      this._autoplayEnabled = interval > 0;
      if (this._autoplayEnabled) {
        this.startAutoplay();
      }
    }
  }

  override disconnectedCallback(): void {
    this.clearTimer();
    super.disconnectedCallback();
  }

  next(): void {
    const total = this.totalItems;
    const current = this.currentPage;

    if (current < total - 1) {
      this.currentPage = current + 1;
    } else if (this.circular) {
      this.currentPage = 0;
    }

    this.dispatchEvent(
      new CustomEvent('pageChange', {
        detail: { page: this.currentPage },
        bubbles: true,
        composed: true,
      })
    );
  }

  prev(): void {
    const total = this.totalItems;
    const current = this.currentPage;

    if (current > 0) {
      this.currentPage = current - 1;
    } else if (this.circular) {
      this.currentPage = total - 1;
    }

    this.dispatchEvent(
      new CustomEvent('pageChange', {
        detail: { page: this.currentPage },
        bubbles: true,
        composed: true,
      })
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('pageChange', {
        detail: { page },
        bubbles: true,
        composed: true,
      })
    );
  }

  indicatorClass(pageIndex: number): string {
    const baseClass = 'dcx-carousel__indicator';

    if (pageIndex !== this.currentPage) {
      return baseClass;
    }

    return `${baseClass} ${baseClass}--active`;
  }

  onKeydown(event: KeyboardEvent): void {
    const isHorizontal = !this.isVertical;
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    if (event.key === prevKey) {
      event.preventDefault();
      this.prev();
    } else if (event.key === nextKey) {
      event.preventDefault();
      this.next();
    }
  }

  pauseAutoplay(): void {
    if (this._autoplayEnabled) {
      this.clearTimer();
    }
  }

  resumeAutoplay(): void {
    if (this._autoplayEnabled && !this._timer) {
      this.startAutoplay();
    }
  }

  private startAutoplay(): void {
    const interval = this.autoplayInterval;
    this._timer = setInterval(() => this.next(), interval);
  }

  private clearTimer(): void {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-carousel': DcxWebCarousel;
  }
}
