import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
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

  // ARIA inputs
  readonly ariaLabel = input<string | null>(null);
  readonly ariaHidden = input(false, { transform: booleanAttribute });
  readonly role = input<'status' | 'alert' | null>(null);

  readonly badgeClasses = computed(() => [
    'dcx-badge',
    `dcx-badge--${this.severity()}`,
    `dcx-badge--${this.size()}`,
  ]);

  // Provides semantic context when no explicit ariaLabel is given.
  // Suppressed when ariaHidden=true (decorative badge).
  readonly computedAriaLabel = computed<string | null>(() => {
    if (this.ariaHidden()) return null;
    if (this.ariaLabel() !== null) return this.ariaLabel();
    const v = this.value();
    return v ? `${v}, ${this.severity()}` : this.severity();
  });
}
