import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'link' | 'icon';
type ButtonSize = 'small' | 'medium' | 'large' | 'block';

@Component({
  selector: 'dcx-ng-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dcx-ng-button.component.scss'],
  templateUrl: './dcx-ng-button.component.html',
})
export class DcxNgButtonComponent {
  @Input() label = '';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() icon = '';
  @Input() class = '';
  @Input() ariaLabel = '';
  @Input() variant?: ButtonVariant;
  @Input() size: ButtonSize = 'medium';

  @Output() buttonClick = new EventEmitter<{ clicked: boolean }>();

  @HostBinding('attr.aria-label') get ariaLabelBinding() {
    return this.ariaLabel || this.label || 'Button';
  }

  get buttonClasses(): string {
    return [
      'dcx-ng-button',
      this.variant ? `dcx-ng-button--${this.variant}` : '',
      this.size ? `dcx-ng-button--${this.size}` : '',
      this.class || '',
    ].join(' ');
  }

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit({ clicked: true });
    }
  }
}
