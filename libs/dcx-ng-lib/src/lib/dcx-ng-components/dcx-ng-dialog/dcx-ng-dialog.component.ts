import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'dcx-ng-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-dialog.component.html',
  styleUrl: './dcx-ng-dialog.component.scss',
})
export class DcxNgDialogComponent {
  title = input('');
  visible = input(false);

  closeDialog = output<void>();

  bodyTemplate = contentChild<TemplateRef<unknown>>('dialogBody');
  footerTemplate = contentChild<TemplateRef<unknown>>('dialogFooter');

  close(): void {
    this.closeDialog.emit();
  }
}
