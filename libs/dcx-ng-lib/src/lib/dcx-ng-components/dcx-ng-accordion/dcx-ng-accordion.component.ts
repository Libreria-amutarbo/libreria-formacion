import { Component, input, output, OnInit, ChangeDetectorRef, signal, ChangeDetectionStrategy, computed } from '@angular/core';
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
  imports: [],
  templateUrl: './dcx-ng-accordion.component.html',
  styleUrl: './dcx-ng-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class DcxNgAccordionComponent {
  readonly items = input<DcxNgAccordionItem[]>([]);
  readonly itemToggled = output<DcxNgAccordionItem>();

  private readonly _expandedItems = signal<Set<string>>(new Set());

  readonly hasItems = computed(() => this.items().length > 0);

  toggleItem(item: DcxNgAccordionItem): void {
    if (item.disabled) return;

    this._expandedItems.update(items => {
      const next = new Set(items);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });

    this.itemToggled.emit(item);
  }

  isExpanded(itemId: string): boolean {
    return this._expandedItems().has(itemId);
  }

  getAnimationState(itemId: string): string {
    return this.isExpanded(itemId) ? 'expanded' : 'collapsed';
  }
}
