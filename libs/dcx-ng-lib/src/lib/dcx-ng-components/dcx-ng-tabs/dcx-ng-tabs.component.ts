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
import {
  DcxNgButtonComponent,
  DcxTabItem,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-tabs',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-tabs.component.html',
  styleUrl: './dcx-ng-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTabsComponent {
  tabs = input.required<DcxTabItem[]>();

  public hasControls = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  activeTabId = input<string>('');

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

  scrollIntoView(tabId: string) {
    const container = this.tabsHeader.nativeElement;
    const btn = container.querySelector(`[data-tab="${tabId}"]`) as HTMLElement;
    if (btn) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }

  onKeydown(event: KeyboardEvent) {
    const list = this.tabs();
    const idx = list.findIndex(t => t.id === this._activeTabId());
    const last = list.length - 1;

    if (event.key === 'ArrowRight') {
      this.selectTab(list[(idx + 1) % list.length].id);
    } else if (event.key === 'ArrowLeft') {
      this.selectTab(list[(idx - 1 + list.length) % list.length].id);
    } else if (event.key === 'Home') {
      this.selectTab(list[0].id);
    } else if (event.key === 'End') {
      this.selectTab(list[last].id);
    }
  }
}
