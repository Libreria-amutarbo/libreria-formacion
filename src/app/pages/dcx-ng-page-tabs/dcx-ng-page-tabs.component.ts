import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DcxNgTabsComponent,
  DcxTabsDefault,
  DcxTabsDisabled,
  DcxTabsWithComponents,
  DcxTabsWithIcons,
  DcxTabsWithRoutes,
  DcxTabsWithScroll,
  DcxNgButtonComponent,
  DcxNgSelectComponent,
  DcxNgCardComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-tabs',
  standalone: true,
  imports: [
    DcxNgTabsComponent,
    DcxNgCardComponent,
    DcxNgButtonComponent,
    DcxNgSelectComponent,
  ],
  templateUrl: './dcx-ng-page-tabs.component.html',
  styleUrls: ['./dcx-ng-page-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageTabsComponent {
  tabsDefault = DcxTabsDefault;
  tabsDisabled = DcxTabsDisabled;
  tabsWithIcons = DcxTabsWithIcons;
  tabsWithScroll = DcxTabsWithScroll;
  tabsWithComponents = DcxTabsWithComponents;
  tabsWithRoutes = DcxTabsWithRoutes;

  selectedTabId = 'tab1';

  onTabChange(tabId: string): void {
    this.selectedTabId = tabId;
  }
}
