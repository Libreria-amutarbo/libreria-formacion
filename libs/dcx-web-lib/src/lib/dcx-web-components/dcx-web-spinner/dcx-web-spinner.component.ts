import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { styles } from './dcx-web-spinner.component.styles';
import { template } from './dcx-web-spinner.component.html';

import type { DcxSpinnerSize } from '../../core/interfaces/spinner';

@customElement('dcx-web-spinner')
export class DcxWebSpinner extends LitElement {
  @property({ type: String })
  accessor size: DcxSpinnerSize = 'm';

  @property({ type: Boolean })
  accessor wrapper = false;

  @property({ type: String })
  override accessor title = '';

  @property({ type: String })
  accessor description = '';

  @property({ type: Number })
  accessor delay = 1300;

  @property({ type: String })
  accessor color: string | null = null;

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel: string | null = null;

  @state()
  accessor visible = false;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  static override styles = styles;

  get computedAriaLabel(): string {
    return this.ariaLabel || this.title || 'Cargando…';
  }

  get hasContent(): boolean {
    return !!(this.title || this.description);
  }

  public spinnerClasses() {
    const base = 'dcx-spinner';

    return [
      base,
      `${base}--${this.size}`,
      this.wrapper ? `${base}--wrapper` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private startDelayTimer() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.delay <= 0) {
      this.visible = true;
      return;
    }

    this.visible = false;

    this.timeoutId = setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.startDelayTimer();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('delay')) {
      this.startDelayTimer();
    }
  }

  override disconnectedCallback() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    super.disconnectedCallback();
  }

  override render() {
    this.style.setProperty('--dcx-spinner-delay', `${this.delay}ms`);

    if (this.color) {
      this.style.setProperty('--dcx-spinner-color', this.color);
    } else {
      this.style.removeProperty('--dcx-spinner-color');
    }

    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-spinner': DcxWebSpinner;
  }
}
