import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageBreadcrumb } from './dcx-ng-page-breadcrumb';

describe('DcxNgPageBreadcrumb', () => {
  let component: DcxNgPageBreadcrumb;
  let fixture: ComponentFixture<DcxNgPageBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageBreadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
