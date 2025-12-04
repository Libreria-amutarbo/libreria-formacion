import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { ButtonType, ButtonVariant, DcxSize } from '../../core/interfaces';
import { IconSpacing } from '../../core/interfaces/icon';

@Component({
  selector: 'dcx-ng-button',
  imports: [DcxNgIconComponent],
  styleUrl: './dcx-ng-button.component.scss',
  templateUrl: './dcx-ng-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgButtonComponent {
  // Inputs
  label = input<string>('');
  ariaLabel = input<string>('');
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);
  variant = input<ButtonVariant | undefined>(undefined);
  size = input<DcxSize>('m');
  class = input<string>('');

  // Iconos
  iconStart = input<string>('');
  iconEnd = input<string>('');
  iconSize = input<DcxSize>('s');
  iconSpacing = input<IconSpacing>('none');
  iconColor = input<string>('');

  // Output usando signals
  buttonClick = output<{ clicked: boolean }>();

  computedAriaLabel = computed<string | null>(() => {
    const labelValue = this.label();
    const ariaLabelValue = this.ariaLabel();

    if (labelValue) return null;
    return ariaLabelValue ? ariaLabelValue : 'Button';
  });

  buttonClasses = computed<string>(() => {
    const base = 'dcx-ng-button';
    const variantValue = this.variant();
    const sizeValue = this.size();
    const labelValue = this.label();
    const iconStartValue = this.iconStart();
    const iconEndValue = this.iconEnd();
    const classValue = this.class();

    const hasAnyIcon = iconStartValue || iconEndValue;

    return [
      base,
      `${base}--${variantValue ?? 'primary'}`,
      sizeValue ? `${base}--${sizeValue}` : '',
      !labelValue && hasAnyIcon ? `${base}--icon-only` : '',
      classValue ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  onClick(): void {
    if (!this.disabled()) {
      this.buttonClick.emit({ clicked: true });
    }
  }
}
