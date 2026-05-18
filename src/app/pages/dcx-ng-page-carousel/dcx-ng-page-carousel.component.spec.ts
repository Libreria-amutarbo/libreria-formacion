import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageCarouselComponent } from './dcx-ng-page-carousel.component';

describe('DcxNgPageCarouselComponent', () => {
  let component: DcxNgPageCarouselComponent;
  let fixture: ComponentFixture<DcxNgPageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
