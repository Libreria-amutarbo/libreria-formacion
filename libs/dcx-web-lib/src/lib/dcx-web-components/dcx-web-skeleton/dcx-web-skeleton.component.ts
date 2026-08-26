import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './dcx-web-skeleton.component.styles';
import { template } from './dcx-web-skeleton.component.html';

import type {
  DcxSkeletonAnimation,
  DcxSkeletonShape,
} from '../../core/interfaces/skeleton';

@customElement('dcx-web-skeleton')
export class DcxWebSkeleton extends LitElement {
  @property({ type: String })
  accessor shape: DcxSkeletonShape = 'rectangle';

  @property({ type: String })
  accessor width = '100%';

  @property({ type: String })
  accessor height = '1rem';

  @property({ type: String })
  accessor size: string | null = null;

  @property({ type: String })
  accessor borderRadius: string | null = null;

  @property({ type: String })
  accessor animation: DcxSkeletonAnimation = 'wave';

  static override styles = styles;

  get computedWidth(): string {
    return this.size || this.width;
  }

  get computedHeight(): string {
    return this.size || this.height;
  }

  get computedBorderRadius(): string {
    if (this.shape === 'circle') {
      return 'var(--r-pill, 999px)';
    }

    return this.borderRadius || 'var(--r-md, 6px)';
  }

  private updateHostClassesAndStyles() {
    this.classList.add('dcx-skeleton');

    this.classList.toggle('dcx-skeleton--circle', this.shape === 'circle');

    this.classList.toggle('dcx-skeleton--wave', this.animation === 'wave');

    this.classList.toggle('dcx-skeleton--none', this.animation === 'none');

    this.style.setProperty('--dcx-skeleton-width', this.computedWidth);

    this.style.setProperty('--dcx-skeleton-height', this.computedHeight);

    this.style.setProperty(
      '--dcx-skeleton-border-radius',
      this.computedBorderRadius,
    );
  }

  override connectedCallback() {
    super.connectedCallback();

    this.setAttribute('aria-hidden', 'true');
  }

  override firstUpdated() {
    this.updateHostClassesAndStyles();
  }

  override updated() {
    this.updateHostClassesAndStyles();
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-skeleton': DcxWebSkeleton;
  }
}
