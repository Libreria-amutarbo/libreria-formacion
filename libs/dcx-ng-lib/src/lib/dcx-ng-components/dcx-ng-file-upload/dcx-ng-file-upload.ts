import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-file-upload',
  standalone: true,
  imports: [DcxNgButtonComponent],
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

  fileSelected = output<File | null>();

  uploadClicked = output<File | null>();

  selectedFile = signal<File | null>(null);

  openFilePicker = (): void => {
    if (this.disabled()) {
      return;
    }

    this.fileInput?.nativeElement.click();
  };

  onFileChange = (event: Event): void => {
    const inputElement = event.target as HTMLInputElement | null;
    const file = inputElement?.files?.[0] ?? null;

    this.selectedFile.set(file);
    this.fileSelected.emit(file);
  };

  onUploadClick = (): void => {
    if (this.disabled() || !this.selectedFile()) {
      return;
    }
    this.uploadClicked.emit(this.selectedFile());
  };
}
