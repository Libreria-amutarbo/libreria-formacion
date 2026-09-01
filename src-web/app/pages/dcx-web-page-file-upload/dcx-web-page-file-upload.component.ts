import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-file-upload/dcx-web-file-upload.component';

@customElement('dcx-web-page-file-upload')
export class DcxWebPageFileUpload extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
      box-sizing: border-box;
    }

    .demo-page {
      width: 100%;
      max-width: 1060px;
      padding-bottom: var(--sp-12, 48px);
      box-sizing: border-box;
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-dark, #2a2e33);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      line-height: 1.65;
      color: var(--text-muted, #696e75);
      max-width: 560px;
      margin: 0 0 var(--sp-5, 20px);
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      margin-bottom: var(--sp-5, 20px);
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      font-size: var(--fs-sm, 12px);
      line-height: 1.55;
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }
  `;

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">File Upload</h1>
          <p class="demo-page-header__desc">
            Campo de selección de archivos con soporte de botón clásico y zona de arrastre.
            Admite filtrado por tipo MIME/extensión, selección múltiple y subida automática.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">01</span>
            <span class="demo-section__title">Default</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-file-upload></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">02</span>
            <span class="demo-section__title">Solo imágenes</span>
          </div>
          <p class="demo-section__desc">
            El input <code>accept</code> filtra la selección a imágenes. Si se elige un archivo no permitido, se muestra un mensaje de error.
          </p>
          <div class="demo-section__body">
            <dcx-web-file-upload
              label="Select image"
              accept="image/*"
              placeholder="No image selected"
            ></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">03</span>
            <span class="demo-section__title">Auto upload</span>
          </div>
          <p class="demo-section__desc">
            Con <code>autoUpload</code> activo, se emite <code>uploadClicked</code> automáticamente al seleccionar el archivo sin necesidad de pulsar el botón manual.
          </p>
          <div class="demo-section__body">
            <dcx-web-file-upload
              label="Browse"
              .autoUpload=${true}
              placeholder=""
            ></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">04</span>
            <span class="demo-section__title">Drag and drop</span>
          </div>
          <p class="demo-section__desc">
            Zona de arrastre compacta. Se puede arrastrar un archivo sobre el área punteada o usar el botón.
          </p>
          <div class="demo-section__body">
            <dcx-web-file-upload .dragAndDrop=${true}></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">05</span>
            <span class="demo-section__title">Dropzone grande</span>
          </div>
          <p class="demo-section__desc">
            Zona de arrastre grande con icono y layout centrado.
          </p>
          <div class="demo-section__body">
            <dcx-web-file-upload
              .dragAndDrop=${true}
              dropzone-size="large"
            ></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">06</span>
            <span class="demo-section__title">Múltiples archivos</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-file-upload
              label="Choose files"
              .dragAndDrop=${true}
              dropzone-size="large"
              .multiple=${true}
              placeholder="No files selected"
            ></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">07</span>
            <span class="demo-section__title">Disabled</span>
          </div>
          <div class="demo-section__body">
            <dcx-web-file-upload .disabled=${true}></dcx-web-file-upload>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section__header">
            <span class="demo-section__num">08</span>
            <span class="demo-section__title">Error de validación</span>
          </div>
          <p class="demo-section__desc">
            Arrastra o selecciona un archivo no permitido (ej. un PDF) para ver el mensaje de error.
          </p>
          <div class="demo-section__body">
            <dcx-web-file-upload
              label="Select image"
              accept="image/*"
              .dragAndDrop=${true}
              dropzone-size="large"
              placeholder="No image selected"
            ></dcx-web-file-upload>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-file-upload': DcxWebPageFileUpload;
  }
}
