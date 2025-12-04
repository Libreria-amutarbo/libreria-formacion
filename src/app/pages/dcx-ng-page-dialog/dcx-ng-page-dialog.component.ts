import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgDialogComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DialogService } from 'libs/dcx-ng-lib/src/lib/services/dialog.service';

@Component({
  selector: 'dcx-ng-page-dialog',
  standalone: true,
  imports: [CommonModule, DcxNgDialogComponent],
  templateUrl: './dcx-ng-page-dialog.component.html',
  styleUrl: './dcx-ng-page-dialog.component.scss',
})
export class DcxNgPageDialogComponent {
  private ds = inject(DialogService);

  infoData = computed(() => this.ds.readOnly('info')().data);
  confirmData = computed(() => this.ds.readOnly('confirm')().data);

  openInfo() {
    this.ds.open('info', { from: 'page', ts: Date.now() });
  }
  openConfirm() {
    this.ds.open('confirm');
  }

  onInfoClosed() {
    console.log('Info cerrado. Data:', this.infoData());
  }
  onConfirmClosed() {
    console.log('Confirm cerrado.');
  }

  handleCancel() {
    console.log('Cancelado');
    this.ds.close('confirm');
  }
  handleAccept() {
    console.log('Aceptado');
    this.ds.close('confirm');
  }
}
