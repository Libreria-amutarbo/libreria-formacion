import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTooltipComponent } from './dcx-ng-tooltip.component';

describe('DcxNgTooltipComponent', () => {
  let component: DcxNgTooltipComponent;
  let fixture: ComponentFixture<DcxNgTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
