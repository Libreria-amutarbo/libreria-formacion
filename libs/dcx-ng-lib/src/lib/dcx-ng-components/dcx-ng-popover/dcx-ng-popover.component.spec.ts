import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPopoverComponent } from './dcx-ng-popover.component';

describe('DcxNgPopoverComponent', () => {
  let component: DcxNgPopoverComponent;
  let fixture: ComponentFixture<DcxNgPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
