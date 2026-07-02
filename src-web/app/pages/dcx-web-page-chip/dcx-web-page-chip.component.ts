import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-chip/dcx-web-chip.component';
import { pageChipStyles } from './dcx-web-page-chip.component.styles';

@customElement('dcx-web-page-chip')
export class DcxWebPageChip extends LitElement {
  @state() private accessor _logs: string[] = [];

  private _handleRemove(label: string) {
    console.log(`Chip removido: ${label}`);
    this._logs = [...this._logs, `Chip removido: ${label}`];
  }

  static override styles = pageChipStyles;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Chip (Web Component)</h1>
          <p class="demo-page-header__desc">
            Etiqueta compacta con soporte de colores, icono, imagen y variante filter con botón de eliminación.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-chip label="Etiqueta simple"></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Colores</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip label="Primary" color="primary"></dcx-web-chip>
            <dcx-web-chip label="Secondary" color="secondary"></dcx-web-chip>
            <dcx-web-chip label="Success" color="success"></dcx-web-chip>
            <dcx-web-chip label="Warning" color="warning"></dcx-web-chip>
            <dcx-web-chip label="Error" color="error"></dcx-web-chip>
            <dcx-web-chip label="Info" color="info"></dcx-web-chip>
            <dcx-web-chip label="Gray" color="grey"></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Con icono</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip label="Home" icon="house" color="primary"></dcx-web-chip>
            <dcx-web-chip label="Usuario" icon="person" color="success"></dcx-web-chip>
            <dcx-web-chip label="Configuración" icon="gear" color="secondary"></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Con imagen</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip
              label="María García"
              image="https://picsum.photos/seed/mg/40/40"
              color="primary"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Carlos López"
              image="https://picsum.photos/seed/cl/40/40"
              color="secondary"
            ></dcx-web-chip>
            <dcx-web-chip
              label="Ana Martínez"
              image="https://picsum.photos/seed/am/40/40"
              color="success"
            ></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Variante filter (removible)</span>
          </div>
          <p class="demo-section__desc">
            Haz clic en la × para eliminar. Se puede activar con <code>variant="filter"</code> o con <code>removable="true"</code>.
          </p>
          <div class="demo-section__body chip-row">
            <dcx-web-chip
              label="via variant"
              color="primary"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('variant')}
            ></dcx-web-chip>
            <dcx-web-chip
              label="via removable"
              color="secondary"
              removable
              @dcx-chip-remove=${() => this._handleRemove('removable')}
            ></dcx-web-chip>
            <dcx-web-chip
              label="Con icono"
              color="warning"
              variant="filter"
              icon="star"
              @dcx-chip-remove=${() => this._handleRemove('icono')}
            ></dcx-web-chip>
            <dcx-web-chip
              label="Con imagen"
              color="success"
              variant="filter"
              image="https://picsum.photos/seed/mg/40/40"
              @dcx-chip-remove=${() => this._handleRemove('imagen')}
            ></dcx-web-chip>
          </div>
        </section>

        <section class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Variantes choice vs filter por color</span>
          </div>
          <div class="demo-section__body chip-row">
            <dcx-web-chip label="Info choice" color="info" variant="choice"></dcx-web-chip>
            <dcx-web-chip
              label="Info filter"
              color="info"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('Info')}
            ></dcx-web-chip>
            <dcx-web-chip label="Gray choice" color="grey" variant="choice"></dcx-web-chip>
            <dcx-web-chip
              label="Gray filter"
              color="grey"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('Gray')}
            ></dcx-web-chip>
            <dcx-web-chip label="Error choice" color="error" variant="choice"></dcx-web-chip>
            <dcx-web-chip
              label="Error filter"
              color="error"
              variant="filter"
              @dcx-chip-remove=${() => this._handleRemove('Error')}
            ></dcx-web-chip>
          </div>
        </section>
    `;
  }
}