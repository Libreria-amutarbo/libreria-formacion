import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageInputComponent } from './dcx-ng-page-input.component';

describe('DcxNgPageInputComponent', () => {
  let component: DcxNgPageInputComponent;
  let fixture: ComponentFixture<DcxNgPageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
