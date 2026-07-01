import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-dialog/dcx-web-dialog.component';

@customElement('dcx-web-page-dialog')
export class DcxWebPageDialog extends LitElement {

  @state() private accessor openDialogs: Record<string, boolean> = {};
  @state() private accessor position = 'center';

  private open(id: string) {
    this.openDialogs = { ...this.openDialogs, [id]: true };
  }

  private close(id: string) {
    this.openDialogs = { ...this.openDialogs, [id]: false };
  }

  private openPositioned(pos: string) {
    this.position = pos;
    this.open('positioned');
  }

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

    .mock-btn {
      padding:8px 16px;
      border:none;
      cursor:pointer;
      background:#0058ab;
      color:white;
      border-radius:4px;
    }

    .btn-secondary { background:white; color:#2a2e33; border:1px solid #2a2e33;}
    .btn-danger { background:#dc2626;}
  `;

  override render() {
    return html`
      <div class="demo-page">

        <!-- HEADER -->
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">Dialog</h1>
          <p class="demo-page-header__desc">
            Modal accesible gestionado mediante <code>DialogService</code>. Soporta 9 posiciones de pantalla,
            backdrop opcional y proyección de contenido vía <code>ng-template</code>.          
          </p>
          <hr class="demo-page-header__divider" />

        </header>

        <!-- 01 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span>Básico — Informativo</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('basic')}>Abrir diálogo</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['basic']}
              title="Información"
              @closeDialog=${() => this.close('basic')}
            >
              <div slot="body">
                <p>Este es un mensaje informativo dentro del diálogo.</p>
              </div>

              <div slot="footer">
                <button class="mock-btn" @click=${() => this.close('basic')}>Aceptar</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 02 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span>Confirmación — Con footer de acción</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('confirm')}>Abrir confirmación</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['confirm']}
              title="¿Confirmar acción?"
              .closeOnBackdrop=${false}
              @closeDialog=${() => this.close('confirm')}
            >
              <div slot="body">
                <p>¿Estás seguro?</p>
              </div>

              <div slot="footer">
                <button class="mock-btn btn-secondary" @click=${() => this.close('confirm')}>Cancelar</button>
                <button class="mock-btn" @click=${() => this.close('confirm')}>Aceptar</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 03 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span>Sin botón cierre</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('no-close')}>Abrir diálogo</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['no-close']}
              title="Acción requerida"
              .showClose=${false}
              .closeOnBackdrop=${false}
              @closeDialog=${() => this.close('no-close')}
            >
              <div slot="body"><p>Debes aceptar.</p></div>

              <div slot="footer">
                <button class="mock-btn btn-secondary" @click=${() => this.close('no-close')}>Cancelar</button>
                <button class="mock-btn" @click=${() => this.close('no-close')}>Aceptar</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 04 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span>Sin título</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('no-title')}>Abrir diálogo</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['no-title']}
              title=""
              @closeDialog=${() => this.close('no-title')}
            >
              <div slot="body"><p>Sin título</p></div>

              <div slot="footer">
                <button class="mock-btn" @click=${() => this.close('no-title')}>Cerrar</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 05 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span>Confirmación destructiva</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('destructive')}>Eliminar proyecto</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['destructive']}
              title="Eliminar proyecto"
              .closeOnBackdrop=${false}
              @closeDialog=${() => this.close('destructive')}
            >
              <div slot="body">
                <p>¿Eliminar Cloud Migration?</p>
              </div>

              <div slot="footer">
                <button class="mock-btn btn-secondary">Cancelar</button>
                <button class="mock-btn btn-danger">Eliminar</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 06 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span>Con formulario</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('form')}>Nuevo proyecto</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['form']}
              title="Nuevo proyecto"
              @closeDialog=${() => this.close('form')}
            >
              <div slot="body">
                <input placeholder="Nombre" />
              </div>

              <div slot="footer">
                <button class="mock-btn btn-secondary">Cancelar</button>
                <button class="mock-btn">Crear</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 07 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span>Informativo</span>
          </div>

          <div class="demo-section__body">
            <button class="mock-btn" @click=${() => this.open('info')}>Ver información</button>

            <dcx-web-dialog
              .visible=${this.openDialogs['info']}
              title="Información importante"
              @closeDialog=${() => this.close('info')}
            >
              <div slot="body">
                <p>Información importante.</p>
              </div>

              <div slot="footer">
                <button class="mock-btn">OK</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

        <!-- 08 -->
        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span>Posiciones — Todas las variantes</span>
          </div>

          <div class="demo-section__body">
            ${['top-left','top','top-right','left','center','right','bottom-left','bottom','bottom-right']
              .map(pos => html`
                <button class="mock-btn" @click=${() => this.openPositioned(pos)}>${pos}</button>
              `)}

            <dcx-web-dialog
              .visible=${this.openDialogs['positioned']}
              .position=${this.position}
              title=${`Posición: ${this.position}`}
              @closeDialog=${() => this.close('positioned')}
            >
              <div slot="body">
                <p>Posición: ${this.position}</p>
              </div>

              <div slot="footer">
                <button class="mock-btn" @click=${() => this.close('positioned')}>Cerrar</button>
              </div>
            </dcx-web-dialog>
          </div>
        </div>

      </div>
    `;
  }
}