import './dcx-web-page-input.component';

import { DcxWebPageInput } from './dcx-web-page-input.component';

describe('DcxWebPageInput', () => {
  let element: DcxWebPageInput;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-input',
    ) as DcxWebPageInput;

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
      'Input',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(12);
  });

  it('should render all input demos', () => {
    const inputs =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-input',
      );

    expect(inputs?.length).toBe(17);
  });

  it('should provide password error examples', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Invalid List');
  });

  it('should render sizes demo', () => {
    const sizesSection =
      element.shadowRoot?.textContent;

    expect(sizesSection).toContain(
      'Sizes',
    );
  });

  it('should render files demo', () => {
    const page =
      element.shadowRoot?.textContent;

    expect(page).toContain('Files');
  });
});