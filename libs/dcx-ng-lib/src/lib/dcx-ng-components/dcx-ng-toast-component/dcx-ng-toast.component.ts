import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import {
  DcxToastType,
  DCX_TOAST_ICON_BY_TYPE,
  DCX_TOAST_COLOR_BY_TYPE,
} from '../../core/interfaces';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

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
  readonly actionLabel = input<string>('Deshacer');
  readonly actionIconName = input<string>('');
  readonly actionAriaLabel = input<string>('');

  readonly actionClick = output<void>();
  readonly dismissed = output<void>();

  readonly toastClasses = computed(() => `dcx-toast dcx-toast--${this.type()}`);
  readonly resolvedIconName = computed(() => {
    if (this.iconName()) {
      return this.iconName();
    }

    return DCX_TOAST_ICON_BY_TYPE[this.type()];
  });

  readonly resolvedIconColor = computed(
    () => DCX_TOAST_COLOR_BY_TYPE[this.type()],
  );
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
