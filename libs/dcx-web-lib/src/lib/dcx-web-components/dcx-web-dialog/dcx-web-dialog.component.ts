import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { DialogPosition } from '../../core/interfaces/dialog';
import { styles } from './dcx-web-dialog.component.styles';
import { template } from './dcx-web-dialog.component.html';

import '../dcx-web-button/dcx-web-button.component';

@customElement('dcx-web-dialog')
export class DcxWebDialog extends LitElement {
  @property({ type: String })
  accessor position: DialogPosition = 'center';

  @property({ type: String })
  override accessor title = '';

  @property({ type: String, attribute: 'dialog-id' })
  accessor dialogId = '';

  @property({ type: Boolean, attribute: 'show-close' })
  accessor showClose = true;

  @property({ type: Boolean, attribute: 'close-on-backdrop' })
  accessor closeOnBackdrop = true;

  @property({ type: Boolean })
  accessor visible = false;

  static override styles = styles;

  public get dialogTitleId(): string {
    return `dialog-title-${this.dialogId || 'default'}`;
  }

  public get dialogClasses(): string {
    return `dcx-dialog dcx-dialog--pos-${this.position}`;
  }

  public close() {
    this.dispatchEvent(
      new CustomEvent('closeDialog', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  public onBackdropClick(e: MouseEvent) {
    e.stopPropagation();

    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  protected onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.visible) {
      this.close();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.onKeyDown);
  }

  override disconnectedCallback() {
    document.removeEventListener('keydown', this.onKeyDown);
    super.disconnectedCallback();
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-dialog': DcxWebDialog;
  }
}