import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import {
  ButtonType,
  ButtonVariant,
  IconPosition,
  ICON_POSITION,
  IconSpacing,
  DcxSize
} from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-button',
  imports: [CommonModule, DcxNgIconComponent],
  styleUrl: './dcx-ng-button.component.scss',
  templateUrl: './dcx-ng-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgButtonComponent {
  @Input() label = '';
  @Input() ariaLabel = '';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() variant?: ButtonVariant;
  @Input() size: DcxSize = 'm';
  @Input() class = '';
  @Input() iconName?: string;
  @Input() iconPosition: IconPosition = ICON_POSITION.start;
  @Input() iconSize?: DcxSize;
  @Input() iconSpacing: IconSpacing = 'none';
  @Input() iconColor = '';
  @Input() set icon(_legacy: string) { }

  @Output() buttonClick = new EventEmitter<{ clicked: boolean }>();

  readonly IconPos = ICON_POSITION;

  get computedAriaLabel(): string | null {
    if (this.label) return null;
    return this.ariaLabel ? this.ariaLabel : 'Button';
  }

  get effectiveIconSize(): DcxSize | undefined {
    return this.iconSize;
  }

  get buttonClasses(): string {
    const base = 'dcx-ng-button';
    return [
      base,
      `${base}--${this.variant ?? 'default'}`,
      this.size ? `${base}--${this.size}` : '',
      (!this.label && this.iconName) ? `${base}--icon-only` : '',
      this.class ?? ''
    ].filter(Boolean).join(' ');
  }

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit({ clicked: true });
    }
  }
}
