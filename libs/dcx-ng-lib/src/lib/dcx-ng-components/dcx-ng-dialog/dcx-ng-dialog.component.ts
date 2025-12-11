import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
  inject,
  computed,
} from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxDialogPosition } from '../../core/interfaces';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'dcx-ng-dialog',
  standalone: true,
  imports: [NgTemplateOutlet, DcxNgButtonComponent],
  templateUrl: './dcx-ng-dialog.component.html',
  styleUrl: './dcx-ng-dialog.component.scss',
})
export class DcxNgDialogComponent {
  dialogId = input<string | undefined>(undefined);

  title = input<string>('');
  visible = input<boolean | undefined>(undefined);
  showClose = input<boolean>(true);
  position = input<DcxDialogPosition>('center');

  closeOnBackdrop = input<boolean>(true);

  closeDialog = output<void>();

  bodyTemplate = contentChild<TemplateRef<unknown>>('dialogBody');
  footerTemplate = contentChild<TemplateRef<unknown>>('dialogFooter');

  private dialogService = inject(DialogService);

  readonly isVisible = computed(() => {
    const visible = this.visible();
    if (v !== undefined) return v;

    const id = this.dialogId();
    if (id) return this.dialogService.readOnly(id)().visible;

    return false;
  });

  close(): void {
    this.closeDialog.emit();

    const id = this.dialogId();
    if (id) this.dialogService.close(id);
  }

  onBackdropClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.closeOnBackdrop()) this.close();
  }
}
