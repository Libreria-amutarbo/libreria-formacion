import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type {
  DcxLayout,
  DcxAlign,
  DcxSize,
  BorderStyleCard,
  ShadowPresetCard,
} from '../../core/interfaces';
import { cardStyles } from './dcx-web-card.component.styles';

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

  static override styles = cardStyles;

  private _handleCardClick(evt: MouseEvent | KeyboardEvent) {
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

  private _shadowToCSS(preset: ShadowPresetCard): string {
    switch (preset) {
      case 1:
        return 'var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.6))';
      case 2:
        return 'var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08))';
      case 3:
        return 'var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12))';
      default:
        return 'var(--shadow-0, none)';
    }
  }

  override render() {
    const cardClasses = {
      'dcx-card': true,
      'dcx-card--interactive': this.interactive,
      'dcx-card--disabled': this.disabled,
    };

    const innerClasses = {
      'dcx-card__inner': true,
      [`dcx-card__inner--layout-${this.layout}`]: true,
      [`dcx-card__inner--align-${this.align}`]: true,
      [`dcx-card__inner--size-${this.size}`]: true,
      'dcx-card__inner--accent-top': this.accent,
    };

    const innerStyles = {
      '--card-max-content-width': this.maxContentWidth,
      '--card-max-image-width': this.maxImageWidth,
      '--card-border-style': this.bordered ? this.borderStyle : 'solid',
      '--card-border-width': this.bordered ? `${this.borderWidth}px` : '0',
      '--card-shadow': this._shadowToCSS(this.shadow),
    };

    const role = this.disabled
      ? 'region'
      : this.interactive
      ? 'button'
      : 'region';
    
    const tabIndex = this.disabled ? -1 : role === 'button' ? 0 : null;
    
    const hasHeader = this.querySelector('[slot="header"]') !== null;
    
    const hasContent = 
      this.querySelector('[slot="content"]') !== null || 
      Array.from(this.childNodes).some(
        (node) =>
          (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot')) ||
          (node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim().length > 0)
      );

    const hasFooter = this.querySelector('[slot="footer"]') !== null;

    const ariaLabel =
      role === 'region' && !hasHeader && this.title
        ? this.title
        : null;

    return html`
      <div
        class="${classMap(cardClasses)}"
        tabindex="${tabIndex ?? nothing}"
        role="${role}"
        aria-disabled="${this.disabled}"
        aria-label="${ariaLabel ?? nothing}"
        @click="${this._handleCardClick}"
        @keydown="${this._handleCardClick}"
      >
        <div class="${classMap(innerClasses)}" style="${styleMap(innerStyles)}">
          ${this.image
            ? html`
                <div class="dcx-card__image-container">
                  <img
                    src="${this.image}"
                    alt="${this.imageAlt}"
                    class="dcx-card__image"
                  />
                </div>
              `
            : nothing}

          <div class="dcx-card__body">
            
            ${hasHeader
              ? html`
                  <div class="dcx-card__header">
                    <slot name="header"></slot>
                  </div>
                `
              : (this.title || this.subtitle)
              ? html`
                  <div class="dcx-card__header">
                    ${this.title ? html`<h3 class="dcx-card__title">${this.title}</h3>` : nothing}
                    ${this.subtitle ? html`<p class="dcx-card__subtitle">${this.subtitle}</p>` : nothing}
                  </div>
                `
              : nothing}
            
            ${hasContent
              ? html`
                  <div class="dcx-card__content">
                    <slot name="content"></slot>
                    <slot></slot>
                  </div>
                `
              : nothing}

            ${hasFooter
              ? html`
                  <div class="dcx-card__footer">
                    <slot name="footer"></slot>
                  </div>
                `
              : nothing}

          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-card': DcxWebCard;
  }
}
