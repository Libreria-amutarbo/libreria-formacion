import './dcx-web-toast.component';

import { DcxWebToast } from './dcx-web-toast.component';
import { DcxWebToastService } from './dcx-web-toast.service';

describe('DcxWebToast', () => {
  let element: DcxWebToast;

  beforeEach(async () => {
    jest.useFakeTimers();
    DcxWebToastService.clear();

    element = document.createElement('dcx-web-toast') as DcxWebToast;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    DcxWebToastService.clear();
    if (element.parentNode) {
      document.body.removeChild(element);
    }
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render no toasts initially', () => {
    const toasts = element.shadowRoot?.querySelectorAll('.dcx-toast');
    expect(toasts?.length).toBe(0);
  });

  it('should render one toast per entry in the service', async () => {
    DcxWebToastService.success('Guardado');
    DcxWebToastService.error('Fallo');

    await element.updateComplete;
    await Promise.resolve();

    const toasts = element.shadowRoot?.querySelectorAll('.dcx-toast');
    expect(toasts?.length).toBe(2);
  });

  it('should render the toast message via dcx-web-message', async () => {
    DcxWebToastService.info('Proyecto guardado correctamente');

    await element.updateComplete;
    await Promise.resolve();

    const messageElement = element.shadowRoot?.querySelector(
      'dcx-web-message',
    ) as any;
    expect(messageElement).toBeTruthy();
    expect(messageElement.body).toBe('Proyecto guardado correctamente');
  });

  it('should apply the type class', async () => {
    DcxWebToastService.success('Hecho');

    await element.updateComplete;
    await Promise.resolve();

    const toastElement = element.shadowRoot?.querySelector('.dcx-toast');
    expect(toastElement?.classList.contains('dcx-toast--success')).toBe(true);
  });

  it('should not render an action button for plain toasts', async () => {
    DcxWebToastService.info('Hola');

    await element.updateComplete;
    await Promise.resolve();

    const actionButton =
      element.shadowRoot?.querySelector('.dcx-toast__action');
    expect(actionButton).toBeFalsy();
  });

  it('should render a custom action label when provided', async () => {
    DcxWebToastService.show({
      message: 'Archivo movido',
      actionLabel: 'Deshacer',
    });

    await element.updateComplete;
    await Promise.resolve();

    const actionButton = element.shadowRoot?.querySelector(
      '.dcx-toast__action',
    ) as any;
    expect(actionButton).toBeTruthy();
    expect(actionButton.label).toBe('Deshacer');
  });

  it('should render the action icon when actionIconName is provided', async () => {
    DcxWebToastService.show({
      message: 'Sincronizacion disponible',
      actionLabel: 'Reintentar',
      actionIconName: 'arrow-repeat',
    });

    await element.updateComplete;
    await Promise.resolve();

    const actionButton = element.shadowRoot?.querySelector(
      '.dcx-toast__action',
    ) as any;
    expect(actionButton).toBeTruthy();
    expect(actionButton.iconName).toBe('arrow-repeat');
  });

  it('should use a fallback aria-label when the action is icon-only', async () => {
    DcxWebToastService.show({
      message: 'Actualiza para ver cambios',
      actionIconName: 'arrow-clockwise',
    });

    await element.updateComplete;
    await Promise.resolve();

    const actionButton = element.shadowRoot?.querySelector(
      '.dcx-toast__action',
    ) as any;
    expect(actionButton.ariaLabel).toBe('Accion del toast');
  });

  it('should use an explicit aria-label when provided', async () => {
    DcxWebToastService.show({
      message: 'Actualiza para ver cambios',
      actionIconName: 'arrow-clockwise',
      actionAriaLabel: 'Actualizar contenido',
    });

    await element.updateComplete;
    await Promise.resolve();

    const actionButton = element.shadowRoot?.querySelector(
      '.dcx-toast__action',
    ) as any;
    expect(actionButton.ariaLabel).toBe('Actualizar contenido');
  });

  it('should dismiss the toast in the service when the action button is clicked', async () => {
    const id = DcxWebToastService.show({
      message: 'Archivo movido',
      actionLabel: 'Deshacer',
    });

    await element.updateComplete;
    await Promise.resolve();

    const actionButton =
      element.shadowRoot?.querySelector('.dcx-toast__action');
    actionButton?.dispatchEvent(
      new CustomEvent('buttonClick', {
        bubbles: true,
        composed: true,
      }),
    );

    await Promise.resolve();

    expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeUndefined();
  });

  describe('close button (WCAG)', () => {
    it('should render a close button by default', async () => {
      DcxWebToastService.info('Hola');

      await element.updateComplete;
      await Promise.resolve();

      const closeButton =
        element.shadowRoot?.querySelector('.dcx-toast__close');
      expect(closeButton).toBeTruthy();
    });

    it('should not render a close button when dismissible is false', async () => {
      DcxWebToastService.show({
        message: 'Sin cierre',
        dismissible: false,
      });

      await element.updateComplete;
      await Promise.resolve();

      const closeButton =
        element.shadowRoot?.querySelector('.dcx-toast__close');
      expect(closeButton).toBeFalsy();
    });

    it('should dismiss the toast in the service when the close button is clicked', async () => {
      const id = DcxWebToastService.info('Hola');

      await element.updateComplete;
      await Promise.resolve();

      const closeButton =
        element.shadowRoot?.querySelector('.dcx-toast__close');
      closeButton?.dispatchEvent(
        new CustomEvent('buttonClick', {
          bubbles: true,
          composed: true,
        }),
      );

      await Promise.resolve();

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeUndefined();
    });

    it('should set aria-label "Cerrar" on the close button', async () => {
      DcxWebToastService.info('Hola');

      await element.updateComplete;
      await Promise.resolve();

      const closeButton = element.shadowRoot?.querySelector(
        '.dcx-toast__close',
      ) as any;
      expect(closeButton.ariaLabel).toBe('Cerrar');
    });
  });

  describe('auto-dismiss', () => {
    it('should dismiss the toast in the service after durationMs', async () => {
      const id = DcxWebToastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });

      await element.updateComplete;
      await Promise.resolve();

      jest.advanceTimersByTime(1000);

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeUndefined();
    });

    it('should not auto-dismiss when durationMs is 0 or lower', async () => {
      const id = DcxWebToastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 0,
      });

      await element.updateComplete;
      await Promise.resolve();

      jest.advanceTimersByTime(1000);

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeTruthy();
    });
  });

  describe('pause on hover/focus (WCAG 2.2.1)', () => {
    it('should pause the auto-dismiss timer on mouseenter', async () => {
      const id = DcxWebToastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });

      await element.updateComplete;
      await Promise.resolve();

      jest.advanceTimersByTime(500);

      element.pause(id);
      await element.updateComplete;

      jest.advanceTimersByTime(1000);

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeTruthy();
    });

    it('should resume the timer with the full duration on mouseleave', async () => {
      const id = DcxWebToastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });

      await element.updateComplete;
      await Promise.resolve();

      element.pause(id);
      await element.updateComplete;

      element.resume(id);
      await element.updateComplete;

      jest.advanceTimersByTime(1000);

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeUndefined();
    });

    it('should pause on focusin and resume on focusout via the DOM', async () => {
      const id = DcxWebToastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });

      await element.updateComplete;
      await Promise.resolve();

      const toastElement = element.shadowRoot?.querySelector('.dcx-toast');
      toastElement?.dispatchEvent(new Event('focusin', { bubbles: true }));

      await element.updateComplete;
      jest.advanceTimersByTime(1000);

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeTruthy();

      toastElement?.dispatchEvent(new Event('focusout', { bubbles: true }));

      await element.updateComplete;
      jest.advanceTimersByTime(1000);

      expect(DcxWebToastService.toasts.find(t => t.id === id)).toBeUndefined();
    });
  });

  describe('position', () => {
    it('should default to top-right', () => {
      const outlet = element.shadowRoot?.querySelector('.dcx-toast-outlet');
      expect(outlet?.classList.contains('dcx-toast-outlet--top-right')).toBe(
        true,
      );
    });

    it('should apply the position class based on the position input', async () => {
      element.position = 'bottom-left';

      await element.updateComplete;

      const outlet = element.shadowRoot?.querySelector('.dcx-toast-outlet');
      expect(outlet?.classList.contains('dcx-toast-outlet--bottom-left')).toBe(
        true,
      );
    });
  });

  describe('role', () => {
    it('uses role="status" for info/success toasts', async () => {
      DcxWebToastService.success('Hecho');

      await element.updateComplete;
      await Promise.resolve();

      const toastElement = element.shadowRoot?.querySelector('.dcx-toast');
      expect(toastElement?.getAttribute('role')).toBe('status');
    });

    it('uses role="alert" for warning/error toasts', async () => {
      DcxWebToastService.error('Fallo grave');

      await element.updateComplete;
      await Promise.resolve();

      const toastElement = element.shadowRoot?.querySelector('.dcx-toast');
      expect(toastElement?.getAttribute('role')).toBe('alert');
    });
  });

  it('has a persistent aria-live="polite" outlet container', () => {
    const outlet = element.shadowRoot?.querySelector('.dcx-toast-outlet');
    expect(outlet?.getAttribute('aria-live')).toBe('polite');
  });
});
