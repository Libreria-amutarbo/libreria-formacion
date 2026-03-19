import { Component, inject, signal } from '@angular/core';
import {
  DcxNgDialogComponent,
  DcxNgButtonComponent,
  DcxNgDividerComponent,
  DcxDialogPosition,
} from '@dcx-ng-components/dcx-ng-lib';
import { DIALOG_DEFAULT_ARGS } from 'libs/dcx-ng-lib/src/lib/core/mock/dialog';
import { DialogService } from 'libs/dcx-ng-lib/src/lib/services/dialog.service';

@Component({
  selector: 'dcx-ng-page-dialog',
  standalone: true,
  imports: [DcxNgDialogComponent, DcxNgButtonComponent, DcxNgDividerComponent],
  templateUrl: './dcx-ng-page-dialog.component.html',
  styleUrl: './dcx-ng-page-dialog.component.scss',
})
export class DcxNgPageDialogComponent {
  private ds = inject(DialogService);

  mockData = DIALOG_DEFAULT_ARGS;

  positionedDialogCurrentPosition = signal<DcxDialogPosition>('center');

  openInfo() {
    this.ds.open('info');
  }
  openConfirm() {
    this.ds.open('confirm');
  }

  handleCancel() {
    this.ds.close('confirm');
  }
  handleAccept() {
    this.ds.close('confirm');
  }

  openPositioned(position: DcxDialogPosition) {
    this.positionedDialogCurrentPosition.set(position);
    this.ds.open('positioned', { position });
  }

  open(dialogId: string) {
    this.ds.open(dialogId);
  }
}
