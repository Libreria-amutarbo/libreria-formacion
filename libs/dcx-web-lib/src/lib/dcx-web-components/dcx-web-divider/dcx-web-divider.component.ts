import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DividerOrientation, DividerType, DividerSize } from '../../core/interfaces/divider';

@customElement('dcx-web-divider')
export class DcxWebDivider extends LitElement {

  @property({ type: String }) accessor orientation: DividerOrientation = 'horizontal';
  @property({ type: String }) accessor type: DividerType = 'default';
  @property({ type: String }) accessor size: DividerSize = 'auto';
  @property({ type: Number }) accessor thickness = 0.25;
  @property({ type: String }) accessor color = '#d1d5db';
  @property({ type: String }) accessor label = '';

  @property({ type: String, attribute: 'aria-label' }) accessor ariaLabelAttr: string | null = null;

  static override styles = css`
    :host {
      display: block;
    }

    :host(.horizontal) {
      width: var(--dcx-divider-size, 100%);
      height: auto;
    }

    :host(.vertical) {
      height: var(--dcx-divider-size, 100%);
      width: auto;
    }

    .dcx-divider {
      margin: 0;
      display: block;
    }
    
    :host(.horizontal) .dcx-divider:not(.dcx-divider--labeled) {
      width: 100%;
      height: 0;
      border-top: var(--dcx-divider-thickness, 1px)
        var(--dcx-divider-style, solid)
        var(--dcx-divider-color, #d1d5db);
    }

    :host(.vertical) .dcx-divider:not(.dcx-divider--labeled) {
      height: 100%;
      width: 0;
      border-left: var(--dcx-divider-thickness, 1px)
        var(--dcx-divider-style, solid)
        var(--dcx-divider-color, #d1d5db);
    }

    :host(.horizontal) .dcx-divider--labeled {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      gap: 0.5rem;
      border: none;
    }

    :host(.vertical) .dcx-divider--labeled {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      gap: 0.5rem;
      border: none;
    }

    :host(.horizontal) .dcx-divider__line {
      flex: 1;
      height: 0;
      border-top: var(--dcx-divider-thickness)
        var(--dcx-divider-style)
        var(--dcx-divider-color);
    }

    :host(.vertical) .dcx-divider__line {
      flex: 1;
      width: 0;
      border-left: var(--dcx-divider-thickness)
        var(--dcx-divider-style)
        var(--dcx-divider-color);
    }

    .dcx-divider__label {
      color: var(--dcx-divider-color);
      font-family: var(--ff-base, 'Inter', sans-serif);
      font-size: 0.875rem;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
    }

    :host(.vertical) .dcx-divider__label {
      writing-mode: sideways-lr;
      text-orientation: mixed;
    }
  `;

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
      case 'm': return '10rem';
      case 'l': return '20rem';
      case 'xl': return '30rem';
      default: return '100%';
    }
  }

  private _getComputedAriaLabel(): string {
    // PRIORIDAD: ariaLabelAttr > label > ''
    if (this.ariaLabelAttr && this.ariaLabelAttr.trim().length > 0) {
      return this.ariaLabelAttr;
    }

    if (this.label && this.label.trim().length > 0) {
      return this.label;
    }

    return '';
  }

  private _isHidden(): boolean {
    return !this.label && !this.ariaLabelAttr;
  }

  override updated() {
    /* host classes */
    this.classList.toggle('horizontal', this.orientation === 'horizontal');
    this.classList.toggle('vertical', this.orientation === 'vertical');
    this.classList.toggle('has-label', !!this.label);

    /* css vars */
    this.style.setProperty('--dcx-divider-size', this._getDividerSize());
    this.style.setProperty('--dcx-divider-style', this._getDividerStyle());
    this.style.setProperty('--dcx-divider-thickness', `${this.thickness}rem`);
    this.style.setProperty('--dcx-divider-color', this.color);
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