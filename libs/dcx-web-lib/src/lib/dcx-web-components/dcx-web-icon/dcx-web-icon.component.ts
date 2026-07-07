import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DcxSize } from '../../core/interfaces/generic';
import type { DcxIconSpacing } from '../../core/interfaces/icon';
import { styles } from './dcx-web-icon.component.styles';

@customElement('dcx-web-icon')
export class DcxWebIcon extends LitElement {
  @property({ type: String }) accessor name = '';
  @property({ type: String }) accessor size: DcxSize = 'm';
  @property({ type: String }) accessor spacing: DcxIconSpacing = 'none';
  @property({ type: String }) accessor color = '';
  @property({ type: String, attribute: 'extra-class' }) accessor extraClass = '';
  @property({ type: String, attribute: 'aria-label' }) override accessor ariaLabel = '';

  override createRenderRoot() {
    return this;
  }

  private get _decorative(): boolean {
    return !this.ariaLabel || this.ariaLabel.trim() === '';
  }

  private get _iconClass(): string {
    const classes: string[] = [
      'bi',
      `bi-${this.name}`,
      'dcx-icon',
      `dcx-icon--size-${this.size}`,
    ];

    if (this.spacing !== 'none') {
      classes.push(`dcx-icon--spacing-${this.spacing}`);
    }

    const extra = this.extraClass.trim();
    if (extra) {
      classes.push(...extra.split(/\s+/));
    }

    return classes.join(' ');
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('color')) {
      if (this.color) {
        this.style.color = this.color;
      } else {
        this.style.removeProperty('color');
      }
    }
  }

  override render() {
    return html`
      <style>
        ${styles}
      </style>
      <i
        class="${this._iconClass}"
        aria-hidden="${this._decorative ? 'true' : nothing}"
        role="${this._decorative ? nothing : 'img'}"
        aria-label="${this._decorative ? nothing : this.ariaLabel}"
      ></i>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-icon': DcxWebIcon;
  }
}
