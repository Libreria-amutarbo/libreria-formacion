import './dcx-web-page-scroll-top-down.component';

import { DcxWebPageScrollTopDown } from './dcx-web-page-scroll-top-down.component';

describe('DcxWebPageScrollTopDown', () => {
  let element: DcxWebPageScrollTopDown;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-scroll-top-down',
    ) as DcxWebPageScrollTopDown;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render title', () => {
    const title =
      element.shadowRoot?.querySelector(
        '.demo-page-header__title',
      );

    expect(title?.textContent).toContain(
      'Scroll Top Down',
    );
  });

  it('should expose demo content list', () => {
    expect(
      (element as any).longContent.length,
    ).toBe(12);
  });

  it('should render all sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(5);
  });

  it('should render default section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Default');
  });

  it('should render sizes section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Sizes');
  });

  it('should render top only section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Top only');
  });

  it('should render bottom only section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Bottom only');
  });

  it('should render smooth disabled section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Sin scroll suave');
  });

  it('should render web scroll components', () => {
    const components =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-scroll-top-down',
      );

    expect(components?.length).toBe(8);
  });

  it('should render scroll shells', () => {
    const shells =
      element.shadowRoot?.querySelectorAll(
        '.scroll-shell',
      );

    expect(shells?.length).toBe(8);
  });
});