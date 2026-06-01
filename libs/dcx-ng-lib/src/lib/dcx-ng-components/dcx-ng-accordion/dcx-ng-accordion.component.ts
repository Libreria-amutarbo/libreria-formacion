import {
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DcxNgAccordionItem,
  DcxAccordionTransition,
  DcxAccordionVariant,
} from '../../core/interfaces';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-accordion',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-accordion.component.html',
  styleUrl: './dcx-ng-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgAccordionComponent {
  private readonly el = inject(ElementRef);

  items = input<DcxNgAccordionItem[]>([]);
  transition = input<DcxAccordionTransition>('smooth');
  closeOthers = input<boolean>(true);
  expandedIds = input<string[]>([]);
  variant = input<DcxAccordionVariant>('default');
  ariaLabel = input<string | null>(null);

  itemToggled = output<DcxNgAccordionItem>();
  itemExpanded = output<DcxNgAccordionItem>();
  itemCollapsed = output<DcxNgAccordionItem>();

  private _expandedItems = signal<Set<string>>(new Set());

  // Only re-runs when expandedIds changes; items is read without tracking
  // to avoid resetting user-driven state when the items array is updated.
  private readonly _initEffect = effect(() => {
    const inputExpandedIds = this.expandedIds();
    const items = untracked(() => this.items());
    const expandedSet = new Set<string>();

    if (inputExpandedIds.length > 0) {
      inputExpandedIds.forEach(id => expandedSet.add(id));
    } else {
      items.forEach(item => {
        if (item.expanded) expandedSet.add(item.id);
      });
    }

    this._expandedItems.set(expandedSet);
  });

  toggleItem(item: DcxNgAccordionItem): void {
    if (item.disabled) return;

    const isCurrentlyExpanded = this.isExpanded(item.id);

    this._expandedItems.update(items => {
      const next = new Set(items);

      if (isCurrentlyExpanded) {
        next.delete(item.id);
        this.itemCollapsed.emit(item);
      } else {
        if (this.closeOthers()) next.clear();
        next.add(item.id);
        this.itemExpanded.emit(item);
      }

      return next;
    });

    this.itemToggled.emit(item);
  }

  onHeaderKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateFocus('next');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateFocus('prev');
        break;
      case 'Home':
        event.preventDefault();
        this.navigateFocus('first');
        break;
      case 'End':
        event.preventDefault();
        this.navigateFocus('last');
        break;
    }
  }

  expandItemById(itemId: string): void {
    const item = this.items().find(i => i.id === itemId);
    if (!item || item.disabled || this.isExpanded(itemId)) return;

    this._expandedItems.update(items => {
      const next = new Set(items);
      if (this.closeOthers()) next.clear();
      next.add(itemId);
      return next;
    });

    this.itemExpanded.emit(item);
    this.itemToggled.emit(item);
  }

  collapseItemById(itemId: string): void {
    const item = this.items().find(i => i.id === itemId);
    if (!item || !this.isExpanded(itemId)) return;

    this._expandedItems.update(items => {
      const next = new Set(items);
      next.delete(itemId);
      return next;
    });

    this.itemCollapsed.emit(item);
    this.itemToggled.emit(item);
  }

  isExpanded(itemId: string): boolean {
    return this._expandedItems().has(itemId);
  }

  accordionClasses = computed<string>(() => {
    const classes = [this.getTransitionClass()];
    if (this.variant() === 'flush') classes.push('accordion--flush');
    return classes.join(' ');
  });

  expandAll(): void {
    const expandable = this.items().filter(item => !item.disabled);
    this._expandedItems.set(new Set(expandable.map(i => i.id)));
    expandable.forEach(item => {
      this.itemExpanded.emit(item);
      this.itemToggled.emit(item);
    });
  }

  collapseAll(): void {
    const wasExpanded = this.items().filter(item => this.isExpanded(item.id));
    this._expandedItems.set(new Set());
    wasExpanded.forEach(item => {
      this.itemCollapsed.emit(item);
      this.itemToggled.emit(item);
    });
  }

  getTransitionClass(): string {
    return `transition-${this.transition()}`;
  }

  // Always returns chevron-down; CSS rotation handles the open/close flip.
  getIconItemExpanded(): string {
    return 'chevron-down';
  }

  private navigateFocus(direction: 'next' | 'prev' | 'first' | 'last'): void {
    const buttons = Array.from(
      this.el.nativeElement.querySelectorAll(
        'button.accordion-header:not([disabled])',
      ),
    ) as HTMLButtonElement[];
    if (!buttons.length) return;

    const currentIndex = buttons.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    let nextIndex: number;
    switch (direction) {
      case 'next':
        nextIndex = (currentIndex + 1) % buttons.length;
        break;
      case 'prev':
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        break;
      case 'first':
        nextIndex = 0;
        break;
      case 'last':
        nextIndex = buttons.length - 1;
        break;
    }

    buttons[nextIndex]?.focus();
  }
}
