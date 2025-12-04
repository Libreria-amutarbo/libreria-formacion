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

  closeDialog = output<void>();

  bodyTemplate = contentChild<TemplateRef<unknown>>('dialogBody');
  footerTemplate = contentChild<TemplateRef<unknown>>('dialogFooter');

  private ds = inject(DialogService);

  readonly isVisible = computed(() => {
    const v = this.visible();
    if (v !== undefined) return v;

    const id = this.dialogId();
    if (id) return this.ds.readOnly(id)().visible;

    return false;
  });

  close(): void {
    this.closeDialog.emit();

    const id = this.dialogId();
    if (id) this.ds.close(id);
  }
}
