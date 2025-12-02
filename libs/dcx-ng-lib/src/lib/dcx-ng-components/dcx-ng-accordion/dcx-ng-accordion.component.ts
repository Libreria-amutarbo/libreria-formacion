import { Component, input, output, signal, ChangeDetectionStrategy, computed } from '@angular/core';

export interface DcxNgAccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'dcx-ng-accordion',
  templateUrl: './dcx-ng-accordion.component.html',
  styleUrl: './dcx-ng-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
}
