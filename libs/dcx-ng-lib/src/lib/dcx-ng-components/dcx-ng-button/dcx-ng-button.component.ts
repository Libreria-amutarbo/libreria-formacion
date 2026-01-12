import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import {
  DcxNgIconComponent,
  DcxButtonType,
  DcxButtonVariant,
  DcxSize,
  DcxIconSpacing,
  DcxIconPosition,
} from '@dcx-ng-components/dcx-ng-lib';

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
  type = input<DcxButtonType>('button');
  disabled = input<boolean>(false);
  variant = input<DcxButtonVariant>('primary');
  size = input<DcxSize>('m');
  class = input<string>('');

  // Iconos
  icon = input<boolean>(false);
  iconName = input<string>('');
  iconSize = input<DcxSize>('s');
  iconSpacing = input<DcxIconSpacing>('none');
  iconColor = input<string>('');
  iconPosition = input<DcxIconPosition>('start');

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
    const iconPositionValue = this.iconPosition();
    const iconName = this.iconName();
    const classValue = this.class();

    const hasAnyIcon = iconPositionValue || iconName;

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
