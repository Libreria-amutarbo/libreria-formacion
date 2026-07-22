import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  DcxWebAccordionTransition,
  DcxWebAccordionVariant,
  DcxWebAccordionItem,
} from '../../core/interfaces';
import { styles } from './dcx-web-accordion.component.styles';
import { template } from './dcx-web-accordion.component.html';
import '../dcx-web-icon/dcx-web-icon.component';

@customElement('dcx-web-accordion')
export class DcxWebAccordion extends LitElement {
  @property({ type: Array }) accessor items: DcxWebAccordionItem[] = [];
  @property({ type: String }) accessor transition: DcxWebAccordionTransition =
    'smooth';
  @property({ type: Boolean, attribute: 'close-others' }) accessor closeOthers =
    true;
  @property({ type: Array, attribute: 'expanded-ids' })
  accessor expandedIds: string[] = [];
  @property({ type: String }) accessor variant: DcxWebAccordionVariant =
    'default';
  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = null;

  @state() private accessor _expandedItems = new Set<string>();

  override willUpdate(changedProperties: Map<PropertyKey, unknown>) {
    if (
      changedProperties.has('expandedIds') ||
      changedProperties.has('items')
    ) {
      const expandedSet = new Set<string>();
      if (this.expandedIds && this.expandedIds.length > 0) {
        this.expandedIds.forEach(id => expandedSet.add(id));
      } else if (this.items) {
        this.items.forEach(item => {
          if (item.expanded) expandedSet.add(item.id);
        });
      }
      this._expandedItems = expandedSet;
    }
  }

  toggleItem(item: DcxWebAccordionItem): void {
    if (item.disabled) return;

    const isCurrentlyExpanded = this.isExpanded(item.id);
    const next = new Set(this._expandedItems);

    if (isCurrentlyExpanded) {
      next.delete(item.id);
      this.dispatchEvent(
        new CustomEvent('itemCollapsed', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    } else {
      if (this.closeOthers) {
        next.clear();
      }
      next.add(item.id);
      this.dispatchEvent(
        new CustomEvent('itemExpanded', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    }

    this._expandedItems = next;
    this.dispatchEvent(
      new CustomEvent('itemToggled', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
    this.requestUpdate();
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
    const item = this.items.find(i => i.id === itemId);
    if (!item || item.disabled || this.isExpanded(itemId)) return;

    const next = new Set(this._expandedItems);
    if (this.closeOthers) {
      next.clear();
    }
    next.add(itemId);
    this._expandedItems = next;

    this.dispatchEvent(
      new CustomEvent('itemExpanded', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(
      new CustomEvent('itemToggled', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
    this.requestUpdate();
  }

  collapseItemById(itemId: string): void {
    const item = this.items.find(i => i.id === itemId);
    if (!item || !this.isExpanded(itemId)) return;

    const next = new Set(this._expandedItems);
    next.delete(itemId);
    this._expandedItems = next;

    this.dispatchEvent(
      new CustomEvent('itemCollapsed', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(
      new CustomEvent('itemToggled', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
    this.requestUpdate();
  }

  isExpanded(itemId: string): boolean {
    return this._expandedItems.has(itemId);
  }

  expandAll(): void {
    const expandable = this.items.filter(item => !item.disabled);
    this._expandedItems = new Set(expandable.map(i => i.id));
    expandable.forEach(item => {
      this.dispatchEvent(
        new CustomEvent('itemExpanded', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('itemToggled', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    });
    this.requestUpdate();
  }

  collapseAll(): void {
    const wasExpanded = this.items.filter(item => this.isExpanded(item.id));
    this._expandedItems = new Set();
    wasExpanded.forEach(item => {
      this.dispatchEvent(
        new CustomEvent('itemCollapsed', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
      this.dispatchEvent(
        new CustomEvent('itemToggled', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    });
    this.requestUpdate();
  }

  private navigateFocus(direction: 'next' | 'prev' | 'first' | 'last'): void {
    const buttons = Array.from(
      this.shadowRoot?.querySelectorAll(
        'button.dcx-accordion__header:not([disabled])',
      ) || [],
    ) as HTMLButtonElement[];
    if (!buttons.length) return;

    const activeEl = this.shadowRoot?.activeElement || document.activeElement;
    const currentIndex = buttons.indexOf(activeEl as HTMLButtonElement);

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

  private _getIconName(iconName: string): string {
    const lower = iconName.toLowerCase();
    if (lower === 'chevron-down') return 'chevron-down';
    if (lower.includes('speedometer')) return 'speedometer2';
    if (lower.includes('gear')) return 'gear-fill';
    if (lower === 'user' || lower === 'user-fill') return 'person-fill';
    if (lower.includes('person')) return 'person-fill';
    if (lower.includes('info')) return 'info-circle-fill';
    if (lower.includes('star')) return 'star-fill';
    if (lower === 'help' || lower === 'help-fill') return 'question-circle-fill';
    if (lower.includes('question')) return 'question-circle-fill';
    if (lower.includes('clock') || lower.includes('history')) return 'clock-history';
    if (lower === 'hand-pointer') return 'hand-index-thumb-fill';
    if (lower.includes('hand') || lower.includes('pointer')) return 'hand-index-thumb-fill';
    if (lower === 'file-text') return 'file-earmark-text';
    if (lower.includes('file') || lower.includes('text')) return 'file-earmark-text';
    if (lower === 'list') return 'list';
    return iconName;
  }

  renderIcon(iconName: string) {
    const mappedName = this._getIconName(iconName);
    if (iconName.toLowerCase() === 'chevron-down') {
      return html`<dcx-web-icon name="${mappedName}" size="auto"></dcx-web-icon>`;
    }
    return html`<dcx-web-icon name="${mappedName}"></dcx-web-icon>`;
  }

  static override styles = styles;

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-accordion': DcxWebAccordion;
  }
}
