import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { dcxWebPageDialogStyles } from './dcx-web-page-dialog.component.styles';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-button/dcx-web-button.component';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-dialog/dcx-web-dialog.component';
import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-icon/dcx-web-icon.component';

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

      <header class="demo-page-header">
        <p class="demo-page-header__kicker">Components</p>
        <h1 class="demo-page-header__title">Dialog</h1>
        <p class="demo-page-header__desc">
          Modal accesible gestionado mediante <code>DialogService</code>. Soporta 9 posiciones de pantalla,
          backdrop opcional y proyección de contenido vía <code>ng-template</code>.
        </p>
        <hr class="demo-page-header__divider" />
      </header>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">01</span>
          <span class="demo-section__title">Básico — Informativo</span>
        </div>

        <div class="demo-section__body">
          <dcx-web-button label="Abrir diálogo" variant="primary" @buttonClick=${() => this.open('basic')}>
          </dcx-web-button>

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
              <dcx-web-button label="Aceptar" variant="primary" @buttonClick=${() => this.close('basic')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">02</span>
          <span class="demo-section__title">Confirmación — Con footer de acción</span>
        </div>

        <p class="demo-section__desc">
          <code>closeOnBackdrop="false"</code> fuerza una decisión explícita del usuario.
        </p>

        <div class="demo-section__body">
          <dcx-web-button label="Abrir confirmación" variant="primary" @buttonClick=${() => this.open('confirm')}>
          </dcx-web-button>

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
              <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=${() => this.close('confirm')}>
              </dcx-web-button>
              <dcx-web-button label="Aceptar" variant="primary" @buttonClick=${() => this.close('confirm')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">03</span>
          <span class="demo-section__title">Sin botón de cierre</span>
        </div>

        <p class="demo-section__desc">
          Solo se puede cerrar a través del footer o el backdrop.
        </p>

        <div class="demo-section__body">
          <dcx-web-button label="Abrir diálogo" variant="primary" @buttonClick=${() => this.open('no-close')}>
          </dcx-web-button>

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
              <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=${() => this.close('no-close')}>
              </dcx-web-button>
              <dcx-web-button label="Aceptar" variant="primary" @buttonClick=${() => this.close('no-close')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">04</span>
          <span class="demo-section__title">Sin título</span>
        </div>

        <p class="demo-section__desc">
          El header muestra solo el botón ✕ cuando <code>title</code> está vacío.
        </p>

        <div class="demo-section__body">
          <dcx-web-button label="Abrir diálogo" variant="primary" @buttonClick=${() => this.open('no-title')}>
          </dcx-web-button>

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
              <dcx-web-button label="Cerrar" variant="primary" @buttonClick=${() => this.close('no-title')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">05</span>
          <span class="demo-section__title">Confirmación destructiva</span>
        </div>

        <div class="demo-section__body">
          <dcx-web-button label="Eliminar proyecto" variant="primary" @buttonClick=${() => this.open('destructive')}>
          </dcx-web-button>

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
                
              <dcx-web-icon
                  name="trash"
                  size="m"
                  color="#dc2626"
                  aria-label="Eliminar"
              >
              </dcx-web-icon>
              </div>

              <p>
                ¿Estás seguro de que deseas eliminar el proyecto
                <strong>Cloud Migration</strong>?
                Esta acción es irreversible y no se puede deshacer.
              </p>
            </div>

            <div slot="footer">
              <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=${() => this.close('destructive')}>
              </dcx-web-button>
              <dcx-web-button label="Eliminar" variant="danger" @buttonClick=${() => this.close('destructive')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">06</span>
          <span class="demo-section__title">Con formulario</span>
        </div>

        <div class="demo-section__body">
          <dcx-web-button label="Nuevo proyecto" variant="primary" @buttonClick=${() => this.open('form')}>
          </dcx-web-button>

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
              <dcx-web-button label="Cancelar" variant="secondary" @buttonClick=${() => this.close('form')}>
              </dcx-web-button>
              <dcx-web-button label="Crear proyecto" variant="primary">
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">07</span>
          <span class="demo-section__title">Informativo</span>
        </div>

        <div class="demo-section__body">
          <dcx-web-button label="Ver información" variant="primary" @buttonClick=${() => this.open('info')}>
          </dcx-web-button>

          <dcx-web-dialog
            .visible=${this.openDialogs['info']}
            title="Información importante"
            @closeDialog=${() => this.close('info')}
          >
            <div slot="body">

              <div class="dialog-icon icon-info">
                
                <dcx-web-icon
                    name="info-circle"
                    size="m"
                    color="#1d4ed8"
                    aria-label="Información"
                  >
                  </dcx-web-icon>

              </div>

              <p>
                El proceso de migración comenzará el
                <strong>lunes 22 de abril</strong>.
                Durante este periodo algunos servicios podrían no estar disponibles temporalmente.
              </p>

            </div>

            <div slot="footer">
              <dcx-web-button label="Entendido" variant="primary" @buttonClick=${() => this.close('info')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>
        </div>
      </div>

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

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-up-left"
              aria-label="Top Left"
              @buttonClick=${() => this.openPositioned('top-left')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-up"
              aria-label="Top"
              @buttonClick=${() => this.openPositioned('top')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-up-right"
              aria-label="Top Right"
              @buttonClick=${() => this.openPositioned('top-right')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-left"
              aria-label="Left"
              @buttonClick=${() => this.openPositioned('left')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="circle-fill"
              aria-label="Center"
              @buttonClick=${() => this.openPositioned('center')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-right"
              aria-label="Right"
              @buttonClick=${() => this.openPositioned('right')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-down-left"
              aria-label="Bottom Left"
              @buttonClick=${() => this.openPositioned('bottom-left')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-down"
              aria-label="Bottom"
              @buttonClick=${() => this.openPositioned('bottom')}
            >
            </dcx-web-button>

            <dcx-web-button
              variant="primary"
              size="l"
              icon-name="arrow-down-right"
              aria-label="Bottom Right"
              @buttonClick=${() => this.openPositioned('bottom-right')}
            >
            </dcx-web-button>

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
              <dcx-web-button label="Cerrar" variant="primary" @buttonClick=${() => this.close('positioned')}>
              </dcx-web-button>
            </div>
          </dcx-web-dialog>

        </div>
      </div>

    </div>
  `;
} }