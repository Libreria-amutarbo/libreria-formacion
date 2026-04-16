import { ChangeDetectionStrategy, Component, ElementRef, HostListener, output, signal, viewChild } from '@angular/core';

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
  public container = viewChild<ElementRef>('container');

  public readonly isOpen = signal(false);
  public readonly isPositioned = signal(false);
  public readonly top = signal('-9999px');
  public readonly left = signal('-9999px');

  public readonly opened = output<void>();
  public readonly closed = output<void>();

  private target: HTMLElement | null = null;
  private ignoreNextClick = false;
  private resizeListener = () => this.calculatePosition();
  private documentClickListener = (event: Event) => {
    if (this.ignoreNextClick) {
      this.ignoreNextClick = false;
      return;
    }
    this.onDocumentClick(event);
  };

  public toggle(event: any, targetElement?: HTMLElement): void {
    if (this.isOpen()) {
      this.hide();
    } else {
      this.show(event, targetElement);
    }
  }

  public show(event?: any, targetElement?: HTMLElement): void {
    const newTarget = targetElement || (event?.currentTarget as HTMLElement);
    if (!newTarget) return;

    this.target = newTarget;
    this.ignoreNextClick = true;
    this.isOpen.set(true);
    this.opened.emit();

    setTimeout(() => {
      this.calculatePosition();
      this.bindDocumentListeners();
    });
  }

  public hide(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.isPositioned.set(false);
    this.target = null;
    this.unbindDocumentListeners();
    this.closed.emit();
  }

  private calculatePosition(): void {
    if (!this.target || !this.container()) return;

    const targetRect = this.target.getBoundingClientRect();
    const popoverEl = this.container()!.nativeElement;
    const popoverRect = popoverEl.getBoundingClientRect();
    const gap = 8;

    const offsetParent = popoverEl.offsetParent as HTMLElement || document.documentElement;
    const parentRect = offsetParent.getBoundingClientRect();

    let topPosition = targetRect.bottom - parentRect.top + gap;
    let leftPosition = targetRect.left - parentRect.left;

    if (targetRect.left + popoverRect.width > window.innerWidth - 10) {
      leftPosition = window.innerWidth - 10 - popoverRect.width - parentRect.left;
      if (leftPosition < 0) leftPosition = 0;
    }

    const wouldGoBelow = targetRect.bottom + gap + popoverRect.height > window.innerHeight;
    const topIfFlipped = targetRect.top - parentRect.top - popoverRect.height - gap;
    if (wouldGoBelow && topIfFlipped >= 0) {
      topPosition = topIfFlipped;
    }

    this.left.set(`${leftPosition}px`);
    this.top.set(`${topPosition}px`);
    this.isPositioned.set(true);
  }

  onDocumentClick(event: Event): void {
    if (!this.isOpen() || !this.target || !this.container()) return;

    const clickTarget = event.target as Node;

    if (!document.contains(clickTarget)) return;

    const isInsideTarget = this.target.contains(clickTarget);
    const isInsidePopover = this.container()!.nativeElement.contains(clickTarget);

    if (!isInsideTarget && !isInsidePopover) {
      this.hide();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.hide();
    }
  }

  private bindDocumentListeners(): void {
    window.addEventListener('resize', this.resizeListener);
    document.addEventListener('click', this.documentClickListener);
  }

  private unbindDocumentListeners(): void {
    window.removeEventListener('resize', this.resizeListener);
    document.removeEventListener('click', this.documentClickListener);
  }
}
