import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'dcx-ng-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-divider.component.html',
  styleUrl: './dcx-ng-divider.component.scss',
})
export class DcxNgDividerComponent {
  @Input() color = '#ff0000';
  @Input() size: DividerSize = 'medium';
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() thickness = 1;
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
    return [
      'dcx-ng-divider',
      this.orientation ? `dcx-ng-divider--${this.orientation}` : '',
      this.size ? `dcx-ng-divider--${this.size}` : '',
    ].join(' ');
  }
}
