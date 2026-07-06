import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styles } from './dcx-web-page-accordion.component.styles';
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

  static override styles = styles;

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
      <div style="display:flex; gap:var(--sp-2, 8px); flex-wrap:wrap; padding:var(--sp-2, 8px) 0;">
        <dcx-web-button label="Primary Action" variant="primary"></dcx-web-button>
        <dcx-web-button label="Secondary Action" variant="secondary"></dcx-web-button>
        <dcx-web-button label="Outline Action" variant="terciary"></dcx-web-button>
      </div>
    `;
  }

  private _formTemplate() {
    return html`
      <div style="display:flex; flex-direction:column; gap:var(--sp-3, 12px); padding:var(--sp-2, 8px) 0; max-width:320px;">
        <div style="display:flex; flex-direction:column; gap:var(--sp-1, 4px);">
          <label style="font-size:var(--fs-sm, 12px); font-weight:var(--fw-semibold, 600);">Nombre</label>
          <input type="text" placeholder="Escribe tu nombre..." style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <div style="display:flex; flex-direction:column; gap:var(--sp-1, 4px);">
          <label style="font-size:var(--fs-sm, 12px); font-weight:var(--fw-semibold, 600);">Email</label>
          <input type="email" placeholder="tu@email.com" style="padding: 6px 10px; border: 1px solid var(--border-light, #d1d5db); border-radius: var(--r-sm, 4px);" />
        </div>
        <dcx-web-button label="Enviar" variant="primary"></dcx-web-button>
      </div>
    `;
  }

  private _listTemplate() {
    return html`
      <div style="padding:var(--sp-2, 8px) 0;">
        <ul style="margin: 0 0 var(--sp-3, 12px) 0; padding-left: var(--sp-5, 20px);">
          ${this._listItems.map(item => html`<li>${item}</li>`)}
        </ul>
        <div style="margin-top:var(--sp-3, 12px); display:flex; gap:var(--sp-2, 8px);">
          <dcx-web-button label="Añadir" variant="primary" @click=${this._addListItem}></dcx-web-button>
          <dcx-web-button label="Eliminar último" variant="secondary" @click=${this._removeListItem}></dcx-web-button>
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
            <dcx-web-accordion .items=${this.multipleOpenItems} .closeOthers=${false}></dcx-web-accordion>
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
                    <dcx-web-button
                      label=${this._getExternalButtonLabel(item)}
                      variant=${this._externalExpandedMap[item.id] ? 'primary' : 'secondary'}
                      @click=${() => this._toggleExternalItem(item.id)}
                    ></dcx-web-button>
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
              <dcx-web-button label="Expandir todo" variant="primary" @click=${this._expandAll}></dcx-web-button>
              <dcx-web-button label="Colapsar todo" variant="secondary" @click=${this._collapseAll}></dcx-web-button>
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
