import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  DCX_TOAST_DEFAULT_ARGS,
  DcxNgButtonComponent,
  DCX_TOAST_SUCCESS_WITH_ACTION,
  DcxNgToastComponent,
  DcxToastOptions,
} from '@dcx-ng-components/dcx-ng-lib';

interface DcxToastDemoItem extends DcxToastOptions {
  id: number;
}

@Component({
  selector: 'dcx-ng-page-toast',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgToastComponent],
  templateUrl: './dcx-ng-page-toast.component.html',
  styleUrl: './dcx-ng-page-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageToastComponent {
  private nextId = 0;

  readonly activeToasts = signal<DcxToastDemoItem[]>([]);
  readonly lastEvent = signal('Sin interacciones todavía.');
  readonly activeCount = computed(() => this.activeToasts().length);

  readonly defaultToast: DcxToastOptions = {
    ...DCX_TOAST_DEFAULT_ARGS,
    message: 'Informacion actualizada correctamente',
  };

  readonly successToast: DcxToastOptions = {
    ...DCX_TOAST_SUCCESS_WITH_ACTION,
    message: 'Archivo exportado con exito',
  };

  readonly warningToast: DcxToastOptions = {
    message: 'Revisa los campos marcados antes de continuar',
    type: 'warning',
    autoDismiss: true,
    durationMs: 7000,
  };

  readonly errorToast: DcxToastOptions = {
    message: 'No se pudo conectar con el servidor',
    type: 'error',
    autoDismiss: true,
    durationMs: 8000,
  };

  readonly showInfoToast = (): void => {
    this.addToast(this.defaultToast);
  };

  readonly showSuccessToast = (): void => {
    this.addToast(this.successToast);
  };

  readonly showWarningToast = (): void => {
    this.addToast(this.warningToast);
  };

  readonly showErrorToast = (): void => {
    this.addToast(this.errorToast);
  };

  readonly clearToasts = (): void => {
    this.activeToasts.set([]);
    this.lastEvent.set('Se limpiaron todos los toasts.');
  };

  readonly handleAction = (id: number, label: string): void => {
    this.lastEvent.set(`Accion ejecutada en ${label}.`);
    this.removeToast(id);
  };

  readonly handleDismissed = (id: number, label: string): void => {
    this.lastEvent.set(`Toast cerrado por tiempo: ${label}.`);
    this.removeToast(id);
  };

  private readonly addToast = (toast: DcxToastOptions): void => {
    const item: DcxToastDemoItem = {
      ...toast,
      id: this.nextId,
    };

    this.nextId += 1;
    this.activeToasts.update(current => [...current, item]);
  };

  private readonly removeToast = (id: number): void => {
    this.activeToasts.update(current => current.filter(toast => toast.id !== id));
  };
}
