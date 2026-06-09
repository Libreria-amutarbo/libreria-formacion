import { Component } from '@angular/core';
import { DcxNgEditorComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-editor',
  standalone: true,
  imports: [DcxNgEditorComponent],
  templateUrl: './dcx-ng-page-editor.component.html',
  styleUrl: './dcx-ng-page-editor.component.scss',
})
export class DcxNgPageEditorComponent {}
