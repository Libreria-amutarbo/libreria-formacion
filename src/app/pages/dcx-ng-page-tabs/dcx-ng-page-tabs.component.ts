import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DcxNgButtonComponent,
  DcxNgCardComponent,
  DcxNgSelectComponent,
  DcxNgTabsComponent,
  DcxTabItemDefault,
  DcxTabItemWithComponents,
  DcxTabItemWithDisabled,
  DcxTabItemWithIcons,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-tabs',
  standalone: true,
  imports: [
    DcxNgTabsComponent,
    DcxNgButtonComponent,
    DcxNgSelectComponent,
    DcxNgCardComponent,
  ],
  templateUrl: './dcx-ng-page-tabs.component.html',
  styleUrls: ['./dcx-ng-page-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageTabsComponent {
  tabsDefault = DcxTabItemDefault;
  tabsWithDisabled = DcxTabItemWithDisabled;
  tabsWithIcons = DcxTabItemWithIcons;
  selectedTabId = signal<string>('tab1');

  tabItemWithComponents = DcxTabItemWithComponents;
  selectedTabIdContent = signal<string>('button');

  onTabChange(tabId: string): void {
    this.selectedTabIdContent.set(tabId);
  }
}
