import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './dcx-web-radio.component.styles';
import { template } from './dcx-web-radio.component.html';
import type { DcxRadioOption, DcxRadioSize } from '../../core/interfaces/radio';

@customElement('dcx-web-radio')
export class DcxWebRadio extends LitElement {
  static override styles = styles;

  @property({ type: Array })
  accessor options: DcxRadioOption[] = [];

  @property({ type: String })
  accessor name = `dcx-radio-${Math.random().toString(36).substring(2, 9)}`;

  @property({ type: String })
  accessor label = '';

  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = '';

  @property({ type: String })
  accessor size: DcxRadioSize = 'l';

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor error = false;

  @property({ type: String })
  accessor hint = '';

  @property({ type: String, attribute: 'error-message' })
  accessor errorMessage = '';

  @property({ type: String })
  accessor value: string | null = null;

  readonly groupId = `dcx-radio-group-${Math.random().toString(36).substring(2, 9)}`;

  get hintId(): string {
    return `${this.groupId}-hint`;
  }

  get errorId(): string {
    return `${this.groupId}-error`;
  }

  get isGroupDisabled(): boolean {
    return this.disabled;
  }

  get showError(): boolean {
    return this.error && !!this.errorMessage;
  }

  get showHint(): boolean {
    return !!this.hint && !this.showError;
  }

  get describedBy(): string | null {
    if (this.showError) return this.errorId;
    if (this.showHint) return this.hintId;
    return null;
  }

  isChecked(value: string): boolean {
    return this.value === value;
  }

  isOptionDisabled(option: DcxRadioOption): boolean {
    return this.isGroupDisabled || !!option.disabled;
  }

  radioClasses(option: DcxRadioOption): string {
    const base = 'dcx-radio';
    return [
      base,
      `${base}--${this.size}`,
      this.error ? `${base}--error` : '',
      this.isOptionDisabled(option) ? `${base}--disabled` : '',
      this.isChecked(option.value) ? `${base}--checked` : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onOptionChange(option: DcxRadioOption): void {
    if (this.isOptionDisabled(option)) return;
    this.value = option.value;

    this.dispatchEvent(
      new CustomEvent('valueChange', {
        detail: option.value,
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  onBlur(): void {
    this.dispatchEvent(
      new CustomEvent('blurEvent', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-radio': DcxWebRadio;
  }
}
