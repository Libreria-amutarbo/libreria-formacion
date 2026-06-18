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
import type { DcxIconSpacing } from '../../core/interfaces/icon';

@customElement('dcx-web-button')
export class DcxWebButton extends LitElement {
  @property({ type: String }) accessor label = '';
  @property({ type: String, attribute: 'aria-label' })
  override accessor ariaLabel = '';
  @property({ type: String }) accessor type: DcxButtonType = 'button';
  @property({ type: Boolean }) accessor disabled = false;
  @property({ type: Boolean }) accessor pressed = false;
  @property({ type: Boolean }) accessor hover = false;
  @property({ type: Boolean }) accessor focused = false;
  @property({ type: String }) accessor variant: DcxButtonVariant = 'primary';
  @property({ type: String }) accessor size: DcxSize = 'm';
  @property({ type: String, attribute: 'class' }) accessor extraClass = '';

  @property({ type: Boolean, attribute: 'is-checkbox' }) accessor isCheckbox =
    false;
  @property({ type: Boolean, attribute: 'checkbox-error' })
  accessor checkboxError = false;
  @property({ type: String, attribute: 'aria-checked' })
  override accessor ariaChecked: 'true' | 'false' | 'mixed' | null = null;

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
      gap: var(--sp-2, 8px);
      border: 1px solid transparent;
      border-radius: var(--r-sm, 4px);
      font-weight: var(--fw-medium, 500);
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      transition: background 0.1s, border-color 0.1s, box-shadow 0.1s, color 0.1s;
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
    .dcx-button--primary:hover:not(:disabled),
    .dcx-button--primary.dcx-button--hover:not(:disabled) {
      background-color: var(--bg-primary-hover, #004080);
      border-color: var(--bg-primary-hover, #004080);
    }
    .dcx-button--primary:active:not(:disabled),
    .dcx-button--primary.dcx-button--pressed:not(:disabled) {
      background-color: var(--bg-primary-pressed, #121a38);
      border-color: var(--bg-primary-pressed, #121a38);
    }
    .dcx-button--primary:focus-visible,
    .dcx-button--primary.dcx-button--focused {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    .dcx-button--secondary {
      background-color: var(--bg-default, #ffffff);
      color: var(--text-dark, #2a2e33);
      border-color: var(--border-light, #d1d5db);
    }
    .dcx-button--secondary:hover:not(:disabled),
    .dcx-button--secondary.dcx-button--hover:not(:disabled) {
      background-color: var(--bg-hover, #f7f8fa);
      border-color: var(--border-hover, #9ca3af);
    }
    .dcx-button--secondary:active:not(:disabled),
    .dcx-button--secondary.dcx-button--pressed:not(:disabled) {
      background-color: var(--bg-pressed, #e1e3e6);
      border-color: var(--border-hover, #9ca3af);
    }
    .dcx-button--secondary:focus-visible,
    .dcx-button--secondary.dcx-button--focused {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    .dcx-button--terciary {
      background-color: transparent;
      color: var(--text-dark, #2a2e33);
      border-color: transparent;
    }
    .dcx-button--terciary:hover:not(:disabled),
    .dcx-button--terciary.dcx-button--hover:not(:disabled) {
      background-color: var(--bg-hover, #f7f8fa);
    }
    .dcx-button--terciary:active:not(:disabled),
    .dcx-button--terciary.dcx-button--pressed:not(:disabled) {
      background-color: var(--bg-pressed, #e1e3e6);
    }
    .dcx-button--terciary:focus-visible,
    .dcx-button--terciary.dcx-button--focused {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    .dcx-button--danger {
      background-color: var(--color-danger, #dc2626);
      color: var(--text-white, #ffffff);
      border-color: var(--color-danger, #dc2626);
    }
    .dcx-button--danger:hover:not(:disabled),
    .dcx-button--danger.dcx-button--hover:not(:disabled) {
      background-color: var(--color-danger-hover, #b91c1c);
      border-color: var(--color-danger-hover, #b91c1c);
    }
    .dcx-button--danger:active:not(:disabled),
    .dcx-button--danger.dcx-button--pressed:not(:disabled) {
      background-color: var(--color-danger-pressed, #991b1b);
      border-color: var(--color-danger-pressed, #991b1b);
    }
    .dcx-button--danger:focus-visible,
    .dcx-button--danger.dcx-button--focused {
      border-color: #f87171;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
    }

    .dcx-button--text {
      background-color: transparent;
      color: var(--text-dark, #2a2e33);
      border-color: transparent;
    }
    .dcx-button--text:hover:not(:disabled),
    .dcx-button--text.dcx-button--hover:not(:disabled) {
      background-color: var(--bg-hover, #f7f8fa);
    }
    .dcx-button--text:active:not(:disabled),
    .dcx-button--text.dcx-button--pressed:not(:disabled) {
      background-color: var(--bg-pressed, #e1e3e6);
    }
    .dcx-button--text:focus-visible,
    .dcx-button--text.dcx-button--focused {
      border-color: var(--border-focus, #1db8f2);
      box-shadow: 0 0 0 3px rgba(29, 184, 242, 0.22);
    }

    .dcx-button:disabled {
      background-color: var(--bg-disabled, #f3f4f6);
      color: var(--text-disabled, #696e75);
      border-color: #e5e7eb;
      cursor: not-allowed;
      pointer-events: none;
    }

    .dcx-button--checkbox.dcx-button--checkbox-error--primary {
      border-color: var(--border-error, #dc2626);
      background-color: var(--color-error-bg, #fef2f2);
    }
    .dcx-button--checkbox.dcx-button--checkbox-error--primary:hover:not(:disabled) {
      color: var(--color-error, #dc2626);
      border: 2px solid var(--border-error, #dc2626);
    }

    .dcx-button--checkbox.dcx-button--checkbox-error--secondary {
      border-color: var(--border-error, #dc2626);
    }
    .dcx-button--checkbox.dcx-button--checkbox-error--secondary:hover:not(:disabled) {
      border: 2px solid var(--border-error, #dc2626);
    }

    .dcx-button--icon-top, .dcx-button--icon-bottom {
      flex-direction: column;
      gap: 4px;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background-color: currentColor;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: contain;
      mask-size: contain;
      -webkit-mask-position: center;
      mask-position: center;
    }

    .icon--left, .icon--top, ::slotted([slot="dcx-icon"]) { order: -1; }
    .icon--right, .icon--bottom, ::slotted([slot="button-trailing"]) { order: 1; }
    .icon--right { order: 2; }
    .label { order: 0; }

    ::slotted(svg) {
      display: inline-flex;
      flex-shrink: 0;
      color: currentColor;
    }

    .dcx-button--icon-right ::slotted([slot="dcx-icon"]),
    .dcx-button--icon-bottom ::slotted([slot="dcx-icon"]) {
      order: 1;
    }

    .dcx-icon--size-s, .dcx-button--s ::slotted(svg) { width: 14px; height: 14px; }
    .dcx-icon--size-m, .dcx-button--m ::slotted(svg) { width: 16px; height: 16px; }
    .dcx-icon--size-l, .dcx-button--l ::slotted(svg) { width: 20px; height: 20px; }
    .dcx-icon--size-xl, .dcx-button--xl ::slotted(svg) { width: 24px; height: 24px; }

    .dcx-icon--spacing-compact { margin: 0 4px; }
    .dcx-icon--spacing-spacious { margin: 0 12px; }

    .dcx-button--icon-only {
      padding: 0;
      aspect-ratio: 1 / 1;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
    }
    .dcx-button--icon-only.dcx-button--s { width: 2rem; height: 2rem; }
    .dcx-button--icon-only.dcx-button--m { width: 2.5rem; height: 2.5rem; }
    .dcx-button--icon-only.dcx-button--l { width: 3rem; height: 3rem; }
    .dcx-button--icon-only.dcx-button--xl { width: 3.5rem; height: 3.5rem; }
  `;

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
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

    const effectiveIconName = this.iconName || (this.icon ? 'star-fill' : '');

    const classes = {
      'dcx-button': true,
      [`dcx-button--${this.variant}`]: true,
      [`dcx-button--${this.isCheckbox ? 'checkbox' : this.size}`]: true,
      'dcx-button--icon-only': isIconOnly,
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
    const computedAriaLabel =
      this.label && !isIconOnly
        ? undefined
        : this.ariaLabel || this.label || 'Button';

    const renderIcon = (name: string, positionClass: string) => {
      const url = `https://unpkg.com/bootstrap-icons@1.11.3/icons/${name}.svg`;
      return html`
        <span class="icon ${positionClass} dcx-icon dcx-icon--size-${resolvedIconSize} dcx-icon--spacing-${this.iconSpacing}"
              style="-webkit-mask-image: url(${url}); 
                     mask-image: url(${url});
                     ${this.iconColor ? `background-color: ${this.iconColor}` : ''}"
              aria-hidden="true">
        </span>
      `;
    };

    return html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled}"
        class="${classMap(classes)}"
        aria-label="${ifDefined(computedAriaLabel)}"
        aria-pressed="${this.pressed || nothing}"
        role="${this.isCheckbox ? 'checkbox' : nothing}"
        aria-checked="${this.isCheckbox ? ifDefined(this.ariaChecked ?? undefined) : nothing}"
        @click="${this._handleClick}"
      >
        ${
          effectiveIconName &&
          (this.iconPosition === 'left' || this.iconPosition === 'top')
            ? renderIcon(effectiveIconName, `icon--${this.iconPosition}`)
            : nothing
        }
        
        ${
          this.label && !isIconOnly
            ? html`<span class="label">${this.label}</span>`
            : nothing
        }
        
        ${
          this.iconRightName
            ? renderIcon(this.iconRightName, 'icon--right')
            : nothing
        }
        
        ${
          effectiveIconName &&
          ((this.iconPosition === 'right' && !this.iconRightName) ||
            this.iconPosition === 'bottom')
            ? renderIcon(effectiveIconName, `icon--${this.iconPosition}`)
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
