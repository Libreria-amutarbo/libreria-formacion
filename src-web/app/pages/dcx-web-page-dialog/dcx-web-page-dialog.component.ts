import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dcxWebPageDialogStyles } from './dcx-web-page-dialog.component.styles';

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

  static override styles = dcxWebPageDialogStyles;

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
          <span class="demo-section__title">Básico — Informativo</span>
        </div>

        <div class="demo-section__body">
          <button class="mock-btn btn-primary" @click=${() => this.open('basic')}>
            Abrir diálogo
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['basic']}
            title="Información"
            .showClose=${true}
            .position=${'center'}
            .closeOnBackdrop=${true}
            @closeDialog=${() => this.close('basic')}
          >
            <div slot="body">
              <p>Este es un mensaje informativo dentro del diálogo.</p>
            </div>

            <div slot="footer">
              <button class="mock-btn btn-primary" @click=${() => this.close('basic')}>
                Aceptar
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 02 -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">02</span>
          <span class="demo-section__title">Confirmación — Con footer de acción</span>
        </div>

        <p class="demo-section__desc">
          <code>closeOnBackdrop="false"</code> fuerza una decisión explícita del usuario.
        </p>

        <div class="demo-section__body">
          <button class="mock-btn" @click=${() => this.open('confirm')}>
            Abrir confirmación
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['confirm']}
            title="¿Confirmar acción?"
            .showClose=${true}
            .position=${'center'}
            .closeOnBackdrop=${false}
            @closeDialog=${() => this.close('confirm')}
          >
            <div slot="body">
              <p>¿Estás seguro de que quieres continuar? Esta acción no se puede deshacer.</p>
            </div>

            <div slot="footer">
              <button class="mock-btn btn-secondary" @click=${() => this.close('confirm')}>
                Cancelar
              </button>
              <button class="mock-btn btn-primary" @click=${() => this.close('confirm')}>
                Aceptar
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 03 -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">03</span>
          <span class="demo-section__title">Sin botón de cierre</span>
        </div>

        <p class="demo-section__desc">
          Solo se puede cerrar a través del footer o el backdrop.
        </p>

        <div class="demo-section__body">
          <button class="mock-btn btn-primary" @click=${() => this.open('no-close')}>
            Abrir diálogo
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['no-close']}
            title="Acción requerida"
            .showClose=${false}
            .position=${'center'}
            .closeOnBackdrop=${false}
            @closeDialog=${() => this.close('no-close')}
          >
            <div slot="body">
              <p>Debes aceptar los términos para continuar.</p>
            </div>

            <div slot="footer">
              <button class="mock-btn btn-secondary" @click=${() => this.close('no-close')}>
                Cancelar
              </button>
              <button class="mock-btn btn-primary" @click=${() => this.close('no-close')}>
                Aceptar
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 04 -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">04</span>
          <span class="demo-section__title">Sin título</span>
        </div>

        <p class="demo-section__desc">
          El header muestra solo el botón ✕ cuando <code>title</code> está vacío.
        </p>

        <div class="demo-section__body">
          <button class="mock-btn btn-primary" @click=${() => this.open('no-title')}>
            Abrir diálogo
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['no-title']}
            title=""
            .showClose=${true}
            .position=${'center'}
            .closeOnBackdrop=${true}
            @closeDialog=${() => this.close('no-title')}
          >
            <div slot="body">
              <p>Este diálogo no tiene título en el header.</p>
            </div>

            <div slot="footer">
              <button class="mock-btn btn-primary" @click=${() => this.close('no-title')}>
                Cerrar
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 05 -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">05</span>
          <span class="demo-section__title">Confirmación destructiva</span>
        </div>

        <div class="demo-section__body">
          <button class="mock-btn" @click=${() => this.open('destructive')}>
            Eliminar proyecto
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['destructive']}
            title="Eliminar proyecto"
            .showClose=${true}
            .position=${'center'}
            .closeOnBackdrop=${false}
            @closeDialog=${() => this.close('destructive')}
          >
            <div slot="body">
              <div class="dialog-icon icon-danger">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4h4M3 6h14M5 6l1 10h8l1-10"
                    stroke="#dc2626" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              <p>
                ¿Estás seguro de que deseas eliminar el proyecto
                <strong>Cloud Migration</strong>?
                Esta acción es irreversible y no se puede deshacer.
              </p>
            </div>

            <div slot="footer">
              <button class="mock-btn btn-secondary" @click=${() => this.close('destructive')}>
                Cancelar
              </button>
              <button class="mock-btn btn-danger">
                Eliminar
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 06 -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">06</span>
          <span class="demo-section__title">Con formulario</span>
        </div>

        <div class="demo-section__body">
          <button class="mock-btn" @click=${() => this.open('form')}>
            Nuevo proyecto
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['form']}
            title="Nuevo proyecto"
            @closeDialog=${() => this.close('form')}
          >
            <div slot="body">

              <div class="dcx-field">
                <label class="dcx-label" for="dialog-project-name">Nombre del proyecto</label>
                <input id="dialog-project-name" class="dcx-input"
                  type="text" placeholder="Ej: Cloud Migration v2">
              </div>

              <div class="dcx-field">
                <label class="dcx-label" for="dialog-client">Cliente</label>
                <input id="dialog-client" class="dcx-input"
                  type="text" placeholder="Ej: Airbus">
              </div>

              <div class="dcx-field">
                <label class="dcx-label" for="dialog-practice">Práctica</label>
                <select id="dialog-practice" class="dcx-select">
                  <option value="">Selecciona una práctica</option>
                  <option>Cloud Infrastructure</option>
                  <option>SAP</option>
                  <option>Data & AI</option>
                </select>
              </div>

            </div>

            <div slot="footer">
              <button class="mock-btn btn-secondary" @click=${() => this.close('form')}>
                Cancelar
              </button>
              <button class="mock-btn btn-primary">
                Crear proyecto
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 07 -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">07</span>
          <span class="demo-section__title">Informativo</span>
        </div>

        <div class="demo-section__body">
          <button class="mock-btn btn-primary" @click=${() => this.open('info')}>
            Ver información
          </button>

          <dcx-web-dialog
            .visible=${this.openDialogs['info']}
            title="Información importante"
            @closeDialog=${() => this.close('info')}
          >
            <div slot="body">

              <div class="dialog-icon icon-info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#1d4ed8" stroke-width="1.5"/>
                  <path d="M10 9v5M10 7v.5"
                    stroke="#1d4ed8" stroke-width="1.5"
                    stroke-linecap="round"/>
                </svg>
              </div>

              <p>
                El proceso de migración comenzará el
                <strong>lunes 22 de abril</strong>.
                Durante este periodo algunos servicios podrían no estar disponibles temporalmente.
              </p>

            </div>

            <div slot="footer">
              <button class="mock-btn btn-primary" @click=${() => this.close('info')}>
                Entendido
              </button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <!-- 08 — Posiciones -->
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">08</span>
          <span class="demo-section__title">Posiciones — Todas las variantes</span>
        </div>

        <p class="demo-section__desc">
          Cada botón abre el diálogo en la posición que indica su flecha.
        </p>

        <div class="demo-section__body">

          <div id="positioned-dialogs">

            <button class="mock-btn" @click=${() => this.openPositioned('top-left')}>↖</button>
            <button class="mock-btn" @click=${() => this.openPositioned('top')}>↑</button>
            <button class="mock-btn" @click=${() => this.openPositioned('top-right')}>↗</button>

            <button class="mock-btn" @click=${() => this.openPositioned('left')}>←</button>
            <button class="mock-btn" @click=${() => this.openPositioned('center')}>·</button>
            <button class="mock-btn" @click=${() => this.openPositioned('right')}>→</button>

            <button class="mock-btn" @click=${() => this.openPositioned('bottom-left')}>↙</button>
            <button class="mock-btn" @click=${() => this.openPositioned('bottom')}>↓</button>
            <button class="mock-btn" @click=${() => this.openPositioned('bottom-right')}>↘</button>

          </div>

          <dcx-web-dialog
            .visible=${this.openDialogs['positioned']}
            .title=${'Posición: ' + this.position}
            .showClose=${true}
            .position=${this.position}
            .closeOnBackdrop=${true}
            @closeDialog=${() => this.close('positioned')}
          >
            <div slot="body">
              <p>
                Este diálogo está posicionado en
                <strong>${this.position}</strong>.
              </p>
            </div>

            <div slot="footer">
              <button class="mock-btn"
                @click=${() => this.close('positioned')}>
                Cerrar
              </button>
            </div>
          </dcx-web-dialog>

        </div>
      </div>

    </div>
  `;
} }