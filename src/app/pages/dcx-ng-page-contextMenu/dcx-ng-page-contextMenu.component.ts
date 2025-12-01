import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent, ContextMenuItem, Position } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-context-menu',
  standalone: true,
  imports: [CommonModule, ContextMenuComponent],
  templateUrl: './dcx-ng-page-contextMenu.component.html',
  styleUrl: './dcx-ng-page-contextMenu.component.scss',
})
export class PageContextMenuComponent {
  menuItems: ContextMenuItem[] = [];
  menuVisible = false;
  menuPosition: Position = { x: 0, y: 0 };
  currentRow: any;
  rowActions: ((row: any) => ContextMenuItem[]) | null = null;

  openMenu(event: MouseEvent, rowData: any) {
    event.stopPropagation();

    this.currentRow = rowData;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    this.menuPosition = {
      x: rect.right + 6,
      y: rect.top + window.scrollY
    };

    this.menuItems = this.rowActions
      ? this.rowActions(rowData)
      : [
        { label: 'Editar', action: () => this.onEdit() },
        { label: 'Eliminar', action: () => this.onDelete() }
      ];

    this.menuVisible = true;
  }

  onEdit() {
    this.menuVisible = false;
  }

  onDelete() {
    this.menuVisible = false;
  }
}
