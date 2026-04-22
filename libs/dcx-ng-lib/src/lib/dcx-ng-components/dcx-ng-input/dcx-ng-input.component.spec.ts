import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgInputComponent } from './dcx-ng-input.component';
import { DcxInputType } from '@dcx-ng-components/dcx-ng-lib';

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

  describe('Input Properties - Default Values', () => {
    it('should have default type as text', () => {
      expect(component.type()).toBe(DcxInputType.TEXT);
    });

    it('should have default placeholder as empty string', () => {
      expect(component.placeholder()).toBe('');
    });

    it('should have default size as m', () => {
      expect(component.size()).toBe('m');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have default required as false', () => {
      expect(component.required()).toBe(false);
    });

    it('should have default label as empty string', () => {
      expect(component.label()).toBe('');
    });

    it('should have default value as empty string', () => {
      expect(component.value()).toBe('');
    });

    it('should have default isInvalid as false', () => {
      expect(component.isInvalid()).toBe(false);
    });

    it('should have default readonly as false', () => {
      expect(component.readonly()).toBe(false);
    });

    it('should have default errorMessage as empty string', () => {
      expect(component.errorMessage()).toBe('');
    });
  });

  describe('Input Properties - Updates', () => {
    it('should update type', () => {
      const types: DcxInputType[] = [
        DcxInputType.TEXT,
        DcxInputType.EMAIL,
        DcxInputType.NUMBER,
      ];
      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();
        expect(component.type()).toBe(type);
      });
    });

    it('should update placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Test placeholder');
      fixture.detectChanges();
      expect(inputElement.placeholder).toBe('Test placeholder');
    });

    it('should handle disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(inputElement.disabled).toBe(true);
    });

    it('should show required indicator when required and label set', () => {
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();
      const requiredIndicator = fixture.debugElement.query(
        By.css('.dcx-ng-input__required'),
      );
      expect(requiredIndicator).toBeTruthy();
      expect(requiredIndicator.nativeElement.textContent).toBe('*');
    });

    it('should render label when set', () => {
      fixture.componentRef.setInput('label', 'My Label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.dcx-ng-input__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent).toContain('My Label');
    });

    it('should not render label when empty', () => {
      fixture.componentRef.setInput('label', '');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.dcx-ng-input__label'));
      expect(label).toBeFalsy();
    });
  });

  describe('Computed properties', () => {
    it('should compute displayType as text for TEXT type', () => {
      fixture.componentRef.setInput('type', DcxInputType.TEXT);
      fixture.detectChanges();
      expect(component.displayType()).toBe('text');
    });

    it('should compute displayType as password for PASSWORD type', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      expect(component.displayType()).toBe('password');
    });

    it('should toggle password visibility', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      expect(component.displayType()).toBe('password');

      component.togglePasswordVisibility();
      expect(component.displayType()).toBe('text');

      component.togglePasswordVisibility();
      expect(component.displayType()).toBe('password');
    });

    it('should compute isRadioType correctly', () => {
      fixture.componentRef.setInput('type', DcxInputType.TEXT);
      fixture.detectChanges();
      expect(component.isRadioType()).toBe(false);

      fixture.componentRef.setInput('type', DcxInputType.RADIO);
      fixture.detectChanges();
      expect(component.isRadioType()).toBe(true);
    });

    it('should compute isRangeType correctly', () => {
      fixture.componentRef.setInput('type', DcxInputType.RANGE);
      fixture.detectChanges();
      expect(component.isRangeType()).toBe(true);
    });

    it('should compute isPasswordType correctly', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      expect(component.isPasswordType()).toBe(true);
    });

    it('should compute isSearchType correctly', () => {
      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      expect(component.isSearchType()).toBe(true);
    });

    it('should compute isFileType correctly', () => {
      fixture.componentRef.setInput('type', DcxInputType.FILE);
      fixture.detectChanges();
      expect(component.isFileType()).toBe(true);
      expect(component.displayType()).toBe('file');
    });

    it('should compute getInputIcon for various types', () => {
      fixture.componentRef.setInput('type', DcxInputType.TEXT);
      fixture.detectChanges();
      expect(component.getInputIcon()).toBeNull();

      fixture.componentRef.setInput('type', DcxInputType.EMAIL);
      fixture.detectChanges();
      expect(component.getInputIcon()).toBe('mail');

      fixture.componentRef.setInput('type', DcxInputType.NUMBER);
      fixture.detectChanges();
      expect(component.getInputIcon()).toBe('pin');

      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      expect(component.getInputIcon()).toBe('search');
    });

    it('should compute inputClasses', () => {
      expect(component.inputClasses()).toContain('dcx-ng-input__control');
    });

    it('should compute showActionIcon for password type', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      expect(component.showActionIcon()).toBe(true);
    });

    it('should compute showActionIcon for search type', () => {
      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      expect(component.showActionIcon()).toBe(true);
    });

    it('should not show action icon for text type', () => {
      fixture.componentRef.setInput('type', DcxInputType.TEXT);
      fixture.detectChanges();
      expect(component.showActionIcon()).toBe(false);
    });

    it('should not show action icon when readonly', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      expect(component.showActionIcon()).toBe(false);
    });
  });

  describe('Event Handling', () => {
    it('should emit valueChange on onInput', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onInput('test value');
      expect(spy).toHaveBeenCalledWith('test value');
    });

    it('should update value model on onInput', () => {
      component.onInput('new value');
      expect(component.value()).toBe('new value');
    });

    it('should emit blurEvent on onBlur', () => {
      const spy = jest.fn();
      component.blurEvent.subscribe(spy);
      component.onBlur();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit focusEvent on focus', () => {
      const spy = jest.fn();
      component.focusEvent.subscribe(spy);
      inputElement.dispatchEvent(new Event('focus'));
      expect(spy).toHaveBeenCalled();
    });

    it('should emit enterPressed on Enter keydown', () => {
      const spy = jest.fn();
      component.enterPressed.subscribe(spy);
      inputElement.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' }),
      );
      expect(spy).toHaveBeenCalled();
    });

    it('should format email to lowercase on input', () => {
      fixture.componentRef.setInput('type', DcxInputType.EMAIL);
      fixture.detectChanges();
      component.onInput('TEST@EMAIL.COM');
      expect(component.value()).toBe('test@email.com');
    });

    it('should format number type input', () => {
      fixture.componentRef.setInput('type', DcxInputType.NUMBER);
      fixture.detectChanges();
      component.onInput('123');
      expect(component.value()).toBe(123);
    });

    it('should return empty string for empty number input', () => {
      fixture.componentRef.setInput('type', DcxInputType.NUMBER);
      fixture.detectChanges();
      component.onInput('');
      expect(component.value()).toBe('');
    });

    it('should trim search type input', () => {
      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      component.onInput('  test  ');
      expect(component.value()).toBe('test');
    });

    it('should not process onInput when radio type', () => {
      fixture.componentRef.setInput('type', DcxInputType.RADIO);
      fixture.detectChanges();
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onInput('something');
      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit value on onChangeEvent for radio type when checked', () => {
      fixture.componentRef.setInput('type', DcxInputType.RADIO);
      fixture.componentRef.setInput('value', 'option1');
      fixture.detectChanges();
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      const event = { target: { checked: true } } as unknown as Event;
      component.onChangeEvent(event);
      expect(spy).toHaveBeenCalledWith('option1');
    });

    it('should not emit on onChangeEvent for radio type when not checked', () => {
      fixture.componentRef.setInput('type', DcxInputType.RADIO);
      fixture.detectChanges();
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      const event = { target: { checked: false } } as unknown as Event;
      component.onChangeEvent(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit on onChangeEvent when not radio type', () => {
      fixture.componentRef.setInput('type', DcxInputType.TEXT);
      fixture.detectChanges();
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      const event = { target: { checked: true } } as unknown as Event;
      component.onChangeEvent(event);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should format tel type input', () => {
      fixture.componentRef.setInput('type', DcxInputType.TEL);
      fixture.detectChanges();
      component.onInput('+1 (555) 123-4567abc');
      expect(component.value()).toBe('1 (555) 123-4567');
    });

    it('should format url type input to lowercase', () => {
      fixture.componentRef.setInput('type', DcxInputType.URL);
      fixture.detectChanges();
      component.onInput('HTTPS://EXAMPLE.COM');
      expect(component.value()).toBe('https://example.com');
    });

    it('should handle range display type', () => {
      fixture.componentRef.setInput('type', DcxInputType.RANGE);
      fixture.detectChanges();
      expect(component.displayType()).toBe('range');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue('test');
      expect(component.value()).toBe('test');
    });

    it('should implement registerOnChange', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.writeValue('change');
      TestBed.flushEffects();
      expect(fn).toHaveBeenCalled();
    });

    it('should implement registerOnTouched', () => {
      const fn = jest.fn();
      component.registerOnTouched(fn);
      component.onBlur();
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('Error display', () => {
    it('should show error message when isInvalid and errorMessage set', () => {
      fixture.componentRef.setInput('isInvalid', true);
      fixture.componentRef.setInput('errorMessage', 'Field is required');
      fixture.detectChanges();
      const errorEl = fixture.debugElement.query(
        By.css('.dcx-ng-input__error'),
      );
      expect(errorEl).toBeTruthy();
      expect(errorEl.nativeElement.textContent).toContain('Field is required');
    });

    it('should not show error when isInvalid is false', () => {
      fixture.componentRef.setInput('isInvalid', false);
      fixture.componentRef.setInput('errorMessage', 'Some error');
      fixture.detectChanges();
      const errorEl = fixture.debugElement.query(
        By.css('.dcx-ng-input__error'),
      );
      expect(errorEl).toBeFalsy();
    });

    it('should not show error when errorMessage is empty', () => {
      fixture.componentRef.setInput('isInvalid', true);
      fixture.componentRef.setInput('errorMessage', '');
      fixture.detectChanges();
      const errorEl = fixture.debugElement.query(
        By.css('.dcx-ng-input__error'),
      );
      expect(errorEl).toBeFalsy();
    });
  });

  describe('inputId', () => {
    it('should generate unique inputId', () => {
      expect(component.inputId).toBeTruthy();
      expect(component.inputId.startsWith('dcx-input-')).toBe(true);
    });
  });

  describe('Action Button', () => {
    it('should call togglePasswordVisibility on action button click for password type', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      const spy = jest.spyOn(component, 'togglePasswordVisibility');
      component.onActionButtonClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit value for search type on action button click', () => {
      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onInput('search term');
      spy.mockClear();
      component.onActionButtonClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should compute action button aria label for password', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      expect(component.getActionButtonAriaLabel()).toBe('Mostrar contraseña');
      component.togglePasswordVisibility();
      expect(component.getActionButtonAriaLabel()).toBe('Ocultar contraseña');
    });

    it('should compute action button icon for password', () => {
      fixture.componentRef.setInput('type', DcxInputType.PASSWORD);
      fixture.detectChanges();
      expect(component.getActionButtonIcon()).toBe('eye-fill');
      component.togglePasswordVisibility();
      expect(component.getActionButtonIcon()).toBe('eye-slash-fill');
    });

    it('should compute action button aria label for search', () => {
      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      expect(component.getActionButtonAriaLabel()).toBe('Buscar');
    });

    it('should compute action button icon for search', () => {
      fixture.componentRef.setInput('type', DcxInputType.SEARCH);
      fixture.detectChanges();
      expect(component.getActionButtonIcon()).toBe('search');
    });
  });

  describe('describedBy', () => {
    it('should return null when no aria-describedby and not invalid', () => {
      expect(component.describedBy()).toBeNull();
    });

    it('should include error id when invalid', () => {
      fixture.componentRef.setInput('isInvalid', true);
      fixture.detectChanges();
      expect(component.describedBy()).toContain(component.errorId());
    });
  });

  describe('Orientation', () => {
    it('should default to horizontal', () => {
      expect(component.orientation()).toBe('horizontal');
    });

    it('should apply vertical class when vertical', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(component.verticalClass).toBe(true);
    });
  });
});
