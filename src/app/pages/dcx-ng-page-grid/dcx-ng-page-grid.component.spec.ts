import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageGridComponent } from './dcx-ng-page-grid.component';

describe('DcxNgPageGridComponent', () => {
    let component: DcxNgPageGridComponent;
    let fixture: ComponentFixture<DcxNgPageGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DcxNgPageGridComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DcxNgPageGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
