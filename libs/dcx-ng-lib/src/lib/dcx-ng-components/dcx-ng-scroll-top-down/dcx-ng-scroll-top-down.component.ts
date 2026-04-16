import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-scroll-top-down',
  standalone: true,
  imports: [DcxNgButtonComponent],
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

  readonly scrollClasses = computed<string>(() => {
    const base = 'dcx-ng-scroll-top-down';
    const sizeValue = this.size();
    const topOnly = this.showTop() && !this.showBottom();
    const bottomOnly = this.showBottom() && !this.showTop();

    return [
      base,
      `${base}--${sizeValue}`,
      topOnly ? `${base}--top-only` : '',
      bottomOnly ? `${base}--bottom-only` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly scrollBehavior = computed<ScrollBehavior>(() =>
     this.smooth() ? 'smooth' : 'auto'
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
