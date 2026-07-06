import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { DialogPosition } from '../../core/interfaces/dialog';
import { dcxWebDialogStyles } from './dcx-web-dialog.component.styles';
import '../dcx-web-button/dcx-web-button.component';

@customElement('dcx-web-dialog')
export class DcxWebDialog extends LitElement {

  @property({ type: String }) accessor position: DialogPosition = 'center';
  @property({ type: String }) override accessor title: string = '';
  @property({ type: String }) accessor dialogId: string = ''
  @property({ type: Boolean }) accessor showClose: boolean = true;
  @property({ type: Boolean }) accessor closeOnBackdrop: boolean = true;
  @property({ type: Boolean }) accessor visible: boolean = false;

  static override styles = dcxWebDialogStyles;

  private get _dialogTitleId(): string {
    return `dialog-title-${this.dialogId ?? 'default'}`;
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
    if (!this.visible) return html``;

    return html`
      <div class="dcx-dialog-root">
        <div
          class="dcx-dialog__backdrop"
          @pointerdown=${this._onBackdropClick}
        ></div>

        <div
          class="${this._dialogClasses}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.title ? this._dialogTitleId : ''}"
        >
          <div class="dcx-dialog__header">
            ${this.title
              ? html`<h3 id="${this._dialogTitleId}" class="dcx-dialog__title">
                  ${this.title}
                </h3>`
              : null}

            ${this.showClose
              ? html`
                  <dcx-web-button
                    variant="icon-only"
                    size="s"
                    class="dcx-dialog__close"
                    aria-label="Cerrar diálogo"
                    @click=${this._close}
                  >
                    <svg slot="dcx-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                    
                  </dcx-web-button>
                `
              : null}
          </div>

          <div class="dcx-dialog__body">
            <slot name="body"></slot>
          </div>

          <div class="dcx-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-dialog': DcxWebDialog;
  }
}