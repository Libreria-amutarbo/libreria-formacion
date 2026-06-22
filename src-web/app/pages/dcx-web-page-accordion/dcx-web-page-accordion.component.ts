import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsDisabled,
  DcxAccordionItemsContentDisabled,
  DcxAccordionLargeContent,
  DcxAccordionItemsWithDescription,
  LIST_ITEMS_MOCK,
  DcxWebAccordionItem,
} from '../../../../libs/dcx-web-lib/src';

@customElement('dcx-web-page-accordion')
export class DcxWebPageAccordion extends LitElement {
  @state() private accessor _externalExpandedMap = {} as Record<
    string,
    boolean
  >;
  @state() private accessor _listItems = [...LIST_ITEMS_MOCK];

  defaultItems = DcxAccordionDefault;
  withIcons = DcxAccordionItemsWithIcon;
  withDisabledItems = DcxAccordionItemsDisabled;
  withContentDisabledItems = DcxAccordionItemsContentDisabled;
  multipleOpenItems = DcxAccordionItemsWithExpanded;
  fastTransitionItems = DcxAccordionDefault;
  slowTransitionItems = DcxAccordionDefault;
  noTransitionItems = DcxAccordionDefault;
  largeContentItems = DcxAccordionLargeContent;
  withDescriptionItems = DcxAccordionItemsWithDescription;

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

    .demo-section__body {
      padding: 20px 16px;
    }

    .demo-section__desc {
      padding: 10px 16px 0;
      font-size: 12px;
      line-height: 1.55;
      color: #696e75;
      margin: 0;
    }

    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 12px;
      color: #1f2937;
    }

    dcx-web-accordion {
      display: block;
      margin-bottom: 1rem;
    }

    .api-btn {
      padding: 8px 12px;
      background: #0058ab;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      font-family: var(--ff-base, 'Inter', sans-serif);
      transition: background-color 0.15s ease-in-out;
    }

    .api-btn:hover {
      background: #003d7a;
    }
  `;

  private _onItemToggled(e: CustomEvent) {
    const item = e.detail;
    const acc = this.shadowRoot?.querySelector('#external-accordion') as any;
    if (!acc) return;
    const next = {} as Record<string, boolean>;
    next[item.id] = acc.isExpanded(item.id);
    this._externalExpandedMap = next;
  }

  private _toggleExternalItem(id: string) {
    const acc = this.shadowRoot?.querySelector('#external-accordion') as any;
    if (!acc) return;
    if (acc.isExpanded(id)) {
      acc.collapseItemById(id);
    } else {
      acc.expandItemById(id);
    }
  }

  private _getExternalButtonLabel(item: any) {
    const isExpanded = !!this._externalExpandedMap[item.id];
    return isExpanded ? `Cerrar: ${item.title}` : `Abrir: ${item.title}`;
  }

  private _expandAll() {
    const acc = this.shadowRoot?.querySelector('#expand-all-accordion') as any;
    acc?.expandAll();
  }

  private _collapseAll() {
    const acc = this.shadowRoot?.querySelector('#expand-all-accordion') as any;
    acc?.collapseAll();
  }

  private _buttonTemplate() {
    return html`
      <div style="display:flex; gap:8px; flex-wrap:wrap; padding:8px 0;">
        <button class="api-btn">Primary Action</button>
        <button class="api-btn" style="background:#696e75;">Secondary Action</button>
      </div>
    `;
  }

  private _formTemplate() {
    return html`
      <div style="display:flex; flex-direction:column; gap:12px; padding:8px 0; max-width:320px;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-size:12px; font-weight:600;">Nombre</label>
          <input type="text" placeholder="Escribe tu nombre..." style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px;" />
        </div>
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-size:12px; font-weight:600;">Email</label>
          <input type="email" placeholder="tu@email.com" style="padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px;" />
        </div>
        <button class="api-btn">Enviar</button>
      </div>
    `;
  }

  private _listTemplate() {
    return html`
      <div style="padding:8px 0;">
        <ul style="margin: 0 0 12px 0; padding-left: 20px;">
          ${this._listItems.map(item => html`<li>${item}</li>`)}
        </ul>
        <div style="margin-top:12px; display:flex; gap:8px;">
          <button class="api-btn" @click=${this._addListItem}>Añadir</button>
          <button class="api-btn" style="background:#696e75;" @click=${this._removeListItem}>Eliminar último</button>
        </div>
      </div>
    `;
  }

  private _addListItem() {
    this._listItems = [
      ...this._listItems,
      `Item ${this._listItems.length + 1}`,
    ];
  }

  private _removeListItem() {
    if (this._listItems.length > 0) {
      this._listItems = this._listItems.slice(0, -1);
    }
  }

  get withComponents(): DcxWebAccordionItem[] {
    return [
      {
        id: '1',
        title: 'Interactive Buttons',
        icon: 'hand-pointer',
        contentTemplate: () => this._buttonTemplate(),
      },
      {
        id: '2',
        title: 'Form Components',
        icon: 'file-text',
        contentTemplate: () => this._formTemplate(),
      },
      {
        id: '3',
        title: 'Dynamic List',
        icon: 'list',
        contentTemplate: () => this._listTemplate(),
      },
    ];
  }

  override render() {
    return html`
      <div class="demo-page">

        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Accordion</h1>
          <p class="demo-page-header__desc">
            Panel de contenido expandible. Permite mostrar u ocultar secciones de
            información de forma organizada, con soporte para transiciones, iconos,
            control externo y contenido enriquecido.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.defaultItems}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">With Icons</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.withIcons}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">With Description</span>
          </div>
          <p class="demo-section__desc">
            Cada item puede incluir un subtítulo bajo el título principal mediante el
            campo <code>description</code>.
          </p>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.withDescriptionItems}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">With Disabled Items</span>
          </div>
          <p class="demo-section__desc">
            Los items con <code>disabled: true</code> no se pueden abrir ni reciben
            foco mediante teclado.
          </p>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.withDisabledItems}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">With Content Disabled</span>
          </div>
          <p class="demo-section__desc">
            <code>disabledContent: true</code> muestra el panel abierto pero desactiva
            la interacción con su contenido interno.
          </p>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.withContentDisabledItems}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Multiple Open</span>
          </div>
          <p class="demo-section__desc">
            Con <code>?closeOthers=\${false}</code> varios paneles pueden estar abiertos
            simultáneamente.
          </p>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.multipleOpenItems} ?closeOthers=${false}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Large Content</span>
          </div>
          <p class="demo-section__desc">
            Cuando el contenido es muy extenso, <code>maxContentHeight</code> limita la
            altura del panel y activa el scroll interno.
          </p>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.largeContentItems}></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Fast Transition</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.fastTransitionItems} transition="fast"></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">Slow Transition</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.slowTransitionItems} transition="slow"></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">No Transition</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-accordion .items=${this.noTransitionItems} transition="none"></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">External Control</span>
          </div>
          <p class="demo-section__desc">
            Controla el acordeón desde fuera usando <code>expandItemById</code> y
            <code>collapseItemById</code>. El label de cada botón cambia al abrir o
            cerrar el panel, incluso si interactúas directamente con la cabecera.
          </p>
          <div class="demo-section__body">
            <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
              ${this.defaultItems.map(item => {
                if (item.disabled) return nothing;
                return html`
                    <button
                      class="api-btn"
                      style="background: ${this._externalExpandedMap[item.id] ? '#0058ab' : '#696e75'};"
                      @click=${() => this._toggleExternalItem(item.id)}
                    >
                      ${this._getExternalButtonLabel(item)}
                    </button>
                  `;
              })}
            </div>
            <dcx-web-accordion
              id="external-accordion"
              .items=${this.defaultItems}
              transition="smooth"
              @itemToggled=${this._onItemToggled}
            ></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">13</span>
            <span class="demo-section__title">Expand / Collapse All</span>
          </div>
          <p class="demo-section__desc">
            Los métodos públicos <code>expandAll()</code> y <code>collapseAll()</code>
            permiten controlar todos los paneles de golpe desde fuera del componente.
          </p>
          <div class="demo-section__body">
            <div style="display:flex; gap:8px; margin-bottom:16px;">
              <button class="api-btn" @click=${this._expandAll}>Expandir todo</button>
              <button class="api-btn" style="background:#696e75;" @click=${this._collapseAll}>Colapsar todo</button>
            </div>
            <dcx-web-accordion
              id="expand-all-accordion"
              .items=${this.defaultItems}
              ?closeOthers=${false}
            ></dcx-web-accordion>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">14</span>
            <span class="demo-section__title">Flush</span>
          </div>
          <p class="demo-section__desc">
            La variante <code>flush</code> elimina el borde exterior y el
            border-radius. Ideal para incrustar el acordeón dentro de otra card u
            otro contenedor con borde propio.
          </p>
          <div class="demo-section__body" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; padding:0;">
            <dcx-web-accordion .items=${this.withIcons} variant="flush"></dcx-web-accordion>
          </div>
        </div>

      </div>
    `;
  }
}
