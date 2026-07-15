import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgRadioComponent } from './dcx-ng-radio.component';
import { DcxRadioOption } from '../../core/interfaces';

const OPTIONS: DcxRadioOption[] = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C', disabled: true },
];

describe('DcxNgRadioComponent', () => {
  let component: DcxNgRadioComponent;
  let fixture: ComponentFixture<DcxNgRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgRadioComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.disabled()).toBe(false);
    expect(component.size()).toBe('l');
    expect(component.ariaLabel()).toBe('');
    expect(component.label()).toBe('');
  });

  it('should generate a unique name per instance when not provided', () => {
    const fixture2 = TestBed.createComponent(DcxNgRadioComponent);
    fixture2.detectChanges();
    expect(component.name()).not.toBe(fixture2.componentInstance.name());
  });

  it('should render a fieldset with a legend matching label', () => {
    fixture.componentRef.setInput('label', 'Elige una opción');
    fixture.detectChanges();
    const legend = fixture.nativeElement.querySelector(
      '.dcx-ng-radio-group__legend',
    );
    expect(legend.textContent.trim()).toBe('Elige una opción');
  });

  it('should render one native radio input per option, sharing the group name', () => {
    const inputs: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input[type=radio]');
    expect(inputs.length).toBe(3);
    const names = new Set(Array.from(inputs).map(i => i.name));
    expect(names.size).toBe(1);
  });

  it('should render each option label', () => {
    const labels = fixture.nativeElement.querySelectorAll(
      '.dcx-ng-radio__label',
    );
    expect(labels[0].textContent).toContain('Opción A');
    expect(labels[1].textContent).toContain('Opción B');
    expect(labels[2].textContent).toContain('Opción C');
  });

  it('should apply the size class to each option', () => {
    fixture.componentRef.setInput('size', 's');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.className).toContain('dcx-ng-radio--s');
  });

  it('should apply the error class to all options when error is true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const labels = fixture.nativeElement.querySelectorAll('label');
    labels.forEach((label: HTMLElement) => {
      expect(label.className).toContain('dcx-ng-radio--error');
    });
  });

  it('should mark an option as checked via writeValue', () => {
    component.writeValue('b');
    fixture.detectChanges();
    expect(component.isChecked('b')).toBe(true);
    expect(component.isChecked('a')).toBe(false);
  });

  it('should update the selected value via onOptionChange', () => {
    component.onOptionChange(OPTIONS[0]);
    expect(component.isChecked('a')).toBe(true);
  });

  it('should not select a disabled option', () => {
    component.onOptionChange(OPTIONS[2]);
    expect(component.isChecked('c')).toBe(false);
  });

  it('should disable all options when the group disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputs: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input[type=radio]');
    inputs.forEach(input => expect(input.disabled).toBe(true));
  });

  it('should mark only the third option as natively disabled per-option', () => {
    const inputs: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input[type=radio]');
    expect(inputs[0].disabled).toBe(false);
    expect(inputs[1].disabled).toBe(false);
    expect(inputs[2].disabled).toBe(true);
  });

  it('should call registerOnChange correctly', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.onOptionChange(OPTIONS[1]);
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('should call registerOnTouched correctly', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    component.onOptionChange(OPTIONS[0]);
    expect(fn).toHaveBeenCalled();
  });

  it('should not call onChange when disabled via setDisabledState', () => {
    component.setDisabledState(true);
    const changeSpy = jest.fn();
    component.registerOnChange(changeSpy);
    fixture.detectChanges();
    component.onOptionChange(OPTIONS[0]);
    expect(component.isChecked('a')).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('setDisabledState should toggle isGroupDisabled', () => {
    component.setDisabledState(true);
    expect(component.isGroupDisabled()).toBe(true);
    component.setDisabledState(false);
    expect(component.isGroupDisabled()).toBe(false);
  });

  it('should call onTouched on blur', () => {
    const touched = jest.fn();
    component.registerOnTouched(touched);
    component.onBlur();
    expect(touched).toHaveBeenCalled();
  });

  describe('hint and error (WCAG)', () => {
    it('should show the hint when set and there is no error', () => {
      fixture.componentRef.setInput('hint', 'Selecciona una opción');
      fixture.detectChanges();
      const hint = fixture.nativeElement.querySelector(
        '.dcx-ng-radio-group__hint',
      );
      expect(hint).toBeTruthy();
    });

    it('should hide the hint when an error is shown', () => {
      fixture.componentRef.setInput('hint', 'Ayuda');
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Campo obligatorio');
      fixture.detectChanges();
      const hint = fixture.nativeElement.querySelector(
        '.dcx-ng-radio-group__hint',
      );
      expect(hint).toBeFalsy();
    });

    it('should show the error message with role="alert"', () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Campo obligatorio');
      fixture.detectChanges();
      const error = fixture.nativeElement.querySelector(
        '.dcx-ng-radio-group__error',
      );
      expect(error.getAttribute('role')).toBe('alert');
      expect(error.textContent).toContain('Campo obligatorio');
    });

    it('should set aria-describedby on the fieldset pointing to the error id', () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Campo obligatorio');
      fixture.detectChanges();
      const fieldset = fixture.nativeElement.querySelector('fieldset');
      const error = fixture.nativeElement.querySelector(
        '.dcx-ng-radio-group__error',
      );
      expect(fieldset.getAttribute('aria-describedby')).toBe(error.id);
    });
  });

  describe('accessible name (WCAG)', () => {
    it('should set aria-label on the fieldset when there is no visible label', () => {
      fixture.componentRef.setInput('ariaLabel', 'Grupo sin label visible');
      fixture.detectChanges();
      const fieldset = fixture.nativeElement.querySelector('fieldset');
      expect(fieldset.getAttribute('aria-label')).toBe(
        'Grupo sin label visible',
      );
    });

    it('should not set aria-label when a visible label is present', () => {
      fixture.componentRef.setInput('label', 'Elige una opción');
      fixture.componentRef.setInput('ariaLabel', 'Ignorado');
      fixture.detectChanges();
      const fieldset = fixture.nativeElement.querySelector('fieldset');
      expect(fieldset.getAttribute('aria-label')).toBeNull();
    });
  });
});
