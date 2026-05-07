import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTextareaComponent } from './dcx-ng-textarea.component';

describe('DcxNgTextareaComponent', () => {
  let component: DcxNgTextareaComponent;
  let fixture: ComponentFixture<DcxNgTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render textarea element', () => {
    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should emit valueChange on input', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');
    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    textarea.value = 'Test text';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value()).toBe('Test text');
    expect(emitSpy).toHaveBeenCalledWith('Test text');
  });

  it('should set textarea attributes', () => {
    fixture.componentRef.setInput('rows', 8);
    fixture.componentRef.setInput('cols', 40);
    fixture.componentRef.setInput('placeholder', 'Enter text');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    expect(textarea.rows).toBe(8);
    expect(textarea.cols).toBe(40);
    expect(textarea.placeholder).toBe('Enter text');
    expect(textarea.disabled).toBe(true);
    expect(textarea.readOnly).toBe(true);
  });

  it('should handle focus and blur events', () => {
    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    textarea.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(component.focused()).toBe(true);

    textarea.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.focused()).toBe(false);
  });

  it('should apply CSS classes based on inputs', () => {
    fixture.componentRef.setInput('autoResize', true);
    fixture.componentRef.setInput('size', 'small');
    fixture.componentRef.setInput('filled', true);
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    expect(
      textarea.classList.contains('dcx-ng-textarea__control--autoresize'),
    ).toBe(true);
    expect(textarea.classList.contains('dcx-ng-textarea__control--small')).toBe(
      true,
    );
    expect(
      textarea.classList.contains('dcx-ng-textarea__control--filled'),
    ).toBe(true);
    expect(
      textarea.classList.contains('dcx-ng-textarea__control--invalid'),
    ).toBe(true);
  });

  it('should apply wrapper classes for float label', () => {
    fixture.componentRef.setInput('floatLabel', 'over');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('fluid', true);
    fixture.detectChanges();

    const wrapper: HTMLDivElement = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__wrapper',
    );

    expect(wrapper.classList.contains('dcx-ng-textarea__wrapper--fluid')).toBe(
      true,
    );
    expect(wrapper.classList.contains('dcx-ng-textarea__wrapper--float')).toBe(
      true,
    );
    expect(wrapper.classList.contains('dcx-ng-textarea__wrapper--over')).toBe(
      true,
    );
  });

  it('should render float label when provided', () => {
    fixture.componentRef.setInput('floatLabel', 'over');
    fixture.componentRef.setInput('label', 'My Label');
    fixture.detectChanges();

    const label: HTMLLabelElement | null = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__label',
    );

    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('My Label');
  });

  it('should not render float label when undefined', () => {
    const label: HTMLLabelElement | null = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__label',
    );
    expect(label).toBeNull();
  });

  it('should add active class when focused with float label', () => {
    fixture.componentRef.setInput('floatLabel', 'over');
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');
    const wrapper: HTMLDivElement = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__wrapper',
    );

    textarea.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(wrapper.classList.contains('dcx-ng-textarea__wrapper--active')).toBe(
      true,
    );
  });

  it('should render error message when invalid', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.componentRef.setInput('errorMessage', 'This field is required');
    fixture.detectChanges();

    const errorDiv: HTMLDivElement | null = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__error',
    );

    expect(errorDiv).toBeTruthy();
    expect(errorDiv?.textContent).toBe('This field is required');
  });

  it('should not render error message when not invalid', () => {
    fixture.componentRef.setInput('errorMessage', 'Error');
    fixture.detectChanges();

    const errorDiv: HTMLDivElement | null = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__error',
    );

    expect(errorDiv).toBeNull();
  });

  it('should sync textarea size on autoresize', () => {
    fixture.componentRef.setInput('autoResize', true);
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    textarea.value = 'Line 1\nLine 2\nLine 3';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(textarea.style.height).toBeTruthy();
  });

  it('should clear height when autoResize is disabled', () => {
    fixture.componentRef.setInput('autoResize', true);
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    textarea.value = 'Text';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(textarea.style.height).toBeTruthy();

    fixture.componentRef.setInput('autoResize', false);
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(textarea.style.height).toBe('');
  });
});
