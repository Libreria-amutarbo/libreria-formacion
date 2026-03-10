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
    expect(component.checked()).toBe(false);
    expect(component.disabled()).toBe(false);
    expect(component.label()).toBeNull();
    expect(component.size()).toBe('m');
  });

  it('should toggle checked state when toggle() is called', () => {
    expect(component.checked()).toBe(false);
    component.toggle();
    expect(component.checked()).toBe(true);
    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should emit toggled event with new value', () => {
    const spy = jest.fn();
    component.toggled.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should NOT emit toggled when disabled', () => {
    const spy = jest.fn();
    component.toggled.subscribe(spy);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--l');
  });

  it('should handle empty size in sizeClasses', () => {
    fixture.componentRef.setInput('size', '');
    fixture.detectChanges();
    const classes = component.sizeClasses();
    expect(classes).toContain('dcx-ng-toggle');
    expect(classes).not.toContain('dcx-ng-toggle--m');
  });

  it('should show label when set', () => {
    fixture.componentRef.setInput('label', 'Toggle me');
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.dcx-ng-toggle__label'));
    expect(label.nativeElement.textContent).toContain('Toggle me');
  });

  it('should include textPosition class in sizeClasses', () => {
    fixture.componentRef.setInput('textPosition', 'right');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--right');
  });

  it('should return ariaLabelBinding from ariaLabel', () => {
    fixture.componentRef.setInput('ariaLabel', 'Custom toggle');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('Custom toggle');
  });

  it('should fallback ariaLabelBinding to "Toggle" when ariaLabel is empty', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('Toggle');
  });

  it('should handle keyboard Enter toggle', () => {
    const event = new KeyboardEvent('keydown');
    Object.defineProperty(event, 'preventDefault', { value: jest.fn() });
    component.handleKeyboardToggle(event);
    expect(component.checked()).toBe(true);
  });

  it('should not handle keyboard toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown');
    Object.defineProperty(event, 'preventDefault', { value: jest.fn() });
    component.handleKeyboardToggle(event);
    expect(component.checked()).toBe(false);
  });

  it('should apply default textPosition', () => {
    expect(component.textPosition()).toBe('right');
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--right');
  });

  it('should apply left textPosition class', () => {
    fixture.componentRef.setInput('textPosition', 'left');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--left');
  });

  it('should default ariaLabel to null', () => {
    expect(component.ariaLabel()).toBeNull();
    expect(component.ariaLabelBinding()).toBe('Toggle');
  });
});
