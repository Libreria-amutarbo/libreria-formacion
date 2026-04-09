import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPagePopover } from './dcx-ng-page-popover';

describe('DcxNgPagePopover', () => {
  let component: DcxNgPagePopover;
  let fixture: ComponentFixture<DcxNgPagePopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPagePopover],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPagePopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
