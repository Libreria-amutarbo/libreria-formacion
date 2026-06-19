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

@customElement('dcx-web-card')
export class DcxWebCard extends LitElement {
  @property({ type: String }) accessor image: string | null = 'https://picsum.photos/360/240';
  @property({ type: String }) accessor imageAlt = '';
  @property({ type: String }) override accessor title = 'Título de la carta';
  @property({ type: String }) accessor subtitle = 'Subtítulo de la carta';

  @property({ type: String }) accessor layout: DcxLayout = 'vertical';
  @property({ type: String }) accessor align: DcxAlign = 'start';
  @property({ type: String }) accessor size: DcxSize = 'm';

  @property({ type: String }) accessor maxContentWidth = '560px';
  @property({ type: String }) accessor maxImageWidth = '100%';

  @property({ type: Boolean }) accessor accent = false;
  @property({ type: Boolean }) accessor bordered = false;
  @property({ type: Number }) accessor borderWidth = 1;
  @property({ type: String }) accessor borderStyle: BorderStyleCard = 'solid';

  @property({ type: Number }) accessor shadow: ShadowPresetCard = 1;

  @property({ type: Boolean }) accessor interactive = true;
  @property({ type: Boolean }) accessor disabled = false;

  static override styles = css`
    :host {
      display: block;
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    .dcx-card {
      display: block;
      background: transparent;
      border: none;
      padding: 0;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
      outline: none;
    }

    .dcx-card--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .dcx-card--interactive {
      cursor: pointer;
    }

    .dcx-card--interactive:not(.dcx-card--disabled):hover {
      transform: translateY(-2px);
    }

    .dcx-card:focus-visible {
      outline: 2px solid var(--border-focus, #1db8f2);
      outline-offset: 3px;
      border-radius: var(--r-sm, 4px);
    }

    .dcx-card__inner {
      display: flex;
      flex-direction: column;
      gap: var(--sp-4, 16px);
      background: var(--background-default, #ffffff);
      border-style: var(--card-border-style);
      border-color: var(--border-primary);
      border-width: var(--card-border-width);
      border-radius: var(--card-radius);
      padding: var(--card-padding);
      position: relative;
      box-shadow: var(--card-shadow);
      width: 100%;
      max-width: var(--card-max-content-width, 420px);
      box-sizing: border-box;
    }

    .dcx-card__inner--layout-vertical {
      flex-direction: column;
    }

    .dcx-card__inner--layout-horizontal {
      flex-direction: row;
      align-items: stretch;
      gap: var(--sp-4, 16px);
    }

    .dcx-card__inner--size-s {
      --card-padding: 0.9rem;
      --card-gap: 0.55rem;
      --card-title-font-size: 1rem;
      --card-subtitle-font-size: 0.85rem;
      --card-radius: 12px;
      --card-max-image-width: 92%;
    }

    .dcx-card__inner--size-m {
      --card-padding: 1rem;
      --card-gap: 0.75rem;
      --card-title-font-size: 1.15rem;
      --card-subtitle-font-size: 0.95rem;
      --card-radius: 8px;
      --card-max-image-width: 100%;
    }

    .dcx-card__inner--size-l {
      --card-padding: 1.7rem;
      --card-gap: 1rem;
      --card-title-font-size: 1.4rem;
      --card-subtitle-font-size: 1.05rem;
      --card-radius: 10px;
      --card-max-image-width: 100%;
    }

    .dcx-card__inner--size-xl {
      --card-padding: 2.25rem;
      --card-gap: 1.25rem;
      --card-title-font-size: 1.6rem;
      --card-subtitle-font-size: 1.1rem;
      --card-radius: var(--r-lg, 12px);
      --card-max-image-width: 100%;
    }

    .dcx-card__inner--layout-horizontal.dcx-card__inner--align-start {
      justify-content: flex-start;
    }

    .dcx-card__inner--layout-horizontal.dcx-card__inner--align-center {
      justify-content: center;
    }

    .dcx-card__inner--layout-horizontal.dcx-card__inner--align-end {
      justify-content: flex-end;
    }

    .dcx-card__image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }

    .dcx-card__image {
      display: block;
      width: 100%;
      max-width: var(--card-max-image-width, 180px);
      border-radius: 6px;
      object-fit: cover;
    }

    .dcx-card__inner--layout-horizontal .dcx-card__image-container {
      flex: 0 0 auto;
      max-width: var(--card-max-image-width, 180px);
      margin-right: var(--sp-4, 16px);
    }

    .dcx-card__inner--layout-horizontal .dcx-card__body {
      flex: 1 1 0%;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .dcx-card__inner--accent-top::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(
        90deg,
        var(--bg-primary, #0058ab),
        var(--color-success, #16a34a)
      );
      border-top-left-radius: var(--card-radius);
      border-top-right-radius: var(--card-radius);
      z-index: 2;
    }

    .dcx-card__body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 0;
    }

    .dcx-card__header {
      margin-bottom: var(--spacing-inline-m, 1rem);
    }

    .dcx-card__content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 100%;
      min-width: 0;
    }

    .dcx-card__footer {
      margin-top: var(--spacing-inline-m, 1rem);
      display: flex;
      align-items: center;
      width: 100%;
      gap: var(--spacing-inline-s, 0.5rem);
      justify-content: flex-start;
    }

    .dcx-card__title {
      margin: 0 0 0.5rem 0;
      font-size: var(--card-title-font-size, var(--fs-lg, 18px));
      font-weight: var(--fw-semibold, 600);
    }

    .dcx-card__subtitle {
      margin: 0;
      font-size: var(--card-subtitle-font-size, var(--fs-base, 14px));
      color: var(--text-muted, #696e75);
      font-weight: var(--fw-regular, 400);
    }

    .dcx-card__inner--align-start .dcx-card__body > * {
      align-self: flex-start;
      text-align: left;
    }

    .dcx-card__inner--align-center .dcx-card__body > * {
      align-self: center;
      text-align: center;
    }

    .dcx-card__inner--align-end .dcx-card__body > * {
      align-self: flex-end;
      text-align: right;
    }

    .dcx-card__inner--align-start .dcx-card__footer {
      justify-content: flex-start;
    }

    .dcx-card__inner--align-center .dcx-card__footer {
      justify-content: center;
    }

    .dcx-card__inner--align-end .dcx-card__footer {
      justify-content: flex-end;
    }

    .dcx-card__inner--align-start .dcx-card__image-container {
      justify-content: flex-start;
    }

    .dcx-card__inner--align-center .dcx-card__image-container {
      justify-content: center;
    }

    .dcx-card__inner--align-end .dcx-card__image-container {
      justify-content: flex-end;
    }
  `;

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
        return 'var(--shadow-1, 0 2px 4px rgba(0,0,0,0.1))';
      case 2:
        return 'var(--shadow-2, 0 4px 8px rgba(0,0,0,0.12))';
      case 3:
        return 'var(--shadow-3, 0 8px 16px rgba(0,0,0,0.14))';
      default:
        return 'var(--shadow-0, none)';
    }
  }

  override render() {
    
    const hasHeaderSlot = this.querySelector('[slot="header"]') !== null;
    const hasContentSlot = this.querySelector('[slot="content"]') !== null;
    const hasFooterSlot = this.querySelector('[slot="footer"]') !== null;

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
    
    const ariaLabel =
      role === 'region' && !hasHeaderSlot && this.title
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
            ${hasHeaderSlot || this.title || this.subtitle
              ? html `
                <div class="dcx-card__header">
                  ${hasHeaderSlot
                    ? html`<slot name="header"></slot>`
                    : html`
                        ${this.title
                          ? html`
                              <h3 class="dcx-card__title">
                                ${this.title}
                              </h3>
                            `
                          : nothing}

                        ${this.subtitle
                          ? html`
                              <p class="dcx-card__subtitle">
                                ${this.subtitle}
                              </p>
                            `
                          : nothing}
                      `}
                </div>
              `
            : nothing}
            
            ${hasContentSlot
              ? html`
                  <div class="dcx-card__content">
                    ${hasContentSlot
                      ? html`<slot name="content"></slot>`
                      : html`<slot></slot>`}
                  </div>
                `
              : nothing}

            ${hasFooterSlot
            ? html `
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
