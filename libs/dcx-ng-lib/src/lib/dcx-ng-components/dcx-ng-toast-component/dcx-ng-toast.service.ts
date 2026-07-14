import { Injectable, signal } from '@angular/core';
import { DcxToastInstance, DcxToastOptions } from '../../core/interfaces';

@Injectable({ providedIn: 'root' })
export class DcxNgToastService {
  private readonly _toasts = signal<DcxToastInstance[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(options: DcxToastOptions): string {
    const id = `dcx-toast-${Math.random().toString(36).substring(2, 9)}`;
    this._toasts.update(list => [...list, { ...options, id }]);
    return id;
  }

  success(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({ ...options, message, type: 'success' });
  }

  error(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({ ...options, message, type: 'error' });
  }

  warning(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({ ...options, message, type: 'warning' });
  }

  info(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({ ...options, message, type: 'info' });
  }

  dismiss(id: string): void {
    this._toasts.update(list => list.filter(toast => toast.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
