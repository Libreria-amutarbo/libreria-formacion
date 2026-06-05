import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageInputOtpComponent } from './dcx-ng-page-input-otp.component';

describe('DcxNgPageInputOtpComponent', () => {
  let component: DcxNgPageInputOtpComponent;
  let fixture: ComponentFixture<DcxNgPageInputOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageInputOtpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageInputOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
