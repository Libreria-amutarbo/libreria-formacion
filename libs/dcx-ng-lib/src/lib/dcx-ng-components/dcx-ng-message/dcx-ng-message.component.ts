import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { Component, computed, input, Signal } from '@angular/core';

export type MessageType = 'notification' | 'error' | 'warning' | 'success';
interface DcxNgMessageComponentInputs {
  body: Signal<string>;
  type: Signal<MessageType>;
  title: Signal<string | undefined>;
  link: Signal<string | undefined>;
  icon: Signal<boolean>;
  showClose: Signal<boolean>;
}

@Component({
  selector: 'dcx-ng-message',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-message.component.html',
  styleUrl: './dcx-ng-message.component.scss',
})
export class DcxNgMessageComponent implements DcxNgMessageComponentInputs {
  body = input.required<string>();
  type = input<MessageType>('notification');
  title = input<string>();
  link = input<string>();
  icon = input<boolean>(false);
  showClose = input<boolean>(false);

  messageData = computed(() => {
    const messageOptions = {
      notification: { icon: '', role: 'notification', },
      error: { icon: '', role: 'error', },
      warning: { icon: '', role: 'warning', },
      success: { icon: '', role: 'success', },
    };

    return messageOptions[this.type()];
  });
}
