import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageSearchComponent } from './dcx-ng-page-search.component';

describe('DcxNgPageSearchComponent', () => {
  let component: DcxNgPageSearchComponent;
  let fixture: ComponentFixture<DcxNgPageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
