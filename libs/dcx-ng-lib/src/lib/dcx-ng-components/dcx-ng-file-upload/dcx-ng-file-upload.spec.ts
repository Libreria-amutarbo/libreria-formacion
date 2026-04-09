import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgFileUploadComponent } from './dcx-ng-file-upload';

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
});
