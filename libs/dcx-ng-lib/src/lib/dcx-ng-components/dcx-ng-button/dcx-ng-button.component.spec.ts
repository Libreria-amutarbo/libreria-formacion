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

  it('should include icon-only class when variant is icon-only and has icon', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('variant', 'icon-only');
    fixture.componentRef.setInput('iconName', 'search');
    fixture.detectChanges();
    expect(component.buttonClasses()).toContain('dcx-ng-button--icon-only');
  });

  it('should not include icon-only class when variant is not icon-only', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.componentRef.setInput('iconName', 'search');
    fixture.detectChanges();

    expect(component.buttonClasses()).not.toContain('dcx-ng-button--icon-only');
    expect(component.buttonClasses()).toContain('dcx-ng-button--secondary');
    expect(component.buttonClasses()).toContain('dcx-ng-button--m');
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

  it('should inherit icon size from button size when iconSize is not provided', () => {
    fixture.componentRef.setInput('icon', true);
    fixture.componentRef.setInput('iconName', 'search');
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();

    expect(component.resolvedIconSize()).toBe('l');
  });

  it('should use explicit iconSize when provided', () => {
    fixture.componentRef.setInput('icon', true);
    fixture.componentRef.setInput('iconName', 'search');
    fixture.componentRef.setInput('size', 'l');
    fixture.componentRef.setInput('iconSize', 's');
    fixture.detectChanges();

    expect(component.resolvedIconSize()).toBe('s');
  });

  describe('WCAG AA', () => {
    it('should render a native <button> element', () => {
      const btn = fixture.debugElement.query(By.css('button'));
      expect(btn).toBeTruthy();
    });

    it('should set aria-pressed="true" on inner button when pressed is true', () => {
      fixture.componentRef.setInput('pressed', true);
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-pressed')).toBe('true');
    });

    it('should not set aria-pressed when pressed is false', () => {
      fixture.componentRef.setInput('pressed', false);
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.hasAttribute('aria-pressed')).toBe(false);
    });

    it('should reflect ariaExpanded as aria-expanded on the inner button', () => {
      fixture.componentRef.setInput('ariaExpanded', true);
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('should reflect ariaControls as aria-controls on the inner button', () => {
      fixture.componentRef.setInput('ariaControls', 'menu-panel');
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-controls')).toBe('menu-panel');
    });

    it('should reflect ariaCurrent as aria-current on the inner button', () => {
      fixture.componentRef.setInput('ariaCurrent', 'page');
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-current')).toBe('page');
    });

    it('should not render aria-expanded, aria-controls or aria-current when not set', () => {
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.hasAttribute('aria-expanded')).toBe(false);
      expect(btn.hasAttribute('aria-controls')).toBe(false);
      expect(btn.hasAttribute('aria-current')).toBe(false);
    });

    it('should apply ariaLabel to the inner button when label is empty', () => {
      fixture.componentRef.setInput('label', '');
      fixture.componentRef.setInput('ariaLabel', 'Guardar');
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-label')).toBe('Guardar');
    });

    it('should not set aria-current by default', () => {
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.hasAttribute('aria-current')).toBe(false);
    });

    it('should reflect ariaCurrent="page" on the inner button', () => {
      fixture.componentRef.setInput('ariaCurrent', 'page');
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-current')).toBe('page');
    });

    it('should not set aria-haspopup by default', () => {
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.hasAttribute('aria-haspopup')).toBe(false);
    });

    it('should reflect ariaHaspopup on the inner button', () => {
      fixture.componentRef.setInput('ariaHaspopup', 'dialog');
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-haspopup')).toBe('dialog');
    });
  });
});
