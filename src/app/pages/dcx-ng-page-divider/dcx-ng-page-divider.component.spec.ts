import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageDividerComponent } from './dcx-ng-page-divider.component';

describe('DcxNgPageDividerComponent', () => {
  let component: DcxNgPageDividerComponent;
  let fixture: ComponentFixture<DcxNgPageDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
