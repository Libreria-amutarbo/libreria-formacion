import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconSize = 's' | 'm' | 'l' | 'xl';
type IconSpacing = 'none' | 'compact' | 'spacious';

@Component({
  selector: 'dcx-ng-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-icon.component.html',
  styleUrl: './dcx-ng-icon.component.scss',
})
export class DcxNgIconComponent {
  @Input() size: IconSize = 'm';
  @Input() spacing: IconSpacing = 'none';
  @Input() color = '';
  @Input() name = '';

  @HostBinding('class') get iconClass() {
    const base = ['bi', `bi-${this.name}`, `bi--${this.size}`];
    if (this.spacing !== 'none') {
      base.push(`bi--${this.spacing}`);
    }

    return base.join(' ');
  }

  @HostBinding('style.color') get iconColor() {
    return this.color || '#010101';
  }
}
