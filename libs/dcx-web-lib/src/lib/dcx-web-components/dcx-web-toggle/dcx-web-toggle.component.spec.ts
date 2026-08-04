import './dcx-web-toggle.component';

import { DcxWebToggle } from './dcx-web-toggle.component';

describe('DcxWebToggle', () => {
  let element: DcxWebToggle;

  beforeEach(async () => {
    element =
      document.createElement(
        'dcx-web-toggle',
      ) as DcxWebToggle;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(
      DcxWebToggle,
    );
  });

  describe('Default Properties', () => {
    it('should have default values', () => {
      expect(element.checked).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.label).toBeNull();
      expect(element.size).toBe('m');
      expect(element.textPosition).toBe(
        'right',
      );
    });
  });

  describe('Rendering', () => {
    it('should render native button', () => {
      const button =
        element.shadowRoot?.querySelector(
          'button',
        );

      expect(button).toBeTruthy();
    });

    it('should render switch role', () => {
      const button =
        element.shadowRoot?.querySelector(
          'button',
        );

      expect(
        button?.getAttribute('role'),
      ).toBe('switch');
    });

    it('should render label', async () => {
      element.label = 'Toggle me';

      await element.updateComplete;

      const label =
        element.shadowRoot?.querySelector(
          '.dcx-toggle__label',
        );

      expect(
        label?.textContent,
      ).toContain('Toggle me');
    });

    it('should expose BEM classes', () => {
      const track =
        element.shadowRoot?.querySelector(
          '.dcx-toggle__track',
        );

      const thumb =
        element.shadowRoot?.querySelector(
          '.dcx-toggle__thumb',
        );

      expect(track).toBeTruthy();
      expect(thumb).toBeTruthy();
    });
  });

  describe('Toggle Behaviour', () => {
    it('should toggle checked state', () => {
      element.toggle();

      expect(element.checked).toBe(true);

      element.toggle();

      expect(element.checked).toBe(false);
    });

    it('should toggle through click', async () => {
      const button =
        element.shadowRoot?.querySelector(
          'button',
        ) as HTMLButtonElement;

      button.click();

      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should not toggle when disabled', () => {
      element.disabled = true;

      element.toggle();

      expect(element.checked).toBe(false);
    });
  });

  describe('Events', () => {
    it('should emit toggled', () => {
      const spy = jest.fn();

      element.addEventListener(
        'toggled',
        spy,
      );

      element.toggle();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit toggled value', () => {
      const spy = jest.fn();

      element.addEventListener(
        'toggled',
        spy,
      );

      element.toggle();

      expect(
        spy.mock.calls[0][0].detail,
      ).toBe(true);
    });

    it('should not emit toggled when disabled', () => {
      const spy = jest.fn();

      element.disabled = true;

      element.addEventListener(
        'toggled',
        spy,
      );

      element.toggle();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Size Variants', () => {
    it('should apply l size class', () => {
      element.size = 'l' as never;

      expect(
        element.getToggleClasses(),
      ).toContain(
        'dcx-toggle--l',
      );
    });

    it('should apply xl size class', () => {
      element.size = 'xl' as never;

      expect(
        element.getToggleClasses(),
      ).toContain(
        'dcx-toggle--xl',
      );
    });

    it('should handle empty size', () => {
      element.size = '' as never;

      expect(
        element.getToggleClasses(),
      ).toContain('dcx-toggle');
    });
  });

  describe('Text Position', () => {
    it('should apply right position', () => {
      expect(
        element.getToggleClasses(),
      ).toContain(
        'dcx-toggle--right',
      );
    });

    it('should apply left position', () => {
      element.textPosition =
        'left' as never;

      expect(
        element.getToggleClasses(),
      ).toContain(
        'dcx-toggle--left',
      );
    });
  });

  describe('WCAG', () => {
    it('should use ariaLabel when provided', () => {
      element.ariaLabel =
        'Custom toggle';

      expect(
        element.effectiveAriaLabel,
      ).toBe('Custom toggle');
    });

    it('should fallback to label', () => {
      element.label = 'Dark mode';

      expect(
        element.effectiveAriaLabel,
      ).toBe('Dark mode');
    });

    it('should fallback to Toggle', () => {
      expect(
        element.effectiveAriaLabel,
      ).toBe('Toggle');
    });

    it('should set aria-checked', async () => {
      element.checked = true;

      await element.updateComplete;

      const button =
        element.shadowRoot?.querySelector(
          'button',
        );

      expect(
        button?.getAttribute(
          'aria-checked',
        ),
      ).toBe('true');
    });
  });

  describe('Checked State Rendering', () => {
    it('should apply checked thumb class', async () => {
      element.checked = true;

      await element.updateComplete;

      const thumb =
        element.shadowRoot?.querySelector(
          '.dcx-toggle__thumb',
        );

      expect(
        thumb?.classList.contains(
          'dcx-toggle__thumb--checked',
        ),
      ).toBe(true);
    });
  });
});