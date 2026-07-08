import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DcxBreadcrumbItem } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/breadcrumb';
import {
  DcxBreadCrumbItemDefault,
  DcxBreadCrumbItemWithIcon,
  DcxBreadCrumbDisabled,
  DcxBreadCrumbOverflow,
} from '../../../../libs/dcx-web-lib/src/lib/core/defaults/breadcrumb';
import { pageBreadcrumbStyles } from './dcx-web-page-breadcrumb.component.styles';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-breadcrumb/dcx-web-breadcrumb.component';

@customElement('dcx-web-page-breadcrumb')
export class DcxWebPageBreadcrumb extends LitElement {
  @state() private accessor _selectedLabel: string | null = null;

  private _itemsChevron: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Proyectos', href: '#', disabled: false },
    { label: 'Cloud Migration', disabled: false },
  ];

  private _itemsSlash: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '#', disabled: false },
    { label: 'Clientes', href: '#', disabled: false },
    { label: 'Airbus', href: '#', disabled: false },
    { label: 'SAP S/4HANA', disabled: false },
  ];

  private _itemsArrow = DcxBreadCrumbItemDefault;
  private _itemsWithIcon = DcxBreadCrumbItemWithIcon;
  private _itemsDisabled = DcxBreadCrumbDisabled;

  private _itemsOverflow: DcxBreadcrumbItem[] = DcxBreadCrumbOverflow.map(item => ({
    ...item,
    href: undefined,
  }));

  static override styles = pageBreadcrumbStyles;

  private _handleItemSelected(event: CustomEvent<DcxBreadcrumbItem>) {
    this._selectedLabel = event.detail.label;
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Breadcrumb</h1>
          <p class="demo-page-header__desc">
            Muestra la ruta de navegación jerárquica hasta la página actual. Soporta separadores configurables, ítems con icono y menú desplegable cuando hay más de tres niveles.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default (chevron)</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-breadcrumb
              .items="${this._itemsChevron}"
              icon-separator="chevron-right"
            ></dcx-web-breadcrumb>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Con separador slash</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-breadcrumb
              .items="${this._itemsSlash}"
              icon-separator="slash-lg"
            ></dcx-web-breadcrumb>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Con separador arrow</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-breadcrumb
              .items="${this._itemsArrow}"
              icon-separator="arrow-right-short"
            ></dcx-web-breadcrumb>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Con iconos</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-breadcrumb
              .items="${this._itemsWithIcon}"
              icon-separator="chevron-right"
            ></dcx-web-breadcrumb>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Elementos deshabilitados</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-breadcrumb
              .items="${this._itemsDisabled}"
              icon-separator="chevron-right"
            ></dcx-web-breadcrumb>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Overflow (más de 3 niveles)</span>
          </div>
          <p class="demo-section__desc">Cuando hay más de tres ítems, los anteriores se agrupan bajo el botón "···". Haz clic en él para desplegar el menú con las rutas ocultas.</p>
          <div class="demo-section__body">
            <dcx-web-breadcrumb
              .items="${this._itemsOverflow}"
              icon-separator="chevron-right"
              @itemSelected="${this._handleItemSelected}"
            ></dcx-web-breadcrumb>
            ${this._selectedLabel
              ? html`
                  <p class="demo-overflow-feedback">
                    Ítem seleccionado: <strong>${this._selectedLabel}</strong>
                  </p>
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-breadcrumb': DcxWebPageBreadcrumb;
  }
}
