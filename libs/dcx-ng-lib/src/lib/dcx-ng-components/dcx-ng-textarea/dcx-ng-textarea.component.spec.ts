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

  it('should emit valueChange on input', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');
    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    textarea.value = 'Nuevo texto';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value()).toBe('Nuevo texto');
    expect(emitSpy).toHaveBeenCalledWith('Nuevo texto');
  });

  it('should apply autoresize styles when autoResize is true', () => {
    fixture.componentRef.setInput('autoResize', true);
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');

    expect(
      textarea.classList.contains('dcx-ng-textarea__control--autoresize'),
    ).toBe(true);
  });

  it('should render float label when floatLabel and label inputs are provided', () => {
    fixture.componentRef.setInput('floatLabel', 'over');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const label: HTMLLabelElement | null = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__label',
    );

    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('Test Label');
  });

  it('should add active class to wrapper when focused', () => {
    fixture.componentRef.setInput('floatLabel', 'over');
    fixture.componentRef.setInput('label', 'Test Label');
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

    textarea.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(wrapper.classList.contains('dcx-ng-textarea__wrapper--active')).toBe(
      false,
    );
  });

  it('should keep active class when value is present', () => {
    fixture.componentRef.setInput('floatLabel', 'over');
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('textarea');
    const wrapper: HTMLDivElement = fixture.nativeElement.querySelector(
      '.dcx-ng-textarea__wrapper',
    );

    textarea.value = 'Some text';
    textarea.dispatchEvent(new Event('input'));
    fixture.componentRef.setInput('value', 'Some text');
    fixture.detectChanges();

    expect(wrapper.classList.contains('dcx-ng-textarea__wrapper--active')).toBe(
      true,
    );
  });
});
