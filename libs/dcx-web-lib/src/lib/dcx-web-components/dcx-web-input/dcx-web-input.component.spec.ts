import './dcx-web-input.component';

import { DcxWebInput } from './dcx-web-input.component';

describe('DcxWebInput', () => {
  let element: DcxWebInput;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-input',
    ) as DcxWebInput;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebInput);
  });

  describe('Default Properties', () => {
    it('should have default type as text', () => {
      expect(element.type).toBe('text');
    });

    it('should have default value as empty string', () => {
      expect(element.value).toBe('');
    });

    it('should have default placeholder as empty string', () => {
      expect(element.placeholder).toBe('');
    });

    it('should have default disabled as false', () => {
      expect(element.disabled).toBe(false);
    });

    it('should have default readonly as false', () => {
      expect(element.readonly).toBe(false);
    });

    it('should have default required as false', () => {
      expect(element.required).toBe(false);
    });

    it('should have default invalid as false', () => {
      expect(element.isInvalid).toBe(false);
    });

    it('should default to horizontal orientation', () => {
      expect(element.orientation).toBe('horizontal');
    });
  });

  describe('Rendering', () => {
    it('should render input element', () => {
      const input =
        element.shadowRoot?.querySelector('input');

      expect(input).toBeTruthy();
    });

    it('should render label when provided', async () => {
      element.label = 'Nombre';

      await element.updateComplete;

      const label =
        element.shadowRoot?.querySelector(
          '.dcx-input__label',
        );

      expect(label?.textContent).toContain(
        'Nombre',
      );
    });

    it('should not render label when empty', async () => {
      element.label = '';

      await element.updateComplete;

      const label =
        element.shadowRoot?.querySelector(
          '.dcx-input__label',
        );

      expect(label).toBeFalsy();
    });

    it('should render required indicator', async () => {
      element.label = 'Nombre';
      element.required = true;

      await element.updateComplete;

      const required =
        element.shadowRoot?.querySelector(
          '.dcx-input__required',
        );

      expect(required?.textContent).toContain('*');
    });
  });

  describe('WCAG', () => {
    it('should generate valid id', () => {
      expect(element.id).toContain(
        'dcx-input-',
      );
    });

    it('should derive labelId', () => {
      expect(element.labelId).toBe(
        `${element.id}-label`,
      );
    });

    it('should derive errorId', () => {
      expect(element.errorId).toBe(
        `${element.id}-error`,
      );
    });

    it('should derive hintId', () => {
      expect(element.hintId).toBe(
        `${element.id}-hint`,
      );
    });

    it('should connect label and input', async () => {
      element.label = 'Nombre';

      await element.updateComplete;

      const label =
        element.shadowRoot?.querySelector('label');

      const input =
        element.shadowRoot?.querySelector('input');

      expect(
        label?.getAttribute('for'),
      ).toBe(input?.getAttribute('id'));
    });
  });

  describe('Hint', () => {
    it('should render hint', async () => {
      element.hint = 'Texto ayuda';

      await element.updateComplete;

      const hint =
        element.shadowRoot?.querySelector(
          '.dcx-input__hint',
        );

      expect(hint?.textContent).toContain(
        'Texto ayuda',
      );
    });

    it('should add hint id to describedBy', async () => {
      element.hint = 'help';

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector('input');

      expect(
        input?.getAttribute(
          'aria-describedby',
        ),
      ).toContain(element.hintId);
    });

    it('should hide hint when invalid', async () => {
      element.hint = 'help';
      element.isInvalid = true;

      await element.updateComplete;

      const hint =
        element.shadowRoot?.querySelector(
          '.dcx-input__hint',
        );

      expect(hint).toBeFalsy();
    });
  });

  describe('Error Rendering', () => {
    it('should render error message', async () => {
      element.isInvalid = true;
      element.errorMessage =
        'Campo inválido';

      await element.updateComplete;

      const error =
        element.shadowRoot?.querySelector(
          '.dcx-input__error',
        );

      expect(error?.textContent).toContain(
        'Campo inválido',
      );
    });

    it('should render error list', async () => {
      element.isInvalid = true;

      element.errorMessages = [
        {
          type: 'min',
          message: 'Min 6',
        },
        {
          type: 'upper',
          message: 'Need upper',
        },
      ];

      await element.updateComplete;

      const items =
        element.shadowRoot?.querySelectorAll(
          '.dcx-input__error-list li',
        );

      expect(items?.length).toBe(2);
    });

    it('should render role alert', async () => {
      element.isInvalid = true;
      element.errorMessage = 'Error';

      await element.updateComplete;

      const error =
        element.shadowRoot?.querySelector(
          '.dcx-input__error',
        );

      expect(
        error?.getAttribute('role'),
      ).toBe('alert');
    });

    it('should render error icon', async () => {
      element.isInvalid = true;
      element.errorMessage = 'Error';

      await element.updateComplete;

      const icon =
        element.shadowRoot?.querySelector(
          'dcx-web-icon',
        );

      expect(icon).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should emit valueChange', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'valueChange',
        spy,
      );

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value = 'hola';

      input.dispatchEvent(
        new Event('input', {
          bubbles: true,
        }),
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should emit focusEvent', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'focusEvent',
        spy,
      );

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.dispatchEvent(
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

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.dispatchEvent(
        new FocusEvent('blur'),
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should emit enterPressed', async () => {
      const spy = jest.fn();

      element.addEventListener(
        'enterPressed',
        spy,
      );

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
        }),
      );

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Formatting', () => {
    it('should format email to lowercase', async () => {
      element.type = 'email' as never;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value = 'TEST@EMAIL.COM';

      input.dispatchEvent(
        new Event('input'),
      );

      expect(element.value).toBe(
        'test@email.com',
      );
    });

    it('should format number value', async () => {
      element.type = 'number' as never;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value = '123';

      input.dispatchEvent(
        new Event('input'),
      );

      expect(element.value).toBe(123);
    });

    it('should return empty string for empty number input', async () => {
      element.type = 'number' as never;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value = '';

      input.dispatchEvent(
        new Event('input'),
      );

      expect(element.value).toBe('');
    });

    it('should trim search values', async () => {
      element.type = 'search' as never;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value = '  buscador  ';

      input.dispatchEvent(
        new Event('input'),
      );

      expect(element.value).toBe(
        'buscador',
      );
    });

    it('should format tel values', async () => {
      element.type = 'tel' as never;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value =
        '+34 (666) 111-222abc';

      input.dispatchEvent(
        new Event('input'),
      );

      expect(element.value).toBe(
        '34 (666) 111-222',
      );
    });

    it('should format url to lowercase', async () => {
      element.type = 'url' as never;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.value =
        'HTTPS://EXAMPLE.COM';

      input.dispatchEvent(
        new Event('input'),
      );

      expect(element.value).toBe(
        'https://example.com',
      );
    });
  });

  describe('Password Mode', () => {
    it('should render password type by default', async () => {
      element.type = 'password' as never;

      await element.updateComplete;

      expect(
        element.displayType,
      ).toBe('password');
    });

    it('should toggle password visibility through action button', async () => {
      element.type = 'password' as never;

      await element.updateComplete;

      const button =
        element.shadowRoot?.querySelector(
          'dcx-web-button',
        );

      button?.dispatchEvent(
        new CustomEvent('buttonClick', {
          bubbles: true,
          composed: true,
        }),
      );

      await element.updateComplete;

      expect(
        element.displayType,
      ).toBe('text');
    });

    it('should show action button', async () => {
      element.type = 'password' as never;

      await element.updateComplete;

      const button =
        element.shadowRoot?.querySelector(
          'dcx-web-button',
        );

      expect(button).toBeTruthy();
    });
  });

  describe('Search Mode', () => {
    it('should emit valueChange from action button', async () => {
      element.type = 'search' as never;
      element.value = 'buscar';

      await element.updateComplete;

      const spy = jest.fn();

      element.addEventListener(
        'valueChange',
        spy,
      );

      const button =
        element.shadowRoot?.querySelector(
          'dcx-web-button',
        );

      button?.dispatchEvent(
        new CustomEvent('buttonClick', {
          bubbles: true,
          composed: true,
        }),
      );

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Input Icons', () => {
    it('should render icon for email', async () => {
      element.type = 'email' as never;

      await element.updateComplete;

      const icon =
        element.shadowRoot?.querySelector(
          '.dcx-input__leading-icon',
        );

      expect(icon).toBeTruthy();
    });

    it('should render icon for search', async () => {
      element.type = 'search' as never;

      await element.updateComplete;

      const icon =
        element.shadowRoot?.querySelector(
          '.dcx-input__leading-icon',
        );

      expect(icon).toBeTruthy();
    });
  });

  describe('Radio Support', () => {
    it('should emit valueChange when radio is checked', async () => {
      element.type = 'radio' as never;
      element.value = 'option1';

      await element.updateComplete;

      const spy = jest.fn();

      element.addEventListener(
        'valueChange',
        spy,
      );

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.checked = true;

      input.dispatchEvent(
        new Event('change'),
      );

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Required Warning', () => {
    it('should render required warning after blur', async () => {
      element.required = true;

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.dispatchEvent(
        new FocusEvent('blur'),
      );

      await element.updateComplete;

      const error =
        element.shadowRoot?.querySelector(
          '.dcx-input__error',
        );

      expect(error?.textContent).toContain(
        'Este campo es requerido',
      );
    });

    it('should render custom required message', async () => {
      element.required = true;

      element.requiredMessage =
        'Campo obligatorio personalizado';

      await element.updateComplete;

      const input =
        element.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

      input.dispatchEvent(
        new FocusEvent('blur'),
      );

      await element.updateComplete;

      const error =
        element.shadowRoot?.querySelector(
          '.dcx-input__error',
        );

      expect(error?.textContent).toContain(
        'Campo obligatorio personalizado',
      );
    });
  });

  describe('Orientation', () => {
    it('should update orientation property', async () => {
      element.orientation = 'vertical';

      await element.updateComplete;

      expect(
        element.getAttribute(
          'orientation',
        ),
      ).toBe('vertical');
    });
  });
});