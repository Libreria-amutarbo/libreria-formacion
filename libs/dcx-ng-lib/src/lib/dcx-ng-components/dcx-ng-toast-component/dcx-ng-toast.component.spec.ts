import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgToastComponent } from '@dcx-ng-components/dcx-ng-lib';


describe('DcxNgToastComponent', () => {
    let component: DcxNgToastComponent;
    let fixture: ComponentFixture<DcxNgToastComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgToastComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgToastComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('message', 'Proyecto guardado correctamente');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render required message', () => {
        const messageElement = fixture.debugElement.query(By.css('dcx-ng-message'));
        expect(messageElement).toBeTruthy();
        expect(messageElement.componentInstance.body()).toBe('Proyecto guardado correctamente');
    });

    it('should apply info class by default', () => {
        const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
        expect(toastElement.nativeElement.classList).toContain('dcx-toast--info');
    });

    it('should apply success class when type is success', () => {
        fixture.componentRef.setInput('type', 'success');
        fixture.detectChanges();

        const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
        expect(toastElement.nativeElement.classList).toContain('dcx-toast--success');
    });

    it('should resolve message type according to toast type', () => {
        fixture.componentRef.setInput('type', 'error');
        fixture.detectChanges();

        expect(component.resolvedMessageType()).toBe('error');
    });

    it('should always render undo action button', () => {
        const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
        expect(actionButton).toBeTruthy();
        expect(actionButton.nativeElement.textContent.trim()).toBe('Deshacer');
    });

    it('should render custom action label when provided', () => {
        fixture.componentRef.setInput('actionLabel', 'Reintentar');
        fixture.detectChanges();

        const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
        expect(actionButton.nativeElement.textContent.trim()).toContain('Reintentar');
    });

    it('should render action icon when actionIconName is provided', () => {
        fixture.componentRef.setInput('actionLabel', 'Reintentar');
        fixture.componentRef.setInput('actionIconName', 'arrow-repeat');
        fixture.detectChanges();

        const icon = fixture.debugElement.query(By.css('.dcx-toast__action .bi-arrow-repeat'));
        expect(icon).toBeTruthy();
    });

    it('should use fallback aria label when action is icon-only', () => {
        fixture.componentRef.setInput('actionLabel', '');
        fixture.componentRef.setInput('actionIconName', 'arrow-repeat');
        fixture.detectChanges();

        expect(component.resolvedActionAriaLabel()).toBe('Accion del toast');
    });

    it('should use explicit aria label when action is icon-only', () => {
        fixture.componentRef.setInput('actionLabel', '');
        fixture.componentRef.setInput('actionIconName', 'arrow-repeat');
        fixture.componentRef.setInput('actionAriaLabel', 'Actualizar contenido');
        fixture.detectChanges();

        expect(component.resolvedActionAriaLabel()).toBe('Actualizar contenido');
    });

    it('should emit actionClick when action button is clicked', () => {
        const emitSpy = jest.spyOn(component.actionClick, 'emit');
        const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
        actionButton.triggerEventHandler('buttonClick', { clicked: true });

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit dismissed after duration when autoDismiss is true', fakeAsync(() => {
        const emitSpy = jest.spyOn(component.dismissed, 'emit');

        fixture.componentRef.setInput('autoDismiss', true);
        fixture.componentRef.setInput('durationMs', 1000);
        fixture.detectChanges();

        tick(1000);

        expect(emitSpy).toHaveBeenCalled();
    }));

    it('should not emit dismissed when durationMs is lower or equal than 0', fakeAsync(() => {
        const emitSpy = jest.spyOn(component.dismissed, 'emit');

        fixture.componentRef.setInput('autoDismiss', true);
        fixture.componentRef.setInput('durationMs', 0);
        fixture.detectChanges();

        tick(1000);

        expect(emitSpy).not.toHaveBeenCalled();
    }));

    describe('close button (WCAG)', () => {
        it('should render a close button by default', () => {
            const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
            expect(closeButton).toBeTruthy();
        });

        it('should not render a close button when dismissible is false', () => {
            fixture.componentRef.setInput('dismissible', false);
            fixture.detectChanges();
            const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
            expect(closeButton).toBeFalsy();
        });

        it('should emit dismissed when the close button is clicked', () => {
            const emitSpy = jest.spyOn(component.dismissed, 'emit');
            const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
            closeButton.triggerEventHandler('buttonClick', {});
            expect(emitSpy).toHaveBeenCalled();
        });

        it('should set aria-label "Cerrar" on the close button', () => {
            const closeButton = fixture.debugElement.query(By.css('.dcx-toast__close'));
            expect(closeButton.componentInstance.ariaLabel()).toBe('Cerrar');
        });
    });

    describe('pause on hover/focus (WCAG 2.2.1)', () => {
        it('should pause the auto-dismiss timer on mouseenter', fakeAsync(() => {
            const emitSpy = jest.spyOn(component.dismissed, 'emit');

            fixture.componentRef.setInput('autoDismiss', true);
            fixture.componentRef.setInput('durationMs', 1000);
            fixture.detectChanges();

            tick(500);
            component.onPauseTimer();
            fixture.detectChanges();
            tick(1000);

            expect(emitSpy).not.toHaveBeenCalled();
        }));

        it('should resume the timer with the full duration on mouseleave', fakeAsync(() => {
            const emitSpy = jest.spyOn(component.dismissed, 'emit');

            fixture.componentRef.setInput('autoDismiss', true);
            fixture.componentRef.setInput('durationMs', 1000);
            fixture.detectChanges();

            component.onPauseTimer();
            fixture.detectChanges();
            component.onResumeTimer();
            fixture.detectChanges();

            tick(1000);

            expect(emitSpy).toHaveBeenCalled();
        }));

        it('should pause on focusin and resume on focusout', fakeAsync(() => {
            const emitSpy = jest.spyOn(component.dismissed, 'emit');

            fixture.componentRef.setInput('autoDismiss', true);
            fixture.componentRef.setInput('durationMs', 1000);
            fixture.detectChanges();

            component.onPauseTimer();
            fixture.detectChanges();
            tick(1000);
            expect(emitSpy).not.toHaveBeenCalled();

            component.onResumeTimer();
            fixture.detectChanges();
            tick(1000);
            expect(emitSpy).toHaveBeenCalled();
        }));
    });

    describe('announce (used by dcx-ng-toast-outlet)', () => {
        it('should set aria-live by default', () => {
            const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
            expect(toastElement.nativeElement.getAttribute('aria-live')).toBe('polite');
        });

        it('should not set aria-live when announce is false, but keep role', () => {
            fixture.componentRef.setInput('announce', false);
            fixture.detectChanges();
            const toastElement = fixture.debugElement.query(By.css('.dcx-toast'));
            expect(toastElement.nativeElement.getAttribute('aria-live')).toBeNull();
            expect(toastElement.nativeElement.getAttribute('role')).toBe('status');
        });
    });
});
