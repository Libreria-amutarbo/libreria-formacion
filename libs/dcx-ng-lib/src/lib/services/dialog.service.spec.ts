import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getState()', () => {
    it('should create a new state signal for a new id', () => {
      const state = service.getState('dialog-1');
      expect(state).toBeTruthy();
      expect(state().visible).toBe(false);
    });

    it('should return the same state signal for the same id', () => {
      const state1 = service.getState('dialog-2');
      const state2 = service.getState('dialog-2');
      expect(state1).toBe(state2);
    });

    it('should create different state signals for different ids', () => {
      const state1 = service.getState('dialog-a');
      const state2 = service.getState('dialog-b');
      expect(state1).not.toBe(state2);
    });
  });

  describe('readOnly()', () => {
    it('should return a readonly signal', () => {
      const ro = service.readOnly('dialog-3');
      expect(ro).toBeTruthy();
      expect(ro().visible).toBe(false);
    });

    it('should reflect changes made via open()', () => {
      const ro = service.readOnly('dialog-4');
      expect(ro().visible).toBe(false);
      service.open('dialog-4');
      expect(ro().visible).toBe(true);
    });
  });

  describe('open()', () => {
    it('should set visible to true', () => {
      service.open('dialog-5');
      expect(service.getState('dialog-5')().visible).toBe(true);
    });

    it('should set data when provided', () => {
      service.open('dialog-6', { payload: 'test-data' });
      const state = service.getState<{ payload: string }>('dialog-6');
      expect(state().visible).toBe(true);
      expect(state().data?.payload).toBe('test-data');
    });

    it('should open without data', () => {
      service.open('dialog-7');
      const state = service.getState('dialog-7');
      expect(state().visible).toBe(true);
      expect(state().data).toBeUndefined();
    });
  });

  describe('close()', () => {
    it('should set visible to false', () => {
      service.open('dialog-8');
      service.close('dialog-8');
      expect(service.getState('dialog-8')().visible).toBe(false);
    });

    it('should clear data on close', () => {
      service.open('dialog-9', { value: 42 });
      service.close('dialog-9');
      const state = service.getState('dialog-9');
      expect(state().visible).toBe(false);
      expect(state().data).toBeUndefined();
    });

    it('should create state if not exists when closing', () => {
      service.close('dialog-new');
      expect(service.getState('dialog-new')().visible).toBe(false);
    });
  });
});
