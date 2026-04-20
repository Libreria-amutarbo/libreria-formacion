import { Component, inject, signal } from '@angular/core';
import {
  DcxNgDialogComponent,
  DcxNgButtonComponent,
  DcxNgDividerComponent,
  DcxDialogPosition,
  DIALOG_DEFAULT_ARGS,
  DialogService,
} from '@dcx-ng-components/dcx-ng-lib';

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

  openPositioned(position: DcxDialogPosition) {
    this.positionedDialogCurrentPosition.set(position);
    this.ds.open('positioned', { position });
  }

  open(dialogId: string) {
    this.ds.open(dialogId);
  }

  close(dialogId: string) {
    this.ds.close(dialogId);
  }
}
