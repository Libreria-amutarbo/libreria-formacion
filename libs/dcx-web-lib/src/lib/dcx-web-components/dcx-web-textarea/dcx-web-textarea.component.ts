import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

import { styles } from './dcx-web-textarea.component.styles';
import { template } from './dcx-web-textarea.component.html';

import type {
  FloatLabelVariant,
  TextareaSize,
} from '../../core/interfaces/textarea';

@customElement('dcx-web-textarea')
export class DcxWebTextarea extends LitElement {
  @query('textarea')
  textareaElement!: HTMLTextAreaElement;

  @property({ attribute: false })
  accessor value = '';

  @property({ type: Number })
  accessor rows = 5;

  @property({ type: Number })
  accessor cols = 30;

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: Boolean })
  accessor readonly = false;

  @property({ type: Boolean })
  accessor autoResize = false;

  @property({ type: String })
  accessor floatLabel: FloatLabelVariant | undefined = undefined;

  @property({ type: String })
  accessor label = '';

  @property({ type: String })
  accessor size: TextareaSize = 'normal';

  @property({ type: Boolean })
  accessor fluid = false;

  @property({ type: Boolean })
  accessor filled = false;

  @property({ type: Boolean })
  accessor invalid = false;

  @property({ type: String })
  accessor errorMessage = '';

  @property({ type: String })
  override accessor id = `dcx-textarea-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  @property({
    type: String,
    attribute: 'aria-label',
  })
  override accessor ariaLabel: string | null = null;

  @property({
    type: String,
    attribute: 'aria-describedby',
  })
  accessor ariaDescribedBy: string | null = null;

  @property({ type: Boolean })
  accessor required = false;

  @property({ type: String })
  accessor hint = '';

  @property({ attribute: false })
  accessor maxLength: number | null = null;

  @property({ type: Boolean })
  accessor resizable = true;

  @state()
  accessor focused = false;

  @state()
  accessor _autoHeight = '';

  static override styles = styles;

  get errorId() {
    return `${this.id}-error`;
  }

  get hintId() {
    return `${this.id}-hint`;
  }

  get showError() {
    return this.invalid && !!this.errorMessage;
  }

  get showHint() {
    return !!this.hint && !this.showError;
  }

  get describedBy() {
    const ids = [
      this.ariaDescribedBy,
      this.showError ? this.errorId : null,
      this.showHint ? this.hintId : null,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();

    return ids || null;
  }

  get computedResize(): 'vertical' | 'none' {
    return !this.autoResize && this.resizable ? 'vertical' : 'none';
  }

  public emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  public getTextareaClasses() {
    return [
      'dcx-textarea__control',
      this.autoResize && 'dcx-textarea__control--autoresize',
      this.size !== 'normal' && `dcx-textarea__control--${this.size}`,
      this.filled && 'dcx-textarea__control--filled',
      this.invalid && 'dcx-textarea__control--invalid',
    ]
      .filter(Boolean)
      .join(' ');
  }

  public getWrapperClasses() {
    return [
      'dcx-textarea__wrapper',
      this.fluid && 'dcx-textarea__wrapper--fluid',
      this.floatLabel && 'dcx-textarea__wrapper--float',
      this.floatLabel && `dcx-textarea__wrapper--${this.floatLabel}`,
      this.floatLabel && this.focused && 'dcx-textarea__wrapper--active',
    ]
      .filter(Boolean)
      .join(' ');
  }

  public onInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement;

    this.value = target?.value ?? '';

    this.emit('valueChange', this.value);

    this.syncTextareaSize();
  };

  public onFocus = () => {
    this.focused = true;
  };

  public onBlur = () => {
    this.focused = false;
  };

  protected override firstUpdated(): void {
    this.syncTextareaSize();
  }

  protected override updated(
    changedProperties: Map<PropertyKey, unknown>,
  ): void {
    super.updated(changedProperties);

    if (changedProperties.has('autoResize')) {
      this.syncTextareaSize();
    }
  }

  private syncTextareaSize(): void {
    const textarea = this.renderRoot?.querySelector(
      'textarea',
    ) as HTMLTextAreaElement | null;

    if (!textarea) {
      console.log('NO TEXTAREA');
      return;
    }

    console.log('SYNC');

    console.log('AUTORESIZE', this.autoResize);

    console.log('SCROLLHEIGHT', textarea.scrollHeight);

    const h = `${textarea.scrollHeight}px`;

    console.log('HEIGHT', h);

    this._autoHeight = h;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-textarea': DcxWebTextarea;
  }
}
