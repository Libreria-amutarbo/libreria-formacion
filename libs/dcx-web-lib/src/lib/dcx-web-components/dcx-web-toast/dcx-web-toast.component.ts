import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { template } from './dcx-web-toast.component.html';
import { styles } from './dcx-web-toast.component.styles';

import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-message/dcx-web-message.component';

import type {
  DcxToastInstance,
  DcxToastPosition,
  DcxToastType,
} from '../../core/interfaces/toast';

import type { DcxMessageType } from '../../core/interfaces/message';
import { DcxWebToastService } from './dcx-web-toast.service';
import { DCX_TOAST_ICON_BY_TYPE } from '../../core/interfaces/toast';

const MESSAGE_TYPE_BY_TOAST_TYPE: Record<DcxToastType, DcxMessageType> = {
  info: 'notification',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

@customElement('dcx-web-toast')
export class DcxWebToast extends LitElement {
  @property({ type: String })
  accessor position: DcxToastPosition = 'top-right';

  @property({ attribute: false })
  accessor service: DcxWebToastService | undefined = undefined;

  @state()
  accessor toasts: DcxToastInstance[] = [];

  @state()
  accessor pausedIds = new Set<string>();

  private readonly timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  static override styles = styles;

  private get activeService(): DcxWebToastService {
    return this.service ?? DcxWebToastService.default;
  }

  override connectedCallback() {
    super.connectedCallback();

    this.toasts = this.activeService.toasts;

    this.activeService.subscribe(this.handleToastChange);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.activeService.unsubscribe(this.handleToastChange);

    this.timeouts.forEach(timeout => clearTimeout(timeout));

    this.timeouts.clear();
  }

  private handleToastChange = (toasts: DcxToastInstance[]) => {
    this.toasts = [...toasts];

    this.syncTimers();
  };

  private syncTimers() {
    const ids = new Set(this.toasts.map(t => t.id));

    for (const [id, timeout] of this.timeouts) {
      if (!ids.has(id)) {
        clearTimeout(timeout);
        this.timeouts.delete(id);
      }
    }

    this.toasts.forEach(toast => {
      if (
        !toast.autoDismiss ||
        this.pausedIds.has(toast.id) ||
        this.timeouts.has(toast.id)
      ) {
        return;
      }

      const duration = toast.durationMs ?? 5000;

      if (duration <= 0) {
        return;
      }

      const timeout = setTimeout(() => {
        this.dismiss(toast.id);
      }, duration);

      this.timeouts.set(toast.id, timeout);
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
    const explicit = toast.actionAriaLabel?.trim();

    if (explicit) {
      return explicit;
    }

    const label = toast.actionLabel?.trim();

    if (label) {
      return label;
    }

    return 'Accion del toast';
  }

  getRole(toast: DcxToastInstance): 'alert' | 'status' {
    return toast.type === 'error' || toast.type === 'warning'
      ? 'alert'
      : 'status';
  }

  isDismissible(toast: DcxToastInstance): boolean {
    return toast.dismissible ?? true;
  }

  pause(id: string): void {
    if (this.pausedIds.has(id)) {
      return;
    }

    this.pausedIds = new Set(this.pausedIds).add(id);

    const timeout = this.timeouts.get(id);

    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
  }

  resume(id: string): void {
    if (!this.pausedIds.has(id)) {
      return;
    }

    const next = new Set(this.pausedIds);

    next.delete(id);

    this.pausedIds = next;

    this.syncTimers();
  }

  onAction(toast: DcxToastInstance): void {
    this.dismiss(toast.id);
  }

  dismiss(id: string): void {
    this.activeService.dismiss(id);
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-toast': DcxWebToast;
  }
}
