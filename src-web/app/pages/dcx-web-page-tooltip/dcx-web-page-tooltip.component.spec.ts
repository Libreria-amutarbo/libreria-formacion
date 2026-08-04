import './dcx-web-page-tooltip.component';

import { DcxWebPageTooltip } from './dcx-web-page-tooltip.component';

describe('DcxWebPageTooltip', () => {
  let element: DcxWebPageTooltip;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-tooltip',
    ) as DcxWebPageTooltip;

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
      'Tooltip',
    );
  });

  it('should render page description', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Información contextual accesible',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(7);
  });

  it('should render tooltip examples', () => {
    const tooltips =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-tooltip',
      );

    expect(tooltips?.length).toBe(14);
  });

  it('should render positions demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Posiciones y alineación de flecha',
    );
  });

  it('should render hide on click demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Ocultar al hacer clic',
    );
  });

  it('should render formatted content demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Contenido formateado',
    );
  });

  it('should render primary variant demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Variante primary',
    );
  });

  it('should render icon trigger demo', () => {
    const icons =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-icon',
      );

    expect(icons?.length).toBeGreaterThan(0);
  });
});