import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  DcxNgAccordionComponent, 
  DcxNgAccordionItem,
  DcxAccordionMock,
  ACCORDION_ITEMS_WITH_ICONS,
  ACCORDION_ITEMS_WITH_EXPANDED,
  ACCORDION_ITEMS_COMPLEX,
  ACCORDION_ITEMS_LARGE_CONTENT
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-accordion-page',
  standalone: true,
  imports: [CommonModule, DcxNgAccordionComponent],
  templateUrl: './dcx-ng-page-accordion.component.html',
  styleUrl: './dcx-ng-page-accordion.component.scss',
})
export class DcxNgPageAccordionComponent {
  defaultItems = DcxAccordionMock;

  withIconsItems = ACCORDION_ITEMS_WITH_ICONS;

  withDisabledItems = ACCORDION_ITEMS_COMPLEX;

  multipleOpenItems = DcxAccordionMock;

  defaultExpandedItems = ACCORDION_ITEMS_WITH_EXPANDED;

  fastTransitionItems = DcxAccordionMock;

  slowTransitionItems = DcxAccordionMock;

  noTransitionItems = DcxAccordionMock;

  largeContentItems = ACCORDION_ITEMS_LARGE_CONTENT;

}
