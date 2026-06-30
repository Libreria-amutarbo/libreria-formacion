import { LitElement, html, nothing } from 'lit';
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
import { styles } from './dcx-web-button.component.styles';

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

  static override styles = styles;

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
        <span class="dcx-button__icon ${positionClass} dcx-icon dcx-icon--size-${resolvedIconSize} dcx-icon--spacing-${this.iconSpacing}"
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
            ? renderIcon(effectiveIconName, `dcx-button__icon--${this.iconPosition}`)
            : nothing
        }
        
        ${
          this.label && !isIconOnly
            ? html`<span class="dcx-button__label">${this.label}</span>`
            : nothing
        }
        
        ${
          this.iconRightName
            ? renderIcon(this.iconRightName, 'dcx-button__icon--right')
            : nothing
        }
        
        ${
          effectiveIconName &&
          ((this.iconPosition === 'right' && !this.iconRightName) ||
            this.iconPosition === 'bottom')
            ? renderIcon(effectiveIconName, `dcx-button__icon--${this.iconPosition}`)
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
