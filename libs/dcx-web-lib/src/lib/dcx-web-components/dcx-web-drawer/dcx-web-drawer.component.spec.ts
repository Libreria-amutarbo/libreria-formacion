import './dcx-web-drawer.component';
import { DcxWebDrawer } from './dcx-web-drawer.component';

describe('DcxWebDrawer', () => {
  let element: DcxWebDrawer;

  beforeEach(async () => {
    element = document.createElement('dcx-web-drawer') as DcxWebDrawer;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebDrawer);
  });

  it('should render the drawer shell with the default panel classes', async () => {
    element.open = true;
    await element.updateComplete;
    const panel = element.shadowRoot?.querySelector('.dcx-drawer');
    expect(panel).toBeTruthy();
    expect(panel?.classList.contains('dcx-drawer--right')).toBeTruthy();
  });

  it('should toggle the visible state and expose the close action', async () => {
    element.open = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot?.querySelector('dcx-web-button') as any;
    expect(closeButton).toBeTruthy();
    await closeButton.updateComplete;

    const hideSpy = jest.fn();
    element.addEventListener('dcx-drawer-hide', hideSpy);
    closeButton?.shadowRoot?.querySelector('button')?.click();

    expect(element.open).toBe(false);
    expect(hideSpy).toHaveBeenCalled();
  });
});
