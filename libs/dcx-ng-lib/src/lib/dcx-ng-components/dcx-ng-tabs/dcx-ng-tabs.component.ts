import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DcxTabItem } from '../../core/interfaces';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-tabs',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-tabs.component.html',
  styleUrl: './dcx-ng-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTabsComponent {
  tabs = input.required<DcxTabItem[]>();

  variant = input<'line' | 'pill' | 'brand' | 'subtle'>('line');

  hasControls = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  activeTabId = input<string>('');
  ariaLabel = input<string | null>(null);

  tabChange = output<string>();

  private _activeTabId = signal<string>('');
  private _hasOverflow = signal<boolean>(false);
  private _canScrollLeft = signal<boolean>(false);
  private _canScrollRight = signal<boolean>(false);

  activeTab = computed(() => {
    const id = this._activeTabId();
    return this.tabs().find(t => t.id === id);
  });

  hasOverflow = computed(() => this._hasOverflow());
  canScrollLeft = computed(() => this._canScrollLeft());
  canScrollRight = computed(() => this._canScrollRight());

  tabHeaderClasses = computed(() => {
    const base = 'dcx-tabs__header';
    const variant = this.variant();
    const variantClass = this.getHeaderVariantClass(variant);

    return [base, variantClass].filter(Boolean).join(' ');
  });

  tabButtonClasses = (tabId: string) => {
    const base = 'dcx-tab__button';
    const variant = this.variant();
    const isActive = this.isActive(tabId);
    const tab = this.tabs().find(t => t.id === tabId);
    const isDisabled = !!tab?.disabled;
    const activeClass = isActive ? 'active' : '';
    const variantClass = this.getButtonVariantClass(variant);
    const disabledClass = isDisabled ? 'disabled' : '';

    return [base, activeClass, variantClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  };

  private getHeaderVariantClass(
    variant: 'line' | 'pill' | 'brand' | 'subtle',
  ): string {
    if (variant === 'brand') return 'dcx-tabs__header--brand';
    if (variant === 'pill') return 'dcx-tabs__header--pill';
    if (variant === 'subtle') return 'dcx-tabs__header--subtle';
    return '';
  }

  private getButtonVariantClass(
    variant: 'line' | 'pill' | 'brand' | 'subtle',
  ): string {
    if (variant === 'brand') return 'dcx-tab__button--brand';
    if (variant === 'pill') return 'dcx-tab__button--pill';
    if (variant === 'subtle') return 'dcx-tab__button--subtle';
    return '';
  }

  @ViewChild('tabsHeader', { static: false })
  tabsHeader!: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      const id = this.activeTabId();
      if (id) this._activeTabId.set(id);
    });

    effect(() => {
      this.tabs();
      setTimeout(() => this.checkOverflow(), 0);
    });
  }

  isButtonPressed(tabId: string): boolean {
    return this._activeTabId() === tabId;
  }

  selectTab(tabId: string): void {
    const tab = this.tabs().find(t => t.id === tabId);
    if (!tab || tab.disabled) return;

    this._activeTabId.set(tabId);
    this.tabChange.emit(tabId);

    this.scrollIntoView(tabId);
  }

  isActive(tabId: string): boolean {
    return this._activeTabId() === tabId;
  }

  private checkOverflow(): void {
    if (!this.tabsHeader) return;
    const element = this.tabsHeader.nativeElement;
    const hasOverflow = element.scrollWidth > element.clientWidth;
    this._hasOverflow.set(hasOverflow);
    this.updateScrollButtons();
  }

  updateScrollButtons(): void {
    if (!this.tabsHeader) return;
    const element = this.tabsHeader.nativeElement;
    this._canScrollLeft.set(element.scrollLeft > 0);
    this._canScrollRight.set(
      element.scrollLeft < element.scrollWidth - element.clientWidth - 5,
    );
  }

  scrollLeft(): void {
    this.tabsHeader.nativeElement.scrollBy({ left: -150, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.tabsHeader.nativeElement.scrollBy({ left: 150, behavior: 'smooth' });
  }

  private scrollIntoView(tabId: string) {
    const btn = this.findTabElement(tabId);
    if (btn) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }

  private findTabElement(tabId: string): HTMLElement | null {
    return this.tabsHeader?.nativeElement.querySelector(
      `[data-tab="${tabId}"]`,
    );
  }

  onKeydown(event: KeyboardEvent): void {
    const list = this.tabs();
    const enabledIndices = list
      .map((tab, index) => (tab.disabled ? -1 : index))
      .filter(index => index !== -1);
    if (enabledIndices.length === 0) return;

    const currentIndex = list.findIndex(t => t.id === this._activeTabId());
    const posInEnabled = enabledIndices.indexOf(currentIndex);
    const count = enabledIndices.length;

    let targetIndex: number | null = null;
    if (event.key === 'ArrowRight') {
      targetIndex = enabledIndices[(posInEnabled + 1 + count) % count];
    } else if (event.key === 'ArrowLeft') {
      targetIndex = enabledIndices[(posInEnabled - 1 + count) % count];
    } else if (event.key === 'Home') {
      targetIndex = enabledIndices[0];
    } else if (event.key === 'End') {
      targetIndex = enabledIndices[count - 1];
    } else {
      return;
    }

    event.preventDefault();
    const targetTab = list[targetIndex];
    this.selectTab(targetTab.id);
    this.findTabElement(targetTab.id)?.focus();
  }
}
