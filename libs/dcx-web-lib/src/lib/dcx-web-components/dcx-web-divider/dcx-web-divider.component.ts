import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dcxWebDividerStyles } from './dcx-web-divider.component.styles';
import type { DividerOrientation, DividerType, DividerSize } from '../../core/interfaces/divider';

@customElement('dcx-web-divider')
export class DcxWebDivider extends LitElement {

  @property({ type: String }) accessor orientation: DividerOrientation = 'horizontal';
  @property({ type: String }) accessor type: DividerType = 'default';
  @property({ type: String }) accessor size: DividerSize = 'auto';
  @property({ type: Number }) accessor thickness = 0.25;
  @property({ type: String }) accessor color = '#d1d5db';
  @property({ type: String }) accessor label = '';

  @property({ type: String, attribute: 'aria-label' }) override accessor ariaLabel: string | null = null;

  static override styles = dcxWebDividerStyles;

  private _getDividerStyle(): string {
    switch (this.type) {
      case 'dot': return 'dotted';
      case 'dash': return 'dashed';
      default: return 'solid';
    }
  }

  private _getDividerSize(): string {
    switch (this.size) {
      case 's': return '5rem';
      case 'm': return '15rem';
      case 'l': return '30rem';
      case 'xl': return '35rem';
      default: return '100%';
    }
  }

  private _getComputedAriaLabel(): string {
    if (this.ariaLabel && this.ariaLabel.trim().length > 0) return this.ariaLabel;
    if (this.label && this.label.trim().length > 0) return this.label;
    return '';
  }

  private _isHidden(): boolean {
    return !this.label && !this.ariaLabel;
  }

  override updated() {
    this.classList.toggle('horizontal', this.orientation === 'horizontal');
    this.classList.toggle('vertical', this.orientation === 'vertical');
    this.classList.toggle('has-label', !!this.label);

    this.style.setProperty('--_dcx-divider-size', this._getDividerSize());
    this.style.setProperty('--_dcx-divider-style', this._getDividerStyle());
    this.style.setProperty('--_dcx-divider-thickness', `${this.thickness}rem`);
    this.style.setProperty('--_dcx-divider-color', this.color);
  }

  override render() {
    const ariaLabel = this._getComputedAriaLabel();
    const isHidden = this._isHidden();

    if (this.label) {
      return html`
        <div
          class="dcx-divider dcx-divider--labeled"
          role="separator"
          aria-orientation="${this.orientation}"
          aria-label="${ariaLabel}"
          aria-hidden="${isHidden ? 'true' : 'false'}"
        >
          <span class="dcx-divider__line" aria-hidden="true"></span>
          <span class="dcx-divider__label">${this.label}</span>
          <span class="dcx-divider__line" aria-hidden="true"></span>
        </div>
      `;
    }

    return html`
      <span
        class="dcx-divider"
        role="separator"
        aria-orientation="${this.orientation}"
        aria-label="${ariaLabel}"
        aria-hidden="${isHidden ? 'true' : 'false'}"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-divider': DcxWebDivider;
  }
}