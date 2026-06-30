import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './dcx-web-page-context-menu.component.styles';
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

  static override styles = styles;

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
