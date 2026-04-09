import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';

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
  public readonly top = signal('0px');
  public readonly left = signal('0px');

  private target: HTMLElement | null = null;
  private resizeListener = () => this.calculatePosition();
  private scrollListener = () => this.hide();
  private documentClickListener = (event: Event) => this.onDocumentClick(event);

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
    this.isOpen.set(true);

    setTimeout(() => {
      this.calculatePosition();
      this.bindDocumentListeners();
    });
  }

  public hide(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.target = null;
    this.unbindDocumentListeners();
  }

  private calculatePosition(): void {
    if (!this.target || !this.container()) return;

    const targetRect = this.target.getBoundingClientRect();
    const popoverRect = this.container()!.nativeElement.getBoundingClientRect();

    let leftPosition = targetRect.left;
    const topPosition = targetRect.bottom + window.scrollY;

    if (leftPosition + popoverRect.width > window.innerWidth) {
      leftPosition = window.innerWidth - popoverRect.width - 10;
    }
    if (leftPosition < 0) {
      leftPosition = 10;
    }

    this.left.set(`${leftPosition}px`);
    this.top.set(`${topPosition}px`);
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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(_event: KeyboardEvent): void {
    if (this.isOpen()) {
      this.hide();
    }
  }

  private bindDocumentListeners(): void {
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('scroll', this.scrollListener, true);
    document.addEventListener('click', this.documentClickListener);
  }

  private unbindDocumentListeners(): void {
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('scroll', this.scrollListener, true);
    document.removeEventListener('click', this.documentClickListener);
  }
}
