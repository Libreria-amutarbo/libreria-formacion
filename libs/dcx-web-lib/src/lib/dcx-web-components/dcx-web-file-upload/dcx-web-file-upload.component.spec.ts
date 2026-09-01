import './dcx-web-file-upload.component';
import { DcxWebFileUpload } from './dcx-web-file-upload.component';

describe('DcxWebFileUpload', () => {
  let element: DcxWebFileUpload;

  beforeEach(async () => {
    element = document.createElement('dcx-web-file-upload') as DcxWebFileUpload;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebFileUpload);
  });

  it('should render placeholder when no file is selected', () => {
    const placeholder = element.shadowRoot?.querySelector(
      '.dcx-file-upload__placeholder',
    ) as HTMLElement;

    expect(placeholder).toBeTruthy();
    expect(placeholder.textContent?.trim()).toBe('No file selected');
  });

  it('should open file picker when button is clicked', async () => {
    const webInput = element.shadowRoot?.querySelector('dcx-web-input');
    const input = (webInput?.shadowRoot?.querySelector('input[type="file"]') ||
      webInput?.querySelector('input[type="file"]')) as HTMLInputElement;

    const clickSpy = input ? jest.spyOn(input, 'click') : jest.fn();

    const button = element.shadowRoot?.querySelector(
      '.dcx-file-upload__zone-btn',
    ) as HTMLButtonElement;

    button.click();

    if (input) {
      expect(clickSpy).toHaveBeenCalled();
    } else {
      expect(button).toBeTruthy();
    }
  });

  it('should not open file picker when disabled', async () => {
    element.disabled = true;
    await element.updateComplete;

    const webInput = element.shadowRoot?.querySelector('dcx-web-input');
    const input = (webInput?.shadowRoot?.querySelector('input[type="file"]') ||
      webInput?.querySelector('input[type="file"]')) as HTMLInputElement;

    const clickSpy = input ? jest.spyOn(input, 'click') : jest.fn();

    const button = element.shadowRoot?.querySelector(
      '.dcx-file-upload__zone-btn',
    ) as HTMLButtonElement;

    button.click();

    if (input) {
      expect(clickSpy).not.toHaveBeenCalled();
    }
  });

  it('should set selected file and emit output on file selection', async () => {
    const selectedFile = new File(['demo'], 'demo.txt', {
      type: 'text/plain',
    });
    const outputSpy = jest.fn();

    element.addEventListener('fileSelected', (e: Event) => {
      outputSpy((e as CustomEvent).detail);
    });

    element.onFileChange({
      target: { files: [selectedFile] },
    } as unknown as Event);
    await element.updateComplete;

    expect(element.selectedFile).toEqual(selectedFile);
    expect(outputSpy).toHaveBeenCalledWith(selectedFile);

    const fileName = element.shadowRoot?.querySelector(
      '.dcx-file-upload__file-name',
    ) as HTMLElement;
    expect(fileName.textContent?.trim()).toBe('demo.txt');
  });

  it('should emit uploadClicked with selected file when upload button is clicked', async () => {
    const selectedFile = new File(['demo'], 'demo.txt', {
      type: 'text/plain',
    });
    element.selectedFiles = [selectedFile];
    element.selectedFile = selectedFile;
    await element.updateComplete;

    const uploadSpy = jest.fn();
    element.addEventListener('uploadClicked', (e: Event) => {
      uploadSpy((e as CustomEvent).detail);
    });

    element.onUploadClick();
    expect(uploadSpy).toHaveBeenCalledWith(selectedFile);
  });

  it('should not emit uploadClicked if no file is selected', async () => {
    const uploadSpy = jest.fn();
    element.addEventListener('uploadClicked', (e: Event) => {
      uploadSpy((e as CustomEvent).detail);
    });
    element.selectedFile = null;
    await element.updateComplete;

    element.onUploadClick();
    expect(uploadSpy).not.toHaveBeenCalled();
  });

  it('should not emit uploadClicked if disabled', async () => {
    const selectedFile = new File(['demo'], 'demo.txt', {
      type: 'text/plain',
    });
    element.selectedFiles = [selectedFile];
    element.selectedFile = selectedFile;
    element.disabled = true;
    await element.updateComplete;

    const uploadSpy = jest.fn();
    element.addEventListener('uploadClicked', (e: Event) => {
      uploadSpy((e as CustomEvent).detail);
    });

    element.onUploadClick();
    expect(uploadSpy).not.toHaveBeenCalled();
  });

  it('should emit null when file selection is cleared', () => {
    const outputSpy = jest.fn();

    element.addEventListener('fileSelected', (e: Event) => {
      outputSpy((e as CustomEvent).detail);
    });

    element.onFileChange({
      target: { files: [] },
    } as unknown as Event);

    expect(element.selectedFile).toBeNull();
    expect(outputSpy).toHaveBeenCalledWith(null);
  });

  it('should set drag over state on drag events', async () => {
    const preventDefault = jest.fn();
    element.dragAndDrop = true;
    await element.updateComplete;

    element.onDragOver({ preventDefault } as unknown as DragEvent);
    expect(preventDefault).toHaveBeenCalled();
    expect(element.isDragOver).toBe(true);

    element.onDragLeave({ preventDefault } as unknown as DragEvent);
    expect(element.isDragOver).toBe(false);
  });

  it('should set selected file when file is dropped', async () => {
    const selectedFile = new File(['demo'], 'drop-demo.txt', {
      type: 'text/plain',
    });
    const outputSpy = jest.fn();
    const preventDefault = jest.fn();
    element.dragAndDrop = true;
    await element.updateComplete;

    element.addEventListener('fileSelected', (e: Event) => {
      outputSpy((e as CustomEvent).detail);
    });

    element.onDrop({
      preventDefault,
      dataTransfer: { files: [selectedFile] },
    } as unknown as DragEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(element.selectedFile).toEqual(selectedFile);
    expect(outputSpy).toHaveBeenCalledWith(selectedFile);
  });

  it('should ignore drag and drop when disabled', async () => {
    const preventDefault = jest.fn();
    element.disabled = true;
    await element.updateComplete;

    element.onDragOver({ preventDefault } as unknown as DragEvent);
    element.onDrop({
      preventDefault,
      dataTransfer: {
        files: [new File(['demo'], 'drop-demo.txt', { type: 'text/plain' })],
      },
    } as unknown as DragEvent);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(element.selectedFile).toBeNull();
  });

  it('should auto emit uploadClicked when autoUpload is true and file is selected', async () => {
    const selectedFile = new File(['demo'], 'auto-demo.txt', {
      type: 'text/plain',
    });
    const uploadSpy = jest.fn();

    element.autoUpload = true;
    await element.updateComplete;

    element.addEventListener('uploadClicked', (e: Event) => {
      uploadSpy((e as CustomEvent).detail);
    });

    element.onFileChange({
      target: { files: [selectedFile] },
    } as unknown as Event);

    expect(uploadSpy).toHaveBeenCalledWith(selectedFile);
    expect(element.selectedFiles).toEqual([]);
  });

  it('should hide manual upload button when autoUpload is true', async () => {
    element.autoUpload = true;
    await element.updateComplete;

    const uploadButton = element.shadowRoot?.querySelector(
      '.dcx-file-upload__upload-button',
    );

    expect(uploadButton).toBeNull();
  });

  it('should render small dropzone variant by default when drag and drop is enabled', async () => {
    element.dragAndDrop = true;
    await element.updateComplete;

    const dropzone = element.shadowRoot?.querySelector(
      '.dcx-file-upload__dropzone',
    ) as HTMLElement;

    expect(
      dropzone.classList.contains('dcx-file-upload__dropzone--small'),
    ).toBe(true);
  });

  it('should render large dropzone variant when configured', async () => {
    element.dragAndDrop = true;
    element.dropzoneSize = 'large';
    await element.updateComplete;

    const dropzone = element.shadowRoot?.querySelector(
      '.dcx-file-upload__dropzone',
    ) as HTMLElement;

    expect(
      dropzone.classList.contains('dcx-file-upload__dropzone--large'),
    ).toBe(true);
  });

  it('should allow selecting multiple files when multiple is true', async () => {
    const firstFile = new File(['one'], 'one.txt', {
      type: 'text/plain',
    });
    const secondFile = new File(['two'], 'two.txt', {
      type: 'text/plain',
    });
    const outputSpy = jest.fn();

    element.multiple = true;
    await element.updateComplete;

    element.addEventListener('fileSelected', (e: Event) => {
      outputSpy((e as CustomEvent).detail);
    });

    element.onFileChange({
      target: { files: [firstFile, secondFile] },
    } as unknown as Event);
    await element.updateComplete;

    expect(element.selectedFiles).toEqual([firstFile, secondFile]);
    expect(outputSpy).toHaveBeenCalledWith([firstFile, secondFile]);
  });

  it('should clear selected files after upload in multiple mode', async () => {
    const firstFile = new File(['one'], 'one.txt', {
      type: 'text/plain',
    });
    const secondFile = new File(['two'], 'two.txt', {
      type: 'text/plain',
    });
    const uploadSpy = jest.fn();

    element.multiple = true;
    await element.updateComplete;

    element.selectedFiles = [firstFile, secondFile];
    element.selectedFile = firstFile;

    element.addEventListener('uploadClicked', (e: Event) => {
      uploadSpy((e as CustomEvent).detail);
    });

    element.onUploadClick();

    expect(uploadSpy).toHaveBeenCalledWith([firstFile, secondFile]);
    expect(element.selectedFiles).toEqual([]);
    expect(element.selectedFile).toBeNull();
  });

  it('should show validation error and block invalid file selection by accept', async () => {
    const invalidFile = new File(['pdf'], 'document.pdf', {
      type: 'application/pdf',
    });
    const uploadSpy = jest.fn();

    element.accept = 'image/*';
    await element.updateComplete;

    element.addEventListener('uploadClicked', (e: Event) => {
      uploadSpy((e as CustomEvent).detail);
    });

    element.onFileChange({
      target: { files: [invalidFile] },
    } as unknown as Event);
    await element.updateComplete;

    expect(element.selectedFiles).toEqual([]);
    expect(element.validationError).toContain('Allowed types: image/*');

    element.onUploadClick();
    expect(uploadSpy).not.toHaveBeenCalled();

    const message = element.shadowRoot?.querySelector(
      'dcx-web-message',
    ) as HTMLElement;
    expect(message).toBeTruthy();
  });

  describe('loading', () => {
    it('should show spinner and hide action buttons when loading is true', async () => {
      element.loading = true;
      await element.updateComplete;

      const spinner = element.shadowRoot?.querySelector(
        'dcx-web-spinner',
      ) as HTMLElement;
      const uploadButton = element.shadowRoot?.querySelector(
        '.dcx-file-upload__upload-button',
      ) as HTMLElement;

      expect(spinner).toBeTruthy();
      expect(uploadButton).toBeNull();
    });

    it('should disable the choose-file button when loading is true', async () => {
      element.loading = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector(
        '.dcx-file-upload__zone-btn',
      ) as HTMLButtonElement;

      expect(button.disabled).toBe(true);
    });

    it('should not open file picker when loading', async () => {
      element.loading = true;
      await element.updateComplete;

      const webInput = element.shadowRoot?.querySelector('dcx-web-input');
      const input = (webInput?.shadowRoot?.querySelector(
        'input[type="file"]',
      ) || webInput?.querySelector('input[type="file"]')) as HTMLInputElement;

      const clickSpy = input ? jest.spyOn(input, 'click') : jest.fn();

      const button = element.shadowRoot?.querySelector(
        '.dcx-file-upload__zone-btn',
      ) as HTMLButtonElement;
      button.click();

      if (input) {
        expect(clickSpy).not.toHaveBeenCalled();
      }
    });
  });

  describe('WCAG AA', () => {
    it('should render file list as <ul> with <li> items when multiple files are selected', async () => {
      element.multiple = true;
      const file = new File(['x'], 'file.txt', { type: 'text/plain' });
      element.selectedFiles = [file];
      await element.updateComplete;

      const list = element.shadowRoot?.querySelector(
        'ul.dcx-file-upload__file-list',
      ) as HTMLElement;
      const item = list?.querySelector('li.dcx-file-upload__file-item');

      expect(list).toBeTruthy();
      expect(list.getAttribute('role')).toBe('list');
      expect(item).toBeTruthy();
    });

    it('should render aria-label on the file input matching the label input', async () => {
      element.label = 'Subir documento';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector(
        'dcx-web-input',
      ) as HTMLElement;

      expect(
        input.getAttribute('ariaLabel') ||
          (input as unknown as { ariaLabel: string }).ariaLabel,
      ).toBe('Subir documento');
    });

    it('should render role="region" and aria-label on the dropzone when dragAndDrop is true', async () => {
      element.dragAndDrop = true;
      await element.updateComplete;

      const dropzone = element.shadowRoot?.querySelector(
        '.dcx-file-upload__dropzone',
      ) as HTMLElement;

      expect(dropzone.getAttribute('role')).toBe('region');
      expect(dropzone.getAttribute('aria-label')).toBe(
        'Zona de arrastre de archivos',
      );
    });
  });

  it('should keep previous valid files in multiple mode when dropped file is invalid', async () => {
    const validFile = new File(['img'], 'photo.png', {
      type: 'image/png',
    });
    const invalidFile = new File(['pdf'], 'document.pdf', {
      type: 'application/pdf',
    });
    const preventDefault = jest.fn();

    element.multiple = true;
    element.accept = 'image/*';
    element.dragAndDrop = true;
    await element.updateComplete;

    element.selectedFiles = [validFile];
    element.selectedFile = validFile;

    element.onDrop({
      preventDefault,
      dataTransfer: { files: [invalidFile] },
    } as unknown as DragEvent);
    await element.updateComplete;

    expect(preventDefault).toHaveBeenCalled();
    expect(element.selectedFiles).toEqual([validFile]);
    expect(element.validationError).toContain('Allowed types: image/*');
  });
});
