import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgDialogComponent } from './dcx-ng-dialog.component';
import { By } from '@angular/platform-browser';
import { DialogService } from '../../services/dialog.service';

describe('DcxNgDialogComponent', () => {
  let component: DcxNgDialogComponent;
  let fixture: ComponentFixture<DcxNgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.title()).toBe('');
    expect(component.showClose()).toBe(true);
    expect(component.position()).toBe('center');
    expect(component.closeOnBackdrop()).toBe(true);
  });

  it('should be visible when visible input is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(component.isVisible()).toBe(true);
  });

  it('should not be visible when visible input is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    expect(component.isVisible()).toBe(false);
  });

  it('should emit closeDialog when close() is called', () => {
    const spy = jest.fn();
    component.closeDialog.subscribe(spy);
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('should call close() on backdrop click when closeOnBackdrop is true', () => {
    fixture.componentRef.setInput('closeOnBackdrop', true);
    fixture.detectChanges();
    const spy = jest.fn();
    component.closeDialog.subscribe(spy);
    const event = new MouseEvent('click');
    component.onBackdropClick(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call close() on backdrop click when closeOnBackdrop is false', () => {
    fixture.componentRef.setInput('closeOnBackdrop', false);
    fixture.detectChanges();
    const spy = jest.fn();
    component.closeDialog.subscribe(spy);
    const event = new MouseEvent('click');
    component.onBackdropClick(event);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should compute dialogClasses based on position', () => {
    fixture.componentRef.setInput('position', 'top');
    fixture.detectChanges();
    expect(component.dialogClasses).toContain('dialog--pos-top');
  });

  it('should accept title input', () => {
    fixture.componentRef.setInput('title', 'My Dialog');
    fixture.detectChanges();
    expect(component.title()).toBe('My Dialog');
  });

  describe('with dialogId (DialogService integration)', () => {
    let dialogService: DialogService;

    beforeEach(() => {
      dialogService = TestBed.inject(DialogService);
    });

    it('isVisible should use DialogService state when dialogId is set', () => {
      fixture.componentRef.setInput('dialogId', 'my-dialog');
      fixture.componentRef.setInput('visible', false);
      fixture.detectChanges();
      expect(component.isVisible()).toBe(false);

      dialogService.open('my-dialog');
      fixture.detectChanges();
      expect(component.isVisible()).toBe(true);
    });

    it('close() should also call dialogService.close() when dialogId is set', () => {
      fixture.componentRef.setInput('dialogId', 'close-dialog');
      fixture.detectChanges();
      dialogService.open('close-dialog');
      expect(dialogService.getState('close-dialog')().visible).toBe(true);

      component.close();
      expect(dialogService.getState('close-dialog')().visible).toBe(false);
    });

    it('close() without dialogId should not call dialogService', () => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      const spy = jest.spyOn(dialogService, 'close');
      component.close();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
