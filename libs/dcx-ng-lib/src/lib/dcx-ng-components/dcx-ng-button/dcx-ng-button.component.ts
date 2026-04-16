import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  DcxButtonType,
  DcxButtonVariant,
  DcxSize,
  DcxIconSpacing,
  DcxIconPosition,
} from '../../core/interfaces';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  imports: [DcxNgIconComponent, NgTemplateOutlet],
  selector: 'dcx-ng-button',
  standalone: true,
  styleUrls: ['./dcx-ng-button.component.scss'],
  templateUrl: './dcx-ng-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgButtonComponent {
  // Inputs
  label = input<string>('');
  ariaLabel = input<string>('');
  type = input<DcxButtonType>('button');
  disabled = input<boolean>(false);
  pressed = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  hover = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  focused = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  variant = input<DcxButtonVariant>('primary');
  size = input<DcxSize>('m');
  class = input<string>('');

  // Checkbox-specific inputs
  isCheckbox = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  checkboxError = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  // Iconos
  icon = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  iconName = input<string>('');
  iconSize = input<DcxSize>('s');
  iconSpacing = input<DcxIconSpacing>('none');
  iconColor = input<string>('');
  iconPosition = input<DcxIconPosition>('left');
  iconRightName = input<string>('');

  buttonClick = output<{ clicked: boolean }>();

  computedAriaLabel = computed<string | null>(() => {
    const labelValue = this.label();
    const ariaLabelValue = this.ariaLabel();

    if (labelValue) return null;
    return ariaLabelValue ? ariaLabelValue : 'Button';
  });

  buttonClasses = computed<string>(() => {
    const base = 'dcx-ng-button';
    const isCheckboxValue = this.isCheckbox();
    const variantValue = this.variant();
    const sizeValue = isCheckboxValue ? 'checkbox' : this.size();
    const labelValue = this.label();
    const iconPositionValue = this.iconPosition();
    const iconName = this.iconName();
    const classValue = this.class();
    const pressedValue = this.pressed();
    const hoverValue = this.hover();
    const focusedValue = this.focused();
    const checkboxErrorValue = this.checkboxError();

    const hasAnyIcon = this.icon() || !!iconName;

    return [
      base,
      `${base}--${variantValue ?? 'primary'}`,
      sizeValue ? `${base}--${sizeValue}` : '',
      !labelValue && hasAnyIcon ? `${base}--icon-only` : '',
      iconPositionValue ? `${base}--icon-${iconPositionValue}` : '',
      pressedValue ? `${base}--pressed` : '',
      hoverValue ? `${base}--hover` : '',
      focusedValue ? `${base}--focused` : '',
      isCheckboxValue ? `${base}--checkbox` : '',
      isCheckboxValue && checkboxErrorValue
        ? `${base}--checkbox-error--${this.variant()}`
        : '',
      classValue ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  iconClasses = computed<string>(() => {
    const pos = this.iconPosition();
    const base = 'icon';
    const mapped =
      pos === 'left'
        ? 'icon--left'
        : pos === 'right'
          ? 'icon--right'
          : pos === 'top'
            ? 'icon--top'
            : pos === 'bottom'
              ? 'icon--bottom'
              : '';
    return [base, mapped].filter(Boolean).join(' ');
  });

  onClick(): void {
    if (!this.disabled()) {
      this.buttonClick.emit({ clicked: true });
    }
  }
}
