import './dcx-web-page-breadcrumb.component';
import { DcxWebPageBreadcrumb } from './dcx-web-page-breadcrumb.component';

describe('DcxWebPageBreadcrumb', () => {
  let element: DcxWebPageBreadcrumb;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-breadcrumb') as DcxWebPageBreadcrumb;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render the correct number of breadcrumb components', () => {
    const breadcrumbs = element.shadowRoot?.querySelectorAll('dcx-web-breadcrumb');
    expect(breadcrumbs?.length).toBe(6);
  });
});
