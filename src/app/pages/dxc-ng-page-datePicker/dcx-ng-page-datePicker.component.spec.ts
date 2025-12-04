import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DxcNgPageDatePickerComponent } from './dxc-ng-page-datePicker.component';


describe('DxcNgPageDatePickerComponent', () => {
    let component: DxcNgPageDatePickerComponent;
    let fixture: ComponentFixture<DxcNgPageDatePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DxcNgPageDatePickerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DxcNgPageDatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});