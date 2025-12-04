import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { IconSpacing, DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-icon',
  templateUrl: './dcx-ng-icon.component.html',
  styleUrls: ['./dcx-ng-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.color]': 'color() || null',
  },
})
export class DcxNgIconComponent {
  readonly name = input.required<string>();
  readonly size = input<DcxSize>('m');
  readonly spacing = input<IconSpacing>('none');
  readonly color = input<string>('');
  readonly extraClass = input<string>('');

  readonly iconClass = computed(() => {
    const classes: string[] = [
      'bi',
      `bi-${this.name()}`,
      'dcx-icon',
      `dcx-icon--size-${this.size()}`,
    ];

    const spacing = this.spacing();
    if (spacing !== 'none') {
      classes.push(`dcx-icon--spacing-${spacing}`);
    }

    const extra = this.extraClass().trim();
    if (extra) {
      classes.push(extra);
    }

    return classes.join(' ');
  });
}

