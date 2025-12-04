import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgDialogComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-dialog',
  standalone: true,
  imports: [CommonModule, DcxNgDialogComponent],
  templateUrl: './dcx-ng-page-dialog.component.html',
  styleUrl: './dcx-ng-page-dialog.component.scss',
})
export class DcxNgPageDialogComponent {
  visibleInfo = false;
  visibleConfirm = false;

  handleCloseInfo() {
    this.visibleInfo = false;
  }

  handleCloseConfirm() {
    this.visibleConfirm = false;
  }

  handleCancel() {
    console.log('Cancelado');
    this.visibleConfirm = false;
  }

  handleAccept() {
    console.log('Aceptado');
    this.visibleConfirm = false;
  }
}
