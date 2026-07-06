import './dcx-web-page-button.component';
import { DcxWebPageButton } from './dcx-web-page-button.component';

describe('DcxWebPageButton', () => {
  let element: DcxWebPageButton;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-button') as DcxWebPageButton;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render the button components', () => {
    const buttons = element.shadowRoot?.querySelectorAll('dcx-web-button');
    expect(buttons?.length).toBeGreaterThan(0);
  });
});
