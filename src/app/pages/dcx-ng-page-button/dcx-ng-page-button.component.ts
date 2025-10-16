import { Component } from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-button',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-button.component.html',
  styleUrls: ['./dcx-ng-page-button.component.scss'],
})
export class DcxNgPageButtonComponent {
  showMsg() {
    alert('Click ha funcionado');
  }

  log(message: string) {
    console.log('[Button demo]', message);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.log('Form submit');
  }

  onReset(_event: Event) {
    this.log('Form reset');
    alert('Form reset');
  }
}