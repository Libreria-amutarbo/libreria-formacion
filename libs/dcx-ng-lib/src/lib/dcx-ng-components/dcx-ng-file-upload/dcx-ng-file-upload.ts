import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';
import {
  DcxFileUploadItem,
  DcxFileUploadValue,
  DcxFileUploadDropzoneSize,
  DcxNgButtonComponent,
  DcxNgIconComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-file-upload',
  standalone: true,
  imports: [DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-file-upload.html',
  styleUrl: './dcx-ng-file-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgFileUploadComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  label = input<string>('Choose file');
  accept = input<string>('');
  disabled = input<boolean>(false);
  placeholder = input<string>('No file selected');
  dragAndDrop = input<boolean>(false);
  dropzoneSize = input<DcxFileUploadDropzoneSize>('small');
  multiple = input<boolean>(false);
  autoUpload = input<boolean>(false);

  fileSelected = output<DcxFileUploadValue>();

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

  isDragOver = signal<boolean>(false);

  dropzoneClasses = computed<string>(() => {
    const base = 'dcx-file-upload__dropzone';
    return [
      base,
      this.getDropzoneSizeClass(),
      this.getDropzoneDragOverClass(),
      this.getDropzoneDisabledClass(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  private getDropzoneSizeClass(): string {
    const size = this.dropzoneSize();
    if (size === 'small') return 'dcx-file-upload__dropzone--small';
    if (size === 'large') return 'dcx-file-upload__dropzone--large';
    return '';
  }

  private getDropzoneDragOverClass(): string {
    return this.isDragOver() ? 'dcx-file-upload__dropzone--drag-over' : '';
  }

  private getDropzoneDisabledClass(): string {
    return this.disabled() ? 'dcx-file-upload__dropzone--disabled' : '';
  }

  openFilePicker = (): void => {
    if (this.disabled()) {
      return;
    }

    this.fileInput?.nativeElement.click();
  };

  onFileChange = (event: Event): void => {
    const inputElement = event.target as HTMLInputElement | null;
    const files = Array.from(inputElement?.files ?? []);
    const selectedFiles = this.multiple() ? files : files.slice(0, 1);

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
    const selectedFiles = this.multiple() ? files : files.slice(0, 1);
    this.setSelectedFiles(selectedFiles);
  };

  private setSelectedFiles = (files: File[]): void => {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

    this.selectedFiles.set(files);
    this.selectedFile.set(files[0] ?? null);

    const payload = this.multiple() ? files : (files[0] ?? null);
    this.fileSelected.emit(payload);

    if (this.autoUpload() && files.length > 0 && !this.disabled()) {
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
