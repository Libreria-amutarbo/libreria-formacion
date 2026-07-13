import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';

import type { DialogPosition } from '../../core/interfaces/dialog';
import { dcxWebDialogStyles } from './dcx-web-dialog.component.styles';
import '../dcx-web-button/dcx-web-button.component';
import { dcxWebDialogTemplate } from './dcx-web-dialog.component.html';


@customElement('dcx-web-dialog')
export class DcxWebDialog extends LitElement {
  @property({ type: String }) accessor position: DialogPosition = 'center';

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

  static override styles = dcxWebDialogStyles;

  private get _dialogTitleId(): string {
    return `dialog-title-${this.dialogId || 'default'}`;
  }

  private get _dialogClasses(): string {
    return `dcx-dialog dcx-dialog--pos-${this.position}`;
  }

  private _close() {
    this.dispatchEvent(
      new CustomEvent('closeDialog', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onBackdropClick(e: MouseEvent) {
    e.stopPropagation();

    if (this.closeOnBackdrop) {
      this._close();
    }
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.visible) {
      this._close();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKeyDown);
  }

  override disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  override render() {
    return dcxWebDialogTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-dialog': DcxWebDialog;
  }
}