import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgToggleComponent } from './dcx-ng-toggle.component';
import { By } from '@angular/platform-browser';

describe('DcxNgToggleComponent', () => {
  let component: DcxNgToggleComponent;
  let fixture: ComponentFixture<DcxNgToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the toggle component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.checked).toBe(false);
    expect(component.disabled).toBe(false);
    expect(component.label).toBeNull();
    expect(component.size).toBe('medium');
    expect(component.color).toBe('#000');
  });

  it('should apply size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    const toggle = fixture.debugElement.query(By.css('.dcx-ng-toggle'));
    expect(toggle.nativeElement.classList).toContain('dcx-ng-toggle--large');
  });

  it('should show label when set', () => {
    component.label = 'Toggle me';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.dcx-ng-toggle__label'));
    expect(label.nativeElement.textContent).toContain('Toggle me');
  });

  it('should bind aria-label correctly', () => {
    component.ariaLabel = 'Custom toggle';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('[role="switch"]'));
    expect(el.attributes['aria-label']).toBe('Custom toggle');
  });

  it('should fallback to default aria-label if not set', () => {
    component.ariaLabel = '';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('[role="switch"]'));
    expect(el.attributes['aria-label']).toBe('Toggle');
  });
});
