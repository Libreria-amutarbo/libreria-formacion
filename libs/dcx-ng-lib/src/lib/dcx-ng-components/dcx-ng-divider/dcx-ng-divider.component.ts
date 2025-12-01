import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { DcxSize, DividerOrientation } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-divider.component.html',
  styleUrl: './dcx-ng-divider.component.scss',
})
export class DcxNgDividerComponent {
  @Input() color = '#ff0000';
  @Input() size: DcxSize = 'auto';
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() thickness = 0.25;
  @Input() ariaLabel = '';

  @HostBinding('style.--dcx-divider-color') get dividerColor() {
    return this.color;
  }

  @HostBinding('style.--dcx-divider-thickness') get dividerThickness() {
    return `${this.thickness}rem`;
  }

  @HostBinding('attr.aria-label') get ariaLabelBinding() {
    return this.ariaLabel || 'Divider';
  }

  get dividerClasses(): string {
    const label = 'dcx-ng-divider';
    return [
      label,
      this.orientation ? `${label}--${this.orientation}` : '',
      this.size ? `${label}--${this.size}` : '',
    ].join(' ');
  }
}
