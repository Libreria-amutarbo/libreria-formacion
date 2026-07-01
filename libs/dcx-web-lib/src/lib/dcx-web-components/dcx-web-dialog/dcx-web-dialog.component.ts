import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DialogPosition = 'center' | 'top' | 'bottom';

@customElement('dcx-web-dialog')
export class DcxWebDialog extends LitElement {
  // Inputs (equivalentes Angular)
  @property({ type: String }) accessor dialogId: string | undefined = undefined;
  @property({ type: String }) accessor title = '';
  @property({ type: Boolean }) accessor visible = false;
  @property({ type: Boolean }) accessor showClose = true;
  @property({ type: String }) accessor position: DialogPosition = 'center';
  @property({ type: Boolean }) accessor closeOnBackdrop = true;

  // Slots equivalentes a templates
  // body -> <slot name="body"></slot>
  // footer -> <slot name="footer"></slot>

  static override styles = css`
    :host {
      display: block;
    }

    .dcx-dialog-root {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .dcx-dialog__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .dcx-dialog {
      position: relative;
      background: white;
      border-radius: 8px;
      min-width: 300px;
      max-width: 600px;
      z-index: 1;
      display: flex;
      flex-direction: column;
    }

    .dcx-dialog--pos-center {
      align-self: center;
    }

    .dcx-dialog--pos-top {
      align-self: flex-start;
      margin-top: 40px;
    }

    .dcx-dialog--pos-bottom {
      align-self: flex-end;
      margin-bottom: 40px;
    }

    .dcx-dialog__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .dcx-dialog__title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .dcx-dialog__close {
      cursor: pointer;
      background: none;
      border: none;
      font-size: 20px;
    }

    .dcx-dialog__body {
      padding: 16px;
    }

    .dcx-dialog__footer {
      padding: 16px;
      border-top: 1px solid #eee;
    }
  `;

  private get _dialogTitleId(): string {
    return `dialog-title-${this.dialogId ?? 'default'}`;
  }

  private get _dialogClasses(): string {
    return `dcx-dialog dcx-dialog--pos-${this.position}`;
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('closeDialog'));
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
                  <button
                    class="dcx-dialog__close"
                    aria-label="Cerrar diálogo"
                    @click=${this._close}
                  >
                    ✕
                  </button>
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