import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './dcx-web-file-upload.component.styles';
import { template } from './dcx-web-file-upload.component.html';

import '../dcx-web-button/dcx-web-button.component';
import '../dcx-web-icon/dcx-web-icon.component';
import '../dcx-web-message/dcx-web-message.component';
import '../dcx-web-input/dcx-web-input.component';
import '../dcx-web-spinner/dcx-web-spinner.component';

import type {
  DcxFileUploadDropzoneSize,
  DcxFileUploadItem,
} from '../../core/interfaces';

@customElement('dcx-web-file-upload')
export class DcxWebFileUpload extends LitElement {
  @property({ type: String }) accessor label = 'Choose file';
  @property({ type: String }) accessor accept = '';
  @property({ type: Boolean }) accessor disabled = false;
  @property({ type: Boolean }) accessor loading = false;
  @property({ type: String }) accessor placeholder = 'No file selected';
  @property({ type: Boolean, attribute: 'drag-and-drop' })
  accessor dragAndDrop = false;
  @property({ type: String, attribute: 'dropzone-size', reflect: true })
  accessor dropzoneSize: DcxFileUploadDropzoneSize = 'small';
  @property({ type: Boolean }) accessor multiple = false;
  @property({ type: Boolean, attribute: 'auto-upload' }) accessor autoUpload =
    false;

  @state() accessor selectedFile: File | null = null;
  @state() accessor selectedFiles: File[] = [];
  @state() accessor validationError: string | null = null;
  @state() accessor isDragOver = false;

  static override styles = styles;

  private _attachedNativeInput: HTMLInputElement | null = null;
  private _nativeChangeHandler = (e: Event) => this.onFileChange(e);

  override firstUpdated(): void {
    this.attachNativeInputListener();
  }

  override disconnectedCallback(): void {
    if (this._attachedNativeInput) {
      this._attachedNativeInput.removeEventListener(
        'change',
        this._nativeChangeHandler,
      );
      this._attachedNativeInput = null;
    }
    super.disconnectedCallback();
  }

  get selectedFileItems(): DcxFileUploadItem[] {
    return this.selectedFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
  }

  get isLargeDropzone(): boolean {
    return this.dropzoneSize === 'large';
  }

  get hasSelectedFileItems(): boolean {
    return this.selectedFileItems.length > 0;
  }

  get validationErrorMessage(): string {
    return this.validationError || '';
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get dropzoneClasses(): string {
    const base = 'dcx-file-upload__dropzone';
    const size = this.dropzoneSize;
    const sizeClass =
      size === 'small'
        ? 'dcx-file-upload__dropzone--small'
        : size === 'large'
          ? 'dcx-file-upload__dropzone--large'
          : '';
    const dragOverClass = this.isDragOver
      ? 'dcx-file-upload__dropzone--drag-over'
      : '';
    const disabledClass = this.isDisabled
      ? 'dcx-file-upload__dropzone--disabled'
      : '';
    return [base, sizeClass, dragOverClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  }

  formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  openFilePicker = (): void => {
    if (this.isDisabled) return;
    const webInput = this.shadowRoot?.querySelector('dcx-web-input');
    if (webInput) {
      const nativeInput =
        webInput.shadowRoot?.querySelector<HTMLInputElement>(
          'input[type="file"]',
        ) || webInput.querySelector<HTMLInputElement>('input[type="file"]');
      if (nativeInput) {
        if (this.accept) {
          nativeInput.setAttribute('accept', this.accept);
        } else {
          nativeInput.removeAttribute('accept');
        }
        this.attachNativeInputListener();
        nativeInput.click();
      }
    }
  };

  private attachNativeInputListener(): void {
    const webInput = this.shadowRoot?.querySelector('dcx-web-input');
    if (!webInput) return;

    const nativeInput =
      webInput.shadowRoot?.querySelector<HTMLInputElement>(
        'input[type="file"]',
      ) || webInput.querySelector<HTMLInputElement>('input[type="file"]');

    if (!nativeInput) return;

    if (this._attachedNativeInput === nativeInput) return;

    if (this._attachedNativeInput) {
      this._attachedNativeInput.removeEventListener(
        'change',
        this._nativeChangeHandler,
      );
    }

    nativeInput.addEventListener('change', this._nativeChangeHandler);
    this._attachedNativeInput = nativeInput;
  }

  onFileChange = (event: Event): void => {
    const target = event.composedPath?.()[0] as HTMLInputElement | undefined;
    const inputElement =
      target && 'files' in target && target.files
        ? target
        : (
            event.target as HTMLElement
          )?.shadowRoot?.querySelector<HTMLInputElement>(
            'input[type="file"]',
          ) || (event.target as HTMLInputElement | null);

    const files = Array.from(inputElement?.files ?? []);
    const acceptedFiles = this.filterAcceptedFiles(files);
    if (acceptedFiles.length === 0 && files.length > 0) {
      return;
    }
    const selectedFiles = this.multiple
      ? this.mergeUniqueFiles(this.selectedFiles, acceptedFiles)
      : acceptedFiles.slice(0, 1);

    this.setSelectedFiles(selectedFiles);
  };

  onDragOver = (event: DragEvent): void => {
    if (this.isDisabled || !this.dragAndDrop) {
      return;
    }
    event.preventDefault();
    this.isDragOver = true;
  };

  onDragLeave = (event: DragEvent): void => {
    if (this.isDisabled || !this.dragAndDrop) {
      return;
    }
    event.preventDefault();
    this.isDragOver = false;
  };

  onDrop = (event: DragEvent): void => {
    if (this.isDisabled || !this.dragAndDrop) {
      return;
    }
    event.preventDefault();
    this.isDragOver = false;
    const files = Array.from(event.dataTransfer?.files ?? []);
    const acceptedFiles = this.filterAcceptedFiles(files);
    if (acceptedFiles.length === 0 && files.length > 0) {
      return;
    }
    const selectedFiles = this.multiple
      ? this.mergeUniqueFiles(this.selectedFiles, acceptedFiles)
      : acceptedFiles.slice(0, 1);

    this.setSelectedFiles(selectedFiles);
  };

  private mergeUniqueFiles = (
    currentFiles: File[],
    newFiles: File[],
  ): File[] => {
    const allFiles = [...currentFiles, ...newFiles];
    return allFiles.filter(
      (file, idx, arr) =>
        arr.findIndex(
          candidate =>
            candidate.name === file.name &&
            candidate.size === file.size &&
            candidate.lastModified === file.lastModified,
        ) === idx,
    );
  };

  private filterAcceptedFiles = (files: File[]): File[] => {
    const acceptValue = this.accept.trim();
    if (!acceptValue) {
      this.validationError = null;
      return files;
    }

    const acceptedFiles = files.filter(file =>
      this.isFileAccepted(file, acceptValue),
    );
    const rejectedFiles = files.filter(
      file => !this.isFileAccepted(file, acceptValue),
    );

    if (rejectedFiles.length > 0) {
      this.validationError = `Invalid file type. Allowed types: ${acceptValue}`;
    } else {
      this.validationError = null;
    }

    return acceptedFiles;
  };

  private isFileAccepted = (file: File, acceptValue: string): boolean => {
    const acceptTokens = acceptValue
      .split(',')
      .map(token => token.trim().toLowerCase())
      .filter(Boolean);

    if (acceptTokens.length === 0) {
      return true;
    }

    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    return acceptTokens.some(token => {
      if (token.startsWith('.')) {
        return fileName.endsWith(token);
      }

      if (token.endsWith('/*')) {
        const prefix = token.slice(0, -1);
        return fileType.startsWith(prefix);
      }

      return fileType === token;
    });
  };

  private setSelectedFiles = (files: File[]): void => {
    const webInput = this.shadowRoot?.querySelector('dcx-web-input');
    if (webInput) {
      const nativeInput =
        webInput.shadowRoot?.querySelector<HTMLInputElement>(
          'input[type="file"]',
        ) || webInput.querySelector<HTMLInputElement>('input[type="file"]');
      if (nativeInput) {
        nativeInput.value = '';
      }
    }

    this.selectedFiles = files;
    this.selectedFile = files[0] ?? null;

    const payload = this.multiple ? files : (files[0] ?? null);
    this.dispatchEvent(
      new CustomEvent('fileSelected', {
        detail: payload,
        bubbles: true,
        composed: true,
      }),
    );

    if (
      this.autoUpload &&
      files.length > 0 &&
      !this.isDisabled &&
      !this.validationError
    ) {
      this.dispatchEvent(
        new CustomEvent('uploadClicked', {
          detail: payload,
          bubbles: true,
          composed: true,
        }),
      );
      this.setSelectedFiles([]);
    }
  };

  onUploadClick = (): void => {
    if (this.isDisabled || this.selectedFiles.length === 0) {
      return;
    }

    const payload = this.multiple
      ? this.selectedFiles
      : (this.selectedFiles[0] ?? null);

    this.dispatchEvent(
      new CustomEvent('uploadClicked', {
        detail: payload,
        bubbles: true,
        composed: true,
      }),
    );
    this.setSelectedFiles([]);
  };

  onCancelClick = (): void => {
    if (this.isDisabled) {
      return;
    }
    this.setSelectedFiles([]);
  };

  removeFile = (fileToRemove: File): void => {
    if (this.isDisabled) {
      return;
    }

    const remainingFiles = this.selectedFiles.filter(
      file => file !== fileToRemove,
    );

    this.setSelectedFiles(remainingFiles);
  };

  override render() {
    return template(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-file-upload': DcxWebFileUpload;
  }
}
