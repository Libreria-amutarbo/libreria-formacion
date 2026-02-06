import { 
  Component, 
  input, 
  output, 
  signal, 
  ChangeDetectionStrategy, 
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';
import { AccordionTransition, DcxNgAccordionItem } from '../../core/interfaces/accordion';

@Component({
  selector: 'dcx-ng-accordion',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-accordion.component.html',
  styleUrl: './dcx-ng-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DcxNgAccordionComponent {
  readonly items = input<DcxNgAccordionItem[]>([]);
  readonly transition = input<AccordionTransition>('smooth');
  readonly closeOthers = input<boolean>(true);
  readonly expandedIds = input<string[]>([]);
  
  readonly itemToggled = output<DcxNgAccordionItem>();
  readonly itemExpanded = output<DcxNgAccordionItem>();
  readonly itemCollapsed = output<DcxNgAccordionItem>();

  private readonly _expandedItems = signal<Set<string>>(new Set());

  constructor() {
    effect(() => {
      const inputExpandedIds = this.expandedIds();
      const items = this.items();
      const expandedSet = new Set<string>();

      if (inputExpandedIds.length > 0) {
        inputExpandedIds.forEach(id => expandedSet.add(id));
      } else {
        items.forEach(item => {
          if (item.expanded) {
            expandedSet.add(item.id);
          }
        });
      }

      this._expandedItems.set(expandedSet);
    });
  }

  onButtonClick(item: DcxNgAccordionItem): void {
    this.toggleItem(item);
  }

  onHeaderKeydown(event: KeyboardEvent, item: DcxNgAccordionItem): void {
    event.preventDefault();
    this.toggleItem(item);
  }

  toggleItem(item: DcxNgAccordionItem): void {
    if (item.disabled) return;

    const isCurrentlyExpanded = this.isExpanded(item.id);

    this._expandedItems.update(items => {
      const next = new Set(items);
      
      if (isCurrentlyExpanded) {
        next.delete(item.id);
        this.itemCollapsed.emit(item);
      } else {
        if (this.closeOthers()) {
          next.clear();
        }
        next.add(item.id);
        this.itemExpanded.emit(item);
      }
      
      return next;
    });

    this.itemToggled.emit(item);
  }

  expandItemById(itemId: string): void {
    const item = this.items().find(i => i.id === itemId);
    if (!item || item.disabled || this.isExpanded(itemId)) return;

    this._expandedItems.update(items => {
      const next = new Set(items);
      
      if (this.closeOthers()) {
        next.clear();
      }
      next.add(itemId);
      
      return next;
    });

    if (item) {
      this.itemExpanded.emit(item);
      this.itemToggled.emit(item);
    }
  }

  collapseItemById(itemId: string): void {
    const item = this.items().find(i => i.id === itemId);
    if (!item || !this.isExpanded(itemId)) return;

    this._expandedItems.update(items => {
      const next = new Set(items);
      next.delete(itemId);
      return next;
    });

    if (item) {
      this.itemCollapsed.emit(item);
      this.itemToggled.emit(item);
    }
  }

  isExpanded(itemId: string): boolean {
    return this._expandedItems().has(itemId);
  }

  getTransitionClass(): string {
    const transition = this.transition();
    return `transition-${transition}`;
  }
}
