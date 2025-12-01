import { Route } from '@angular/router';
import { DcxNgPageTableComponent } from './pages/dcx-ng-page-table/dcx-ng-page-table.component';
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
import { DcxNgPageAccordionComponent } from './pages/dcx-ng-page-accordion/dcx-ng-page-accordion.component';
import { DcxNgPageDialogComponent } from './pages/dcx-ng-page-dialog/dcx-ng-page-dialog.component';

export const appRoutes: Route[] = [
  {
    path: 'table',
    component: DcxNgPageTableComponent,
  },
  {
    path: 'button',
    component: DcxNgPageButtonComponent,
  },
  {
    path: 'message',
    component: DcxNgPageMessageComponent,
  },
  {
    path: 'icon',
    component: DcxNgPageIconComponent,
  },
  {
    path: 'select',
    component: DcxNgPageSelectComponent,
  },
  {
    path: 'divider',
    component: DcxNgPageDividerComponent,
  },
  {
    path: 'toggle',
    component: DcxNgPageToggleComponent,
  },
  {
    path: 'radio',
    component: DcxNgPageRadioComponent,
  },
  {
    path: 'input',
    component: DcxNgPageInputComponent,
  },
  {
    path: 'spinner',
    component: DcxNgPageSpinnerComponent,
  },
  {
    path: 'paginator',
    component: DcxNgPagePaginatorComponent,
  },
  {
    path: 'chip',
    component: DcxNgPageChipComponent,
  },
  {
    path: 'tooltip',
    component: DcxNgPageTooltipComponent,
  },
  {
    path: 'checkbox',
    component: DcxNgPageCheckboxComponent,
  },
  {
    path: 'dropdown',
    component: DcxNgPageDropdownComponent,
  },
  {
    path: 'card',
    component: DcxNgPageCardComponent
  },
  {
    path: 'contextMenu',
    component: ContextMenuComponent
  },
  {
    path: 'icon-field',
    component: DcxNgPageIconFieldComponent,
  },
  {
    path: 'list',
    component: DcxNgPageListComponent,
  },
  {
    path: 'slider',
    component: DcxNgPageSliderComponent,
  },
  {
    path: 'accordion',
    component: DcxNgPageAccordionComponent,
  },
  {
    path: 'dialog',
    component: DcxNgPageDialogComponent,
  },
];
