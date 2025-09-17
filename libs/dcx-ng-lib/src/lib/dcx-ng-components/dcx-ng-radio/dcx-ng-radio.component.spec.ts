import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgRadioComponent } from './dcx-ng-radio.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('DcxNgRadioComponent', () => {
  let component: DcxNgRadioComponent;
  let fixture: ComponentFixture<DcxNgRadioComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgRadioComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgRadioComponent);
    component = fixture.componentInstance;

    inputElement = fixture.debugElement.query(
      By.css('input[type="radio"]'),
    ).nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the name attribute', () => {
    component.name = 'testGroup';
    fixture.detectChanges();
    expect(inputElement.name).toBe('testGroup');
  });

  it('should set the value attribute', () => {
    component.value = 'option1';
    fixture.detectChanges();
    expect(inputElement.value).toBe('option1');
  });

  it('should apply disabled attribute', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(inputElement.disabled).toBe(true);
  });

  it('should display the label text', () => {
    component.label = 'Option 1';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('.dcx-ng-radio'),
    ).nativeElement;
    expect(labelElement.textContent).toContain('Option 1');
  });

  it('should reflect checked state based on current value', () => {
    component.value = 'option1';
    component.writeValue('option1'); // Simula setValue del FormControl
    fixture.detectChanges();
    expect(inputElement.checked).toBe(true);
  });

  it('should reflect unchecked state when current value does not match', () => {
    component.value = 'option1';
    component.writeValue('otherValue'); // Simula setValue del FormControl
    fixture.detectChanges();
    expect(inputElement.checked).toBe(false);
  });

  it('should call onChange when radio is changed', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.value = 'option1';
    fixture.detectChanges();

    inputElement.dispatchEvent(new Event('change'));

    expect(onChangeSpy).toHaveBeenCalledWith('option1');
  });

  it('should call onTouched when radio is changed', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);
    component.value = 'option1';
    fixture.detectChanges();

    inputElement.dispatchEvent(new Event('change'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should apply correct size class', () => {
    component.size = 'l';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('label'),
    ).nativeElement;
    expect(labelElement.classList).toContain('dcx-ng-radio--l');
  });

  it('should NOT have "unstyled" class when unstyled input is false', () => {
    component.unstyled = false;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('label'),
    ).nativeElement;
    expect(labelElement.classList).not.toContain('unstyled');
  });

  it('should have "unstyled" class when unstyled input is true', () => {
    component.unstyled = true;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('label'),
    ).nativeElement;
    expect(labelElement.classList).toContain('unstyled');
  });

  it('should set disabled state when setDisabledState is called', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component.disabled).toBe(true);
    expect(inputElement.disabled).toBe(true);
  });

  it('should not trigger change when disabled', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.disabled = true;
    component.value = 'option1';
    fixture.detectChanges();

    inputElement.dispatchEvent(new Event('change'));

    expect(onChangeSpy).not.toHaveBeenCalled();
  });
});
