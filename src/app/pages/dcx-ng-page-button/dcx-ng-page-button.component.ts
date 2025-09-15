import { Component } from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-button',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-button.component.html',
})
export class DcxNgPageButtonComponent {
  showMsg() {
    alert('Click ha funcionado');
  }
}
