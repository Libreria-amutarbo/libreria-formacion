import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  DcxButtonType,
  DcxButtonVariant,
  DcxIconPosition,
} from '../../core/interfaces/button';
import type { DcxSize } from '../../core/interfaces/generic';
import type { DcxIconSpacing } from '../../core/interfaces/icon';
import { styles } from './dcx-web-button.component.styles';
import { template } from './dcx-web-button.component.html';

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

  handleClick(e: Event) {
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
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-button': DcxWebButton;
  }
}
