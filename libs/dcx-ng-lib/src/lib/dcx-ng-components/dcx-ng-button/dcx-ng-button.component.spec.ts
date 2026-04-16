import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgButtonComponent } from './dcx-ng-button.component';
import { By } from '@angular/platform-browser';

describe('DcxNgButtonComponent', () => {
  let component: DcxNgButtonComponent;
  let fixture: ComponentFixture<DcxNgButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the button component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default values', () => {
    expect(component.label()).toBe('');
    expect(component.disabled()).toBe(false);
    expect(component.size()).toBe('m');
    expect(component.type()).toBe('button');
  });

  it('should render the button label', () => {
    fixture.componentRef.setInput('label', 'Click Me');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent).toContain('Click Me');
  });

  it('should disable the button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should emit buttonClick event when clicked and not disabled', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    component.onClick();
    expect(emitSpy).toHaveBeenCalledWith({ clicked: true });
  });

  it('should not emit buttonClick when disabled', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.onClick();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should compute aria-label as null when label is set', () => {
    fixture.componentRef.setInput('label', 'Save');
    fixture.detectChanges();
    expect(component.computedAriaLabel()).toBeNull();
  });

  it('should compute aria-label from ariaLabel when label is empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('ariaLabel', 'Submit Button');
    fixture.detectChanges();
    expect(component.computedAriaLabel()).toBe('Submit Button');
  });

  it('should fallback aria-label to "Button" when both label and ariaLabel are empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();
    expect(component.computedAriaLabel()).toBe('Button');
  });

  it('should include variant class in buttonClasses', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
    expect(component.buttonClasses()).toContain('dcx-ng-button--secondary');
  });

  it('should include icon-only class when no label but has icon', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('iconName', 'search');
    fixture.detectChanges();
    expect(component.buttonClasses()).toContain('dcx-ng-button--icon-only');
  });

  it('should include custom class in buttonClasses', () => {
    fixture.componentRef.setInput('class', 'my-custom-class');
    fixture.detectChanges();
    expect(component.buttonClasses()).toContain('my-custom-class');
  });

  it('should include size class in buttonClasses', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.buttonClasses()).toContain('dcx-ng-button--l');
  });
});
