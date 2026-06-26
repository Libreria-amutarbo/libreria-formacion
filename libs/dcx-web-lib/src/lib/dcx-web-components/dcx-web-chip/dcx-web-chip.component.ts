import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DcxChipColorType, DcxChipVariantType } from '../../core/interfaces/chip';

@customElement('dcx-web-chip')
export class DcxWebChip extends LitElement {
  @property({ type: String, reflect: true }) accessor label = '';
  @property({ type: String, reflect: true }) accessor color: DcxChipColorType = 'primary';
  @property({ type: Boolean, reflect: true }) accessor removable = false;
  @property({ type: String, reflect: true }) accessor icon = '';
  @property({ type: String, reflect: true }) accessor image = '';
  @property({ type: String, reflect: true }) accessor variant: DcxChipVariantType = 'choice';

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .dcx-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      height: 2rem;
      padding: 0.5rem 0.75rem;
      border-radius: 1rem;
      border: 1px solid transparent;
      font-family: var(--font-family-primary, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.2;
      cursor: default;
      box-sizing: border-box;
      transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    .dcx-chip--primary {
      background-color: var(--background-primary, #0058ab);
      color: var(--content-default-white, #ffffff);
    }

    .dcx-chip--secondary {
      background-color: var(--background-default, #ffffff);
      color: var(--content-default-dark, #212121);
      border-color: var(--border-default, #2a2e33);
    }

    .dcx-chip--success {
      background-color: var(--status-success, #00a76f);
      color: var(--content-default-white, #ffffff);
    }

    .dcx-chip--warning {
      background-color: var(--status-warning, #f59e0b);
      color: var(--content-default-dark, #212121);
    }

    .dcx-chip--error {
      background-color: var(--status-error, #ef4444);
      color: var(--content-default-white, #ffffff);
    }

    .dcx-chip--info {
      background-color: var(--status-info, #12abdb);
      color: var(--content-default-white, #ffffff);
    }

    .dcx-chip--gray,
    .dcx-chip--grey {
      background-color: var(--background-secondary, #c8cdcd);
      color: var(--content-default-dark, #212121);
    }

    .dcx-chip__image {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .dcx-chip__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    .dcx-chip__icon svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    .dcx-chip__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dcx-chip__remove-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }

    .dcx-chip__remove-button:hover {
      opacity: 0.85;
    }

    .dcx-chip__remove-button:focus-visible {
      outline: 2px solid var(--border-focus, #2563eb);
      outline-offset: 2px;
    }

    .dcx-chip__remove-button svg {
      width: 1.5rem;
      height: 1.5rem;
      display: inline-block;
      vertical-align: middle;
      fill: currentColor;
    }

    .dcx-chip:hover .dcx-chip__label {
      text-decoration: underline;
    }
  `;

  private get _chipType(): 'with-image' | 'with-icon' | 'label-only' {
    if (this.image.trim()) return 'with-image';
    if (this.icon.trim()) return 'with-icon';
    return 'label-only';
  }

  private get _showRemove(): boolean {
    return this.variant === 'filter' || this.removable;
  }

  private _renderIcon() {
    switch (this.icon) {
      case 'house':
        return html`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>`;
      case 'person':
        return html`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg>
        `;
      case 'gear':
        return html`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
        </svg>
        `;
      case 'star':
        return html`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
        `;
      default:
        return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm.93 4.412-2.29 5.778a.5.5 0 0 0 .642.645l.4-.158.329 1.396a.5.5 0 0 0 .97-.232l-.345-1.463.5-.2a.5.5 0 0 0-.31-.95H7.384l1.544-3.9a.5.5 0 0 0-.998-.168Z"/></svg>`;
    }
  }

  private _handleRemove(event: Event): void {
    event.stopPropagation();

    if (!this._showRemove) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('dcx-chip-remove', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const chipClasses = `dcx-chip dcx-chip--${this.color}`;
    const removeAriaLabel = this.label ? `Remover ${this.label}` : 'Remover chip';

    return html`
      <span
        class=${chipClasses}
        data-chip-type=${this._chipType}
        data-variant=${this.variant}
      >
        ${this._chipType === 'with-image'
          ? html`<img
              class="dcx-chip__image"
              src=${this.image}
              alt=${this.label || 'Chip image'}
              loading="lazy"
            />`
          : nothing}

        ${this._chipType === 'with-icon'
          ? html`<span class="dcx-chip__icon" aria-hidden="true">${this._renderIcon()}</span>`
          : nothing}

        ${this.label ? html`<span class="dcx-chip__label">${this.label}</span>` : nothing}

        ${this._showRemove
          ? html`<button
              type="button"
              class="dcx-chip__remove-button"
              @click=${this._handleRemove}
              aria-label=${removeAriaLabel}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            </button>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-chip': DcxWebChip;
  }
}
