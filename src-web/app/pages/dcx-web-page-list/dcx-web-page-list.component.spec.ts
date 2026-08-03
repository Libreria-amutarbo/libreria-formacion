import './dcx-web-page-list.component';

import { DcxWebPageList } from './dcx-web-page-list.component';

describe('DcxWebPageList', () => {
  let element: DcxWebPageList;

  beforeEach(async () => {
    element =
      document.createElement(
        'dcx-web-page-list',
      ) as DcxWebPageList;

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
      'List',
    );
  });

  it('should render all sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(11);
  });

  it('should render list demos', () => {
    const lists =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-list',
      );

    expect(lists?.length).toBe(11);
  });

  it('should render selectable demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Selectable');
  });

  it('should render multi select demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Multi Select');
  });

  it('should render external control demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('External Control');
  });

  it('should render custom template section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Custom Template');
  });

  it('should render danger section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Danger');
  });
});