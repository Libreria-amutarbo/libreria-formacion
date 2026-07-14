import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgToastOutletComponent } from './dcx-ng-toast-outlet.component';
import { DcxNgToastComponent } from '../dcx-ng-toast-component/dcx-ng-toast.component';
import { DcxNgToastService } from '../dcx-ng-toast-component/dcx-ng-toast.service';

describe('DcxNgToastOutletComponent', () => {
  let component: DcxNgToastOutletComponent;
  let fixture: ComponentFixture<DcxNgToastOutletComponent>;
  let toastService: DcxNgToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgToastOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgToastOutletComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(DcxNgToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no toasts initially', () => {
    const toasts = fixture.debugElement.queryAll(By.directive(DcxNgToastComponent));
    expect(toasts.length).toBe(0);
  });

  it('should render one dcx-ng-toast per entry in the service', () => {
    toastService.success('Guardado');
    toastService.error('Fallo');
    fixture.detectChanges();

    const toasts = fixture.debugElement.queryAll(By.directive(DcxNgToastComponent));
    expect(toasts.length).toBe(2);
  });

  it('should set announce to false on each rendered toast', () => {
    toastService.info('Hola');
    fixture.detectChanges();

    const toast = fixture.debugElement.query(By.directive(DcxNgToastComponent));
    expect(toast.componentInstance.announce()).toBe(false);
  });

  it('should have a persistent aria-live="polite" container', () => {
    const container = fixture.debugElement.query(By.css('.dcx-toast-outlet'));
    expect(container.nativeElement.getAttribute('aria-live')).toBe('polite');
  });

  it('should dismiss the corresponding toast in the service when dismissed fires', () => {
    const id = toastService.info('Hola');
    fixture.detectChanges();

    const toast = fixture.debugElement.query(By.directive(DcxNgToastComponent));
    toast.triggerEventHandler('dismissed', undefined);

    expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
  });

  it('should dismiss the corresponding toast in the service when actionClick fires', () => {
    const id = toastService.info('Hola');
    fixture.detectChanges();

    const toast = fixture.debugElement.query(By.directive(DcxNgToastComponent));
    toast.triggerEventHandler('actionClick', undefined);

    expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
  });

  it('should apply the position class based on the position input', () => {
    fixture.componentRef.setInput('position', 'bottom-left');
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.dcx-toast-outlet'));
    expect(container.nativeElement.classList).toContain('dcx-toast-outlet--bottom-left');
  });

  it('should default to top-right position', () => {
    const container = fixture.debugElement.query(By.css('.dcx-toast-outlet'));
    expect(container.nativeElement.classList).toContain('dcx-toast-outlet--top-right');
  });
});
