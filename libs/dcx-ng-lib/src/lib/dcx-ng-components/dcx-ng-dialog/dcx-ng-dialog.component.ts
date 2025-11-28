import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-dialog.component.html',
  styleUrl: './dcx-ng-dialog.component.scss',
})
export class DcxNgDialogComponent {
  title = input('');
  visible = input(false);

  onClose = output<void>();

  bodyTemplate = contentChild<TemplateRef<any>>('dialogBody');
  footerTemplate = contentChild<TemplateRef<any>>('dialogFooter');

  close(): void {
    this.onClose.emit();
  }
}
