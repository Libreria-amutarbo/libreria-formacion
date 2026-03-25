import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DcxListItem,
  DcxNgListComponent,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_ICONS_ALT,
  LIST_ITEMS_WITH_SUBLISTS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  MULTI_SELECT_LIST_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';

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

  selectedItem = signal<DcxListItem | null>(null);
  selectedMultiItems = signal<{ item: DcxListItem; index: number }[]>([]);

  onSelectionChanged($event: { item: DcxListItem; index: number }[]) {
    this.selectedItem.set($event.length > 0 ? $event[0].item : null);
  }

  onMultiSelectionChanged($event: { item: DcxListItem; index: number }[]) {
    this.selectedMultiItems.set($event);
  }
}
