import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  computed,
  input,
  output,
  signal,
  effect,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-carousel',
  standalone: true,
  imports: [CommonModule, DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-carousel.component.html',
  styleUrl: './dcx-ng-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCarouselComponent implements OnDestroy {
  value = input<any[]>([]);
  circular = input<boolean>(false);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  showNavigators = input<boolean>(true);
  showIndicators = input<boolean>(true);
  autoplayInterval = input<number>(0);
  ariaLabel = input<string>('Carousel');

  pageChange = output<{ page: number }>();

  @ContentChild('item') itemTemplate!: TemplateRef<any>;

  currentPage = signal(0);
  liveAnnouncement = signal('');

  private _timer: ReturnType<typeof setInterval> | undefined;
  private _autoplayEnabled = false;

  totalItems = computed(() => this.value().length);

  isVertical = computed(() => this.orientation() === 'vertical');

  carouselClass = computed(() => {
    return this.isVertical()
      ? 'dcx-carousel dcx-carousel--vertical'
      : 'dcx-carousel';
  });

  slideDirection = computed(() => (this.isVertical() ? 'column' : 'row'));

  currentIcon = computed(() =>
    this.isVertical() ? 'chevron-up' : 'chevron-left',
  );

  nextIcon = computed(() =>
    this.isVertical() ? 'chevron-down' : 'chevron-right',
  );

  canNavigate = computed(() => this.totalItems() > 1);

  showNavigatorButtons = computed(
    () => this.showNavigators() && this.canNavigate(),
  );

  showIndicatorDots = computed(
    () => this.showIndicators() && this.canNavigate(),
  );

  isPrevDisabled = computed(
    () => !this.circular() && this.currentPage() === 0,
  );

  isNextDisabled = computed(
    () => !this.circular() && this.currentPage() === this.totalItems() - 1,
  );

  wrapperTransform = computed(() => {
    const page = this.currentPage();
    const shift = page * 100;

    return this.isVertical()
      ? `translateY(-${shift}%)`
      : `translateX(-${shift}%)`;
  });

  constructor() {
    effect(() => {
      const interval = this.autoplayInterval();
      this.clearTimer();
      this._autoplayEnabled = interval > 0;
      if (this._autoplayEnabled) {
        this.startAutoplay();
      }
    });

    effect(() => {
      const page = this.currentPage();
      const total = this.totalItems();
      if (total > 0) {
        this.liveAnnouncement.set(`Diapositiva ${page + 1} de ${total}`);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  next(): void {
    const total = this.totalItems();
    const current = this.currentPage();

    if (current < total - 1) {
      this.currentPage.set(current + 1);
    } else if (this.circular()) {
      this.currentPage.set(0);
    }

    this.pageChange.emit({ page: this.currentPage() });
  }

  prev(): void {
    const total = this.totalItems();
    const current = this.currentPage();

    if (current > 0) {
      this.currentPage.set(current - 1);
    } else if (this.circular()) {
      this.currentPage.set(total - 1);
    }

    this.pageChange.emit({ page: this.currentPage() });
  }

  setPage(page: number): void {
    this.currentPage.set(page);
    this.pageChange.emit({ page });
  }

  indicatorClass(pageIndex: number): string {
    const baseClass = 'dcx-ng-button--carousel-indicator';

    if (pageIndex !== this.currentPage()) {
      return baseClass;
    }

    return `${baseClass} ${baseClass}--active`;
  }

  onKeydown(event: KeyboardEvent): void {
    const isHorizontal = !this.isVertical();
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
    const interval = this.autoplayInterval();
    this._timer = setInterval(() => this.next(), interval);
  }

  private clearTimer(): void {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }
}
