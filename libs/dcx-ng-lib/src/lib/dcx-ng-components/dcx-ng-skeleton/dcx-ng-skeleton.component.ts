import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { DcxSkeletonAnimation, DcxSkeletonShape } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-skeleton.component.html',
  styleUrl: './dcx-ng-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dcx-skeleton',
    'aria-hidden': 'true',
    '[class.dcx-skeleton--rectangle]': 'shape() === "rectangle"',
    '[class.dcx-skeleton--circle]': 'shape() === "circle"',
    '[class.dcx-skeleton--wave]': 'animation() === "wave"',
    '[class.dcx-skeleton--none]': 'animation() === "none"',
    '[style.--dcx-skeleton-width]': 'computedWidth()',
    '[style.--dcx-skeleton-height]': 'computedHeight()',
    '[style.--dcx-skeleton-border-radius]': 'computedBorderRadius()',
  },
})
export class DcxNgSkeletonComponent {
  readonly shape = input<DcxSkeletonShape>('rectangle');
  readonly width = input<string>('100%');
  readonly height = input<string>('1rem');
  readonly size = input<string | null>(null);
  readonly borderRadius = input<string | null>(null);
  readonly animation = input<DcxSkeletonAnimation>('wave');

  readonly computedWidth = computed<string>(() => {
    const sizeValue = this.size();
    if (sizeValue) return sizeValue;

    return this.width();
  });

  readonly computedHeight = computed<string>(() => {
    const sizeValue = this.size();
    if (sizeValue) return sizeValue;

    return this.height();
  });

  readonly computedBorderRadius = computed<string>(() => {
    if (this.shape() === 'circle') return 'var(--r-pill, 999px)';

    return this.borderRadius() || 'var(--r-md, 6px)';
  });
}
