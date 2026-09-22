import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { DcxWebPopover } from '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-popover/dcx-web-popover.component';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-popover/dcx-web-popover.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-list/dcx-web-list.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-chip/dcx-web-chip.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-divider/dcx-web-divider.component';

@customElement('dcx-web-page-popover')
export class DcxWebPagePopover extends LitElement {
  private readonly actionItems = [
    { text: 'Edit', icon: 'pencil' },
    { text: 'Duplicate', icon: 'copy' },
    { divider: true },
    { text: 'Delete', icon: 'trash' },
  ];

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 860px;
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
      color: var(--text-dark, #2a2e33);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      line-height: 1.65;
      color: var(--text-muted, #696e75);
      max-width: 560px;
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
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      font-size: var(--fs-sm, 12px);
      line-height: 1.55;
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .button-container {
      display: inline-flex;
      align-items: center;
    }

    .demo-section__body--row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-4, 16px);
      align-items: center;
    }

    .user-info {
      min-width: 200px;
      display: flex;
      flex-direction: column;
    }

    .user-info__name {
      margin: 0 0 var(--sp-2, 8px) 0;
      font-size: var(--fs-base, 14px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-dark, #2a2e33);
      line-height: 1.3;
    }

    .user-info__role {
      margin: 0 0 var(--sp-1, 4px) 0;
      font-size: var(--fs-base, 14px);
      font-weight: var(--fw-medium, 500);
      color: var(--text-muted, #696e75);
      line-height: 1.4;
    }

    .user-info__email {
      margin: 0;
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-regular, 400);
      color: var(--text-placeholder, #9ca3af);
      line-height: 1.4;
    }

    dcx-web-list {
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .filter-container {
      min-width: 260px;
    }

    .filter-container__title {
      margin: 0 0 var(--sp-2, 8px) 0;
      font-size: var(--fs-base, 14px);
      font-weight: var(--fw-semibold, 600);
      color: var(--bg-primary, #0058ab);
      line-height: 1.3;
    }

    .filter-container__chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-2, 8px);
      margin-bottom: var(--sp-3, 12px);
      align-items: center;
    }

    dcx-web-divider {
      display: block;
      width: 100%;
      margin: var(--sp-3, 12px) 0;
    }

    .filter-container__actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: var(--sp-2, 8px);
      margin-top: var(--sp-3, 12px);
    }

    .scrollable-content {
      max-height: 200px;
      overflow-y: auto;
      padding-right: 6px;
    }

    .scrollable-content h3 {
      margin: 0 0 var(--sp-2, 8px) 0;
      font-size: var(--fs-md, 16px);
      font-weight: var(--fw-semibold, 600);
      color: var(--bg-primary, #0058ab);
      line-height: 1.3;
    }

    .scrollable-content p {
      margin: 0 0 var(--sp-2, 8px) 0;
      font-size: var(--fs-base, 14px);
      line-height: 1.5;
      color: var(--text-muted, #696e75);
    }

    .scrollable-content p:last-child {
      margin-bottom: 0;
    }

    .image-preview {
      min-width: 280px;
      max-width: 280px;
    }

    .image-preview__img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: var(--r-sm, 4px);
      margin: 0 0 var(--sp-3, 12px) 0;
      object-fit: cover;
    }

    .image-preview__title {
      margin: 0 0 var(--sp-2, 8px) 0;
      font-size: var(--fs-base, 14px);
      font-weight: var(--fw-semibold, 600);
      color: var(--bg-primary, #0058ab);
      line-height: 1.3;
    }

    .image-preview__description {
      margin: 0;
      font-size: var(--fs-base, 14px);
      line-height: 1.5;
      color: var(--text-muted, #696e75);
    }
  `;

  private togglePopover(
    popoverId: string,
    containerId: string,
    event: Event,
  ) {
    const popover = this.shadowRoot?.getElementById(popoverId) as DcxWebPopover | null;
    const container = this.shadowRoot?.getElementById(containerId) as HTMLElement | null;
    const target = container || (event.currentTarget as HTMLElement);

    popover?.toggle(event, target);
    this.requestUpdate();
  }

  private closePopover(popoverId: string) {
    const popover = this.shadowRoot?.getElementById(popoverId) as DcxWebPopover | null;
    popover?.hide();
    this.requestUpdate();
  }

  private isPopoverOpen(popoverId: string): boolean {
    const popover = this.shadowRoot?.getElementById(popoverId) as DcxWebPopover | null;
    return Boolean(popover?.isOpen);
  }

  private getPopoverPanelId(popoverId: string): string {
    const popover = this.shadowRoot?.getElementById(popoverId) as DcxWebPopover | null;
    return popover?.panelId ?? '';
  }

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Popover</h1>
          <p class="demo-page-header__desc">
            Overlay contextual que muestra contenido al activar un disparador. Se
            posiciona automáticamente, gestiona el foco (entra al abrir, vuelve al
            disparador al cerrar) y se cierra con Escape o clic fuera.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <div id="buttonContainer1" class="button-container">
              <dcx-web-button
                label="Open Popover"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover1')}"
                .ariaControls="${this.getPopoverPanelId('popover1')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover1', 'buttonContainer1', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover1" aria-label="Información">
              <h3>Popover Title</h3>
              <p>This is the content inside the popover. It can be any HTML or Angular component.</p>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Rich Content</span>
          </div>
          <div class="demo-section__body">
            <div id="buttonContainer2" class="button-container">
              <dcx-web-button
                label="User Info"
                variant="secondary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover2')}"
                .ariaControls="${this.getPopoverPanelId('popover2')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover2', 'buttonContainer2', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover2" aria-label="Información de usuario">
              <div class="user-info">
                <h4 class="user-info__name">John Doe</h4>
                <p class="user-info__role">Software Engineer</p>
                <p class="user-info__email">john.doe@example.com</p>
              </div>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">With Actions</span>
          </div>
          <p class="demo-section__desc">
            Lista de acciones dentro del popover; puede usarse como menú contextual ligero.
          </p>
          <div class="demo-section__body">
            <div id="buttonContainer3" class="button-container">
              <dcx-web-button
                label="Options"
                variant="terciary"
                aria-haspopup="menu"
                .ariaExpanded="${this.isPopoverOpen('popover3')}"
                .ariaControls="${this.getPopoverPanelId('popover3')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover3', 'buttonContainer3', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover3" role="menu" aria-label="Acciones">
              <dcx-web-list .items="${this.actionItems}" .selectable="${true}"></dcx-web-list>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">With Components</span>
          </div>
          <p class="demo-section__desc">
            Componentes de la librería: chips de filtro, divider y botones de acción.
          </p>
          <div class="demo-section__body">
            <div id="buttonContainer4" class="button-container">
              <dcx-web-button
                label="Filtrar"
                variant="secondary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover4')}"
                .ariaControls="${this.getPopoverPanelId('popover4')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover4', 'buttonContainer4', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover4" aria-label="Filtrar por etiqueta">
              <div class="filter-container">
                <p class="filter-container__title">Filtrar por etiqueta</p>
                <div class="filter-container__chips">
                  <dcx-web-chip label="Angular" color="primary" variant="filter"></dcx-web-chip>
                  <dcx-web-chip label="TypeScript" color="secondary" variant="filter"></dcx-web-chip>
                  <dcx-web-chip label="Design System" color="primary" variant="filter"></dcx-web-chip>
                  <dcx-web-chip label="Storybook" color="secondary" variant="filter"></dcx-web-chip>
                </div>
                <dcx-web-divider></dcx-web-divider>
                <div class="filter-container__actions">
                  <dcx-web-button label="Limpiar" variant="terciary" size="s"></dcx-web-button>
                  <dcx-web-button label="Aplicar" variant="primary" size="s"></dcx-web-button>
                </div>
              </div>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Long Content</span>
          </div>
          <p class="demo-section__desc">Contenido largo con scroll vertical interno.</p>
          <div class="demo-section__body">
            <div id="buttonContainer5" class="button-container">
              <dcx-web-button
                label="Ver detalles"
                variant="secondary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover5')}"
                .ariaControls="${this.getPopoverPanelId('popover5')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover5', 'buttonContainer5', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover5" aria-label="Descripción completa">
              <div class="scrollable-content">
                <h3>Descripción completa</h3>
                <p>Este componente permite mostrar información contextual de forma no intrusiva. Es ideal para tooltips enriquecidos, menús de acciones, detalles de usuario o cualquier contenido que deba aparecer al interactuar con un elemento de la interfaz.</p>
                <p>El popover se posiciona automáticamente respecto al elemento trigger y se cierra al hacer clic fuera o pulsando la tecla Escape. El ancho máximo está limitado para garantizar la legibilidad del contenido.</p>
                <p>Contenido adicional para forzar el scroll: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                <p>Más contenido para demostrar el scroll vertical: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              </div>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">With Image</span>
          </div>
          <p class="demo-section__desc">Imagen y descripción; ideal para vistas previas.</p>
          <div class="demo-section__body">
            <div id="buttonContainer6" class="button-container">
              <dcx-web-button
                label="Ver preview"
                variant="secondary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover6')}"
                .ariaControls="${this.getPopoverPanelId('popover6')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover6', 'buttonContainer6', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover6" aria-label="Vista previa de imagen">
              <div class="image-preview">
                <img src="https://picsum.photos/280/180" alt="Preview" class="image-preview__img">
                <h4 class="image-preview__title">Imagen de ejemplo</h4>
                <p class="image-preview__description">Este popover muestra cómo integrar imágenes junto con texto descriptivo.</p>
              </div>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Interactive</span>
          </div>
          <p class="demo-section__desc">
            Al abrir, el foco entra al popover; con <code>Escape</code> vuelve al
            disparador. También cierra al hacer clic fuera.
          </p>
          <div class="demo-section__body">
            <div id="buttonContainer7" class="button-container">
              <dcx-web-button
                label="Abrir menú"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover7')}"
                .ariaControls="${this.getPopoverPanelId('popover7')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover7', 'buttonContainer7', e)}"
              ></dcx-web-button>
            </div>
            <dcx-web-popover id="popover7" aria-label="Acciones rápidas">
              <div class="filter-container">
                <p class="filter-container__title">Acciones rápidas</p>
                <div class="filter-container__actions">
                  <dcx-web-button label="Guardar" variant="primary" size="s"></dcx-web-button>
                  <dcx-web-button label="Cerrar" variant="terciary" size="s" @buttonClick="${() => this.closePopover('popover7')}"></dcx-web-button>
                </div>
              </div>
            </dcx-web-popover>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Button Variants</span>
          </div>
          <p class="demo-section__desc">
            El popover puede abrirse desde botones con distintas variantes.
          </p>
          <div class="demo-section__body demo-section__body--row">
            <div id="buttonContainer8" class="button-container">
              <dcx-web-button
                label="Primary"
                variant="primary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover8')}"
                .ariaControls="${this.getPopoverPanelId('popover8')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover8', 'buttonContainer8', e)}"
              ></dcx-web-button>
              <dcx-web-popover id="popover8" aria-label="Popover Primary">
                <p>Popover desde botón Primary</p>
              </dcx-web-popover>
            </div>

            <div id="buttonContainer9" class="button-container">
              <dcx-web-button
                label="Secondary"
                variant="secondary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover9')}"
                .ariaControls="${this.getPopoverPanelId('popover9')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover9', 'buttonContainer9', e)}"
              ></dcx-web-button>
              <dcx-web-popover id="popover9" aria-label="Popover Secondary">
                <p>Popover desde botón Secondary</p>
              </dcx-web-popover>
            </div>

            <div id="buttonContainer10" class="button-container">
              <dcx-web-button
                label="Terciary"
                variant="terciary"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover10')}"
                .ariaControls="${this.getPopoverPanelId('popover10')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover10', 'buttonContainer10', e)}"
              ></dcx-web-button>
              <dcx-web-popover id="popover10" aria-label="Popover Terciary">
                <p>Popover desde botón Terciary</p>
              </dcx-web-popover>
            </div>

            <div id="buttonContainer11" class="button-container">
              <dcx-web-button
                label="Danger"
                variant="danger"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover11')}"
                .ariaControls="${this.getPopoverPanelId('popover11')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover11', 'buttonContainer11', e)}"
              ></dcx-web-button>
              <dcx-web-popover id="popover11" aria-label="Popover Danger">
                <p>Popover desde botón Danger</p>
              </dcx-web-popover>
            </div>

            <div id="buttonContainer12" class="button-container">
              <dcx-web-button
                .icon="${true}"
                icon-name="three-dots-vertical"
                variant="icon-only"
                aria-label="Más opciones"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover12')}"
                .ariaControls="${this.getPopoverPanelId('popover12')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover12', 'buttonContainer12', e)}"
              ></dcx-web-button>
              <dcx-web-popover id="popover12" aria-label="Popover icon-only">
                <p>Popover desde botón icon-only</p>
              </dcx-web-popover>
            </div>

            <div id="buttonContainer13" class="button-container">
              <dcx-web-button
                label="Text"
                variant="text"
                aria-haspopup="dialog"
                .ariaExpanded="${this.isPopoverOpen('popover13')}"
                .ariaControls="${this.getPopoverPanelId('popover13')}"
                @buttonClick="${(e: Event) => this.togglePopover('popover13', 'buttonContainer13', e)}"
              ></dcx-web-button>
              <dcx-web-popover id="popover13" aria-label="Popover Text">
                <p>Popover desde botón Text</p>
              </dcx-web-popover>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-popover': DcxWebPagePopover;
  }
}

