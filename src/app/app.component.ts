import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from './core/constants/app-routes';
import { DcxSelectOptions } from 'libs/dcx-ng-lib/src/lib/core/interfaces/select';
import { DcxNgSelectComponent } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  standalone: true,
  imports: [RouterModule, DcxNgSelectComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  paths = Object.values(APP_ROUTES);
  title = 'dcx-ng-components';

  private readonly _router = inject(Router)

  ngOnInit() {
    this._router.navigateByUrl(APP_ROUTES.TABLE)
  }

  getSelectOptions(): DcxSelectOptions[] {
    
   return this.paths.map(item => {
      return {
        value: item,
        label: item
      }
    })
  }
  
  routeTo(event: string|number|null) {
    if(event) {
      this._router.navigateByUrl(event.toString())
    }
  }

}
