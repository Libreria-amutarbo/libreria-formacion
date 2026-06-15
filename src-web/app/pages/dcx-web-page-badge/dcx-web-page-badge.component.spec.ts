import './dcx-web-page-badge.component';
import { DcxWebPageBadge } from './dcx-web-page-badge.component';

describe('DcxWebPageBadge', () => {
  let element: DcxWebPageBadge;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-badge') as DcxWebPageBadge;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render the correct number of badge components', () => {
    const badges = element.shadowRoot?.querySelectorAll('dcx-web-badge');
    expect(badges?.length).toBe(20);
  });
});
