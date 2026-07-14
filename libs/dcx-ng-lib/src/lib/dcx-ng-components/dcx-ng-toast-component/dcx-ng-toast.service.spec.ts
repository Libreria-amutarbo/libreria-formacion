import { TestBed } from '@angular/core/testing';
import { DcxNgToastService } from './dcx-ng-toast.service';

describe('DcxNgToastService', () => {
  let service: DcxNgToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcxNgToastService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no toasts', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('should add a toast via show() and return its id', () => {
    const id = service.show({ message: 'Hola' });
    expect(id).toBeTruthy();
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].id).toBe(id);
    expect(service.toasts()[0].message).toBe('Hola');
  });

  it('should generate unique ids for each toast', () => {
    const id1 = service.show({ message: 'Uno' });
    const id2 = service.show({ message: 'Dos' });
    expect(id1).not.toBe(id2);
  });

  it('should set type "success" via success()', () => {
    service.success('Guardado');
    expect(service.toasts()[0].type).toBe('success');
    expect(service.toasts()[0].message).toBe('Guardado');
  });

  it('should set type "error" via error()', () => {
    service.error('Fallo');
    expect(service.toasts()[0].type).toBe('error');
  });

  it('should set type "warning" via warning()', () => {
    service.warning('Cuidado');
    expect(service.toasts()[0].type).toBe('warning');
  });

  it('should set type "info" via info()', () => {
    service.info('Info');
    expect(service.toasts()[0].type).toBe('info');
  });

  it('should pass through extra options on shortcut methods', () => {
    service.success('Guardado', { autoDismiss: true, durationMs: 3000 });
    expect(service.toasts()[0].autoDismiss).toBe(true);
    expect(service.toasts()[0].durationMs).toBe(3000);
  });

  it('should dismiss only the toast with the given id', () => {
    const id1 = service.show({ message: 'Uno' });
    const id2 = service.show({ message: 'Dos' });

    service.dismiss(id1);

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].id).toBe(id2);
  });

  it('should clear all toasts', () => {
    service.show({ message: 'Uno' });
    service.show({ message: 'Dos' });

    service.clear();

    expect(service.toasts()).toEqual([]);
  });
});
