import { CommonModule } from '@angular/common';
import { Component, computed, HostBinding, input } from '@angular/core';
import {
  DcxSize,
  DividerOrientation,
  DividerType,
} from '../../core/interfaces';
import { tokens } from '../../core/mock/colors';

@Component({
  selector: 'dcx-ng-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-divider.component.html',
  styleUrl: './dcx-ng-divider.component.scss',
})
export class DcxNgDividerComponent {
  color = input<string>(tokens.background.error);
  size = input<DcxSize>('auto');
  orientation = input<DividerOrientation>('horizontal');
  thickness = input<number>(0.25);
  ariaLabel = input<string>('');
  type = input<DividerType>('default');

  dividerClasses = computed<string>(() => {
    const label = 'dcx-ng-divider';
    const orientation = this.orientation()
      ? `${label}--${this.orientation()}`
      : '';
    const size = this.size() ? `${label}--${this.size()}` : '';
    const type = this.type() ? `${label}--${this.type()}` : '';
    console.log([label, orientation, size, type].join(' '));
    return [label, orientation, size, type].join(' ');
  });

  ariaLabelBinding = computed<string>(() => this.ariaLabel() ?? 'dcx-divider');

  @HostBinding('style.--dcx-divider-color')
  get dividerColor() {
    return this.color();
  }

  @HostBinding('style.--dcx-divider-thickness')
  get dividerThickness() {
    return `${this.thickness()}rem`;
  }
}
