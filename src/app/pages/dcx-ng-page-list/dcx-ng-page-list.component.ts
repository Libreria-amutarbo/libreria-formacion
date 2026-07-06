import { Component, signal } from '@angular/core';
import {
  DcxListItem,
  DcxNgListComponent,
  DcxNgChipComponent,
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
  LIST_ITEMS_WITH_ICONS,
  LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
  LIST_ITEMS_WITH_SUBLISTS,
  SELECTABLE_LIST_ITEMS,
  SIMPLE_LIST_ITEMS,
  MULTI_SELECT_LIST_ITEMS,
} from '@dcx-ng-components/dcx-ng-lib';

type ListSelectionEvent = { item: DcxListItem; index: number };

@Component({
  selector: 'dcx-ng-page-list',
  standalone: true,
  imports: [DcxNgListComponent, DcxNgChipComponent],
  templateUrl: './dcx-ng-page-list.component.html',
  styleUrl: './dcx-ng-page-list.component.scss',
})
export class DcxNgPageListComponent {
  readonly elementosConIcono = LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION;
  readonly simpleItems = SIMPLE_LIST_ITEMS;
  readonly itemsWithIcons = LIST_ITEMS_WITH_ICONS;
  readonly itemsWithSublists = LIST_ITEMS_WITH_SUBLISTS;
  readonly selectableItems = SELECTABLE_LIST_ITEMS;
  readonly multiSelectItems = MULTI_SELECT_LIST_ITEMS;
  readonly itemsWithDivider = LIST_ITEMS_WITH_DIVIDER;
  readonly enabledDisabledItems = LIST_ENABLED_DISABLED_ITEMS;

  readonly dangerItems: DcxListItem[] = [
    { id: 'edit', text: 'Editar', icon: 'pencil' },
    { id: 'duplicate', text: 'Duplicar', icon: 'files' },
    { id: 'delete', text: 'Eliminar', icon: 'trash', variant: 'danger' },
  ];

  readonly selectedItem = signal<DcxListItem | null>(null);
  readonly selectedMultiItems = signal<ListSelectionEvent[]>([]);
  readonly externalSelectedIndex = signal<number | null>(null);

  onItemSelected(event: ListSelectionEvent): void {
    this.selectedItem.set(event.item);
  }

  onItemDeselected(): void {
    this.selectedItem.set(null);
  }

  onMultiSelected(event: ListSelectionEvent): void {
    this.selectedMultiItems.update(items => [...items, event]);
  }

  onMultiDeselected(event: ListSelectionEvent): void {
    this.selectedMultiItems.update(items =>
      items.filter(i => i.index !== event.index),
    );
  }

  onExternalSelected(event: ListSelectionEvent): void {
    this.externalSelectedIndex.set(event.index);
  }
}
