import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { DcxContextMenuItem } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-context-menu/dcx-web-context-menu.component';

@customElement('dcx-web-page-context-menu')
export class DcxWebPageContextMenu extends LitElement {
  menuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save' },
    { text: 'Guardar como...', icon: 'save-fill' },
    { divider: true },
    { text: 'Eliminar', icon: 'trash', variant: 'danger' },
  ];

  advancedMenuItems: DcxContextMenuItem[] = [
    { text: 'Ver perfil', icon: 'person' },
    { text: 'Configuración', icon: 'gear' },
    { divider: true },
    {
      text: 'Más opciones',
      icon: 'three-dots',
      children: [
        { text: 'Opción 1', icon: 'check' },
        { text: 'Opción 2', icon: 'check' },
      ],
    },
    { divider: true },
    { text: 'Cerrar sesión', icon: 'box-arrow-right', variant: 'danger' },
  ];

  nestedMenuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    {
      text: 'Editar',
      icon: 'pencil',
      children: [
        { text: 'Deshacer', icon: 'arrow-counterclockwise' },
        { text: 'Rehacer', icon: 'arrow-clockwise' },
        { divider: true },
        {
          text: 'Transformar',
          icon: 'magic',
          children: [
            { text: 'Mayúsculas', icon: 'type' },
            { text: 'Minúsculas', icon: 'type' },
          ],
        },
      ],
    },
    { divider: true },
    { text: 'Eliminar', icon: 'trash', variant: 'danger' },
  ];

  disabledMenuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save', disabled: true },
    { text: 'Guardar como...', icon: 'save-fill', disabled: true },
    { divider: true },
    { text: 'Cerrar', icon: 'x-lg', disabled: true },
  ];

  dangerMenuItems: DcxContextMenuItem[] = [
    { text: 'Editar', icon: 'pencil' },
    { text: 'Duplicar', icon: 'copy' },
    { divider: true },
    { text: 'Archivar', icon: 'archive', variant: 'danger' },
    { text: 'Eliminar permanentemente', icon: 'trash', variant: 'danger' },
  ];

  private get _contextMenu1() { return this.shadowRoot?.querySelector('#contextMenu1') as any; }
  private get _contextMenu2() { return this.shadowRoot?.querySelector('#contextMenu2') as any; }
  private get _contextMenu3() { return this.shadowRoot?.querySelector('#contextMenu3') as any; }
  private get _contextMenu4() { return this.shadowRoot?.querySelector('#contextMenu4') as any; }
  private get _contextMenu5() { return this.shadowRoot?.querySelector('#contextMenu5') as any; }

  static override styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 860px;
      padding-bottom: 3rem;
    }

    .demo-page-header {
      margin-bottom: 2rem;
    }

    .demo-page-header__kicker {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #696e75;
      margin-bottom: .3rem;
    }

    .demo-page-header__title {
      font-size: 28px;
      font-weight: 700;
      color: #2a2e33;
      margin: 0 0 .6rem 0;
    }

    .demo-page-header__desc {
      font-size: 14px;
      line-height: 1.65;
      color: #696e75;
      max-width: 560px;
      margin: 0 0 1.25rem;
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 0;
    }

    .demo-section {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      background: #f4f5f7;
      border-bottom: 1px solid #e5e7eb;
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: 700;
      color: #696e75;
      background: #edf0f3;
      border-radius: 4px;
      padding: 2px 8px;
    }

    .demo-section__title {
      font-size: 13px;
      font-weight: 600;
      color: #2a2e33;
    }

    .demo-section__desc {
      padding: 10px 16px 0;
      font-size: 12px;
      line-height: 1.55;
      color: #696e75;
      margin: 0;
    }

    .demo-section__body {
      padding: 20px 16px;
    }

    .context-area {
      min-height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      border: 2px dashed var(--border-default, #2a2e33);
      border-radius: var(--r-md, 6px);
      cursor: context-menu;
    }

    .context-area p {
      margin: 0;
      font-size: 14px;
      color: var(--text-muted, #696e75);
    }

    .mock-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }
    .mock-btn-primary { background: #0058ab; color: #fff; }
    .mock-btn-secondary { background: #696e75; color: #fff; }
  `;

  openContextMenu(event: MouseEvent, menuNumber: number): void {
    event.preventDefault();
    const pos = { x: event.clientX, y: event.clientY };

    const menuMap: Record<number, any> = {
      1: this._contextMenu1,
      3: this._contextMenu3,
      4: this._contextMenu4,
      5: this._contextMenu5,
    };

    menuMap[menuNumber]?.open(pos);
  }

  openContextMenuFromButton(triggerElement: HTMLElement): void {
    const rect = triggerElement.getBoundingClientRect();
    const menuWidth = 240;
    const viewportPadding = 8;
    const menuX = Math.min(rect.left, window.innerWidth - menuWidth - viewportPadding);
    const pos = {
      x: Math.max(viewportPadding, menuX),
      y: rect.bottom + 4,
    };
    setTimeout(() => this._contextMenu2?.open(pos));
  }

  onItemSelected(item: DcxContextMenuItem): void {
    if (!item.text && !item.label) return;
    void item;
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Context Menu</h1>
          <p class="demo-page-header__desc">
            Menú contextual flotante con soporte de sublistas, items desactivados, variante danger y apertura programática.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Básico (clic derecho)</span>
          </div>
          <div class="demo-section__body">
            <div class="context-area" @contextmenu="${(e: MouseEvent) => this.openContextMenu(e, 1)}">
              <p>Haz clic derecho aquí para abrir el menú contextual</p>
            </div>
            <dcx-web-context-menu
              id="contextMenu1"
              .items="${this.menuItems}"
              .position="${{ x: 0, y: 0 }}"
              @item-selected="${(e: CustomEvent) => this.onItemSelected(e.detail)}"
            ></dcx-web-context-menu>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Trigger por botón</span>
          </div>
          <p class="demo-section__desc">
            El menú puede abrirse programáticamente desde cualquier elemento, no solo con clic derecho.
          </p>
          <div class="demo-section__body">
            <div id="buttonTrigger">
              <button
                class="mock-btn mock-btn-primary"
                @click="${(e: Event) => this.openContextMenuFromButton(e.currentTarget as HTMLElement)}"
              >
                Abrir menú contextual
              </button>
            </div>
            <dcx-web-context-menu
              id="contextMenu2"
              .items="${this.advancedMenuItems}"
              .position="${{ x: 0, y: 0 }}"
              @item-selected="${(e: CustomEvent) => this.onItemSelected(e.detail)}"
            ></dcx-web-context-menu>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Con sublistas</span>
          </div>
          <p class="demo-section__desc">
            Usa la tecla de flecha derecha para abrir un submenú con teclado y la tecla de flecha izquierda para volver.
          </p>
          <div class="demo-section__body">
            <div class="context-area" @contextmenu="${(e: MouseEvent) => this.openContextMenu(e, 3)}">
              <p>Haz clic derecho aquí para abrir el menú con sublistas</p>
            </div>
            <dcx-web-context-menu
              id="contextMenu3"
              .items="${this.nestedMenuItems}"
              .position="${{ x: 0, y: 0 }}"
              @item-selected="${(e: CustomEvent) => this.onItemSelected(e.detail)}"
            ></dcx-web-context-menu>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Items desactivados</span>
          </div>
          <p class="demo-section__desc">
            Los items con desactivado no son interactivos y tienen marcado el atributo aria-disabled.
          </p>
          <div class="demo-section__body">
            <div class="context-area" @contextmenu="${(e: MouseEvent) => this.openContextMenu(e, 4)}">
              <p>Haz clic derecho — "Guardar" y "Cerrar" están desactivados</p>
            </div>
            <dcx-web-context-menu
              id="contextMenu4"
              .items="${this.disabledMenuItems}"
              .position="${{ x: 0, y: 0 }}"
              @item-selected="${(e: CustomEvent) => this.onItemSelected(e.detail)}"
            ></dcx-web-context-menu>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Variante danger</span>
          </div>
          <p class="demo-section__desc">
            Usa la variante danger para marcar acciones destructivas en rojo.
          </p>
          <div class="demo-section__body">
            <div class="context-area" @contextmenu="${(e: MouseEvent) => this.openContextMenu(e, 5)}">
              <p>Haz clic derecho — "Archivar" y "Eliminar" usan la variante danger</p>
            </div>
            <dcx-web-context-menu
              id="contextMenu5"
              .items="${this.dangerMenuItems}"
              .position="${{ x: 0, y: 0 }}"
              @item-selected="${(e: CustomEvent) => this.onItemSelected(e.detail)}"
            ></dcx-web-context-menu>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-context-menu': DcxWebPageContextMenu;
  }
}
