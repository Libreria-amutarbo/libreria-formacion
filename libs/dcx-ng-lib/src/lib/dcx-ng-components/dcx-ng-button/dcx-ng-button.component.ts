import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'link' | 'icon';
type ButtonSize = 'small' | 'medium' | 'large' | 'block';
type IconSize = 's' | 'm' | 'l' | 'xl';
type IconSpacing = 'none' | 'compact' | 'spacious';

@Component({
  selector: 'dcx-ng-button',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  styleUrls: ['./dcx-ng-button.component.scss'],
  templateUrl: './dcx-ng-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgButtonComponent {
  @Input() label = '';
  @Input() ariaLabel = '';

  @Input() type: ButtonType = 'button';
  @Input() disabled = false;

  @Input() variant?: ButtonVariant;
  @Input() size: ButtonSize = 'medium';
  @Input() class = '';

  @Input() iconName?: string;
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() iconSize?: IconSize;
  @Input() iconSpacing: IconSpacing = 'none';
  @Input() iconColor = '';

  @Input() set icon(_legacy: string) {
  }

  @Output() buttonClick = new EventEmitter<{ clicked: boolean }>();

  get computedAriaLabel(): string | null {
    if (this.label) return null;
    return this.ariaLabel ? this.ariaLabel : 'Button';
  }

  get effectiveIconSize(): IconSize {
    if (this.iconSize) return this.iconSize;
    switch (this.size) {
      case 'small':
        return 's';
      case 'large':
        return 'l';
      default:
        return 'm';
    }
  }

  get buttonClasses(): string {
    return [
      'dcx-ng-button',
      this.variant ? `dcx-ng-button--${this.variant}` : '',
      this.size ? `dcx-ng-button--${this.size}` : '',
      !this.label && this.iconName ? 'dcx-ng-button--icon-only' : '',
      this.class || '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit({ clicked: true });
    }
  }
}
