import type {
  DcxToastInstance,
  DcxToastOptions,
} from '../../core/interfaces/toast';

export class DcxWebToastService {
  private listeners = new Set<(toasts: DcxToastInstance[]) => void>();

  private _toasts: DcxToastInstance[] = [];

  get toasts(): DcxToastInstance[] {
    return [...this._toasts];
  }

  private notify() {
    const current = [...this._toasts];

    this.listeners.forEach(listener => listener(current));
  }

  subscribe(callback: (toasts: DcxToastInstance[]) => void) {
    this.listeners.add(callback);
  }

  unsubscribe(callback: (toasts: DcxToastInstance[]) => void) {
    this.listeners.delete(callback);
  }

  show(options: DcxToastOptions): string {
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

  success(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'success',
    });
  }

  error(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'error',
    });
  }

  warning(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'warning',
    });
  }

  info(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return this.show({
      ...options,
      message,
      type: 'info',
    });
  }

  dismiss(id: string): void {
    this._toasts = this._toasts.filter(toast => toast.id !== id);

    this.notify();
  }

  clear(): void {
    this._toasts = [];

    this.notify();
  }

  private static defaultInstance = new DcxWebToastService();

  static get default(): DcxWebToastService {
    return DcxWebToastService.defaultInstance;
  }

  static get toasts(): DcxToastInstance[] {
    return DcxWebToastService.defaultInstance.toasts;
  }

  static subscribe(callback: (toasts: DcxToastInstance[]) => void) {
    DcxWebToastService.defaultInstance.subscribe(callback);
  }

  static unsubscribe(callback: (toasts: DcxToastInstance[]) => void) {
    DcxWebToastService.defaultInstance.unsubscribe(callback);
  }

  static show(options: DcxToastOptions): string {
    return DcxWebToastService.defaultInstance.show(options);
  }

  static success(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return DcxWebToastService.defaultInstance.success(message, options);
  }

  static error(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return DcxWebToastService.defaultInstance.error(message, options);
  }

  static warning(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return DcxWebToastService.defaultInstance.warning(message, options);
  }

  static info(
    message: string,
    options?: Omit<DcxToastOptions, 'message' | 'type'>,
  ): string {
    return DcxWebToastService.defaultInstance.info(message, options);
  }

  static dismiss(id: string): void {
    DcxWebToastService.defaultInstance.dismiss(id);
  }

  static clear(): void {
    DcxWebToastService.defaultInstance.clear();
  }
}
