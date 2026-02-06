import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxListItemType, DcxNgListComponent, LIST_ITEMS_WITH_ICONS, LIST_ITEMS_WITH_ICONS_ALT, LIST_ITEMS_WITH_SUBLISTS, MIXED_LIST_ITEMS, SELECTABLE_LIST_ITEMS, SIMPLE_LIST_ITEMS } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  selector: 'dcx-ng-dcx-ng-page-list',
  standalone: true,
  imports: [CommonModule, DcxNgListComponent],
  templateUrl: './dcx-ng-page-list.component.html',
  styleUrl: './dcx-ng-page-list.component.scss',
})
export class DcxNgPageListComponent {
  elementos = MIXED_LIST_ITEMS;
  elementosConIcono = LIST_ITEMS_WITH_ICONS_ALT;
  simpleItems = SIMPLE_LIST_ITEMS;
  itemsWithIcons = LIST_ITEMS_WITH_ICONS;
  itemsWithSublists = LIST_ITEMS_WITH_SUBLISTS;
  selectableItems = SELECTABLE_LIST_ITEMS;

  onItemSelected($event: { item: DcxListItemType; index: number; }) {
    console.log('Item seleccionado:', $event);
  }
}
