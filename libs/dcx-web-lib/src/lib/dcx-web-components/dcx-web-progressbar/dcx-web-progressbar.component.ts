import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './dcx-web-progressbar.component.styles';
import { template } from './dcx-web-progressbar.component.html';

import '../dcx-web-icon/dcx-web-icon.component';
import type { DcxProgressStep } from '../../core/interfaces/progressbar';
import type { DcxProgressVariant } from '../../core/interfaces/progressbar';


@customElement('dcx-web-progressbar')
export class DcxWebProgressbar extends LitElement {
  @property({ type: String })
  override accessor id =
    `dcx-progressbar-${Math.random().toString(36).substring(2, 9)}`;

  @property({ type: String })
  accessor variant: DcxProgressVariant = 'default';

  @property({ type: Number })
  accessor value = 0;

  @property({ type: String })
  accessor label = '';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = '';

  @property({ type: Boolean })
  accessor showTooltip = false;

  @property({ type: Boolean })
  accessor showLabel = false;

  @property({ attribute: false })
  accessor steps: DcxProgressStep[] = [];

  @property({ type: Number })
  accessor currentStep = 0;

  @property({ type: Boolean })
  accessor showCheckmarks = false;

  @property({ type: Number })
  accessor segments = 5;

  static override styles = styles;

  get labelId() {
    return `${this.id}-label`;
  }

  get progressPercentage(): number {
    return Math.min(
      Math.max(this.value, 0),
      100,
    );
  }

  get isStepperVariant(): boolean {
    return this.variant === 'stepper';
  }

  get isSegmentedVariant(): boolean {
    return this.variant === 'segmented';
  }

  get isDefaultVariant(): boolean {
    return this.variant === 'default';
  }

  get segmentArray(): number[] {
    return Array(this.segments)
      .fill(0)
      .map((_, i) => i);
  }

  get stepProgress(): number {
    const total = this.steps.length;

    if (total === 0) {
      return 0;
    }

    return (this.currentStep / total) * 100;
  }

  get stepValueText(): string {
    return `Paso ${this.currentStep} de ${this.steps.length}`;
  }

  public isStepCompleted(index: number): boolean {
    return index < this.currentStep - 1;
  }

  public isStepActive(index: number): boolean {
    return index === this.currentStep - 1;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-progressbar': DcxWebProgressbar;
  }
}