import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageSelectComponent } from './dcx-ng-select.component';

describe('DcxNgPageSelectComponent', () => {
  let component: DcxNgPageSelectComponent;
  let fixture: ComponentFixture<DcxNgPageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
