import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageBadgeComponent } from './dcx-ng-page-badge.component';

describe('DcxNgPageBadgeComponent', () => {
  let component: DcxNgPageBadgeComponent;
  let fixture: ComponentFixture<DcxNgPageBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
