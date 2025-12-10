import { Route } from '@angular/router';
import { DcxNgPageButtonComponent } from './pages/dcx-ng-page-button/dcx-ng-page-button.component';
import { DcxNgPageMessageComponent } from './pages/dcx-ng-page-message/dcx-ng-page-message.component';
import { DcxNgPageIconComponent } from './pages/dcx-ng-page-icon/dcx-ng-page-icon.component';
import { DcxNgPageSelectComponent } from './pages/dcx-ng-page-select/dcx-ng-page-select.component';
import { DcxNgPageDividerComponent } from './pages/dcx-ng-page-divider/dcx-ng-page-divider.component';
import { DcxNgPageToggleComponent } from './pages/dcx-ng-page-toggle/dcx-ng-page-toggle.component';
import { DcxNgPageRadioComponent } from './pages/dcx-ng-page-radio/dcx-ng-page-radio.component';
import { DcxNgPageInputComponent } from './pages/dcx-ng-page-input/dcx-ng-page-input.component';
import { DcxNgPageSpinnerComponent } from './pages/dcx-ng-page-spinner/dcx-ng-page-spinner.component';
import { DcxNgPagePaginatorComponent } from './pages/dcx-ng-page-paginator/dcx-ng-page-paginator.component';
import { DcxNgPageChipComponent } from './pages/dcx-ng-page-chip/dcx-ng-page-chip.component';
import { DcxNgPageTooltipComponent } from './pages/dcx-ng-page-tooltip/dcx-ng-page-tooltip.component';
import { DcxNgPageCheckboxComponent } from './pages/dcx-ng-page-checkbox/dcx-ng-page-checkbox.component';
import { DcxNgPageCardComponent } from './pages/dcx-ng-page-card/dcx-ng-page-card.component';
import { ContextMenuComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DcxNgPageSliderComponent } from './pages/dcx-ng-page-slider.component/dcx-ng-page-slider.component';
import { DcxNgPageDropdownComponent } from './pages/dcx-ng-page-dropdown/dcx-ng-page-dropdown.component';
import { DcxNgPageIconFieldComponent } from './pages/dcx-ng-page-iconField/dcx-ng-page-iconField.component';
import { DcxNgPageListComponent } from './pages/dcx-ng-page-list/dcx-ng-page-list.component';
import { APP_ROUTES } from './core/constants/app-routes';
import { DxcNgPageDatePickerComponent } from './pages/dxc-ng-page-datePicker/dxc-ng-page-datePicker.component';
import { DcxNgPageDialogComponent } from './pages/dcx-ng-page-dialog/dcx-ng-page-dialog.component';
import { DcxNgPageSearchComponent } from './pages/dcx-ng-page-search/dcx-ng-page-search.component';
import { DcxNgPageAccordionComponent } from './pages/dcx-ng-page-accordion/dcx-ng-page-accordion.component';
import { DcxNgPageFullTableComponent } from './pages/dcx-ng-page-full-table/dcx-ng-page-full-table.component';
import { DcxNgPageTabsComponent } from './pages/dcx-ng-page-tabs/dcx-ng-page-tabs.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DcxNgPageFullTableComponent,
  },
  {    
    path: APP_ROUTES.TABLE,
    component: DcxNgPageFullTableComponent,
  },
  {
   path: APP_ROUTES.BUTTON,
    component: DcxNgPageButtonComponent,
  },
  {
    path: APP_ROUTES.MESSAGE,
    component: DcxNgPageMessageComponent,
  },
  {
    path: APP_ROUTES.ICON,
    component: DcxNgPageIconComponent,
  },
  {
    path: APP_ROUTES.SELECT,
    component: DcxNgPageSelectComponent,
  },
  {
    path: APP_ROUTES.DIVIDER,
    component: DcxNgPageDividerComponent,
  },
  {
    path: APP_ROUTES.TOGGLE,
    component: DcxNgPageToggleComponent,
  },
  {
    path: APP_ROUTES.RADIO,
    component: DcxNgPageRadioComponent,
  },
  {
    path: APP_ROUTES.INPUT,
    component: DcxNgPageInputComponent,
  },
  {
    path: APP_ROUTES.SPINNER,
    component: DcxNgPageSpinnerComponent,
  },
  {
    path: APP_ROUTES.PAGINATOR,
    component: DcxNgPagePaginatorComponent,
  },
  {
    path: APP_ROUTES.CHIP,
    component: DcxNgPageChipComponent,
  },
  {
    path: APP_ROUTES.TOOLTIP,
    component: DcxNgPageTooltipComponent,
  },
  {
    path: APP_ROUTES.CHECKBOX,
    component: DcxNgPageCheckboxComponent,
  },
  {
    path: APP_ROUTES.DROPDOWN,
    component: DcxNgPageDropdownComponent,
  },
  {
    path: APP_ROUTES.CARD,
    component: DcxNgPageCardComponent
  },
  {
    path: APP_ROUTES.CONTEXTMENU,
    component: ContextMenuComponent
  },
  {
    path: APP_ROUTES.ICON_FIELD,
    component: DcxNgPageIconFieldComponent,
  },
  {
    path: APP_ROUTES.LIST,
    component: DcxNgPageListComponent,
  },
  {
    path: APP_ROUTES.SLIDER,
    component: DcxNgPageSliderComponent
  },
  {
    path: APP_ROUTES.DATEPICKER,
    component: DxcNgPageDatePickerComponent,
  },
  {
    path: APP_ROUTES.ACCORDION,
    component: DcxNgPageAccordionComponent,
  },
  {
    path: APP_ROUTES.DIALOG,
    component: DcxNgPageDialogComponent,
  },
  {
    path: APP_ROUTES.SEARCH,
    component: DcxNgPageSearchComponent,
  },
  {
    path: APP_ROUTES.TABS,
    component: DcxNgPageTabsComponent,
  },
];
