import { Component, input, computed } from '@angular/core';

export type IconSize = 's' | 'm' | 'l' | 'xl';
export type IconSpacing = 'none' | 'compact' | 'spacious';

@Component({
  selector: 'dcx-ng-icon',
  standalone: true,
  templateUrl: './dcx-ng-icon.component.html',
  styleUrl: './dcx-ng-icon.component.scss',
})
export class DcxNgIconComponent {
  readonly size = input<IconSize>('m');
  readonly spacing = input<IconSpacing>('none');
  readonly color = input<string>('');
  readonly name = input<string>('');

  readonly iconClass = computed(() => {
    const base = ['bi', `bi-${this.name()}`, `bi--${this.size()}`];
    if (this.spacing() !== 'none') {
      base.push(`bi--${this.spacing()}`);
    }
    if (this.color()) {
      base.push(`bi--color-${this.sanitizeColor(this.color())}`);
    }
    return base.join(' ');
  });

  private sanitizeColor(color: string): string {
    return color.replace(/^#/, '').toLowerCase();
  }
}
