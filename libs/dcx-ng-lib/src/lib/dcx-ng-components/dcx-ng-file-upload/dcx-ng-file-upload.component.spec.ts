import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgFileUploadComponent } from './dcx-ng-file-upload.component';

describe('DcxNgFileUploadComponent', () => {
  let component: DcxNgFileUploadComponent;
  let fixture: ComponentFixture<DcxNgFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgFileUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render placeholder when no file is selected', () => {
    const placeholder = fixture.nativeElement.querySelector(
      '.dcx-file-upload__placeholder',
    ) as HTMLElement;

    expect(placeholder).toBeTruthy();
    expect(placeholder.textContent?.trim()).toBe('No file selected');
  });

  it('should open file picker when button is clicked', () => {
    const input = fixture.nativeElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');
    const button = fixture.nativeElement.querySelector(
      'dcx-ng-button button',
    ) as HTMLButtonElement;

    button.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not open file picker when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');
    const button = fixture.nativeElement.querySelector(
      'dcx-ng-button button',
    ) as HTMLButtonElement;

    button.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should set selected file and emit output on file selection', () => {
    const selectedFile = new File(['demo'], 'demo.txt', {
      type: 'text/plain',
    });
    const outputSpy = jest.fn();

    component.fileSelected.subscribe(outputSpy);

    component.onFileChange({
      target: { files: [selectedFile] },
    } as unknown as Event);
    fixture.detectChanges();

    expect(component.selectedFile()).toEqual(selectedFile);
    expect(outputSpy).toHaveBeenCalledWith(selectedFile);

    const fileName = fixture.nativeElement.querySelector(
      '.dcx-file-upload__file-name',
    ) as HTMLElement;
    expect(fileName.textContent?.trim()).toBe('demo.txt');
  });

  it('should emit uploadClicked with selected file when upload button is clicked', () => {
    const selectedFile = new File(['demo'], 'demo.txt', {
      type: 'text/plain',
    });
    component.selectedFiles.set([selectedFile]);
    component.selectedFile.set(selectedFile);
    fixture.detectChanges();

    const uploadSpy = jest.fn();
    component.uploadClicked.subscribe(uploadSpy);

    component.onUploadClick();
    expect(uploadSpy).toHaveBeenCalledWith(selectedFile);
  });

  it('should not emit uploadClicked if no file is selected', () => {
    const uploadSpy = jest.fn();
    component.uploadClicked.subscribe(uploadSpy);
    component.selectedFile.set(null);
    fixture.detectChanges();
    component.onUploadClick();
    expect(uploadSpy).not.toHaveBeenCalled();
  });

  it('should not emit uploadClicked if disabled', () => {
    const selectedFile = new File(['demo'], 'demo.txt', {
      type: 'text/plain',
    });
    component.selectedFiles.set([selectedFile]);
    component.selectedFile.set(selectedFile);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const uploadSpy = jest.fn();
    component.uploadClicked.subscribe(uploadSpy);
    component.onUploadClick();
    expect(uploadSpy).not.toHaveBeenCalled();
  });

  it('should emit null when file selection is cleared', () => {
    const outputSpy = jest.fn();

    component.fileSelected.subscribe(outputSpy);
    component.onFileChange({
      target: { files: [] },
    } as unknown as Event);

    expect(component.selectedFile()).toBeNull();
    expect(outputSpy).toHaveBeenCalledWith(null);
  });

  it('should set drag over state on drag events', () => {
    const preventDefault = jest.fn();
    fixture.componentRef.setInput('dragAndDrop', true);
    fixture.detectChanges();

    component.onDragOver({ preventDefault } as unknown as DragEvent);
    expect(preventDefault).toHaveBeenCalled();
    expect(component.isDragOver()).toBe(true);

    component.onDragLeave({ preventDefault } as unknown as DragEvent);
    expect(component.isDragOver()).toBe(false);
  });

  it('should set selected file when file is dropped', () => {
    const selectedFile = new File(['demo'], 'drop-demo.txt', {
      type: 'text/plain',
    });
    const outputSpy = jest.fn();
    const preventDefault = jest.fn();
    fixture.componentRef.setInput('dragAndDrop', true);
    fixture.detectChanges();

    component.fileSelected.subscribe(outputSpy);

    component.onDrop({
      preventDefault,
      dataTransfer: { files: [selectedFile] },
    } as unknown as DragEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(component.selectedFile()).toEqual(selectedFile);
    expect(outputSpy).toHaveBeenCalledWith(selectedFile);
  });

  it('should ignore drag and drop when disabled', () => {
    const preventDefault = jest.fn();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.onDragOver({ preventDefault } as unknown as DragEvent);
    component.onDrop({
      preventDefault,
      dataTransfer: {
        files: [new File(['demo'], 'drop-demo.txt', { type: 'text/plain' })],
      },
    } as unknown as DragEvent);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(component.selectedFile()).toBeNull();
  });

  it('should auto emit uploadClicked when autoUpload is true and file is selected', () => {
    const selectedFile = new File(['demo'], 'auto-demo.txt', {
      type: 'text/plain',
    });
    const uploadSpy = jest.fn();

    fixture.componentRef.setInput('autoUpload', true);
    fixture.detectChanges();

    component.uploadClicked.subscribe(uploadSpy);

    component.onFileChange({
      target: { files: [selectedFile] },
    } as unknown as Event);

    expect(uploadSpy).toHaveBeenCalledWith(selectedFile);
    expect(component.selectedFiles()).toEqual([]);
  });

  it('should hide manual upload button when autoUpload is true', () => {
    fixture.componentRef.setInput('autoUpload', true);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('dcx-ng-button');

    expect(buttons.length).toBe(1);
  });

  it('should render small dropzone variant by default when drag and drop is enabled', () => {
    fixture.componentRef.setInput('dragAndDrop', true);
    fixture.detectChanges();

    const dropzone = fixture.nativeElement.querySelector(
      '.dcx-file-upload__dropzone',
    ) as HTMLElement;

    expect(
      dropzone.classList.contains('dcx-file-upload__dropzone--small'),
    ).toBe(true);
  });

  it('should render large dropzone variant with icon when configured', () => {
    fixture.componentRef.setInput('dragAndDrop', true);
    fixture.componentRef.setInput('dropzoneSize', 'large');
    fixture.detectChanges();

    const dropzone = fixture.nativeElement.querySelector(
      '.dcx-file-upload__dropzone',
    ) as HTMLElement;
    const icon = fixture.nativeElement.querySelector(
      '.dcx-file-upload__dropzone-icon',
    ) as HTMLElement;

    expect(
      dropzone.classList.contains('dcx-file-upload__dropzone--large'),
    ).toBe(true);
    expect(icon).toBeTruthy();
  });

  it('should allow selecting multiple files when multiple is true', () => {
    const firstFile = new File(['one'], 'one.txt', {
      type: 'text/plain',
    });
    const secondFile = new File(['two'], 'two.txt', {
      type: 'text/plain',
    });
    const outputSpy = jest.fn();

    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    component.fileSelected.subscribe(outputSpy);

    component.onFileChange({
      target: { files: [firstFile, secondFile] },
    } as unknown as Event);
    fixture.detectChanges();

    expect(component.selectedFiles()).toEqual([firstFile, secondFile]);
    expect(outputSpy).toHaveBeenCalledWith([firstFile, secondFile]);
  });

  it('should clear selected files after upload in multiple mode', () => {
    const firstFile = new File(['one'], 'one.txt', {
      type: 'text/plain',
    });
    const secondFile = new File(['two'], 'two.txt', {
      type: 'text/plain',
    });
    const uploadSpy = jest.fn();

    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();

    component.selectedFiles.set([firstFile, secondFile]);
    component.selectedFile.set(firstFile);
    component.uploadClicked.subscribe(uploadSpy);

    component.onUploadClick();

    expect(uploadSpy).toHaveBeenCalledWith([firstFile, secondFile]);
    expect(component.selectedFiles()).toEqual([]);
    expect(component.selectedFile()).toBeNull();
  });

  it('should show validation error and block invalid file selection by accept', () => {
    const invalidFile = new File(['pdf'], 'document.pdf', {
      type: 'application/pdf',
    });
    const uploadSpy = jest.fn();

    fixture.componentRef.setInput('accept', 'image/*');
    fixture.detectChanges();
    component.uploadClicked.subscribe(uploadSpy);

    component.onFileChange({
      target: { files: [invalidFile] },
    } as unknown as Event);
    fixture.detectChanges();

    expect(component.selectedFiles()).toEqual([]);
    expect(component.validationError()).toContain('Allowed types: image/*');

    component.onUploadClick();
    expect(uploadSpy).not.toHaveBeenCalled();

    const messageBody = fixture.nativeElement.querySelector(
      '.message__container__paragraph',
    ) as HTMLElement;
    expect(messageBody.textContent?.trim()).toContain('Allowed types: image/*');
  });

  it('should keep previous valid files in multiple mode when dropped file is invalid', () => {
    const validFile = new File(['img'], 'photo.png', {
      type: 'image/png',
    });
    const invalidFile = new File(['pdf'], 'document.pdf', {
      type: 'application/pdf',
    });
    const preventDefault = jest.fn();

    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('accept', 'image/*');
    fixture.componentRef.setInput('dragAndDrop', true);
    fixture.detectChanges();

    component.selectedFiles.set([validFile]);
    component.selectedFile.set(validFile);

    component.onDrop({
      preventDefault,
      dataTransfer: { files: [invalidFile] },
    } as unknown as DragEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(component.selectedFiles()).toEqual([validFile]);
    expect(component.validationError()).toContain('Allowed types: image/*');
  });
});
