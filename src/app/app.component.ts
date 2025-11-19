import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './core/constants/app-routes';


@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  paths = Object.values(APP_ROUTES);
  title = 'dcx-ng-components';
}
