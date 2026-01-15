import { Component, signal, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  DcxNgAccordionComponent,
  DcxNgButtonComponent,
  DcxNgAccordionItem, 
  AccordionTransition,
  DcxAccordionMock,
  ACCORDION_ITEMS_WITH_ICONS,
  ACCORDION_ITEMS_COMPLEX
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-accordion-page',
  standalone: true,
  imports: [CommonModule, DcxNgAccordionComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-accordion.component.html',
  styleUrl: './dcx-ng-page-accordion.component.scss',
})
export class DcxNgPageAccordionComponent {
  selectedTransition = signal<AccordionTransition>('smooth');
  closeOthersEnabled = signal<boolean>(true);
  lastAction = signal<string>('');

  basicItems = DcxAccordionMock;
  itemsWithIcons = ACCORDION_ITEMS_WITH_ICONS;
  itemsWithDisabled = ACCORDION_ITEMS_COMPLEX;
  controlledItems = DcxAccordionMock;

  controlledAccordion = viewChild<DcxNgAccordionComponent>('controlledAccordion');

  onItemToggled(item: DcxNgAccordionItem, section: string): void {
    this.lastAction.set(`${section}: Toggled "${item.title}"`);
  }

  onItemExpanded(item: DcxNgAccordionItem, section: string): void {
    this.lastAction.set(`${section}: Expanded "${item.title}"`);
  }

  onItemCollapsed(item: DcxNgAccordionItem, section: string): void {
    this.lastAction.set(`${section}: Collapsed "${item.title}"`);
  }

  openSection(index: number): void {
    const accordion = this.controlledAccordion();
    if (accordion) {
      const itemId = String(index + 1);
      accordion.expandItemById(itemId);
      this.lastAction.set(`Programmatically opened Section ${index + 1}`);
    }
  }

  closeSection(index: number): void {
    const accordion = this.controlledAccordion();
    if (accordion) {
      const itemId = String(index + 1);
      accordion.collapseItemById(itemId);
      this.lastAction.set(`Programmatically closed Section ${index + 1}`);
    }
  }

  toggleTransition(): void {
    const transitions: AccordionTransition[] = ['smooth', 'fast', 'slow', 'none'];
    const currentIndex = transitions.indexOf(this.selectedTransition());
    const nextIndex = (currentIndex + 1) % transitions.length;
    this.selectedTransition.set(transitions[nextIndex]);
  }

  toggleCloseOthers(): void {
    this.closeOthersEnabled.update(value => !value);
  }
}
