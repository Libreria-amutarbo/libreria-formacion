import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageDropdownComponent } from './dcx-ng-page-dropdown.component';

describe('DcxNgPageDropdownComponent', () => {
  let component: DcxNgPageDropdownComponent;
  let fixture: ComponentFixture<DcxNgPageDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
