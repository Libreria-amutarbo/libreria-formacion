import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageTableRefactorComponent } from './dcx-ng-page-table-refactor.component';

describe('DcxNgPageTableRefactorComponent', () => {
  let component: DcxNgPageTableRefactorComponent;
  let fixture: ComponentFixture<DcxNgPageTableRefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTableRefactorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTableRefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
