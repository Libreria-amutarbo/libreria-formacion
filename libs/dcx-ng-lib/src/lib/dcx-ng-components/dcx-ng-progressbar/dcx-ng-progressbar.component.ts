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
  private static nextId = 0;

  readonly variant = input<DcxProgressVariant>('default');
  readonly value = input<number>(0);
  readonly label = input<string>('');
  readonly ariaLabel = input<string>('');
  readonly showTooltip = input<boolean>(false);
  readonly showLabel = input<boolean>(false);
  readonly steps = input<DcxProgressStep[]>([]);
  readonly currentStep = input<number>(0);
  readonly showCheckmarks = input<boolean>(false);
  readonly segments = input<number>(5);

  readonly labelId = `dcx-progressbar-${DcxNgProgressbarComponent.nextId++}-label`;

  readonly progressPercentage = computed<number>(() =>
    Math.min(Math.max(this.value(), 0), 100),
  );

  readonly isStepperVariant = computed<boolean>(() => this.variant() === 'stepper');
  readonly isSegmentedVariant = computed<boolean>(
    () => this.variant() === 'segmented',
  );
  readonly isDefaultVariant = computed<boolean>(() => this.variant() === 'default');

  readonly segmentArray = computed<number[]>(() =>
    Array(this.segments())
      .fill(0)
      .map((_, i) => i),
  );

  readonly stepProgress = computed<number>(() => {
    const total = this.steps().length;
    if (total === 0) return 0;
    return (this.currentStep() / total) * 100;
  });

  readonly stepValueText = computed<string>(
    () => `Paso ${this.currentStep()} de ${this.steps().length}`,
  );

  isStepCompleted = (index: number): boolean => index < this.currentStep() - 1;

  isStepActive = (index: number): boolean => index === this.currentStep() - 1;
}
