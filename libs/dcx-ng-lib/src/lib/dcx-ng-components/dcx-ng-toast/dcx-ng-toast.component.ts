import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  DcxToastInstance,
  DcxToastPosition,
  DcxToastType,
  DCX_TOAST_ICON_BY_TYPE,
} from '../../core/interfaces';
import { DcxMessageType } from '../../core/interfaces/message';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgMessageComponent } from '../dcx-ng-message/dcx-ng-message.component';
import { DcxNgToastService } from './dcx-ng-toast.service';

const MESSAGE_TYPE_BY_TOAST_TYPE: Record<DcxToastType, DcxMessageType> = {
  info: 'notification',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

/**
 * Toast: se monta UNA VEZ en la app (p.ej. `<dcx-ng-toast position="top-right" />`)
 * y se dispara imperativamente desde cualquier sitio con `DcxNgToastService`.
 *
 * Un único componente hace de contenedor y de render de cada aviso — no hay
 * un segundo componente "outlet" por separado, igual que el resto de
 * componentes de la librería.
 */
@Component({
  selector: 'dcx-ng-toast',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgMessageComponent],
  templateUrl: './dcx-ng-toast.component.html',
  styleUrl: './dcx-ng-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgToastComponent {
  private readonly toastService = inject(DcxNgToastService);

  readonly position = input<DcxToastPosition>('top-right');
  readonly toasts = this.toastService.toasts;

  // Cada toast necesita su propio temporizador de auto-cierre y su propia
  // pausa por hover/foco (WCAG 2.2.1). Al no haber una instancia de
  // componente por toast, ese estado por-id se gestiona aquí a mano en vez
  // de con un `effect()` por instancia.
  private readonly pausedIds = signal<ReadonlySet<string>>(new Set());
  private readonly timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  private readonly _autoDismissEffect = effect(() => {
    const currentToasts = this.toasts();
    const currentIds = new Set(currentToasts.map(toast => toast.id));

    for (const [id, timeoutId] of this.timeouts) {
      if (!currentIds.has(id)) {
        globalThis.clearTimeout(timeoutId);
        this.timeouts.delete(id);
      }
    }

    const paused = this.pausedIds();

    currentToasts.forEach(toast => {
      if (!toast.autoDismiss || paused.has(toast.id) || this.timeouts.has(toast.id)) {
        return;
      }

      const duration = toast.durationMs ?? 5000;
      if (duration <= 0) return;

      const timeoutId = globalThis.setTimeout(() => {
        this.dismiss(toast.id);
      }, duration);
      this.timeouts.set(toast.id, timeoutId);
    });
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.timeouts.forEach(timeoutId => globalThis.clearTimeout(timeoutId));
      this.timeouts.clear();
    });
  }

  getToastClasses(toast: DcxToastInstance): string {
    return `dcx-toast dcx-toast--${toast.type ?? 'info'}`;
  }

  getResolvedIconName(toast: DcxToastInstance): string {
    return toast.iconName || DCX_TOAST_ICON_BY_TYPE[toast.type ?? 'info'];
  }

  getResolvedMessageType(toast: DcxToastInstance): DcxMessageType {
    return MESSAGE_TYPE_BY_TOAST_TYPE[toast.type ?? 'info'];
  }

  hasAction(toast: DcxToastInstance): boolean {
    return !!toast.actionLabel?.trim() || !!toast.actionIconName?.trim();
  }

  getResolvedActionAriaLabel(toast: DcxToastInstance): string {
    const explicitAria = toast.actionAriaLabel?.trim();
    if (explicitAria) return explicitAria;

    const label = toast.actionLabel?.trim();
    if (label) return label;

    return 'Accion del toast';
  }

  getRole(toast: DcxToastInstance): 'alert' | 'status' {
    return toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status';
  }

  isDismissible(toast: DcxToastInstance): boolean {
    return toast.dismissible ?? true;
  }

  pause(id: string): void {
    if (this.pausedIds().has(id)) return;

    this.pausedIds.update(set => new Set(set).add(id));
    const timeoutId = this.timeouts.get(id);
    if (timeoutId) {
      globalThis.clearTimeout(timeoutId);
      this.timeouts.delete(id);
    }
  }

  resume(id: string): void {
    if (!this.pausedIds().has(id)) return;

    this.pausedIds.update(set => {
      const next = new Set(set);
      next.delete(id);
      return next;
    });
  }

  onAction(toast: DcxToastInstance): void {
    this.dismiss(toast.id);
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
