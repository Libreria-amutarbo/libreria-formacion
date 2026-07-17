import './dcx-web-page-stepper.component';

import { DcxWebPageStepper } from './dcx-web-page-stepper.component';

describe('DcxWebPageStepper', () => {
  let element: DcxWebPageStepper;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-stepper',
    ) as DcxWebPageStepper;

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
      'Stepper',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(12);
  });

  it('should render all steppers', () => {
    const steppers =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-stepper',
      );

    expect(steppers?.length).toBe(12);
  });

  it('should render horizontal demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Horizontal');
  });

  it('should render vertical demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Vertical');
  });

  it('should render linear demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Lineal');
  });

  it('should render content demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Con contenido por paso');
  });

  it('should render slot content example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Dirección de envío');
  });

  it('should render size examples', () => {
    const page =
      element.shadowRoot?.textContent;

    expect(page).toContain('Pequeño');
    expect(page).toContain('Grande');
    expect(page).toContain('Extra grande');
  });

  it('should render icon example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Sin números (con iconos)',
    );
  });

  it('should render accessibility example', () => {
    const steppers =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-stepper',
      );

    const contentStepper =
      steppers?.[7];

    expect(
      contentStepper?.getAttribute(
        'aria-label',
      ),
    ).toBe('Proceso de compra');
  });
});