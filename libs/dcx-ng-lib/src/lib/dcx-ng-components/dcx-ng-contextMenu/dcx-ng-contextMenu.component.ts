import { ChangeDetectionStrategy, Component, computed, HostListener, input, output, signal } from '@angular/core';
import { DcxContextMenuItem, DcxNgListComponent } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  imports: [DcxNgListComponent],
  templateUrl: './dcx-ng-contextMenu.component.html',
  styleUrl: './dcx-ng-contextMenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgContextMenuComponent {
  items = input.required<DcxContextMenuItem[]>();
  position = input<{ x: number; y: number }>({ x: 0, y: 0 });

  itemSelected = output<DcxContextMenuItem>();
  menuClosed = output<void>();

  isOpen = signal<boolean>(false);

  menuStyle = computed(() => {
    const pos = this.position();
    return {
      top: `${pos.y}px`,
      left: `${pos.x}px`,
    };
  });

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.menuClosed.emit();
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

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}

