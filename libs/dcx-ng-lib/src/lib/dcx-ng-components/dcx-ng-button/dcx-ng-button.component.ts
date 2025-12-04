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

export const ICON_POSITION = {
  start: 'start',
  end: 'end',
} as const;
export type IconPosition = typeof ICON_POSITION[keyof typeof ICON_POSITION];

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

  @Input() iconPosition: IconPosition = ICON_POSITION.start;

  @Input() iconSize?: IconSize;
  @Input() iconSpacing: IconSpacing = 'none';
  @Input() iconColor = '';

  @Input() set icon(_legacy: string) {}

  @Output() buttonClick = new EventEmitter<{ clicked: boolean }>();

  readonly IconPos = ICON_POSITION;

  get computedAriaLabel(): string | null {
    if (this.label) return null;
    return this.ariaLabel ? this.ariaLabel : 'Button';
  }

  
private readonly sizeToIconMap: Record<ButtonSize, IconSize> = {
  small: 's',
  medium: 'm',
  large: 'l',
  block: 'm',
};

get effectiveIconSize(): IconSize {
  return this.iconSize || this.sizeToIconMap[this.size];
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
