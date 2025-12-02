import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTablePaginatorComponent } from './dcx-ng-table-paginator.component';

describe('DcxNgTablePaginatorComponent', () => {
  let component: DcxNgTablePaginatorComponent;
  let fixture: ComponentFixture<DcxNgTablePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTablePaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
