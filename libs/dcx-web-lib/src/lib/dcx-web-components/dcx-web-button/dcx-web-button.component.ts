import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type {
  DcxButtonType,
  DcxButtonVariant,
  DcxIconPosition,
} from '../../core/interfaces/button';
import type { DcxSize } from '../../core/interfaces/generic';

export type DcxIconSpacing = 'none' | 'compact' | 'spacious';

@customElement('dcx-web-button')
export class DcxWebButton extends LitElement {
  // Inputs matching Angular version
  @property({ type: String }) accessor label = '';
  @property({ type: String, attribute: 'aria-label' }) accessor ariaLabel = '';
  @property({ type: String }) accessor type: DcxButtonType = 'button';
  @property({ type: Boolean }) accessor disabled = false;
  @property({ type: Boolean }) accessor pressed = false;
  @property({ type: Boolean }) accessor hover = false;
  @property({ type: Boolean }) accessor focused = false;
  @property({ type: String }) accessor variant: DcxButtonVariant = 'primary';
  @property({ type: String }) accessor size: DcxSize = 'm';
  @property({ type: String, attribute: 'class' }) accessor extraClass = '';

  // Checkbox-specific properties
  @property({ type: Boolean, attribute: 'is-checkbox' }) accessor isCheckbox =
    false;
  @property({ type: Boolean, attribute: 'checkbox-error' })
  accessor checkboxError = false;
  @property({ type: String, attribute: 'aria-checked' }) accessor ariaChecked:
    | 'true'
    | 'false'
    | 'mixed'
    | null = null;

  // Icon properties
  @property({ type: Boolean }) accessor icon = false;
  @property({ type: String, attribute: 'icon-name' }) accessor iconName = '';
  @property({ type: String, attribute: 'icon-size' }) accessor iconSize:
    | DcxSize
    | undefined = undefined;
  @property({ type: String, attribute: 'icon-spacing' })
  accessor iconSpacing: DcxIconSpacing = 'none';
  @property({ type: String, attribute: 'icon-color' }) accessor iconColor = '';
  @property({ type: String, attribute: 'icon-position' })
  accessor iconPosition: DcxIconPosition = 'left';
  @property({ type: String, attribute: 'icon-right-name' })
  accessor iconRightName = '';

  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--ff-base, 'Inter', sans-serif);
    }

    .dcx-button {
      margin: 0;
      background: none;
      color: inherit;
      font-family: inherit;
      appearance: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--sp-3, 12px);
      border: 1px solid transparent;
      border-radius: var(--r-sm, 4px);
      font-weight: var(--fw-medium, 500);
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      transition:
        background 0.1s,
        border-color 0.1s,
        box-shadow 0.1s,
        color 0.1s;
      box-sizing: border-box;
    }

    .dcx-button--s, .dcx-button--small { font-size: var(--fs-sm, 12px); padding: 5px 10px; }
    .dcx-button--m, .dcx-button--medium { font-size: 13px; padding: 7px 13px; }
    .dcx-button--l, .dcx-button--large { font-size: var(--fs-base, 14px); padding: 9px var(--sp-4, 16px); }
    .dcx-button--xl, .dcx-button--extra-large { font-size: var(--fs-base, 14px); padding: 11px var(--sp-5, 20px); }
    .dcx-button--checkbox { height: 1.25rem; width: 1.25rem; padding: 0.7rem !important; }

    .dcx-button--primary {
      background-color: var(--bg-primary, #0058ab);
      color: var(--text-white, #ffffff);
      border-color: var(--bg-primary, #0058ab);
    }
    .dcx-button--primary:hover:not(:disabled), .dcx-button--primary.dcx-button--hover {
      background-color: var(--bg-primary-hover, #004080);
      border-color: var(--bg-primary-hover, #004080);
    }
    .dcx-button--primary:active:not(:disabled), .dcx-button--primary.dcx-button--pressed {
      background-color: var(--bg-primary-pressed, #121a38);
      border-color: var(--bg-primary-pressed, #121a38);
    }

    .dcx-button--secondary {
      background-color: var(--bg-default, #ffffff);
      color: var(--text-dark, #2a2e33);
      border-color: var(--border-light, #d1d5db);
    }
    .dcx-button--secondary:hover:not(:disabled), .dcx-button--secondary.dcx-button--hover {
      background-color: var(--bg-hover, #f7f8fa);
      border-color: var(--border-hover, #9ca3af);
    }

    .dcx-button--danger {
      background-color: var(--color-danger, #dc2626);
      color: var(--text-white, #ffffff);
      border-color: var(--color-danger, #dc2626);
    }

    .dcx-button--terciary, .dcx-button--text {
      background-color: transparent;
      color: var(--text-dark, #2a2e33);
      border-color: transparent;
    }

    .dcx-button:disabled {
      background-color: var(--bg-disabled, #f3f4f6);
      color: var(--text-disabled, #696e75);
      border-color: #e5e7eb;
      cursor: not-allowed;
      pointer-events: none;
    }

    .dcx-button:focus-visible, .dcx-button--focused {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    .dcx-button--icon-top, .dcx-button--icon-bottom {
      flex-direction: column;
      gap: 0.125rem;
      padding-block: 0.5rem;
    }

    .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; }
    .icon--left { order: -1; }
    .icon--right { order: 1; margin-left: 0.25rem; }
    .icon--top { margin-bottom: 0.125rem; }
    .icon--bottom { margin-top: 0.125rem; }

    /* ========== ICON SIZES ========== */
    .dcx-button--s i, .dcx-button--small i { font-size: 13px; }
    .dcx-button--m i, .dcx-button--medium i { font-size: 13px; }
    .dcx-button--l i, .dcx-button--large i { font-size: 14px; }
    .dcx-button--xl i, .dcx-button--extra-large i { font-size: 14px; }

    /* ========== ICON SPACING (Custom Logic for the <i> container) ========== */
    .dcx-icon--spacing-compact { padding: 2px; }
    .dcx-icon--spacing-spacious { padding: 8px; }

    /* ========== ICON ONLY ========== */
    .dcx-button--icon-only { padding: 0; width: 2.5rem; height: 2.5rem; }
    .dcx-button--icon-only .label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    /* ========== CHECKBOX MODE ========== */
    .dcx-button--checkbox.dcx-button--checkbox-error--primary {
      border-color: var(--border-error, #dc2626);
      background-color: var(--background-error, #fef2f2);
    }
    .dcx-button--checkbox.dcx-button--checkbox-error--secondary {
      border-color: var(--border-error, #dc2626);
    }
  `;

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Matching Angular output name
    this.dispatchEvent(
      new CustomEvent('buttonClick', {
        detail: { clicked: true },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const isIconOnly = this.variant === 'icon-only';
    const hasAnyIcon = this.icon || !!this.iconName;

    // Logic matching Angular version exactly (but without "ng" in class names)
    const classes = {
      'dcx-button': true,
      [`dcx-button--${this.variant}`]: true,
      [`dcx-button--${this.isCheckbox ? 'checkbox' : this.size}`]: true,
      'dcx-button--icon-only': isIconOnly && !this.label && hasAnyIcon,
      [`dcx-button--icon-${this.iconPosition}`]: !!this.iconPosition,
      'dcx-button--pressed': this.pressed,
      'dcx-button--hover': this.hover,
      'dcx-button--focused': this.focused,
      'dcx-button--checkbox': this.isCheckbox,
      [`dcx-button--checkbox-error--${this.variant}`]:
        this.isCheckbox && this.checkboxError,
      [this.extraClass]: !!this.extraClass,
    };

    const resolvedIconSize = this.iconSize ?? this.size;
    const computedAriaLabel = this.label
      ? undefined
      : this.ariaLabel || 'Button';

    const renderIcon = (name: string, positionClass: string) => html`
      <span class="icon ${positionClass} dcx-icon dcx-icon--size-${resolvedIconSize} dcx-icon--spacing-${this.iconSpacing}">
        <i class="bi bi-${name}" 
           style="${this.iconColor ? `color: ${this.iconColor}` : ''}"
           aria-hidden="true"></i>
      </span>
    `;

    return html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled}"
        class="${classMap(classes)}"
        aria-label="${ifDefined(computedAriaLabel)}"
        aria-pressed="${this.pressed || nothing}"
        role="${this.isCheckbox ? 'checkbox' : nothing}"
        aria-checked="${this.isCheckbox && this.ariaChecked !== null ? this.ariaChecked : nothing}"
        @click="${this._handleClick}"
      >
        ${
          this.icon &&
          (this.iconPosition === 'left' || this.iconPosition === 'top')
            ? renderIcon(this.iconName, `icon--${this.iconPosition}`)
            : nothing
        }

        ${this.label ? html`<span class="label">${this.label}</span>` : nothing}

        ${
          this.iconRightName
            ? renderIcon(this.iconRightName, 'icon--right')
            : nothing
        }

        ${
          this.icon &&
          ((this.iconPosition === 'right' && !this.iconRightName) ||
            this.iconPosition === 'bottom')
            ? renderIcon(this.iconName, `icon--${this.iconPosition}`)
            : nothing
        }
        
        <slot name="dcx-icon"></slot>
        <slot name="button-trailing"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-button': DcxWebButton;
  }
}
