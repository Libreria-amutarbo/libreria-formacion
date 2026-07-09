import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Evento aceptado por show()/toggle(): un Event nativo del DOM (del que se lee
 * currentTarget) o el payload emitido por dcx-ng-button ({ clicked: boolean }),
 * en cuyo caso el disparador debe pasarse como segundo argumento.
 */
export type DcxPopoverToggleEvent = Event | { clicked: boolean } | null;

@Component({
  selector: 'dcx-ng-popover',
  exportAs: 'dcxNgPopover',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-popover.component.html',
  styleUrl: './dcx-ng-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPopoverComponent {
  private static nextId = 0;
  private readonly destroyRef = inject(DestroyRef);

  container = viewChild<ElementRef>('container');

  readonly role = input<string>('dialog');
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledby = input<string | null>(null);
  readonly autoFocus = input<boolean>(true);
  readonly returnFocus = input<boolean>(true);

  readonly panelId = `dcx-popover-${DcxNgPopoverComponent.nextId++}`;

  readonly isOpen = signal(false);
  readonly isPositioned = signal(false);
  readonly top = signal('-9999px');
  readonly left = signal('-9999px');
  readonly placement = signal<'bottom' | 'top'>('bottom');
  readonly arrowLeft = signal(24);

  readonly opened = output<void>();
  readonly closed = output<void>();

  private target: HTMLElement | null = null;
  private ignoreNextClick = false;
  private positionTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.clearPositionTimeout());
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.hide();
    }
  }

  toggle(event: DcxPopoverToggleEvent, targetElement?: HTMLElement): void {
    if (this.isOpen()) {
      this.hide();
    } else {
      this.show(event, targetElement);
    }
  }

  show(event?: DcxPopoverToggleEvent, targetElement?: HTMLElement): void {
    const eventTarget =
      event && 'currentTarget' in event
        ? (event.currentTarget as HTMLElement | null)
        : null;
    const newTarget = targetElement || eventTarget;
    if (!newTarget) return;

    this.target = newTarget;
    this.ignoreNextClick = true;
    this.isOpen.set(true);
    this.opened.emit();

    this.clearPositionTimeout();
    this.positionTimeout = setTimeout(() => {
      this.calculatePosition();
      if (this.autoFocus()) {
        this.focusPanel();
      }
    });
  }

  hide(options: { returnFocus?: boolean } = {}): void {
    if (!this.isOpen()) return;

    const shouldReturnFocus = (options.returnFocus ?? true) && this.returnFocus();
    const trigger = this.target;

    this.isOpen.set(false);
    this.isPositioned.set(false);
    this.ignoreNextClick = false;
    this.clearPositionTimeout();
    this.target = null;
    this.closed.emit();

    if (shouldReturnFocus && trigger) {
      trigger.focus({ preventScroll: true });
    }
  }

  private focusPanel(): void {
    const el = this.container()?.nativeElement as HTMLElement | undefined;
    if (!el) return;

    const focusable = el.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable ?? el).focus({ preventScroll: true });
  }

  private clearPositionTimeout(): void {
    if (this.positionTimeout !== null) {
      clearTimeout(this.positionTimeout);
      this.positionTimeout = null;
    }
  }

  private calculatePosition(): void {
    if (!this.target || !this.container()) return;

    const targetRect = this.target.getBoundingClientRect();
    const popoverEl = this.container()!.nativeElement;
    const popoverRect = popoverEl.getBoundingClientRect();
    const gap = 8;

    const offsetParent =
      (popoverEl.offsetParent as HTMLElement) || document.documentElement;
    const parentRect = offsetParent.getBoundingClientRect();

    let topPosition = targetRect.bottom - parentRect.top + gap;
    let leftPosition = targetRect.left - parentRect.left;

    if (targetRect.left + popoverRect.width > window.innerWidth - 10) {
      leftPosition = window.innerWidth - 10 - popoverRect.width - parentRect.left;
      if (leftPosition < 0) leftPosition = 0;
    }

    const wouldGoBelow =
      targetRect.bottom + gap + popoverRect.height > window.innerHeight;
    const topIfFlipped = targetRect.top - parentRect.top - popoverRect.height - gap;
    const flipped = wouldGoBelow && topIfFlipped >= 0;
    if (flipped) {
      topPosition = topIfFlipped;
    }

    // Caret alineado con el centro del disparador.
    const panelLeftViewport = leftPosition + parentRect.left;
    const triggerCenter = targetRect.left + targetRect.width / 2;
    const rawArrow = triggerCenter - panelLeftViewport;
    const arrowLeft = Math.max(16, Math.min(rawArrow, popoverRect.width - 16));

    this.left.set(`${leftPosition}px`);
    this.top.set(`${topPosition}px`);
    this.arrowLeft.set(arrowLeft);
    this.placement.set(flipped ? 'top' : 'bottom');
    this.isPositioned.set(true);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.ignoreNextClick) {
      this.ignoreNextClick = false;
      return;
    }

    if (!this.isOpen() || !this.target || !this.container()) return;

    const clickTarget = event.target as Node;

    if (!document.contains(clickTarget)) return;

    const isInsideTarget = this.target.contains(clickTarget);
    const isInsidePopover = this.container()!.nativeElement.contains(clickTarget);

    if (!isInsideTarget && !isInsidePopover) {
      this.hide({ returnFocus: false });
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isOpen()) {
      this.calculatePosition();
    }
  }
}
