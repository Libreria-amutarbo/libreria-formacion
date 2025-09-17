import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcxNgInputComponent } from './dcx-ng-input.component';

import { By } from '@angular/platform-browser';

describe('DcxNgInputComponent', () => {
  let component: DcxNgInputComponent;

  let fixture: ComponentFixture<DcxNgInputComponent>;

  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgInputComponent);

    component = fixture.componentInstance;

    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    fixture.detectChanges();
  });

  it('should créate the input component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the placeholder correctly', () => {
    component.placeholder = 'Enter your name';

    fixture.detectChanges();

    expect(inputElement.placeholder).toBe('Enter your name');
  });

  it('should apply disabled attribute', () => {
    component.disabled = true;

    fixture.detectChanges();

    expect(inputElement.disabled).toBe(true);
  });

  it('should apply required attribute', () => {
    component.required = true;

    fixture.detectChanges();

    expect(inputElement.required).toBe(true);
  });

  it('should use correct type attribute', () => {
    component.type = 'email';

    fixture.detectChanges();

    expect(inputElement.type).toBe('email');
  });

  it('should bind value correctly with writeValue', () => {
    component.writeValue('test@example.com');

    fixture.detectChanges();

    expect(inputElement.value).toBe('test@example.com');
  });

  it('should emit value on user input', () => {
    const spy = jest.fn();

    component.registerOnChange(spy);

    inputElement.value = 'new value';

    inputElement.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('new value');
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = jest.fn();

    component.registerOnTouched(onTouchedSpy);

    fixture.detectChanges();

    inputElement.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should apply correct size class', () => {
    component.size = 'xl';

    fixture.detectChanges();

    const inputDebugEl = fixture.debugElement.query(By.css('input'));

    expect(inputDebugEl.nativeElement.classList).toContain('dcx-ng-input--xl');
  });

  it('should set aria-label correctly', () => {
    component.ariaLabel = 'Accessible input';

    fixture.detectChanges();

    expect(inputElement.getAttribute('aria-label')).toBe('Accessible input');
  });
});
