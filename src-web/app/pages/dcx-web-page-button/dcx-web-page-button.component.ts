import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './dcx-web-page-button.component.styles';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';

const IconSvg = (name: string, slotName = 'dcx-icon') => {
  if (name === 'save')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
  if (name === 'arrow-right')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  if (name === 'trash')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2-2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
  if (name === 'search')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
  if (name === 'chevron-left')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
  if (name === 'chevron-right')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
  if (name === 'star-fill')
    return html`<svg slot=${slotName} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  return html``;
};

@customElement('dcx-web-page-button')
export class DcxWebPageButton extends LitElement {
  static override styles = styles;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Button</h1>
          <p class="demo-page-header__desc">
            Componente de botón base. Soporta múltiples variantes, tamaños, estados estáticos, iconos y tipos de formulario HTML nativos.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Tipos de botón</span>
          </div>
          <div class="demo-section__body">
            <form>
              <dcx-web-button label="Submit" type="submit" variant="primary"></dcx-web-button>
              <dcx-web-button label="Reset"  type="reset"  variant="primary"></dcx-web-button>
              <dcx-web-button label="Button" type="button" variant="primary"></dcx-web-button>
            </form>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Deshabilitado</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Disabled" variant="primary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Variantes</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Primary"   size="m" variant="primary"></dcx-web-button>
            <dcx-web-button label="Secondary" size="m" variant="secondary"></dcx-web-button>
            <dcx-web-button label="Terciary"  size="m" variant="terciary"></dcx-web-button>
            <dcx-web-button label="Danger"    size="m" variant="danger"></dcx-web-button>
            <dcx-web-button label="Text"      size="m" variant="text"></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Con icono</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Guardar"   size="m" variant="primary"   icon-position="left" icon-size="m">
              ${IconSvg('save', 'dcx-icon')}
            </dcx-web-button>
            <dcx-web-button label="Siguiente" size="m" variant="secondary" icon-position="left" icon-size="m">
              ${IconSvg('arrow-right', 'dcx-icon')}
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Estados — Primary</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="primary"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="primary" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="primary" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="primary" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="primary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Estados — Secondary</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="secondary"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="secondary" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="secondary" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="secondary" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="secondary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Estados — Terciary</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="terciary"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="terciary" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="terciary" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="terciary" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="terciary" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">09</span>
            <span class="demo-section__title">Estados — Danger</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="danger"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="danger" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="danger" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="danger" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="danger" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">10</span>
            <span class="demo-section__title">Estados — Text</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Default"  size="m" variant="text"></dcx-web-button>
            <dcx-web-button label="Hover"    size="m" variant="text" ?hover=${true}></dcx-web-button>
            <dcx-web-button label="Pressed"  size="m" variant="text" ?pressed=${true}></dcx-web-button>
            <dcx-web-button label="Focus"    size="m" variant="text" ?focused=${true}></dcx-web-button>
            <dcx-web-button label="Disabled" size="m" variant="text" ?disabled=${true}></dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">11</span>
            <span class="demo-section__title">Variantes por tamaño — Large</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Button" size="l" variant="primary"   icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="l" variant="secondary" icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="l" variant="terciary"  icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="l" variant="danger"    icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">12</span>
            <span class="demo-section__title">Variantes por tamaño — Medium</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Button" size="m" variant="primary"   icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="m" variant="secondary" icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="m" variant="terciary"  icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="m" variant="danger"    icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">13</span>
            <span class="demo-section__title">Variantes por tamaño — Small</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-button label="Button" size="s" variant="primary"   icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="s" variant="secondary" icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="s" variant="terciary"  icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
            <dcx-web-button label="Button" size="s" variant="danger"    icon-position="left" icon-size="s">
              ${IconSvg('chevron-left', 'dcx-icon')}
              ${IconSvg('chevron-right', 'button-trailing')}
            </dcx-web-button>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">14</span>
            <span class="demo-section__title">Botón como enlace</span>
          </div>
          <p class="demo-section__desc">Envuelve el componente en un <code>&lt;a&gt;</code> para navegación. El botón mantiene su apariencia visual.</p>
          <div class="demo-section__body">
            <a href="#" target="_blank">
              <dcx-web-button label="Enlace Primary"   variant="primary"></dcx-web-button>
            </a>
            <a href="#" target="_blank">
              <dcx-web-button label="Enlace Secondary" variant="secondary"></dcx-web-button>
            </a>
            <a href="#" target="_blank">
              <dcx-web-button label="Enlace Terciary"  variant="terciary"></dcx-web-button>
            </a>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">15</span>
            <span class="demo-section__title">Solo icono (accesible)</span>
          </div>
          <p class="demo-section__desc">Usa <code>ariaLabel</code> (input del componente) para proporcionar el nombre accesible al botón interno.</p>
          <div class="demo-section__body">
            <dcx-web-button size="s" variant="primary" variant="icon-only" aria-label="Guardar">
              ${IconSvg('save', 'dcx-icon')}
            </dcx-web-button>
            <dcx-web-button size="m" variant="primary" variant="icon-only" aria-label="Guardar">
              ${IconSvg('save', 'dcx-icon')}
            </dcx-web-button>
            <dcx-web-button size="l" variant="primary" variant="icon-only" aria-label="Guardar">
              ${IconSvg('save', 'dcx-icon')}
            </dcx-web-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-button': DcxWebPageButton;
  }
}
