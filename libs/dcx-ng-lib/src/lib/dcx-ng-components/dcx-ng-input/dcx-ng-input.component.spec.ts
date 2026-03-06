import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DcxNgInputComponent } from './dcx-ng-input.component';
import { DcxInputType } from '../../core/interfaces';

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
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests for Input Properties
  describe('Input Properties', () => {
    it('should set default values correctly', () => {
      expect(component.type).toBe(DcxInputType.TEXT);
      expect(component.placeholder).toBeNull();
      expect(component.size).toBe('m');
      expect(component.disabled).toBe(false);
      expect(component.required).toBe(false);
      expect(component.label).toBeNull();
    });

    it('should update type correctly', () => {
      const types: DcxInputType[] = [
        DcxInputType.TEXT,
        DcxInputType.EMAIL,
        DcxInputType.PASSWORD,
        DcxInputType.NUMBER,
      ];
      types.forEach(type => {
        component.type = type;
        fixture.detectChanges();
        expect(inputElement.type).toBe(type);
      });
    });

    it('should update placeholder', () => {
      const placeholder = 'Test placeholder';
      component.placeholder = placeholder;
      fixture.detectChanges();
      expect(inputElement.placeholder).toBe(placeholder);
    });

    it('should handle disabled state', () => {
      component.disabled = true;
      component.setupFormControl();
      fixture.detectChanges();
      expect(inputElement.classList.contains('disabled')).toBe(true);
    });

    it('should show required indicator when required and label set', () => {
      component.required = true;
      component.label = 'Test Label';
      fixture.detectChanges();
      const requiredIndicator = fixture.debugElement.query(By.css('.required-icon'));
      expect(requiredIndicator).toBeTruthy();
      expect(requiredIndicator.nativeElement.textContent).toBe('*');
    });

    it('should apply correct size class', () => {
      const sizes: string[] = ['s', 'm', 'l', 'xl'];
      sizes.forEach(size => {
        component.size = size as any;
        fixture.detectChanges();
        expect(inputElement.classList.contains('dcx-ng-input-size--' + size)).toBe(true);
      });
    });

    it('should set noMargin and inline inputs', () => {
      component.noMargin = true;
      component.inline = true;
      fixture.detectChanges();
      expect(component.noMargin).toBe(true);
      expect(component.inline).toBe(true);
    });

    it('should set search input and render search class', () => {
      component.search = true;
      fixture.detectChanges();
      expect(component.search).toBe(true);
      const searchInput = fixture.debugElement.query(By.css('.dcx-ng-input--search'));
      expect(searchInput).toBeTruthy();
    });
  });

  // Tests for Form Control and Validation
  describe('Form Control and Validation', () => {
    it('should initialize FormControl', () => {
      expect(component.inputControl).toBeTruthy();
    });

    it('should validate required field', () => {
      component.required = true;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.inputControl.errors?.['required']).toBe(true);

      component.inputControl.setValue('test');
      expect(component.inputControl.errors).toBeNull();
    });

    it('should validate email type', () => {
      component.type = DcxInputType.EMAIL;
      component.ngOnInit();
      fixture.detectChanges();

      component.inputControl.setValue('invalid-email');
      expect(component.inputControl.errors?.['email']).toBeTruthy();

      component.inputControl.setValue('valid@email.com');
      expect(component.inputControl.errors).toBeNull();
    });

    it('should validate number type', () => {
      component.type = DcxInputType.NUMBER;
      component.ngOnInit();
      fixture.detectChanges();

      component.inputControl.setValue('abc');
      expect(component.inputControl.errors?.['pattern']).toBeTruthy();

      const validNumbers = ['123', '-123', '0.5', '-0.5', '.5', '-.5', ''];
      validNumbers.forEach(num => {
        component.inputControl.setValue(num);
        expect(component.inputControl.errors).toBeNull();
      });

      const invalidNumbers = ['abc123', '12.34.56', '..5', '--1', '1-2'];
      invalidNumbers.forEach(num => {
        component.inputControl.setValue(num);
        expect(component.inputControl.errors?.['pattern']).toBeTruthy();
      });
    });

    it('should set errorMessages input', () => {
      component.errorMessages = [{ type: 'required', message: 'Required field' }];
      expect(component.errorMessages.length).toBe(1);
    });

    it('should return error message for required', () => {
      component.required = true;
      component.ngOnInit();
      component.inputControl.markAsTouched();
      expect(component.getErrorMessage()).toBe('Campo obligatorio');
    });

    it('should return custom required error message', () => {
      component.required = true;
      component.errorMessages = [{ type: 'required', message: 'Custom required' }];
      component.ngOnInit();
      component.inputControl.markAsTouched();
      expect(component.getErrorMessage()).toBe('Custom required');
    });

    it('should return null error message when no errors', () => {
      expect(component.getErrorMessage()).toBeNull();
    });
  });

  describe('Event Handling', () => {
    it('should emit value changes', () => {
      const testValue = 'test value';
      const spy = jest.spyOn(component.valueChange, 'emit');

      component.inputControl.setValue(testValue);
      expect(spy).toHaveBeenCalledWith(testValue);
    });

    it('should handle external value changes via setter', () => {
      const testValue = 'external value';
      component.value = testValue;
      expect(component.inputControl.value).toBe(testValue);
    });

    it('should set isFocused to false by default', () => {
      expect(component.isFocused).toBe(false);
    });
  });

  describe('CSS Classes', () => {
    it('should add invalid class when invalid and touched', () => {
      component.required = true;
      component.ngOnInit();
      component.inputControl.markAsTouched();
      fixture.detectChanges();

      expect(inputElement.classList.contains('invalid')).toBe(true);
    });

    it('should add required class when touched, not focused, required and no value', () => {
      component.required = true;
      component.ngOnInit();
      component.inputControl.markAsTouched();
      component.isFocused = false;
      fixture.detectChanges();

      expect(inputElement.classList.contains('required')).toBe(true);
    });

    it('should have disabled CSS class when disabled via setupFormControl', () => {
      component.disabled = true;
      component.setupFormControl();
      fixture.detectChanges();
      expect(inputElement.classList.contains('disabled')).toBe(true);
    });
  });

  describe('Component Lifecycle', () => {
    it('should update validators when required status changes via ngOnChanges', () => {
      component.required = true;
      component.ngOnChanges({
        required: {
          currentValue: true,
          previousValue: false,
          firstChange: false,
          isFirstChange: () => false
        }
      });

      expect(component.inputControl.hasValidator(Validators.required)).toBe(true);
    });

    it('should update validators when type changes via ngOnChanges', () => {
      component.type = DcxInputType.EMAIL;
      component.ngOnChanges({
        type: {
          currentValue: DcxInputType.EMAIL,
          previousValue: DcxInputType.TEXT,
          firstChange: false,
          isFirstChange: () => false
        }
      });

      component.inputControl.setValue('bad-email');
      expect(component.inputControl.errors?.['email']).toBeTruthy();
    });

    it('should call ngOnDestroy without errors', () => {
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should generate unique inputId', () => {
      expect(component.inputId).toBeTruthy();
      expect(component.inputId.startsWith('dcx-input-')).toBe(true);
    });

    it('should update validators when disabled changes via ngOnChanges', () => {
      component.disabled = true;
      component.ngOnChanges({
        disabled: {
          currentValue: true,
          previousValue: false,
          firstChange: false,
          isFirstChange: () => false
        }
      });
      expect(component.inputControl.disabled).toBe(true);
    });

    it('should not call setupFormControl when unrelated change', () => {
      const spy = jest.spyOn(component, 'setupFormControl');
      component.ngOnChanges({
        label: {
          currentValue: 'new label',
          previousValue: '',
          firstChange: false,
          isFirstChange: () => false
        }
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('getErrorMessage edge cases', () => {
    it('should return custom pattern error when errorMessages has pattern entry', () => {
      component.type = DcxInputType.NUMBER;
      component.errorMessages = [{ type: 'pattern', message: 'Custom pattern error' }];
      component.ngOnInit();
      component.inputControl.setValue('abc');
      expect(component.getErrorMessage()).toBe('Custom pattern error');
    });

    it('should return default pattern error when no custom message', () => {
      component.type = DcxInputType.NUMBER;
      component.errorMessages = [];
      component.ngOnInit();
      component.inputControl.setValue('abc');
      expect(component.getErrorMessage()).toBe('Formato numérico inválido');
    });

    it('should return custom email error when errorMessages has email entry', () => {
      component.type = DcxInputType.EMAIL;
      component.errorMessages = [{ type: 'email', message: 'Custom email error' }];
      component.ngOnInit();
      component.inputControl.setValue('not-an-email');
      expect(component.getErrorMessage()).toBe('Custom email error');
    });

    it('should return default email error when no custom message', () => {
      component.type = DcxInputType.EMAIL;
      component.errorMessages = [];
      component.ngOnInit();
      component.inputControl.setValue('not-an-email');
      expect(component.getErrorMessage()).toBe('Formato correo inválido');
    });

    it('should return required error when value is empty string', () => {
      component.required = true;
      component.ngOnInit();
      component.inputControl.setValue('');
      expect(component.getErrorMessage()).toBe('Campo obligatorio');
    });
  });
});
