import './dcx-web-input-otp.component';

import { DcxWebInputOtp } from './dcx-web-input-otp.component';

describe('DcxWebInputOtp', () => {
  let element: DcxWebInputOtp;

  const getInputs = (): HTMLInputElement[] =>
    Array.from(
      element.shadowRoot?.querySelectorAll('input') ?? [],
    ) as HTMLInputElement[];

  const typeValue = async (
    index: number,
    value: string,
  ) => {
    const input = getInputs()[index];

    input.value = value;

    input.dispatchEvent(
      new Event('input', {
        bubbles: true,
      }),
    );

    await element.updateComplete;
  };

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-input-otp',
    ) as DcxWebInputOtp;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(
      DcxWebInputOtp,
    );
  });

  describe('Default Properties', () => {
    it('should default length to 4', () => {
      expect(element.length).toBe(4);
    });

    it('should default size to medium', () => {
      expect(element.size).toBe('medium');
    });

    it('should default integerOnly to false', () => {
      expect(element.integerOnly).toBe(false);
    });

    it('should default mask to false', () => {
      expect(element.mask).toBe(false);
    });

    it('should default invalid to false', () => {
      expect(element.invalid).toBe(false);
    });

    it('should default disabled to false', () => {
      expect(element.disabled).toBe(false);
    });

    it('should default placeholder to empty string', () => {
      expect(element.placeholder).toBe('');
    });

    it('should default ariaLabel', () => {
      expect(element.ariaLabel).toBe(
        'Código de un solo uso',
      );
    });
  });

  describe('Rendering', () => {
    it('should render 4 inputs by default', () => {
      expect(getInputs()).toHaveLength(4);
    });

    it('should render configured number of inputs', async () => {
      element.length = 6;

      await element.updateComplete;

      expect(getInputs()).toHaveLength(6);
    });

    it('should fallback to 4 inputs when length is invalid', async () => {
      element.length = 0;

      await element.updateComplete;

      expect(
        element.normalizedLength,
      ).toBe(4);

      expect(getInputs()).toHaveLength(4);
    });

    it('should floor decimal length values', async () => {
      element.length = 5.8;

      await element.updateComplete;

      expect(
        element.normalizedLength,
      ).toBe(5);

      expect(getInputs()).toHaveLength(5);
    });
  });

  describe('Size Variants', () => {
    it('should render small class', async () => {
      element.size = 'small';

      await element.updateComplete;

      expect(
        getInputs()[0].classList.contains(
          'dcx-input-otp__input--small',
        ),
      ).toBe(true);
    });

    it('should render large class', async () => {
      element.size = 'large';

      await element.updateComplete;

      expect(
        getInputs()[0].classList.contains(
          'dcx-input-otp__input--large',
        ),
      ).toBe(true);
    });
  });

  describe('Value Handling', () => {
    it('should aggregate otp value', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'valueChange',
        spy,
      );

      await typeValue(0, '1');
      await typeValue(1, '2');
      await typeValue(2, '3');
      await typeValue(3, '4');

      expect(spy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          detail: '1234',
        }),
      );
    });

    it('should emit completed when filled', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'completed',
        spy,
      );

      await typeValue(0, '1');
      await typeValue(1, '2');
      await typeValue(2, '3');
      await typeValue(3, '4');

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: '1234',
        }),
      );
    });

    it('should write external value', async () => {
      element.writeValue('5678');

      await element.updateComplete;

      expect(
        getInputs()
          .map(input => input.value)
          .join(''),
      ).toBe('5678');
    });

    it('should clear values', async () => {
      element.writeValue('1234');

      await element.updateComplete;

      element.clear();

      await element.updateComplete;

      expect(
        getInputs()
          .map(input => input.value)
          .join(''),
      ).toBe('');
    });
  });

  describe('Integer Only', () => {
    it('should sanitize input values', async () => {
      element.integerOnly = true;

      await element.updateComplete;

      await typeValue(0, 'a1');

      expect(getInputs()[0].value).toBe(
        '1',
      );
    });

    it('should clear letters when integerOnly is enabled', async () => {
      element.integerOnly = true;

      await element.updateComplete;

      await typeValue(0, 'a');

      expect(getInputs()[0].value).toBe(
        '',
      );
    });

    it('should sanitize writeValue', async () => {
      element.integerOnly = true;

      element.writeValue('a1b2345');

      await element.updateComplete;

      expect(
        getInputs()
          .map(input => input.value)
          .join(''),
      ).toBe('1234');
    });

    it('should prevent non digit keydown', () => {
      element.integerOnly = true;

      const event = new KeyboardEvent(
        'keydown',
        {
          key: 'a',
        },
      );

      const spy = jest.spyOn(
        event,
        'preventDefault',
      );

      element.onKeydown(event, 0);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Mask Mode', () => {
    it('should render password type', async () => {
      element.mask = true;

      await element.updateComplete;

      expect(
        getInputs()[0].type,
      ).toBe('password');
    });
  });

  describe('Navigation', () => {
    it('should move focus with ArrowRight', async () => {
      const inputs = getInputs();

      inputs[1].focus();

      inputs[1].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
        }),
      );

      await Promise.resolve();

      expect(
        element.shadowRoot?.activeElement,
      ).toBe(inputs[2]);
    });

    it('should move focus with ArrowLeft', async () => {
      const inputs = getInputs();

      inputs[2].focus();

      inputs[2].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
          bubbles: true,
        }),
      );

      await Promise.resolve();

      expect(
        element.shadowRoot?.activeElement,
      ).toBe(inputs[1]);
    });

    it('should move focus after typing', async () => {
      const inputs = getInputs();

      inputs[0].focus();

      await typeValue(0, '1');

      await Promise.resolve();

      expect(
        element.shadowRoot?.activeElement,
      ).toBe(inputs[1]);
    });

    it('should move to previous input on backspace', async () => {
      await typeValue(0, '1');

      const inputs = getInputs();

      inputs[1].focus();

      inputs[1].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Backspace',
          bubbles: true,
        }),
      );

      await Promise.resolve();

      expect(
        element.shadowRoot?.activeElement,
      ).toBe(inputs[0]);
    });

    it('should clear token on backspace when filled', async () => {
      await typeValue(0, '1');

      const firstInput =
        getInputs()[0];

      firstInput.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Backspace',
          bubbles: true,
        }),
      );

      await element.updateComplete;

      expect(
        element.displayTokens[0],
      ).toBe('');
    });

    it('should ignore non-navigation keys', async () => {
      await typeValue(0, '1');

      const firstInput =
        getInputs()[0];

      firstInput.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
        }),
      );

      await element.updateComplete;

      expect(
        element.displayTokens[0],
      ).toBe('1');
    });
  });

  describe('Paste', () => {
    it('should distribute pasted value', async () => {
      const pasteEvent = new Event(
        'paste',
        {
          bubbles: true,
        },
      ) as ClipboardEvent;

      Object.defineProperty(
        pasteEvent,
        'clipboardData',
        {
          value: {
            getData: () => '1234',
          },
        },
      );

      getInputs()[0].dispatchEvent(
        pasteEvent,
      );

      await element.updateComplete;

      expect(
        element.displayTokens.join(''),
      ).toBe('1234');
    });
  });

  describe('Public API', () => {
    it('should focus first empty slot', async () => {
      element.writeValue('12');

      await element.updateComplete;

      element.focus();

      await Promise.resolve();

      expect(
        element.shadowRoot?.activeElement,
      ).toBe(getInputs()[2]);
    });

    it('should focus first input when full', async () => {
      element.writeValue('1234');

      await element.updateComplete;

      element.focus();

      await Promise.resolve();

      expect(
        element.shadowRoot?.activeElement,
      ).toBe(getInputs()[0]);
    });

    it('should support setDisabledState', async () => {
      element.setDisabledState(true);

      await element.updateComplete;

      expect(
        getInputs()[0].disabled,
      ).toBe(true);
    });
  });

  describe('Events', () => {
    it('should emit focusEvent', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'focusEvent',
        spy,
      );

      getInputs()[0].dispatchEvent(
        new FocusEvent('focus'),
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should emit blurEvent', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'blurEvent',
        spy,
      );

      getInputs()[0].dispatchEvent(
        new FocusEvent('blur'),
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should emit focus index', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'focusEvent',
        spy,
      );

      getInputs()[2].dispatchEvent(
        new FocusEvent('focus'),
      );

      expect(
        spy.mock.calls[0][0].detail,
      ).toBe(2);
    });

    it('should emit blur index', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'blurEvent',
        spy,
      );

      getInputs()[3].dispatchEvent(
        new FocusEvent('blur'),
      );

      expect(
        spy.mock.calls[0][0].detail,
      ).toBe(3);
    });
  });

  describe('Accessibility WCAG', () => {
    it('should render role group', () => {
      const group =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__group',
        );

      expect(
        group?.getAttribute('role'),
      ).toBe('group');
    });

    it('should render default aria-label', () => {
      const group =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__group',
        );

      expect(
        group?.getAttribute('aria-label'),
      ).toBe(
        'Código de un solo uso',
      );
    });

    it('should create digit labels', async () => {
      element.length = 6;

      await element.updateComplete;

      expect(
        element.getAriaLabel(0),
      ).toBe('Dígito 1 de 6');

      expect(
        getInputs()[2].getAttribute(
          'aria-label',
        ),
      ).toBe('Dígito 3 de 6');
    });

    it('should render role alert when invalid', async () => {
      element.invalid = true;
      element.errorMessage =
        'Código incorrecto';

      await element.updateComplete;

      const error =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__error',
        );

      expect(error).toBeTruthy();

      expect(
        error?.getAttribute('role'),
      ).toBe('alert');
    });

    it('should link aria-describedby', async () => {
      element.invalid = true;

      element.errorMessage =
        'Código incorrecto';

      await element.updateComplete;

      const group =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__group',
        );

      expect(
        group?.getAttribute(
          'aria-describedby',
        ),
      ).toBe(element.errorId);
    });

    it('should not set aria-describedby without error', () => {
      const group =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__group',
        );

      expect(
        group?.getAttribute(
          'aria-describedby',
        ),
      ).toBeNull();
    });
  });

  describe('BEM Classes', () => {
    it('should render base input class', () => {
      expect(
        getInputs()[0].classList.contains(
          'dcx-input-otp__input',
        ),
      ).toBe(true);
    });

    it('should render filled class', async () => {
      await typeValue(0, '1');

      expect(
        getInputs()[0].classList.contains(
          'dcx-input-otp__input--filled',
        ),
      ).toBe(true);
    });

    it('should render error container class', async () => {
      element.invalid = true;
      element.errorMessage = 'Error';

      await element.updateComplete;

      const error =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__error',
        );

      expect(error).toBeTruthy();
    });

    it('should render group class', () => {
      const group =
        element.shadowRoot?.querySelector(
          '.dcx-input-otp__group',
        );

      expect(group).toBeTruthy();
    });
  });
});