import './dcx-web-page-checkbox.component';import './dcx-web-page-checkboxPageCheckbox);
  });

  it('should render title', () => {
    const title = element.shadowRoot?.querySelector('.demo-page-header__title');
    expect(title?.textContent).toContain('Checkbox');
  });

  it('should render all sections', () => {
    const sections = element.shadowRoot?.querySelectorAll('.demo-section');
    expect(sections?.length).toBe(7);
  });

  it('should render checkbox component', () => {
    const checkbox = element.shadowRoot?.querySelector('dcx-web-checkbox');
    expect(checkbox).toBeTruthy();
  });

  it('should handle changeOptions event', async () => {
    const checkbox = element.shadowRoot?.querySelector('dcx-web-checkbox') as HTMLElement;

    const event = new CustomEvent('changeOptions', {
      detail: [{ id: '1', value: true }],
      bubbles: true,
      composed: true,
    });

    checkbox.dispatchEvent(event);
    await element.updateComplete;

    expect(element).toBeTruthy();
  });
});
import { DcxWebPageCheckbox } from './dcx-web-page-checkbox.component';

describe('DcxWebPageCheckbox', () => {
  let element: DcxWebPageCheckbox;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-checkbox') as DcxWebPageCheckbox;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
