import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageToastComponent } from './dcx-ng-page-toast.component';

describe('DcxNgPageToastComponent', () => {
    let component: DcxNgPageToastComponent;
    let fixture: ComponentFixture<DcxNgPageToastComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgPageToastComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgPageToastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a toast when showInfoToast is called', () => {
        component.showInfoToast();

        expect(component.activeCount()).toBe(1);
        expect(component.activeToasts()[0]?.type).toBe('info');
    });

    it('should clear all toasts', () => {
        component.showInfoToast();
        component.showWarningToast();

        expect(component.activeCount()).toBe(2);

        component.clearToasts();

        expect(component.activeCount()).toBe(0);
        expect(component.lastEvent()).toContain('limpiaron');
    });
});
