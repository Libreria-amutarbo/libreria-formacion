import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageIconComponent } from './dcx-ng-page-icon.component';

describe('DcxNgPageIconComponent', () => {
  let component: DcxNgPageIconComponent;
  let fixture: ComponentFixture<DcxNgPageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
