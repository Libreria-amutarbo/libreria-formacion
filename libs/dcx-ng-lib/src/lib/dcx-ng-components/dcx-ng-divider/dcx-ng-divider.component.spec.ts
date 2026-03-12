import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgDividerComponent } from './dcx-ng-divider.component';
import { By } from '@angular/platform-browser';

describe('DcxNgDividerComponent', () => {
  let component: DcxNgDividerComponent;
  let fixture: ComponentFixture<DcxNgDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the divider component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply horizontal class by default', () => {
    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;
    expect(hr.classList.toString()).toContain('dcx-ng-divider--horizontal');
  });

  it('should apply correct horizontal class and CSS variables', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.componentRef.setInput('thickness', 0.5);
    fixture.componentRef.setInput('color', '#0056b3');
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.style.getPropertyValue('--dcx-divider-thickness')).toBe(
      '0.5rem',
    );
    expect(hostElement.style.getPropertyValue('--dcx-divider-color')).toBe(
      '#0056b3',
    );
  });

  it('should apply correct vertical class', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const hr = fixture.debugElement.query(By.css('hr')).nativeElement;
    expect(hr.classList.toString()).toContain('dcx-ng-divider--vertical');
  });

  it('should bind CSS variable for thickness', () => {
    fixture.componentRef.setInput('thickness', 0.25);
    fixture.detectChanges();
    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.style.getPropertyValue('--dcx-divider-thickness')).toBe(
      '0.25rem',
    );
  });

  it('should compute dividerClasses correctly', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.componentRef.setInput('size', 's');
    fixture.componentRef.setInput('type', 'default');
    fixture.detectChanges();
    expect(component.dividerClasses()).toContain('dcx-ng-divider--horizontal');
    expect(component.dividerClasses()).toContain('dcx-ng-divider--s');
  });

  it('should compute ariaLabelBinding from ariaLabel', () => {
    fixture.componentRef.setInput('ariaLabel', 'My divider');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('My divider');
  });

  it('should fallback ariaLabelBinding to empty string when not set', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('');
  });

  it('should handle empty orientation in dividerClasses', () => {
    fixture.componentRef.setInput('orientation', '');
    fixture.detectChanges();
    const classes = component.dividerClasses();
    expect(classes).toContain('dcx-ng-divider');
    expect(classes).not.toContain('dcx-ng-divider--horizontal');
    expect(classes).not.toContain('dcx-ng-divider--vertical');
  });

  it('should handle empty size in dividerClasses', () => {
    fixture.componentRef.setInput('size', '');
    fixture.detectChanges();
    const classes = component.dividerClasses();
    expect(classes).toContain('dcx-ng-divider');
  });

  it('should handle empty type in dividerClasses', () => {
    fixture.componentRef.setInput('type', '');
    fixture.detectChanges();
    const classes = component.dividerClasses();
    expect(classes).toContain('dcx-ng-divider');
  });
});
