import type {
  DcxToastInstance,
  DcxToastOptions,
} from '../../core/interfaces/toast';

export class DcxWebToastService {
  private static listeners = new Set<(toasts: DcxToastInstance[]) => void>();

  private static _toasts: DcxToastInstance[] = [];

  static get toasts(): DcxToastInstance[] {
    return [...this._toasts];
  }

  private static notify() {
    const current = [...this._toasts];

    this.listeners.forEach(listener => listener(current));
  }

  static subscribe(callback: (toasts: DcxToastInstance[]) => void) {
    this.listeners.add(callback);
  }

  static unsubscribe(callback: (toasts: DcxToastInstance[]) => void) {
    this.listeners.delete(callback);
  }

  static show(options: DcxToastOptions): string {
    const id = `dcx-toast-${Math.random().toString(36).substring(2, 9)}`;

    this._toasts = [
      ...this._toasts,
      {
        ...options,
        id,
      },
    ];

    this.notify();

    return id;
  }

  static success(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'success',
    });
  }

  static error(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'error',
    });
  }

  static warning(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'warning',
    });
  }

  static info(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'info',
    });
  }

  static dismiss(id: string): void {
    this._toasts = this._toasts.filter(toast => toast.id !== id);

    this.notify();
  }

  static clear(): void {
    this._toasts = [];

    this.notify();
  }
}
