import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgToastComponent } from './dcx-ng-toast.component';
import { DcxNgToastService } from './dcx-ng-toast.service';

describe('DcxNgToastComponent', () => {
  let component: DcxNgToastComponent;
  let fixture: ComponentFixture<DcxNgToastComponent>;
  let toastService: DcxNgToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(DcxNgToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no toasts initially', () => {
    const toasts = fixture.debugElement.queryAll(By.css('.dcx-toast'));
    expect(toasts.length).toBe(0);
  });

  it('should render one toast per entry in the service', () => {
    toastService.success('Guardado');
    toastService.error('Fallo');
    fixture.detectChanges();

    const toasts = fixture.debugElement.queryAll(By.css('.dcx-toast'));
    expect(toasts.length).toBe(2);
  });

  it('should render the toast message via dcx-ng-message', () => {
    toastService.info('Proyecto guardado correctamente');
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('dcx-ng-message'));
    expect(messageElement.componentInstance.body()).toBe(
      'Proyecto guardado correctamente',
    );
  });

  it('should apply the type class', () => {
    toastService.success('Hecho');
    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
    expect(toastElement.nativeElement.classList).toContain('dcx-toast--success');
  });

  it('should not render an action button for plain toasts', () => {
    toastService.info('Hola');
    fixture.detectChanges();

    const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
    expect(actionButton).toBeFalsy();
  });

  it('should render a custom action label when provided', () => {
    toastService.show({ message: 'Archivo movido', actionLabel: 'Deshacer' });
    fixture.detectChanges();

    const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
    expect(actionButton.nativeElement.textContent.trim()).toBe('Deshacer');
  });

  it('should render the action icon when actionIconName is provided', () => {
    toastService.show({
      message: 'Sincronizacion disponible',
      actionLabel: 'Reintentar',
      actionIconName: 'arrow-repeat',
    });
    fixture.detectChanges();

    const icon = fixture.debugElement.query(
      By.css('.dcx-toast__action .bi-arrow-repeat'),
    );
    expect(icon).toBeTruthy();
  });

  it('should use a fallback aria-label when the action is icon-only', () => {
    toastService.show({
      message: 'Actualiza para ver cambios',
      actionIconName: 'arrow-clockwise',
    });
    fixture.detectChanges();

    const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
    expect(actionButton.componentInstance.ariaLabel()).toBe('Accion del toast');
  });

  it('should use an explicit aria-label when provided', () => {
    toastService.show({
      message: 'Actualiza para ver cambios',
      actionIconName: 'arrow-clockwise',
      actionAriaLabel: 'Actualizar contenido',
    });
    fixture.detectChanges();

    const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
    expect(actionButton.componentInstance.ariaLabel()).toBe('Actualizar contenido');
  });

  it('should dismiss the toast in the service when the action button is clicked', () => {
    const id = toastService.show({ message: 'Archivo movido', actionLabel: 'Deshacer' });
    fixture.detectChanges();

    const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
    actionButton.triggerEventHandler('buttonClick', { clicked: true });

    expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
  });

  describe('close button (WCAG)', () => {
    it('should render a close button by default', () => {
      toastService.info('Hola');
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
      expect(closeButton).toBeTruthy();
    });

    it('should not render a close button when dismissible is false', () => {
      toastService.show({ message: 'Sin cierre', dismissible: false });
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
      expect(closeButton).toBeFalsy();
    });

    it('should dismiss the toast in the service when the close button is clicked', () => {
      const id = toastService.info('Hola');
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
      closeButton.triggerEventHandler('buttonClick', {});

      expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
    });

    it('should set aria-label "Cerrar" on the close button', () => {
      toastService.info('Hola');
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
      expect(closeButton.componentInstance.ariaLabel()).toBe('Cerrar');
    });
  });

  describe('auto-dismiss', () => {
    it('should dismiss the toast in the service after durationMs', fakeAsync(() => {
      const id = toastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });
      fixture.detectChanges();

      tick(1000);

      expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
    }));

    it('should not auto-dismiss when durationMs is 0 or lower', fakeAsync(() => {
      const id = toastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 0,
      });
      fixture.detectChanges();

      tick(1000);

      expect(toastService.toasts().find(t => t.id === id)).toBeTruthy();
    }));
  });

  describe('pause on hover/focus (WCAG 2.2.1)', () => {
    it('should pause the auto-dismiss timer on mouseenter', fakeAsync(() => {
      const id = toastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });
      fixture.detectChanges();

      tick(500);
      component.pause(id);
      fixture.detectChanges();
      tick(1000);

      expect(toastService.toasts().find(t => t.id === id)).toBeTruthy();
    }));

    it('should resume the timer with the full duration on mouseleave', fakeAsync(() => {
      const id = toastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });
      fixture.detectChanges();

      component.pause(id);
      fixture.detectChanges();
      component.resume(id);
      fixture.detectChanges();

      tick(1000);

      expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
    }));

    it('should pause on focusin and resume on focusout via the DOM', fakeAsync(() => {
      const id = toastService.show({
        message: 'Auto',
        autoDismiss: true,
        durationMs: 1000,
      });
      fixture.detectChanges();

      const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
      toastElement.triggerEventHandler('focusin', {});
      fixture.detectChanges();
      tick(1000);
      expect(toastService.toasts().find(t => t.id === id)).toBeTruthy();

      toastElement.triggerEventHandler('focusout', {});
      fixture.detectChanges();
      tick(1000);
      expect(toastService.toasts().find(t => t.id === id)).toBeUndefined();
    }));
  });

  describe('position', () => {
    it('should default to top-right', () => {
      const outlet = fixture.debugElement.query(By.css('.dcx-toast-outlet'));
      expect(outlet.nativeElement.classList).toContain('dcx-toast-outlet--top-right');
    });

    it('should apply the position class based on the position input', () => {
      fixture.componentRef.setInput('position', 'bottom-left');
      fixture.detectChanges();

      const outlet = fixture.debugElement.query(By.css('.dcx-toast-outlet'));
      expect(outlet.nativeElement.classList).toContain('dcx-toast-outlet--bottom-left');
    });
  });

  describe('role', () => {
    it('uses role="status" for info/success toasts', () => {
      toastService.success('Hecho');
      fixture.detectChanges();

      const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
      expect(toastElement.nativeElement.getAttribute('role')).toBe('status');
    });

    it('uses role="alert" for warning/error toasts', () => {
      toastService.error('Fallo grave');
      fixture.detectChanges();

      const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
      expect(toastElement.nativeElement.getAttribute('role')).toBe('alert');
    });
  });

  it('has a persistent aria-live="polite" outlet container', () => {
    const outlet = fixture.debugElement.query(By.css('.dcx-toast-outlet'));
    expect(outlet.nativeElement.getAttribute('aria-live')).toBe('polite');
  });
});
