import './dcx-web-page-progressbar.component';

import { DcxWebPageProgressbar } from './dcx-web-page-progressbar.component';

describe('DcxWebPageProgressbar', () => {
  let element: DcxWebPageProgressbar;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-progressbar',
    ) as DcxWebPageProgressbar;

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
      'Progressbar',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(9);
  });

  it('should render all progressbar demos', () => {
    const components =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-progressbar',
      );

    expect(components?.length).toBe(9);
  });

  it('should render segmented demo section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Segmented');
  });

  it('should render tooltip demo section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('With Tooltip');
  });

  it('should render header label demo section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('With Header Label');
  });

  it('should render numbered stepper demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Numbered Stepper');
  });

  it('should render checkmark stepper demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Checkmark Stepper');
  });

  it('should render process stepper demo', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Process Stepper');
  });

  it('should render wide progress demo containers', () => {
    const wideContainers =
      element.shadowRoot?.querySelectorAll(
        '.progress-demo--wide',
      );

    expect(wideContainers?.length).toBe(3);
  });
});