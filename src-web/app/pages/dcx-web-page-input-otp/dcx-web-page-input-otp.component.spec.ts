import './dcx-web-page-input-otp.component';

import { DcxWebPageInputOtp } from './dcx-web-page-input-otp.component';

describe('DcxWebPageInputOtp', () => {
  let element: DcxWebPageInputOtp;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-input-otp',
    ) as DcxWebPageInputOtp;

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
      'Input OTP',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(10);
  });

  it('should render all expected section titles', () => {
    const text =
      element.shadowRoot?.textContent ?? '';

    expect(text).toContain('Default');
    expect(text).toContain('Integer Only');
    expect(text).toContain('Masked');
    expect(text).toContain('Interactive');
    expect(text).toContain('Sizes');
    expect(text).toContain('Template-driven Form');
    expect(text).toContain('Reactive Form');
    expect(text).toContain('Sample Layout');
    expect(text).toContain('Disabled');
    expect(text).toContain('Invalid');
  });

  it('should render otp components', () => {
    const otpComponents =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-input-otp',
      );

    expect(otpComponents?.length).toBe(11);
  });

  it('should render sample layout', () => {
    const sampleLayout =
      element.shadowRoot?.querySelector(
        '.sample-layout',
      );

    expect(sampleLayout).toBeTruthy();
  });

  it('should render action buttons', () => {
    const buttons =
      element.shadowRoot?.querySelectorAll(
        '.demo-button',
      );

    expect(buttons?.length).toBeGreaterThan(0);
  });

  it('should render value previews', () => {
    const text =
      element.shadowRoot?.textContent ?? '';

    expect(text).toContain('Valor');
    expect(text).toContain('Sin completar');
  });
});