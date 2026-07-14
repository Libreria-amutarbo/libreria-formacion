import './dcx-web-page-card.component';
import { DcxWebPageCard } from './dcx-web-page-card.component';

describe('DcxWebPageCard', () => {
  let element: DcxWebPageCard;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-card') as DcxWebPageCard;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebPageCard);
  });

  it('should render the page title', () => {
    const title = element.shadowRoot?.querySelector('.demo-page-header__title');
    expect(title?.textContent).toContain('Card (Web Component)');
  });

  it('should render multiple dcx-web-card components', () => {
    const cards = element.shadowRoot?.querySelectorAll('dcx-web-card');
    expect(cards?.length).toBeGreaterThan(0);
  });
});
