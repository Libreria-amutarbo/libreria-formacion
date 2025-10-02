import { Route } from '@angular/router';
import { DcxNgPageTableComponent } from './pages/dcx-ng-page-table/dcx-ng-page-table.component';
import { DcxNgPageButtonComponent } from './pages/dcx-ng-page-button/dcx-ng-page-button.component';
import { DcxNgPageMessageComponent } from './pages/dcx-ng-page-message/dcx-ng-page-message.component';
import { DcxNgPageIconComponent } from './pages/dcx-ng-page-icon/dcx-ng-page-icon.component';
import { DcxNgPageSelectComponent } from './pages/dcx-ng-page-select/dcx-ng-page-select.component';
import { DcxNgPageDividerComponent } from './pages/dcx-ng-page-divider/dcx-ng-page-divider.component';
import { DcxNgPageToggleComponent } from './pages/dcx-ng-page-toggle/dcx-ng-page-toggle.component';
import { DcxNgPageInputComponent } from './pages/dcx-ng-page-input/dcx-ng-page-input.component';
import { DcxNgPageSpinnerComponent } from './pages/dcx-ng-page-spinner/dcx-ng-page-spinner.component';


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
    path: 'input',
    component: DcxNgPageInputComponent
  },
  {
    path: 'spinner',
    component: DcxNgPageSpinnerComponent,
  }
];
