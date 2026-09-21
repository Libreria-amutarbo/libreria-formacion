import './dcx-web-page-toast.component';

import { DcxWebPageToast } from './dcx-web-page-toast.component';

import { DcxWebToastService } from '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-toast/dcx-web-toast.service';

describe('DcxWebPageToast', () => {
  let element: DcxWebPageToast;

  beforeEach(async () => {
    DcxWebToastService.clear();

    element = document.createElement(
      'dcx-web-page-toast',
    ) as DcxWebPageToast;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    DcxWebToastService.clear();

    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render page title', () => {
    const title =
      element.shadowRoot?.querySelector(
        '.demo-page-header__title',
      );

    expect(title?.textContent).toContain(
      'Toast',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(8);
  });

  it('should render toast outlet', () => {
    const toast =
      element.shadowRoot?.querySelector(
        'dcx-web-toast',
      );

    expect(toast).toBeTruthy();
  });

  it('should add an info toast', () => {
    element.showInfoToast();

    expect(
      DcxWebToastService.toasts.length,
    ).toBe(1);

    expect(
      DcxWebToastService.toasts[0].type,
    ).toBe('info');
  });

  it('should add a non-dismissible toast', () => {
    element.showNotDismissibleToast();

    expect(
      DcxWebToastService.toasts[0]
        .dismissible,
    ).toBe(false);
  });

  it('should clear toasts', () => {
    element.showInfoToast();
    element.showWarningToast();

    expect(
      DcxWebToastService.toasts.length,
    ).toBe(2);

    element.clearToasts();

    expect(
      DcxWebToastService.toasts.length,
    ).toBe(0);
  });

  it('should render clear section', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Limpiar todos los toasts activos',
    );
  });
});