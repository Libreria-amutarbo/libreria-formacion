import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  DcxToastType,
  DCX_TOAST_ICON_BY_TYPE,
} from '../../core/interfaces';
import { DcxMessageType } from '../../core/interfaces/message';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgMessageComponent } from '../dcx-ng-message/dcx-ng-message.component';

@Component({
  selector: 'dcx-ng-toast',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgMessageComponent],
  templateUrl: './dcx-ng-toast.component.html',
  styleUrl: './dcx-ng-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgToastComponent {
  readonly message = input.required<string>();
  readonly type = input<DcxToastType>('info');
  readonly autoDismiss = input<boolean>(false);
  readonly durationMs = input<number>(5000);
  readonly iconName = input<string>('');
  readonly actionLabel = input<string>('Deshacer');
  readonly actionIconName = input<string>('');
  readonly actionAriaLabel = input<string>('');
  readonly dismissible = input<boolean>(true);
  readonly announce = input<boolean>(true);

  readonly actionClick = output<void>();
  readonly dismissed = output<void>();

  readonly toastClasses = computed(() => `dcx-toast dcx-toast--${this.type()}`);
  readonly resolvedIconName = computed(() => {
    if (this.iconName()) {
      return this.iconName();
    }

    return DCX_TOAST_ICON_BY_TYPE[this.type()];
  });

  readonly resolvedMessageType = computed<DcxMessageType>(() => {
    const map: Record<DcxToastType, DcxMessageType> = {
      info: 'notification',
      success: 'success',
      warning: 'warning',
      error: 'error',
    };
    return map[this.type()];
  });

  readonly hasAction = computed(() => {
    return !!this.actionLabel().trim() || !!this.actionIconName().trim();
  });
  readonly resolvedActionAriaLabel = computed(() => {
    const explicitAria = this.actionAriaLabel().trim();
    if (explicitAria) {
      return explicitAria;
    }

    const label = this.actionLabel().trim();
    if (label) {
      return label;
    }

    return 'Accion del toast';
  });

  readonly role = computed(() => {
    if (this.type() === 'error' || this.type() === 'warning') {
      return 'alert';
    }

    return 'status';
  });

  readonly ariaLive = computed(() => {
    if (!this.announce()) {
      return null;
    }

    if (this.type() === 'error') {
      return 'assertive';
    }

    return 'polite';
  });

  private readonly paused = signal(false);

  readonly _autoDismissEffect = effect(onCleanup => {
    if (!this.autoDismiss() || this.paused()) {
      return;
    }

    const duration = this.durationMs();
    if (duration <= 0) {
      return;
    }

    const timeoutId = globalThis.setTimeout(() => {
      this.dismissed.emit();
    }, duration);

    onCleanup(() => {
      globalThis.clearTimeout(timeoutId);
    });
  });

  @HostListener('mouseenter')
  @HostListener('focusin')
  onPauseTimer(): void {
    this.paused.set(true);
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  onResumeTimer(): void {
    this.paused.set(false);
  }

  readonly onAction = (): void => {
    this.actionClick.emit();
  };

  readonly onClose = (): void => {
    this.dismissed.emit();
  };
}
