import { Component, inject, signal } from '@angular/core';
import {
  DcxNgDialogComponent,
  DcxNgButtonComponent,
  DcxNgDividerComponent,
  DcxDialogPosition,
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

  positionedDialogCurrentPosition = signal<DcxDialogPosition>('center');

  open(dialogId: string) {
    this.ds.open(dialogId);
  }

  close(dialogId: string) {
    this.ds.close(dialogId);
  }

  openPositioned(position: DcxDialogPosition) {
    this.positionedDialogCurrentPosition.set(position);
    this.ds.open('positioned');
  }
}
