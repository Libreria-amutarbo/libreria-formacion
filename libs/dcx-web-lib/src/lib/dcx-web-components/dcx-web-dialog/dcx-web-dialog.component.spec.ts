import './dcx-web-dialog.component';
import { DcxWebDialog } from './dcx-web-dialog.component';

describe('DcxWebDialog', () => {
  let element: DcxWebDialog;

  beforeEach(async () => {
    element = document.createElement('dcx-web-dialog') as DcxWebDialog;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebDialog);
  });

  it('should not render when visible is false', async () => {
    element.visible = false;
    await element.updateComplete;
    const root = element.shadowRoot?.querySelector('.dcx-dialog-root');
    expect(root).toBeNull();
  });

  it('should render when visible is true', async () => {
    element.visible = true;
    await element.updateComplete;
    const root = element.shadowRoot?.querySelector('.dcx-dialog-root');
    expect(root).not.toBeNull();
  });

  it('should render title if provided', async () => {
    element.visible = true;
    element.title = 'My Dialog';
    await element.updateComplete;

    const title = element.shadowRoot?.querySelector('.dcx-dialog__title');
    expect(title?.textContent).toBe('My Dialog');
  });

  it('should emit closeDialog on close button click', async () => {
    element.visible = true;
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('closeDialog', spy);

    const btn = element.shadowRoot?.querySelector('.dcx-dialog__close') as HTMLElement;
    btn.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should close on backdrop click if enabled', async () => {
    element.visible = true;
    element.closeOnBackdrop = true;
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('closeDialog', spy);

    const backdrop = element.shadowRoot?.querySelector('.dcx-dialog__backdrop') as HTMLElement;
    backdrop.dispatchEvent(new MouseEvent('pointerdown'));

    expect(spy).toHaveBeenCalled();
  });

  it('should not close on backdrop click if disabled', async () => {
    element.visible = true;
    element.closeOnBackdrop = false;
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('closeDialog', spy);

    const backdrop = element.shadowRoot?.querySelector('.dcx-dialog__backdrop') as HTMLElement;
    backdrop.dispatchEvent(new MouseEvent('pointerdown'));

    expect(spy).not.toHaveBeenCalled();
  });
});