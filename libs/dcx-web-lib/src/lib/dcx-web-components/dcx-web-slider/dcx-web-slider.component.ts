import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-slider.component.styles';
import { template } from './dcx-web-slider.component.html';
import { SLIDER_DEFAULT_VALUES } from '../../core/defaults/slider';
import '../dcx-web-input/dcx-web-input.component';

@customElement('dcx-web-slider')
export class DcxWebSlider extends LitElement {
  static override styles = styles;

  @property({ type: Boolean })
  accessor showLabel = SLIDER_DEFAULT_VALUES.showLabel;

  @property({ type: String })
  accessor textLabel = SLIDER_DEFAULT_VALUES.textLabel;

  @property({ type: Number })
  accessor value = SLIDER_DEFAULT_VALUES.value;

  @property({ type: Number })
  accessor min = SLIDER_DEFAULT_VALUES.min;

  @property({ type: Number })
  accessor max = SLIDER_DEFAULT_VALUES.max;

  @property({ type: Number })
  accessor step = SLIDER_DEFAULT_VALUES.step;

  @property({ type: Boolean })
  accessor vertical = SLIDER_DEFAULT_VALUES.vertical;

  @property({ type: Boolean })
  accessor disabled = SLIDER_DEFAULT_VALUES.disabled;

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = null;

  @property({ type: String })
  accessor valueSuffix = SLIDER_DEFAULT_VALUES.valueSuffix;

  @state()
  accessor valueInput = 0;

  override willUpdate(changedProperties: Map<PropertyKey, unknown>) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('min') ||
      changedProperties.has('max')
    ) {
      this.valueInput = this.clamp(this.value);
    }
  }

  override updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('vertical')) {
      if (this.vertical) {
        this.classList.add('dcx-slider--vertical');
      } else {
        this.classList.remove('dcx-slider--vertical');
      }
    }
    this.style.setProperty('--slider-progress', `${this.progressPercent}%`);
  }

  override async firstUpdated() {
    const webInput = this.shadowRoot?.querySelector('dcx-web-input');
    if (webInput) {
      await webInput.updateComplete;
      if (webInput.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = styles.cssText;
        webInput.shadowRoot.appendChild(style);
      }
    }
  }

  private clamp(val: number): number {
    return Math.min(Math.max(val, this.min), this.max);
  }

  public onInput(e: CustomEvent<number | string>) {
    const newValue = Number(e.detail);
    this.valueInput = newValue;
    this.value = newValue;
    this.dispatchEvent(
      new CustomEvent('valueChange', {
        detail: newValue,
        bubbles: true,
        composed: true,
      }),
    );
  }

  get displayValue(): string {
    return `${this.valueInput}${this.valueSuffix}`;
  }

  get effectiveAriaLabel(): string | null {
    return this.ariaLabel || (this.showLabel ? this.textLabel : null);
  }

  get effectiveAriaValueText(): string | null {
    return this.valueSuffix ? this.displayValue : null;
  }

  get progressPercent(): number {
    const min = this.min;
    const max = this.max;
    const val = this.valueInput;
    if (max === min) return 100;
    return ((val - min) / (max - min)) * 100;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-slider': DcxWebSlider;
  }
}
