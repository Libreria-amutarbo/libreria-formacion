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
        const messageElement = fixture.debugElement.query(By.css('.dcx-toast__message'));
        expect(messageElement.nativeElement.textContent.trim()).toBe(
            'Proyecto guardado correctamente',
        );
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

    it('should always render undo action button', () => {
        const actionButton = fixture.debugElement.query(By.css('.dcx-toast__action'));
        expect(actionButton).toBeTruthy();
        expect(actionButton.nativeElement.textContent.trim()).toBe('Deshacer');
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
});
