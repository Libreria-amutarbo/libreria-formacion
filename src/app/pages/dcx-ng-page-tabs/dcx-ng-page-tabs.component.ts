import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DcxNgTabsComponent,
  DcxTabItemMock,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-tabs',
  standalone: true,
  imports: [DcxNgTabsComponent],
  templateUrl: './dcx-ng-page-tabs.component.html',
  styleUrls: ['./dcx-ng-page-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageTabsComponent {
  tabs = DcxTabItemMock;
  selectedTabId = signal<string>('tab1');

  onTabChange(tabId: string): void {
    this.selectedTabId.set(tabId);
  }
}
