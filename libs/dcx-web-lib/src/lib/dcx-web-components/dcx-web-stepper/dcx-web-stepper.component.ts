import { LitElement } from 'lit';
import {
  customElement,
  property,
  state,
} from 'lit/decorators.js';

import { dcxWebStepperStyles } from './dcx-web-stepper.component.styles';
import { renderDcxWebStepperTemplate } from './dcx-web-stepper.component.html';

import '../dcx-web-icon/dcx-web-icon.component';

import type {
  DcxStepperItem,
  DcxStepperChangeEvent,
  DcxStepperSize,
} from '../../core/interfaces/stepper';

@customElement('dcx-web-stepper')
export class DcxWebStepper extends LitElement {
  @property({ attribute: false })
  accessor steps: DcxStepperItem[] = [];

  @property({ attribute: false })
  accessor activeStepId:
    | string
    | number = '';

  @property({ type: String })
  accessor orientation:
    | 'horizontal'
    | 'vertical' = 'horizontal';

  @property({ type: Boolean })
  accessor linear = false;

  @property({ type: Boolean })
  accessor showStepNumbers = true;

  @property({ type: String })
  accessor size: DcxStepperSize = 'm';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel:
    | string
    | null = null;

  @state()
  accessor internalActiveStepId:
    | string
    | number
    | null = null;

  static override styles =
    dcxWebStepperStyles;

  override connectedCallback() {
    super.connectedCallback();
    this.syncActiveStepId();
  }

  override updated(
    changed: Map<string, unknown>,
  ) {
    if (
      changed.has('activeStepId') ||
      changed.has('steps')
    ) {
      this.syncActiveStepId();
    }
  }

  get activeStepIndex() {
    return this.steps.findIndex(
      step =>
        step.id ===
        this.internalActiveStepId,
    );
  }

  get activeStep() {
    const idx = this.activeStepIndex;

    return idx >= 0
      ? this.steps[idx]
      : null;
  }

  get activeStepContent() {
    return Boolean(
      this.activeStep?.contentTpl,
    );
  }

  get stepperClasses() {
    return [
      'dcx-stepper',
      `dcx-stepper--${this.orientation}`,
      `dcx-stepper--${this.size}`,
    ].join(' ');
  }

  get headerClasses() {
    return 'dcx-stepper__header';
  }

  get contentClasses() {
    return 'dcx-stepper__content';
  }

  emit(
    name: string,
    detail?: unknown,
  ) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncActiveStepId() {
    if (
      this.activeStepId === '' ||
      this.activeStepId === null ||
      this.activeStepId === undefined
    ) {
      this.setFirstEnabledStepAsActive();
      return;
    }

    this.internalActiveStepId =
      this.activeStepId;
  }

  private setFirstEnabledStepAsActive() {
    const first =
      this.steps.find(
        step => !step.disabled,
      );

    this.internalActiveStepId =
      first?.id ?? null;
  }

  isActive(
    stepId: string | number,
  ) {
    return (
      this.internalActiveStepId === stepId
    );
  }

  getStepClasses(
    step: DcxStepperItem,
  ) {
    return [
      'dcx-stepper__step',
      this.isActive(step.id)
        ? 'dcx-stepper__step--active'
        : '',
      step.completed
        ? 'dcx-stepper__step--completed'
        : '',
      step.disabled
        ? 'dcx-stepper__step--disabled'
        : '',
      step.error
        ? 'dcx-stepper__step--error'
        : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onStepClick(
    step: DcxStepperItem,
    index: number,
  ) {
    if (step.disabled) return;

    if (
      this.linear &&
      !this.canNavigateToIndex(index)
    ) {
      return;
    }

    const eventData: DcxStepperChangeEvent =
      {
        previousStepId:
          this.internalActiveStepId,
        currentStepId: step.id,
        previousIndex:
          this.activeStepIndex,
        currentIndex: index,
      };

    this.internalActiveStepId =
      step.id;

    this.emit('stepClick', step);

    this.emit(
      'stepChange',
      eventData,
    );
  }

  onStepKeydown(
    event: KeyboardEvent,
    step: DcxStepperItem,
    index: number,
  ) {
    const enter =
      event.key === 'Enter' ||
      event.key === ' ';

    if (enter) {
      event.preventDefault();
      this.onStepClick(step, index);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.activateStepAtIndex(
        this.findFirstEnabledStep(),
      );
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.activateStepAtIndex(
        this.findLastEnabledStep(),
      );
      return;
    }

    const horizontal =
      this.orientation ===
      'horizontal';

    if (horizontal) {
      this.navigateByArrowKey(
        event,
        index,
        'ArrowRight',
        'ArrowLeft',
      );
    } else {
      this.navigateByArrowKey(
        event,
        index,
        'ArrowDown',
        'ArrowUp',
      );
    }
  }

  private navigateByArrowKey(
    event: KeyboardEvent,
    index: number,
    nextKey: string,
    previousKey: string,
  ) {
    if (event.key === nextKey) {
      event.preventDefault();
      this.activateStepAtIndex(
        this.findNextEnabledStep(
          index,
          1,
        ),
      );
    }

    if (event.key === previousKey) {
      event.preventDefault();
      this.activateStepAtIndex(
        this.findNextEnabledStep(
          index,
          -1,
        ),
      );
    }
  }

  private activateStepAtIndex(
    index: number,
  ) {
    if (index < 0) return;

    this.onStepClick(
      this.steps[index],
      index,
    );
  }

  private findNextEnabledStep(
    currentIndex: number,
    direction: number,
  ) {
    let next =
      currentIndex + direction;

    while (
      next >= 0 &&
      next < this.steps.length
    ) {
      if (
        !this.steps[next].disabled
      ) {
        return next;
      }

      next += direction;
    }

    return -1;
  }

  private findFirstEnabledStep() {
    return this.steps.findIndex(
      step => !step.disabled,
    );
  }

  private findLastEnabledStep() {
    for (
      let i = this.steps.length - 1;
      i >= 0;
      i--
    ) {
      if (
        !this.steps[i].disabled
      ) {
        return i;
      }
    }

    return -1;
  }

  private canNavigateToIndex(
    target: number,
  ) {
    if (
      target <=
      this.activeStepIndex
    ) {
      return true;
    }

    return this.steps
      .slice(0, target)
      .every(
        step =>
          step.completed ||
          step.disabled,
      );
  }

  override render() {
    return renderDcxWebStepperTemplate(
      this,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-stepper': DcxWebStepper;
  }
}