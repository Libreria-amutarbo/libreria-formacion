import { 
  Component, 
  input, 
  output, 
  signal, 
  ChangeDetectionStrategy, 
  computed,
  effect,
  TemplateRef,
  ViewContainerRef,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

export type AccordionTransition = 'smooth' | 'fast' | 'slow' | 'none';

export interface DcxNgAccordionItem {
  id: string;
  title: string;
  content?: string;
  contentTemplate?: TemplateRef<any>;
  disabled?: boolean;
  disabledContent?: boolean;
  icon?: string;
  expanded?: boolean;
}

@Component({
  selector: 'dcx-ng-accordion',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-accordion.component.html',
  styleUrl: './dcx-ng-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DcxNgAccordionComponent {
  // Inputs
  readonly items = input<DcxNgAccordionItem[]>([]);
  readonly transition = input<AccordionTransition>('smooth');
  readonly closeOthers = input<boolean>(true);
  readonly expandedIds = input<string[]>([]);
  
  // Outputs
  readonly itemToggled = output<DcxNgAccordionItem>();
  readonly itemExpanded = output<DcxNgAccordionItem>();
  readonly itemCollapsed = output<DcxNgAccordionItem>();

  // Internal state
  private readonly _expandedItems = signal<Set<string>>(new Set());

  // Computed
  readonly hasItems = computed(() => this.items().length > 0);

  constructor() {
    // Initialize expanded items from input or item defaults
    effect(() => {
      const inputExpandedIds = this.expandedIds();
      const items = this.items();
      const expandedSet = new Set<string>();

      // First priority: expandedIds input
      if (inputExpandedIds.length > 0) {
        inputExpandedIds.forEach(id => expandedSet.add(id));
      } else {
        // Second priority: items with expanded=true
        items.forEach(item => {
          if (item.expanded) {
            expandedSet.add(item.id);
          }
        });
      }

      this._expandedItems.set(expandedSet);
    });
  }

  toggleItem(item: DcxNgAccordionItem): void {
    if (item.disabled) return;

    const isCurrentlyExpanded = this.isExpanded(item.id);

    this._expandedItems.update(items => {
      const next = new Set(items);
      
      if (isCurrentlyExpanded) {
        // Collapse current item
        next.delete(item.id);
        this.itemCollapsed.emit(item);
      } else {
        // Expand current item
        if (this.closeOthers()) {
          // Close all other items
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
