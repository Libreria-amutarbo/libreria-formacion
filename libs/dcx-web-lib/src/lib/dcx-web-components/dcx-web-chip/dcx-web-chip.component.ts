import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ThemeColorsType, ChipVariantType } from '../../core/interfaces/chip';

@customElement('dcx-web-chip')
export class DcxWebChip extends LitElement {
  @property({ type: String, reflect: true }) accessor label = '';
  @property({ type: String, reflect: true }) accessor color: ThemeColorsType = 'primary';
  @property({ type: Boolean, reflect: true }) accessor removable = false;
  @property({ type: String, reflect: true }) accessor icon = '';
  @property({ type: String, reflect: true }) accessor image = '';
  @property({ type: String, reflect: true }) accessor variant: ChipVariantType = 'choice';

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .dcx-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      height: 2rem;
      padding: var(--sp-2, 8px) var(--sp-3, 12px);
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
      case 'code-slash':
        return html`
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
      </svg>
        `;
      case 'terminal':
        return html`
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16">
        <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
        <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
      </svg>
        `;
      case 'palette':
        return html`
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
        <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
        <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7"/>
      </svg>
        `;
      case 'book':
        return html`
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
      </svg>
        `;
        case 'bug':
        return html`
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
        <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
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
              @click=${(e: Event) => this._handleRemove(e)}
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
