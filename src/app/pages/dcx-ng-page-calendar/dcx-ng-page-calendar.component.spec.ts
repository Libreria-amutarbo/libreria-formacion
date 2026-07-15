import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageCalendarComponent } from './dcx-ng-page-calendar.component';

describe('DcxNgPageCalendarComponent', () => {
  let component: DcxNgPageCalendarComponent;
  let fixture: ComponentFixture<DcxNgPageCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calendar title', () => {
    const title = fixture.nativeElement.querySelector('.demo-page-header__title');
    expect(title?.textContent).toContain('Calendar');
  });
});