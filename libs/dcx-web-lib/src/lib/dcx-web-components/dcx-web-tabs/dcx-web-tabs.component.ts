import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

import { template } from './dcx-web-tabs.component.html';
import { styles } from './dcx-web-tabs.component.styles';

import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';

import type { DcxTabItem, DcxTabsVariant } from '../../core/interfaces/tabs';

@customElement('dcx-web-tabs')
export class DcxWebTabs extends LitElement {
  @property({ attribute: false })
  accessor tabs: DcxTabItem[] = [];

  @property({ type: String })
  accessor variant: DcxTabsVariant = 'line';

  @property({ type: Boolean })
  accessor hasControls = false;

  @property({ type: String })
  accessor activeTabId = '';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = null;

  @state()
  accessor _activeTabId = '';

  @state()
  accessor hasOverflow = false;

  @state()
  accessor canScrollLeft = false;

  @state()
  accessor canScrollRight = false;

  @query('[role="tablist"]')
  accessor tabsHeader!: HTMLDivElement;

  static override styles = styles;

  get activeTab() {
    return this.tabs.find(tab => tab.id === this._activeTabId);
  }

  get tabHeaderClasses() {
    return ['dcx-tabs__header', this.getHeaderVariantClass(this.variant)]
      .filter(Boolean)
      .join(' ');
  }

  override firstUpdated() {
    this.initializeActiveTab();

    requestAnimationFrame(() => {
      this.checkOverflow();
    });
  }

  override updated() {
    if (this.activeTabId && this.activeTabId !== this._activeTabId) {
      this._activeTabId = this.activeTabId;
    }

    requestAnimationFrame(() => {
      this.checkOverflow();
    });
  }

  private initializeActiveTab() {
    if (this.activeTabId) {
      this._activeTabId = this.activeTabId;
      return;
    }

    const firstEnabled = this.tabs.find(tab => !tab.disabled);

    if (firstEnabled) {
      this._activeTabId = firstEnabled.id;
    }
  }

  public emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  public isButtonPressed(tabId: string) {
    return this._activeTabId === tabId;
  }

  public isActive(tabId: string) {
    return this._activeTabId === tabId;
  }

  public selectTab(tabId: string) {
    const tab = this.tabs.find(item => item.id === tabId);

    if (!tab || tab.disabled) return;

    this._activeTabId = tabId;

    this.emit('tabChange', tabId);

    this.scrollTabIntoView(tabId);
  }

  private getHeaderVariantClass(variant: DcxTabsVariant) {
    if (variant === 'brand') return 'dcx-tabs__header--brand';

    if (variant === 'pill') return 'dcx-tabs__header--pill';

    if (variant === 'subtle') return 'dcx-tabs__header--subtle';

    return '';
  }

  private getButtonVariantClass(variant: DcxTabsVariant) {
    if (variant === 'brand') return 'dcx-tab__button--brand';

    if (variant === 'pill') return 'dcx-tab__button--pill';

    if (variant === 'subtle') return 'dcx-tab__button--subtle';

    return '';
  }

  public tabButtonClasses(tabId: string) {
    const tab = this.tabs.find(item => item.id === tabId);

    return [
      'dcx-tab__button',
      this.isActive(tabId) ? 'active' : '',
      this.getButtonVariantClass(this.variant),
      tab?.disabled ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private checkOverflow() {
    if (!this.tabsHeader) return;

    this.hasOverflow =
      this.tabsHeader.scrollWidth > this.tabsHeader.clientWidth;

    this.updateScrollButtons();
  }

  public updateScrollButtons = () => {
    if (!this.tabsHeader) return;

    this.canScrollLeft = this.tabsHeader.scrollLeft > 0;

    this.canScrollRight =
      this.tabsHeader.scrollLeft <
      this.tabsHeader.scrollWidth - this.tabsHeader.clientWidth - 5;
  };

  public scrollTabsLeft = () => {
    this.tabsHeader?.scrollBy({
      left: -150,
      behavior: 'smooth',
    });
  };

  public scrollTabsRight = () => {
    this.tabsHeader?.scrollBy({
      left: 150,
      behavior: 'smooth',
    });
  };

  private scrollTabIntoView(tabId: string) {
    this.findTabElement(tabId)?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }

  private findTabElement(tabId: string) {
    return this.tabsHeader?.querySelector(
      `[data-tab="${tabId}"]`,
    ) as HTMLElement | null;
  }

  public onKeydown = (event: KeyboardEvent) => {
    const enabledIndices = this.tabs
      .map((tab, i) => (tab.disabled ? -1 : i))
      .filter(i => i !== -1);

    if (!enabledIndices.length) return;

    const currentIndex = this.tabs.findIndex(
      tab => tab.id === this._activeTabId,
    );

    const current = enabledIndices.indexOf(currentIndex);

    const count = enabledIndices.length;

    let index: number | null = null;

    if (event.key === 'ArrowRight')
      index = enabledIndices[(current + 1 + count) % count];
    else if (event.key === 'ArrowLeft')
      index = enabledIndices[(current - 1 + count) % count];
    else if (event.key === 'Home') index = enabledIndices[0];
    else if (event.key === 'End') index = enabledIndices[count - 1];
    else return;

    event.preventDefault();

    const target = this.tabs[index];

    this.selectTab(target.id);

    this.findTabElement(target.id)?.focus();
  };

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-tabs': DcxWebTabs;
  }
}
