import './dcx-web-page-popover.component';
import { DcxWebPagePopover } from './dcx-web-page-popover.component';

describe('DcxWebPagePopover', () => {
  let element: DcxWebPagePopover;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-popover') as DcxWebPagePopover;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  it('should create', () => {
    expect(element).toBeInstanceOf(DcxWebPagePopover);
  });

  it('should render all demo sections and popover components', () => {
    const popoverIds = [
      'popover1',
      'popover2',
      'popover3',
      'popover4',
      'popover5',
      'popover6',
      'popover7',
      'popover8',
      'popover9',
      'popover10',
      'popover11',
      'popover12',
      'popover13',
    ];

    popoverIds.forEach(id => {
      const popover = element.shadowRoot?.getElementById(id);
      expect(popover).toBeTruthy();
    });
  });
});
