import './dcx-web-page-textarea.component';

import { DcxWebPageTextarea } from './dcx-web-page-textarea.component';

describe('DcxWebPageTextarea', () => {
  let element: DcxWebPageTextarea;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-textarea',
    ) as DcxWebPageTextarea;

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
      'Textarea',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(11);
  });

  it('should render textarea demos', () => {
    const textareas =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-textarea',
      );

    expect(textareas?.length).toBe(13);
  });

  it('should render float label examples', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Variantes de label flotante',
    );
  });

  it('should render IFTA demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'IFTA Label',
    );
  });

  it('should render sizes demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Tamaños',
    );
  });

  it('should render hint demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Con hint y límite de caracteres',
    );
  });

  it('should render resize demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Resize manual desactivado',
    );
  });
});