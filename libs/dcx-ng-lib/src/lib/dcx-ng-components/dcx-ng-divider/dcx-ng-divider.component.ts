import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
} from '@angular/core';

import {
  DcxSize,
  DividerOrientation,
  DividerType,
} from '../../core/interfaces';
import { mapSizeToCssValue, mapTypeToCssValue } from '../../core/mapping';
import { tokens } from '../../core/tokens';

@Component({
  selector: 'dcx-ng-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-divider.component.html',
  styleUrl: './dcx-ng-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDividerComponent {
  color = input<string>(tokens.background.pressed);
  size = input<DcxSize>('auto');
  orientation = input<DividerOrientation>('horizontal');
  thickness = input<number>(0.25);
  ariaLabel = input<string>('');
  type = input<DividerType>('default');
  label = input<string>('');

  readonly ariaLabelBinding = computed(() =>
    this.ariaLabel() || this.label() || null,
  );

  @HostBinding('attr.aria-hidden')
  get ariaHiddenBinding(): true | null {
    return !this.label() && !this.ariaLabel() ? true : null;
  }

  @HostBinding('class.has-label')
  get hasLabel() {
    return !!this.label();
  }

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
