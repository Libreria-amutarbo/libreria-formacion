import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

export interface DcxProgressStep {
  label: string;
}

export type DcxProgressVariant = 'default' | 'segmented' | 'stepper';

@Component({
  selector: 'dcx-ng-progressbar',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-progressbar.component.html',
  styleUrls: ['./dcx-ng-progressbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgProgressbarComponent {
  readonly variant = input<DcxProgressVariant>('default');
  readonly value = input<number>(0);
  readonly showTooltip = input<boolean>(false);
  readonly showLabel = input<boolean>(false);
  readonly steps = input<DcxProgressStep[]>([]);
  readonly currentStep = input<number>(0);
  readonly showCheckmarks = input<boolean>(false);
  readonly segments = input<number>(5);

  readonly progressPercentage = computed(() => {
    const val = this.value();
    return Math.min(Math.max(val, 0), 100);
  });

  readonly isStepperVariant = computed(() => this.variant() === 'stepper');
  readonly isSegmentedVariant = computed(() => this.variant() === 'segmented');
  readonly isDefaultVariant = computed(() => this.variant() === 'default');

  readonly segmentArray = computed(() => 
    Array(this.segments()).fill(0).map((_, i) => i)
  );

  readonly stepProgress = computed(() => {
    const total = this.steps().length;
    if (total === 0) return 0;
    return (this.currentStep() / total) * 100;
  });

  isStepCompleted = (index: number): boolean => {
    return index < this.currentStep() - 1;
  };

  isStepActive = (index: number): boolean => {
    return index === this.currentStep() - 1;
  };
}
