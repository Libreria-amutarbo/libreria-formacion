import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageCheckboxComponent } from './dcx-ng-page-checkbox.component';

describe('DcxNgPageCheckboxComponent', () => {
  let component: DcxNgPageCheckboxComponent;
  let fixture: ComponentFixture<DcxNgPageCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
