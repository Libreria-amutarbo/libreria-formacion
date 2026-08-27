import './dcx-web-page-skeleton.component';

import { DcxWebPageSkeleton } from './dcx-web-page-skeleton.component';

describe('DcxWebPageSkeleton', () => {
  let element: DcxWebPageSkeleton;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-skeleton',
    ) as DcxWebPageSkeleton;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should expose list demo items', () => {
    expect(element.listItems).toEqual([
      1,
      2,
      3,
      4,
    ]);
  });

  it('should render page title', () => {
    const title =
      element.shadowRoot?.querySelector(
        '.demo-page-header__title',
      );

    expect(title?.textContent).toContain(
      'Skeleton',
    );
  });

  it('should render all sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(7);
  });

  it('should render main section titles', () => {
    const content =
      element.shadowRoot?.textContent;

    expect(content).toContain(
      'Rectángulos',
    );

    expect(content).toContain(
      'Placeholder de tarjeta',
    );

    expect(content).toContain(
      'Placeholder de lista',
    );

    expect(content).toContain(
      'Sin animación',
    );
  });

  it('should render skeleton components', () => {
    const skeletons =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-skeleton',
      );

    expect(
      skeletons?.length,
    ).toBeGreaterThan(0);
  });

  it('should render list placeholder items', () => {
    const items =
      element.shadowRoot?.querySelectorAll(
        '.list-item',
      );

    expect(items?.length).toBe(4);
  });

  it('should render status containers', () => {
    const statusRegions =
      element.shadowRoot?.querySelectorAll(
        '[role="status"]',
      );

    expect(statusRegions?.length).toBe(2);
  });

  it('should render loading text for screen readers', () => {
    const text =
      element.shadowRoot?.textContent;

    expect(text).toContain(
      'Cargando…',
    );
  });

  it('should render card placeholder section', () => {
    const content =
      element.shadowRoot?.textContent;

    expect(content).toContain(
      'Placeholder de tarjeta',
    );
  });

  it('should render non animated skeleton examples', () => {
    const skeletons =
      Array.from(
        element.shadowRoot?.querySelectorAll(
          'dcx-web-skeleton',
        ) ?? [],
      );

    const nonAnimated =
      skeletons.filter(
        skeleton =>
          skeleton.getAttribute(
            'animation',
          ) === 'none',
      );

    expect(
      nonAnimated.length,
    ).toBeGreaterThanOrEqual(3);
  });
});