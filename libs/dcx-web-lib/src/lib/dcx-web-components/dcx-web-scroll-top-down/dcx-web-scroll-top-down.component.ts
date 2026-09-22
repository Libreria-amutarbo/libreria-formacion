import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { styles } from './dcx-web-scroll-top-down.component.styles';
import { template } from './dcx-web-scroll-top-down.component.html';

import '../dcx-web-icon/dcx-web-icon.component';

import type { DcxSize } from '../../core/interfaces';

@customElement('dcx-web-scroll-top-down')
export class DcxWebScrollTopDown extends LitElement {
  @property({ attribute: false })
  accessor container: HTMLElement | null = null;

  @property({ type: Boolean })
  accessor smooth = true;

  @property({ type: String })
  accessor size: DcxSize = 'm';

  @property({ type: String })
  accessor iconSize: DcxSize = 's';

  @property({ type: Boolean })
  accessor showTop = true;

  @property({ type: Boolean })
  accessor showBottom = true;

  @property({ type: String })
  accessor topLabel = 'Ir arriba';

  @property({ type: String })
  accessor bottomLabel = 'Ir abajo';

  @property({ type: String })
  accessor topIcon = 'chevron-up';

  @property({ type: String })
  accessor bottomIcon = 'chevron-down';

  @property({ type: String })
  accessor groupLabel = 'Controles de desplazamiento';

  @state()
  accessor isAtTop = true;

  @state()
  accessor isAtBottom = false;

  private scrollTargetRef: Window | HTMLElement = window;

  private readonly handleScroll = () => {
    this.updateScrollState();
  };

  static override styles = styles;

  override connectedCallback() {
    super.connectedCallback();

    this.registerListeners();
  }

  override disconnectedCallback() {
    this.unregisterListeners();

    super.disconnectedCallback();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('container')) {
      this.unregisterListeners();
      this.registerListeners();
    }
  }

  get isTopVisible(): boolean {
    return this.showTop && !this.isAtTop;
  }

  get isBottomVisible(): boolean {
    return this.showBottom && !this.isAtBottom;
  }

  get scrollClasses(): string {
    const base = 'dcx-scroll-top-down';

    const topOnly = this.isTopVisible && !this.isBottomVisible;

    const bottomOnly = this.isBottomVisible && !this.isTopVisible;

    return [
      base,
      `${base}--${this.size}`,
      topOnly ? `${base}--top-only` : '',
      bottomOnly ? `${base}--bottom-only` : '',
      !this.isTopVisible && !this.isBottomVisible ? `${base}--hidden` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  public buttonClasses(position: 'top' | 'bottom'): string {
    const base = 'dcx-scroll-top-down__button';

    return `${base} ${base}--${this.size} ${base}--${position}`;
  }

  public scrollBehavior(): ScrollBehavior {
    return this.smooth && !this.prefersReducedMotion() ? 'smooth' : 'auto';
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  public scrollToTop = (): void => {
    const target = this.scrollTarget();

    if (target === window) {
      window.scrollTo({
        top: 0,
        behavior: this.scrollBehavior(),
      });

      return;
    }

    this.scrollElement(target as HTMLElement, 0);
  };

  public scrollToBottom = (): void => {
    const target = this.scrollTarget();

    if (target === window) {
      const documentElement = document.documentElement;

      const body = document.body;

      const scrollHeight = Math.max(
        documentElement.scrollHeight,
        body?.scrollHeight ?? 0,
      );

      window.scrollTo({
        top: scrollHeight,
        behavior: this.scrollBehavior(),
      });

      return;
    }

    const scrollElement = target as HTMLElement;

    const bottom = Math.max(
      scrollElement.scrollHeight - scrollElement.clientHeight,
      0,
    );

    this.scrollElement(scrollElement, bottom);
  };

  private registerListeners(): void {
    this.scrollTargetRef = this.scrollTarget();

    this.scrollTargetRef.addEventListener('scroll', this.handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', this.handleScroll, { passive: true });

    this.updateScrollState();
  }

  private unregisterListeners(): void {
    this.scrollTargetRef.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleScroll);
  }

  private updateScrollState(): void {
    const target = this.scrollTarget();

    let scrollTop = 0;
    let scrollHeight = 0;
    let clientHeight = 0;

    if (target === window) {
      scrollTop = window.scrollY || document.documentElement.scrollTop;

      scrollHeight = document.documentElement.scrollHeight;

      clientHeight = document.documentElement.clientHeight;
    } else {
      const el = target as HTMLElement;

      scrollTop = el.scrollTop;
      scrollHeight = el.scrollHeight;
      clientHeight = el.clientHeight;
    }

    this.isAtTop = scrollTop <= 0;

    this.isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
  }

  private scrollTarget(): Window | HTMLElement {
    return this.container ?? window;
  }

  private scrollElement(target: HTMLElement, top: number): void {
    if (typeof target.scrollTo === 'function') {
      target.scrollTo({
        top,
        behavior: this.scrollBehavior(),
      });

      return;
    }

    target.scrollTop = top;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-scroll-top-down': DcxWebScrollTopDown;
  }
}
