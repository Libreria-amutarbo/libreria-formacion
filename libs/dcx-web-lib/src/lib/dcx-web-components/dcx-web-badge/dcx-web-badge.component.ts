import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BadgeSeverityType, BadgeSizeType } from '../../core/interfaces/badge';
import { styles } from './dcx-web-badge.component.styles';
import { template } from './dcx-web-badge.component.html';

@customElement('dcx-web-badge')
export class DcxWebBadge extends LitElement {
  @property({ type: String }) accessor value = '';
  @property({ type: String }) accessor severity: BadgeSeverityType = 'primary';
  @property({ type: String }) accessor size: BadgeSizeType = 'md';

  @property({ type: String, attribute: 'aria-label' }) override accessor ariaLabel: string | null = null;
  @property({ type: Boolean, attribute: 'aria-hidden' }) accessor ariaHiddenAttr = false;
  @property({ type: String }) accessor roleAttr: 'status' | 'alert' | null = null;

  static override styles = styles;

  getComputedAriaLabel(): string | null {
    if (this.ariaHiddenAttr) return null;
    if (this.ariaLabel !== null) return this.ariaLabel;
    const v = this.value;
    return v ? `${v}, ${this.severity}` : this.severity;
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-badge': DcxWebBadge;
  }
}
