import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPaginatorComponent } from './dcx-ng-paginator.component';

describe('DcxNgPaginatorComponent', () => {
  let component: DcxNgPaginatorComponent;
  let fixture: ComponentFixture<DcxNgPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
