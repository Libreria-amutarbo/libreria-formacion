import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-drawer/dcx-web-drawer.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';
import { pageDrawerStyles } from './dcx-web-page-drawer.component.styles';
import type { DcxPosition } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/generic';

@customElement('dcx-web-page-drawer')
export class DcxWebPageDrawer extends LitElement {
  @state() private accessor _visDefault = false;

  @state() private accessor _visPositions = false;
  @state() private accessor _posPositions: DcxPosition = 'right';
  @state() private accessor _sizePositions = '22rem';

  @state() private accessor _visNoEsc = false;

  @state() private accessor _visNoModal = false;

  @state() private accessor _visNoDismiss = false;

  @state() private accessor _visEsc = false;

  @state() private accessor _visIconOnly = false;

  @state() private accessor _visSizes = false;
  @state() private accessor _posSizes: DcxPosition = 'top';
  @state() private accessor _sizeSizes = '12rem';

  @state() private accessor _visFullscreen = false;

  @state() private accessor _visBlockScroll = false;

  @state() private accessor _visZA = false;
  @state() private accessor _visZB = false;
  @state() private accessor _visZC = false;

  @state() private accessor _visCustomHeader = false;

  @state() private accessor _visCustomFooter = false;

  static override styles = pageDrawerStyles;

  private _openAt(pos: DcxPosition) {
    this._posPositions = pos;
    this._sizePositions = pos === 'top' || pos === 'bottom' ? '14rem' : '22rem';
    this._visPositions = true;
  }

  private _openSize(pos: DcxPosition, size: string) {
    this._posSizes = pos;
    this._sizeSizes = size;
    this._visSizes = true;
  }

  private _openZStacked() {
    this._visZB = true;
    window.setTimeout(() => {
      this._visZA = true;
    }, 60);
    window.setTimeout(() => {
      this._visZC = true;
    }, 120);
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Drawer (Web Component)</h1>
          <p class="demo-page-header__desc">
            Panel lateral, superior o inferior con comportamiento modal opcional. Soporta cierre por máscara,
            tecla Escape, botón de cierre y control externo de visibilidad con <code>open</code> + <code>dcx-drawer-visible-change</code>.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir drawer" variant="primary" @buttonClick=${() => this._visDefault = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visDefault}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .header=${'Drawer básico'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visDefault = e.detail}
            >
              <p>Contenido del drawer. Puedes cerrarlo con la máscara, el icono o la tecla Escape.</p>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <dcx-web-button label="Aplicar" variant="primary" @buttonClick=${() => this._visDefault = false}></dcx-web-button>
                <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=${() => this._visDefault = false}></dcx-web-button>
              </div>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Posiciones</span>
          </div>
          <div class="demo-section__body">
            <div class="button-row">
              <dcx-web-button label="Left" variant="secondary" @buttonClick=${() => this._openAt('left')}></dcx-web-button>
              <dcx-web-button label="Right" variant="secondary" @buttonClick=${() => this._openAt('right')}></dcx-web-button>
              <dcx-web-button label="Top" variant="secondary" @buttonClick=${() => this._openAt('top')}></dcx-web-button>
              <dcx-web-button label="Bottom" variant="secondary" @buttonClick=${() => this._openAt('bottom')}></dcx-web-button>
            </div>

            <dcx-web-drawer
              .open=${this._visPositions}
              .position=${this._posPositions}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${this._sizePositions}
              .header=${'Posición'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visPositions = e.detail}
            >
              <p>Drawer abierto en <strong>${this._posPositions}</strong>.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">ESC deshabilitado</span>
          </div>
          <p class="demo-section__desc">Con <code>closeOnEscape=false</code>, la tecla Escape no cierra el drawer.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir (ESC deshabilitado)" variant="secondary" @buttonClick=${() => this._visNoEsc = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visNoEsc}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${false}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .header=${'CloseOnEscape deshabilitado'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visNoEsc = e.detail}
            >
              <p>Ciérralo con la máscara o el icono de cierre.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Sin modal</span>
          </div>
          <p class="demo-section__desc">Con <code>modal=false</code> no se renderiza máscara de fondo.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir no modal" variant="secondary" @buttonClick=${() => this._visNoModal = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visNoModal}
              .position=${'left'}
              .modal=${false}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .header=${'Drawer no modal'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visNoModal = e.detail}
            >
              <p>El contenido de la página sigue siendo accesible.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">No dismissible</span>
          </div>
          <p class="demo-section__desc">Con <code>dismissible=false</code>, el click en la máscara no cierra el drawer.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir drawer" variant="primary" @buttonClick=${() => this._visNoDismiss = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visNoDismiss}
              .position=${'right'}
              .modal=${true}
              .dismissible=${false}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .header=${'No dismissible'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visNoDismiss = e.detail}
            >
              <p>Usa el icono de cierre o la tecla Escape.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Solo Escape</span>
          </div>
          <p class="demo-section__desc">Sin icono de cierre ni máscara dismissible: solo la tecla Escape cierra el drawer.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir (solo ESC)" variant="primary" @buttonClick=${() => this._visEsc = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visEsc}
              .position=${'right'}
              .modal=${true}
              .dismissible=${false}
              .showCloseIcon=${false}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .header=${'Cierre solo con Escape'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visEsc = e.detail}
            >
              <p>Pulsa <strong>Escape</strong> para cerrarlo.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Solo icono de cierre</span>
          </div>
          <p class="demo-section__desc">Ni la máscara ni Escape cierran el drawer; solo el botón de cierre.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir (solo icono)" variant="secondary" @buttonClick=${() => this._visIconOnly = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visIconOnly}
              .position=${'right'}
              .modal=${true}
              .dismissible=${false}
              .showCloseIcon=${true}
              .closeOnEscape=${false}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .header=${'Solo cierre por icono'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visIconOnly = e.detail}
            >
              <p>Usa el icono ✕ del header para cerrar.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Tamaños top / bottom</span>
          </div>
          <p class="demo-section__desc">Para <code>top</code> y <code>bottom</code> el atributo <code>size</code> controla la altura.</p>
          <div class="demo-section__body">
            <div class="button-row">
              <dcx-web-button label="Top 12rem" variant="secondary" @buttonClick=${() => this._openSize('top', '12rem')}></dcx-web-button>
              <dcx-web-button label="Bottom 30vh" variant="secondary" @buttonClick=${() => this._openSize('bottom', '30vh')}></dcx-web-button>
            </div>

            <dcx-web-drawer
              .open=${this._visSizes}
              .position=${this._posSizes}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${this._sizeSizes}
              .header=${'Drawer ' + this._posSizes}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visSizes = e.detail}
            >
              <p>Altura aplicada: <strong>${this._sizeSizes}</strong>.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">Fullscreen</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir fullscreen" variant="primary" @buttonClick=${() => this._visFullscreen = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visFullscreen}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${true}
              .size=${'22rem'}
              .header=${'Drawer fullscreen'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visFullscreen = e.detail}
            >
              <p>El drawer ocupa todo el viewport.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">Block scroll</span>
          </div>
          <p class="demo-section__desc">Con <code>blockScroll=true</code> el scroll del body queda bloqueado mientras el drawer está abierto.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir con blockScroll=true" variant="danger" @buttonClick=${() => this._visBlockScroll = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visBlockScroll}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${true}
              .fullScreen=${false}
              .size=${'24rem'}
              .header=${'Block scroll activo'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visBlockScroll = e.detail}
            >
              <p>Cierra el drawer para recuperar el scroll de la página.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">Z-index</span>
          </div>
          <p class="demo-section__desc">Orden esperado al abrir los 3 simultáneamente: Manual 2000 &lt; Auto 2000+ &lt; Manual 2600.</p>
          <div class="demo-section__body">
            <div class="button-row">
              <dcx-web-button label="Manual 2000" variant="secondary" @buttonClick=${() => this._visZB = true}></dcx-web-button>
              <dcx-web-button label="Auto 2000" variant="primary" @buttonClick=${() => this._visZA = true}></dcx-web-button>
              <dcx-web-button label="Manual 2600" variant="secondary" @buttonClick=${() => this._visZC = true}></dcx-web-button>
              <dcx-web-button label="Abrir los 3" variant="primary" @buttonClick=${this._openZStacked}></dcx-web-button>
            </div>

            <dcx-web-drawer
              .open=${this._visZB}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'24rem'}
              .baseZIndex=${2000}
              .autoZIndex=${false}
              .header=${'Manual 2000'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visZB = e.detail}
            >
              <p><code>autoZIndex=false</code> — usa exactamente <code>baseZIndex=2000</code>.</p>
            </dcx-web-drawer>

            <dcx-web-drawer
              .open=${this._visZA}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'22rem'}
              .baseZIndex=${2000}
              .autoZIndex=${true}
              .header=${'Auto 2000'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visZA = e.detail}
            >
              <p><code>autoZIndex=true</code> — incrementa al abrir y queda sobre el manual.</p>
            </dcx-web-drawer>

            <dcx-web-drawer
              .open=${this._visZC}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'20rem'}
              .baseZIndex=${2600}
              .autoZIndex=${false}
              .header=${'Manual 2600'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visZC = e.detail}
            >
              <p><code>baseZIndex=2600</code> siempre queda arriba.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">12</span>
            <span class="demo-section__title">Header personalizado</span>
          </div>
          <p class="demo-section__desc">Proyecta <code>slot="drawerHeader"</code> para reemplazar el título de texto por un template con HTML arbitrario.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir (header custom)" variant="primary" @buttonClick=${() => this._visCustomHeader = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visCustomHeader}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'24rem'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visCustomHeader = e.detail}
            >
              <div slot="drawerHeader" class="drawer-custom-header">
                <span class="drawer-custom-header__icon">🗂️</span>
                <div>
                  <p class="drawer-custom-header__title">Header personalizado</p>
                  <p class="drawer-custom-header__subtitle">Subtítulo opcional</p>
                </div>
              </div>

              <p>El header fue proyectado via <code>slot="drawerHeader"</code>.</p>
            </dcx-web-drawer>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">13</span>
            <span class="demo-section__title">Footer personalizado</span>
          </div>
          <p class="demo-section__desc">Proyecta <code>slot="drawerFooter"</code> para reemplazar el texto plano por botones de acción.</p>
          <div class="demo-section__body">
            <dcx-web-button label="Abrir (footer custom)" variant="primary" @buttonClick=${() => this._visCustomFooter = true}></dcx-web-button>

            <dcx-web-drawer
              .open=${this._visCustomFooter}
              .position=${'right'}
              .modal=${true}
              .dismissible=${true}
              .showCloseIcon=${true}
              .closeOnEscape=${true}
              .blockScroll=${false}
              .fullScreen=${false}
              .size=${'24rem'}
              .header=${'Footer personalizado'}
              @dcx-drawer-visible-change=${(e: CustomEvent<boolean>) => this._visCustomFooter = e.detail}
            >
              <p>El footer fue proyectado via <code>slot="drawerFooter"</code>.</p>

              <div slot="drawerFooter" class="drawer-footer-actions">
                <dcx-web-button label="Guardar" variant="primary" style="flex: 1;" @buttonClick=${() => this._visCustomFooter = false}></dcx-web-button>
                <dcx-web-button label="Cancelar" variant="secondary" style="flex: 1;" @buttonClick=${() => this._visCustomFooter = false}></dcx-web-button>
              </div>
            </dcx-web-drawer>
          </div>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-drawer': DcxWebPageDrawer;
  }
}