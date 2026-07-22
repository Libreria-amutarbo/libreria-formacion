import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  DcxLayout,
  DcxAlign,
  DcxSize,
  BorderStyleCard,
  ShadowPresetCard,
} from '../../core/interfaces';
import { styles } from './dcx-web-card.component.styles';
import { template } from './dcx-web-card.component.html';

@customElement('dcx-web-card')
export class DcxWebCard extends LitElement {
  @property({ type: String }) accessor image: string | null = 'https://picsum.photos/360/240';
  @property({ type: String }) accessor imageAlt = '';
  @property({ type: String }) override accessor title = 'Título de la carta';
  @property({ type: String }) accessor subtitle = 'Subtítulo de la carta';

  @property({ type: String }) accessor layout: DcxLayout = 'vertical';
  @property({ type: String }) accessor align: DcxAlign = 'center';
  @property({ type: String }) accessor size: DcxSize = 's';

  @property({ type: String }) accessor maxContentWidth = '560px';
  @property({ type: String }) accessor maxImageWidth = '100%';

  @property({ type: Boolean }) accessor accent = false;
  @property({ type: Boolean }) accessor bordered = false;
  @property({ type: Number }) accessor borderWidth = 1;
  @property({ type: String }) accessor borderStyle: BorderStyleCard = 'solid';

  @property({ type: Number }) accessor shadow: ShadowPresetCard = 1;

  @property({ type: Boolean }) accessor interactive = true;
  @property({ type: Boolean }) accessor disabled = false;

  static override styles = styles;

  get cardClasses(): string {
    const interactiveClass = this.interactive ? 'dcx-card--interactive' : '';
    const disabledClass = this.disabled ? 'dcx-card--disabled' : '';
    return `dcx-card ${interactiveClass} ${disabledClass}`.trim().replace(/\s+/g, ' ');
  }

  get innerClasses(): string {
    const accentClass = this.accent ? 'dcx-card__inner--accent-top' : '';
    return `dcx-card__inner dcx-card__inner--layout-${this.layout} dcx-card__inner--align-${this.align} dcx-card__inner--size-${this.size} ${accentClass}`.trim().replace(/\s+/g, ' ');
  }

  get innerStyles() {
    return {
      '--card-max-content-width': this.maxContentWidth,
      '--card-max-image-width': this.maxImageWidth,
      '--card-border-style': this.bordered ? this.borderStyle : 'solid',
      '--card-border-width': this.bordered ? `${this.borderWidth}px` : '0',
      '--card-shadow': this.shadowCSS,
    };
  }

  get cardRole(): string {
    return this.disabled
      ? 'region'
      : this.interactive
      ? 'button'
      : 'region';
  }

  get cardTabIndex(): number | undefined {
    if (this.disabled) return -1;
    if (this.cardRole === 'button') return 0;
    return undefined;
  }

  get hasHeader(): boolean {
    return this.querySelector('[slot="header"]') !== null;
  }

  get hasContent(): boolean {
    return (
      this.querySelector('[slot="content"]') !== null ||
      Array.from(this.childNodes).some(
        (node) =>
          (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot')) ||
          (node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim().length > 0)
      )
    );
  }

  get hasFooter(): boolean {
    return this.querySelector('[slot="footer"]') !== null;
  }

  get effectiveAriaLabel(): string | null {
    return this.cardRole === 'region' && !this.hasHeader && this.title
      ? this.title
      : null;
  }

  get shadowCSS(): string {
    switch (this.shadow) {
      case 1:
        return 'var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.06))';
      case 2:
        return 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
      case 3:
        return 'var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12))';
      default:
        return 'var(--shadow-0, none)';
    }
  }

  _handleCardClick(evt: MouseEvent | KeyboardEvent) {
    if (this.disabled) return;

    if (evt instanceof KeyboardEvent) {
      const key = evt.key.toLowerCase();
      if (this.interactive && (key === 'enter' || key === ' ')) {
        evt.preventDefault();
        this.dispatchEvent(
          new CustomEvent('dcx-card-click', {
            detail: evt,
            bubbles: true,
            composed: true,
          })
        );
      }
    } else {
      this.dispatchEvent(
        new CustomEvent('dcx-card-click', {
          detail: evt,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-card': DcxWebCard;
  }
}
