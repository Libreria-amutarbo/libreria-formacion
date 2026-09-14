import './dcx-web-page-calendar.component';

import { DcxWebPageCalendar }
  from './dcx-web-page-calendar.component';

describe('DcxWebPageCalendar', () => {
  let element: DcxWebPageCalendar;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-calendar',
    ) as DcxWebPageCalendar;

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

    expect(
      title?.textContent,
    ).toContain('Calendar');
  });

  it('should render four demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(4);
  });

  it('should render calendar demos', () => {
    const calendars =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-calendar',
      );

    expect(calendars?.length).toBe(5);
  });

  it('should render range section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Rango y mini');
  });

  it('should render weekly section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Vista semanal');
  });

  it('should render yearly section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Vista anual');
  });
});