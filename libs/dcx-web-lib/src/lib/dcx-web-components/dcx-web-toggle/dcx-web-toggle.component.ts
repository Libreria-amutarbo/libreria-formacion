import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './dcx-web-toggle.component.styles';
import { template } from './dcx-web-toggle.component.html';

import type {
  DcxSize,
  DcxPosition,
} from '../../core/interfaces';

@customElement('dcx-web-toggle')
export class DcxWebToggle extends LitElement {
  @property({ type: Boolean })
  accessor checked = false;

  @property({ type: Boolean })
  accessor disabled = false;

  @property({ type: String })
  accessor label: string | null = null;

  @property({ type: String })
  accessor size: DcxSize = 'm';

  @property({
    type: String,
    attribute: 'aria-label',
  })
  override accessor ariaLabel: string | null = null;

  @property({ type: String })
  accessor textPosition: DcxPosition = 'right';

  static override styles = styles;

  get effectiveAriaLabel(): string {
    return this.ariaLabel || this.label || 'Toggle';
  }

  public emit(
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

  public toggle() {
    if (this.disabled) {
      return;
    }

    const next = !this.checked;

    this.checked = next;

    this.emit('toggled', next);
  }

  public getToggleClasses() {
    const classes = [
      'dcx-toggle',
      this.size
        ? `dcx-toggle--${this.size}`
        : '',
      `dcx-toggle--${this.textPosition}`,
    ];

    if (this.disabled) {
      classes.push(
        'dcx-toggle--disabled',
      );
    }

    return classes
      .filter(Boolean)
      .join(' ');
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-toggle': DcxWebToggle;
  }
}