import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  ViewChild,
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
  @ViewChild('container') container!: ElementRef;

  items = input.required<DcxContextMenuItem[]>();
  position = input<{ x: number; y: number }>({ x: 0, y: 0 });
  positionMode = input<'fixed' | 'absolute'>('fixed');

  itemSelected = output<DcxContextMenuItem>();
  menuClosed = output<void>();

  isOpen = signal<boolean>(false);
  isPositioned = signal<boolean>(false);
  top = signal<string>('-9999px');
  left = signal<string>('-9999px');

  private _openPosition: { x: number; y: number } | null = null;

  open(position?: { x: number; y: number }): void {
    if (position) {
      this._openPosition = position;
    }
    this.isOpen.set(true);
    setTimeout(() => {
      this.calculatePosition();
    });
  }

  close(): void {
    this._openPosition = null;
    this.isOpen.set(false);
    this.isPositioned.set(false);
    this.menuClosed.emit();
  }

  private calculatePosition(): void {
    const pos = this._openPosition ?? this.position();

    if (this.positionMode() === 'absolute') {
      this.left.set(`${pos.x}px`);
      this.top.set(`${pos.y}px`);
      this.isPositioned.set(true);
      return;
    }

    // Fixed mode: pos.x/y are already viewport coordinates (clientX/Y).
    // Do NOT subtract parentRect — getBoundingClientRect on the documentElement
    // returns { top: -scrollY } when scrolled, which would incorrectly shift the menu.
    let leftPosition = pos.x;
    let topPosition = pos.y;
    const padding = 10;

    if (this.container) {
      const menuRect = this.container.nativeElement.getBoundingClientRect();

      if (leftPosition + menuRect.width > window.innerWidth - padding) {
        leftPosition = window.innerWidth - padding - menuRect.width;
        if (leftPosition < 0) leftPosition = 0;
      }

      if (topPosition + menuRect.height > window.innerHeight - padding) {
        const flipped = topPosition - menuRect.height;
        topPosition = flipped >= 0 ? flipped : padding;
      }
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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.container?.nativeElement.contains(event.target as Node)) {
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
