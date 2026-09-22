import './dcx-web-page-navbar.component';

import { DcxWebPageNavbar } from './dcx-web-page-navbar.component';

describe('DcxWebPageNavbar', () => {
  let element: DcxWebPageNavbar;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-navbar',
    ) as DcxWebPageNavbar;

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
      'Navbar',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(7);
  });

  it('should render all navbar demos', () => {
    const navbars =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-navbar',
      );

    expect(navbars?.length).toBe(7);
  });

  it('should render vertical demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Modo vertical (sidebar)',
    );
  });

  it('should render mobile demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Menú móvil abierto',
    );
  });

  it('should update active value when itemClick is emitted', async () => {
    const navbar =
      element.shadowRoot?.querySelector(
        'dcx-web-navbar',
      );

    navbar?.dispatchEvent(
      new CustomEvent('itemClick', {
        detail: 'guides',
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    expect(element.activeValue).toBe(
      'guides',
    );
  });

  it('should render slot actions example', () => {
    const buttons =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-button',
      );

    expect(
      (buttons?.length ?? 0) > 0,
    ).toBe(true);
  });

  it('should render active item helper text', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Item activo');
  });
});