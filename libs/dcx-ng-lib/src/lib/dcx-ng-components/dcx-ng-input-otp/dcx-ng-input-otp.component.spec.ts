import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgInputOtpComponent } from './dcx-ng-input-otp.component';

describe('DcxNgInputOtpComponent', () => {
  let component: DcxNgInputOtpComponent;
  let fixture: ComponentFixture<DcxNgInputOtpComponent>;

  const getInputs = (): HTMLInputElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('input'));

  const typeValue = (index: number, value: string) => {
    const input = getInputs()[index];
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgInputOtpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgInputOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the configured number of inputs', () => {
    fixture.componentRef.setInput('length', 6);
    fixture.detectChanges();

    expect(getInputs()).toHaveLength(6);
  });

  it('should fallback to 4 inputs when length is invalid', () => {
    fixture.componentRef.setInput('length', 0);
    fixture.detectChanges();

    expect(getInputs()).toHaveLength(4);
  });

  it('should floor decimal lengths', () => {
    fixture.componentRef.setInput('length', 5.8);
    fixture.detectChanges();

    expect(getInputs()).toHaveLength(5);
  });

  it('should aggregate the otp value in order', () => {
    const valueChangeSpy = jest.spyOn(component.valueChange, 'emit');

    typeValue(0, '1');
    typeValue(1, '2');
    typeValue(2, '3');
    typeValue(3, '4');

    expect(valueChangeSpy).toHaveBeenLastCalledWith('1234');
  });

  it('should restrict input when integerOnly is true', () => {
    fixture.componentRef.setInput('integerOnly', true);
    fixture.detectChanges();

    typeValue(0, 'a1');

    expect(getInputs()[0].value).toBe('1');
  });

  it('should clear letters entered into a slot when integerOnly is true', () => {
    fixture.componentRef.setInput('integerOnly', true);
    fixture.detectChanges();

    typeValue(0, 'a');

    expect(getInputs()[0].value).toBe('');
  });

  it('should prevent non-digit key presses when integerOnly is true', () => {
    fixture.componentRef.setInput('integerOnly', true);
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    component.onKeydown(event, 0);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should sanitize written values when integerOnly is true', () => {
    fixture.componentRef.setInput('integerOnly', true);
    fixture.detectChanges();

    component.writeValue('a1b2345');
    fixture.detectChanges();

    expect(getInputs().map((input) => input.value).join('')).toBe('1234');
  });

  it('should mask values when mask is true', () => {
    fixture.componentRef.setInput('mask', true);
    fixture.detectChanges();

    expect(getInputs()[0].type).toBe('password');
  });

  it('should move focus to the next input after typing', async () => {
    const inputs = getInputs();
    inputs[0].focus();

    typeValue(0, '1');
    await fixture.whenStable();

    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should move focus with arrow keys', async () => {
    const inputs = getInputs();
    inputs[1].focus();

    inputs[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(inputs[2]);

    inputs[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should move focus to the previous input on backspace when empty', async () => {
    typeValue(0, '1');
    fixture.detectChanges();

    const inputs = getInputs();
    inputs[1].focus();
    inputs[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(inputs[0]);
  });

  it('should clear the current token on backspace when it is filled', () => {
    typeValue(0, '1');

    const firstInput = getInputs()[0];
    firstInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }),
    );
    fixture.detectChanges();

    expect(firstInput.value).toBe('');
  });

  it('should ignore non-navigation keydown events', () => {
    typeValue(0, '1');

    const firstInput = getInputs()[0];
    firstInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }),
    );
    fixture.detectChanges();

    expect(firstInput.value).toBe('1');
  });

  it('should distribute pasted characters across inputs', () => {
    const pasteEvent = new Event('paste', { bubbles: true }) as ClipboardEvent;

    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: {
        getData: () => '1234',
      },
    });

    getInputs()[0].dispatchEvent(pasteEvent);
    fixture.detectChanges();

    expect(getInputs().map((input) => input.value).join('')).toBe('1234');
  });

  it('should clear a token when input becomes empty', () => {
    typeValue(0, '1');

    const firstInput = getInputs()[0];
    firstInput.value = '';
    firstInput.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(firstInput.value).toBe('');
  });

  it('should emit completed when all positions are filled', () => {
    const completedSpy = jest.spyOn(component.completed, 'emit');

    typeValue(0, '1');
    typeValue(1, '2');
    typeValue(2, '3');
    typeValue(3, '4');

    expect(completedSpy).toHaveBeenLastCalledWith('1234');
  });

  it('should integrate with Angular forms value writing', () => {
    component.writeValue('5678');
    fixture.detectChanges();

    expect(getInputs().map((input) => input.value).join('')).toBe('5678');
  });

  it('should support the public focus helper', async () => {
    component.writeValue('12');
    fixture.detectChanges();

    component.focus();
    await fixture.whenStable();

    expect(document.activeElement).toBe(getInputs()[2]);
  });

  it('should focus the first input when all positions are filled', async () => {
    component.writeValue('1234');
    fixture.detectChanges();

    component.focus();
    await fixture.whenStable();

    expect(document.activeElement).toBe(getInputs()[0]);
  });

  it('should clear all values with the public clear helper', async () => {
    component.writeValue('1234');
    fixture.detectChanges();

    component.clear();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getInputs().map((input) => input.value).join('')).toBe('');
    expect(document.activeElement).toBe(getInputs()[0]);
  });

  it('should emit focus and blur events and mark the control as touched', () => {
    const focusSpy = jest.spyOn(component.focusEvent, 'emit');
    const blurSpy = jest.spyOn(component.blurEvent, 'emit');
    const touchedSpy = jest.fn();

    component.registerOnTouched(touchedSpy);

    const firstInput = getInputs()[0];
    firstInput.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    firstInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    fixture.detectChanges();

    expect(focusSpy).toHaveBeenCalledWith(0);
    expect(blurSpy).toHaveBeenCalledWith(0);
    expect(touchedSpy).toHaveBeenCalled();
  });

  it('should expose template context attributes and handlers', () => {
    fixture.componentRef.setInput('integerOnly', true);
    fixture.componentRef.setInput('mask', true);
    fixture.componentRef.setInput('placeholder', '•');
    fixture.componentRef.setInput('ariaLabel', 'OTP');
    fixture.detectChanges();

    const context = component.getTemplateContext('1', 1);

    expect(context.token).toBe('1');
    expect(context.attrs.type).toBe('password');
    expect(context.attrs.inputmode).toBe('numeric');
    expect(context.attrs.placeholder).toBe('•');
    expect(context.attrs.ariaLabel).toBe('Dígito 2 de 4');
    expect(context.attrs.value).toBe('1');
    expect(typeof context.events.input).toBe('function');
    expect(typeof context.events.keydown).toBe('function');
    expect(typeof context.events.paste).toBe('function');
    expect(typeof context.events.focus).toBe('function');
    expect(typeof context.events.blur).toBe('function');
  });

  it('should block interaction while disabled from the form API', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    typeValue(0, '1');

    expect(component.displayTokens().join('')).toBe('');
    expect(getInputs()[0].disabled).toBe(true);
    expect(fixture.nativeElement.classList.contains('dcx-input-otp--disabled')).toBe(
      true,
    );
  });

  it('should apply invalid styles when invalid is true', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('dcx-input-otp--invalid')).toBe(
      true,
    );
  });

  describe('accesibilidad (WCAG)', () => {
    const getGroup = (): HTMLElement =>
      fixture.nativeElement.querySelector('.dcx-input-otp__group');
    const getError = (): HTMLElement | null =>
      fixture.nativeElement.querySelector('.dcx-input-otp__error');

    it('should default the group aria-label to Spanish', () => {
      expect(component.ariaLabel()).toBe('Código de un solo uso');
      expect(getGroup().getAttribute('aria-label')).toBe('Código de un solo uso');
    });

    it('should build per-box aria-label in Spanish ("Dígito N de M")', () => {
      fixture.componentRef.setInput('length', 6);
      fixture.detectChanges();
      expect(component.getAriaLabel(0)).toBe('Dígito 1 de 6');
      expect(getInputs()[2].getAttribute('aria-label')).toBe('Dígito 3 de 6');
    });

    it('should render a role="alert" error only when invalid and errorMessage set', () => {
      expect(getError()).toBeNull();

      fixture.componentRef.setInput('errorMessage', 'Código incorrecto');
      fixture.detectChanges();
      expect(getError()).toBeNull(); // aún no es inválido

      fixture.componentRef.setInput('invalid', true);
      fixture.detectChanges();
      const error = getError();
      expect(error).toBeTruthy();
      expect(error?.getAttribute('role')).toBe('alert');
      expect(error?.textContent).toContain('Código incorrecto');
    });

    it('should link the group to the error via aria-describedby', () => {
      fixture.componentRef.setInput('invalid', true);
      fixture.componentRef.setInput('errorMessage', 'Código incorrecto');
      fixture.detectChanges();
      expect(component.describedBy()).toBe(component.errorId);
      expect(getGroup().getAttribute('aria-describedby')).toBe(component.errorId);
    });

    it('should not set aria-describedby when there is no error', () => {
      expect(component.describedBy()).toBeNull();
      expect(getGroup().getAttribute('aria-describedby')).toBeNull();
    });
  });
});
