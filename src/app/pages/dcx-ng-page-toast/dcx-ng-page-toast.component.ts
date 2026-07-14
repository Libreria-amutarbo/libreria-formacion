import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DCX_TOAST_ERROR_DEMO,
  DCX_TOAST_ICON_ONLY_ACTION,
  DCX_TOAST_INFO_DEMO,
  DCX_TOAST_SUCCESS_WITH_ACTION,
  DCX_TOAST_WARNING_DEMO,
  DCX_TOAST_WITH_ICON_ACTION,
  DcxNgButtonComponent,
  DcxNgToastOutletComponent,
  DcxNgToastService,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-toast',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastOutletComponent],
  templateUrl: './dcx-ng-page-toast.component.html',
  styleUrl: './dcx-ng-page-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageToastComponent {
  private readonly toastService = inject(DcxNgToastService);

  showInfoToast(): void {
    this.toastService.show(DCX_TOAST_INFO_DEMO);
  }

  showSuccessToast(): void {
    this.toastService.show({
      ...DCX_TOAST_SUCCESS_WITH_ACTION,
      message: 'Archivo exportado con exito',
    });
  }

  showWarningToast(): void {
    this.toastService.show(DCX_TOAST_WARNING_DEMO);
  }

  showErrorToast(): void {
    this.toastService.show(DCX_TOAST_ERROR_DEMO);
  }

  showIconActionToast(): void {
    this.toastService.show(DCX_TOAST_WITH_ICON_ACTION);
  }

  showIconOnlyActionToast(): void {
    this.toastService.show(DCX_TOAST_ICON_ONLY_ACTION);
  }

  showNotDismissibleToast(): void {
    this.toastService.show({
      message: 'Este toast no se puede cerrar manualmente',
      type: 'info',
      dismissible: false,
    });
  }

  clearToasts(): void {
    this.toastService.clear();
  }
}
