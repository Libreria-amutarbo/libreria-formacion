import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgToastService } from '@dcx-ng-components/dcx-ng-lib';
import { DcxNgPageToastComponent } from './dcx-ng-page-toast.component';

describe('DcxNgPageToastComponent', () => {
    let component: DcxNgPageToastComponent;
    let fixture: ComponentFixture<DcxNgPageToastComponent>;
    let toastService: DcxNgToastService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgPageToastComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgPageToastComponent);
        component = fixture.componentInstance;
        toastService = TestBed.inject(DcxNgToastService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a toast to the service when showInfoToast is called', () => {
        component.showInfoToast();

        expect(toastService.toasts().length).toBe(1);
        expect(toastService.toasts()[0].type).toBe('info');
    });

    it('should add a non-dismissible toast when showNotDismissibleToast is called', () => {
        component.showNotDismissibleToast();

        expect(toastService.toasts()[0].dismissible).toBe(false);
    });

    it('should clear all toasts via the service', () => {
        component.showInfoToast();
        component.showWarningToast();

        expect(toastService.toasts().length).toBe(2);

        component.clearToasts();

        expect(toastService.toasts().length).toBe(0);
    });
});
