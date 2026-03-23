import { CommonModule } from '@angular/common';
import { Component, computed, HostBinding, input } from '@angular/core';
import {
  DcxSize,
  DividerOrientation,
  DividerType,
} from '../../core/interfaces';
import { tokens } from '../../core/mock/colors';
import { mapSizeToCssValue, mapTypeToCssValue } from './divider-mapper';

@Component({
  selector: 'dcx-ng-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-divider.component.html',
  styleUrl: './dcx-ng-divider.component.scss',
})
export class DcxNgDividerComponent {
  color = input<string>(tokens.background.pressed);
  size = input<DcxSize>('auto');
  orientation = input<DividerOrientation>('horizontal');
  thickness = input<number>(0.25);
  ariaLabel = input<string>('');
  type = input<DividerType>('default');

  ariaLabelBinding = computed<string>(() => this.ariaLabel() ?? 'dcx-divider');

  @HostBinding('class.horizontal')
  get isHorizontal() {
    return this.orientation() === 'horizontal';
  }

  @HostBinding('class.vertical')
  get isVertical() {
    return this.orientation() === 'vertical';
  }

  @HostBinding('style.--dcx-divider-size')
  get dividerSize() {
    return mapSizeToCssValue(this.size());
  }

  @HostBinding('style.--dcx-divider-style')
  get dividerStyle() {
    return mapTypeToCssValue(this.type());
  }

  @HostBinding('style.--dcx-divider-color')
  get dividerColor() {
    return this.color();
  }

  @HostBinding('style.--dcx-divider-thickness')
  get dividerThickness() {
    return `${this.thickness()}rem`;
  }
}
