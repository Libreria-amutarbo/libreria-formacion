import './dcx-web-badge.component';
import { DcxWebBadge } from './dcx-web-badge.component';

describe('DcxWebBadge', () => {
  let element: DcxWebBadge;

  beforeEach(async () => {
    element = document.createElement('dcx-web-badge') as DcxWebBadge;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebBadge);
  });

  it('should render the default values correctly', () => {
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.classList.contains('dcx-badge--primary')).toBeTruthy();
    expect(span?.classList.contains('dcx-badge--md')).toBeTruthy();
    expect(span?.textContent).toBe('');
  });

  it('should render the provided value', async () => {
    element.value = '5';
    await element.updateComplete;
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.textContent).toBe('5');
  });

  it('should compute aria-label correctly when value is provided', async () => {
    element.value = '3';
    element.severity = 'success';
    await element.updateComplete;
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.getAttribute('aria-label')).toBe('3, success');
  });

  it('should hide aria-label when ariaHiddenAttr is true', async () => {
    element.value = '3';
    element.ariaHiddenAttr = true;
    await element.updateComplete;
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.getAttribute('aria-label')).toBe('');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });
});
