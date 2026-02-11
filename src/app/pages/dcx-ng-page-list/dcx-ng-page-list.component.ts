import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxListItem, DcxNgListComponent, LIST_ITEMS_WITH_ICONS, LIST_ITEMS_WITH_ICONS_ALT, LIST_ITEMS_WITH_SUBLISTS, SELECTABLE_LIST_ITEMS, SIMPLE_LIST_ITEMS, MULTI_SELECT_LIST_ITEMS } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  selector: 'dcx-ng-dcx-ng-page-list',
  standalone: true,
  imports: [CommonModule, DcxNgListComponent],
  templateUrl: './dcx-ng-page-list.component.html',
  styleUrl: './dcx-ng-page-list.component.scss',
})
export class DcxNgPageListComponent {
  elementosConIcono = LIST_ITEMS_WITH_ICONS_ALT;
  simpleItems = SIMPLE_LIST_ITEMS;
  itemsWithIcons = LIST_ITEMS_WITH_ICONS;
  itemsWithSublists = LIST_ITEMS_WITH_SUBLISTS;
  selectableItems = SELECTABLE_LIST_ITEMS;
  multiSelectItems = MULTI_SELECT_LIST_ITEMS;

  selectedItem: { item: DcxListItem } | null = null;
  selectedMultiItems: { item: DcxListItem; index: number }[] = [];

  onItemSelected($event: { item: DcxListItem }) {
    this.selectedItem = $event;
  }

  onMultiItemSelected($event: { item: DcxListItem; index: number }) {
    const exists = this.selectedMultiItems.find(item => item.index === $event.index);
    if (!exists) {
      this.selectedMultiItems = [...this.selectedMultiItems, $event];
    }
  }
}
