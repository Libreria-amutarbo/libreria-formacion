import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DcxSize } from '../../core/interfaces/generic';
import type { DcxIconSpacing } from '../../core/interfaces/icon';
import { template } from './dcx-web-icon.component.html';

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

  get decorative(): boolean {
    return !this.ariaLabel || this.ariaLabel.trim() === '';
  }

  get iconClass(): string {
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
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-icon': DcxWebIcon;
  }
}
