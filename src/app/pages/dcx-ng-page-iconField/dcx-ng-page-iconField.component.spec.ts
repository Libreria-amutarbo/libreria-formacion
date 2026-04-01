import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageIconFieldComponent } from './dcx-ng-page-iconField.component';

describe('DcxNgPageIconFieldComponent', () => {
  let component: DcxNgPageIconFieldComponent;
  let fixture: ComponentFixture<DcxNgPageIconFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageIconFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageIconFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
