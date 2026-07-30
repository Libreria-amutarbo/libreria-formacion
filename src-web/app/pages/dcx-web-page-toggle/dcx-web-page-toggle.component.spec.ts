import './dcx-web-page-toggle.component';

import { DcxWebPageToggle } from './dcx-web-page-toggle.component';

describe('DcxWebPageToggle', () => {
  let element: DcxWebPageToggle;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-toggle',
    ) as DcxWebPageToggle;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render page title', () => {
    const title =
      element.shadowRoot?.querySelector(
        '.demo-page-header__title',
      );

    expect(title?.textContent).toContain(
      'Toggle',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(7);
  });

  it('should render all expected titles', () => {
    const text =
      element.shadowRoot?.textContent ?? '';

    expect(text).toContain('Básico');
    expect(text).toContain('Deshabilitado');
    expect(text).toContain(
      'Sin label visible',
    );
    expect(text).toContain(
      'Posiciones del texto',
    );
    expect(text).toContain('Tamaños');
    expect(text).toContain(
      'Controlado por evento',
    );
    expect(text).toContain(
      'Formulario reactivo',
    );
  });

  it('should render all toggle examples', () => {
    const toggles =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-toggle',
      );

    expect(toggles?.length).toBe(10);
  });

  it('should update dark mode state', async () => {
    const toggle =
      element.shadowRoot?.querySelector(
        'dcx-web-toggle',
      );

    toggle?.dispatchEvent(
      new CustomEvent('toggled', {
        detail: true,
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    expect(
      element.isDarkMode,
    ).toBe(true);
  });

  it('should update event section state', async () => {
    const toggles =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-toggle',
      );

    const eventToggle = toggles?.[7];

    eventToggle?.dispatchEvent(
      new CustomEvent('toggled', {
        detail: true,
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    expect(
      element.eventState,
    ).toBe(true);
  });

  it('should update reactive form demo value', async () => {
    const toggles =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-toggle',
      );

    const formToggle = toggles?.[8];

    formToggle?.dispatchEvent(
      new CustomEvent('toggled', {
        detail: false,
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    expect(
      element.notifications,
    ).toBe(false);
  });

  it('should show ON for default notifications state', () => {
    const text =
      element.shadowRoot?.textContent ?? '';

    expect(text).toContain(
      'Valor del FormControl: ON',
    );
  });
});