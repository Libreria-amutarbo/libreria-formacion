import { html, nothing } from 'lit';
import type { DcxWebFileUpload } from './dcx-web-file-upload.component';
import { DcxInputType } from '../../core/interfaces/input';

export const template = (host: DcxWebFileUpload) => {
  return html`
    <div class="dcx-file-upload">
      ${
        host.validationError
          ? html`
            <dcx-web-message
              class="dcx-file-upload__validation-message"
              type="error"
              .body="${host.validationErrorMessage}"
              .icon="${true}"
              iconName="exclamation-circle"
            ></dcx-web-message>
          `
          : nothing
      }

      <div class="dcx-file-upload__content">
        <dcx-web-input
          class="dcx-file-upload__input"
          .type="${DcxInputType.FILE}"
          accept="${host.accept || nothing}"
          .ariaLabel="${host.label}"
          ?multiple="${host.multiple}"
          ?disabled="${host.isDisabled}"
        ></dcx-web-input>

        ${
          host.dragAndDrop
            ? html`
              <div
                class="${host.dropzoneClasses}"
                role="region"
                aria-label="Zona de arrastre de archivos"
                @dragover="${host.onDragOver}"
                @dragleave="${host.onDragLeave}"
                @drop="${host.onDrop}"
              >
                <button
                  class="dcx-file-upload__zone-btn"
                  type="button"
                  ?disabled="${host.isDisabled}"
                  @click="${host.openFilePicker}"
                >
                  <dcx-web-icon name="upload" size="m" aria-hidden="true"></dcx-web-icon>
                  <span>${host.label}</span>
                </button>

                ${
                  !host.multiple &&
                  host.hasSelectedFileItems &&
                  !host.isLargeDropzone
                    ? html`
                      <span class="dcx-file-upload__file-name">${host.selectedFileItems[0].name}</span>
                      <button
                        class="dcx-file-upload__remove-btn"
                        type="button"
                        aria-label="Remove ${host.selectedFileItems[0].name}"
                        ?disabled="${host.isDisabled}"
                        @click="${() => host.removeFile(host.selectedFileItems[0].file)}"
                      >
                        <dcx-web-icon name="x" size="m" aria-hidden="true"></dcx-web-icon>
                      </button>
                    `
                    : !host.hasSelectedFileItems
                      ? html`
                      <span class="dcx-file-upload__placeholder">${host.placeholder}</span>
                      ${
                        !host.isLargeDropzone
                          ? html`<span class="dcx-file-upload__drop-hint">Drag and drop a file here</span>`
                          : nothing
                      }
                    `
                      : nothing
                }
              </div>
            `
            : html`
              <div
                class="dcx-file-upload__zone ${host.isDisabled ? 'dcx-file-upload__zone--disabled' : ''} ${host.validationError ? 'dcx-file-upload__zone--error' : ''}"
              >
                <button
                  class="dcx-file-upload__zone-btn"
                  type="button"
                  ?disabled="${host.isDisabled}"
                  @click="${host.openFilePicker}"
                >
                  <dcx-web-icon name="upload" size="m" aria-hidden="true"></dcx-web-icon>
                  <span>${host.label}</span>
                </button>

                ${
                  !host.multiple &&
                  host.hasSelectedFileItems &&
                  !host.isLargeDropzone
                    ? html`
                      <span class="dcx-file-upload__file-name">${host.selectedFileItems[0].name}</span>
                      <button
                        class="dcx-file-upload__remove-btn"
                        type="button"
                        aria-label="Remove ${host.selectedFileItems[0].name}"
                        ?disabled="${host.isDisabled}"
                        @click="${() => host.removeFile(host.selectedFileItems[0].file)}"
                      >
                        <dcx-web-icon name="x" size="m" aria-hidden="true"></dcx-web-icon>
                      </button>
                    `
                    : !host.hasSelectedFileItems
                      ? html`<span class="dcx-file-upload__placeholder">${host.placeholder}</span>`
                      : nothing
                }
              </div>
            `
        }

        ${
          host.hasSelectedFileItems && (host.multiple || host.isLargeDropzone)
            ? html`
              <ul role="list" class="dcx-file-upload__file-list">
                ${host.selectedFileItems.map(
                  fileItem => html`
                    <li class="dcx-file-upload__file-item">
                      <dcx-web-icon
                        name="file-earmark"
                        size="m"
                        aria-hidden="true"
                        class="dcx-file-upload__file-icon"
                      ></dcx-web-icon>
                      <span class="dcx-file-upload__file-name">${fileItem.name}</span>
                      <span class="dcx-file-upload__file-size">${host.formatFileSize(fileItem.size)}</span>
                      <button
                        class="dcx-file-upload__remove-btn"
                        type="button"
                        aria-label="Remove ${fileItem.name}"
                        ?disabled="${host.isDisabled}"
                        @click="${() => host.removeFile(fileItem.file)}"
                      >
                        <dcx-web-icon name="x" size="m" aria-hidden="true"></dcx-web-icon>
                      </button>
                    </li>
                  `,
                )}
              </ul>
            `
            : nothing
        }

        ${
          !host.autoUpload || host.multiple || host.loading
            ? html`
              <div class="dcx-file-upload__actions">
                ${
                  host.loading
                    ? html`
                      <dcx-web-spinner size="s" title="Subiendo archivo..." .delay="${0}"></dcx-web-spinner>
                    `
                    : html`
                      ${
                        !host.autoUpload
                          ? html`
                            <dcx-web-button
                              label="Upload"
                              variant="secondary"
                              type="button"
                              ?disabled="${host.isDisabled || !host.hasSelectedFileItems || !!host.validationError}"
                              @buttonClick="${host.onUploadClick}"
                              class="dcx-file-upload__upload-button"
                            ></dcx-web-button>
                          `
                          : nothing
                      }
                      ${
                        host.multiple
                          ? html`
                            <dcx-web-button
                              label="Cancel"
                              variant="danger"
                              type="button"
                              ?disabled="${host.isDisabled || !host.hasSelectedFileItems}"
                              @buttonClick="${host.onCancelClick}"
                              class="dcx-file-upload__cancel-button"
                            ></dcx-web-button>
                          `
                          : nothing
                      }
                    `
                }
              </div>
            `
            : nothing
        }
      </div>
    </div>
  `;
};
