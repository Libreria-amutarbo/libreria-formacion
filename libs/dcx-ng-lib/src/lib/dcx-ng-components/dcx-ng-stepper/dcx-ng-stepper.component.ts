import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import {
  DcxStepperChangeEvent,
  DcxStepperItem,
  DcxStepperSize,
} from '../../core/interfaces/stepper';
import { DcxLayout } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-stepper',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-stepper.component.html',
  styleUrl: './dcx-ng-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgStepperComponent {
  readonly steps = input.required<DcxStepperItem[]>();
  readonly activeStepId = input<string | number>('');
  readonly orientation = input<DcxLayout>('horizontal');
  readonly linear = input<boolean>(false);
  readonly showStepNumbers = input<boolean>(true);
  readonly size = input<DcxStepperSize>('m');
  readonly ariaLabel = input<string | null>(null);

  readonly stepChange = output<DcxStepperChangeEvent>();
  readonly stepClick = output<DcxStepperItem>();

  private readonly _activeStepId = signal<string | number | null>(null);

  readonly activeStepIndex = computed(() => {
    const id = this._activeStepId();
    return this.steps().findIndex(s => s.id === id);
  });

  readonly activeStep = computed(() => {
    const idx = this.activeStepIndex();
    return idx >= 0 ? this.steps()[idx] : null;
  });

  readonly stepperClasses = computed(() => {
    const base = 'dcx-stepper';
    const orientation = `dcx-stepper--${this.orientation()}`;
    const size = `dcx-stepper--${this.size()}`;
    return [base, orientation, size].filter(Boolean).join(' ');
  });

  readonly headerClasses = computed(() => {
    const base = 'dcx-stepper__header';
    return base;
  });

  readonly contentClasses = computed(() => {
    const base = 'dcx-stepper__content';
    return base;
  });

  constructor() {
    effect(() => {
      this.syncActiveStepId();
    });
  }

  private syncActiveStepId(): void {
    const activeStepId = this.activeStepId();

    if (
      activeStepId === '' ||
      activeStepId === null ||
      activeStepId === undefined
    ) {
      this.setFirstEnabledStepAsActive();
      return;
    }

    this._activeStepId.set(activeStepId);
  }

  private setFirstEnabledStepAsActive(): void {
    const firstEnabledStep = this.steps().find(step => !step.disabled);

    this._activeStepId.set(firstEnabledStep?.id ?? null);
  }

  onStepClick(step: DcxStepperItem, index: number): void {
    if (step.disabled) {
      return;
    }

    if (this.linear() && !this.canNavigateToIndex(index)) {
      return;
    }

    const previousId = this._activeStepId();
    const previousIndex = this.activeStepIndex();
    const currentId = step.id;
    const currentIndex = index;

    this._activeStepId.set(currentId);

    this.stepClick.emit(step);
    this.stepChange.emit({
      previousStepId: previousId,
      currentStepId: currentId,
      previousIndex,
      currentIndex,
    });
  }

  onStepKeydown(
    event: KeyboardEvent,
    step: DcxStepperItem,
    index: number,
  ): void {
    const isHorizontal = this.orientation() === 'horizontal';
    const isEnter = event.key === 'Enter' || event.key === ' ';

    if (isEnter) {
      event.preventDefault();
      this.onStepClick(step, index);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.activateStepAtIndex(this.findFirstEnabledStep());
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.activateStepAtIndex(this.findLastEnabledStep());
      return;
    }

    if (isHorizontal) {
      this.navigateByArrowKey(event, index, 'ArrowRight', 'ArrowLeft');
    } else {
      this.navigateByArrowKey(event, index, 'ArrowDown', 'ArrowUp');
    }
  }

  private navigateByArrowKey(
    event: KeyboardEvent,
    index: number,
    nextKey: string,
    previousKey: string,
  ): void {
    if (event.key === nextKey) {
      event.preventDefault();
      this.navigateToEnabledStep(index, 1);
      return;
    }

    if (event.key === previousKey) {
      event.preventDefault();
      this.navigateToEnabledStep(index, -1);
    }
  }

  private navigateToEnabledStep(currentIndex: number, direction: number): void {
    this.activateStepAtIndex(this.findNextEnabledStep(currentIndex, direction));
  }

  private activateStepAtIndex(index: number): void {
    if (index >= 0) {
      this.onStepClick(this.steps()[index], index);
    }
  }

  private findNextEnabledStep(currentIndex: number, direction: number): number {
    const stepsList = this.steps();
    let nextIndex = currentIndex + direction;

    while (nextIndex >= 0 && nextIndex < stepsList.length) {
      if (!stepsList[nextIndex].disabled) {
        return nextIndex;
      }
      nextIndex += direction;
    }

    return -1;
  }

  private findFirstEnabledStep(): number {
    return this.steps().findIndex(step => !step.disabled);
  }

  private findLastEnabledStep(): number {
    const stepsList = this.steps();

    for (let i = stepsList.length - 1; i >= 0; i--) {
      if (!stepsList[i].disabled) return i;
    }

    return -1;
  }

  private canNavigateToIndex(targetIndex: number): boolean {
    const activeIndex = this.activeStepIndex();

    if (targetIndex <= activeIndex) {
      return true;
    }

    return this.steps()
      .slice(0, targetIndex)
      .every(step => step.completed || step.disabled);
  }

  getStepClasses(step: DcxStepperItem): string {
    const base = 'dcx-stepper__step';
    const active =
      this._activeStepId() === step.id ? 'dcx-stepper__step--active' : '';
    const completed = step.completed ? 'dcx-stepper__step--completed' : '';
    const disabled = step.disabled ? 'dcx-stepper__step--disabled' : '';
    const error = step.error ? 'dcx-stepper__step--error' : '';

    return [base, active, completed, disabled, error].filter(Boolean).join(' ');
  }

  getContentTpl(step: DcxStepperItem): TemplateRef<unknown> | null {
    return step.contentTpl ?? null;
  }

  isActive(stepId: string | number): boolean {
    return this._activeStepId() === stepId;
  }
}
