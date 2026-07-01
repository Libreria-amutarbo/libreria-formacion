import './dcx-web-page-dialog.component';
import { DcxWebPageDialog } from './dcx-web-page-dialog.component';

describe('DcxWebPageDialog', () => {
  let element: DcxWebPageDialog;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-dialog') as DcxWebPageDialog;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render three dialog components', () => {
    const dialogs = element.shadowRoot?.querySelectorAll('dcx-web-dialog');
    expect(dialogs?.length).toBe(3);
  });

  it('should hide dialog on close event', async () => {
    const dialog = element.shadowRoot?.querySelector('dcx-web-dialog') as any;

    dialog.dispatchEvent(new CustomEvent('closeDialog'));
    await element.updateComplete;

    expect(element['showDestructive']).toBe(false);
  });
});
