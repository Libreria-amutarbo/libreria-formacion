import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageSpinnerComponent } from './dcx-ng-page-spinner.component';

describe('DcxNgPageSpinnerComponent', () => {
  let component: DcxNgPageSpinnerComponent;
  let fixture: ComponentFixture<DcxNgPageSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
