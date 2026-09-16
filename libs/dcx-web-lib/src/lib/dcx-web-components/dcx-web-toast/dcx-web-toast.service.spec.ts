import { DcxWebToastService } from './dcx-web-toast.service';

describe('DcxWebToastService', () => {
  beforeEach(() => {
    DcxWebToastService.clear();
  });

  it('should create', () => {
    expect(DcxWebToastService).toBeTruthy();
  });

  it('should start with no toasts', () => {
    expect(DcxWebToastService.toasts).toEqual([]);
  });

  it('should add a toast via show() and return its id', () => {
    const id = DcxWebToastService.show({ message: 'Hola' });
    expect(id).toBeTruthy();
    expect(DcxWebToastService.toasts.length).toBe(1);
    expect(DcxWebToastService.toasts[0].id).toBe(id);
    expect(DcxWebToastService.toasts[0].message).toBe('Hola');
  });

  it('should generate unique ids for each toast', () => {
    const id1 = DcxWebToastService.show({ message: 'Uno' });
    const id2 = DcxWebToastService.show({ message: 'Dos' });
    expect(id1).not.toBe(id2);
  });

  it('should set type "success" via success()', () => {
    DcxWebToastService.success('Guardado');
    expect(DcxWebToastService.toasts[0].type).toBe('success');
    expect(DcxWebToastService.toasts[0].message).toBe('Guardado');
  });

  it('should set type "error" via error()', () => {
    DcxWebToastService.error('Fallo');
    expect(DcxWebToastService.toasts[0].type).toBe('error');
  });

  it('should set type "warning" via warning()', () => {
    DcxWebToastService.warning('Cuidado');
    expect(DcxWebToastService.toasts[0].type).toBe('warning');
  });

  it('should set type "info" via info()', () => {
    DcxWebToastService.info('Info');
    expect(DcxWebToastService.toasts[0].type).toBe('info');
  });

  it('should pass through extra options on shortcut methods', () => {
    DcxWebToastService.success('Guardado', {
      autoDismiss: true,
      durationMs: 3000,
    });
    expect(DcxWebToastService.toasts[0].autoDismiss).toBe(true);
    expect(DcxWebToastService.toasts[0].durationMs).toBe(3000);
  });

  it('should dismiss only the toast with the given id', () => {
    const id1 = DcxWebToastService.show({ message: 'Uno' });
    const id2 = DcxWebToastService.show({ message: 'Dos' });

    DcxWebToastService.dismiss(id1);

    expect(DcxWebToastService.toasts.length).toBe(1);
    expect(DcxWebToastService.toasts[0].id).toBe(id2);
  });

  it('should clear all toasts', () => {
    DcxWebToastService.show({ message: 'Uno' });
    DcxWebToastService.show({ message: 'Dos' });

    DcxWebToastService.clear();

    expect(DcxWebToastService.toasts).toEqual([]);
  });
});
