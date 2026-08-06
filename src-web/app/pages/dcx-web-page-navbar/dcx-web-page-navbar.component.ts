import { LitElement, html, css } from 'lit';
import {
  customElement,
  state,
} from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-navbar/dcx-web-navbar.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';

import type {
  DcxNavbarBrand,
  DcxNavItem,
} from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/navbar';

@customElement('dcx-web-page-navbar')
export class DcxWebPageNavbar extends LitElement {
  readonly brand: DcxNavbarBrand = {
    title: 'Mi Aplicación',
  };

  readonly brandWithLogo: DcxNavbarBrand = {
    title: 'DCX Library',
    logo: '/cap-logo.svg',
  };

  readonly navItems: DcxNavItem[] = [
    {
      label: 'Inicio',
      value: 'home',
      icon: 'house',
    },
    {
      label: 'Componentes',
      value: 'components',
      icon: 'grid',
    },
    {
      label: 'Guías',
      value: 'guides',
      icon: 'book',
    },
    {
      label: 'Recursos',
      value: 'resources',
      icon: 'box',
    },
  ];

  readonly navItemsWithDisabled: DcxNavItem[] = [
    {
      label: 'Inicio',
      value: 'home',
      icon: 'house',
    },
    {
      label: 'Componentes',
      value: 'components',
      icon: 'grid',
    },
    {
      label: 'Deshabilitado',
      value: 'disabled',
      disabled: true,
    },
    {
      label: 'Recursos',
      value: 'resources',
      icon: 'box',
    },
  ];

  @state()
  accessor activeValue = 'components';

  private onItemClick(event: CustomEvent<string>) {
    this.activeValue = event.detail;
  }

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      padding-bottom: var(--sp-12, 48px);
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      color: var(--text-muted, #696e75);
      line-height: 1.65;
      max-width: 720px;
      margin: 0 0 var(--sp-5, 20px);
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      margin-bottom: var(--sp-5, 20px);
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      margin: 0;
      font-size: var(--fs-sm, 12px);
      color: var(--text-muted, #696e75);
      line-height: 1.55;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .example-hint {
      margin-top: var(--sp-3, 12px);
      font-size: var(--fs-base, 14px);
      color: var(--text-muted, #696e75);
    }

    .vertical-demo {
      display: flex;
      height: 400px;
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      overflow: hidden;
    }

    .vertical-demo__content {
      flex: 1;
      padding: var(--sp-6, 24px);
    }

    .mobile-frame {
      max-width: 360px;
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      overflow: hidden;
    }
  `;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">
            Components
          </p>

          <h1 class="demo-page-header__title">
            Navbar
          </h1>

          <p class="demo-page-header__desc">
            Barra de navegación principal. Admite
            brand con logo, items con icono y
            estado activo, un slot de acciones y un
            modo vertical para usarse como sidebar
            lateral. En pantallas estrechas los
            items se ocultan tras un botón
            hamburguesa.
          </p>

          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">
              Default
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-navbar
              aria-label="Navegación principal — ejemplo default"
              .brand=${this.brand}
              .items=${this.navItems}
            >
            </dcx-web-navbar>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">
              Con logo
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-navbar
              aria-label="Navegación principal — ejemplo con logo"
              .brand=${this.brandWithLogo}
              .items=${this.navItems}
            >
            </dcx-web-navbar>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">
              Con item activo
            </span>
          </div>

          <p class="demo-section__desc">
            El item activo se controla desde fuera
            con <code>activeValue</code> y recibe
            <code>aria-current="page"</code>.
          </p>

          <div class="demo-section__body">
            <dcx-web-navbar
              aria-label="Navegación principal — ejemplo con item activo"
              .brand=${this.brandWithLogo}
              .items=${this.navItems}
              .activeValue=${this.activeValue}
              @itemClick=${this.onItemClick}
            >
            </dcx-web-navbar>

            <p class="example-hint">
              Item activo:
              <strong>${this.activeValue}</strong>
            </p>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">
              Con item deshabilitado
            </span>
          </div>

          <div class="demo-section__body">
            <dcx-web-navbar
              aria-label="Navegación principal — ejemplo con item deshabilitado"
              .brand=${this.brand}
              .items=${this.navItemsWithDisabled}
              .activeValue=${this.activeValue}
              @itemClick=${this.onItemClick}
            >
            </dcx-web-navbar>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">
              Con acciones en el slot
            </span>
          </div>

          <p class="demo-section__desc">
            El componente expone un
            <code>&lt;slot&gt;&lt;/slot&gt;</code>
            para proyectar contenido.
          </p>

          <div class="demo-section__body">
            <dcx-web-navbar
              aria-label="Navegación principal — ejemplo con acciones"
              .brand=${this.brandWithLogo}
              .items=${this.navItems}
              .activeValue=${this.activeValue}
              @itemClick=${this.onItemClick}
            >
              <dcx-web-button
                label="Login"
                size="s"
                variant="secondary"
              >
              </dcx-web-button>

              <dcx-web-button
                label="Registrarse"
                size="s"
                variant="primary"
              >
              </dcx-web-button>
            </dcx-web-navbar>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">
              Modo vertical (sidebar)
            </span>
          </div>

          <div class="demo-section__body">
            <div class="vertical-demo">
              <dcx-web-navbar
                .brand=${this.brandWithLogo}
                .items=${this.navItems}
                .activeValue=${this.activeValue}
                .vertical=${true}
                aria-label="Navegación principal — ejemplo vertical"
                @itemClick=${this.onItemClick}
              >
                <dcx-web-button
                  label="Login"
                  size="s"
                  variant="secondary"
                >
                </dcx-web-button>
              </dcx-web-navbar>

              <div class="vertical-demo__content">
                <p>Contenido principal</p>

                <p class="example-hint">
                  Item activo:
                  <strong>${this.activeValue}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">
              Menú móvil abierto
            </span>
          </div>

          <p class="demo-section__desc">
            Simulado dentro de un marco de 360px.
            Pulsa el botón hamburguesa para
            alternar el menú; se cierra con
            <code>Escape</code>.
          </p>

          <div class="demo-section__body">
            <div class="mobile-frame">
              <dcx-web-navbar
                .brand=${this.brand}
                .items=${this.navItems}
                activeValue="home"
                aria-label="Navegación móvil de ejemplo"
              >
              </dcx-web-navbar>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-navbar': DcxWebPageNavbar;
  }
}