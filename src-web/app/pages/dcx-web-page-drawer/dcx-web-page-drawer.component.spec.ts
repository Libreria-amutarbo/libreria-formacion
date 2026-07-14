// page spec.ts

import './dcx-web-page-drawer.component';
import { DcxWebPageDrawer } from './dcx-web-page-drawer.component';

describe('DcxWebPageDrawer', () => {
  let element: DcxWebPageDrawer;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-drawer') as DcxWebPageDrawer;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebPageDrawer);
  });

  it('should render the page title', () => {
    const title = element.shadowRoot?.querySelector('.demo-page-header__title');
    expect(title?.textContent?.trim()).toBe('Drawer (Web Component)');
  });

  it('should render multiple dcx-web-drawer components', () => {
    const drawers = element.shadowRoot?.querySelectorAll('dcx-web-drawer');
    expect(drawers?.length).toBeGreaterThan(0);
  });
});