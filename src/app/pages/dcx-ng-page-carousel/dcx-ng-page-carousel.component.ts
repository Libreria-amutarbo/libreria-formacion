import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DcxNgCarouselComponent,
  DcxNgCardComponent,
  DcxNgChipComponent,
  DcxNgListComponent,
  DcxNgRadioComponent,
  DcxNgDividerComponent,
  CAROUSEL_DEFAULT_ITEMS,
  CAROUSEL_MIXED_ITEMS,
  LIST_ITEMS_WITH_ICONS,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-carousel',
  standalone: true,
  imports: [
    CommonModule,
    DcxNgCarouselComponent,
    DcxNgCardComponent,
    DcxNgChipComponent,
    DcxNgListComponent,
    DcxNgRadioComponent,
    DcxNgDividerComponent,
  ],
  templateUrl: './dcx-ng-page-carousel.component.html',
  styleUrl: './dcx-ng-page-carousel.component.scss',
})
export class DcxNgPageCarouselComponent {
  defaultItems = CAROUSEL_DEFAULT_ITEMS;
  mixedItems = CAROUSEL_MIXED_ITEMS;
  listItems = LIST_ITEMS_WITH_ICONS;
}
