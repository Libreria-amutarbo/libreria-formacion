import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageStepperComponent } from './dcx-ng-page-stepper.component';

describe('DcxNgPageStepperComponent', () => {
  let component: DcxNgPageStepperComponent;
  let fixture: ComponentFixture<DcxNgPageStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
