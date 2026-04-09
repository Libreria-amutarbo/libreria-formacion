import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DcxListItem,
  DcxNgListComponent,
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
  LIST_ITEMS_WITH_SUBLISTS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  MULTI_SELECT_LIST_ITEMS,
  DcxNgDividerComponent,
  DcxNgChipComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-list',
  standalone: true,
  imports: [
    CommonModule,
    DcxNgListComponent,
    DcxNgDividerComponent,
    DcxNgChipComponent,
  ],
  templateUrl: './dcx-ng-page-list.component.html',
  styleUrl: './dcx-ng-page-list.component.scss',
})
export class DcxNgPageListComponent {
  elementosConIcono = LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION;
  simpleItems = SIMPLE_LIST_ITEMS;
  itemsWithIcons = LIST_ITEMS_WITH_ICONS;
  itemsWithSublists = LIST_ITEMS_WITH_SUBLISTS;
  selectableItems = SELECTABLE_LIST_ITEMS;
  multiSelectItems = MULTI_SELECT_LIST_ITEMS;
  itemsWithDivider = LIST_ITEMS_WITH_DIVIDER;
  enabledDisabledItems = LIST_ENABLED_DISABLED_ITEMS;

  selectedItem = signal<DcxListItem | null>(null);
  selectedMultiItems = signal<{ item: DcxListItem; index: number }[]>([]);

  onSelectionChanged($event: any) {
    const payload = $event as { item: DcxListItem; index: number }[];
    this.selectedItem.set(
      payload && payload.length > 0 ? payload[0].item : null,
    );
  }

  onMultiSelectionChanged($event: any) {
    const payload = $event as { item: DcxListItem; index: number }[];
    this.selectedMultiItems.set(payload || []);
  }
}
