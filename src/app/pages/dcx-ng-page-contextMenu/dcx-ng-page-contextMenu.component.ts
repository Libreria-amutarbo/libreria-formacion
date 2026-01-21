import { Component, signal } from '@angular/core';
import {
  ContextMenuComponent,
  ContextMenuItem,
  Position,
  DcxNgButtonComponent,
  DcxNgFullTableComponent,
  DcxNgFullTableTemplateDirective,
} from '@dcx-ng-components/dcx-ng-lib';
import {
  CONTEXT_MENU_ITEMS_BASIC,
  CONTEXT_MENU_ITEM_SINGLE,
  CONTEXT_MENU_ITEMS_MANY,
  CONTEXT_MENU_ITEMS_WITH_ICONS,
  CONTEXT_MENU_ITEMS_ADVANCED,
  TABLE_HEADERS_WITH_ACTIONS,
  TABLE_DATA_WITH_ACTIONS,
  getRowContextMenuItems,
  TableRowWithActions,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-context-menu',
  standalone: true,
  imports: [
    ContextMenuComponent,
    DcxNgButtonComponent,
    DcxNgFullTableComponent,
    DcxNgFullTableTemplateDirective,
  ],
  templateUrl: './dcx-ng-page-contextMenu.component.html',
  styleUrl: './dcx-ng-page-contextMenu.component.scss',
})
export class PageContextMenuComponent {
  basicMenuVisible = signal(false);
  basicMenuPosition = signal<Position>({ x: 0, y: 0 });
  basicMenuItems = CONTEXT_MENU_ITEMS_BASIC;

  singleMenuVisible = signal(false);
  singleMenuPosition = signal<Position>({ x: 0, y: 0 });
  singleMenuItems = CONTEXT_MENU_ITEM_SINGLE;

  manyMenuVisible = signal(false);
  manyMenuPosition = signal<Position>({ x: 0, y: 0 });
  manyMenuItems = CONTEXT_MENU_ITEMS_MANY;

  iconsMenuVisible = signal(false);
  iconsMenuPosition = signal<Position>({ x: 0, y: 0 });
  iconsMenuItems = CONTEXT_MENU_ITEMS_WITH_ICONS;

  advancedMenuVisible = signal(false);
  advancedMenuPosition = signal<Position>({ x: 0, y: 0 });
  advancedMenuItems = CONTEXT_MENU_ITEMS_ADVANCED;

  tableHeaders = TABLE_HEADERS_WITH_ACTIONS;
  tableData = TABLE_DATA_WITH_ACTIONS;
  activeMenuRow = signal(-1);
  tableMenuPosition = signal<Position>({ x: 0, y: 0 });

  onBasicContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.basicMenuPosition.set({ 
      x: event.clientX, 
      y: event.clientY 
    });
    this.basicMenuVisible.set(true);
  }

  onSingleContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.singleMenuPosition.set({ 
      x: event.clientX, 
      y: event.clientY 
    });
    this.singleMenuVisible.set(true);
  }

  onManyContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.manyMenuPosition.set({ 
      x: event.clientX, 
      y: event.clientY 
    });
    this.manyMenuVisible.set(true);
  }

  onIconsContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.iconsMenuPosition.set({ 
      x: event.clientX, 
      y: event.clientY 
    });
    this.iconsMenuVisible.set(true);
  }

  onAdvancedContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.advancedMenuPosition.set({ 
      x: event.clientX, 
      y: event.clientY 
    });
    this.advancedMenuVisible.set(true);
  }

  onButtonClick(event: MouseEvent, row: TableRowWithActions, rowIndex: number) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget as HTMLElement;
    const buttonRect = button.getBoundingClientRect();

    this.tableMenuPosition.set({
      x: buttonRect.right + 5,
      y: buttonRect.top
    });

    this.activeMenuRow.set(rowIndex);
  }

  getRowActions(row: TableRowWithActions): ContextMenuItem[] {
    return getRowContextMenuItems(row);
  }

  onTableMenuClosed() {
    this.activeMenuRow.set(-1);
  }
}
