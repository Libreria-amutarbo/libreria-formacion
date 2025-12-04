import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxDialogPosition } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-dialog',
  standalone: true,
  imports: [NgTemplateOutlet, DcxNgButtonComponent],
  templateUrl: './dcx-ng-dialog.component.html',
  styleUrl: './dcx-ng-dialog.component.scss',
})
export class DcxNgDialogComponent {
  title = input<string>('');
  visible = input<boolean>(false);
  showClose = input<boolean>(true);
  position = input<DcxDialogPosition>('center');

  closeDialog = output<void>();

  bodyTemplate = contentChild<TemplateRef<unknown>>('dialogBody');
  footerTemplate = contentChild<TemplateRef<unknown>>('dialogFooter');

  close(): void {
    this.closeDialog.emit();
  }
}
