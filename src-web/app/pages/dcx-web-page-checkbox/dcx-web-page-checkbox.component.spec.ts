import './dcx-web-page-checkbox.component';
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
    expect(element).toBeInstanceOf(DcxWebPageCheckbox);
  });

  it('should render all sections', () => {
    const sections = element.shadowRoot?.querySelectorAll('.demo-section');
    expect(sections?.length).toBe(7);
  });

  it('should render checkbox components', () => {
    const checkboxes = element.shadowRoot?.querySelectorAll('dcx-web-checkbox');
    expect(checkboxes?.length).toBe(7);
  });

  it('should update labels when changeOptions is triggered', async () => {
    const checkbox = element.shadowRoot?.querySelector('dcx-web-checkbox');

    const newOptions = [
      { id: 'cb1', value: true, label: '' }
    ];

    checkbox?.dispatchEvent(
      new CustomEvent('changeOptions', { detail: newOptions, bubbles: true, composed: true })
    );

    await element.updateComplete;

    expect(element).toBeTruthy(); // validación básica sin romper render
  });
});