import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent, ContextMenuItem } from '@dcx-ng-components/dcx-ng-lib';

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
  menuPosition = { x: 0, y: 0 };

  openMenu(event: MouseEvent, rowData: any) {
    event.stopPropagation();

    this.currentRow = rowData;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    this.menuPosition = {
      x: rect.right + 6,
      y: rect.top + window.scrollY
    };

    this.menuVisible = true;
    this.menuItems = this.rowActions
      ? this.rowActions(rowData)
      : [
        { label: 'Editar', action: () => this.onEdit(rowData) },
        { label: 'Eliminar', action: () => this.onDelete(rowData) }
      ];

    this.menuVisible = true;
  }
}
