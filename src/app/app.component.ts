import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DcxNgTableComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  standalone: true,
  imports: [ RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dcx-ng-components';
}
