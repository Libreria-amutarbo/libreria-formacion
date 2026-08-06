import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { template } from './dcx-web-navbar.component.html';
import { styles } from './dcx-web-navbar.component.styles';

import '../dcx-web-button/dcx-web-button.component';

import type { DcxNavbarBrand, DcxNavItem } from '../../core/interfaces/navbar';

@customElement('dcx-web-navbar')
export class DcxWebNavbar extends LitElement {
  @property({ attribute: false })
  accessor brand: DcxNavbarBrand = {
    title: 'App',
    logo: '/cap-logo.svg',
  };

  @property({ attribute: false })
  accessor items: DcxNavItem[] = [];

  @property({ type: String })
  accessor activeValue: string | null = null;

  @property({
    type: String,
    attribute: 'aria-label',
  })
  override accessor ariaLabel: string | null = null;

  @property({
    type: Boolean,
    reflect: true,
  })
  accessor vertical = false;

  @state()
  accessor isMenuOpen = false;

  private readonly itemsListId = `dcx-navbar-items-${Math.random().toString(36).slice(2, 10)}`;

  static override styles = styles;

  private _onDocKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.onToggleEscape();
    }
  };

  private _toggleInnerEl: HTMLButtonElement | null = null;

  private _onInnerToggleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.onToggleEscape();
    }
  };

  public emit(name: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  public toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.addEventListener('keydown', this._onDocKeydown);

      const toggleHost = this.shadowRoot?.querySelector(
        '.dcx-navbar__toggle',
      ) as HTMLElement | null;

      const inner = (toggleHost as any)?.shadowRoot?.querySelector(
        'button',
      ) as HTMLButtonElement | null;

      if (inner) {
        this._toggleInnerEl = inner;
        inner.addEventListener('keydown', this._onInnerToggleKeydown);
      }
    } else {
      document.removeEventListener('keydown', this._onDocKeydown);
      if (this._toggleInnerEl) {
        this._toggleInnerEl.removeEventListener(
          'keydown',
          this._onInnerToggleKeydown,
        );
        this._toggleInnerEl = null;
      }
    }
  };

  public closeMenu() {
    this.isMenuOpen = false;
    document.removeEventListener('keydown', this._onDocKeydown);
    if (this._toggleInnerEl) {
      this._toggleInnerEl.removeEventListener(
        'keydown',
        this._onInnerToggleKeydown,
      );
      this._toggleInnerEl = null;
    }
  }

  public onToggleEscape() {
    if (!this.isMenuOpen) {
      return;
    }

    this.closeMenu();

    const toggleHost = this.shadowRoot?.querySelector(
      '.dcx-navbar__toggle',
    ) as HTMLElement | null;

    const inner = (toggleHost as any)?.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement | null;

    if (inner) {
      inner.focus();
      return;
    }

    toggleHost?.focus();
  }

  public onToggleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onToggleEscape();
    }
  }

  public onItemClick(value: string) {
    this.closeMenu();

    this.emit('itemClick', value);
  }

  override disconnectedCallback() {
    this.closeMenu();
    super.disconnectedCallback();
  }

  public onBrandClick() {
    this.emit('brandClick');
  }

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-navbar': DcxWebNavbar;
  }
}
