import { html, nothing } from 'lit';
import type { DcxWebNavbar } from './dcx-web-navbar.component';

export const template = (host: DcxWebNavbar) => html`
  <nav
    class="
      dcx-navbar
      ${host.isMenuOpen ? 'is-menu-open' : ''}
      ${host.vertical ? 'dcx-navbar--vertical' : ''}
    "
    aria-label="${host.ariaLabel ?? nothing}"
  >
    <button
      type="button"
      class="dcx-navbar__brand"
      @click="${host.onBrandClick}"
    >
      ${
        host.brand.logo
          ? html`
            <img
              class="dcx-navbar__brand-logo"
              src="${host.brand.logo}"
              alt="${host.brand.title}"
            />
          `
          : nothing
      }

      <span class="dcx-navbar__brand-title">
        ${host.brand.title}
      </span>
    </button>

    <ul
      class="dcx-navbar__items"
      id="dcx-navbar-items"
      role="list"
    >
      ${host.items.map(
        item => html`
          <li class="dcx-navbar__item">
            <dcx-web-button
              class="dcx-navbar__item-btn ${host.activeValue === item.value ? 'is-active' : ''} ${host.vertical ? 'dcx-navbar__item-btn--vertical' : ''}"
              label="${item.label}"
              .icon="${!!item.icon}"
              icon-name="${item.icon ?? ''}"
              icon-position="left"
              icon-size="s"
              variant="text"
              size="s"
              ?disabled="${item.disabled ?? false}"
              aria-current="${host.activeValue === item.value ? 'page' : nothing}"
              @buttonClick="${() => host.onItemClick(item.value)}"
            >
            </dcx-web-button>
          </li>
        `,
      )}
    </ul>

    <div class="dcx-navbar__actions">
      <slot></slot>
    </div>

    <dcx-web-button
      class="dcx-navbar__toggle"
      variant="text"
      .icon="${true}"
      icon-name="${host.isMenuOpen ? 'x' : 'list'}"
      icon-size="m"
      aria-label="${host.isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}"
      aria-expanded="${String(host.isMenuOpen)}"
      aria-controls="dcx-navbar-items"
      @buttonClick="${host.toggleMenu}"
    >
    </dcx-web-button>
  </nav>
`;
