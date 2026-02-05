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
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxTabItem } from '../../core/interfaces/tabs';

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
  activeTabId = input<string>('');
  disabled = input<boolean>(false);
  controls = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  tabChange = output<string>();

  private _activeTabId = signal<string>('');

  @ViewChild('header', { static: false }) headerElement!: ElementRef;

  activeTab = computed(() => {
    const id = this._activeTabId();
    return this.tabs().find(tab => tab.id === id);
  });

  constructor() {
    effect(() => {
      this._activeTabId.set(this.activeTabId());
    });
  }

  selectTab(tabId: string): void {
    this._activeTabId.set(tabId);
    this.tabChange.emit(tabId);
    this.scrollToActive();
  }

  isActive(tabId: string): boolean {
    return this._activeTabId() === tabId;
  }

  scrollToActive(): void {
    if (this.headerElement) {
      const activeButton =
        this.headerElement.nativeElement.querySelector('.active');
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }

  scrollLeft(): void {
    if (this.headerElement) {
      this.headerElement.nativeElement.scrollBy({
        left: -100,
        behavior: 'smooth',
      });
    }
  }

  scrollRight(): void {
    if (this.headerElement) {
      this.headerElement.nativeElement.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
    }
  }
}
