import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageDatePickerComponent } from './dxc-ng-page-datePicker.component';

describe('DcxNgPageDatePickerComponent', () => {
  let component: DcxNgPageDatePickerComponent;
  let fixture: ComponentFixture<DcxNgPageDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
