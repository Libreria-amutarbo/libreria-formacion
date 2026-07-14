import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
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
    expect(label?.textContent?.trim()).toBe('My Label');
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
    expect(errorDiv?.textContent?.trim()).toBe('This field is required');
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

  describe('accessibility wiring (WCAG)', () => {
    it('should generate a unique id per instance', () => {
      const fixture2 = TestBed.createComponent(DcxNgTextareaComponent);
      fixture2.detectChanges();
      expect(fixture.componentInstance.id()).not.toBe(
        fixture2.componentInstance.id(),
      );
    });

    it('should associate the label with the textarea via for/id', () => {
      fixture.componentRef.setInput('label', 'Comentarios');
      fixture.detectChanges();

      const label: HTMLLabelElement = fixture.nativeElement.querySelector(
        '.dcx-ng-textarea__label',
      );
      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');

      expect(label.getAttribute('for')).toBe(textarea.id);
    });

    it('should render the label even without floatLabel', () => {
      fixture.componentRef.setInput('label', 'Notas');
      fixture.detectChanges();

      const label: HTMLLabelElement | null =
        fixture.nativeElement.querySelector('.dcx-ng-textarea__label');
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Notas');
    });

    it('should render a required asterisk when required', () => {
      fixture.componentRef.setInput('label', 'Notas');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const asterisk = fixture.nativeElement.querySelector(
        '.dcx-ng-textarea__required',
      );
      expect(asterisk).toBeTruthy();
    });

    it('should set aria-invalid to true when invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.getAttribute('aria-invalid')).toBe('true');
    });

    it('should not set aria-invalid when not invalid', () => {
      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.getAttribute('aria-invalid')).toBeNull();
    });

    it('should set aria-required when required', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.getAttribute('aria-required')).toBe('true');
    });

    it('should mark the error message with role="alert"', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorMessage', 'Campo obligatorio');
      fixture.detectChanges();

      const errorDiv = fixture.nativeElement.querySelector(
        '.dcx-ng-textarea__error',
      );
      expect(errorDiv.getAttribute('role')).toBe('alert');
    });

    it('should include the error id in aria-describedby when invalid', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorMessage', 'Campo obligatorio');
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      const errorDiv = fixture.nativeElement.querySelector(
        '.dcx-ng-textarea__error',
      );
      expect(textarea.getAttribute('aria-describedby')).toContain(
        errorDiv.id,
      );
    });

    it('should render the hint and include its id in aria-describedby', () => {
      fixture.componentRef.setInput('hint', 'Max. 500 caracteres');
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      const hintDiv = fixture.nativeElement.querySelector(
        '.dcx-ng-textarea__hint',
      );
      expect(hintDiv).toBeTruthy();
      expect(textarea.getAttribute('aria-describedby')).toContain(hintDiv.id);
    });

    it('should hide the hint when an error is shown', () => {
      fixture.componentRef.setInput('hint', 'Max. 500 caracteres');
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorMessage', 'Campo obligatorio');
      fixture.detectChanges();

      const hintDiv = fixture.nativeElement.querySelector(
        '.dcx-ng-textarea__hint',
      );
      expect(hintDiv).toBeNull();
    });

    it('should set aria-label when there is no visible label', () => {
      fixture.componentRef.setInput('ariaLabel', 'Comentarios adicionales');
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.getAttribute('aria-label')).toBe(
        'Comentarios adicionales',
      );
    });

    it('should reflect maxLength as the native maxlength attribute', () => {
      fixture.componentRef.setInput('maxLength', 500);
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.maxLength).toBe(500);
    });
  });

  describe('resize behavior', () => {
    it('should default to resize: vertical', () => {
      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.style.resize).toBe('vertical');
    });

    it('should apply resize: none when resizable is false', () => {
      fixture.componentRef.setInput('resizable', false);
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.style.resize).toBe('none');
    });

    it('should force resize: none when autoResize is true, regardless of resizable', () => {
      fixture.componentRef.setInput('autoResize', true);
      fixture.componentRef.setInput('resizable', true);
      fixture.detectChanges();

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      expect(textarea.style.resize).toBe('none');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should update value via writeValue', () => {
      component.writeValue('Texto inicial');
      expect(component.value()).toBe('Texto inicial');
    });

    it('should call the registered onChange callback on input', () => {
      const spy = jest.fn();
      component.registerOnChange(spy);

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      textarea.value = 'Nuevo valor';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('Nuevo valor');
    });

    it('should call the registered onTouched callback on blur', () => {
      const spy = jest.fn();
      component.registerOnTouched(spy);

      const textarea: HTMLTextAreaElement =
        fixture.nativeElement.querySelector('textarea');
      textarea.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DcxNgTextareaComponent],
  template: `
    <form [formGroup]="form">
      <dcx-ng-textarea formControlName="notes"></dcx-ng-textarea>
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    notes: new FormControl('Valor inicial'),
  });
}

describe('DcxNgTextareaComponent - CVA integration', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should reflect the FormControl initial value', () => {
    const textarea: HTMLTextAreaElement =
      hostFixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe('Valor inicial');
  });

  it('should update the FormControl when the textarea value changes', () => {
    const textarea: HTMLTextAreaElement =
      hostFixture.nativeElement.querySelector('textarea');
    textarea.value = 'Valor actualizado';
    textarea.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();

    expect(hostComponent.form.get('notes')!.value).toBe('Valor actualizado');
  });

  it('should update the textarea when the FormControl value is patched', () => {
    hostComponent.form.patchValue({ notes: 'Valor parcheado' });
    hostFixture.detectChanges();

    const textarea: HTMLTextAreaElement =
      hostFixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe('Valor parcheado');
  });
});
