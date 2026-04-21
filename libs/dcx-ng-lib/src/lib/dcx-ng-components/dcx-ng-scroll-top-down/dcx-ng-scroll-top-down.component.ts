import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-scroll-top-down',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-scroll-top-down.component.html',
  styleUrl: './dcx-ng-scroll-top-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'scrollClasses()',
  },
})
export class DcxNgScrollTopDownComponent {
  readonly container = input<HTMLElement | null>(null);
  readonly smooth = input<boolean>(true);
  readonly size = input<DcxSize>('m');
  readonly iconSize = input<DcxSize>('s');
  readonly showTop = input<boolean>(true);
  readonly showBottom = input<boolean>(true);
  readonly topLabel = input<string>('Scroll to top');
  readonly bottomLabel = input<string>('Scroll to bottom');
  readonly topIcon = input<string>('arrow-up');
  readonly bottomIcon = input<string>('arrow-down');
  readonly groupLabel = input<string>('Scroll controls');

  private readonly _isAtTop = signal(true);
  private readonly _isAtBottom = signal(false);

  readonly isTopVisible = computed(() => this.showTop() && !this._isAtTop());
  readonly isBottomVisible = computed(
    () => this.showBottom() && !this._isAtBottom(),
  );

  constructor() {
    effect((onCleanup) => {
      const container = this.container();
      const target = container ?? window;

      const handleScroll = () => {
        this.updateScrollState();
      };

      target.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });

      this.updateScrollState();

      onCleanup(() => {
        target.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      });
    });
  }

  readonly buttonClasses = (position: 'top' | 'bottom'): string => {
    const base = 'dcx-ng-scroll-top-down__button';
    return `${base} ${base}--${this.size()} ${base}--${position}`;
  };

  readonly scrollClasses = computed<string>(() => {
    const base = 'dcx-ng-scroll-top-down';
    const showTop = this.isTopVisible();
    const showBottom = this.isBottomVisible();
    const topOnly = showTop && !showBottom;
    const bottomOnly = showBottom && !showTop;

    return [
      base,
      `${base}--${this.size()}`,
      topOnly ? `${base}--top-only` : '',
      bottomOnly ? `${base}--bottom-only` : '',
      !showTop && !showBottom ? `${base}--hidden` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly scrollBehavior = computed<ScrollBehavior>(() =>
    this.smooth() ? 'smooth' : 'auto',
  );

  scrollToTop = (): void => {
    const target = this.scrollTarget();

    if (target === window) {
      window.scrollTo({ top: 0, behavior: this.scrollBehavior() });
      return;
    }

    this.scrollElement(target as HTMLElement, 0);
  };

  scrollToBottom = (): void => {
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

    this._isAtTop.set(scrollTop <= 0);
    this._isAtBottom.set(scrollTop + clientHeight >= scrollHeight - 1);
  }

  private scrollTarget(): Window | HTMLElement {
    return this.container() ?? window;
  }

  private scrollElement(target: HTMLElement, top: number): void {
    if (typeof target.scrollTo === 'function') {
      target.scrollTo({ top, behavior: this.scrollBehavior() });
      return;
    }

    target.scrollTop = top;
  }
}
