import './dcx-web-page-divider.component';
import { DcxWebPageDivider } from './dcx-web-page-divider.component';

describe('DcxWebPageDivider', () => {
  let element: DcxWebPageDivider;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-divider') as DcxWebPageDivider;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render divider components', () => {
    const dividers = element.shadowRoot?.querySelectorAll('dcx-web-divider');
    expect(dividers && dividers.length).toBeGreaterThan(0);
  });
});