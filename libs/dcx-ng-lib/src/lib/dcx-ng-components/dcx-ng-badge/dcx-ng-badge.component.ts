import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeSeverityType, BadgeSizeType } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-badge',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-badge.component.html',
  styleUrl: './dcx-ng-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBadgeComponent {
  readonly value = input<string>('');
  readonly severity = input<BadgeSeverityType>('primary');
  readonly size = input<BadgeSizeType>('md');

  readonly badgeClasses = computed(() => [
    'dcx-badge',
    `dcx-badge--${this.severity()}`,
    `dcx-badge--${this.size()}`,
  ]);
}
