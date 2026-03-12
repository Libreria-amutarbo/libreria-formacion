import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageSliderComponent } from './dcx-ng-page-slider.component';

describe('DcxNgPageSliderComponent', () => {
  let component: DcxNgPageSliderComponent;
  let fixture: ComponentFixture<DcxNgPageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
