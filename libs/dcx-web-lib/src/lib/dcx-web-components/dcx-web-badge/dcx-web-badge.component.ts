import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BadgeSeverityType, BadgeSizeType } from '../../core/interfaces/badge';

@customElement('dcx-web-badge')
export class DcxWebBadge extends LitElement {
  @property({ type: String }) accessor value = '';
  @property({ type: String }) accessor severity: BadgeSeverityType = 'primary';
  @property({ type: String }) accessor size: BadgeSizeType = 'md';

  @property({ type: String, attribute: 'aria-label' }) override accessor ariaLabel: string | null = null;
  @property({ type: Boolean, attribute: 'aria-hidden' }) accessor ariaHiddenAttr = false;
  @property({ type: String }) accessor roleAttr: 'status' | 'alert' | null = null;

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .dcx-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      font-family: var(--ff-base, 'Inter', sans-serif);
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
      min-width: 1.5rem;
      padding: 0 8px;
      height: 1.5rem;
      font-size: 11px;
      box-sizing: border-box;
    }

    .dcx-badge--sm {
      min-width: 1rem;
      height: 1rem;
      padding: 0 4px;
      font-size: 10px;
    }

    .dcx-badge--lg {
      min-width: 2rem;
      height: 2rem;
      padding: 0 8px;
      font-size: 13px;
    }

    .dcx-badge--xl {
      min-width: 2.5rem;
      height: 2.5rem;
      padding: 0 12px;
      font-size: 15px;
    }

    .dcx-badge--primary {
      background-color: #0058ab;
      color: #ffffff;
    }

    .dcx-badge--secondary {
      background-color: #696e75;
      color: #ffffff;
    }

    .dcx-badge--success {
      background-color: #16a34a;
      color: #ffffff;
    }

    .dcx-badge--info {
      background-color: #0284c7;
      color: #ffffff;
    }

    .dcx-badge--warn {
      background-color: #b45309;
      color: #ffffff;
    }

    .dcx-badge--danger {
      background-color: #dc2626;
      color: #ffffff;
    }
  `;

  private _getComputedAriaLabel(): string | null {
    if (this.ariaHiddenAttr) return null;
    if (this.ariaLabel !== null) return this.ariaLabel;
    const v = this.value;
    return v ? `${v}, ${this.severity}` : this.severity;
  }

  override render() {
    const classes = `dcx-badge dcx-badge--${this.severity} dcx-badge--${this.size}`;
    
    return html`
      <span
        class="${classes}"
        role="${this.roleAttr || ''}"
        aria-label="${this._getComputedAriaLabel() || ''}"
        aria-hidden="${this.ariaHiddenAttr ? 'true' : 'false'}"
      >${this.value}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-badge': DcxWebBadge;
  }
}
