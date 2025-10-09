import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageTooltipComponent } from './dcx-ng-page-tooltip.component';

describe('DcxNgPageTooltipComponent', () => {
  let component: DcxNgPageTooltipComponent;
  let fixture: ComponentFixture<DcxNgPageTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
