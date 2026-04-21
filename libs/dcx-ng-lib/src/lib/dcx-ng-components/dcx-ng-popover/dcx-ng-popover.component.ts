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
  container = viewChild<ElementRef>('container');

  readonly isOpen = signal(false);
  readonly isPositioned = signal(false);
  readonly top = signal('-9999px');
  readonly left = signal('-9999px');

  readonly opened = output<void>();
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.hide();
    }
  }

  private target: HTMLElement | null = null;
  private ignoreNextClick = false;

  toggle(event: any, targetElement?: HTMLElement): void {
    if (this.isOpen()) {
      this.hide();
    } else {
      this.show(event, targetElement);
    }
  }

  show(event?: any, targetElement?: HTMLElement): void {
    const newTarget = targetElement || (event?.currentTarget as HTMLElement);
    if (!newTarget) return;

    this.target = newTarget;
    this.ignoreNextClick = true;
    this.isOpen.set(true);
    this.opened.emit();

    setTimeout(() => {
      this.calculatePosition();
    });
  }

  hide(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.isPositioned.set(false);
    this.target = null;
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
      this.hide();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isOpen()) {
      this.calculatePosition();
    }
  }
}
