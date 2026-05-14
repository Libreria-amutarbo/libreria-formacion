import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DcxContextMenuItem } from '../../core/interfaces';
import { DcxNgListComponent } from '../dcx-ng-list/dcx-ng-list.component';

@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  imports: [DcxNgListComponent],
  templateUrl: './dcx-ng-contextMenu.component.html',
  styleUrl: './dcx-ng-contextMenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgContextMenuComponent {
  container = viewChild<ElementRef>('container');

  items = input.required<DcxContextMenuItem[]>();
  position = input<{ x: number; y: number }>({ x: 0, y: 0 });
  positionMode = input<'fixed' | 'absolute'>('fixed');

  itemSelected = output<DcxContextMenuItem>();
  menuClosed = output<void>();

  isOpen = signal<boolean>(false);
  isPositioned = signal<boolean>(false);
  top = signal<string>('-9999px');
  left = signal<string>('-9999px');

  private ignoreNextClick = false;

  open(): void {
    this.ignoreNextClick = true;
    this.isOpen.set(true);
    setTimeout(() => {
      this.calculatePosition();
    });
  }

  close(): void {
    this.isOpen.set(false);
    this.isPositioned.set(false);
    this.menuClosed.emit();
  }

  private calculatePosition(): void {
    const pos = this.position();

    if (this.positionMode() === 'absolute') {
      this.left.set(`${pos.x}px`);
      this.top.set(`${pos.y}px`);
      this.isPositioned.set(true);
      return;
    }

    if (!this.container()) return;

    const menuEl = this.container()!.nativeElement;
    const menuRect = menuEl.getBoundingClientRect();
    const gap = 8;

    const offsetParent = menuEl.offsetParent as HTMLElement || document.documentElement;
    const parentRect = offsetParent.getBoundingClientRect();

    let topPosition = pos.y - parentRect.top;
    let leftPosition = pos.x - parentRect.left;

    if (pos.x + menuRect.width > window.innerWidth - 10) {
      leftPosition = window.innerWidth - 10 - menuRect.width - parentRect.left;
      if (leftPosition < 0) leftPosition = 0;
    }

    const wouldGoBelow = pos.y + menuRect.height > window.innerHeight - 10;
    const topIfFlipped = pos.y - parentRect.top - menuRect.height;
    if (wouldGoBelow && topIfFlipped >= gap) {
      topPosition = topIfFlipped;
    }

    this.left.set(`${leftPosition}px`);
    this.top.set(`${topPosition}px`);
    this.isPositioned.set(true);
  }

  onItemClick(item: DcxContextMenuItem, event?: Event): void {
    event?.stopPropagation();

    if (item.disabled || item.divider) {
      return;
    }

    if (item.action) {
      item.action();
    }

    this.itemSelected.emit(item);

    if (!item.children || item.children.length === 0) {
      this.close();
    }
  }

  onListItemSelected(event: { item: DcxContextMenuItem; index: number }): void {
    this.onItemClick(event.item);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_event: Event): void {
    if (this.ignoreNextClick) {
      this.ignoreNextClick = false;
      return;
    }

    if (this.isOpen()) {
      this.close();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isOpen()) {
      this.calculatePosition();
    }
  }
}
