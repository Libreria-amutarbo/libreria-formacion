import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';

import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgMessageComponent } from '../dcx-ng-message/dcx-ng-message.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';
import { DcxInputType } from '../../core/interfaces/input';
import {
  DcxFileUploadValue,
  DcxFileUploadDropzoneSize,
  DcxFileUploadItem,
} from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-file-upload',
  standalone: true,
  imports: [
    DcxNgButtonComponent,
    DcxNgIconComponent,
    DcxNgMessageComponent,
    DcxNgInputComponent,
  ],
  templateUrl: './dcx-ng-file-upload.component.html',
  styleUrl: './dcx-ng-file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgFileUploadComponent {
  @ViewChild('fileInput', { read: DcxNgInputComponent })
  fileInput?: DcxNgInputComponent;
  label = input<string>('Choose file');
  accept = input<string>('');
  disabled = input<boolean>(false);
  placeholder = input<string>('No file selected');
  dragAndDrop = input<boolean>(false);
  dropzoneSize = input<DcxFileUploadDropzoneSize>('small');
  multiple = input<boolean>(false);
  autoUpload = input<boolean>(false);

  fileSelected = output<DcxFileUploadValue>();
  DcxInputType = DcxInputType;

  uploadClicked = output<DcxFileUploadValue>();

  selectedFile = signal<File | null>(null);
  selectedFiles = signal<File[]>([]);
  selectedFileItems = computed<DcxFileUploadItem[]>(() =>
    this.selectedFiles().map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    })),
  );
  isLargeDropzone = computed(() => this.dropzoneSize() === 'large');
  hasSelectedFileItems = computed(() => this.selectedFileItems().length > 0);
  validationError = signal<string | null>(null);
  validationErrorMessage = computed(() => this.validationError() || '');

  isDragOver = signal<boolean>(false);

  contentClasses = computed<string>(() => {
    const base = 'dcx-file-upload__content';
    const stackedClass =
      this.dragAndDrop() && this.isLargeDropzone()
        ? 'dcx-file-upload__content--stacked'
        : '';

    return [base, stackedClass].filter(Boolean).join(' ');
  });

  dropzoneClasses = computed<string>(() => {
    const base = 'dcx-file-upload__dropzone';
    const size = this.dropzoneSize();
    const sizeClass =
      size === 'small'
        ? 'dcx-file-upload__dropzone--small'
        : size === 'large'
          ? 'dcx-file-upload__dropzone--large'
          : '';
    const dragOverClass = this.isDragOver()
      ? 'dcx-file-upload__dropzone--drag-over'
      : '';
    const disabledClass = this.disabled()
      ? 'dcx-file-upload__dropzone--disabled'
      : '';
    return [base, sizeClass, dragOverClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  });

  openFilePicker = (): void => {
    if (this.disabled()) return;
    const inputId = this.fileInput?.id?.();
    if (inputId) {
      const nativeInput = document.getElementById(inputId);
      if (nativeInput) (nativeInput as HTMLInputElement).click();
    }
  };

  onFileChange = (event: Event): void => {
    const inputElement = event.target as HTMLInputElement | null;
    const files = Array.from(inputElement?.files ?? []);
    const acceptedFiles = this.filterAcceptedFiles(files);
    if (acceptedFiles.length === 0 && files.length > 0) {
      return;
    }
    const selectedFiles = this.multiple()
      ? this.mergeUniqueFiles(this.selectedFiles(), acceptedFiles)
      : acceptedFiles.slice(0, 1);

    this.setSelectedFiles(selectedFiles);
  };

  onDragOver = (event: DragEvent): void => {
    if (this.disabled() || !this.dragAndDrop()) {
      return;
    }
    event.preventDefault();
    this.isDragOver.set(true);
  };

  onDragLeave = (event: DragEvent): void => {
    if (this.disabled() || !this.dragAndDrop()) {
      return;
    }
    event.preventDefault();
    this.isDragOver.set(false);
  };

  onDrop = (event: DragEvent): void => {
    if (this.disabled() || !this.dragAndDrop()) {
      return;
    }
    event.preventDefault();
    this.isDragOver.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    const acceptedFiles = this.filterAcceptedFiles(files);
    if (acceptedFiles.length === 0 && files.length > 0) {
      return;
    }
    const selectedFiles = this.multiple()
      ? this.mergeUniqueFiles(this.selectedFiles(), acceptedFiles)
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
    const acceptValue = this.accept().trim();
    if (!acceptValue) {
      this.validationError.set(null);
      return files;
    }

    const acceptedFiles = files.filter(file =>
      this.isFileAccepted(file, acceptValue),
    );
    const rejectedFiles = files.filter(
      file => !this.isFileAccepted(file, acceptValue),
    );

    if (rejectedFiles.length > 0) {
      this.validationError.set(
        `Invalid file type. Allowed types: ${acceptValue}`,
      );
    } else {
      this.validationError.set(null);
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
    this.fileInput?.resetNativeInput();

    this.selectedFiles.set(files);
    this.selectedFile.set(files[0] ?? null);

    const payload = this.multiple() ? files : (files[0] ?? null);
    this.fileSelected.emit(payload);

    if (
      this.autoUpload() &&
      files.length > 0 &&
      !this.disabled() &&
      !this.validationError()
    ) {
      this.uploadClicked.emit(payload);
      this.setSelectedFiles([]);
    }
  };

  onUploadClick = (): void => {
    if (this.disabled() || this.selectedFiles().length === 0) {
      return;
    }

    const payload = this.multiple()
      ? this.selectedFiles()
      : (this.selectedFiles()[0] ?? null);

    this.uploadClicked.emit(payload);
    this.setSelectedFiles([]);
  };

  onCancelClick = (): void => {
    if (this.disabled()) {
      return;
    }
    this.setSelectedFiles([]);
  };

  removeFile = (fileToRemove: File): void => {
    if (this.disabled()) {
      return;
    }

    const remainingFiles = this.selectedFiles().filter(
      file => file !== fileToRemove,
    );

    this.setSelectedFiles(remainingFiles);
  };
}
