import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgDividerComponent } from './dcx-ng-divider.component';
import { By } from '@angular/platform-browser';

describe('DcxNgDividerComponent', () => {
  let component: DcxNgDividerComponent;
  let fixture: ComponentFixture<DcxNgDividerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DcxNgDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the divider component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct horizontal class and CSS variables', () => {
    component.orientation = 'horizontal';
    component.thickness = 0.5;
    component.color = '#0056b3';
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;

    expect(hr.classList).toContain('dcx-ng-divider--horizontal');
    expect(hostElement.style.getPropertyValue('--dcx-divider-thickness')).toBe(
      '0.5rem',
    );
    expect(hostElement.style.getPropertyValue('--dcx-divider-color')).toBe(
      '#0056b3',
    );
  });

  it('should apply correct vertical class and CSS variables', () => {
    component.orientation = 'vertical';
    component.thickness = 0.25;
    component.color = '#0056b3';
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;

    expect(hr.classList).toContain('dcx-ng-divider--vertical');
    expect(hostElement.style.getPropertyValue('--dcx-divider-thickness')).toBe(
      '0.25rem',
    );
    expect(hostElement.style.getPropertyValue('--dcx-divider-color')).toBe(
      '#0056b3',
    );
  });

  it('should apply correct ARIA label', () => {
    component.ariaLabel = 'Divider';
    fixture.detectChanges();

    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;
    expect(hr.getAttribute('aria-label')).toBe('Divider');
  });

  it('should apply the small size class', () => {
    component.size = 's';
    fixture.detectChanges();

    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;
    expect(hr.classList).toContain('dcx-ng-divider--s');
  });

  it('should apply the vertical orientation class', () => {
    component.orientation = 'vertical';
    fixture.detectChanges();

    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;
    expect(hr.classList).toContain('dcx-ng-divider--vertical');
  });
});
