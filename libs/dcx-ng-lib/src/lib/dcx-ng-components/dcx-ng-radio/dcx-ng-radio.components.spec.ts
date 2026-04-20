import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgRadioComponent } from './dcx-ng-radio.component';

describe('DcxNgRadioComponent', () => {
  let component: DcxNgRadioComponent;
  let fixture: ComponentFixture<DcxNgRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.name()).toBe('');
    expect(component.disabled()).toBe(false);
    expect(component.checked()).toBe(false);
    expect(component.size()).toBe('l');
    expect(component.ariaLabel()).toBe('');
  });

  it('should render label when set', () => {
    fixture.componentRef.setInput('label', 'Opción 1');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.dcx-ng-radio__label');
    expect(label.textContent).toContain('Opción 1');
  });

  it('should apply the size class', () => {
    fixture.componentRef.setInput('size', 's');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.className).toContain('dcx-ng-radio--s');
  });

  it('should apply error class when error is true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.className).toContain('dcx-ng-radio--error');
  });

  it('should mark radio as checked when value matches', () => {
    fixture.componentRef.setInput('value', 'valor1');
    component.writeValue('valor1');
    fixture.detectChanges();
    expect(component.isChecked()).toBe(true);
  });

  it('should mark radio as NOT checked when value does not match', () => {
    fixture.componentRef.setInput('value', 'valor1');
    component.writeValue('valor2');
    fixture.detectChanges();
    expect(component.isChecked()).toBe(false);
  });

  it('should mark radio as checked when checked input is true', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(component.isChecked()).toBe(true);
  });

  it('should disable via setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
  });

  it('should call registerOnChange correctly', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.onInputChange('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should call registerOnTouched correctly', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component).toBeTruthy();
  });

  it('should not call onInputChange when disabled', () => {
    fixture.componentRef.setInput('value', 'valor1');
    component.setDisabledState(true);
    const changeSpy = jest.fn();
    component.registerOnChange(changeSpy);
    fixture.detectChanges();
    component.onInputChange('valor1');
    expect(component.isChecked()).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should update formControl via onInputChange when not disabled', () => {
    fixture.componentRef.setInput('value', 'a');
    fixture.detectChanges();
    component.onInputChange('a');
    expect(component.isChecked()).toBe(true);
  });

  it('setDisabledState should disable component when true', () => {
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('setDisabledState should enable component when false', () => {
    component.setDisabledState(true);
    component.setDisabledState(false);
    expect(component.isDisabled()).toBe(false);
  });

  it('ariaLabelBinding should fallback to "Radio button"', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('Radio button');
  });

  it('ariaLabelBinding should return ariaLabel when set', () => {
    fixture.componentRef.setInput('ariaLabel', 'My radio');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('My radio');
  });

  it('sizeClass should return correct class', () => {
    fixture.componentRef.setInput('size', 'm');
    fixture.detectChanges();
    expect(component.sizeClass()).toBe('dcx-ng-radio--m');
  });

  it('should call onTouched on blur', () => {
    const touched = jest.fn();
    component.registerOnTouched(touched);
    component.onBlur();
    expect(touched).toHaveBeenCalled();
  });
});
