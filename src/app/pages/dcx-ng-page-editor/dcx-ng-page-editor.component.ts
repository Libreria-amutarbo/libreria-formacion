import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DcxNgEditorComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-editor',
  standalone: true,
  imports: [CommonModule, DcxNgEditorComponent],
  templateUrl: './dcx-ng-page-editor.component.html',
  styleUrls: ['./dcx-ng-page-editor.component.scss'],
})
export class DcxNgPageEditorComponent {
  value = '<p>Escribe y da formato al contenido.</p>';

  onValueChange(value: string) {
    this.value = value;
  }
}
