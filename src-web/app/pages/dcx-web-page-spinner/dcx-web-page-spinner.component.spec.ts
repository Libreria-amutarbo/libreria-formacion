import './dcx-web-page-spinner.component';

import { DcxWebPageSpinner } from './dcx-web-page-spinner.component';

describe('DcxWebPageSpinner', () => {
  let element: DcxWebPageSpinner;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-spinner',
    ) as DcxWebPageSpinner;

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
      'Spinner',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(5);
  });

  it('should render spinner demos', () => {
    const spinners =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-spinner',
      );

    expect(spinners?.length).toBe(10);
  });

  it('should render sizes demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Tamaños');
  });

  it('should render custom color demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Color personalizado',
    );
  });

  it('should render title and description demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Con título y descripción',
    );
  });

  it('should render delay demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Con delay');
  });

  it('should render wrapper demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Modo wrapper',
    );
  });

  it('should render projected content example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Contenido');
  });
});