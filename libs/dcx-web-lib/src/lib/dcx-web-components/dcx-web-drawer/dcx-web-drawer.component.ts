import { LitElement, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { drawerStyles } from './dcx-web-drawer.component.styles';
import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';
import type { DcxPosition } from '../../core/interfaces/generic';
import {
  DRAWER_OPEN_DEFAULT,
  DRAWER_POSITION_DEFAULT,
  DRAWER_MODAL_DEFAULT,
  DRAWER_DISMISSIBLE_DEFAULT,
  DRAWER_SHOW_CLOSE_ICON_DEFAULT,
  DRAWER_CLOSE_ON_ESCAPE_DEFAULT,
  DRAWER_BLOCK_SCROLL_DEFAULT,
  DRAWER_FULLSCREEN_DEFAULT,
  DRAWER_SIZE_DEFAULT,
  DRAWER_BASE_Z_INDEX_DEFAULT,
  DRAWER_AUTO_Z_INDEX_DEFAULT,
  DRAWER_HEADER_DEFAULT,
  DRAWER_FOOTER_DEFAULT,
} from '../../core/defaults/drawer';

@customElement('dcx-web-drawer')
export class DcxWebDrawer extends LitElement {
  @property({ type: Boolean, reflect: true }) accessor open = DRAWER_OPEN_DEFAULT;
  @property({ type: String, reflect: true }) accessor position: DcxPosition = DRAWER_POSITION_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor modal = DRAWER_MODAL_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor dismissible = DRAWER_DISMISSIBLE_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor showCloseIcon = DRAWER_SHOW_CLOSE_ICON_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor closeOnEscape = DRAWER_CLOSE_ON_ESCAPE_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor blockScroll = DRAWER_BLOCK_SCROLL_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor fullScreen = DRAWER_FULLSCREEN_DEFAULT;
  @property({ type: String, reflect: true }) accessor size = DRAWER_SIZE_DEFAULT;
  @property({ type: Number, reflect: true }) accessor baseZIndex = DRAWER_BASE_Z_INDEX_DEFAULT;
  @property({ type: Boolean, reflect: true }) accessor autoZIndex = DRAWER_AUTO_Z_INDEX_DEFAULT;
  @property({ type: String, reflect: true }) accessor header = DRAWER_HEADER_DEFAULT;
  @property({ type: String, reflect: true }) accessor footer = DRAWER_FOOTER_DEFAULT;

  static override styles = drawerStyles;

  private static _instanceCount = 0;
  private static _globalZIndex = 0;

  @state() private accessor _currentZIndex = DRAWER_BASE_Z_INDEX_DEFAULT;
  @state() private accessor _rendered = false;
  @state() private accessor _closing = false;

  private _closeTimer?: number;
  private _scrollBlocked = false;
  private _previousOverflow = '';
  private _hideAlreadyEmitted = false;

  private readonly _drawerId = `dcx-drawer-${++DcxWebDrawer._instanceCount}`;

  private readonly _keydownHandler = (event: KeyboardEvent): void => {
    if (!this.open || !this.closeOnEscape || event.key !== 'Escape') {
      return;
    }
    this._closeDrawer();
  };

  private get _drawerTitleId(): string {
    return `${this._drawerId}-title`;
  }

  private get _hasHeader(): boolean {
    return Boolean(
      this.header || this.showCloseIcon || this.querySelector('[slot="drawerHeader"]'),
    );
  }

  private get _hasFooter(): boolean {
    return Boolean(this.footer || this.querySelector('[slot="drawerFooter"]'));
  }

  private get _resolvedZIndex(): number {
    return this._currentZIndex;
  }

  private get _panelWidth(): string | null {
    if (this.fullScreen) {
      return '100%';
    }

    if (this.position === 'left' || this.position === 'right') {
      return this.size;
    }

    return null;
  }

  private get _panelHeight(): string | null {
    if (this.fullScreen) {
      return '100%';
    }

    if (this.position === 'top' || this.position === 'bottom') {
      return this.size;
    }

    return null;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._syncKeydownListener();
    this._syncBodyScroll();
  }

  override disconnectedCallback(): void {
    document.removeEventListener('keydown', this._keydownHandler);
    if (this._scrollBlocked) {
      document.body.style.overflow = this._previousOverflow;
      document.body.style.paddingRight = '';
      this._scrollBlocked = false;
    }
    window.clearTimeout(this._closeTimer);
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._closing = false;
        this._rendered = true;
      } else {
        this._closing = true;
      }
    }

    if (
      changedProperties.has('open') ||
      changedProperties.has('baseZIndex') ||
      changedProperties.has('autoZIndex')
    ) {
      if (this.open && this.autoZIndex) {
        DcxWebDrawer._globalZIndex = Math.max(
          DcxWebDrawer._globalZIndex,
          this.baseZIndex,
        );
        DcxWebDrawer._globalZIndex += 2;
        this._currentZIndex = DcxWebDrawer._globalZIndex;
      } else {
        this._currentZIndex = this.baseZIndex;
      }
    }
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.dispatchEvent(
          new CustomEvent('dcx-drawer-show', {
            bubbles: true,
            composed: true,
          }),
        );
      } else {
        if (this._hideAlreadyEmitted) {
          this._hideAlreadyEmitted = false;
        } else {
          this.dispatchEvent(
            new CustomEvent('dcx-drawer-hide', {
              bubbles: true,
              composed: true,
            }),
          );
        }

        window.clearTimeout(this._closeTimer);
        this._closeTimer = window.setTimeout(() => {
          this._rendered = false;
          this._closing = false;
          this.requestUpdate();
        }, 220);
      }
    }

    if (
      changedProperties.has('open') ||
      changedProperties.has('blockScroll') ||
      changedProperties.has('modal')
    ) {
      this._syncBodyScroll();
    }

    if (changedProperties.has('open') || changedProperties.has('closeOnEscape')) {
      this._syncKeydownListener();
    }
  }

  override render() {
    if (!this._rendered) {
      return nothing;
    }

    const drawerClasses = [
      'dcx-drawer',
      `dcx-drawer--${this.position}`,
      this.fullScreen ? 'dcx-drawer--fullscreen' : '',
    ].filter(Boolean);

    const rootClasses = ['dcx-drawer-root', this._closing ? 'dcx-drawer-root--closing' : ''];
    const shouldRenderMask = this.modal;

    return html`
      <div class=${rootClasses.filter(Boolean).join(' ')} style="z-index:${this._resolvedZIndex};">
        ${shouldRenderMask
          ? html`<div
              class="dcx-drawer__mask"
              aria-hidden="true"
              @pointerdown=${this._handleMaskPointerDown}
            ></div>`
          : nothing}

        <aside
          class=${drawerClasses.join(' ')}
          role="dialog"
          aria-modal=${this.modal ? 'true' : nothing}
          aria-labelledby=${this.header ? this._drawerTitleId : nothing}
          style="z-index:${this._resolvedZIndex + 1};${this._panelWidth ? ` width:${this._panelWidth};` : ''}${this._panelHeight ? ` height:${this._panelHeight};` : ''}"
        >
          ${this._hasHeader
            ? html`
                <header class="dcx-drawer__header">
                  ${this.querySelector('[slot="drawerHeader"]')
                    ? html`<slot name="drawerHeader"></slot>`
                    : html`<h3 class="dcx-drawer__title" id=${this._drawerTitleId}>${this.header}</h3>`}

                  ${this.showCloseIcon
                    ? html`<dcx-web-button
                        variant="icon-only"
                        size="s"
                        aria-label="Cerrar drawer"
                        @buttonClick=${this._closeDrawer}
                      >
                        <dcx-web-icon slot="dcx-icon" name="x"></dcx-web-icon>
                      </dcx-web-button>`
                    : nothing}
                </header>
              `
            : nothing}

          <div class="dcx-drawer__content">
            <slot></slot>
          </div>

          ${this._hasFooter
            ? html`
                <footer class="dcx-drawer__footer">
                  ${this.querySelector('[slot="drawerFooter"]')
                    ? html`<slot name="drawerFooter"></slot>`
                    : html`<span>${this.footer}</span>`}
                </footer>
              `
            : nothing}
        </aside>
      </div>
    `;
  }

  public close(): void {
    this._closeDrawer();
  }

  private readonly _handleMaskPointerDown = (event: PointerEvent): void => {
    event.stopPropagation();

    if (!this.dismissible) {
      return;
    }

    this._closeDrawer();
  };

  private readonly _closeDrawer = (): void => {
    if (!this.open) {
      return;
    }

    this._hideAlreadyEmitted = true;

    this.dispatchEvent(
      new CustomEvent('dcx-drawer-hide', {
        bubbles: true,
        composed: true,
      }),
    );

    this.open = false;
    this.dispatchEvent(
      new CustomEvent('dcx-drawer-visible-change', {
        detail: false,
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _syncBodyScroll(): void {
    const shouldBlock = this.open && this.modal && this.blockScroll;

    if (shouldBlock && !this._scrollBlocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      this._previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      this._scrollBlocked = true;
    } else if (!shouldBlock && this._scrollBlocked) {
      document.body.style.overflow = this._previousOverflow;
      document.body.style.paddingRight = '';
      this._scrollBlocked = false;
    }
  }

  private _syncKeydownListener(): void {
    const shouldListen = this.open && this.closeOnEscape;
    if (shouldListen) {
      document.addEventListener('keydown', this._keydownHandler);
    } else {
      document.removeEventListener('keydown', this._keydownHandler);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-drawer': DcxWebDrawer;
  }
}