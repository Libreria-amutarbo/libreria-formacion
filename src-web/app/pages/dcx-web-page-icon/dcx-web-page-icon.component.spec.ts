import './dcx-web-page-icon.component';
import { DcxWebPageIcon } from './dcx-web-page-icon.component';

describe('DcxWebPageIcon', () => {
  let element: DcxWebPageIcon;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-icon') as DcxWebPageIcon;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render the correct number of icon components', () => {
    const icons = element.shadowRoot?.querySelectorAll('dcx-web-icon');
    expect(icons?.length).toBe(13);
  });
});
