import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type {
  DcxWebAccordionTransition,
  DcxWebAccordionVariant,
  DcxWebAccordionItem,
} from '../../core/interfaces';
import { styles } from './dcx-web-accordion.component.styles';

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

  private _renderIcon(iconName: string) {
    const lowerName = iconName.toLowerCase();

    if (lowerName === 'chevron-down') {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
    }
    if (lowerName.includes('speedometer')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 0 0-7.35 16.76L12 14l7.35 4.76A10 10 0 0 0 12 2z"></path>
          <path d="M12 6v6"></path>
        </svg>
      `;
    }
    if (lowerName.includes('gear')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      `;
    }
    if (lowerName.includes('person') || lowerName.includes('user')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      `;
    }
    if (lowerName.includes('info')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }
    if (lowerName.includes('star')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      `;
    }
    if (lowerName.includes('question') || lowerName.includes('help')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
    }
    if (lowerName.includes('clock') || lowerName.includes('history')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      `;
    }
    if (lowerName.includes('hand') || lowerName.includes('pointer')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"></path>
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
          <path d="M6 14a4 4 0 0 0 8 0v-3h2v1a5 5 0 0 0 5 5h1"></path>
        </svg>
      `;
    }
    if (lowerName.includes('file') || lowerName.includes('text')) {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      `;
    }
    if (lowerName === 'list') {
      return html`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      `;
    }

    return html`<i class="bi bi-${iconName}"></i>`;
  }

  static override styles = styles;

  override render() {
    const accordionClasses = {
      'dcx-accordion': true,
      [`dcx-accordion--transition-${this.transition}`]: true,
      'dcx-accordion--flush': this.variant === 'flush',
    };

    return html`
      <div
        class="${classMap(accordionClasses)}"
        aria-label="${this.ariaLabel || nothing}"
      >
        ${this.items.map(item => {
          const isExpanded = this.isExpanded(item.id);
          const itemClasses = {
            'dcx-accordion__item': true,
            'dcx-accordion__item--disabled': !!item.disabled,
            'dcx-accordion__item--expanded': isExpanded,
          };
          const contentWrapperClasses = {
            'dcx-accordion__content-wrapper': true,
            'dcx-accordion__content-wrapper--expanded': isExpanded,
            'dcx-accordion__content-wrapper--disabled-content':
              !!item.disabledContent,
          };
          const contentClasses = {
            'dcx-accordion__content': true,
            'dcx-accordion__content--scrollable': !!item.maxContentHeight,
          };
          const contentStyles = {
            maxHeight: item.maxContentHeight || null,
          };

          return html`
              <div class="${classMap(itemClasses)}">
                <h3 class="dcx-accordion__heading">
                  <button
                    class="dcx-accordion__header"
                    id="accordion-header-${item.id}"
                    aria-expanded="${isExpanded}"
                    aria-controls="accordion-content-${item.id}"
                    ?disabled="${item.disabled}"
                    @click="${() => this.toggleItem(item)}"
                    @keydown="${this.onHeaderKeydown}"
                  >
                    ${
                      item.icon
                        ? html`
                          <span class="dcx-accordion__icon" aria-hidden="true">
                            ${this._renderIcon(item.icon)}
                          </span>
                        `
                        : nothing
                    }
                    <span class="dcx-accordion__title-group">
                      <span class="dcx-accordion__title">${item.title}</span>
                      ${
                        item.description
                          ? html`
                            <span class="dcx-accordion__description"
                              >${item.description}</span
                            >
                          `
                          : nothing
                      }
                    </span>
                    <span class="dcx-accordion__chevron" aria-hidden="true">
                      ${this._renderIcon('chevron-down')}
                    </span>
                  </button>
                </h3>

                <div
                  class="${classMap(contentWrapperClasses)}"
                  id="accordion-content-${item.id}"
                  aria-labelledby="accordion-header-${item.id}"
                  aria-hidden="${!isExpanded}"
                  role="region"
                >
                  <div
                    class="${classMap(contentClasses)}"
                    style="${styleMap(contentStyles)}"
                  >
                    ${
                      item.contentTemplate
                        ? typeof item.contentTemplate === 'function'
                          ? item.contentTemplate()
                          : item.contentTemplate
                        : item.content
                          ? unsafeHTML(item.content)
                          : ''
                    }
                  </div>
                </div>
              </div>
            `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-accordion': DcxWebAccordion;
  }
}
