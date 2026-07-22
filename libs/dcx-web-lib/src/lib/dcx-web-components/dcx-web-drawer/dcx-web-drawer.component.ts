import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-drawer.component.styles';
import { template } from './dcx-web-drawer.component.html';
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

  static override styles = styles;

  private static _instanceCount = 0;
  private static _globalZIndex = 0;

  @state() private accessor _currentZIndex = DRAWER_BASE_Z_INDEX_DEFAULT;
  @state() accessor rendered = false;
  @state() accessor closing = false;

  private _closeTimer?: number;
  private _scrollBlocked = false;
  private _previousOverflow = '';
  private _hideAlreadyEmitted = false;

  private readonly _drawerId = `dcx-drawer-${++DcxWebDrawer._instanceCount}`;

  private readonly _keydownHandler = (event: KeyboardEvent): void => {
    if (!this.open || !this.closeOnEscape || event.key !== 'Escape') {
      return;
    }
    this.closeDrawer();
  };

  get drawerTitleId(): string {
    return `${this._drawerId}-title`;
  }

  get hasHeader(): boolean {
    return Boolean(
      this.header || this.showCloseIcon || this.querySelector('[slot="drawerHeader"]'),
    );
  }

  get hasFooter(): boolean {
    return Boolean(this.footer || this.querySelector('[slot="drawerFooter"]'));
  }

  get resolvedZIndex(): number {
    return this._currentZIndex;
  }

  get panelWidth(): string | null {
    if (this.fullScreen) {
      return '100%';
    }

    if (this.position === 'left' || this.position === 'right') {
      return this.size;
    }

    return null;
  }

  get panelHeight(): string | null {
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
        this.closing = false;
        this.rendered = true;
      } else {
        this.closing = true;
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
          this.rendered = false;
          this.closing = false;
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
    return template(this);
  }

  public close(): void {
    this.closeDrawer();
  }

  readonly handleMaskPointerDown = (event: PointerEvent): void => {
    event.stopPropagation();

    if (!this.dismissible) {
      return;
    }

    this.closeDrawer();
  };

  readonly closeDrawer = (): void => {
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