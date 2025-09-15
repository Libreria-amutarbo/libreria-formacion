import { Component } from '@angular/core';
import { DcxNgMessageComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-message',
  standalone: true,
  imports: [DcxNgMessageComponent],
  templateUrl: './dcx-ng-page-message.component.html',
  styleUrl: './dcx-ng-page-message.component.scss',
})
export class DcxNgPageMessageComponent {}
