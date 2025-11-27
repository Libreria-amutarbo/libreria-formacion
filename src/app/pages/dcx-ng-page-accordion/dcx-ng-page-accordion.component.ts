import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgAccordionComponent, DcxNgAccordionItem } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-accordion-page',
  standalone: true,
  imports: [CommonModule, DcxNgAccordionComponent],
  templateUrl: './dcx-ng-page-accordion.component.html',
  styleUrl: './dcx-ng-page-accordion.component.scss',
})
export class DcxNgPageAccordionComponent {
  accordionItems: DcxNgAccordionItem[] = [
    {
      id: '1',
      title: 'Item 1',
      content: 'Item 1',
      disabled: false,
    },
    {
      id: '2',
      title: 'Item 2',
      content: 'Item 2',
      disabled: false,
    },
    {
      id: '3',
      title: 'Item 3',
      content: 'Item 3',
      disabled: false,
    },
  ];

  onItemToggled(item: DcxNgAccordionItem): void {
    console.log('Item toggled:', item.id, item.title);
  }
}
