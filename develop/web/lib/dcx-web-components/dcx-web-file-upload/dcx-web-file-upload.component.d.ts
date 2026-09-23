import { LitElement } from 'lit';
import { DcxFileUploadDropzoneSize, DcxFileUploadItem } from '../../core/interfaces';
export declare class DcxWebFileUpload extends LitElement {
    accessor label: string;
    accessor accept: string;
    accessor disabled: boolean;
    accessor loading: boolean;
    accessor placeholder: string;
    accessor dragAndDrop: boolean;
    accessor dropzoneSize: DcxFileUploadDropzoneSize;
    accessor multiple: boolean;
    accessor autoUpload: boolean;
    accessor selectedFile: File | null;
    accessor selectedFiles: File[];
    accessor validationError: string | null;
    accessor isDragOver: boolean;
    static styles: import('lit').CSSResult;
    private _attachedNativeInput;
    private _nativeChangeHandler;
    firstUpdated(): void;
    disconnectedCallback(): void;
    get selectedFileItems(): DcxFileUploadItem[];
    get isLargeDropzone(): boolean;
    get hasSelectedFileItems(): boolean;
    get validationErrorMessage(): string;
    get isDisabled(): boolean;
    get dropzoneClasses(): string;
    formatFileSize: (bytes: number) => string;
    private getNativeFileInput;
    openFilePicker: () => void;
    private attachNativeInputListener;
    onFileChange: (event: Event) => void;
    onDragOver: (event: DragEvent) => void;
    onDragLeave: (event: DragEvent) => void;
    onDrop: (event: DragEvent) => void;
    private mergeUniqueFiles;
    private filterAcceptedFiles;
    private isFileAccepted;
    private setSelectedFiles;
    onUploadClick: () => void;
    onCancelClick: () => void;
    removeFile: (fileToRemove: File) => void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-file-upload': DcxWebFileUpload;
    }
}
