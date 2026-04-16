import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageBreadcrumbComponent } from './dcx-ng-page-breadcrumb';

describe('DcxNgPageBreadcrumbComponent', () => {
  let component: DcxNgPageBreadcrumbComponent;
  let fixture: ComponentFixture<DcxNgPageBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
