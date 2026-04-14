import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPagePopoverComponent } from './dcx-ng-page-popover';

describe('DcxNgPagePopoverComponent', () => {
  let component: DcxNgPagePopoverComponent;
  let fixture: ComponentFixture<DcxNgPagePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPagePopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPagePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
