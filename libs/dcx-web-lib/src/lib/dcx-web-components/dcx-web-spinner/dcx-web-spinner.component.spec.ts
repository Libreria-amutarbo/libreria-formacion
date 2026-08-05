import './dcx-web-spinner.component';

import { DcxWebSpinner } from './dcx-web-spinner.component';

describe('DcxWebSpinner', () => {
  let element: DcxWebSpinner;

  beforeEach(async () => {
    element = document.createElement('dcx-web-spinner') as DcxWebSpinner;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebSpinner);
  });

  describe('Default Properties', () => {
    it('should have Angular defaults', () => {
      expect(element.size).toBe('m');
      expect(element.wrapper).toBe(false);
      expect(element.delay).toBe(1300);
      expect(element.color).toBeNull();
      expect(element.title).toBe('');
      expect(element.description).toBe('');
      expect(element.ariaLabel).toBeNull();
    });
  });

  describe('Classes', () => {
    it('should include size class', () => {
      element.size = 'l';

      expect(element.spinnerClasses()).toContain('dcx-spinner--l');
    });

    it('should include wrapper class', () => {
      element.wrapper = true;

      expect(element.spinnerClasses()).toContain('dcx-spinner--wrapper');
    });
  });

  describe('Computed', () => {
    it('should compute hasContent false', () => {
      expect(element.hasContent).toBe(false);
    });

    it('should compute hasContent true from title', () => {
      element.title = 'Cargando';

      expect(element.hasContent).toBe(true);
    });

    it('should use ariaLabel first', () => {
      element.title = 'Cargando';

      element.ariaLabel = 'Guardando';

      expect(element.computedAriaLabel).toBe('Guardando');
    });

    it('should fallback to title', () => {
      element.title = 'Cargando';

      expect(element.computedAriaLabel).toBe('Cargando');
    });

    it('should fallback to default text', () => {
      expect(element.computedAriaLabel).toBe('Cargando…');
    });
  });

  describe('Accessibility', () => {
    it('should render role status', async () => {
      element.delay = 0;

      await element.updateComplete;

      const host = element.shadowRoot?.querySelector('.dcx-spinner');

      expect(host?.getAttribute('role')).toBe('status');
    });

    it('should render aria-live polite', async () => {
      element.delay = 0;

      await element.updateComplete;

      const host = element.shadowRoot?.querySelector('.dcx-spinner');

      expect(host?.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Rendering', () => {
    it('should render circle when visible', async () => {
      element.delay = 0;

      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('.dcx-spinner__circle');

      expect(circle).toBeTruthy();
    });

    it('should render title', async () => {
      element.delay = 0;
      element.title = 'Cargando';

      await element.updateComplete;

      const title = element.shadowRoot?.querySelector('.dcx-spinner__title');

      expect(title?.textContent).toContain('Cargando');
    });

    it('should render description', async () => {
      element.delay = 0;

      element.description = 'Espere';

      await element.updateComplete;

      const desc = element.shadowRoot?.querySelector(
        '.dcx-spinner__description',
      );

      expect(desc?.textContent).toContain('Espere');
    });

    it('should render slot in wrapper mode', async () => {
      element.wrapper = true;

      await element.updateComplete;

      const slot = element.shadowRoot?.querySelector('slot');

      expect(slot).toBeTruthy();
    });
  });
});
