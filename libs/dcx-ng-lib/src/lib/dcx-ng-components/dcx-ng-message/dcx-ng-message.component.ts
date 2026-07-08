import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { DcxMessageType } from '../../core/interfaces/message';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

@Component({
  selector: 'dcx-ng-message',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-message.component.html',
  styleUrl: './dcx-ng-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgMessageComponent {
  body = input.required<string>();
  type = input<DcxMessageType>('notification');
  title = input<string>();
  link = input<string>();
  icon = input<boolean>(false);
  iconName = input<string>();
  showClose = input<boolean>(false);
  announce = input<boolean>(true);

  closed = output<void>();

  readonly dismissed = signal(false);

  readonly messageData = computed(() => {
    const messageOptions = {
      notification: {
        icon: 'info-circle',
        role: 'status',
        ariaLive: 'polite',
      },
      success: {
        icon: 'check-circle',
        role: 'status',
        ariaLive: 'polite',
      },
      warning: {
        icon: 'exclamation-triangle',
        role: 'alert',
        ariaLive: 'assertive',
      },
      error: {
        icon: 'x-circle',
        role: 'alert',
        ariaLive: 'assertive',
      },
    } as const;

    return messageOptions[this.type()];
  });

  onClose = (): void => {
    this.dismissed.set(true);
    this.closed.emit();
  };
}
