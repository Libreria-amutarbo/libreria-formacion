import { ChangeDetectionStrategy, Component } from '@angular/core';
import { computed, effect, input, output } from '@angular/core';
import { DcxNgButtonComponent, DcxNgIconComponent, DcxToastType } from '@dcx-ng-components/dcx-ng-lib';


@Component({
  selector: 'dcx-ng-toast',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent],
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

  readonly actionClick = output<void>();
  readonly dismissed = output<void>();

  readonly toastClasses = computed(() => `dcx-toast dcx-toast--${this.type()}`);
  readonly resolvedIconName = computed(() => {
    if (this.iconName()) {
      return this.iconName();
    }

    const iconsByType: Record<DcxToastType, string> = {
      info: 'info-circle',
      success: 'check-circle',
      warning: 'exclamation-diamond',
      error: 'x-circle',
    };

    return iconsByType[this.type()];
  });

  readonly role = computed(() => {
    if (this.type() === 'error' || this.type() === 'warning') {
      return 'alert';
    }

    return 'status';
  });

  readonly ariaLive = computed(() => {
    if (this.type() === 'error') {
      return 'assertive';
    }

    return 'polite';
  });

  readonly _autoDismissEffect = effect(onCleanup => {
    if (!this.autoDismiss()) {
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

  readonly onAction = (): void => {
    this.actionClick.emit();
  };
}
