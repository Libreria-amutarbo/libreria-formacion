import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from './core/constants/app-routes';
import {
  DcxNgSelectComponent,
  DcxSelectOptions,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  standalone: true,
  imports: [RouterModule, DcxNgSelectComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  valueDefault = APP_ROUTES.SLIDER;
  paths = Object.values(APP_ROUTES);
  title = 'dcx-ng-components';

  private readonly _router = inject(Router);

  ngOnInit() {
    this._router.navigateByUrl(this.valueDefault);
  }

  getSelectOptions(): DcxSelectOptions[] {
    return this.paths.sort().map(item => {
      return {
        value: item,
        label: item.charAt(0).toUpperCase() + item.slice(1),
      };
    });
  }

  routeTo(event: string | number | null) {
    if (event) {
      this._router.navigateByUrl(event.toString());
    }
  }
}
