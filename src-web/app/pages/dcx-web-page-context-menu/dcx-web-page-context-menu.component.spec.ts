import './dcx-web-page-context-menu.component';
import { DcxWebPageContextMenu } from './dcx-web-page-context-menu.component';

describe('DcxWebPageContextMenu', () => {
  let element: DcxWebPageContextMenu;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-context-menu') as DcxWebPageContextMenu;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render the correct number of context menu components', () => {
    const menus = element.shadowRoot?.querySelectorAll('dcx-web-context-menu');
    expect(menus?.length).toBe(5);
  });
});
