import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgInputComponent } from './dcx-ng-input.component';
import { By } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';

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
      expect(component.type).toBe('text');
      expect(component.placeholder).toBeNull();
      expect(component.size).toBe('m');
      expect(component.disabled).toBe(false);
      expect(component.required).toBe(false);
      expect(component.label).toBeNull();
    });

    it('should update type correctly', () => {
      const types: string[] = ['text', 'number', 'email', 'password', 'date', 'search', 'tel', 'url'];
      types.forEach(type => {
        component.type = type as any;
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
      expect(inputElement.disabled).toBe(true);
      expect(inputElement.classList.contains('disabled')).toBe(true);
    });

    it('should show required indicator when required', () => {
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
        expect(inputElement.classList.contains('input-size--' + size)).toBe(true);
      });
    });
  });

  // Tests for Form Control and Validation
  describe('Form Control and Validation', () => {
    it('should initialize FormControl', () => {
      expect(component.inputControl).toBeTruthy();
    });

    it('should mark as touched on blur', () => {
      inputElement.dispatchEvent(new Event('blur'));
      expect(component.inputControl.touched).toBe(true);
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
      component.type = 'email';
      component.ngOnInit();
      fixture.detectChanges();

      component.inputControl.setValue('invalid-email');
      expect(component.inputControl.errors?.['email']).toBeTruthy();

      component.inputControl.setValue('valid@email.com');
      expect(component.inputControl.errors).toBeNull();
    });

    it('should validate number type', () => {
      component.type = 'number';
      component.ngOnInit();
      fixture.detectChanges();

      // Casos inválidos
      component.inputControl.setValue('abc');
      expect(component.inputControl.errors?.['pattern']).toBeTruthy();

      // Casos válidos
      const validNumbers = ['123', '-123', '0.5', '-0.5', '1.234', '.5', '-.5', ''];
      validNumbers.forEach(num => {
        component.inputControl.setValue(num);
        expect(component.inputControl.errors).toBeNull();
      });

      // Casos inválidos adicionales
      const invalidNumbers = ['abc123', '12.34.56', '..5', '--1', '1-2'];
      invalidNumbers.forEach(num => {
        component.inputControl.setValue(num);
        expect(component.inputControl.errors?.['pattern']).toBeTruthy();
      });
    });
  });

  // Tests for Event Handling
  describe('Event Handling', () => {
    it('should toggle focus state', () => {
      inputElement.dispatchEvent(new Event('focus'));
      expect(component.isFocused).toBe(true);

      inputElement.dispatchEvent(new Event('blur'));
      expect(component.isFocused).toBe(false);
    });

    it('should emit value changes', () => {
      const testValue = 'test value';
      const spy = jest.spyOn(component.valueChange, 'emit');

      component.inputControl.setValue(testValue);
      expect(spy).toHaveBeenCalledWith(testValue);
    });

    it('should handle external value changes', () => {
      const testValue = 'external value';
      component.value = testValue;
      expect(component.inputControl.value).toBe(testValue);
    });
  });

  // Tests for CSS Classes
  describe('CSS Classes', () => {
    it('should add invalid class when invalid and touched', () => {
      component.required = true;
      component.ngOnInit();
      component.inputControl.markAsTouched();
      fixture.detectChanges();

      expect(inputElement.classList.contains('invalid')).toBe(true);
    });

    it('should add required class when conditions are met', () => {
      component.required = true;
      component.ngOnInit();
      component.inputControl.markAsTouched();
      component.isFocused = false;
      fixture.detectChanges();

      expect(inputElement.classList.contains('required')).toBe(true);
    });
  });

  // Tests for Component Lifecycle
  describe('Component Lifecycle', () => {
    it('should update validators when required status changes', () => {
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
  });
});
