import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { DcxSize } from '../../core/interfaces';
import { IconSpacing } from '../../core/interfaces/icon';

@Component({
  selector: 'dcx-ng-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-icon.component.html',
  styleUrl: './dcx-ng-icon.component.scss',
})
export class DcxNgIconComponent {
  @Input() size: DcxSize = 'm';
  @Input() spacing: IconSpacing = 'none';
  @Input() color = '';
  @Input() name = '';

  @HostBinding('class') get iconClass() {
    const base = ['material-icons', `material-icons--${this.size}`];
    if (this.spacing !== 'none') {
      base.push(`material-icons--${this.spacing}`);
    }

    return base.join(' ');
  }

  @HostBinding('style.color') get iconColor() {
    return this.color || '#010101';
  }
}
