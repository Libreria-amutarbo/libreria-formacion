import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface DcxNgAccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'dcx-ng-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-accordion.component.html',
  styleUrl: './dcx-ng-accordion.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ 
        height: '0px',
        opacity: '0',
        overflow: 'hidden',
        visibility: 'hidden'
      })),
      state('expanded', style({ 
        height: '*',
        opacity: '1',
        overflow: 'visible',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class DcxNgAccordionComponent implements OnInit {
  @Input() items: DcxNgAccordionItem[] = [];
  @Output() itemToggled = new EventEmitter<DcxNgAccordionItem>();

  expandedItems: Set<string> = new Set();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Inicializa los items como collapsed
    if (this.items && this.items.length > 0) {
      this.expandedItems.clear();
    }
  }

  toggleItem(item: DcxNgAccordionItem): void {
    if (item.disabled) return;

    // Alterna el estado del item (abre/cierra)
    if (this.expandedItems.has(item.id)) {
      this.expandedItems.delete(item.id);
    } else {
      this.expandedItems.add(item.id);
    }

    this.itemToggled.emit(item);
    this.cdr.detectChanges();
  }

  isExpanded(itemId: string): boolean {
    return this.expandedItems.has(itemId);
  }

  getAnimationState(itemId: string): string {
    return this.isExpanded(itemId) ? 'expanded' : 'collapsed';
  }
}
