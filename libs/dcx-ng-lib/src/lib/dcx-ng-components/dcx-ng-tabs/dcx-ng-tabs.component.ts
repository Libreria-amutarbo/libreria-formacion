import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
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

  tabChange = output<string>();

  private _activeTabId = signal<string>('');

  activeTab = computed(() => {
    const id = this._activeTabId();
    return this.tabs().find(tab => tab.id === id);
  });

  constructor() {
    effect(() => {
      const initialId = this.activeTabId();
      if (initialId) {
        this._activeTabId.set(initialId);
      } else if (this.tabs().length > 0) {
        this._activeTabId.set(this.tabs()[0].id);
      }
    });
  }

  selectTab(tabId: string): void {
    if (this.disabled()) return;

    this._activeTabId.set(tabId);
    this.tabChange.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this._activeTabId() === tabId;
  }
}
